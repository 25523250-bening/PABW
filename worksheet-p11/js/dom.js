import { state } from "./state.js";

const daftar = document.querySelector("#daftar");
const kosong = document.querySelector("#kosong");
const muatEl = document.querySelector("#muat");
const pesanBerhasil = document.querySelector("#pesan-berhasil");

export function aturMemuat(aktif) {
  muatEl.hidden = !aktif;
}

export function tampilkanGalat(pesan) {
  daftar.textContent = "";
  kosong.textContent = pesan;
  kosong.hidden = false;
}

export function tampilkanBerhasil(pesan) {
  pesanBerhasil.textContent = pesan;
  pesanBerhasil.hidden = false;
}

function buatKartu(proyek) {
  const item = document.createElement("li");
  const judul = document.createElement("h3");
  const tahun = document.createElement("p");

  judul.textContent = proyek.judul;
  tahun.textContent = `Tahun: ${proyek.tahun}`;

  item.append(judul, tahun);
  return item;
}

export function render(data = state) {
  daftar.textContent = "";

  const daftarData = Array.isArray(data)
    ? data
    : data.daftarProyek.filter((proyek) => {
        if (data.kategoriAktif === "semua") return true;
        return proyek.kategori === data.kategoriAktif;
      });

  if (daftarData.length === 0) {
    kosong.textContent = "Belum ada proyek dalam kategori ini.";
    kosong.hidden = false;
    return;
  }

  kosong.hidden = true;
  daftarData.forEach((proyek) => {
    daftar.append(buatKartu(proyek));
  });
}

export function periksaForm() {
  const inputNama = document.querySelector("#nama-kegiatan");
  const inputTempat = document.querySelector("#tempat");
  const inputTanggal = document.querySelector("#tanggal");
  const tombolSimpan = document.querySelector("#tombol-simpan");
  const galatNama = document.querySelector("#galat-kegiatan");
  const galatTempat = document.querySelector("#galat-tempat");
  const galatTanggal = document.querySelector("#galat-tanggal");

  const namaSah = inputNama.value.trim() !== "";
  const tempatSah = inputTempat.value.trim() !== "";
  const tanggalSah = inputTanggal.value.trim() !== "";
  const sah = namaSah && tempatSah && tanggalSah;

  galatNama.textContent = namaSah ? "" : "Kegiatan wajib diisi.";
  galatTempat.textContent = tempatSah ? "" : "Tempat wajib diisi.";
  galatTanggal.textContent = tanggalSah ? "" : "Tanggal wajib diisi.";

  galatNama.hidden = namaSah;
  galatTempat.hidden = tempatSah;
  galatTanggal.hidden = tanggalSah;

  inputNama.setAttribute("aria-invalid", String(!namaSah));
  inputTempat.setAttribute("aria-invalid", String(!tempatSah));
  inputTanggal.setAttribute("aria-invalid", String(!tanggalSah));

  tombolSimpan.disabled = !sah;
  return sah;
}
