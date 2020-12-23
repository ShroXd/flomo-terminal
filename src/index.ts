import { Command } from 'commander'
import pkg from '../package.json'
import { changeEditor, fetchAPI, send } from './flomo'

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
    fetchAPI(cmd.args, true)
  })

program
  .command('edit')
  .description('切换编辑信息方式')
  .action(() => {
    changeEditor()
  })

try {
  program.parse(process.argv)
} catch (err) {
  program.outputHelp()
}
