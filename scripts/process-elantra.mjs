/* process-elantra.mjs
 * Procesa las 6 fotos subidas del Hyundai Elantra SEL Sport 2025 a WebP 4:5.
 * Orden de la galería (portada = frontal 3/4 con perfil completo):
 *   1.webp = IMG_9922 (frontal 3/4, perfil + ruedas) — PORTADA
 *   2.webp = IMG_9923 (frontal directo, de frente)
 *   3.webp = IMG_9925 (trasera 3/4)
 *   4.webp = IMG_9932 (interior asientos)
 *   5.webp = IMG_9933 (interior tablero)
 *   6.webp = IMG_9938 (interior tablero + clúster digital)
 */
import sharp from "sharp";
import { stat, mkdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const UPLOAD = "/home/z/my-project/upload";
const OUT_DIR = join("/home/z/my-project/public/autos/10-hyundai-elantra-sel-sport");

const photos = [
  { num: 1, src: "IMG_9922.JPG.jpeg", label: "frontal 3/4 perfil completo (PORTADA)" },
  { num: 2, src: "IMG_9923.JPG.jpeg", label: "frontal directo de frente" },
  { num: 3, src: "IMG_9925.JPG.jpeg", label: "trasera 3/4" },
  { num: 4, src: "IMG_9932.JPG.jpeg", label: "interior asientos" },
  { num: 5, src: "IMG_9933.JPG.jpeg", label: "interior tablero" },
  { num: 6, src: "IMG_9938.JPG.jpeg", label: "interior tablero + clúster" },
];

const W = 800;
const H = 1000;
const QUALITY = 82;

function kb(n) {
  return (n / 1024).toFixed(1) + "KB";
}

async function main() {
  console.log("=== Hyundai Elantra SEL Sport 2025 → WebP 4:5 ===\n");
  await mkdir(OUT_DIR, { recursive: true });

  let total = 0;
  for (const p of photos) {
    const inPath = join(UPLOAD, p.src);
    const outPath = join(OUT_DIR, `${p.num}.webp`);
    process.stdout.write(`  foto ${p.num}/6 — ${p.label}... `);

    const buf = await readFile(inPath);
    const meta = await sharp(buf).metadata();
    const origSize = `${meta.width}x${meta.height}`;
    const origKb = kb(buf.length);

    await sharp(buf)
      .resize({ width: W, height: H, fit: "cover", position: "center" })
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
