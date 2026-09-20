/* ============ IMAGE FALLBACK CHAIN ============
   Each photo tries the LOCAL file first (autos/xx/1.webp).
   If it fails, it falls back to the temporary chat URL (JPG).
   When you convert your JPGs to WebP with those names, the site uses them only. */
function imgFB(el){
  const chain = (el.dataset.fb || '').split('|');
  const next = chain.shift();
  if(next){ el.dataset.fb = chain.join('|'); el.src = next.trim(); }
}

/* ================= DATA ================= */
const WA = '17863108889';
const waLink = m => `https://wa.me/${WA}?text=${encodeURIComponent(m)}`;
const fmt = n => n.toLocaleString('en-US');

/* ================= LANGUAGE / THEME STATE ================= */
let lang = localStorage.getItem('lang') || 'en';
if(lang !== 'en' && lang !== 'es') lang = 'en';

/* ================= INVENTORY (BILINGUAL) =================
   Each car carries a `t` object with `en` and `es` sub-objects holding every
   user-facing string. The T(c, field) helper returns the current language value. */
const CARS = [
  {id:1, folder:'01-honda-civic-sport',
   year:2024, make:'Honda', model:'Civic Sport Hatchback', type:'sedan',
   price:22500, miles:32000, featured:true,
   photos:[
     'https://z-cdn-media.chatglm.cn/files/9dcba0c0-ba6a-49e0-aa32-29b590155560.jpg?auth_key=1889873116-4ab48121c0bf424aa8406604a13b637c-0-d4c78f8108f8daceba4456cb500500ba',
     'https://z-cdn-media.chatglm.cn/files/28e0004d-b530-4ea7-98f4-e9f16af6fd6e.jpg?auth_key=1889873116-11e3fd8074074c40820d95b0c7ab4316-0-898b99462477098fccae2d4594090e33',
     'https://z-cdn-media.chatglm.cn/files/a976086e-e6bf-442f-8a04-057dc74fabd7.jpg?auth_key=1889873116-0cf6c08de0c743eda198a97779fa6e66-0-c9b7ba36430ad016ef8f34ccac789f20',
     'https://z-cdn-media.chatglm.cn/files/2d709c9a-6399-4a34-a391-60f634679a0a.jpg?auth_key=1889873116-b1b545028fa2450fb67bbe6a0aeac3dd-0-07741270793917f05ad127c09ea91de2',
     'https://z-cdn-media.chatglm.cn/files/236876a8-6479-4da3-8ebb-b4f26d23589a.jpg?auth_key=1889873116-b156d04e005b49caabd4258c16039238-0-321c7c378f933b0c518e184e96745ec5',
     'https://z-cdn-media.chatglm.cn/files/8097d2d3-f2f9-49dc-aded-d6e58f657382.jpg?auth_key=1889873116-93bc8db983ee48e98544c6f3f36696dd-0-eb99f22b3a0b887300341bfbeaf1123c',
     'https://z-cdn-media.chatglm.cn/files/eacb672f-cfc6-42b4-94e0-3afd2538e91d.jpg?auth_key=1889873116-b8868148ae664f258862136a2cabbbdf-0-9dc9b4d7185b710e5479b1399a6eb4d0',
     'https://z-cdn-media.chatglm.cn/files/22d1ac49-5ed4-446c-913a-9bc70ad14ac4.jpg?auth_key=1889873116-1f28af2a8dbe4a688b3bb466ae984e58-0-0bcc03b2148e262ed1a504f8313ed81a'
   ],
   t:{
     en:{trans:'CVT', fuel:'Gasoline · 33 MPG', drive:'Front (FWD)',
         engine:'2.0L I4 · 158 HP', ext:'Meteorite Gray Metallic',
         cond:'Pre-owned', badge:'NEW ARRIVAL',
         desc:"America's most recommended compact, in its most practical form: the Sport hatchback. 2.0L naturally aspirated 158 HP engine — Honda's legendary inline-four, built to clear 200k miles without asking permission. Honda Sensing standard, 33 MPG combined, only 32k miles: practically a new car at a pre-owned price.",
         feats:['Honda Sensing','CarPlay / Android Auto','Adaptive cruise','Paddle shifters','Remote start','Sport mode']},
     es:{trans:'CVT', fuel:'Gasolina · 33 MPG', drive:'Delantera (FWD)',
         engine:'2.0L I4 · 158 HP', ext:'Gris Meteorito Metálico',
         cond:'Seminuevo', badge:'NUEVO INGRESO',
         desc:'El compacto más recomendado de Estados Unidos, en su versión más práctica: hatchback Sport. Motor 2.0L atmosférico de 158 HP — el cuatro en línea legendario de Honda, hecho para pasar de las 200 mil millas sin pedir permiso. Con Honda Sensing de serie, 33 MPG combinados y 32 mil millas apenas: prácticamente un auto nuevo a precio de seminuevo.',
         feats:['Honda Sensing','CarPlay / Android Auto','Crucero adaptativo','Paletas al volante','Arranque remoto','Modo Sport']}
   }},

  {id:2, folder:'02-toyota-corolla-nightshade',
   year:2020, make:'Toyota', model:'Corolla SE Nightshade', type:'sedan',
   price:16500, miles:81655, featured:true,
   photos:[
     'https://z-cdn-media.chatglm.cn/files/f78fc0d2-10bb-4c78-b6bf-32d6ba79a542.jpg?auth_key=1889873116-83b611dea9334fb19755fb8b4ba3ea0f-0-be92c00055acf9cdfcd3e16f84590ee7',
     'https://z-cdn-media.chatglm.cn/files/c3649309-0097-49e6-be4c-d55732b69426.jpg?auth_key=1889873116-62379ecc83484d4c969c53e193f49fbe-0-c9c21bf9a9e32050f9f7999a5a48697e',
     'https://z-cdn-media.chatglm.cn/files/4b7adec0-8e78-417a-b723-e99224c46eef.jpg?auth_key=1889873116-95d24f8daec64cce9fd8acc034fd21ce-0-0c53f7ecd028d8c59dd2fd97f41bb2f8',
     'https://z-cdn-media.chatglm.cn/files/6832dd11-367c-4101-b37f-2adc34d00541.jpg?auth_key=1889873116-38e1c1ff4b2248619f6c9e8b6409f169-0-2c2fef53d5203193cbdb5848f59dd19c',
     'https://z-cdn-media.chatglm.cn/files/130b16d6-cc98-4f64-b2fd-a7c3ad48df84.jpg?auth_key=1889873116-d426c32be92d4b13b91410f4d9f186bb-0-eb48891793a8d5fdaeaca7a4b9a761c8'
   ],
   t:{
     en:{trans:'CVT', fuel:'Gasoline · 34 MPG', drive:'Front (FWD)',
         engine:'2.0L I4 · 169 HP', ext:'White',
         cond:'Pre-owned', badge:'NIGHTSHADE',
         desc:'The edition Corolla collectors chase: factory Nightshade package with 18" gloss black wheels, spoiler, mirrors, handles and smoked emblems — the "white on black" look, untouched. 169 HP 2.0L engine, full Toyota Safety Sense 2.0, 34 MPG. 81k miles on a Corolla is barely the warmup — this engine is built to triple that.',
         feats:['Nightshade edition · black accents','18" gloss black wheels','Toyota Safety Sense 2.0','CarPlay / Amazon Alexa','Adaptive cruise','Dual exhaust']},
     es:{trans:'CVT', fuel:'Gasolina · 34 MPG', drive:'Delantera (FWD)',
         engine:'2.0L I4 · 169 HP', ext:'Blanco',
         cond:'Seminuevo', badge:'NIGHTSHADE',
         desc:'La edición que los coleccionistas del Corolla buscan: paquete Nightshade de fábrica con rines 18" negro brillante, spoiler, retrovisores, manijas y emblemas ahumados — el look "blanco sobre negro" sin tocarle nada. Motor 2.0L de 169 HP, Toyota Safety Sense 2.0 completo y 34 MPG. 81 mil millas en un Corolla son apenas el calentamiento: este motor está hecho para triplicarlas.',
         feats:['Edición Nightshade · acentos negro','Rines 18" negro brillante','Toyota Safety Sense 2.0','CarPlay / Amazon Alexa','Crucero adaptativo','Doble escape']}
   }},

  {id:3, folder:'03-toyota-camry-xse',
   year:2020, make:'Toyota', model:'Camry XSE', type:'sedan',
   price:20500, miles:64500, featured:true,
   photos:[], numPhotos:4,
   t:{
     en:{trans:'8-speed automatic', fuel:'Gasoline · 32 MPG', drive:'Front (FWD)',
         engine:'2.5L I4 · 206 HP', ext:'Celestial Silver Metallic',
         cond:'Pre-owned', badge:'NEW ARRIVAL',
         desc:"The Camry at its sportiest: the XSE. 206 HP 2.5L Dynamic Force engine with 8-speed automatic — the combination that made the Camry America's best-selling sedan. Celestial Silver Metallic over black leather, panoramic roof, JBL, head-up display and full Toyota Safety Sense 2.0+. Only 64k miles: this engine is built to clear 200k without breaking a sweat.",
         feats:['Panoramic roof','Heated leather seats','JBL Premium Audio','Head-up display','Toyota Safety Sense 2.0+','CarPlay / Android Auto']},
     es:{trans:'Automática 8 velocidades', fuel:'Gasolina · 32 MPG', drive:'Delantera (FWD)',
         engine:'2.5L I4 · 206 HP', ext:'Celestial Silver Metallic',
         cond:'Seminuevo', badge:'NUEVO INGRESO',
         desc:'El Camry en su versión más deportiva: el XSE. Motor 2.5L Dynamic Force de 206 HP con transmisión automática de 8 velocidades — la combinación que convirtió al Camry en el sedán más vendido de América. Celestial Silver Metallic sobre cuero negro, techo panorámico, JBL, head-up display y Toyota Safety Sense 2.0+ completo. 64 mil millas apenas: este motor está hecho para pasar de las 200 mil sin sudar.',
         feats:['Techo panorámico','Asientos de cuero calefactados','JBL Premium Audio','Head-up display','Toyota Safety Sense 2.0+','CarPlay / Android Auto']}
   }},

  {id:4, folder:'04-chevrolet-malibu-lt',
   year:2019, make:'Chevrolet', model:'Malibu LT', type:'sedan',
   price:8500, miles:90000, featured:false,
   photos:[], numPhotos:5,
   t:{
     en:{trans:'CVT', fuel:'Gasoline · 33 MPG', drive:'Front (FWD)',
         engine:'1.5L Turbo I4 · 160 HP', ext:'Mosaic Black Metallic',
         cond:'Pre-owned', badge:'NEW ARRIVAL',
         desc:'The Malibu LT with the 160 HP 1.5L Turbo and 184 lb-ft of torque — the combo that returns 33 MPG combined without giving up highway punch. Mosaic Black Metallic over gray interior, Chevrolet Infotainment 3 with 8" screen, push-button start and 6 speakers. 90k miles on a 1.5L Turbo is just the beginning: this block is built to clear 200k with proper maintenance. Honest price for a mid-size sedan that still has plenty to give.',
         feats:['Chevrolet Infotainment 3 · 8"','Push-button start','Bluetooth · 6 speakers','Rear Seat Reminder','Backup camera','CarPlay / Android Auto']},
     es:{trans:'CVT', fuel:'Gasolina · 33 MPG', drive:'Delantera (FWD)',
         engine:'1.5L Turbo I4 · 160 HP', ext:'Mosaic Black Metallic',
         cond:'Seminuevo', badge:'NUEVO INGRESO',
         desc:'El Malibu LT con el motor 1.5L Turbo de 160 HP y 184 lb-ft de torque — la combinación que entrega 33 MPG combinado sin sacrificar el empuje en autopista. Mosaic Black Metallic sobre interior gris, Chevrolet Infotainment 3 con pantalla de 8", push-button start y 6 parlantes. 90 mil millas en un 1.5L Turbo son apenas el comienzo: este bloque está hecho para pasar de las 200 mil con el mantenimiento al día. Precio honesto para un sedán mediano que aún tiene mucho que dar.',
         feats:['Chevrolet Infotainment 3 · 8"','Push-button start','Bluetooth · 6 parlantes','Rear Seat Reminder','Cámara de retroceso','CarPlay / Android Auto']}
   }},

  {id:5, folder:'05-toyota-camry-le',
   year:2018, make:'Toyota', model:'Camry LE', type:'sedan',
   price:15500, miles:88500, featured:false,
   photos:[], numPhotos:6,
   t:{
     en:{trans:'8-speed automatic', fuel:'Gasoline · 32 MPG', drive:'Front (FWD)',
         engine:'2.5L I4 · 203 HP', ext:'Blizzard Pearl (White)',
         cond:'Pre-owned', badge:'NEW ARRIVAL',
         desc:"The Camry at its most accessible: the LE. 203 HP 2.5L Dynamic Force engine with 8-speed automatic — the same powerplant as the XSE at entry-level price. Blizzard Pearl over beige interior, Toyota Safety Sense P standard (automatic emergency braking, adaptive cruise, lane alert) and 39 MPG highway. 88k miles on a 2.5L Toyota is just the warmup: this block is built to clear 300k. The sedan that doesn't quit, at a price that qualifies.",
         feats:['Toyota Safety Sense P','Automatic emergency braking','Adaptive cruise','Bi-LED headlights','CarPlay / Android Auto','Backup camera']},
     es:{trans:'Automática 8 velocidades', fuel:'Gasolina · 32 MPG', drive:'Delantera (FWD)',
         engine:'2.5L I4 · 203 HP', ext:'Blizzard Pearl (Blanco)',
         cond:'Seminuevo', badge:'NUEVO INGRESO',
         desc:'El Camry en su versión más accesible: el LE. Motor 2.5L Dynamic Force de 203 HP con transmisión automática de 8 velocidades — la misma planta motriz del XSE pero a precio de entrada. Blizzard Pearl sobre interior beige, Toyota Safety Sense P de serie (frenado automático, crucero adaptativo, alerta de carril) y 39 MPG en autopista. 88 mil millas en un 2.5L Toyota son apenas el calentamiento: este bloque está hecho para pasar de las 300 mil. El sedán que no falla, al precio que sí califica.',
         feats:['Toyota Safety Sense P','Frenado automático de emergencia','Crucero adaptativo','Bi-LED headlights','CarPlay / Android Auto','Cámara de retroceso']}
   }},

  {id:6, folder:'06-mini-cooper-s-countryman',
   year:2024, make:'BMW', model:'MINI Cooper S Countryman', type:'suv',
   price:24500, miles:13500, featured:true,
   photos:[], numPhotos:6,
   t:{
     en:{trans:'7-speed DCT', fuel:'Gasoline · 28 MPG', drive:'Front (FWD · 4x2)',
         engine:'2.0L Turbo I4 · 189 HP', ext:'Nanuq White Metallic',
         cond:'Pre-owned', badge:'NEW ARRIVAL',
         desc:'The Countryman S is the MINI that grew up without losing its soul. 189 HP 2.0L Turbo and 207 lb-ft with 7-speed dual-clutch transmission — 0-60 in 7.1 seconds with the kart-like agility that defines the brand. Nanuq White Metallic over black interior, dual-panel panoramic roof, 8.8" central screen with the iconic round MINI design, CarPlay and drive modes. Only 13,500 miles: practically new, with the appeal of a premium compact SUV at a pre-owned price.',
         feats:['Dual panoramic roof','8.8" central screen','CarPlay / Android Auto','7-Speed Dual Clutch','MINI drive modes','Backup camera']},
     es:{trans:'7 velocidades DCT', fuel:'Gasolina · 28 MPG', drive:'Delantera (FWD · 4x2)',
         engine:'2.0L Turbo I4 · 189 HP', ext:'Nanuq White Metallic',
         cond:'Seminuevo', badge:'NUEVO INGRESO',
         desc:'El Countryman S es el MINI que creció sin perder el alma. Motor 2.0L Turbo de 189 HP y 207 lb-ft con transmisión de doble embrague de 7 velocidades — 0-60 en 7.1 segundos con la agilidad kart-like que define a la marca. Nanuq White Metallic sobre interior negro, techo panorámico de doble panel, pantalla central de 8.8" con el icónico diseño redondo MINI, CarPlay y modos de manejo. Solo 13,500 millas: prácticamente nuevo, con el atractivo de un SUV compacto premium a precio de seminuevo.',
         feats:['Techo panorámico doble','Pantalla central 8.8"','CarPlay / Android Auto','7-Speed Dual Clutch','Modos de manejo MINI','Cámara de retroceso']}
   }},

  {id:7, folder:'07-toyota-camry-xse-v6',
   year:2024, make:'Toyota', model:'Camry XSE V6', type:'sedan',
   price:25500, miles:70000, featured:true,
   photos:[], numPhotos:6,
   t:{
     en:{trans:'8-speed automatic', fuel:'Gasoline · 26 MPG', drive:'Front (FWD)',
         engine:'3.5L V6 · 301 HP', ext:'Ruby Flare Pearl (Red)',
         cond:'Pre-owned', badge:'V6 · NEW ARRIVAL',
         desc:'The Camry XSE V6 — the version purists chase. 301 HP 3.5L V6 and 267 lb-ft with 8-speed automatic: 0-60 in 5.8 seconds, the fastest Japanese sedan in its class. Ruby Flare Pearl over black leather, glass panoramic roof, JBL with 9 speakers + subwoofer, 10" head-up display and full Toyota Safety Sense 2.5+. The XSE V6 was discontinued after 2024 — this is the last chance to own a factory Camry V6. 70k miles on a 3.5L Toyota is just the first third of its service life.',
         feats:['3.5L V6 engine · 301 HP','Glass panoramic roof','JBL · 9 speakers + sub','10" head-up display','Toyota Safety Sense 2.5+','19" alloy wheels']},
     es:{trans:'Automática 8 velocidades', fuel:'Gasolina · 26 MPG', drive:'Delantera (FWD)',
         engine:'3.5L V6 · 301 HP', ext:'Ruby Flare Pearl (Rojo)',
         cond:'Seminuevo', badge:'V6 · NUEVO INGRESO',
         desc:'El Camry XSE V6 — la versión que los puristas buscan. Motor 3.5L V6 de 301 HP y 267 lb-ft con transmisión automática de 8 velocidades: 0-60 en 5.8 segundos, el sedán japonés más rápido de su clase. Ruby Flare Pearl sobre cuero negro, techo panorámico de vidrio, JBL con 9 parlantes + subwoofer, head-up display de 10" y Toyota Safety Sense 2.5+ completo. El XSE V6 fue descontinuado después de 2024 — esta es la última oportunidad de tener el Camry V6 de fábrica. 70 mil millas en un 3.5L Toyota son apenas el primer tercio de su vida útil.',
         feats:['Motor 3.5L V6 · 301 HP','Techo panorámico de vidrio','JBL · 9 parlantes + sub','Head-up display 10"','Toyota Safety Sense 2.5+','Rines 19" aleación']}
   }},

  {id:8, folder:'08-toyota-tacoma-sr5',
   year:2022, make:'Toyota', model:'Tacoma SR5 · Bed 5ft', type:'pickup',
   price:26000, miles:47202, featured:true,
   photos:[], numPhotos:5,
   t:{
     en:{trans:'6-speed automatic', fuel:'Gasoline · 20 MPG', drive:'Rear (RWD · 4x2)',
         engine:'2.7L I4 · 159 HP', ext:'Blizzard Pearl (White)',
         cond:'Pre-owned', badge:'NEW ARRIVAL',
         desc:'The Tacoma SR5 is the mid-size pickup that holds its value better than any other in America — and this one is like new. 159 HP 2.7L I4 with 6-speed automatic and rear-wheel drive (4x2), the most efficient combo in the lineup. Blizzard Pearl over gray interior, lined 5-foot bed, Toyota Safety Sense P standard and the legendary Tacoma chassis reliability that holds value year after year. Only 47k miles: this 2.7L is built to clear 300k with proper maintenance. The pickup that works and holds its value.',
         feats:['Lined 5-foot bed','Toyota Safety Sense P','CarPlay / Android Auto','7" touchscreen','Backup camera','16" alloy wheels']},
     es:{trans:'Automática 6 velocidades', fuel:'Gasolina · 20 MPG', drive:'Trasera (RWD · 4x2)',
         engine:'2.7L I4 · 159 HP', ext:'Blizzard Pearl (Blanco)',
         cond:'Seminuevo', badge:'NUEVO INGRESO',
         desc:'La Tacoma SR5 es la pickup mediana que conserva su valor mejor que cualquier otra en América — y esta está como nueva. Motor 2.7L I4 de 159 HP con transmisión automática de 6 velocidades y tracción trasera (4x2), la combinación más eficiente de la línea. Blizzard Pearl sobre interior gris, cama de 5 pies forrada, Toyota Safety Sense P de serie y la legendaria confiabilidad del chasis Tacoma que mantiene su valor año tras año. 47 mil millas apenas: este 2.7L está hecho para pasar de las 300 mil con el mantenimiento al día. La pickup que trabaja y conserva su valor.',
         feats:['Cama 5 pies forrada','Toyota Safety Sense P','CarPlay / Android Auto','Pantalla 7" táctil','Cámara de retroceso','Rines 16" aleación']}
   }},

  {id:9, folder:'09-honda-crv-touring',
   year:2018, make:'Honda', model:'CR-V Touring', type:'suv',
   price:19500, miles:62062, featured:true,
   photos:[], numPhotos:6,
   t:{
     en:{trans:'CVT', fuel:'Gasoline · 30 MPG', drive:'AWD · 4x4',
         engine:'1.5L Turbo I4 · 190 HP', ext:'Basque Red Pearl II (Red)',
         cond:'Pre-owned', badge:'NEW ARRIVAL',
         desc:"The CR-V Touring is America's best-selling compact SUV in its most loaded trim. 190 HP 1.5L Turbo and 179 lb-ft with CVT and AWD with Intelligent Control System — the combo that returns 30 MPG combined without giving up traction in rain or gravel. Basque Red Pearl II over gray leather, full Honda Sensing (automatic braking, adaptive cruise, lane alert), Honda satellite navigation, panoramic roof, heated front seats and power tailgate. Only 62k miles: this 1.5L Turbo is built to clear 200k. The family SUV that has it all.",
         feats:['Full Honda Sensing','AWD · Intelligent Control','Panoramic roof','Honda satellite navigation','Heated leather seats','Power tailgate']},
     es:{trans:'CVT', fuel:'Gasolina · 30 MPG', drive:'AWD · 4x4',
         engine:'1.5L Turbo I4 · 190 HP', ext:'Basque Red Pearl II (Rojo)',
         cond:'Seminuevo', badge:'NUEVO INGRESO',
         desc:'El CR-V Touring es el SUV compacto más vendido de América en su versión más equipada. Motor 1.5L Turbo de 190 HP y 179 lb-ft con CVT y tracción AWD con Intelligent Control System — la combinación que entrega 30 MPG combinado sin sacrificar tracción en lluvia o grava. Basque Red Pearl II sobre cuero gris, Honda Sensing completo (frenado automático, crucero adaptativo, alerta de carril), navegación satelital Honda, techo panorámico, asientos delanteros calefactados y puerta trasera eléctrica. 62 mil millas apenas: este 1.5L Turbo está hecho para pasar de las 200 mil. El SUV familiar que lo tiene todo.',
         feats:['Honda Sensing completo','AWD · Intelligent Control','Techo panorámico','Navegación satelital Honda','Asientos de cuero calefactados','Puerta trasera eléctrica']}
   }},

  {id:10, folder:'10-hyundai-elantra-sel-sport',
   year:2025, make:'Hyundai', model:'Elantra SEL Sport', type:'sedan',
   price:18999, miles:7881, featured:true,
   photos:[], numPhotos:6,
   t:{
     en:{trans:'IVT', fuel:'Gasoline · 34 MPG', drive:'Front (FWD)',
         engine:'2.0L I4 · 147 HP', ext:'Serenity White (White)',
         cond:'Pre-owned', badge:'NEW ARRIVAL',
         desc:"The 2025 Elantra SEL Sport — practically new, with only 7,881 miles. 147 HP 2.0L I4 with IVT transmission, the combo that returns 34 MPG combined (39 highway) with the sporty look of the Sport package: gloss black rear spoiler, 17\" gloss black alloy wheels and leather-wrapped steering wheel + shift knob. Serenity White over black interior, full Hyundai SmartSense (automatic braking with pedestrian detection, adaptive cruise, lane alert) and 8\" touchscreen with CarPlay and Android Auto. The newest sedan on the lot, with all of Hyundai's reliability backing and the styling that makes it look more expensive than it is.",
         feats:['Sport package · gloss black','Gloss black rear spoiler','17" alloy wheels','Full Hyundai SmartSense','CarPlay / Android Auto','Leather-wrapped steering wheel']},
     es:{trans:'IVT', fuel:'Gasolina · 34 MPG', drive:'Delantera (FWD)',
         engine:'2.0L I4 · 147 HP', ext:'Serenity White (Blanco)',
         cond:'Seminuevo', badge:'NUEVO INGRESO',
         desc:'El Elantra SEL Sport 2025 — prácticamente nuevo, con apenas 7,881 millas. Motor 2.0L I4 de 147 HP con transmisión IVT, la combinación que entrega 34 MPG combinado (39 en autopista) con el look deportivo del paquete Sport: spoiler trasero gloss black, rines 17" aleación gloss black y volante + palanca forrados en cuero. Serenity White sobre interior negro, Hyundai SmartSense completo (frenado automático con detección de peatones, crucero adaptativo, alerta de carril) y pantalla táctil de 8" con CarPlay y Android Auto. El sedán más nuevo del lote, con toda la garantía de fiabilidad Hyundai y el estilo que lo hace ver más caro de lo que cuesta.',
         feats:['Paquete Sport · gloss black','Spoiler trasero gloss black','Rines 17" aleación','Hyundai SmartSense completo','CarPlay / Android Auto','Volante forrado en cuero']}
   }}
];

