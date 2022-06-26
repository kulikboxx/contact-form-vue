<template>
  <div class="base-select">
    <p v-if="$slots.topSlot" class="base-select__top">
      <slot name="topSlot" />
    </p>

    <div class="base-select__wrapper">
      <select
        v-bind="{ id, value }"
        :class="[
          'base-select__element',
          { 'base-select__element--invalid': invalid },
        ]"
        @change="handleSelectChange($event)"
      >
        <option
          v-for="(option, optionIndex) in options"
          :key="optionIndex"
          v-bind="{ disabled: optionIndex === 0, value: option.value }"
          class="base-select__option"
        >
          {{ option.label }}
        </option>
      </select>

      <span class="base-select__arrow"></span>
    </div>

    <p v-if="invalid" class="base-select__invalid-message">
      {{ invalidMessage }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  id: String,
  invalid: Boolean,
  invalidMessage: String,
  modelValue: String,
  options: Array,
  value: String,
});

const emit = defineEmits(['update:modelValue']);

function handleSelectChange(event) {
  emit('update:modelValue', event.target.value);
}
</script>

<style lang="scss" scoped>
@use '../styles/colors' as *;
@use '../styles/mixins' as *;

.base-select {
  display: flex;
  flex-direction: column;
  gap: 5px;
  color: $dark;

  &__top {
    font-weight: 500;
  }

  &__wrapper {
    position: relative;
  }

  &__element {
    appearance: none;
    @include BaseFormElementStyle;
    @include BaseFormElementDefaultFocus;
    cursor: pointer;

    &::-ms-expand {
      display: none;
    }

    &--invalid {
      @include BaseFormElementInvalid;
    }
  }

  &__arrow,
  &__arrow::before {
    position: absolute;
  }

  &__arrow {
    top: 4px;
    right: 4px;
    height: calc(100% - 8px);
    aspect-ratio: 1/1;
    background-color: $white;
    pointer-events: none;

    &::before {
      content: '';
      top: 50%;
      right: 10px;
      transform: translateY(-50%);
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 8px 8px 0 8px;
      border-color: $light transparent transparent transparent;
    }
  }

  &__option {
    color: inherit;
    font-weight: 500;

    &:first-of-type {
      color: $placeholder;
    }
  }

  &__invalid-message {
    @include BaseFormElementInvalidMessage;
  }
}
</style>
