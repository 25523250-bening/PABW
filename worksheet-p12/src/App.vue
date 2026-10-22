<script setup>
import { ref, onMounted } from 'vue'
import { profil } from './data.js'
import { ambilProyek } from './api.js'

import KepalaProfil from './components/KepalaProfil.vue'
import TombolFilter from './components/TombolFilter.vue'
import DaftarProyek from './components/DaftarProyek.vue'
import FormKontak from './components/FormKontak.vue'

const kategoriAktif = ref('semua')
const daftarProyek = ref([])
const favoritIds = ref([])
const memuat = ref(false)
const pesanGalat = ref('')

const namaKegiatan = ref('')
const tempat = ref('')
const tanggal = ref('')

const galatKegiatan = ref('')
const galatTempat = ref('')
const galatTanggal = ref('')
const pesanBerhasil = ref('')

onMounted(async () => {
  memuat.value = true
  pesanGalat.value = ''

  try {
    daftarProyek.value = await ambilProyek()
  } catch (galat) {
    pesanGalat.value =
      'Data gagal dimuat. Periksa koneksi, lalu muat ulang halaman.'
    console.error(galat)
  } finally {
    memuat.value = false
  }
})

function pilihKategori(kategori) {
  kategoriAktif.value = kategori
}

function aturUlang() {
  kategoriAktif.value = 'semua'
  favoritIds.value = []
}

function toggleFavorit(id) {
  if (favoritIds.value.includes(id)) {
    favoritIds.value = favoritIds.value.filter(
      (favoritId) => favoritId !== id
    )
  } else {
    favoritIds.value.push(id)
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
          :kategori-aktif="kategoriAktif"
          @pilih-kategori="pilihKategori"
        />

        <button type="button" @click="aturUlang">
          Atur ulang
        </button>

        <DaftarProyek
          :daftar-proyek="daftarProyek.filter(
            (proyek) =>
              kategoriAktif === 'semua' ||
              proyek.kategori === kategoriAktif
          )"
          :memuat="memuat"
          :pesan-galat="pesanGalat"
          :favorit-ids="favoritIds"
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