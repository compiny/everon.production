import { ref, reactive, mergeProps, watch, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
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
  __name: "ProductAttributes",
  __ssrInlineRender: true,
  props: {
    initialAttributes: {
      type: Array,
      default: () => []
    }
  },
  emits: ["change"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const attributes = ref([...props.initialAttributes]);
    if (attributes.value.length === 0) {
      attributes.value.push({ name: "", value: "" });
    }
    const getCharacteristicsForSave = () => {
      return attributes.value.filter((attr) => {
        const name = typeof attr.name === "string" ? attr.name.trim() : "";
        const value = typeof attr.value === "string" ? attr.value.trim() : "";
        return name !== "" && value !== "";
      }).map((attr) => ({
        // Убедимся, что сохраняем именно строки
        name: String(attr.name).trim(),
        value: String(attr.value).trim()
      }));
    };
    const resetCharacteristics = () => {
      attributes.value = [{ name: "", value: "" }];
      emit("change", []);
    };
    const setCharacteristics = (newAttributes) => {
      if (newAttributes && newAttributes.length > 0) {
        attributes.value = [...newAttributes];
      } else {
        attributes.value = [{ name: "", value: "" }];
      }
    };
    watch(attributes, (newVal) => {
      emit("change", getCharacteristicsForSave());
    }, { deep: true });
    __expose({
      getCharacteristicsForSave,
      resetCharacteristics,
      setCharacteristics
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "product-attributes" }, _attrs))} data-v-c16dd7fc><h3 data-v-c16dd7fc>Характеристики товара</h3><!--[-->`);
      ssrRenderList(attributes.value, (attribute, index) => {
        _push(`<div class="attribute-row" data-v-c16dd7fc><input${ssrRenderAttr("value", attribute.name)} type="text" placeholder="Название характеристики" class="attribute-name" data-v-c16dd7fc><input${ssrRenderAttr("value", attribute.value)} type="text" placeholder="Значение" class="attribute-value" data-v-c16dd7fc><button class="remove-btn" data-v-c16dd7fc>×</button></div>`);
      });
      _push(`<!--]--><button class="add-attribute-btn" data-v-c16dd7fc>+ Добавить характеристику</button></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProductAttributes.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-c16dd7fc"]]);
