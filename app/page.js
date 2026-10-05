'use client';
import { useState } from 'react';
import { CONDITIONS, LOE, CLS } from './data';

export default function Home() {
  const [cid, setCid] = useState(CONDITIONS[0].id);
  const [ans, setAns] = useState({});
  const c = CONDITIONS.find(x => x.id === cid);
  const set = (k, v) => setAns(p => ({ ...p, [k]: v }));
  const [tier, label, why] = c.stratify(ans);
  const recs = c.recs.filter(r => !r.when || r.when(ans, tier));

  return (
    <main>
      <h1>Sports Cardiology Risk Navigator</h1>
      <div className="sub">Based on the 2020 ESC Guidelines on sports cardiology and exercise in patients with cardiovascular disease (Eur Heart J 2021;42:17–96). Decision support only – not a substitute for clinical judgement.</div>

      <div className="card">
        <h2>1. Select condition</h2>
        <select value={cid} onChange={e => { setCid(e.target.value); setAns({}); }}>
          {CONDITIONS.map(x => <option key={x.id} value={x.id}>{x.name}</option>)}
        </select>
      </div>

      <div className="card">
        <h2>2. Enter clinical findings</h2>
        {c.inputs.map(i => i.type === 'check' ? (
          <label className="ck" key={i.id}><input type="checkbox" checked={!!ans[i.id]} onChange={e => set(i.id, e.target.checked)} />{i.label}</label>
        ) : i.type === 'select' ? (
          <div key={i.id} style={{ margin: '8px 0' }}><div className="sub">{i.label}</div>
            <select value={ans[i.id] || i.options[0]} onChange={e => set(i.id, e.target.value)}>{i.options.map(o => <option key={o}>{o}</option>)}</select></div>
        ) : (
          <div key={i.id} style={{ margin: '8px 0' }}><div className="sub">{i.label}</div>
            <input type="number" inputMode="numeric" value={ans[i.id] || ''} onChange={e => set(i.id, e.target.value)} /></div>
        ))}
      </div>

      <div className={`tier ${tier}`}><b>{label}</b><p>{why}</p></div>

      <div className="card">
        <h2>3. Recommendations with evidence</h2>
        {recs.map((r, n) => (
          <div className="rec" key={n}>
            <span className={`badge c-${r.cls}`}>Class {r.cls}</span><span className="badge">Level {r.lvl}</span> <small>{CLS[r.cls]}</small>
            <div>{r.text}</div>
            <details><summary>Evidence</summary>
              <div>Level {r.lvl}: {LOE[r.lvl]}</div>
              <div>Guideline location: Section {r.sec}{r.refs ? ` · Reference nos. ${r.refs}` : ''}</div>
            </details>
          </div>
        ))}
      </div>

      <div className="card">
        <h2>4. Suggested tests and why they matter</h2>
        {c.tests.map(([t, w]) => <div className="test" key={t}><b>{t}</b><div>{w}</div></div>)}
      </div>

      <div className="foot">Class I = recommended, IIa = should be considered, IIb = may be considered, III = not recommended. Thresholds are transcribed from the guideline tables; verify against the source before clinical use. Not validated as a medical device.</div>
    </main>
  );
}
