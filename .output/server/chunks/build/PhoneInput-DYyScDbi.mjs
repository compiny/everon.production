import { ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';

const _sfc_main = {
  __name: "PhoneInput",
  __ssrInlineRender: true,
  props: {
    modelValue: String,
    label: {
      type: String,
      default: "Телефон"
    },
    placeholder: {
      type: String,
      default: "+7 (___) ___-__-__"
    },
    required: {
      type: Boolean,
      default: true
    }
  },
  emits: ["update:modelValue", "validation"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const internalError = ref("");
    const validate = () => {
      const cleanPhone = props.modelValue?.replace(/\D/g, "") || "";
      if (props.required && !cleanPhone) {
        internalError.value = "Укажите телефон";
        emit("validation", false);
        return false;
      }
      if (cleanPhone && cleanPhone.length < 11) {
        internalError.value = "Некорректный номер";
        emit("validation", false);
        return false;
      }
      internalError.value = "";
      emit("validation", true);
      return true;
    };
    const validateField = () => {
      return validate();
    };
    __expose({
      validate: validateField
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "form-group" }, _attrs))}>`);
      if (__props.label) {
        _push(`<label>${ssrInterpolate(__props.label)}</label>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<input type="text"${ssrRenderAttr("value", __props.modelValue)}${ssrRenderAttr("placeholder", __props.placeholder)}>`);
      if (internalError.value) {
        _push(`<div class="error">${ssrInterpolate(internalError.value)}</div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/PhoneInput.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=PhoneInput-DYyScDbi.mjs.map
