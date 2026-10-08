const profil = {
  nama: "Bening Affina",
  peran: "Mahasiswa Informatika",
  keahlian: ["HTML", "CSS", "JavaScript"],
  jumlahProyek: 3,
};

const kalimat = `Nama saya ${profil.nama}, dan saya belajar ${profil.keahlian.length} hal.`;

console.log(kalimat);

function buatPerkenalan({ nama, peran }) {
  return `${nama} — ${peran}`;
}

console.log(buatPerkenalan(profil));

const formatKeahlian = (daftar) => daftar.join(" · ");

console.log(formatKeahlian(profil.keahlian));

const daftarProyek = [
  {
    judul: "Halaman Profil",
    tahun: 2026,
    selesai: true,
  },
  {
    judul: "Katalog Produk",
    tahun: 2026,
    selesai: false,
  },
];

console.table(profil.keahlian);
console.table(daftarProyek);

const selesai = daftarProyek.filter((proyek) => proyek.selesai);

console.table(selesai);

const katalog = daftarProyek.find(
  (proyek) => proyek.judul === "Katalog Produk"
);

console.log(katalog);

const judulProyek = daftarProyek.map((proyek) => proyek.judul);

console.log(judulProyek);

const urut = [...daftarProyek].sort((a, b) =>
  b.judul.localeCompare(a.judul)
);

console.table(urut);
console.table(daftarProyek);