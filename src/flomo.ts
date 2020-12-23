import inquirer from 'inquirer'
import { readConfig, writeConfig } from './db'
import {
  apiPrompt,
  editorPrompt,
  editType,
  editTypeInformation,
  print,
  terminal,
} from './helper'
import { net } from './network'

export async function send() {
  const API = await fetchAPI()
  const edit = await fetchEditType()
  const prompt = parseEditType(edit)

  const message = await inquirer.prompt(prompt)

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
  if (value && value.length !== 0) {
    writeConfig('api', value[0])
    return value
  }

  const config: any = await readConfig('api')
  if (config) {
    if (isShow) print(config[0].api, 'info')
    return config[0].api
  } else {
    const message = await inquirer.prompt(apiPrompt)
    writeConfig('api', message.api)
    return message.api
  }
}

export async function changeEditor() {
  const select = await inquirer.prompt(editorPrompt)
  writeConfig('editor', select.editor)
}

export async function fetchEditType() {
  const config: any = await readConfig('editor')
  if (config) {
    return config[0].editor
  } else {
    return editTypeInformation[0]
  }
}

function parseEditType(edit: string) {
  const idx = editTypeInformation.indexOf(edit)
  return editType[idx]
}
