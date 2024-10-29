<template>
  <div class="bg-white p-6 rounded-lg shadow-lg">
    <h2 class="text-xl font-semibold mb-6">Enter Notice Details</h2>
    <form @submit.prevent="submitForm" class="space-y-4">
      <div class="space-y-2">
        <label class="block text-sm font-medium">Classification</label>
        <select v-model="notice.classification" class="w-full p-2 border rounded">
          <option value="tribute">Tribute</option>
          <option value="marketplace">Marketplace</option>
        </select>
      </div>

      <div class="space-y-2">
        <label class="block text-sm font-medium">Notice Type</label>
        <select v-model="notice.type" class="w-full p-2 border rounded">
          <option v-if="notice.classification === 'tribute'" value="death">Death Notice</option>
          <option v-if="notice.classification === 'tribute'" value="funeral">Funeral Notice</option>
          <option v-if="notice.classification === 'marketplace'" value="car">Car Sale</option>
          <option v-if="notice.classification === 'marketplace'" value="house">House Sale</option>
        </select>
      </div>

      <div class="space-y-2">
        <label class="block text-sm font-medium">Title</label>
        <input v-model="notice.title" type="text" class="w-full p-2 border rounded" />
      </div>

      <div class="space-y-2">
        <label class="block text-sm font-medium">Date</label>
        <input v-model="notice.date" type="date" class="w-full p-2 border rounded" />
      </div>

      <div class="space-y-2">
        <label class="block text-sm font-medium">Location</label>
        <input v-model="notice.location" type="text" class="w-full p-2 border rounded" />
      </div>

      <div class="space-y-2">
        <label class="block text-sm font-medium">Content</label>
        <textarea v-model="notice.content" rows="4" class="w-full p-2 border rounded"></textarea>
      </div>

      <button type="submit" class="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
        Generate Notice
      </button>
    </form>
  </div>
</template>

<script setup>
import { useNoticeStore } from '~/stores/notice'

const noticeStore = useNoticeStore()
const notice = ref({
  classification: 'tribute',
  type: 'death',
  title: '',
  date: '',
  location: '',
  content: ''
})

const submitForm = () => {
  noticeStore.updateNotice({ ...notice.value })
}
</script>