(function () {
  let e = document.createElement(`link`).relList;
  if (e && e.supports && e.supports(`modulepreload`)) return;
  for (let e of document.querySelectorAll(`link[rel="modulepreload"]`)) n(e);
  new MutationObserver((e) => {
    for (let t of e)
      if (t.type === `childList`)
        for (let e of t.addedNodes)
          e.tagName === `LINK` && e.rel === `modulepreload` && n(e);
  }).observe(document, { childList: !0, subtree: !0 });
  function t(e) {
    let t = {};
    return (
      e.integrity && (t.integrity = e.integrity),
      e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy),
      e.crossOrigin === `use-credentials`
        ? (t.credentials = `include`)
        : e.crossOrigin === `anonymous`
          ? (t.credentials = `omit`)
          : (t.credentials = `same-origin`),
      t
    );
  }
  function n(e) {
    if (e.ep) return;
    e.ep = !0;
    let n = t(e);
    fetch(e.href, n);
  }
})();
var e =
    `BN.BN.BN.BN.BN.BN.BN.BN.BN.S.B.S.WS.B.BN.BN.BN.BN.BN.BN.BN.BN.BN.BN.BN.BN.BN.BN.B.B.B.S.WS.ON.ON.ET.ET.ET.ON.ON.ON.ON.ON.ON.CS.ON.CS.ON.EN.EN.EN.EN.EN.EN.EN.EN.EN.EN.ON.ON.ON.ON.ON.ON.ON.L.L.L.L.L.L.L.L.L.L.L.L.L.L.L.L.L.L.L.L.L.L.L.L.L.L.ON.ON.ON.ON.ON.ON.L.L.L.L.L.L.L.L.L.L.L.L.L.L.L.L.L.L.L.L.L.L.L.L.L.L.ON.ON.ON.ON.BN.BN.BN.BN.BN.BN.B.BN.BN.BN.BN.BN.BN.BN.BN.BN.BN.BN.BN.BN.BN.BN.BN.BN.BN.BN.BN.BN.BN.BN.BN.BN.BN.CS.ON.ET.ET.ET.ET.ON.ON.ON.ON.L.ON.ON.ON.ON.ON.ET.ET.EN.EN.ON.L.ON.ON.ON.EN.L.ON.ON.ON.ON.ON.L.L.L.L.L.L.L.L.L.L.L.L.L.L.L.L.L.L.L.L.L.L.L.ON.L.L.L.L.L.L.L.L.L.L.L.L.L.L.L.L.L.L.L.L.L.L.L.L.L.L.L.L.L.L.L.ON.L.L.L.L.L.L.L.L`.split(
      `.`,
    ),
  t =
    `AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.CS.AL.ON.ON.NSM.NSM.NSM.NSM.NSM.NSM.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.NSM.NSM.NSM.NSM.NSM.NSM.NSM.NSM.NSM.NSM.NSM.NSM.NSM.NSM.AL.AL.AL.AL.AL.AL.AL.AN.AN.AN.AN.AN.AN.AN.AN.AN.AN.ET.AN.AN.AL.AL.AL.NSM.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.NSM.NSM.NSM.NSM.NSM.NSM.NSM.NSM.NSM.NSM.NSM.NSM.NSM.NSM.NSM.NSM.NSM.NSM.NSM.ON.NSM.NSM.NSM.NSM.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL.AL`.split(
      `.`,
    );
function n(n) {
  return n <= 255
    ? e[n]
    : 1424 <= n && n <= 1524
      ? `R`
      : 1536 <= n && n <= 1791
        ? t[n & 255]
        : 1792 <= n && n <= 2220
          ? `AL`
          : `L`;
}
function r(e) {
  let t = e.length;
  if (t === 0) return null;
  let r = Array(t),
    i = 0;
  for (let a = 0; a < t; a++) {
    let t = n(e.charCodeAt(a));
    ((t === `R` || t === `AL` || t === `AN`) && i++, (r[a] = t));
  }
  if (i === 0) return null;
  let a = t / i < 0.3 ? 0 : 1,
    o = new Int8Array(t);
  for (let e = 0; e < t; e++) o[e] = a;
  let s = a & 1 ? `R` : `L`,
    c = s,
    l = c;
  for (let e = 0; e < t; e++) r[e] === `NSM` ? (r[e] = l) : (l = r[e]);
  l = c;
  for (let e = 0; e < t; e++) {
    let t = r[e];
    t === `EN`
      ? (r[e] = l === `AL` ? `AN` : `EN`)
      : (t === `R` || t === `L` || t === `AL`) && (l = t);
  }
  for (let e = 0; e < t; e++) r[e] === `AL` && (r[e] = `R`);
  for (let e = 1; e < t - 1; e++)
    (r[e] === `ES` && r[e - 1] === `EN` && r[e + 1] === `EN` && (r[e] = `EN`),
      r[e] === `CS` &&
        (r[e - 1] === `EN` || r[e - 1] === `AN`) &&
        r[e + 1] === r[e - 1] &&
        (r[e] = r[e - 1]));
  for (let e = 0; e < t; e++) {
    if (r[e] !== `EN`) continue;
    let n;
    for (n = e - 1; n >= 0 && r[n] === `ET`; n--) r[n] = `EN`;
    for (n = e + 1; n < t && r[n] === `ET`; n++) r[n] = `EN`;
  }
  for (let e = 0; e < t; e++) {
    let t = r[e];
    (t === `WS` || t === `ES` || t === `ET` || t === `CS`) && (r[e] = `ON`);
  }
  l = c;
  for (let e = 0; e < t; e++) {
    let t = r[e];
    t === `EN`
      ? (r[e] = l === `L` ? `L` : `EN`)
      : (t === `R` || t === `L`) && (l = t);
  }
  for (let e = 0; e < t; e++) {
    if (r[e] !== `ON`) continue;
    let n = e + 1;
    for (; n < t && r[n] === `ON`; ) n++;
    let i = e > 0 ? r[e - 1] : c,
      a = n < t ? r[n] : c,
      o = i === `L` ? `L` : `R`;
    if (o === (a === `L` ? `L` : `R`)) for (let t = e; t < n; t++) r[t] = o;
    e = n - 1;
  }
  for (let e = 0; e < t; e++) r[e] === `ON` && (r[e] = s);
  for (let e = 0; e < t; e++) {
    let t = r[e];
    o[e] & 1
      ? (t === `L` || t === `AN` || t === `EN`) && o[e]++
      : t === `R`
        ? o[e]++
        : (t === `AN` || t === `EN`) && (o[e] += 2);
  }
  return o;
}
function i(e, t) {
  let n = r(e);
  if (n === null) return null;
  let i = new Int8Array(t.length);
  for (let e = 0; e < t.length; e++) i[e] = n[t[e]];
  return i;
}
var a = /[ \t\n\r\f]+/g,
  o = /[\t\n\r\f]| {2,}|^ | $/;
function s(e) {
  let t = e ?? `normal`;
  return t === `pre-wrap`
    ? { mode: t, preserveOrdinarySpaces: !0, preserveHardBreaks: !0 }
    : { mode: t, preserveOrdinarySpaces: !1, preserveHardBreaks: !1 };
}
function c(e) {
  if (!o.test(e)) return e;
  let t = e.replace(a, ` `);
  return (
    t.charCodeAt(0) === 32 && (t = t.slice(1)),
    t.length > 0 && t.charCodeAt(t.length - 1) === 32 && (t = t.slice(0, -1)),
    t
  );
}
function l(e) {
  return /[\r\f]/.test(e)
    ? e
        .replace(
          /\r\n/g,
          `
`,
        )
        .replace(
          /[\r\f]/g,
          `
`,
        )
    : e.replace(
        /\r\n/g,
        `
`,
      );
}
var u = null,
  d;
function f() {
  return (
    u === null && (u = new Intl.Segmenter(d, { granularity: `word` })),
    u
  );
}
var p = /\p{Script=Arabic}/u,
  m = /\p{M}/u,
  h = /\p{Nd}/u;
function g(e) {
  return p.test(e);
}
function _(e) {
  for (let t of e) {
    let e = t.codePointAt(0);
    if (
      (e >= 19968 && e <= 40959) ||
      (e >= 13312 && e <= 19903) ||
      (e >= 131072 && e <= 173791) ||
      (e >= 173824 && e <= 177983) ||
      (e >= 177984 && e <= 178207) ||
      (e >= 178208 && e <= 183983) ||
      (e >= 183984 && e <= 191471) ||
      (e >= 196608 && e <= 201551) ||
      (e >= 63744 && e <= 64255) ||
      (e >= 194560 && e <= 195103) ||
      (e >= 12288 && e <= 12351) ||
      (e >= 12352 && e <= 12447) ||
      (e >= 12448 && e <= 12543) ||
      (e >= 44032 && e <= 55215) ||
      (e >= 65280 && e <= 65519)
    )
      return !0;
  }
  return !1;
}
var v = new Set(
    `，.．.！.：.；.？.、.。.・.）.〕.〉.》.」.』.】.〗.〙.〛.ー.々.〻.ゝ.ゞ.ヽ.ヾ`.split(
      `.`,
    ),
  ),
  y = new Set([
    `"`,
    `(`,
    `[`,
    `{`,
    `“`,
    `‘`,
    `«`,
    `‹`,
    `（`,
    `〔`,
    `〈`,
    `《`,
    `「`,
    `『`,
    `【`,
    `〖`,
    `〘`,
    `〚`,
  ]),
  b = new Set([`'`, `’`]),
  x = new Set(`.(,(!(?(:(;(،(؛(؟(।(॥(၊(။(၌(၍(၏()(](}(%("(”(’(»(›(…`.split(`(`)),
  S = new Set([`:`, `.`, `،`, `؛`]),
  C = new Set([`၏`]),
  w = new Set([`”`, `’`, `»`, `›`, `」`, `』`, `】`, `》`, `〉`, `〕`, `）`]);
function T(e) {
  if (O(e)) return !0;
  let t = !1;
  for (let n of e) {
    if (x.has(n)) {
      t = !0;
      continue;
    }
    if (!(t && m.test(n))) return !1;
  }
  return t;
}
function E(e) {
  for (let t of e) if (!v.has(t) && !x.has(t)) return !1;
  return e.length > 0;
}
function D(e) {
  if (O(e)) return !0;
  for (let t of e) if (!y.has(t) && !b.has(t) && !m.test(t)) return !1;
  return e.length > 0;
}
function O(e) {
  let t = !1;
  for (let n of e)
    if (!(n === `\\` || m.test(n))) {
      if (y.has(n) || x.has(n) || b.has(n)) {
        t = !0;
        continue;
      }
      return !1;
    }
  return t;
}
function k(e) {
  let t = Array.from(e),
    n = t.length;
  for (; n > 0; ) {
    let e = t[n - 1];
    if (m.test(e)) {
      n--;
      continue;
    }
    if (y.has(e) || b.has(e)) {
      n--;
      continue;
    }
    break;
  }
  return n <= 0 || n === t.length
    ? null
    : { head: t.slice(0, n).join(``), tail: t.slice(n).join(``) };
}
function ee(e, t) {
  if (e.length === 0) return !1;
  for (let n of e) if (n !== t) return !1;
  return !0;
}
function A(e) {
  return !g(e) || e.length === 0 ? !1 : S.has(e[e.length - 1]);
}
function j(e) {
  return e.length === 0 ? !1 : C.has(e[e.length - 1]);
}
function te(e) {
  if (e.length < 2 || e[0] !== ` `) return null;
  let t = e.slice(1);
  return /^\p{M}+$/u.test(t) ? { space: ` `, marks: t } : null;
}
function ne(e) {
  for (let t = e.length - 1; t >= 0; t--) {
    let n = e[t];
    if (w.has(n)) return !0;
    if (!x.has(n)) return !1;
  }
  return !1;
}
function re(e, t) {
  if (t.preserveOrdinarySpaces || t.preserveHardBreaks) {
    if (e === ` `) return `preserved-space`;
    if (e === `	`) return `tab`;
    if (
      t.preserveHardBreaks &&
      e ===
        `
`
    )
      return `hard-break`;
  }
  return e === ` `
    ? `space`
    : e === `\xA0` || e === ` ` || e === `⁠` || e === `﻿`
      ? `glue`
      : e === `​`
        ? `zero-width-break`
        : e === `­`
          ? `soft-hyphen`
          : `text`;
}
function ie(e, t, n, r) {
  let i = [],
    a = null,
    o = ``,
    s = n,
    c = !1,
    l = 0;
  for (let u of e) {
    let e = re(u, r),
      d = e === `text` && t;
    if (a !== null && e === a && d === c) {
      ((o += u), (l += u.length));
      continue;
    }
    (a !== null && i.push({ text: o, isWordLike: c, kind: a, start: s }),
      (a = e),
      (o = u),
      (s = n + l),
      (c = d),
      (l += u.length));
  }
  return (
    a !== null && i.push({ text: o, isWordLike: c, kind: a, start: s }),
    i
  );
}
function ae(e) {
  return (
    e === `space` ||
    e === `preserved-space` ||
    e === `zero-width-break` ||
    e === `hard-break`
  );
}
var oe = /^[A-Za-z][A-Za-z0-9+.-]*:$/;
function se(e, t) {
  let n = e.texts[t];
  return n.startsWith(`www.`)
    ? !0
    : oe.test(n) &&
        t + 1 < e.len &&
        e.kinds[t + 1] === `text` &&
        e.texts[t + 1] === `//`;
}
function ce(e) {
  return e.includes(`?`) && (e.includes(`://`) || e.startsWith(`www.`));
}
function le(e) {
  let t = e.texts.slice(),
    n = e.isWordLike.slice(),
    r = e.kinds.slice(),
    i = e.starts.slice();
  for (let i = 0; i < e.len; i++) {
    if (r[i] !== `text` || !se(e, i)) continue;
    let a = i + 1;
    for (; a < e.len && !ae(r[a]); ) {
      ((t[i] += t[a]), (n[i] = !0));
      let e = t[a].includes(`?`);
      if (((r[a] = `text`), (t[a] = ``), a++, e)) break;
    }
  }
  let a = 0;
  for (let e = 0; e < t.length; e++) {
    let o = t[e];
    o.length !== 0 &&
      (a !== e && ((t[a] = o), (n[a] = n[e]), (r[a] = r[e]), (i[a] = i[e])),
      a++);
  }
  return (
    (t.length = a),
    (n.length = a),
    (r.length = a),
    (i.length = a),
    { len: a, texts: t, isWordLike: n, kinds: r, starts: i }
  );
}
function ue(e) {
  let t = [],
    n = [],
    r = [],
    i = [];
  for (let a = 0; a < e.len; a++) {
    let o = e.texts[a];
    if (
      (t.push(o),
      n.push(e.isWordLike[a]),
      r.push(e.kinds[a]),
      i.push(e.starts[a]),
      !ce(o))
    )
      continue;
    let s = a + 1;
    if (s >= e.len || ae(e.kinds[s])) continue;
    let c = ``,
      l = e.starts[s],
      u = s;
    for (; u < e.len && !ae(e.kinds[u]); ) ((c += e.texts[u]), u++);
    c.length > 0 &&
      (t.push(c), n.push(!0), r.push(`text`), i.push(l), (a = u - 1));
  }
  return { len: t.length, texts: t, isWordLike: n, kinds: r, starts: i };
}
var de = new Set([`:`, `-`, `/`, `×`, `,`, `.`, `+`, `–`, `—`]),
  fe = /^[A-Za-z0-9_]+[,:;]*$/,
  pe = /[,:;]+$/;
