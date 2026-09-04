(function(){
  'use strict';

  const $  = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

  
  function boot(){
    if (window.createIcons) createIcons();
    $('#year').textContent = new Date().getFullYear();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();

  
  const progress = $('#progress');
  function onScrollProgress(){
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    progress.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
  }
  window.addEventListener('scroll', onScrollProgress, { passive:true });
  onScrollProgress();

  
  const nav = $('#nav'), burger = $('#nav-burger'), navMobile = $('#nav-mobile');
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 30), { passive:true });

  burger.addEventListener('click', () => navMobile.classList.toggle('open'));
  $$('#nav-mobile a').forEach(a => a.addEventListener('click', () => navMobile.classList.remove('open')));


  const navLinks = $$('#nav-links a');
  const sectionIO = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting){
        navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id));
      }
    });
  }, { rootMargin:'-45% 0px -50% 0px' });
  $$('main section[id]').forEach(s => sectionIO.observe(s));

  
  const revealIO = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting){
        const d = en.target.dataset.delay;
        if (d){
          en.target.style.transitionDelay = d + 'ms';

          setTimeout(() => { en.target.style.transitionDelay = ''; }, +d + 700);
        }
        en.target.classList.add('visible');
        revealIO.unobserve(en.target);
      }
    });
  }, { threshold:.12, rootMargin:'0px 0px -40px 0px' });
  $$('.reveal').forEach(el => revealIO.observe(el));

  


  const ICONS = {
    send:    '<i data-lucide="send"></i>',
    mail:    '<i data-lucide="mail"></i>',
    github:  '<i data-lucide="github"></i>',
    vk:      '<i data-lucide="vk"></i>',
    discord: '<i data-lucide="discord"></i>',
    view:    '<i data-lucide="external-link"></i>',
    buy:     '<i data-lucide="shopping-cart"></i>'
  };


  let currentWorks = [];
  function renderWorks(filter){
    currentWorks = WORKS
      // в категории «Все» избранные скрыты — они видны внутри своих категорий
      .filter(w => filter === 'all' ? !w.featured : w.category === filter)
      // внутри категории избранные (featured: true) поднимаются наверх
      .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    $('#works-grid').innerHTML = currentWorks
      .map((w, i) => `
    <article class="work-card glass reveal" data-delay="${(i % 3) * 80}">
      <div class="work-shot">
        <img src="${w.img}" alt="${w.title}" loading="lazy">
        ${w.featured ? '<span class="feat-badge"><i data-lucide="star"></i>Избранное</span>' : ''}
      </div>
      <div class="work-body">
        <h3>${w.title}</h3>
        <p>${w.desc}</p>
        <div class="work-tags">${w.tags.map(t => `<span>${t}</span>`).join('')}</div>
        <div class="work-links">
          ${w.gallery && w.gallery.length ? `<a href="${w.gallery[0]}" class="work-view" data-work="${i}">${ICONS.view}Посмотреть</a>` : ''}
          ${w.github ? `<a href="${w.github}" target="_blank" rel="noopener">${ICONS.github}Скачать</a>` : ''}
          ${w.buy    ? `<a href="${CTA.href}" target="_blank" rel="noopener">${ICONS.buy}Купить за ${w.buy}</a>` : ''}
        </div>
      </div>
    </article>`).join('');

    $$('#works-grid .reveal').forEach(el => revealIO.observe(el));
    if (window.createIcons) createIcons(); // перерисовать иконки в новых карточках
  }


  $('#works-filters').innerHTML = FILTERS.map((f, i) => `
    <button class="filter-btn${i === 0 ? ' active' : ''}" data-filter="${f.id}">${f.label}</button>`).join('');
  $('#works-filters').addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn || btn.classList.contains('active')) return;
    $$('#works-filters .filter-btn').forEach(b => b.classList.toggle('active', b === btn));
    renderWorks(btn.dataset.filter);
  });
  renderWorks('all');

  // ссылки проекта в панели «Мой RUST проект» (массив PROJECT_LINKS из data.js)
  $('#flag-links').innerHTML = PROJECT_LINKS.map(l => `
    <a class="flag-link" href="${l.href}" ${l.href.startsWith('http') ? 'target="_blank" rel="noopener"' : ''}>
      <i data-lucide="${l.icon}"></i>${l.label}
    </a>`).join('');

  $('#contact-grid').innerHTML = CONTACTS.map((c, i) => `
    <a class="contact-card glass reveal" data-delay="${(i % 4) * 80}" href="${c.href}" target="_blank" rel="noopener" style="--tone-c:${c.tone}">
      <div class="contact-icon">${ICONS[c.icon] || ''}</div>
      <div><div class="cc-label">${c.label}</div><div class="cc-value">${c.value}</div></div>
    </a>`).join('');
  $$('#contact-grid .reveal').forEach(el => revealIO.observe(el));
  if (window.createIcons) createIcons(); // иконки в ссылках проекта и контактах
  $('#contact-cta').innerHTML = `
    <a class="btn btn-primary" href="${CTA.href}" target="_blank" rel="noopener">
      <i data-lucide="message-square"></i>${CTA.text}
    </a>`;

  
  const lb = $('#lightbox'), lbImg = $('#lb-img'), lbTitle = $('#lb-title'),
        lbCounter = $('#lb-counter'), lbThumbs = $('#lb-thumbs'),
        lbPrev = $('#lb-prev'), lbNext = $('#lb-next');
  let lbList = [], lbIdx = 0;

  function showLb(i){
    lbIdx = (i + lbList.length) % lbList.length;
    lbImg.classList.remove('zoomed');
    lbImg.src = lbList[lbIdx];
    lbCounter.textContent = lbList.length > 1 ? `${lbIdx + 1} / ${lbList.length}` : '';
    const many = lbList.length > 1;
    lbPrev.style.display = many ? '' : 'none';
    lbNext.style.display = many ? '' : 'none';
    lbThumbs.style.display = many ? '' : 'none';
    lbThumbs.innerHTML = lbList.map((src, gi) =>
      `<img src="${src}" data-i="${gi}" class="${gi === lbIdx ? 'active' : ''}" alt="фото ${gi + 1}" loading="lazy">`).join('');
  }

  function openLightbox(work, idx){
    lbList = work.gallery || [];
    if (!lbList.length) return;
    lbTitle.textContent = work.title;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
    showLb(idx || 0);
  }
  function closeLightbox(){
    lb.classList.remove('open');
    lbImg.classList.remove('zoomed');
    document.body.style.overflow = '';
  }


  $('#works-grid').addEventListener('click', e => {
    const a = e.target.closest('a.work-view');
    if (!a) return;
    e.preventDefault();
    openLightbox(currentWorks[+a.dataset.work], 0);
  });

  lbPrev.addEventListener('click', () => showLb(lbIdx - 1));
  lbNext.addEventListener('click', () => showLb(lbIdx + 1));
  lbThumbs.addEventListener('click', e => {
    if (e.target.tagName === 'IMG') showLb(+e.target.dataset.i);
  });


  lbImg.addEventListener('click', e => {
    if (lbImg.classList.contains('zoomed')){
      lbImg.classList.remove('zoomed');
    } else {
      const r = lbImg.getBoundingClientRect();
      lbImg.style.transformOrigin =
        `${((e.clientX - r.left) / r.width * 100).toFixed(1)}% ${((e.clientY - r.top) / r.height * 100).toFixed(1)}%`;
      lbImg.classList.add('zoomed');
    }
  });

  $('#lb-close').addEventListener('click', closeLightbox);
  lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
  window.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showLb(lbIdx - 1);
    if (e.key === 'ArrowRight') showLb(lbIdx + 1);
  });

  
  const typeEl = $('#typewriter');
  let pi = 0, ci = 0, deleting = false;

  function typeLoop(){
    const word = PHRASES[pi];
    if (!deleting){
      typeEl.textContent = word.slice(0, ++ci);
      if (ci === word.length){ deleting = true; return setTimeout(typeLoop, 1800); }
      setTimeout(typeLoop, 55 + Math.random() * 50);
    } else {
      typeEl.textContent = word.slice(0, --ci);
      if (ci === 0){ deleting = false; pi = (pi + 1) % PHRASES.length; return setTimeout(typeLoop, 420); }
      setTimeout(typeLoop, 30);
    }
  }
  setTimeout(typeLoop, 600);

  

  const CODE_LINES = [
    [['kw','const '], ['var','developer'], ['p',' = {']],
    [['p','  '], ['key','name'], ['p',': '], ['str',"'Михаил'"], ['p',',']],
    [['p','  '], ['key','nick'], ['p',': '], ['str',"'wakanda'"], ['p',',']],
    [['p','  '], ['key','stack'], ['p',': ['], ['str',"'HTML'"], ['p',', '], ['str',"'CSS'"], ['p',', '], ['str',"'JS'"], ['p',',']],
    [['p','         '], ['str',"'PHP'"], ['p',', '], ['str',"'SQL'"], ['p','],']],
    [['p','  '], ['key','hardWorker'], ['p',': '], ['bool','true'], ['p',',']],
    [['p','  '], ['key','creative'], ['p',': '], ['bool','true'], ['p',',']],
    [['p','  '], ['key','status'], ['p',': '], ['str',"'Waiting for work'"], ['p',',']],
    [['p','  '], ['key','experience'], ['p',': '], ['str',"'3+ years'"]],
    [['p','};']]
  ];
  const codeBody = $('#code-body');
  const codeCursor = document.createElement('span');
  codeCursor.className = 'code-cursor';

  let lineIdx = 0;
  function typeCodeLine(){
    if (lineIdx >= CODE_LINES.length) return;

    const line = document.createElement('div');
    line.className = 'code-line';
    const ln = document.createElement('span');
    ln.className = 'line-num';
    ln.textContent = lineIdx + 1;
    const lc = document.createElement('span');
    lc.className = 'line-code';
    line.append(ln, lc);
    codeBody.appendChild(line);
    lc.appendChild(codeCursor);

    const tokens = CODE_LINES[lineIdx];
    let ti = 0;
    (function typeToken(){
      if (ti >= tokens.length){ lineIdx++; setTimeout(typeCodeLine, 110); return; }
      const [cls, text] = tokens[ti++];
      const span = document.createElement('span');
      span.className = 'tk-' + cls;
      lc.insertBefore(span, codeCursor);
      let i = 0;
      (function typeChar(){
        if (i < text.length){
          span.textContent += text[i++];
          setTimeout(typeChar, 9 + Math.random() * 16);
        } else typeToken();
      })();
    })();
  }
  setTimeout(typeCodeLine, 500);

  
  const widget = $('#code-widget');
  if (matchMedia('(pointer:fine)').matches){
    widget.addEventListener('mousemove', e => {
      const r = widget.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      widget.style.transform =
        `rotateY(${(x - .5) * 7}deg) rotateX(${(.5 - y) * 6}deg) translateY(-2px)`;
      widget.style.setProperty('--mx', (x * 100) + '%');
      widget.style.setProperty('--my', (y * 100) + '%');
    });
    widget.addEventListener('mouseleave', () => { widget.style.transform = ''; });
  }

  
  const GLYPHS = ['{', '}', '<', '>', '/', ';', '=', '*'];
  const PART_COLORS = ['#7c3aed', '#0d9488', '#db2777', '#8b949e', '#d97706'];
  const particlesBox = $('#particles');
  for (let i = 0; i < 24; i++){
    const p = document.createElement('span');
    p.className = 'particle';
    p.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
    p.style.left = Math.random() * 100 + 'vw';
    p.style.top = Math.random() * 140 + 'vh';
    p.style.fontSize = (11 + Math.random() * 16) + 'px';
    p.style.color = PART_COLORS[Math.floor(Math.random() * PART_COLORS.length)];
    p.style.opacity = (.05 + Math.random() * .09).toFixed(2);
    p.style.animationDuration = (16 + Math.random() * 18) + 's';
    p.style.animationDelay = (-Math.random() * 20) + 's';
    particlesBox.appendChild(p);
  }

  
  const bgScene = $('#bg-scene');
  let tX = 0, tY = 0, mouseX = 0, mouseY = 0, rafPending = false;

  if (matchMedia('(pointer:fine)').matches){
    window.addEventListener('mousemove', e => {
      mouseX = (e.clientX / innerWidth - .5);
      mouseY = (e.clientY / innerHeight - .5);
      requestParallax();
    }, { passive:true });
  }
  window.addEventListener('scroll', requestParallax, { passive:true });

  function requestParallax(){
    if (rafPending) return;
    rafPending = true;
    requestAnimationFrame(() => {
      const y = scrollY;
      const sceneY = Math.min(y * .04, innerHeight * .25);
      const partY  = Math.min(y * .09, innerHeight * .6);
      bgScene.style.transform =
        `translate3d(${mouseX * -14}px, ${mouseY * -10 - sceneY}px, 0)`;
      particlesBox.style.transform =
        `translate3d(${mouseX * -26}px, ${-partY}px, 0)`;
      rafPending = false;
    });
  }

  
  const hero = $('#hero'), mCanvas = $('#matrix'), mCtx = mCanvas.getContext('2d');
  const M_CHARS = '{}<>/;=01#*';
  let mCols = [], mW = 0, mH = 0, mLast = 0, heroVisible = true;

  function sizeMatrix(){
    mW = mCanvas.width = hero.clientWidth;
    mH = mCanvas.height = hero.clientHeight;
    const cols = Math.floor(mW / 18);
    mCols = Array.from({ length: cols }, () => Math.random() * -mH / 16);
  }
  sizeMatrix();
  window.addEventListener('resize', sizeMatrix);


  new IntersectionObserver(en => { heroVisible = en[0].isIntersecting; }, { threshold:.02 }).observe(hero);

  function drawMatrix(ts){
    requestAnimationFrame(drawMatrix);
    if (!heroVisible || ts - mLast < 80) return;
    mLast = ts;

    mCtx.fillStyle = 'rgba(13,17,23,0.12)';
    mCtx.fillRect(0, 0, mW, mH);
    mCtx.font = '14px "JetBrains Mono", monospace';
    for (let i = 0; i < mCols.length; i++){
      const ch = M_CHARS[Math.floor(Math.random() * M_CHARS.length)];

      mCtx.fillStyle = Math.random() < .08 ? 'rgba(167,139,250,0.35)' : 'rgba(124,58,237,0.14)';
      mCtx.fillText(ch, i * 18 + 4, mCols[i] * 16);
      if (mCols[i] * 16 > mH && Math.random() > .975) mCols[i] = 0;
      mCols[i]++;
    }
  }
  requestAnimationFrame(drawMatrix);

  
  (function initBg3D(){
    const holder = $('#bg3d');
    if (!holder || !window.THREE) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let renderer;
    try{
      renderer = new THREE.WebGLRenderer({
        alpha:true, antialias:true, powerPreference:'low-power'
      });
    }catch(err){ return; }

    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
    holder.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, .1, 100);
    camera.position.z = 9;


    function glowTexture(){
      const c = document.createElement('canvas'); c.width = c.height = 64;
      const g = c.getContext('2d');
      const grad = g.createRadialGradient(32, 32, 0, 32, 32, 30);
      grad.addColorStop(0,   'rgba(255,255,255,1)');
      grad.addColorStop(.4,  'rgba(180,150,250,.9)');
      grad.addColorStop(1,   'rgba(157,123,240,0)');
      g.fillStyle = grad;
      g.beginPath(); g.arc(32, 32, 30, 0, Math.PI * 2); g.fill();
      return new THREE.CanvasTexture(c);
    }

    const group = new THREE.Group();
    scene.add(group);


    const outerGeo = new THREE.IcosahedronGeometry(2.6, 0);
    const outer = new THREE.LineSegments(
      new THREE.EdgesGeometry(outerGeo),
      new THREE.LineBasicMaterial({ color:0x9d7bf0, transparent:true, opacity:.3 })
    );
    group.add(outer);


    const dots = new THREE.Points(outerGeo, new THREE.PointsMaterial({
      color:0x9d7bf0, size:.22, map:glowTexture(),
      transparent:true, opacity:.9, depthWrite:false,
      blending:THREE.AdditiveBlending, sizeAttenuation:true
    }));
    group.add(dots);


    const inner = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.4, 0)),
      new THREE.LineBasicMaterial({ color:0x5fb8ad, transparent:true, opacity:.22 })
    );
    group.add(inner);


    function resize3D(){
      const w = hero.clientWidth, h = hero.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      const wide = w >= 900;
      group.position.set(wide ? 2.7 : 0, wide ? -.2 : .3, 0);
      group.userData.base = wide ? 1 : .68;
      group.scale.setScalar(group.userData.base);
    }
    resize3D();
    window.addEventListener('resize', resize3D);


    let tx = 0, ty = 0, cx = 0, cy = 0;
    window.addEventListener('mousemove', e => {
      tx = e.clientX / innerWidth - .5;
      ty = e.clientY / innerHeight - .5;
    }, { passive:true });

    let rotX = 0, rotY = 0;
    const t0 = performance.now();

    (function tick(now){
      requestAnimationFrame(tick);
      if (document.hidden) return;

      const boost = document.body.classList.contains('konami') ? 6 : 1;

      rotX += .0006 * boost;
      rotY += .0016 * boost;
      cx += (tx - cx) * .045;
      cy += (ty - cy) * .045;

      group.rotation.x = rotX + cy * .9;
      group.rotation.y = rotY + cx * 1.1;
      group.rotation.z = scrollY * .00028;


      const breathe = 1 + Math.sin((now - t0) * .0006) * .025;
      group.scale.setScalar(group.userData.base * breathe);

      inner.rotation.y -= .003 * boost;
      inner.rotation.x += .0014 * boost;

      renderer.render(scene, camera);
    })(t0);
  })();

  /* ============================================================
     9c. 3D-РОБОТ В БЛОКЕ «КТО Я»: следит за курсором
     ------------------------------------------------------------
     Собран из примитивов Three.js в стилистике сайта.
     Голова и глаза плавно «догоняют» курсор (lerp), тело
     слегка наклоняется, робот неторопливо парит.
     Рисуем только когда блок в зоне видимости.
     SVG-круг в разметке остаётся fallback-ом на случай,
     если WebGL/Three.js недоступны.
     ============================================================ */
  (function initAvatar3D(){
    const holder = $('#avatar3d');
    if (!holder || !window.THREE) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let renderer;
    try{
      renderer = new THREE.WebGLRenderer({ alpha:true, antialias:true });
    }catch(err){ return; }
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
    renderer.outputEncoding = THREE.sRGBEncoding;
    holder.appendChild(renderer.domElement);
    // canvas есть — fallback-круг с текстом больше не нужен
    const fallback = holder.querySelector('svg');
    if (fallback) fallback.style.display = 'none';

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, .1, 50);
    camera.position.set(0, 0, 7);

    scene.add(new THREE.AmbientLight(0x8888aa, 1.1));
    const key = new THREE.DirectionalLight(0xbfa8ff, 1.4); // фиолетовая подсветка
    key.position.set(-2, 3, 4);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x5fb8ad, .9);  // бирюзовый контровой
    rim.position.set(3, -1, -2);
    scene.add(rim);

    const robot = new THREE.Group();
    scene.add(robot);

    const bodyMat = new THREE.MeshStandardMaterial({
      color:0x241f38, roughness:.45, metalness:.35
    });
    const darkMat = new THREE.MeshStandardMaterial({
      color:0x11151d, roughness:.6, metalness:.2
    });
    const glowMat = new THREE.MeshBasicMaterial({ color:0x9d7bf0 });
    const tealMat = new THREE.MeshBasicMaterial({ color:0x5fb8ad });

    // корпус (r128 не знает CapsuleGeometry — собираем «капсулу» из сферы)
    const torso = new THREE.Mesh(new THREE.SphereGeometry(.62, 24, 24), bodyMat);
    torso.scale.set(1, 1.35, .82);
    torso.position.y = -.85;
    robot.add(torso);

    // голова: сфера + тёмный «экран»-лицо + глаза НАД поверхностью
    const head = new THREE.Group();
    head.position.y = .45;
    robot.add(head);
    head.add(new THREE.Mesh(new THREE.SphereGeometry(.72, 32, 32), bodyMat));
    const face = new THREE.Mesh(new THREE.SphereGeometry(.58, 32, 32), darkMat);
    face.position.set(0, 0, .62);          // экран выступает над сферой головы
    face.scale.set(1, .82, .55);
    head.add(face);

    // глаза: светящиеся сферы поверх экрана — двигаются за курсором
    const eyeGeo = new THREE.SphereGeometry(.1, 16, 16);
    const eyeL = new THREE.Mesh(eyeGeo, glowMat);
    const eyeR = new THREE.Mesh(eyeGeo, glowMat);
    eyeL.position.set(-.22, .08, .9);
    eyeR.position.set(.22, .08, .9);
    head.add(eyeL, eyeR);

    // уши-динамики и антенна
    const earGeo = new THREE.CylinderGeometry(.12, .12, .18, 16);
    const earL = new THREE.Mesh(earGeo, darkMat);
    const earR = new THREE.Mesh(earGeo, darkMat);
    earL.rotation.z = Math.PI / 2; earL.position.set(-.76, 0, 0);
    earR.rotation.z = Math.PI / 2; earR.position.set(.76, 0, 0);
    head.add(earL, earR);
    const ant = new THREE.Mesh(new THREE.CylinderGeometry(.03, .03, .4, 8), darkMat);
    ant.position.y = .85;
    const antTip = new THREE.Mesh(new THREE.SphereGeometry(.08, 16, 16), tealMat);
    antTip.position.y = .2;
    head.add(ant, antTip);

    // руки
    const armGeo = new THREE.CylinderGeometry(.11, .13, .55, 12);
    const armL = new THREE.Mesh(armGeo, bodyMat);
    const armR = new THREE.Mesh(armGeo, bodyMat);
    armL.position.set(-.72, -.85, 0); armL.rotation.z = .25;
    armR.position.set(.72, -.85, 0);  armR.rotation.z = -.25;
    robot.add(armL, armR);

    // фон за роботом: мягкое фиолетовое свечение (вместо старого круга)
    function glowTexture(colorMid){
      const c = document.createElement('canvas'); c.width = c.height = 128;
      const g = c.getContext('2d');
      const grad = g.createRadialGradient(64, 64, 0, 64, 64, 62);
      grad.addColorStop(0,   colorMid);
      grad.addColorStop(1,   'rgba(157,123,240,0)');
      g.fillStyle = grad;
      g.fillRect(0, 0, 128, 128);
      return new THREE.CanvasTexture(c);
    }
    const backdrop = new THREE.Sprite(new THREE.SpriteMaterial({
      map: glowTexture('rgba(124,58,237,.28)'),
      transparent: true, depthWrite: false
    }));
    backdrop.scale.set(6.5, 6.5, 1);
    backdrop.position.set(0, 0, -2.2);
    scene.add(backdrop);

    // орбитальные кольца вокруг робота: каждое в своём «пивоте»,
    // пивот вращается вокруг Y — кольца облетают робота по орбите
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.5, .012, 8, 80),
      new THREE.MeshBasicMaterial({ color: 0x9d7bf0, transparent: true, opacity: .55 }));
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(1.22, .01, 8, 80),
      new THREE.MeshBasicMaterial({ color: 0x5fb8ad, transparent: true, opacity: .4 }));

    const orbit1 = new THREE.Group();   // пивот орбиты 1
    orbit1.rotation.x = .45;            // наклон плоскости орбиты
    ring1.rotation.x = Math.PI / 2;     // ставим кольцо «плашмя» в плоскость орбиты
    orbit1.add(ring1);

    const orbit2 = new THREE.Group();   // пивот орбиты 2
    orbit2.rotation.x = -.35;
    orbit2.rotation.z = .25;
    ring2.rotation.x = Math.PI / 2;
    orbit2.add(ring2);

    // светящиеся спутники, бегущие по орбитам
    const sat1 = new THREE.Mesh(new THREE.SphereGeometry(.06, 12, 12), glowMat);
    sat1.position.set(1.5, 0, 0);       // на радиусе кольца 1
    orbit1.add(sat1);
    const sat2 = new THREE.Mesh(new THREE.SphereGeometry(.05, 12, 12), tealMat);
    sat2.position.set(0, 0, -1.22);     // на радиусе кольца 2
    orbit2.add(sat2);

    scene.add(orbit1, orbit2);

    // размер сцены = размер контейнера-круга
    function resize(){
      const w = holder.clientWidth || 172, h = holder.clientHeight || 172;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      const s = Math.min(w / 172, 1);
      robot.scale.setScalar(s);
    }
    resize();
    window.addEventListener('resize', resize);

    // курсор → цель наклона (общая логика с фоновым икосаэдром)
    let tx = 0, ty = 0, cx = 0, cy = 0;
    window.addEventListener('mousemove', e => {
      tx = e.clientX / innerWidth - .5;
      ty = e.clientY / innerHeight - .5;
    }, { passive:true });

    let visible = false;
    new IntersectionObserver(en => { visible = en[0].isIntersecting; }, { threshold:.05 })
      .observe(holder);

    const t0 = performance.now();
    (function tick(now){
      requestAnimationFrame(tick);
      if (!visible || document.hidden) return;

      cx += (tx - cx) * .06;
      cy += (ty - cy) * .06;

      head.rotation.y = cx * .9;             // голова поворачивается за курсором
      head.rotation.x = cy * .6;
      robot.rotation.y = cx * .25;           // корпус слегка доверяется
      robot.rotation.x = cy * .12;
      eyeL.position.x = -.22 + cx * .1;      // глаза «смотрят» активнее
      eyeR.position.x =  .22 + cx * .1;
      eyeL.position.y = eyeR.position.y = .08 - cy * .08;
      robot.position.y = Math.sin((now - t0) * .0011) * .07; // парение
      antTip.material.color.setHSL(.45, .55, .5 + Math.sin((now - t0) * .003) * .2); // пульс антенны

      orbit1.rotation.y = (now - t0) * .0006;  // орбиты облетают робота
      orbit2.rotation.y = -(now - t0) * .00045;
      ring1.rotation.z = (now - t0) * .0003;   // кольца ещё и вращаются сами
      ring2.rotation.z = -(now - t0) * .0004;

      renderer.render(scene, camera);
    })(t0);
  })();


  const track = $('#marquee-track');

  track.innerHTML = RUST_SERVERS.map(s => `
    <div class="rust-chip glass">
      <img class="rust-avatar" src="${s.img}" alt="${s.name}">
      <div><div class="rc-name">${s.name}</div><div class="rc-desc">${s.desc}</div></div>
    </div>`).join('');
  const baseSet = track.innerHTML;

  function buildMarquee(){
    track.innerHTML = baseSet;
    while (track.scrollWidth < innerWidth * 1.5 && track.children.length < 48){
      track.innerHTML += baseSet;
    }
    track.innerHTML += track.innerHTML;
  }
  buildMarquee();

  let marqueeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(marqueeTimer);
    marqueeTimer = setTimeout(buildMarquee, 200);
  });

  
