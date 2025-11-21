<template>
  <div class="pagination" v-if="totalPages > 0">
    <button
      class="pagination-btn pagination-prev"
      :disabled="currentPage === 1"
      @click="goToPage(currentPage - 1)"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M10 12L6 8L10 4" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>

    <button
      v-for="page in visiblePages"
      :key="page"
      class="pagination-btn"
      :class="{ active: page === currentPage }"
      @click="goToPage(page)"
    >
      {{ page }}
    </button>

    <button
      class="pagination-btn pagination-next"
      :disabled="currentPage === totalPages"
      @click="goToPage(currentPage + 1)"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
    default: 1
  },
  totalItems: {
    type: Number,
    required: true,
    default: 0
  },
  itemsPerPage: {
    type: Number,
    default: 12
  },
  maxVisiblePages: {
    type: Number,
    default: 5
  }
})

const emit = defineEmits(['page-change'])

// Вычисляем общее количество страниц
const totalPages = computed(() => {
  return Math.ceil(props.totalItems / props.itemsPerPage)
})

// Вычисляем видимые страницы для пагинации
const visiblePages = computed(() => {
  const pages = []
  const half = Math.floor(props.maxVisiblePages / 2)
  let start = Math.max(1, props.currentPage - half)
  let end = Math.min(totalPages.value, start + props.maxVisiblePages - 1)

  if (end - start + 1 < props.maxVisiblePages) {
    start = Math.max(1, end - props.maxVisiblePages + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})

// Переход на конкретную страницу
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value && page !== props.currentPage) {
    emit('page-change', page)
  }
}
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.pagination-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  height: 40px;
  padding: 0 12px;
  border-radius: 8px;
  background: white;
  color: #515A85;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pagination-btn.active {
  background: #2044F7;
  border-color: #2044F7;
  color: white;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-btn.active {
  background: #2044F7;
  border-color: #2044F7;
  color: white;
}

.pagination-prev,
.pagination-next {
  padding: 0 8px;
}

.pagination-btn.active {
  background: #2044F7;
  color: white;
}

.pagination-prev {
    background: var(--bg-dark);
}

.pagination-next {
  background: #2044F7;
}

.pagination-btn.pagination-next:not(:disabled) svg path {
  stroke: white;
}

.pagination-btn.pagination-next:not(:disabled) {
  background: #2044F7;
  color: white;
}
</style>
