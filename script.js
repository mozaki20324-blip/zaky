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
})();
