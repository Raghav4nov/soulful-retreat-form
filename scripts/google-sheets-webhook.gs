// Paste this into Extensions > Apps Script on the Google Sheet that should
// collect registrations, then deploy it as a Web App (see setup steps in
// the pull request description / chat). The exec URL you get from that
// deployment goes into the GOOGLE_SHEETS_WEBHOOK_URL environment variable.
//
// ADMIN_SECRET below must match the ADMIN_PASSWORD environment variable set
// on Vercel - it's what lets the /admin dashboard read and edit rows here.
// If you ever change the admin password on Vercel, update this constant to
// the same value and redeploy this script (Deploy > Manage deployments >
// edit > New version), otherwise the dashboard will get "Unauthorized".
var ADMIN_SECRET = "soulful2026";

var HEADERS = [
  "Submitted At",
  "Full Name",
  "WhatsApp",
  "Email",
  "Intentions",
  "Experiences",
  "Experience Type",
  "Outdoor Comfort",
  "Special Requests",
  "Travelling From Outside",
  "Travel Mode",
  "Travel Guidance",
  "Accommodation",
  "Companion Name",
  "Food Preference",
  "Has Allergies",
  "Allergy Details",
  "Food Notes",
  "Emergency Contact Name",
  "Emergency Contact Number",
  "Emergency Relationship",
  "Activity Notes",
  "Registration Intent",
  "UTR Number",
  "Policy Agreement",
];

var READY_TO_REGISTER_LABEL = "I'm ready to register";

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    if (data.action === "adminList") {
      return handleAdminList(data);
    }
    if (data.action === "adminUpdate") {
      return handleAdminUpdate(data);
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
    }

    sheet.appendRow([
      data.submittedAt ? new Date(data.submittedAt) : new Date(),
      data.fullName || "",
      data.whatsapp || "",
      data.email || "",
      data.intentions || "",
      data.experiences || "",
      data.experienceType || "",
      data.outdoorComfort || "",
      data.specialRequests || "",
      data.travellingFromOutside || "",
      data.travelMode || "",
      data.travelGuidance || "",
      data.accommodationPreference || "",
      data.companionName || "",
      data.foodPreference || "",
      data.hasAllergies || "",
      data.allergyDetails || "",
      data.foodNotes || "",
      data.emergencyContactName || "",
      data.emergencyContactNumber || "",
      data.emergencyRelationship || "",
      data.activityNotes || "",
      data.registrationIntent || "",
      data.utrNumber || "",
      data.policyAgreement || "",
    ]);

    formatSheet(sheet);

    // A failed email should never make the whole submission look like it
    // failed to the visitor — the row is already saved at this point.
    try {
      sendConfirmationEmail(data);
    } catch (emailErr) {
      console.error("Failed to send confirmation email: " + emailErr);
    }

    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(
      ContentService.MimeType.JSON
    );
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}

// Returns every registration row as JSON for the /admin dashboard.
// Each row includes "_row" - its 1-indexed position in the sheet - so the
// dashboard can send it back with handleAdminUpdate to edit that exact row.
function handleAdminList(data) {
  if (data.secret !== ADMIN_SECRET) {
    return jsonResponse({ ok: false, error: "Unauthorized" });
  }

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var values = sheet.getDataRange().getValues();
  if (values.length === 0) {
    return jsonResponse({ ok: true, headers: HEADERS, rows: [] });
  }

  var headers = values[0];
  var rows = [];
  for (var i = 1; i < values.length; i++) {
    var rowObj = { _row: i + 1 };
    for (var col = 0; col < headers.length; col++) {
      var value = values[i][col];
      rowObj[headers[col]] = value instanceof Date ? value.toISOString() : value;
    }
    rows.push(rowObj);
  }

  return jsonResponse({ ok: true, headers: headers, rows: rows });
}

// Updates one or more fields on a single existing row, matched by its
// sheet row number (from the "_row" field handleAdminList returned).
function handleAdminUpdate(data) {
  if (data.secret !== ADMIN_SECRET) {
    return jsonResponse({ ok: false, error: "Unauthorized" });
  }

  var rowNumber = data.row;
  var fields = data.fields || {};
  if (!rowNumber || rowNumber < 2) {
    return jsonResponse({ ok: false, error: "Invalid row" });
  }

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

  for (var col = 0; col < headers.length; col++) {
    var header = headers[col];
    if (Object.prototype.hasOwnProperty.call(fields, header)) {
      sheet.getRange(rowNumber, col + 1).setValue(fields[header]);
    }
  }

  return jsonResponse({ ok: true });
}

