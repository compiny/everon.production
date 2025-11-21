<template>
    <div class="container">
        <h2>Контакты</h2>
        <div class="contacts">
            <a class="number" href="tel:+79538617920">+7 953 861 79 20</a>
            <div class="address">Новосибирск, ул. Зыряновская д. 18/1 оф. 9</div>
            <a class="mail" href="mailto:info@everon-pro.ru">info@everon-pro.ru</a>
        </div>
        <div class="flex">
            <MapAddress />
            <FormCuestion />
        </div>
    </div>
    <CallbackForm />
</template>

<style scoped>
.container {
    padding-bottom: 111px;
}
.contacts {
    display: flex;
    gap: 70px;
    margin:40px 0 38px;

}
.flex {
    gap: 20px;
}
a {
    color: var(--based);
}
.address {
    background: url(/public/images/local.svg) no-repeat left center;
    width: 254px;
    padding: 7px 0 7px  50px;
}
.number {
    margin: 0;
}

@media(max-width:1280px){
    .contacts {
        flex-wrap: wrap;
        gap: 20px;
    }
}

@media (max-width: 768px) {
    .container {
        padding-bottom: 40px;
    }
}

@media (max-width: 640px) {
    .flex {
            flex-wrap: wrap;
        }
}

@media (max-width: 380px) {
    .flex {
        gap: 40px;
    }
    .contacts {
        flex-wrap: wrap;
        gap: 10px;
    }
   
}
</style>