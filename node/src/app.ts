import { execSync } from 'child_process'
import pathOS from 'path'
import fs from 'fs'
import ora from 'ora'
import minimist from 'minimist'
import { BEGIN_HADER, END_HADER } from './utils'

class Header {
    text = ''

    constructor() {
        this.text = BEGIN_HADER
    }

    addXXX() {
        1
    }

    toString() {
        return this.text + END_HADER
    }
}

function openFile(path: string) {
    const realPath = pathOS.resolve(process.cwd(), path)
    const file = fs.readFileSync(realPath, 'utf8')

    return file
}

export const run = async () => {
    console.log(process.cwd())
    const args = minimist(process.argv.slice(2))

    if (!args.f) throw Error('Need file path: -f file')
    const file = openFile(args.f)

    const spinner = ora().start('await ls...')
    const res = execSync('sleep 2; ls -la' /*, { stdio: 'inherit' }*/).toString('utf-8')
    spinner.stop()
    console.log(res)
}