const KONAMI = ['arrowup','arrowup','arrowdown','arrowdown',
                  'arrowleft','arrowright','arrowleft','arrowright','b','a'];
  let kBuf = [];
  const modal = $('#konami-modal');

  window.addEventListener('keydown', e => {

    kBuf.push(e.key.toLowerCase());
    kBuf = kBuf.slice(-KONAMI.length);
    if (KONAMI.every((k, i) => k === kBuf[i])){
      kBuf = [];
      openKonami();
    }
  });

  function openKonami(){
    modal.classList.add('open');
    document.body.classList.add('konami');
    $('#konami-close').focus();
  }
  function closeKonami(){
    modal.classList.remove('open');
    document.body.classList.remove('konami');
  }
  $('#konami-close').addEventListener('click', closeKonami);
  modal.addEventListener('click', e => { if (e.target === modal) closeKonami(); });
  window.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('open')) closeKonami(); });

  
  if (matchMedia('(pointer:fine)').matches){
    const dot = $('#cursor-dot'), ring = $('#cursor-ring');
    let cx = innerWidth / 2, cy = innerHeight / 2, rx = cx, ry = cy;

    window.addEventListener('mousemove', e => {
      cx = e.clientX; cy = e.clientY;
      dot.style.transform = `translate(${cx}px, ${cy}px)`;
    }, { passive:true });

    (function ringLoop(){
      rx += (cx - rx) * .16;
      ry += (cy - ry) * .16;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      requestAnimationFrame(ringLoop);
    })();


    const HOVER_SEL = 'a, button, input, .tech-item, .rust-chip, .skill-card, .work-card, .module';
    document.addEventListener('mouseover', e => {
      if (e.target.closest(HOVER_SEL)) ring.classList.add('grow');
    });
    document.addEventListener('mouseout', e => {
      if (e.target.closest(HOVER_SEL)) ring.classList.remove('grow');
    });
  }

})();
