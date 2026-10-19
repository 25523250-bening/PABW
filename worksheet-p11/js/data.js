export const profil = {
  nama: "Bening Affina",
  peran: "Mahasiswa Informatika",
  keahlian: ["HTML", "CSS", "JavaScript"]
};

export function buatPerkenalan({ nama, peran }) {
  return `Halo, saya ${nama}, ${peran}.`;
}

export const formatKeahlian = (daftar) => daftar.join(" · ");

export function saring(daftar, kategori) {
  if (kategori === "semua") {
    return daftar;
  }

  return daftar.filter((proyek) => proyek.kategori === kategori);
}