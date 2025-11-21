import { ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
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

const _sfc_main = {
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const username = ref("");
    const password = ref("");
    const error = ref("");
    const loading = ref(false);
    useAuth();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))} data-v-433dfed1><div data-v-433dfed1><h3 data-v-433dfed1> Вход в панель управления </h3></div><form data-v-433dfed1><div data-v-433dfed1><label for="username" data-v-433dfed1>Логин</label><input id="username"${ssrRenderAttr("value", unref(username))} type="text" required placeholder="Введите логин" data-v-433dfed1></div><div data-v-433dfed1><label for="password" data-v-433dfed1>Пароль</label><input id="password"${ssrRenderAttr("value", unref(password))} type="password" required placeholder="Введите пароль" data-v-433dfed1></div><button type="submit"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} data-v-433dfed1>${ssrInterpolate(unref(loading) ? "Вход..." : "Войти")}</button>`);
      if (unref(error)) {
        _push(`<div data-v-433dfed1>${ssrInterpolate(unref(error))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</form></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const login = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-433dfed1"]]);

export { login as default };
//# sourceMappingURL=login-C89WYO_x.mjs.map
