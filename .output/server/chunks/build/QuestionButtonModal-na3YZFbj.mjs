import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { ref, mergeProps, useSSRContext } from 'vue';
import { _ as __nuxt_component_1 } from './FormCuestion-CY7LYL9g.mjs';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main$2 = {
  __name: "QuestionModal",
  __ssrInlineRender: true,
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:isVisible", "close"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.isVisible) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "modal-overlay" }, _attrs))} data-v-defabd8f><div class="modal" data-v-defabd8f><button class="modal-close" data-v-defabd8f></button><div class="modal-content" data-v-defabd8f>`);
        _push(ssrRenderComponent(__nuxt_component_1, { "is-modal": true }, null, _parent));
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/QuestionModal.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const QuestionModal = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-defabd8f"]]);
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<button${ssrRenderAttrs(_attrs)} data-v-abf5b303>Задать вопрос</button>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/QuestionBtn.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const QuestionBtn = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-abf5b303"]]), { __name: "QuestionBtn" });
const _sfc_main = {
  __name: "QuestionButtonModal",
  __ssrInlineRender: true,
  setup(__props) {
    const isModalOpen = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="btn">`);
      _push(ssrRenderComponent(QuestionBtn, null, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(QuestionModal, {
        "is-visible": isModalOpen.value,
        "onUpdate:isVisible": ($event) => isModalOpen.value = $event,
        onClose: _ctx.closeModal
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/QuestionButtonModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=QuestionButtonModal-na3YZFbj.mjs.map
