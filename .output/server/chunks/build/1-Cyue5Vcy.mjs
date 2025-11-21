import { _ as __nuxt_component_0, a as __nuxt_component_3 } from './Counter-DRM8MdKc.mjs';
import { _ as __nuxt_component_1, a as __nuxt_component_2 } from './BuyBtn-BP0vXO2S.mjs';
import { _ as __nuxt_component_4 } from './Proposal-Crq6Fzv_.mjs';
import { ref, unref, isRef, useSSRContext } from 'vue';
import { ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import '@egjs/vue3-flicking';
import './PhoneInput-DYyScDbi.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'drizzle-orm/mysql2';
import 'mysql2/promise';
import 'drizzle-orm/mysql-core';
import 'node:fs';
import 'node:url';
import 'ipx';
import 'node:path';
import 'node:crypto';
import 'vue-router';

const _imports_0 = "" + __buildAssetsURL("product.B8iC2S_f.png");
const _sfc_main = {
  __name: "1",
  __ssrInlineRender: true,
  setup(__props) {
    const property = ref([
      {
        type: "Сетевой инвертор",
        power: {
          kw: "10 кВт",
          w: "10000 Вт"
        },
        controller: "MPPT",
        phases: "Однофазный"
      }
    ]);
    const productImages = ref([
      {
        src: "/images/product1.png",
        alt: "Основное изображение товара",
        caption: "Вид спереди"
      },
      {
        src: "/images/product1.2.png",
        alt: "Боковой вид товара",
        caption: "Боковой вид"
      },
      {
        src: "/images/product1.png",
        alt: "Задняя панель товара",
        caption: "Задняя панель"
      },
      {
        src: "/images/product1.2.png",
        alt: "Задняя панель товара",
        caption: "Задняя панель"
      },
      {
        src: "/images/product1.2.png",
        alt: "Задняя панель товара",
        caption: "Задняя панель"
      },
      {
        src: "/images/product1.2.png",
        alt: "Задняя панель товара",
        caption: "Задняя панель"
      }
    ]);
    const rows = ref([
      { param: "Активная мощность, кВт", value: "0,225(боннель)" },
      { param: "Время автономной работы (при 80% загрузке ИБП)", value: "Зависит от ёмкости внешних АБ" },
      { param: "Число фаз", value: "1 в 1" },
      { param: "Режимы работы", value: "on-line, автономный, байпас, ECO" },
      { param: "Предельный диапазон входного напряжения, В", value: "90-295" }
    ]);
    const quantity = ref(1);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Slider = __nuxt_component_0;
      const _component_Actions = __nuxt_component_1;
      const _component_BuyBtn = __nuxt_component_2;
      const _component_Counter = __nuxt_component_3;
      const _component_Proposal = __nuxt_component_4;
      _push(`<!--[--><div class="container" data-v-0e6f566e><h2 data-v-0e6f566e>Онлайн ИБП «Штиль» STR300SL-27 (300 ВА)</h2><div class="flex content" data-v-0e6f566e><div class="content_img" data-v-0e6f566e><div class="discount" data-v-0e6f566e>40%</div><img${ssrRenderAttr("src", _imports_0)} class="product" alt="" data-v-0e6f566e></div><div class="slider" data-v-0e6f566e>`);
      _push(ssrRenderComponent(_component_Slider, { images: unref(productImages) }, null, _parent));
      _push(`</div><div class="description" data-v-0e6f566e><div class="flex between" data-v-0e6f566e><p data-v-0e6f566e>Код товара: 00000068627</p>`);
      _push(ssrRenderComponent(_component_Actions, null, null, _parent));
      _push(`</div><h6 data-v-0e6f566e>Характеристики</h6><!--[-->`);
      ssrRenderList(unref(property), (item, index) => {
        _push(`<div class="properties" data-v-0e6f566e><div class="property-item" data-v-0e6f566e><span class="property-label" data-v-0e6f566e>Тип устройства —</span><span class="property-value" data-v-0e6f566e>${ssrInterpolate(item.type)}</span></div><div class="property-item" data-v-0e6f566e><span class="property-label" data-v-0e6f566e>Номинальная мощность —</span><span class="property-value" data-v-0e6f566e>${ssrInterpolate(item.power.kw)} (${ssrInterpolate(item.power.w)})</span></div><div class="property-item" data-v-0e6f566e><span class="property-label" data-v-0e6f566e>Контроллер заряда —</span><span class="property-value" data-v-0e6f566e>${ssrInterpolate(item.controller)}</span></div><div class="property-item" data-v-0e6f566e><span class="property-label" data-v-0e6f566e>Количество фаз —</span><span class="property-value" data-v-0e6f566e>${ssrInterpolate(item.phases)}</span></div></div>`);
      });
      _push(`<!--]--><div class="in_stock" data-v-0e6f566e> В наличии </div><div class="price" data-v-0e6f566e>19 810 <span data-v-0e6f566e>руб.</span></div><div class="old-price" data-v-0e6f566e>21 810 руб.</div><div class="flex between" data-v-0e6f566e>`);
      _push(ssrRenderComponent(_component_BuyBtn, null, null, _parent));
      _push(ssrRenderComponent(_component_Counter, {
        modelValue: unref(quantity),
        "onUpdate:modelValue": ($event) => isRef(quantity) ? quantity.value = $event : null
      }, null, _parent));
      _push(`</div></div></div><h3 data-v-0e6f566e>Характеристики</h3><table class="striped-table" data-v-0e6f566e><tbody data-v-0e6f566e><!--[-->`);
      ssrRenderList(unref(rows), (item, index) => {
        _push(`<tr data-v-0e6f566e><td data-v-0e6f566e>${ssrInterpolate(item.param)}</td><td class="t-value" data-v-0e6f566e>${ssrInterpolate(item.value)}</td></tr>`);
      });
      _push(`<!--]--></tbody></table><h3 data-v-0e6f566e>Описание</h3><h6 data-v-0e6f566e>Установка и подключение</h6><p class="description" data-v-0e6f566e> SW300L крепится на любой ровной вертикальной поверхности, которая может выдерживать нагрузку в 4 кг. Монтаж выполняется с помощью шурупов «саморезов». Для удобства в комплект поставки ИБП входит специальный шаблон для разметки поверхности. Прибор подключается к входной сети с помощью сетевого кабеля с евровилкой. Нагрузка подключается в EURO-розетку, расположенную на боковой панели ИБП. </p><h6 data-v-0e6f566e>Автономная работа</h6><p class="description" data-v-0e6f566e> SW300L оснащен встроенным зарядным устройством с током заряда 6 А, благодаря чему возможно подключение внешнего аккумулятора большой емкости (от 17 до 250 Ач). Он сможет обеспечить от 18 мин до 9,5 ч автономной работы нагрузки (при 100% загрузке ИБП). Аккумуляторная батарея, в зависимости от ёмкости, размещается во внешнем напольном стеллаже BS-12-1W или BS-12-2W (Таблица времени автономной работы). </p><p class="description" data-v-0e6f566e> В ИБП используются современные технологии сокращения времени заряда и продления срока службы батарей (интеллектуальный заряд и термокомпенсация заряда), а также алгоритмы, позволяющие: </p><ul data-v-0e6f566e><li data-v-0e6f566e>отключать АБ при разряде на 80-85% (защита от «глубокого» разряда);</li><li data-v-0e6f566e>уведомлять пользователя об износе АБ;</li><li data-v-0e6f566e>прогнозировать время автономии при текущей нагрузке (значение отображается в веб-интерфейсе устройства, для подключения необходима карта мониторинга). </li></ul></div>`);
      _push(ssrRenderComponent(_component_Proposal, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/catalog/[slug]/1.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0e6f566e"]]);

export { _1 as default };
//# sourceMappingURL=1-Cyue5Vcy.mjs.map
