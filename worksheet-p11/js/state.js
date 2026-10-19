
export const state = {
  daftarProyek: [],
  kategoriAktif: "semua",
  sedangMemuat: false,
  pesanGalat: ""
};

export function isiProyek(daftar) {
  state.daftarProyek = daftar;
}

export function aturKategori(kategori) {
  state.kategoriAktif = kategori;
}

export function aturMemuat(status) {
  state.sedangMemuat = status;
}

export function aturGalat(pesan) {
  state.pesanGalat = pesan;
}
