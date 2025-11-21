import { mergeProps, ref, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrIncludeBooleanAttr, ssrRenderComponent, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import { _ as _sfc_main$3 } from './PhoneInput-DYyScDbi.mjs';

const _imports_0 = "" + __buildAssetsURL("heart.KHykRPrP.svg");
const _imports_1 = "data:image/svg+xml,%3csvg%20width='23'%20height='21'%20viewBox='0%200%2023%2021'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M5.60258%209.60004C6.09113%209.60004%206.48721%2010.0029%206.48721%2010.5V20.1C6.48721%2020.597%206.09113%2021%205.60258%2021H0.884635C0.396076%2021%200%2020.597%200%2020.1V10.5C4.74948e-06%2010.0029%200.396079%209.60004%200.884635%209.60004H5.60258ZM13.859%200C14.3476%209.18087e-06%2014.7436%200.40297%2014.7436%200.90002V20.1C14.7436%2020.597%2014.3476%2021%2013.859%2021H9.14106C8.6525%2021%208.25642%2020.597%208.25642%2020.1V0.90002C8.25642%200.402964%208.6525%200%209.14106%200H13.859ZM22.1154%2014.4C22.6039%2014.4%2023%2014.8029%2023%2015.3V20.1C23%2020.597%2022.6039%2021%2022.1154%2021H17.3974C16.9089%2021%2016.5128%2020.597%2016.5128%2020.1V15.3C16.5129%2014.8029%2016.9089%2014.4%2017.3974%2014.4H22.1154ZM18.2821%2019.2H21.2308V16.2H18.2821V19.2ZM10.0256%2019.2H12.9744V1.80004H10.0256V19.2ZM1.76927%2019.2H4.71794V11.4H1.76927V19.2Z'%20fill='%23DCE0ED'/%3e%3c/svg%3e";
const _imports_2 = "data:image/svg+xml,%3csvg%20width='18'%20height='18'%20viewBox='0%200%2018%2018'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M8.13589%201.48359C8.52162%200.821321%209.47838%200.821321%209.86411%201.48359L12.011%205.16962C12.1523%205.41222%2012.3891%205.58425%2012.6635%205.64367L16.8326%206.54646C17.5816%206.70867%2017.8773%207.6186%2017.3666%208.1901L14.5244%2011.371C14.3374%2011.5803%2014.2469%2011.8587%2014.2752%2012.138L14.7049%2016.382C14.7821%2017.1445%2014.0081%2017.7069%2013.3067%2017.3978L9.40325%2015.6777C9.14634%2015.5645%208.85366%2015.5645%208.59675%2015.6777L4.69326%2017.3978C3.99192%2017.7069%203.21789%2017.1445%203.2951%2016.382L3.7248%2012.138C3.75308%2011.8587%203.66264%2011.5803%203.47558%2011.371L0.633386%208.1901C0.122732%207.6186%200.418384%206.70867%201.16744%206.54646L5.3365%205.64367C5.61089%205.58425%205.84767%205.41222%205.98897%205.16962L8.13589%201.48359Z'%20fill='%232044F7'/%3e%3c/svg%3e";
const _imports_3 = "data:image/svg+xml,%3csvg%20width='18'%20height='18'%20viewBox='0%200%2018%2018'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M8.13589%201.48359C8.52162%200.821321%209.47838%200.821321%209.86411%201.48359L12.011%205.16962C12.1523%205.41222%2012.3891%205.58425%2012.6635%205.64367L16.8326%206.54646C17.5816%206.70867%2017.8773%207.6186%2017.3666%208.1901L14.5244%2011.371C14.3374%2011.5803%2014.2469%2011.8587%2014.2752%2012.138L14.7049%2016.382C14.7821%2017.1445%2014.0081%2017.7069%2013.3067%2017.3978L9.40325%2015.6777C9.14634%2015.5645%208.85366%2015.5645%208.59675%2015.6777L4.69326%2017.3978C3.99192%2017.7069%203.21789%2017.1445%203.2951%2016.382L3.7248%2012.138C3.75308%2011.8587%203.66264%2011.5803%203.47558%2011.371L0.633386%208.1901C0.122732%207.6186%200.418384%206.70867%201.16744%206.54646L5.3365%205.64367C5.61089%205.58425%205.84767%205.41222%205.98897%205.16962L8.13589%201.48359Z'%20fill='%23DCE0ED'/%3e%3c/svg%3e";
const _sfc_main$2 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "actions" }, _attrs))} data-v-0a65c1c8><div data-v-0a65c1c8><img${ssrRenderAttr("src", _imports_0)} alt="" class="heart" data-v-0a65c1c8><img${ssrRenderAttr("src", _imports_1)} alt="" data-v-0a65c1c8></div><div class="stars" data-v-0a65c1c8><!--[-->`);
  ssrRenderList(4, (item, index) => {
    _push(`<img${ssrRenderAttr("src", _imports_2)} alt="" data-v-0a65c1c8>`);
  });
  _push(`<!--]--><img${ssrRenderAttr("src", _imports_3)} alt="" data-v-0a65c1c8></div></div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Actions.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-0a65c1c8"]]), { __name: "Actions" });
