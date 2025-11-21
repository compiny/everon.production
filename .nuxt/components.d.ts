
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T extends DefineComponent> = T & DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>>
type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = (T & DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }>)
interface _GlobalComponents {
      'Actions': typeof import("../components/Actions.vue")['default']
    'AppAside': typeof import("../components/AppAside.vue")['default']
    'AppFooter': typeof import("../components/AppFooter.vue")['default']
    'AppHeader': typeof import("../components/AppHeader.vue")['default']
    'Arrows': typeof import("../components/Arrows.vue")['default']
    'Banner': typeof import("../components/Banner.vue")['default']
    'Breadcrumbs': typeof import("../components/Breadcrumbs.vue")['default']
    'BuyBtn': typeof import("../components/BuyBtn.vue")['default']
    'BuyProductModal': typeof import("../components/BuyProductModal.vue")['default']
    'CallbackForm': typeof import("../components/CallbackForm.vue")['default']
    'Counter': typeof import("../components/Counter.vue")['default']
    'Dots': typeof import("../components/Dots.vue")['default']
    'Filter': typeof import("../components/Filter.vue")['default']
    'FilterRange': typeof import("../components/FilterRange.vue")['default']
    'FormCuestion': typeof import("../components/FormCuestion.vue")['default']
    'Gallery': typeof import("../components/Gallery.vue")['default']
    'MapAddress': typeof import("../components/MapAddress.vue")['default']
    'NavAdmin': typeof import("../components/NavAdmin.vue")['default']
    'Pagination': typeof import("../components/Pagination.vue")['default']
    'PhoneInput': typeof import("../components/PhoneInput.vue")['default']
    'ProductAttributes': typeof import("../components/ProductAttributes.vue")['default']
    'ProductFilter': typeof import("../components/ProductFilter.vue")['default']
    'ProductList': typeof import("../components/ProductList.vue")['default']
    'Proposal': typeof import("../components/Proposal.vue")['default']
    'QuestionBtn': typeof import("../components/QuestionBtn.vue")['default']
    'QuestionButtonModal': typeof import("../components/QuestionButtonModal.vue")['default']
    'QuestionModal': typeof import("../components/QuestionModal.vue")['default']
    'SearchComponent': typeof import("../components/SearchComponent.vue")['default']
    'SearchResults': typeof import("../components/SearchResults.vue")['default']
    'Slider': typeof import("../components/Slider.vue")['default']
    'NuxtWelcome': typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
    'NuxtLayout': typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
    'NuxtErrorBoundary': typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
    'ClientOnly': typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
    'DevOnly': typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
    'ServerPlaceholder': typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
    'NuxtLink': typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
    'NuxtLoadingIndicator': typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
    'NuxtTime': typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
    'NuxtRouteAnnouncer': typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
    'NuxtImg': typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']
    'NuxtPicture': typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']
    'NuxtPage': typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
    'NoScript': typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
    'Link': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
    'Base': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
    'Title': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
    'Meta': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
    'Style': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
    'Head': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
    'Html': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
    'Body': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
    'NuxtIsland': typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
    'NuxtRouteAnnouncer': typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
      'LazyActions': LazyComponent<typeof import("../components/Actions.vue")['default']>
    'LazyAppAside': LazyComponent<typeof import("../components/AppAside.vue")['default']>
    'LazyAppFooter': LazyComponent<typeof import("../components/AppFooter.vue")['default']>
    'LazyAppHeader': LazyComponent<typeof import("../components/AppHeader.vue")['default']>
    'LazyArrows': LazyComponent<typeof import("../components/Arrows.vue")['default']>
    'LazyBanner': LazyComponent<typeof import("../components/Banner.vue")['default']>
    'LazyBreadcrumbs': LazyComponent<typeof import("../components/Breadcrumbs.vue")['default']>
    'LazyBuyBtn': LazyComponent<typeof import("../components/BuyBtn.vue")['default']>
    'LazyBuyProductModal': LazyComponent<typeof import("../components/BuyProductModal.vue")['default']>
    'LazyCallbackForm': LazyComponent<typeof import("../components/CallbackForm.vue")['default']>
    'LazyCounter': LazyComponent<typeof import("../components/Counter.vue")['default']>
    'LazyDots': LazyComponent<typeof import("../components/Dots.vue")['default']>
    'LazyFilter': LazyComponent<typeof import("../components/Filter.vue")['default']>
    'LazyFilterRange': LazyComponent<typeof import("../components/FilterRange.vue")['default']>
    'LazyFormCuestion': LazyComponent<typeof import("../components/FormCuestion.vue")['default']>
    'LazyGallery': LazyComponent<typeof import("../components/Gallery.vue")['default']>
    'LazyMapAddress': LazyComponent<typeof import("../components/MapAddress.vue")['default']>
    'LazyNavAdmin': LazyComponent<typeof import("../components/NavAdmin.vue")['default']>
    'LazyPagination': LazyComponent<typeof import("../components/Pagination.vue")['default']>
    'LazyPhoneInput': LazyComponent<typeof import("../components/PhoneInput.vue")['default']>
    'LazyProductAttributes': LazyComponent<typeof import("../components/ProductAttributes.vue")['default']>
    'LazyProductFilter': LazyComponent<typeof import("../components/ProductFilter.vue")['default']>
    'LazyProductList': LazyComponent<typeof import("../components/ProductList.vue")['default']>
    'LazyProposal': LazyComponent<typeof import("../components/Proposal.vue")['default']>
    'LazyQuestionBtn': LazyComponent<typeof import("../components/QuestionBtn.vue")['default']>
    'LazyQuestionButtonModal': LazyComponent<typeof import("../components/QuestionButtonModal.vue")['default']>
    'LazyQuestionModal': LazyComponent<typeof import("../components/QuestionModal.vue")['default']>
    'LazySearchComponent': LazyComponent<typeof import("../components/SearchComponent.vue")['default']>
    'LazySearchResults': LazyComponent<typeof import("../components/SearchResults.vue")['default']>
    'LazySlider': LazyComponent<typeof import("../components/Slider.vue")['default']>
    'LazyNuxtWelcome': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
    'LazyNuxtLayout': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
    'LazyNuxtErrorBoundary': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
    'LazyClientOnly': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
    'LazyDevOnly': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
    'LazyServerPlaceholder': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
    'LazyNuxtLink': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
    'LazyNuxtLoadingIndicator': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
    'LazyNuxtTime': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
    'LazyNuxtImg': LazyComponent<typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']>
    'LazyNuxtPicture': LazyComponent<typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']>
    'LazyNuxtPage': LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
    'LazyNoScript': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
    'LazyLink': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
    'LazyBase': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
    'LazyTitle': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
    'LazyMeta': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
    'LazyStyle': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
    'LazyHead': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
    'LazyHtml': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
    'LazyBody': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
    'LazyNuxtIsland': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export const Actions: typeof import("../components/Actions.vue")['default']
export const AppAside: typeof import("../components/AppAside.vue")['default']
export const AppFooter: typeof import("../components/AppFooter.vue")['default']
export const AppHeader: typeof import("../components/AppHeader.vue")['default']
export const Arrows: typeof import("../components/Arrows.vue")['default']
export const Banner: typeof import("../components/Banner.vue")['default']
export const Breadcrumbs: typeof import("../components/Breadcrumbs.vue")['default']
export const BuyBtn: typeof import("../components/BuyBtn.vue")['default']
export const BuyProductModal: typeof import("../components/BuyProductModal.vue")['default']
export const CallbackForm: typeof import("../components/CallbackForm.vue")['default']
export const Counter: typeof import("../components/Counter.vue")['default']
export const Dots: typeof import("../components/Dots.vue")['default']
export const Filter: typeof import("../components/Filter.vue")['default']
export const FilterRange: typeof import("../components/FilterRange.vue")['default']
export const FormCuestion: typeof import("../components/FormCuestion.vue")['default']
export const Gallery: typeof import("../components/Gallery.vue")['default']
export const MapAddress: typeof import("../components/MapAddress.vue")['default']
export const NavAdmin: typeof import("../components/NavAdmin.vue")['default']
export const Pagination: typeof import("../components/Pagination.vue")['default']
export const PhoneInput: typeof import("../components/PhoneInput.vue")['default']
export const ProductAttributes: typeof import("../components/ProductAttributes.vue")['default']
export const ProductFilter: typeof import("../components/ProductFilter.vue")['default']
export const ProductList: typeof import("../components/ProductList.vue")['default']
export const Proposal: typeof import("../components/Proposal.vue")['default']
export const QuestionBtn: typeof import("../components/QuestionBtn.vue")['default']
export const QuestionButtonModal: typeof import("../components/QuestionButtonModal.vue")['default']
export const QuestionModal: typeof import("../components/QuestionModal.vue")['default']
export const SearchComponent: typeof import("../components/SearchComponent.vue")['default']
export const SearchResults: typeof import("../components/SearchResults.vue")['default']
export const Slider: typeof import("../components/Slider.vue")['default']
export const NuxtWelcome: typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const NuxtLayout: typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const NuxtErrorBoundary: typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
export const ClientOnly: typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
export const DevOnly: typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtLink: typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const NuxtLoadingIndicator: typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const NuxtTime: typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const NuxtImg: typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']
export const NuxtPicture: typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']
export const NuxtPage: typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
export const NoScript: typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
export const NuxtIsland: typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const LazyActions: LazyComponent<typeof import("../components/Actions.vue")['default']>
export const LazyAppAside: LazyComponent<typeof import("../components/AppAside.vue")['default']>
export const LazyAppFooter: LazyComponent<typeof import("../components/AppFooter.vue")['default']>
export const LazyAppHeader: LazyComponent<typeof import("../components/AppHeader.vue")['default']>
export const LazyArrows: LazyComponent<typeof import("../components/Arrows.vue")['default']>
export const LazyBanner: LazyComponent<typeof import("../components/Banner.vue")['default']>
export const LazyBreadcrumbs: LazyComponent<typeof import("../components/Breadcrumbs.vue")['default']>
export const LazyBuyBtn: LazyComponent<typeof import("../components/BuyBtn.vue")['default']>
export const LazyBuyProductModal: LazyComponent<typeof import("../components/BuyProductModal.vue")['default']>
export const LazyCallbackForm: LazyComponent<typeof import("../components/CallbackForm.vue")['default']>
export const LazyCounter: LazyComponent<typeof import("../components/Counter.vue")['default']>
export const LazyDots: LazyComponent<typeof import("../components/Dots.vue")['default']>
export const LazyFilter: LazyComponent<typeof import("../components/Filter.vue")['default']>
export const LazyFilterRange: LazyComponent<typeof import("../components/FilterRange.vue")['default']>
export const LazyFormCuestion: LazyComponent<typeof import("../components/FormCuestion.vue")['default']>
export const LazyGallery: LazyComponent<typeof import("../components/Gallery.vue")['default']>
export const LazyMapAddress: LazyComponent<typeof import("../components/MapAddress.vue")['default']>
export const LazyNavAdmin: LazyComponent<typeof import("../components/NavAdmin.vue")['default']>
export const LazyPagination: LazyComponent<typeof import("../components/Pagination.vue")['default']>
export const LazyPhoneInput: LazyComponent<typeof import("../components/PhoneInput.vue")['default']>
export const LazyProductAttributes: LazyComponent<typeof import("../components/ProductAttributes.vue")['default']>
export const LazyProductFilter: LazyComponent<typeof import("../components/ProductFilter.vue")['default']>
export const LazyProductList: LazyComponent<typeof import("../components/ProductList.vue")['default']>
export const LazyProposal: LazyComponent<typeof import("../components/Proposal.vue")['default']>
export const LazyQuestionBtn: LazyComponent<typeof import("../components/QuestionBtn.vue")['default']>
export const LazyQuestionButtonModal: LazyComponent<typeof import("../components/QuestionButtonModal.vue")['default']>
export const LazyQuestionModal: LazyComponent<typeof import("../components/QuestionModal.vue")['default']>
export const LazySearchComponent: LazyComponent<typeof import("../components/SearchComponent.vue")['default']>
export const LazySearchResults: LazyComponent<typeof import("../components/SearchResults.vue")['default']>
export const LazySlider: LazyComponent<typeof import("../components/Slider.vue")['default']>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
export const LazyNuxtTime: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>

export const componentNames: string[]
