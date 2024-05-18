<template>
  <div class="file-upload-wrapper">
    <input
      type="file"
      id="file-upload"
      class="file-upload-input"
      @change="handleFileUpload"
    />
    <label for="file-upload" class="file-upload-label">
      <i class="material-symbols-outlined file-upload-icon">upload</i>
      <span class="file-upload-text">Choisissez une image</span>
    </label>
  </div>
</template>

<script setup lang="ts">
const file = defineModel('file');

const handleFileUpload = (event: any) => {
  const uploaded = event.target.files[0];
  file.value = uploaded;
};
</script>

<style scoped>
.file-upload-wrapper {
  @apply relative inline-block pointer-events-auto;
}

.file-upload-input {
  @apply absolute w-full h-full opacity-0 cursor-pointer;
}

.file-upload-label {
  @apply flex items-center cursor-pointer border border-solid rounded-lg overflow-hidden;
}

.file-upload-icon {
  @apply text-2xl py-2 px-3 bg-neutral text-neutral-content;
}

.file-upload-text {
  @apply text-ellipsis px-2;
}
</style>
