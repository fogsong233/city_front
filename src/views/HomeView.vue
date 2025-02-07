<script setup lang="ts">
import { Button } from "primevue";
</script>

<template>
  <main>
    <h1>I<span>den</span>tity Veri<i>ficti</i>on Sy<span class="yst">ste</span>m</h1>
    <h3 class="subtitle">power by <span style="color: var(--p-blue-500)">ethereum</span></h3>
    <div style="height: 10vh"></div>
    <Button label="Manage you smart contracts" icon="pi pi-spin pi-cog" size="large" />
  </main>
</template>

<style scoped>
main {
  padding-top: 35vh;
  overflow: auto;
  text-align: center;
}
h1 {
  font-weight: 600;
  font-size: 3.5rem;
}
h1 span {
}
.yst {
  font-family: serif;
}
.subtitle {
  font-size: 1.5rem;
  font-style: italic;
}
</style>
