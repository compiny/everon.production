import { ref, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { _ as _export_sfc, b as useRuntimeConfig } from './server.mjs';
import { _ as __nuxt_component_1 } from './FormCuestion-CY7LYL9g.mjs';
import { _ as __nuxt_component_2 } from './CallbackForm--muPJtjF.mjs';
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
import './PhoneInput-DYyScDbi.mjs';

const _sfc_main$1 = {
  __name: "MapAddress",
  __ssrInlineRender: true,
  props: {
    initialCoords: {
      type: Array,
      default: () => [55.012068, 82.93306]
    },
    mobileCoords: {
      type: Array,
      default: () => [55.012068, 82.93306]
    },
    pointCoords: {
      type: Array,
      default: () => [55.012068, 82.93306]
    },
    initialZoom: {
      type: Number,
      default: 13
    },
    width: {
      type: Number,
      default: 600
    },
    height: {
      type: Number,
      default: 400
    }
  },
  setup(__props) {
    const runtimeConfig = useRuntimeConfig();
    const apiKey = runtimeConfig.public.yandexStaticApiKey;
    const props = __props;
    const zoom = ref(props.initialZoom);
    const coords = ref(props.initialCoords);
    const point = ref(props.pointCoords);
    ref(true);
    const error = ref(false);
    const isDragging = ref(false);
    ref(0);
    ref(0);
    ref([0, 0]);
    const mapUrl = computed(() => {
      const params = new URLSearchParams({
        l: "map",
        ll: coords.value.join(","),
        z: zoom.value.toString(),
        size: `${props.width},${props.height}`,
        pt: `${point.value.join(",")},vkbkm`
      });
      if (apiKey) {
        params.append("apikey", apiKey);
        return `https://static-maps.yandex.ru/v1?${params.toString()}`;
      }
      return `https://static-maps.yandex.ru/1.x/?${params.toString()}`;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "zoomable-map" }, _attrs))} data-v-97f55910><div class="map-controls" data-v-97f55910><button${ssrIncludeBooleanAttr(zoom.value >= 18) ? " disabled" : ""} class="zoom-btn" data-v-97f55910><span data-v-97f55910>+</span></button><button${ssrIncludeBooleanAttr(zoom.value <= 1) ? " disabled" : ""} class="zoom-btn" data-v-97f55910><span data-v-97f55910>-</span></button><span class="zoom-level" data-v-97f55910>Масштаб: ${ssrInterpolate(zoom.value)}</span></div><div class="map-container" data-v-97f55910><img${ssrRenderAttr("src", mapUrl.value)} alt="Интерактивная карта" class="${ssrRenderClass([{ "grabbing": isDragging.value }, "map-image"])}" data-v-97f55910><div class="local" data-v-97f55910></div></div>`);
      if (error.value) {
        _push(`<div class="error" data-v-97f55910>Ошибка загрузки</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/MapAddress.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-97f55910"]]), { __name: "MapAddress" });
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_MapAddress = __nuxt_component_0;
  const _component_FormCuestion = __nuxt_component_1;
  const _component_CallbackForm = __nuxt_component_2;
  _push(`<!--[--><div class="container" data-v-783dd89e><h2 data-v-783dd89e>Контакты</h2><div class="contacts" data-v-783dd89e><a class="number" href="tel:+79538617920" data-v-783dd89e>+7 953 861 79 20</a><div class="address" data-v-783dd89e>Новосибирск, ул. Зыряновская д. 18/1 оф. 9</div><a class="mail" href="mailto:info@everon-pro.ru" data-v-783dd89e>info@everon-pro.ru</a></div><div class="flex" data-v-783dd89e>`);
  _push(ssrRenderComponent(_component_MapAddress, null, null, _parent));
  _push(ssrRenderComponent(_component_FormCuestion, null, null, _parent));
  _push(`</div></div>`);
  _push(ssrRenderComponent(_component_CallbackForm, null, null, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/contacts.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const contacts = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-783dd89e"]]);

export { contacts as default };
//# sourceMappingURL=contacts-CIYWxctA.mjs.map
