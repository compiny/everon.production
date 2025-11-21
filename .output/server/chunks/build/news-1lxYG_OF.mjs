import { ref, reactive, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
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
  __name: "news",
  __ssrInlineRender: true,
  setup(__props) {
    const news2 = ref([]);
    const showCreateForm = ref(false);
    const editingNews = ref(null);
    const isLoading = ref(false);
    const form = reactive({
      title: "",
      date: "",
      description: ""
    });
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("ru-RU");
    };
    const formatDateTime = (dateString) => {
      return new Date(dateString).toLocaleString("ru-RU");
    };
    const truncateText = (text, length) => {
      if (!text) return "";
      return text.length > length ? text.substring(0, length) + "..." : text;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-news" }, _attrs))} data-v-a1e3b546><div class="page-header" data-v-a1e3b546><h1 data-v-a1e3b546>Управление новостями</h1><button class="add-btn" data-v-a1e3b546>+ Добавить</button></div><div class="news-list" data-v-a1e3b546><!--[-->`);
      ssrRenderList(unref(news2), (item) => {
        _push(`<div class="news-item" data-v-a1e3b546><div class="news-info" data-v-a1e3b546><h3 data-v-a1e3b546>${ssrInterpolate(item.title)}</h3><p class="news-date" data-v-a1e3b546>${ssrInterpolate(formatDate(item.date))}</p>`);
        if (item.description) {
          _push(`<p class="news-description" data-v-a1e3b546>${ssrInterpolate(truncateText(item.description, 100))}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<p class="created-at" data-v-a1e3b546>Создано: ${ssrInterpolate(formatDateTime(item.createdAt))}</p></div><div class="news-actions" data-v-a1e3b546><button class="edit-btn" data-v-a1e3b546>Редактировать</button><button class="delete-btn" data-v-a1e3b546>Удалить</button></div></div>`);
      });
      _push(`<!--]--></div>`);
      if (unref(showCreateForm) || unref(editingNews)) {
        _push(`<div class="modal-overlay" data-v-a1e3b546><div class="modal" data-v-a1e3b546><div class="modal-header" data-v-a1e3b546><h3 data-v-a1e3b546>${ssrInterpolate(unref(editingNews) ? "Редактировать" : "Создать")} новость</h3><button data-v-a1e3b546>×</button></div><form class="modal-form" data-v-a1e3b546><div class="form-group" data-v-a1e3b546><label data-v-a1e3b546>Заголовок *</label><input${ssrRenderAttr("value", unref(form).title)} required data-v-a1e3b546></div><div class="form-group" data-v-a1e3b546><label data-v-a1e3b546>Дата новости *</label><input type="date"${ssrRenderAttr("value", unref(form).date)} required data-v-a1e3b546></div><div class="form-group" data-v-a1e3b546><label data-v-a1e3b546>Описание</label><textarea rows="6" placeholder="Текст новости..." data-v-a1e3b546>${ssrInterpolate(unref(form).description)}</textarea></div><div class="form-actions" data-v-a1e3b546><button type="submit"${ssrIncludeBooleanAttr(unref(isLoading)) ? " disabled" : ""} data-v-a1e3b546>${ssrInterpolate(unref(isLoading) ? "Сохранение..." : unref(editingNews) ? "Обновить" : "Создать")}</button><button type="button" data-v-a1e3b546>Отмена</button></div></form></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/news.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const news = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a1e3b546"]]);

export { news as default };
//# sourceMappingURL=news-1lxYG_OF.mjs.map
