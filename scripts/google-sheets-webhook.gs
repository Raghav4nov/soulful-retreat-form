// Paste this into Extensions > Apps Script on the Google Sheet that should
// collect registrations, then deploy it as a Web App (see setup steps in
// the pull request description / chat). The exec URL you get from that
// deployment goes into the GOOGLE_SHEETS_WEBHOOK_URL environment variable.

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

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
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

    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(
      ContentService.MimeType.JSON
    );
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
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
