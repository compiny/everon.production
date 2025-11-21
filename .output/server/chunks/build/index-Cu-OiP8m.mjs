import { _ as _sfc_main$4 } from './QuestionButtonModal-na3YZFbj.mjs';
import { ref, withAsyncContext, watch, unref, withCtx, createTextVNode, toDisplayString, mergeProps, reactive, computed, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrRenderStyle, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import { _ as __nuxt_component_1$1, a as __nuxt_component_2, b as __nuxt_component_6 } from './BuyBtn-BP0vXO2S.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-ISZLS8v_.mjs';
import { useRoute } from 'vue-router';
import { u as useFetch } from './fetch-ClN_MczX.mjs';
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
import '@vue/shared';

const _sfc_main$3 = {
  __name: "Banner",
  __ssrInlineRender: true,
  props: {
    title: {
      type: String
    },
    image: {
      type: String,
      default: ""
    },
    description: {
      type: String
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_QuestionButtonModal = _sfc_main$4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))} data-v-d84ef58b><div class="flex" data-v-d84ef58b><div class="text-content" data-v-d84ef58b><h2 data-v-d84ef58b>${ssrInterpolate(__props.title)}</h2>`);
      if (__props.image) {
        _push(`<img${ssrRenderAttr("src", __props.image)}${ssrRenderAttr("alt", __props.title)} class="none" data-v-d84ef58b>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.description) {
        _push(`<p data-v-d84ef58b>${ssrInterpolate(__props.description)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="btn" data-v-d84ef58b>`);
      _push(ssrRenderComponent(_component_QuestionButtonModal, null, null, _parent));
      _push(`</div></div>`);
      if (__props.image) {
        _push(`<img${ssrRenderAttr("src", __props.image)}${ssrRenderAttr("alt", __props.title)} class="img" data-v-d84ef58b>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Banner.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-d84ef58b"]]);
const _sfc_main$2 = {
  __name: "ProductFilter",
  __ssrInlineRender: true,
  props: {
    filters: {
      type: Array,
      default: () => []
    },
    totalProducts: {
      type: Number,
      default: 0
    }
  },
  emits: ["filter-change", "filter-preview"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const openFilters = ref({});
    const pendingFilters = reactive({});
    reactive({});
    const previewCount = ref(0);
    const isLoadingPreview = ref(false);
    let previewTimeout = null;
    props.filters.forEach((filter) => {
      openFilters.value[filter.name] = true;
    });
    watch(() => ({ ...pendingFilters }), async (newFilters) => {
      if (previewTimeout) {
        clearTimeout(previewTimeout);
      }
      previewTimeout = setTimeout(async () => {
        await loadPreviewCount(newFilters);
      }, 300);
    }, { deep: true });
    const loadPreviewCount = async (filters) => {
      if (Object.keys(filters).length === 0) {
        previewCount.value = 0;
        emit("filter-preview", {
          filters: {},
          count: 0
        });
        return;
      }
      isLoadingPreview.value = true;
      try {
        const response = await $fetch("/api/products/filter-count", {
          method: "POST",
          body: { filters }
        });
        previewCount.value = response.count;
        emit("filter-preview", {
          filters: { ...filters },
          count: response.count
        });
      } catch (error) {
        console.error("Error loading preview count:", error);
        previewCount.value = 0;
      } finally {
        isLoadingPreview.value = false;
      }
    };
    const isValueSelected = (filterName, value) => {
      return Array.isArray(pendingFilters[filterName]) && pendingFilters[filterName].includes(value);
    };
    const getPercent = (value, filter) => {
      return (value - filter.min) / (filter.max - filter.min) * 100;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "product-filter" }, _attrs))} data-v-abc4524f><!--[-->`);
      ssrRenderList(__props.filters, (filter) => {
        _push(`<div class="filter-section" data-v-abc4524f><div class="filter-header" data-v-abc4524f>${ssrInterpolate(filter.name)} <span class="${ssrRenderClass([{ rotated: !openFilters.value[filter.name] }, "dropdown-arrow"])}" data-v-abc4524f></span></div>`);
        if (openFilters.value[filter.name]) {
          _push(`<div class="filter-content" data-v-abc4524f>`);
          if (filter.type === "range") {
            _push(`<div class="range-filter" data-v-abc4524f><div class="range-values" data-v-abc4524f><span data-v-abc4524f>От: ${ssrInterpolate(pendingFilters[filter.name]?.[0] ?? filter.min)}</span><span data-v-abc4524f>До: ${ssrInterpolate(pendingFilters[filter.name]?.[1] ?? filter.max)}</span></div><div class="slider-container" data-v-abc4524f><input type="range"${ssrRenderAttr("min", filter.min)}${ssrRenderAttr("max", filter.max)}${ssrRenderAttr("step", filter.step || 1)}${ssrRenderAttr("value", pendingFilters[filter.name]?.[0] ?? filter.min)} class="slider" data-v-abc4524f><input type="range"${ssrRenderAttr("min", filter.min)}${ssrRenderAttr("max", filter.max)}${ssrRenderAttr("step", filter.step || 1)}${ssrRenderAttr("value", pendingFilters[filter.name]?.[1] ?? filter.max)} class="slider" data-v-abc4524f><div class="slider-track" data-v-abc4524f><div class="slider-range" style="${ssrRenderStyle({
              left: getPercent(pendingFilters[filter.name]?.[0] ?? filter.min, filter) + "%",
              width: getPercent(pendingFilters[filter.name]?.[1] ?? filter.max, filter) - getPercent(pendingFilters[filter.name]?.[0] ?? filter.min, filter) + "%"
            })}" data-v-abc4524f></div></div></div></div>`);
          } else {
            _push(`<div class="checkbox-filter" data-v-abc4524f><!--[-->`);
            ssrRenderList(filter.values, (value) => {
              _push(`<div class="checkbox-item" data-v-abc4524f><label class="checkbox-option" data-v-abc4524f><input type="checkbox" class="checkbox-input"${ssrRenderAttr("value", value.value)}${ssrIncludeBooleanAttr(isValueSelected(filter.name, value.value)) ? " checked" : ""} data-v-abc4524f><span class="checkmark" data-v-abc4524f></span> ${ssrInterpolate(value.value)} (${ssrInterpolate(value.count)}) </label></div>`);
            });
            _push(`<!--]--></div>`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--><div class="filter-actions" data-v-abc4524f><button class="apply-btn" data-v-abc4524f> Применить `);
      if (previewCount.value > 0) {
        _push(`<span data-v-abc4524f>(${ssrInterpolate(previewCount.value)})</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button><button class="reset-btn" data-v-abc4524f>Сбросить</button></div></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProductFilter.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-abc4524f"]]);
const _sfc_main$1 = {
  __name: "Pagination",
  __ssrInlineRender: true,
  props: {
    currentPage: {
      type: Number,
      required: true,
      default: 1
    },
    totalItems: {
      type: Number,
      required: true,
      default: 0
    },
    itemsPerPage: {
      type: Number,
      default: 12
    },
    maxVisiblePages: {
      type: Number,
      default: 5
    }
  },
  emits: ["page-change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const totalPages = computed(() => {
      return Math.ceil(props.totalItems / props.itemsPerPage);
    });
    const visiblePages = computed(() => {
      const pages = [];
      const half = Math.floor(props.maxVisiblePages / 2);
      let start = Math.max(1, props.currentPage - half);
      let end = Math.min(totalPages.value, start + props.maxVisiblePages - 1);
      if (end - start + 1 < props.maxVisiblePages) {
        start = Math.max(1, end - props.maxVisiblePages + 1);
      }
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (totalPages.value > 0) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "pagination" }, _attrs))} data-v-2ae64110><button class="pagination-btn pagination-prev"${ssrIncludeBooleanAttr(__props.currentPage === 1) ? " disabled" : ""} data-v-2ae64110><svg width="16" height="16" viewBox="0 0 16 16" fill="none" data-v-2ae64110><path d="M10 12L6 8L10 4" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" data-v-2ae64110></path></svg></button><!--[-->`);
        ssrRenderList(visiblePages.value, (page) => {
          _push(`<button class="${ssrRenderClass([{ active: page === __props.currentPage }, "pagination-btn"])}" data-v-2ae64110>${ssrInterpolate(page)}</button>`);
        });
        _push(`<!--]--><button class="pagination-btn pagination-next"${ssrIncludeBooleanAttr(__props.currentPage === totalPages.value) ? " disabled" : ""} data-v-2ae64110><svg width="16" height="16" viewBox="0 0 16 16" fill="none" data-v-2ae64110><path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" data-v-2ae64110></path></svg></button></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Pagination.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_5 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-2ae64110"]]);
const _imports_0 = "" + __buildAssetsURL("product1.Da3n4GrN.png");
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const { slug } = route.params;
    const products = ref([]);
    const availableFilters = ref([]);
    const activeFilters = ref({});
    const isLoading = ref(false);
    const currentPage = ref(1);
    const itemsPerPage = ref(12);
    const totalProducts = ref(0);
    const buyModalRef = ref();
    const selectedProduct = ref(null);
    const { data: category } = ([__temp, __restore] = withAsyncContext(() => useFetch(`/api/categories/by-slug/${slug}`, "$Ul1_Xg-5SW")), __temp = await __temp, __restore(), __temp);
    const loadAvailableFilters = async () => {
      try {
        if (!category.value?.id) return;
        const response = await $fetch("/api/products/filters-available", {
          query: {
            categoryId: category.value.id
          }
        });
        availableFilters.value = response.filters;
      } catch (error) {
        console.error("Error loading filters:", error);
      }
    };
    const loadProducts = async (filters = {}) => {
      if (!category.value?.id) return;
      isLoading.value = true;
      try {
        const response = await $fetch("/api/products/filter", {
          method: "POST",
          body: {
            filters: {
              ...filters,
              categoryId: category.value.id
            },
            page: currentPage.value,
            limit: itemsPerPage.value
          }
        });
        products.value = response.products;
        totalProducts.value = response.pagination.total;
        await loadAvailableFilters();
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        isLoading.value = false;
      }
    };
    const loadInitialProducts = async () => {
      await loadProducts({});
    };
    const handleFilterPreview = (previewData) => {
      console.log("Preview data:", previewData);
    };
    const handleFilterChange = async (newFilters) => {
      activeFilters.value = newFilters;
      currentPage.value = 1;
      await loadProducts(newFilters);
    };
    const handlePageChange = async (page) => {
      currentPage.value = page;
      await loadProducts(activeFilters.value);
    };
    const onModalClose = () => {
      console.log("Modal closed");
    };
    const onOrderSuccess = (leadId) => {
      console.log("Order success, lead ID:", leadId);
    };
    watch(category, (newCategory) => {
      if (newCategory) {
        loadAvailableFilters();
        loadInitialProducts();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Banner = __nuxt_component_0;
      const _component_ProductFilter = __nuxt_component_1;
      const _component_Actions = __nuxt_component_1$1;
      const _component_nuxt_link = __nuxt_component_0$1;
      const _component_BuyBtn = __nuxt_component_2;
      const _component_Pagination = __nuxt_component_5;
      const _component_BuyProductModal = __nuxt_component_6;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-699aa6be>`);
      _push(ssrRenderComponent(_component_Banner, {
        title: unref(category)?.name,
        image: unref(category)?.imageUrl,
        description: unref(category)?.description
      }, null, _parent));
      _push(`<div class="products" data-v-699aa6be><div class="container flex" data-v-699aa6be><div class="aside" data-v-699aa6be><h2 data-v-699aa6be>${ssrInterpolate(unref(category)?.name)}</h2>`);
      if (availableFilters.value.length > 0) {
        _push(ssrRenderComponent(_component_ProductFilter, {
          filters: availableFilters.value,
          "total-products": totalProducts.value,
          onFilterChange: handleFilterChange,
          onFilterPreview: handleFilterPreview
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (isLoading.value) {
        _push(`<div class="loading" data-v-699aa6be>Загрузка...</div>`);
      } else {
        _push(`<div class="products_list" data-v-699aa6be><!--[-->`);
        ssrRenderList(products.value, (product) => {
          _push(`<div class="card-wrapper" data-v-699aa6be><div class="card-img" data-v-699aa6be>`);
          _push(ssrRenderComponent(_component_Actions, null, null, _parent));
          _push(`<img${ssrRenderAttr("src", _imports_0)} alt="" class="product" data-v-699aa6be></div>`);
          _push(ssrRenderComponent(_component_nuxt_link, {
            to: `/catalog/${unref(category).slug}/${product.slug}`,
            class: "card_title"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(product.name)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(product.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`<div class="price" data-v-699aa6be>${ssrInterpolate(product.price)} руб.</div>`);
          _push(ssrRenderComponent(_component_BuyBtn, {
            product,
            onSuccess: onOrderSuccess
          }, null, _parent));
          _push(`<div class="in_stock" data-v-699aa6be>В наличии</div></div>`);
        });
        _push(`<!--]-->`);
        if (products.value.length === 0) {
          _push(`<div class="no-products" data-v-699aa6be> Товары не найдены </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      _push(`</div><div class="container" data-v-699aa6be>`);
      _push(ssrRenderComponent(_component_Pagination, {
        "current-page": currentPage.value,
        "total-items": totalProducts.value,
        "items-per-page": itemsPerPage.value,
        onPageChange: handlePageChange,
        class: "pagination-wrapper"
      }, null, _parent));
      _push(`</div></div>`);
      _push(ssrRenderComponent(_component_BuyProductModal, {
        ref_key: "buyModalRef",
        ref: buyModalRef,
        product: selectedProduct.value,
        onClose: onModalClose,
        onSuccess: onOrderSuccess
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/catalog/[slug]/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-699aa6be"]]);

export { index as default };
//# sourceMappingURL=index-Cu-OiP8m.mjs.map
