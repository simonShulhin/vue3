import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://my-json-server.typicode.com/Code-Pop/Real-World-Vue-3-New-Syntax',
})

export default {
  getEvents() {
    return apiClient.get('/events')
  },
  getEvent(id: string) {
    return apiClient.get(`/events/${id}`)
  },
}
