import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { headlineStats } from '../data/content'

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-shade" />
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-content shell">
        <div className="hero-heading">
          <div className="eyebrow eyebrow-light">序章 / 世界最重要的能源咽喉</div>
          <h1>霍尔木兹海峡</h1>
          <p className="hero-lede">
            看起来只是地图上一道狭窄的水面，却承载着全球约五分之一的石油消费量。它让我们看见：石油并不只存在于油箱里，而是流动在现代生活的每一条脉络中。
          </p>
          <div className="hero-buttons">
            <a className="button button-primary" href="#hormuz-dossier">
              从一次中断开始
              <ArrowDown size={17} />
            </a>
            <a className="button button-ghost-light" href="#elasticity">
              打开压力测试
              <ArrowUpRight size={17} />
            </a>
          </div>
        </div>

        <div className="hero-stats" aria-label="霍尔木兹海峡关键数字">
          {headlineStats.map((stat) => (
            <div className="hero-stat" key={stat.label}>
              <div>
                <strong>{stat.value}</strong>
                <span>{stat.unit}</span>
              </div>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>

        <a
          className="hero-source"
          href="https://www.eia.gov/international/analysis/special-topics/World_Oil_Transit_Chokepoints"
          target="_blank"
          rel="noreferrer"
        >
          数据口径：EIA，2023 年流量
          <ArrowUpRight size={14} />
        </a>
      </div>
      <a className="scroll-cue" href="#impact" aria-label="继续阅读">
        <span />
      </a>
    </section>
  )
}
