// lib/locations.ts
// Full Uzbekistan administrative geography: 14 regions × 15 districts × 10 schools each.
// Source: sanitised locations.js — all special characters resolved to plain TS string literals.

export interface GeoSchool {
  id: string
  name: string
}

export interface GeoDistrict {
  id: string
  name: string
  schools: GeoSchool[]
}

export interface GeoRegion {
  id: string
  name: string
  type: 'Republic' | 'Region' | 'Capital'
  districts: GeoDistrict[]
}

// ─── Helper: generate a numbered school array ───────────────────────────────
function schools(prefix: string, districtLabel: string, overrides: Record<number, string> = {}): GeoSchool[] {
  return Array.from({ length: 10 }, (_, i) => ({
    id: `${prefix}_${i + 1}`,
    name: overrides[i] ?? `School No. ${i + 1} of ${districtLabel}`,
  }))
}

export const uzbekistanGeography: GeoRegion[] = [
  // ── 1. Karakalpakstan ───────────────────────────────────────────────────
  {
    id: 'karakalpakstan',
    name: 'Republic of Karakalpakstan',
    type: 'Republic',
    districts: [
      { id: 'nukus_c',    name: 'Nukus City',           schools: schools('kk_nc', 'Nukus City') },
      { id: 'amudarya',   name: 'Amudarya District',    schools: schools('kk_am', 'Amudarya') },
      { id: 'beruniy',    name: 'Beruniy District',     schools: schools('kk_be', 'Beruniy') },
      { id: 'chimboy',    name: 'Chimboy District',     schools: schools('kk_ch', 'Chimboy') },
      { id: 'ellikqala',  name: 'Ellikqala District',  schools: schools('kk_el', 'Ellikqala') },
      { id: 'kegeyli',    name: 'Kegeyli District',     schools: schools('kk_ke', 'Kegeyli') },
      { id: 'muynak',     name: 'Muynak District',      schools: schools('kk_mu', 'Muynak') },
      { id: 'kungrad',    name: 'Kungrad District',     schools: schools('kk_ku', 'Kungrad') },
      { id: 'qonlikol',   name: 'Kanlykul District',   schools: schools('kk_ka', 'Kanlykul') },
      { id: 'qorauzyak',  name: 'Karauzyak District',  schools: schools('kk_kr', 'Karauzyak') },
      { id: 'shumanay',   name: 'Shumanay District',   schools: schools('kk_sh', 'Shumanay') },
      { id: 'taxtakopir', name: 'Takhtakupir District',schools: schools('kk_ta', 'Takhtakupir') },
      { id: 'tortkol',    name: 'Turtkul District',    schools: schools('kk_tu', 'Turtkul') },
      { id: 'xojeli',     name: 'Khojeyli District',   schools: schools('kk_xo', 'Khojeyli') },
      { id: 'bozatau',    name: 'Bozatau District',    schools: schools('kk_bo', 'Bozatau') },
    ],
  },

  // ── 2. Jizzakh ──────────────────────────────────────────────────────────
  {
    id: 'jizzakh',
    name: 'Jizzakh Region',
    type: 'Region',
    districts: [
      { id: 'paxtakor',      name: 'Paxtakor tumani', schools: schools('jz_pk', 'Pakhtakor') },
      { id: 'arnasoy',       name: 'Arnasoy tumani',        schools: schools('jz_ar', 'Arnasoy') },
      { id: 'baxmal',        name: 'Baxmal tumani',        schools: schools('jz_ba', 'Bakhmal') },
      { id: 'dostlik',       name: 'Do\'stlik tumani',        schools: schools('jz_do', 'Dustlik') },
      { id: 'forish',        name: 'Forish tumani',         schools: schools('jz_fo', 'Forish') },
      { id: 'gallaorol',     name: 'G\'allaorol tumani',      schools: schools('jz_ga', 'Gallaorol') },
      { id: 'sharof_rashidov', name: 'Sharof Rashidov tumani', schools: schools('jz_sr', 'Sharof Rashidov') },
      { id: 'mirzachol',     name: 'Mirzachol tumani',      schools: schools('jz_mi', 'Mirzachol') },
      { id: 'yangiobod',     name: 'Yangiobod tumani',      schools: schools('jz_ya', 'Yangiobod') },
      { id: 'zomin',         name: 'Zomin tumani',         schools: schools('jz_zo', 'Zaamin') },
      { id: 'zafarobod',     name: 'Zafarobod tumani',      schools: schools('jz_za', 'Zafarobod') },
      { id: 'zarbdor',       name: 'Zarbdor tumani',        schools: schools('jz_zd', 'Zarbdor') },
      { id: 'jizzakh_city',  name: 'Jizzax shahri',   schools: schools('jz_jc', 'Jizzakh City') },
      { id: 'sangzor',       name: 'G\'allaorol tumani',      schools: schools('jz_sz', 'Sangzor') },
      { id: 'manas',         name: 'Paxtakor tumani',    schools: schools('jz_mn', 'Manas') },
    ],
  },

  // ── 3. Samarkand ────────────────────────────────────────────────────────
  {
    id: 'samarqand',
    name: 'Samarkand Region',
    type: 'Region',
    districts: [
      { id: 'sam_city',    name: 'Samarkand City',       schools: schools('sm_sc', 'Samarkand City') },
      { id: 'bulungur',    name: 'Bulungur District',    schools: schools('sm_bu', 'Bulungur') },
      { id: 'ishtixon',    name: 'Ishtixon District',    schools: schools('sm_is', 'Ishtixon') },
      { id: 'jomboy',      name: 'Jomboy District',      schools: schools('sm_jo', 'Jomboy') },
      { id: 'kattakurgan', name: 'Kattakurgan District', schools: schools('sm_ka', 'Kattakurgan') },
      { id: 'koshrabot',   name: 'Kushrabot District',   schools: schools('sm_ko', 'Kushrabot') },
      { id: 'narpay',      name: 'Narpay District',      schools: schools('sm_na', 'Narpay') },
      { id: 'nurobod',     name: 'Nurabad District',     schools: schools('sm_nu', 'Nurabad') },
      { id: 'oqdaryo',     name: 'Akdarya District',     schools: schools('sm_oq', 'Akdarya') },
      { id: 'paxtachi',    name: 'Pakhtachi District',   schools: schools('sm_pa', 'Pakhtachi') },
      { id: 'payariq',     name: 'Payariq District',     schools: schools('sm_py', 'Payariq') },
      { id: 'pastdargom',  name: 'Pastdargom District',  schools: schools('sm_pd', 'Pastdargom') },
      { id: 'sam_dist',    name: 'Samarkand District',   schools: schools('sm_sd', 'Samarkand District') },
      { id: 'toyloq',      name: 'Taylak District',      schools: schools('sm_to', 'Taylak') },
      { id: 'urgut',       name: 'Urgut District',       schools: schools('sm_ur', 'Urgut') },
    ],
  },

  // ── 4. Tashkent Region ──────────────────────────────────────────────────
  {
    id: 'tashkent_v',
    name: 'Tashkent Region',
    type: 'Region',
    districts: [
      { id: 'bekabad',        name: 'Bekabad District',          schools: schools('tv_be', 'Bekabad') },
      { id: 'bostonliq',      name: 'Bostanlyk District',        schools: schools('tv_bo', 'Bostanlyk') },
      { id: 'boka',           name: 'Buka District',             schools: schools('tv_bk', 'Buka') },
      { id: 'chinoz',         name: 'Chinaz District',           schools: schools('tv_ch', 'Chinaz') },
      { id: 'qibray',         name: 'Kibray District',           schools: schools('tv_qi', 'Kibray') },
      { id: 'ohangaron',      name: 'Ohangaron District',        schools: schools('tv_oh', 'Ohangaron') },
      { id: 'oqqorgon',       name: 'Akkurgan District',         schools: schools('tv_oq', 'Akkurgan') },
      { id: 'parkent',        name: 'Parkent District',          schools: schools('tv_pa', 'Parkent') },
      { id: 'piskent',        name: 'Piskent District',          schools: schools('tv_pi', 'Piskent') },
      { id: 'quyichirchiq',   name: 'Quyi Chirchiq District',    schools: schools('tv_qc', 'Quyi Chirchiq') },
      { id: 'zangiota',       name: 'Zangiota District',         schools: schools('tv_za', 'Zangiota') },
      { id: 'ortachirchiq',   name: 'Orta Chirchiq District',    schools: schools('tv_oc', 'Orta Chirchiq') },
      { id: 'yangiyol',       name: 'Yangiyol District',         schools: schools('tv_ya', 'Yangiyol') },
      { id: 'yuqorichirchiq', name: 'Yuqori Chirchiq District',  schools: schools('tv_yc', 'Yuqori Chirchiq') },
      { id: 'tashkent_d',     name: 'Tashkent District Hub',     schools: schools('tv_td', 'Tashkent District') },
    ],
  },

  // ── 5. Fergana ──────────────────────────────────────────────────────────
  {
    id: 'fergana',
    name: 'Fergana Region',
    type: 'Region',
    districts: [
      { id: 'fer_city',   name: 'Fergana City',           schools: schools('fr_fc', 'Fergana City') },
      { id: 'oltiariq',   name: 'Altyariq District',      schools: schools('fr_ol', 'Altyariq') },
      { id: 'bagdod',     name: 'Baghdad District',        schools: schools('fr_ba', 'Baghdad') },
      { id: 'beshariq',   name: 'Beshariq District',       schools: schools('fr_be', 'Beshariq') },
      { id: 'dangara',    name: 'Dangara District',        schools: schools('fr_da', 'Dangara') },
      { id: 'fargona_d',  name: 'Fergana District',        schools: schools('fr_fd', 'Fergana District') },
      { id: 'furqat',     name: 'Furqat District',         schools: schools('fr_fu', 'Furqat') },
      { id: 'qoqon',      name: 'Kokand City Division',    schools: schools('fr_qo', 'Kokand') },
      { id: 'quva',       name: 'Kuva District',           schools: schools('fr_qv', 'Kuva') },
      { id: 'margilon',   name: 'Margilan City Division',  schools: schools('fr_ma', 'Margilan') },
      { id: 'rishton',    name: 'Rishtan District',        schools: schools('fr_ri', 'Rishtan') },
      { id: 'toshloq',    name: 'Toshloq District',        schools: schools('fr_to', 'Toshloq') },
      { id: 'uchkoprik',  name: 'Uchkoprik District',      schools: schools('fr_uk', 'Uchkoprik') },
      { id: 'ozbekiston', name: 'Uzbekistan District',     schools: schools('fr_oz', 'Uzbekistan District') },
      { id: 'yozyovon',   name: 'Yozyovon District',       schools: schools('fr_yo', 'Yozyovon') },
    ],
  },

  // ── 6. Andijan ──────────────────────────────────────────────────────────
  {
    id: 'andijan',
    name: 'Andijan Region',
    type: 'Region',
    districts: [
      { id: 'and_city',    name: 'Andijan City',          schools: schools('an_ac', 'Andijan City') },
      { id: 'asaka',       name: 'Asaka District',        schools: schools('an_as', 'Asaka') },
      { id: 'baliqchi',    name: 'Baliqchi District',     schools: schools('an_ba', 'Baliqchi') },
      { id: 'boston',      name: 'Boston District',       schools: schools('an_bo', 'Boston') },
      { id: 'buloqboshi',  name: 'Buloqboshi District',   schools: schools('an_bb', 'Buloqboshi') },
      { id: 'izboskan',    name: 'Izboskan District',     schools: schools('an_iz', 'Izboskan') },
      { id: 'jalaquduq',   name: 'Jalaquduq District',    schools: schools('an_jq', 'Jalaquduq') },
      { id: 'marhamat',    name: 'Marhamat District',     schools: schools('an_ma', 'Marhamat') },
      { id: 'oltinkol',    name: 'Oltinkol District',     schools: schools('an_ok', 'Oltinkol') },
      { id: 'paxtaobod',   name: 'Pakhtaobod District',   schools: schools('an_pa', 'Pakhtaobod') },
      { id: 'qorgontepa',  name: 'Qorgontepa District',   schools: schools('an_qo', 'Qorgontepa') },
      { id: 'shahrixon',   name: 'Shahrixon District',    schools: schools('an_sh', 'Shahrixon') },
      { id: 'ulugnor',     name: 'Ulugnor District',      schools: schools('an_ul', 'Ulugnor') },
      { id: 'xojaobod',    name: 'Xojaobod District',     schools: schools('an_xo', 'Xojaobod') },
      { id: 'andijan_d',   name: 'Andijan District',      schools: schools('an_ad', 'Andijan District') },
    ],
  },

  // ── 7. Namangan ─────────────────────────────────────────────────────────
  {
    id: 'namangan',
    name: 'Namangan Region',
    type: 'Region',
    districts: [
      { id: 'nam_city',      name: 'Namangan City',            schools: schools('nm_nc', 'Namangan City') },
      { id: 'chartak',       name: 'Chartak District',         schools: schools('nm_ch', 'Chartak') },
      { id: 'chust',         name: 'Chust District',           schools: schools('nm_ct', 'Chust') },
      { id: 'kasansay',      name: 'Kosonsoy District',        schools: schools('nm_ks', 'Kosonsoy') },
      { id: 'mingbulak',     name: 'Mingbuloq District',       schools: schools('nm_mb', 'Mingbuloq') },
      { id: 'namangan_d',    name: 'Namangan District',        schools: schools('nm_nd', 'Namangan District') },
      { id: 'naryn',         name: 'Norin District',           schools: schools('nm_nr', 'Norin') },
      { id: 'pap',           name: 'Pop District',             schools: schools('nm_pp', 'Pop') },
      { id: 'toraqorgon',    name: 'Toraqorgon District',      schools: schools('nm_tq', 'Toraqorgon') },
      { id: 'uchqorgon',     name: 'Uchqorgon District',       schools: schools('nm_uq', 'Uchqorgon') },
      { id: 'uychi',         name: 'Uychi District',           schools: schools('nm_uy', 'Uychi') },
      { id: 'yangiqorgon',   name: 'Yangiqorgon District',     schools: schools('nm_yq', 'Yangiqorgon') },
      { id: 'davlatobod',    name: 'Davlatobod District',      schools: schools('nm_da', 'Davlatobod') },
      { id: 'yangi_nam',     name: 'Yangi Namangan District',  schools: schools('nm_yn', 'Yangi Namangan') },
      { id: 'chortoq_h',     name: 'Chortoq Highlands',        schools: schools('nm_ch2', 'Chortoq Hub') },
    ],
  },

  // ── 8. Bukhara ──────────────────────────────────────────────────────────
  {
    id: 'bukhara',
    name: 'Bukhara Region',
    type: 'Region',
    districts: [
      { id: 'bux_city',      name: 'Bukhara City',          schools: schools('bx_bc', 'Bukhara City') },
      { id: 'olot',          name: 'Olot District',         schools: schools('bx_ol', 'Olot') },
      { id: 'buxoro_d',      name: 'Bukhara District',      schools: schools('bx_bd', 'Bukhara District') },
      { id: 'gijduvon',      name: 'Gijduvon District',     schools: schools('bx_gj', 'Gijduvon') },
      { id: 'jondor',        name: 'Jondor District',       schools: schools('bx_jn', 'Jondor') },
      { id: 'kogon',         name: 'Kogon District',        schools: schools('bx_kg', 'Kogon') },
      { id: 'qorakol',       name: 'Karakul District',      schools: schools('bx_qk', 'Karakul') },
      { id: 'qorovulbozor',  name: 'Qorovulbozor District', schools: schools('bx_qb', 'Qorovulbozor') },
      { id: 'peshku',        name: 'Peshku District',       schools: schools('bx_pe', 'Peshku') },
      { id: 'romitan',       name: 'Romitan District',      schools: schools('bx_ro', 'Romitan') },
      { id: 'shofirkon',     name: 'Shofirkon District',    schools: schools('bx_sh', 'Shofirkon') },
      { id: 'vobkent',       name: 'Vobkent District',      schools: schools('bx_vo', 'Vobkent') },
      { id: 'galla_bux',     name: 'Galla Ridge Division',  schools: schools('bx_gb', 'Galla Ridge') },
      { id: 'ark_hub',       name: 'Ark Ancient Zone',      schools: schools('bx_ah', 'Ark Hub') },
      { id: 'sitora',        name: 'Sitora Sector',         schools: schools('bx_ss', 'Sitora') },
    ],
  },

  // ── 9. Navoi ────────────────────────────────────────────────────────────
  {
    id: 'navoiy',
    name: 'Navoi Region',
    type: 'Region',
    districts: [
      { id: 'nav_city',    name: 'Navoi City',                    schools: schools('nv_nc', 'Navoi City') },
      { id: 'konimex',     name: 'Konimex District',              schools: schools('nv_km', 'Konimex') },
      { id: 'karmana',     name: 'Karmana District',              schools: schools('nv_kr', 'Karmana') },
      { id: 'qiziltepa',   name: 'Qiziltepa District',            schools: schools('nv_qz', 'Qiziltepa') },
      { id: 'xatirchi',    name: 'Khatirchi District',            schools: schools('nv_xt', 'Khatirchi') },
      { id: 'navbahor',    name: 'Navbahor District',             schools: schools('nv_nb', 'Navbahor') },
      { id: 'nurota',      name: 'Nurata District',               schools: schools('nv_nu', 'Nurata') },
      { id: 'tomdi',       name: 'Tomdi District',                schools: schools('nv_to', 'Tomdi') },
      { id: 'uchquduq',    name: 'Uchquduq Industrial District',  schools: schools('nv_uq', 'Uchquduq') },
      { id: 'zaravshan',   name: 'Zarafshan City Sector',         schools: schools('nv_za', 'Zarafshan') },
      { id: 'sarmish',     name: 'Sarmish Gorge Zone',            schools: schools('nv_sg', 'Sarmish') },
      { id: 'malik',       name: 'Malik Desert Sector',           schools: schools('nv_md', 'Malik') },
      { id: 'langar',      name: 'Langar Mountain Range',         schools: schools('nv_lm', 'Langar') },
      { id: 'kyzylkum_j',  name: 'Kyzylkum Central Sector',      schools: schools('nv_kc', 'Kyzylkum') },
      { id: 'gajak',       name: 'Gajak Plains',                  schools: schools('nv_gp', 'Gajak') },
    ],
  },

  // ── 10. Kashkadarya ─────────────────────────────────────────────────────
  {
    id: 'qashqadaryo',
    name: 'Kashkadarya Region',
    type: 'Region',
    districts: [
      { id: 'qarshi_city', name: 'Karshi City',                   schools: schools('qd_qc', 'Karshi City') },
      { id: 'guzor',       name: 'Guzar District',                schools: schools('qd_gz', 'Guzar') },
      { id: 'dehqonobod',  name: 'Dehqonobod District',           schools: schools('qd_dh', 'Dehqonobod') },
      { id: 'kamashi',     name: 'Kamashi District',              schools: schools('qd_km', 'Kamashi') },
      { id: 'qarshi_d',    name: 'Karshi District',               schools: schools('qd_qd', 'Karshi District') },
      { id: 'koson',       name: 'Koson District',                schools: schools('qd_ko', 'Koson') },
      { id: 'kasbi',       name: 'Kasbi District',                schools: schools('qd_kb', 'Kasbi') },
      { id: 'kitob',       name: 'Kitab District',                schools: schools('qd_kt', 'Kitab') },
      { id: 'mirishkor',   name: 'Mirishkor District',            schools: schools('qd_mr', 'Mirishkor') },
      { id: 'muborak',     name: 'Muborak Energy District',       schools: schools('qd_mb', 'Muborak') },
      { id: 'nishon',      name: 'Nishon District',               schools: schools('qd_ni', 'Nishon') },
      { id: 'shahrisabz',  name: 'Shahrisabz Historic District',  schools: schools('qd_sh', 'Shahrisabz') },
      { id: 'yakkabog',    name: 'Yakkabag District',             schools: schools('qd_yk', 'Yakkabag') },
      { id: 'chiroqchi',   name: 'Chiroqchi District',            schools: schools('qd_cc', 'Chiroqchi') },
      { id: 'kukdala',     name: 'Kukdala District',              schools: schools('qd_kd', 'Kukdala') },
    ],
  },

  // ── 11. Surkhandarya ────────────────────────────────────────────────────
  {
    id: 'surxondaryo',
    name: 'Surkhandarya Region',
    type: 'Region',
    districts: [
      { id: 'termiz_city', name: 'Termez City',                    schools: schools('sx_tc', 'Termez City') },
      { id: 'angor',       name: 'Angor District',                 schools: schools('sx_an', 'Angor') },
      { id: 'bandixon',    name: 'Bandixon District',              schools: schools('sx_ba', 'Bandixon') },
      { id: 'boysun',      name: 'Boysun Cultural Reserve',        schools: schools('sx_bo', 'Boysun') },
      { id: 'denov',       name: 'Denov Trade District',           schools: schools('sx_de', 'Denov') },
      { id: 'jarqorgon',   name: 'Jarqorgon District',             schools: schools('sx_jq', 'Jarqorgon') },
      { id: 'qiziriq',     name: 'Qiziriq District',               schools: schools('sx_qz', 'Qiziriq') },
      { id: 'qumqorgon',   name: 'Qumqorgon District',             schools: schools('sx_qm', 'Qumqorgon') },
      { id: 'muzrabot',    name: 'Muzrabot District',              schools: schools('sx_mu', 'Muzrabot') },
      { id: 'oltinsoy',    name: 'Oltinsoy District',              schools: schools('sx_ol', 'Oltinsoy') },
      { id: 'sariosiyo',   name: 'Sariosiyo Mountain District',    schools: schools('sx_sa', 'Sariosiyo') },
      { id: 'sherobod',    name: 'Sherobod District',              schools: schools('sx_sh', 'Sherobod') },
      { id: 'shurchi',     name: 'Shurchi District',               schools: schools('sx_sc', 'Shurchi') },
      { id: 'termiz_d',    name: 'Termez District',                schools: schools('sx_td', 'Termez District') },
      { id: 'uzun',        name: 'Uzun Border District',           schools: schools('sx_uz', 'Uzun') },
    ],
  },

  // ── 12. Syrdarya ────────────────────────────────────────────────────────
  {
    id: 'sirdaryo',
    name: 'Syrdarya Region',
    type: 'Region',
    districts: [
      { id: 'guliston_city', name: 'Gulistan City',                  schools: schools('sd_gc', 'Gulistan City') },
      { id: 'oqoltin',       name: 'Oqoltin District',               schools: schools('sd_oq', 'Oqoltin') },
      { id: 'boyovut',       name: 'Boyovut District',               schools: schools('sd_by', 'Boyovut') },
      { id: 'guliston_d',    name: 'Gulistan District',              schools: schools('sd_gd', 'Gulistan District') },
      { id: 'xovos',         name: 'Xovos Rail Hub',                 schools: schools('sd_xv', 'Xovos') },
      { id: 'mirzaobod',     name: 'Mirzaobod District',             schools: schools('sd_mi', 'Mirzaobod') },
      { id: 'sardoba',       name: 'Sardoba Agricultural District',  schools: schools('sd_sa', 'Sardoba') },
      { id: 'sayxunobod',    name: 'Sayxunobod District',            schools: schools('sd_sy', 'Sayxunobod') },
      { id: 'shirin_c',      name: 'Shirin City Sector',             schools: schools('sd_sh', 'Shirin City') },
      { id: 'sirdaryo_d',    name: 'Syrdarya District',              schools: schools('sd_sd', 'Syrdarya District') },
      { id: 'yangiyer_c',    name: 'Yangiyer City Industrial',       schools: schools('sd_ye', 'Yangiyer') },
      { id: 'baxt_s',        name: 'Baxt Local Sector',              schools: schools('sd_bx', 'Baxt') },
      { id: 'malik_sd',      name: 'Malik Central Plain',            schools: schools('sd_ml', 'Malik Plain') },
      { id: 'paxtaobod_s',   name: 'Paxtaobod Sector',              schools: schools('sd_po', 'Paxtaobod') },
      { id: 'sardoba_h',     name: 'Sardoba Reservoir Sector',       schools: schools('sd_sr', 'Reservoir Zone') },
    ],
  },

  // ── 13. Khorezm ─────────────────────────────────────────────────────────
  {
    id: 'xorazm',
    name: 'Khorezm Region',
    type: 'Region',
    districts: [
      { id: 'urganch_city',  name: 'Urgench City',                schools: schools('kh_uc', 'Urgench City') },
      { id: 'bogot',         name: 'Bogot District',              schools: schools('kh_bo', 'Bogot') },
      { id: 'gurlan',        name: 'Gurlan District',             schools: schools('kh_gu', 'Gurlan') },
      { id: 'xonqa',         name: 'Xonqa District',              schools: schools('kh_xo', 'Xonqa') },
      { id: 'hazorasp',      name: 'Hazorasp District',           schools: schools('kh_ha', 'Hazorasp') },
      { id: 'khiva_d',       name: 'Khiva Oasis District',        schools: schools('kh_kd', 'Khiva District') },
      { id: 'qushkopir',     name: 'Qushkopir District',          schools: schools('kh_qk', 'Qushkopir') },
      { id: 'shovot',        name: 'Shovot District',             schools: schools('kh_sh', 'Shovot') },
      { id: 'urganch_d',     name: 'Urgench District',            schools: schools('kh_ud', 'Urgench District') },
      { id: 'yangiariq',     name: 'Yangiariq District',          schools: schools('kh_ya', 'Yangiariq') },
      { id: 'yangibozor',    name: 'Yangibozor District',         schools: schools('kh_yb', 'Yangibozor') },
      { id: 'tuproqqala',    name: 'Tuproqqala Fortress District',schools: schools('kh_tq', 'Tuproqqala') },
      { id: 'khiva_city',    name: 'Khiva Ancient City',          schools: schools('kh_kc', 'Khiva City') },
      { id: 'shovot_canal',  name: 'Shovot Canal Banks',          schools: schools('kh_sc', 'Canal Sector') },
      { id: 'gurlan_north',  name: 'Gurlan Northern Sector',      schools: schools('kh_gn', 'North Gurlan') },
    ],
  },

  // ── 14. Tashkent City (Capital) ─────────────────────────────────────────
  {
    id: 'tashkent_city',
    name: 'Tashkent City (Capital)',
    type: 'Capital',
    districts: [
      { id: 'almazar',       name: 'Almazar District',              schools: schools('tc_az', 'Almazar') },
      { id: 'bektemir',      name: 'Bektemir District',             schools: schools('tc_bt', 'Bektemir') },
      { id: 'chilonzor',     name: 'Chilanzar District',            schools: schools('tc_cz', 'Chilanzar') },
      { id: 'mirobod',       name: 'Mirobod District',              schools: schools('tc_mb', 'Mirobod') },
      { id: 'mirzo_ulugbek', name: 'Mirzo Ulugbek District',        schools: schools('tc_mu', 'Mirzo Ulugbek', { 0: 'Presidential School in Tashkent' }) },
      { id: 'sergeli',       name: 'Sergeli District',              schools: schools('tc_sg', 'Sergeli') },
      { id: 'shayxontohur',  name: 'Shaykhantahur District',        schools: schools('tc_st', 'Shaykhantahur') },
      { id: 'olmazor_v',     name: 'Old City Olmazor Hub',          schools: schools('tc_ov', 'Old City') },
      { id: 'uchtepa',       name: 'Uchtepa District',              schools: schools('tc_ut', 'Uchtepa') },
      { id: 'yakkasaroy',    name: 'Yakkasaray District',           schools: schools('tc_ys', 'Yakkasaray') },
      { id: 'yashnobod',     name: 'Yashnobod District',            schools: schools('tc_yn', 'Yashnobod') },
      { id: 'yunusobod',     name: 'Yunusabad District',            schools: schools('tc_yb', 'Yunusabad') },
      { id: 'yangihayot',    name: 'Yangihayot Industrial District',schools: schools('tc_yh', 'Yangihayot') },
      { id: 'navoiy_ave',    name: 'Navoiy Avenue Center',          schools: schools('tc_na', 'Central Avenue') },
      { id: 'orda_hub',      name: "O'rda Historical Sector",       schools: schools('tc_oh', "O'rda") },
    ],
  },
]

