import * as core from '@actions/core'
import * as pathS from 'path'
import * as fs from 'fs'
import { getNodeVersions, isNode } from './node'
import { getRustVersions, isRust } from './rust'

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

    // Log the directory path
    core.info(`The path is ${directory}`)

    // Log files in the directory
    core.info('Files in the directory:')
    core.info(JSON.stringify(fs.readdirSync(directory), null, 2))

    if (isNode(directory)) {
      core.info('This is a Node.js project')
      core.info(`The version is ${getNodeVersions(directory)}`)
    } else if (isRust(directory)) {
      core.info('This is a Rust project')
      core.info(`The version is ${getRustVersions(directory)}`)
    } else {
      core.info('This is not a Node.js or Rust project')
    }

    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
