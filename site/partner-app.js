// Partner cabinet — the working product behind the Antefluence partner program.
// Data lives in this browser and syncs with the partner API once it is connected in Settings.
(function () {
  const root = document.getElementById('partner-app');
  if (!root) return;

  const L = (key, en) => (window.AF && window.AF.t(key)) || en;
  const lang = () => (window.AF ? window.AF.lang() : 'en');
  const LOCALES = { en: 'en-US', es: 'es-ES', pt: 'pt-BR', de: 'de-DE', ru: 'ru-RU' };
  const STORE = 'antefluence-partner-v1';
  const DAY = 86400000;
  const EVENTS = ['reg', 'ftd', 'rd'];
  const MODELS = { cpa: 'CPA', revshare: 'RevShare', hybrid: 'Hybrid' };
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ---------- dates & formats ---------- */
  const startOfDay = d => { const x = new Date(d); x.setHours(0, 0, 0, 0); return x; };
  const today = () => startOfDay(new Date());
  const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
  const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const fromIso = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
  const loc = () => LOCALES[lang()] || 'en-US';
  const money = v => new Intl.NumberFormat(loc(), { style: 'currency', currency: 'USD', maximumFractionDigits: v !== 0 && Math.abs(v) < 100 ? 2 : 0 }).format(v || 0);
  const num = v => new Intl.NumberFormat(loc(), { maximumFractionDigits: 0 }).format(v || 0);
  const pct = v => new Intl.NumberFormat(loc(), { style: 'percent', maximumFractionDigits: 1 }).format(isFinite(v) ? v : 0);
  const short = v => new Intl.NumberFormat(loc(), { notation: 'compact', maximumFractionDigits: 1 }).format(v || 0);
  const randId = (n = 6) => Array.from(crypto.getRandomValues(new Uint8Array(n)), b => 'abcdefghijkmnpqrstuvwxyz23456789'[b % 32]).join('');
  const rng = s => () => { s = (s * 1664525 + 1013904223) % 4294967296; return s / 4294967296; };

  /* ---------- offers ---------- */
  const offers = () => window.AF_OFFERS || [];
  const offerById = id => offers().find(o => String(o.id) === String(id));
  const offerName = id => (offerById(id) || {}).name || L('pk.offer.gone', 'Offer removed');
  const payoutOf = o => { const m = /\$\s*([\d.]+)/.exec(o && o.payout || ''); return m ? Number(m[1]) : 0; };

  /* ---------- state ---------- */
  const blank = () => ({
    v: 1,
    sample: false,
    partner: { id: 'p_' + randId(6), name: '', contact: '', token: 'pt_' + randId(20), apiKey: 'af_pk_' + randId(24), created: iso(today()) },
    links: [], daily: {}, conv: [],
    pay: { method: 'usdt', details: '', min: 100, paid: 0, requests: [] },
    api: { base: '', key: '', status: '', synced: '' },
    pb: { tracker: 'keitaro', domain: '', key: '' }
  });

  function sample() {
    const s = blank();
    s.sample = true;
    const r = rng(20260912);
    const pool = offers().filter(o => o.status !== 'paused').slice(0, 3);
    if (!pool.length) return s;
    const srcs = ['telegram', 'youtube', 'seo'];
    pool.forEach((o, i) => {
      const link = { id: 'l_' + randId(6), offerId: o.id, name: `${o.name} · ${srcs[i] || 'traffic'}`, subs: { s1: srcs[i] || '', s2: '', s3: '', s4: '', s5: '' }, created: iso(addDays(today(), -60)) };
      s.links.push(link);
      s.daily[link.id] = {};
      const base = [180, 120, 70][i] || 60;
      const cpa = payoutOf(o) || 120;
      for (let n = 59; n >= 0; n--) {
        const d = addDays(today(), -n);
        const weekly = [0.85, 0.95, 1, 1, 1.05, 1.3, 1.25][d.getDay()];
        const trend = 0.7 + 0.6 * (1 - n / 59);
        const clicks = Math.round(base * weekly * trend * (0.75 + r() * 0.5));
        const regs = Math.round(clicks * (0.1 + r() * 0.06));
        const ftd = Math.round(regs * (0.24 + r() * 0.14));
        const rd = Math.round(ftd * (0.2 + r() * 0.3));
        const gross = ftd * cpa + rd * cpa * 0.25;
        const hold = n < 7 ? gross * 0.45 : 0;
        s.daily[link.id][iso(d)] = { clicks, regs, ftd, rd, payout: Math.round((gross - hold) * 100) / 100, hold: Math.round(hold * 100) / 100 };
      }
      for (let k = 0; k < 12; k++) {
        const ev = r() < 0.5 ? 'reg' : r() < 0.75 ? 'ftd' : 'rd';
        s.conv.push({
          ts: Date.now() - Math.round(r() * 5 * DAY), lid: link.id, offerId: o.id, event: ev,
          payout: ev === 'reg' ? 0 : Math.round(cpa * (ev === 'rd' ? 0.25 : 1) * 100) / 100,
          status: r() < 0.72 ? 'approved' : r() < 0.9 ? 'pending' : 'rejected',
          geo: o.geo[0] === 'WW' ? 'DE' : o.geo[0], sub1: link.subs.s1, txid: randId(10), src: 'postback'
        });
      }
    });
    s.conv.sort((a, b) => b.ts - a.ts);
    s.pay.paid = 2400;
    s.pay.requests = [{ id: 'pr_' + randId(5), ts: Date.now() - 9 * DAY, amount: 2400, method: 'usdt', status: 'paid' }];
    return s;
  }

  let state;
  try { state = JSON.parse(localStorage.getItem(STORE)); } catch { state = null; }
  if (!state || state.v !== 1) state = sample();
  const save = () => { try { localStorage.setItem(STORE, JSON.stringify(state)); } catch {} };
  save();

  const ui = { tab: 'dash', period: 30, link: '', offer: '', geo: '', sort: { key: 'payout', dir: -1 }, group: 'offer', linkOffer: '' };

  /* ---------- aggregation ---------- */
  const linkById = id => state.links.find(l => l.id === id);
  const geoOf = l => { const o = offerById(l.offerId); return o ? (o.geo[0] === 'WW' ? 'WW' : o.geo[0]) : '—'; };
  function filteredLinks() {
    return state.links.filter(l => (!ui.link || l.id === ui.link) && (!ui.offer || String(l.offerId) === ui.offer) && (!ui.geo || geoOf(l) === ui.geo));
  }
  const EMPTY = () => ({ clicks: 0, regs: 0, ftd: 0, rd: 0, payout: 0, hold: 0 });
  function sumRange(links, from, to) {
    const s = EMPTY();
    links.forEach(l => {
      const days = state.daily[l.id] || {};
      for (let d = new Date(from); d <= to; d = addDays(d, 1)) {
        const x = days[iso(d)];
        if (x) for (const k in s) s[k] += x[k] || 0;
      }
    });
    return s;
  }
  const derive = s => ({
    ...s,
    cr: s.clicks ? s.regs / s.clicks : 0,
    c2d: s.regs ? s.ftd / s.regs : 0,
    epc: s.clicks ? s.payout / s.clicks : 0,
    aov: s.ftd ? s.payout / s.ftd : 0
  });
  function range() {
    const to = today();
    const from = addDays(to, -(ui.period - 1));
    return { from, to, prevFrom: addDays(from, -ui.period), prevTo: addDays(from, -1) };
  }
  const totalOf = key => Object.values(state.daily).reduce((a, days) => a + Object.values(days).reduce((b, d) => b + (d[key] || 0), 0), 0);
  const approvedTotal = () => totalOf('payout');
  const holdTotal = () => totalOf('hold');
  const requested = () => state.pay.requests.filter(r => r.status === 'processing').reduce((a, r) => a + r.amount, 0);
  const available = () => Math.max(0, approvedTotal() - state.pay.paid - requested());

  /* ---------- helpers ---------- */
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
  const csv = rows => rows.map(r => r.map(v => `"${String(v == null ? '' : v).replace(/"/g, '""')}"`).join(',')).join('\n');
  const options = (list, sel, all) => (all ? `<option value="">${esc(all)}</option>` : '') +
    list.map(([v, l]) => `<option value="${esc(v)}"${String(v) === String(sel) ? ' selected' : ''}>${esc(l)}</option>`).join('');
  const eventLabel = e => ({ reg: L('apa.e.reg', 'Registration'), ftd: L('apa.e.ftd', 'First deposit'), rd: L('pk.e.rd', 'Redeposit') }[e] || e);
  const statusLabel = s => ({ approved: L('pk.st.approved', 'Approved'), pending: L('pk.st.pending', 'On hold'), rejected: L('pk.st.rejected', 'Rejected') }[s] || s);
  const statusClass = s => ({ approved: 'ev-dep', pending: 'ev-hold', rejected: 'ev-no' }[s] || 'ev-hold');
  const methodLabel = m => ({ usdt: 'USDT (TRC-20)', btc: 'Bitcoin', card: L('pk.m.card', 'Bank card'), wire: L('pk.m.wire', 'Bank transfer'), wallet: L('pk.m.wallet', 'E-wallet') }[m] || m);

  function linkUrl(l) {
    const p = new URLSearchParams();
    Object.entries(l.subs || {}).forEach(([k, v]) => { if (v) p.set('sub' + k.slice(1), v); });
    const q = p.toString();
    return `https://go.antefluence.com/${state.partner.id}/${l.offerId}${q ? '?' + q : ''}`;
  }
  const inPostback = () => `https://postback.antefluence.com/in/${state.partner.token}?click_id={clickid}&goal={goal}&payout={payout}&currency={currency}&status={status}&txid={txid}`;
  const TRACKERS = {
    keitaro: { key: true, tpl: 'https://{domain}/{key}/postback?subid={sub1}&status={goal}&payout={payout}&currency={currency}' },
    binom: { key: false, tpl: 'https://{domain}/click.php?cnv_id={sub1}&payout={payout}&cnv_status={goal}' },
    voluum: { key: false, tpl: 'https://{domain}/postback?cid={sub1}&payout={payout}&et={goal}' },
    redtrack: { key: false, tpl: 'https://{domain}/postback?clickid={sub1}&sum={payout}&type={goal}' },
    bemob: { key: false, tpl: 'https://{domain}/postback?cid={sub1}&payout={payout}&status={goal}' },
    custom: { key: false, tpl: 'https://{domain}/postback?click_id={sub1}&goal={goal}&payout={payout}&currency={currency}&status={status}&offer={offer_id}' }
  };
  function outPostback() {
    const t = TRACKERS[state.pb.tracker] || TRACKERS.custom;
    const d = (state.pb.domain || '').trim().replace(/^https?:\/\//, '').replace(/\/+$/, '') || 'your-tracker.com';
    return t.tpl.replace('{domain}', d).replace('{key}', (state.pb.key || '').trim() || 'POSTBACK_KEY');
  }

  /* ---------- conversion bookkeeping ---------- */
  function applyConversion({ lid, event, payout, status, geo, date, src, txid }) {
    const l = linkById(lid);
    if (!l) return false;
    const key = iso(date || today());
    const days = state.daily[lid] || (state.daily[lid] = {});
    const d = days[key] || (days[key] = EMPTY());
    payout = Math.max(0, Number(payout) || 0);
    status = status || 'pending';
    if (event === 'reg') { d.regs += 1; d.clicks = Math.max(d.clicks, d.regs); }
    if (event === 'ftd') d.ftd += 1;
    if (event === 'rd') d.rd += 1;
    if (status === 'approved') d.payout += payout;
    if (status === 'pending') d.hold += payout;
    const ts = key === iso(today()) ? Date.now() : (date || today()).getTime() + 12 * 3600000;
    state.conv.unshift({ ts, lid, offerId: l.offerId, event, payout: event === 'reg' ? 0 : payout, status, geo: (geo || geoOf(l)), sub1: l.subs && l.subs.s1 || '', txid: txid || randId(10), src: src || 'manual' });
    state.conv = state.conv.slice(0, 800);
    return true;
  }

  /* ---------- chrome ---------- */
  function toolbar() {
    const lks = state.links.map(l => [l.id, l.name]);
    const offs = [...new Set(state.links.map(l => String(l.offerId)))].map(id => [id, offerName(id)]);
    const geos = [...new Set(state.links.map(geoOf))].sort().map(g => [g, g]);
    const connected = state.api.status === 'ok';
    return `
      <div class="apa-top">
        <div class="apa-brand"><img src="assets/web/logo-mark.webp" alt="" /><b>${esc(L('pk.title', 'Partner cabinet'))}</b>
          <span class="badge">ID ${esc(state.partner.id)}</span>
          ${state.sample ? `<span class="badge demo">${esc(L('pk.sample', 'Sample data'))}</span>` : ''}
          <span class="status ${connected ? '' : 'status-off'}">${esc(connected ? L('pk.api.on', 'API connected') : L('pk.api.local', 'Local workspace'))}</span>
        </div>
        <div class="apa-actions">
          <button type="button" class="apa-btn" data-action="export">${esc(L('apa.export', 'Export CSV'))}</button>
          <button type="button" class="apa-btn ghost" data-action="backup">${esc(L('pk.backup', 'Backup'))}</button>
          ${state.sample ? `<button type="button" class="apa-btn ghost" data-action="clear-sample">${esc(L('pk.clearSample', 'Clear sample data'))}</button>` : ''}
        </div>
      </div>
      <div class="apa-bar">
        <div class="seg" role="group" aria-label="Period">
          ${[7, 30, 90].map(p => `<button type="button" data-period="${p}" aria-pressed="${ui.period === p}">${esc(L('apa.period.' + p, p + ' days'))}</button>`).join('')}
        </div>
        <div class="apa-filters">
          <select class="field" data-filter="link" aria-label="Link">${options(lks, ui.link, L('pk.f.link', 'All links'))}</select>
          <select class="field" data-filter="offer" aria-label="Offer">${options(offs, ui.offer, L('pk.f.offer', 'All offers'))}</select>
          <select class="field" data-filter="geo" aria-label="GEO">${options(geos, ui.geo, L('apa.f.geo', 'All GEOs'))}</select>
        </div>
      </div>
      <div class="apa-tabs" role="tablist">
        ${[['dash', L('pk.tab.dash', 'Dashboard')], ['offers', L('pk.tab.offers', 'Offers')], ['stats', L('pk.tab.stats', 'Statistics')],
           ['conv', L('apa.tab.conv', 'Conversions')], ['pb', L('pk.tab.pb', 'Postbacks')], ['pay', L('pk.tab.pay', 'Payouts')], ['set', L('pk.tab.set', 'Settings')]]
          .map(([id, label]) => `<button type="button" role="tab" data-tab="${id}" aria-selected="${ui.tab === id}">${esc(label)}${id === 'offers' ? ` <span class="count">${offers().length}</span>` : ''}</button>`).join('')}
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
    const max = Math.max(1, ...series.map(d => Math.max(d.payout, d.hold))) * 1.12;
    const x = i => P.l + (n === 1 ? 0 : i * (W - P.l - P.r) / (n - 1));
    const y = v => H - P.b - v / max * (H - P.t - P.b);
    const line = key => series.map((d, i) => `${x(i).toFixed(1)},${y(d[key]).toFixed(1)}`).join(' ');
    const grid = [0, 0.25, 0.5, 0.75, 1].map(f => {
      const v = max * f, yy = y(v).toFixed(1);
      return `<line x1="${P.l}" x2="${W - P.r}" y1="${yy}" y2="${yy}" class="grid"/><text x="${P.l - 8}" y="${+yy + 4}" text-anchor="end">${esc('$' + short(v))}</text>`;
    }).join('');
    const step = Math.max(1, Math.ceil(n / 7));
    const labels = series.map((d, i) => (i % step === 0 || i === n - 1) ? `<text x="${x(i).toFixed(1)}" y="${H - 8}" text-anchor="middle">${esc(d.label)}</text>` : '').join('');
    const area = `${P.l},${H - P.b} ${line('payout')} ${x(n - 1).toFixed(1)},${H - P.b}`;
    return `<svg viewBox="0 0 ${W} ${H}" class="apa-chart-svg" role="img" aria-label="${esc(L('pk.chart', 'Payouts by day'))}">
      <defs><linearGradient id="pkArea" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#7b4dff" stop-opacity=".22"/><stop offset="1" stop-color="#7b4dff" stop-opacity="0"/></linearGradient></defs>
      ${grid}${labels}
      <polygon points="${area}" fill="url(#pkArea)"/>
      <polyline points="${line('hold')}" class="l-spend"/>
      <polyline points="${line('payout')}" class="l-rev"/>
      <line class="hover-line" x1="0" x2="0" y1="${P.t}" y2="${H - P.b}" visibility="hidden"/>
      <rect class="hover-zone" x="${P.l}" y="${P.t}" width="${W - P.l - P.r}" height="${H - P.t - P.b}" fill="transparent"/>
    </svg>`;
  }

  /* ---------- tabs ---------- */
  function dashTab() {
    const links = filteredLinks();
    if (!state.links.length) return emptyStart();
    const { from, to, prevFrom, prevTo } = range();
    const cur = derive(sumRange(links, from, to));
    const prev = derive(sumRange(links, prevFrom, prevTo));
    const kpis = [
      kpi(L('apa.k.clicks', 'Clicks'), num(cur.clicks), cur.clicks, prev.clicks),
      kpi(L('apa.k.regs', 'Registrations'), num(cur.regs), cur.regs, prev.regs),
      kpi('FTD', num(cur.ftd), cur.ftd, prev.ftd),
      kpi(L('pk.k.rd', 'Redeposits'), num(cur.rd), cur.rd, prev.rd),
      kpi(L('pk.k.payout', 'Approved payout'), money(cur.payout), cur.payout, prev.payout),
      kpi(L('pk.k.hold', 'On hold'), money(cur.hold), cur.hold, prev.hold, true),
      kpi('EPC', money(cur.epc), cur.epc, prev.epc),
      kpi(L('apa.k.cr', 'Click → reg'), pct(cur.cr), cur.cr, prev.cr)
    ].join('');
    const small = [
      [L('pk.k.c2d', 'Reg → FTD'), pct(cur.c2d)], [L('pk.k.avg', 'Avg. payout'), money(cur.aov)],
      [L('pk.k.links', 'Active links'), num(links.length)], [L('pk.k.total', 'Total in period'), money(cur.payout + cur.hold)],
      [L('pk.k.balance', 'Available'), money(available())], [L('pk.k.paid', 'Paid out'), money(state.pay.paid)]
    ].map(([l, v]) => `<div><span>${esc(l)}</span><b>${v}</b></div>`).join('');

    const series = [];
    for (let d = new Date(from); d <= to; d = addDays(d, 1)) {
      const s = sumRange(links, d, d);
      series.push({ label: new Intl.DateTimeFormat(loc(), { day: 'numeric', month: 'short' }).format(d), payout: s.payout, hold: s.hold });
    }

    const byOffer = {};
    links.forEach(l => {
      const s = sumRange([l], from, to);
      const k = String(l.offerId);
      if (!byOffer[k]) byOffer[k] = EMPTY();
      for (const kk in s) byOffer[k][kk] += s[kk];
    });
    const rows = Object.entries(byOffer).map(([id, s]) => ({ id, s: derive(s) })).sort((a, b) => b.s.payout - a.s.payout);
    const table = rows.length ? `<div class="table-wrap"><table class="data-table apa-table">
      <thead><tr><th>${esc(L('pa.th.offer', 'Offer'))}</th><th>${esc(L('apa.k.clicks', 'Clicks'))}</th><th>${esc(L('apa.k.regs', 'Registrations'))}</th><th>FTD</th><th>EPC</th><th>${esc(L('pk.k.payout', 'Approved payout'))}</th></tr></thead>
      <tbody>${rows.map(({ id, s }) => `<tr><td><b>${esc(offerName(id))}</b></td><td>${num(s.clicks)}</td><td>${num(s.regs)}</td><td>${num(s.ftd)}</td><td>${money(s.epc)}</td><td><b>${money(s.payout)}</b></td></tr>`).join('')}</tbody>
    </table></div>` : `<p class="empty-state">${esc(L('apa.t.empty', 'No data for these filters.'))}</p>`;

    const byGeo = {};
    links.forEach(l => { byGeo[geoOf(l)] = (byGeo[geoOf(l)] || 0) + sumRange([l], from, to).payout; });
    const gmax = Math.max(1, ...Object.values(byGeo));
    const geoBars = Object.entries(byGeo).sort((a, b) => b[1] - a[1]).map(([g, v]) =>
      `<div class="geo-row"><span>${esc(g)}</span><div class="bar"><i style="width:${(v / gmax * 100).toFixed(1)}%"></i></div><b>${money(v)}</b></div>`).join('') ||
      `<p class="small-note">${esc(L('apa.t.empty', 'No data for these filters.'))}</p>`;

    return `
      <div class="apa-kpis">${kpis}</div>
      <p class="apa-vs">${esc(L('apa.vsprev', 'Change vs the previous period of the same length'))}</p>
      <div class="apa-small">${small}</div>
      <div class="apa-grid">
        <div class="apa-card apa-chart">
          <div class="apa-card-head"><h3>${esc(L('pk.chart', 'Payouts by day'))}</h3>
            <div class="legend"><span class="lg-rev">${esc(L('pk.st.approved', 'Approved'))}</span><span class="lg-spend">${esc(L('pk.st.pending', 'On hold'))}</span></div></div>
          <div class="chart-wrap" data-series='${esc(JSON.stringify(series.map(s => [s.label, s.hold, s.payout])))}'>${chartSvg(series)}<div class="chart-tip" hidden></div></div>
        </div>
        <div class="apa-card">
          <div class="apa-card-head"><h3>${esc(L('pk.geo', 'Payout by GEO'))}</h3></div>
          <div class="geo-bars">${geoBars}</div>
        </div>
      </div>
      <div class="apa-card">
        <div class="apa-card-head"><h3>${esc(L('pk.byOffer', 'By offer'))}</h3></div>
        ${table}
      </div>`;
  }

  function emptyStart() {
    return `<div class="apa-card">
      <div class="apa-card-head"><h3>${esc(L('pk.start.t', 'Start with your first link'))}</h3></div>
      <p class="small-note">${esc(L('pk.start.d', 'Pick an offer, add your sub IDs and the cabinet starts collecting clicks, conversions and payouts for it.'))}</p>
      <div class="apa-stack" style="margin-top:16px">
        <button type="button" class="apa-btn" data-action="go-offers">${esc(L('pk.start.cta', 'Choose an offer'))}</button>
        <button type="button" class="apa-btn ghost" data-action="load-sample">${esc(L('pk.start.sample', 'Load sample data'))}</button>
      </div>
    </div>`;
  }

  function offersTab() {
    const list = offers();
    const sel = ui.linkOffer || (list[0] && String(list[0].id)) || '';
    const rows = list.length ? list.map(o => `<tr>
      <td><span class="offer-name">${esc(o.name)}</span>${o.demo ? ` <span class="badge demo">${esc(L('pa.demo', 'Example'))}</span>` : ''}<br><small>${esc(L('pa.v.' + o.vertical, o.vertical))} · ID ${esc(o.id)}</small></td>
      <td>${o.geo.map(g => `<span class="geo-tag">${esc(g === 'WW' ? L('pa.ww', 'Worldwide') : g)}</span>`).join(' ')}</td>
      <td>${esc(MODELS[o.model] || o.model)}</td>
      <td><b>${esc(o.payout)}</b></td>
      <td>${esc(o.baseline)}</td>
      <td>${esc(o.cap)}</td>
      <td><span class="status status-${esc(o.status)}">${esc(L('pa.st.' + o.status, o.status))}</span></td>
      <td>${o.status === 'active' ? `<button type="button" class="apa-btn" data-action="pick" data-offer="${esc(o.id)}">${esc(L('pk.getLink', 'Get link'))}</button>` : `<a class="text-link" href="#join">${esc(L('pa.req', 'Request access'))}</a>`}</td>
    </tr>`).join('') : '';

    const links = state.links.length ? state.links.map(l => {
      const url = linkUrl(l);
      const s = derive(sumRange([l], range().from, range().to));
      return `<div class="trk" data-id="${esc(l.id)}">
        <div class="trk-main">
          <div class="trk-title"><b>${esc(l.name)}</b> <code class="code-inline">${esc(l.id)}</code></div>
          <small>${esc(offerName(l.offerId))} · ${esc(geoOf(l))} · ${esc(L('apa.k.clicks', 'Clicks'))}: ${num(s.clicks)} · FTD: ${num(s.ftd)} · ${esc(L('pk.k.payout', 'Approved payout'))}: ${money(s.payout)}</small>
          <div class="trk-link"><span>${esc(L('pk.link', 'Tracking link'))}</span><code title="${esc(url)}">${esc(url)}</code></div>
        </div>
        <div class="trk-actions">
          <button type="button" class="apa-btn" data-action="copy-link">${esc(L('apa.tr.copyLink', 'Copy link'))}</button>
          <button type="button" class="apa-btn ghost" data-action="qr">${esc(L('pk.stats1', 'Statistics'))}</button>
          <button type="button" class="apa-btn danger" data-action="del-link">${esc(L('apa.tr.del', 'Delete'))}</button>
        </div>
      </div>`;
    }).join('') : `<p class="empty-state">${esc(L('pk.noLinks', 'No links yet — create the first one.'))}</p>`;

    return `
      <div class="apa-card">
        <div class="apa-card-head"><h3>${esc(L('pa.off.title', 'Current offers'))}</h3></div>
        ${rows ? `<div class="table-wrap"><table class="data-table apa-table"><thead><tr>
          <th>${esc(L('pa.th.offer', 'Offer'))}</th><th>${esc(L('pa.th.geo', 'GEO'))}</th><th>${esc(L('pa.th.model', 'Model'))}</th>
          <th>${esc(L('pa.th.payout', 'Payout'))}</th><th>${esc(L('pa.th.baseline', 'Baseline'))}</th><th>${esc(L('pa.th.cap', 'Cap'))}</th>
          <th>${esc(L('pa.th.status', 'Status'))}</th><th></th></tr></thead><tbody>${rows}</tbody></table></div>`
        : `<p class="empty-state">${esc(L('pa.none', 'Offers will appear here soon.'))}</p>`}
      </div>
      <div class="apa-grid tr-grid">
        <form class="apa-card form-grid" id="pk-new-link" novalidate>
          <div class="apa-card-head"><h3>${esc(L('pk.newLink', 'New tracking link'))}</h3></div>
          <label>${esc(L('pa.th.offer', 'Offer'))}<select class="field" name="offerId">${options(list.filter(o => o.status === 'active').map(o => [o.id, o.name]), sel)}</select></label>
          <label>${esc(L('pk.linkName', 'Link name'))}<input class="field" name="name" maxlength="60" placeholder="${esc(L('pk.linkNamePh', 'Telegram · channel A'))}" /></label>
          <div class="two">
            <label>sub1<input class="field" name="s1" maxlength="32" placeholder="${esc(L('pk.sub1ph', 'source'))}" /></label>
            <label>sub2<input class="field" name="s2" maxlength="32" /></label>
          </div>
          <div class="two">
            <label>sub3<input class="field" name="s3" maxlength="32" /></label>
            <label>sub4<input class="field" name="s4" maxlength="32" /></label>
          </div>
          <label>sub5<input class="field" name="s5" maxlength="32" /></label>
          <p class="form-err" hidden></p>
          <button class="btn btn-dark" type="submit">${esc(L('pk.createLink', 'Create link'))}</button>
          <p class="small-note">${esc(L('pk.linkNote', 'sub1 carries your click ID: pass it from your tracker and it comes back in the postback.'))}</p>
        </form>
        <div class="apa-card">
          <div class="apa-card-head"><h3>${esc(L('pk.myLinks', 'Your links'))}</h3></div>
          <div class="trk-list">${links}</div>
        </div>
      </div>`;
  }

  function statsTab() {
    const { from, to } = range();
    const links = filteredLinks();
    const groups = {};
    const keyOf = {
      offer: l => String(l.offerId),
      link: l => l.id,
      geo: l => geoOf(l),
      sub1: l => (l.subs && l.subs.s1) || '—'
    };
    if (ui.group === 'day') {
      for (let d = new Date(from); d <= to; d = addDays(d, 1)) groups[iso(d)] = sumRange(links, d, d);
    } else {
      const fn = keyOf[ui.group] || keyOf.offer;
      links.forEach(l => {
        const k = fn(l);
        if (!groups[k]) groups[k] = EMPTY();
        const s = sumRange([l], from, to);
        for (const kk in s) groups[k][kk] += s[kk];
      });
    }
    const label = k => ui.group === 'offer' ? offerName(k) : ui.group === 'link' ? ((linkById(k) || {}).name || k) : k;
    const rows = Object.entries(groups).map(([k, s]) => ({ k, s: derive(s) }));
    const sk = ui.sort.key;
    rows.sort((a, b) => ui.group === 'day' && sk === 'k' ? a.k.localeCompare(b.k) * ui.sort.dir : ((a.s[sk] ?? 0) - (b.s[sk] ?? 0)) * ui.sort.dir);
    const th = (key, text) => `<th><button type="button" class="sort" data-sort="${key}" aria-sort="${sk === key ? (ui.sort.dir < 0 ? 'descending' : 'ascending') : 'none'}">${esc(text)}${sk === key ? (ui.sort.dir < 0 ? ' ↓' : ' ↑') : ''}</button></th>`;
    const total = rows.reduce((a, r) => { for (const k in a) a[k] += r.s[k] || 0; return a; }, EMPTY());
    const t = derive(total);
    return `
      <div class="apa-card">
        <div class="apa-card-head"><h3>${esc(L('pk.tab.stats', 'Statistics'))}</h3>
          <div class="apa-stack">
            <select class="field" data-action="group" aria-label="${esc(L('pk.groupBy', 'Group by'))}">${options([
              ['offer', L('pk.g.offer', 'By offer')], ['link', L('pk.g.link', 'By link')], ['geo', L('pk.g.geo', 'By GEO')],
              ['sub1', L('pk.g.sub1', 'By sub1')], ['day', L('pk.g.day', 'By day')]], ui.group)}</select>
            <button type="button" class="apa-btn ghost" data-action="export">${esc(L('apa.export', 'Export CSV'))}</button>
          </div>
        </div>
        ${rows.length ? `<div class="table-wrap"><table class="data-table apa-table"><thead><tr>
          <th>${esc(L('pk.g.' + ui.group, ui.group))}</th>${th('clicks', L('apa.k.clicks', 'Clicks'))}${th('regs', L('apa.k.regs', 'Registrations'))}${th('ftd', 'FTD')}${th('rd', L('pk.k.rd', 'Redeposits'))}${th('cr', 'CR')}${th('epc', 'EPC')}${th('payout', L('pk.k.payout', 'Approved payout'))}${th('hold', L('pk.k.hold', 'On hold'))}
        </tr></thead><tbody>
          ${rows.map(({ k, s }) => `<tr><td><b>${esc(label(k))}</b></td><td>${num(s.clicks)}</td><td>${num(s.regs)}</td><td>${num(s.ftd)}</td><td>${num(s.rd)}</td><td>${pct(s.cr)}</td><td>${money(s.epc)}</td><td><b>${money(s.payout)}</b></td><td>${money(s.hold)}</td></tr>`).join('')}
          <tr><td><b>${esc(L('pk.total', 'Total'))}</b></td><td><b>${num(t.clicks)}</b></td><td><b>${num(t.regs)}</b></td><td><b>${num(t.ftd)}</b></td><td><b>${num(t.rd)}</b></td><td><b>${pct(t.cr)}</b></td><td><b>${money(t.epc)}</b></td><td><b>${money(t.payout)}</b></td><td><b>${money(t.hold)}</b></td></tr>
        </tbody></table></div>` : `<p class="empty-state">${esc(L('apa.t.empty', 'No data for these filters.'))}</p>`}
      </div>`;
  }

  function convTab() {
    const links = filteredLinks();
    const ids = new Set(links.map(l => l.id));
    const log = state.conv.filter(c => ids.has(c.lid)).slice(0, 60);
    const dt = new Intl.DateTimeFormat(loc(), { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
    const rows = log.map(c => `<tr>
      <td>${esc(dt.format(new Date(c.ts)))}</td>
      <td>${esc((linkById(c.lid) || {}).name || c.lid)}<br><small>${esc(offerName(c.offerId))}</small></td>
      <td><span class="ev ev-${esc(c.event)}">${esc(eventLabel(c.event))}</span></td>
      <td>${c.event === 'reg' ? '—' : money(c.payout)}</td>
      <td><span class="ev ${esc(statusClass(c.status))}">${esc(statusLabel(c.status))}</span></td>
      <td>${esc(c.geo)}</td><td>${esc(c.sub1 || '—')}</td><td><code class="code-inline">${esc(c.txid)}</code></td>
    </tr>`).join('');
    const linkOpts = state.links.map(l => [l.id, l.name]);
    return `
      <div class="apa-grid tr-grid">
        <div class="apa-card">
          <form class="form-grid" id="pk-add-conv" novalidate>
            <div class="apa-card-head"><h3>${esc(L('apa.c.add', 'Add a conversion'))}</h3></div>
            <label>${esc(L('pk.link', 'Tracking link'))}<select class="field" name="lid">${options(linkOpts, linkOpts[0] && linkOpts[0][0])}</select></label>
            <div class="two">
              <label>${esc(L('apa.c.event', 'Event'))}<select class="field" name="event">${options(EVENTS.map(e => [e, eventLabel(e)]), 'ftd')}</select></label>
              <label>${esc(L('pk.payout', 'Payout, $'))}<input class="field" name="payout" type="number" min="0" step="0.01" value="100" /></label>
            </div>
            <div class="two">
              <label>${esc(L('pa.th.status', 'Status'))}<select class="field" name="status">${options([['approved', statusLabel('approved')], ['pending', statusLabel('pending')], ['rejected', statusLabel('rejected')]], 'approved')}</select></label>
              <label>${esc(L('apa.c.date', 'Date'))}<input class="field" name="date" type="date" value="${iso(today())}" max="${iso(today())}" /></label>
            </div>
            <button class="btn btn-dark" type="submit">${esc(L('apa.c.save', 'Add conversion'))}</button>
          </form>
          <div class="apa-sep"></div>
          <div class="apa-card-head"><h3>${esc(L('apa.c.more', 'Other ways in'))}</h3></div>
          <div class="apa-stack">
            <label class="apa-btn ghost file-btn">${esc(L('apa.c.import', 'Import CSV'))}<input type="file" accept=".csv,text/csv" data-action="import" hidden /></label>
            <button type="button" class="apa-btn ghost" data-action="template">${esc(L('apa.c.tpl', 'Download CSV template'))}</button>
            <button type="button" class="apa-btn ghost" data-action="export-conv">${esc(L('pk.exportConv', 'Export conversions'))}</button>
          </div>
          <p class="small-note">${esc(L('pk.csvFmt', 'CSV columns: date, link_id, event (reg / ftd / rd), payout, status, geo.'))}</p>
        </div>
        <div class="apa-card">
          <div class="apa-card-head"><h3>${esc(L('apa.c.log', 'Latest conversions'))}</h3></div>
          ${rows ? `<div class="table-wrap"><table class="data-table apa-table"><thead><tr>
            <th>${esc(L('apa.c.time', 'Time'))}</th><th>${esc(L('pk.link', 'Tracking link'))}</th><th>${esc(L('apa.c.event', 'Event'))}</th>
            <th>${esc(L('pk.payoutShort', 'Payout'))}</th><th>${esc(L('pa.th.status', 'Status'))}</th><th>GEO</th><th>sub1</th><th>TXID</th>
          </tr></thead><tbody>${rows}</tbody></table></div>` : `<p class="empty-state">${esc(L('apa.c.none', 'No conversions yet.'))}</p>`}
        </div>
      </div>`;
  }

  function pbTab() {
    const t = TRACKERS[state.pb.tracker] || TRACKERS.custom;
    return `
      <div class="apa-grid">
        <div class="apa-card">
          <div class="apa-card-head"><h3>${esc(L('pa.pb.out.t', 'Postback to your tracker'))}</h3></div>
          <p class="small-note">${esc(L('pa.pb.out.d', 'Pick your tracker, enter its domain and copy a ready postback URL.'))}</p>
          <div class="seg" role="group" aria-label="Tracker">
            ${Object.keys(TRACKERS).map(k => `<button type="button" data-tracker="${k}" aria-pressed="${state.pb.tracker === k}">${esc(k === 'custom' ? L('pa.pb.custom', 'Custom') : k[0].toUpperCase() + k.slice(1))}</button>`).join('')}
          </div>
          <div class="field-row">
            <label><span>${esc(L('pa.pb.domain', 'Tracker domain'))}</span><input class="field" data-pb="domain" value="${esc(state.pb.domain)}" placeholder="your-tracker.com" autocomplete="off" /></label>
            <label${t.key ? '' : ' hidden'}><span>${esc(L('pa.pb.key', 'Postback key'))}</span><input class="field" data-pb="key" value="${esc(state.pb.key)}" placeholder="POSTBACK_KEY" autocomplete="off" /></label>
          </div>
          <div class="code-box"><code id="pk-pb-out">${esc(outPostback())}</code><button class="copy" type="button" data-action="copy-code" data-target="#pk-pb-out">${esc(L('pa.copy', 'Copy'))}</button></div>
        </div>
        <div class="apa-card">
          <div class="apa-card-head"><h3>${esc(L('pa.pb.in.t', 'Postbacks from other networks'))}</h3></div>
          <p class="small-note">${esc(L('pa.pb.in.d', 'Run offers of other affiliate networks through us: they send conversions to our endpoint, and we pass them on to you in real time.'))}</p>
          <div class="code-box"><code id="pk-pb-in">${esc(inPostback())}</code><button class="copy" type="button" data-action="copy-code" data-target="#pk-pb-in">${esc(L('pa.copy', 'Copy'))}</button></div>
          <div class="apa-stack" style="margin-top:14px">
            <button type="button" class="apa-btn ghost" data-action="regen-token">${esc(L('pk.regenToken', 'Generate a new token'))}</button>
          </div>
          <p class="small-note">${esc(L('pk.tokenNote', 'The token identifies your account: keep it private and give it only to the networks you work with.'))}</p>
        </div>
      </div>
      <div class="apa-card">
        <div class="apa-card-head"><h3>${esc(L('pa.pb.macro', 'Macro'))}</h3></div>
        <div class="table-wrap"><table class="data-table macro-table"><thead><tr><th>${esc(L('pa.pb.macro', 'Macro'))}</th><th>${esc(L('pa.pb.meaning', 'What it passes'))}</th></tr></thead><tbody>
          <tr><td><code>{sub1}</code></td><td>${esc(L('pa.m.sub1', 'Your click ID — pass it in the offer link'))}</td></tr>
          <tr><td><code>{sub2}…{sub5}</code></td><td>${esc(L('pa.m.sub2', 'Additional sub-IDs: source, creative, placement'))}</td></tr>
          <tr><td><code>{offer_id}</code></td><td>${esc(L('pa.m.offer', 'Offer ID'))}</td></tr>
          <tr><td><code>{goal}</code></td><td>${esc(L('pa.m.goal', 'Event: reg, ftd or rd (redeposit)'))}</td></tr>
          <tr><td><code>{payout}</code></td><td>${esc(L('pa.m.payout', 'Payout amount for the event'))}</td></tr>
          <tr><td><code>{currency}</code></td><td>${esc(L('pa.m.currency', 'Payout currency'))}</td></tr>
          <tr><td><code>{status}</code></td><td>${esc(L('pa.m.status', 'approved, pending or rejected'))}</td></tr>
          <tr><td><code>{geo}</code></td><td>${esc(L('pa.m.geo', "Player's country"))}</td></tr>
        </tbody></table></div>
      </div>`;
  }

  function payTab() {
    const dt = new Intl.DateTimeFormat(loc(), { day: 'numeric', month: 'short', year: 'numeric' });
    const reqs = state.pay.requests.length ? state.pay.requests.map(r => `<tr>
      <td>${esc(dt.format(new Date(r.ts)))}</td><td><b>${money(r.amount)}</b></td><td>${esc(methodLabel(r.method))}</td>
      <td><span class="ev ${r.status === 'paid' ? 'ev-dep' : 'ev'}">${esc(r.status === 'paid' ? L('pk.pay.paid', 'Paid') : L('pk.pay.processing', 'Processing'))}</span></td>
      <td>${r.status === 'processing' ? `<button type="button" class="apa-btn danger" data-action="cancel-req" data-id="${esc(r.id)}">${esc(L('pk.pay.cancel', 'Cancel'))}</button>` : ''}</td>
    </tr>`).join('') : '';
    const av = available();
    return `
      <div class="apa-kpis">
        ${kpi(L('pk.k.balance', 'Available'), money(av))}
        ${kpi(L('pk.k.hold', 'On hold'), money(holdTotal()))}
        ${kpi(L('pk.k.paid', 'Paid out'), money(state.pay.paid))}
        ${kpi(L('pk.pay.min', 'Minimum payout'), money(state.pay.min))}
      </div>
      <div class="apa-grid tr-grid">
        <form class="apa-card form-grid" id="pk-payout" novalidate>
          <div class="apa-card-head"><h3>${esc(L('pk.pay.request', 'Request a payout'))}</h3></div>
          <label>${esc(L('pk.pay.amount', 'Amount, $'))}<input class="field" name="amount" type="number" min="0" step="1" value="${Math.floor(av)}" /></label>
          <label>${esc(L('pk.pay.method', 'Method'))}<select class="field" name="method">${options([['usdt', methodLabel('usdt')], ['btc', methodLabel('btc')], ['wire', methodLabel('wire')], ['wallet', methodLabel('wallet')]], state.pay.method)}</select></label>
          <label>${esc(L('pk.pay.details', 'Wallet or account'))}<input class="field" name="details" value="${esc(state.pay.details)}" maxlength="120" placeholder="${esc(L('pk.pay.detailsPh', 'Wallet address or account'))}" /></label>
          <p class="form-err" hidden></p>
          <button class="btn btn-dark" type="submit">${esc(L('pk.pay.send', 'Request payout'))}</button>
          <p class="small-note">${esc(L('pk.pay.note', 'Requests are processed on the schedule agreed with your manager. Payout details are stored in this browser only.'))}</p>
        </form>
        <div class="apa-card">
          <div class="apa-card-head"><h3>${esc(L('pk.pay.history', 'Payout history'))}</h3>
            <button type="button" class="apa-btn ghost" data-action="export-pay">${esc(L('pk.pay.statement', 'Statement CSV'))}</button></div>
          ${reqs ? `<div class="table-wrap"><table class="data-table apa-table"><thead><tr>
            <th>${esc(L('apa.c.date', 'Date'))}</th><th>${esc(L('pk.pay.amount', 'Amount, $'))}</th><th>${esc(L('pk.pay.method', 'Method'))}</th><th>${esc(L('pa.th.status', 'Status'))}</th><th></th>
          </tr></thead><tbody>${reqs}</tbody></table></div>` : `<p class="empty-state">${esc(L('pk.pay.none', 'No payout requests yet.'))}</p>`}
        </div>
      </div>`;
  }

  function setTab() {
    const key = state.partner.apiKey;
    const masked = key.slice(0, 10) + '•'.repeat(10) + key.slice(-4);
    const st = state.api.status;
    return `
      <div class="apa-grid tr-grid">
        <form class="apa-card form-grid" id="pk-profile" novalidate>
          <div class="apa-card-head"><h3>${esc(L('pk.profile', 'Partner profile'))}</h3></div>
          <label>${esc(L('pk.name', 'Name or team'))}<input class="field" name="name" value="${esc(state.partner.name)}" maxlength="60" /></label>
          <label>${esc(L('pk.contact', 'Telegram or email'))}<input class="field" name="contact" value="${esc(state.partner.contact)}" maxlength="80" /></label>
          <div class="two">
            <label>${esc(L('pk.pay.min', 'Minimum payout'))}<input class="field" name="min" type="number" min="0" step="10" value="${esc(state.pay.min)}" /></label>
            <label>ID<input class="field" value="${esc(state.partner.id)}" readonly /></label>
          </div>
          <button class="btn btn-dark" type="submit">${esc(L('pk.save', 'Save'))}</button>
        </form>
        <div class="apa-card">
          <div class="apa-card-head"><h3>API</h3><span class="status ${st === 'ok' ? '' : 'status-off'}">${esc(st === 'ok' ? L('pk.api.on', 'API connected') : st === 'err' ? L('pk.api.err', 'Not reachable') : L('pk.api.local', 'Local workspace'))}</span></div>
          <p class="small-note">${esc(L('pk.api.d', 'Connect the cabinet to the partner API to pull live clicks, conversions and payouts instead of local data.'))}</p>
          <form class="form-grid" id="pk-api" style="margin-top:14px">
            <label>${esc(L('pk.api.base', 'API base URL'))}<input class="field" name="base" value="${esc(state.api.base)}" placeholder="https://api.antefluence.com" /></label>
            <label>${esc(L('pk.api.key', 'API key'))}<input class="field" name="key" value="${esc(state.api.key)}" placeholder="af_pk_…" /></label>
            <div class="apa-stack">
              <button class="apa-btn" type="submit">${esc(L('pk.api.test', 'Save and test'))}</button>
              <button class="apa-btn ghost" type="button" data-action="sync"${state.api.base ? '' : ' disabled'}>${esc(L('pk.api.sync', 'Sync now'))}</button>
            </div>
          </form>
          ${state.api.synced ? `<p class="small-note">${esc(L('pk.api.last', 'Last sync'))}: ${esc(state.api.synced)}</p>` : ''}
          <div class="apa-sep"></div>
          <div class="apa-card-head"><h3>${esc(L('pk.keys', 'Keys'))}</h3></div>
          <div class="code-box"><code id="pk-key">${esc(masked)}</code><button class="copy" type="button" data-action="copy-key">${esc(L('pa.copy', 'Copy'))}</button></div>
          <div class="apa-stack" style="margin-top:14px">
            <button type="button" class="apa-btn ghost" data-action="regen-key">${esc(L('apa.i.regen', 'Generate a new key'))}</button>
            <button type="button" class="apa-btn ghost" data-action="regen-token">${esc(L('pk.regenToken', 'Generate a new token'))}</button>
          </div>
        </div>
      </div>
      <div class="apa-card">
        <div class="apa-card-head"><h3>${esc(L('pk.data', 'Your data'))}</h3></div>
        <p class="small-note">${esc(L('pk.data.d', 'Everything in the cabinet is stored in this browser. Export a backup to move it to another device, or clear it and start over.'))}</p>
        <div class="apa-stack" style="margin-top:14px">
          <button type="button" class="apa-btn ghost" data-action="backup">${esc(L('pk.backup', 'Backup'))}</button>
          <label class="apa-btn ghost file-btn">${esc(L('pk.restore', 'Restore from backup'))}<input type="file" accept=".json,application/json" data-action="restore" hidden /></label>
          ${state.sample ? `<button type="button" class="apa-btn ghost" data-action="clear-sample">${esc(L('pk.clearSample', 'Clear sample data'))}</button>`
            : `<button type="button" class="apa-btn ghost" data-action="load-sample">${esc(L('pk.start.sample', 'Load sample data'))}</button>`}
          <button type="button" class="apa-btn danger" data-action="wipe">${esc(L('pk.wipe', 'Erase everything'))}</button>
        </div>
      </div>`;
  }

  /* ---------- render ---------- */
  function render() {
    const body = { dash: dashTab, offers: offersTab, stats: statsTab, conv: convTab, pb: pbTab, pay: payTab, set: setTab }[ui.tab]();
    root.innerHTML = toolbar() + `<div class="apa-body" role="tabpanel">${body}</div>`;
    bindChart();
  }

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
      const [label, hold, payout] = data[i];
      tip.innerHTML = `<b>${esc(label)}</b><span class="lg-rev">${esc(L('pk.st.approved', 'Approved'))}: ${money(payout)}</span><span class="lg-spend">${esc(L('pk.st.pending', 'On hold'))}: ${money(hold)}</span>`;
      tip.hidden = false;
      const px = xx / W * rect.width;
      tip.style.left = Math.min(Math.max(px, 80), rect.width - 80) + 'px';
    });
    zone.addEventListener('mouseleave', () => { hl.setAttribute('visibility', 'hidden'); tip.hidden = true; });
  }

  /* ---------- data actions ---------- */
  function exportStats() {
    const { from, to } = range();
    const head = ['group', 'clicks', 'registrations', 'ftd', 'redeposits', 'cr', 'epc', 'payout_usd', 'hold_usd'];
    const links = filteredLinks();
    const rows = links.map(l => {
      const s = derive(sumRange([l], from, to));
      return [`${l.name} (${offerName(l.offerId)})`, s.clicks, s.regs, s.ftd, s.rd, s.cr.toFixed(4), s.epc.toFixed(2), s.payout.toFixed(2), s.hold.toFixed(2)];
    });
    download(`antefluence-partner-${iso(from)}_${iso(to)}.csv`, csv([head, ...rows]));
  }
  function exportConv() {
    const head = ['date', 'link_id', 'link', 'offer', 'event', 'payout', 'status', 'geo', 'sub1', 'txid', 'source'];
    const rows = state.conv.map(c => [iso(new Date(c.ts)), c.lid, (linkById(c.lid) || {}).name || '', offerName(c.offerId), c.event, c.payout.toFixed(2), c.status, c.geo, c.sub1, c.txid, c.src]);
    download(`antefluence-conversions-${iso(today())}.csv`, csv([head, ...rows]));
  }
  function exportPay() {
    const head = ['date', 'amount_usd', 'method', 'status'];
    const rows = state.pay.requests.map(r => [iso(new Date(r.ts)), r.amount.toFixed(2), r.method, r.status]);
    download(`antefluence-statement-${iso(today())}.csv`, csv([head, ...rows]));
  }
  function importCsv(file) {
    const reader = new FileReader();
    reader.onload = () => {
      let ok = 0;
      String(reader.result).split(/\r?\n/).forEach(line => {
        const cols = line.split(/[;,]/).map(s => s.trim().replace(/^"|"$/g, ''));
        if (cols.length < 3 || /date/i.test(cols[0])) return;
        const [date, lid, event, payout, status, geo] = cols;
        if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !EVENTS.includes(event) || !linkById(lid)) return;
        if (applyConversion({ lid, event, payout, status: ['approved', 'pending', 'rejected'].includes(status) ? status : 'pending', geo: (geo || '').toUpperCase(), date: fromIso(date), src: 'import' })) ok++;
      });
      save(); render();
      toast(ok ? L('apa.c.imported', 'Imported: {n}').replace('{n}', ok) : L('apa.c.bad', 'Nothing imported — check the file against the template.'));
    };
    reader.readAsText(file);
  }
  function restore(file) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(String(reader.result));
        if (!data || data.v !== 1 || !Array.isArray(data.links)) throw new Error('bad');
        state = data; save(); render();
        toast(L('pk.restored', 'Backup restored'));
      } catch { toast(L('pk.badBackup', 'This file is not a cabinet backup')); }
    };
    reader.readAsText(file);
  }
  async function apiCall(path) {
    const base = (state.api.base || '').trim().replace(/\/+$/, '');
    if (!/^https:\/\//i.test(base)) throw new Error('base');
    const res = await fetch(base + path, { headers: { Authorization: 'Bearer ' + (state.api.key || ''), Accept: 'application/json' } });
    if (!res.ok) throw new Error('http ' + res.status);
    return res.json();
  }
  async function apiTest() {
    try {
      await apiCall('/v1/partner/ping');
      state.api.status = 'ok';
      toast(L('pk.api.ok', 'API answered — the cabinet is connected'));
    } catch (e) {
      state.api.status = 'err';
      toast(L('pk.api.fail', 'No answer from the API — check the URL and the key'));
    }
    save(); render();
  }
  async function apiSync() {
    const { from, to } = range();
    try {
      const data = await apiCall(`/v1/partner/stats?from=${iso(from)}&to=${iso(to)}`);
      if (Array.isArray(data.links)) state.links = data.links;
      if (data.daily && typeof data.daily === 'object') state.daily = data.daily;
      if (Array.isArray(data.conversions)) state.conv = data.conversions;
      if (data.payouts) state.pay = { ...state.pay, ...data.payouts };
      state.sample = false;
      state.api.status = 'ok';
      state.api.synced = new Date().toLocaleString(loc());
      save(); render();
      toast(L('pk.api.synced', 'Data synced from the API'));
    } catch {
      state.api.status = 'err'; save(); render();
      toast(L('pk.api.fail', 'No answer from the API — check the URL and the key'));
    }
  }

  /* ---------- events ---------- */
  root.addEventListener('click', e => {
    const b = e.target.closest('button');
    if (!b || !root.contains(b)) return;
    if (b.dataset.tab) { ui.tab = b.dataset.tab; render(); return; }
    if (b.dataset.period) { ui.period = Number(b.dataset.period); render(); return; }
    if (b.dataset.tracker) { state.pb.tracker = b.dataset.tracker; save(); render(); return; }
    if (b.dataset.sort) { ui.sort = { key: b.dataset.sort, dir: ui.sort.key === b.dataset.sort ? -ui.sort.dir : -1 }; render(); return; }
    const card = b.closest('.trk');
    const link = card && linkById(card.dataset.id);
    switch (b.dataset.action) {
      case 'export': exportStats(); break;
      case 'export-conv': exportConv(); break;
      case 'export-pay': exportPay(); break;
      case 'backup': download(`antefluence-partner-backup-${iso(today())}.json`, JSON.stringify(state, null, 2), 'application/json'); break;
      case 'go-offers': ui.tab = 'offers'; render(); break;
      case 'load-sample': state = sample(); save(); render(); toast(L('pk.sampleOn', 'Sample data loaded')); break;
      case 'clear-sample':
        if (confirm(L('pk.clearQ', 'Clear the sample data and start with an empty cabinet?'))) {
          const keep = state.partner;
          state = blank(); state.partner = keep; save(); ui.tab = 'offers'; render();
        }
        break;
      case 'wipe':
        if (confirm(L('pk.wipeQ', 'Erase every link, conversion and payout stored in this browser?'))) { state = blank(); save(); render(); }
        break;
      case 'pick': ui.tab = 'offers'; ui.linkOffer = b.dataset.offer; render();
        { const f = root.querySelector('#pk-new-link'); if (f) { f.elements.offerId.value = b.dataset.offer; f.scrollIntoView({ behavior: 'smooth', block: 'center' }); f.elements.name.focus({ preventScroll: true }); } }
        break;
      case 'copy-link': if (link) copy(linkUrl(link)); break;
      case 'qr': if (link) { ui.link = link.id; ui.tab = 'stats'; ui.group = 'day'; render(); } break;
      case 'del-link':
        if (link && confirm(L('pk.delQ', 'Delete this link and its statistics?'))) {
          state.links = state.links.filter(l => l.id !== link.id);
          delete state.daily[link.id];
          state.conv = state.conv.filter(c => c.lid !== link.id);
          if (ui.link === link.id) ui.link = '';
          save(); render();
        }
        break;
      case 'template':
        download('antefluence-partner-conversions-template.csv',
          `date,link_id,event,payout,status,geo\n${iso(today())},${(state.links[0] || { id: 'l_xxxxxx' }).id},ftd,120,approved,DE\n${iso(today())},${(state.links[0] || { id: 'l_xxxxxx' }).id},reg,0,approved,DE`);
        break;
      case 'copy-code': copy(root.querySelector(b.dataset.target).textContent); break;
      case 'copy-key': copy(state.partner.apiKey); break;
      case 'regen-key': state.partner.apiKey = 'af_pk_' + randId(24); save(); render(); toast(L('apa.i.regened', 'New API key generated')); break;
      case 'regen-token': state.partner.token = 'pt_' + randId(20); save(); render(); toast(L('pk.tokenNew', 'New postback token generated')); break;
      case 'sync': apiSync(); break;
      case 'cancel-req':
        state.pay.requests = state.pay.requests.filter(r => !(r.id === b.dataset.id && r.status === 'processing'));
        save(); render(); toast(L('pk.pay.cancelled', 'Request cancelled'));
        break;
    }
  });

  root.addEventListener('input', e => {
    const el = e.target;
    if (el.dataset.pb) {
      state.pb[el.dataset.pb] = el.value;
      const out = root.querySelector('#pk-pb-out');
      if (out) out.textContent = outPostback();
      save();
    }
  });

  root.addEventListener('change', e => {
    const el = e.target;
    if (el.dataset.filter) { ui[el.dataset.filter] = el.value; render(); return; }
    if (el.dataset.action === 'group') { ui.group = el.value; ui.sort = { key: ui.group === 'day' ? 'k' : 'payout', dir: -1 }; render(); return; }
    if (el.dataset.action === 'import' && el.files[0]) importCsv(el.files[0]);
    if (el.dataset.action === 'restore' && el.files[0]) restore(el.files[0]);
  });

  root.addEventListener('submit', e => {
    e.preventDefault();
    const f = e.target;
    const err = f.querySelector && f.querySelector('.form-err');
    if (f.id === 'pk-new-link') {
      const v = Object.fromEntries(new FormData(f));
      const o = offerById(v.offerId);
      if (!o) { if (err) { err.textContent = L('pk.err.offer', 'Choose an offer first.'); err.hidden = false; } return; }
      const l = {
        id: 'l_' + randId(6), offerId: o.id,
        name: (v.name || '').trim() || `${o.name} · ${(v.s1 || '').trim() || 'link'}`,
        subs: { s1: (v.s1 || '').trim(), s2: (v.s2 || '').trim(), s3: (v.s3 || '').trim(), s4: (v.s4 || '').trim(), s5: (v.s5 || '').trim() },
        created: iso(today())
      };
      state.links.unshift(l);
      state.daily[l.id] = {};
      save(); render();
      copy(linkUrl(l));
      toast(L('pk.linkCreated', 'Link created and copied to the clipboard'));
      return;
    }
    if (f.id === 'pk-add-conv') {
      const v = Object.fromEntries(new FormData(f));
      if (!v.lid) return;
      applyConversion({ lid: v.lid, event: v.event, payout: v.payout, status: v.status, date: v.date ? fromIso(v.date) : today(), src: 'manual' });
      save(); render();
      toast(L('apa.c.added', 'Conversion added'));
      return;
    }
    if (f.id === 'pk-payout') {
      const v = Object.fromEntries(new FormData(f));
      const amount = Math.floor(Number(v.amount) || 0);
      state.pay.method = v.method;
      state.pay.details = (v.details || '').trim();
      if (!state.pay.details) { if (err) { err.textContent = L('pk.err.details', 'Add the wallet or account for the payout.'); err.hidden = false; } return; }
      if (amount < state.pay.min) { if (err) { err.textContent = L('pk.err.min', 'Minimum payout is {n}.').replace('{n}', money(state.pay.min)); err.hidden = false; } save(); return; }
      if (amount > available()) { if (err) { err.textContent = L('pk.err.balance', 'Amount is above the available balance.'); err.hidden = false; } save(); return; }
      state.pay.requests.unshift({ id: 'pr_' + randId(5), ts: Date.now(), amount, method: v.method, status: 'processing' });
      save(); render();
      toast(L('pk.pay.sent', 'Payout request created'));
      return;
    }
    if (f.id === 'pk-profile') {
      const v = Object.fromEntries(new FormData(f));
      state.partner.name = (v.name || '').trim();
      state.partner.contact = (v.contact || '').trim();
      state.pay.min = Math.max(0, Number(v.min) || 0);
      save(); render();
      toast(L('pk.saved', 'Saved'));
      return;
    }
    if (f.id === 'pk-api') {
      const v = Object.fromEntries(new FormData(f));
      state.api.base = (v.base || '').trim();
      state.api.key = (v.key || '').trim();
      save();
      apiTest();
    }
  });

  document.addEventListener('af:lang', render);
  render();
})();
