import chalk from 'chalk'
import fse from 'fs-extra'
import path from 'path'
import { execSync } from 'child_process'
import constants from '../constants'

const { blue, bold, cyan } = chalk

const createEslintConfiguration = async (framework: string) => {
  console.info(
    cyan(
      `Sir, ${blue(
        bold(`${constants.username}`)
      )}... 🙋🏻 one second and you will find eslint configured in your project.. so relax and 🤌🏻`
    )
  )

  // path of the tsconfig in your project
  const eslintignore: string = path.join(process.cwd(), '.eslintignore')

  if (framework === 'node') {
    await execSync(
      'npm install --save-dev eslint@^8.4.1 eslint-config-prettier@^8.3.0 eslint-plugin-prettier@^4.0.0 eslint-config-airbnb-base@^15.0.0 eslint-plugin-import@^2.25.3 @typescript-eslint/eslint-plugin@^5.6.0 @typescript-eslint/parser@^5.6.0'
    )
    const eslintjs: string = path.join(process.cwd(), '.eslintrc.js')
    const configFolderPath = path.join(constants.appRoot, 'config')
    const eslintConfigBuffer: Buffer = await fse.readFile(
      path.join(configFolderPath, 'eslintrc.js')
    )
    await fse.writeFile(eslintjs, eslintConfigBuffer.toString())
  }
  await fse.writeFile(eslintignore, 'node_modules\nbuild')
  await execSync('npm set-script lint "eslint . --ext .ts"')

  console.log(
    blue(
      `😋😋 Sir, ${blue(bold(`${constants.username}`))}... ✅ eslint successfully configured 😋😋`
    )
  )
}

export default createEslintConfiguration
