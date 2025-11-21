import { _ as _sfc_main$1 } from './PhoneInput-DYyScDbi.mjs';
import { reactive, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = {
  __name: "FormCuestion",
  __ssrInlineRender: true,
  props: {
    isModal: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const form = reactive({
      phone: "",
      email: "",
      message: "",
      source_id: 1,
      agreedToPrivacy: false,
      agreedToNewsletter: false
    });
    const errors = ref({});
    const isSubmitting = ref(false);
    const submitSuccess = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PhoneInput = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["form-container", { "modal-version": __props.isModal }]
      }, _attrs))} data-v-30cd5607><h2 data-v-30cd5607>Задайте вопрос специалисту</h2><p data-v-30cd5607>И наш менеджер свяжется с вами.   Заполните форму и задайте вопрос</p><form data-v-30cd5607>`);
      _push(ssrRenderComponent(_component_PhoneInput, {
        modelValue: unref(form).phone,
        "onUpdate:modelValue": ($event) => unref(form).phone = $event,
        error: unref(errors).phone
      }, null, _parent));
      _push(`<div class="form-group" data-v-30cd5607><label data-v-30cd5607>Email</label><input type="email"${ssrRenderAttr("value", unref(form).email)} placeholder="your@email.com" class="${ssrRenderClass({ error: unref(errors).email })}" data-v-30cd5607>`);
      if (unref(errors).email) {
        _push(`<div class="error" data-v-30cd5607>${ssrInterpolate(unref(errors).email)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="form-group" data-v-30cd5607><label data-v-30cd5607>Вопрос</label><textarea placeholder="Опишите ваш вопрос подробно" class="${ssrRenderClass({ error: unref(errors).message })}" data-v-30cd5607>${ssrInterpolate(unref(form).message)}</textarea>`);
      if (unref(errors).message) {
        _push(`<div class="error" data-v-30cd5607>${ssrInterpolate(unref(errors).message)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="checkbox-group" data-v-30cd5607><label class="checkbox-item" data-v-30cd5607><input type="checkbox" id="privacy"${ssrIncludeBooleanAttr(Array.isArray(unref(form).agreedToPrivacy) ? ssrLooseContain(unref(form).agreedToPrivacy, null) : unref(form).agreedToPrivacy) ? " checked" : ""} class="${ssrRenderClass({ error: unref(errors).agreedToPrivacy })}" data-v-30cd5607><span class="checkmark" data-v-30cd5607></span> Я согласен на обработку персональных данных </label>`);
      if (unref(errors).agreedToPrivacy) {
        _push(`<div class="error" data-v-30cd5607>${ssrInterpolate(unref(errors).agreedToPrivacy)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<label class="checkbox-item" data-v-30cd5607><input type="checkbox" id="newsletter"${ssrIncludeBooleanAttr(Array.isArray(unref(form).agreedToNewsletter) ? ssrLooseContain(unref(form).agreedToNewsletter, null) : unref(form).agreedToNewsletter) ? " checked" : ""} data-v-30cd5607><span class="checkmark" data-v-30cd5607></span> Я согласен на рассылку </label></div><button type="submit"${ssrIncludeBooleanAttr(unref(isSubmitting)) ? " disabled" : ""} data-v-30cd5607>Отправить запрос</button>`);
      if (unref(submitSuccess)) {
        _push(`<div class="success-message" data-v-30cd5607> Спасибо! Ваш запрос успешно отправлен. Мы свяжемся с вами в ближайшее время. </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</form></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/FormCuestion.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-30cd5607"]]);

export { __nuxt_component_1 as _ };
//# sourceMappingURL=FormCuestion-CY7LYL9g.mjs.map
