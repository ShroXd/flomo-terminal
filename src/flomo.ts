import inquirer from 'inquirer'
import { readConfig, writeConfig } from './db'
import { apiPrompt, contentPrompt, print } from './helper'
import { net } from './network'

export async function send() {
  const API = await fetchAPI()

  const message = await inquirer.prompt(contentPrompt)
  const res = await net.post(API, {
    params: {
      content: message.content,
    },
  })
  print(res.data.message, 'success')
}

export async function fetchAPI(value?: any) {
  const conf = await readConfig()
  if (conf) {
    print((conf as any)?.api || '未设定', 'info')
    return conf
  } else {
    if (value?.length !== 0) {
      writeConfig('api', value[0])
      return value
    } else {
      const message = await inquirer.prompt(apiPrompt)
      writeConfig('api', message.api)
      return message.api
    }
  }
}
