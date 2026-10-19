
import { ambilProyek } from "./api.js";
import {
  isiProyek,
  aturMemuat,
  aturGalat,
  state
} from "./state.js";
import {
  aturMemuat as tampilkanMemuat,
  tampilkanGalat,
  render
} from "./dom.js";
import { pasangPendengar } from "./events.js";

async function mulai() {
  pasangPendengar();

  aturMemuat(true);
  tampilkanMemuat(true);

  try {
    const daftar = await ambilProyek();
    isiProyek(daftar);
    render(state);
  } catch (galat) {
    aturGalat(
      "Data gagal dimuat. Periksa koneksi, lalu muat ulang halaman."
    );

    tampilkanGalat(state.pesanGalat);
    console.error(galat.message);
  } finally {
    aturMemuat(false);
    tampilkanMemuat(false);
  }
}

mulai();
