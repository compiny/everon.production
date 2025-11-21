<template>
    <div class="product-filter">
        <div class="filter-section" v-for="filter in filters" :key="filter.name">
            <div class="filter-header" @click="toggleFilter(filter.name)">
                {{ filter.name }}
                <span class="dropdown-arrow" :class="{ rotated: !openFilters[filter.name] }"></span>
            </div>

            <div v-if="openFilters[filter.name]" class="filter-content">
                <!-- Диапазонный фильтр -->
                <div v-if="filter.type === 'range'" class="range-filter">
                    <div class="range-values">
                        <span>От: {{ pendingFilters[filter.name]?.[0] ?? filter.min }}</span>
                        <span>До: {{ pendingFilters[filter.name]?.[1] ?? filter.max }}</span>
                    </div>
                    <div class="slider-container">
                        <input type="range" :min="filter.min" :max="filter.max" :step="filter.step || 1"
                            :value="pendingFilters[filter.name]?.[0] ?? filter.min"
                            @input="updateRangeFilter(filter.name, 0, $event.target.value)" class="slider" />
                        <input type="range" :min="filter.min" :max="filter.max" :step="filter.step || 1"
                            :value="pendingFilters[filter.name]?.[1] ?? filter.max"
                            @input="updateRangeFilter(filter.name, 1, $event.target.value)" class="slider" />
                        <div class="slider-track">
                            <div class="slider-range" :style="{
                                left: getPercent(pendingFilters[filter.name]?.[0] ?? filter.min, filter) + '%',
                                width: (getPercent(pendingFilters[filter.name]?.[1] ?? filter.max, filter) -
                                    getPercent(pendingFilters[filter.name]?.[0] ?? filter.min, filter)) + '%'
                            }"></div>
                        </div>
                    </div>
                </div>

                <!-- Фильтр чекбоксов -->
                <div v-else class="checkbox-filter">
                    <div v-for="value in filter.values" :key="value.value" class="checkbox-item">
                        <label class="checkbox-option">
                            <input type="checkbox" class="checkbox-input" :value="value.value"
                                :checked="isValueSelected(filter.name, value.value)"
                                @change="toggleCheckboxFilter(filter.name, value.value)" />
                            <span class="checkmark"></span>
                            {{ value.value }} ({{ value.count }})
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <div class="filter-actions">
            <button @click="applyFilters" class="apply-btn">
                Применить <span v-if="previewCount > 0">({{ previewCount }})</span>
            </button>
            <button @click="resetFilters" class="reset-btn">Сбросить</button>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, watch, computed } from 'vue'

const props = defineProps({
    filters: {
        type: Array,
        default: () => []
    },
    totalProducts: {
        type: Number,
        default: 0
    }
})

const emit = defineEmits(['filter-change', 'filter-preview'])

const openFilters = ref({})
const pendingFilters = reactive({})
const appliedFilters = reactive({})
const previewCount = ref(0)
const isLoadingPreview = ref(false)

let previewTimeout = null

// Инициализация открытых фильтров
props.filters.forEach(filter => {
    openFilters.value[filter.name] = true
})

watch(() => ({ ...pendingFilters }), async (newFilters) => {
    if (previewTimeout) {
        clearTimeout(previewTimeout)
    }
    
    previewTimeout = setTimeout(async () => {
        await loadPreviewCount(newFilters)
    }, 300)
}, { deep: true })

// Загрузка предпросмотра количества товаров
const loadPreviewCount = async (filters) => {
    if (Object.keys(filters).length === 0) {
        previewCount.value = 0
        emit('filter-preview', { 
            filters: {},
            count: 0
        })
        return
    }
    
    isLoadingPreview.value = true
    try {
        const response = await $fetch('/api/products/filter-count', {
            method: 'POST',
            body: { filters }
        })
        
        previewCount.value = response.count
        emit('filter-preview', { 
            filters: { ...filters },
            count: response.count
        })
    } catch (error) {
        console.error('Error loading preview count:', error)
        previewCount.value = 0
    } finally {
        isLoadingPreview.value = false
    }
}

// Проверка, выбран ли чекбокс
const isValueSelected = (filterName, value) => {
    return Array.isArray(pendingFilters[filterName]) && pendingFilters[filterName].includes(value)
}

// Переключение чекбокса
const toggleCheckboxFilter = (filterName, value) => {
    if (!Array.isArray(pendingFilters[filterName])) {
        pendingFilters[filterName] = []
    }
    const currentValues = pendingFilters[filterName]
    const index = currentValues.indexOf(value)
    if (index !== -1) {
        pendingFilters[filterName] = currentValues.filter(v => v !== value)
        if (pendingFilters[filterName].length === 0) {
            delete pendingFilters[filterName]
        }
    } else {
        pendingFilters[filterName] = [...currentValues, value]
    }
}

