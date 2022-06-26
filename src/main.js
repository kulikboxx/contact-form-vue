import { createApp } from 'vue';

import App from './App.vue';

import BaseInput from './components/BaseInput.vue';
import BaseMessage from './components/BaseMessage.vue';
import BaseRadio from './components/BaseRadio.vue';
import BaseSelect from './components/BaseSelect.vue';
import BaseTextarea from './components/BaseTextarea.vue';

const app = createApp(App);

app.component('base-input', BaseInput);
app.component('base-message', BaseMessage);
app.component('base-radio', BaseRadio);
app.component('base-select', BaseSelect);
app.component('base-textarea', BaseTextarea);

app.mount('#app');
