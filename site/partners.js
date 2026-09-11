// Partner program page: offer filters and the postback URL builder.
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const t = k => window.AF.t(k);
  const tt = (k, fallback) => t(k) || fallback;
  const offers = window.AF_OFFERS || [];

  /* ---------- Offers ---------- */
  const fGeo = $('#flt-geo'), fVert = $('#flt-vertical'), fModel = $('#flt-model');
  const body = $('#offers-table tbody'), empty = $('#offers-empty'), table = $('#offers-table');
  const MODELS = { cpa: 'CPA', revshare: 'RevShare', hybrid: 'Hybrid' };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function fillSelect(sel, allKey, allText, values) {
    const keep = sel.value;
    sel.innerHTML = `<option value="">${esc(tt(allKey, allText))}</option>` +
      values.map(([v, label]) => `<option value="${esc(v)}">${esc(label)}</option>`).join('');
    sel.value = values.some(([v]) => v === keep) ? keep : '';
  }

  function renderFilters() {
    const geos = [...new Set(offers.flatMap(o => o.geo))].sort();
    fillSelect(fGeo, 'pa.flt.geo', 'All GEOs', geos.map(g => [g, g === 'WW' ? tt('pa.ww', 'Worldwide') : g]));
    const verts = [...new Set(offers.map(o => o.vertical))];
    fillSelect(fVert, 'pa.flt.vertical', 'All verticals', verts.map(v => [v, tt(`pa.v.${v}`, v)]));
    const models = [...new Set(offers.map(o => o.model))];
    fillSelect(fModel, 'pa.flt.model', 'All models', models.map(m => [m, MODELS[m] || m]));
  }

  function renderOffers() {
    const list = offers.filter(o =>
      (!fGeo.value || o.geo.includes(fGeo.value) || o.geo.includes('WW')) &&
      (!fVert.value || o.vertical === fVert.value) &&
      (!fModel.value || o.model === fModel.value));
    body.innerHTML = list.map(o => `
      <tr>
        <td><span class="offer-name">${esc(o.name)}</span>${o.demo ? ` <span class="badge demo">${esc(tt('pa.demo', 'Example'))}</span>` : ''}<br><small>${esc(tt(`pa.v.${o.vertical}`, o.vertical))} · ID ${esc(o.id)}</small></td>
        <td>${o.geo.map(g => `<span class="geo-tag">${esc(g === 'WW' ? tt('pa.ww', 'Worldwide') : g)}</span>`).join(' ')}</td>
        <td>${esc(MODELS[o.model] || o.model)}</td>
        <td><b>${esc(o.payout)}</b></td>
        <td>${esc(o.baseline)}</td>
        <td>${esc(o.cap)}</td>
        <td><span class="status status-${esc(o.status)}">${esc(tt(`pa.st.${o.status}`, o.status))}</span></td>
        <td><a class="text-link" href="#join">${esc(tt('pa.req', 'Request access'))}</a></td>
      </tr>`).join('');
    empty.hidden = list.length > 0;
    table.hidden = offers.length === 0;
    if (offers.length === 0) { empty.hidden = false; empty.textContent = tt('pa.none', 'Offers will appear here soon.'); }
  }
  [fGeo, fVert, fModel].forEach(s => s.addEventListener('change', renderOffers));

  /* ---------- Postback builder ---------- */
  const TRACKERS = {
    keitaro: { key: true, tpl: 'https://{domain}/{key}/postback?subid={sub1}&status={goal}&payout={payout}&currency={currency}' },
    binom: { key: false, tpl: 'https://{domain}/click.php?cnv_id={sub1}&payout={payout}&cnv_status={goal}' },
    voluum: { key: false, tpl: 'https://{domain}/postback?cid={sub1}&payout={payout}&et={goal}' },
    redtrack: { key: false, tpl: 'https://{domain}/postback?clickid={sub1}&sum={payout}&type={goal}' },
    bemob: { key: false, tpl: 'https://{domain}/postback?cid={sub1}&payout={payout}&status={goal}' },
    custom: { key: false, tpl: 'https://{domain}/postback?click_id={sub1}&goal={goal}&payout={payout}&currency={currency}&status={status}&offer={offer_id}' }
  };
  let tracker = 'keitaro';
  const domain = $('#pb-domain'), key = $('#pb-key'), keyWrap = $('#pb-key-wrap'), out = $('#pb-out');
  function renderPostback() {
    const d = (domain.value.trim() || 'your-tracker.com').replace(/^https?:\/\//, '').replace(/\/+$/, '');
    const k = key.value.trim() || 'POSTBACK_KEY';
    keyWrap.hidden = !TRACKERS[tracker].key;
    out.textContent = TRACKERS[tracker].tpl.replace('{domain}', d).replace('{key}', k);
  }
  document.querySelectorAll('#pb-trackers button').forEach(b => b.addEventListener('click', () => {
    tracker = b.dataset.tracker;
    document.querySelectorAll('#pb-trackers button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    renderPostback();
  }));
  [domain, key].forEach(i => i.addEventListener('input', renderPostback));

  /* ---------- Copy buttons ---------- */
  document.querySelectorAll('[data-copy]').forEach(btn => btn.addEventListener('click', async () => {
    const text = $(btn.dataset.copy).textContent;
    try { await navigator.clipboard.writeText(text); } catch {
      const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove();
    }
    const label = btn.textContent;
    btn.textContent = tt('pa.copied', 'Copied');
    setTimeout(() => { btn.textContent = tt('pa.copy', label); }, 1400);
  }));

  function renderAll() { renderFilters(); renderOffers(); renderPostback(); }
  document.addEventListener('af:lang', renderAll);
  renderAll();
})();
