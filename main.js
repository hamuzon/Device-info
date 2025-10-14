(function () {
  const dict = {
    ja: {
      title: "デバイス情報",
      os_ch: "OS情報（UA-CH）",
      os_ua: "OS情報（User-Agent）",
      browser_ch: "ブラウザ情報（UA-CH）",
      browser_ua: "ブラウザ情報（User-Agent）",
      category: {
        os: "OS情報",
        browser: "ブラウザ情報",
        screen: "画面情報",
        cpu: "CPU・メモリ",
        network: "ネットワーク情報",
        other: "その他情報"
      },
      os: "OS名",
      version: "バージョン",
      device: "端末名",
      browser: "ブラウザ",
      browserVersion: "バージョン",
      ua: "ユーザーエージェント",
      screen: "画面解像度",
      viewport: "ビューポート",
      colorDepth: "色深度",
      pixelDepth: "ピクセル深度",
      cpu: "CPUコア数",
      cpuName: "CPU名",
      memory: "メモリ(概算・最大8GBまで)",
      ipv4: "IPv4アドレス",
      ipv6: "IPv6アドレス",
      ip: "現在使用IP",
      online: "オンライン状態",
      language: "ブラウザ言語",
      cookiesEnabled: "クッキー有効",
      fetchedAt: "取得時刻",
      now: "現在時刻",
      timezone: "タイムゾーン",
      unknown: "不明",
      not_available: "取得不可",
      online_yes: "オンライン",
      online_no: "オフライン",
      light: "ライト",
      dark: "ダーク",
      footer: {
        copyright: "© 2025 device-info",
        warning: "表示される情報は一部、正確でない可能性があります。",
        library: `使用ライブラリ: 
          <a href="https://www.ipify.org/" target="_blank" rel="noopener noreferrer">ipify API</a>,
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
      category: {
        os: "OS Information",
        browser: "Browser Information",
        screen: "Screen Information",
        cpu: "CPU & Memory",
        network: "Network Information",
        other: "Other Information"
      },
      os: "Operating System",
      version: "Version",
      device: "Device Name",
      browser: "Browser",
      browserVersion: "Version",
      ua: "User Agent",
      screen: "Screen Resolution",
      viewport: "Viewport",
      colorDepth: "Color Depth",
      pixelDepth: "Pixel Depth",
      cpu: "CPU Cores",
      cpuName: "CPU Name",
      memory: "Memory (approx., max 8GB)",
      ipv4: "IPv4 Address",
      ipv6: "IPv6 Address",
      ip: "Current IP",
      online: "Online Status",
      language: "Browser Language",
      cookiesEnabled: "Cookies Enabled",
      fetchedAt: "Fetched At",
      now: "Current Time",
      timezone: "Timezone",
      unknown: "Unknown",
      not_available: "Not available",
      online_yes: "Online",
      online_no: "Offline",
      light: "Light",
      dark: "Dark",
      footer: {
        copyright: "© 2025 device-info",
        warning: "Displayed information may not be accurate.",
        library: `Libraries used: 
          <a href="https://www.ipify.org/" target="_blank" rel="noopener noreferrer">ipify API</a>,
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/Device_Memory_API" target="_blank" rel="noopener noreferrer">Device Memory API</a>,
          <a href="https://developer.mozilla.org/en-US/docs/Web/API" target="_blank" rel="noopener noreferrer">Web API</a>,
          <a href="https://wicg.github.io/ua-client-hints/" target="_blank" rel="noopener noreferrer">UA Client Hints</a>`
      }
    }
  };

  // --- DOM Elements ---
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

  const osUaChLabel = document.getElementById('os-ua-ch-label');
  const osUaLabel = document.getElementById('os-ua-label');
  const browserUaChLabel = document.getElementById('browser-ua-ch-label');
  const browserUaLabel = document.getElementById('browser-ua-label');

  const sectionTitles = {
    os: document.getElementById('cat-os'),
    browser: document.getElementById('cat-browser'),
    screen: document.getElementById('cat-screen'),
    cpu: document.getElementById('cat-cpu'),
    network: document.getElementById('cat-network'),
    other: document.getElementById('cat-other')
  };

  // --- State ---
  let currentLang = localStorage.getItem("lang") || (navigator.language.startsWith("ja") ? "ja" : "en");
  let darkMode = localStorage.getItem("mode") === "dark" || 
                 (localStorage.getItem("mode") === null && window.matchMedia('(prefers-color-scheme: dark)').matches);

  // --- Helper Functions ---
  function createRow(label, value) {
    const row = document.createElement('tr');
    row.innerHTML = `<th scope="row">${label}</th><td>${value || dict[currentLang].unknown}</td>`;
    return row;
  }

  async function fetchIPData() {
    const ipv4 = await fetch('https://api.ipify.org?format=json')
      .then(r => r.json()).then(d => d.ip || dict[currentLang].unknown)
      .catch(() => dict[currentLang].unknown);
    const ipv6 = await fetch('https://api64.ipify.org?format=json')
      .then(r => r.json()).then(d => d.ip || dict[currentLang].unknown)
      .catch(() => dict[currentLang].unknown);
    const currentIP = (ipv6 && ipv6 !== dict[currentLang].unknown) ? ipv6 : ipv4;
    return { ipv4, ipv6, currentIP };
  }

  function getCpuMemory() {
    const cores = navigator.hardwareConcurrency || dict[currentLang].unknown;
    let memory = navigator.deviceMemory || dict[currentLang].unknown;
    if (typeof memory === "number") memory = Math.min(memory, 8) + " GB"; // 最大8GB制限
    return { cores, memory };
  }

  function getCpuName() {
    const ua = navigator.userAgent;
    if (/arm|aarch64/i.test(ua)) return currentLang==="ja"?"ARM (推定)":"ARM (Estimated)";
    if (/x86_64|Win64|WOW64|amd64/i.test(ua)) return currentLang==="ja"?"x64 (推定)":"x64 (Estimated)";
    if (/i686|i386|x86/i.test(ua)) return currentLang==="ja"?"x86 (推定)":"x86 (Estimated)";
    return dict[currentLang].not_available;
  }

  function getOsBrowserByUA() {
    const ua = navigator.userAgent;
    let os=dict[currentLang].unknown, version=dict[currentLang].unknown, device=dict[currentLang].unknown;
    if (/Android/.test(ua)) { os="Android"; version=(ua.match(/Android\s+([\d.]+)/)||[])[1]||version; device=(ua.match(/;\s?([^;\/]+)\s+Build/i)||[])[1]||device; }
    else if (/iPhone|iPad|iPod/.test(ua)) { os=/iPhone/.test(ua)?"iOS":"iPadOS"; version=(ua.match(/OS (\d+)[_.](\d+)/)||[])[1]||version; device=/iPhone/.test(ua)?"iPhone":"iPad"; }
    else if (/Windows NT/.test(ua)) { os="Windows"; const map={"10.0":"10 / 11","6.3":"8.1","6.2":"8","6.1":"7","6.0":"Vista","5.1":"XP"}; version=map[(ua.match(/Windows NT ([\d.]+)/)||[])[1]]||version; device="PC"; }
    else if (/Mac OS X/.test(ua)) { os="macOS"; version=(ua.match(/Mac OS X (\d+[_\.]\d+)/)||[])[1]?.replace(/_/g,".")||version; device="Mac"; }
    else if (/Linux/.test(navigator.platform)) { os="Linux"; device=currentLang==="ja"?"Linux端末":"Linux device"; }
    let browser=dict[currentLang].unknown,bver=dict[currentLang].unknown;
    if (/Edg\//.test(ua)) browser="Edge", bver=(ua.match(/Edg\/([\d\.]+)/)||[])[1]||bver;
    else if (/OPR\//.test(ua)) browser="Opera", bver=(ua.match(/OPR\/([\d\.]+)/)||[])[1]||bver;
    else if (/Chrome\//.test(ua)) browser="Chrome", bver=(ua.match(/Chrome\/([\d\.]+)/)||[])[1]||bver;
    else if (/Firefox\//.test(ua)) browser="Firefox", bver=(ua.match(/Firefox\/([\d\.]+)/)||[])[1]||bver;
    else if (/Safari/.test(ua) && !/Chrome/.test(ua)) browser="Safari", bver=(ua.match(/Version\/([\d\.]+)/)||[])[1]||bver;
    return { os, version, device, browser, browserVersion:bver };
  }

  function applyTheme() {
    document.body.classList.toggle("light", !darkMode);
    document.body.classList.toggle("dark", darkMode);
    btnDark.classList.toggle("active", darkMode);
    btnLight.classList.toggle("active", !darkMode);
    btnDark.setAttribute("aria-pressed", darkMode);
    btnLight.setAttribute("aria-pressed", !darkMode);
    localStorage.setItem("mode", darkMode ? "dark" : "light");
  }

  function applyLang() {
    const lang = dict[currentLang];
    titleEl.textContent = lang.title;
    Object.keys(sectionTitles).forEach(k => sectionTitles[k].textContent = lang.category[k]);
    footerCopyright.innerHTML = lang.footer.copyright;
    footerWarning.innerHTML = lang.footer.warning;
    footerLibrary.innerHTML = lang.footer.library;

    btnJa.classList.toggle("active", currentLang==="ja");
    btnEn.classList.toggle("active", currentLang==="en");
    btnJa.setAttribute("aria-pressed", currentLang==="ja");
    btnEn.setAttribute("aria-pressed", currentLang==="en");

    updateInfo();
    localStorage.setItem("lang", currentLang);
  }

  async function updateInfo() {
    const lang = dict[currentLang];
    Object.values(tables).forEach(tbl => tbl.innerHTML = '');
    const uaData = getOsBrowserByUA();
    const cpuMem = getCpuMemory();
    const ipData = await fetchIPData();

    // OS テーブル
    osUaChLabel.textContent = lang.os_ch;
    osUaLabel.textContent = lang.os_ua;
    [[lang.os, uaData.os],[lang.version, uaData.version],[lang.device, uaData.device]].forEach(([l,v]) => tables.os_ua.appendChild(createRow(l,v)));

    // Browser テーブル
    browserUaChLabel.textContent = lang.browser_ch;
    browserUaLabel.textContent = lang.browser_ua;
    [[lang.browser, uaData.browser],[lang.browserVersion, uaData.browserVersion],[lang.ua, navigator.userAgent]].forEach(([l,v]) => tables.browser_ua.appendChild(createRow(l,v)));

    // Screen
    [[lang.screen, `${screen.width}×${screen.height}`],[lang.viewport, `${window.innerWidth}×${window.innerHeight}`],[lang.colorDepth, screen.colorDepth],[lang.pixelDepth, screen.pixelDepth]].forEach(([l,v]) => tables.screen.appendChild(createRow(l,v)));

    // CPU
    [[lang.cpu, cpuMem.cores],[lang.cpuName, getCpuName()],[lang.memory, cpuMem.memory]].forEach(([l,v]) => tables.cpu.appendChild(createRow(l,v)));

    // Network
    [[lang.ipv4, ipData.ipv4],[lang.ipv6, ipData.ipv6],[lang.ip, ipData.currentIP],[lang.online, navigator.onLine?lang.online_yes:lang.online_no]].forEach(([l,v]) => tables.network.appendChild(createRow(l,v)));

    // Other
    [[lang.language, navigator.language],[lang.cookiesEnabled, navigator.cookieEnabled],[lang.fetchedAt, new Date().toLocaleString()],[lang.timezone, Intl.DateTimeFormat().resolvedOptions().timeZone]].forEach(([l,v]) => tables.other.appendChild(createRow(l,v)));
  }

  // --- Event Listeners ---
  btnJa.addEventListener('click', ()=>{currentLang="ja"; applyLang();});
  btnEn.addEventListener('click', ()=>{currentLang="en"; applyLang();});
  btnLight.addEventListener('click', ()=>{darkMode=false; applyTheme();});
  btnDark.addEventListener('click', ()=>{darkMode=true; applyTheme();});

  window.addEventListener('online', updateInfo);
  window.addEventListener('offline', updateInfo);

  // --- Initialize ---
  applyTheme();
  applyLang();
})();
