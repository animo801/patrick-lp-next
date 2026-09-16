export type ContactInfo = {
  name: string;
  business: string;
  email: string;
  phone: string;
};

export function reportHeadline(contact: ContactInfo) {
  return contact.name
    ? `${firstName(contact.name)}, here’s your report for ${businessLabel(contact.business)}`
    : "Here’s your report.";
}

// [CONFIRM] Priority-based framing — swap for Patrick's real
// follow-up cadence/copy if this doesn't match how he wants to close.
export function priorityNote(answers: Record<string, string>) {
  const urgent =
    answers.priority === "My top priority" ||
    answers.priority === "A high priority";
  return urgent
    ? "Since this is a real priority for you right now, the fastest path is a short call — we’ll walk through this together."
    : "Whenever you’re ready to talk it through, we’re here.";
}

function firstName(fullName: string) {
  return fullName.trim().split(/\s+/)[0] || fullName;
}

// "for Sanders Roofing Co." vs "for Sanders Roofing Co.." — only add
// the trailing period if the business name doesn't already end with
// its own punctuation.
function businessLabel(business: string) {
  const name = business.trim() || "your business";
  return /[.!?]$/.test(name) ? name : `${name}.`;
}