const _sfc_main = {
  __name: "products",
  __ssrInlineRender: true,
  setup(__props) {
    const isModalOpen = ref(false);
    const isEditing = ref(false);
    const isLoading = ref(false);
    const products2 = ref([]);
    const categories = ref([]);
    const mainImagePreview = ref(null);
    ref(null);
    ref([]);
    const galleryPreviews = ref([]);
    ref(null);
    ref(null);
    const form = reactive({
      id: null,
      name: "",
      slug: "",
      price: 0,
      mainImage: "",
      gallery: "",
      seoTitle: "",
      seoDescription: "",
      description: "",
      attributes: [],
      categoryId: null
    });
    const renderMarkdown = (markdownText) => {
      if (!markdownText) return "";
      let html = markdownText.replace(/^###### (.*$)/gim, "<h6>$1</h6>").replace(/^##### (.*$)/gim, "<h5>$1</h5>").replace(/^#### (.*$)/gim, "<h4>$1</h4>").replace(/^### (.*$)/gim, "<h3>$1</h3>").replace(/^## (.*$)/gim, "<h2>$1</h2>").replace(/^# (.*$)/gim, "<h1>$1</h1>");
      const lines = html.split("\n");
      let result = "";
      let inParagraph = false;
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) {
          if (inParagraph) {
            result += "</p>";
            inParagraph = false;
          }
          continue;
        }
        if (line.startsWith("<h")) {
          if (inParagraph) {
            result += "</p>";
            inParagraph = false;
          }
          result += line;
        } else {
          if (!inParagraph) {
            result += "<p>";
            inParagraph = true;
          } else {
            result += " ";
          }
          result += line;
        }
      }
      if (inParagraph) {
        result += "</p>";
      }
      return result;
    };
    const parseGallery = (galleryStr) => {
      try {
        const arr = JSON.parse(galleryStr);
        if (Array.isArray(arr)) return arr;
        return [];
      } catch {
        return [];
      }
    };
    const getCategoryName = (categoryId) => {
      const cat = categories.value.find((c) => c.id === categoryId);
      return cat ? cat.name : "Без категории";
    };
    const existingGallery = ref([]);
    ref([]);
    const handleCharacteristicsUpdate = (characteristics) => {
      form.attributes = characteristics;
    };
    const productAttributesRef = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ProductAttributes = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "products-page" }, _attrs))} data-v-dd22b93c><div class="page-header" data-v-dd22b93c><h1 data-v-dd22b93c>Товары</h1><button class="add-btn" data-v-dd22b93c>+ Добавить</button></div><div class="products-list" data-v-dd22b93c><!--[-->`);
      ssrRenderList(products2.value, (product) => {
        _push(`<div class="product-item" data-v-dd22b93c><div class="product-info" data-v-dd22b93c><span class="product-name" data-v-dd22b93c>${ssrInterpolate(product.name)}</span><span class="slug" data-v-dd22b93c>(${ssrInterpolate(product.slug)})</span><span class="price" data-v-dd22b93c>${ssrInterpolate(product.price)} ₽</span><span class="category-name" data-v-dd22b93c>Категория: ${ssrInterpolate(getCategoryName(product.categoryId))}</span>`);
        if (product.description) {
          _push(`<div class="product-description" data-v-dd22b93c><div data-v-dd22b93c>${renderMarkdown(product.description) ?? ""}</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div data-v-dd22b93c>Главное фото:</div>`);
        if (product.mainImage) {
          _push(`<div class="product-image" data-v-dd22b93c><img${ssrRenderAttr("src", product.mainImage)}${ssrRenderAttr("alt", product.name)} data-v-dd22b93c></div>`);
        } else {
          _push(`<!---->`);
        }
        if (product.gallery) {
          _push(`<div class="gallery-images" data-v-dd22b93c><div data-v-dd22b93c>Галерея:</div><!--[-->`);
          ssrRenderList(parseGallery(product.gallery), (img, index) => {
            _push(`<img${ssrRenderAttr("src", img)} alt="Gallery image" class="gallery-img" data-v-dd22b93c>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="product-actions" data-v-dd22b93c><button class="edit-btn" data-v-dd22b93c>Редактировать</button><button class="delete-btn" data-v-dd22b93c>Удалить</button></div></div>`);
      });
      _push(`<!--]--></div>`);
      if (isModalOpen.value) {
        _push(`<div class="modal-overlay" data-v-dd22b93c><div class="modal" data-v-dd22b93c><div class="modal-header" data-v-dd22b93c><h3 data-v-dd22b93c>${ssrInterpolate(isEditing.value ? "Редактировать" : "Новый")} товар</h3><button data-v-dd22b93c>×</button></div><form class="modal-form" enctype="multipart/form-data" data-v-dd22b93c><div class="form-group" data-v-dd22b93c><label data-v-dd22b93c>Название *</label><input${ssrRenderAttr("value", form.name)} required data-v-dd22b93c></div><div class="form-group" data-v-dd22b93c><label data-v-dd22b93c>ЧПУ для товара *</label><input${ssrRenderAttr("value", form.slug)} placeholder="product-slug" required data-v-dd22b93c></div><div class="form-group" data-v-dd22b93c><label data-v-dd22b93c>Цена (в ₽) *</label><input type="number"${ssrRenderAttr("value", form.price)} required min="0" data-v-dd22b93c></div><div class="form-group" data-v-dd22b93c><label data-v-dd22b93c>Главное изображение</label><input type="file" accept="image/*" data-v-dd22b93c>`);
        if (mainImagePreview.value) {
          _push(`<div class="image-preview" data-v-dd22b93c><img${ssrRenderAttr("src", mainImagePreview.value)} alt="Preview" data-v-dd22b93c><button type="button" class="remove-image-btn" data-v-dd22b93c>×</button></div>`);
        } else if (form.mainImage) {
          _push(`<div class="image-preview" data-v-dd22b93c><img${ssrRenderAttr("src", form.mainImage)} alt="Current image" data-v-dd22b93c><button type="button" class="remove-image-btn" data-v-dd22b93c>×</button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="form-group" data-v-dd22b93c><label data-v-dd22b93c>Галерея</label><input type="file" multiple accept="image/*" data-v-dd22b93c>`);
        if (existingGallery.value.length > 0) {
          _push(`<div class="existing-gallery" data-v-dd22b93c><h4 data-v-dd22b93c>Существующие изображения:</h4><div class="gallery-preview" data-v-dd22b93c><!--[-->`);
          ssrRenderList(existingGallery.value, (img, index) => {
            _push(`<div class="image-preview" data-v-dd22b93c><img${ssrRenderAttr("src", img)} alt="Existing gallery image" data-v-dd22b93c><button type="button" class="remove-image-btn" data-v-dd22b93c>×</button></div>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (galleryPreviews.value.length > 0) {
          _push(`<div class="new-gallery" data-v-dd22b93c><h4 data-v-dd22b93c>Новые изображения:</h4><div class="gallery-preview" data-v-dd22b93c><!--[-->`);
          ssrRenderList(galleryPreviews.value, (img, index) => {
            _push(`<div class="image-preview" data-v-dd22b93c><img${ssrRenderAttr("src", img)} alt="Gallery image preview" data-v-dd22b93c><button type="button" class="remove-image-btn" data-v-dd22b93c>×</button></div>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        _push(ssrRenderComponent(_component_ProductAttributes, {
          ref_key: "productAttributesRef",
          ref: productAttributesRef,
          "initial-attributes": form.attributes,
          onChange: handleCharacteristicsUpdate
        }, null, _parent));
        _push(`<div class="form-group" data-v-dd22b93c><label data-v-dd22b93c>SEO Title</label><input${ssrRenderAttr("value", form.seoTitle)} maxlength="255" data-v-dd22b93c></div><div class="form-group" data-v-dd22b93c><label data-v-dd22b93c>SEO Description</label><textarea rows="3" maxlength="500" data-v-dd22b93c>${ssrInterpolate(form.seoDescription)}</textarea></div><div class="form-group" data-v-dd22b93c><label data-v-dd22b93c>Описание товара (Markdown)</label><textarea rows="8" placeholder="Введите описание товара с использованием Markdown..." class="markdown-textarea" data-v-dd22b93c>${ssrInterpolate(form.description)}</textarea><div class="markdown-hint" data-v-dd22b93c><small data-v-dd22b93c>Поддерживается Markdown: заголовки и параграфы</small></div></div><div class="form-group" data-v-dd22b93c><label data-v-dd22b93c>Категория</label><select data-v-dd22b93c><option${ssrRenderAttr("value", null)} data-v-dd22b93c${ssrIncludeBooleanAttr(Array.isArray(form.categoryId) ? ssrLooseContain(form.categoryId, null) : ssrLooseEqual(form.categoryId, null)) ? " selected" : ""}>Без категории</option><!--[-->`);
        ssrRenderList(categories.value, (cat) => {
          _push(`<option${ssrRenderAttr("value", cat.id)} data-v-dd22b93c${ssrIncludeBooleanAttr(Array.isArray(form.categoryId) ? ssrLooseContain(form.categoryId, cat.id) : ssrLooseEqual(form.categoryId, cat.id)) ? " selected" : ""}>${ssrInterpolate(cat.name)}</option>`);
        });
        _push(`<!--]--></select></div><div class="form-actions" data-v-dd22b93c><button type="submit"${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""} data-v-dd22b93c>${ssrInterpolate(isLoading.value ? "Загрузка..." : isEditing.value ? "Обновить" : "Сохранить")}</button><button type="button" data-v-dd22b93c>Отмена</button></div></form></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/products.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const products = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-dd22b93c"]]);

export { products as default };
//# sourceMappingURL=products-JbSbYitX.mjs.map
