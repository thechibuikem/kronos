export function checkPassword(password) {
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password); //checking if my test contains a special character
  const hasWhiteSpace = /\s/.test(password); //checking if my test contains a white space

  return hasSpecialChar && !hasWhiteSpace;
}
