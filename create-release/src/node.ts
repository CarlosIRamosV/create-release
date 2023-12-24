import * as fs from 'fs'

function getVersions(directory: string): string {
  let file = directory + '/package.json'
  let data = fs.readFileSync(file)
  console.log(data)
  let packageJson = JSON.parse(data.toString())
  return packageJson['version']
}

export { getVersions }
