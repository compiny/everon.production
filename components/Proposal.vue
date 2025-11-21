<template>
    <div class="proposal">
        <div class="container">
            <div class="proposal_img"></div>
            <div class="">
                Нужно коммерческое предложение?
            </div>
            <button>Получить</button>
        </div>
    </div>
</template>
<style scoped>
.proposal {
    padding: 39px 0 75px;
    background: var(--primary);
    overflow: hidden;
}
.container {
    position: relative;
}
.proposal_img{
    position: absolute;
    bottom: -168px;
    left: -552px;
    background: url(/_nuxt/public/images/proposal.svg) no-repeat center;
    height: 211%;
    width: 100%;
}
.container div{
    color: var(--text-color);
    font-size: 87px;
    font-weight: 700;
    line-height: 80%;
    text-align: center;
    margin: 0 auto;
}
button {
    display: block;
    width: 243px;
    height: 50px;
    border-radius: 50px;
    background: var(--secondary);
    color: var(--text-color);
    font-weight: 600;
    font-size: 16px;
    text-transform: uppercase;
    cursor: pointer;
    margin: 60px auto 0;
}
@media (max-width: 768px) {
    .container div{
        font-size: 57px;
    }
}
@media (max-width: 480px) {
    .container {
        padding-bottom: 343px;
    }
    .container div {
        font-size: 40px;
        text-align: left;
    }
    button {
        width: 100%;
        margin-top: 40px;
        font-weight: 400;
    }
    .proposal_img{
        scale: 2.2;
        rotate: 8deg;
        position: absolute;
        background: url(/_nuxt/public/images/proposal.svg) no-repeat center center / contain;
        height: 436px;
        width: 100%;
        top: 180px;
        left: 18px;
    }
}
@media (min-width: 480px) and (max-width: 1435px){
    .proposal_img {
        display: none;
    }
}
</style>