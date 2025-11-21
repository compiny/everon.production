import { ref, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrIncludeBooleanAttr } from 'vue/server-renderer';
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
  __name: "forms",
  __ssrInlineRender: true,
  setup(__props) {
    const columns = [
      { key: "id", label: "ID" },
      { key: "name", label: "Название" },
      { key: "createdAt", label: "Дата создания" }
    ];
    const searchQuery = ref("");
    const sources = ref([]);
    const pending = ref(false);
    const error = ref(null);
    const showDeleteModal = ref(false);
    const showAddModal = ref(false);
    const showEditModal = ref(false);
    const saving = ref(false);
    const formError = ref("");
    const sourceToDelete = ref(null);
    const form = ref({
      id: null,
      name: ""
    });
    const isEditing = computed(() => !!form.value.id);
    const filteredSources = computed(() => {
      if (!sources.value.length) return [];
      return sources.value.filter(
        (source) => source.name && source.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });
    const formatDate = (dateString) => {
      return dateString.replace("T", " ").replace(".000Z", "");
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))} data-v-cd384b86><div class="page-header" data-v-cd384b86><h1 data-v-cd384b86>Источники заявок</h1><button class="add-btn" data-v-cd384b86> + Добавить источник </button></div>`);
      if (unref(pending)) {
        _push(`<div class="loading" data-v-cd384b86><div class="spinner" data-v-cd384b86></div><p data-v-cd384b86>Загрузка источников...</p></div>`);
      } else if (unref(error)) {
        _push(`<div class="error" data-v-cd384b86><div class="error-alert" data-v-cd384b86><h3 data-v-cd384b86>Ошибка загрузки</h3><p data-v-cd384b86>${ssrInterpolate(unref(error).message)}</p></div><button class="retry-btn" data-v-cd384b86> Попробовать снова </button></div>`);
      } else {
        _push(`<div data-v-cd384b86><div class="stats-grid" data-v-cd384b86><div class="stat-card" data-v-cd384b86> Всего: ${ssrInterpolate(unref(sources).length)}</div></div><div class="table-card" data-v-cd384b86><div class="table-header" data-v-cd384b86><div class="search-input" data-v-cd384b86><input${ssrRenderAttr("value", unref(searchQuery))} placeholder="Поиск по названию..." type="text" data-v-cd384b86><span class="search-icon" data-v-cd384b86>🔍</span></div></div><div class="table-container" data-v-cd384b86><table class="data-table" data-v-cd384b86><thead data-v-cd384b86><tr data-v-cd384b86><!--[-->`);
        ssrRenderList(columns, (column) => {
          _push(`<th class="table-header-cell" data-v-cd384b86>${ssrInterpolate(column.label)}</th>`);
        });
        _push(`<!--]--><th class="table-header-cell" data-v-cd384b86>Действия</th></tr></thead><tbody data-v-cd384b86><!--[-->`);
        ssrRenderList(unref(filteredSources), (source) => {
          _push(`<tr class="table-row" data-v-cd384b86><td data-v-cd384b86>${ssrInterpolate(source.id)}</td><td data-v-cd384b86>${ssrInterpolate(source.name)}</td><td data-v-cd384b86>${ssrInterpolate(formatDate(source.createdAt))}</td><td data-v-cd384b86><div class="action-buttons" data-v-cd384b86><button class="edit-btn" title="Редактировать источник" data-v-cd384b86> ✏️ </button><button class="delete-btn" title="Удалить источник" data-v-cd384b86> 🗑️ </button></div></td></tr>`);
        });
        _push(`<!--]--></tbody></table>`);
        if (unref(filteredSources).length === 0) {
          _push(`<div class="empty-state" data-v-cd384b86><p data-v-cd384b86>Источники не найдены</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div>`);
      }
      if (unref(showDeleteModal)) {
        _push(`<div class="modal-overlay" data-v-cd384b86><div class="modal" data-v-cd384b86><h3 data-v-cd384b86>Подтверждение удаления</h3><p data-v-cd384b86>Вы уверены, что хотите удалить источник &quot;${ssrInterpolate(unref(sourceToDelete)?.name)}&quot;?</p><div class="modal-actions" data-v-cd384b86><button class="btn-danger" data-v-cd384b86>Удалить</button><button class="btn-cancel" data-v-cd384b86>Отмена</button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(showAddModal) || unref(showEditModal)) {
        _push(`<div class="modal-overlay" data-v-cd384b86><div class="modal" data-v-cd384b86><h3 data-v-cd384b86>${ssrInterpolate(unref(isEditing) ? "Редактирование" : "Добавление")} источника</h3><form class="source-form" data-v-cd384b86><div class="form-group" data-v-cd384b86><label for="sourceName" data-v-cd384b86>Название источника:</label><input id="sourceName"${ssrRenderAttr("value", unref(form).name)} type="text" required placeholder="Введите название источника"${ssrIncludeBooleanAttr(unref(saving)) ? " disabled" : ""} data-v-cd384b86></div>`);
        if (unref(formError)) {
          _push(`<div class="error-message" data-v-cd384b86>${ssrInterpolate(unref(formError))}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="form-actions" data-v-cd384b86><button type="submit" class="btn-primary"${ssrIncludeBooleanAttr(unref(saving) || !unref(form).name.trim()) ? " disabled" : ""} data-v-cd384b86>`);
        if (unref(saving)) {
          _push(`<span data-v-cd384b86>Сохранение...</span>`);
        } else {
          _push(`<span data-v-cd384b86>${ssrInterpolate(unref(isEditing) ? "Сохранить" : "Добавить")}</span>`);
        }
        _push(`</button><button type="button" class="btn-cancel"${ssrIncludeBooleanAttr(unref(saving)) ? " disabled" : ""} data-v-cd384b86> Отмена </button></div></form></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/forms.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const forms = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-cd384b86"]]);

export { forms as default };
//# sourceMappingURL=forms-CfQffjG_.mjs.map
