export function capitalizeEmail(email: string): string {
  const [localPart, domainPart] = email.split('@');

  const capitalizedLocalPart = localPart
    .replace(/([._])([a-zA-Z])/g, (_, separator, char) => separator + char.toUpperCase())
    .replace(/^[a-zA-Z]/, (char) => char.toUpperCase());

  return `${capitalizedLocalPart}@${domainPart.toLowerCase()}`;
}
