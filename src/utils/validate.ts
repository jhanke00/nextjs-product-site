export function validateInput(userData: {
  phoneNumber: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}): { error: string } | null {
  // Basic validation for demonstration purposes.
  // Replace with more comprehensive validation based on your requirements.
  if (!userData.phoneNumber || !userData.email || !userData.password || !userData.firstName || !userData.lastName) {
    return { error: 'All fields are required' };
  }

  // Basic email validation (improve with a more robust regex)
  if (!/\S+@\S+\.\S+/.test(userData.email)) {
    return { error: 'Invalid email format' };
  }

  // Basic password validation (improve with password strength checks)
  if (userData.password.length < 8) {
    return { error: 'Password must be at least 8 characters long' };
  }

  return null; // Validation passed
}
