import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { ref, watch, mergeProps, withCtx, createTextVNode, unref, toDisplayString, useSSRContext } from 'vue';
import { _ as _export_sfc, i as __nuxt_component_2, d as useRoute } from './server.mjs';
import { _ as __nuxt_component_0$2 } from './nuxt-link-ISZLS8v_.mjs';
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

const _imports_0 = "" + __buildAssetsURL("logo.Bjhf-poM.svg");
const _imports_1 = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M4.56094%2019.5608C4.64608%2019.2956%204.71443%2019.0731%204.78838%2018.8532C5.00527%2018.207%205.21718%2017.5584%205.44711%2016.9166C5.52106%2016.7103%205.49061%2016.5594%205.37378%2016.3748C3.70708%2013.7436%203.54116%2011.0124%204.96239%208.24264C6.49299%205.25916%209.90593%203.56426%2013.1418%204.09733C16.6088%204.66893%2019.2598%207.26844%2019.816%2010.6421C20.5462%2015.0689%2017.549%2019.1906%2013.1045%2019.8386C11.2482%2020.1088%209.50013%2019.7479%207.88999%2018.7755C7.68678%2018.6531%207.51837%2018.6208%207.28905%2018.6991C6.49734%2018.97%205.69693%2019.2173%204.89962%2019.472C4.80454%2019.5024%204.70698%2019.5229%204.56094%2019.5608ZM7.34871%209.83317C7.37108%2010.0177%207.38289%2010.2035%207.41707%2010.3855C7.57927%2011.2448%208.05902%2011.9431%208.55865%2012.6334C9.92644%2014.5215%2011.6832%2015.8399%2013.9938%2016.3363C14.3101%2016.404%2014.6643%2016.4351%2014.9744%2016.3655C16.2564%2016.0778%2016.7548%2015.4199%2016.7579%2014.3718C16.7585%2014.2525%2016.6746%2014.0729%2016.5777%2014.0226C15.9718%2013.7095%2015.3528%2013.4224%2014.7351%2013.1323C14.5077%2013.0254%2014.3101%2013.0838%2014.1572%2013.2814C13.9994%2013.4864%2013.8508%2013.6983%2013.6905%2013.9014C13.3829%2014.291%2013.2443%2014.3258%2012.7875%2014.1313C11.5136%2013.5889%2010.5634%2012.6831%209.84379%2011.5144C9.71267%2011.3007%209.73504%2011.1323%209.89537%2010.9565C10.0625%2010.7732%2010.2483%2010.598%2010.3757%2010.3892C10.4634%2010.2457%2010.5429%2010.0214%2010.492%209.88287C10.2496%209.22429%209.96559%208.58001%209.68408%207.93634C9.64244%207.84128%209.54426%207.71951%209.45601%207.70459C8.97813%207.62258%208.50397%207.60394%208.11992%207.98915C7.61282%208.49799%207.36301%209.11308%207.34871%209.83317Z'%20fill='white'/%3e%3c/svg%3e";
const _imports_2 = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M12.8822%2016.3067C12.2426%2016.9381%2011.6135%2017.5743%2010.9648%2018.1882C10.7938%2018.3503%2010.5602%2018.4408%2010.3553%2018.5644C10.3279%2018.5381%2010.3005%2018.5124%2010.2737%2018.4861C10.29%2018.1666%2010.3024%2017.8465%2010.3233%2017.527C10.3853%2016.595%2010.4395%2015.6624%2010.5256%2014.733C10.5406%2014.5696%2010.6633%2014.3852%2010.788%2014.2691C13.0153%2012.1869%2015.2505%2010.1142%2017.4824%208.03677C17.5947%207.93209%2017.6899%207.80782%2017.8211%207.66127C17.4916%207.50053%2017.2919%207.64641%2017.0935%207.77473C15.4163%208.85937%2013.7404%209.94604%2012.0645%2011.032C10.9133%2011.7776%209.75946%2012.5199%208.61348%2013.2743C8.43923%2013.3891%208.2924%2013.4026%208.10118%2013.3398C6.98392%2012.9717%205.86144%2012.6212%204.74482%2012.2517C4.43288%2012.1484%204.01064%2012.091%204.0002%2011.6628C3.98976%2011.2367%204.39176%2011.1016%204.71154%2010.9726C6.37047%2010.304%208.03331%209.64685%209.69616%208.98769C12.9298%207.70584%2016.1642%206.42467%2019.3991%205.14485C19.5101%205.10095%2019.623%205.05705%2019.7385%205.02936C20.2501%204.90644%2020.6332%205.17592%2020.6782%205.71688C20.6972%205.94786%2020.6665%206.18964%2020.6195%206.41859C19.7953%2010.4431%2018.9651%2014.4663%2018.1344%2018.4894C18.105%2018.6313%2018.0613%2018.7731%2018.0045%2018.9055C17.8159%2019.3445%2017.485%2019.5072%2017.0497%2019.3505C16.8592%2019.2823%2016.6778%2019.1662%2016.5126%2019.0419C15.3601%2018.1761%2014.2135%2017.3021%2013.0643%2016.4316C13.0101%2016.3924%2012.9553%2016.3573%2012.8822%2016.3067Z'%20fill='white'/%3e%3c/svg%3e";
const _sfc_main$5 = {
  __name: "SearchResults",
  __ssrInlineRender: true,
  props: {
    searchQuery: String,
    results: Object
  },
  emits: ["close", "navigate"],
  setup(__props, { emit: __emit }) {
    const getProductImage = (image) => {
      if (!image) return "/images/placeholder.jpg";
      return image.startsWith("/uploads/") || image.startsWith("http") ? image : `/uploads/products/${image}`;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "search-results-modal" }, _attrs))} data-v-5f9368ed><div class="modal-overlay" data-v-5f9368ed></div><div class="modal-content" data-v-5f9368ed><button class="close-btn" data-v-5f9368ed>×</button><h2 data-v-5f9368ed>Результаты поиска: &quot;${ssrInterpolate(__props.searchQuery)}&quot;</h2>`);
      if (__props.results.categories.length > 0) {
        _push(`<div class="results-section" data-v-5f9368ed><h3 data-v-5f9368ed>Категории</h3><div class="results-grid" data-v-5f9368ed><!--[-->`);
        ssrRenderList(__props.results.categories, (category) => {
          _push(`<div class="result-item category-item" data-v-5f9368ed><div class="result-icon" data-v-5f9368ed>📁</div><div class="result-info" data-v-5f9368ed><div class="result-title" data-v-5f9368ed>${ssrInterpolate(category.name)}</div></div></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.results.products.length > 0) {
        _push(`<div class="results-section" data-v-5f9368ed><h3 data-v-5f9368ed>Товары</h3><div class="results-grid" data-v-5f9368ed><!--[-->`);
        ssrRenderList(__props.results.products, (product) => {
          _push(`<div class="result-item product-item" data-v-5f9368ed><img${ssrRenderAttr("src", getProductImage(product.mainImage))}${ssrRenderAttr("alt", product.name)} class="product-image" data-v-5f9368ed><div class="result-info" data-v-5f9368ed><div class="result-title" data-v-5f9368ed>${ssrInterpolate(product.name)}</div><div class="product-price" data-v-5f9368ed>${ssrInterpolate(product.price)} руб.</div></div></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.results.categories.length === 0 && __props.results.products.length === 0) {
        _push(`<div class="no-results" data-v-5f9368ed> Ничего не найдено </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SearchResults.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-5f9368ed"]]);
const _sfc_main$4 = {
  __name: "SearchComponent",
  __ssrInlineRender: true,
  setup(__props) {
    const searchQuery = ref("");
    const showSuggestions = ref(false);
    const showSearchResults = ref(false);
    const suggestions = ref({
      categories: [],
      products: []
    });
    const searchResults = ref({
      categories: [],
      products: []
    });
    const isLoading = ref(false);
    const getCategoryName = (categorySlug) => {
      const category = suggestions.value.categories.find((cat) => cat.slug === categorySlug);
      return category ? category.name : categorySlug;
    };
    const closeSearchResults = () => {
      showSearchResults.value = false;
      searchQuery.value = "";
    };
    const navigateToResult = (url) => {
      showSearchResults.value = false;
      searchQuery.value = "";
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SearchResults = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "search-container" }, _attrs))} data-v-1547d986><form class="search-form" data-v-1547d986><input class="search-inp" type="text" placeholder="Поиск"${ssrRenderAttr("value", unref(searchQuery))} data-v-1547d986><button class="search-btn" type="submit" data-v-1547d986></button>`);
      if (unref(showSuggestions) && unref(searchQuery).length >= 2) {
        _push(`<div class="search-suggestions" data-v-1547d986>`);
        if (unref(isLoading)) {
          _push(`<div class="suggestion-item" data-v-1547d986> Поиск... </div>`);
        } else if (unref(suggestions).categories.length === 0 && unref(suggestions).products.length === 0) {
          _push(`<div class="suggestion-item" data-v-1547d986> Ничего не найдено </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        ssrRenderList(unref(suggestions).categories, (category) => {
          _push(`<div class="suggestion-item suggestion-category" data-v-1547d986><span class="suggestion-title" data-v-1547d986>📁 ${ssrInterpolate(category.name)}</span><span class="suggestion-type" data-v-1547d986>категория</span></div>`);
        });
        _push(`<!--]--><!--[-->`);
        ssrRenderList(unref(suggestions).products, (product) => {
          _push(`<div class="suggestion-item suggestion-product" data-v-1547d986><span class="suggestion-title" data-v-1547d986>🛒 ${ssrInterpolate(product.name)}</span><span class="suggestion-price" data-v-1547d986>${ssrInterpolate(product.price)} руб.</span>`);
          if (product.categorySlug) {
            _push(`<span class="suggestion-category" data-v-1547d986> в ${ssrInterpolate(getCategoryName(product.categorySlug))}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</form>`);
      if (unref(showSearchResults)) {
        _push(ssrRenderComponent(_component_SearchResults, {
          "search-query": unref(searchQuery),
          results: unref(searchResults),
          onClose: closeSearchResults,
          onNavigate: navigateToResult
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SearchComponent.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const SearchComponent = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$4, [["__scopeId", "data-v-1547d986"]]), { __name: "SearchComponent" });
const _sfc_main$3 = {
  __name: "AppHeader",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-45c55bcd><div class="bg-secondary" data-v-45c55bcd><div class="bg-primary" data-v-45c55bcd><div class="container mobile-header" data-v-45c55bcd><a class="number" href="tel:+73832079294" data-v-45c55bcd>+7 (383) 207-92-94</a><button class="menu-burger" id="burger-btn" data-v-45c55bcd><span class="burger-line" data-v-45c55bcd></span><span class="burger-line" data-v-45c55bcd></span><span class="burger-line" data-v-45c55bcd></span></button></div></div><div class="mobile-menu" id="mobileMenu" data-v-45c55bcd><a href="/" class="logo" data-v-45c55bcd><img${ssrRenderAttr("src", _imports_0)} class="mob-img" alt="logo" data-v-45c55bcd><p class="slogan" data-v-45c55bcd>Автоматизация технологических процессов</p></a><nav class="nav mob-nav" data-v-45c55bcd><a href="/catalog" data-v-45c55bcd>Каталог</a><a href="/service" data-v-45c55bcd>Услуги</a><a href="/about" data-v-45c55bcd>Команда</a><a href="/contacts" data-v-45c55bcd>Контакты</a></nav><a class="mail" href="mailto:info@everon-pro.ru" data-v-45c55bcd>info@everon-pro.ru</a><form class="mail-form" action="#" data-v-45c55bcd><input class="mail-inp" type="text" placeholder="Подпишитесь на скидки" data-v-45c55bcd><button class="mail-btn" type="submit" data-v-45c55bcd></button></form><p data-v-45c55bcd>Присоединяйтесь к нам</p><div class="social" data-v-45c55bcd><a href="#" class="w-app" data-v-45c55bcd><img${ssrRenderAttr("src", _imports_1)} alt="" data-v-45c55bcd></a><a href="#" class="tg" data-v-45c55bcd><img${ssrRenderAttr("src", _imports_2)} alt="" data-v-45c55bcd></a></div></div><div class="container head" data-v-45c55bcd><a href="/" class="logo header-logo" data-v-45c55bcd><img${ssrRenderAttr("src", _imports_0)} alt="logo" data-v-45c55bcd><p class="slogan" data-v-45c55bcd>Автоматизация технологических процессов</p></a><div class="" data-v-45c55bcd>`);
      _push(ssrRenderComponent(SearchComponent, null, null, _parent));
      _push(`<div class="flex contacts" data-v-45c55bcd><a class="number" href="tel:+73832079294" data-v-45c55bcd>+7 (383) 207-92-94</a><a class="mail" href="mailto:info@everon-pro.ru" data-v-45c55bcd>info@everon-pro.ru</a></div></div></div><div class="bg-primary menu" data-v-45c55bcd><nav class="nav" data-v-45c55bcd><a href="/" data-v-45c55bcd>Главная</a><a href="/catalog" data-v-45c55bcd>Каталог</a><a href="/service" data-v-45c55bcd>Услуги</a><a href="/contacts" data-v-45c55bcd>Контакты</a></nav></div></div></div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppHeader.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$3, [["__scopeId", "data-v-45c55bcd"]]), { __name: "AppHeader" });
const _sfc_main$2 = {
  __name: "Breadcrumbs",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const pageTitles = {
      "catalog": "Каталог",
      "projects": "Проекты",
      "service": "Услуги",
      "about": "Компания",
      "contacts": "Контакты"
    };
    const crumbs = ref([]);
    const loadBreadcrumbs = async () => {
      const pathArray = route.path.split("/").filter((i) => i);
      const breadcrumbs = [];
      let path = "";
      for (let index = 0; index < pathArray.length; index++) {
        const item = pathArray[index];
        path += `/${item}`;
        let title = pageTitles[item] || item.charAt(0).toUpperCase() + item.slice(1).replace(/-/g, " ");
        if (index > 0 && pathArray[index - 1] === "catalog") {
          try {
            const category = await $fetch(`/api/categories/by-slug/${item}`);
            if (category?.name) {
              title = category.name;
            }
          } catch (error) {
            console.warn(`Не удалось загрузить категорию ${item}:`, error);
          }
        }
        if (index > 1 && pathArray[index - 2] === "catalog" && index === pathArray.length - 1) {
          try {
            const product = await $fetch(`/api/products/by-slug/${item}`);
            if (product?.name) {
              title = product.name;
            }
          } catch (error) {
            console.warn(`Не удалось загрузить товар ${item}:`, error);
          }
        }
        breadcrumbs.push({
          path: index < pathArray.length - 1 ? path : null,
          title
        });
      }
      crumbs.value = breadcrumbs;
    };
    watch(() => route.path, loadBreadcrumbs, { immediate: true });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))} data-v-9cc9e0ab><div class="breadcrumbs" data-v-9cc9e0ab>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Главная`);
          } else {
            return [
              createTextVNode("Главная")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--[-->`);
      ssrRenderList(unref(crumbs), (crumb, index) => {
        _push(`<span data-v-9cc9e0ab>   <svg width="6" height="11" viewBox="0 0 7 11"${ssrRenderAttr("fill", index === unref(crumbs).length - 1 ? "#2D5BEE" : "#515A85")} xmlns="http://www.w3.org/2000/svg" data-v-9cc9e0ab><path d="M6.1875 5.49998C6.1875 5.30284 6.11322 5.10572 5.96497 4.95542L1.29764 0.225656C1.00074 -0.0752187 0.519365 -0.0752187 0.222585 0.225656C-0.0741951 0.526409 -0.074195 1.01413 0.222585 1.31503L4.3525 5.49998L0.22273 9.68496C-0.0740504 9.98584 -0.0740504 10.4735 0.22273 10.7742C0.51951 11.0753 1.00088 11.0753 1.29778 10.7742L5.96512 6.04455C6.11339 5.89417 6.1875 5.69705 6.1875 5.49998Z" data-v-9cc9e0ab></path></svg>   `);
        if (crumb.path) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: crumb.path
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(crumb.title)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(crumb.title), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(`<span class="active-crumb" data-v-9cc9e0ab>${ssrInterpolate(crumb.title)}</span>`);
        }
        _push(`</span>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Breadcrumbs.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-9cc9e0ab"]]);
const _sfc_main$1 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<footer${ssrRenderAttrs(mergeProps({ class: "footer" }, _attrs))} data-v-a7537147><div class="container" data-v-a7537147><div class="wrapper" data-v-a7537147><div class="" data-v-a7537147><a href="/" class="logo" data-v-a7537147><img${ssrRenderAttr("src", _imports_0)} alt="logo" data-v-a7537147><span class="slogan" data-v-a7537147>Промышленная автоматика и электроэнергетика</span></a><form class="mail-form" action="#" data-v-a7537147><input class="mail-inp" type="text" placeholder="Подпишитесь на скидки" data-v-a7537147><button class="mail-btn" type="submit" data-v-a7537147></button></form><h4 data-v-a7537147>Присоединяйтесь к нам</h4><div class="social" data-v-a7537147><a href="#" class="w-app" data-v-a7537147><img${ssrRenderAttr("src", _imports_1)} alt="" data-v-a7537147></a><a href="#" class="tg" data-v-a7537147><img${ssrRenderAttr("src", _imports_2)} alt="" data-v-a7537147></a></div></div><div class="" data-v-a7537147><h4 data-v-a7537147>О нас</h4><ul data-v-a7537147><li data-v-a7537147><a href="#" data-v-a7537147>Оплата и доставка</a></li><li data-v-a7537147><a href="/contacts" data-v-a7537147>Контакты</a></li><li data-v-a7537147><a href="#" data-v-a7537147>Гарантия</a></li></ul></div><div class="" data-v-a7537147><h4 data-v-a7537147>Каталог</h4><ul data-v-a7537147><li data-v-a7537147><a href="/" data-v-a7537147>О нас</a></li><li data-v-a7537147><a href="#" data-v-a7537147>Реквизиты</a></li><li data-v-a7537147><a href="#" data-v-a7537147>Политика конфеденциальности</a></li><li data-v-a7537147><a href="#" data-v-a7537147>Публичная оферта</a></li></ul></div><div class="contacts" data-v-a7537147><h4 data-v-a7537147>Контакты</h4><a class="number" href="tel:+73832079294" data-v-a7537147>+7 (383) 207-92-94</a><a href="#callback" data-v-a7537147>Заказать обратный звонок</a><a class="mail" href="mailto:info@everon-pro.ru" data-v-a7537147>info@everon-pro.ru</a></div></div><div class="footer-bottom" data-v-a7537147><p data-v-a7537147> Данный сайт носит исключительно информационный характер, информация размещенная на нем, не является публичной офертой, подробную информацию уточняйте у менеджеров магазина. карта сайта </p><div class="" data-v-a7537147><div class="schedule" data-v-a7537147><div class="weekday" data-v-a7537147><div data-v-a7537147><span data-v-a7537147>ПН</span><span data-v-a7537147>ВТ</span><span data-v-a7537147>СР</span><span data-v-a7537147>ЧТ</span><span data-v-a7537147>ПТ</span></div><div data-v-a7537147><span data-v-a7537147>СБ</span><span data-v-a7537147>ВС</span></div></div><div class="time" data-v-a7537147><span data-v-a7537147>9:00 - 22:00</span><span data-v-a7537147>11:00 - 18:00</span></div></div></div></div></div></footer>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppFooter.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-a7537147"]]), { __name: "AppFooter" });
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_AppHeader = __nuxt_component_0;
  const _component_Breadcrumbs = __nuxt_component_1;
  const _component_NuxtPage = __nuxt_component_2;
  const _component_AppFooter = __nuxt_component_3;
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(_component_AppHeader, null, null, _parent));
  _push(ssrRenderComponent(_component_Breadcrumbs, null, null, _parent));
  _push(ssrRenderComponent(_component_NuxtPage, null, null, _parent));
  _push(ssrRenderComponent(_component_AppFooter, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { _default as default };
//# sourceMappingURL=default-v3ABZim2.mjs.map
