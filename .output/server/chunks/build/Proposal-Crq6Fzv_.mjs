import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "proposal" }, _attrs))} data-v-f8a7b1c1><div class="container" data-v-f8a7b1c1><div class="proposal_img" data-v-f8a7b1c1></div><div class="" data-v-f8a7b1c1> Нужно коммерческое предложение? </div><button data-v-f8a7b1c1>Получить</button></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Proposal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-f8a7b1c1"]]), { __name: "Proposal" });

export { __nuxt_component_4 as _ };
//# sourceMappingURL=Proposal-Crq6Fzv_.mjs.map