/* Helper: get translated field for the current language */
function T(c, field){ return c.t[lang][field]; }

/* ================= CAR SILHOUETTES (fallback for cars without photos) ================= */
const SIL = {
  sport:{
    body:"M 372 104 C 375 97 371 91 360 89 C 330 85 298 83 266 81 C 253 67 238 57 219 54 C 202 51 185 54 176 58 C 150 68 112 81 76 91 C 63 94 52 95 46 95 C 35 95 29 101 29 109 C 29 115 33 119 41 120 L 66 120 A 30 30 0 0 1 126 120 L 270 120 A 30 30 0 0 1 330 120 L 354 120 C 364 120 371 114 372 104 Z",
    win:"M 252 79 C 247 66 236 58 220 55 C 204 52 188 55 178 59 C 167 63 150 72 141 79 Z",
    cut:"M 254 80 C 252 94 252 106 254 118 M 170 82 C 168 94 168 106 170 118",
    head:"M 357 92 L 371 96 L 369 102 L 355 98 Z", tail:"M 32 100 L 46 98 L 46 105 L 32 106 Z",
    wheels:[[96,120],[300,120]], stripeA:"M 36 99 C 120 92 240 90 368 100", stripeB:"M 36 108 C 120 101 240 99 368 109"
  },
  muscle:{
    body:"M 376 106 C 378 98 372 91 360 89 C 332 85 302 83 270 81 C 258 66 242 55 220 53 C 202 50 182 53 172 57 C 146 67 108 80 72 90 C 60 93 50 94 44 94 C 33 94 27 100 27 108 C 27 114 31 118 39 119 L 64 119 A 30 30 0 0 1 124 119 L 268 119 A 30 30 0 0 1 328 119 L 354 119 C 365 119 374 114 376 106 Z",
    win:"M 256 77 C 250 64 238 55 220 53 C 203 50 186 53 177 57 C 166 61 149 70 140 77 Z",
    cut:"M 258 78 C 256 92 256 104 258 117 M 172 80 C 170 92 170 104 172 117",
    head:"M 360 92 L 374 96 L 372 103 L 358 99 Z", tail:"M 30 98 L 44 96 L 44 103 L 30 104 Z",
    scoop:"M 292 79 L 326 77 L 332 84 L 286 86 Z",
    spoiler:"M 24 86 L 58 79 L 60 85 L 28 92 Z",
    wheels:[[96,119],[296,119]], stripeA:"M 34 99 C 120 91 240 89 370 100", stripeB:"M 34 108 C 120 100 240 98 370 109"
  },
  sedan:{
    body:"M 368 98 C 371 93 369 87 359 85 C 336 81 310 79 282 79 C 268 65 252 56 232 54 C 206 51 156 51 136 57 C 122 62 112 72 107 82 C 88 84 64 86 50 88 C 38 90 32 96 32 104 C 32 110 36 114 44 115 L 66 115 A 29 29 0 0 1 124 115 L 272 115 A 29 29 0 0 1 330 115 L 350 115 C 360 115 365 107 368 98 Z",
    win:"M 276 78 C 268 64 254 56 234 54 C 208 51 158 51 138 57 C 127 61 118 69 113 78 Z",
    pillars:'<rect x="194" y="55" width="6" height="24" fill="var(--body)"/>',
    cut:"M 278 79 C 276 90 276 102 278 113 M 196 80 C 194 90 194 102 196 113",
    head:"M 352 88 L 366 91 L 364 97 L 350 94 Z", tail:"M 34 96 L 48 95 L 48 101 L 34 102 Z",
    wheels:[[95,115],[301,115]], stripeA:"M 34 96 C 120 88 250 86 366 94", stripeB:"M 34 105 C 120 97 250 95 366 103"
  },
  suv:{
    body:"M 372 94 C 375 89 373 83 363 81 C 346 77 328 75 310 75 C 298 59 288 52 270 50 C 226 44 132 44 110 50 C 99 53 92 60 88 68 C 85 74 83 79 83 83 C 64 85 46 87 38 89 C 27 91 22 97 22 105 C 22 112 27 116 36 117 L 66 117 A 30 30 0 0 1 126 117 L 272 117 A 30 30 0 0 1 332 117 L 350 117 C 360 117 367 106 372 94 Z",
    win:"M 312 74 C 300 58 290 52 272 50 C 228 44 134 44 112 50 C 102 53 95 60 91 72 L 91 78 L 312 78 Z",
    pillars:'<rect x="148" y="49" width="6" height="29" fill="var(--body)"/><rect x="200" y="48" width="6" height="30" fill="var(--body)"/><rect x="252" y="49" width="6" height="29" fill="var(--body)"/>',
    rack:"M 118 46 L 262 46 M 132 46 L 132 51 M 248 46 L 248 51",
    cut:"M 314 75 C 312 88 312 102 314 115 M 202 78 C 200 90 200 104 202 116",
    head:"M 356 86 L 370 89 L 368 95 L 354 92 Z", tail:"M 24 98 L 38 96 L 38 103 L 24 104 Z",
    wheels:[[96,117],[302,117]], stripeA:"M 26 98 C 120 90 250 88 368 96", stripeB:"M 26 107 C 120 99 250 97 368 105"
  },
  pickup:{
    body:"M 372 100 C 375 95 373 89 363 87 C 340 83 314 81 288 81 C 276 65 266 56 248 54 C 234 51 206 51 194 55 C 184 58 178 66 176 74 L 172 83 L 46 87 C 37 88 32 94 32 102 L 32 112 C 32 116 36 118 44 119 L 66 119 A 30 30 0 0 1 126 119 L 272 119 A 30 30 0 0 1 332 119 L 352 119 C 362 119 368 110 372 100 Z",
    win:"M 282 79 C 272 64 262 56 248 54 C 234 51 208 51 196 55 C 188 58 182 66 180 76 Z",
    bed:"M 172 84 L 172 88",
    cut:"M 284 80 C 282 92 282 104 284 117",
    head:"M 356 90 L 370 93 L 368 99 L 354 96 Z", tail:"M 33 98 L 45 97 L 45 103 L 33 104 Z",
    wheels:[[96,119],[302,119]], stripeA:"M 34 98 C 120 92 250 90 368 97", stripeB:"M 34 107 C 120 101 250 99 368 106"
  }
};

