export const validateIP = (
  value: string
): { isValid: boolean; message: string } => {
  // IPv4 regex
  const ipv4Regex =
    /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

  // IPv6 regex (simplified)
  const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;

  if (ipv4Regex.test(value) || ipv6Regex.test(value)) {
    return { isValid: true, message: "" };
  }

  return {
    isValid: false,
    message: "Please enter a valid IPv4 (e.g., 192.168.1.1) or IPv6 address",
  };
};

export const validateNumberRange = (
  value: string,
  min: number,
  max: number
): { isValid: boolean; message: string } => {
  // Check if value contains a decimal point
  if (value.includes(".")) {
    return { isValid: false, message: "Decimal values are not allowed" };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: "Please enter a valid number" };
  }
  if (numValue < min || numValue > max) {
    return {
      isValid: false,
      message: `Value must be between ${min} and ${max}`,
    };
  }
  return { isValid: true, message: "" };
};

export const validatePhoneNumber = (
  value: string
): { isValid: boolean; message: string } => {
  // Phone number regex for +966XXXXXXXXX
  const phoneRegex = /^\+966\d{9}$/;

  if (phoneRegex.test(value)) {
    return { isValid: true, message: "" };
  }

  return {
    isValid: false,
    message:
      "Please enter a valid phone number in the format +966XXXXXXXXX (e.g., +966777888777)",
  };
};

// Add more validation functions here as needed
export const validations = {
  ip: validateIP,
  numberRange: validateNumberRange,
  phoneNumber: validatePhoneNumber,
  // Add other field validations here
};
