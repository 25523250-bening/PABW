
export const state = {
  daftarProyek: [],
  kategoriAktif: "semua",
  favorit: [],
  sedangMemuat: false,
  pesanGalat: ""
};

export function isiProyek(daftar) {
  state.daftarProyek = daftar;
}

export function pilihKategori(nilai) {
  state.kategoriAktif = nilai;
}

export function tambahFavorit(id) {
  if (state.favorit.includes(id)) {
    state.favorit = state.favorit.filter(
      (favoritId) => favoritId !== id
    );
  } else {
    state.favorit = [...state.favorit, id];
  }
}

export function aturMemuat(status) {
  state.sedangMemuat = status;
}

export function aturGalat(pesan) {
  state.pesanGalat = pesan;
}
