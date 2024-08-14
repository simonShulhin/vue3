import axios from 'axios'
import type { IEmail } from '@/types'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
})

export default {
  getEmails() {
    return apiClient.get('/emails')
  },

  updateEmail(email: IEmail) {
    return apiClient.put(`/emails/${email.id}`, email)
  },
}