// Обновление диапазона
const updateRangeFilter = (filterName, index, value) => {
    const numericValue = parseFloat(value)
    if (!pendingFilters[filterName]) {
        pendingFilters[filterName] = [props.filters.find(f => f.name === filterName)?.min ?? 0,
        props.filters.find(f => f.name === filterName)?.max ?? 0]
    }
    pendingFilters[filterName][index] = numericValue

    if (index === 0 && pendingFilters[filterName][1] < numericValue) {
        pendingFilters[filterName][1] = numericValue
    } else if (index === 1 && pendingFilters[filterName][0] > numericValue) {
        pendingFilters[filterName][0] = numericValue
    }
}

// Получаем процент для позиции слайдера
const getPercent = (value, filter) => {
    return ((value - filter.min) / (filter.max - filter.min)) * 100
}

// Применение фильтров
const applyFilters = () => {
    Object.keys(appliedFilters).forEach(key => {
        delete appliedFilters[key]
    })
    Object.keys(pendingFilters).forEach(key => {
        appliedFilters[key] = Array.isArray(pendingFilters[key]) 
            ? [...pendingFilters[key]] 
            : pendingFilters[key]
    })
    
    emit('filter-change', { ...appliedFilters })
}

// Сброс фильтров
const resetFilters = () => {
    Object.keys(pendingFilters).forEach(key => {
        delete pendingFilters[key]
    })
    Object.keys(appliedFilters).forEach(key => {
        delete appliedFilters[key]
    })
    previewCount.value = 0
    emit('filter-change', {})
    emit('filter-preview', { filters: {}, count: 0 })
}

const toggleFilter = (filterName) => {
    openFilters.value[filterName] = !openFilters.value[filterName]
}
</script>

<style scoped>
.filter-section {
    padding-bottom: 15px;
}

.filter-section:last-child {
    border-bottom: none;
}

.filter-header {
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
    transition: all 0.3s ease;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    line-height: 1.2;
    text-transform: uppercase;
}

.checkbox-filter {}

.dropdown-arrow.rotated {
    transform: rotate(180deg);
}

.dropdown-arrow {
    height: 9px;
    width: 14px;
    margin-left: auto;
    user-select: none;
    background: url(/public/images/arrow_slider.svg) no-repeat center center/contain;
    transition: transform 0.3s ease;
}

.filter-content {
    padding: 0 20px;

}

input[type='range'] {
    position: absolute;
    width: 100%;
    height: 10px;
    pointer-events: none;
    -webkit-appearance: none;
    background: transparent;
    margin: 0;
    top: 10px;
}

.range-values {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    font-weight: 500;
}

.slider-container {
    position: relative;
    height: 28px;
}

.slider {
    position: absolute;
    width: 100%;
    height: 0;
    pointer-events: none;
    appearance: none;
    z-index: 2;
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


.slider-track {
    position: absolute;
    width: 100%;
    height: 6px;
    background: #dee2e6;
    top: 7px;
    border-radius: 3px;
}

.slider-range {
    position: absolute;
    height: 6px;
    background: var(--primary);
    top: 0;
    border-radius: 3px;
}

.checkbox-item {
    margin: 8px 0;
}

.checkbox-option {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    font-size: 14px;
    color: #515A85;
}

.checkbox-input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
}

.checkmark {
    position: relative;
    height: 20px;
    width: 20px;
    background-color: white;
    border: 1px solid #626575;
    border-radius: 4px;
    transition: all 0.2s ease;
}

.checkbox-input:checked~.checkmark {
    background-color: white;
    border-color: #626575;
}

.checkbox-input:checked~.checkmark::after {
    content: '';
    position: absolute;
    left: 3px;
    top: 4px;
    width: 13px;
    height: 11px;
    background: url(/public/images/check_mark.svg) no-repeat center center/contain;
}

.filter-actions {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.apply-btn {
    background: var(--secondary);
    color: white;
    border: none;
    border-radius: 50px;
    height: 50px;
    font-size: 14px;
    cursor: pointer;
    font-weight: 600;
    transition: background 0.3s ease;
    text-transform: uppercase;
}

.reset-btn {
    font-size: 14px;
    cursor: pointer;
    text-decoration: underline;
    padding: 4px 0;
    text-align: left;
}

.apply-btn span{
    color: #fff;
}
</style>