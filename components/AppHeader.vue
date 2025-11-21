<template>
    <div>
        <div class="bg-secondary">
            <div class="bg-primary">
                <div class="container mobile-header">
                    <a class="number" href="tel:+73832079294">+7 (383) 207-92-94</a>
                    <button class="menu-burger" id="burger-btn">
                        <span class="burger-line"></span>
                        <span class="burger-line"></span>
                        <span class="burger-line"></span>
                    </button>
                </div>
            </div>
            <div class="mobile-menu" id="mobileMenu">
                <a href="/" class="logo">
                    <img src="/public/images/logo.svg" class="mob-img" alt="logo">
                    <p class="slogan">Автоматизация технологических процессов</p>
                </a>
                <nav class="nav mob-nav">
                    <a href="/catalog">Каталог</a>
                    <a href="/service">Услуги</a>
                    <a href="/about">Команда</a>
                    <a href="/contacts">Контакты</a>
                </nav>
                <a class="mail" href="mailto:info@everon-pro.ru">info@everon-pro.ru</a>
                <form class="mail-form" action="#">
                    <input class="mail-inp" type="text" placeholder="Подпишитесь на скидки">
                    <button class="mail-btn" type="submit"></button>
                </form>
                <p>Присоединяйтесь к нам</p>
                <div class="social">
                    <a href="#" class="w-app"><img src="/public/images/social/W-app.svg" alt=""></a>
                    <a href="#" class="tg"><img src="/public/images/social/tg.svg" alt=""></a>
                </div>
            </div>
            <div class="container head">
                <a href="/" class="logo header-logo">
                    <img src="/public/images/logo.svg" alt="logo">
                    <p class="slogan">Автоматизация технологических процессов</p>
                </a>
                <div class="">
                    <SearchComponent />
                    <div class="flex contacts">
                        <a class="number" href="tel:+73832079294">+7 (383) 207-92-94</a>
                        <a class="mail" href="mailto:info@everon-pro.ru">info@everon-pro.ru</a>
                    </div>
                </div>
            </div>
            <div class="bg-primary menu">
                <nav class="nav">
                    <a href="/">Главная</a>
                    <a href="/catalog">Каталог</a>
                    <a href="/service">Услуги</a>
                    <a href="/contacts">Контакты</a>
                </nav>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import SearchComponent from './SearchComponent.vue'

onMounted(() => {
    document.querySelectorAll('.nav a').forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add('active')
        }
    })

    document.querySelectorAll('.mob-nav a').forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add('active')
        }
    })

    const burgerBtn = document.getElementById('burger-btn')
    const mobileMenu = document.getElementById('mobileMenu')

    if (burgerBtn && mobileMenu) {
        burgerBtn.addEventListener('click', () => {
            burgerBtn.classList.toggle('active')
            mobileMenu.classList.toggle('active')
        })
    }
})
</script>

<style scoped>
.logo {
    margin-bottom: 30px;
}

.slogan {
    color: #fff;
    width: 225px;
}

@media (max-width: 640px) {
    .number {
        background: url(/public/images/mobile_tel.svg) no-repeat left center;
        margin: 0;
        padding: 0 0 0 26px;
    }
    .header-logo img {
        width: 100%;
    }
}
</style>