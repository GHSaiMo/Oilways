import { ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { journeyChapters } from '../data/content'

export function OilJourney() {
  const [activeId, setActiveId] = useState(journeyChapters[0].id)
  const active =
    journeyChapters.find((chapter) => chapter.id === activeId) ?? journeyChapters[0]
  const Icon = active.icon

  return (
    <section className="journey section-dark" id="journey">
      <div className="shell">
        <div className="section-heading section-heading-light">
          <div>
            <div className="eyebrow eyebrow-light">02 / 一桶油的旅程</div>
            <h2>先理解物理世界，<br />再讨论金融价格。</h2>
          </div>
          <p>
            点击每一站，建立从地质条件到资产价格的完整链条。知识不是平铺的词条，而是一组前后相连的因果关系。
          </p>
        </div>

        <div className="journey-layout">
          <div className="journey-rail" role="tablist" aria-label="一桶油的旅程章节">
            {journeyChapters.map((chapter) => (
              <button
                className={chapter.id === active.id ? 'is-active' : ''}
                type="button"
                role="tab"
                aria-selected={chapter.id === active.id}
                key={chapter.id}
                onClick={() => setActiveId(chapter.id)}
              >
                <span>{chapter.number}</span>
                <strong>{chapter.title}</strong>
                <ChevronRight size={18} />
              </button>
            ))}
          </div>

          <article className="journey-detail" role="tabpanel">
            <div className="journey-detail-topline">
              <span className="journey-icon"><Icon size={23} /></span>
              <span>{active.number} / 06</span>
            </div>
            <p className="journey-kicker">{active.kicker}</p>
            <h3>{active.title}</h3>
            <p className="journey-summary">{active.summary}</p>
            <blockquote>{active.question}</blockquote>
            <div className="concept-list" aria-label="本章核心概念">
              {active.concepts.map((concept) => (
                <span key={concept}>{concept}</span>
              ))}
            </div>
          </article>

          <div className="journey-image" aria-hidden="true">
            <div className="image-index">{active.number}</div>
            <div className="image-caption">
              <span>PHYSICAL FIRST</span>
              <strong>一桶油先是一种物质，<br />然后才是一张合约。</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
