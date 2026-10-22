
import { saring } from "./data.js";

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

export function buatKartu(proyek, favorit) {
  const li = document.createElement("li");
  li.className = "kartu";

  const judul = document.createElement("h3");
  judul.textContent = proyek.judul;

  const tahun = document.createElement("p");
  tahun.textContent = `Tahun: ${proyek.tahun}`;

  const tombol = document.createElement("button");
  tombol.className = "favorit";
  tombol.dataset.id = proyek.id;
  tombol.setAttribute("aria-label", `Favorit ${proyek.judul}`);
  tombol.textContent = favorit.includes(proyek.id) ? "★" : "☆";

  li.append(judul, tahun, tombol);
  return li;
}

export function tandaiTombolAktif(state) {
  const filter = document.querySelector("#filter");

  filter.querySelectorAll("button").forEach((tombol) => {
    tombol.classList.toggle(
      "aktif",
      tombol.dataset.kategori === state.kategoriAktif
    );
  });
}

export function render(state) {
  daftar.textContent = "";

  const daftarData = saring(
    state.daftarProyek,
    state.kategoriAktif
  );

  if (daftarData.length === 0) {
    kosong.textContent = "Belum ada proyek dalam kategori ini.";
    kosong.hidden = false;
  } else {
    kosong.hidden = true;

    daftarData.forEach((proyek) => {
      daftar.append(buatKartu(proyek, state.favorit));
    });
  }

  tandaiTombolAktif(state);
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
