/* process-malibu.mjs
 * Procesa las 5 fotos subidas del Chevrolet Malibu LT 2019 a WebP 4:5.
 * Orden de la galería (portada = frontal):
 *   1.webp = IMG_9208 (frontal 3/4 — mejor perfil completo) — PORTADA
 *   2.webp = IMG_9209 (frontal 3/4 alternativa)
 *   3.webp = IMG_9212 (trasera 3/4)
 *   4.webp = IMG_9215 (interior — asientos + tablero)
 *   5.webp = IMG_9217 (interior — tablero/pantalla)
 */
import sharp from "sharp";
import { stat, mkdir } from "node:fs/promises";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const UPLOAD = "/home/z/my-project/upload";
const OUT_DIR = join("/home/z/my-project/public/autos/04-chevrolet-malibu-lt");

const photos = [
  { num: 1, src: "IMG_9208.jpg", label: "frontal 3/4 (PORTADA)" },
  { num: 2, src: "IMG_9209.jpg", label: "frontal 3/4 alt." },
  { num: 3, src: "IMG_9212.jpg", label: "trasera 3/4" },
  { num: 4, src: "IMG_9215.jpg", label: "interior asientos+tablero" },
  { num: 5, src: "IMG_9217.jpg", label: "interior tablero/pantalla" },
];

const W = 800;
const H = 1000;
const QUALITY = 82;

function kb(n) {
  return (n / 1024).toFixed(1) + "KB";
}

async function main() {
  console.log("=== Chevrolet Malibu LT 2019 → WebP 4:5 ===\n");
  await mkdir(OUT_DIR, { recursive: true });

  let total = 0;
  for (const p of photos) {
    const inPath = join(UPLOAD, p.src);
    const outPath = join(OUT_DIR, `${p.num}.webp`);
    process.stdout.write(`  foto ${p.num}/5 — ${p.label}... `);

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
  console.log(`\nTotal: ${kb(total)} (5 fotos WebP 4:5)`);
  console.log(`Carpeta: ${OUT_DIR}`);
}

main().catch((e) => {
  console.error("FATAL:", e);
  process.exit(1);
});
