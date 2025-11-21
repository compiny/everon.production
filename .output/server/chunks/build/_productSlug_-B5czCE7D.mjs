import { _ as __nuxt_component_0, a as __nuxt_component_3 } from './Counter-DRM8MdKc.mjs';
import { _ as __nuxt_component_1, a as __nuxt_component_2 } from './BuyBtn-BP0vXO2S.mjs';
import { _ as __nuxt_component_4 } from './Proposal-Crq6Fzv_.mjs';
import { ref, withAsyncContext, watchEffect, computed, unref, isRef, useSSRContext } from 'vue';
import { ssrInterpolate, ssrRenderAttr, ssrRenderComponent, ssrRenderList } from 'vue/server-renderer';
import { _ as _export_sfc, d as useRoute } from './server.mjs';
import { u as useFetch } from './fetch-ClN_MczX.mjs';
import { u as useSeoMeta } from './composables-Cg06e_rc.mjs';
import '@egjs/vue3-flicking';
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
import '@vue/shared';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const _sfc_main = {
  __name: "[productSlug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const product = ref(null);
    const loading = ref(true);
    ref(null);
    const quantity = ref(1);
    const productSlug = route.params.productSlug;
    const { data: productData, pending } = ([__temp, __restore] = withAsyncContext(() => useFetch(`/api/products/by-slug/${productSlug}`, "$iQlAWFpaAV")), __temp = await __temp, __restore(), __temp);
    watchEffect(() => {
      if (productData.value) {
        product.value = productData.value;
        loading.value = pending.value;
      }
    });
    const formattedPrice = computed(() => {
      if (!product.value) return "0";
      return new Intl.NumberFormat("ru-RU").format(product.value.price);
    });
    const formattedOldPrice = computed(() => {
      if (!product.value) return "0";
      const oldPrice = Math.round(product.value.price * 1.4);
      return new Intl.NumberFormat("ru-RU").format(oldPrice);
    });
    const productImages = computed(() => {
      if (!product.value) return [];
      let gallery = [];
      if (product.value.mainImage) {
        gallery.push({
          src: product.value.mainImage,
          alt: product.value.name,
          caption: "Основное изображение"
        });
      }
      if (product.value.gallery) {
        try {
          const galleryArray = typeof product.value.gallery === "string" ? JSON.parse(product.value.gallery) : product.value.gallery;
          galleryArray.forEach((img, index) => {
            if (typeof img === "string") {
              gallery.push({
                src: img,
                alt: `${product.value.name} - изображение ${index + 1}`,
                caption: `Изображение ${index + 1}`
              });
            } else if (img.src) {
              gallery.push({
                src: img.src,
                alt: img.alt || `${product.value.name} - изображение ${index + 1}`,
                caption: img.caption || `Изображение ${index + 1}`
              });
            }
          });
        } catch (e) {
          console.error("Error parsing gallery:", e);
        }
      }
      if (gallery.length === 0) {
        gallery = [
          {
            src: "/images/product1.png",
            alt: product.value.name,
            caption: "Основное изображение"
          },
          {
            src: "/images/product1.2.png",
            alt: `${product.value.name} - боковой вид`,
            caption: "Боковой вид"
          }
        ];
      }
      return gallery;
    });
    useSeoMeta({
      title: product.value?.seoTitle || product.value?.name,
      description: product.value?.seoDescription || `Купить ${product.value?.name} по выгодной цене`
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Slider = __nuxt_component_0;
      const _component_Actions = __nuxt_component_1;
      const _component_BuyBtn = __nuxt_component_2;
      const _component_Counter = __nuxt_component_3;
      const _component_Proposal = __nuxt_component_4;
      _push(`<!--[-->`);
      if (unref(product)) {
        _push(`<div class="container" data-v-1df3ff3c><h2 data-v-1df3ff3c>${ssrInterpolate(unref(product).name)}</h2><div class="flex content" data-v-1df3ff3c><div class="content_img" data-v-1df3ff3c><div class="discount" data-v-1df3ff3c>40%</div><img${ssrRenderAttr("src", unref(product).mainImage || "/public/images/product.png")} class="product"${ssrRenderAttr("alt", unref(product).name)} data-v-1df3ff3c></div><div class="slider" data-v-1df3ff3c>`);
        _push(ssrRenderComponent(_component_Slider, { images: unref(productImages) }, null, _parent));
        _push(`</div><div class="description" data-v-1df3ff3c><div class="flex between" data-v-1df3ff3c><p data-v-1df3ff3c>Код товара: ${ssrInterpolate(unref(product).id)}</p>`);
        _push(ssrRenderComponent(_component_Actions, null, null, _parent));
        _push(`</div><h6 data-v-1df3ff3c>Характеристики</h6>`);
        if (unref(product).attributes && unref(product).attributes.length) {
          _push(`<div class="properties" data-v-1df3ff3c><!--[-->`);
          ssrRenderList(unref(product).attributes, (attr, index) => {
            _push(`<div class="property-item" data-v-1df3ff3c><span class="property-label" data-v-1df3ff3c>${ssrInterpolate(attr.name)} —</span><span class="property-value" data-v-1df3ff3c>${ssrInterpolate(attr.value)}</span></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<div class="properties" data-v-1df3ff3c><p data-v-1df3ff3c>Характеристики отсутствуют</p></div>`);
        }
        _push(`<div class="in_stock" data-v-1df3ff3c> В наличии </div><div class="price" data-v-1df3ff3c>${ssrInterpolate(unref(formattedPrice))} <span data-v-1df3ff3c>руб.</span></div><div class="old-price" data-v-1df3ff3c>${ssrInterpolate(unref(formattedOldPrice))} руб.</div><div class="flex between" data-v-1df3ff3c>`);
        _push(ssrRenderComponent(_component_BuyBtn, {
          product: unref(product),
          onSuccess: _ctx.onOrderSuccess
        }, null, _parent));
        _push(ssrRenderComponent(_component_Counter, {
          modelValue: unref(quantity),
          "onUpdate:modelValue": ($event) => isRef(quantity) ? quantity.value = $event : null
        }, null, _parent));
        _push(`</div></div></div><h3 data-v-1df3ff3c>Характеристики</h3>`);
        if (unref(product).attributes && unref(product).attributes.length) {
          _push(`<table class="striped-table" data-v-1df3ff3c><tbody data-v-1df3ff3c><!--[-->`);
          ssrRenderList(unref(product).attributes, (attr, index) => {
            _push(`<tr data-v-1df3ff3c><td data-v-1df3ff3c>${ssrInterpolate(attr.name)}</td><td class="t-value" data-v-1df3ff3c>${ssrInterpolate(attr.value)}</td></tr>`);
          });
          _push(`<!--]--></tbody></table>`);
        } else {
          _push(`<table class="striped-table" data-v-1df3ff3c><tbody data-v-1df3ff3c><tr data-v-1df3ff3c><td colspan="2" data-v-1df3ff3c>Характеристики отсутствуют</td></tr></tbody></table>`);
        }
        _push(`<h3 data-v-1df3ff3c>Описание</h3>`);
        if (unref(product).description) {
          _push(`<div class="product-description" data-v-1df3ff3c>${unref(product).description ?? ""}</div>`);
        } else {
          _push(`<div data-v-1df3ff3c><p data-v-1df3ff3c>Описание товара отсутствует.</p></div>`);
        }
        _push(`</div>`);
      } else if (unref(loading)) {
        _push(`<div class="container" data-v-1df3ff3c><p data-v-1df3ff3c>Загрузка товара...</p></div>`);
      } else {
        _push(`<div class="container" data-v-1df3ff3c><p data-v-1df3ff3c>Товар не найден</p></div>`);
      }
      if (unref(product)) {
        _push(ssrRenderComponent(_component_Proposal, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/catalog/[slug]/[productSlug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _productSlug_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1df3ff3c"]]);

export { _productSlug_ as default };
//# sourceMappingURL=_productSlug_-B5czCE7D.mjs.map
