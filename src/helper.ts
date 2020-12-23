type messageType = 'success' | 'warning' | 'error' | 'info'
enum messageColor {
  'success' = '\x1b[32m',
  'warning' = '\x1b[33m',
  'error' = '\x1b[31m',
  'info' = '\x1b[37m',
}

const needValue = (s: string) => s.length > 0 || '内容不能为空！'

export const terminal = [
  {
    type: 'input',
    name: 'content',
    message: '现在的想法是：\n\n  ',
    validate: needValue,
  },
]

export const editor = [
  {
    type: 'editor',
    name: 'content',
    message: '开始记录想法：\n\n  ',
    validate: needValue,
  },
]

export const apiPrompt = [
  {
    type: 'input',
    name: 'api',
    message: '请输入您的 API：',
    validate: needValue,
  },
]

export const editType = [terminal, editor]
export const editTypeInformation = ['命令行内编辑', '使用编辑器']

export const editorPrompt = [
  {
    type: 'list',
    name: 'editor',
    message: '请选择您的编辑方式',
    choices: editTypeInformation,
  },
]

export const print = (msg: string, type: messageType): void => {
  // tslint:disable-next-line: no-console
  console.info(messageColor[type], '\n' + msg + '\n')
}
