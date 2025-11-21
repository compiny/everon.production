<template>
    <footer class="footer">
        <div class="container">
            <div class="wrapper">
                <div class="">
                <a href="/" class="logo">
                    <img src="/public/images/logo.svg" alt="logo">
                    <span class="slogan">Промышленная автоматика и электроэнергетика</span>
                </a>
                <form class="mail-form" action="#">
                    <input class="mail-inp" type="text" placeholder="Подпишитесь на скидки">
                    <button class="mail-btn" type="submit"></button>
                </form>
                <h4>Присоединяйтесь к нам</h4>
                <div class="social">
                    <a href="#" class="w-app"><img src="/public/images/social/W-app.svg" alt=""></a>
                    <a href="#" class="tg"><img src="/public/images/social/tg.svg" alt=""></a>
                </div>
                </div>
                <div class="">
                    <h4>О нас</h4>
                    <ul>
                        <li><a href="#">Оплата и доставка</a></li>
                        <li><a href="/contacts">Контакты</a></li>
                        <li><a href="#">Гарантия</a></li>
                    </ul>
                </div>
                <div class="">
                    <h4>Каталог</h4>
                    <ul>
                        <li><a href="/">О нас</a></li>
                        <li><a href="#">Реквизиты</a></li>
                        <li><a href="#">Политика конфеденциальности</a></li>
                        <li><a href="#">Публичная оферта</a></li>
                    </ul>
                </div>
                <div class="contacts">
                    <h4>Контакты</h4>
                    <a class="number" href="tel:+73832079294">+7 (383) 207-92-94</a>
                    <a href="#callback">Заказать обратный звонок</a>
                    <a class="mail" href="mailto:info@everon-pro.ru">info@everon-pro.ru</a>
                </div>
            </div>
            <div class="footer-bottom">
                <p>
                    Данный сайт носит исключительно информационный характер, информация размещенная на нем, не является публичной офертой, подробную информацию уточняйте у менеджеров магазина. карта сайта
                </p>

                <div class="">
                    <div class="schedule">
                        <div class="weekday">
                            <div>
                                <span>ПН</span>
                                <span>ВТ</span>
                                <span>СР</span>
                                <span>ЧТ</span>
                                <span>ПТ</span>
                            </div>
                            <div>
                                <span>СБ</span>
                                <span>ВС</span>
                            </div>
                        </div>
                        <div class="time">
                            <span>9:00 - 22:00</span>
                            <span>11:00 - 18:00</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped>
.footer {
    background: var(--secondary);
}

.container {
    padding-bottom: 55px;
}

li,p,span {
    font-size: 14px;
    color: var(--text-color);
}

.wrapper {
    display: flex;
    flex-wrap: wrap;
    padding: 52px 0 0;
    justify-content: space-between;
}

.wrapper div:not(:first-of-type) {
    margin: 31px 0 0;

}

.wrapper div:not(:first-of-type) h4{
    margin-bottom: 57px;
}

ul li:not(:last-child) {
    margin-bottom: 23px;
}

.contacts {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.contacts a {
    display: block;
}

.contacts a:nth-of-type(2){
    color: var(--primary);
    text-decoration: underline;
    margin-bottom: 51px;
}
.logo {
    margin-bottom: 20px;
    display: block;
}

.logo img{
    width: 277px;
}

.slogan {
    color: #fff;
    width: 225px;
    display: block;
}

.mail-form {
    width: 277px;
    position: relative;
    margin-bottom: 67px;

}

.mail-inp {
    width: 100%;
    height: 50px;
    border-radius: 50px;
    padding-left: 20px;
    background: #fff;
    box-shadow: inset 0 1px 2px 1px rgba(4, 19, 102, 0.5);
}

.mail-btn {
    position: absolute;
    top: 5px;
    right: 5px;
    background: url(/public/images/arrow-btn.svg);
    height: 40px;
    width: 40px;
    cursor: pointer;
}

.social {
    margin-top: 15px;
}

.social a img {
    padding: 0;
}
.social a {
    height: 20px;
}

p {
    max-width: 555px;
}

.number {
    margin: 0;
}

.schedule {
    width: 240px;
}

.weekday, .time {
    display: flex;
    justify-content: space-between;

}
.weekday {
    margin-bottom: 12px;
}

.weekday div {
    padding: 7px 0;
    display: flex;
    gap: 10px;
}

.weekday div:last-of-type {
    background: var(--primary);
    padding: 7px 14px;
    border-radius: 30px;
}

.weekday div:last-of-type span {
    color: var(--secondary);
}

.footer-bottom {
    margin-top: 32px;
    display: flex;
    justify-content: space-between;
}

@media (max-width:1280px) {
    .wrapper {
        gap: 40px;
    }
    .wrapper div {
        width: 41vw;
    }
    .contacts {
        align-items: flex-start;
    }
}

@media (max-width:1145px) {
    .contacts {
        position: relative;
        align-items: flex-start;
    }
    .wrapper div:not(:first-of-type) h4 {
        margin-bottom: 20px;
    }
    .contacts a:nth-of-type(2) {
        margin: 10px 0 20px;
    }
}

@media(max-width: 768px) {
    .wrapper {
        justify-content: start;
    }
    .wrapper div {
        width: auto;
    }
    .footer-bottom {
        margin-top: 20px;
        flex-direction: column-reverse;
    }
    p {
        margin-top: 46px;
    }
}

@media (max-width:380px) {
    .container {
        padding-bottom: 47px;
    }
    .mail-form {
        margin-bottom: 25px;
    }
    .contacts {
        align-items: flex-start;
    }
    .wrapper {
        padding-top: 30px;
        gap: 0;
    }
    .wrapper div:first-child {
        display: flex;
        width: 100%;
        flex-direction: column;
        align-items: center;
    }
    .wrapper div:not(:first-of-type) h4 {
        margin-bottom: 20px;
    }
    .wrapper div:not(:first-of-type) {
        margin: 35px 0 0;
    }
    .contacts a:nth-of-type(2) {
        margin: 10px 0 20px;
    }
    p {
        text-align: center;
    }
    img {
        width: 100%;
    }
}

</style>
<script setup lang="ts">
</script>