export default class AppError extends Error {
  constructor(message, targetError) {
    super(message);
    this.targetError = targetError;
  }

  toString() {
    return `App Error: msg ${this.message} targetError ${this.targetError}`;
  }
}
