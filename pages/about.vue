<template>
    <div class="container">
        <div class="main-content">
            <h2>О нашей компании</h2>
            <div class="description">
                <p>
                    Группа компаний EverON на сегодняшний день является лидером среди российских производителей и
                    поставщиков систем электропитания.
                </p>
                <p>
                    Продукция EverON успешно помогает решать любые задачи в области стабильного и качественного
                    электропитания. Бренд EverON, известный с 1991 года, для многих стал синонимом высокой надежности,
                    непревзойденных технических показателей и удобства использования.
                </p>
                Продукция EverON успешно помогает решать любые задачи в области стабильного и качественного
                электропитания. Бренд EverON, известный с 1991 года, для многих стал синонимом высокой надежности,
                непревзойденных технических показателей и удобства использования.
                Огромный научный потенциал, наличие собственной производственной базы и многолетний опыт работы
                обеспечивают широчайшие возможности для исследований и внедрения инновационных решений, отвечающих
                растущим требованиям современных энергопотребителей.
            </div>
            <div class="mob-sidebar">
                <AppAside />
            </div>
            <h3>Направления деятельности</h3>
            <h4>Продукция</h4>
            <ul class="product-categories">
                <li class="category-column">
                    <ul>
                        <li>Стабилизаторы напряжения</li>
                        <li>ИБП переменного тока</li>
                        <li>Инверторы и инверторные системы</li>
                        <li>Установки электропитания</li>
                    </ul>
                </li>
                <li class="category-column">
                    <ul>
                        <li>ИБП постоянного тока</li>
                        <li>Климатические шкафы</li>
                        <li>Телекоммуникационные шкафы</li>
                        <li>Средства мониторинга</li>
                    </ul>
                </li>
            </ul>
            <h4>Преимущества</h4>
            <ul class="advantages">
                <li><span>1</span>Опыт работы</li>
                <li><span>2</span>Собственная лаборатория</li>
                <li><span>3</span>Центр аналитике</li>
                <li><span>4</span>Тех-поддержка на протяжении всего цикла использования устройства
                </li>
                <li><span>5</span>Сотрудничество с крупными энергетическими компаниями</li>
            </ul>
            <div class="quote">
                <div></div>
                <p>Огромный научный потенциал, наличие собственной производственной базы и многолетний опыт работы
                    обеспечивают широчайшие возможности для исследований и внедрения инновационных решений, отвечающих
                    растущим требованиям современных энергопотребителей.
                </p>
                <a href="#">CEO of the company</a>
            </div>
            <p>
                История развития ГК «Штиль» берет своё начало в 1991 году, когда первое предприятие компании ЗАО
                «Тэнси-Техно» открыло в Туле производство стабилизаторов напряжения «Штиль». Сегодня ГК «Штиль» является
                одним из крупнейших в России производителем стабилизаторов напряжения переменного тока.
                Следующей ступенью развития ГК «Штиль» стало создание в 2001 году ЗАО «Ирбис-Т», на мощностях которого
                было организовано производство источников бесперебойного питания постоянного тока для охранно-пожарных
                систем. В последующие годы номенклатура выпускаемой продукции значительно расширилась. Компания наладила
                производство инверторов напряжения, установок электропитания, климатических шкафов и другого
                высокотехнологичного оборудования.
                В 2014 году была открыта ещё одна структурная единица ГК «Штиль» – ООО «Штиль Энерго». На мощностях
                этого предприятия было запущено производство современных источников бесперебойного питания переменного
                тока топологии онлайн.
                В 2015 году ООО «Штиль Энерго» выпустило на рынок инновационный продукт – инверторные стабилизаторы
                напряжения серии «ИнСтаб», реализованные на базе принципа бестрансформаторного, двойного преобразования
                энергии. Это событие можно рассматривать как новую страницу не только в истории ГК «Штиль», но и в
                истории всей отечественной электротехники.
            </p>
            <div class="contact">
                <img src="/public/images/manager.png" alt="mamager" class="manager">
                <div class="">
                    <h2>Менеджер отдела продаж</h2>
                    <h3>Кузнецова Ирина Геннадиевна</h3>
                    <p>
                        Для общих вопросов, отзывов, предложений и жалоб.
                        По всем остальным вопросам обращайтесь через соответствующие разделы сайта.
                    </p>
                    <a class="number" href="tel:+79538617920">+7 953 861 79 20</a>
                    <a class="mail" href="mailto:everon@gmail.com">everon@gmail.com</a>
                </div>
            </div>
        </div>
        <div class="sidebar">
            <AppAside />
        </div>

    </div>
    <Gallery />
    <CallbackForm />

