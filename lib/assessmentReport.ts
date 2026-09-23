export type ContactInfo = {
  name: string;
  email: string;
  phone: string;
};

export function reportHeadline(contact: ContactInfo) {
  return contact.name
    ? `${firstName(contact.name)}, thanks for submitting`
    : "Thanks for submitting";
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
