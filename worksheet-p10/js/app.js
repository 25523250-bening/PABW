
import { ambilProyek } from "./api.js";
import {
  render,
  pasangFilter,
  aturMemuat,
  tampilkanGalat
} from "./dom.js";

/*
 * PABW Pertemuan 8, 9, dan 10
 * Data profil dan daftar proyek
 */

// Data profil
const profil = {
  nama: "Bening Affina",
  peran: "Mahasiswa Informatika",
  keahlian: ["HTML", "CSS", "JavaScript"],
  jumlahProyek: 3
};

// Fungsi untuk membuat perkenalan
function buatPerkenalan(data) {
  return `Nama saya ${data.nama}, dan saya belajar ${data.keahlian.length} hal.`;
}

// Fungsi untuk mengubah daftar keahlian menjadi teks
function formatKeahlian(data) {
  return data.keahlian.join(", ");
}

// Menampilkan informasi profil di Console
console.log(buatPerkenalan(profil));
console.log("Keahlian:", formatKeahlian(profil));

// Data proyek lokal dari P9
const daftarProyek = [
  {
    judul: "Halaman Profil",
    tahun: 2026,
    kategori: "selesai",
    selesai: true
  },
  {
    judul: "Plan Libur Semester",
    tahun: 2026,
    kategori: "proses",
    selesai: false
  }
];

// Contoh penggunaan map()
const judulProyek = daftarProyek.map((proyek) => proyek.judul);
console.log("Judul proyek:", judulProyek);

// Contoh penggunaan filter()
const proyekSelesai = daftarProyek.filter(
  (proyek) => proyek.selesai
);
console.log("Proyek selesai:", proyekSelesai);

// Contoh penggunaan find()
const proyekPertama = daftarProyek.find(
  (proyek) => proyek.judul === "Halaman Profil"
);
console.log("Proyek pertama:", proyekPertama);

// Memuat data proyek dari API
async function muat() {
  aturMemuat(true);

  try {
    const data = await ambilProyek();

    console.log("Data API berhasil dimuat:", data);

    // Data API menjadi sumber daftar proyek pada halaman
    pasangFilter(data);

  } catch (galat) {
    tampilkanGalat(
      "Data gagal dimuat. Periksa koneksi, lalu muat ulang halaman."
    );

    console.error("Data gagal dimuat:", galat.message);

  } finally {
    aturMemuat(false);
  }
}

muat();

// Ekspor data dan fungsi profil
export {
  profil,
  buatPerkenalan,
  formatKeahlian,
  daftarProyek,
  muat
};
