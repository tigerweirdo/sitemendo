/* Rapor e-postaları: müşterinin alacağı rapor ve sana giden onay taslağı. İkisi de aynı
   rapor gövdesini kullanır; onayladığın şey, gideceği şeyin kendisidir. Düzen ve stil
   lib/auditMail.ts'teki yardımcılardan gelir (aynı marka görünümü). Sitedeki metni
   içeren her değer (adres, sunucu başlığı, jQuery sürümü…) esc() ile kaçırılır. */

import {
  INK, LINE, MUTED, PANEL, SANS, SOFT, SULFUR, WHITE,
  badge, button, buttons, contactLine, deadline, dueOf, esc, footer, heading, hostOf, legalLink, lead, link,
  para, prettyUrl, rule, shell, summary, title, when, type RequestMeta,
} from '@/lib/auditMail';
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, WHATSAPP_HREF } from '@/lib/company';
import { content, type Lang } from '@/lib/content';
import { FINDING_COPY, REPORT_LABELS, localizeValue } from './copy';
import { CHECK_ORDER, type CheckKey, type CheckStatus, type Finding, type Report } from './types';

const RANK: Record<CheckStatus, number> = { err: 0, warn: 1, unknown: 2, info: 3, ok: 4 };

/* Elle eklenen bulgunun metni kendisinde durur; diğerleri copy.ts'ten gelir. */
function copyFor(f: Finding, lang: Lang) {
  return f.text ?? (FINDING_COPY[f.code] ?? FINDING_COPY['stack.none'])[lang];
}

function shown(f: Finding, lang: Lang) {
  return f.value ? localizeValue(f.value, lang) : '';
}

/* Öncelik listesi: acil önce, sonra orta; her grupta kontrol sırası. */
export function priorityList(report: Report): Finding[] {
  return report.findings
    .filter(f => f.status === 'err' || f.status === 'warn')
    .sort((a, b) => RANK[a.status] - RANK[b.status] || CHECK_ORDER.indexOf(a.key) - CHECK_ORDER.indexOf(b.key));
}

export function counts(report: Report) {
  const list = priorityList(report);
  return { err: list.filter(f => f.status === 'err').length, warn: list.filter(f => f.status === 'warn').length };
}

/* Her kontrol için en ağır bulgu. */
export function worstByKey(report: Report): { key: CheckKey; finding: Finding; extra: number }[] {
  return CHECK_ORDER.map(key => {
    const list = report.findings.filter(f => f.key === key).sort((a, b) => RANK[a.status] - RANK[b.status]);
    return { key, finding: list[0], extra: Math.max(0, list.length - 1) };
  }).filter(x => x.finding);
}

function card(f: Finding, no: number, lang: Lang) {
  const l = REPORT_LABELS[lang];
  const c = copyFor(f, lang);
  const urgent = f.status === 'err';
  const chipBg = urgent ? INK : SULFUR;
  const chipFg = urgent ? WHITE : INK;
  const value = shown(f, lang);
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 12px;"><tr>
    <td width="4" bgcolor="${urgent ? INK : SULFUR}" style="width:4px;background:${urgent ? INK : SULFUR};font-size:0;line-height:0;">&nbsp;</td>
    <td bgcolor="${PANEL}" style="background:${PANEL};padding:16px 18px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
        <td style="font-family:${SANS};font-size:12px;line-height:1;color:${SOFT};padding:0 10px 0 0;">${String(no).padStart(2, '0')}</td>
        <td bgcolor="${chipBg}" style="background:${chipBg};padding:4px 8px;font-family:${SANS};font-size:11px;line-height:1;font-weight:600;letter-spacing:0.02em;color:${chipFg};">${esc(l.severity[urgent ? 'err' : 'warn'])}</td>
        <td style="font-family:${SANS};font-size:12px;line-height:1;color:${SOFT};padding:0 0 0 10px;">${esc(l.impact)}: ${esc(urgent ? l.impactHigh : l.impactMid)}${value ? ` · ${esc(value)}` : ''}</td>
      </tr></table>
      <p style="margin:10px 0 0;font-family:${SANS};font-size:16px;line-height:1.4;font-weight:600;color:${INK};">${esc(c.t)}</p>
      ${c.n ? `<p style="margin:8px 0 0;font-family:${SANS};font-size:14px;line-height:1.55;color:${MUTED};"><b style="font-weight:600;color:${INK};">${esc(l.nextStep)}:</b> ${esc(c.n)}</p>` : ''}
    </td>
  </tr></table>`;
}

function checklistRows(report: Report, lang: Lang) {
  const l = REPORT_LABELS[lang];
  const tags = Object.fromEntries(content[lang].checks.map(c => [c.key, c.tag]));
  const rows = worstByKey(report).map(({ key, finding, extra }, i) => {
    const c = copyFor(finding, lang);
    const value = shown(finding, lang);
    const more = extra > 0 ? ` · ${l.more(extra)}` : '';
    const tone = finding.status === 'err' ? INK : finding.status === 'warn' ? INK : SOFT;
    const weight = finding.status === 'err' || finding.status === 'warn' ? 600 : 500;
    return `<tr>
      <td class="sm-stack" valign="top" width="96" style="padding:${i ? 10 : 0}px 12px 0 0;font-family:${SANS};font-size:14px;line-height:1.5;font-weight:600;color:${INK};">${esc(String(tags[key] ?? key))}</td>
      <td class="sm-stack" valign="top" width="96" style="padding:${i ? 10 : 0}px 12px 0 0;font-family:${SANS};font-size:14px;line-height:1.5;font-weight:${weight};color:${tone};">${esc(l.status[finding.status])}${esc(more)}</td>
      <td class="sm-stack" valign="top" style="padding:${i ? 10 : 0}px 0 0;font-family:${SANS};font-size:13px;line-height:1.5;color:${MUTED};">${esc(c.t)}${value ? ` <span style="color:${SOFT};">· ${esc(value)}</span>` : ''}</td>
    </tr>`;
  }).join('');
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${rows}</table>`;
}

