(function() {
  // ===== 言語辞書 =====
  const dict = {
    ja: {
      title: "デバイス情報",
      os_ch: "OS情報（UA-CH）",
      os_ua: "OS情報（User-Agent）",
      browser_ch: "ブラウザ情報（UA-CH）",
      browser_ua: "ブラウザ情報（User-Agent）",
      category: { os: "OS情報", browser: "ブラウザ情報", screen: "画面情報", cpu: "CPU・メモリ", network: "ネットワーク情報", other: "その他情報" },
      os: `<span class="selectable">OS名</span>`,
      version: `<span class="selectable">バージョン</span>`,
      device: `<span class="selectable">端末名</span>`,
      browser: `<span class="selectable">ブラウザ</span>`,
      browserVersion: `<span class="selectable">バージョン</span>`,
      ua: `<span class="selectable">ユーザーエージェント</span>`,
      screen: `<span class="selectable">画面解像度</span>`,
      viewport: `<span class="selectable">ビューポート</span>`,
      colorDepth: `<span class="selectable">色深度</span>`,
      pixelDepth: `<span class="selectable">ピクセル深度</span>`,
      cpu: `<span class="selectable">CPUコア数</span>`,
      cpuName: `<span class="selectable">CPU名</span>`,
      memory: `<span class="selectable">メモリ：最大 16GBまで</span>`,
      ipv4: `<span class="selectable">IPv4アドレス</span>`,
      ipv6: `<span class="selectable">IPv6アドレス</span>`,
      ip: `<span class="selectable">現在使用IP</span>`,
      online: `<span class="selectable">オンライン状態</span>`,
      language: `<span class="selectable">ブラウザ言語</span>`,
      cookiesEnabled: `<span class="selectable">クッキー有効</span>`,
      fetchedAt: `<span class="selectable">取得時刻</span>`,
      now: `<span class="selectable">現在時刻</span>`,
      timezone: `<span class="selectable">タイムゾーン</span>`,
      unknown: `<span class="selectable">不明</span>`,
      online_yes: `<span class="selectable">オンライン</span>`,
      online_no: `<span class="selectable">オフライン</span>`,
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
      category: { os: "OS Information", browser: "Browser Information", screen: "Screen Information", cpu: "CPU & Memory", network: "Network Information", other: "Other Information" },
      os: `<span class="selectable">Operating System</span>`,
      version: `<span class="selectable">Version</span>`,
      device: `<span class="selectable">Device Name</span>`,
      browser: `<span class="selectable">Browser</span>`,
      browserVersion: `<span class="selectable">Version</span>`,
      ua: `<span class="selectable">User Agent</span>`,
      screen: `<span class="selectable">Screen Resolution</span>`,
      viewport: `<span class="selectable">Viewport</span>`,
      colorDepth: `<span class="selectable">Color Depth</span>`,
      pixelDepth: `<span class="selectable">Pixel Depth</span>`,
      cpu: `<span class="selectable">CPU Cores</span>`,
      cpuName: `<span class="selectable">CPU Name</span>`,
      memory: `<span class="selectable">Memory: Max 16GB</span>`,
      ipv4: `<span class="selectable">IPv4 Address</span>`,
      ipv6: `<span class="selectable">IPv6 Address</span>`,
      ip: `<span class="selectable">Current IP</span>`,
      online: `<span class="selectable">Online Status</span>`,
      language: `<span class="selectable">Browser Language</span>`,
      cookiesEnabled: `<span class="selectable">Cookies Enabled</span>`,
      fetchedAt: `<span class="selectable">Fetched At</span>`,
      now: `<span class="selectable">Current Time</span>`,
      timezone: `<span class="selectable">Timezone</span>`,
      unknown: `<span class="selectable">Unknown</span>`,
      online_yes: `<span class="selectable">Online</span>`,
      online_no: `<span class="selectable">Offline</span>`,
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

  // ===== DOM Elements =====
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

  // ===== 設定 =====
  let currentLang = localStorage.getItem("lang") || (navigator.language.startsWith("ja") ? "ja" : "en");
  let darkMode = localStorage.getItem("mode") === "dark" || (localStorage.getItem("mode") === null && window.matchMedia('(prefers-color-scheme: dark)').matches);

  // ===== 端末判定関数 =====
  function detectDeviceByUA(ua) {
    ua = ua.toLowerCase();
    if (/android/.test(ua)) return "Android";
    if (/iphone/.test(ua)) return "iPhone";
    if (/ipad/.test(ua)) return "iPad";
    if (/macintosh|mac os x/.test(ua)) return "Mac";
    if (/windows/.test(ua)) return "Windows PC";
    if (/linux/.test(ua)) return "Linux";
    if (/chromebook/.test(ua)) return "Chromebook";
    if (/playstation/.test(ua)) return "PlayStation";
    if (/xbox/.test(ua)) return "Xbox";
    if (/nintendo/.test(ua)) return "Nintendo";
    return dict[currentLang].unknown;
  }

  function detectOSVersionByUA(ua) {
    let version = dict[currentLang].unknown;
    if (/android/.test(ua)) version = (ua.match(/android\s+([\d.]+)/) || [])[1] || version;
    else if (/iphone|ipad/.test(ua)) version = (ua.match(/os (\d+)[_.](\d+)/) || [])[1] || version;
    else if (/windows nt/.test(ua)) {
      const ver = (ua.match(/windows nt ([\d.]+)/) || [])[1];
      const map = {"10.0":"10/11","6.3":"8.1","6.2":"8","6.1":"7","6.0":"Vista","5.1":"XP"};
      version = map[ver] || ver || version;
    }
    else if (/mac os x/.test(ua)) version = (ua.match(/mac os x (\d+[_\.]\d+)/) || [])[1]?.replace("_",".") || version;
    return version;
  }

  function detectBrowserByUA(ua) {
    let browser = dict[currentLang].unknown, bver = dict[currentLang].unknown;
    if (/edg\//.test(ua)) browser="Microsoft Edge", bver=(ua.match(/edg\/([\d\.]+)/)||[])[1]||bver;
    else if (/opr\//.test(ua)) browser="Opera", bver=(ua.match(/opr\/([\d\.]+)/)||[])[1]||bver;
    else if (/chrome\//.test(ua)) browser="Chrome", bver=(ua.match(/chrome\/([\d\.]+)/)||[])[1]||bver;
    else if (/firefox\//.test(ua)) browser="Firefox", bver=(ua.match(/firefox\/([\d\.]+)/)||[])[1]||bver;
    else if (/safari/.test(ua) && !/chrome/.test(ua)) browser="Safari", bver=(ua.match(/version\/([\d\.]+)/)||[])[1]||bver;
    return { browser, bver };
  }

  function getCpuName() {
    const ua = navigator.userAgent;
    if (/arm|aarch64/i.test(ua)) return currentLang==="ja"?`ARM (推定)`:`ARM (Estimated)`;
    if (/x86_64|win64|wow64|amd64/i.test(ua)) return currentLang==="ja"?`x64 (推定)`:`x64 (Estimated)`;
    if (/i686|i386|x86/i.test(ua)) return currentLang==="ja"?`x86 (推定)`:`x86 (Estimated)`;
    if (/ppc|powerpc/i.test(ua)) return currentLang==="ja"?`PowerPC (推定)`:`PowerPC (Estimated)`;
    if (/mips/i.test(ua)) return currentLang==="ja"?`MIPS (推定)`:`MIPS (Estimated)`;
    return dict[currentLang].unknown;
  }

  // ===== IP取得 =====
  async function fetchIPData() {
    const ipv4 = await fetch('https://api.ipify.org?format=json').then(res=>res.json()).then(d=>d.ip||dict[currentLang].unknown).catch(()=>dict[currentLang].unknown);
    const ipv6 = await fetch('https://api64.ipify.org?format=json').then(res=>res.json()).then(d=>d.ip||dict[currentLang].unknown).catch(()=>dict[currentLang].unknown);
    const currentIP = (ipv6 && ipv6!==dict[currentLang].unknown)?ipv6:ipv4;
    return { ipv4, ipv6, currentIP };
  }

  // ===== テーブル作成 =====
  function createRow(label,value){
    const row=document.createElement('tr');
    row.innerHTML=`<th scope="row">${label}</th><td>${value||dict[currentLang].unknown}</td>`;
    return row;
  }

  // ===== 情報更新 =====
  async function updateInfo() {
    const lang = dict[currentLang];
    Object.values(tables).forEach(tbl=>tbl.innerHTML='');
    const ua = navigator.userAgent;
    const device = detectDeviceByUA(ua);
    const osVer = detectOSVersionByUA(ua);
    const { browser, bver } = detectBrowserByUA(ua);

    osUaLabel.innerHTML = lang.os_ua;
    tables.os_ua.appendChild(createRow(lang.os,device));
    tables.os_ua.appendChild(createRow(lang.version,osVer));
    tables.os_ua.appendChild(createRow(lang.device,device));

    browserUaLabel.innerHTML = lang.browser_ua;
    tables.browser_ua.appendChild(createRow(lang.browser,browser));
    tables.browser_ua.appendChild(createRow(lang.browserVersion,bver));

    // 画面情報
    [[lang.screen,`${screen.width} x ${screen.height}`],[lang.viewport,`${window.innerWidth} x ${window.innerHeight}`],[lang.colorDepth,screen.colorDepth],[lang.pixelDepth,screen.pixelDepth]].forEach(([l,v])=>tables.screen.appendChild(createRow(l,v)));

    // CPU/メモリ
    const cpuCores = typeof navigator.hardwareConcurrency==="number"?navigator.hardwareConcurrency:lang.unknown;
    const memory = typeof navigator.deviceMemory==="number"?`${Math.min(navigator.deviceMemory,16)} GB`:lang.unknown;
    [[lang.cpu,cpuCores],[lang.cpuName,getCpuName()],[lang.memory,memory]].forEach(([l,v])=>tables.cpu.appendChild(createRow(l,v)));

    // ネットワーク
    const {ipv4,ipv6,currentIP} = await fetchIPData();
    const onlineStatus = navigator.onLine?lang.online_yes:lang.online_no;
    [[lang.ipv4,ipv4],[lang.ipv6,ipv6],[lang.ip,currentIP],[lang.online,onlineStatus]].forEach(([l,v])=>tables.network.appendChild(createRow(l,v)));

    // その他
    [[lang.language,navigator.language||lang.unknown],[lang.cookiesEnabled,navigator.cookieEnabled?lang.online_yes:lang.online_no],[lang.fetchedAt,new Date().toLocaleString()],[lang.now,''],[lang.timezone,Intl.DateTimeFormat().resolvedOptions().timeZone||lang.unknown]].forEach(([l,v])=>tables.other.appendChild(createRow(l,v)));

    footerWarning.innerHTML = lang.footer.warning;
    footerLibrary.innerHTML = lang.footer.library;
  }

  // ===== 現在時刻更新 =====
  function updateCurrentTime() {
    const nowStr = new Date().toLocaleString();
    const rows = tables.other.querySelectorAll('tr');
    for(const row of rows){ if(row.firstElementChild?.textContent===dict[currentLang].now.replace(/<[^>]+>/g,'')){ row.lastElementChild.textContent=nowStr; break; } }
  }

  // ===== 言語切替 =====
  function setLang(lang){
    currentLang=lang;
    localStorage.setItem("lang",lang);
    titleEl.textContent=dict[lang].title;
    Object.entries(dict[lang].category).forEach(([key,label])=>{ if(sectionTitles[key]) sectionTitles[key].textContent=label; });
    btnJa.classList.toggle('active',lang==='ja');
    btnEn.classList.toggle('active',lang==='en');
    btnJa.setAttribute('aria-pressed',lang==='ja');
    btnEn.setAttribute('aria-pressed',lang==='en');
    btnLight.textContent=dict[lang].light+" / Light";
    btnDark.textContent=dict[lang].dark+" / Dark";
    document.body.setAttribute("lang",lang);
    updateInfo();
  }

  // ===== モード切替 =====
  function setMode(isDark){
    darkMode=isDark;
    localStorage.setItem("mode",isDark?"dark":"light");
    document.body.classList.toggle('light',!darkMode);
    btnLight.classList.toggle('active',!darkMode);
    btnDark.classList.toggle('active',darkMode);
    btnLight.setAttribute('aria-pressed',!darkMode);
    btnDark.setAttribute('aria-pressed',darkMode);
    favicon.href=isDark?'icon-dark.png':'icon-light.png';
  }

  // ===== イベント =====
  btnJa.addEventListener('click',()=>{ setLang('ja'); });
  btnEn.addEventListener('click',()=>{ setLang('en'); });
  btnLight.addEventListener('click',()=>setMode(false));
  btnDark.addEventListener('click',()=>setMode(true));

  setMode(darkMode);
  setLang(currentLang);
  setInterval(updateCurrentTime,1000);

})();
