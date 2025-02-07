<script setup lang="ts">
import { Button } from "primevue";
import router from "./router";

const goTo = (name: string) => {
  router.push({ name });
};
</script>

<template class="main-app">
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
    <Button label="key" icon="pi pi-key" variant="text" severity="contrast" @click="goTo('gen')" />
    <Button
      label="VC"
      icon="pi pi-address-book"
      variant="text"
      severity="contrast"
      @click="goTo('vc')"
    />
  </div>
  <RouterView />
</template>

<style scoped>
.main-app {
  display: flex;
  flex: 1;
  flex-direction: column;
}
</style>
