<template>
  <div class="zoomable-map">
    <div class="map-controls">
      <button @click="zoomIn" :disabled="zoom >= 18" class="zoom-btn">
        <span>+</span>
      </button>
      <button @click="zoomOut" :disabled="zoom <= 1" class="zoom-btn">
        <span>-</span>
      </button>
      <span class="zoom-level">Масштаб: {{ zoom }}</span>
    </div>
    <div class="map-container">
      <img 
        :src="mapUrl" 
        alt="Интерактивная карта" 
        class="map-image" 
        :class="{ 'grabbing': isDragging }"
        @load="onLoad" 
        @error="onError"
        @mousedown="onMouseDown"
        @mousemove="onMouseMove"
        @mouseup="onMouseUp"
        @mouseleave="onMouseUp"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
        @touchcancel="onTouchEnd"
        @dragstart.prevent
      />
      <div class="local"></div>
    </div>
    <div v-if="error" class="error">Ошибка загрузки</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const runtimeConfig = useRuntimeConfig()
const apiKey = runtimeConfig.public.yandexStaticApiKey

const props = defineProps({
  initialCoords: {
    type: Array,
    default: () => [55.012068, 82.933060]
  },
  mobileCoords: {
    type: Array,
    default: () => [55.012068, 82.933060]
  },
  pointCoords: {
    type: Array,
    default: () => [55.012068, 82.933060]
  },
  initialZoom: {
    type: Number,
    default: 13
  },
  width: {
    type: Number,
    default: 600
  },
  height: {
    type: Number,
    default: 400
  }
})

const zoom = ref(props.initialZoom)
const coords = ref(props.initialCoords)
const point = ref(props.pointCoords)
const loading = ref(true)
const error = ref(false)

// Переменные для перемещения
const isDragging = ref(false)
const startX = ref(0)
const startY = ref(0)
const startCoords = ref([0, 0])

const mapUrl = computed(() => {
  const params = new URLSearchParams({
    l: 'map',
    ll: coords.value.join(','),
    z: zoom.value.toString(),
    size: `${props.width},${props.height}`,
    pt: `${point.value.join(',')},vkbkm`,
  })
  if (apiKey) {
    params.append('apikey', apiKey)
    return `https://static-maps.yandex.ru/v1?${params.toString()}`
  }
  return `https://static-maps.yandex.ru/1.x/?${params.toString()}`
})

// Функции для перемещения карты
const startDrag = (clientX, clientY) => {
  isDragging.value = true
  startX.value = clientX
  startY.value = clientY
  startCoords.value = [...coords.value]
}

const duringDrag = (clientX, clientY) => {
  if (!isDragging.value) return
  
  const deltaX = clientX - startX.value
  const deltaY = clientY - startY.value
  
  const sensitivity = 0.00001 * (18 - zoom.value)

  coords.value = [
    startCoords.value[0] - deltaX * sensitivity, 
    startCoords.value[1] + deltaY * sensitivity 
  ]
}

const endDrag = () => {
  isDragging.value = false
}

// Обработчики для мыши
const onMouseDown = (event) => {
  startDrag(event.clientX, event.clientY)
}

const onMouseMove = (event) => {
  duringDrag(event.clientX, event.clientY)
}

const onMouseUp = () => {
  endDrag()
}

// Обработчики для touch-устройств
const onTouchStart = (event) => {
  if (event.touches.length === 1) {
    startDrag(event.touches[0].clientX, event.touches[0].clientY)
  }
}

const onTouchMove = (event) => {
  if (event.touches.length === 1) {
    duringDrag(event.touches[0].clientX, event.touches[0].clientY)
    event.preventDefault()
  }
}

const onTouchEnd = () => {
  endDrag()
}


const zoomIn = () => {
  if (zoom.value < 18) {
    zoom.value++
    loading.value = true
  }
}

const zoomOut = () => {
  if (zoom.value > 1) {
    zoom.value--
    loading.value = true
  }
}

const onLoad = () => {
  loading.value = false
  error.value = false
}

const onError = () => {
  error.value = true
  loading.value = false
}

const handleKeyPress = (event) => {
  if (event.key === '+' || event.key === '=') zoomIn()
  if (event.key === '-') zoomOut()
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyPress)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyPress)
})
</script>

<style scoped>
.zoomable-map {
  position: relative;
  display: inline-block;
}

.map-container {
  width: 850px;
  height: 629px;
}

img {
  padding: 0;
}

.local {
  background: url(/public/images/address1.svg) no-repeat top;
  background-size: contain;
  position: absolute;
  right: 52px;
  bottom: 20px;
  width: 384px;
  height: 82px;
}

.map-controls {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.9);
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.zoom-btn {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: #fff;
  color: #333;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.zoom-btn:hover:not(:disabled) {
  background: #f0f0f0;
  transform: scale(1.1);
}

.zoom-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.zoom-level {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.map-image {
  display: block;
  border-radius: 12px;
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: grab;
  touch-action: none; 
  user-select: none;
}

.error {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 16px 24px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 8px;
  font-weight: 500;
}

.error {
  color: #d93025;
  background: rgba(255, 235, 235, 0.95);
}

@media (max-width:1280px) {
   .map-container{
        width: 100%
    }
}

@media (max-width: 1024px) {
    .local {
      width: 280px;
      height: 66px;
      margin: auto;
      left: 50%;
      transform: translate(-50%, 0);
  }
}

@media (max-width: 768px) {
  .map-controls {
    top: 10px;
    right: 10px;
    padding: 8px;
  }

  .zoom-btn {
    width: 35px;
    height: 35px;
    font-size: 18px;
  }

  .zoom-level {
    font-size: 12px;
  }

  @media (max-width: 380px) {
     .local {
        height: 62px;
    }
  }
}
</style>