function me(e) {
  for (let t of e) if (h.test(t)) return !0;
  return !1;
}
function he(e) {
  if (e.length === 0) return !1;
  for (let t of e) if (!(h.test(t) || de.has(t))) return !1;
  return !0;
}
function ge(e) {
  let t = [],
    n = [],
    r = [],
    i = [];
  for (let a = 0; a < e.len; a++) {
    let o = e.texts[a],
      s = e.kinds[a];
    if (s === `text` && he(o) && me(o)) {
      let s = o,
        c = a + 1;
      for (; c < e.len && e.kinds[c] === `text` && he(e.texts[c]); )
        ((s += e.texts[c]), c++);
      (t.push(s), n.push(!0), r.push(`text`), i.push(e.starts[a]), (a = c - 1));
      continue;
    }
    (t.push(o), n.push(e.isWordLike[a]), r.push(s), i.push(e.starts[a]));
  }
  return { len: t.length, texts: t, isWordLike: n, kinds: r, starts: i };
}
function _e(e) {
  let t = [],
    n = [],
    r = [],
    i = [];
  for (let a = 0; a < e.len; a++) {
    let o = e.texts[a],
      s = e.kinds[a],
      c = e.isWordLike[a];
    if (s === `text` && c && fe.test(o)) {
      let s = o,
        c = a + 1;
      for (
        ;
        pe.test(s) &&
        c < e.len &&
        e.kinds[c] === `text` &&
        e.isWordLike[c] &&
        fe.test(e.texts[c]);
      )
        ((s += e.texts[c]), c++);
      (t.push(s), n.push(!0), r.push(`text`), i.push(e.starts[a]), (a = c - 1));
      continue;
    }
    (t.push(o), n.push(c), r.push(s), i.push(e.starts[a]));
  }
  return { len: t.length, texts: t, isWordLike: n, kinds: r, starts: i };
}
function ve(e) {
  let t = [],
    n = [],
    r = [],
    i = [];
  for (let a = 0; a < e.len; a++) {
    let o = e.texts[a];
    if (e.kinds[a] === `text` && o.includes(`-`)) {
      let s = o.split(`-`),
        c = s.length > 1;
      for (let e = 0; e < s.length; e++) {
        let t = s[e];
        if (!c) break;
        (t.length === 0 || !me(t) || !he(t)) && (c = !1);
      }
      if (c) {
        let o = 0;
        for (let c = 0; c < s.length; c++) {
          let l = s[c],
            u = c < s.length - 1 ? `${l}-` : l;
          (t.push(u),
            n.push(!0),
            r.push(`text`),
            i.push(e.starts[a] + o),
            (o += u.length));
        }
        continue;
      }
    }
    (t.push(o),
      n.push(e.isWordLike[a]),
      r.push(e.kinds[a]),
      i.push(e.starts[a]));
  }
  return { len: t.length, texts: t, isWordLike: n, kinds: r, starts: i };
}
function ye(e) {
  let t = [],
    n = [],
    r = [],
    i = [],
    a = 0;
  for (; a < e.len; ) {
    let o = e.texts[a],
      s = e.isWordLike[a],
      c = e.kinds[a],
      l = e.starts[a];
    if (c === `glue`) {
      let u = o,
        d = l;
      for (a++; a < e.len && e.kinds[a] === `glue`; ) ((u += e.texts[a]), a++);
      if (a < e.len && e.kinds[a] === `text`)
        ((o = u + e.texts[a]),
          (s = e.isWordLike[a]),
          (c = `text`),
          (l = d),
          a++);
      else {
        (t.push(u), n.push(!1), r.push(`glue`), i.push(d));
        continue;
      }
    } else a++;
    if (c === `text`)
      for (; a < e.len && e.kinds[a] === `glue`; ) {
        let t = ``;
        for (; a < e.len && e.kinds[a] === `glue`; ) ((t += e.texts[a]), a++);
        if (a < e.len && e.kinds[a] === `text`) {
          ((o += t + e.texts[a]), (s ||= e.isWordLike[a]), a++);
          continue;
        }
        o += t;
      }
    (t.push(o), n.push(s), r.push(c), i.push(l));
  }
  return { len: t.length, texts: t, isWordLike: n, kinds: r, starts: i };
}
function be(e) {
  let t = e.texts.slice(),
    n = e.isWordLike.slice(),
    r = e.kinds.slice(),
    i = e.starts.slice();
  for (let e = 0; e < t.length - 1; e++) {
    if (r[e] !== `text` || r[e + 1] !== `text` || !_(t[e]) || !_(t[e + 1]))
      continue;
    let n = k(t[e]);
    n !== null &&
      ((t[e] = n.head),
      (t[e + 1] = n.tail + t[e + 1]),
      (i[e + 1] = i[e] + n.head.length));
  }
  return { len: t.length, texts: t, isWordLike: n, kinds: r, starts: i };
}
function xe(e, t, n) {
  let r = f(),
    i = 0,
    a = [],
    o = [],
    s = [],
    c = [];
  for (let l of r.segment(e))
    for (let e of ie(l.segment, l.isWordLike ?? !1, l.index, n)) {
      let n = e.kind === `text`;
      (t.carryCJKAfterClosingQuote &&
        n &&
        i > 0 &&
        s[i - 1] === `text` &&
        _(e.text) &&
        _(a[i - 1]) &&
        ne(a[i - 1])) ||
      (n && i > 0 && s[i - 1] === `text` && E(e.text) && _(a[i - 1])) ||
      (n && i > 0 && s[i - 1] === `text` && j(a[i - 1]))
        ? ((a[i - 1] += e.text), (o[i - 1] = o[i - 1] || e.isWordLike))
        : n &&
            i > 0 &&
            s[i - 1] === `text` &&
            e.isWordLike &&
            g(e.text) &&
            A(a[i - 1])
          ? ((a[i - 1] += e.text), (o[i - 1] = !0))
          : (n &&
                !e.isWordLike &&
                i > 0 &&
                s[i - 1] === `text` &&
                e.text.length === 1 &&
                e.text !== `-` &&
                e.text !== `—` &&
                ee(a[i - 1], e.text)) ||
              (n &&
                !e.isWordLike &&
                i > 0 &&
                s[i - 1] === `text` &&
                (T(e.text) || (e.text === `-` && o[i - 1])))
            ? (a[i - 1] += e.text)
            : ((a[i] = e.text),
              (o[i] = e.isWordLike),
              (s[i] = e.kind),
              (c[i] = e.start),
              i++);
    }
  for (let e = 1; e < i; e++)
    s[e] === `text` &&
      !o[e] &&
      O(a[e]) &&
      s[e - 1] === `text` &&
      ((a[e - 1] += a[e]), (o[e - 1] = o[e - 1] || o[e]), (a[e] = ``));
  for (let e = i - 2; e >= 0; e--)
    if (s[e] === `text` && !o[e] && D(a[e])) {
      let t = e + 1;
      for (; t < i && a[t] === ``; ) t++;
      t < i &&
        s[t] === `text` &&
        ((a[t] = a[e] + a[t]), (c[t] = c[e]), (a[e] = ``));
    }
  let l = 0;
  for (let e = 0; e < i; e++) {
    let t = a[e];
    t.length !== 0 &&
      (l !== e && ((a[l] = t), (o[l] = o[e]), (s[l] = s[e]), (c[l] = c[e])),
      l++);
  }
  ((a.length = l), (o.length = l), (s.length = l), (c.length = l));
  let u = be(
    _e(
      ve(
        ge(
          ue(le(ye({ len: l, texts: a, isWordLike: o, kinds: s, starts: c }))),
        ),
      ),
    ),
  );
  for (let e = 0; e < u.len - 1; e++) {
    let t = te(u.texts[e]);
    t !== null &&
      ((u.kinds[e] !== `space` && u.kinds[e] !== `preserved-space`) ||
        u.kinds[e + 1] !== `text` ||
        !g(u.texts[e + 1]) ||
        ((u.texts[e] = t.space),
        (u.isWordLike[e] = !1),
        (u.kinds[e] =
          u.kinds[e] === `preserved-space` ? `preserved-space` : `space`),
        (u.texts[e + 1] = t.marks + u.texts[e + 1]),
        (u.starts[e + 1] = u.starts[e] + t.space.length)));
  }
  return u;
}
function Se(e, t) {
  if (e.len === 0) return [];
  if (!t.preserveHardBreaks)
    return [
      {
        startSegmentIndex: 0,
        endSegmentIndex: e.len,
        consumedEndSegmentIndex: e.len,
      },
    ];
  let n = [],
    r = 0;
  for (let t = 0; t < e.len; t++)
    e.kinds[t] === `hard-break` &&
      (n.push({
        startSegmentIndex: r,
        endSegmentIndex: t,
        consumedEndSegmentIndex: t + 1,
      }),
      (r = t + 1));
  return (
    r < e.len &&
      n.push({
        startSegmentIndex: r,
        endSegmentIndex: e.len,
        consumedEndSegmentIndex: e.len,
      }),
    n
  );
}
function Ce(e, t, n = `normal`) {
  let r = s(n),
    i = r.mode === `pre-wrap` ? l(e) : c(e);
  if (i.length === 0)
    return {
      normalized: i,
      chunks: [],
      len: 0,
      texts: [],
      isWordLike: [],
      kinds: [],
      starts: [],
    };
  let a = xe(i, t, r);
  return { normalized: i, chunks: Se(a, r), ...a };
}
var M = null,
  we = new Map(),
  N = null,
  Te = /\p{Emoji_Presentation}/u,
  Ee =
    /[\p{Emoji_Presentation}\p{Extended_Pictographic}\p{Regional_Indicator}\uFE0F\u20E3]/u,
  De = null,
  Oe = new Map();
function ke() {
  if (M !== null) return M;
  if (typeof OffscreenCanvas < `u`)
    return ((M = new OffscreenCanvas(1, 1).getContext(`2d`)), M);
  if (typeof document < `u`)
    return ((M = document.createElement(`canvas`).getContext(`2d`)), M);
  throw Error(
    `Text measurement requires OffscreenCanvas or a DOM canvas context.`,
  );
}
function Ae(e) {
  let t = we.get(e);
  return (t || ((t = new Map()), we.set(e, t)), t);
}
function P(e, t) {
  let n = t.get(e);
  return (
    n === void 0 &&
      ((n = { width: ke().measureText(e).width, containsCJK: _(e) }),
      t.set(e, n)),
    n
  );
}
function F() {
  if (N !== null) return N;
  if (typeof navigator > `u`)
    return (
      (N = {
        lineFitEpsilon: 0.005,
        carryCJKAfterClosingQuote: !1,
        preferPrefixWidthsForBreakableRuns: !1,
        preferEarlySoftHyphenBreak: !1,
      }),
      N
    );
  let e = navigator.userAgent,
    t =
      navigator.vendor === `Apple Computer, Inc.` &&
      e.includes(`Safari/`) &&
      !e.includes(`Chrome/`) &&
      !e.includes(`Chromium/`) &&
      !e.includes(`CriOS/`) &&
      !e.includes(`FxiOS/`) &&
      !e.includes(`EdgiOS/`),
    n =
      e.includes(`Chrome/`) ||
      e.includes(`Chromium/`) ||
      e.includes(`CriOS/`) ||
      e.includes(`Edg/`);
  return (
    (N = {
      lineFitEpsilon: t ? 1 / 64 : 0.005,
      carryCJKAfterClosingQuote: n,
      preferPrefixWidthsForBreakableRuns: t,
      preferEarlySoftHyphenBreak: t,
    }),
    N
  );
}
function je(e) {
  let t = e.match(/(\d+(?:\.\d+)?)\s*px/);
  return t ? parseFloat(t[1]) : 16;
}
function Me() {
  return (
    De === null &&
      (De = new Intl.Segmenter(void 0, { granularity: `grapheme` })),
    De
  );
}
function Ne(e) {
  return Te.test(e) || e.includes(`️`);
}
function Pe(e) {
  return Ee.test(e);
}
function Fe(e, t) {
  let n = Oe.get(e);
  if (n !== void 0) return n;
  let r = ke();
  r.font = e;
  let i = r.measureText(`😀`).width;
  if (
    ((n = 0), i > t + 0.5 && typeof document < `u` && document.body !== null)
  ) {
    let t = document.createElement(`span`);
    ((t.style.font = e),
      (t.style.display = `inline-block`),
      (t.style.visibility = `hidden`),
      (t.style.position = `absolute`),
      (t.textContent = `😀`),
      document.body.appendChild(t));
    let r = t.getBoundingClientRect().width;
    (document.body.removeChild(t), i - r > 0.5 && (n = i - r));
  }
  return (Oe.set(e, n), n);
}
function Ie(e) {
  let t = 0,
    n = Me();
  for (let r of n.segment(e)) Ne(r.segment) && t++;
  return t;
}
function Le(e, t) {
  return (t.emojiCount === void 0 && (t.emojiCount = Ie(e)), t.emojiCount);
}
function I(e, t, n) {
  return n === 0 ? t.width : t.width - Le(e, t) * n;
}
function Re(e, t, n, r) {
  if (t.graphemeWidths !== void 0) return t.graphemeWidths;
  let i = [],
    a = Me();
  for (let t of a.segment(e)) {
    let e = P(t.segment, n);
    i.push(I(t.segment, e, r));
  }
  return ((t.graphemeWidths = i.length > 1 ? i : null), t.graphemeWidths);
}
function ze(e, t, n, r) {
  if (t.graphemePrefixWidths !== void 0) return t.graphemePrefixWidths;
  let i = [],
    a = Me(),
    o = ``;
  for (let t of a.segment(e)) {
    o += t.segment;
    let e = P(o, n);
    i.push(I(o, e, r));
  }
  return (
    (t.graphemePrefixWidths = i.length > 1 ? i : null),
    t.graphemePrefixWidths
  );
}
function Be(e, t) {
  let n = ke();
  n.font = e;
  let r = Ae(e),
    i = je(e);
  return { cache: r, fontSize: i, emojiCorrection: t ? Fe(e, i) : 0 };
}
function L(e) {
  return (
    e === `space` ||
    e === `preserved-space` ||
    e === `tab` ||
    e === `zero-width-break` ||
    e === `soft-hyphen`
  );
}
function Ve(e) {
  return e === `space`;
}
function He(e, t) {
  if (t <= 0) return 0;
  let n = e % t;
  return Math.abs(n) <= 1e-6 ? t : t - n;
}
function Ue(e, t, n, r) {
  return !r || t === null ? e[n] : t[n] - (n > 0 ? t[n - 1] : 0);
}
function We(e, t, n, r, i, a) {
  let o = 0,
    s = t;
  for (; o < e.length; ) {
    let c = a ? t + e[o] : s + e[o];
    if ((o + 1 < e.length ? c + i : c) > n + r) break;
    ((s = c), o++);
  }
  return { fitCount: o, fittedWidth: s };
}
function Ge(e, t) {
  for (let n = 0; n < e.chunks.length; n++)
    if (t < e.chunks[n].consumedEndSegmentIndex) return n;
  return -1;
}
function Ke(e, t) {
  let n = t.segmentIndex,
    r = t.graphemeIndex;
  if (n >= e.widths.length) return null;
  if (r > 0) return t;
  let i = Ge(e, n);
  if (i < 0) return null;
  let a = e.chunks[i];
  if (a.startSegmentIndex === a.endSegmentIndex && n === a.startSegmentIndex)
    return { segmentIndex: n, graphemeIndex: 0 };
  for (
    n < a.startSegmentIndex && (n = a.startSegmentIndex);
    n < a.endSegmentIndex;
  ) {
    let t = e.kinds[n];
    if (t !== `space` && t !== `zero-width-break` && t !== `soft-hyphen`)
      return { segmentIndex: n, graphemeIndex: 0 };
    n++;
  }
  return a.consumedEndSegmentIndex >= e.widths.length
    ? null
    : { segmentIndex: a.consumedEndSegmentIndex, graphemeIndex: 0 };
}
function qe(e, t) {
  return e.simpleLineWalkFastPath ? Je(e, t) : Xe(e, t);
}
function Je(e, t) {
  let { widths: n, kinds: r, breakableWidths: i, breakablePrefixWidths: a } = e;
  if (n.length === 0) return 0;
  let o = F(),
    s = o.lineFitEpsilon,
    c = 0,
    l = 0,
    u = !1;
  function d(e) {
    let r = n[e];
    if (r > t && i[e] !== null) {
      let n = i[e],
        r = a[e] ?? null;
      l = 0;
      for (let e = 0; e < n.length; e++) {
        let i = Ue(n, r, e, o.preferPrefixWidthsForBreakableRuns);
        l > 0 && l + i > t + s ? (c++, (l = i)) : (l === 0 && c++, (l += i));
      }
    } else ((l = r), c++);
    u = !0;
  }
  for (let e = 0; e < n.length; e++) {
    let i = n[e],
      a = r[e];
    if (!u) {
      d(e);
      continue;
    }
    let o = l + i;
    if (o > t + s) {
      if (Ve(a)) continue;
      ((l = 0), (u = !1), d(e));
      continue;
    }
    l = o;
  }
  return u ? c : c + 1;
}
function Ye(e, t, n) {
  let { widths: r, kinds: i, breakableWidths: a, breakablePrefixWidths: o } = e;
  if (r.length === 0) return 0;
  let s = F(),
    c = s.lineFitEpsilon,
    l = 0,
    u = 0,
    d = !1,
    f = 0,
    p = 0,
    m = 0,
    h = 0,
    g = -1,
    _ = 0;
  function v() {
    ((g = -1), (_ = 0));
  }
  function y(e = m, t = h, r = u) {
    (l++,
      n?.({
        startSegmentIndex: f,
        startGraphemeIndex: p,
        endSegmentIndex: e,
        endGraphemeIndex: t,
        width: r,
      }),
      (u = 0),
      (d = !1),
      v());
  }
  function b(e, t) {
    ((d = !0), (f = e), (p = 0), (m = e + 1), (h = 0), (u = t));
  }
  function x(e, t, n) {
    ((d = !0), (f = e), (p = t), (m = e), (h = t + 1), (u = n));
  }
  function S(e, t) {
    if (!d) {
      b(e, t);
      return;
    }
    ((u += t), (m = e + 1), (h = 0));
  }
  function C(e, t) {
    L(i[e]) && ((g = e + 1), (_ = u - t));
  }
  function w(e) {
    T(e, 0);
  }
  function T(e, n) {
    let r = a[e],
      i = o[e] ?? null;
    for (let a = n; a < r.length; a++) {
      let n = Ue(r, i, a, s.preferPrefixWidthsForBreakableRuns);
      if (!d) {
        x(e, a, n);
        continue;
      }
      u + n > t + c ? (y(), x(e, a, n)) : ((u += n), (m = e), (h = a + 1));
    }
    d && m === e && h === r.length && ((m = e + 1), (h = 0));
  }
  let E = 0;
  for (; E < r.length; ) {
    let e = r[E],
      n = i[E];
    if (!d) {
      (e > t && a[E] !== null ? w(E) : b(E, e), C(E, e), E++);
      continue;
    }
    if (u + e > t + c) {
      if (L(n)) {
        (S(E, e), y(E + 1, 0, u - e), E++);
        continue;
      }
      if (g >= 0) {
        y(g, 0, _);
        continue;
      }
      if (e > t && a[E] !== null) {
        (y(), w(E), E++);
        continue;
      }
      y();
      continue;
    }
    (S(E, e), C(E, e), E++);
  }
  return (d && y(), l);
}
function Xe(e, t, n) {
  if (e.simpleLineWalkFastPath) return Ye(e, t, n);
  let {
    widths: r,
    lineEndFitAdvances: i,
    lineEndPaintAdvances: a,
    kinds: o,
    breakableWidths: s,
    breakablePrefixWidths: c,
    discretionaryHyphenWidth: l,
    tabStopAdvance: u,
    chunks: d,
  } = e;
  if (r.length === 0 || d.length === 0) return 0;
  let f = F(),
    p = f.lineFitEpsilon,
    m = 0,
    h = 0,
    g = !1,
    _ = 0,
    v = 0,
    y = 0,
    b = 0,
    x = -1,
    S = 0,
    C = 0,
    w = null;
  function T() {
    ((x = -1), (S = 0), (C = 0), (w = null));
  }
  function E(e = y, t = b, r = h) {
    (m++,
      n?.({
        startSegmentIndex: _,
        startGraphemeIndex: v,
        endSegmentIndex: e,
        endGraphemeIndex: t,
        width: r,
      }),
      (h = 0),
      (g = !1),
      T());
  }
  function D(e, t) {
    ((g = !0), (_ = e), (v = 0), (y = e + 1), (b = 0), (h = t));
  }
  function O(e, t, n) {
    ((g = !0), (_ = e), (v = t), (y = e), (b = t + 1), (h = n));
  }
  function k(e, t) {
    if (!g) {
      D(e, t);
      return;
    }
    ((h += t), (y = e + 1), (b = 0));
  }
  function ee(e, t) {
    if (!L(o[e])) return;
    let n = o[e] === `tab` ? 0 : i[e],
      r = o[e] === `tab` ? t : a[e];
    ((x = e + 1), (S = h - t + n), (C = h - t + r), (w = o[e]));
  }
  function A(e) {
    j(e, 0);
  }
  function j(e, n) {
    let r = s[e],
      i = c[e] ?? null;
    for (let a = n; a < r.length; a++) {
      let n = Ue(r, i, a, f.preferPrefixWidthsForBreakableRuns);
      if (!g) {
        O(e, a, n);
        continue;
      }
      h + n > t + p ? (E(), O(e, a, n)) : ((h += n), (y = e), (b = a + 1));
    }
    g && y === e && b === r.length && ((y = e + 1), (b = 0));
  }
  function te(e) {
    if (w !== `soft-hyphen`) return !1;
    let n = s[e];
    if (n === null) return !1;
    let r = f.preferPrefixWidthsForBreakableRuns ? (c[e] ?? n) : n,
      { fitCount: i, fittedWidth: a } = We(r, h, t, p, l, r !== n);
    return i === 0
      ? !1
      : ((h = a),
        (y = e),
        (b = i),
        T(),
        i === n.length
          ? ((y = e + 1), (b = 0), !0)
          : (E(e, i, a + l), j(e, i), !0));
  }
  function ne(e) {
    (m++,
      n?.({
        startSegmentIndex: e.startSegmentIndex,
        startGraphemeIndex: 0,
        endSegmentIndex: e.consumedEndSegmentIndex,
        endGraphemeIndex: 0,
        width: 0,
      }),
      T());
  }
  for (let e = 0; e < d.length; e++) {
    let n = d[e];
    if (n.startSegmentIndex === n.endSegmentIndex) {
      ne(n);
      continue;
    }
    ((g = !1),
      (h = 0),
      (_ = n.startSegmentIndex),
      (v = 0),
      (y = n.startSegmentIndex),
      (b = 0),
      T());
    let c = n.startSegmentIndex;
    for (; c < n.endSegmentIndex; ) {
      let e = o[c],
        n = e === `tab` ? He(h, u) : r[c];
      if (e === `soft-hyphen`) {
        (g &&
          ((y = c + 1),
          (b = 0),
          (x = c + 1),
          (S = h + l),
          (C = h + l),
          (w = e)),
          c++);
        continue;
      }
      if (!g) {
        (n > t && s[c] !== null ? A(c) : D(c, n), ee(c, n), c++);
        continue;
      }
      if (h + n > t + p) {
        let r = h + (e === `tab` ? 0 : i[c]),
          o = h + (e === `tab` ? n : a[c]);
        if (w === `soft-hyphen` && f.preferEarlySoftHyphenBreak && S <= t + p) {
          E(x, 0, C);
          continue;
        }
        if (w === `soft-hyphen` && te(c)) {
          c++;
          continue;
        }
        if (L(e) && r <= t + p) {
          (k(c, n), E(c + 1, 0, o), c++);
          continue;
        }
        if (x >= 0 && S <= t + p) {
          E(x, 0, C);
          continue;
        }
        if (n > t && s[c] !== null) {
          (E(), A(c), c++);
          continue;
        }
        E();
        continue;
      }
      (k(c, n), ee(c, n), c++);
    }
    if (g) {
      let e = x === n.consumedEndSegmentIndex ? C : h;
      E(n.consumedEndSegmentIndex, 0, e);
    }
  }
  return m;
}
function Ze(e, t, n) {
  let r = Ke(e, t);
  if (r === null) return null;
  if (e.simpleLineWalkFastPath) return Qe(e, r, n);
  let i = Ge(e, r.segmentIndex);
  if (i < 0) return null;
  let a = e.chunks[i];
  if (a.startSegmentIndex === a.endSegmentIndex)
    return {
      startSegmentIndex: a.startSegmentIndex,
      startGraphemeIndex: 0,
      endSegmentIndex: a.consumedEndSegmentIndex,
      endGraphemeIndex: 0,
      width: 0,
    };
  let {
      widths: o,
      lineEndFitAdvances: s,
      lineEndPaintAdvances: c,
      kinds: l,
      breakableWidths: u,
      breakablePrefixWidths: d,
      discretionaryHyphenWidth: f,
      tabStopAdvance: p,
    } = e,
    m = F(),
    h = m.lineFitEpsilon,
    g = 0,
    _ = !1,
    v = r.segmentIndex,
    y = r.graphemeIndex,
    b = v,
    x = y,
    S = -1,
    C = 0,
    w = 0,
    T = null;
  function E() {
    ((S = -1), (C = 0), (w = 0), (T = null));
  }
  function D(e = b, t = x, n = g) {
    return _
      ? {
          startSegmentIndex: v,
          startGraphemeIndex: y,
          endSegmentIndex: e,
          endGraphemeIndex: t,
          width: n,
        }
      : null;
  }
  function O(e, t) {
    ((_ = !0), (b = e + 1), (x = 0), (g = t));
  }
  function k(e, t, n) {
    ((_ = !0), (b = e), (x = t + 1), (g = n));
  }
  function ee(e, t) {
    if (!_) {
      O(e, t);
      return;
    }
    ((g += t), (b = e + 1), (x = 0));
  }
  function A(e, t) {
    if (!L(l[e])) return;
    let n = l[e] === `tab` ? 0 : s[e],
      r = l[e] === `tab` ? t : c[e];
    ((S = e + 1), (C = g - t + n), (w = g - t + r), (T = l[e]));
  }
  function j(e, t) {
    let r = u[e],
      i = d[e] ?? null;
    for (let a = t; a < r.length; a++) {
      let t = Ue(r, i, a, m.preferPrefixWidthsForBreakableRuns);
      if (!_) {
        k(e, a, t);
        continue;
      }
      if (g + t > n + h) return D();
      ((g += t), (b = e), (x = a + 1));
    }
    return (_ && b === e && x === r.length && ((b = e + 1), (x = 0)), null);
  }
  function te(e) {
    if (T !== `soft-hyphen` || S < 0) return null;
    let t = u[e] ?? null;
    if (t !== null) {
      let r = m.preferPrefixWidthsForBreakableRuns ? (d[e] ?? t) : t,
        { fitCount: i, fittedWidth: a } = We(r, g, n, h, f, r !== t);
      if (i === t.length) return ((g = a), (b = e + 1), (x = 0), E(), null);
      if (i > 0) return D(e, i, a + f);
    }
    return C <= n + h ? D(S, 0, w) : null;
  }
  for (let e = r.segmentIndex; e < a.endSegmentIndex; e++) {
    let t = l[e],
      i = e === r.segmentIndex ? r.graphemeIndex : 0,
      a = t === `tab` ? He(g, p) : o[e];
    if (t === `soft-hyphen` && i === 0) {
      _ &&
        ((b = e + 1), (x = 0), (S = e + 1), (C = g + f), (w = g + f), (T = t));
      continue;
    }
    if (!_) {
      if (i > 0) {
        let t = j(e, i);
        if (t !== null) return t;
      } else if (a > n && u[e] !== null) {
        let t = j(e, 0);
        if (t !== null) return t;
      } else O(e, a);
      A(e, a);
      continue;
    }
    if (g + a > n + h) {
      let r = g + (t === `tab` ? 0 : s[e]),
        i = g + (t === `tab` ? a : c[e]);
      if (T === `soft-hyphen` && m.preferEarlySoftHyphenBreak && C <= n + h)
        return D(S, 0, w);
      let o = te(e);
      if (o !== null) return o;
      if (L(t) && r <= n + h) return (ee(e, a), D(e + 1, 0, i));
      if (S >= 0 && C <= n + h) return D(S, 0, w);
      if (a > n && u[e] !== null) {
        let t = D();
        if (t !== null) return t;
        let n = j(e, 0);
        if (n !== null) return n;
      }
      return D();
    }
    (ee(e, a), A(e, a));
  }
  return S === a.consumedEndSegmentIndex && x === 0
    ? D(a.consumedEndSegmentIndex, 0, w)
    : D(a.consumedEndSegmentIndex, 0, g);
}
function Qe(e, t, n) {
  let { widths: r, kinds: i, breakableWidths: a, breakablePrefixWidths: o } = e,
    s = F(),
    c = s.lineFitEpsilon,
    l = 0,
    u = !1,
    d = t.segmentIndex,
    f = t.graphemeIndex,
    p = d,
    m = f,
    h = -1,
    g = 0;
  function _(e = p, t = m, n = l) {
    return u
      ? {
          startSegmentIndex: d,
          startGraphemeIndex: f,
          endSegmentIndex: e,
          endGraphemeIndex: t,
          width: n,
        }
      : null;
  }
  function v(e, t) {
    ((u = !0), (p = e + 1), (m = 0), (l = t));
  }
  function y(e, t, n) {
    ((u = !0), (p = e), (m = t + 1), (l = n));
  }
  function b(e, t) {
    if (!u) {
      v(e, t);
      return;
    }
    ((l += t), (p = e + 1), (m = 0));
  }
  function x(e, t) {
    L(i[e]) && ((h = e + 1), (g = l - t));
  }
  function S(e, t) {
    let r = a[e],
      i = o[e] ?? null;
    for (let a = t; a < r.length; a++) {
      let t = Ue(r, i, a, s.preferPrefixWidthsForBreakableRuns);
      if (!u) {
        y(e, a, t);
        continue;
      }
      if (l + t > n + c) return _();
      ((l += t), (p = e), (m = a + 1));
    }
    return (u && p === e && m === r.length && ((p = e + 1), (m = 0)), null);
  }
  for (let e = t.segmentIndex; e < r.length; e++) {
    let o = r[e],
      s = i[e],
      d = e === t.segmentIndex ? t.graphemeIndex : 0;
    if (!u) {
      if (d > 0) {
        let t = S(e, d);
        if (t !== null) return t;
      } else if (o > n && a[e] !== null) {
        let t = S(e, 0);
        if (t !== null) return t;
      } else v(e, o);
      x(e, o);
      continue;
    }
    if (l + o > n + c) {
      if (L(s)) return (b(e, o), _(e + 1, 0, l - o));
      if (h >= 0) return _(h, 0, g);
      if (o > n && a[e] !== null) {
        let t = _();
        if (t !== null) return t;
        let n = S(e, 0);
        if (n !== null) return n;
      }
      return _();
    }
    (b(e, o), x(e, o));
  }
  return _();
}
var $e = null,
  et = new WeakMap();
