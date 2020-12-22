import axios from 'axios'

export const net = axios.create({
  timeout: 6000,
  headers: {
    'Content-type': 'application/json',
  },
})
