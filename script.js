/* ==========================================================
   CONFIGURE AQUI os seus contatos (só números no WhatsApp):
   ex.: WHATSAPP = '5547999999999'   EMAIL = 'contato@seudominio.com.br'
   ========================================================== */
var WHATSAPP = '';
var EMAIL = '';

(function () {
  'use strict';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- Ano ---------- */
  var yEl = $('#year'); if (yEl) yEl.textContent = String(new Date().getFullYear());

  /* ---------- Menu mobile ---------- */
  var menuBtn = $('.menu-btn'), nav = $('#menu');
  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  }
  menuBtn.addEventListener('click', function () { setMenu(!nav.classList.contains('is-open')); });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });

  /* ---------- Abas ---------- */
  $$('[data-tabs]').forEach(function (group) {
    var tabs = $$('[role="tab"]', group);
    function select(tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.classList.toggle('is-on', on);
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        var p = document.getElementById(t.getAttribute('aria-controls'));
        if (p) p.hidden = !on;
      });
      if (focus) tab.focus();
    }
    tabs.forEach(function (t, i) {
      t.tabIndex = t.classList.contains('is-on') ? 0 : -1;
      t.addEventListener('click', function () { select(t, false); });
      t.addEventListener('keydown', function (e) {
        var j = -1;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') j = (i + 1) % tabs.length;
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') j = (i - 1 + tabs.length) % tabs.length;
        else if (e.key === 'Home') j = 0;
        else if (e.key === 'End') j = tabs.length - 1;
        if (j >= 0) { e.preventDefault(); select(tabs[j], true); }
      });
    });
  });

  /* ---------- Terminal do hero ---------- */
  var term = $('#term');
  var SC = [
    [['c', 'nfe transmitir --modelo 55 --serie 1'], ['o', 'assinando XML com certificado A1', 'ok'], ['o', 'validando schema', 'ok'], ['o', 'enviando para a SEFAZ (produção)', 'ok'], ['k', 'cStat 100 · Autorizado o uso da NF-e'], ['o', 'protocolo gravado · DANFE gerado']],
    [['c', 'reforma verificar --nota 4521'], ['o', 'grupo IBSCBS em todos os itens', 'ok'], ['o', 'CST e classificação tributária', 'ok'], ['o', 'IBSCBSTot = soma dos itens', 'ok'], ['k', 'pronto para homologação']],
    [['c', 'cnpj validar 12.ABC.345/01DE-35'], ['o', 'formato alfanumérico detectado', 'ok'], ['o', 'DV1: soma 459 · resto 8 → 3', 'ok'], ['o', 'DV2: soma 424 · resto 6 → 5', 'ok'], ['k', 'CNPJ válido']],
    [['c', 'erp diagnosticar --modulo faturamento'], ['o', 'conectando ao Firebird 3.0', 'ok'], ['w', 'rejeição recorrente encontrada no log'], ['o', 'causa isolada e corrigida', 'ok'], ['o', 'testes em homologação', 'ok'], ['k', 'liberado sem parar a operação']]
  ];
  var chips = $$('.chip');
  var run = 0;
  function sleep(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
  function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  function dots(text, width) { var n = Math.max(3, width - text.length); return ' ' + new Array(n + 1).join('.') + ' '; }
  function lineHTML(l) {
    if (l[0] === 'o') return '<span class="o">› ' + esc(l[1]) + (l[2] ? dots(l[1], 34) + '</span><span class="k">' + l[2] + '</span>' : '</span>') + '\n';
    if (l[0] === 'k') return '<span class="k">✓ ' + esc(l[1]) + '</span>\n';
    if (l[0] === 'w') return '<span class="w">! ' + esc(l[1]) + '</span>\n';
    return '';
  }
  function setChip(i) { chips.forEach(function (c, j) { c.classList.toggle('is-on', i === j); }); }
  function renderStatic(i) {
    setChip(i);
    term.innerHTML = SC[i].map(function (l) {
      return l[0] === 'c' ? '<span class="p">$ </span><span class="c">' + esc(l[1]) + '</span>\n' : lineHTML(l);
    }).join('') + '<span class="cursor"></span>';
  }
  async function play(i) {
    var id = ++run;
    setChip(i);
    term.innerHTML = '';
    for (var k = 0; k < SC[i].length; k++) {
      var l = SC[i][k];
      if (id !== run) return;
      if (l[0] === 'c') {
        term.insertAdjacentHTML('beforeend', '<span class="p">$ </span><span class="c"></span><span class="cursor"></span>');
        var c = term.querySelectorAll('.c'); c = c[c.length - 1];
        for (var j = 0; j < l[1].length; j++) {
          if (id !== run) return;
          c.textContent += l[1][j];
          await sleep(26 + Math.random() * 30);
        }
        await sleep(260);
        var cur = term.querySelector('.cursor'); if (cur) cur.remove();
        term.insertAdjacentHTML('beforeend', '\n');
      } else {
        await sleep(l[0] === 'k' ? 520 : 380);
        if (id !== run) return;
        term.insertAdjacentHTML('beforeend', lineHTML(l));
      }
    }
    term.insertAdjacentHTML('beforeend', '<span class="cursor"></span>');
    await sleep(3600);
    if (id === run) play((i + 1) % SC.length);
  }
  chips.forEach(function (c) {
    c.addEventListener('click', function () {
      var i = Number(c.getAttribute('data-scn'));
      if (reduce) renderStatic(i); else play(i);
    });
  });
  if (reduce) renderStatic(0); else play(0);

  /* ---------- Linha do tempo da Reforma ---------- */
  var S = { on: ['st--on', 'VIGENTE'], test: ['st--test', 'TESTE'], down: ['st--down', 'REDUZINDO'], up: ['st--down', 'SUBINDO'], off: ['st--off', 'EXTINTO'], zero: ['st--off', 'ZERADO*'], soon: ['st--test', 'A INICIAR'] };
  function trans(y) {
    var lo = { 2029: 90, 2030: 80, 2031: 70, 2032: 60 }[y];
    return {
      phase: 'TRANSIÇÃO ICMS/ISS → IBS',
      fed: [0, 100], fedLab: 'CBS',
      loc: [lo, 100 - lo], locLab: 'ICMS/ISS ' + lo + '% · IBS ' + (100 - lo) + '%',
      st: [['PIS/Cofins', 'off'], ['CBS', 'on'], ['ICMS / ISS', 'down'], ['IBS', 'up'], ['IPI', 'zero'], ['Imposto Seletivo', 'on']],
      sys: 'Convivência: o sistema calcula ICMS e ISS reduzidos ao mesmo tempo em que o IBS cresce. Dois regimes no mesmo documento, e as duas contas precisam bater.'
    };
  }
  var RT = {
    2026: { phase: 'FASE DE TESTE', fed: [100, 0], fedLab: 'PIS/Cofins · CBS em teste (0,9%)', loc: [100, 0], locLab: 'ICMS/ISS · IBS em teste (0,1%)',
      st: [['PIS/Cofins', 'on'], ['CBS', 'test'], ['ICMS / ISS', 'on'], ['IBS', 'test'], ['IPI', 'on'], ['Imposto Seletivo', 'soon']],
      sys: 'Os documentos fiscais passam a destacar IBS e CBS em caráter de teste. O ERP precisa gerar os novos grupos no XML, com CST e classificação tributária por item, sem deixar de calcular os tributos atuais.' },
    2027: { phase: 'CBS EM VIGOR', fed: [0, 100], fedLab: 'CBS substitui PIS/Cofins', loc: [100, 0], locLab: 'ICMS/ISS · IBS em teste',
      st: [['PIS/Cofins', 'off'], ['CBS', 'on'], ['ICMS / ISS', 'on'], ['IBS', 'test'], ['IPI', 'zero'], ['Imposto Seletivo', 'on']],
      sys: 'A CBS passa a valer de verdade e PIS/Cofins saem de cena. Cálculo, apuração e aproveitamento de créditos mudam no ERP, e o Imposto Seletivo começa a ser cobrado.' },
    2028: { phase: 'CBS EM VIGOR', fed: [0, 100], fedLab: 'CBS', loc: [100, 0], locLab: 'ICMS/ISS · IBS em teste',
      st: [['PIS/Cofins', 'off'], ['CBS', 'on'], ['ICMS / ISS', 'on'], ['IBS', 'test'], ['IPI', 'zero'], ['Imposto Seletivo', 'on']],
      sys: 'Último ano antes da convivência estadual. Hora de deixar cadastro, cálculo e relatórios prontos para o IBS crescer a partir de 2029.' },
    2029: trans(2029), 2030: trans(2030), 2031: trans(2031), 2032: trans(2032),
    2033: { phase: 'MODELO NOVO PLENO', fed: [0, 100], fedLab: 'CBS', loc: [0, 100], locLab: 'IBS',
      st: [['PIS/Cofins', 'off'], ['CBS', 'on'], ['ICMS / ISS', 'off'], ['IBS', 'on'], ['IPI', 'zero'], ['Imposto Seletivo', 'on']],
      sys: 'Fim do ICMS e do ISS. Ficam IBS, CBS e Imposto Seletivo. O sistema que se adequou por etapas chega aqui sem susto.' }
  };
  var range = $('#rtRange');
  var nowY = Math.min(2033, Math.max(2026, new Date().getFullYear()));
  function rt(y) {
    var d = RT[y];
    $('#rtYear').textContent = y;
    $('#rtNow').hidden = y !== nowY;
    $('#rtPhase').textContent = d.phase;
    $('#fedOld').style.width = d.fed[0] + '%'; $('#fedNew').style.width = d.fed[1] + '%';
    $('#locOld').style.width = d.loc[0] + '%'; $('#locNew').style.width = d.loc[1] + '%';
    $('#fedLab').textContent = d.fedLab; $('#locLab').textContent = d.locLab;
    $('#rtStatus').innerHTML = d.st.map(function (s) {
      var m = S[s[1]];
      return '<li><span>' + s[0] + '</span><span class="st ' + m[0] + '">' + m[1] + '</span></li>';
    }).join('');
    $('#rtSys').textContent = d.sys + (d.st[4][1] === 'zero' ? ' (*IPI zerado, exceto produtos com industrialização incentivada na Zona Franca de Manaus.)' : '');
    range.style.setProperty('--p', ((y - 2026) / 7 * 100) + '%');
    range.setAttribute('aria-valuetext', y + ', ' + d.phase.toLowerCase());
  }
  range.value = nowY;
  range.addEventListener('input', function () { rt(Number(range.value)); });
  rt(nowY);

  /* ---------- Validador de CNPJ alfanumérico ---------- */
  var W1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  var W2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  var AL = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  function v(ch) { return ch.charCodeAt(0) - 48; }
  function calc(chars, w) {
    var s = 0;
    for (var i = 0; i < w.length; i++) s += v(chars[i]) * w[i];
    var r = s % 11;
    return { sum: s, r: r, d: r < 2 ? 0 : 11 - r };
  }
  function clean(s) { return s.toUpperCase().replace(/[^0-9A-Z]/g, '').slice(0, 14); }
  function fmt(c) {
    var o = '';
    for (var i = 0; i < c.length; i++) {
      if (i === 2 || i === 5) o += '.';
      if (i === 8) o += '/';
      if (i === 12) o += '-';
      o += c[i];
    }
    return o;
  }
  var inp = $('#cnpjIn'), res = $('#cnpjRes'), cells = $('#cnpjCells'), steps = $('#cnpjSteps');
  var STEP0 = steps.innerHTML;
  function setRes(cls, badge, text) {
    res.className = 'cnpj__res' + (cls ? ' ' + cls : '');
    res.innerHTML = '<span class="cnpj__badge mono">' + badge + '</span><span>' + text + '</span>';
    inp.classList.toggle('ok', cls === 'ok');
    inp.classList.toggle('bad', cls === 'bad');
  }
  function drawCells(c) {
    var h = '';
    for (var i = 0; i < 14; i++) {
      var ch = c[i];
      var dvc = i >= 12 ? ' cell--dv' : '';
      h += ch ? '<div class="cell' + dvc + '"><b>' + ch + '</b><span>' + v(ch) + '</span></div>'
              : '<div class="cell cell--empty' + dvc + '"><b>·</b><span>&nbsp;</span></div>';
    }
    cells.innerHTML = h;
  }
  function check() {
    var c = clean(inp.value);
    inp.value = fmt(c);
    drawCells(c);
    if (c.length < 14) {
      steps.innerHTML = STEP0;
      setRes('', c.length ? c.length + '/14' : 'AGUARDANDO', 'Digite os 14 caracteres. As 12 primeiras posições aceitam letras e números; os 2 últimos são os dígitos verificadores.');
      return;
    }
    if (!/^\d{2}$/.test(c.slice(12))) { steps.innerHTML = STEP0; setRes('bad', 'INVÁLIDO', 'Os dois últimos caracteres (dígitos verificadores) são sempre números.'); return; }
    var base = c.slice(0, 12).split('');
    var a = calc(base, W1);
    var b = calc(base.concat([String(a.d)]), W2);
    var expected = '' + a.d + b.d;
    steps.innerHTML =
      '<li>Cada caractere vale o código ASCII menos 48 (0–9 = 0–9; A = 17 … Z = 42).</li>' +
      '<li>1º DV: soma <span class="hl">' + a.sum + '</span> · resto ' + a.r + ' → <span class="hl">' + a.d + '</span></li>' +
      '<li>2º DV: soma <span class="hl">' + b.sum + '</span> · resto ' + b.r + ' → <span class="hl">' + b.d + '</span></li>';
    if (/^(.)\1{13}$/.test(c)) { setRes('bad', 'INVÁLIDO', 'Sequência repetida não é um CNPJ válido.'); return; }
    var alpha = /[A-Z]/.test(c);
    if (c.slice(12) === expected) setRes('ok', 'VÁLIDO', 'Dígitos verificadores conferem. Formato ' + (alpha ? 'alfanumérico' : 'numérico (continua válido)') + '.');
    else setRes('bad', 'INVÁLIDO', 'Os dígitos verificadores deveriam ser <b>' + expected + '</b>, mas o informado é ' + c.slice(12) + '.');
  }
  inp.addEventListener('input', check);
  $('#cnpjGen').addEventListener('click', function () {
    var base = '';
    do {
      base = '';
      for (var i = 0; i < 12; i++) base += AL[Math.floor(Math.random() * AL.length)];
    } while (!/[A-Z]/.test(base));
    var a = calc(base.split(''), W1);
    var b = calc(base.split('').concat([String(a.d)]), W2);
    inp.value = base + a.d + b.d;
    check();
  });
  drawCells('');

  /* ---------- Montar mensagem de contato ---------- */
  var pick = { servico: '', situacao: '', sistema: '' };
  var bName = $('#bName'), bCompany = $('#bCompany'), bMsg = $('#bMsg'), bPrev = $('#bPreview'), bWarn = $('#bWarn');
  $$('.opts').forEach(function (g) {
    var key = g.getAttribute('data-group');
    $$('.opt', g).forEach(function (o) {
      o.setAttribute('aria-pressed', 'false');
      o.addEventListener('click', function () {
        var on = !o.classList.contains('is-on');
        $$('.opt', g).forEach(function (x) { x.classList.remove('is-on'); x.setAttribute('aria-pressed', 'false'); });
        if (on) { o.classList.add('is-on'); o.setAttribute('aria-pressed', 'true'); }
        pick[key] = on ? o.getAttribute('data-v') : '';
        preview();
      });
    });
  });
  function message() {
    var L = ['Olá, Fernando! Vim pelo seu site.', ''];
    if (pick.servico) L.push('Preciso de: ' + pick.servico);
    if (pick.situacao) L.push('Situação: ' + pick.situacao);
    if (pick.sistema) L.push('Sistema: ' + pick.sistema);
    if (bName.value.trim()) L.push('Nome: ' + bName.value.trim());
    if (bCompany.value.trim()) L.push('Empresa: ' + bCompany.value.trim());
    if (bMsg.value.trim()) { L.push(''); L.push(bMsg.value.trim()); }
    return L.join('\n');
  }
  function preview() { bPrev.textContent = message(); bWarn.hidden = true; }
  [bName, bCompany, bMsg].forEach(function (el) { el.addEventListener('input', preview); });
  preview();
  function warn(t) { bWarn.textContent = t; bWarn.hidden = false; }
  $('#bWa').addEventListener('click', function () {
    var n = String(WHATSAPP).replace(/\D/g, '');
    if (!n) { warn('WhatsApp ainda não configurado. Copie a prévia acima e me chame pelo e-mail, por enquanto.'); return; }
    window.open('https://wa.me/' + n + '?text=' + encodeURIComponent(message()), '_blank', 'noopener');
  });
  $('#bMail').addEventListener('click', function () {
    if (!EMAIL) { warn('E-mail ainda não configurado.'); return; }
    location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent('Projeto de sistema' + (pick.servico ? ' — ' + pick.servico : '')) + '&body=' + encodeURIComponent(message());
  });
  var ml = $('#mailLink');
  if (EMAIL) { ml.textContent = EMAIL; ml.href = 'mailto:' + EMAIL; } else { ml.removeAttribute('href'); }
})();
