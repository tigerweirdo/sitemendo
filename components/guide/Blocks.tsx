import { Inline } from '@/lib/guides/inline';
import type { Block, GuideLang } from '@/lib/guides/types';
import { UI } from '@/lib/guides/ui';

/* Rehber gövdesi: sunucu bileşeni, istemci JS yok. Tablolar klavyeyle odaklanabilir (tabIndex), böylece
   yatay kayan içerik klavye kullanıcısına da açıktır. Dar ekranda (<640px) tablo yana kaydırılmaz: her satır
   bir kart olur, her hücre kendi sütun başlığıyla (data-label) gösterilir. CSS .gd-table görüntüyü değiştirir;
   display:block tablo anlamını kaldırabildiği için roller açıkça verilir. */

function BlockView({ block: b, lang }: { block: Block; lang: GuideLang }) {
  switch (b.t) {
    case 'p':
      return <p><Inline text={b.x} lang={lang} /></p>;
    case 'h3':
      return <h3><Inline text={b.x} lang={lang} soft /></h3>;
    case 'ul':
      return <ul>{b.items.map((x, i) => <li key={i}><Inline text={x} lang={lang} /></li>)}</ul>;
    case 'ol':
      return <ol>{b.items.map((x, i) => <li key={i}><Inline text={x} lang={lang} /></li>)}</ol>;
    case 'steps':
      return (
        <ol className="gd-steps">
          {b.items.map((s, i) => (
            <li key={i}>
              <strong className="gd-steps__h"><Inline text={s.h} lang={lang} /></strong>
              <span><Inline text={s.x} lang={lang} /></span>
            </li>
          ))}
        </ol>
      );
    case 'flow':
      return (
        <figure className="gd-flow">
          <figcaption>{b.label}</figcaption>
          <ol>
            {b.nodes.map((n, i) => (
              <li key={i}>
                <strong className="gd-flow__h"><Inline text={n.h} lang={lang} soft /></strong>
                <span><Inline text={n.x} lang={lang} soft /></span>
                {n.stop && <span className="gd-flow__stop"><b>{UI[lang].flowStop}</b> <Inline text={n.stop} lang={lang} soft /></span>}
              </li>
            ))}
          </ol>
        </figure>
      );
    case 'table':
      return (
        <div className="gd-table" role="region" aria-label={b.caption} tabIndex={0}>
          <table role="table">
            <caption>{b.caption}</caption>
            <thead role="rowgroup"><tr role="row">{b.head.map((h, i) => <th key={i} scope="col" role="columnheader">{h}</th>)}</tr></thead>
            <tbody role="rowgroup">
              {b.rows.map((row, r) => (
                <tr key={r} role="row">{row.map((cell, c) => (c === 0
                  ? <th key={c} scope="row" role="rowheader"><Inline text={cell} lang={lang} soft /></th>
                  : <td key={c} data-label={b.head[c]} role="cell"><Inline text={cell} lang={lang} soft /></td>))}</tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'note':
      return (
        <aside className={`gd-note gd-note--${b.kind}`}>
          <p className="gd-note__h">{b.title}</p>
          <p><Inline text={b.x} lang={lang} /></p>
        </aside>
      );
    case 'code':
      return (
        <figure className="gd-code">
          <figcaption>{b.label}</figcaption>
          <pre tabIndex={0}><code>{b.x}</code></pre>
        </figure>
      );
  }
}

export function Blocks({ blocks, lang }: { blocks: Block[]; lang: GuideLang }) {
  return <>{blocks.map((b, i) => <BlockView key={i} block={b} lang={lang} />)}</>;
}
