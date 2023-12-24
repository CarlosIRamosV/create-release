import * as core from '@actions/core'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    // Print a message to the info stream.
    core.info('Hello, world!')
    core.debug('Debugging')
    core.warning('Warning')
    console.log('Hello, world!')
    core.error('Error')
    core.setFailed('Failure')
    core.setCommandEcho(true)
    console.log('Hello, world!')
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}
