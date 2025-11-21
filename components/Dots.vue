<template>
    <div class="dots">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
</template>
<style scoped>
.dots {
    display: flex;
    gap: 6px;
}
.dots span:first-of-type {
    background: var(--primary);
}
.dots span {
    display: inline-block;
    background: var(--secondary);
    width: 14px;
    height: 14px;
    border-radius: 14px;
}
</style>