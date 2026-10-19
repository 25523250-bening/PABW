/*
 * PABW Pertemuan 9 dan 10
 * DOM, interaktivitas, dan data API
 */

// Mengambil elemen HTML
const daftar = document.querySelector("#daftar");
const filter = document.querySelector("#filter");
const kosong = document.querySelector("#kosong");
const muatEl = document.querySelector("#muat");

// Mengambil elemen form dan input
const form = document.querySelector("#form-kegiatan");
const inputNama = document.querySelector("#nama-kegiatan");
const inputTempat = document.querySelector("#tempat");
const inputTanggal = document.querySelector("#tanggal");
const tombolSimpan = document.querySelector("#tombol-simpan");

// Mengambil elemen pesan validasi
const pesanBerhasil = document.querySelector("#pesan-berhasil");
const galatNama = document.querySelector("#galat-kegiatan");
const galatTempat = document.querySelector("#galat-tempat");
const galatTanggal = document.querySelector("#galat-tanggal");

// Data proyek dari API
let daftarProyek = [];
let kategoriAktif = "semua";

// Status memuat data
function aturMemuat(aktif) {
  muatEl.hidden = !aktif;
}

// Menampilkan pesan galat pemuatan data
function tampilkanGalat(pesan) {
  daftar.textContent = "";
  kosong.textContent = pesan;
  kosong.hidden = false;
}

// Membuat kartu proyek
function buatKartu(proyek) {
  const item = document.createElement("li");
  const judul = document.createElement("h3");
  const tahun = document.createElement("p");

  judul.textContent = proyek.judul;
  tahun.textContent = `Tahun: ${proyek.tahun}`;

  item.append(judul, tahun);
  return item;
}

// Menampilkan daftar proyek
// D.1: render menerima larik data dari API
function render(daftarData) {
  daftar.textContent = "";

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

// Memasang filter dan menerima data dari API
function pasangFilter(data) {
  daftarProyek = data;

  // Awalnya tampilkan semua proyek
  kategoriAktif = "semua";

  filter.querySelectorAll("button").forEach((tombol) => {
    tombol.classList.toggle(
      "aktif",
      tombol.dataset.kategori === "semua"
    );
  });

  saringProyek();
}

// Menyaring proyek berdasarkan kategori
function saringProyek() {
  const hasilFilter = daftarProyek.filter((proyek) => {
    if (kategoriAktif === "semua") {
      return true;
    }

    return proyek.kategori === kategoriAktif;
  });

  render(hasilFilter);
}

// Event filter
filter.addEventListener("click", (event) => {
  const tombol = event.target.closest("button");

  if (!tombol || !filter.contains(tombol)) {
    return;
  }

  kategoriAktif = tombol.dataset.kategori;

  filter.querySelectorAll("button").forEach((item) => {
    item.classList.toggle("aktif", item === tombol);
  });

  saringProyek();
});

// Validasi form
function periksaForm() {
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

// Memeriksa form saat input berubah
[inputNama, inputTempat, inputTanggal].forEach((input) => {
  input.addEventListener("input", periksaForm);
});

// Memeriksa form saat halaman dibuka
periksaForm();

// Menangani pengiriman form
form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!periksaForm()) {
    if (inputNama.value.trim() === "") {
      inputNama.focus();
    } else if (inputTempat.value.trim() === "") {
      inputTempat.focus();
    } else if (inputTanggal.value.trim() === "") {
      inputTanggal.focus();
    }

    pesanBerhasil.hidden = true;
    return;
  }

  pesanBerhasil.textContent = "Kegiatan berhasil divalidasi!";
  pesanBerhasil.hidden = false;

  console.log("Kegiatan:", inputNama.value.trim());
  console.log("Tempat:", inputTempat.value.trim());
  console.log("Tanggal:", inputTanggal.value);
});

// Ekspor fungsi untuk app.js
export {
  render,
  pasangFilter,
  aturMemuat,
  tampilkanGalat
};
