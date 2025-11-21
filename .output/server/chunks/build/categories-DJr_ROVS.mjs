import { ref, reactive, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
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
  __name: "categories",
  __ssrInlineRender: true,
  setup(__props) {
    const isModalOpen = ref(false);
    const isEditing = ref(false);
    const isLoading = ref(false);
    const categories2 = ref([]);
    const imagePreview = ref(null);
    ref(null);
    ref(null);
    const form = reactive({
      id: null,
      name: "",
      slug: "",
      imageUrl: "",
      seoTitle: "",
      seoDescription: "",
      description: "",
      parentId: null
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "categories-page" }, _attrs))} data-v-1c4703e9><div class="page-header" data-v-1c4703e9><h1 data-v-1c4703e9>Категории товаров</h1><button class="add-btn" data-v-1c4703e9>+ Добавить</button></div><div class="categories-list" data-v-1c4703e9><!--[-->`);
      ssrRenderList(unref(categories2), (category) => {
        _push(`<div class="category-item" data-v-1c4703e9><div class="category-info" data-v-1c4703e9><span class="category-name" data-v-1c4703e9>${ssrInterpolate(category.name)}</span><span class="slug" data-v-1c4703e9>(${ssrInterpolate(category.slug)})</span>`);
        if (category.imageUrl) {
          _push(`<div class="category-image" data-v-1c4703e9><img${ssrRenderAttr("src", category.imageUrl)}${ssrRenderAttr("alt", category.name)} data-v-1c4703e9></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="category-actions" data-v-1c4703e9><button class="edit-btn" data-v-1c4703e9>Редактировать</button><button class="delete-btn" data-v-1c4703e9>Удалить</button></div></div>`);
      });
      _push(`<!--]--></div>`);
      if (unref(isModalOpen)) {
        _push(`<div class="modal-overlay" data-v-1c4703e9><div class="modal" data-v-1c4703e9><div class="modal-header" data-v-1c4703e9><h3 data-v-1c4703e9>${ssrInterpolate(unref(isEditing) ? "Редактировать" : "Новая")} категория</h3><button data-v-1c4703e9>×</button></div><form class="modal-form" enctype="multipart/form-data" data-v-1c4703e9><div class="form-group" data-v-1c4703e9><label data-v-1c4703e9>Название *</label><input${ssrRenderAttr("value", unref(form).name)} required data-v-1c4703e9></div><div class="form-group" data-v-1c4703e9><label data-v-1c4703e9>ЧПУ для категории *</label><input${ssrRenderAttr("value", unref(form).slug)} placeholder="electronics" required data-v-1c4703e9></div><div class="form-group" data-v-1c4703e9><label data-v-1c4703e9>Изображение категории</label><input type="file" accept="image/*" data-v-1c4703e9>`);
        if (unref(imagePreview)) {
          _push(`<div class="image-preview" data-v-1c4703e9><img${ssrRenderAttr("src", unref(imagePreview))} alt="Preview" data-v-1c4703e9><button type="button" class="remove-image-btn" data-v-1c4703e9>×</button></div>`);
        } else if (unref(form).imageUrl) {
          _push(`<div class="image-preview" data-v-1c4703e9><img${ssrRenderAttr("src", unref(form).imageUrl)} alt="Current image" data-v-1c4703e9><button type="button" class="remove-image-btn" data-v-1c4703e9>×</button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="form-group" data-v-1c4703e9><label data-v-1c4703e9>SEO Title</label><input${ssrRenderAttr("value", unref(form).seoTitle)} maxlength="255" data-v-1c4703e9></div><div class="form-group" data-v-1c4703e9><label data-v-1c4703e9>SEO Description</label><textarea rows="3" maxlength="500" data-v-1c4703e9>${ssrInterpolate(unref(form).seoDescription)}</textarea></div><div class="form-group" data-v-1c4703e9><label data-v-1c4703e9>Описание категории</label><textarea rows="4" data-v-1c4703e9>${ssrInterpolate(unref(form).description)}</textarea></div><div class="form-group" data-v-1c4703e9><label data-v-1c4703e9>Родительская категория</label><select data-v-1c4703e9><option${ssrRenderAttr("value", null)} data-v-1c4703e9${ssrIncludeBooleanAttr(Array.isArray(unref(form).parentId) ? ssrLooseContain(unref(form).parentId, null) : ssrLooseEqual(unref(form).parentId, null)) ? " selected" : ""}>Без родителя</option><!--[-->`);
        ssrRenderList(unref(categories2).filter((c) => c.id !== unref(form).id), (cat) => {
          _push(`<option${ssrRenderAttr("value", cat.id)} data-v-1c4703e9${ssrIncludeBooleanAttr(Array.isArray(unref(form).parentId) ? ssrLooseContain(unref(form).parentId, cat.id) : ssrLooseEqual(unref(form).parentId, cat.id)) ? " selected" : ""}>${ssrInterpolate(cat.name)}</option>`);
        });
        _push(`<!--]--></select></div><div class="form-actions" data-v-1c4703e9><button type="submit"${ssrIncludeBooleanAttr(unref(isLoading)) ? " disabled" : ""} data-v-1c4703e9>${ssrInterpolate(unref(isLoading) ? "Загрузка..." : unref(isEditing) ? "Обновить" : "Сохранить")}</button><button type="button" data-v-1c4703e9>Отмена</button></div></form></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/categories.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const categories = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1c4703e9"]]);

export { categories as default };
//# sourceMappingURL=categories-DJr_ROVS.mjs.map
