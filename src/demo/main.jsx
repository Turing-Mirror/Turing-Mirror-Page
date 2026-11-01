import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Block, Group, Btn, Filters, Tabs, SegmentControl, FlowList, Swap, Roll, useDir, trackInputModality } from 'trm-ui';
import { demoCopy, trmUiReference } from '../trm-ui.mjs';
const locale = document.documentElement.dataset.locale;
const text = value => value[locale];
const term = id => text(trmUiReference.terms[id].name);
trackInputModality();
function Example({ name, help, children, className = '' }) {
  return <Block title={name} className={className}><p className="m-0 mb-3 text-[12.5px] text-[var(--help)] leading-relaxed">{text(help)}</p>{children}</Block>;
}
function Demo() {
  const [segment, setSegment] = useState('0');
  const [filter, setFilter] = useState('0');
  const [reverse, setReverse] = useState(false);
  const [pane, setPane] = useState('0');
  const direction = useDir(Number(pane));
  let items = demoCopy.items.filter(item => filter === '0' || item.kind === Number(filter));
  if (reverse) items = [...items].reverse();
  return <main className="demo-layout">
    <Example name={term('glass')} help={demoCopy.segmentHelp}>
      <Group><div className="py-4 flex flex-col gap-5">
        <div className="max-[680px]:-mx-4" aria-label={term('glass')} role="group"><SegmentControl options={demoCopy.choices.map((label, i) => ({ id: String(i), label: text(label) }))} value={segment} onChange={setSegment}/></div>
        <div className="text-[12px] text-[var(--meta)]" aria-live="polite">{text(demoCopy.current)}{text(demoCopy.fieldSeparator)}<Roll value={text(demoCopy.choices[Number(segment)])}/></div>
      </div></Group>
    </Example>
    <Example name={term('flow')} help={demoCopy.filterHelp}>
      <div className="flex items-center gap-3 flex-wrap mb-3" aria-label={term('flow')}>
        <Filters value={filter} onChange={setFilter} options={demoCopy.filters.map((label, i) => ({ id: String(i), label: text(label) }))}/>
        <span className="ml-auto"><Btn onClick={() => setReverse(!reverse)}>{text(demoCopy.sort)}</Btn></span>
      </div>
      <Group><FlowList items={items} keyOf={item => item.id} render={item => <div className="flex items-center gap-3 py-2.5 text-[13px]"><span className="w-7 h-7 rounded-[8px]" aria-hidden style={{background: `var(--art-${demoCopy.items.indexOf(item) + 1})`}}/>{text(item.name)}</div>}/></Group>
    </Example>
    <Example name={`${term('push')}${text(demoCopy.motionJoin)}${term('stretch')}`} help={demoCopy.paneHelp} className="demo-wide">
      <Tabs value={pane} onChange={setPane} options={demoCopy.panes.map((entry, i) => ({ id: String(i), label: text(entry.title) }))}/>
      <div className="mt-3"><Group><Swap k={pane} dir={direction}><div className="py-3" aria-live="polite">{demoCopy.panes[Number(pane)].paragraphs.map((paragraph, i) => <p className="m-0 py-1.5 text-[13px] leading-relaxed" key={i}>{text(paragraph)}</p>)}</div></Swap></Group></div>
    </Example>
  </main>;
}
createRoot(document.getElementById('root')).render(<Demo/>);
new ResizeObserver(() => parent.postMessage({ type: 'trm-demo-size', height: Math.ceil(document.getElementById('root').getBoundingClientRect().height) }, location.origin)).observe(document.getElementById('root'));