/* ================= CARD RENDER ================= */
const IC = {
  miles:'<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 12l4-5"/><path d="M5 15.5h14" opacity=".4"/></svg>',
  trans:'<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 5v14M12 5v14M18 5v14M6 12h12"/></svg>',
  fuel:'<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 21V5a2 2 0 012-2h6a2 2 0 012 2v16M4 21h12M15 9l3 2a2 2 0 011 2v4a1.5 1.5 0 01-3 0v-3h-1"/><path d="M8 7h4"/></svg>',
  drive:'<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="7" cy="7" r="2.4"/><circle cx="17" cy="7" r="2.4"/><circle cx="7" cy="17" r="2.4"/><circle cx="17" cy="17" r="2.4"/><path d="M7 7h10M7 17h10M7 9.4v5.2M17 9.4v5.2" opacity=".45"/></svg>',
  check:'<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12l5 5 11-11"/></svg>'
};
const waIC = '<svg class="ic" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 00-8.65 15.02L2 22l5.13-1.32A10 10 0 1012 2zm0 2a8 8 0 018 8 8 8 0 01-11.7 7.1l-.38-.21-2.6.67.68-2.44-.24-.4A8 8 0 0112 4zm-3.1 4.2c-.2 0-.43.06-.6.26-.18.2-.7.68-.7 1.65s.71 1.92.8 2.05c.1.13 1.4 2.24 3.4 3.05 1.68.68 2.02.55 2.39.52.36-.04 1.17-.48 1.34-.95.16-.48.16-.88.11-.97-.05-.09-.18-.14-.38-.24s-1.1-.54-1.27-.6c-.17-.07-.3-.1-.42.09-.13.19-.5.63-.61.76-.11.13-.23.14-.42.05-.2-.09-.83-.31-1.58-.98-.58-.52-.98-1.16-1.09-1.35-.11-.19-.01-.3.08-.39.09-.09.2-.23.3-.35.1-.11.13-.19.2-.32.07-.13.03-.24-.02-.34-.05-.09-.42-1.02-.58-1.39-.15-.36-.3-.31-.42-.32l-.35-.01z"/></svg>';

