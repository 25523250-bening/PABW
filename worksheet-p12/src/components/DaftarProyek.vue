<script setup>
defineProps({
  daftarProyek: {
    type: Array,
    default: () => [],
  },
  memuat: {
    type: Boolean,
    default: false,
  },
  pesanGalat: {
    type: String,
    default: '',
  },
  favoritIds: {
    type: Array,
    default: () => [],
  },
})

defineEmits(['toggle-favorit'])
</script>

<template>
  <section id="plan" class="sorotan">
    <h2>Daftar Proyek</h2>

    <p v-if="memuat" id="muat">
      Memuat data proyek...
    </p>

    <p v-else-if="pesanGalat" id="kosong">
      {{ pesanGalat }}
    </p>

    <template v-else>
      <p
        v-if="daftarProyek.length === 0"
        id="kosong"
      >
        Belum ada proyek dalam kategori ini.
      </p>

      <ul v-else id="daftar" class="galeri">
        <li
          v-for="proyek in daftarProyek"
          :key="proyek.id"
          class="kartu"
        >
          <h3>{{ proyek.judul }}</h3>

          <p>Tahun: {{ proyek.tahun }}</p>

          <button
            type="button"
            class="favorit"
            :data-id="proyek.id"
            :aria-label="'Favorit ' + proyek.judul"
            :aria-pressed="favoritIds.includes(proyek.id)"
            @click="$emit('toggle-favorit', proyek.id)"
          >
            {{ favoritIds.includes(proyek.id) ? '★' : '☆' }}
          </button>
        </li>
      </ul>
    </template>
  </section>
</template>
