<script setup lang="ts">
import { Button } from "primevue";
import router from "./router";

const goTo = (name: string) => {
  router.push({ name });
};
</script>

<template class="main-app">
  <div class="wrapper">
    <div
      :style="{
        display: 'flex',
        width: '100vw',
        justifyContent: 'space-between',
        padding: '.5em 1em',
        alignItems: 'center',
        borderBottom: 'solid',
        borderBottomColor: 'var(--p-gray-100)',
        position: 'fixed',
        top: '0',
        zIndex: '100',
        backdropFilter: 'blur(10px)',
        background: 'rgba(255, 255, 255, 0.5)',
      }"
    >
      <div
        :style="{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          cursor: 'pointer',
        }"
        @click="goTo('home')"
      >
        <i class="pi pi-shield" :style="{ fontSize: '1.2em', fontWeight: '500' }"></i>
        <p :style="{ width: '1em' }"></p>
        <p :style="{ fontWeight: '500', fontSize: '1.2em' }">Citi Project</p>
      </div>
      <div :style="{ flex: 1 }"></div>
      <Button
        label="key"
        icon="pi pi-key"
        variant="text"
        severity="contrast"
        @click="goTo('gen')"
      />
      <Button
        label="VC"
        icon="pi pi-address-book"
        variant="text"
        severity="contrast"
        @click="goTo('vc')"
      />
    </div>
    <RouterView />
  </div>
  <div id="foot-wrapper">
    <footer>
      <i class="pi pi-compass pi-spin"></i>
      <div style="width: 0.5rem"></div>
      <p>Citi-Project | 2025 by</p>
      <div style="width: 0.2rem"></div>
      <p style="font-family: serif">壹贰叁</p>
    </footer>
  </div>
</template>

<style scoped>
.main-app {
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
}
#foot-wrapper {
  display: flex;
  justify-content: space-evenly;
}
footer {
  padding-bottom: 1rem;
  display: flex;
  align-items: center;
}
.wrapper {
  flex: 1;
}
</style>
