export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: unknown) => boolean;
  message?: string;
}

export interface FieldValidation {
  [fieldName: string]: ValidationRule;
}

export interface ValidationErrors {
  [fieldName: string]: string;
}

export function validateField(
  value: unknown,
  rules: ValidationRule,
  fieldLabel: string
): string | null {
  const strValue = String(value ?? '').trim();

  if (rules.required && !strValue) {
    return rules.message || `${fieldLabel} es obligatorio`;
  }

  if (strValue && rules.minLength && strValue.length < rules.minLength) {
    return rules.message || `${fieldLabel} debe tener al menos ${rules.minLength} caracteres`;
  }

  if (strValue && rules.maxLength && strValue.length > rules.maxLength) {
    return rules.message || `${fieldLabel} no puede exceder ${rules.maxLength} caracteres`;
  }

  if (strValue && rules.pattern && !rules.pattern.test(strValue)) {
    return rules.message || `${fieldLabel} tiene un formato invalido`;
  }

  if (rules.custom && !rules.custom(value)) {
    return rules.message || `${fieldLabel} no es valido`;
  }

  return null;
}

export function validateForm<T extends Record<string, unknown>>(
  data: T,
  validations: { [K in keyof T]?: ValidationRule },
  labels: { [K in keyof T]?: string }
): ValidationErrors {
  const errors: ValidationErrors = {};

  for (const [fieldName, rules] of Object.entries(validations)) {
    if (rules) {
      const label = labels[fieldName as keyof T] || fieldName;
      const error = validateField(data[fieldName as keyof T], rules, label);
      if (error) {
        errors[fieldName] = error;
      }
    }
  }

  return errors;
}

export function hasErrors(errors: ValidationErrors): boolean {
  return Object.keys(errors).length > 0;
}

// Common validation patterns
export const patterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  url: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
  youtubeId: /^[a-zA-Z0-9_-]{11}$/,
  time: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
};
