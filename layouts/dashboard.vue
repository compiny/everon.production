<template>
  <div>
    <NavAdmin />
    <div class="admin-page">
      <slot />
    </div>
  </div>
</template>
<style scoped>
.admin-page {
  margin-left: 160px;
}
</style>