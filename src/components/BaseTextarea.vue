<template>
  <div class="base-textarea">
    <p v-if="$slots.topSlot" class="base-textarea__top">
      <slot name="topSlot" />
    </p>

    <textarea
      :class="[
        'base-textarea__element',
        { 'base-textarea__element--invalid': invalid },
      ]"
      v-bind="{ maxLength, placeholder, value: modelValue }"
      @input="handleTextareaChange($event)"
    ></textarea>

    <p v-if="invalidMessage" class="base-textarea__invalid-message">
      {{ invalidMessage }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  invalid: Boolean,
  invalidMessage: String,
  maxLength: Number,
  modelValue: String,
  placeholder: String,
});

const emit = defineEmits(['update:modelValue']);

function handleTextareaChange(event) {
  const textarea = event.target;

  textarea.value = textarea.value.trimStart();

  emit('update:modelValue', textarea.value);
}
</script>

<style lang="scss" scoped>
@use '../styles/colors' as *;
@use '../styles/mixins' as *;

.base-textarea {
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
    min-height: 100px;
    resize: vertical;

    &::placeholder {
      @include RegularPlaceholder;
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
