import * as core from '@actions/core'
import * as path from 'path'
import { wait } from './wait'
import * as fs from 'fs'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    // Print out the current working directory
    core.debug(`Current working directory: ${path.resolve()}`)

    // Print out the contents of the workspace directory
    const workspaceDir: string = process.env['GITHUB_WORKSPACE'] || ''
    core.debug(`Current workspace directory: ${workspaceDir}`)
    core.debug(`Current workspace contents:`)
    core.debug(JSON.stringify(fs.readdirSync(workspaceDir)))
    console.log(`Current workspace contents: ${fs.readdirSync(workspaceDir)}`)

    // Check the type of package to create

    const ms: string = core.getInput('milliseconds')

    // Debug logs are only output if the `ACTIONS_STEP_DEBUG` secret is true
    core.debug(`Waiting ${ms} milliseconds ...`)

    // Log the current timestamp, wait, then log the new timestamp
    core.debug(new Date().toTimeString())
    await wait(parseInt(ms, 10))
    core.debug(new Date().toTimeString())

    // Set outputs for other workflow steps to use
    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
