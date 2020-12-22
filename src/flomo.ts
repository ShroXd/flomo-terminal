import inquirer from 'inquirer'
import { readConfig, writeConfig } from './db'
import { apiPrompt, contentPrompt, print } from './helper'
import { net } from './network'

export async function send() {
  const API = await fetchAPI()

  const message = await inquirer.prompt(contentPrompt)

  try {
    const res = await net.post(
      API,
      JSON.stringify({
        content: message.content,
      })
    )
    print(res?.data.message, 'success')
  } catch (err) {
    print(err, 'error')
  }
}

export async function fetchAPI(value?: any, isShow?: boolean) {
  const conf: any = await readConfig()
  if (conf) {
    if (isShow) {
      print(conf.api || '未设定', 'info')
    }
    return conf.api
  } else {
    if (value && value.length !== 0) {
      writeConfig('api', value[0])
      return value
    } else {
      const message = await inquirer.prompt(apiPrompt)
      writeConfig('api', message.api)
      return message.api
    }
  }
}
