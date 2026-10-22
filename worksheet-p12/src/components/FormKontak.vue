<script setup>
defineProps({
  namaKegiatan: {
    type: String,
    default: '',
  },
  tempat: {
    type: String,
    default: '',
  },
  tanggal: {
    type: String,
    default: '',
  },
  galatKegiatan: {
    type: String,
    default: '',
  },
  galatTempat: {
    type: String,
    default: '',
  },
  galatTanggal: {
    type: String,
    default: '',
  },
  tombolNonaktif: {
    type: Boolean,
    default: true,
  },
  pesanBerhasil: {
    type: String,
    default: '',
  },
})

defineEmits([
  'update:namaKegiatan',
  'update:tempat',
  'update:tanggal',
  'simpan',
])
</script>

<template>
  <section id="kegiatan" class="utama">
    <h2>Rencana Kegiatan</h2>

    <form @submit.prevent="$emit('simpan')" novalidate>
      <div class="form-kolom">
        <label for="nama-kegiatan">Kegiatan:</label>
        <input
          id="nama-kegiatan"
          name="nama-kegiatan"
          type="text"
          :value="namaKegiatan"
          required
          aria-describedby="galat-kegiatan"
          @input="$emit('update:namaKegiatan', $event.target.value)"
        />
        <p id="galat-kegiatan" class="pesan-galat" v-if="galatKegiatan">
          {{ galatKegiatan }}
        </p>

        <label for="tempat">Tempat:</label>
        <input
          id="tempat"
          name="tempat"
          type="text"
          :value="tempat"
          required
          aria-describedby="galat-tempat"
          @input="$emit('update:tempat', $event.target.value)"
        />
        <p id="galat-tempat" class="pesan-galat" v-if="galatTempat">
          {{ galatTempat }}
        </p>

        <label for="tanggal">Tanggal:</label>
        <input
          id="tanggal"
          name="tanggal"
          type="date"
          :value="tanggal"
          required
          aria-describedby="galat-tanggal"
          @input="$emit('update:tanggal', $event.target.value)"
        />
        <p id="galat-tanggal" class="pesan-galat" v-if="galatTanggal">
          {{ galatTanggal }}
        </p>

        <button type="submit" :disabled="tombolNonaktif">
          Simpan
        </button>

        <p v-if="pesanBerhasil">{{ pesanBerhasil }}</p>
      </div>
    </form>
  </section>
</template>
