(function () {
  var html = document.documentElement;
  var btn = document.getElementById('langBtn');
  var titles = { ar: 'ZAKY - تعلّم الإيطالية بذكاء', it: "ZAKY - Impara l'italiano con intelligenza" };

  function setLang(lang) {
    html.lang = lang;
    html.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-ar]').forEach(function (el) {
      el.textContent = el.getAttribute('data-' + lang);
    });
    document.title = titles[lang];
    btn.textContent = lang === 'ar' ? 'Italiano' : 'العربية';
    try { localStorage.setItem('zaky-lang', lang); } catch (e) {}
  }
  btn.addEventListener('click', function () { setLang(html.lang === 'ar' ? 'it' : 'ar'); });
  var saved = null;
  try { saved = localStorage.getItem('zaky-lang'); } catch (e) {}
  if (saved === 'it') setLang('it');

  // Tabs: feature list <-> phone screen
  var tabs = document.querySelectorAll('.tab');
  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      var i = t.getAttribute('data-i');
      tabs.forEach(function (x) {
        var on = x === t;
        x.classList.toggle('is-on', on);
        x.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      document.querySelectorAll('.panel, .show-phone').forEach(function (el) {
        el.hidden = el.getAttribute('data-i') !== i;
      });
    });
  });

  // "Frase del giorno" in the hero phone (phrases taken from the app)
  var phrases = [
    ['Ciao', 'مرحبًا'], ['Grazie mille', 'شكرًا جزيلًا'], ['Piano piano', 'شيئًا فشيئًا'],
    ['Buon appetito', 'بالهناء والشفاء'], ["Non c'è problema", 'لا توجد مشكلة'],
    ['Mi piace molto', 'يعجبني كثيرًا'], ['In bocca al lupo', 'بالتوفيق'], ['Che bello', 'ما أجمل هذا']
  ];
  var card = document.querySelector('.w-card');
  var itEl = document.getElementById('phraseIt');
  var arEl = document.getElementById('phraseAr');
  var n = 1;
  setInterval(function () {
    card.classList.add('fade');
    setTimeout(function () {
      itEl.textContent = phrases[n][0];
      arEl.textContent = phrases[n][1];
      card.classList.remove('fade');
      n = (n + 1) % phrases.length;
    }, 350);
  }, 3500);

  // Hide a screenshot that was not added yet, so the built-in screen shows
  document.querySelectorAll('.shot-img').forEach(function (img) {
    function fail() { img.classList.add('is-missing'); }
    img.addEventListener('error', fail);
    if (img.complete && img.naturalWidth === 0) fail();
  });

  document.getElementById('year').textContent = new Date().getFullYear();
  // Live download counter (sum of GitHub release downloads)
  (function () {
    var box = document.getElementById('dlCount');
    var num = document.getElementById('dlNum');
    if (!box || !num) return;
    function show(n) {
      if (n > 0) { num.textContent = n.toLocaleString('en-US'); box.hidden = false; }
    }
    var cached = null;
    try { cached = JSON.parse(sessionStorage.getItem('zaky-dl') || 'null'); } catch (e) {}
    if (cached && Date.now() - cached.t < 600000) { show(cached.n); return; }
    fetch('https://api.github.com/repos/mozaki20324-blip/zaky/releases')
      .then(function (r) { return r.ok ? r.json() : []; })
      .then(function (list) {
        var total = 0;
        list.forEach(function (rel) {
          (rel.assets || []).forEach(function (a) {
            if (/\.apk$/i.test(a.name)) total += a.download_count || 0;
          });
        });
        try { sessionStorage.setItem('zaky-dl', JSON.stringify({ n: total, t: Date.now() })); } catch (e) {}
        show(total);
      })
      .catch(function () {});
  })();
})();
