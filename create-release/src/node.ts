import * as fs from 'fs'

/**
 * Get the version of the package in the given directory.
 * @param {string} directory The directory to look for the package.json file.
 * @returns {string} The version of the package.
 */
function getVersions(directory: string): string {
  let file = directory + '/package.json'
  let data = fs.readFileSync(file)
  let packageJson = JSON.parse(data.toString())
  return packageJson['version']
}

/**
 * Check if the given directory is a Node.js project.
 * @param directory The directory to check.
 * @returns {boolean} True if the directory is a Node.js project, false otherwise.
 */
function isNode(directory: string): boolean {
  return fs.existsSync(directory + '/package.json')
}

function getNodeVersions(directory: string): string {
  if (isNode(directory)) {
    return getVersions(directory)
  } else {
    return ''
  }
}

export { getNodeVersions }
