'use strict'

const path = require('path')
const util = require('util')
const childProcess = require('child_process')

const PACKAGES_FOLDER = path.resolve(__dirname, '../../..')

const exec = util.promisify(childProcess.exec)

const packages = [
  'app-web'
]

async function main () {
  try {
    process.chdir(PACKAGES_FOLDER)
    console.log(`Building the following packages: ${packages.join(', ')}`)

    await Promise.all(
      packages.map(p => exec(`npm --prefix ${p} run build`))
    )

    console.log('Successfully build the packages!')
  } catch (err) {
    console.error(err)
  }
}

main()
