export function validateEmptyField(field: string): boolean {
  if (!field.trim()) {
    return false
  }

  return true
}
