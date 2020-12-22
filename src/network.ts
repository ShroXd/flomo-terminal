import axios from 'axios'

export const net = axios.create({
  timeout: 1000,
  headers: {
    'Content-type': 'application/json',
  },
})
