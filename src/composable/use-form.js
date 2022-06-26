import { computed, reactive } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { helpers, minLength, required } from '@vuelidate/validators';

import { formText, maxDescriptionLength } from '../config/base-form.config';

export function useForm() {
  const formValues = reactive({
    description: '',
    confirmation: '',
    vat: '',
    priceNet: '',
  });

  const formValidation = computed(() => ({
    description: {
      required: helpers.withMessage(formText.textIsRequired, required),
    },
    confirmation: {
      required: helpers.withMessage(formText.textIsRequired, required),
      minLength: minLength(1),
    },
    vat: { required: helpers.withMessage(formText.textIsRequired, required) },
    priceNet: {
      required: helpers.withMessage(formText.onlyNumericType, required),
      decimal: helpers.regex(/^[0-9]*[.,]?[0-9]+$/),
    },
  }));

  const v$ = useVuelidate(formValidation, formValues);

  const charactersLeftMessage = computed(() => {
    const descLength = formValues.description.length;

    return descLength < maxDescriptionLength
      ? `Characters left: ${maxDescriptionLength - descLength}`
      : `You can't enter more than ${maxDescriptionLength} characters`;
  });

  const computedPriceGross = computed(() => {
    const transformedPriceNet = parseFloat(
      formValues.priceNet.replace(/\,/gi, '.')
    );

    const result =
      transformedPriceNet +
      (transformedPriceNet * parseInt(formValues.vat)) / 100;

    return !isNaN(result) ? result.toFixed(2) : '';
  });

  return {
    charactersLeftMessage,
    computedPriceGross,
    formValues,
    v$,
  };
}