function monthly(p){
  const P = p * 0.9, r = 0.099/12, n = 60;
  return Math.round((P * r * Math.pow(1+r, n)) / (Math.pow(1+r, n) - 1));
}
function waCar(c){
  const msg = lang === 'es'
    ? `Hola Global Autos Florida! Me interesa el ${c.year} ${c.make} ${c.model} ($${fmt(c.price)}) que vi en su página. ¿Sigue disponible?`
    : `Hi Global Autos Florida! I'm interested in the ${c.year} ${c.make} ${c.model} ($${fmt(c.price)}) I saw on your site. Is it still available?`;
  return waLink(msg);
}
function photoImg(c, i, extra=''){
  const fb = c.photos && c.photos[i] ? ` data-fb="${c.photos[i]}" onerror="imgFB(this)"` : '';
  return `<img src="autos/${c.folder}/${i+1}.webp"${fb} ${extra} decoding="async">`;
}
function wheel([x,y]){
  return `<g class="wheel" transform="translate(${x},${y})">
    <circle r="22" fill="#0A0A0A"/><circle r="22" fill="none" stroke="#1E1E1E" stroke-width="2"/>
    <circle r="12.5" fill="#111214" stroke="var(--rim)" stroke-width="1.8"/>
    <g class="spokes" stroke="var(--rim)" stroke-width="1.7" stroke-linecap="round">
      <line y2="-10.5"/><line y2="-10.5" transform="rotate(72)"/><line y2="-10.5" transform="rotate(144)"/>
      <line y2="-10.5" transform="rotate(216)"/><line y2="-10.5" transform="rotate(288)"/>
    </g>
    <circle r="2.6" fill="var(--rim)"/>
  </g>`;
}
function carSVG(c){
  const s = SIL[c.type], clip = `cb-${c.id}`;
  return `<svg class="car-svg ${c.dark?'dark':''}" viewBox="0 0 420 170" aria-hidden="true" style="--body:${c.body||'#C9CDCF'};--rim:${c.rim||'#3A3A40'}">
    <defs><clipPath id="${clip}"><path d="${s.body}"/></clipPath></defs>
    <ellipse cx="210" cy="146" rx="168" ry="7" class="shadow-pad"/>
    ${s.rack?`<path d="${s.rack}" stroke="#2E2E2E" stroke-width="4" fill="none" stroke-linecap="round"/>`:''}
    ${s.scoop?`<path d="${s.scoop}" style="fill:var(--body)"/><path d="${s.scoop}" fill="url(#g-shade)"/>`:''}
    ${s.spoiler?`<path d="${s.spoiler}" style="fill:var(--body);stroke:rgba(0,0,0,.3)"/>`:''}
    <path class="body" d="${s.body}"/>
    <path d="${s.body}" fill="url(#g-shade)"/>
    <path class="win" d="${s.win}"/>
    ${s.pillars||''}
    ${s.bed?`<path d="${s.bed}" stroke="rgba(0,0,0,.35)" stroke-width="2.5" fill="none"/>`:''}
    ${s.cut?`<path class="cutlines" d="${s.cut}"/>`:''}
    ${c.stripe?`<g clip-path="url(#${clip})">
      <path d="${s.stripeA}" stroke="${c.stripe}" stroke-width="6.5" fill="none" opacity=".92" stroke-linecap="round"/>
      <path d="${s.stripeB}" stroke="${c.stripe}" stroke-width="6.5" fill="none" opacity=".92" stroke-linecap="round"/>
    </g>`:''}
    <path class="hl" d="${s.head}"/><path class="tl" d="${s.tail}"/>
    ${s.wheels.map(wheel).join('')}
  </svg>`;
}
function cardHTML(c, i){
  const cond = T(c,'cond'), badge = T(c,'badge');
  const moLabel = lang === 'es' ? '/mes*' : '/mo*';
  return `<article class="car-card ${c.featured?'featured':''}" style="animation-delay:${i*55}ms">
    <div class="showroom">
      ${galCount(c) > 0 ? photoImg(c, 0, `alt="${c.year} ${c.make} ${c.model}" loading="lazy"`) : carSVG(c)}
      <div class="badges">
        <span class="badge">${cond}</span>
        ${badge?`<span class="badge hot">${badge}</span>`:''}
      </div>
    </div>
    <div class="card-info">
      <div class="card-title">
        <h3><small>${c.make}</small>${c.year} ${c.model}</h3>
        <div><span class="price">$${fmt(c.price)}</span><div class="mo">≈ $${fmt(monthly(c.price))}${moLabel}</div></div>
      </div>
      <ul class="specs">
        <li>${IC.miles}${fmt(c.miles)} mi</li>
        <li>${IC.trans}${T(c,'trans')}</li>
        <li>${IC.fuel}${T(c,'fuel')}</li>
        <li>${IC.drive}${T(c,'drive')}</li>
      </ul>
      <div class="card-actions">
        <button class="btn btn-o" data-view="${c.id}">${lang==='es'?'Ver detalles':'View details'}</button>
        <a class="wa-mini" href="${waCar(c)}" target="_blank" rel="noopener" aria-label="${lang==='es'?'Consultar por WhatsApp':'Ask on WhatsApp'}">${waIC}</a>
      </div>
    </div>
  </article>`;
}

