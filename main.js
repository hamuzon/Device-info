(function () {
  const dict = {
    ja: {
      title: "デバイス情報",
      os_ch: "OS情報（UA-CH）",
      os_ua: "OS情報（User-Agent）",
      browser_ch: "ブラウザ情報（UA-CH）",
      browser_ua: "ブラウザ情報（User-Agent）",
      category: { os: "OS情報", browser: "ブラウザ情報", screen: "画面情報", cpu: "CPU・メモリ", network: "ネットワーク情報", other: "その他情報" },
      os: "OS名", version: "バージョン", device: "端末名", browser: "ブラウザ", browserVersion: "バージョン", ua: "ユーザーエージェント",
      screen: "画面解像度", viewport: "ビューポート", colorDepth: "色深度", pixelDepth: "ピクセル深度",
      cpu: "CPUコア数", cpuName: "CPU名", memory: "メモリ(概算)", ipv4: "IPv4アドレス", ipv6: "IPv6アドレス", ip: "現在使用IP",
      online: "オンライン状態", language: "ブラウザ言語", cookiesEnabled: "クッキー有効", fetchedAt: "取得時刻", now: "現在時刻", timezone: "タイムゾーン",
      unknown: "不明", not_available: "取得不可", online_yes: "オンライン", online_no: "オフライン",
      light: "ライト", dark: "ダーク",
      footer: { 
        copyright: "© <span id='year'></span> device-info",
        warning: "表示される情報は一部、正確でない可能性があります。",
        library: `使用ライブラリ: <a href="https://www.ipify.org/" target="_blank" rel="noopener noreferrer">ipify API</a>,
                  <a href="https://developer.mozilla.org/ja/docs/Web/API/Device_Memory_API" target="_blank" rel="noopener noreferrer">Device Memory API</a>,
                  <a href="https://developer.mozilla.org/ja/docs/Web/API" target="_blank" rel="noopener noreferrer">Web API</a>,
                  <a href="https://wicg.github.io/ua-client-hints/" target="_blank" rel="noopener noreferrer">UA Client Hints</a>`
      }
    },
    en: {
      title: "Device Information",
      os_ch: "OS Information (UA-CH)",
      os_ua: "OS Information (User-Agent)",
      browser_ch: "Browser Information (UA-CH)",
      browser_ua: "Browser Information (User-Agent)",
      category: { os: "OS Information", browser: "Browser Information", screen: "Screen Information", cpu: "CPU & Memory", network: "Network Information", other: "Other Information" },
      os: "Operating System", version: "Version", device: "Device Name", browser: "Browser", browserVersion: "Version", ua: "User Agent",
      screen: "Screen Resolution", viewport: "Viewport", colorDepth: "Color Depth", pixelDepth: "Pixel Depth",
      cpu: "CPU Cores", cpuName: "CPU Name", memory: "Memory (approx.)", ipv4: "IPv4 Address", ipv6: "IPv6 Address", ip: "Current IP",
      online: "Online Status", language: "Browser Language", cookiesEnabled: "Cookies Enabled", fetchedAt: "Fetched At", now: "Current Time", timezone: "Timezone",
      unknown: "Unknown", not_available: "Not available", online_yes: "Online", online_no: "Offline",
      light: "Light", dark: "Dark",
      footer: { 
        copyright: "© <span id='year'></span> device-info",
        warning: "Displayed information may not be accurate.",
        library: `Libraries used: <a href="https://www.ipify.org/" target="_blank" rel="noopener noreferrer">ipify API</a>,
                  <a href="https://developer.mozilla.org/en-US/docs/Web/API/Device_Memory_API" target="_blank" rel="noopener noreferrer">Device Memory API</a>,
                  <a href="https://developer.mozilla.org/en-US/docs/Web/API" target="_blank" rel="noopener noreferrer">Web API</a>,
                  <a href="https://wicg.github.io/ua-client-hints/" target="_blank" rel="noopener noreferrer">UA Client Hints</a>`
      }
    }
  };

  let currentLang = localStorage.getItem("lang") || (navigator.language.startsWith("ja") ? "ja" : "en");
  let darkMode = localStorage.getItem("mode") === "dark" || (localStorage.getItem("mode") === null && window.matchMedia('(prefers-color-scheme: dark)').matches);

  const titleEl = document.getElementById('title');
  const btnJa = document.getElementById('btn-ja');
  const btnEn = document.getElementById('btn-en');
  const btnLight = document.getElementById('btn-light');
  const btnDark = document.getElementById('btn-dark');
  const favicon = document.getElementById('favicon');
  const footerCopyright = document.getElementById('footer-copyright');
  const footerWarning = document.getElementById('footer-warning');
  const footerLibrary = document.getElementById('footer-library');
  const tables = {
    os_ua_ch: document.getElementById('table-os-ua-ch'),
    os_ua: document.getElementById('table-os-ua'),
    browser_ua_ch: document.getElementById('table-browser-ua-ch'),
    browser_ua: document.getElementById('table-browser-ua'),
    screen: document.getElementById('table-screen'),
    cpu: document.getElementById('table-cpu'),
    network: document.getElementById('table-network'),
    other: document.getElementById('table-other')
  };
  const sectionTitles = {
    os: document.getElementById('cat-os'),
    browser: document.getElementById('cat-browser'),
    screen: document.getElementById('cat-screen'),
    cpu: document.getElementById('cat-cpu'),
    network: document.getElementById('cat-network'),
    other: document.getElementById('cat-other')
  };

  function createRow(label, value) {
    const row = document.createElement('tr');
    row.innerHTML = `<th scope="row">${label}</th><td>${value || dict[currentLang].unknown}</td>`;
    return row;
  }

  function getCpuMemoryDisplay() {
    const memGB = navigator.deviceMemory || 0;
    return memGB ? `${memGB} GB (最大 8GBまで)` : dict[currentLang].unknown;
  }

  async function updateInfo() {
    // テーブル初期化
    Object.values(tables).forEach(tbl => tbl.innerHTML = '');

    // CPU・メモリ例
    tables.cpu.appendChild(createRow(dict[currentLang].cpu, navigator.hardwareConcurrency || dict[currentLang].unknown));
    tables.cpu.appendChild(createRow(dict[currentLang].cpuName, "推定CPU")); // UA推定などは別関数でも可
    tables.cpu.appendChild(createRow(dict[currentLang].memory, getCpuMemoryDisplay()));

    // フッター年表示
    const baseYear = 2025;
    const currentYear = new Date().getFullYear();
    document.getElementById("year").textContent = currentYear > baseYear ? `${baseYear}~${currentYear}` : `${baseYear}`;

    footerCopyright.innerHTML = dict[currentLang].footer.copyright;
    footerWarning.textContent = dict[currentLang].footer.warning;
    footerLibrary.innerHTML = dict[currentLang].footer.library;
  }

  function updateCurrentTime() {
    const nowStr = new Date().toLocaleString();
    const rows = tables.other.querySelectorAll('tr');
    for (const row of rows) {
      if (row.firstElementChild?.textContent === dict[currentLang].now) {
        row.lastElementChild.textContent = nowStr;
        break;
      }
    }
  }

  function setLang(lang) {
    currentLang = lang;
    localStorage.setItem("lang", lang);
    titleEl.textContent = dict[lang].title;
    Object.entries(dict[lang].category).forEach(([key, label]) => {
      if (sectionTitles[key]) sectionTitles[key].textContent = label;
    });
    btnJa.classList.toggle('active', lang === 'ja');
    btnEn.classList.toggle('active', lang === 'en');
    btnJa.setAttribute('aria-pressed', lang === 'ja');
    btnEn.setAttribute('aria-pressed', lang === 'en');
    btnLight.textContent = dict[lang].light;
    btnDark.textContent = dict[lang].dark;
    document.body.setAttribute("lang", lang);
    updateInfo();
  }

  function setMode(isDark) {
    darkMode = isDark;
    localStorage.setItem("mode", isDark ? "dark" : "light");
    document.body.classList.toggle('light', !darkMode);
    btnLight.classList.toggle('active', !darkMode);
    btnDark.classList.toggle('active', darkMode);
    btnLight.setAttribute('aria-pressed', !darkMode);
    btnDark.setAttribute('aria-pressed', darkMode);
    favicon.href = isDark ? 'icon-dark.png' : 'icon-light.png';
  }

  btnJa.addEventListener('click', () => setLang('ja'));
  btnEn.addEventListener('click', () => setLang('en'));
  btnLight.addEventListener('click', () => setMode(false));
  btnDark.addEventListener('click', () => setMode(true));

  setMode(darkMode);
  setLang(currentLang);
  setInterval(updateCurrentTime, 1000);

})();