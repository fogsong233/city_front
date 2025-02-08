<script setup lang="ts">
import { useClipboard } from "@vueuse/core";
import { ethers } from "ethers";
import { Button, Dialog, Message } from "primevue";
import { ref } from "vue";

const priKey = ref<string>("");
const pubKey = ref<string>("");

const { copy: copyPri, copied: priCopied } = useClipboard({ source: priKey });
const { copy: copyPub, copied: pubCopied } = useClipboard({ source: pubKey });

const dialogVisible = ref(false);

function genKey() {
  const wallet = ethers.Wallet.createRandom();
  // 计算公钥(非压缩格式):
  priKey.value = wallet.privateKey;
  pubKey.value = wallet.signingKey.publicKey;
  dialogVisible.value = true;
}
</script>

<template>
  <div
    :style="{
      width: 'auto',
      height: '90vh',
      display: 'flex',
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'space-evenly',
    }"
  >
    <Button
      label="generate private key and public key"
      style="background: 'var(--p-stone-900)'"
      @click="genKey"
    />
    <Dialog v-model:visible="dialogVisible" modal :style="{ width: '30rem' }">
      <template #header>
        <span
          :style="{
            fontWeight: 'bold',
            fontSize: '1.5rem',
          }"
          >Success!</span
        >
      </template>
      <div
        :style="{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          width: '100%',
        }"
      >
        <p
          :style="{
            color: 'Highlight',
            fontWeight: '600',
            fontSize: '1.1em',
          }"
        >
          Remember it since they can never be seen if you close dialog.
        </p>
        <div
          class="row-list"
          style="margin-top: 1.5em; justify-content: space-between; width: 100%; padding: 0 0.5em"
        >
          <Message severity="info" class="auto-hide-text">
            <template #icon>Public</template>
            {{ pubKey?.slice(0, 35) + "..." }}
          </Message>
          <Button
            :icon="pubCopied ? 'pi pi-check' : 'pi pi-copy'"
            severity="secondary"
            :style="{ marginLeft: '20px' }"
            @click="copyPub(pubKey)"
          />
        </div>

        <div
          class="row-list"
          style="margin-top: 1.5em; justify-content: space-between; width: 100%; padding: 0 0.5em"
        >
          <Message severity="info" class="auto-hide-text">
            <template #icon>Private</template>
            {{ priKey?.slice(0, 35) + "..." }}
          </Message>
          <Button
            :icon="priCopied ? 'pi pi-check' : 'pi pi-copy'"
            severity="secondary"
            :style="{ marginLeft: '20px' }"
            @click="copyPri(priKey)"
          />
        </div>
      </div>

      <template #footer>
        <Button @click="dialogVisible = false" label="Ok" />
      </template>
    </Dialog>
  </div>
</template>

<style></style>