// ─── Derived lookup helpers (used by UI components) ──────────────────────────

/** All region names in display order */
export const geoRegionNames: string[] = uzbekistanGeography.map((r) => r.name)

/** O(1) lookup: region name → GeoRegion */
export const geoRegionByName: Record<string, GeoRegion> = Object.fromEntries(
  uzbekistanGeography.map((r) => [r.name, r])
)

/** O(1) lookup: region id → GeoRegion */
export const geoRegionById: Record<string, GeoRegion> = Object.fromEntries(
  uzbekistanGeography.map((r) => [r.id, r])
)

/** Get districts for a region name */
export function getDistrictsByRegion(regionName: string): GeoDistrict[] {
  return geoRegionByName[regionName]?.districts ?? []
}

/** Get schools for a district name within a region */
export function getSchoolsByDistrict(regionName: string, districtName: string): GeoSchool[] {
  const region = geoRegionByName[regionName]
  const district = region?.districts.find((d) => d.name === districtName)
  return district?.schools ?? []
}

/** Default initial values for the cascading selectors */
export const GEO_DEFAULTS = {
  region:   uzbekistanGeography[1].name,                          // 'Jizzakh Region'
  district: uzbekistanGeography[1].districts[6].name,            // 'Sharof Rashidov District'
  school:   uzbekistanGeography[1].districts[6].schools[0].name, // first school
} as const

