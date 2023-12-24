import * as fs from 'fs'
import * as toml from 'toml'

function isRust(directory: string): boolean {
  return fs.existsSync(directory + '/Cargo.toml')
}

function getRustVersions(directory: string): string {
  let file = directory + '/Cargo.toml'
  let data = fs.readFileSync(file)
  let cargoToml = toml.parse(data.toString())
  return cargoToml['package']['version']
}

export { getRustVersions, isRust }