/* ================= FILTERS ================= */
const state = { q:'', type:'all', sort:'featured' };
const grid = document.getElementById('carsGrid');
const emptyBox = document.getElementById('empty');
const countEl = document.getElementById('count');
const countNoun = document.getElementById('countNoun');

function render(){
  let list = CARS.filter(c =>
    (state.type==='all' || c.type===state.type) &&
    (`${c.make} ${c.model} ${c.year}`.toLowerCase().includes(state.q.toLowerCase()))
  );
  if(state.sort==='price-asc') list.sort((a,b)=>a.price-b.price);
  if(state.sort==='price-desc') list.sort((a,b)=>b.price-a.price);
  if(state.sort==='year-desc') list.sort((a,b)=>b.year-a.year);
  if(state.sort==='miles-asc') list.sort((a,b)=>a.miles-b.miles);

  grid.innerHTML = list.map(cardHTML).join('');
  countEl.textContent = list.length;
  countNoun.textContent = lang === 'es'
    ? (list.length===1 ? 'vehículo' : 'vehículos')
    : (list.length===1 ? 'vehicle' : 'vehicles');
  emptyBox.classList.toggle('show', list.length===0);
}

const TYPES = [
  {v:'all',    en:'All',      es:'Todos'},
  {v:'sport',  en:'Sports',   es:'Deportivos'},
  {v:'muscle', en:'Muscle',   es:'Muscle'},
  {v:'suv',    en:'SUV',      es:'SUV'},
  {v:'pickup', en:'Pickups',  es:'Pickups'},
  {v:'sedan',  en:'Sedans',   es:'Sedanes'}
];
const pillsEl = document.getElementById('pills');
function renderPills(){
  pillsEl.innerHTML = TYPES.filter(t => t.v==='all' || CARS.some(c=>c.type===t.v)).map(t=>{
    const n = t.v==='all' ? CARS.length : CARS.filter(c=>c.type===t.v).length;
    const label = t[lang];
    return `<button class="pill ${t.v==='all'?'active':''}" data-type="${t.v}" role="tab" aria-selected="${t.v==='all'}">${label}<i>${n}</i></button>`;
  }).join('');
}
renderPills();
pillsEl.addEventListener('click', e=>{
  const b = e.target.closest('.pill'); if(!b) return;
  pillsEl.querySelectorAll('.pill').forEach(p=>{p.classList.remove('active');p.setAttribute('aria-selected','false')});
  b.classList.add('active'); b.setAttribute('aria-selected','true');
  state.type = b.dataset.type; render();
});
document.getElementById('q').addEventListener('input', e=>{ state.q = e.target.value.trim(); render(); });
document.getElementById('sort').addEventListener('change', e=>{ state.sort = e.target.value; render(); });
document.getElementById('clearFilters').addEventListener('click', ()=>{
  state.q=''; state.type='all'; state.sort='featured';
  document.getElementById('q').value=''; document.getElementById('sort').value='featured';
  pillsEl.querySelectorAll('.pill').forEach(p=>p.classList.toggle('active', p.dataset.type==='all'));
  render();
});
render();

