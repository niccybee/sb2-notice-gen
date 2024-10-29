<template>
  <div class="space-y-6">
    <!-- Print Preview -->
    <div class="bg-white p-6 rounded-lg shadow-lg">
      <h2 class="text-xl font-semibold mb-4">Print Preview</h2>
      <div class="bg-gray-100 p-4 rounded" ref="printPreview">
        <img v-if="svgOutput" :src="svgOutput" alt="Print Preview" class="w-full" />
      </div>
    </div>

    <!-- Digital Preview -->
    <div class="bg-white p-6 rounded-lg shadow-lg">
      <h2 class="text-xl font-semibold mb-4">Digital Preview</h2>
      <div class="prose max-w-none">
        <h3>{{ notice.title }}</h3>
        <p class="text-gray-600">{{ formattedDate }}</p>
        <p class="text-gray-600">{{ notice.location }}</p>
        <div class="mt-4 whitespace-pre-wrap">{{ notice.content }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useNoticeStore } from '~/stores/notice'
import satori from 'satori'
import { html } from 'satori-html'

const noticeStore = useNoticeStore()
const notice = computed(() => noticeStore.notice)
const printPreview = ref(null)
const svgOutput = ref(null)

const formattedDate = computed(() => {
  if (!notice.value.date) return ''
  return new Date(notice.value.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

// Load Inter font
const fontData = ref(null)
onMounted(async () => {
  try {
    const response = await fetch('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap')
    fontData.value = await response.arrayBuffer()
  } catch (error) {
    console.error('Failed to load font:', error)
  }
})

// Generate SVG preview
watch([notice, fontData], async () => {
  if (!notice.value.title || !fontData.value) return

  try {
    const markup = html(`
      <div style="display: flex; flex-direction: column; padding: 32px; width: 100%; background: white;">
        <h1 style="font-size: 24px; margin-bottom: 16px;">${notice.value.title}</h1>
        <p style="color: #666; margin-bottom: 8px;">${formattedDate.value}</p>
        <p style="color: #666; margin-bottom: 16px;">${notice.value.location}</p>
        <div style="white-space: pre-wrap;">${notice.value.content}</div>
      </div>
    `)

    const svg = await satori(markup, {
      width: 600,
      height: 800,
      fonts: [
        {
          name: 'Inter',
          data: fontData.value,
          weight: 400,
          style: 'normal'
        }
      ]
    })

    svgOutput.value = `data:image/svg+xml;base64,${btoa(svg)}`
  } catch (error) {
    console.error('Failed to generate SVG:', error)
  }
}, { deep: true })
</script>