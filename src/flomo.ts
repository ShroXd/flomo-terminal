import inquirer from 'inquirer'
import { net } from './network'

export async function send() {
  const info = [
    {
      type: 'input',
      name: 'content',
      message: '现在的想法是: ',
      validate: (content: string) => content.length > 0 || '内容不能为空！',
    },
  ]

  const message = await inquirer.prompt(info)
  const res = await net.post('/', {
    params: {
      content: message.content,
    },
  })
  // tslint:disable-next-line: no-console
  console.info(res.data.message)
}
