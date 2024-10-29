import { defineStore } from 'pinia'

interface Notice {
  classification: string
  type: string
  title: string
  date: string
  location: string
  content: string
}

export const useNoticeStore = defineStore('notice', {
  state: (): { notice: Notice } => ({
    notice: {
      classification: '',
      type: '',
      title: '',
      date: '',
      location: '',
      content: ''
    }
  }),
  actions: {
    updateNotice(notice: Notice) {
      this.notice = notice
    }
  }
})