/* process-camry.mjs
 * Procesa las 4 fotos subidas del Toyota Camry XSE 2020 a WebP 4:5.
 * Orden de la galería (la foto FRONTAL siempre es la portada = foto 1):
 *   1.webp = IMG_9601 (frontal 3/4) — PORTADA
 *   2.webp = IMG_9603 (trasera 3/4)
 *   3.webp = IMG_9600 (interior — asientos traseros + techo panorámico)
 *   4.webp = IMG_9607 (interior — tablero/pantalla + techo panorámico)
 */
import sharp from "sharp";
import { stat } from "node:fs/promises";
import { join } from "node:path";

const UPLOAD = "/home/z/my-project/upload";
const OUT_DIR = join("/home/z/my-project/public/autos/03-toyota-camry-xse");

// Mapeo: número de foto → archivo fuente
const photos = [
  { num: 1, src: "IMG_9601.jpg", label: "frontal 3/4 (PORTADA)" },
  { num: 2, src: "IMG_9603.jpg", label: "trasera 3/4" },
  { num: 3, src: "IMG_9600.jpg", label: "interior trasero + techo" },
  { num: 4, src: "IMG_9607.jpg", label: "interior tablero + techo" },
];

// 4:5 estricto — coincide con el aspect-ratio del CSS (.showroom img { aspect-ratio:4/5 })
// 800×1000 = 2x retina para el display de 438px + galería modal
const W = 800;
const H = 1000;
const QUALITY = 82;

function kb(n) {
  return (n / 1024).toFixed(1) + "KB";
}

async function main() {
  console.log("=== Toyota Camry XSE 2020 → WebP 4:5 ===\n");
  const { mkdir } = await import("node:fs/promises");
  await mkdir(OUT_DIR, { recursive: true });

  let total = 0;
  for (const p of photos) {
    const inPath = join(UPLOAD, p.src);
    const outPath = join(OUT_DIR, `${p.num}.webp`);
    process.stdout.write(`  foto ${p.num}/4 — ${p.label}... `);

    const buf = await import("node:fs/promises").then((m) => m.readFile(inPath));
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
  console.log(`\nTotal: ${kb(total)} (4 fotos WebP 4:5)`);
  console.log(`Carpeta: ${OUT_DIR}`);
}

main().catch((e) => {
  console.error("FATAL:", e);
  process.exit(1);
});
