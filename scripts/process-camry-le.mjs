/* process-camry-le.mjs
 * Procesa las 6 fotos subidas del Toyota Camry LE 2018 a WebP 4:5.
 * Orden de la galería (portada = frontal con perfil completo):
 *   1.webp = IMG_9030 (frontal 3/4, lado conductor, perfil completo) — PORTADA
 *   2.webp = IMG_9028 (frontal 3/4, vista elevada)
 *   3.webp = IMG_9029 (frontal 3/4, lado pasajero)
 *   4.webp = IMG_9022 (interior — asiento conductor + tablero)
 *   5.webp = IMG_9024 (interior — asientos, vista trasera hacia adelante)
 *   6.webp = IMG_9026 (interior — tablero/pantalla)
 */
import sharp from "sharp";
import { stat, mkdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const UPLOAD = "/home/z/my-project/upload";
const OUT_DIR = join("/home/z/my-project/public/autos/05-toyota-camry-le");

const photos = [
  { num: 1, src: "IMG_9030.jpg", label: "frontal 3/4 perfil completo (PORTADA)" },
  { num: 2, src: "IMG_9028.jpg", label: "frontal 3/4 elevada" },
  { num: 3, src: "IMG_9029.jpg", label: "frontal 3/4 lado pasajero" },
  { num: 4, src: "IMG_9022.jpg", label: "interior asiento conductor" },
  { num: 5, src: "IMG_9024.jpg", label: "interior asientos vista trasera" },
  { num: 6, src: "IMG_9026.jpg", label: "interior tablero/pantalla" },
];

const W = 800;
const H = 1000;
const QUALITY = 82;

function kb(n) {
  return (n / 1024).toFixed(1) + "KB";
}

async function main() {
  console.log("=== Toyota Camry LE 2018 → WebP 4:5 ===\n");
  await mkdir(OUT_DIR, { recursive: true });

  let total = 0;
  for (const p of photos) {
    const inPath = join(UPLOAD, p.src);
    const outPath = join(OUT_DIR, `${p.num}.webp`);
    process.stdout.write(`  foto ${p.num}/6 — ${p.label}... `);

    const buf = await readFile(inPath);
    const origKb = kb(buf.length);

    await sharp(buf)
      .resize({
        width: W,
        height: H,
        fit: "cover",
        position: "center",
        withoutEnlargement: true,
      })
      .webp({ quality: QUALITY })
      .toFile(outPath);

    const s = await stat(outPath);
    total += s.size;
    console.log(`${origKb} → ${kb(s.size)} ✓`);
  }
  console.log(`\nTotal: ${kb(total)} (6 fotos WebP 4:5)`);
  console.log(`Carpeta: ${OUT_DIR}`);
}

main().catch((e) => {
  console.error("FATAL:", e);
  process.exit(1);
});
