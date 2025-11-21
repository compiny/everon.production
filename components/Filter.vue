<template>
    <!-- ФОРМ-ФАКТОР -->
    <div>
        <div @click="toggleOpen">
            <label class="filter-label">
                ФОРМ-ФАКТОР
                <div class="dropdown-arrow" :class="{ rotated: !isOpen }"></div>
            </label>
        </div>

        <div class="filter-content" v-if="isOpen">
            <div class="filter-options">
                <label class="checkbox-option" v-for="option in options" :key="option.id">
                    <input type="checkbox" :value="option.id" v-model="selectedOptions" class="checkbox-input">
                    <span class="checkmark"></span>
                    {{ option.label }} ({{ option.count }})
                </label>
            </div>

            <button class="show-more-btn" v-if="hasMore" @click="showAll = !showAll">
                {{ showAll ? 'Свернуть' : 'Показать еще' }}
            </button>
        </div>
    </div>

    <!-- ПОЛНАЯ МОЩНОСТЬ -->
    <div class="filter-range-wrapper">
        <FilterRange />
    </div>

    <!-- КОМПЛЕКТ -->
    <div>
        <div @click="toggleOpenKit">
            <label class="filter-label">
                КОМПЛЕКТ
                <div class="dropdown-arrow" :class="{ rotated: !isOpenKit }"></div>
            </label>
        </div>

        <div class="filter-content" v-if="isOpenKit">
            <div class="filter-options row">
                <label class="checkbox-option" v-for="option in kitOptions" :key="option.id">
                    <input type="checkbox" :value="option.id" v-model="selectedKitOptions" class="checkbox-input">
                    <span class="checkmark"></span>
                    {{ option.label }} ({{ option.count }})
                </label>
            </div>
        </div>
    </div>

    <!-- ВРЕМЯ АВТОНОМНОЙ РАБОТЫ -->
    <div>
        <div @click="toggleOpenTime">
            <label class="filter-label filter-label-tall">
                ВРЕМЯ АВТОНОМНОЙ РАБОТЫ<br>(ПРИ 80% ЗАГРУЗКЕ ИБП)
                <div class="dropdown-arrow dropdown-arrow-top" :class="{ rotated: !isOpenTime }"></div>
            </label>
        </div>

        <div class="filter-content" v-if="isOpenTime">
            <div class="filter-options">
                <label class="checkbox-option" v-for="option in timeOptions" :key="option.id">
                    <input type="checkbox" :value="option.id" v-model="selectedTimeOptions" class="checkbox-input">
                    <span class="checkmark"></span>
                    {{ option.label }} ({{ option.count }})
                </label>
            </div>
        </div>
    </div>

    <!-- КНОПКИ ПОКАЗАТЬ И СБРОСИТЬ -->
    <div class="filter-buttons">
        <button class="show-products-btn">
            ПОКАЗАТЬ 113 ТОВАРОВ
        </button>
        <button class="reset-filters-btn" @click="resetAllFilters">
            Сбросить
        </button>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import FilterRange from './FilterRange.vue'

// ФОРМ-ФАКТОР
const isOpen = ref(true)
const showAll = ref(false)
const selectedOptions = ref([])

const options = ref([
    { id: 1, label: 'настенный', count: 22 },
    { id: 2, label: 'напольный', count: 24 },
    { id: 3, label: 'в стойку', count: 8 },
    { id: 4, label: 'напольный/в стойку', count: 16 },
    { id: 5, label: 'шкафной', count: 10 },
    { id: 6, label: 'шкафной (модульный)', count: 33 }
])

const toggleOpen = () => {
    isOpen.value = !isOpen.value
}

const hasMore = computed(() => options.value.length > 4)

// КОМПЛЕКТ
const isOpenKit = ref(true)
const selectedKitOptions = ref([])

const kitOptions = ref([
    { id: 1, label: 'Да', count: 22 },
    { id: 2, label: 'Нет', count: 37 }
])

const toggleOpenKit = () => {
    isOpenKit.value = !isOpenKit.value
}

// ВРЕМЯ АВТОНОМНОЙ РАБОТЫ
const isOpenTime = ref(true)
const selectedTimeOptions = ref([])

const timeOptions = ref([
    { id: 1, label: '4 мин', count: 1 },
    { id: 2, label: '7 мин', count: 1 },
    { id: 3, label: '8 мин', count: 7 },
    { id: 4, label: '12 мин', count: 4 },
    { id: 5, label: '20 мин', count: 1 },
    { id: 6, label: '30 мин', count: 2 },
    { id: 7, label: '35 мин', count: 1 },
    { id: 8, label: '45 мин', count: 2 },
    { id: 9, label: '1 ч', count: 2 },
    { id: 10, label: '1 ч 15 мин', count: 1 },
    { id: 11, label: '1 ч 45 мин', count: 1 },
    { id: 12, label: '2 ч', count: 1 },
    { id: 13, label: '2,5 ч', count: 1 },
    { id: 14, label: '3 ч', count: 1 },
    { id: 15, label: '4 ч', count: 1 },
    { id: 16, label: '4,5 ч', count: 1 },
    { id: 17, label: '5 ч', count: 1 },
    { id: 18, label: '6,5 ч', count: 2 }
])

const toggleOpenTime = () => {
    isOpenTime.value = !isOpenTime.value
}

// Сброс всех фильтров
const resetAllFilters = () => {
    selectedOptions.value = []
    selectedKitOptions.value = []
    selectedTimeOptions.value = []
}
</script>

<style scoped>
.filter-label {
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
    user-select: none;
    line-height: 1.2;
}

.filter-label-tall {
    border-radius: 20px;
    height: 80px;
    align-items: flex-start;
    padding-top: 22px;
}

.dropdown-arrow-top {
    margin-top: 8px;
}

.filter-content {
    margin-left: 18px;
    margin-bottom: 16px;
}

.filter-options {
    display: flex;
    flex-direction: column;
    gap: 12px;
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

.show-more-btn {
    margin-top: 12px;
    background: none;
    border: none;
    text-decoration: underline;
    font-size: 14px;
    cursor: pointer;
    padding: 4px 0;
}

.dropdown-arrow {
    height: 9px;
    width: 14px;
    margin-left: auto;
    user-select: none;
    background: url(/public/images/arrow_slider.svg) no-repeat center center/contain;
    transition: transform 0.3s ease;
}

.rotated {
    transform: rotate(180deg);
}

.filter-range-wrapper {
    margin-bottom: 12px;
}

.filter-buttons {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 20px;
    width: 275px;
}

.show-products-btn {
    background: var(--secondary);
    color: white;
    border: none;
    border-radius: 50px;
    height: 50px;
    font-size: 14px;
    cursor: pointer;
    font-weight: bold;
    transition: background 0.3s ease;
}

.reset-filters-btn {
    font-size: 14px;
    cursor: pointer;
    text-decoration: underline;
    padding: 4px 0;
    text-align: left;
}

.row {
    flex-direction: row;
    gap: 40px;
}
</style>