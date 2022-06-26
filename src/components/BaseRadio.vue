<template>
  <div class="base-radio">
    <p v-if="$slots.topSlot" class="base-radio__top">
      <slot name="topSlot" />
    </p>

    <div class="base-radio__wrapper">
      <label
        v-for="(item, itemIndex) in items"
        :key="itemIndex"
        class="base-radio__label"
      >
        <input
          :class="[
            'base-radio__element',
            { 'base-radio__element--invalid': invalid },
          ]"
          v-bind="{ checked: modelValue === item }"
          type="radio"
          @change="handleRadioChange(item)"
        />
        {{ uppercase ? item.toUpperCase() : item }}
      </label>
    </div>

    <p v-if="invalid" class="base-radio__invalid-message">
      {{ invalidMessage }}
    </p>
  </div>

  <slot />
</template>

<script setup>
defineProps({
  direction: String,
  invalid: Boolean,
  invalidMessage: String,
  items: Array,
  modelValue: String,
  uppercase: Boolean,
});

const emit = defineEmits(['update:modelValue']);

function handleRadioChange(value) {
  emit('update:modelValue', value);
}
</script>

<style lang="scss">
@use '../styles/colors' as *;
@use '../styles/mixins' as *;

.base-radio {
  display: flex;
  flex-direction: column;
  gap: 5px;
  color: $dark;

  &__top {
    font-weight: 500;
  }

  &__wrapper {
    display: flex;
    flex-direction: v-bind(direction);
    gap: 10px;
  }

  &__label {
    position: relative;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  &__label,
  &__element::before,
  &__element::after {
    cursor: pointer;
  }

  &__element,
  &__element::before,
  &__element::after {
    border-radius: 50%;
  }

  &__element {
    appearance: none;
    @include BaseFormElementDefaultFocus;

    &::before,
    &::after {
      content: '';
      display: block;
    }

    &::before {
      width: 16px;
      height: 16px;
      border: 1px solid $light;
    }

    &::after {
      position: absolute;
      top: 0;
      left: 0;
      width: 18px;
      height: 18px;
      background-color: $violet;
      transform: scale(0);
      transition: transform 0.2s;
    }

    &:checked::after {
      transform: scale(0.6);
    }

    &--invalid {
      @include BaseFormElementInvalid;

      &::before {
        @include BaseFormElementInvalid;
      }
    }
  }

  &__invalid-message {
    @include BaseFormElementInvalidMessage;
  }
}
</style>