// Re-applies the sheet's look on every submission, so it stays tidy even
// if someone accidentally messes with the formatting in between.
function formatSheet(sheet) {
  var numColumns = HEADERS.length;

  var headerRange = sheet.getRange(1, 1, 1, numColumns);
  headerRange.setBackground("#174D3B");
  headerRange.setFontColor("#FAF7F0");
  headerRange.setFontWeight("bold");
  headerRange.setHorizontalAlignment("center");
  headerRange.setVerticalAlignment("middle");
  sheet.setFrozenRows(1);
  sheet.setRowHeight(1, 32);

  var submittedAtColumn = sheet.getRange(2, 1, Math.max(sheet.getLastRow() - 1, 1), 1);
  submittedAtColumn.setNumberFormat("yyyy-mm-dd hh:mm");

  sheet.autoResizeColumns(1, numColumns);
}

// Run this once manually (select it in the function dropdown and click Run)
// to style a sheet that already has rows from before this formatting existed.
function formatExistingSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  formatSheet(sheet);
}

// Run this once manually (select it in the function dropdown and click Run)
// to send yourself a sample confirmation email without submitting the real
// form. Sends to your own Google account's email address so you can check
// how it looks in your inbox. Change registrationIntent to something other
// than "I'm ready to register" to preview the other email variant.
function testSendConfirmationEmail() {
  sendConfirmationEmail({
    email: Session.getActiveUser().getEmail(),
    fullName: "Test User",
    registrationIntent: "I'm ready to register",
    utrNumber: "TEST-UTR-12345",
  });
}

function sendConfirmationEmail(data) {
  if (!data.email) return;

  var name = data.fullName || "there";
  var isReady = data.registrationIntent === READY_TO_REGISTER_LABEL;

  var subject = isReady
    ? "Your Seat Is Reserved — Soulful Healing Adventure"
    : "We've Received Your Interest — Soulful Healing Adventure";

  var introHtml = isReady
    ? "Thank you for registering for <strong>Soulful Healing Adventure</strong> in Rishikesh, 14&ndash;15 November 2026. " +
      "We've received your registration and payment reference (" + (data.utrNumber || "-") + "). " +
      "Our team will verify the details and confirm your seat shortly."
    : "Thank you for your interest in <strong>Soulful Healing Adventure</strong> in Rishikesh, 14&ndash;15 November 2026. " +
      "Our team will reach out to you on WhatsApp or email soon with more details.";

  var introText = introHtml.replace(/<[^>]+>/g, "").replace(/&ndash;/g, "-");

  var plainBody =
    "Hi " + name + ",\n\n" +
    introText + "\n\n" +
    "What happens next:\n" +
    "1. Registration received - our team will review your details.\n" +
    "2. Confirmation - we'll contact you on WhatsApp.\n" +
    "3. Retreat details - you'll receive the location, itinerary, and packing list.\n\n" +
    "Good People. Good Energy. Good Experiences. See you in Rishikesh.\n\n" +
    "- Soulful Healing Adventure Team";

  var htmlBody =
    '<div style="font-family: Georgia, serif; background:#FAF7F0; padding:24px; color:#27312D;">' +
    '<h2 style="color:#174D3B; margin-top:0;">' + subject.replace(" — Soulful Healing Adventure", "") + "</h2>" +
    "<p>Hi " + name + ",</p>" +
    "<p>" + introHtml + "</p>" +
    '<p style="color:#174D3B; font-style:italic;">Same you. But a kinder, calmer, brighter version.</p>' +
    '<ol style="padding-left:20px;">' +
    "<li><strong>Registration received.</strong> Our team will review your details.</li>" +
    "<li><strong>Confirmation.</strong> We'll contact you on WhatsApp.</li>" +
    "<li><strong>Retreat details.</strong> You'll receive the location, itinerary, and packing list.</li>" +
    "</ol>" +
    '<p style="color:#174D3B;"><strong>Good People. Good Energy. Good Experiences.</strong><br/>See you in Rishikesh.</p>' +
    "</div>";

  MailApp.sendEmail({
    to: data.email,
    subject: subject,
    body: plainBody,
    htmlBody: htmlBody,
    name: "Soulful Healing Adventure",
  });
}