/* ================= MODAL + GALLERY ================= */
const modal = document.getElementById('modal');
const mShow = document.getElementById('mShow');
const gal = {car:null, idx:0};

const ARROW = d => `<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="${d}"/></svg>`;

function galCount(c){
  if(c.photos && c.photos.length) return c.photos.length;
  return c.numPhotos || 0;
}
function setGal(i){
  if(!gal.car) return;
  const c = gal.car, n = galCount(c);
  if(n===0) return;
  gal.idx = ((i % n) + n) % n;
  const photoLabel = lang === 'es' ? `Foto ${gal.idx+1} de ${n}` : `Photo ${gal.idx+1} of ${n}`;
  document.getElementById('galMain').innerHTML =
    photoImg(c, gal.idx, `alt="${photoLabel} · ${c.year} ${c.make} ${c.model}"`) +
    `<button class="gal-arrow prev" aria-label="${lang==='es'?'Foto anterior':'Previous photo'}">${ARROW('M15 6l-6 6 6 6')}</button>
     <button class="gal-arrow next" aria-label="${lang==='es'?'Foto siguiente':'Next photo'}">${ARROW('M9 6l6 6-6 6')}</button>
     <span class="gal-count">${gal.idx+1} / ${n}</span>`;
  document.querySelectorAll('.gal-thumb').forEach(t=>t.classList.toggle('active', +t.dataset.i===gal.idx));
}
function buildGallery(c){
  gal.car = c; gal.idx = 0;
  const n = galCount(c);
  mShow.classList.add('gal-mode');
  const viewPhotoLabel = i => lang==='es' ? `Ver foto ${i+1}` : `View photo ${i+1}`;
  const thumbs = Array.from({length:n},(_,i)=>`
      <button class="gal-thumb ${i===0?'active':''}" data-i="${i}" aria-label="${viewPhotoLabel(i)}">
        ${photoImg(c, i, 'alt="" loading="lazy"')}
      </button>`).join('');
  mShow.innerHTML = `<div class="gal">
    <div class="gal-main" id="galMain"></div>
    <div class="gal-thumbs">${thumbs}</div>
  </div>`;
  setGal(0);
}
function openModal(id){
  const c = CARS.find(x=>x.id==id); if(!c) return;
  const cond = T(c,'cond');
  document.getElementById('mKicker').textContent = `${cond} · Stock GA-${1000+c.id}`;
  document.getElementById('mTitle').textContent = `${c.year} ${c.make} ${c.model}`;
  document.getElementById('mPrice').textContent = `$${fmt(c.price)}`;
  const moLabel = lang === 'es' ? '/mes*' : '/mo*';
  document.getElementById('mMo').textContent = `≈ $${fmt(monthly(c.price))}${moLabel}`;
  const specKeys = lang === 'es'
    ? ['Año','Millaje','Motor','Transmisión','Tracción','Combustible','Color exterior','Condición']
    : ['Year','Mileage','Engine','Transmission','Drivetrain','Fuel','Exterior color','Condition'];
  const specVals = [c.year, `${fmt(c.miles)} mi`, T(c,'engine'), T(c,'trans'), T(c,'drive'), T(c,'fuel'), T(c,'ext'), T(c,'cond')];
  document.getElementById('mSpecs').innerHTML = specKeys.map((k,idx)=>`<div><dt>${k}</dt><dd>${specVals[idx]}</dd></div>`).join('');
  document.getElementById('mChips').innerHTML = T(c,'feats').map(f=>`<span class="chip">${IC.check}${f}</span>`).join('');
  document.getElementById('mDesc').textContent = T(c,'desc');
  document.getElementById('mWa').href = waCar(c);
  const testMsg = lang === 'es'
    ? `Hola! Quiero agendar una prueba de manejo del ${c.year} ${c.make} ${c.model}. ¿Cuándo puedo pasar?`
    : `Hi! I'd like to book a test drive for the ${c.year} ${c.make} ${c.model}. When can I come by?`;
  document.getElementById('mTest').href = waLink(testMsg);
  if(galCount(c) > 0){ buildGallery(c); }
  else { gal.car = null; mShow.classList.remove('gal-mode'); mShow.innerHTML = carSVG(c); }
  modal.classList.add('open'); document.body.style.overflow='hidden';
}
function closeModal(){ modal.classList.remove('open'); document.body.style.overflow=''; }
grid.addEventListener('click', e=>{
  const b = e.target.closest('[data-view]'); if(b) openModal(b.dataset.view);
});
modal.addEventListener('click', e=>{ if(e.target.closest('[data-close]')) closeModal(); });