</template>

<style scoped>
.container {
    display: flex;
}

.main-content {
    width: 81%;
}

.description {
    margin-bottom: 40px;
}

p {
    margin: 0;
}

h2 {
    margin-bottom: 30px;
}

h3 {
    margin: 50px 0 40px;
}

h4 {
    margin-bottom: 17px;
}

.product-categories {
    display: flex;
    margin-bottom: 26px;
    gap: 40px;
}

.product-categories li ul:first-of-type li {
    padding-left: 21px;
    background: url(/public/images/arrow-btn.svg) no-repeat top left;
    background-size: 16px;
}

.product-categories li ul:first-of-type li:not(:last-child),
.product-categories li ul:last-of-type li:not(:last-child),
.advantages li:not(:last-child) {
    margin-bottom: 16px;
}

ul:last-of-type li span {
    display: inline-block;
    color: var(--text-color);
    background: var(--primary);
    border-radius: 100px;
    padding-left: 5px;
    padding-top: 1px;
    font-size: 10px;
    width: 16px;
    height: 16px;
    margin-right: 5px;
}

.quote {
    position: relative;
    border-radius: 10px;
    display: flex;
    gap: 25px;
    margin: 40px 0;
    background: var(--bg);

}

.quote div {
    border-radius: 10px 0 0 10px;
    width: 71px;
    flex-shrink: 1;
    background: url(/public/images/quote.svg) no-repeat 16px 16px, var(--primary);
}

.quote p {
    padding: 25px 20px 40px 0;
    flex-shrink: 30;

}

.quote a {
    position: absolute;
    color: var(--primary);
    right: 20px;
    bottom: 18px;
}

.contact {
    margin: 40px 0;
    display: flex;
    gap: 20px;
}

.contact div a {
    display: block;
    color: var(--based);
}

.contact h2 {
    margin: 0;
}

.contact h3 {
    margin: 0;
    text-transform: none;
    padding: 50px 0 9px;
}

.manager {
    width: 40%;
}

.contact p {
    max-width: 544px;
    padding-bottom: 10px;
}

.contact a:first-of-type {
    margin-bottom: 10px;
}

.sidebar {
    margin-left: 25px;
}

.mob-sidebar {
    display: none;
}

@media(max-width: 1024px) {
    .main-content {
        width: 100%;
    }

    .contact h3 {
        padding: 44px 0 9px;
    }

    .sidebar {
        display: none;
        margin-left: 0;
    }

    .mob-sidebar {
        display: flex;
        gap: 20px;
        flex-wrap: wrap;
        width: 80vw;
    }
}

@media (max-width: 768px) {
    .mob-sidebar {
        margin-top: 40px;
        width: 100%;
        gap: 0;
    }
}

@media(max-width: 640px) {
    ul {
        flex-wrap: wrap;
    }

    .main-content {
        width: 100%;
    }

    .manager {
        width: 100%;
    }

}

@media (max-width: 380px) {
    .contact {
        gap: 0;
    }

    img {
        margin-bottom: 20px;
    }

    .contact h3 {
        padding-top: 20px;
    }

    .mob-sidebar {
        gap: 0;
    }


}
</style>