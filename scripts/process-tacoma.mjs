/* process-tacoma.mjs
 * Procesa las 5 fotos subidas del Toyota Tacoma SR5 2022 a WebP 4:5.
 * Orden de la galería (portada = frontal 3/4 con perfil completo):
 *   1.webp = IMG_9889 (frontal 3/4, perfil + ruedas + cama visible) — PORTADA
 *   2.webp = IMG_9880 (frontal directo, de frente, parrilla + faros)
 *   3.webp = IMG_9893 (trasera 3/4)
 *   4.webp = IMG_9888 (interior asientos)
 *   5.webp = IMG_9890 (interior asientos vista más amplia)
 *
 * Todas las fotos son 768×1024, menores que el objetivo 800×1000.
 * Se permite upscale (4%) — imperceptible en WebP.
 */
import sharp from "sharp";
import { stat, mkdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const UPLOAD = "/home/z/my-project/upload";
const OUT_DIR = join("/home/z/my-project/public/autos/08-toyota-tacoma-sr5");

const photos = [
  { num: 1, src: "IMG_9889.JPG.jpeg", label: "frontal 3/4 perfil + cama (PORTADA)" },
  { num: 2, src: "IMG_9880.JPG.jpeg", label: "frontal directo de frente" },
  { num: 3, src: "IMG_9893.JPG.jpeg", label: "trasera 3/4" },
  { num: 4, src: "IMG_9888.JPG.jpeg", label: "interior asientos" },
  { num: 5, src: "IMG_9890.JPG.jpeg", label: "interior asientos vista amplia" },
];

const W = 800;
const H = 1000;
const QUALITY = 82;

function kb(n) {
  return (n / 1024).toFixed(1) + "KB";
}

async function main() {
  console.log("=== Toyota Tacoma SR5 2022 → WebP 4:5 ===\n");
  await mkdir(OUT_DIR, { recursive: true });

  let total = 0;
  for (const p of photos) {
    const inPath = join(UPLOAD, p.src);
    const outPath = join(OUT_DIR, `${p.num}.webp`);
    process.stdout.write(`  foto ${p.num}/5 — ${p.label}... `);

    const buf = await readFile(inPath);
    const meta = await sharp(buf).metadata();
    const origSize = `${meta.width}x${meta.height}`;
    const origKb = kb(buf.length);

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
  console.log(`\nTotal: ${kb(total)} (5 fotos WebP 4:5)`);
  console.log(`Carpeta: ${OUT_DIR}`);
}

main().catch((e) => {
  console.error("FATAL:", e);
  process.exit(1);
});
