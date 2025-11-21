<template>
    <div @click="toggleSlider">
        <label class="slider-label">
          ПОЛНАЯ МОЩНОСТЬ, КВА
          <div class="dropdown-arrow" :class="{ rotated: !isOpen }"></div>
        </label>
    </div>
  <div class="range-slider-block" v-if="isOpen">
    <div class="slider-values">
      <span>От {{ min.toFixed(1) }}</span>
      <span>{{ minValue.toFixed(1) }} - {{ maxValue.toFixed(1) }}</span>
      <span>До {{ max.toFixed(0) }}</span>
    </div>
    <div class="slider-container">
      <input
        type="range"
        :min="min"
        :max="max"
        :step="step"
        v-model.number="minValue"
        class="thumb thumb-left"
      />
      <input
        type="range"
        :min="min"
        :max="max"
        :step="step"
        v-model.number="maxValue"
        class="thumb thumb-right"
      />
      <div class="track"></div>
      <div
        class="range"
        :style="{
          left: getPercent(minValue) + '%',
          width: (getPercent(maxValue) - getPercent(minValue)) + '%'
        }"
      ></div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue'

const isOpen = ref(true)

const toggleSlider = () => {
  isOpen.value = !isOpen.value
}

const min = 0.3
const max = 500
const step = 0.1

const minValue = ref(0.3)
const maxValue = ref(135)

// Ограничение чтобы ползунки не пересекались
watch(minValue, (val) => {
  if (val > maxValue.value - step) minValue.value = maxValue.value - step
})
watch(maxValue, (val) => {
  if (val < minValue.value + step) maxValue.value = minValue.value + step
})

// Подсчёт в процентах для фона заполненного трека
const getPercent = (val) => ((val - min) / (max - min)) * 100
</script>

<style scoped>
.range-slider-block {
  border-radius: 20px;
  width: 236px;
  margin: auto;
}
.slider-label {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--bg-dark);
  padding: 6px 18px;
  border-radius: 40px;
  height: 40px;
  font-size: 14px;
  margin-bottom: 12px;
  width: 275px;
  color: var(--secondary);
}
.dropdown-arrow {
  height: 9px;
  width: 14px;
  margin-left: auto;
  user-select: none;
  background: url(/public/images/arrow_slider.svg) no-repeat center center/contain;
}
.slider-values {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #6b7280;
  font-size: 15px;
  font-weight: 500;
}
.slider-container {
  position: relative;
  height: 28px;
}
input[type='range'] {
  position: absolute;
  width: 100%;
  height: 22px;
  pointer-events: none;
  -webkit-appearance: none;
  background: transparent;
  margin: 0;
  top: 10px;
}
input[type='range']::-webkit-slider-thumb {
  pointer-events: all;
  position: relative;
  z-index: 3;
  height: 15px;
  width: 15px;
  border-radius: 50%;
  background: #DCE0ED;
  outline: 7px solid #2044f7; 
  box-sizing: border-box;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -8px; 
}

input[type='range']::-moz-range-thumb {
  pointer-events: all;
  position: relative;
  z-index: 3;
  height: 22px;
  width: 22px;
  border-radius: 50%;
  border: none;
  box-sizing: border-box;
  cursor: pointer;
}

.thumb-left {
  z-index: 4;
}
.thumb-right {
  z-index: 5;
}

.track {
  position: absolute;
  height: 5px;
  width: 100%;
  background: #dce0ed;
  border-radius: 10px;
  top: 14px;
  left: 0;
  z-index: 1;
}

.range {
  position: absolute;
  height: 5px;
  background: #2044f7;
  border-radius: 10px;
  top: 14px;
  z-index: 2;
}

.dropdown-arrow {
   transition: transform 0.3s ease;
}
.rotated {
  transform: rotate(180deg);
}
</style>
