import child_process from 'child_process'
import ora from 'ora'

export const run = async () => {
    const spinner = ora().start('await ls...')
    const res = child_process.execSync('sleep 2; ls -la' /*, { stdio: 'inherit' }*/).toString('utf-8')
    spinner.stop()
    console.log(res)
}