/** Localize region name based on settings (returns UZ/EN representation) */
export function getLocalizedRegionName(regionName: string, lang: 'en' | 'uz'): string {
  if (lang === 'uz') {
    switch (regionName) {
      case 'Republic of Karakalpakstan':
        return "Qoraqalpog'iston Respublikasi"
      case 'Tashkent City (Capital)':
        return "Toshkent shahri (Poytaxt)"
      default:
        return regionName
          .replace('Region', 'viloyati')
          .replace('Tashkent', 'Toshkent')
          .replace('Jizzakh', 'Jizzax')
          .replace('Samarkand', 'Samarqand')
          .replace('Bukhara', 'Buxoro')
          .replace('Syrdarya', 'Sirdaryo')
          .replace('Namangan', 'Namangan')
          .replace('Surkhandarya', 'Surxondaryo')
          .replace('Andijan', 'Andijon')
          .replace('Kashkadarya', 'Qashqadaryo')
          .replace('Fergana', 'Farg\'ona')
          .replace('Navoi', 'Navoiy')
          .replace('Khorezm', 'Xorazm')
    }
  }
  return regionName
}

/** Localize district name based on settings (returns UZ/EN representation) */
export function getLocalizedDistrictName(districtName: string, lang: 'en' | 'uz'): string {
  if (lang === 'uz') {
    let name = districtName
      .replace('Specialized District', 'maxsus tumani')
      .replace('District', 'tumani')
      .replace('City Division', 'shahri')
      .replace('City', 'shahri')
      .replace('Region Hub', 'hududiy markazi')
      .replace('Micro-District', 'mitti-tumani')

    name = name
      .replace('Amudarya', 'Amudaryo')
      .replace('Beruniy', 'Beruniy')
      .replace('Chimboy', 'Chimboy')
      .replace('Ellikqala', 'Ellikqal\'a')
      .replace('Kegeyli', 'Kegeyli')
      .replace('Muynak', 'Mo\'ynoq')
      .replace('Kungrad', 'Qo\'ng\'irot')
      .replace('Kanlykul', 'Qonliko\'l')
      .replace('Karauzyak', 'Qorao\'zak')
      .replace('Shumanay', 'Shumanay')
      .replace('Takhtakupir', 'Taxtako\'pir')
      .replace('Turtkul', 'To\'rtko\'l')
      .replace('Khojeyli', 'Xo\'jayli')
      .replace('Bozatau', 'Bo\'zatov')
      .replace('Pakhtakor', 'Paxtakor')
      .replace('Arnasoy', 'Arnasoy')
      .replace('Bakhmal', 'Baxmal')
      .replace('Dustlik', 'Do\'stlik')
      .replace('Forish', 'Forish')
      .replace('Gallaorol', 'G\'allaorol')
      .replace('Mirzachol', 'Mirzacho\'l')
      .replace('Yangiobod', 'Yangiobod')
      .replace('Zaamin', 'Zomin')
      .replace('Zafarobod', 'Zafarobod')
      .replace('Zarbdor', 'Zarbdor')
      .replace('Jizzakh', 'Jizzax')
      .replace('Yunusobod', 'Yunusobod')
      .replace('Urgut', 'Urgut')
      .replace('Sharof Rashidov', 'Sharof Rashidov')

    return name
  }
  return districtName
}

