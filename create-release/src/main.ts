import * as core from '@actions/core'
import * as pathS from 'path'
import { wait } from './wait'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    let directory = core.getInput('path')

    // If the directory path is not absolute, make it absolute
    if (!pathS.isAbsolute(directory)) {
      directory = pathS.join(process.env.GITHUB_WORKSPACE || '', directory)
    }

    // Wait for 5 seconds
    core.info('Waiting for 5 seconds...')
    await wait(5000)

    // Log the directory path
    core.info(`The path is ${directory}`)

    // Set outputs for other workflow steps to use
    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
