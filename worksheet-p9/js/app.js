
/*
 * PABW Pertemuan 8 dan 9
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

// Data daftar proyek
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

// Menampilkan daftar proyek di Console
console.log("Daftar proyek:", daftarProyek);

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

// Ekspor data agar dapat digunakan oleh dom.js
export { profil, buatPerkenalan, formatKeahlian, daftarProyek };