/* Raporun gövdesi: öncelik listesi, kontrol listesi, kapsam notu. */
export function reportBodyHtml(report: Report, lang: Lang) {
  const l = REPORT_LABELS[lang];
  const list = priorityList(report);
  const note = report.note
    ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:32px 0 0;"><tr>
        <td width="4" bgcolor="${SULFUR}" style="width:4px;background:${SULFUR};font-size:0;line-height:0;">&nbsp;</td>
        <td style="padding:2px 0 2px 16px;">
          <p style="margin:0;font-family:${SANS};font-size:12px;line-height:1.4;color:${SOFT};">${esc(l.noteLabel)}</p>
          <p style="margin:4px 0 0;font-family:${SANS};font-size:15px;line-height:1.6;color:${INK};">${esc(report.note)}</p>
        </td></tr></table>`
    : '';
  return `${note}
    ${heading(l.priorityTitle)}
    ${list.length ? list.slice(0, 8).map((f, i) => card(f, i + 1, lang)).join('') : para(esc(l.noIssues), 0)}
    ${heading(l.checklistTitle)}
    ${checklistRows(report, lang)}
    ${para(`<span style="color:${SOFT};font-size:13px;">${esc(l.scope)}</span>`, 22)}
  `;
}

export function reportBodyText(report: Report, lang: Lang) {
  const l = REPORT_LABELS[lang];
  const tags = Object.fromEntries(content[lang].checks.map(c => [c.key, c.tag]));
  const list = priorityList(report);
  const lines: string[] = report.note ? [`${l.noteLabel}: ${report.note}`, ''] : [];
  lines.push(l.priorityTitle, '');
  if (!list.length) lines.push(l.noIssues);
  list.slice(0, 8).forEach((f, i) => {
    const c = copyFor(f, lang);
    const value = shown(f, lang);
    lines.push(`${String(i + 1).padStart(2, '0')} [${l.severity[f.status === 'err' ? 'err' : 'warn']}] ${c.t}${value ? ` (${value})` : ''}`);
    lines.push(`   ${l.impact}: ${f.status === 'err' ? l.impactHigh : l.impactMid}`);
    if (c.n) lines.push(`   ${l.nextStep}: ${c.n}`);
    lines.push('');
  });
  lines.push(l.checklistTitle, '');
  for (const { key, finding, extra } of worstByKey(report)) {
    const value = shown(finding, lang);
    lines.push(`- ${tags[key] ?? key}: ${l.status[finding.status]}${extra > 0 ? ` · ${l.more(extra)}` : ''} — ${copyFor(finding, lang).t}${value ? ` (${value})` : ''}`);
  }
  lines.push('', l.scope);
  return lines.join('\n');
}

/* Müşterinin alacağı rapor. */
export function reportEmail(report: Report, lang: Lang, meta: RequestMeta) {
  const l = REPORT_LABELS[lang];
  const { err, warn } = counts(report);
  const host = report.host;
  const measured = when(new Date(report.measuredAt), lang);
  const html = shell({
    lang,
    title: l.subject(host),
    preview: l.preview(err, warn),
    meta: l.meta(meta.ref),
    body: `
      ${badge(l.badge)}
      ${title(host)}
      ${lead(esc(l.lead(host, err, warn)))}
      ${summary([
        [l.rows.site, esc(prettyUrl(report.finalUrl))],
        [l.rows.measured, esc(measured)],
        [l.rows.ref, esc(meta.ref)],
      ])}
      ${reportBodyHtml(report, lang)}
      <div style="margin:30px 0 0;">${rule()}</div>
      ${para(`<b style="font-weight:600;">${esc(l.promise[0])}</b> ${esc(l.promise[1])}`, 24)}
      ${heading(l.askTitle)}
      ${para(esc(l.ask), 0)}
      ${contactLine()}
    `,
    foot: footer([l.footer, 'Sitemendo · Berlin'], [
      [l.links[0], legalLink('impressum', lang)],
      [l.links[1], legalLink('privacy', lang)],
    ]),
  });
  const text = [
    l.lead(host, err, warn),
    '',
    `${l.rows.site}: ${prettyUrl(report.finalUrl)}`,
    `${l.rows.measured}: ${measured}`,
    `${l.rows.ref}: ${meta.ref}`,
    '',
    reportBodyText(report, lang),
    '',
    `${l.promise[0]} ${l.promise[1]}`,
    '',
    l.askTitle,
    l.ask,
    `${CONTACT_EMAIL} · ${CONTACT_PHONE_DISPLAY} · WhatsApp: ${WHATSAPP_HREF}`,
    '',
    '—',
    l.footer,
    'Sitemendo · Berlin',
    `${l.links[0]}: ${legalLink('impressum', lang)}`,
    `${l.links[1]}: ${legalLink('privacy', lang)}`,
  ].join('\n');
  return { subject: l.subject(host), html, text };
}

const LANG_TR: Record<Lang, string> = { tr: 'Türkçe', en: 'İngilizce', de: 'Almanca' };

/* Sana giden onay taslağı (Türkçe): önce kısa özet ve Onayla düğmesi, altında müşterinin
   alacağı raporun kendisi. Düğmeye basılmazsa rapor gönderilmez. */
export function draftEmail(
  report: Report,
  lang: Lang,
  meta: RequestMeta,
  o: { requester: string; approveUrl: string | null },
) {
  const { err, warn } = counts(report);
  const host = report.host;
  const due = when(dueOf(meta.receivedAt), 'tr');
  const subject = `Rapor onay bekliyor: ${host} · ${LANG_TR[lang]} · ${meta.ref}`;
  const customer = reportEmail(report, lang, meta);
  const html = shell({
    lang: 'tr',
    title: subject,
    preview: `${err} acil, ${warn} orta · ${o.requester}`,
    meta: `Rapor taslağı · ${meta.ref}`,
    body: `
      ${badge('Onay bekliyor')}
      ${title(host)}
      ${lead(`Rapor hazırlandı ve <b style="color:${INK};font-weight:600;">henüz ${esc(o.requester)} adresine gönderilmedi</b>. Aşağıdaki hali olduğu gibi gider.`)}
      ${deadline('Söz verilen teslim', esc(due))}
      ${summary([
        ['Site', link(report.finalUrl, prettyUrl(report.finalUrl))],
        ['Müşteri', link(`mailto:${o.requester}`, o.requester)],
        ['Rapor dili', esc(LANG_TR[lang])],
        ['Bulgular', `${err} acil · ${warn} orta`],
        ['Referans', esc(meta.ref)],
      ], 16)}
      ${o.approveUrl
        ? `${buttons(button(o.approveUrl, 'Raporu incele ve gönder'), button(report.finalUrl, 'Siteyi aç', false))}
      ${para(`<span style="color:${SOFT};font-size:13px;">Düğme bir onay sayfası açar: orada yanlış çıkan bulguyu raporun dışına alabilir, not ya da ek bulgu yazabilirsin. Hiçbir şeye dokunmadan gönderirsen aşağıdaki hali gider. Düğmeye basmazsan rapor gönderilmez.</span>`, 4)}`
        : `${buttons(button(report.finalUrl, 'Siteyi aç', false), '')}
      ${para(`<span style="color:${SOFT};font-size:13px;">Onay bağlantısı kurulu değil (REPORT_APPROVAL_SECRET yok): rapor kendiliğinden gönderilmez. İstersen aşağıdaki raporu müşteriye elle ilet.</span>`, 4)}`}
      <div style="margin:30px 0 0;">${rule()}</div>
      ${heading(`Müşterinin alacağı rapor (${LANG_TR[lang]})`)}
      ${para(`<span style="color:${SOFT};font-size:13px;">Konu: ${esc(customer.subject)}</span>`, 0)}
      <div style="margin:16px 0 0;border:1px solid ${LINE};padding:4px 22px 22px;">${reportBodyHtml(report, lang)}</div>
    `,
    foot: footer(['Bu taslak sitemendo.com formundan otomatik üretildi.', `Kopya: ${hostOf(report.finalUrl)}`], []),
  });
  const text = [
    `Rapor onay bekliyor — ${host}`,
    '',
    `Müşteri: ${o.requester} (henüz gönderilmedi)`,
    `Rapor dili: ${LANG_TR[lang]} · Bulgular: ${err} acil, ${warn} orta · Referans: ${meta.ref}`,
    `Söz verilen teslim: ${due}`,
    '',
    o.approveUrl
      ? `İncele, düzenle ve gönder: ${o.approveUrl}\n(Bağlantı bir onay sayfası açar; gönderim o sayfadaki düğmeyle olur. Yanlış bulguyu çıkarabilir, not ya da ek bulgu ekleyebilirsin.)`
      : 'Onay bağlantısı kurulu değil (REPORT_APPROVAL_SECRET yok): rapor kendiliğinden gönderilmez.',
    '',
    `--- Müşterinin alacağı rapor (${LANG_TR[lang]}) ---`,
    `Konu: ${customer.subject}`,
    '',
    reportBodyText(report, lang),
  ].join('\n');
  return { subject, html, text };
}
