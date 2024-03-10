export class AuthResponse {
  token: string
  error?: string

  constructor(token: string, error?: string) {
    this.token = token
    this.error = error
  }
}
