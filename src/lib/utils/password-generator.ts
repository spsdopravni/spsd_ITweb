/**
 * Password Generator Utility
 * Generates secure random passwords for first-time Microsoft OAuth users
 */

export interface PasswordGeneratorOptions {
  length?: number;
  includeUppercase?: boolean;
  includeLowercase?: boolean;
  includeNumbers?: boolean;
  includeSymbols?: boolean;
  excludeSimilar?: boolean; // Exclude similar chars like i, l, 1, L, o, 0, O
}

const UPPERCASE = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijkmnpqrstuvwxyz';
const NUMBERS = '23456789';
const SYMBOLS = '!@#$%&*+=?';

// All characters without similar ones
const UPPERCASE_NO_SIMILAR = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
const LOWERCASE_NO_SIMILAR = 'abcdefghijkmnpqrstuvwxyz';
const NUMBERS_NO_SIMILAR = '23456789';

/**
 * Generate a secure random password
 * Default: 16 chars, mixed case, numbers, symbols
 */
export function generatePassword(options: PasswordGeneratorOptions = {}): string {
  const {
    length = 16,
    includeUppercase = true,
    includeLowercase = true,
    includeNumbers = true,
    includeSymbols = true,
    excludeSimilar = true,
  } = options;

  let charset = '';
  const requiredChars: string[] = [];

  // Build charset and ensure at least one of each required type
  if (includeUppercase) {
    const upper = excludeSimilar ? UPPERCASE_NO_SIMILAR : UPPERCASE;
    charset += upper;
    requiredChars.push(upper[Math.floor(Math.random() * upper.length)]);
  }

  if (includeLowercase) {
    const lower = excludeSimilar ? LOWERCASE_NO_SIMILAR : LOWERCASE;
    charset += lower;
    requiredChars.push(lower[Math.floor(Math.random() * lower.length)]);
  }

  if (includeNumbers) {
    const nums = excludeSimilar ? NUMBERS_NO_SIMILAR : NUMBERS;
    charset += nums;
    requiredChars.push(nums[Math.floor(Math.random() * nums.length)]);
  }

  if (includeSymbols) {
    charset += SYMBOLS;
    requiredChars.push(SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]);
  }

  if (charset.length === 0) {
    throw new Error('At least one character type must be enabled');
  }

  // Generate remaining characters
  const remainingLength = length - requiredChars.length;
  const randomChars: string[] = [];

  for (let i = 0; i < remainingLength; i++) {
    randomChars.push(charset[Math.floor(Math.random() * charset.length)]);
  }

  // Combine and shuffle all characters
  const allChars = [...requiredChars, ...randomChars];
  const shuffled = shuffleArray(allChars);

  return shuffled.join('');
}

/**
 * Fisher-Yates shuffle algorithm
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Generate a user-friendly password
 * Easier to remember: 12 chars, no symbols, no similar chars
 */
export function generateFriendlyPassword(): string {
  return generatePassword({
    length: 12,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: false,
    excludeSimilar: true,
  });
}

/**
 * Generate a highly secure password
 * Maximum security: 20 chars, all character types
 */
export function generateSecurePassword(): string {
  return generatePassword({
    length: 20,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
    excludeSimilar: true,
  });
}

/**
 * Check password strength
 * Returns: weak, medium, strong, very-strong
 */
export function checkPasswordStrength(password: string): {
  strength: 'weak' | 'medium' | 'strong' | 'very-strong';
  score: number;
} {
  let score = 0;

  // Length check
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;

  // Character variety
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^a-zA-Z0-9]/.test(password)) score += 1;

  // Determine strength
  let strength: 'weak' | 'medium' | 'strong' | 'very-strong';
  if (score <= 3) strength = 'weak';
  else if (score <= 5) strength = 'medium';
  else if (score <= 6) strength = 'strong';
  else strength = 'very-strong';

  return { strength, score };
}
