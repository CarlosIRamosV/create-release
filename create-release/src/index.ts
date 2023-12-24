import * as core from '@actions/core'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    core.debug('Hello world!')
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}
