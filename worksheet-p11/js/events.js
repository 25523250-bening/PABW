
import {
  periksaForm,
  tampilkanBerhasil,
  render
} from "./dom.js";

import {
  state,
  pilihKategori,
  tambahFavorit
} from "./state.js";

export function pasangPendengar() {
  const filter = document.querySelector("#filter");
  const daftar = document.querySelector("#daftar");
  const form = document.querySelector("#form-kegiatan");

  // Event untuk filter kategori
  filter.addEventListener("click", (event) => {
    const tombol = event.target.closest("button");

    if (!tombol || !filter.contains(tombol)) return;

    pilihKategori(tombol.dataset.kategori);
    render(state);
  });

  // Event untuk tombol favorit
  daftar.addEventListener("click", (event) => {
    const tombol = event.target.closest(".favorit");

    if (!tombol || !daftar.contains(tombol)) return;

    tambahFavorit(Number(tombol.dataset.id));
    render(state);
  });

  // Validasi form
  const inputNama = document.querySelector("#nama-kegiatan");
  const inputTempat = document.querySelector("#tempat");
  const inputTanggal = document.querySelector("#tanggal");

  [inputNama, inputTempat, inputTanggal].forEach((input) => {
    input.addEventListener("input", periksaForm);
  });

  periksaForm();

  // Event untuk submit form
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!periksaForm()) {
      if (inputNama.value.trim() === "") inputNama.focus();
      else if (inputTempat.value.trim() === "") inputTempat.focus();
      else if (inputTanggal.value.trim() === "") inputTanggal.focus();

      return;
    }

    tampilkanBerhasil("Kegiatan berhasil divalidasi!");

    console.log("Kegiatan:", inputNama.value.trim());
    console.log("Tempat:", inputTempat.value.trim());
    console.log("Tanggal:", inputTanggal.value);
  });
}
