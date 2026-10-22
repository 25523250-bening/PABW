<script setup>
const props = defineProps({
  profil: { type: Object, required: true },
})
</script>

<template>
  <div class="identitas-profil">
    <p class="nama-profil">{{ props.profil.nama }}</p>
    <p class="peran-profil">{{ props.profil.peran }}</p>
  </div>
</template>
