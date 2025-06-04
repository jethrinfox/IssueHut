/**
 * Creates a custom error class with the given name.
 *
 * @param name The name of the error class
 * @returns A factory function that creates instances of the custom error
 */
export function createErrorClass(name: string) {
  return function createError(message: string) {
    const error = new Error(message)
    error.name = name

    // Capture stack trace, excluding the factory function call
    Error.captureStackTrace(error, createError)

    return error
  }
}

// Create common error types
export const LoginError = createErrorClass("LoginError")
