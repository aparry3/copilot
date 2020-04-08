export function titleCase(str) {
  return str.replace(/\b[a-zA-Z]/g, function(t) { return t.toUpperCase() });
}


export function normalize(str) {
  return str.replace(/-|_|\./g, ' ');
}