function tt() {
  return (
    $e === null &&
      ($e = new Intl.Segmenter(void 0, { granularity: `grapheme` })),
    $e
  );
}
function nt(e) {
  return e
    ? {
        widths: [],
        lineEndFitAdvances: [],
        lineEndPaintAdvances: [],
        kinds: [],
        simpleLineWalkFastPath: !0,
        segLevels: null,
        breakableWidths: [],
        breakablePrefixWidths: [],
        discretionaryHyphenWidth: 0,
        tabStopAdvance: 0,
        chunks: [],
        segments: [],
      }
    : {
        widths: [],
        lineEndFitAdvances: [],
        lineEndPaintAdvances: [],
        kinds: [],
        simpleLineWalkFastPath: !0,
        segLevels: null,
        breakableWidths: [],
        breakablePrefixWidths: [],
        discretionaryHyphenWidth: 0,
        tabStopAdvance: 0,
        chunks: [],
      };
}
function rt(e, t, n) {
  let r = tt(),
    a = F(),
    { cache: o, emojiCorrection: s } = Be(t, Pe(e.normalized)),
    c = I(`-`, P(`-`, o), s),
    l = I(` `, P(` `, o), s) * 8;
  if (e.len === 0) return nt(n);
  let u = [],
    d = [],
    f = [],
    p = [],
    m = e.chunks.length <= 1,
    h = n ? [] : null,
    g = [],
    b = [],
    S = n ? [] : null,
    C = Array.from({ length: e.len }),
    w = Array.from({ length: e.len });
  function T(e, t, n, r, i, a, o, s) {
    (i !== `text` && i !== `space` && i !== `zero-width-break` && (m = !1),
      u.push(t),
      d.push(n),
      f.push(r),
      p.push(i),
      h?.push(a),
      g.push(o),
      b.push(s),
      S !== null && S.push(e));
  }
  for (let t = 0; t < e.len; t++) {
    C[t] = u.length;
    let n = e.texts[t],
      i = e.isWordLike[t],
      l = e.kinds[t],
      d = e.starts[t];
    if (l === `soft-hyphen`) {
      (T(n, 0, c, c, l, d, null, null), (w[t] = u.length));
      continue;
    }
    if (l === `hard-break`) {
      (T(n, 0, 0, 0, l, d, null, null), (w[t] = u.length));
      continue;
    }
    if (l === `tab`) {
      (T(n, 0, 0, 0, l, d, null, null), (w[t] = u.length));
      continue;
    }
    let f = P(n, o);
    if (l === `text` && f.containsCJK) {
      let e = ``,
        i = 0;
      for (let t of r.segment(n)) {
        let n = t.segment;
        if (e.length === 0) {
          ((e = n), (i = t.index));
          continue;
        }
        if (
          y.has(e) ||
          v.has(n) ||
          x.has(n) ||
          (a.carryCJKAfterClosingQuote && _(n) && ne(e))
        ) {
          e += n;
          continue;
        }
        let r = P(e, o),
          c = I(e, r, s);
        (T(e, c, c, c, `text`, d + i, null, null), (e = n), (i = t.index));
      }
      if (e.length > 0) {
        let t = P(e, o),
          n = I(e, t, s);
        T(e, n, n, n, `text`, d + i, null, null);
      }
      w[t] = u.length;
      continue;
    }
    let p = I(n, f, s),
      m =
        l === `space` || l === `preserved-space` || l === `zero-width-break`
          ? 0
          : p,
      h = l === `space` || l === `zero-width-break` ? 0 : p;
    (i && n.length > 1
      ? T(
          n,
          p,
          m,
          h,
          l,
          d,
          Re(n, f, o, s),
          a.preferPrefixWidthsForBreakableRuns ? ze(n, f, o, s) : null,
        )
      : T(n, p, m, h, l, d, null, null),
      (w[t] = u.length));
  }
  let E = it(e.chunks, C, w),
    D = h === null ? null : i(e.normalized, h);
  return S === null
    ? {
        widths: u,
        lineEndFitAdvances: d,
        lineEndPaintAdvances: f,
        kinds: p,
        simpleLineWalkFastPath: m,
        segLevels: D,
        breakableWidths: g,
        breakablePrefixWidths: b,
        discretionaryHyphenWidth: c,
        tabStopAdvance: l,
        chunks: E,
      }
    : {
        widths: u,
        lineEndFitAdvances: d,
        lineEndPaintAdvances: f,
        kinds: p,
        simpleLineWalkFastPath: m,
        segLevels: D,
        breakableWidths: g,
        breakablePrefixWidths: b,
        discretionaryHyphenWidth: c,
        tabStopAdvance: l,
        chunks: E,
        segments: S,
      };
}
function it(e, t, n) {
  let r = [];
  for (let i = 0; i < e.length; i++) {
    let a = e[i],
      o =
        a.startSegmentIndex < t.length
          ? t[a.startSegmentIndex]
          : (n[n.length - 1] ?? 0),
      s =
        a.endSegmentIndex < t.length
          ? t[a.endSegmentIndex]
          : (n[n.length - 1] ?? 0),
      c =
        a.consumedEndSegmentIndex < t.length
          ? t[a.consumedEndSegmentIndex]
          : (n[n.length - 1] ?? 0);
    r.push({
      startSegmentIndex: o,
      endSegmentIndex: s,
      consumedEndSegmentIndex: c,
    });
  }
  return r;
}
function at(e, t, n, r) {
  return rt(Ce(e, F(), r?.whiteSpace), t, n);
}
function ot(e, t, n) {
  return at(e, t, !1, n);
}
function st(e, t, n) {
  return at(e, t, !0, n);
}
function ct(e) {
  return e;
}
function lt(e, t, n) {
  let r = qe(ct(e), t);
  return { lineCount: r, height: r * n };
}
function ut(e, t, n) {
  let r = n.get(e);
  if (r !== void 0) return r;
  r = [];
  let i = tt();
  for (let n of i.segment(t[e])) r.push(n.segment);
  return (n.set(e, r), r);
}
function dt(e) {
  let t = et.get(e);
  return t === void 0 ? ((t = new Map()), et.set(e, t), t) : t;
}
function ft(e, t, n, r) {
  return r > 0 && e[r - 1] === `soft-hyphen` && !(t === r && n > 0);
}
function pt(e, t, n, r, i, a, o) {
  let s = ``,
    c = ft(t, r, i, a);
  for (let o = r; o < a; o++)
    t[o] === `soft-hyphen` ||
      t[o] === `hard-break` ||
      (o === r && i > 0 ? (s += ut(o, e, n).slice(i).join(``)) : (s += e[o]));
  return (
    o > 0
      ? (c && (s += `-`),
        (s += ut(a, e, n)
          .slice(r === a ? i : 0, o)
          .join(``)))
      : c && (s += `-`),
    s
  );
}
function mt(e, t, n, r, i, a, o) {
  return {
    text: pt(e.segments, e.kinds, t, r, i, a, o),
    width: n,
    start: { segmentIndex: r, graphemeIndex: i },
    end: { segmentIndex: a, graphemeIndex: o },
  };
}
function ht(e, t, n) {
  return mt(
    e,
    t,
    n.width,
    n.startSegmentIndex,
    n.startGraphemeIndex,
    n.endSegmentIndex,
    n.endGraphemeIndex,
  );
}
function gt(e) {
  return {
    width: e.width,
    start: {
      segmentIndex: e.startSegmentIndex,
      graphemeIndex: e.startGraphemeIndex,
    },
    end: { segmentIndex: e.endSegmentIndex, graphemeIndex: e.endGraphemeIndex },
  };
}
function _t(e, t, n) {
  let r = Ze(e, t, n);
  return r === null ? null : gt(r);
}
function vt(e, t) {
  return mt(
    e,
    dt(e),
    t.width,
    t.start.segmentIndex,
    t.start.graphemeIndex,
    t.end.segmentIndex,
    t.end.graphemeIndex,
  );
}
function yt(e, t, n) {
  return e.widths.length === 0
    ? 0
    : Xe(ct(e), t, (e) => {
        n(gt(e));
      });
}
function bt(e, t, n) {
  let r = _t(e, t, n);
  return r === null ? null : vt(e, r);
}
function xt(e, t, n) {
  let r = [];
  if (e.widths.length === 0) return { lineCount: 0, height: 0, lines: r };
  let i = dt(e),
    a = Xe(ct(e), t, (t) => {
      r.push(ht(e, i, t));
    });
  return { lineCount: a, height: a * n, lines: r };
}
var R = null,
  St = {
    serve: {
      steps: 8,
      tempo: 84,
      voices: [
        {
          duration: 0.34,
          filterFrequency: 920,
          filterType: `lowpass`,
          gain: 0.045,
          notes: [50, R, 57, R, 53, R, 57, R],
          release: 0.18,
          wave: `triangle`,
        },
        {
          attack: 0.01,
          duration: 0.16,
          filterFrequency: 1400,
          filterType: `lowpass`,
          gain: 0.024,
          notes: [62, R, R, R, 69, R, R, R],
          release: 0.09,
          wave: `sine`,
        },
      ],
    },
    playing: {
      steps: 16,
      tempo: 116,
      voices: [
        {
          attack: 0.008,
          duration: 0.18,
          filterFrequency: 1800,
          filterType: `lowpass`,
          gain: 0.03,
          notes: [
            74, 76, 79, 81, 79, 76, 74, 72, 74, 76, 79, 81, 83, 81, 79, 76,
          ],
          release: 0.08,
          wave: `square`,
        },
        {
          duration: 0.24,
          filterFrequency: 720,
          filterType: `lowpass`,
          gain: 0.045,
          notes: [50, R, 50, R, 53, R, 53, R, 55, R, 55, R, 53, R, 50, R],
          release: 0.12,
          wave: `triangle`,
        },
        {
          attack: 0.004,
          duration: 0.08,
          filterFrequency: 2400,
          filterType: `bandpass`,
          gain: 0.012,
          notes: [86, R, R, 86, R, 86, R, R, 88, R, R, 88, R, 86, R, R],
          release: 0.04,
          wave: `sine`,
        },
      ],
    },
    "game-over": {
      steps: 8,
      tempo: 72,
      voices: [
        {
          duration: 0.46,
          filterFrequency: 760,
          filterType: `lowpass`,
          gain: 0.05,
          notes: [55, R, 53, R, 50, R, 46, R],
          release: 0.22,
          wave: `triangle`,
        },
        {
          attack: 0.012,
          duration: 0.26,
          filterFrequency: 1200,
          filterType: `lowpass`,
          gain: 0.022,
          notes: [67, R, 65, R, 62, R, 58, R],
          release: 0.12,
          wave: `sine`,
        },
      ],
    },
  };
