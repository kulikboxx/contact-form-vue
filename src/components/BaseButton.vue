<template>
  <button class="base-button">
    <base-circle-loader v-if="loading" />

    <span v-else>
      <slot />
    </span>
  </button>
</template>

<script setup>
import BaseCircleLoader from '../components/BaseCircleLoader.vue';

defineProps({ loading: Boolean });
</script>

<style lang="scss" scoped>
@use '../styles/mixins' as *;
@use '../styles/colors' as *;

.base-button {
  @include BaseFormElementStyle;
  @include BaseFormElementDefaultFocus;
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: $white;
  background-color: $violet;
  border: none;
  cursor: pointer;

  &:active {
    top: 1px;
  }

  &[disabled] {
    @include BaseFormElementDisabled;
    opacity: 0.7;
  }
}
</style>
