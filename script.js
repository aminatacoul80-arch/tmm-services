(function () {
  'use strict';

  // ---------- Contenu ----------
  var U = function (photo) { return 'https://images.unsplash.com/' + photo + '?auto=format&fit=crop&q=80&w=1400'; };
  var W = function (f) { return 'https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURIComponent(f) + '?width=1400'; };

  var highlights = [
    { icon: 'ph-van', title: 'Intervention mobile', sub: 'À domicile, au travail, sur la route' },
    { icon: 'ph-lightning', title: 'Hybride & électrique', sub: 'Batterie, onduleur, recharge' },
    { icon: 'ph-cpu', title: 'Diagnostic électronique', sub: 'Valise OBD multimarque' },
    { icon: 'ph-chats-circle', title: 'Conseil technique', sub: 'Avant chaque intervention' }
  ];

  var services = [
    { icon: 'ph-magnifying-glass', title: 'Inspection', sub: 'Contrôle général du véhicule' },
    { icon: 'ph-monitor', title: 'Diagnostic', sub: 'Lecture et effacement des défauts' },
    { icon: 'ph-drop', title: 'Maintenance', sub: 'Vidange, filtres, entretien' },
    { icon: 'ph-wrench', title: 'Réparation', sub: 'Mécanique et électronique' },
    { icon: 'ph-snowflake', title: 'Climatisation', sub: 'Recharge et dépannage' },
    { icon: 'ph-key', title: 'Programmation clé', sub: 'Transpondeurs et télécommandes' },
    { icon: 'ph-cpu', title: 'Programmation ECU', sub: 'Calculateurs moteur' },
    { icon: 'ph-headset', title: 'Assistance technique', sub: 'Conseil aux particuliers et flottes' }
  ];

  var evServices = [
    { icon: 'ph-battery-charging', title: 'Batterie haute tension', sub: 'Diagnostic de l’état de santé, équilibrage des cellules, contrôle du refroidissement.' },
    { icon: 'ph-cpu', title: 'Onduleur et moteur électrique', sub: 'Lecture des défauts du calculateur de puissance et contrôle du moteur de traction.' },
    { icon: 'ph-plug-charging', title: 'Recharge', sub: 'Chargeur embarqué, prise et câble de recharge, conseil sur la borne à domicile.' },
    { icon: 'ph-engine', title: 'Système hybride', sub: 'Passage thermique/électrique, entretien du moteur essence et de la batterie hybride.' },
    { icon: 'ph-snowflake', title: 'Climatisation électrique', sub: 'Compresseur électrique et gestion thermique, essentielle sous la chaleur du Mali.' },
    { icon: 'ph-shield-check', title: 'Sécurité haute tension', sub: 'Mise hors tension et consignation avant toute intervention sur le véhicule.' }
  ];

  var checks = ['Lecture des codes de défaut', 'Effacement des codes après réparation', 'Données moteur en direct', 'Calculateurs moteur (ECU)', 'Antidémarrage et clés', 'Capteurs et faisceaux électriques', 'Systèmes hybrides et électriques'];

  var mobility = [
    { icon: 'ph-house', name: 'À domicile', use: 'Sur rendez-vous, devant chez vous' },
    { icon: 'ph-buildings', name: 'Sur votre lieu de travail', use: 'Pendant que vous travaillez' },
    { icon: 'ph-road-horizon', name: 'Panne sur la route', use: 'Véhicule immobilisé à Bamako ou à Kati' },
    { icon: 'ph-toolbox', name: 'Matériel embarqué', use: 'Valise OBD, programmateurs de clés et ECU' }
  ];

  var gallery = [
    { label: 'Programmation d’une clé', src: 'assets/v2-gal-1.webp' },
    { label: 'Lecture des codes de défaut', src: W('OBD2 computer scan results.jpeg') },
    { label: 'Vidange et lubrifiants', src: 'assets/v2-gal-3.webp' },
    { label: 'Données moteur sur valise OBD', src: W('OBD2 Datenanzeigee.JPG') },
    { label: 'Contrôle du compartiment moteur', src: U('photo-1587004461511-ded665a2e4b9') },
    { label: 'Clé de véhicule premium', src: 'assets/v2-gal-6.webp' }
  ];

  var brands = ['Toyota', 'Mercedes-Benz', 'Peugeot', 'Renault', 'Hyundai', 'Kia', 'Nissan', 'Mitsubishi', 'Ford', 'Volkswagen', 'BYD', 'Tesla'];
  var customLogos = {
    'Mercedes-Benz': 'https://commons.wikimedia.org/wiki/Special:FilePath/Mercedes-Logo.svg?width=200',
    'BYD': 'https://commons.wikimedia.org/wiki/Special:FilePath/BYD_Company,_Ltd._-_Logo.svg?width=200'
  };

  // ---------- Rendu ----------
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function fill(id, items, tpl) {
    var el = document.getElementById(id);
    if (el) el.innerHTML = items.map(tpl).join('');
  }

  fill('highlights', highlights, function (h) {
    return '<div class="highlight"><i class="ph-duotone ' + h.icon + '"></i><span class="highlight__text">' +
      '<span class="highlight__title">' + esc(h.title) + '</span><span class="highlight__sub">' + esc(h.sub) + '</span></span></div>';
  });
  fill('services-grid', services, function (s) {
    return '<div class="service"><i class="ph-duotone ' + s.icon + '"></i><span class="service__title">' + esc(s.title) +
      '</span><span class="service__sub">' + esc(s.sub) + '</span></div>';
  });
  fill('ev-grid', evServices, function (s) {
    return '<div class="ev-card"><i class="ph-duotone ' + s.icon + '"></i><span class="ev-card__title">' + esc(s.title) +
      '</span><span class="ev-card__sub">' + esc(s.sub) + '</span></div>';
  });
  fill('checks', checks, function (c) {
    return '<span class="check"><i class="ph-duotone ph-check-circle"></i>' + esc(c) + '</span>';
  });
  fill('mobility', mobility, function (e) {
    return '<div class="equip"><i class="ph-duotone ' + e.icon + '"></i><span class="equip__text"><span class="equip__name">' +
      esc(e.name) + '</span><span class="equip__use">' + esc(e.use) + '</span></span></div>';
  });
  fill('gallery', gallery, function (g) {
    return '<figure><img class="cover" src="' + esc(g.src) + '" alt="' + esc(g.label) + '" loading="lazy">' +
      '<figcaption>' + esc(g.label) + '</figcaption></figure>';
  });
  fill('brands', brands, function (name) {
    var logo = customLogos[name] || ('https://cdn.simpleicons.org/' + name.toLowerCase().replace(/[^a-z0-9]/g, '') + '/ffffff');
    return '<div class="brand-card"><span class="brand-card__logo" role="img" aria-label="Logo ' + esc(name) +
      '" style="background-image:url(\'' + logo + '\')"></span><span class="brand-card__name">' + esc(name) + '</span></div>';
  });

  // ---------- Images introuvables : masquées plutôt qu'affichées cassées ----------
  document.addEventListener('error', function (e) {
    var t = e.target;
    if (t.tagName === 'IMG' && t.id !== 'diag-img') t.style.visibility = 'hidden';
  }, true);

  // ---------- Menu mobile ----------
  var btn = document.querySelector('.menu-btn');
  var mnav = document.getElementById('mobile-nav');
  function setMenu(open) {
    mnav.hidden = !open;
    btn.setAttribute('aria-expanded', String(open));
    btn.querySelector('i').className = 'ph-duotone ' + (open ? 'ph-x' : 'ph-list');
  }
  btn.addEventListener('click', function () { setMenu(mnav.hidden); });
  mnav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  window.addEventListener('resize', function () { if (window.innerWidth >= 760) setMenu(false); });

  // ---------- Vidéo hero (optionnelle) ----------
  var heroVideo = document.getElementById('hero-video');
  var heroSrc = (heroVideo.getAttribute('data-video') || '').trim();
  if (heroSrc) {
    heroVideo.muted = true;
    heroVideo.src = heroSrc;
    heroVideo.addEventListener('loadeddata', function () {
      heroVideo.hidden = false;
      document.getElementById('hero-img').hidden = true;
    });
    heroVideo.play().catch(function () {});
  }

  // ---------- Vidéo diagnostic : extrait de 15 s en boucle ----------
  var diag = document.getElementById('diag-video');
  var diagImg = document.getElementById('diag-img');
  var start = Number(diag.getAttribute('data-start')) || 0;
  var len = Number(diag.getAttribute('data-length')) || 15;
  function restart() { diag.muted = true; diag.currentTime = start; diag.play().catch(function () {}); }
  diag.addEventListener('loadedmetadata', restart);
  diag.addEventListener('ended', restart);
  diag.addEventListener('timeupdate', function () {
    if (diag.currentTime >= start + len || diag.currentTime < start) restart();
  });
  diag.addEventListener('error', function () { diag.hidden = true; diagImg.hidden = false; });
})();
