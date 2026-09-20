/* process-crv.mjs
 * Procesa las 6 fotos subidas del Honda CR-V Touring 2018 a WebP 4:5.
 * Orden de la galería (portada = frontal 3/4 con perfil completo):
 *   1.webp = IMG_9899 (frontal 3/4, ambas ruedas lado conductor) — PORTADA
 *   2.webp = IMG_9898 (frontal 3/4, vista alternativa)
 *   3.webp = IMG_9902 (trasera 3/4)
 *   4.webp = IMG_9907 (interior asientos beige)
 *   5.webp = IMG_9909 (interior asientos cuero gris)
 *   6.webp = IMG_9911 (interior tablero beige)
 */
import sharp from "sharp";
import { stat, mkdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const UPLOAD = "/home/z/my-project/upload";
const OUT_DIR = join("/home/z/my-project/public/autos/09-honda-crv-touring");

const photos = [
  { num: 1, src: "IMG_9899.JPG.jpeg", label: "frontal 3/4 perfil completo (PORTADA)" },
  { num: 2, src: "IMG_9898.JPG.jpeg", label: "frontal 3/4 vista alternativa" },
  { num: 3, src: "IMG_9902.JPG.jpeg", label: "trasera 3/4" },
  { num: 4, src: "IMG_9907.JPG.jpeg", label: "interior asientos beige" },
  { num: 5, src: "IMG_9909.JPG.jpeg", label: "interior asientos cuero gris" },
  { num: 6, src: "IMG_9911.JPG.jpeg", label: "interior tablero beige" },
];

const W = 800;
const H = 1000;
const QUALITY = 82;

function kb(n) {
  return (n / 1024).toFixed(1) + "KB";
}

async function main() {
  console.log("=== Honda CR-V Touring 2018 → WebP 4:5 ===\n");
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
      .resize({
        width: W,
        height: H,
        fit: "cover",
        position: "center",
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
