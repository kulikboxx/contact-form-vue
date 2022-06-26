import { reactive } from 'vue';
import axios from 'axios';

import { API_URL } from '../config/base-form.config';

export const state = reactive({
  error: false,
  fetching: false,
  successful: false,
});

export function useFetch() {
  const fetchData = async (data) => {
    state.fetching = true;

    await axios
      .post(API_URL, data)
      .then((response) => {
        // setTimeout was added for demonstration purposes only - to slow down the loading process and show the loader in submit button
        setTimeout(() => {
          if (response.status === 200) {
            state.successful = true;
          }
        }, 500);
      })
      .catch((error) => {
        state.error = true;
        console.log(error);
      })
      .finally(() => {
        // setTimeout was added for demonstration purposes only - to slow down the loading process and show the loader in submit button
        setTimeout(() => (state.fetching = false), 500);
      });
  };

  return { fetchData };
}
