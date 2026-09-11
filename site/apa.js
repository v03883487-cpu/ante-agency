// Ad Performance Analytics — client-side dashboard (demo mode: state lives in localStorage).
(function () {
  const root = document.getElementById('apa');
  if (!root) return;

  const L = (key, en) => (window.AF && window.AF.t(key)) || en;
  const lang = () => (window.AF ? window.AF.lang() : 'en');
  const LOCALES = { en: 'en-US', es: 'es-ES', pt: 'pt-BR', de: 'de-DE', ru: 'ru-RU' };
  const STORE = 'antefluence-apa-v1';
  const DAY = 86400000;
  const PLATFORMS = ['Twitch', 'Kick', 'YouTube', 'Telegram', 'Other'];
  const GEOS = ['DE', 'AT', 'CH', 'PL', 'FI', 'ES', 'PT', 'IT', 'CA', 'BR', 'MX'];
  const EVENTS = ['reg', 'ftd', 'dep'];
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ---------- dates ---------- */
  const startOfDay = d => { const x = new Date(d); x.setHours(0, 0, 0, 0); return x; };
  const today = () => startOfDay(new Date());
  const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
  const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const fromIso = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };

  /* ---------- formatting ---------- */
  const loc = () => LOCALES[lang()] || 'en-US';
  const money = v => new Intl.NumberFormat(loc(), { style: 'currency', currency: 'USD', maximumFractionDigits: v !== 0 && Math.abs(v) < 100 ? 2 : 0 }).format(v || 0);
  const num = v => new Intl.NumberFormat(loc(), { maximumFractionDigits: 0 }).format(v || 0);
  const pct = v => new Intl.NumberFormat(loc(), { style: 'percent', maximumFractionDigits: 1 }).format(isFinite(v) ? v : 0);
  const times = v => (isFinite(v) ? new Intl.NumberFormat(loc(), { maximumFractionDigits: 2 }).format(v) : '0') + 'x';
  const short = v => new Intl.NumberFormat(loc(), { notation: 'compact', maximumFractionDigits: 1 }).format(v || 0);

  /* ---------- state ---------- */
  function rng(seed) { return () => { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296; }; }
  const randId = (n = 6) => Array.from(crypto.getRandomValues(new Uint8Array(n)), b => 'abcdefghijkmnpqrstuvwxyz23456789'[b % 32]).join('');

  function spendFor(tr, day, isStreamDay) {
    switch (tr.model) {
      case 'fixed': return isStreamDay ? tr.cost : 0;
      case 'cpm': return day.views * tr.cost / 1000;
      case 'cpa': return day.ftd * tr.cost;
      case 'rs': return day.rev * tr.cost / 100;
      default: return 0;
    }
  }

  function genDay(tr, d, r, base) {
    const weekly = [0.85, 0.9, 1, 0.95, 1.05, 1.35, 1.3][d.getDay()];
    const streamDay = [2, 5, 6].includes(d.getDay());
    const factor = tr.model === 'fixed' ? (streamDay ? 1.6 : 0.35) : 1;
    const views = Math.round(base * weekly * factor * (0.75 + r() * 0.5));
    const clicks = Math.round(views * (0.025 + r() * 0.025));
    const regs = Math.round(clicks * (0.09 + r() * 0.07));
    const ftd = Math.round(regs * (0.26 + r() * 0.14));
    const rev = Math.round(ftd * (70 + r() * 90) + ftd * r() * 60);
    const day = { views, clicks, regs, ftd, rev, spend: 0 };
    day.spend = Math.round(spendFor(tr, day, streamDay) * 100) / 100;
    return day;
  }

  function seed() {
    const r = rng(20260911);
    const created = iso(addDays(today(), -90));
    const trackers = [
      { id: 'trk_kick01', name: 'Kick · Stream series A', creator: 'Creator 1', platform: 'Kick', geo: 'DE', url: 'https://brand.example/de', promo: 'ANTE50', model: 'fixed', cost: 900, status: 'active', created },
      { id: 'trk_twch02', name: 'Twitch · Integration B', creator: 'Creator 2', platform: 'Twitch', geo: 'CA', url: 'https://brand.example/ca', promo: 'ANTECA', model: 'cpm', cost: 45, status: 'active', created },
      { id: 'trk_ytb03', name: 'YouTube · Review C', creator: 'Creator 3', platform: 'YouTube', geo: 'BR', url: 'https://brand.example/br', promo: 'ANTEBR', model: 'cpa', cost: 45, status: 'active', created },
      { id: 'trk_tg04', name: 'Telegram · Posts D', creator: 'Creator 4', platform: 'Telegram', geo: 'PL', url: 'https://brand.example/pl', promo: 'ANTEPL', model: 'rs', cost: 30, status: 'paused', created }
    ];
    const bases = [5200, 3800, 2600, 1500];
    const daily = {};
    trackers.forEach((tr, i) => {
      daily[tr.id] = {};
      for (let n = 89; n >= 0; n--) {
        if (tr.status === 'paused' && n < 18) continue;
        const d = addDays(today(), -n);
        const trend = 0.72 + 0.56 * (1 - n / 89);
        daily[tr.id][iso(d)] = genDay(tr, d, r, bases[i] * trend);
      }
    });
    const conv = [];
    const now = Date.now();
    for (let k = 0; k < 48; k++) {
      const tr = trackers[Math.floor(r() * 3)];
      const event = r() < 0.55 ? 'reg' : r() < 0.7 ? 'ftd' : 'dep';
      conv.push({ ts: now - Math.round(r() * 3 * DAY), tid: tr.id, event, amount: event === 'reg' ? 0 : Math.round(20 + r() * 380), geo: tr.geo, src: r() < 0.75 ? 'postback' : 'pixel' });
    }
    conv.sort((a, b) => b.ts - a.ts);
    return { v: 1, trackers, daily, conv, pixels: { meta: { id: '', on: false }, tiktok: { id: '', on: false }, gads: { id: '', on: false }, ga4: { id: '', on: false } }, apiKey: 'af_live_' + randId(24) };
  }

  let state;
  try { state = JSON.parse(localStorage.getItem(STORE)); } catch { state = null; }
  if (!state || state.v !== 1) state = seed();
  const save = () => { try { localStorage.setItem(STORE, JSON.stringify(state)); } catch {} };
  save();

  const ui = { tab: 'overview', period: 30, tracker: '', platform: '', geo: '', sort: { key: 'rev', dir: -1 }, pbTracker: '' };

  /* ---------- aggregation ---------- */
  const trackerById = id => state.trackers.find(t => t.id === id);
  function filteredTrackers() {
    return state.trackers.filter(t => (!ui.tracker || t.id === ui.tracker) && (!ui.platform || t.platform === ui.platform) && (!ui.geo || t.geo === ui.geo));
  }
  function sumRange(trackers, from, to) {
    const s = { views: 0, clicks: 0, regs: 0, ftd: 0, rev: 0, spend: 0 };
    trackers.forEach(tr => {
      const days = state.daily[tr.id] || {};
      for (let d = new Date(from); d <= to; d = addDays(d, 1)) {
        const x = days[iso(d)];
        if (x) for (const k in s) s[k] += x[k] || 0;
      }
    });
    return s;
  }
  function derive(s) {
    return {
      ...s,
      ctr: s.views ? s.clicks / s.views : 0,
      cr: s.clicks ? s.regs / s.clicks : 0,
      cpa: s.regs ? s.spend / s.regs : 0,
      cac: s.ftd ? s.spend / s.ftd : 0,
      roas: s.spend ? s.rev / s.spend : 0,
      roi: s.spend ? (s.rev - s.spend) / s.spend : 0,
      epc: s.clicks ? s.rev / s.clicks : 0,
      cpm: s.views ? s.spend / s.views * 1000 : 0
    };
  }
  function range() {
    const to = today();
    const from = addDays(to, -(ui.period - 1));
    return { from, to, prevFrom: addDays(from, -ui.period), prevTo: addDays(from, -1) };
  }

  /* ---------- UI helpers ---------- */
  function toast(msg) {
    let el = document.querySelector('.apa-toast');
    if (!el) { el = document.createElement('div'); el.className = 'apa-toast'; el.setAttribute('role', 'status'); document.body.appendChild(el); }
    el.textContent = msg;
    el.classList.add('is-on');
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove('is-on'), 2200);
  }
  async function copy(text) {
    try { await navigator.clipboard.writeText(text); } catch {
      const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove();
    }
    toast(L('apa.copied', 'Copied'));
  }
  function download(name, text, type = 'text/csv') {
    const url = URL.createObjectURL(new Blob(['﻿' + text], { type: type + ';charset=utf-8' }));
    const a = document.createElement('a'); a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  const slug = s => String(s).toLowerCase().normalize('NFKD').replace(/[^\w]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40) || 'campaign';
  function trackingLink(tr) {
    try {
      const u = new URL(tr.url);
      u.searchParams.set('utm_source', 'antefluence');
      u.searchParams.set('utm_medium', 'influencer');
      u.searchParams.set('utm_campaign', slug(tr.name));
      u.searchParams.set('utm_content', tr.platform.toLowerCase());
      u.searchParams.set('utm_term', slug(tr.creator));
      u.searchParams.set('af_tid', tr.id);
      if (tr.promo) u.searchParams.set('promo', tr.promo);
      return u.toString();
    } catch { return tr.url; }
  }
  const postbackUrl = id => `https://postback.antefluence.com/c/${id}?event={event}&amount={amount}&currency={currency}&txid={txid}&geo={geo}`;
  const modelLabel = m => ({ fixed: L('apa.m.fixed', 'Fixed per integration'), cpm: 'CPM', cpa: L('apa.m.cpa', 'CPA (per FTD)'), rs: 'RevShare' }[m] || m);
  const costLabel = tr => tr.model === 'rs' ? `${tr.cost}%` : tr.model === 'cpm' ? `${money(tr.cost)} CPM` : money(tr.cost);
  const eventLabel = e => ({ reg: L('apa.e.reg', 'Registration'), ftd: L('apa.e.ftd', 'First deposit'), dep: L('apa.e.dep', 'Deposit') }[e] || e);
  const srcLabel = s => ({ postback: L('apa.s.postback', 'Postback'), pixel: L('apa.s.pixel', 'Pixel'), import: L('apa.s.import', 'Import'), manual: L('apa.s.manual', 'Manual'), sim: L('apa.s.sim', 'Simulation') }[s] || s);
  const options = (list, sel, all) => (all ? `<option value="">${esc(all)}</option>` : '') + list.map(([v, l]) => `<option value="${esc(v)}"${v === sel ? ' selected' : ''}>${esc(l)}</option>`).join('');

  /* ---------- conversion bookkeeping ---------- */
  function applyConversion({ tid, event, amount, geo, date, src }) {
    const tr = trackerById(tid);
    if (!tr) return false;
    const key = iso(date);
    const days = state.daily[tid] || (state.daily[tid] = {});
    const d = days[key] || (days[key] = { views: 0, clicks: 0, regs: 0, ftd: 0, rev: 0, spend: 0 });
    amount = Math.max(0, Number(amount) || 0);
    if (event === 'reg') { d.regs += 1; d.clicks = Math.max(d.clicks, d.regs); }
    if (event === 'ftd') { d.ftd += 1; d.rev += amount; if (tr.model === 'cpa') d.spend += tr.cost; }
    if (event === 'dep') d.rev += amount;
    if (tr.model === 'rs' && event !== 'reg') d.spend += amount * tr.cost / 100;
    const ts = key === iso(today()) ? Date.now() : date.getTime() + 12 * 3600000;
    state.conv.unshift({ ts, tid, event, amount: event === 'reg' ? 0 : amount, geo: geo || tr.geo, src });
    state.conv = state.conv.slice(0, 500);
    return true;
  }

  /* ---------- renderers ---------- */
  function toolbar() {
    const trs = state.trackers.map(t => [t.id, t.name]);
    const plats = [...new Set(state.trackers.map(t => t.platform))].map(p => [p, p]);
    const geos = [...new Set(state.trackers.map(t => t.geo))].sort().map(g => [g, g]);
    return `
      <div class="apa-top">
        <div class="apa-brand"><img src="assets/web/logo-mark.webp" alt="" /><b>Ad Performance Analytics</b><span class="badge demo">${esc(L('apa.demoBadge', 'Demo'))}</span></div>
        <div class="apa-actions">
          <button type="button" class="apa-btn" data-action="export">${esc(L('apa.export', 'Export CSV'))}</button>
          <button type="button" class="apa-btn ghost" data-action="reset">${esc(L('apa.reset', 'Reset demo'))}</button>
        </div>
      </div>
      <div class="apa-bar">
        <div class="seg" role="group" aria-label="Period">
          ${[7, 30, 90].map(p => `<button type="button" data-period="${p}" aria-pressed="${ui.period === p}">${esc(L('apa.period.' + p, p + ' days'))}</button>`).join('')}
        </div>
        <div class="apa-filters">
          <select class="field" data-filter="tracker" aria-label="Tracker">${options(trs, ui.tracker, L('apa.f.tracker', 'All trackers'))}</select>
          <select class="field" data-filter="platform" aria-label="Platform">${options(plats, ui.platform, L('apa.f.platform', 'All platforms'))}</select>
          <select class="field" data-filter="geo" aria-label="GEO">${options(geos, ui.geo, L('apa.f.geo', 'All GEOs'))}</select>
        </div>
      </div>
      <div class="apa-tabs" role="tablist">
        ${[['overview', L('apa.tab.overview', 'Overview')], ['trackers', L('apa.tab.trackers', 'Trackers')], ['conv', L('apa.tab.conv', 'Conversions')], ['integr', L('apa.tab.integr', 'Integrations')]]
          .map(([id, label]) => `<button type="button" role="tab" data-tab="${id}" aria-selected="${ui.tab === id}">${esc(label)}${id === 'trackers' ? ` <span class="count">${state.trackers.length}</span>` : ''}</button>`).join('')}
      </div>`;
  }

  function kpi(label, value, cur, prev, invert) {
    let delta = '';
    if (prev > 0 && isFinite(cur)) {
      const ch = (cur - prev) / prev;
      const good = invert ? ch <= 0 : ch >= 0;
      delta = `<span class="delta ${good ? 'up' : 'down'}">${ch >= 0 ? '▲' : '▼'} ${pct(Math.abs(ch))}</span>`;
    }
    return `<div class="apa-kpi"><span>${esc(label)}</span><b>${value}</b>${delta}</div>`;
  }

  function chartSvg(series) {
    const W = 800, H = 260, P = { l: 56, r: 14, t: 16, b: 30 };
    const n = series.length;
    const max = Math.max(1, ...series.map(d => Math.max(d.spend, d.rev))) * 1.12;
    const x = i => P.l + (n === 1 ? 0 : i * (W - P.l - P.r) / (n - 1));
    const y = v => H - P.b - v / max * (H - P.t - P.b);
    const line = key => series.map((d, i) => `${x(i).toFixed(1)},${y(d[key]).toFixed(1)}`).join(' ');
    const grid = [0, 0.25, 0.5, 0.75, 1].map(f => {
      const v = max * f, yy = y(v).toFixed(1);
      return `<line x1="${P.l}" x2="${W - P.r}" y1="${yy}" y2="${yy}" class="grid"/><text x="${P.l - 8}" y="${+yy + 4}" text-anchor="end">${esc('$' + short(v))}</text>`;
    }).join('');
    const step = Math.max(1, Math.ceil(n / 7));
    const labels = series.map((d, i) => (i % step === 0 || i === n - 1) ? `<text x="${x(i).toFixed(1)}" y="${H - 8}" text-anchor="middle">${esc(d.label)}</text>` : '').join('');
    const area = `${P.l},${H - P.b} ${line('rev')} ${x(n - 1).toFixed(1)},${H - P.b}`;
    return `<svg viewBox="0 0 ${W} ${H}" class="apa-chart-svg" role="img" aria-label="${esc(L('apa.chart.title', 'Spend and deposits'))}">
      <defs><linearGradient id="apaArea" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#7b4dff" stop-opacity=".22"/><stop offset="1" stop-color="#7b4dff" stop-opacity="0"/></linearGradient></defs>
      ${grid}${labels}
      <polygon points="${area}" fill="url(#apaArea)"/>
      <polyline points="${line('spend')}" class="l-spend"/>
      <polyline points="${line('rev')}" class="l-rev"/>
      <line class="hover-line" x1="0" x2="0" y1="${P.t}" y2="${H - P.b}" visibility="hidden"/>
      <rect class="hover-zone" x="${P.l}" y="${P.t}" width="${W - P.l - P.r}" height="${H - P.t - P.b}" fill="transparent"/>
    </svg>`;
  }

  function overview() {
    const trs = filteredTrackers();
    const { from, to, prevFrom, prevTo } = range();
    const cur = derive(sumRange(trs, from, to));
    const prev = derive(sumRange(trs, prevFrom, prevTo));
    const kpis = [
      kpi(L('apa.k.spend', 'Spend'), money(cur.spend), cur.spend, prev.spend, true),
      kpi(L('apa.k.clicks', 'Clicks'), num(cur.clicks), cur.clicks, prev.clicks),
      kpi(L('apa.k.regs', 'Registrations'), num(cur.regs), cur.regs, prev.regs),
      kpi(L('apa.k.ftd', 'First deposits'), num(cur.ftd), cur.ftd, prev.ftd),
      kpi(L('apa.k.rev', 'Deposits'), money(cur.rev), cur.rev, prev.rev),
      kpi('ROAS', times(cur.roas), cur.roas, prev.roas),
      kpi('CAC', money(cur.cac), cur.cac, prev.cac, true),
      kpi('ROI', pct(cur.roi), cur.roi, prev.roi)
    ].join('');
    const small = [
      [L('apa.k.views', 'Views'), num(cur.views)], ['CTR', pct(cur.ctr)], [L('apa.k.cr', 'Click → reg'), pct(cur.cr)],
      [L('apa.k.cpa', 'CPA (reg)'), money(cur.cpa)], ['EPC', money(cur.epc)], ['CPM', money(cur.cpm)]
    ].map(([l, v]) => `<div><span>${esc(l)}</span><b>${v}</b></div>`).join('');

    const series = [];
    for (let d = new Date(from); d <= to; d = addDays(d, 1)) {
      const s = sumRange(trs, d, d);
      series.push({ date: iso(d), label: new Intl.DateTimeFormat(loc(), { day: 'numeric', month: 'short' }).format(d), spend: s.spend, rev: s.rev });
    }

    const rows = trs.map(tr => ({ tr, s: derive(sumRange([tr], from, to)) }));
    const k = ui.sort.key;
    rows.sort((a, b) => ((a.s[k] ?? 0) - (b.s[k] ?? 0)) * ui.sort.dir);
    const th = (key, label) => `<th><button type="button" class="sort" data-sort="${key}" aria-sort="${k === key ? (ui.sort.dir < 0 ? 'descending' : 'ascending') : 'none'}">${esc(label)}${k === key ? (ui.sort.dir < 0 ? ' ↓' : ' ↑') : ''}</button></th>`;
    const table = rows.length ? `
      <div class="table-wrap"><table class="data-table apa-table">
        <thead><tr><th>${esc(L('apa.t.tracker', 'Tracker'))}</th>${th('clicks', L('apa.k.clicks', 'Clicks'))}${th('regs', L('apa.k.regs', 'Registrations'))}${th('ftd', 'FTD')}${th('spend', L('apa.k.spend', 'Spend'))}${th('rev', L('apa.k.rev', 'Deposits'))}${th('roas', 'ROAS')}${th('cac', 'CAC')}</tr></thead>
        <tbody>${rows.map(({ tr, s }) => `<tr>
          <td><b>${esc(tr.name)}</b><br><small>${esc(tr.platform)} · ${esc(tr.geo)} · ${esc(tr.creator)}</small></td>
          <td>${num(s.clicks)}</td><td>${num(s.regs)}</td><td>${num(s.ftd)}</td><td>${money(s.spend)}</td><td>${money(s.rev)}</td>
          <td><span class="${s.roas >= 1 ? 'pos' : 'neg'}">${times(s.roas)}</span></td><td>${money(s.cac)}</td></tr>`).join('')}</tbody>
      </table></div>` : `<p class="empty-state">${esc(L('apa.t.empty', 'No data for these filters.'))}</p>`;

    const byGeo = {};
    rows.forEach(({ tr, s }) => { byGeo[tr.geo] = (byGeo[tr.geo] || 0) + s.rev; });
    const geoMax = Math.max(1, ...Object.values(byGeo));
    const geoBars = Object.entries(byGeo).sort((a, b) => b[1] - a[1]).map(([g, v]) =>
      `<div class="geo-row"><span>${esc(g)}</span><div class="bar"><i style="width:${(v / geoMax * 100).toFixed(1)}%"></i></div><b>${money(v)}</b></div>`).join('') ||
      `<p class="small-note">${esc(L('apa.t.empty', 'No data for these filters.'))}</p>`;

    return `
      <div class="apa-kpis">${kpis}</div>
      <p class="apa-vs">${esc(L('apa.vsprev', 'Change vs the previous period of the same length'))}</p>
      <div class="apa-small">${small}</div>
      <div class="apa-grid">
        <div class="apa-card apa-chart">
          <div class="apa-card-head"><h3>${esc(L('apa.chart.title', 'Spend and deposits'))}</h3>
            <div class="legend"><span class="lg-rev">${esc(L('apa.k.rev', 'Deposits'))}</span><span class="lg-spend">${esc(L('apa.k.spend', 'Spend'))}</span></div></div>
          <div class="chart-wrap" data-series='${esc(JSON.stringify(series.map(s => [s.label, s.spend, s.rev])))}'>${chartSvg(series)}<div class="chart-tip" hidden></div></div>
        </div>
        <div class="apa-card">
          <div class="apa-card-head"><h3>${esc(L('apa.geo.title', 'Deposits by GEO'))}</h3></div>
          <div class="geo-bars">${geoBars}</div>
        </div>
      </div>
      <div class="apa-card">
        <div class="apa-card-head"><h3>${esc(L('apa.t.title', 'By tracker'))}</h3></div>
        ${table}
      </div>`;
  }

  function trackersTab() {
    const list = state.trackers.length ? state.trackers.map(tr => {
      const link = trackingLink(tr);
      return `<div class="trk" data-id="${esc(tr.id)}">
        <div class="trk-main">
          <div class="trk-title"><b>${esc(tr.name)}</b> <code class="code-inline">${esc(tr.id)}</code>
            <button type="button" class="status-toggle ${tr.status}" data-action="toggle">${esc(tr.status === 'active' ? L('apa.tr.active', 'Active') : L('apa.tr.paused', 'Paused'))}</button></div>
          <small>${esc(tr.creator)} · ${esc(tr.platform)} · ${esc(tr.geo)} · ${esc(modelLabel(tr.model))}: ${esc(costLabel(tr))}${tr.promo ? ` · ${esc(L('apa.tr.promo', 'Promo code'))}: ${esc(tr.promo)}` : ''}</small>
          <div class="trk-link"><span>${esc(L('apa.tr.link', 'Tracking link'))}</span><code title="${esc(link)}">${esc(link)}</code></div>
        </div>
        <div class="trk-actions">
          <button type="button" class="apa-btn" data-action="copy-link">${esc(L('apa.tr.copyLink', 'Copy link'))}</button>
          <button type="button" class="apa-btn ghost" data-action="copy-pb">${esc(L('apa.tr.copyPb', 'Copy postback'))}</button>
          <button type="button" class="apa-btn ghost" data-action="sim">${esc(L('apa.tr.sim', 'Simulate traffic'))}</button>
          <button type="button" class="apa-btn danger" data-action="delete">${esc(L('apa.tr.del', 'Delete'))}</button>
        </div>
      </div>`;
    }).join('') : `<p class="empty-state">${esc(L('apa.tr.none', 'No trackers yet — create the first one.'))}</p>`;

    return `
      <div class="apa-grid tr-grid">
        <form class="apa-card form-grid" id="apa-new" novalidate>
          <div class="apa-card-head"><h3>${esc(L('apa.tr.new', 'New tracker'))}</h3></div>
          <label>${esc(L('apa.tr.name', 'Name'))}<input class="field" name="name" required maxlength="60" placeholder="Kick · Stream series" /></label>
          <label>${esc(L('apa.tr.creator', 'Creator'))}<input class="field" name="creator" maxlength="40" placeholder="Creator" /></label>
          <div class="two">
            <label>${esc(L('apa.tr.platform', 'Platform'))}<select class="field" name="platform">${options(PLATFORMS.map(p => [p, p]), 'Kick')}</select></label>
            <label>GEO<select class="field" name="geo">${options(GEOS.map(g => [g, g]), 'DE')}</select></label>
          </div>
          <label>${esc(L('apa.tr.url', 'Landing URL'))}<input class="field" name="url" type="url" required placeholder="https://brand.com/landing" /></label>
          <label>${esc(L('apa.tr.promo', 'Promo code'))}<input class="field" name="promo" maxlength="24" placeholder="PROMO" /></label>
          <div class="two">
            <label>${esc(L('apa.tr.model', 'Cost model'))}<select class="field" name="model">${options([['fixed', modelLabel('fixed')], ['cpm', 'CPM'], ['cpa', modelLabel('cpa')], ['rs', 'RevShare %']], 'fixed')}</select></label>
            <label>${esc(L('apa.tr.cost', 'Cost'))}<input class="field" name="cost" type="number" min="0" step="0.01" value="500" /></label>
          </div>
          <p class="form-err" hidden></p>
          <button class="btn btn-dark" type="submit">${esc(L('apa.tr.create', 'Create tracker'))}</button>
          <p class="small-note">${esc(L('apa.tr.note', 'Tracking links carry UTM tags and the tracker ID, so clicks are attributed in any analytics. Postbacks go to your personal endpoint, issued when your account is connected.'))}</p>
        </form>
        <div class="apa-card">
          <div class="apa-card-head"><h3>${esc(L('apa.tr.list', 'Your trackers'))}</h3></div>
          <div class="trk-list">${list}</div>
        </div>
      </div>`;
  }

  function convTab() {
    const trs = filteredTrackers();
    const ids = new Set(trs.map(t => t.id));
    const log = state.conv.filter(c => ids.has(c.tid)).slice(0, 50);
    const dt = new Intl.DateTimeFormat(loc(), { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
    const rows = log.map(c => `<tr><td>${esc(dt.format(new Date(c.ts)))}</td><td>${esc((trackerById(c.tid) || {}).name || c.tid)}</td>
      <td><span class="ev ev-${esc(c.event)}">${esc(eventLabel(c.event))}</span></td><td>${c.event === 'reg' ? '—' : money(c.amount)}</td><td>${esc(c.geo)}</td><td>${esc(srcLabel(c.src))}</td></tr>`).join('');
    const trOpts = state.trackers.map(t => [t.id, t.name]);
    return `
      <div class="apa-grid tr-grid">
        <div class="apa-card">
          <form class="form-grid" id="apa-add" novalidate>
            <div class="apa-card-head"><h3>${esc(L('apa.c.add', 'Add a conversion'))}</h3></div>
            <label>${esc(L('apa.t.tracker', 'Tracker'))}<select class="field" name="tid">${options(trOpts, trOpts[0] && trOpts[0][0])}</select></label>
            <div class="two">
              <label>${esc(L('apa.c.event', 'Event'))}<select class="field" name="event">${options(EVENTS.map(e => [e, eventLabel(e)]), 'ftd')}</select></label>
              <label>${esc(L('apa.c.amount', 'Amount, $'))}<input class="field" name="amount" type="number" min="0" step="0.01" value="100" /></label>
            </div>
            <div class="two">
              <label>GEO<select class="field" name="geo">${options(GEOS.map(g => [g, g]), 'DE')}</select></label>
              <label>${esc(L('apa.c.date', 'Date'))}<input class="field" name="date" type="date" value="${iso(today())}" max="${iso(today())}" /></label>
            </div>
            <button class="btn btn-dark" type="submit">${esc(L('apa.c.save', 'Add conversion'))}</button>
          </form>
          <div class="apa-sep"></div>
          <div class="apa-card-head"><h3>${esc(L('apa.c.more', 'Other ways in'))}</h3></div>
          <div class="apa-stack">
            <button type="button" class="apa-btn" data-action="test-pb">${esc(L('apa.c.test', 'Send a test postback'))}</button>
            <label class="apa-btn ghost file-btn">${esc(L('apa.c.import', 'Import CSV'))}<input type="file" accept=".csv,text/csv" data-action="import" hidden /></label>
            <button type="button" class="apa-btn ghost" data-action="template">${esc(L('apa.c.tpl', 'Download CSV template'))}</button>
          </div>
          <p class="small-note">${esc(L('apa.c.fmt', 'CSV columns: date, tracker_id, event (reg / ftd / dep), amount, geo.'))}</p>
        </div>
        <div class="apa-card">
          <div class="apa-card-head"><h3>${esc(L('apa.c.log', 'Latest conversions'))}</h3></div>
          ${rows ? `<div class="table-wrap"><table class="data-table apa-table"><thead><tr><th>${esc(L('apa.c.time', 'Time'))}</th><th>${esc(L('apa.t.tracker', 'Tracker'))}</th><th>${esc(L('apa.c.event', 'Event'))}</th><th>${esc(L('apa.c.amountShort', 'Amount'))}</th><th>GEO</th><th>${esc(L('apa.c.source', 'Source'))}</th></tr></thead><tbody>${rows}</tbody></table></div>`
            : `<p class="empty-state">${esc(L('apa.c.none', 'No conversions yet.'))}</p>`}
        </div>
      </div>`;
  }

  function integrTab() {
    const trOpts = state.trackers.map(t => [t.id, t.name]);
    const sel = ui.pbTracker && trackerById(ui.pbTracker) ? ui.pbTracker : (trOpts[0] && trOpts[0][0]) || 'trk_xxxxxx';
    const px = [
      ['meta', 'Meta Pixel', 'Pixel ID'], ['tiktok', 'TikTok Pixel', 'Pixel ID'], ['gads', 'Google Ads', 'Conversion ID'], ['ga4', 'Google Analytics 4', 'Measurement ID']
    ].map(([k, name, idLabel]) => {
      const p = state.pixels[k] || { id: '', on: false };
      return `<form class="px-card" data-pixel="${k}">
        <div class="px-head"><b>${esc(name)}</b><span class="status ${p.on ? '' : 'status-off'}">${esc(p.on ? L('apa.i.on', 'Connected') : L('apa.i.off', 'Not connected'))}</span></div>
        <div class="px-row"><input class="field" name="id" value="${esc(p.id)}" placeholder="${esc(idLabel)}" aria-label="${esc(idLabel)}" /><button class="apa-btn" type="submit">${esc(p.on ? L('apa.i.update', 'Update') : L('apa.i.connect', 'Connect'))}</button>${p.on ? `<button class="apa-btn ghost" type="button" data-action="px-off">${esc(L('apa.i.disconnect', 'Disconnect'))}</button>` : ''}</div>
        <small>reg → CompleteRegistration · ftd → Purchase · dep → Deposit</small>
      </form>`;
    }).join('');
    const masked = state.apiKey.slice(0, 12) + '•'.repeat(12) + state.apiKey.slice(-4);
    return `
      <div class="apa-grid">
        <div class="apa-card">
          <div class="apa-card-head"><h3>${esc(L('apa.i.pb', 'S2S postback'))}</h3></div>
          <p class="small-note">${esc(L('apa.i.pb.d', 'Brands and affiliate networks send conversions to this URL; the macros in curly brackets are replaced on their side.'))}</p>
          <label class="form-grid" style="margin-top:14px">${esc(L('apa.t.tracker', 'Tracker'))}<select class="field" data-action="pb-tracker">${options(trOpts, sel)}</select></label>
          <div class="code-box"><code id="apa-pb">${esc(postbackUrl(sel))}</code><button class="copy" type="button" data-action="copy-code" data-target="#apa-pb">${esc(L('pa.copy', 'Copy'))}</button></div>
          <div class="table-wrap" style="margin-top:16px"><table class="data-table macro-table"><tbody>
            <tr><td><code>{event}</code></td><td>reg · ftd · dep</td></tr>
            <tr><td><code>{amount}</code></td><td>${esc(L('apa.i.m.amount', 'Deposit amount'))}</td></tr>
            <tr><td><code>{currency}</code></td><td>USD, EUR, BRL…</td></tr>
            <tr><td><code>{txid}</code></td><td>${esc(L('apa.i.m.txid', 'Unique transaction ID — protects against duplicates'))}</td></tr>
            <tr><td><code>{geo}</code></td><td>${esc(L('pa.m.geo', "Player's country"))}</td></tr>
          </tbody></table></div>
        </div>
        <div class="apa-card">
          <div class="apa-card-head"><h3>${esc(L('apa.i.px', 'Ad pixels'))}</h3></div>
          <p class="small-note">${esc(L('apa.i.px.d', 'Pass registrations and deposits to ad platforms so their algorithms optimise for paying players.'))}</p>
          <div class="px-list">${px}</div>
        </div>
      </div>
      <div class="apa-card">
        <div class="apa-card-head"><h3>API</h3></div>
        <p class="small-note">${esc(L('apa.i.api.d', 'Pull statistics into your BI, spreadsheets or CRM.'))}</p>
        <div class="code-box"><code id="apa-key">${esc(masked)}</code><button class="copy" type="button" data-action="copy-key">${esc(L('pa.copy', 'Copy'))}</button></div>
        <div class="code-box"><code id="apa-curl">curl -H "Authorization: Bearer ${esc(masked)}" "https://api.antefluence.com/v1/stats?from=${iso(range().from)}&amp;to=${iso(today())}&amp;group=tracker"</code><button class="copy" type="button" data-action="copy-code" data-target="#apa-curl">${esc(L('pa.copy', 'Copy'))}</button></div>
        <div class="apa-stack" style="margin-top:14px"><button type="button" class="apa-btn ghost" data-action="regen">${esc(L('apa.i.regen', 'Generate a new key'))}</button></div>
        <p class="small-note">${esc(L('apa.i.note', 'Postback endpoint and API become active once your account is connected.'))}</p>
      </div>`;
  }

  function render() {
    const body = { overview, trackers: trackersTab, conv: convTab, integr: integrTab }[ui.tab]();
    root.innerHTML = toolbar() + `<div class="apa-body" role="tabpanel">${body}</div>`;
    bindChart();
  }

  /* ---------- chart hover ---------- */
  function bindChart() {
    const wrap = root.querySelector('.chart-wrap');
    if (!wrap) return;
    const data = JSON.parse(wrap.dataset.series);
    const svg = wrap.querySelector('svg'), zone = svg.querySelector('.hover-zone'), hl = svg.querySelector('.hover-line'), tip = wrap.querySelector('.chart-tip');
    const P = { l: 56, r: 14 }, W = 800;
    zone.addEventListener('mousemove', e => {
      const rect = svg.getBoundingClientRect();
      const vx = (e.clientX - rect.left) / rect.width * W;
      const i = Math.max(0, Math.min(data.length - 1, Math.round((vx - P.l) / ((W - P.l - P.r) / Math.max(1, data.length - 1)))));
      const xx = P.l + i * (W - P.l - P.r) / Math.max(1, data.length - 1);
      hl.setAttribute('x1', xx); hl.setAttribute('x2', xx); hl.setAttribute('visibility', 'visible');
      const [label, spend, rev] = data[i];
      tip.innerHTML = `<b>${esc(label)}</b><span class="lg-rev">${esc(L('apa.k.rev', 'Deposits'))}: ${money(rev)}</span><span class="lg-spend">${esc(L('apa.k.spend', 'Spend'))}: ${money(spend)}</span>`;
      tip.hidden = false;
      const px = xx / W * rect.width;
      tip.style.left = Math.min(Math.max(px, 80), rect.width - 80) + 'px';
    });
    zone.addEventListener('mouseleave', () => { hl.setAttribute('visibility', 'hidden'); tip.hidden = true; });
  }

  /* ---------- actions ---------- */
  function simulate(tr, days = 7) {
    const r = rng(Date.now() % 100000);
    for (let n = days - 1; n >= 0; n--) {
      const d = addDays(today(), -n);
      const day = genDay(tr, d, r, 1800 + r() * 2200);
      const cur = state.daily[tr.id][iso(d)] || { views: 0, clicks: 0, regs: 0, ftd: 0, rev: 0, spend: 0 };
      for (const k in cur) cur[k] += day[k];
      state.daily[tr.id][iso(d)] = cur;
    }
    for (let k = 0; k < 6; k++) {
      const event = EVENTS[Math.floor(r() * 3)];
      state.conv.unshift({ ts: Date.now() - Math.round(r() * DAY), tid: tr.id, event, amount: event === 'reg' ? 0 : Math.round(30 + r() * 300), geo: tr.geo, src: 'sim' });
    }
  }

  function exportCsv() {
    const { from, to } = range();
    const head = ['tracker_id', 'name', 'creator', 'platform', 'geo', 'views', 'clicks', 'registrations', 'ftd', 'spend_usd', 'deposits_usd', 'ctr', 'cpa', 'cac', 'roas', 'roi'];
    const lines = filteredTrackers().map(tr => {
      const s = derive(sumRange([tr], from, to));
      return [tr.id, tr.name, tr.creator, tr.platform, tr.geo, s.views, s.clicks, s.regs, s.ftd, s.spend.toFixed(2), s.rev.toFixed(2), s.ctr.toFixed(4), s.cpa.toFixed(2), s.cac.toFixed(2), s.roas.toFixed(2), s.roi.toFixed(4)]
        .map(v => `"${String(v).replace(/"/g, '""')}"`).join(',');
    });
    download(`antefluence-report-${iso(from)}_${iso(to)}.csv`, [head.join(','), ...lines].join('\n'));
  }

  function importCsv(file) {
    const reader = new FileReader();
    reader.onload = () => {
      let ok = 0;
      String(reader.result).split(/\r?\n/).forEach(line => {
        const cols = line.split(/[;,]/).map(s => s.trim().replace(/^"|"$/g, ''));
        if (cols.length < 3 || /date/i.test(cols[0])) return;
        const [date, tid, event, amount, geo] = cols;
        if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !EVENTS.includes(event) || !trackerById(tid)) return;
        if (applyConversion({ tid, event, amount, geo: (geo || '').toUpperCase(), date: fromIso(date), src: 'import' })) ok++;
      });
      save(); render();
      toast(ok ? L('apa.c.imported', 'Imported: {n}').replace('{n}', ok) : L('apa.c.bad', 'Nothing imported — check the file against the template.'));
    };
    reader.readAsText(file);
  }

  root.addEventListener('click', e => {
    const b = e.target.closest('button, [data-tab]');
    if (!b || !root.contains(b)) return;
    if (b.dataset.tab) { ui.tab = b.dataset.tab; render(); return; }
    if (b.dataset.period) { ui.period = Number(b.dataset.period); render(); return; }
    if (b.dataset.sort) {
      ui.sort = { key: b.dataset.sort, dir: ui.sort.key === b.dataset.sort ? -ui.sort.dir : -1 };
      render(); return;
    }
    const action = b.dataset.action;
    const card = b.closest('.trk');
    const tr = card && trackerById(card.dataset.id);
    switch (action) {
      case 'export': exportCsv(); break;
      case 'reset':
        if (confirm(L('apa.resetq', 'Reset demo data? Trackers and conversions in this browser will be replaced.'))) { state = seed(); save(); render(); }
        break;
      case 'toggle': tr.status = tr.status === 'active' ? 'paused' : 'active'; save(); render(); break;
      case 'copy-link': copy(trackingLink(tr)); break;
      case 'copy-pb': copy(postbackUrl(tr.id)); break;
      case 'sim': simulate(tr); save(); render(); toast(L('apa.tr.simmed', 'Added 7 days of simulated traffic')); break;
      case 'delete':
        if (confirm(L('apa.tr.delq', 'Delete this tracker and all its data?'))) {
          state.trackers = state.trackers.filter(t => t.id !== tr.id);
          delete state.daily[tr.id];
          state.conv = state.conv.filter(c => c.tid !== tr.id);
          if (ui.tracker === tr.id) ui.tracker = '';
          save(); render();
        }
        break;
      case 'test-pb': {
        const active = state.trackers.filter(t => t.status === 'active');
        if (!active.length) { toast(L('apa.tr.none', 'No trackers yet — create the first one.')); break; }
        const t = active[Math.floor(Math.random() * active.length)];
        const event = EVENTS[Math.floor(Math.random() * 3)];
        applyConversion({ tid: t.id, event, amount: Math.round(30 + Math.random() * 300), geo: t.geo, date: today(), src: 'postback' });
        save(); render();
        toast(`${L('apa.c.received', 'Postback received')}: ${eventLabel(event)} · ${t.name}`);
        break;
      }
      case 'template':
        download('antefluence-conversions-template.csv', `date,tracker_id,event,amount,geo\n${iso(today())},${(state.trackers[0] || { id: 'trk_xxxxxx' }).id},ftd,120,DE\n${iso(today())},${(state.trackers[0] || { id: 'trk_xxxxxx' }).id},reg,0,DE`);
        break;
      case 'copy-code': copy(root.querySelector(b.dataset.target).textContent); break;
      case 'copy-key': copy(state.apiKey); break;
      case 'regen': state.apiKey = 'af_live_' + randId(24); save(); render(); toast(L('apa.i.regened', 'New API key generated')); break;
      case 'px-off': {
        const k = b.closest('[data-pixel]').dataset.pixel;
        state.pixels[k] = { id: state.pixels[k].id, on: false }; save(); render();
        break;
      }
    }
  });

  root.addEventListener('change', e => {
    const el = e.target;
    if (el.dataset.filter) { ui[el.dataset.filter] = el.value; render(); }
    if (el.dataset.action === 'pb-tracker') { ui.pbTracker = el.value; root.querySelector('#apa-pb').textContent = postbackUrl(el.value); }
    if (el.dataset.action === 'import' && el.files[0]) importCsv(el.files[0]);
    if (el.form && el.form.id === 'apa-add' && el.name === 'tid') {
      const t = trackerById(el.value);
      if (t) el.form.elements.geo.value = GEOS.includes(t.geo) ? t.geo : el.form.elements.geo.value;
    }
  });

  root.addEventListener('submit', e => {
    e.preventDefault();
    const f = e.target;
    if (f.id === 'apa-new') {
      const v = Object.fromEntries(new FormData(f));
      let urlOk = true;
      try { const u = new URL(v.url); urlOk = /^https?:$/.test(u.protocol); } catch { urlOk = false; }
      const err = f.querySelector('.form-err');
      if (!v.name.trim() || !urlOk) {
        err.textContent = L('apa.tr.err', 'Enter a name and a valid landing URL (https://…).');
        err.hidden = false;
        (v.name.trim() ? f.elements.url : f.elements.name).focus();
        return;
      }
      const tr = { id: 'trk_' + randId(6), name: v.name.trim(), creator: v.creator.trim() || '—', platform: v.platform, geo: v.geo, url: v.url.trim(), promo: v.promo.trim(), model: v.model, cost: Math.max(0, Number(v.cost) || 0), status: 'active', created: iso(today()) };
      state.trackers.unshift(tr);
      state.daily[tr.id] = {};
      save(); render();
      toast(L('apa.tr.created', 'Tracker created — copy the link and send it to the creator'));
    }
    if (f.id === 'apa-add') {
      const v = Object.fromEntries(new FormData(f));
      if (!v.tid) return;
      applyConversion({ tid: v.tid, event: v.event, amount: v.amount, geo: v.geo, date: v.date ? fromIso(v.date) : today(), src: 'manual' });
      save(); render();
      toast(L('apa.c.added', 'Conversion added'));
    }
    if (f.dataset.pixel) {
      const id = f.elements.id.value.trim();
      state.pixels[f.dataset.pixel] = { id, on: !!id };
      save(); render();
      toast(id ? L('apa.i.saved', 'Pixel connected') : L('apa.i.empty', 'Enter the pixel ID first'));
    }
  });

  document.addEventListener('af:lang', render);
  render();
})();