function Ct(e, t, n) {
  let r = e.createOscillator(),
    i = e.createGain(),
    a = n.attack ?? 0.01,
    o = n.release ?? Math.max(0.04, n.duration * 0.65),
    s = n.startTime ?? e.currentTime,
    c = s + a,
    l = s + n.duration;
  ((r.type = n.wave),
    r.frequency.setValueAtTime(n.frequency, s),
    n.endFrequency !== void 0 &&
      r.frequency.exponentialRampToValueAtTime(
        Math.max(30, n.endFrequency),
        l,
      ));
  let u = r;
  if (n.filterType !== void 0 && n.filterFrequency !== void 0) {
    let t = e.createBiquadFilter();
    ((t.type = n.filterType),
      t.frequency.setValueAtTime(n.filterFrequency, s),
      r.connect(t),
      (u = t));
  }
  (u.connect(i),
    i.connect(t),
    i.gain.setValueAtTime(1e-4, s),
    i.gain.exponentialRampToValueAtTime(n.gain, c),
    i.gain.exponentialRampToValueAtTime(1e-4, l + o),
    r.start(s),
    r.stop(l + o + 0.02));
}
function z(e, t, n, r = {}) {
  let i = e.currentTime,
    a = r.gap ?? 0.015;
  for (let o = 0; o < n.length; o++) {
    let s = n[o];
    (Ct(e, t, {
      duration: s.duration,
      filterFrequency: r.filterFrequency,
      filterType: r.filterType,
      gain: s.gain,
      frequency: s.frequency,
      startTime: i,
      wave: s.wave,
    }),
      (i += s.duration + a));
  }
}
function wt(e, t) {
  Ct(e, t, {
    attack: 0.004,
    duration: 0.11,
    endFrequency: 620,
    filterFrequency: 1800,
    filterType: `lowpass`,
    gain: 0.05,
    frequency: 240,
    release: 0.04,
    wave: `sawtooth`,
  });
}
function Tt(e, t) {
  Ct(e, t, {
    attack: 0.002,
    duration: 0.06,
    endFrequency: 360,
    filterFrequency: 1500,
    filterType: `lowpass`,
    gain: 0.04,
    frequency: 760,
    release: 0.03,
    wave: `square`,
  });
}
function Et(e, t, n = 0.5) {
  let r = 520 + n * 280;
  z(
    e,
    t,
    [
      { duration: 0.04, frequency: r, gain: 0.028, wave: `square` },
      { duration: 0.05, frequency: r * 1.23, gain: 0.022, wave: `triangle` },
    ],
    { filterFrequency: 1900, filterType: `lowpass`, gap: 0.008 },
  );
}
function Dt(e, t, n) {
  if (n === `guard`) {
    z(
      e,
      t,
      [
        { duration: 0.07, frequency: 280, gain: 0.035, wave: `triangle` },
        { duration: 0.09, frequency: 420, gain: 0.032, wave: `square` },
      ],
      { filterFrequency: 1200, filterType: `lowpass`, gap: 0.012 },
    );
    return;
  }
  if (n === `life`) {
    z(
      e,
      t,
      [
        { duration: 0.06, frequency: 440, gain: 0.03, wave: `triangle` },
        { duration: 0.06, frequency: 554, gain: 0.032, wave: `triangle` },
        { duration: 0.09, frequency: 659, gain: 0.035, wave: `square` },
      ],
      { filterFrequency: 1800, filterType: `lowpass`, gap: 0.014 },
    );
    return;
  }
  if (n === `slow`) {
    z(
      e,
      t,
      [
        { duration: 0.06, frequency: 620, gain: 0.026, wave: `square` },
        { duration: 0.08, frequency: 520, gain: 0.03, wave: `triangle` },
        { duration: 0.1, frequency: 390, gain: 0.033, wave: `sine` },
      ],
      { filterFrequency: 1500, filterType: `lowpass`, gap: 0.012 },
    );
    return;
  }
  if (n === `multi`) {
    z(
      e,
      t,
      [
        { duration: 0.05, frequency: 392, gain: 0.026, wave: `triangle` },
        { duration: 0.05, frequency: 523, gain: 0.028, wave: `square` },
        { duration: 0.06, frequency: 659, gain: 0.03, wave: `square` },
        { duration: 0.07, frequency: 784, gain: 0.032, wave: `sine` },
      ],
      { filterFrequency: 1900, filterType: `lowpass`, gap: 0.01 },
    );
    return;
  }
  z(
    e,
    t,
    [
      { duration: 0.05, frequency: 420, gain: 0.028, wave: `triangle` },
      { duration: 0.06, frequency: 560, gain: 0.03, wave: `square` },
      { duration: 0.08, frequency: 700, gain: 0.032, wave: `square` },
    ],
    { filterFrequency: 1800, filterType: `lowpass`, gap: 0.012 },
  );
}
function Ot(e, t) {
  z(
    e,
    t,
    [
      { duration: 0.06, frequency: 392, gain: 0.028, wave: `triangle` },
      { duration: 0.06, frequency: 494, gain: 0.03, wave: `triangle` },
      { duration: 0.08, frequency: 587, gain: 0.034, wave: `square` },
      { duration: 0.1, frequency: 784, gain: 0.038, wave: `square` },
    ],
    { filterFrequency: 1800, filterType: `lowpass`, gap: 0.012 },
  );
}
function kt(e, t) {
  z(
    e,
    t,
    [
      { duration: 0.05, frequency: 330, gain: 0.03, wave: `triangle` },
      { duration: 0.06, frequency: 440, gain: 0.032, wave: `square` },
      { duration: 0.08, frequency: 660, gain: 0.034, wave: `square` },
    ],
    { filterFrequency: 1700, filterType: `lowpass`, gap: 0.01 },
  );
}
function At(e, t) {
  z(
    e,
    t,
    [
      { duration: 0.08, frequency: 320, gain: 0.03, wave: `square` },
      { duration: 0.09, frequency: 240, gain: 0.032, wave: `triangle` },
      { duration: 0.12, frequency: 160, gain: 0.036, wave: `sawtooth` },
    ],
    { filterFrequency: 1100, filterType: `lowpass`, gap: 0.01 },
  );
}
function jt(e, t) {
  z(
    e,
    t,
    [
      { duration: 0.12, frequency: 262, gain: 0.034, wave: `triangle` },
      { duration: 0.12, frequency: 196, gain: 0.036, wave: `triangle` },
      { duration: 0.18, frequency: 131, gain: 0.04, wave: `sawtooth` },
    ],
    { filterFrequency: 900, filterType: `lowpass`, gap: 0.018 },
  );
}
function Mt(e, t) {
  z(
    e,
    t,
    [
      { duration: 0.04, frequency: 520, gain: 0.02, wave: `sine` },
      { duration: 0.05, frequency: 680, gain: 0.024, wave: `sine` },
    ],
    { filterFrequency: 2200, filterType: `lowpass`, gap: 0.008 },
  );
}
var Nt = 0.12,
  Pt = 25;
function Ft(e) {
  return 440 * 2 ** ((e - 69) / 12);
}
var B = new (class {
    context = null;
    currentPattern = null;
    currentScene = `serve`;
    masterGain = null;
    musicGain = null;
    muted = !0;
    nextStepTime = 0;
    schedulerId = null;
    sfxGain = null;
    stepIndex = 0;
    unlocked = !1;
    getMuted() {
      return this.muted;
    }
    async unlock() {
      if ((this.ensureContext(), this.context !== null)) {
        if (this.context.state !== `running`)
          try {
            await this.context.resume();
          } catch {
            return;
          }
        ((this.unlocked = !0), this.applyMute(), this.ensureSceneMusic());
      }
    }
    setScene(e) {
      ((this.currentScene = e), this.ensureSceneMusic());
    }
    toggleMute() {
      let e = this.muted;
      return (
        (this.muted = !this.muted),
        this.applyMute(),
        this.muted ||
          this.unlock().then(() => {
            e && !this.muted && this.playSfx(Mt);
          }),
        this.muted
      );
    }
    playLaunch() {
      this.playSfx(wt);
    }
    playPaddle() {
      this.playSfx(Tt);
    }
    playBrick(e = 0.5) {
      this.playSfx((t, n) => Et(t, n, e));
    }
    playPowerUp(e) {
      this.playSfx((t, n) => Dt(t, n, e));
    }
    playWaveClear() {
      this.playSfx(Ot);
    }
    playGuardSave() {
      this.playSfx(kt);
    }
    playLoseLife() {
      this.playSfx(At);
    }
    playGameOver() {
      this.playSfx(jt);
    }
    ensureContext() {
      if (this.context !== null || typeof window > `u`) return;
      let e = window.AudioContext || window.webkitAudioContext;
      e !== void 0 &&
        ((this.context = new e()),
        (this.masterGain = this.context.createGain()),
        (this.musicGain = this.context.createGain()),
        (this.sfxGain = this.context.createGain()),
        (this.masterGain.gain.value = this.muted ? 0 : 0.9),
        (this.musicGain.gain.value = 0.38),
        (this.sfxGain.gain.value = 0.95),
        this.musicGain.connect(this.masterGain),
        this.sfxGain.connect(this.masterGain),
        this.masterGain.connect(this.context.destination));
    }
    applyMute() {
      if (this.context === null || this.masterGain === null) return;
      let e = this.muted ? 1e-4 : 0.9,
        t = this.context.currentTime;
      (this.masterGain.gain.cancelScheduledValues(t),
        this.masterGain.gain.setTargetAtTime(e, t, 0.015));
    }
    ensureSceneMusic() {
      if (
        !this.unlocked ||
        this.context === null ||
        this.context.state !== `running`
      )
        return;
      let e = St[this.currentScene];
      this.currentPattern !== e && this.startPattern(e);
    }
    startPattern(e) {
      (this.stopPattern(),
        this.context !== null &&
          ((this.currentPattern = e),
          (this.stepIndex = 0),
          (this.nextStepTime = this.context.currentTime + 0.04),
          (this.schedulerId = window.setInterval(
            () => this.tickPattern(),
            Pt,
          ))));
    }
    stopPattern() {
      (this.schedulerId !== null &&
        (window.clearInterval(this.schedulerId), (this.schedulerId = null)),
        (this.currentPattern = null));
    }
    tickPattern() {
      if (
        this.context === null ||
        this.musicGain === null ||
        this.currentPattern === null
      )
        return;
      let e = 60 / this.currentPattern.tempo / 2;
      for (; this.nextStepTime < this.context.currentTime + Nt; )
        (this.scheduleStep(
          this.currentPattern,
          this.stepIndex,
          this.nextStepTime,
        ),
          (this.stepIndex = (this.stepIndex + 1) % this.currentPattern.steps),
          (this.nextStepTime += e));
    }
    scheduleStep(e, t, n) {
      for (let r = 0; r < e.voices.length; r++) {
        let i = e.voices[r],
          a = i.notes[t % i.notes.length];
        a !== null && this.playMusicVoice(i, a, n);
      }
    }
    playMusicVoice(e, t, n) {
      if (this.context === null || this.musicGain === null) return;
      let r = this.context.createOscillator(),
        i = this.context.createGain(),
        a = e.attack ?? 0.01,
        o = e.release ?? Math.max(0.05, e.duration * 0.55),
        s = n + e.duration;
      ((r.type = e.wave),
        r.frequency.setValueAtTime(Ft(t), n),
        e.detune !== void 0 && (r.detune.value = e.detune));
      let c = r;
      if (e.filterType !== void 0 && e.filterFrequency !== void 0) {
        let t = this.context.createBiquadFilter();
        ((t.type = e.filterType),
          t.frequency.setValueAtTime(e.filterFrequency, n),
          r.connect(t),
          (c = t));
      }
      (c.connect(i),
        i.connect(this.musicGain),
        i.gain.setValueAtTime(1e-4, n),
        i.gain.exponentialRampToValueAtTime(e.gain, n + a),
        i.gain.exponentialRampToValueAtTime(1e-4, s + o),
        r.start(n),
        r.stop(s + o + 0.02));
    }
    playSfx(e) {
      if (
        !(!this.unlocked || this.context === null || this.sfxGain === null) &&
        this.context.state === `running`
      )
        try {
          e(this.context, this.sfxGain);
        } catch (e) {
          console.warn(`[audio] sfx failed`, e);
        }
    }
  })(),
  It = 1e5,
  Lt = class {
    preparedCache = new Map();
    preparedSegmentCache = new Map();
    blockCache = new Map();
    heightCache = new Map();
    measureParagraphHeight(e, t, n, r, i = `normal`) {
      let a = `h::${t}::${n}::${r}::${i}::${e}`,
        o = this.heightCache.get(a);
      if (o !== void 0) return o;
      let s = lt(this.getPrepared(e, t, i), r, n).height;
      return (this.heightCache.set(a, s), s);
    }
    measureMaxLineWidth(e, t, n = It, r = `pre-wrap`) {
      let i = this.getPreparedSegments(e, t, r),
        a = 0;
      return (
        yt(i, n, (e) => {
          e.width > a && (a = e.width);
        }),
        a
      );
    }
    getBlock(e, t, n, r = It, i = `pre-wrap`) {
      let a = `b::${t}::${n}::${r}::${i}::${e}`,
        o = this.blockCache.get(a);
      if (o !== void 0) return o;
      let s = this.getPreparedSegments(e, t, i),
        c = xt(s, r, n),
        l = c.lines.reduce((e, t) => Math.max(e, t.width), 0),
        u = {
          text: e,
          font: t,
          lineHeight: n,
          maxWidth: r,
          lineCount: c.lineCount,
          width: l,
          height: c.height,
          prepared: s,
          lines: c.lines.map((e) => ({ text: e.text, width: e.width })),
        };
      return (this.blockCache.set(a, u), u);
    }
    drawBlock(e, t, n, r, i = {}) {
      let a = i.align ?? `left`,
        o = i.verticalAlign ?? `top`,
        s =
          o === `middle` ? r - t.height / 2 : o === `bottom` ? r - t.height : r;
      (e.save(),
        (e.font = t.font),
        (e.textBaseline = `top`),
        (e.globalAlpha = i.alpha ?? 1),
        (e.fillStyle = i.color ?? `#f6f2df`),
        (e.shadowColor = i.shadowColor ?? `transparent`),
        (e.shadowBlur = i.shadowBlur ?? 0),
        (e.shadowOffsetX = i.shadowOffsetX ?? 0),
        (e.shadowOffsetY = i.shadowOffsetY ?? 0),
        i.strokeColor !== void 0 &&
          ((e.strokeStyle = i.strokeColor),
          (e.lineWidth = i.strokeWidth ?? 1),
          (e.lineJoin = `round`)));
      for (let r = 0; r < t.lines.length; r++) {
        let o = t.lines[r],
          c =
            a === `center` ? n - o.width / 2 : a === `right` ? n - o.width : n,
          l = s + r * t.lineHeight;
        (i.strokeColor !== void 0 && e.strokeText(o.text, c, l),
          e.fillText(o.text, c, l));
      }
      e.restore();
    }
    getPrepared(e, t, n) {
      let r = `p::${t}::${n}::${e}`,
        i = this.preparedCache.get(r);
      if (i !== void 0) return i;
      let a = ot(e, t, { whiteSpace: n });
      return (this.preparedCache.set(r, a), a);
    }
    getPreparedSegments(e, t, n) {
      let r = `s::${t}::${n}::${e}`,
        i = this.preparedSegmentCache.get(r);
      if (i !== void 0) return i;
      let a = st(e, t, { whiteSpace: n });
      return (this.preparedSegmentCache.set(r, a), a);
    }
  },
  V = 960,
  H = 1440,
  Rt = 1 / 20,
  U = `"IBM Plex Mono", "SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", monospace`,
  W = {
    ball: `800 24px ${U}`,
    border: `700 18px ${U}`,
    borderCompact: `700 11px ${U}`,
    brick: `800 24px ${U}`,
    footer: `600 15px ${U}`,
    overlay: `800 26px ${U}`,
    paddle: `800 20px ${U}`,
    powerUp: `800 18px ${U}`,
    status: `600 17px ${U}`,
    wall: `600 12px ${U}`,
    title: `800 40px ${U}`,
  },
  G = {
    borderCompact: 12,
    overlay: 34,
    panel: 24,
    powerUp: 24,
    sprite: 24,
    title: 44,
    wall: 16,
  },
  K = { x: 44, y: 28, width: V - 88, height: 128 },
  q = { x: 48, y: 166, width: V - 96, height: 1206 },
  J = { x: 44, y: 1384, width: V - 88, height: 38 },
  Y = { x: q.x + 54, y: q.y + 22, width: q.width - 108, height: 800 },
  zt = 12,
  Bt = 20,
  Vt = 34,
  Ht = 3,
  Ut = 540,
  Wt = 34,
  Gt = `⟦==========⟧`,
  Kt = `⟦==============⟧`,
  qt = 500,
  Jt = 40,
  Yt = 10,
  Xt = 146,
  Zt = 0.34,
  Qt = 0.74,
  $t = 35,
  en = 2,
  tn = 3,
  nn = 5,
  rn = [-0.42, 0.42, -0.24, 0.24],
  an = 28,
  on = 72,
  sn = `⟦:::: SAFEGUARD :::::⟧`,
  cn = [`#ff9c5b`, `#f0c35f`, `#84d96c`, `#55c6d9`, `#8ba7ff`],
  ln = `rgba(6, 10, 17, 0.8)`,
  un = [`#35586b`, `#40637a`, `#4d7285`, `#58707d`],
  dn = 16,
  fn = 38,
  pn = 3.1,
  mn = 2.34,
  hn = 2.18,
  gn = 372,
  _n = 88,
  vn = [`TEXT`, `WALL`, `GLYPH`, `FLOW`],
  yn = [`This portfolio is built for immersion. Best experienced on desktop`],
  bn = {
    expand: { color: `#95edff`, duration: 12, label: `WIDEN` },
    guard: { color: `#a4f094`, duration: 0, label: `GUARD` },
    multi: { color: `#c7b2ff`, duration: 0, label: `MULTI` },
    life: { color: `#ff9db8`, duration: 0, label: `+LIFE` },
    slow: { color: `#ffd577`, duration: 10, label: `SLOW` },
  },
  X = [`expand`, `slow`, `multi`, `guard`, `life`],
  xn = 3;
