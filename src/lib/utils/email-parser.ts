/**
 * Email Parser Utility
 * Parses SPŠD email addresses and extracts usernames
 */

// Valid SPŠD email domains
const VALID_DOMAINS = [
  '@sps-mot.dopravni.cz',
  '@mot.sps-dopravni.cz',
] as const;

export interface ParsedEmail {
  username: string;
  email: string;
  domain: string;
  isValid: boolean;
}

/**
 * Parse SPŠD email and extract username
 *
 * Examples:
 * - Barat70671@sps-mot.dopravni.cz → username: "Barat70671"
 * - agata.stovickova@mot.sps-dopravni.cz → username: "agata.stovickova"
 */
export function parseEmail(email: string): ParsedEmail {
  // Normalize email (trim and lowercase)
  const normalizedEmail = email.trim().toLowerCase();

  // Check if email matches any valid domain
  const matchedDomain = VALID_DOMAINS.find(domain =>
    normalizedEmail.endsWith(domain.toLowerCase())
  );

  if (!matchedDomain) {
    return {
      username: '',
      email: normalizedEmail,
      domain: '',
      isValid: false,
    };
  }

  // Extract username (part before @)
  const atIndex = normalizedEmail.indexOf('@');
  if (atIndex === -1) {
    return {
      username: '',
      email: normalizedEmail,
      domain: '',
      isValid: false,
    };
  }

  const username = normalizedEmail.substring(0, atIndex);

  // Validate username format (alphanumeric, dots, hyphens)
  const isValidUsername = /^[a-z0-9._-]+$/.test(username);

  return {
    username,
    email: normalizedEmail,
    domain: matchedDomain.toLowerCase(),
    isValid: isValidUsername && username.length > 0,
  };
}

/**
 * Check if email is from valid SPŠD domain
 */
export function isValidSPSDEmail(email: string): boolean {
  const parsed = parseEmail(email);
  return parsed.isValid;
}

/**
 * Extract just the username from email
 * Returns null if invalid
 */
export function extractUsername(email: string): string | null {
  const parsed = parseEmail(email);
  return parsed.isValid ? parsed.username : null;
}

/**
 * Validate and normalize email
 * Throws error if invalid
 */
export function validateAndNormalize(email: string): {
  username: string;
  email: string;
  domain: string;
} {
  const parsed = parseEmail(email);

  if (!parsed.isValid) {
    throw new Error(
      'Neplatný email. Použijte školní email s doménou @sps-mot.dopravni.cz nebo @mot.sps-dopravni.cz'
    );
  }

  return {
    username: parsed.username,
    email: parsed.email,
    domain: parsed.domain,
  };
}

/**
 * Get display name from email
 * Converts "agata.stovickova" → "Agata Stovickova"
 */
export function getDisplayName(email: string): string {
  const parsed = parseEmail(email);
  if (!parsed.isValid) return email;

  // Split by dots and hyphens
  const parts = parsed.username.split(/[._-]/);

  // Capitalize each part
  const capitalized = parts.map(part => {
    // Keep numbers as is (e.g., "70671")
    if (/^\d+$/.test(part)) return part;

    // Capitalize first letter
    return part.charAt(0).toUpperCase() + part.slice(1);
  });

  return capitalized.join(' ');
}
