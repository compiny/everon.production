import { _ as _sfc_main$1 } from './PhoneInput-DYyScDbi.mjs';
import { ref, watch, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrRenderComponent, ssrIncludeBooleanAttr, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = {
  __name: "CallbackForm",
  __ssrInlineRender: true,
  setup(__props) {
    const formData = ref({
      name: "",
      phone: "",
      source_id: 3
    });
    const errors = ref({
      name: "",
      phone: ""
    });
    const isSubmitting = ref(false);
    const message = ref(null);
    const phoneInputRef = ref();
    let messageTimer = null;
    watch(message, (newMessage) => {
      clearTimeout(messageTimer);
      if (newMessage) {
        messageTimer = setTimeout(() => {
          message.value = null;
        }, 3e3);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PhoneInput = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: "callback",
        class: "bg"
      }, _attrs))} data-v-470eb950><div class="container" data-v-470eb950><div class="title" data-v-470eb950><div data-v-470eb950>Остались</div><div data-v-470eb950>вопросы?</div></div><div class="operator" data-v-470eb950></div><p data-v-470eb950>Если у вас есть вопросы, наш специалист ответит на все вопросы по телефону</p><p class="numb" data-v-470eb950>+7 953 861 79 20</p><p data-v-470eb950>Или оставьте свои данные и наш специалист свяжется с вами</p><form class="callback-form" data-v-470eb950><input${ssrRenderAttr("value", formData.value.name)} type="text" id="name"${ssrRenderAttr("placeholder", errors.value.name ? errors.value.name : "Ваше имя")} class="${ssrRenderClass({ "input-error": errors.value.name })}" data-v-470eb950>`);
      _push(ssrRenderComponent(_component_PhoneInput, {
        modelValue: formData.value.phone,
        "onUpdate:modelValue": ($event) => formData.value.phone = $event,
        ref_key: "phoneInputRef",
        ref: phoneInputRef,
        label: null,
        placeholder: "Телефон"
      }, null, _parent));
      _push(`<button type="submit"${ssrIncludeBooleanAttr(isSubmitting.value) ? " disabled" : ""} data-v-470eb950> Заказать обратный звонок </button>`);
      if (message.value) {
        _push(`<div class="${ssrRenderClass(["message", message.value.type, message.value.type === "success" ? "success-message" : ""])}" data-v-470eb950>${ssrInterpolate(message.value.text)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</form></div><div class="operator-mob" data-v-470eb950></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CallbackForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-470eb950"]]);

export { __nuxt_component_2 as _ };
//# sourceMappingURL=CallbackForm--muPJtjF.mjs.map
