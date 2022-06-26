<template>
  <div class="base-input">
    <p v-if="$slots.topSlot" class="base-input__top">
      <slot name="topSlot" />
    </p>

    <input
      :class="[
        'base-input__element',
        { 'base-input__element--invalid': invalid },
      ]"
      v-bind="{ disabled, placeholder, value: modelValue }"
      type="text"
      @input="handleInputChange($event)"
    />

    <p v-if="invalid" class="base-input__invalid-message">
      {{ invalidMessage }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  disabled: Boolean,
  invalid: Boolean,
  invalidMessage: String,
  modelValue: String,
  placeholder: String,
});

const emit = defineEmits(['update:modelValue']);

function handleInputChange(event) {
  const input = event.target;

  input.value = input.value.trimStart();

  emit('update:modelValue', input.value);
}
</script>

<style lang="scss">
@use '../styles/colors' as *;
@use '../styles/mixins' as *;

.base-input {
  display: flex;
  flex-direction: column;
  gap: 5px;
  color: $dark;

  &__top {
    font-weight: 500;
  }

  &__element {
    @include BaseFormElementStyle;
    @include BaseFormElementDefaultFocus;

    &::placeholder {
      @include RegularPlaceholder;
    }

    &[disabled] {
      @include BaseFormElementDisabled;
    }

    &--invalid {
      @include BaseFormElementInvalid;
    }
  }

  &__invalid-message {
    @include BaseFormElementInvalidMessage;
  }
}
</style>
