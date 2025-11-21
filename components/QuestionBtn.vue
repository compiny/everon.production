<template>
    <button>Задать вопрос</button>
</template>
<style scoped>
button {
    display: block;
    width: 100%;
    height: 50px;
    border-radius: 50px;
    background: var(--secondary);
    color: var(--text-color);
    font-weight: 600;
    font-size: 16px;
    text-transform: uppercase;
    cursor: pointer;
}
@media (max-width: 380px) {
    button{
        margin-top: -10px;
        width: 100%;
    }
}
</style>