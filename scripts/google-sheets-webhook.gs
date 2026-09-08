// Paste this into Extensions > Apps Script on the Google Sheet that should
// collect registrations, then deploy it as a Web App (see setup steps in
// the pull request description / chat). The exec URL you get from that
// deployment goes into the GOOGLE_SHEETS_WEBHOOK_URL environment variable.

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
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
      ]);
    }

    sheet.appendRow([
      data.submittedAt || new Date().toISOString(),
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

    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(
      ContentService.MimeType.JSON
    );
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
