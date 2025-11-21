import { withAsyncContext, ref, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderStyle } from 'vue/server-renderer';
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
    const { data: leads, refresh: refreshLeads } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/leads", "$DxKOFNjEn8")), __temp = await __temp, __restore(), __temp);
    const { data: sourcesData } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/sources", "$iqwdqQaRmC")), __temp = await __temp, __restore(), __temp);
    const showDeleteModal = ref(false);
    ref(null);
    const selectedSource = ref("");
    const sources = computed(() => sourcesData.value?.sources || []);
    const filteredLeads = computed(() => {
      if (!leads.value?.leads) return [];
      if (!selectedSource.value) {
        return leads.value.leads;
      }
      return leads.value.leads.filter(
        (lead) => lead.sourceId?.toString() === selectedSource.value.toString()
      );
    });
    const getSourceName = (sourceId) => {
      if (!sources.value.length || !sourceId) return "-";
      const source = sources.value.find((s) => s.id === sourceId);
      return source ? source.name : "-";
    };
    const formatDate = (dateString) => {
      return dateString.replace("T", " ").replace(".000Z", "");
    };
    const getProductNames = (lead) => {
      if (lead.productNames && lead.productNames.length > 0) {
        return lead.productNames.filter((name) => name).join(", ");
      }
      if (lead.productIds && lead.productIds.length > 0) {
        return lead.productIds.map((id) => `#${id}`).join(", ");
      }
      return "-";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "applications-page" }, _attrs))} data-v-6c2dd029><div class="page-header" data-v-6c2dd029><h1 data-v-6c2dd029>Управление заявками</h1><div class="header-controls" data-v-6c2dd029><div class="filter-controls" data-v-6c2dd029><select class="source-filter" data-v-6c2dd029><option value="" data-v-6c2dd029${ssrIncludeBooleanAttr(Array.isArray(unref(selectedSource)) ? ssrLooseContain(unref(selectedSource), "") : ssrLooseEqual(unref(selectedSource), "")) ? " selected" : ""}>Все источники</option><!--[-->`);
      ssrRenderList(unref(sources), (source) => {
        _push(`<option${ssrRenderAttr("value", source.id)} data-v-6c2dd029${ssrIncludeBooleanAttr(Array.isArray(unref(selectedSource)) ? ssrLooseContain(unref(selectedSource), source.id) : ssrLooseEqual(unref(selectedSource), source.id)) ? " selected" : ""}>${ssrInterpolate(source.name)}</option>`);
      });
      _push(`<!--]--></select></div><div class="stat-item" data-v-6c2dd029>Всего: ${ssrInterpolate(unref(filteredLeads).length)}</div></div></div><div class="applications-table" data-v-6c2dd029>`);
      if (unref(filteredLeads).length === 0) {
        _push(`<div class="empty-state" data-v-6c2dd029>${ssrInterpolate(unref(selectedSource) ? "Заявки по выбранному источнику не найдены" : "Заявки не найдены")}</div>`);
      } else {
        _push(`<div class="table-container" data-v-6c2dd029><table class="leads-table" data-v-6c2dd029><thead data-v-6c2dd029><tr data-v-6c2dd029><th data-v-6c2dd029>ID</th><th data-v-6c2dd029>Имя</th><th data-v-6c2dd029>Email</th><th data-v-6c2dd029>Телефон</th><th data-v-6c2dd029>Источник</th><th data-v-6c2dd029>Сообщение</th><th data-v-6c2dd029>Дата создания</th><th data-v-6c2dd029>Товар</th><th data-v-6c2dd029>Действия</th></tr></thead><tbody data-v-6c2dd029><!--[-->`);
        ssrRenderList(unref(filteredLeads), (lead) => {
          _push(`<tr class="table-row" style="${ssrRenderStyle({ "cursor": "pointer" })}" data-v-6c2dd029><td data-v-6c2dd029>${ssrInterpolate(lead.id || "-")}</td><td data-v-6c2dd029>${ssrInterpolate(lead.name || "-")}</td><td data-v-6c2dd029>${ssrInterpolate(lead.email || "-")}</td><td data-v-6c2dd029>${ssrInterpolate(lead.phone || "-")}</td><td data-v-6c2dd029>${ssrInterpolate(getSourceName(lead.sourceId) || "-")}</td><td class="message-cell" data-v-6c2dd029>${ssrInterpolate(lead.message || "-")}</td><td data-v-6c2dd029>${ssrInterpolate(formatDate(lead.createdAt))}</td><td class="product-names" data-v-6c2dd029>${ssrInterpolate(getProductNames(lead))}</td><td data-v-6c2dd029><button class="delete-btn" title="Удалить заявку" data-v-6c2dd029> Удалить </button></td></tr>`);
        });
        _push(`<!--]--></tbody></table></div>`);
      }
      _push(`</div>`);
      if (unref(showDeleteModal)) {
        _push(`<div class="modal-overlay" data-v-6c2dd029><div class="modal" data-v-6c2dd029><h3 data-v-6c2dd029>Подтверждение удаления</h3><p data-v-6c2dd029>Вы уверены, что хотите удалить эту заявку?</p><div class="modal-actions" data-v-6c2dd029><button class="btn-danger" data-v-6c2dd029>Удалить</button><button class="btn-cancel" data-v-6c2dd029>Отмена</button></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6c2dd029"]]);

export { index as default };
//# sourceMappingURL=index-C4wjxqBt.mjs.map
