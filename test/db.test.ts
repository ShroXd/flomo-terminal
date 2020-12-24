import os from 'os'
import fs from 'fs'
import { join } from 'path'
import { getConfigIns, readConfig, writeConfig } from '../src/db'

function path(file: string) {
  return join(os.homedir(), `/.flomo-terminal/${file}.db`)
}

function copy(source: string, target: string) {
  fs.createReadStream(source).pipe(fs.createWriteStream(target))
}

describe('check db function', () => {
  beforeEach(() => {
    copy(path('config'), path('config.test'))
  })

  afterEach(() => {
    fs.unlinkSync(path('config'))
    copy(path('config.test'), path('config'))
    fs.unlinkSync(path('config.test'))
  })

  test('functions should work correctly', () => {
    expect(() => {
      writeConfig('name')
    }).not.toThrow()

    expect(() => {
      writeConfig('name', 'spike')
    }).not.toThrow()

    expect(() => {
      readConfig('name')
    }).not.toThrow()
  })

  test('getConfigIns function should cache db instance', () => {
    const ins1 = getConfigIns()
    const ins2 = getConfigIns()

    expect(ins1).toStrictEqual(ins2)
  })

  test('writeConfig function should insert & update data correctly', async () => {
    await writeConfig('age', '14')
    const data1: any = await readConfig('age')
    expect(data1.length).toBe(1)
    expect(data1[0].age).toBe('14')

    await writeConfig('age', '24')
    const data2: any = await readConfig('age')
    expect(data2.length).toBe(1)
    expect(data2[0].age).toBe('24')
  })
})