const _sfc_main$1 = {
  __name: "BuyProductModal",
  __ssrInlineRender: true,
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  emits: ["close", "success"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const isVisible = ref(false);
    const isSubmitting = ref(false);
    const message = ref(null);
    const phoneInputRef = ref();
    const formData = ref({
      name: "",
      phone: "",
      email: ""
    });
    const errors = ref({
      name: "",
      phone: ""
    });
    const showModal = () => {
      console.log("Show modal called with product:", props.product);
      isVisible.value = true;
    };
    const closeModal = () => {
      isVisible.value = false;
      resetForm();
      emit("close");
    };
    const resetForm = () => {
      formData.value = {
        name: "",
        phone: "",
        email: ""
      };
      errors.value = {
        name: "",
        phone: ""
      };
      message.value = null;
    };
    __expose({
      showModal,
      closeModal
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PhoneInput = _sfc_main$3;
      if (unref(isVisible)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "buy-modal" }, _attrs))} data-v-e41b73ce><div class="modal-content" data-v-e41b73ce><button class="close-btn" data-v-e41b73ce>×</button><h2 data-v-e41b73ce>Оформление заявки</h2><p data-v-e41b73ce>Продукт: <strong data-v-e41b73ce>${ssrInterpolate(__props.product.name)}</strong></p><form class="buy-form" data-v-e41b73ce><div class="form-group" data-v-e41b73ce><label for="name" data-v-e41b73ce>Ваше имя *</label><input${ssrRenderAttr("value", unref(formData).name)} type="text" id="name" class="${ssrRenderClass({ "input-error": unref(errors).name })}" data-v-e41b73ce>`);
        if (unref(errors).name) {
          _push(`<span class="error-text" data-v-e41b73ce>${ssrInterpolate(unref(errors).name)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="form-group" data-v-e41b73ce><label for="phone" data-v-e41b73ce>Телефон *</label>`);
        _push(ssrRenderComponent(_component_PhoneInput, {
          modelValue: unref(formData).phone,
          "onUpdate:modelValue": ($event) => unref(formData).phone = $event,
          label: "",
          ref_key: "phoneInputRef",
          ref: phoneInputRef,
          placeholder: "+7 (___)-___-__-__",
          class: { "input-error": unref(errors).phone }
        }, null, _parent));
        if (unref(errors).phone) {
          _push(`<span class="error-text" data-v-e41b73ce>${ssrInterpolate(unref(errors).phone)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="form-group" data-v-e41b73ce><label for="email" data-v-e41b73ce>Email</label><input${ssrRenderAttr("value", unref(formData).email)} type="email" id="email" placeholder="example@mail.ru" data-v-e41b73ce></div><button type="submit"${ssrIncludeBooleanAttr(unref(isSubmitting)) ? " disabled" : ""} class="submit-btn" data-v-e41b73ce>${ssrInterpolate("Отправить заявку")}</button>`);
        if (unref(message)) {
          _push(`<div class="${ssrRenderClass(["message", unref(message).type])}" data-v-e41b73ce>${ssrInterpolate(unref(message).text)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</form></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/BuyProductModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_6 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-e41b73ce"]]);
const _sfc_main = {
  __name: "BuyBtn",
  __ssrInlineRender: true,
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  emits: ["success"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const buyModalRef = ref();
    const selectedProduct = ref(null);
    const isLoading = ref(false);
    const onModalClose = () => {
      selectedProduct.value = null;
    };
    const onOrderSuccess = (leadId) => {
      selectedProduct.value = null;
      emit("success", leadId);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BuyProductModal = __nuxt_component_6;
      _push(`<!--[--><button class="buy-btn"${ssrIncludeBooleanAttr(unref(isLoading)) ? " disabled" : ""} data-v-8ea7543a> Купить </button>`);
      if (unref(selectedProduct)) {
        _push(ssrRenderComponent(_component_BuyProductModal, {
          ref_key: "buyModalRef",
          ref: buyModalRef,
          product: unref(selectedProduct),
          onClose: onModalClose,
          onSuccess: onOrderSuccess
        }, null, _parent));
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/BuyBtn.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8ea7543a"]]);

export { __nuxt_component_1 as _, __nuxt_component_2 as a, __nuxt_component_6 as b };
//# sourceMappingURL=BuyBtn-BP0vXO2S.mjs.map
