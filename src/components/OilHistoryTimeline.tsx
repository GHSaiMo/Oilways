import { ExternalLink, History, Info, Landmark, TimerReset, TrendingUp } from 'lucide-react'
import { useState } from 'react'
import { oilCrises } from '../data/crudeSystem'

const fingerprintLabels = [
  ['supply', '供给变化'],
  ['demand', '需求与预期'],
  ['logistics', '物流 / 库存'],
  ['policy', '政策与地缘'],
] as const

export function OilHistoryTimeline() {
  const [activeId, setActiveId] = useState('1973')
  const active = oilCrises.find((event) => event.id === activeId) ?? oilCrises[0]

  return (
    <section className="history-section" id="oil-history">
      <div className="history-intro">
        <div className="shell history-intro-layout">
          <div>
            <div className="eyebrow eyebrow-light">08 / 石油危机史</div>
            <h2>石油危机，<br />从来不只有一种。</h2>
          </div>
          <div>
            <blockquote>有时是油太少，有时是油太多；有时油还在，只是到不了正确的地点和时间。</blockquote>
            <p>用同一套框架比较七次冲击，学习辨认主导变量，而不是机械类比某个历史年份。</p>
          </div>
        </div>
      </div>

      <div className="shell history-content">
        <div className="history-rail" role="tablist" aria-label="选择石油危机">
          {oilCrises.map((event) => (
            <button
              type="button"
              role="tab"
              aria-selected={event.id === active.id}
              className={event.id === active.id ? 'is-active' : ''}
              key={event.id}
              onClick={() => setActiveId(event.id)}
            >
              <span>{event.year}</span>
              <strong>{event.name}</strong>
            </button>
          ))}
        </div>

        <div className="history-case" role="tabpanel">
          <aside className="history-case-identity">
            <div className="module-icon"><History size={19} /></div>
            <div className="evidence-tag evidence-fact">历史事件</div>
            <span>{active.year}</span>
            <h3>{active.name}</h3>
            <div className="crisis-type">{active.type}</div>
            <blockquote>{active.oneLine}</blockquote>
            <div className="price-anchor">
              <TrendingUp size={18} />
              <div><small>价格锚点</small><p>{active.priceAnchor}</p></div>
            </div>
          </aside>

          <div className="history-case-body">
            <div className="crisis-fingerprint">
              <div className="crisis-fingerprint-head">
                <div><span>冲击指纹</span><strong>哪些变量最主导？</strong></div>
                <small>定性强度 / 5</small>
              </div>
              {fingerprintLabels.map(([key, label]) => (
                <div className="fingerprint-row" key={key}>
                  <span>{label}</span>
                  <div>{[1, 2, 3, 4, 5].map((score) => <i className={score <= active.fingerprint[key] ? 'is-active' : ''} key={score} />)}</div>
                  <strong>{active.fingerprint[key]}</strong>
                </div>
              ))}
            </div>

            <div className="history-questions">
              <article><span>01 / 触发器</span><strong>发生了什么？</strong><p>{active.trigger}</p></article>
              <article><span>02 / 物理世界</span><strong>桶去了哪里？</strong><p>{active.physical}</p></article>
              <article><span>03 / 缓冲层</span><strong>谁在填补或消化？</strong><p>{active.buffer}</p></article>
              <article><span>04 / 宏观回声</span><strong>怎样进入经济？</strong><p>{active.macro}</p></article>
            </div>

            <div className="history-lesson">
              <Landmark size={20} />
              <div><span>给今天投资者的教训</span><strong>{active.lesson}</strong></div>
            </div>

            <a className="history-source" href={active.sourceUrl} target="_blank" rel="noreferrer">
              {active.sourceLabel}
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

        <div className="history-comparison">
          <div className="history-comparison-head">
            <TimerReset size={20} />
            <div><strong>不要寻找“最像哪一年”</strong><p>先比较主导机制，再比较库存、闲置产能、需求弹性和政策反应。</p></div>
          </div>
          <div className="history-matrix">
            {oilCrises.map((event) => (
              <button type="button" key={event.id} onClick={() => setActiveId(event.id)}>
                <span>{event.year}</span>
                <strong>{event.type}</strong>
                <small>{event.name}</small>
              </button>
            ))}
          </div>
          <div className="history-caveat">
            <Info size={15} />
            <p>冲击指纹是帮助比较的定性编码，不是计量分解。价格锚点采用名义美元和公开资料中的约数，只用于理解量级与方向。</p>
          </div>
        </div>
      </div>
    </section>
  )
}
