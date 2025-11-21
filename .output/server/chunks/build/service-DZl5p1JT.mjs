import { _ as _sfc_main$1 } from './QuestionButtonModal-na3YZFbj.mjs';
import { _ as __nuxt_component_2 } from './CallbackForm--muPJtjF.mjs';
import { useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import './FormCuestion-CY7LYL9g.mjs';
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

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_QuestionButtonModal = _sfc_main$1;
  const _component_CallbackForm = __nuxt_component_2;
  _push(`<!--[--><div class="container" data-v-45b312f6><h2 data-v-45b312f6>Услуги</h2><ul data-v-45b312f6><li data-v-45b312f6><h3 data-v-45b312f6>Консультация</h3><p data-v-45b312f6>Профессиональная консультация по выбору оборудования</p></li><li data-v-45b312f6><h3 data-v-45b312f6>Монтаж</h3><p data-v-45b312f6>Установка и настройка оборудования</p></li><li data-v-45b312f6><h3 data-v-45b312f6>Обслуживание</h3><p data-v-45b312f6>Техническе обслуживание и ремонт</p></li><li data-v-45b312f6><h3 data-v-45b312f6>Проектирование</h3><p data-v-45b312f6>Разработка технических решений</p></li></ul><div class="btn" data-v-45b312f6>`);
  _push(ssrRenderComponent(_component_QuestionButtonModal, null, null, _parent));
  _push(`</div></div>`);
  _push(ssrRenderComponent(_component_CallbackForm, null, null, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/service.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const service = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-45b312f6"]]);

export { service as default };
//# sourceMappingURL=service-DZl5p1JT.mjs.map
