
import { ambilProyek } from './api.js';

import {
  render,
  pasangFilter,
  aturMemuat,
  tampilkanGalat
} from './dom.js';

// Data profil dari Pertemuan 8 boleh tetap di sini,
// jika masih digunakan oleh halaman.

// Memuat data proyek dari API
async function muat() {
  aturMemuat(true);

  try {
    const daftar = await ambilProyek();

    pasangFilter(daftar);
    render(daftar);
  } catch (galat) {
    tampilkanGalat(
      'Data gagal dimuat. Periksa koneksi, lalu muat ulang halaman.'
    );

    console.error(galat.message);
  } finally {
    aturMemuat(false);
  }
}

// Dipanggil sekali saat halaman dibuka
muat();

export { muat };
