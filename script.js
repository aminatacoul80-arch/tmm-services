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

  // ---------- Hero : l'alternateur se démonte au défilement, la caméra s'approche puis recule ----------
  // 48 images rendues dans Blender (assets/alternateur/l : 1600 px, m : 900 px) ;
  // etiquettes.json donne, pour chaque image, la position des pièces (0 à 1 dans l'image).
  // Toutes les coordonnées ci-dessous sont en pixels d'une image de 1600 × 800.
  (function () {
    var story = document.getElementById('eclate');
    var canvas = document.getElementById('eclate-canvas');
    var still = document.getElementById('eclate-img');
    var layer = document.getElementById('eclate-labels');
    var bar = document.getElementById('eclate-prog');
    var state = document.getElementById('eclate-state');
    var chaps = story ? story.querySelectorAll('.chap') : [];
    var dots = document.querySelectorAll('#eclate-index button');
    if (!story || !canvas.getContext || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var N = 48, W = 1600, H = 800, px = innerWidth * (devicePixelRatio || 1);
    var dir = 'assets/alternateur/' + (px > 900 ? 'l' : 'm') + '/';
    var noms = [['poulie', 'Poulie'], ['flasque-avant', 'Flasque avant'], ['stator', 'Stator'], ['rotor', 'Rotor'], ['flasque-arriere', 'Flasque arrière'], ['regulateur', 'Régulateur']];
    var ctx = canvas.getContext('2d'), frames = [], pos = null, lbls = [], cur = 0, target = 0, last = '', chap = -1;

    // Chapitres : début de chaque chapitre dans le défilement (0 à 1)
    var DEBUTS = [0, 0.24, 0.52, 0.8];
    var ETATS = ['Faites défiler', 'Démontage', 'Gros plan', 'Chaque pièce se contrôle'];
    // Démontage : de l'image 0 à 47 entre ces deux points du défilement
    var DEMONTE = [0.16, 0.5];
    // Caméra : [défilement, centre x, centre y, zoom] ; zoom 1 = vue éclatée entière
    var CAM = [
      [0.00, 1100, 410, 1.45],
      [0.16, 1090, 395, 1.6],
      [0.50, 850, 420, 1.0],
      [0.60, 690, 330, 2.5],
      [0.72, 690, 330, 2.7],
      [0.82, 850, 420, 1.0],
      [1.00, 850, 420, 1.0]
    ];
    // Étiquettes visibles par chapitre
    var VISIBLES = [[], [], ['stator', 'rotor'], ['poulie', 'flasque-avant', 'stator', 'rotor', 'flasque-arriere', 'regulateur']];

    for (var i = 0; i < N; i++) {
      frames[i] = new Image();
      frames[i].decoding = 'async';
      frames[i].src = dir + (i < 10 ? '0' : '') + i + '.webp';
    }
    frames[0].onload = function () { canvas.hidden = false; still.hidden = true; last = ''; };

    layer.innerHTML = noms.map(function (n, k) {
      return '<span class="eclate-lbl' + (k % 2 ? ' eclate-lbl--bas' : '') + '"><span class="eclate-lbl__tag"><b>0' + (k + 1) + '</b><span>' +
        esc(n[1]) + '</span></span><span class="eclate-lbl__line"></span><span class="eclate-lbl__dot"></span></span>';
    }).join('');
    lbls = layer.children;
    fetch('assets/alternateur/etiquettes.json').then(function (r) { return r.json(); }).then(function (d) { pos = d.etiquettes; last = ''; }).catch(function () {});

    function clamp(v) { return Math.min(1, Math.max(0, v)); }
    function lisse(t) { return t * t * (3 - 2 * t); }
    function span() { var s = story.offsetHeight - innerHeight; return s > 0 ? s : 1; }
    function progress() { return clamp(-story.getBoundingClientRect().top / span()); }

    // Caméra au point p du défilement : interpolation douce entre les clés
    function camera(p) {
      for (var i = 1; i < CAM.length; i++) {
        if (p <= CAM[i][0]) {
          var a = CAM[i - 1], b = CAM[i], t = lisse(clamp((p - a[0]) / (b[0] - a[0])));
          return [a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t, a[3] + (b[3] - a[3]) * t];
        }
      }
      var z = CAM[CAM.length - 1]; return [z[1], z[2], z[3]];
    }
    // Où l'objet se place à l'écran, et à quelle taille la vue éclatée entière (1060 × 540) tient
    function cadre(cw, ch) {
      if (cw < 760) return { x: cw * 0.5, y: ch * 0.68, s: Math.min(cw * 0.94 / 1060, ch * 0.4 / 540) };
      return { x: cw * 0.62, y: ch * 0.5, s: Math.min(cw * 0.56 / 1060, ch * 0.7 / 540) };
    }

    function setChap(c) {
      if (c === chap) return;
      chap = c;
      for (var i = 0; i < chaps.length; i++) {
        chaps[i].classList.toggle('is-on', i === c);
        if (i === c) chaps[i].removeAttribute('inert'); else chaps[i].setAttribute('inert', '');
      }
      for (var j = 0; j < dots.length; j++) {
        if (j === c) dots[j].setAttribute('aria-current', 'step'); else dots[j].removeAttribute('aria-current');
      }
      state.textContent = ETATS[c];
    }

    function paint(p) {
      var f = Math.round(clamp((p - DEMONTE[0]) / (DEMONTE[1] - DEMONTE[0])) * (N - 1));
      var img = frames[f];
      if (!img.complete || !img.naturalWidth) { for (var k = f; k >= 0; k--) if (frames[k].complete && frames[k].naturalWidth) { img = frames[k]; f = k; break; } }
      var cw = canvas.clientWidth, ch = canvas.clientHeight, dpr = devicePixelRatio || 1;
      var cam = camera(p), fr = cadre(cw, ch), s = fr.s * cam[2];
      var ox = fr.x - cam[0] * s, oy = fr.y - cam[1] * s;
      var cle = f + '|' + ox.toFixed(1) + '|' + oy.toFixed(1) + '|' + s.toFixed(4) + '|' + cw + '|' + ch;
      if (cle !== last) {
        if (canvas.width !== Math.round(cw * dpr) || canvas.height !== Math.round(ch * dpr)) { canvas.width = Math.round(cw * dpr); canvas.height = Math.round(ch * dpr); }
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, cw, ch);
        ctx.imageSmoothingQuality = 'high';
        if (img.naturalWidth) ctx.drawImage(img, ox, oy, W * s, H * s);
        last = cle;
      }
      var c = 0;
      for (var i = DEBUTS.length - 1; i >= 0; i--) if (p >= DEBUTS[i]) { c = i; break; }
      setChap(c);
      for (var j = 0; j < lbls.length; j++) {
        var on = pos && VISIBLES[c].indexOf(noms[j][0]) >= 0;
        lbls[j].style.opacity = on ? 1 : 0;
        if (pos) { var q = pos[f][noms[j][0]]; lbls[j].style.left = (ox + q[0] * W * s) + 'px'; lbls[j].style.top = (oy + q[1] * H * s) + 'px'; }
      }
      bar.style.transform = 'scaleX(' + p.toFixed(3) + ')';
    }

    // Index 01-04 : aller au milieu d'un chapitre
    Array.prototype.forEach.call(dots, function (d, i) {
      d.addEventListener('click', function () {
        var fin = i + 1 < DEBUTS.length ? DEBUTS[i + 1] : 1, p = i === 0 ? 0 : (DEBUTS[i] + fin) / 2;
        scrollTo({ top: story.getBoundingClientRect().top + scrollY + p * span(), behavior: 'smooth' });
      });
    });
    // Lissage : l'image suit le défilement sans à-coups
    function loop() { target = progress(); cur += (target - cur) * 0.15; if (Math.abs(target - cur) < 0.0005) cur = target; paint(cur); requestAnimationFrame(loop); }
    // Test : ?p=0.5 fige l'animation à mi-course pour les captures
    var fixed = new URLSearchParams(location.search).get('p');
    if (fixed !== null) { var go = function () { paint(+fixed); requestAnimationFrame(go); }; go(); return; }
    loop();
  })();

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

  // ---------- Carte OpenStreetMap : Kati et Bamako ----------
  var carte = document.getElementById('carte');
  if (carte && window.L) {
    carte.innerHTML = '';
    var map = L.map(carte, { scrollWheelZoom: false });
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">contributeurs OpenStreetMap</a>'
    }).addTo(map);
    var lieux = [
      { nom: 'Kati', texte: 'Base de l’équipe TMM', pos: [12.7445, -8.0729] },
      { nom: 'Bamako', texte: 'Intervention mobile', pos: [12.6392, -8.0029] }
    ];
    var points = lieux.map(function (l) {
      L.marker(l.pos, {
        title: l.nom,
        icon: L.divIcon({ className: '', html: '<span class="map-pin"><span class="map-pin__dot"></span><span class="map-pin__label">' + l.nom + '</span></span>' })
      }).addTo(map).bindPopup('<strong>' + l.nom + '</strong><br>' + l.texte);
      return l.pos;
    });
    L.polyline(points, { color: '#e3141f', weight: 3, dashArray: '6 8' }).addTo(map);
    map.fitBounds(points, { padding: [60, 60] });
  }
})();
