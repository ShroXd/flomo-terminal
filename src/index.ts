import { Command } from 'commander'
import pkg from '../package.json'
import { fetchAPI, send } from './flomo'

const program = new Command(pkg.name)

program
  .command('send')
  .description('发送 MEMO')
  .action(() => {
    send()
  })

program
  .command('api')
  .description('设置 / 查看 API')
  .action((cmd: any) => {
    fetchAPI(cmd.args)
  })

try {
  program.parse(process.argv)
} catch (err) {
  program.outputHelp()
}
