<template>
    <div class="container">
        <h2>Онлайн ИБП «Штиль» STR300SL-27 (300 ВА)</h2>
        <div class="flex content">
            <div class="content_img">
                <div class="discount">40%</div>
                <img src="/public/images/product.png" class="product" alt="">
            </div>
            <div class="slider">
                <Slider :images="productImages" />
            </div>
            <div class="description">
                <div class="flex between">
                    <p>Код товара: 00000068627</p>
                    <Actions />
                </div>
                <h6>Характеристики</h6>
                <div v-for="(item, index) in property" :key="index" class="properties">
                    <div class="property-item">
                        <span class="property-label">Тип устройства —</span>
                        <span class="property-value">{{ item.type }}</span>
                    </div>

                    <div class="property-item">
                        <span class="property-label">Номинальная мощность —</span>
                        <span class="property-value">{{ item.power.kw }} ({{ item.power.w }})</span>
                    </div>

                    <div class="property-item">
                        <span class="property-label">Контроллер заряда —</span>
                        <span class="property-value">{{ item.controller }}</span>
                    </div>

                    <div class="property-item">
                        <span class="property-label">Количество фаз —</span>
                        <span class="property-value">{{ item.phases }}</span>
                    </div>
                </div>
                <div class="in_stock">
                    В наличии
                </div>
                <div class="price">19 810 <span>руб.</span></div>
                <div class="old-price">21 810 руб.</div>
                <div class="flex between">
                    <BuyBtn />
                    <Counter v-model="quantity" />
                </div>
            </div>
        </div>
        <h3>Характеристики</h3>
        <table class="striped-table">
            <tbody>
                <tr v-for="(item, index) in rows" :key="index">
                    <td>{{ item.param }}</td>
                    <td class="t-value">{{ item.value }}</td>
                </tr>
            </tbody>
        </table>
        <h3>Описание</h3>
        <h6>Установка и подключение</h6>
        <p class="description">
            SW300L крепится на любой ровной вертикальной поверхности, которая может выдерживать нагрузку в 4 кг. Монтаж
            выполняется с помощью шурупов «саморезов». Для удобства в комплект поставки ИБП входит специальный шаблон
            для разметки поверхности.
            Прибор подключается к входной сети с помощью сетевого кабеля с евровилкой. Нагрузка подключается в
            EURO-розетку, расположенную на боковой панели ИБП.
        </p>
        <h6>Автономная работа</h6>
        <p class="description">
            SW300L оснащен встроенным зарядным устройством с током заряда 6 А, благодаря чему возможно подключение
            внешнего
            аккумулятора большой емкости (от 17 до 250 Ач). Он сможет обеспечить от 18 мин до 9,5 ч автономной работы
            нагрузки (при 100% загрузке ИБП). Аккумуляторная батарея, в зависимости от ёмкости, размещается во внешнем
            напольном стеллаже BS-12-1W или BS-12-2W (Таблица времени автономной работы).
        </p>
        <p class="description">
            В ИБП используются современные технологии сокращения времени заряда и продления срока службы батарей
            (интеллектуальный заряд и термокомпенсация заряда), а также алгоритмы, позволяющие:
        </p>
        <ul>
            <li>отключать АБ при разряде на 80-85% (защита от «глубокого» разряда);</li>
            <li>уведомлять пользователя об износе АБ;</li>
            <li>прогнозировать время автономии при текущей нагрузке (значение отображается в веб-интерфейсе устройства,
                для подключения необходима карта мониторинга).
            </li>
        </ul>
    </div>
    <Proposal />
</template>
<script setup>
const property = ref([
    {
        type: 'Сетевой инвертор',
        power: {
            kw: '10 кВт',
            w: '10000 Вт'
        },
        controller: 'MPPT',
        phases: 'Однофазный'
    }
]);

