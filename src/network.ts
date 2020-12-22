import axios from 'axios'

export const net = axios.create({
  baseURL: 'https://flomoapp.com/iwh/MTQ4Nzc/8cac9dbde16d862d23d3c85f7a7c6527',
  timeout: 1000,
  headers: {
    'Content-type': 'application/json',
  },
})
