export interface Step {
  id: string,
  idNext: string | null,
  idPrevious: string | null,
  isValid: boolean
}
