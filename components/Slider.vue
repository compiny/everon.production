<template>
    <div class="slider-container">
        <button class="nav-arrow nav-arrow--prev" @click="movePrev"></button>

        <Flicking ref="flickingRef" :hideBeforeInit="true" :circular="circular" :moveType="moveType"
            :horizontal="isHorizontal" :options="flickingOptions" class="vertical-flicking"
            :class="[size, { 'horizontal': isHorizontal }]"
        >
            <div v-for="(image, index) in images" :key="index" class="flicking-panel">
                <img :src="image.src" :alt="image.alt || `Slide ${index + 1}`" class="slider-image"
                    :class="imageClass" />
            </div>
        </Flicking>

        <button class="nav-arrow nav-arrow--next" @click="moveNext"></button>
    </div>
</template>

<script setup>
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
    images: {
        type: Array,
        required: true,
        default: () => []
    },
    circular: {
        type: Boolean,
        default: true
    },
    duration: {
        type: Number,
        default: 300
    },
    imageClass: {
        type: String,
        default: ''
    }
})

const flickingRef = ref(null)
const isHorizontal = ref(false)

// Определяем ориентацию на основе ширины экрана
const checkScreenSize = () => {
    isHorizontal.value = window.innerWidth <= 640;
};

const flickingOptions = computed(() => ({
    horizontal: isHorizontal.value,
    circular: props.circular,
    duration: props.duration,
    gap: props.gap
}))

// Функции для навигации
const movePrev = () => {
    if (flickingRef.value) {
        flickingRef.value.prev()
    }
}

const moveNext = () => {
    if (flickingRef.value) {
        flickingRef.value.next()
    }
}

// Слушаем изменения размера окна
onMounted(() => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
});

onUnmounted(() => {
    window.removeEventListener('resize', checkScreenSize);
});
</script>

<style scoped>
.slider-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.vertical-flicking {
    overflow: hidden;
    width: 100%;
}

.vertical-flicking {
    height: 473px;
}

.vertical-flicking.horizontal {
    height: auto;
    max-height: 104px;
}

.flicking-panel {
    width: 79px;
    height: 104px;
    border: 1px solid #DCE0ED;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 8px 20px;
    border-radius: 8px;
    overflow: hidden;
    background: #f8f9fa;
}

.slider-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 6px;
}

.vertical-flicking ::v-deep(.flicking-camera) {
    flex-direction: column;
}

.vertical-flicking.horizontal ::v-deep(.flicking-camera) {
    flex-direction: row;
}

.vertical-flicking ::v-deep(.flicking-panel.active) {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border-color: #515A85;
}

.nav-arrow {
    width: 32px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
}

.nav-arrow:active {
    transform: scale(0.95);
}

.nav-arrow--prev {
    order: 1;
    background: url(/public/images/arrow_slider.svg) no-repeat top center;
}

.nav-arrow--next {
    order: 3;
    background: url(/public/images/arrow_slider.svg) no-repeat bottom center;
    rotate: 180deg;
}

.vertical-flicking {
    order: 2;
}

@media (max-width: 640px) {
    .slider-container {
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .nav-arrow--prev {
        order: 1;
        rotate: -90deg;
        margin-right: 10px;
    }

    .vertical-flicking {
        order: 2;
    }

    .nav-arrow--next {
        order: 3;
        rotate: 90deg;
        margin-left: 10px;
    }

    .flicking-panel {
        margin: 8px 10px;
    }
}
</style>