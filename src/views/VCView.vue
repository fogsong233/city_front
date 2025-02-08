<script setup lang="ts">
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { ethers } from "ethers";
import { Button, Dialog, FloatLabel, Message } from "primevue";
import InputText from "primevue/inputtext";
import FileUpload, { type FileUploadSelectEvent } from "primevue/fileupload";
import { computed, onMounted, reactive, ref, watch } from "vue";
import Web3 from "web3";
import { ellipsis } from "../utils/text";
import { useClipboard, type UseClipboardReturn } from "@vueuse/core";

type VCType = {
  attribute: string;
  userDID: string;
  idpDID: string;
  IDPsig: string;
};
const vc = reactive<VCType[]>([]);
const clipboardOfVC = ref<UseClipboardReturn<true>[]>([]);
watch(vc, () => {
  console.log("w");
  clipboardOfVC.value = vc.map((v) => {
    return useClipboard({ source: JSON.stringify(v) });
  });
});

function loadVC() {
  vc.splice(0, vc.length);
  vc.push(...(JSON.parse(localStorage.getItem("vc") ?? "[]") as VCType[]));
}
function deleteVC(index: number) {
  vc.splice(index, 1);
}
onMounted(loadVC);
const demoIDPPri = "0xd3af2ce5c130963719bdf6c7435485dc7ac689d63cdaa6f51a6980ffcefc4851";
const demoWallet = new ethers.Wallet(demoIDPPri);
const demoIDPDID = demoWallet.address;

const uploadDialogVisible = ref(false);
const isValidPubkey = computed(() => /^0x[0-9a-fA-F]{130}$/.test(configs.pubKey));
const inputValidState = computed(() => isValidPubkey.value || configs.pubKey === "");
const uploadFileName = ref("null");
let configs = reactive({
  fileName: "",
  pubKey: "",
  attr: "",
});

const onUploadFile = (event: FileUploadSelectEvent) => {
  const file: File | null = event.files[0];
  if (file) {
    uploadFileName.value = file.name;
    configs.fileName = file.name;
  }
};

const isSubmitting = ref(false);
const submitConfig = () => {
  isSubmitting.value = true;
  const newVC = {
    attribute: configs.attr,
    userDID: Web3.utils.soliditySha3({ type: "string", value: configs.pubKey })!,
    idpDID: demoIDPDID,
    IDPsig: "",
  };
  newVC.IDPsig = demoWallet.signingKey.sign(
    ethers.id(newVC.attribute + newVC.userDID + newVC.idpDID)
  ).serialized;
  vc.push(newVC);
  configs = reactive({
    fileName: "",
    pubKey: "",
    attr: "",
  });
  localStorage.setItem("vc", JSON.stringify(vc));
  isSubmitting.value = false;
  uploadDialogVisible.value = false;
};
</script>

<template>
  <Dialog v-model:visible="uploadDialogVisible" modal>
    <template #header>
      <span
        :style="{
          fontWeight: 'bold',
          fontSize: '1.5rem',
        }"
        >Config</span
      >
    </template>
    <div class="up-dialog-content" style="padding: 0 10%">
      <div class="row-list" style="justify-content: left">
        <FileUpload
          mode="basic"
          severity="secondary"
          auto
          customUpload
          class="p-button-outlined"
          @select="onUploadFile"
        />
        <div style="width: 5%"></div>
        {{ uploadFileName }}
      </div>
      <div style="height: 0.8rem"></div>

      <FloatLabel variant="on">
        <InputText v-model="configs.attr" variant="filled" style="width: 100%" id="attr-input" />
        <label>Your Attribute</label>
      </FloatLabel>
      <div style="height: 1rem"></div>
      <FloatLabel variant="on">
        <InputText
          v-model="configs.pubKey"
          :invalid="!inputValidState"
          variant="filled"
          style="width: 100%"
          id="pubkey-input"
        />
        <label for="pubkey-input">Uncompressed Pubkey</label>
      </FloatLabel>
      <Message
        size="small"
        severity="warn"
        variant="simple"
        v-if="!inputValidState"
        style="margin-left: 0.5rem"
      >
        Invalid Pubkey</Message
      >

      <Button
        label="Submit"
        style="margin-left: auto; display: block; margin-top: 1.5rem"
        :disabled="configs.fileName === '' || !isValidPubkey || configs.attr === ''"
        @click="submitConfig"
      />
    </div>
  </Dialog>

  <div class="vc-main">
    <h1>Your VC</h1>
    <p style="font-size: 1.1rem" class="auto-hide-text">
      A demo of <i>IDP</i>, whose address is
      <span
        :style="{
          color: 'var(--p-stone-700)',
          backgroundColor: 'var(--p-blue-100)',
        }"
        class="auto-hide-text pub-key"
      >
        {{ demoIDPDID }}
      </span>
    </p>
    <DataTable :value="Array.from(vc.entries())" size="large">
      <Column header="Attribute"
        ><template #body="{ data: [, data] }">{{ ellipsis(data.attribute) }}</template></Column
      >
      <Column header="user DID"
        ><template #body="{ data: [, data] }">{{ ellipsis(data.userDID) }}</template></Column
      >
      <Column header="IDP DID"
        ><template #body="{ data: [, data] }">{{ ellipsis(data.idpDID) }}</template></Column
      >
      <Column header="IDP Sig"
        ><template #body="{ data: [, data] }">{{ ellipsis(data.IDPsig) }}</template></Column
      >
      <Column>
        <template #body="{ data: [index, data] }">
          <Button
            :icon="clipboardOfVC[index].copied ? 'pi pi-check' : 'pi pi-clipboard'"
            severity="secondary"
            rounded
            @click="clipboardOfVC[index].copy(JSON.stringify(data))"
          ></Button>
        </template>
      </Column>
      <Column>
        <template #body="{ data: [index] }">
          <Button icon="pi pi-trash" severity="warn" rounded @click="deleteVC(index)"></Button>
        </template>
      </Column>
    </DataTable>
  </div>

  <Button
    size="large"
    icon="pi pi-plus"
    rounded
    class="float-btn"
    @click="uploadDialogVisible = true"
  >
  </Button>
</template>

<style scoped>
.vc-main {
  display: table;
  margin: 20vh auto 0;
  height: auto;
  max-width: 90vw;
}
@media screen and (max-width: 800px) {
  span.pub-key {
    display: inline-block;
    width: 80vw;
  }
}

h1 {
  font-weight: 600;
  font-size: 2.2rem;
}

.float-btn {
  position: fixed;
  bottom: 10vh;
  right: 10vw;
  height: 3.5rem;
  width: 3.5rem;
  box-shadow: 5px 3px 17px 0px var(--p-stone-400);
}

.up-dialog-content {
  width: min(500px, 50vw);
}
</style>
