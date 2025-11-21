import { _ as __nuxt_component_0 } from './nuxt-link-ISZLS8v_.mjs';
import { _ as __nuxt_component_4 } from './Proposal-Crq6Fzv_.mjs';
import { withAsyncContext, computed, unref, withCtx, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderList, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { u as useFetch } from './fetch-ClN_MczX.mjs';
import { _ as _export_sfc } from './server.mjs';
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
import '@vue/shared';
import 'vue-router';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data, pending, error } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/categories", "$WaEuEcahYG")), __temp = await __temp, __restore(), __temp);
    const categories = computed(() => data.value?.categories || []);
    const handleImageError = (event) => {
      event.target.src = "/images/placeholder.jpg";
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Proposal = __nuxt_component_4;
      _push(`<!--[--><div class="catalog-page" data-v-3b4fc01a><div class="container" data-v-3b4fc01a><h2 data-v-3b4fc01a>Каталог</h2>`);
      if (unref(pending)) {
        _push(`<div class="loading" data-v-3b4fc01a>Загрузка категорий...</div>`);
      } else if (unref(error)) {
        _push(`<div class="error" data-v-3b4fc01a>Ошибка загрузки категорий</div>`);
      } else {
        _push(`<div data-v-3b4fc01a><ul class="categories" data-v-3b4fc01a><!--[-->`);
        ssrRenderList(unref(categories), (category) => {
          _push(`<li data-v-3b4fc01a>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/catalog/${category.slug}`
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<img${ssrRenderAttr("src", category.imageUrl)}${ssrRenderAttr("alt", category.name)} data-v-3b4fc01a${_scopeId}><div data-v-3b4fc01a${_scopeId}>${ssrInterpolate(category.name)}</div>`);
              } else {
                return [
                  createVNode("img", {
                    src: category.imageUrl,
                    alt: category.name,
                    onError: handleImageError
                  }, null, 40, ["src", "alt"]),
                  createVNode("div", null, toDisplayString(category.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</li>`);
        });
        _push(`<!--]--></ul></div>`);
      }
      _push(`</div></div>`);
      _push(ssrRenderComponent(_component_Proposal, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/catalog/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3b4fc01a"]]);

export { index as default };
//# sourceMappingURL=index-dgyHCutR.mjs.map
