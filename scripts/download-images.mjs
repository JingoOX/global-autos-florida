/* download-images.mjs
 * Descarga las imágenes remotas (hero + fotos de inventario) y las convierte
 * a WebP optimizado con sharp, guardándolas en public/ para servirsame-origin.
 *
 * Ejecutar: node scripts/download-images.mjs
 */
import sharp from "sharp";
import { mkdir, writeFile, stat } from "node:fs/promises";
import { dirname, join } from "node:path";

const PUBLIC = join(process.cwd(), "public");

// Manifiesto de imágenes extraído de script.js (CARS[].photos) + body.html (hero data-fb)
const manifest = {
  hero: {
    // data-fb chain: hero-car.png | url1 | url2  (probamos en orden)
    urls: [
      "https://z-cdn-media.chatglm.cn/files/1699507c-a544-47ca-af41-9bafe9cb145e.PNG?auth_key=1889873116-c161a264bcb1442992779dcb47298a24-0-c00b5733ce687aa0bef8b26fb62423f4",
      "https://z-cdn-media.chatglm.cn/files/4446b21f-0603-489c-9fab-68e1fd0e35cf.png?auth_key=1889873116-c161a557bfffb46a99821efac64c08e0b-0-bd2034a74e7198c139b97c6572374ff7",
    ],
    out: "hero-car.webp",
    // El hero es un cutout (mix-blend-mode:screen + mask). Mantener aspect ratio,
    // ancho 1280 (2x del display 640px). Sin recorte.
    width: 1280,
    quality: 82,
  },
  honda: {
    folder: "autos/01-honda-civic-sport",
    photos: [
      "https://z-cdn-media.chatglm.cn/files/9dcba0c0-ba6a-49e0-aa32-29b590155560.jpg?auth_key=1889873116-4ab48121c0bf424aa8406604a13b637c-0-d4c78f8108f8daceba4456cb500500ba",
      "https://z-cdn-media.chatglm.cn/files/28e0004d-b530-4ea7-98f4-e9f16af6fd6e.jpg?auth_key=1889873116-11e3fd8074074c40820d95b0c7ab4316-0-898b99462477098fccae2d4594090e33",
      "https://z-cdn-media.chatglm.cn/files/a976086e-e6bf-442f-8a04-057dc74fabd7.jpg?auth_key=1889873116-0cf6c08de0c743eda198a97779fa6e66-0-c9b7ba36430ad016ef8f34ccac789f20",
      "https://z-cdn-media.chatglm.cn/files/2d709c9a-6399-4a34-a391-60f634679a0a.jpg?auth_key=1889873116-b1b545028fa2450fb67bbe6a0aeac3dd-0-07741270793917f05ad127c09ea91de2",
      "https://z-cdn-media.chatglm.cn/files/236876a8-6479-4da3-8ebb-b4f26d23589a.jpg?auth_key=1889873116-b156d04e005b49caabd4258c16039238-0-321c7c378f933b0c518e184e96745ec5",
      "https://z-cdn-media.chatglm.cn/files/8097d2d3-f2f9-49dc-aded-d6e58f657382.jpg?auth_key=1889873116-93bc8db983ee48e98544c6f3f36696dd-0-eb99f22b3a0b887300341bfbeaf1123c",
      "https://z-cdn-media.chatglm.cn/files/eacb672f-cfc6-42b4-94e0-3afd2538e91d.jpg?auth_key=1889873116-b8868148ae664f258862136a2cabbbdf-0-9dc9b4d7185b710e5479b1399a6eb4d0",
      "https://z-cdn-media.chatglm.cn/files/22d1ac49-5ed4-446c-913a-9bc70ad14ac4.jpg?auth_key=1889873116-1f28af2a8dbe4a688b3bb466ae984e58-0-0bcc03b2148e262ed1a504f8313ed81a",
    ],
  },
  toyota: {
    folder: "autos/02-toyota-corolla-nightshade",
    photos: [
      "https://z-cdn-media.chatglm.cn/files/f78fc0d2-10bb-4c78-b6bf-32d6ba79a542.jpg?auth_key=1889873116-83b611dea9334fb19755fb8b4ba3ea0f-0-be92c00055acf9cdfcd3e16f84590ee7",
      "https://z-cdn-media.chatglm.cn/files/c3649309-0097-49e6-be4c-d55732b69426.jpg?auth_key=1889873116-62379ecc83484d4c969c53e193f49fbe-0-c9c21bf9a9e32050f9f7999a5a48697e",
      "https://z-cdn-media.chatglm.cn/files/4b7adec0-8e78-417a-b723-e99224c46eef.jpg?auth_key=1889873116-95d24f8daec64cce9fd8acc034fd21ce-0-0c53f7ecd028d8c59dd2fd97f41bb2f8",
      "https://z-cdn-media.chatglm.cn/files/6832dd11-367c-4101-b37f-2adc34d00541.jpg?auth_key=1889873116-38e1c1ff4b2248619f6c9e8b6409f169-0-2c2fef53d5203193cbdb5848f59dd19c",
      "https://z-cdn-media.chatglm.cn/files/130b16d6-cc98-4f64-b2fd-a7c3ad48df84.jpg?auth_key=1889873116-d426c32be92d4b13b91410f4d9f186bb-0-eb48891793a8d5fdaeaca7a4b9a761c8",
      "https://z-cdn-media.chatglm.cn/files/d80c2d9b-4b9a-4f53-a790-5c82e98dd94e.jpg?auth_key=1889873116-27a0a57c131f4c0a9b4d91bdf565c6cd-0-04110bd8bea77b9b826f06990709fc1a",
    ],
  },
};

