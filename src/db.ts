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

export async function readConfig() {
  const db = getConfigIns()
  return db.findOne({})
}

export function writeConfig(key: string, value?: string) {
  const db = getConfigIns()
  db.insert({
    [key]: value || '',
  })
}
