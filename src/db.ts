import Datastore from 'nedb-promises'
import os from 'os'
import { join } from 'path'

let configIns: Datastore | null = null

function getDB(filename: string) {
  return Datastore.create({
    filename: join(os.homedir(), `/.flomo-terminal/${filename}.db`),
    timestampData: true,
    autoload: true,
  })
}

export const getConfigIns = () => {
  if (configIns === null) {
    configIns = getDB('config')
  }
  return configIns
}

export async function readConfig(key: string) {
  const db = getConfigIns()
  return db.find({ [key]: { $exists: true } })
}

export async function writeConfig(key: string, value?: string) {
  const db = getConfigIns()
  const oldData: any = await db.find({ [key]: { $exists: true } })

  if (oldData.length === 0) {
    db.insert({
      [key]: value || '',
    })
  } else {
    db.update({ [key]: oldData[0][key] }, { $set: { [key]: value || '' } })
  }
}