mShow.addEventListener('click', e=>{
  if(e.target.closest('.gal-arrow.prev')){ setGal(gal.idx-1); return; }
  if(e.target.closest('.gal-arrow.next')){ setGal(gal.idx+1); return; }
  const t = e.target.closest('.gal-thumb');
  if(t) setGal(+t.dataset.i);
});
let swX = null;
mShow.addEventListener('pointerdown', e=>{ swX = e.clientX; });
mShow.addEventListener('pointerup', e=>{
  if(swX===null || !gal.car) return;
  const d = e.clientX - swX; swX = null;
  if(Math.abs(d) > 45) setGal(d < 0 ? gal.idx+1 : gal.idx-1);
});
document.addEventListener('keydown', e=>{
  if(e.key==='Escape'){ closeModal(); navPanel.classList.remove('open'); }
  if(modal.classList.contains('open')){
    if(e.key==='ArrowRight') setGal(gal.idx+1);
    if(e.key==='ArrowLeft') setGal(gal.idx-1);
  }
});

/* ================= GENERIC WHATSAPP LINKS ================= */
document.querySelectorAll('[data-wa]').forEach(a=>{
  a.href = waLink(a.dataset.wa); a.target='_blank'; a.rel='noopener';
});

/* ================= FORMS ================= */
function toast(msg){
  const t = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  t.classList.add('show');
  clearTimeout(t._h); t._h = setTimeout(()=>t.classList.remove('show'), 4200);
}
const I18N = {
  en:{
    finNeedName:'Please enter your name and phone so we can send you options on WhatsApp.',
    finOk:(n)=>`Done, ${n}! WhatsApp opened with your request. We reply in minutes.`,
    cNeedName:'We need at least your name and phone to reply.',
    cOk:(n,p)=>`Thanks, ${n}! We got your request — we'll call you at ${p} today.`,
    finWaMsg:(n,p,pay)=>`Hi Global Autos Florida! I'd like a credit pre-approval.\n• Name: ${n}\n• Phone: ${p}\n• Target payment: ${pay}`
  },
  es:{
    finNeedName:'Completa tu nombre y teléfono para enviarte las opciones por WhatsApp.',
    finOk:(n)=>`¡Listo, ${n}! Se abrió WhatsApp con tu solicitud. Te respondemos en minutos.`,
    cNeedName:'Necesitamos al menos tu nombre y teléfono para poder responderte.',
    cOk:(n,p)=>`¡Gracias, ${n}! Recibimos tu solicitud — te llamamos al ${p} hoy mismo.`,
    finWaMsg:(n,p,pay)=>`Hola Global Autos Florida! Quiero una pre-aprobación de crédito.\n• Nombre: ${n}\n• Teléfono: ${p}\n• Cuota objetivo: ${pay}`
  }
};
document.getElementById('finForm').addEventListener('submit', e=>{
  e.preventDefault();
  const n = document.getElementById('fName').value.trim();
  const p = document.getElementById('fPhone').value.trim();
  const pay = document.getElementById('fPay').value;
  const L = I18N[lang];
  if(!n || !p){ toast(L.finNeedName); return; }
  window.open(waLink(L.finWaMsg(n,p,pay)), '_blank');
  toast(L.finOk(n.split(' ')[0]));
  e.target.reset();
});
document.getElementById('cForm').addEventListener('submit', e=>{
  e.preventDefault();
  const n = document.getElementById('cName').value.trim();
  const p = document.getElementById('cPhone').value.trim();
  const L = I18N[lang];
  if(!n || !p){ toast(L.cNeedName); return; }
  toast(L.cOk(n.split(' ')[0], p));
  e.target.reset();
});

