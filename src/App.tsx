import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  ExternalLink,
  Info,
  Layers3,
} from 'lucide-react'
import { useState } from 'react'
import { ChokepointMap } from './components/ChokepointMap'
import { CrudeRefineryChapter } from './components/CrudeRefineryChapter'
import { ElasticityLab } from './components/ElasticityLab'
import { Hero } from './components/Hero'
import { HistoricalDataChapter } from './components/HistoricalDataChapter'
import { HormuzDossier } from './components/HormuzDossier'
import { MarketMechanicsChapter } from './components/MarketMechanicsChapter'
import { OilJourney } from './components/OilJourney'
import { OilHistoryTimeline } from './components/OilHistoryTimeline'
import { SiteHeader } from './components/SiteHeader'
import {
  companyArchetypes,
  curriculum,
  investorLinks,
  lifeUses,
  sources,
} from './data/content'

function ImpactSection({ deepRead }: { deepRead: boolean }) {
  const chain = [
    ['01', '物理供应', '油轮等待、绕航，部分出口难以离开波斯湾'],
    ['02', '现货市场', '可立即交付的原油减少，区域升贴水先行变化'],
    ['03', '成品成本', '炼厂原料、运费与保险成本进入汽柴油和化工品'],
    ['04', '通胀预期', '交通与生产成本扩散，居民和企业调整预期'],
    ['05', '资产价格', '利率路径、行业利润、汇率和风险偏好重新定价'],
  ]

  return (
    <section className="impact-section" id="impact">
      <div className="shell">
        <div className="section-heading">
          <div>
            <div className="eyebrow">01 / 为什么与你有关</div>
            <h2>封锁的不是一条航线，<br />而是一条价格传导链。</h2>
          </div>
          <p>
            新闻常从油价开始，但真正的分析应该从“少了多少可交付的桶”开始。沿着物理流动向下，价格、通胀和资产反应才有解释力。
          </p>
        </div>

        <div className="impact-chain">
          {chain.map(([number, title, body], index) => (
            <div className="impact-step" key={number}>
              <span>{number}</span>
              <strong>{title}</strong>
              <p>{body}</p>
              {index < chain.length - 1 && <ArrowDownRight size={19} aria-hidden="true" />}
            </div>
          ))}
        </div>

        {deepRead && (
          <div className="deep-read-note">
            <Info size={18} />
            <div>
              <strong>深读提示：先区分流量与存量</strong>
              <p>
                海峡流量中断不会让终端供应在同一天归零。海上浮仓、商业库存、战略储备、可替代管道与炼厂原料结构决定了冲击的时序。持续时间往往比标题中的“是否封锁”更重要。
              </p>
            </div>
          </div>
        )}

        <div className="life-layout">
          <div className="life-image">
            <div className="life-image-copy">
              <span>BEYOND THE GAS TANK</span>
              <strong>石油不只在油箱里。</strong>
              <p>它还是材料、物流与现代农业的一部分。</p>
            </div>
          </div>
          <div className="life-content">
            <div className="eyebrow">一桶油去向何处</div>
            <h3>即使不开车，<br />你仍然每天使用石油。</h3>
            <p className="life-intro">
              从包装、衣物、药品到农机和冷链，石油既是能源，也是原料。能源危机最终会通过许多看不见的路径进入生活成本。
            </p>
            <div className="life-uses">
              {lifeUses.map((item) => {
                const Icon = item.icon
                return (
                  <div className="life-use" key={item.label}>
                    <Icon size={19} />
                    <div><strong>{item.label}</strong><span>{item.detail}</span></div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function InvestorSection({ deepRead }: { deepRead: boolean }) {
  return (
    <section className="investor-section" id="investing">
      <div className="shell">
        <div className="section-heading">
          <div>
            <div className="eyebrow">09 / 投资者框架</div>
            <h2>不要从股票代码开始，<br />从变量开始。</h2>
          </div>
          <p>
            一次石油冲击至少要经过四次翻译，才会抵达资产价格。跳过中间变量，容易把方向判断变成口号。
          </p>
        </div>

        <div className="investor-links">
          {investorLinks.map((item, index) => {
            const Icon = item.icon
            return (
              <article key={item.step}>
                <div className="investor-link-head">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <Icon size={19} />
                </div>
                <small>{item.step}</small>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                {index < investorLinks.length - 1 && <ArrowRight className="investor-arrow" size={21} />}
              </article>
            )
          })}
        </div>

        <div className="comparison-block">
          <div className="comparison-intro">
            <div className="eyebrow">公司只是产业位置的容器</div>
            <h3>比较油企，不要比较“有多少个油田”。</h3>
            <p>
              一个低成本、长寿命的巨型油田，可能比许多高递减的小油田更有价值。更应该比较储量质量、产量递减、实现油价、桶油成本、资本开支和资产负债表。
            </p>
            <ul>
              <li><Check size={16} />上游公司看油价与产量弹性</li>
              <li><Check size={16} />炼化公司看裂解价差与库存损益</li>
              <li><Check size={16} />油服公司看滞后的资本开支周期</li>
            </ul>
          </div>

          <div className="company-table-wrap">
            <table className="company-table">
              <caption>代表性公司类型对比，不构成证券推荐</caption>
              <thead>
                <tr>
                  <th>代表公司</th>
                  <th>市场</th>
                  <th>产业位置</th>
                  <th>油价敏感度</th>
                  <th>优先观察</th>
                </tr>
              </thead>
              <tbody>
                {companyArchetypes.map((company) => (
                  <tr key={company.name}>
                    <td><strong>{company.name}</strong></td>
                    <td>{company.markets}</td>
                    <td>{company.type}</td>
                    <td><span className={`sensitivity sensitivity-${company.sensitivity}`}>{company.sensitivity}</span></td>
                    <td>{company.focus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {deepRead && (
          <div className="deep-read-note deep-read-note-dark">
            <Layers3 size={18} />
            <div>
              <strong>三种“成本”不能混用</strong>
              <p>
                举升成本只反映已有产量的日常运营；完整周期盈亏平衡还包括勘探、开发和资本回报；产油国财政盈亏平衡则回答政府预算需要多高油价。它们属于不同问题。
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function CurriculumSection() {
  return (
    <section className="curriculum-section" id="curriculum">
      <div className="shell curriculum-layout">
        <div className="curriculum-heading">
          <div className="eyebrow eyebrow-light">完整知识路线</div>
          <h2>从生活常识，<br />走到投资推演。</h2>
          <p>
            八个模块既能从头学习，也能在新闻发生时单独查询。每个模块都遵循“先结论、再机制、后数据”的三层结构。
          </p>
          <a className="button button-ghost-light" href="#sources">
            查看方法与来源
            <ArrowUpRight size={17} />
          </a>
        </div>

        <ol className="curriculum-list">
          {curriculum.map(([number, title, summary]) => (
            <li key={number}>
              <span>{number}</span>
              <div><strong>{title}</strong><p>{summary}</p></div>
              <small><Check size={14} />已覆盖</small>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function SourcesSection() {
  return (
    <section className="sources-section" id="sources">
      <div className="shell">
        <div className="sources-header">
          <div>
            <div className="eyebrow">方法与来源</div>
            <h2>每一个数字，<br />都应该能回到原始口径。</h2>
          </div>
          <div className="method-principles">
            <span><b>01</b>年份明确</span>
            <span><b>02</b>口径可追</span>
            <span><b>03</b>事实与推演分离</span>
          </div>
        </div>

        <div className="source-list">
          {sources.map((source) => (
            <a href={source.url} target="_blank" rel="noreferrer" key={source.id}>
              <span>{source.year}</span>
              <div><strong>{source.publisher}</strong><p>{source.title}</p><small>{source.note}</small></div>
              <ExternalLink size={17} />
            </a>
          ))}
        </div>

        <div className="method-note">
          <BookOpen size={20} />
          <p>
            油脉是一项独立的投资者教育项目。页面中的模型、行业判断和公司示例用于解释分析框架，不构成投资建议或收益承诺。
          </p>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-main">
        <div>
          <div className="footer-brand">油脉 <span>OILWAYS</span></div>
          <p>用一桶油，理解现代生活、全球秩序与资产价格。</p>
        </div>
        <a href="#top">返回顶部 <ArrowUpRight size={15} /></a>
      </div>
      <div className="shell footer-meta">
        <span>独立知识项目</span>
        <span>开发者：九哥</span>
        <span>oilways.jiuge.space</span>
        <span>© 2026 Oilways</span>
      </div>
    </footer>
  )
}

function App() {
  const [deepRead, setDeepRead] = useState(false)

  return (
    <div className={deepRead ? 'app deep-mode' : 'app'}>
      <SiteHeader deepRead={deepRead} onDeepReadChange={setDeepRead} />
      <main>
        <Hero />
        <ImpactSection deepRead={deepRead} />
        <HormuzDossier />
        <OilJourney />
        <CrudeRefineryChapter />
        <ChokepointMap />
        <ElasticityLab />
        <MarketMechanicsChapter />
        <HistoricalDataChapter />
        <OilHistoryTimeline />
        <InvestorSection deepRead={deepRead} />
        <CurriculumSection />
        <SourcesSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
