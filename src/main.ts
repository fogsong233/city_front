import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import { definePreset } from "@primevue/themes";

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: "{stone.50}",
      100: "{stone.300}",
      200: "{stone.400}",
      300: "{stone.500}",
      400: "{stone.600}",
      500: "{stone.700}",
      600: "{stone.900}",
      700: "{stone.900}",
      800: "{stone.900}",
      900: "{stone.950}",
      950: "{stone.950}",
    },
  },
});

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: MyPreset,
  },
});

app.mount("#app");
