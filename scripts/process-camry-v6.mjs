/* process-camry-v6.mjs
 * Procesa las 6 fotos subidas del Toyota Camry XSE V6 2024 a WebP 4:5.
 * Orden de la galería (portada = frontal 3/4 con perfil completo):
 *   1.webp = IMG_4745 (frontal 3/4, perfil completo con ambas ruedas) — PORTADA
 *   2.webp = IMG_4742 (frontal directo, de frente, parrilla + faros)
 *   3.webp = IMG_4743 (trasera 3/4)
 *   4.webp = IMG_4744 (interior tablero — landscape, se centrará con cover)
 *   5.webp = IMG_4753 (interior asientos delanteros, cuero negro)
 *   6.webp = IMG_4759 (interior asientos traseros, cuero negro)
 */
import sharp from "sharp";
import { stat, mkdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const UPLOAD = "/home/z/my-project/upload";
const OUT_DIR = join("/home/z/my-project/public/autos/07-toyota-camry-xse-v6");

const photos = [
  { num: 1, src: "IMG_4745.JPG.jpeg", label: "frontal 3/4 perfil completo (PORTADA)" },
  { num: 2, src: "IMG_4742.JPG.jpeg", label: "frontal directo de frente" },
  { num: 3, src: "IMG_4743.JPG.jpeg", label: "trasera 3/4" },
  { num: 4, src: "IMG_4744.JPG.jpeg", label: "interior tablero (landscape)" },
  { num: 5, src: "IMG_4753.JPG.jpeg", label: "interior asientos delanteros" },
  { num: 6, src: "IMG_4759.JPG.jpeg", label: "interior asientos traseros" },
];

const W = 800;
const H = 1000;
const QUALITY = 82;

function kb(n) {
  return (n / 1024).toFixed(1) + "KB";
}

async function main() {
  console.log("=== Toyota Camry XSE V6 2024 → WebP 4:5 ===\n");
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
        withoutEnlargement: meta.width >= W && meta.height >= H,
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
