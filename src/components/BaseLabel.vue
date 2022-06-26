<template>
  <label class="base-label">
    <slot />
  </label>
</template>

<style lang="scss" scoped>
@use '../styles/colors' as *;

.base-label {
  color: $dark;
  font-weight: 500;
}
</style>