// Dimensiones para fotos de inventario: el showroom usa aspect-ratio 4/5 con
// object-fit:cover. Display ~438px en cards, pero el modal muestra más grande.
// 800×1000 (2x retina) con cover es el punto dulce calidad/peso.
const PHOTO_W = 800;
const PHOTO_H = 1000;
const PHOTO_QUALITY = 80;

async function download(urls) {
  let lastErr;
  for (const url of urls) {
    try {
      const res = await fetch(url, { redirect: "follow" });
      if (!res.ok) {
        lastErr = new Error(`HTTP ${res.status}`);
        continue;
      }
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 1000) {
        lastErr = new Error("response too small");
        continue;
      }
      return buf;
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr || new Error("all download attempts failed");
}

function kb(n) {
  return (n / 1024).toFixed(1) + "KB";
}

async function processHero() {
  const h = manifest.hero;
  console.log(`\n[Hero] descargando (${h.urls.length} URLs de respaldo)...`);
  const buf = await download(h.urls);
  console.log(`  descargado: ${kb(buf.length)}`);
  const out = join(PUBLIC, h.out);
  await mkdir(dirname(out), { recursive: true });
  await sharp(buf)
    .resize({ width: h.width, withoutEnlargement: true })
    .webp({ quality: h.quality })
    .toFile(out);
  const s = await stat(out);
  console.log(`  OK ${h.out} — ${kb(s.size)}`);
  return s.size;
}

async function processCar(key, car) {
  console.log(`\n[${key}] ${car.photos.length} fotos -> public/${car.folder}/`);
  const dir = join(PUBLIC, car.folder);
  await mkdir(dir, { recursive: true });
  let total = 0;
  for (let i = 0; i < car.photos.length; i++) {
    const url = car.photos[i];
    const num = i + 1;
    const outPath = join(dir, `${num}.webp`);
    process.stdout.write(`  foto ${num}/${car.photos.length}... `);
    const buf = await download([url]);
    const origKb = kb(buf.length);
    await sharp(buf)
      .resize({
        width: PHOTO_W,
        height: PHOTO_H,
        fit: "cover",
        // sharp no acepta posiciones en %; "center" equivale a 50% 50%,
        // muy cercano al object-position:50% 55% del CSS.
        position: "center",
        withoutEnlargement: true,
      })
      .webp({ quality: PHOTO_QUALITY })
      .toFile(outPath);
    const s = await stat(outPath);
    total += s.size;
    console.log(`${origKb} -> ${kb(s.size)} OK`);
  }
  console.log(`  total ${key}: ${kb(total)}`);
  return total;
}

async function main() {
  console.log("=== Optimizacion de imagenes -> WebP local ===");
  console.log(`Publico: ${PUBLIC}`);
  const t0 = Date.now();

  const heroSize = await processHero();
  const hondaSize = await processCar("Honda Civic", manifest.honda);
  const toyotaSize = await processCar("Toyota Corolla", manifest.toyota);

  const total = heroSize + hondaSize + toyotaSize;
  console.log(`\n=== DONE en ${((Date.now() - t0) / 1000).toFixed(1)}s ===`);
  console.log(`Total optimizado: ${kb(total)} (16 imagenes WebP)`);
  console.log("\nArchivos creados:");
  console.log("  public/hero-car.webp");
  console.log("  public/autos/01-honda-civic-sport/1..8.webp");
  console.log("  public/autos/02-toyota-corolla-nightshade/1..6.webp");
}

main().catch((e) => {
  console.error("FATAL:", e);
  process.exit(1);
});
