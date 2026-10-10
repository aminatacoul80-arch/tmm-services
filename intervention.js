(function () {
  'use strict';

  var NUMERO = '22370190719';
  var CLE = 'tmm-demande-intervention';

  // ---------- Choix proposés ----------
  var problemes = [
    { id: 'voyant', icon: 'ph-warning-circle', label: 'Voyant allumé' },
    { id: 'demarre', icon: 'ph-engine', label: 'Ne démarre pas' },
    { id: 'batterie', icon: 'ph-battery-warning', label: 'Batterie ou charge' },
    { id: 'clim', icon: 'ph-snowflake', label: 'Climatisation' },
    { id: 'bruit', icon: 'ph-waveform', label: 'Bruit ou vibration' },
    { id: 'entretien', icon: 'ph-drop', label: 'Entretien, vidange' },
    { id: 'diagnostic', icon: 'ph-cpu', label: 'Diagnostic complet' },
    { id: 'cle', icon: 'ph-key', label: 'Clé ou télécommande' },
    { id: 'hybride', icon: 'ph-lightning', label: 'Hybride ou électrique' },
    { id: 'autre', icon: 'ph-dots-three-circle', label: 'Autre' }
  ];
  var choix = {
    moteur: [['essence', 'Essence'], ['diesel', 'Diesel'], ['hybride', 'Hybride'], ['electrique', 'Électrique'], ['inconnu', 'Je ne sais pas']],
    ville: [['Bamako', 'Bamako'], ['Kati', 'Kati'], ['autre', 'Ailleurs']],
    quand: [['vite', 'Dès que possible'], ['aujourdhui', "Aujourd'hui"], ['semaine', 'Cette semaine'], ['rdv', 'À convenir']],
    roule: [['oui', 'Oui'], ['non', 'Non, immobilisé']]
  };
  var textes = {
    moteur: { essence: 'essence', diesel: 'diesel', hybride: 'hybride', electrique: 'électrique', inconnu: 'motorisation inconnue' },
    quand: { vite: 'dès que possible', aujourdhui: "aujourd'hui", semaine: 'cette semaine', rdv: 'à convenir ensemble' }
  };
  // D'où vient la personne : ?src=facebook, instagram, tiktok, whatsapp, linkedin…
  var sources = { facebook: 'Facebook', fb: 'Facebook', instagram: 'Instagram', ig: 'Instagram', tiktok: 'TikTok', tt: 'TikTok', whatsapp: 'WhatsApp (statut)', wa: 'WhatsApp (statut)', linkedin: 'LinkedIn', li: 'LinkedIn', qr: 'QR code', site: 'le site' };
  var params = new URLSearchParams(location.search);
  var etatDemo = params.get('etat') || params.get('state');
  var source = sources[(params.get('src') || '').toLowerCase()] || null;

  // ---------- État (gardé dans le navigateur en cas de coupure) ----------
  var etat = { problemes: [], moteur: '', ville: '', quand: '', roule: '', vehicule: '', annee: '', quartier: '', details: '', nom: '' };
  try { Object.assign(etat, JSON.parse(localStorage.getItem(CLE) || '{}')); } catch (e) { /* brouillon illisible : on repart de zéro */ }
  function garder() { if (etatDemo) return; try { localStorage.setItem(CLE, JSON.stringify(etat)); } catch (e) { /* stockage plein ou refusé */ } }

  var form = document.getElementById('iv-form');

  // ---------- Construction des contrôles ----------
  var chipsBox = document.getElementById('problemes');
  problemes.forEach(function (p) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'iv-chip';
    b.dataset.id = p.id;
    b.setAttribute('aria-pressed', 'false');
    b.innerHTML = '<i class="ph-duotone ' + p.icon + '" aria-hidden="true"></i><span></span><span class="iv-chip__check" aria-hidden="true"><i class="ph-bold ph-check"></i></span>';
    b.querySelector('span').textContent = p.label;
    b.addEventListener('click', function () {
      var i = etat.problemes.indexOf(p.id);
      if (i === -1) etat.problemes.push(p.id); else etat.problemes.splice(i, 1);
      document.getElementById('probleme-error').hidden = true;
      maj();
    });
    chipsBox.appendChild(b);
  });

  document.querySelectorAll('.iv-seg').forEach(function (seg) {
    var nom = seg.dataset.name;
    if (choix[nom].length > 3) seg.classList.add('iv-seg--wrap');
    var plaque = document.createElement('span');
    plaque.className = 'iv-seg__plate';
    plaque.setAttribute('aria-hidden', 'true');
    seg.appendChild(plaque);
    choix[nom].forEach(function (c, k) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('role', 'radio');
      b.dataset.value = c[0];
      b.textContent = c[1];
      b.addEventListener('click', function () {
        etat[nom] = etat[nom] === c[0] ? '' : c[0];
        maj();
      });
      b.addEventListener('keydown', function (e) {
        var btns = seg.querySelectorAll('button');
        var d = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
        if (!d) return;
        e.preventDefault();
        var n = btns[(k + d + btns.length) % btns.length];
        n.focus(); n.click();
      });
      seg.appendChild(b);
    });
  });

  ['vehicule', 'annee', 'quartier', 'details', 'nom'].forEach(function (n) {
    var f = form.elements[n];
    f.value = etat[n] || '';
    f.addEventListener('input', function () {
      if (n === 'annee') f.value = f.value.replace(/\D/g, '').slice(0, 4);
      etat[n] = f.value;
      maj();
    });
  });

  // La plaque glisse sous l'option choisie ; placée sans animation au premier affichage et au redimensionnement
  function placerPlaques(sansAnim) {
    document.querySelectorAll('.iv-seg').forEach(function (seg) {
      var plaque = seg.querySelector('.iv-seg__plate');
      var actif = seg.querySelector('button[aria-checked="true"]');
      if (sansAnim) seg.classList.add('no-anim');
      if (actif) {
        plaque.style.width = actif.offsetWidth + 'px';
        plaque.style.height = actif.offsetHeight + 'px';
        plaque.style.top = actif.offsetTop + 'px';
        plaque.style.bottom = 'auto';
        plaque.style.transform = 'translateX(' + actif.offsetLeft + 'px)';
        seg.classList.add('is-set');
      } else seg.classList.remove('is-set');
      if (sansAnim) { void plaque.offsetWidth; seg.classList.remove('no-anim'); }
    });
  }

  // ---------- Message ----------
  function lignes() {
    var L = [];
    var probs = problemes.filter(function (p) { return etat.problemes.indexOf(p.id) !== -1; }).map(function (p) { return p.label.toLowerCase(); });
    L.push({ k: 'intro', t: 'Bonjour TMM Services, je souhaite une intervention.' });
    L.push({ k: 'probleme', t: probs.length ? '• Problème : ' + probs.join(', ') : null, vide: '• Problème : …' });
    var v = etat.vehicule.trim();
    var vehicule = [v, etat.annee.length === 4 ? etat.annee : ''].filter(Boolean).join(' ');
    var moteur = etat.moteur ? textes.moteur[etat.moteur] : '';
    L.push({ k: 'vehicule', t: vehicule || moteur ? '• Véhicule : ' + (vehicule || 'non précisé') + (moteur ? ' (' + moteur + ')' : '') : null, vide: '• Véhicule : …' });
    var ville = etat.ville === 'autre' ? 'hors de Bamako et Kati' : etat.ville;
    var lieu = [ville, etat.quartier.trim()].filter(Boolean).join(', ');
    L.push({ k: 'lieu', t: lieu ? '• Lieu : ' + lieu : null, vide: '• Lieu : …' });
    var quand = etat.quand ? textes.quand[etat.quand] : '';
    var roule = etat.roule === 'non' ? 'le véhicule ne roule pas' : etat.roule === 'oui' ? 'le véhicule roule' : '';
    var q = [quand, roule].filter(Boolean);
    L.push({ k: 'quand', t: q.length ? '• Quand : ' + q.join(' ; ') : null, vide: '• Quand : …' });
    if (etat.details.trim()) L.push({ k: 'details', t: '• Détails : ' + etat.details.trim() });
    if (etat.nom.trim()) L.push({ k: 'nom', t: 'Je m’appelle ' + etat.nom.trim() + '.' });
    if (source) L.push({ k: 'source', t: '(Demande faite depuis le site, vu sur ' + source + ')' });
    return L;
  }
  function message() {
    return lignes().filter(function (l) { return l.t; }).map(function (l) { return l.t; }).join('\n');
  }

  var precedent = {};
  var textBox = document.getElementById('iv-text');
  function rendreApercu(anime) {
    textBox.textContent = '';
    lignes().forEach(function (l) {
      var s = document.createElement('span');
      s.className = 'ln' + (l.t ? '' : ' ph-txt');
      s.textContent = l.t || l.vide;
      if (anime && l.t && precedent[l.k] !== l.t) s.classList.add('is-new');
      precedent[l.k] = l.t;
      textBox.appendChild(s);
    });
  }

  // ---------- Mise à jour générale ----------
  var premier = true;
  function maj() {
    chipsBox.querySelectorAll('.iv-chip').forEach(function (b) {
      b.setAttribute('aria-pressed', String(etat.problemes.indexOf(b.dataset.id) !== -1));
    });
    document.querySelectorAll('.iv-seg').forEach(function (seg) {
      seg.querySelectorAll('button').forEach(function (b) {
        var on = etat[seg.dataset.name] === b.dataset.value;
        b.setAttribute('aria-checked', String(on));
        b.tabIndex = on || (!etat[seg.dataset.name] && b === seg.querySelector('button')) ? 0 : -1;
      });
    });
    var steps = form.querySelectorAll('.iv-step');
    steps[0].classList.toggle('is-done', etat.problemes.length > 0);
    steps[1].classList.toggle('is-done', !!(etat.vehicule.trim() || etat.moteur));
    steps[2].classList.toggle('is-done', !!(etat.ville || etat.quartier.trim()));
    steps[3].classList.toggle('is-done', !!(etat.quand || etat.roule));
    steps[4].classList.toggle('is-done', !!(etat.details.trim() || etat.nom.trim()));
    placerPlaques(premier);
    rendreApercu(!premier);
    document.getElementById('iv-bubble').classList.remove('is-sent');
    document.getElementById('iv-done').hidden = true;
    premier = false;
    garder();
  }

  // ---------- Envoi ----------
  var envoi = document.getElementById('iv-send');
  envoi.addEventListener('click', function () {
    if (!etat.problemes.length) {
      var step = document.getElementById('step-probleme');
      document.getElementById('probleme-error').hidden = false;
      step.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
      step.classList.remove('is-shake'); void step.offsetWidth; step.classList.add('is-shake');
      setTimeout(function () { chipsBox.querySelector('.iv-chip').focus({ preventScroll: true }); }, 350);
      return;
    }
    envoi.classList.remove('is-pop'); void envoi.offsetWidth; envoi.classList.add('is-pop');
    var bulle = document.getElementById('iv-bubble');
    bulle.classList.remove('is-sent'); void bulle.offsetWidth; bulle.classList.add('is-sent');
    document.getElementById('iv-done').hidden = false;
    window.open('https://wa.me/' + NUMERO + '?text=' + encodeURIComponent(message()), '_blank', 'noopener');
  });

  document.getElementById('iv-reset').addEventListener('click', function () {
    etat = { problemes: [], moteur: '', ville: '', quand: '', roule: '', vehicule: '', annee: '', quartier: '', details: '', nom: '' };
    ['vehicule', 'annee', 'quartier', 'details', 'nom'].forEach(function (n) { form.elements[n].value = ''; });
    try { localStorage.removeItem(CLE); } catch (e) { /* rien */ }
    maj();
  });

  // Heure affichée dans la bulle
  var h = new Date();
  document.getElementById('iv-time').textContent = String(h.getHours()).padStart(2, '0') + ':' + String(h.getMinutes()).padStart(2, '0');

  window.addEventListener('resize', function () { placerPlaques(true); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { placerPlaques(true); });

  // Entrée : une seule fois, dans l'ordre de lecture
  var reduit = matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('[data-enter]').forEach(function (el, i) { el.style.setProperty('--i', i); });
  if (!reduit) {
    document.body.classList.add('iv-enter');
    requestAnimationFrame(function () { requestAnimationFrame(function () {
      document.body.classList.add('iv-entered');
      setTimeout(function () { document.body.classList.remove('iv-enter', 'iv-entered'); }, 1200);
    }); });
  }

  // Ouverture directe d'un état (pour les captures) : ?etat=rempli
  if (etatDemo === 'rempli') {
    Object.assign(etat, { problemes: ['voyant', 'demarre'], vehicule: 'Toyota Corolla', annee: '2014', moteur: 'essence', ville: 'Bamako', quartier: 'Kalaban Coura', quand: 'vite', roule: 'non' });
    ['vehicule', 'annee', 'quartier'].forEach(function (n) { form.elements[n].value = etat[n]; });
  }

  maj();
})();
