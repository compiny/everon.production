import { _ as __nuxt_component_0$1 } from './nuxt-link-ISZLS8v_.mjs';
import { ref, unref, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import { u as useAuth } from './useAuth-CMDAbhFL.mjs';
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
import 'vue-router';

const _sfc_main$1 = {
  __name: "NavAdmin",
  __ssrInlineRender: true,
  setup(__props) {
    useAuth();
    const mounted = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0$1;
      if (unref(mounted)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "navbar" }, _attrs))} data-v-17b57f83><div class="menu" data-v-17b57f83>`);
        _push(ssrRenderComponent(_component_nuxt_link, { to: "/admin" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Заявки`);
            } else {
              return [
                createTextVNode("Заявки")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_nuxt_link, { to: "/admin/categories" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Категории`);
            } else {
              return [
                createTextVNode("Категории")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_nuxt_link, { to: "/admin/products" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Товары`);
            } else {
              return [
                createTextVNode("Товары")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_nuxt_link, { to: "/admin/news" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Новости`);
            } else {
              return [
                createTextVNode("Новости")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_nuxt_link, { to: "/admin/forms" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Формы`);
            } else {
              return [
                createTextVNode("Формы")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><button type="button" data-v-17b57f83>Выход   →</button></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/NavAdmin.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-17b57f83"]]);
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NavAdmin = __nuxt_component_0;
  _push(`<div${ssrRenderAttrs(_attrs)} data-v-11d05719>`);
  _push(ssrRenderComponent(_component_NavAdmin, null, null, _parent));
  _push(`<div class="admin-page" data-v-11d05719>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const dashboard = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-11d05719"]]);

export { dashboard as default };
//# sourceMappingURL=dashboard-JCi9aUiD.mjs.map
