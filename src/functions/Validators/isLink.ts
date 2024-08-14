

export function isValidURL(url:string) {
  const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  return urlPattern.test(url);
}