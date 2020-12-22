import { Command } from 'commander'
import pkg from '../package.json'
import { send } from './flomo'

const program = new Command(pkg.name)

program
  .command('send')
  .description('发送 MEMO')
  .action(() => {
    send()
  })

try {
  program.parse(process.argv)
} catch (err) {
  program.outputHelp()
}
