export const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const PASSWORD_MIN_LENGTH = 8;

export const VALIDATION_RULES = {
  email: EMAIL_REGEX,
  password: { minLength: PASSWORD_MIN_LENGTH }
};