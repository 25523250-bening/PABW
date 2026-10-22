<template>
  <div id="filter" class="baris-filter">
    <button
      type="button"
      :class="{ aktif: kategoriAktif === 'semua' }"
      @click="$emit('pilih-kategori', 'semua')"
    >
      Semua
    </button>

    <button
      type="button"
      :class="{ aktif: kategoriAktif === 'selesai' }"
      @click="$emit('pilih-kategori', 'selesai')"
    >
      Selesai
    </button>

    <button
      type="button"
      :class="{ aktif: kategoriAktif === 'proses' }"
      @click="$emit('pilih-kategori', 'proses')"
    >
      Dalam Proses
    </button>
  </div>
</template>

<script setup>
defineProps({
  kategoriAktif: {
    type: String,
    default: 'semua',
  },
})

defineEmits(['pilih-kategori'])
</script>