const productImages = ref([
    {
        src: '/images/product1.png',
        alt: 'Основное изображение товара',
        caption: 'Вид спереди'
    },
    {
        src: '/images/product1.2.png',
        alt: 'Боковой вид товара',
        caption: 'Боковой вид'
    },
    {
        src: '/images/product1.png',
        alt: 'Задняя панель товара',
        caption: 'Задняя панель'
    },
    {
        src: '/images/product1.2.png',
        alt: 'Задняя панель товара',
        caption: 'Задняя панель'
    },
    {
        src: '/images/product1.2.png',
        alt: 'Задняя панель товара',
        caption: 'Задняя панель'
    },
    {
        src: '/images/product1.2.png',
        alt: 'Задняя панель товара',
        caption: 'Задняя панель'
    },

]);

const rows = ref([
    { param: 'Активная мощность, кВт', value: '0,225(боннель)' },
    { param: 'Время автономной работы (при 80% загрузке ИБП)', value: 'Зависит от ёмкости внешних АБ' },
    { param: 'Число фаз', value: '1 в 1' },
    { param: 'Режимы работы', value: 'on-line, автономный, байпас, ECO' },
    { param: 'Предельный диапазон входного напряжения, В', value: '90-295' },
]);

const quantity = ref(1)

</script>
<style scoped>
.container {
    margin-bottom: 60px;
}

.content {
    justify-content: space-between;
    margin: 40px 0;
}

.content_img {
    width: 50%;
    height: 520px;
    border: 1px solid #DCE0ED;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    position: relative;
}

.discount {
    width: 62px;
    height: 95px;
    padding: 10px 0 0;
    line-height: 33px;
    text-align: center;
    background: url(/public/images/discount.svg) no-repeat center;
    position: absolute;
    top: 0;
    right: 20px;
    color: #fff;
    font-size: 32px;
    font-weight: 600;
    word-break: break-word;

}

.content .description {
    width: 472px;
    justify-content: space-between;
}

.content h6 {
    font-size: 16px;
    margin: 17px 0 17px;
}

.actions {
    flex-direction: row-reverse;
    padding: 0;
    width: 200px;
}

.property-item {
    margin-bottom: 7px;
}

p,
span {
    font-size: 14px;
}

span:nth-child(2) {
    color: #515A85;
    margin-left: 3px;
}

.in_stock {
    margin: 44px 0 0;
}

.price {
    margin-top: 59px;
    line-height: 39px;
    font-size: 64px;
}

.price span {
    font-size: 24px;
}

.old-price {
    text-decoration: line-through;
    font-size: 24px;
    margin-bottom: 45px;
}

button {
    width: 226px;
    background: url(/public/images/cart.svg)60px center no-repeat, var(--secondary);
    padding-left: 20px;
    height: 50px;
    margin: 0;
}

h3 {
    font-weight: bold;
    margin-bottom: 40px;
}

.striped-table {
    width: 100%;
    margin: 0 0 40px;
    border-collapse: collapse;
}

.striped-table td {
    padding: 10px 19px;
}

.striped-table tbody tr:nth-child(odd) {
    background-color: var(--bg-dark);
}

.t-value {
    color: #515A85;
}

h6,
.description,
ul li {
    font-size: 20px;
}

.description {
    margin: 5px 0 20px;

}

ul {
    list-style: disc;
}

ul li::marker {
    color: var(--primary);
}

ul li:first-child {
    margin-top: 39px;
}

ul li {
    margin: 0 0 25px 20px;
}
@media (max-width:640px) {
    .content {
        flex-direction: column;
    }
    .content_img, .content .description {
        width: 100%;
    }
    tbody tr {
        display: flex;
        flex-direction: column;
        font-size: 16px;
    }
    .between {
        flex-direction: column-reverse;
    }
    .striped-table td {
        padding: 0 10px;
    }
}
@media (max-width: 380px) {
    .product {
        width: 100%;
    }
}
</style>

<style>
.between {
    justify-content: space-between;
}
</style>
