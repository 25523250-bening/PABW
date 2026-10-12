
import { daftarProyek } from "./app.js";

// Mengambil elemen HTML
const daftar = document.querySelector("#daftar");
const filter = document.querySelector("#filter");
const kosong = document.querySelector("#kosong");

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

// Mengelompokkan pesan galat
const galat = {
  nama: galatNama,
  tempat: galatTempat,
  tanggal: galatTanggal
};

function periksaForm() {
  const namaSah = inputNama.value.trim() !== "";
  const tempatSah = inputTempat.value.trim() !== "";
  const tanggalSah = inputTanggal.value.trim() !== "";

  const sah = namaSah && tempatSah && tanggalSah;

  galatNama.textContent = namaSah
    ? ""
    : "Kegiatan wajib diisi.";

  galatTempat.textContent = tempatSah
    ? ""
    : "Tempat wajib diisi.";

  galatTanggal.textContent = tanggalSah
    ? ""
    : "Tanggal wajib diisi.";

  galatNama.hidden = namaSah;
  galatTempat.hidden = tempatSah;
  galatTanggal.hidden = tanggalSah;

  inputNama.setAttribute("aria-invalid", String(!namaSah));
  inputTempat.setAttribute("aria-invalid", String(!tempatSah));
  inputTanggal.setAttribute("aria-invalid", String(!tanggalSah));

  tombolSimpan.disabled = !sah;

  return sah;
}


// Menyimpan kategori filter yang sedang dipilih
let kategoriAktif = "semua";

// Membuat satu kartu proyek
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
function render(data) {
  // 1. Kosongkan wadah terlebih dahulu
  daftar.textContent = "";

  // 2. Periksa apakah data kosong
  if (data.length === 0) {
    kosong.hidden = false;
    return;
  }

  // Sembunyikan pesan jika data tersedia
  kosong.hidden = true;

  // 3. Tampilkan kartu proyek
  data.forEach((proyek) => {
    daftar.append(buatKartu(proyek));
  });
}

// Menyaring proyek berdasarkan kategori
function saringProyek() {
  const hasilFilter = daftarProyek.filter((proyek) => {
    return (
      kategoriAktif === "semua" ||
      proyek.kategori === kategoriAktif
    );
  });

  console.log("Kategori aktif:", kategoriAktif);
  console.log("Hasil filter:", hasilFilter);
  console.log("Jumlah proyek:", hasilFilter.length);

  render(hasilFilter);
}

// Event filter menggunakan satu pendengar di induknya
filter.addEventListener("click", (event) => {
  const tombol = event.target.closest("button");

  if (!tombol || !filter.contains(tombol)) {
    return;
  }

  kategoriAktif = tombol.dataset.kategori;

  // Menandai tombol yang sedang aktif
  filter.querySelectorAll("button").forEach((item) => {
    item.classList.toggle("aktif", item === tombol);
  });

  saringProyek();
});

// Menandai tombol Semua saat halaman dibuka
filter.querySelectorAll("button").forEach((tombol) => {
  tombol.classList.toggle(
    "aktif",
    tombol.dataset.kategori === kategoriAktif
  );
});

/* Memeriksa form setiap kali input berubah */
[inputNama, inputTempat, inputTanggal].forEach((input) => {
  input.addEventListener("input", () => {
    periksaForm();
  });
});


 // Memeriksa form saat halaman pertama kali dibuka
periksaForm();

// Menampilkan proyek saat halaman pertama kali dibuka
saringProyek();


/* Menangani pengiriman form */
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const sah = periksaForm();

  if (!sah) {
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
