
import { render } from "./dom.js";

const KUNCI = "pabw-p11";
const VERSI = 2;

export const state = {
  daftarProyek: [],
  kategoriAktif: "semua",
  favorit: [],
  sedangMemuat: false,
  pesanGalat: ""
};

export function simpan(state) {
  const isi = {
    versi: VERSI,
    kategoriAktif: state.kategoriAktif,
    favorit: state.favorit
  };

  localStorage.setItem(KUNCI, JSON.stringify(isi));
}


export function muat() {
  try {
    const isi = JSON.parse(localStorage.getItem(KUNCI));

    if (isi?.versi !== VERSI) {
      localStorage.removeItem(KUNCI);
      return null;
    }

    return isi;
  } catch {
    localStorage.removeItem(KUNCI);
    return null;
  }
}


export function pulihkan(isi) {
  if (!isi || isi.versi !== VERSI) return;

  state.kategoriAktif = isi.kategoriAktif;
  state.favorit = Array.isArray(isi.favorit)
    ? isi.favorit
    : [];
}

export function aturUlang() {
  localStorage.removeItem(KUNCI);
  state.kategoriAktif = "semua";
  state.favorit = [];
  render(state);
}

export function isiProyek(daftar) {
  state.daftarProyek = daftar;
}

export function pilihKategori(nilai) {
  state.kategoriAktif = nilai;
  simpan(state);
}

export function tambahFavorit(id) {
  if (state.favorit.includes(id)) {
    state.favorit = state.favorit.filter(
      (favoritId) => favoritId !== id
    );
  } else {
    state.favorit = [...state.favorit, id];
  }

  simpan(state);
}

export function aturMemuat(status) {
  state.sedangMemuat = status;
}

export function aturGalat(pesan) {
  state.pesanGalat = pesan;
}