function Z(e, t, n) {
  return Math.max(t, Math.min(n, e));
}
function Q(e, t, n) {
  return e + (t - e) * n;
}
function $(e) {
  return 1 - (1 - Z(e, 0, 1)) ** 3;
}
function Sn(e) {
  let t = Z(e, 0, 1);
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}
function Cn(e) {
  let t = Z(e, 0, 1),
    n = 1.70158;
  return 1 + (n + 1) * (t - 1) ** 3 + n * (t - 1) ** 2;
}
function wn(e) {
  return e.toString().padStart(5, `0`);
}
function Tn(e) {
  return e.replace(/^[\[\<]+|[\]\>]+$/g, ``);
}
function En(e) {
  let t = e.match(/[A-Za-z0-9]+(?:'[A-Za-z0-9]+)*/g);
  if (t === null) return [...vn];
  let n = t.filter((e) => e.length > 1);
  return n.length > 0 ? n : [...vn];
}
function Dn(e) {
  return `800 ${e}px ${U}`;
}
function On(e) {
  return Math.round(e * 1.08);
}
function kn(e) {
  return Math.round(e * 0.18);
}
function An(e) {
  return Math.round(e * 0.12);
}
function jn(e) {
  return Math.round(e * 0.2);
}
function Mn(e, t, n) {
  return e >= n.x && e <= n.x + n.width && t >= n.y && t <= n.y + n.height;
}
var Nn = class {
    canvas;
    context;
    renderer = new Lt();
    pointer = { active: !1, x: V / 2 };
    keys = { launchQueued: !1, left: !1, right: !1 };
    view = { dpr: 1, height: H, width: V };
    paddleBlock;
    expandedPaddleBlock;
    ballBlock;
    guardBlock;
    activeEffects = { expand: 0, guardCharges: 0, slow: 0 };
    overlayBlocks = {
      cleared: this.renderer.getBlock(
        `WAVE CLEAR
PRESS UP OR TAP`,
        W.overlay,
        G.overlay,
        340,
        `pre-wrap`,
      ),
      gameOver: this.renderer.getBlock(
        `THE WALL RETURNS
PRESS R, UP OR TAP`,
        W.overlay,
        G.overlay,
        420,
        `pre-wrap`,
      ),
      serve: this.renderer.getBlock(
        `HOLD THE LINE
TO PLAY THIS INSTEAD`,
        W.overlay,
        G.overlay,
        420,
        `pre-wrap`,
      ),
    };
    backgroundGlyphs;
    textWallPrepared;
    paddle = { blockWidth: 0, x: q.x + q.width / 2, y: q.y + q.height - Wt };
    animationFrame = 0;
    ballRadius = 10;
    bestScore = 0;
    balls = [];
    bricks = [];
    clearedWave = !1;
    lastTimestamp = 0;
    level = 1;
    lives = Ht;
    mode = `serve`;
    particles = [];
    powerUps = [];
    recentPowerUpKinds = [];
    score = 0;
    screenShake = 0;
    sequence = null;
    hasShownOpeningIntro = !1;
    statusCopy = ``;
    wakeHoles = [];
    constructor(e) {
      this.canvas = e;
      let t = e.getContext(`2d`);
      if (t === null) throw Error(`2D canvas not available`);
      ((this.context = t),
        (this.paddleBlock = this.renderer.getBlock(
          Gt,
          W.paddle,
          G.sprite,
          500,
        )),
        (this.expandedPaddleBlock = this.renderer.getBlock(
          Kt,
          W.paddle,
          G.sprite,
          500,
        )),
        (this.ballBlock = this.renderer.getBlock(`◉`, W.ball, G.sprite)),
        (this.guardBlock = this.renderer.getBlock(
          sn,
          W.powerUp,
          G.powerUp,
          520,
        )),
        (this.paddle.blockWidth = this.getCurrentPaddleBlock().width),
        (this.ballRadius = Math.max(
          8,
          Math.min(14, this.ballBlock.width * 0.45),
        )),
        (this.backgroundGlyphs = this.buildBackgroundGlyphs()),
        (this.textWallPrepared = st(this.buildTextWallCopy(), W.wall)),
        this.attachEvents(),
        this.resetWave(!0),
        B.setScene(`serve`),
        this.resize(),
        (this.animationFrame = requestAnimationFrame(this.frame)));
    }
    attachEvents() {
      (window.addEventListener(`resize`, this.resize),
        window.addEventListener(`keydown`, this.onKeyDown),
        window.addEventListener(`keyup`, this.onKeyUp),
        this.canvas.addEventListener(`pointerdown`, this.onPointerDown),
        this.canvas.addEventListener(`pointermove`, this.onPointerMove),
        this.canvas.addEventListener(`pointerup`, this.onPointerUp),
        this.canvas.addEventListener(`pointercancel`, this.onPointerUp),
        this.canvas.addEventListener(`pointerleave`, this.onPointerUp),
        (this.canvas.style.touchAction = `none`));
    }
    isExpandActive() {
      return this.activeEffects.expand > 0;
    }
    isSlowActive() {
      return this.activeEffects.slow > 0;
    }
    getCurrentPaddleBlock() {
      return this.isExpandActive()
        ? this.expandedPaddleBlock
        : this.paddleBlock;
    }
    syncPaddleWidth() {
      ((this.paddle.blockWidth = this.getCurrentPaddleBlock().width),
        (this.paddle.x = Z(
          this.paddle.x,
          q.x + this.paddle.blockWidth / 2,
          q.x + q.width - this.paddle.blockWidth / 2,
        )));
    }
    getBaseBallSpeed() {
      return qt + (this.level - 1) * Jt;
    }
    getCurrentBallSpeed() {
      return this.getBaseBallSpeed() * (this.isSlowActive() ? Qt : 1);
    }
    createBallState(e = this.paddle.x, t = this.paddle.y - an) {
      return {
        radius: this.ballRadius,
        speed: this.getCurrentBallSpeed(),
        stuckOffsetY: an,
        vx: 0,
        vy: 0,
        wakePoint: null,
        x: e,
        y: t,
      };
    }
    resetBallsToServe() {
      this.balls = [this.createBallState()];
    }
    getPrimaryBall() {
      return (
        this.balls.length === 0 && this.resetBallsToServe(),
        this.balls[0]
      );
    }
    setBallAngle(e, t) {
      let n = this.getCurrentBallSpeed();
      e.speed = n;
      let r = Math.cos(t) * n,
        i = Math.sin(t) * n,
        a = n * 0.36;
      (Math.abs(i) < a &&
        ((i = (i === 0 ? -1 : Math.sign(i)) * a),
        (r =
          (r === 0 ? 1 : Math.sign(r)) *
          Math.sqrt(Math.max(0, n ** 2 - i ** 2)))),
        (e.vx = r),
        (e.vy = i));
    }
    syncBallSpeed() {
      let e = this.getCurrentBallSpeed();
      for (let t = 0; t < this.balls.length; t++) {
        let n = this.balls[t];
        if (((n.speed = e), this.mode !== `playing`)) continue;
        let r = Math.hypot(n.vx, n.vy);
        if (r < 0.001) continue;
        let i = e / r;
        ((n.vx *= i), (n.vy *= i));
      }
    }
    getPowerUpBlock(e) {
      let { label: t } = bn[e];
      return this.renderer.getBlock(`[${t}]`, W.powerUp, G.powerUp);
    }
    getGuardRect() {
      let e = q.x + q.width / 2,
        t = q.y + q.height - on,
        n = this.guardBlock.width,
        r = this.guardBlock.height;
      return {
        centerX: e,
        centerY: t,
        height: r,
        left: e - n / 2,
        right: e + n / 2,
        top: t - r / 2,
        width: n,
      };
    }
    getAudioButtonRect() {
      return { height: 28, width: 86, x: K.x + K.width - 102, y: K.y + 12 };
    }
    getOverlayRect() {
      let e = this.mode === `serve` ? 208 : 152;
      return {
        x: V / 2 - 228,
        y: q.y + q.height / 2 - 34,
        width: 456,
        height: e,
      };
    }
    getOverlayAudioButtonRect() {
      let e = this.getOverlayRect();
      return {
        height: 32,
        width: 116,
        x: e.x + (e.width - 116) / 2,
        y: e.y + e.height - 52,
      };
    }
    getSequenceProgress(e) {
      return this.sequence === null || this.sequence.kind !== e
        ? null
        : Z(this.sequence.timer / this.sequence.duration, 0, 1);
    }
    beginIntroSequence(e) {
      ((this.sequence = {
        duration: mn + (e ? 0.14 : 0),
        initialWave: e,
        kind: `intro`,
        level: this.level,
        timer: 0,
      }),
        (this.mode = `transition`),
        (this.keys.launchQueued = !1),
        (this.pointer.active = !1),
        (this.wakeHoles = []),
        B.setScene(`serve`));
    }
    beginOpeningSequence() {
      ((this.hasShownOpeningIntro = !0),
        (this.sequence = {
          duration: pn,
          initialWave: !0,
          kind: `opening`,
          level: this.level,
          timer: 0,
        }),
        (this.mode = `transition`),
        (this.keys.launchQueued = !1),
        (this.pointer.active = !1),
        (this.wakeHoles = []),
        B.setScene(`serve`));
    }
    beginClearSequence() {
      ((this.sequence = {
        duration: hn,
        initialWave: !1,
        kind: `clear`,
        level: this.level,
        timer: 0,
      }),
        (this.mode = `transition`),
        (this.clearedWave = !0),
        (this.keys.launchQueued = !1),
        (this.pointer.active = !1),
        (this.powerUps = []),
        (this.wakeHoles = []),
        (this.screenShake = Math.max(this.screenShake, 2.8)),
        this.spawnPickupBurst(
          q.x + q.width / 2,
          q.y + q.height / 2 - 26,
          `CLEAR`,
          `#ffcf73`,
        ),
        B.playWaveClear(),
        B.setScene(`serve`));
    }
    updateTransition(e) {
      if (
        this.sequence !== null &&
        ((this.sequence.timer = Math.min(
          this.sequence.duration,
          this.sequence.timer + e,
        )),
        (this.keys.launchQueued = !1),
        !(this.sequence.timer < this.sequence.duration))
      ) {
        if (this.sequence.kind === `opening`) {
          this.beginIntroSequence(!0);
          return;
        }
        if (this.sequence.kind === `clear`) {
          ((this.level += 1), this.resetWave(!1));
          return;
        }
        ((this.sequence = null), (this.mode = `serve`));
      }
    }
    getEffectSummary() {
      let e = [];
      return (
        this.balls.length > 1 && e.push(`${this.balls.length} BALLS`),
        this.isExpandActive() &&
          e.push(`WIDEN ${Math.ceil(this.activeEffects.expand)}s`),
        this.isSlowActive() &&
          e.push(`SLOW ${Math.ceil(this.activeEffects.slow)}s`),
        this.activeEffects.guardCharges > 0 &&
          e.push(
            this.activeEffects.guardCharges > 1
              ? `GUARD x${this.activeEffects.guardCharges}`
              : `GUARD READY`,
          ),
        e.length === 0 ? `` : `POWER WORDS: ${e.join(`  |  `)}`
      );
    }
    onKeyDown = (e) => {
      if (
        (B.unlock(),
        (e.key === `ArrowLeft` || e.key.toLowerCase() === `a`) &&
          (this.keys.left = !0),
        (e.key === `ArrowRight` || e.key.toLowerCase() === `d`) &&
          (this.keys.right = !0),
        e.key.toLowerCase() === `m` && !e.repeat)
      ) {
        (e.preventDefault(), B.toggleMute());
        return;
      }
      ((e.key === `ArrowUp` || e.key === `Enter`) &&
        this.mode !== `transition` &&
        (e.preventDefault(), (this.keys.launchQueued = !0)),
        e.key.toLowerCase() === `r` &&
          this.mode === `game-over` &&
          this.restart());
    };
    onKeyUp = (e) => {
      ((e.key === `ArrowLeft` || e.key.toLowerCase() === `a`) &&
        (this.keys.left = !1),
        (e.key === `ArrowRight` || e.key.toLowerCase() === `d`) &&
          (this.keys.right = !1));
    };
    onPointerDown = (e) => {
      B.unlock();
      let t = this.toViewCoordinates(e);
      if (
        this.mode === `serve` &&
        Mn(t.x, t.y, this.getOverlayAudioButtonRect())
      ) {
        ((this.pointer.active = !1),
          (this.keys.launchQueued = !1),
          B.toggleMute());
        return;
      }
      if (Mn(t.x, t.y, this.getAudioButtonRect())) {
        ((this.pointer.active = !1),
          (this.keys.launchQueued = !1),
          B.toggleMute());
        return;
      }
      if (this.mode === `transition`) {
        ((this.pointer.active = !1), (this.keys.launchQueued = !1));
        return;
      }
      ((this.pointer.active = !0),
        (this.pointer.x = t.x),
        (this.keys.launchQueued = !0));
    };
    onPointerMove = (e) => {
      let t = this.toViewCoordinates(e);
      this.pointer.x = t.x;
    };
    onPointerUp = () => {
      this.pointer.active = !1;
    };
    resize = () => {
      let e = this.canvas.parentElement;
      if (e === null) return;
      let t = e.getBoundingClientRect(),
        n = Math.min(t.width / V, t.height / H),
        r = Math.round(V * n),
        i = Math.round(H * n);
      ((this.canvas.style.width = `${r}px`),
        (this.canvas.style.height = `${i}px`));
      let a = window.devicePixelRatio || 1;
      ((this.canvas.width = Math.round(V * a)),
        (this.canvas.height = Math.round(H * a)),
        this.context.setTransform(a, 0, 0, a, 0, 0),
        (this.view.dpr = a),
        (this.view.width = V),
        (this.view.height = H));
    };
    frame = (e) => {
      let t =
        this.lastTimestamp === 0
          ? 1 / 60
          : Math.min(Rt, (e - this.lastTimestamp) / 1e3);
      ((this.lastTimestamp = e),
        this.update(t),
        this.render(),
        (this.animationFrame = requestAnimationFrame(this.frame)));
    };
    update(e) {
      if (
        (this.updateBackgroundGlyphs(e),
        this.updateWakeHoles(e),
        this.updateParticles(e),
        this.updateActiveEffects(e),
        (this.screenShake = Math.max(0, this.screenShake - e * 16)),
        this.updateBrickAnimations(e),
        this.updatePaddle(e),
        this.updatePowerUps(e),
        this.mode === `transition`)
      ) {
        (this.updateTransition(e), this.updateStatusCopy());
        return;
      }
      if (this.mode === `serve`) {
        let e = this.getPrimaryBall();
        ((this.balls.length = 1),
          (e.x = this.paddle.x),
          (e.y = this.paddle.y - e.stuckOffsetY),
          (e.vx = 0),
          (e.vy = 0),
          (e.speed = this.getCurrentBallSpeed()),
          (e.wakePoint = { x: e.x, y: e.y }),
          this.keys.launchQueued &&
            (this.launchBall(), (this.keys.launchQueued = !1)),
          this.updateStatusCopy());
        return;
      }
      if (this.mode === `game-over`) {
        (this.keys.launchQueued &&
          (this.restart(), (this.keys.launchQueued = !1)),
          this.updateStatusCopy());
        return;
      }
      this.keys.launchQueued = !1;
      let t = this.updatePlayingBalls(e);
      (this.bricks.every((e) => !e.alive)
        ? this.beginClearSequence()
        : this.balls.length === 0 && this.loseLife(t ?? this.paddle.x),
        this.updateStatusCopy());
    }
    updatePlayingBalls(e) {
      let t = null,
        n = this.getCurrentPaddleBlock(),
        r = this.paddle.y,
        i = this.paddle.x - this.paddle.blockWidth / 2 - 2,
        a = this.paddle.x + this.paddle.blockWidth / 2 + 2,
        o = r + n.height,
        s = this.activeEffects.guardCharges > 0 ? this.getGuardRect() : null,
        c = s === null ? 0 : s.top + s.height;
      for (let n = this.balls.length - 1; n >= 0; n--) {
        let l = this.balls[n],
          u = l.x,
          d = l.y;
        ((l.x += l.vx * e), (l.y += l.vy * e), this.trackWake(l));
        let f = q.x + Yt + l.radius,
          p = q.x + q.width - Yt - l.radius,
          m = q.y + Yt + l.radius;
        if (
          (l.x <= f
            ? ((l.x = f), (l.vx = Math.abs(l.vx)))
            : l.x >= p && ((l.x = p), (l.vx = -Math.abs(l.vx))),
          l.y <= m && ((l.y = m), (l.vy = Math.abs(l.vy))),
          l.vy > 0 &&
            l.y + l.radius >= r &&
            l.y - l.radius <= o &&
            l.x >= i &&
            l.x <= a)
        ) {
          let e = Z(
              (l.x - this.paddle.x) / (this.paddle.blockWidth * 0.5),
              -1,
              1,
            ),
            t = e === 0 ? (l.vx >= 0 ? 1 : -1) : Math.sign(e),
            n = Math.abs(e) < 0.18 ? t * 0.18 : e;
          ((l.y = r - l.radius - 1),
            (l.vx = n * (l.speed * 0.92)),
            (l.vy = -Math.sqrt(Math.max(0, l.speed ** 2 - l.vx ** 2))),
            (this.screenShake = 1.2),
            B.playPaddle(),
            this.spawnPaddleSpark(l));
        }
        let h = l.x - l.radius,
          g = l.x + l.radius,
          _ = l.y - l.radius,
          v = l.y + l.radius;
        for (let e = 0; e < this.bricks.length; e++) {
          let t = this.bricks[e];
          if (!t.alive) continue;
          let n = t.x,
            r = t.x + t.width,
            i = t.y,
            a = t.y + t.height;
          if (g < n || h > r || v < i || _ > a) continue;
          ((t.alive = !1),
            (this.score += t.value),
            (this.bestScore = Math.max(this.bestScore, this.score)),
            (this.screenShake = 2.2),
            B.playBrick(Z(Tn(t.label).length / 10, 0.2, 1)),
            this.spawnBurst(t.x + t.width / 2, t.y + t.height / 2, t),
            this.maybeSpawnPowerUp(t.x + t.width / 2, t.y + t.height / 2));
          let o = g - n,
            s = r - h,
            c = v - i,
            u = a - _,
            d = Math.min(o, s, c, u);
          d === o
            ? ((l.x = n - l.radius - 1), (l.vx = -Math.abs(l.vx)))
            : d === s
              ? ((l.x = r + l.radius + 1), (l.vx = Math.abs(l.vx)))
              : d === c
                ? ((l.y = i - l.radius - 1), (l.vy = -Math.abs(l.vy)))
                : ((l.y = a + l.radius + 1), (l.vy = Math.abs(l.vy)));
          break;
        }
        if (
          s !== null &&
          l.vy > 0 &&
          l.y + l.radius >= s.top &&
          l.y - l.radius <= c &&
          l.x >= s.left &&
          l.x <= s.right
        ) {
          let e = Z((l.x - s.centerX) / (s.width * 0.5), -0.58, 0.58);
          ((l.x = Z(l.x, s.left + l.radius + 2, s.right - l.radius - 2)),
            (l.y = s.top - l.radius - 1),
            (l.vx = Z(
              l.vx + e * (l.speed * 0.32),
              -l.speed * 0.82,
              l.speed * 0.82,
            )),
            (l.vy = -Math.sqrt(Math.max(0, l.speed ** 2 - l.vx ** 2))),
            --this.activeEffects.guardCharges,
            (this.screenShake = 1.8),
            B.playGuardSave(),
            this.spawnPickupBurst(l.x, s.top + 8, `SAVE`, `#a4f094`));
        }
        if (l.y - l.radius > q.y + q.height + 10) {
          ((t = l.x), this.balls.splice(n, 1));
          continue;
        }
        (Math.abs(u - l.x) > 0.5 || Math.abs(d - l.y) > 0.5) &&
          this.spawnTrailParticle(l);
      }
      return t;
    }
    updatePaddle(e) {
      if (this.mode === `transition`) return;
      if (this.pointer.active) {
        let t =
          Z(
            this.pointer.x,
            q.x + this.paddle.blockWidth / 2,
            q.x + q.width - this.paddle.blockWidth / 2,
          ) - this.paddle.x;
        this.paddle.x += t * Math.min(1, e * 16);
        return;
      }
      let t = 0;
      (this.keys.left && --t,
        this.keys.right && (t += 1),
        (this.paddle.x = Z(
          this.paddle.x + t * Ut * e,
          q.x + this.paddle.blockWidth / 2,
          q.x + q.width - this.paddle.blockWidth / 2,
        )));
    }
    updateActiveEffects(e) {
      if (this.mode !== `playing`) return;
      let t = this.isExpandActive(),
        n = this.isSlowActive();
      ((this.activeEffects.expand = Math.max(0, this.activeEffects.expand - e)),
        (this.activeEffects.slow = Math.max(0, this.activeEffects.slow - e)),
        t !== this.isExpandActive() && this.syncPaddleWidth(),
        n !== this.isSlowActive() && this.syncBallSpeed());
    }
    updatePowerUps(e) {
      if (this.mode === `transition`) return;
      let t = this.getCurrentPaddleBlock(),
        n = this.paddle.y - 6,
        r = this.paddle.y + t.height + 10,
        i = this.paddle.x - this.paddle.blockWidth / 2 - 10,
        a = this.paddle.x + this.paddle.blockWidth / 2 + 10;
      for (let t = this.powerUps.length - 1; t >= 0; t--) {
        let o = this.powerUps[t];
        ((o.x += o.vx * e), (o.y += o.vy * e), (o.rotation += o.spin * e));
        let s = o.x - o.width / 2,
          c = o.x + o.width / 2,
          l = o.y - o.height / 2,
          u = o.y + o.height / 2;
        if (
          ((s <= q.x + 10 || c >= q.x + q.width - 10) &&
            ((o.vx *= -1),
            (o.x = Z(
              o.x,
              q.x + 10 + o.width / 2,
              q.x + q.width - 10 - o.width / 2,
            ))),
          c >= i && s <= a && u >= n && l <= r)
        ) {
          (this.powerUps.splice(t, 1), this.applyPowerUp(o));
          continue;
        }
        l > q.y + q.height + 24 && this.powerUps.splice(t, 1);
      }
    }
    updateBrickAnimations(e) {
      let t = Math.min(1, e * 10);
      for (let e = 0; e < this.bricks.length; e++) {
        let n = this.bricks[e];
        n.alive &&
          ((n.x += (n.xTarget - n.x) * t), (n.y += (n.yTarget - n.y) * t));
      }
    }
    render() {
      let e = this.context;
      e.clearRect(0, 0, V, H);
      let t = e.createLinearGradient(0, 0, 0, H);
      (t.addColorStop(0, `#07111c`),
        t.addColorStop(0.48, `#0f2030`),
        t.addColorStop(1, `#1d1208`),
        (e.fillStyle = t),
        e.fillRect(0, 0, V, H));
      let n = (Math.random() - 0.5) * this.screenShake * 2.8,
        r = (Math.random() - 0.5) * this.screenShake * 2.2;
      (e.save(),
        e.translate(n, r),
        this.drawBackgroundGlyphs(),
        this.getSequenceProgress(`opening`) === null &&
          (this.drawFrame(K, `#9bbce9`, W.borderCompact, G.borderCompact),
          this.drawFrame(q, `#75d7e6`),
          this.drawFrame(J, `#f0c35f`, W.borderCompact, G.borderCompact),
          this.drawHud(),
          this.getSequenceProgress(`intro`) === null
            ? this.drawPlayfield()
            : this.drawIntroPlayfield(),
          this.drawFooter()),
        this.mode === `transition`
          ? this.drawTransitionSequence()
          : this.mode !== `playing` && this.drawOverlay(),
        e.restore());
    }
    drawPlayfield() {
      (this.drawReflowingTextWall(),
        this.drawBricks(),
        this.drawPowerUps(),
        this.drawParticles(),
        this.drawGuard(),
        this.drawPaddle(),
        this.drawBall());
    }
    drawIntroPlayfield() {
      let e = this.getSequenceProgress(`intro`);
      if (e === null) {
        this.drawPlayfield();
        return;
      }
      let t = $((e - 0.02) / 0.22),
        n = Z((e - 0.16) / 0.28, 0, 1),
        r = Z((e - 0.62) / 0.24, 0, 1),
        i = Cn((e - 0.74) / 0.16),
        a = q.x + 12,
        o = q.y + 12,
        s = q.width - 24,
        c = q.height - 24,
        l = [],
        u = [];
      if (i > 0.08) {
        let e = this.paddle.y + (1 - i) * 44,
          t = this.getCurrentPaddleBlock();
        l.push({
          bottom: e + t.height + 6,
          left: this.paddle.x - this.paddle.blockWidth / 2 - 12,
          right: this.paddle.x + this.paddle.blockWidth / 2 + 12,
          top: e - 6,
        });
        let n = this.getPrimaryBall();
        if (
          (u.push({ radius: fn, x: n.x, y: n.y + (1 - i) * 56 }),
          this.activeEffects.guardCharges > 0)
        ) {
          let e = this.getGuardRect(),
            t = (1 - i) * 34;
          l.push({
            bottom: e.centerY + t + e.height / 2 + 4,
            left: e.left - 10,
            right: e.right + 10,
            top: e.centerY + t - e.height / 2 - 4,
          });
        }
      }
      if (
        (this.drawReflowingTextWall((1 - t) * 14, 0.24 + t * 0.76, r, u, l, !0),
        this.context.save(),
        this.context.beginPath(),
        this.context.rect(a, o, s, c),
        this.context.clip(),
        this.drawBricks(r),
        this.drawPowerUps(),
        this.drawParticles(),
        this.drawGuard(0.08 + i * 0.92, (1 - i) * 34),
        this.drawPaddle(0.12 + i * 0.88, (1 - i) * 44),
        this.drawBall(0.1 + i * 0.9, (1 - i) * 56),
        this.context.restore(),
        n > 0 && n < 1)
      ) {
        let e = o + n * c;
        (this.context.save(),
          this.context.beginPath(),
          this.context.rect(a, o, s, c),
          this.context.clip());
        let t = this.context.createLinearGradient(0, e - 84, 0, e + 26);
        (t.addColorStop(0, `rgba(117, 215, 230, 0)`),
          t.addColorStop(0.32, `rgba(117, 215, 230, 0.08)`),
          t.addColorStop(0.54, `rgba(117, 215, 230, 0.18)`),
          t.addColorStop(0.72, `rgba(255, 221, 153, 0.34)`),
          t.addColorStop(1, `rgba(255, 221, 153, 0)`),
          (this.context.fillStyle = t),
          this.context.fillRect(a, e - 84, s, 110),
          (this.context.fillStyle = `rgba(255, 241, 199, 0.52)`),
          this.context.fillRect(a + 18, e - 1, s - 36, 2),
          this.context.restore());
      }
    }
    drawHud() {
      let e = K.y + 18,
        t = K.y + 24,
        n = this.getAudioButtonRect(),
        r = this.renderer.getBlock(`HI EVERYONE`, W.title, G.title),
        i = this.renderer.getBlock(
          `SCORE ${wn(this.score)}   LIVES ${`♥`.repeat(this.lives)}   LEVEL ${this.level.toString().padStart(2, `0`)}`,
          W.status,
          G.panel,
          n.x - K.x - 24 - 16,
        ),
        a = this.renderer.getBlock(
          this.statusCopy,
          W.status,
          22,
          K.width - 48,
          `pre-wrap`,
        ),
        o = Math.min(K.y + 66, K.y + K.height - G.borderCompact - a.height - 6);
      (this.renderer.drawBlock(this.context, r, K.x + 24, e, {
        color: `#f8f4e4`,
        shadowBlur: 12,
        shadowColor: `rgba(117, 215, 230, 0.28)`,
      }),
        this.renderer.drawBlock(this.context, i, n.x - 16, t, {
          align: `right`,
          color: `#ffdd99`,
        }),
        this.renderer.drawBlock(this.context, a, K.x + 24, o, {
          color: `#9ad6ff`,
        }),
        this.drawAudioButton(n));
    }
    drawAudioButton(e) {
      let t = B.getMuted(),
        n = this.context.createLinearGradient(0, e.y, 0, e.y + e.height);
      (t
        ? (n.addColorStop(0, `rgba(33, 23, 18, 0.94)`),
          n.addColorStop(1, `rgba(68, 33, 25, 0.88)`))
        : (n.addColorStop(0, `rgba(18, 33, 41, 0.94)`),
          n.addColorStop(1, `rgba(19, 58, 64, 0.88)`)),
        this.context.save(),
        (this.context.fillStyle = n),
        this.context.fillRect(e.x + 6, e.y + 6, e.width - 12, e.height - 12),
        this.context.restore(),
        this.drawFrame(
          e,
          t ? `#ffb38f` : `#95edff`,
          W.borderCompact,
          G.borderCompact,
        ));
      let r = this.renderer.getBlock(t ? `SND OFF` : `SND ON`, W.footer, 16);
      this.renderer.drawBlock(
        this.context,
        r,
        e.x + e.width / 2,
        e.y + e.height / 2,
        {
          align: `center`,
          color: t ? `#ffd6bf` : `#d9fbff`,
          shadowBlur: 8,
          shadowColor: `rgba(7, 16, 26, 0.32)`,
          verticalAlign: `middle`,
        },
      );
    }
    drawFooter() {
      let e = `MOVE: MOUSE, TOUCH, ARROWS, A/D. LAUNCH: UP/TAP. SOUND: ICON OR M. CATCH POWER WORDS.`,
        t = this.renderer.measureParagraphHeight(
          e,
          W.footer,
          16,
          J.width - 40,
          `normal`,
        ),
        n = this.renderer.getBlock(e, W.footer, 16, J.width - 40, `normal`);
      this.renderer.drawBlock(
        this.context,
        n,
        J.x + 20,
        J.y + Math.floor((J.height - t) / 2) - 1,
        { color: `#f2e6bf` },
      );
    }
    getBrickRenderState(e, t, n) {
      let r = Z(n, 0, 1),
        i = Math.min(0.46, t * 0.028),
        a = r >= 1 ? 1 : Z((r - i) / Math.max(0.001, 1 - i), 0, 1),
        o = r >= 1 ? 1 : Cn(a),
        s = e.x + e.paddingX,
        c = e.y + e.paddingY - 1,
        l = 88 + (t % 5) * 24,
        u = s,
        d = c;
      switch (t % 6) {
        case 0:
          ((u = q.x - e.width - 140 - l), (d = c - 48 - l * 0.25));
          break;
        case 1:
          ((u = q.x + q.width + 120 + l), (d = c - 30 + l * 0.22));
          break;
        case 2:
          ((u = s - 42 - l * 0.34), (d = q.y - e.height - 110 - l));
          break;
        case 3:
          ((u = s + 36 + l * 0.28), (d = q.y + q.height + 120 + l));
          break;
        case 4:
          ((u = q.x - e.width - 124 - l), (d = q.y + q.height + 86 + l * 0.3));
          break;
        default:
          ((u = q.x + q.width + 124 + l), (d = q.y - e.height - 82 - l * 0.3));
          break;
      }
      let f = Q(u, s, o),
        p = Q(d, c, o);
      return {
        alpha: 0.08 + a * 0.92,
        drawX: f,
        drawY: p,
        rectX: f - e.paddingX,
        rectY: p - e.paddingY + 1,
      };
    }
    drawBricks(e = 1) {
      for (let t = 0; t < this.bricks.length; t++) {
        let n = this.bricks[t];
        if (!n.alive) continue;
        let r = this.getBrickRenderState(n, t, e);
        this.renderer.drawBlock(this.context, n.block, r.drawX, r.drawY, {
          alpha: r.alpha,
          color: n.color,
          strokeColor: `rgba(5, 10, 16, 0.65)`,
          strokeWidth: 2,
          shadowBlur: 10,
          shadowColor: `rgba(255, 214, 153, 0.18)`,
        });
      }
    }
    drawPowerUps() {
      for (let e = 0; e < this.powerUps.length; e++) {
        let t = this.powerUps[e];
        (this.context.save(),
          this.context.translate(t.x, t.y),
          this.context.rotate(t.rotation),
          this.renderer.drawBlock(this.context, t.block, 0, 0, {
            align: `center`,
            color: t.color,
            shadowBlur: 14,
            shadowColor: `rgba(12, 18, 24, 0.42)`,
            strokeColor: `rgba(7, 12, 18, 0.7)`,
            strokeWidth: 2,
            verticalAlign: `middle`,
          }),
          this.context.restore());
      }
    }
    drawGuard(e = 1, t = 0) {
      if (this.activeEffects.guardCharges <= 0) return;
      let n = this.getGuardRect();
      if (
        (this.renderer.drawBlock(
          this.context,
          this.guardBlock,
          n.centerX,
          n.centerY + t,
          {
            alpha: e,
            align: `center`,
            color: `#a4f094`,
            shadowBlur: 12,
            shadowColor: `rgba(164, 240, 148, 0.22)`,
            strokeColor: `rgba(6, 14, 10, 0.62)`,
            strokeWidth: 2,
            verticalAlign: `middle`,
          },
        ),
        this.activeEffects.guardCharges > 1)
      ) {
        let r = this.renderer.getBlock(
          `x${this.activeEffects.guardCharges}`,
          W.footer,
          20,
        );
        this.renderer.drawBlock(
          this.context,
          r,
          n.right + 18,
          n.centerY + t - r.height / 2,
          { alpha: e, color: `#ddffd7` },
        );
      }
    }
    drawPaddle(e = 1, t = 0) {
      let n = this.getCurrentPaddleBlock();
      this.renderer.drawBlock(
        this.context,
        n,
        this.paddle.x,
        this.paddle.y + t,
        {
          alpha: e,
          align: `center`,
          color: `#f5f0df`,
          shadowBlur: 14,
          shadowColor: `rgba(117, 215, 230, 0.35)`,
        },
      );
    }
    drawBall(e = 1, t = 0) {
      for (let n = 0; n < this.balls.length; n++) {
        let r = this.balls[n];
        this.renderer.drawBlock(this.context, this.ballBlock, r.x, r.y + t, {
          alpha: e,
          align: `center`,
          color: `#ffd577`,
          shadowBlur: 16,
          shadowColor: `rgba(255, 183, 76, 0.45)`,
          verticalAlign: `middle`,
        });
      }
    }
    drawTransitionSequence() {
      if (this.sequence !== null) {
        if (this.sequence.kind === `opening`) {
          this.drawOpeningSequence(this.sequence);
          return;
        }
        if (this.sequence.kind === `intro`) {
          this.drawIntroSequence(this.sequence);
          return;
        }
        this.drawClearSequence(this.sequence);
      }
    }
    drawOpeningSequence(e) {
      let t = Z(e.timer / e.duration, 0, 1),
        n = 0.28 + $((t - 0.04) / 0.18) * 0.72,
        r = 0.32 + $((t - 0.08) / 0.2) * 0.52,
        i = `800 54px ${U}`,
        a = this.renderer.getBlock(`PRETEXT`, i, 58),
        o = this.renderer.getBlock(`BREAKER`, i, 58),
        s = this.renderer.getBlock(
          `BREAK WORDS. BEND THE WALL. LAUNCH THE GLYPH.`,
          W.status,
          G.panel,
        ),
        c = this.renderer.getBlock(
          `LEVEL ${e.level.toString().padStart(2, `0`)}  TEXT WALL ONLINE`,
          W.footer,
          18,
        ),
        l = Cn((t - 0.14) / 0.2),
        u = Cn((t - 0.24) / 0.22),
        d = Z((t - 0.18) / 0.62, 0, 1),
        f = $((t - 0.2) / 0.18),
        p = $((t - 0.48) / 0.16),
        m = $((t - 0.62) / 0.18),
        h = q.x + q.width / 2;
      q.y + q.height / 2;
      let g = this.getCurrentPaddleBlock(),
        _ = h + Math.sin(t * Math.PI * 2.2 + 0.4) * (q.width * 0.16),
        v = q.y + q.height - 46,
        y = Q(q.x + 78, q.x + q.width - 78, d),
        b = Math.abs(Math.sin(d * Math.PI * 2.1 + 0.2)),
        x = q.y + 118 + (1 - b) * (q.height * 0.52),
        S = Q(q.x - a.width - 120, h, l),
        C = Q(q.x + q.width + o.width + 120, h, u),
        w = q.y + 96 + Math.sin(t * Math.PI * 3.2) * 4,
        T = q.y + 170 + Math.sin(t * Math.PI * 3.2 + 0.6) * 4,
        E = [];
      if (
        (l > 0.06 &&
          E.push({
            bottom: w + a.height + 14,
            left: S - a.width / 2 - 18,
            right: S + a.width / 2 + 18,
            top: w - 10,
          }),
        u > 0.06 &&
          E.push({
            bottom: T + o.height + 14,
            left: C - o.width / 2 - 18,
            right: C + o.width / 2 + 18,
            top: T - 10,
          }),
        p > 0.08 &&
          E.push({
            bottom: q.y + 268 + s.height + 10,
            left: h - s.width / 2 - 18,
            right: h + s.width / 2 + 18,
            top: q.y + 260,
          }),
        m > 0.08 &&
          E.push({
            bottom: q.y + 318 + c.height + 8,
            left: h - c.width / 2 - 18,
            right: h + c.width / 2 + 18,
            top: q.y + 312,
          }),
        f > 0.08)
      ) {
        let e = v + (1 - f) * 22;
        E.push({
          bottom: e + g.height + 10,
          left: _ - g.width / 2 - 14,
          right: _ + g.width / 2 + 14,
          top: e - 8,
        });
      }
      this.context.save();
      let D = this.context.createLinearGradient(0, 0, 0, H);
      (D.addColorStop(0, `rgba(4, 9, 15, 0.52)`),
        D.addColorStop(0.52, `rgba(7, 16, 26, 0.36)`),
        D.addColorStop(1, `rgba(18, 10, 6, 0.42)`),
        (this.context.fillStyle = D),
        this.context.fillRect(0, 0, V, H),
        this.context.restore(),
        this.drawFrame(K, `#9bbce9`, W.borderCompact, G.borderCompact, n),
        this.drawFrame(q, `#75d7e6`, W.border, G.sprite, n),
        this.drawFrame(J, `#f0c35f`, W.borderCompact, G.borderCompact, n),
        this.drawHud(),
        this.drawFooter(),
        this.context.save(),
        this.context.beginPath(),
        this.context.rect(q.x + 12, q.y + 12, q.width - 24, q.height - 24),
        this.context.clip(),
        this.drawReflowingTextWall(
          0,
          r,
          null,
          d > 0.06 ? [{ radius: fn + 10, x: y, y: x }] : [],
          E,
          !0,
        ));
      let O = this.context.createLinearGradient(0, q.y, 0, q.y + q.height);
      (O.addColorStop(0, `rgba(117, 215, 230, 0.03)`),
        O.addColorStop(0.52, `rgba(117, 215, 230, 0)`),
        O.addColorStop(1, `rgba(255, 207, 115, 0.05)`),
        (this.context.fillStyle = O),
        this.context.fillRect(q.x + 12, q.y + 12, q.width - 24, q.height - 24),
        this.renderer.drawBlock(this.context, a, S, w, {
          alpha: l,
          align: `center`,
          color: cn[0],
          strokeColor: `rgba(5, 10, 16, 0.65)`,
          strokeWidth: 2,
          shadowBlur: 14,
          shadowColor: `rgba(255, 214, 153, 0.2)`,
        }),
        this.renderer.drawBlock(this.context, o, C, T, {
          alpha: u,
          align: `center`,
          color: cn[3],
          strokeColor: `rgba(5, 10, 16, 0.65)`,
          strokeWidth: 2,
          shadowBlur: 14,
          shadowColor: `rgba(117, 215, 230, 0.22)`,
        }));
      let k = this.renderer.getBlock(
        `═════════════════════════`,
        W.border,
        G.sprite,
      );
      if (
        (this.renderer.drawBlock(this.context, k, h, q.y + 248, {
          alpha: 0.12 + p * 0.46,
          align: `center`,
          color: `#75d7e6`,
        }),
        this.renderer.drawBlock(this.context, s, h, q.y + 268, {
          alpha: p,
          align: `center`,
          color: `#9ad6ff`,
          shadowBlur: 10,
          shadowColor: `rgba(117, 215, 230, 0.18)`,
        }),
        this.renderer.drawBlock(this.context, c, h, q.y + 318, {
          alpha: m,
          align: `center`,
          color: `#f2e6bf`,
        }),
        d > 0)
      ) {
        let e = this.renderer.getBlock(`·`, W.footer, 20);
        for (let t = 0; t < 9; t++) {
          let n = Z(d - t * 0.05, 0, 1);
          if (n <= 0) continue;
          let r = Q(q.x + 78, q.x + q.width - 78, n),
            i = Math.abs(Math.sin(n * Math.PI * 2.1 + 0.2)),
            a = q.y + 118 + (1 - i) * (q.height * 0.52),
            o = (0.08 + n * 0.2) * (1 - t / 10);
          this.renderer.drawBlock(this.context, e, r - 8, a + 14, {
            alpha: o,
            align: `center`,
            color: `#f2c56b`,
            verticalAlign: `middle`,
          });
        }
        this.context.save();
        let t = this.context.createRadialGradient(y, x, 6, y, x, 54);
        (t.addColorStop(0, `rgba(255, 221, 153, 0.28)`),
          t.addColorStop(0.42, `rgba(117, 215, 230, 0.12)`),
          t.addColorStop(1, `rgba(117, 215, 230, 0)`),
          (this.context.fillStyle = t),
          this.context.beginPath(),
          this.context.arc(y, x, 54, 0, Math.PI * 2),
          this.context.fill(),
          this.context.restore(),
          this.renderer.drawBlock(this.context, this.ballBlock, y, x, {
            alpha: 0.2 + d * 0.8,
            align: `center`,
            color: `#ffd577`,
            shadowBlur: 18,
            shadowColor: `rgba(255, 183, 76, 0.45)`,
            verticalAlign: `middle`,
          }));
      }
      (this.renderer.drawBlock(this.context, g, _, v + (1 - f) * 22, {
        alpha: 0.16 + f * 0.84,
        align: `center`,
        color: `#f5f0df`,
        shadowBlur: 14,
        shadowColor: `rgba(117, 215, 230, 0.35)`,
      }),
        this.context.restore());
    }
    drawIntroSequence(e) {
      let t = Z(e.timer / e.duration, 0, 1),
        n = Z(Cn((t - 0.04) / 0.18) * Z(1 - $((t - 0.5) / 0.14), 0, 1), 0, 1),
        r = (1 - $(t / 0.38)) * 20,
        i = `TEXT AWAKENS\nLEVEL ${e.level.toString().padStart(2, `0`)}`;
      this.drawSequenceCard(
        { height: _n, width: gn, x: V / 2 - gn / 2, y: q.y + 42 - r },
        i,
        `#95edff`,
        `rgba(7, 16, 26, 0.84)`,
        `rgba(9, 38, 49, 0.76)`,
        `#e3fbff`,
        n * 0.92,
      );
    }
    drawClearSequence(e) {
      let t = Z(e.timer / e.duration, 0, 1),
        n = q.x + 10,
        r = q.y + 10,
        i = q.width - 20,
        a = q.height - 20,
        o = r + Sn((t - 0.08) / 0.74) * a;
      (this.context.save(),
        this.context.beginPath(),
        this.context.rect(n, r, i, a),
        this.context.clip(),
        (this.context.fillStyle = `rgba(255, 207, 115, ${0.03 + t * 0.08})`),
        this.context.fillRect(n, r, i, a));
      let s = this.context.createLinearGradient(0, o - 84, 0, o + 84);
      (s.addColorStop(0, `rgba(255, 207, 115, 0)`),
        s.addColorStop(0.28, `rgba(255, 207, 115, 0.08)`),
        s.addColorStop(0.5, `rgba(255, 245, 214, 0.3)`),
        s.addColorStop(0.72, `rgba(117, 215, 230, 0.12)`),
        s.addColorStop(1, `rgba(117, 215, 230, 0)`),
        (this.context.fillStyle = s),
        this.context.fillRect(n, o - 84, i, 168),
        (this.context.fillStyle = `rgba(255, 241, 199, 0.55)`),
        this.context.fillRect(n + 24, o - 1, i - 48, 2),
        this.context.restore());
      let c = Z($((t - 0.18) / 0.2) * Z(1 - $((t - 0.84) / 0.12), 0, 1), 0, 1),
        l = (1 - $(t / 0.44)) * 28;
      this.drawSequenceCard(
        {
          height: _n,
          width: gn,
          x: V / 2 - gn / 2,
          y: q.y + q.height / 2 - _n / 2 - 28 + l,
        },
        `LEVEL ${e.level.toString().padStart(2, `0`)} CLEAR\nTEXT RECOMPOSES`,
        `#ffcf73`,
        `rgba(21, 14, 8, 0.86)`,
        `rgba(45, 24, 12, 0.76)`,
        `#fff1cb`,
        c,
      );
    }
    drawSequenceCard(e, t, n, r, i, a, o) {
      let s = this.renderer.getBlock(
        t,
        W.overlay,
        G.overlay,
        e.width - 44,
        `pre-wrap`,
      );
      (this.context.save(), (this.context.globalAlpha = o));
      let c = this.context.createLinearGradient(0, e.y, 0, e.y + e.height);
      (c.addColorStop(0, r),
        c.addColorStop(1, i),
        (this.context.fillStyle = c),
        this.context.fillRect(e.x + 10, e.y + 10, e.width - 20, e.height - 20),
        this.context.restore(),
        this.context.save(),
        this.drawFrame(e, n, W.borderCompact, G.borderCompact, o),
        this.context.restore(),
        this.renderer.drawBlock(
          this.context,
          s,
          e.x + e.width / 2,
          e.y + e.height / 2,
          {
            alpha: o,
            align: `center`,
            color: a,
            shadowBlur: 16,
            shadowColor: `rgba(7, 16, 26, 0.34)`,
            verticalAlign: `middle`,
          },
        ));
    }
    drawOverlay() {
      let e =
          this.mode === `game-over`
            ? this.overlayBlocks.gameOver
            : this.clearedWave
              ? this.overlayBlocks.cleared
              : this.overlayBlocks.serve,
        t = this.mode === `serve`,
        n = this.getOverlayRect();
      this.context.save();
      let r = this.context.createLinearGradient(0, n.y, 0, n.y + n.height);
      (r.addColorStop(0, `rgba(7, 16, 26, 0.94)`),
        r.addColorStop(1, `rgba(18, 12, 7, 0.9)`),
        (this.context.fillStyle = r),
        this.context.fillRect(n.x + 10, n.y + 10, n.width - 20, n.height - 20),
        (this.context.fillStyle = `rgba(117, 215, 230, 0.08)`),
        this.context.fillRect(n.x + 20, n.y + 18, n.width - 40, n.height - 36),
        this.context.restore(),
        this.drawFrame(n, `#ffcf73`));
      let i = t ? n.y + 26 : n.y + n.height / 2;
      (this.renderer.drawBlock(this.context, e, V / 2, i, {
        align: `center`,
        color: `#fff4cc`,
        shadowBlur: 14,
        shadowColor: `rgba(255, 179, 71, 0.38)`,
        verticalAlign: t ? `top` : `middle`,
      }),
        t && this.drawAudioButton(this.getOverlayAudioButtonRect()));
    }
    drawFrame(e, t, n = W.border, r = G.sprite, i = 1) {
      let a = this.renderer.getBlock(`═`, n, r),
        o = this.renderer.getBlock(`║`, n, r),
        s = this.renderer.getBlock(`╔`, n, r),
        c = this.renderer.getBlock(`╗`, n, r),
        l = this.renderer.getBlock(`╚`, n, r),
        u = this.renderer.getBlock(`╝`, n, r);
      (this.renderer.drawBlock(this.context, s, e.x, e.y, {
        alpha: i,
        color: t,
      }),
        this.renderer.drawBlock(this.context, c, e.x + e.width - c.width, e.y, {
          alpha: i,
          color: t,
        }),
        this.renderer.drawBlock(
          this.context,
          l,
          e.x,
          e.y + e.height - l.height,
          { alpha: i, color: t },
        ),
        this.renderer.drawBlock(
          this.context,
          u,
          e.x + e.width - u.width,
          e.y + e.height - u.height,
          { alpha: i, color: t },
        ));
      for (
        let n = e.x + s.width;
        n <= e.x + e.width - c.width - a.width * 0.6;
        n += a.width
      )
        (this.renderer.drawBlock(this.context, a, n, e.y, {
          alpha: i,
          color: t,
        }),
          this.renderer.drawBlock(
            this.context,
            a,
            n,
            e.y + e.height - a.height,
            { alpha: i, color: t },
          ));
      for (
        let n = e.y + s.height;
        n <= e.y + e.height - l.height - o.height * 0.5;
        n += o.height
      )
        (this.renderer.drawBlock(this.context, o, e.x, n, {
          alpha: i,
          color: t,
        }),
          this.renderer.drawBlock(this.context, o, e.x + e.width - o.width, n, {
            alpha: i,
            color: t,
          }));
    }
    buildWave(e) {
      let t = yn[(e - 1) % yn.length],
        n = [],
        r = En(t);
      for (let e = 0; e < r.length; e++) {
        let t = r[e],
          i = Dn(Bt),
          a = On(Bt);
        n.push({
          alive: !0,
          block: this.renderer.getBlock(t, i, a),
          color: cn[e % cn.length],
          height: a,
          label: t,
          paddingX: 0,
          paddingY: 0,
          value: Math.max(20, Tn(t).replace(/[^a-z0-9]/gi, ``).length * 12),
          width: 0,
          x: Y.x,
          xTarget: Y.x,
          y: Y.y,
          yTarget: Y.y,
        });
      }
      return ((this.bricks = n), this.relayoutBricks(!0), n);
    }
    resetWave(e) {
      ((this.bricks = this.buildWave(this.level)),
        (this.clearedWave = !1),
        (this.particles = []),
        (this.powerUps = []),
        (this.recentPowerUpKinds = []),
        this.syncPaddleWidth(),
        this.resetBallsToServe(),
        this.syncBallSpeed(),
        (this.wakeHoles = []),
        e && !this.hasShownOpeningIntro
          ? this.beginOpeningSequence()
          : this.beginIntroSequence(e),
        this.updateStatusCopy());
    }
    restart() {
      ((this.score = 0),
        (this.level = 1),
        (this.lives = Ht),
        (this.clearedWave = !1),
        (this.activeEffects.expand = 0),
        (this.activeEffects.guardCharges = 0),
        (this.activeEffects.slow = 0),
        (this.particles = []),
        (this.balls = []),
        (this.powerUps = []),
        (this.recentPowerUpKinds = []),
        (this.sequence = null),
        (this.wakeHoles = []),
        B.setScene(`serve`),
        this.resetWave(!0));
    }
    loseLife(e = this.paddle.x) {
      if (
        (--this.lives,
        (this.screenShake = 3.2),
        this.spawnFailureBurst(e),
        (this.activeEffects.expand = 0),
        (this.activeEffects.guardCharges = 0),
        (this.activeEffects.slow = 0),
        (this.balls = []),
        (this.powerUps = []),
        (this.recentPowerUpKinds = []),
        this.syncPaddleWidth(),
        this.syncBallSpeed(),
        this.lives <= 0)
      ) {
        ((this.mode = `game-over`),
          (this.bestScore = Math.max(this.bestScore, this.score)),
          B.playGameOver(),
          B.setScene(`game-over`),
          this.updateStatusCopy());
        return;
      }
      (B.playLoseLife(),
        (this.mode = `serve`),
        (this.clearedWave = !1),
        this.resetBallsToServe(),
        (this.wakeHoles = []),
        this.updateStatusCopy());
    }
    launchBall() {
      if (this.mode === `game-over`) {
        this.restart();
        return;
      }
      ((this.clearedWave = !1),
        (this.mode = `playing`),
        B.setScene(`playing`),
        this.syncBallSpeed());
      let e = this.getPrimaryBall(),
        t = Z((this.pointer.x - this.paddle.x) / 160, -0.82, 0.82),
        n =
          Math.abs(t) > 0.12
            ? t
            : (Math.random() > 0.5 ? 1 : -1) * (0.42 + Math.random() * 0.22);
      (Math.abs(n) < 0.35 && (n = (n >= 0 ? 1 : -1) * 0.35),
        (e.vx = n * e.speed),
        (e.vy = -Math.sqrt(Math.max(0, e.speed ** 2 - e.vx ** 2))),
        B.playLaunch(),
        (e.wakePoint = { x: e.x, y: e.y }),
        (this.wakeHoles = []),
        this.updateStatusCopy());
    }
    updateStatusCopy() {
      let e = this.bricks.filter((e) => e.alive).length,
        t = this.getEffectSummary(),
        n = (e) => (t === `` ? e : `${e}\n${t}`);
      if (this.mode === `transition` && this.sequence !== null) {
        if (this.sequence.kind === `opening`) {
          this.statusCopy = `Pretext Breaker is slamming onto the screen.`;
          return;
        }
        if (this.sequence.kind === `intro`) {
          this.statusCopy =
            Z(this.sequence.timer / this.sequence.duration, 0, 1) < 0.6
              ? `Text awakens. Level ${this.sequence.level.toString().padStart(2, `0`)} is forming.`
              : `Level ${this.sequence.level.toString().padStart(2, `0`)} words are flying into place.`;
          return;
        }
        this.statusCopy = `Level ${this.sequence.level.toString().padStart(2, `0`)} complete. The next paragraph is recomposing.`;
        return;
      }
      if (this.mode === `game-over`) {
        this.statusCopy = `Final ${wn(this.score)}. Best ${wn(this.bestScore)}. The text wall stands again.`;
        return;
      }
      if (this.mode === `serve` && this.clearedWave) {
        this.statusCopy = n(
          `Wave cleared. ${e} words queued for level ${this.level}. Serve the next glyph.`,
        );
        return;
      }
      if (this.mode === `serve`) {
        this.statusCopy = n(
          `Break ${e} words. Drag or tap to aim, then launch with the up arrow or another tap.`,
        );
        return;
      }
      this.statusCopy = n(
        `${e} words remain. Angle the glyph off the paddle and keep it above the footer.`,
      );
    }
    getAliveBrickCount() {
      let e = 0;
      for (let t = 0; t < this.bricks.length; t++)
        this.bricks[t].alive && (e += 1);
      return e;
    }
    rememberPowerUpKind(e) {
      (this.recentPowerUpKinds.push(e),
        this.recentPowerUpKinds.length > xn && this.recentPowerUpKinds.shift());
    }
    pickPowerUpKind() {
      let e = this.getAliveBrickCount(),
        t = 1 - e / Math.max(1, this.bricks.length),
        n = this.lives <= 1 ? 1 : this.lives === 2 ? 0.55 : 0.12,
        r = new Set(this.powerUps.map((e) => e.kind)),
        i = this.recentPowerUpKinds.at(-1) ?? null,
        a = {
          expand: this.isExpandActive()
            ? this.activeEffects.expand > 4
              ? 0.06
              : 0.26
            : 1.18 - t * 0.16,
          slow: this.isSlowActive()
            ? this.activeEffects.slow > 4
              ? 0.06
              : 0.24
            : 0.92 + (this.balls.length > 1 ? 0.55 : 0.16) + t * 0.28,
          multi:
            this.balls.length >= nn - 1
              ? 0.04
              : (this.balls.length > 1 ? 0.42 : 1.08) *
                (e <= 4 ? 0.35 : 1.14 - t * 0.6),
          guard:
            this.activeEffects.guardCharges >= en
              ? 0.05
              : 0.7 +
                (en - this.activeEffects.guardCharges) * 0.34 +
                n * 0.82 +
                t * 0.54,
          life: this.lives >= Ht + 2 ? 0.03 : 0.1 + n * 1.28 + t * 0.2,
        };
      for (let e = 0; e < X.length; e++) {
        let t = X[e];
        (r.has(t) && (a[t] *= 0.28),
          i === t
            ? (a[t] *= 0.12)
            : this.recentPowerUpKinds.includes(t) && (a[t] *= 0.48));
      }
      let o = 0;
      for (let e = 0; e < X.length; e++) {
        let t = X[e];
        o += Math.max(0, a[t]);
      }
      if (o <= 0) return `expand`;
      let s = Math.random() * o;
      for (let e = 0; e < X.length; e++) {
        let t = X[e];
        if (((s -= Math.max(0, a[t])), s <= 0)) return t;
      }
      return X[X.length - 1];
    }
    maybeSpawnPowerUp(e, t) {
      if (Math.random() > Zt) return;
      let n = this.pickPowerUpKind();
      this.rememberPowerUpKind(n);
      let r = bn[n],
        i = this.getPowerUpBlock(n);
      this.powerUps.push({
        block: i,
        color: r.color,
        height: i.height,
        kind: n,
        label: r.label,
        rotation: (Math.random() - 0.5) * 0.08,
        spin: (Math.random() - 0.5) * 0.45,
        vx: (Math.random() - 0.5) * 36,
        vy: Xt + Math.random() * 30,
        width: i.width,
        x: e,
        y: t,
      });
    }
    applyPowerUp(e) {
      switch (
        ((this.score += $t),
        (this.bestScore = Math.max(this.bestScore, this.score)),
        (this.screenShake = 1.3),
        B.playPowerUp(e.kind),
        this.spawnPickupBurst(e.x, e.y, e.label, e.color),
        e.kind)
      ) {
        case `expand`:
          ((this.activeEffects.expand = bn.expand.duration),
            this.syncPaddleWidth());
          break;
        case `slow`:
          ((this.activeEffects.slow = bn.slow.duration), this.syncBallSpeed());
          break;
        case `guard`:
          this.activeEffects.guardCharges = Math.min(
            en,
            this.activeEffects.guardCharges + 1,
          );
          break;
        case `multi`:
          this.spawnMultiBall();
          break;
        case `life`:
          this.lives += 1;
          break;
      }
      this.updateStatusCopy();
    }
    spawnMultiBall() {
      if (this.mode !== `playing` || this.balls.length === 0) return;
      let e = [...this.balls],
        t =
          Math.min(nn, Math.max(tn, this.balls.length + 2)) - this.balls.length;
      if (!(t <= 0))
        for (let n = 0; n < t; n++) {
          let t = e[n % e.length],
            r = this.createBallState(t.x, t.y),
            i = Math.atan2(t.vy || -t.speed, t.vx || t.speed * 0.4),
            a = rn[n % rn.length];
          (this.setBallAngle(r, i + a),
            (r.wakePoint = { x: r.x, y: r.y }),
            this.balls.push(r));
        }
    }
    spawnPickupBurst(e, t, n, r) {
      let i = n.split(``).filter((e) => e !== ` `);
      for (let n = 0; n < i.length; n++) {
        let a = i[n],
          o = -Math.PI / 2 + (n - (i.length - 1) / 2) * 0.26,
          s = 48 + Math.random() * 42,
          c = this.renderer.getBlock(a, W.footer, 20);
        this.particles.push({
          alpha: 1,
          affectsWall: !1,
          block: c,
          color: r,
          life: 0,
          maxLife: 0.55 + Math.random() * 0.15,
          rotation: 0,
          spin: (Math.random() - 0.5) * 4,
          vx: Math.cos(o) * s,
          vy: Math.sin(o) * s - 18,
          wallRadius: 0,
          x: e,
          y: t,
        });
      }
    }
    spawnBurst(e, t, n) {
      let r = Tn(n.label).split(``);
      for (let i = 0; i < r.length; i++) {
        let a = r[i],
          o = (Math.PI * 2 * i) / Math.max(1, r.length) + Math.random() * 0.35,
          s = 80 + Math.random() * 120,
          c = this.renderer.getBlock(a, W.status, G.sprite);
        this.particles.push({
          alpha: 1,
          affectsWall: !0,
          block: c,
          color: n.color,
          life: 0,
          maxLife: 0.7 + Math.random() * 0.35,
          rotation: 0,
          spin: (Math.random() - 0.5) * 5,
          vx: Math.cos(o) * s,
          vy: Math.sin(o) * s - 30,
          wallRadius: Math.max(10, Math.max(c.width, c.height) * 0.72),
          x: e,
          y: t,
        });
      }
    }
    spawnFailureBurst(e) {
      let t = [`/`, `\\`, `!`, `?`, `_`];
      for (let n = 0; n < t.length; n++) {
        let r = t[n],
          i = -Math.PI / 2 + (n - 2) * 0.35,
          a = this.renderer.getBlock(r, W.status, G.sprite);
        this.particles.push({
          alpha: 1,
          affectsWall: !1,
          block: a,
          color: `#ff8d6b`,
          life: 0,
          maxLife: 0.8,
          rotation: 0,
          spin: (Math.random() - 0.5) * 4,
          vx: Math.cos(i) * (90 + Math.random() * 40),
          vy: Math.sin(i) * (90 + Math.random() * 40),
          wallRadius: 0,
          x: e,
          y: q.y + q.height - 12,
        });
      }
    }
    spawnPaddleSpark(e) {
      let t = [`=`, `=`, `:`, `:`];
      for (let n = 0; n < t.length; n++) {
        let r = t[n],
          i = this.renderer.getBlock(r, W.footer, 20);
        this.particles.push({
          alpha: 1,
          affectsWall: !1,
          block: i,
          color: `#a9f1ff`,
          life: 0,
          maxLife: 0.35 + Math.random() * 0.15,
          rotation: 0,
          spin: 0,
          vx: (Math.random() - 0.5) * 90,
          vy: -30 - Math.random() * 70,
          wallRadius: 0,
          x: e.x,
          y: this.paddle.y,
        });
      }
    }
    spawnTrailParticle(e) {
      if (Math.random() > 0.5) return;
      let t = Math.random() > 0.5 ? `.` : `·`,
        n = this.renderer.getBlock(t, W.footer, 20);
      this.particles.push({
        alpha: 0.7,
        affectsWall: !1,
        block: n,
        color: `#ffe2a0`,
        life: 0,
        maxLife: 0.26,
        rotation: 0,
        spin: 0,
        vx: (Math.random() - 0.5) * 22,
        vy: 16 + Math.random() * 20,
        wallRadius: 0,
        x: e.x,
        y: e.y,
      });
    }
    updateParticles(e) {
      for (let t = this.particles.length - 1; t >= 0; t--) {
        let n = this.particles[t];
        ((n.life += e),
          (n.x += n.vx * e),
          (n.y += n.vy * e),
          (n.vy += 90 * e),
          (n.rotation += n.spin * e),
          (n.alpha = 1 - n.life / n.maxLife),
          n.life >= n.maxLife && this.particles.splice(t, 1));
      }
    }
    updateWakeHoles(e) {
      for (let t = this.wakeHoles.length - 1; t >= 0; t--) {
        let n = this.wakeHoles[t];
        ((n.life += e), n.life >= n.maxLife && this.wakeHoles.splice(t, 1));
      }
    }
    drawParticles() {
      for (let e = 0; e < this.particles.length; e++) {
        let t = this.particles[e];
        (this.context.save(),
          this.context.translate(t.x, t.y),
          this.context.rotate(t.rotation),
          this.renderer.drawBlock(this.context, t.block, 0, 0, {
            alpha: t.alpha,
            align: `center`,
            color: t.color,
            shadowBlur: 8,
            shadowColor: ln,
            verticalAlign: `middle`,
          }),
          this.context.restore());
      }
    }
    buildBackgroundGlyphs() {
      let e = [`.`, `:`, `·`, `*`, `+`, `;`],
        t = [];
      for (let n = 0; n < 54; n++) {
        let r = e[n % e.length];
        t.push({
          alpha: 0.1 + Math.random() * 0.18,
          block: this.renderer.getBlock(r, W.footer, 20),
          speed: 8 + Math.random() * 18,
          x: Math.random() * V,
          y: Math.random() * H,
        });
      }
      return t;
    }
    buildTextWallCopy() {
      let e = [
        `pretext layout measure cursor segment wrap glyph inline reflow stream bidi kern space split signal static dynamic vector module bounce trail track render flow`,
        `text snakes between every obstacle and keeps every word alive while the field recomposes around the moving ball and the waiting paddle`,
        `small copy fills the arena from border to border and the larger block labels stay readable as targets floating above the paragraph wall`,
      ];
      return Array.from({ length: 80 }, (t, n) => e[n % e.length]).join(` `);
    }
    relayoutBricks(e = !1) {
      let t = this.bricks.filter((e) => e.alive);
      if (t.length === 0) return;
      let n = this.findBrickArrangement(t);
      for (let t = 0; t < n.length; t++) {
        let r = n[t];
        ((r.brick.block = r.block),
          (r.brick.paddingX = r.paddingX),
          (r.brick.paddingY = r.paddingY),
          (r.brick.width = r.width),
          (r.brick.height = r.height),
          (r.brick.xTarget = r.x),
          (r.brick.yTarget = r.y),
          e && ((r.brick.x = r.x), (r.brick.y = r.y)));
      }
    }
    findBrickArrangement(e) {
      for (let t = Vt; t >= Bt; t--) {
        let n = this.computeBrickArrangement(e, t);
        if (n !== null) return n;
      }
      return this.computeBrickArrangement(e, Bt) ?? [];
    }
    computeBrickArrangement(e, t) {
      let n = Dn(t),
        r = On(t),
        i = kn(t),
        a = An(t),
        o = jn(t),
        s = Math.max(zt - 2, Math.round(t * 0.32)),
        c = e.map((e) => {
          let t = this.renderer.getBlock(e.label, n, r);
          return {
            block: t,
            brick: e,
            height: t.height + a * 2,
            width: t.width + i * 2,
          };
        }),
        l = [],
        u = [],
        d = 0;
      for (let e = 0; e < c.length; e++) {
        let t = c[e],
          n = u.length === 0 ? t.width : d + s + t.width;
        if (u.length > 0 && n > Y.width + 0.5) {
          (l.push(u), (u = [t]), (d = t.width));
          continue;
        }
        (u.push(t), (d = n));
      }
      u.length > 0 && l.push(u);
      let f = r + a * 2,
        p = l.length * f + Math.max(0, l.length - 1) * o;
      if (p > Y.height) return null;
      let m = [],
        h = Y.y + (Y.height - p) / 2;
      for (let e = 0; e < l.length; e++) {
        let t = l[e],
          n =
            t.reduce((e, t) => e + t.width, 0) + s * Math.max(0, t.length - 1),
          r = Y.x + (Y.width - n) / 2;
        for (let e = 0; e < t.length; e++) {
          let n = t[e];
          (m.push({
            block: n.block,
            brick: n.brick,
            height: n.height,
            paddingX: i,
            paddingY: a,
            width: n.width,
            x: r,
            y: h,
          }),
            (r += n.width + s));
        }
        h += f + o;
      }
      return m;
    }
    updateBackgroundGlyphs(e) {
      for (let t = 0; t < this.backgroundGlyphs.length; t++) {
        let n = this.backgroundGlyphs[t];
        ((n.y += n.speed * e),
          n.y > H + 10 && ((n.y = -10), (n.x = 20 + Math.random() * (V - 40))));
      }
    }
    drawBackgroundGlyphs() {
      for (let e = 0; e < this.backgroundGlyphs.length; e++) {
        let t = this.backgroundGlyphs[e];
        this.renderer.drawBlock(this.context, t.block, t.x, t.y, {
          alpha: t.alpha,
          color: `#c8e9ff`,
          shadowBlur: 6,
          shadowColor: `rgba(117, 215, 230, 0.16)`,
        });
      }
    }
    drawReflowingTextWall(e = 0, t = 1, n = null, r = [], i = [], a = !1) {
      let o = {
          x: q.x + 14,
          y: q.y + 14,
          width: q.width - 28,
          height: q.height - 28,
        },
        s = { segmentIndex: 0, graphemeIndex: 0 };
      for (let c = o.y; c + G.wall <= o.y + o.height; c += G.wall) {
        let l = c + e,
          u = l + G.wall,
          d = this.getTextWallSlots(o, l, u, n, r, i, a);
        if (d.length !== 0)
          for (let n = 0; n < d.length; n++) {
            let r = d[n],
              i = r.right - r.left;
            if (i < 18) continue;
            let a = bt(this.textWallPrepared, s, i);
            if (
              (a === null &&
                ((s = { segmentIndex: 0, graphemeIndex: 0 }),
                (a = bt(this.textWallPrepared, s, i))),
              a === null)
            )
              return;
            let o = this.renderer.getBlock(a.text, W.wall, G.wall),
              l = un[(Math.floor(c / G.wall) + n) % un.length];
            (this.renderer.drawBlock(this.context, o, r.left, c + e, {
              alpha: 0.52 * t,
              color: l,
            }),
              (s = a.end));
          }
      }
    }
    getTextWallSlots(e, t, n, r = null, i = [], a = [], o = !1) {
      let s = [];
      if (!o && r === null)
        for (let e = 0; e < this.bricks.length; e++) {
          let r = this.bricks[e];
          r.alive &&
            (n <= r.y - 3 ||
              t >= r.y + r.height + 3 ||
              s.push({ left: r.x - 8, right: r.x + r.width + 8 }));
        }
      else if (r !== null && r > 0.001)
        for (let e = 0; e < this.bricks.length; e++) {
          let i = this.bricks[e];
          if (!i.alive) continue;
          let a = this.getBrickRenderState(i, e, r);
          a.alpha <= 0.04 ||
            n <= a.rectY - 3 ||
            t >= a.rectY + i.height + 3 ||
            s.push({ left: a.rectX - 8, right: a.rectX + i.width + 8 });
        }
      if (!o) {
        let e = this.getCurrentPaddleBlock(),
          r = this.paddle.y - 6,
          i = this.paddle.y + e.height + 6;
        n > r &&
          t < i &&
          s.push({
            left: this.paddle.x - this.paddle.blockWidth / 2 - 12,
            right: this.paddle.x + this.paddle.blockWidth / 2 + 12,
          });
        for (let e = 0; e < this.balls.length; e++) {
          let r = this.balls[e];
          this.pushCircleInterval(s, r.x, r.y, fn, t, n);
        }
        for (let e = 0; e < this.wakeHoles.length; e++) {
          let r = this.wakeHoles[e];
          this.pushCircleInterval(s, r.x, r.y, r.radius, t, n);
        }
      }
      for (let e = 0; e < i.length; e++) {
        let r = i[e];
        this.pushCircleInterval(s, r.x, r.y, r.radius, t, n);
      }
      for (let e = 0; e < a.length; e++) {
        let r = a[e];
        n <= r.top || t >= r.bottom || s.push({ left: r.left, right: r.right });
      }
      if (!o) {
        for (let e = 0; e < this.particles.length; e++) {
          let r = this.particles[e];
          !r.affectsWall ||
            r.alpha <= 0.08 ||
            r.wallRadius <= 0 ||
            this.pushCircleInterval(s, r.x, r.y, r.wallRadius, t, n);
        }
        for (let e = 0; e < this.powerUps.length; e++) {
          let r = this.powerUps[e],
            i = r.y - r.height / 2 - 4,
            a = r.y + r.height / 2 + 4;
          n <= i ||
            t >= a ||
            s.push({
              left: r.x - r.width / 2 - 10,
              right: r.x + r.width / 2 + 10,
            });
        }
        if (this.activeEffects.guardCharges > 0) {
          let e = this.getGuardRect(),
            r = e.top + e.height;
          n > e.top - 4 &&
            t < r + 4 &&
            s.push({ left: e.left - 10, right: e.right + 10 });
        }
      }
      return this.carveSlots({ left: e.x, right: e.x + e.width }, s);
    }
    pushCircleInterval(e, t, n, r, i, a) {
      let o = (i + a) / 2 - n;
      if (Math.abs(o) >= r) return;
      let s = Math.sqrt(r * r - o * o);
      e.push({ left: t - s, right: t + s });
    }
    carveSlots(e, t) {
      if (t.length === 0) return [e];
      let n = t
          .map((t) => ({
            left: Z(t.left, e.left, e.right),
            right: Z(t.right, e.left, e.right),
          }))
          .filter((e) => e.right > e.left)
          .sort((e, t) => e.left - t.left),
        r = [];
      for (let e = 0; e < n.length; e++) {
        let t = n[e],
          i = r[r.length - 1];
        i === void 0 || t.left > i.right
          ? r.push({ ...t })
          : (i.right = Math.max(i.right, t.right));
      }
      let i = [],
        a = e.left;
      for (let e = 0; e < r.length; e++) {
        let t = r[e];
        (t.left - a >= 18 && i.push({ left: a, right: t.left }),
          (a = Math.max(a, t.right)));
      }
      return (e.right - a >= 18 && i.push({ left: a, right: e.right }), i);
    }
    trackWake(e) {
      if (this.mode !== `playing`) return;
      if (e.wakePoint === null) {
        e.wakePoint = { x: e.x, y: e.y };
        return;
      }
      let t = e.x - e.wakePoint.x,
        n = e.y - e.wakePoint.y;
      t * t + n * n < dn * dn ||
        (this.wakeHoles.push({
          life: 0,
          maxLife: 0.42,
          radius: fn - 8,
          x: e.x,
          y: e.y,
        }),
        (e.wakePoint = { x: e.x, y: e.y }));
    }
    toViewCoordinates(e) {
      let t = this.canvas.getBoundingClientRect();
      return {
        x: ((e.clientX - t.left) / t.width) * this.view.width,
        y: ((e.clientY - t.top) / t.height) * this.view.height,
      };
    }
  },
  Pn = document.querySelector(`#app`);
if (Pn === null) throw Error(`#app not found`);
Pn.innerHTML = `
  <main class="shell">
    <div class="stage">
      <canvas
        id="game"
        class="game-canvas"
        aria-label="Pretext Breaker text-rendered block breaker game"
      ></canvas>
    </div>
  </main>
`;
var Fn = document.querySelector(`#game`);
if (Fn === null) throw Error(`#game not found`);
(await document.fonts.ready, new Nn(Fn));
