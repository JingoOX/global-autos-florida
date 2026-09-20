/* process-mini.mjs
 * Procesa las 6 fotos subidas del Mini Cooper S Countryman 2024 a WebP 4:5.
 * Orden de la galería (portada = frontal alta resolución):
 *   1.webp = IMG_7727.PNG (frontal 3/4, alta resolución 1290×1821) — PORTADA
 *   2.webp = IMG_9861.JPG.jpeg (frontal 3/4, perfil completo)
 *   3.webp = IMG_9864.JPG.jpeg (frontal 3/4, lado pasajero)
 *   4.webp = IMG_9863.JPG.jpeg (trasera 3/4)
 *   5.webp = IMG_9875.JPG.jpeg (interior tablero)
 *   6.webp = IMG_9878.JPG.jpeg (interior asientos)
 *
 * Nota: las fotos 2-6 son 768×1024, menor que el objetivo 800×1000.
 * Se permite un ligero upscale (4%) — imperceptible en WebP calidad 82.
 */
import sharp from "sharp";
import { stat, mkdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const UPLOAD = "/home/z/my-project/upload";
const OUT_DIR = join("/home/z/my-project/public/autos/06-mini-cooper-s-countryman");

const photos = [
  { num: 1, src: "IMG_7727.PNG", label: "frontal 3/4 alta res (PORTADA)" },
  { num: 2, src: "IMG_9861.JPG.jpeg", label: "frontal 3/4 perfil completo" },
  { num: 3, src: "IMG_9864.JPG.jpeg", label: "frontal 3/4 lado pasajero" },
  { num: 4, src: "IMG_9863.JPG.jpeg", label: "trasera 3/4" },
  { num: 5, src: "IMG_9875.JPG.jpeg", label: "interior tablero" },
  { num: 6, src: "IMG_9878.JPG.jpeg", label: "interior asientos" },
];

const W = 800;
const H = 1000;
const QUALITY = 82;

function kb(n) {
  return (n / 1024).toFixed(1) + "KB";
}

async function main() {
  console.log("=== Mini Cooper S Countryman 2024 → WebP 4:5 ===\n");
  await mkdir(OUT_DIR, { recursive: true });

  let total = 0;
  for (const p of photos) {
    const inPath = join(UPLOAD, p.src);
    const outPath = join(OUT_DIR, `${p.num}.webp`);
    process.stdout.write(`  foto ${p.num}/6 — ${p.label}... `);

    const buf = await readFile(inPath);
    const origKb = kb(buf.length);
    const meta = await sharp(buf).metadata();
    const origSize = `${meta.width}x${meta.height}`;

    await sharp(buf)
      .resize({
        width: W,
        height: H,
        fit: "cover",
        position: "center",
        // Sin withoutEnlargement: las fotos de 768×1024 necesitan un ligero
        // upscale a 800×1000 (4%) — imperceptible en WebP.
      })
      .webp({ quality: QUALITY })
      .toFile(outPath);

    const s = await stat(outPath);
    total += s.size;
    console.log(`${origSize} ${origKb} → ${kb(s.size)} ✓`);
  }
  console.log(`\nTotal: ${kb(total)} (6 fotos WebP 4:5)`);
  console.log(`Carpeta: ${OUT_DIR}`);
}

main().catch((e) => {
  console.error("FATAL:", e);
  process.exit(1);
});