/* ================= MARQUEE · OFFICIAL LOGOS ================= */
const BRANDS = [
  {slug:'chevrolet', name:'CHEVROLET'},
  {slug:'ford',      name:'FORD'},
  {slug:'toyota',    name:'TOYOTA'},
  {slug:'honda',     name:'HONDA'},
  {slug:'nissan',    name:'NISSAN'},
  {slug:'jeep',      name:'JEEP'},
  {slug:'dodge',     name:'DODGE'},
  {slug:'bmw',       name:'BMW'},
  {slug:'mercedes',  name:'MERCEDES-BENZ'},
  {slug:'porsche',   name:'PORSCHE'},
  {slug:'audi',      name:'AUDI'},
  {slug:'lexus',     name:'LEXUS'}
];
const SI = 'https://cdn.simpleicons.org/';
const mqItem = b => `
  <span class="mq-logo">
    <img src="${SI}${b.slug}/ffffff" alt="${b.name}" decoding="async"
         onerror="this.closest('.mq-logo').classList.add('fallback');this.alt=''">
    <img class="lg-y" src="${SI}${b.slug}/FFCE00" alt="" aria-hidden="true" decoding="async">
    <span class="mq-name">${b.name}</span>
  </span><span class="mq-sep"></span>`;
const mqHalf = BRANDS.map(mqItem).join('');
document.getElementById('mqTrack').innerHTML = `<div class="mq-half">${mqHalf}</div><div class="mq-half">${mqHalf}</div>`;

/* ================= HEADER / NAV ================= */
const header = document.getElementById('header');
const navPanel = document.getElementById('navPanel');
addEventListener('scroll', ()=>{
  header.classList.toggle('scrolled', scrollY>40);
  const h = document.documentElement;
  document.getElementById('progress').style.width = (scrollY/(h.scrollHeight-h.clientHeight)*100)+'%';
}, {passive:true});
document.getElementById('burger').addEventListener('click', ()=>navPanel.classList.add('open'));
document.getElementById('navClose').addEventListener('click', ()=>navPanel.classList.remove('open'));
navPanel.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>navPanel.classList.remove('open')));

/* ================= REVEAL ON SCROLL ================= */
const io = new IntersectionObserver(es=>es.forEach(en=>{
  if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }
}), {threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

/* ================= HERO SPOTLIGHT ================= */
const hero = document.querySelector('.hero'), spot = document.getElementById('heroSpot');
if(matchMedia('(hover:hover)').matches){
  hero.addEventListener('pointermove', e=>{
    const r = hero.getBoundingClientRect();
    spot.style.setProperty('--sx', (e.clientX-r.left)+'px');
    spot.style.setProperty('--sy', (e.clientY-r.top)+'px');
  });
}

/* ================= LANGUAGE TOGGLE (EN / ES) ================= */
/* Set element text from data-en / data-es attributes, preserving child elements (SVG, BR, etc.) */
function setElText(el, text){
  let textNode = null;
  for(const node of el.childNodes){
    if(node.nodeType === Node.TEXT_NODE && node.nodeValue.trim()){
      textNode = node; break;
    }
  }
  if(textNode){
    const original = textNode.nodeValue;
    const leading = original.match(/^\s*/)[0];
    const trailing = original.match(/\s*$/)[0];
    textNode.nodeValue = leading + text + trailing;
  } else {
    el.insertBefore(document.createTextNode(text), el.firstChild);
  }
}
function setLang(newLang){
  lang = newLang;
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;

  /* Static text via data-en / data-es */
  document.querySelectorAll('[data-en]').forEach(el=>{
    const v = el.getAttribute('data-' + lang);
    if(v != null) setElText(el, v);
  });
  /* Mixed HTML via data-en-html / data-es-html */
  document.querySelectorAll('[data-en-html]').forEach(el=>{
    const v = el.getAttribute('data-' + lang + '-html');
    if(v != null) el.innerHTML = v;
  });
  /* Placeholders via data-en-ph / data-es-ph */
  document.querySelectorAll('[data-en-ph]').forEach(el=>{
    const v = el.getAttribute('data-' + lang + '-ph');
    if(v != null) el.setAttribute('placeholder', v);
  });
  /* Select option labels */
  document.querySelectorAll('option[data-en]').forEach(opt=>{
    const v = opt.getAttribute('data-' + lang);
    if(v != null) opt.textContent = v;
  });

  /* Update language toggle visual state */
  document.querySelectorAll('#langToggle .lang-opt').forEach(o=>{
    o.classList.toggle('active', o.dataset.lang === lang);
  });

  /* Re-render dynamic content */
  renderPills();
  render();
  /* If modal is open, re-render its content */
  if(modal.classList.contains('open') && gal.car){
    openModal(gal.car.id);
  } else if(modal.classList.contains('open')){
    /* Modal open with no gallery (silhouette) — re-open to refresh text */
    const openId = document.getElementById('mTitle').textContent;
    /* Best effort: find the car by title match */
  }
}

const langToggle = document.getElementById('langToggle');
langToggle.addEventListener('click', e=>{
  const opt = e.target.closest('.lang-opt');
  if(opt){ setLang(opt.dataset.lang); return; }
  /* Toggle between en/es when clicking the separator or empty area */
  setLang(lang === 'en' ? 'es' : 'en');
});
/* Initialize toggle visual state */
document.querySelectorAll('#langToggle .lang-opt').forEach(o=>{
  o.classList.toggle('active', o.dataset.lang === lang);
});

/* ================= DARK / LIGHT THEME TOGGLE ================= */
function applyTheme(theme){
  if(theme === 'light'){
    document.documentElement.classList.add('light');
  } else {
    document.documentElement.classList.remove('light');
  }
  localStorage.setItem('theme', theme);
}
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', ()=>{
  const isLight = document.documentElement.classList.contains('light');
  applyTheme(isLight ? 'dark' : 'light');
});

/* ================= APPLY STORED PREFERENCES ON LOAD ================= */
/* Theme: default dark. Apply ASAP to avoid flash — but since this script loads
   after body.html, we just apply it once here. */
applyTheme(localStorage.getItem('theme') === 'light' ? 'light' : 'dark');
/* Language: default 'en'. Apply static text + dynamic content. */
setLang(lang);
