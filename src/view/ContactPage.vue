<template>
  <transition name="base-form" mode="out-in">
    <base-message
      v-if="state.error"
      :message="formText.errorMessage"
      type="error"
    />

    <base-message
      v-else-if="state.successful"
      :message="formText.successMessage"
      type="success"
    />

    <form v-else class="base-form" @submit.prevent="submitForm()">
      <base-textarea
        v-model="formValues.description"
        v-bind="{
          invalid: v$.description.$error,
          invalidMessage: formValues.description.length
            ? charactersLeftMessage
            : v$.description.$error && v$.description.required.$message,
          maxLength: maxDescriptionLength,
          placeholder: formText.descriptionPlaceholder,
        }"
      >
        <template #topSlot>
          {{ formText.descriptionLabel }}
        </template>
      </base-textarea>

      <base-radio
        v-model="formValues.confirmation"
        v-bind="{
          direction: 'row',
          invalid: v$.confirmation.$error,
          invalidMessage: v$.confirmation.required.$message,
          items: radioButtons,
        }"
        uppercase
      >
        <template #topSlot>
          {{ formText.confirmationLabel }}
        </template>
      </base-radio>

      <base-select
        v-model="formValues.vat"
        v-bind="{
          invalid: v$.vat.$error,
          invalidMessage: v$.vat.required.$message,
          options: selectOptions,
          value: formValues.vat,
        }"
      >
        <template #topSlot>
          {{ formText.vatLabel }}
        </template>
      </base-select>

      <base-input
        v-model="v$.priceNet.$model"
        v-bind="{
          disabled: !formValues.vat,
          invalid: v$.priceNet.$error && formValues.vat.length,
          invalidMessage: v$.priceNet.required.$message,
          placeholder: formValues.vat.length ? formText.pricePlaceholder : '',
        }"
      >
        <template #topSlot>
          {{ formText.priceNetLabel }}
        </template>
      </base-input>

      <base-input v-model="computedPriceGross" disabled>
        <template #topSlot>
          {{ formText.priceGrossLabel }}
        </template>
      </base-input>

      <base-button
        v-bind="{ disabled: state.fetching, loading: state.fetching }"
        type="submit"
      >
        {{ formText.submitButton }}
      </base-button>
    </form>
  </transition>
</template>

<script setup>
import { useForm } from '../composable/use-form';
import { state, useFetch } from '../composable/use-fetch';
import {
  formText,
  maxDescriptionLength,
  radioButtons,
  selectOptions,
} from '../config/base-form.config';

import BaseButton from '../components/BaseButton.vue';
import BaseMessage from '../components/BaseMessage.vue';

const { charactersLeftMessage, computedPriceGross, formValues, v$ } = useForm();
const { fetchData } = useFetch();

function submitForm() {
  v$.value.$validate().then((isValid) => {
    if (isValid) {
      fetchData({ ...formValues, priceGross: computedPriceGross.value });
    }
  });
}
</script>

<style lang="scss">
@use '../styles/index.scss';
@use '../styles/colors' as *;

.base-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-inline: 1rem;
  padding: 3.2rem;
  width: 100%;
  max-width: 500px;
  background-color: $white;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

  &-enter-active {
    transition: transform 0.3s, opacity 0.3s;
  }

  &-leave-active {
    transition: transform 0.3s, opacity 0.3s;
  }

  &-enter-from,
  &-leave-to {
    transform: translateY(10px);
    opacity: 0;
  }
}
</style>
