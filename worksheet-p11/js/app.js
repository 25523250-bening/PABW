import { ambilProyek } from "./api.js";
import { isiProyek } from "./state.js";
import {
  aturMemuat,
  tampilkanGalat,
  render
} from "./dom.js";
import { pasangPendengar } from "./events.js";

async function mulai() {
  pasangPendengar();
  aturMemuat(true);

  try {
    const daftar = await ambilProyek();
    isiProyek(daftar);
    render();
  } catch (galat) {
    tampilkanGalat(
      "Data gagal dimuat. Periksa koneksi, lalu muat ulang halaman."
    );
    console.error(galat.message);
  } finally {
    aturMemuat(false);
  }
}

mulai();
