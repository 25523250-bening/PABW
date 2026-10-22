
<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { profil } from './data.js'
import { ambilProyek } from './api.js'
import {
  state,
  simpan,
  muat,
  pulihkan,
  isiProyek,
} from './state.js'

import KepalaProfil from './components/KepalaProfil.vue'
import TombolFilter from './components/TombolFilter.vue'
import DaftarProyek from './components/DaftarProyek.vue'
import FormKontak from './components/FormKontak.vue'

const tampil = computed(() =>
  state.daftarProyek.filter(
    (proyek) =>
      state.kategoriAktif === 'semua' ||
      proyek.kategori === state.kategoriAktif,
  ),
)

const namaKegiatan = ref('')
const tempat = ref('')
const tanggal = ref('')

const galatKegiatan = ref('')
const galatTempat = ref('')
const galatTanggal = ref('')
const pesanBerhasil = ref('')

onMounted(async () => {
  pulihkan(muat())

  try {
    isiProyek(await ambilProyek())
  } catch (galat) {
    state.pesanGalat =
      'Data gagal dimuat. Periksa koneksi, lalu muat ulang halaman.'
    console.error(galat)
  } finally {
    state.sedangMemuat = false
  }
})

watch(
  state,
  (nilai) => simpan(nilai),
  { deep: true },
)

function pilihKategori(kategori) {
  state.kategoriAktif = kategori
}

function aturUlang() {
  state.kategoriAktif = 'semua'
  state.favorit = []
}

function toggleFavorit(id) {
  if (state.favorit.includes(id)) {
    state.favorit = state.favorit.filter(
      (favoritId) => favoritId !== id,
    )
  } else {
    state.favorit.push(id)
  }
}

function simpanKegiatan() {
  galatKegiatan.value = namaKegiatan.value.trim()
    ? ''
    : 'Kegiatan wajib diisi.'

  galatTempat.value = tempat.value.trim()
    ? ''
    : 'Tempat wajib diisi.'

  galatTanggal.value = tanggal.value
    ? ''
    : 'Tanggal wajib diisi.'

  if (
    galatKegiatan.value ||
    galatTempat.value ||
    galatTanggal.value
  ) {
    pesanBerhasil.value = ''
    return
  }

  pesanBerhasil.value = 'Rencana kegiatan berhasil disimpan.'
}
</script>

<template>
  <div class="page">
    <header class="navbar">
      <input
        type="checkbox"
        id="tema"
        class="pengalih-tema"
      />
      <label for="tema" class="tombol-tema">
        Tema gelap
      </label>

      <h1>Plan Libur Semester</h1>

      <KepalaProfil :profil="profil" />

      <nav aria-label="Navigasi utama">
        <ul>
          <li><a href="#plan">Plan Libur</a></li>
          <li><a href="#kegiatan">Kegiatan</a></li>
          <li><a href="#catatan">Catatan</a></li>
        </ul>
      </nav>
    </header>

    <main class="isi">
      <section class="sorotan">
        <TombolFilter
          :kategori-aktif="state.kategoriAktif"
          @pilih-kategori="pilihKategori"
        />

        <button
          id="atur-ulang"
          type="button"
          @click="aturUlang"
        >
          Atur ulang
        </button>

        <DaftarProyek
          :daftar-proyek="tampil"
          :memuat="state.sedangMemuat"
          :pesan-galat="state.pesanGalat"
          :favorit-ids="state.favorit"
          @toggle-favorit="toggleFavorit"
        />
      </section>

      <figure class="papan">
        <img
          src="/liburan.jpg"
          alt="Pemandangan tempat liburan saya di Bandung"
          width="640"
          height="360"
          loading="lazy"
        />
        <figcaption>
          Pemandangan tempat liburan saya saat libur semester
        </figcaption>
      </figure>

      <FormKontak
        :nama-kegiatan="namaKegiatan"
        :tempat="tempat"
        :tanggal="tanggal"
        :galat-kegiatan="galatKegiatan"
        :galat-tempat="galatTempat"
        :galat-tanggal="galatTanggal"
        :tombol-nonaktif="!(
          namaKegiatan.trim() &&
          tempat.trim() &&
          tanggal
        )"
        :pesan-berhasil="pesanBerhasil"
        @update:nama-kegiatan="namaKegiatan = $event"
        @update:tempat="tempat = $event"
        @update:tanggal="tanggal = $event"
        @simpan="simpanKegiatan"
      />

      <section id="catatan" class="catatan">
        <h2>Catatan</h2>
        <p>
          Menikmati waktu libur semester dengan membuat rencana
          kegiatan dan mengunjungi beberapa tempat.
        </p>
      </section>
    </main>

    <footer>
      <p>Bening Affina, NIM: 25523250, 2026</p>
    </footer>
  </div>
</template>
