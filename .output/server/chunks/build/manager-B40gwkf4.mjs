import { ref, watch, unref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderAttrs } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main$3 = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "dots" }, _attrs))} data-v-6ddf9c76><span data-v-6ddf9c76></span><span data-v-6ddf9c76></span><span data-v-6ddf9c76></span><span data-v-6ddf9c76></span></div>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Dots.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_0$1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$2], ["__scopeId", "data-v-6ddf9c76"]]), { __name: "Dots" });
const _sfc_main$2 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "arrows" }, _attrs))} data-v-dfd89021><div data-v-dfd89021></div><div data-v-dfd89021></div></div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Arrows.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_1$1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-dfd89021"]]), { __name: "Arrows" });
const _imports_0$2 = "" + __buildAssetsURL("img.DpeYfY7n.png");
const _sfc_main$1 = {
  __name: "AppAside",
  __ssrInlineRender: true,
  setup(__props) {
    let formData = ref({
      name: "",
      phone: "",
      email: "",
      source_id: 3
    });
    let errors = ref({
      name: "",
      phone: ""
    });
    const isSubmitting = ref(false);
    const message = ref(null);
    let messageTimer = null;
    watch(message, (newMsg) => {
      clearTimeout(messageTimer);
      if (newMsg) messageTimer = setTimeout(() => message.value = null, 4e3);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Dots = __nuxt_component_0$1;
      const _component_Arrows = __nuxt_component_1$1;
      _push(`<!--[--><div class="news" data-v-243998e4><div class="content" data-v-243998e4><h4 data-v-243998e4>Установки питания серии «PS» вошли в реестр Минпромторга</h4><p data-v-243998e4>Скачать выписку из реестра можно в разделе Сертификаты</p></div><div class="date" data-v-243998e4>10 июля 2025</div></div><div class="news" data-v-243998e4><div class="content" data-v-243998e4><h4 data-v-243998e4>На Международном форуме «Электрические сети – 2024»</h4><p data-v-243998e4>Участие в Международном форуме «Электрические сети – 2024», который проходил в МВЦ «Крокус Экспо» с 3 по 5 декабря.</p></div><div class="date" data-v-243998e4>10 июля 2025</div><div class="dots_arrows" data-v-243998e4>`);
      _push(ssrRenderComponent(_component_Dots, null, null, _parent));
      _push(ssrRenderComponent(_component_Arrows, null, null, _parent));
      _push(`</div></div><div class="news" data-v-243998e4><img${ssrRenderAttr("src", _imports_0$2)} alt="" data-v-243998e4><h4 data-v-243998e4>Вышел новый каталог по инверторам напряжения и установкам электропитания </h4><p data-v-243998e4>Скачать документацию можно в разделе «Листовки, брошюры, каталоги».</p></div><div class="request_form" data-v-243998e4><div class="title" data-v-243998e4><div data-v-243998e4>Оставьте</div><div data-v-243998e4>Заявку</div></div><p data-v-243998e4>И наш менеджер свяжется с вами</p><form class="callback-form" data-v-243998e4><input${ssrRenderAttr("value", unref(formData).name)} type="text" id="name"${ssrRenderAttr("placeholder", unref(errors).name ? unref(errors).name : "Ваше имя")} class="${ssrRenderClass({ "input-error": unref(errors).name })}" data-v-243998e4><input${ssrRenderAttr("value", unref(formData).phone)} type="tel" id="phone"${ssrRenderAttr("placeholder", unref(errors).phone ? unref(errors).phone : "Телефон")} class="${ssrRenderClass({ "input-error": unref(errors).phone })}" data-v-243998e4><button type="submit"${ssrIncludeBooleanAttr(isSubmitting.value) ? " disabled" : ""} data-v-243998e4> Заказать обратный звонок </button>`);
      if (message.value) {
        _push(`<div class="${ssrRenderClass(["message", message.value.type])}" data-v-243998e4>${ssrInterpolate(message.value.text)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</form></div><!--]-->`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppAside.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-243998e4"]]);
const _imports_0$1 = "" + __buildAssetsURL("city_galaty.BVuToEwG.png");
const _imports_1 = "" + __buildAssetsURL("current_galary.CwK3bu6V.png");
const _imports_2 = "" + __buildAssetsURL("wind_galary.DSwnKnJQ.png");
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "gallery" }, _attrs))} data-v-9c4bf4bc><div class="container" data-v-9c4bf4bc><h2 data-v-9c4bf4bc>Фотогалерея</h2><div class="wrapper" data-v-9c4bf4bc><div class="images" data-v-9c4bf4bc><img${ssrRenderAttr("src", _imports_0$1)} data-v-9c4bf4bc><img${ssrRenderAttr("src", _imports_1)} data-v-9c4bf4bc><img${ssrRenderAttr("src", _imports_2)} data-v-9c4bf4bc></div><div class="arrows" data-v-9c4bf4bc><div data-v-9c4bf4bc></div><div data-v-9c4bf4bc></div></div><div class="dots" data-v-9c4bf4bc><span data-v-9c4bf4bc></span><span data-v-9c4bf4bc></span><span data-v-9c4bf4bc></span><span data-v-9c4bf4bc></span></div></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Gallery.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-9c4bf4bc"]]), { __name: "Gallery" });
const _imports_0 = "" + __buildAssetsURL("manager.ByiMISnZ.png");

export { __nuxt_component_0 as _, _imports_0 as a, __nuxt_component_1 as b };
//# sourceMappingURL=manager-B40gwkf4.mjs.map
