export function validateName(name, fieldLabel = "This field") {
  if (!name || !name.trim()) {
    return `${fieldLabel} is required.`;
  }
  if (!/^[A-Za-z\s'-]+$/.test(name.trim())) {
    return `${fieldLabel} can only contain letters, spaces, and hyphens.`;
  }
  return null;
}

export function validateEmail(email) {
  if (!email || !email.trim()) {
    return "Email address is required.";
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.trim())) {
    return "Please enter a valid email address.";
  }
  return null;
}

export function validatePassword(password) {
  if (!password) {
    return "Password is required.";
  }
  if (password.length < 6) {
    return "Password must be at least 6 characters.";
  }
  if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
    return "Password must contain at least one letter and one number.";
  }
  return null;
}

export function validateIdNumber(idNumber) {
  if (!idNumber || !idNumber.trim()) {
    return "ID number is required.";
  }
  const cleaned = idNumber.trim();
  if (!/^\d{13}$/.test(cleaned)) {
    return "ID number must be exactly 13 digits.";
  }

  const yy = parseInt(cleaned.substring(0, 2), 10);
  const mm = parseInt(cleaned.substring(2, 4), 10);
  const dd = parseInt(cleaned.substring(4, 6), 10);
  if (mm < 1 || mm > 12 || dd < 1 || dd > 31) {
    return "ID number does not contain a valid date of birth.";
  }

  return null;
}

export function validateContactNumber(contactNumber) {
  if (!contactNumber || !contactNumber.trim()) {
    return "Contact number is required.";
  }
  const cleaned = contactNumber.trim();
  if (!/^0\d{9}$/.test(cleaned) && !/^\+27\d{9}$/.test(cleaned)) {
    return "Enter a valid South African number (e.g. 0821234567).";
  }
  return null;
}

export function validatePasswordsMatch(password, confirmPassword) {
  if (password !== confirmPassword) {
    return "Passwords do not match.";
  }
  return null;
}
