import { stat, cp } from 'fs/promises'
import { FileError, checkPathForExistence } from './utils.js'
import { FOLDER_COPY_NAME_NEW, FS_PATH } from './constants.js'

export const copy = async () => {
  const { error: errorOldFile } = await checkPathForExistence(FS_PATH)

  const { error: errorNewFile } = await checkPathForExistence(
    FOLDER_COPY_NAME_NEW,
    false,
  )

  if (errorOldFile || errorNewFile) {
    throw new FileError(errorOldFile || errorNewFile)
  }

  let stats
  try {
    stats = await stat(FS_PATH)
  } catch (error) {
    throw new FileError()
  }

  if (stats.isDirectory()) {
    try {
      await cp(FS_PATH, FOLDER_COPY_NAME_NEW, { recursive: true })
    } catch (error) {
      throw new FileError('Error occured with copy.')
    }
  } else {
    throw new FileError('File is not a folder.')
  }
}

copy()
