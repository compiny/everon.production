import { ref, computed, mergeProps, unref, withCtx, createBlock, openBlock, Fragment, renderList, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import Flicking from '@egjs/vue3-flicking';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main$1 = {
  __name: "Slider",
  __ssrInlineRender: true,
  props: {
    images: {
      type: Array,
      required: true,
      default: () => []
    },
    circular: {
      type: Boolean,
      default: true
    },
    duration: {
      type: Number,
      default: 300
    },
    imageClass: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const props = __props;
    const flickingRef = ref(null);
    const isHorizontal = ref(false);
    const flickingOptions = computed(() => ({
      horizontal: isHorizontal.value,
      circular: props.circular,
      duration: props.duration,
      gap: props.gap
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "slider-container" }, _attrs))} data-v-7d7d5ff4><button class="nav-arrow nav-arrow--prev" data-v-7d7d5ff4></button>`);
      _push(ssrRenderComponent(unref(Flicking), {
        ref_key: "flickingRef",
        ref: flickingRef,
        hideBeforeInit: true,
        circular: __props.circular,
        moveType: _ctx.moveType,
        horizontal: isHorizontal.value,
        options: flickingOptions.value,
        class: ["vertical-flicking", [_ctx.size, { "horizontal": isHorizontal.value }]]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(__props.images, (image, index) => {
              _push2(`<div class="flicking-panel" data-v-7d7d5ff4${_scopeId}><img${ssrRenderAttr("src", image.src)}${ssrRenderAttr("alt", image.alt || `Slide ${index + 1}`)} class="${ssrRenderClass([__props.imageClass, "slider-image"])}" data-v-7d7d5ff4${_scopeId}></div>`);
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(__props.images, (image, index) => {
                return openBlock(), createBlock("div", {
                  key: index,
                  class: "flicking-panel"
                }, [
                  createVNode("img", {
                    src: image.src,
                    alt: image.alt || `Slide ${index + 1}`,
                    class: ["slider-image", __props.imageClass]
                  }, null, 10, ["src", "alt"])
                ]);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="nav-arrow nav-arrow--next" data-v-7d7d5ff4></button></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Slider.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-7d7d5ff4"]]), { __name: "Slider" });
const _sfc_main = {
  __name: "Counter",
  __ssrInlineRender: true,
  props: {
    modelValue: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: Infinity
    },
    step: {
      type: Number,
      default: 1
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const count = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value)
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "counter" }, _attrs))} data-v-ae38f9c8><button class="counter-btn counter-btn--minus"${ssrIncludeBooleanAttr(unref(count) <= __props.min) ? " disabled" : ""} data-v-ae38f9c8><span class="counter-icon" data-v-ae38f9c8>−</span></button><span class="counter-value" data-v-ae38f9c8>${ssrInterpolate(unref(count))}</span><button class="counter-btn counter-btn--plus"${ssrIncludeBooleanAttr(unref(count) >= __props.max) ? " disabled" : ""} data-v-ae38f9c8><span class="counter-icon" data-v-ae38f9c8>+</span></button></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Counter.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ae38f9c8"]]);

export { __nuxt_component_0 as _, __nuxt_component_3 as a };
//# sourceMappingURL=Counter-DRM8MdKc.mjs.map
