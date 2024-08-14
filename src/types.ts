export interface IEventCard {
  id: number
  category: string
  title: string
  description: string
  location: string
  date: Date
  time: string
  organizer: string
}

export interface IEmail {
  id: number
  from: string
  subject: string
  body: string
  sentAt: string
  archived: boolean
  read: boolean
}

export interface IChangeEmail {
  toggleRead?: boolean
  toggleArchive?: boolean
  save?: boolean
  closeModal?: boolean
  index?: number
}
