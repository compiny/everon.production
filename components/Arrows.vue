<template>
    <div class="arrows">
        <div></div>
        <div></div>
    </div>
</template>
<style scoped>
.arrows {
        width: fit-content;
        display: flex;
        right: 0;
        /* position: absolute; */
        bottom: 68px;
        gap: 20px;
}
.arrows div:first-of-type {
    left: 0;
    background: url(/public/images/arrow_left.svg) no-repeat;
    width: 40px;
    height: 40px;
}

.arrows div:last-of-type {
    right: 0;
    background: url(/public/images/arrow-btn.svg) no-repeat;
    width: 40px;
    height: 40px;
}
</style>