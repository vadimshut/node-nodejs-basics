import { access } from 'fs/promises'

const errorMessage = ' FS operation failed.'

export class FileError extends Error {
  constructor(message = '') {
    super(`${errorMessage} ${message}`)
    this.name = 'FileError'
  }
}

export const checkPathForExistence = async (path, shouldExist = true) => {
  const errors = {
    false: `File ${path} has already been created`,
    true: `File ${path} does not exist`,
  }

  try {
    await access(path)
    return shouldExist
      ? { verdict: true, error: null }
      : { verdict: false, error: errors[shouldExist] }
  } catch (error) {
    return shouldExist
      ? { verdict: false, error: errors[shouldExist] }
      : { verdict: true, error: null }
  }
}
