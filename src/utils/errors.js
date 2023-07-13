export class ApiError extends Error {
  constructor (error = { message: 'API Error', code: 500 }) {
    super(error.message)
    this.message = error.message
    this.code = error.code
  }
}
