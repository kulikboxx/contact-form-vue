<template>
  <div :class="['base-message', `base-message--${type}`]">
    <span>{{ message }}</span>
  </div>
</template>

<script setup>
defineProps({ message: String, type: String });
</script>

<style lang="scss" scoped>
@use '../styles/colors' as *;
.base-message {
  margin-inline: auto;
  padding: 1rem 2rem;
  width: 90vw;
  max-width: 400px;
  font-weight: 500;
  text-align: center;
  border-radius: 8px;

  &--error {
    color: $white;
    background-color: $red-message;
  }

  &--success {
    color: $white;
    background-color: $green-message;
  }
}
</style>
