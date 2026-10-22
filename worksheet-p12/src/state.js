import { reactive } from 'vue'

const KUNCI = 'pabw-p11'
const VERSI = 2

export const state = reactive({
  daftarProyek: [],
  kategoriAktif: 'semua',
  favorit: [],
  sedangMemuat: true,
  pesanGalat: '',
})

export function simpan(nilai = state) {
  const isi = {
    versi: VERSI,
    kategoriAktif: nilai.kategoriAktif,
    favorit: nilai.favorit,
  }

  localStorage.setItem(KUNCI, JSON.stringify(isi))
}

export function muat() {
  try {
    const tersimpan = localStorage.getItem(KUNCI)
    if (!tersimpan) return null

    const isi = JSON.parse(tersimpan)

    if (isi?.versi !== VERSI) {
      localStorage.removeItem(KUNCI)
      return null
    }

    return isi
  } catch {
    localStorage.removeItem(KUNCI)
    return null
  }
}

export function pulihkan(isi) {
  if (!isi || isi.versi !== VERSI) return

  state.kategoriAktif = isi.kategoriAktif || 'semua'
  state.favorit = Array.isArray(isi.favorit)
    ? isi.favorit
    : []
}

export function aturUlang() {
  localStorage.removeItem(KUNCI)
  state.kategoriAktif = 'semua'
  state.favorit = []
}

export function isiProyek(daftar) {
  state.daftarProyek = daftar
}

export function pilihKategori(nilai) {
  state.kategoriAktif = nilai
}

export function tambahFavorit(id) {
  if (state.favorit.includes(id)) {
    state.favorit = state.favorit.filter(
      (favoritId) => favoritId !== id,
    )
  } else {
    state.favorit = [...state.favorit, id]
  }
}

export function aturMemuat(status) {
  state.sedangMemuat = status
}

export function aturGalat(pesan) {
  state.pesanGalat = pesan
}
