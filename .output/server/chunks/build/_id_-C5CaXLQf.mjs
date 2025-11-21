import { ref, withAsyncContext, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc, d as useRoute, u as useRouter } from './server.mjs';
import { u as useFetch } from './fetch-ClN_MczX.mjs';
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
import '@vue/shared';

const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    useRouter();
    const leadId = ref(route.params.id);
    const { data: leadData, pending, error } = ([__temp, __restore] = withAsyncContext(() => useFetch(`/api/leads/${leadId.value}`, "$rGpil-LuUo")), __temp = await __temp, __restore(), __temp);
    const lead = computed(() => leadData.value?.lead);
    const { data: sourcesData } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/sources", "$b4QblIkGWO")), __temp = await __temp, __restore(), __temp);
    const sources = computed(() => sourcesData.value?.sources || []);
    const getSourceName = (sourceId) => {
      if (!sources.value.length || !sourceId) return "-";
      const source = sources.value.find((s) => s.id === sourceId);
      return source ? source.name : "-";
    };
    const formatDate = (dateString) => {
      if (!dateString) return "-";
      return new Date(dateString).toLocaleDateString("ru-RU", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "lead-detail-page" }, _attrs))} data-v-b81bb57a><div class="page-header" data-v-b81bb57a><button class="back-btn" data-v-b81bb57a>← Назад</button><h1 data-v-b81bb57a>Заявка #${ssrInterpolate(unref(lead)?.id)}</h1></div>`);
      if (unref(pending)) {
        _push(`<div class="loading" data-v-b81bb57a>Загрузка...</div>`);
      } else if (unref(error)) {
        _push(`<div class="error" data-v-b81bb57a>Ошибка: ${ssrInterpolate(unref(error).message)}</div>`);
      } else if (unref(lead)) {
        _push(`<div class="lead-details" data-v-b81bb57a><div class="detail-card" data-v-b81bb57a><h3 data-v-b81bb57a>Основная информация</h3><div class="detail-grid" data-v-b81bb57a><div class="detail-item" data-v-b81bb57a><label data-v-b81bb57a>Имя:</label><span data-v-b81bb57a>${ssrInterpolate(unref(lead).name || "-")}</span></div><div class="detail-item" data-v-b81bb57a><label data-v-b81bb57a>Email:</label><span data-v-b81bb57a>${ssrInterpolate(unref(lead).email || "-")}</span></div><div class="detail-item" data-v-b81bb57a><label data-v-b81bb57a>Телефон:</label><span data-v-b81bb57a>${ssrInterpolate(unref(lead).phone || "-")}</span></div><div class="detail-item" data-v-b81bb57a><label data-v-b81bb57a>Источник:</label><span data-v-b81bb57a>${ssrInterpolate(getSourceName(unref(lead).sourceId) || "-")}</span></div><div class="detail-item" data-v-b81bb57a><label data-v-b81bb57a>Дата создания:</label><span data-v-b81bb57a>${ssrInterpolate(formatDate(unref(lead).createdAt))}</span></div></div></div>`);
        if (unref(lead).message) {
          _push(`<div class="detail-card" data-v-b81bb57a><h3 data-v-b81bb57a>Сообщение</h3><p class="message-content" data-v-b81bb57a>${ssrInterpolate(unref(lead).message)}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b81bb57a"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-C5CaXLQf.mjs.map
