import {
  Database,
  ExternalLink,
  Gauge,
  Info,
  Landmark,
  Pickaxe,
  Scale,
  Warehouse,
} from 'lucide-react'
import { useState } from 'react'
import {
  annualOilData,
  companySnapshots,
  historicalDataSources,
  type AnnualOilData,
} from '../data/historicalData'

const chartWidth = 860
const chartHeight = 340
const chartLeft = 58
const chartRight = 28
const chartTop = 30
const chartBottom = 44

function pointX(index: number) {
  return chartLeft + (index / (annualOilData.length - 1)) * (chartWidth - chartLeft - chartRight)
}

function scaleY(value: number, min: number, max: number, top: number, bottom: number) {
  return top + ((max - value) / (max - min)) * (bottom - top)
}

function pathFor(selector: (item: AnnualOilData) => number, min: number, max: number, top = chartTop, bottom = chartHeight - chartBottom) {
  return annualOilData
    .map((item, index) => `${index === 0 ? 'M' : 'L'} ${pointX(index)} ${scaleY(selector(item), min, max, top, bottom)}`)
    .join(' ')
}

function YearSelect({ value, onChange, label }: { value: number; onChange: (year: number) => void; label: string }) {
  return (
    <label className="data-year-select">
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(Number(event.target.value))}>
        {annualOilData.map((item) => <option value={item.year} key={item.year}>{item.year}</option>)}
      </select>
    </label>
  )
}

function ChartYears({ y }: { y: number }) {
  return annualOilData.map((item, index) => (
    (index % 3 === 0 || index === annualOilData.length - 1)
      ? <text x={pointX(index)} y={y} textAnchor="middle" key={item.year}>{item.year}</text>
      : null
  ))
}

function GlobalBalanceHistory() {
  const [year, setYear] = useState(2025)
  const selectedIndex = annualOilData.findIndex((item) => item.year === year)
  const selected = annualOilData[selectedIndex]
  const balance = selected.supply - selected.demand
  const balanceLabel = balance > 0.3 ? '供应高于消费' : balance < -0.3 ? '消费高于供应' : '大致平衡'
  const yTicks = [88, 92, 96, 100, 104, 108]

  return (
    <div className="data-workbench balance-history">
      <div className="data-workbench-head">
        <div>
          <div className="evidence-tag evidence-fact">EIA年度历史序列</div>
          <h4>全球每天生产多少，消费多少？</h4>
          <p>两条超过100 mb/d的线之间，真正推动库存变化的常常只是很窄的一道缝。</p>
        </div>
        <YearSelect value={year} onChange={setYear} label="查看年份" />
      </div>

      <div className="data-summary-strip">
        <div><span>全球供应</span><strong>{selected.supply.toFixed(2)}</strong><small>mb/d</small></div>
        <div><span>全球消费</span><strong>{selected.demand.toFixed(2)}</strong><small>mb/d</small></div>
        <div><span>年度表观差</span><strong className={balance >= 0 ? 'is-positive' : 'is-negative'}>{balance > 0 ? '+' : ''}{balance.toFixed(2)}</strong><small>{balanceLabel}</small></div>
      </div>

      <div className="data-chart-scroll">
        <svg className="data-line-chart" viewBox={`0 0 ${chartWidth} ${chartHeight}`} role="img">
          <title>2010至2025年全球石油供应与消费</title>
          {yTicks.map((tick) => (
            <g key={tick}>
              <line x1={chartLeft} x2={chartWidth - chartRight} y1={scaleY(tick, 85, 108, chartTop, chartHeight - chartBottom)} y2={scaleY(tick, 85, 108, chartTop, chartHeight - chartBottom)} />
              <text x={chartLeft - 10} y={scaleY(tick, 85, 108, chartTop, chartHeight - chartBottom) + 4} textAnchor="end">{tick}</text>
            </g>
          ))}
          <line className="selected-year-line" x1={pointX(selectedIndex)} x2={pointX(selectedIndex)} y1={chartTop} y2={chartHeight - chartBottom} />
          <path className="data-series data-series-supply" d={pathFor((item) => item.supply, 85, 108)} />
          <path className="data-series data-series-demand" d={pathFor((item) => item.demand, 85, 108)} />
          <circle className="selected-point selected-point-supply" cx={pointX(selectedIndex)} cy={scaleY(selected.supply, 85, 108, chartTop, chartHeight - chartBottom)} r="5" />
          <circle className="selected-point selected-point-demand" cx={pointX(selectedIndex)} cy={scaleY(selected.demand, 85, 108, chartTop, chartHeight - chartBottom)} r="5" />
          <ChartYears y={chartHeight - 16} />
        </svg>
      </div>

      <div className="data-legend"><span><i className="legend-supply" />供应</span><span><i className="legend-demand" />消费</span><small>单位：百万桶/日</small></div>
      <div className="data-caveat"><Info size={16} /><p>“供应减消费”不是可直接交易的库存预测。炼厂增益、统计差异、海上库存和地区错配会让年度表观差与可观测库存变化不同。</p></div>
    </div>
  )
}

function BufferHistory() {
  const [year, setYear] = useState(2025)
  const selectedIndex = annualOilData.findIndex((item) => item.year === year)
  const selected = annualOilData[selectedIndex]
  const inventoryTicks = [2500, 2700, 2900, 3100]
  const spareTicks = [1, 2.5, 4, 5.5]
  const height = 470
  const inventoryTop = 45
  const inventoryBottom = 205
  const spareTop = 285
  const spareBottom = 425

  const inventoryPath = pathFor((item) => item.oecdInventory, 2450, 3100, inventoryTop, inventoryBottom)
  const sparePath = pathFor((item) => item.opecSpareCapacity, 1, 5.5, spareTop, spareBottom)

  return (
    <div className="data-workbench buffer-history">
      <div className="data-workbench-head">
        <div>
          <div className="evidence-tag evidence-fact">两种不同的缓冲</div>
          <h4>库存买时间，闲置产能补流量。</h4>
          <p>库存是已经生产出来的桶；闲置产能是未来可能增加的日产量。两者不能直接相加。</p>
        </div>
        <YearSelect value={year} onChange={setYear} label="对齐年份" />
      </div>

      <div className="buffer-readout">
        <div><Warehouse size={18} /><span>OECD商业库存</span><strong>{selected.oecdInventory.toFixed(0)}<small> 百万桶</small></strong></div>
        <div><Gauge size={18} /><span>OPEC剩余产能</span><strong>{selected.opecSpareCapacity.toFixed(2)}<small> mb/d</small></strong></div>
      </div>

      <div className="data-chart-scroll">
        <svg className="data-line-chart buffer-chart" viewBox={`0 0 ${chartWidth} ${height}`} role="img">
          <title>2010至2025年OECD商业石油库存与OPEC剩余原油产能</title>
          <text className="chart-panel-label" x={chartLeft} y="21">OECD商业库存 / 百万桶</text>
          {inventoryTicks.map((tick) => (
            <g key={tick}>
              <line x1={chartLeft} x2={chartWidth - chartRight} y1={scaleY(tick, 2450, 3100, inventoryTop, inventoryBottom)} y2={scaleY(tick, 2450, 3100, inventoryTop, inventoryBottom)} />
              <text x={chartLeft - 10} y={scaleY(tick, 2450, 3100, inventoryTop, inventoryBottom) + 4} textAnchor="end">{tick}</text>
            </g>
          ))}
          <path className="data-series data-series-inventory" d={inventoryPath} />
          <circle className="selected-point selected-point-inventory" cx={pointX(selectedIndex)} cy={scaleY(selected.oecdInventory, 2450, 3100, inventoryTop, inventoryBottom)} r="5" />

          <text className="chart-panel-label" x={chartLeft} y="258">OPEC剩余原油产能 / mb/d</text>
          {spareTicks.map((tick) => (
            <g key={tick}>
              <line x1={chartLeft} x2={chartWidth - chartRight} y1={scaleY(tick, 1, 5.5, spareTop, spareBottom)} y2={scaleY(tick, 1, 5.5, spareTop, spareBottom)} />
              <text x={chartLeft - 10} y={scaleY(tick, 1, 5.5, spareTop, spareBottom) + 4} textAnchor="end">{tick}</text>
            </g>
          ))}
          <line className="selected-year-line" x1={pointX(selectedIndex)} x2={pointX(selectedIndex)} y1={inventoryTop} y2={spareBottom} />
          <path className="data-series data-series-spare" d={sparePath} />
          <circle className="selected-point selected-point-spare" cx={pointX(selectedIndex)} cy={scaleY(selected.opecSpareCapacity, 1, 5.5, spareTop, spareBottom)} r="5" />
          <ChartYears y={height - 15} />
        </svg>
      </div>

      <div className="buffer-principles">
        <div><strong>库存高</strong><p>不代表目标地区、目标油种和目标时点都可用。</p></div>
        <div><strong>闲置产能高</strong><p>不代表能在一天内启动，也不代表出口物流畅通。</p></div>
      </div>
    </div>
  )
}

function usResponseStory(year: number) {
  if (year <= 2014) return '高油价与水平井、压裂技术共同推动美国原油产量快速增长。'
  if (year <= 2017) return '油价坍塌后，产量先因已投项目惯性维持，随后才回落；响应不是同步开关。'
  if (year <= 2019) return '效率提升和融资仍支持扩张，美国成为全球最重要的边际供应来源之一。'
  if (year === 2020) return '需求崩塌使油价与产量同时下挫，停井、减产和资本开支削减迅速发生。'
  return '油价修复后产量再创新高，但资本纪律、服务成本和优质库存约束使响应慢于早期页岩周期。'
}

function UsResponseHistory() {
  const [year, setYear] = useState(2025)
  const selectedIndex = annualOilData.findIndex((item) => item.year === year)
  const selected = annualOilData[selectedIndex]
  const priceTicks = [40, 60, 80, 100]
  const productionTicks = [6, 8, 10, 12, 14]
  const pricePath = pathFor((item) => item.wti, 30, 105)
  const productionPath = pathFor((item) => item.usCrudeProduction, 5, 14)

  return (
    <div className="data-workbench us-response-history">
      <div className="data-workbench-head">
        <div>
          <div className="evidence-tag evidence-fact">美国边际供给</div>
          <h4>价格先动，资本开支再动，产量最后动。</h4>
          <p>把WTI年度均价和美国原油产量放在同一时间轴上，可以看到供给响应的惯性与滞后。</p>
        </div>
        <YearSelect value={year} onChange={setYear} label="选择年份" />
      </div>

      <div className="data-summary-strip us-summary-strip">
        <div><span>WTI年度均价</span><strong>${selected.wti.toFixed(1)}</strong><small>/ bbl</small></div>
        <div><span>美国原油产量</span><strong>{selected.usCrudeProduction.toFixed(2)}</strong><small>mb/d</small></div>
        <div className="us-story"><Pickaxe size={18} /><p>{usResponseStory(year)}</p></div>
      </div>

      <div className="data-chart-scroll">
        <svg className="data-line-chart" viewBox={`0 0 ${chartWidth} ${chartHeight}`} role="img">
          <title>2010至2025年WTI年度均价与美国原油产量</title>
          {priceTicks.map((tick) => (
            <g key={tick}>
              <line x1={chartLeft} x2={chartWidth - chartRight} y1={scaleY(tick, 30, 105, chartTop, chartHeight - chartBottom)} y2={scaleY(tick, 30, 105, chartTop, chartHeight - chartBottom)} />
              <text x={chartLeft - 10} y={scaleY(tick, 30, 105, chartTop, chartHeight - chartBottom) + 4} textAnchor="end">${tick}</text>
            </g>
          ))}
          {productionTicks.map((tick) => <text x={chartWidth - chartRight + 8} y={scaleY(tick, 5, 14, chartTop, chartHeight - chartBottom) + 4} key={tick}>{tick}</text>)}
          <line className="selected-year-line" x1={pointX(selectedIndex)} x2={pointX(selectedIndex)} y1={chartTop} y2={chartHeight - chartBottom} />
          <path className="data-series data-series-wti" d={pricePath} />
          <path className="data-series data-series-us-output" d={productionPath} />
          <circle className="selected-point selected-point-wti" cx={pointX(selectedIndex)} cy={scaleY(selected.wti, 30, 105, chartTop, chartHeight - chartBottom)} r="5" />
          <circle className="selected-point selected-point-us-output" cx={pointX(selectedIndex)} cy={scaleY(selected.usCrudeProduction, 5, 14, chartTop, chartHeight - chartBottom)} r="5" />
          <ChartYears y={chartHeight - 16} />
        </svg>
      </div>

      <div className="data-legend"><span><i className="legend-wti" />WTI年度均价 / 左轴</span><span><i className="legend-us-output" />美国原油产量 / 右轴</span></div>
      <div className="data-caveat"><Info size={16} /><p>美国原油总产量包含页岩、常规陆上和海上生产。该图用于观察边际供给响应，不把全部增量机械归因于页岩油。</p></div>
    </div>
  )
}

function CompanySnapshotExplorer() {
  const [activeId, setActiveId] = useState(companySnapshots[0].id)
  const active = companySnapshots.find((company) => company.id === activeId) ?? companySnapshots[0]

  return (
    <div className="company-snapshot-explorer">
      <div className="snapshot-tabs" role="tablist" aria-label="选择年度公司快照">
        {companySnapshots.map((company) => (
          <button type="button" role="tab" aria-selected={company.id === active.id} className={company.id === active.id ? 'is-active' : ''} onClick={() => setActiveId(company.id)} key={company.id}>
            <span>{company.market}</span><strong>{company.name}</strong><small>{company.role}</small>
          </button>
        ))}
      </div>

      <div className="snapshot-detail" role="tabpanel">
        <div className="snapshot-identity">
          <div className="module-icon"><Landmark size={19} /></div>
          <div className="evidence-tag evidence-fact">{active.year}</div>
          <h4>{active.name}</h4>
          <span>{active.market} / {active.role}</span>
          <p>{active.thesis}</p>
        </div>
        <div className="snapshot-metrics">
          {active.metrics.map((metric) => (
            <article key={metric.label}>
              <span>{metric.label}</span>
              <strong>{metric.value}<small>{metric.unit}</small></strong>
              <p>{metric.note}</p>
            </article>
          ))}
        </div>
        <div className="snapshot-watch"><Scale size={18} /><div><span>下一份年报优先更新</span><p>{active.watch}</p></div></div>
        <a className="snapshot-source" href={active.sourceUrl} target="_blank" rel="noreferrer">{active.sourceLabel}<ExternalLink size={15} /></a>
      </div>

      <div className="snapshot-caveat"><Info size={16} /><p>数字按公司2024年报披露口径摘录并取展示精度。不同公司在产量权益、成本、会计准则和业务边界上不可直接排名；快照用于示范应该读什么，不构成估值结论。</p></div>
    </div>
  )
}

export function HistoricalDataChapter() {
  return (
    <section className="historical-data-section" id="historical-data">
      <div className="historical-data-intro">
        <div className="shell historical-data-intro-layout">
          <div>
            <div className="eyebrow eyebrow-light">07 / 数据长镜头</div>
            <h2>一年给你新闻，<br />十六年才给你周期。</h2>
          </div>
          <div>
            <p>年度数据不会告诉你明天油价涨跌，但能帮助你辨认：市场处在缺口、缓冲、供给响应和资本纪律的哪一段。</p>
            <div><Database size={20} /><span>本章只使用低频公开数据。2025年为当前最新完整年度，数据版本锁定于EIA 2026年7月STEO。</span></div>
          </div>
        </div>
      </div>

      <div className="shell historical-data-content">
        <article className="data-chapter" id="global-balance-history">
          <div className="dossier-chapter-head">
            <span>01</span>
            <div><div className="eyebrow">全球供需长图</div><h3>一百多百万桶的市场，<br />在小数点后失衡。</h3></div>
            <p>不要只看需求增长或供应增长，真正进入库存的是二者之差，以及这个差持续了多久。</p>
          </div>
          <GlobalBalanceHistory />
        </article>

        <article className="data-chapter" id="buffer-history">
          <div className="dossier-chapter-head">
            <span>02</span>
            <div><div className="eyebrow">两种缓冲</div><h3>库存与剩余产能，<br />解决的是不同时间问题。</h3></div>
            <p>库存可以快速交付但会耗尽；闲置产能可改变持续供应，却受到启动时间、油种和物流约束。</p>
          </div>
          <BufferHistory />
        </article>

        <article className="data-chapter" id="us-supply-response">
          <div className="dossier-chapter-head">
            <span>03</span>
            <div><div className="eyebrow">美国供给响应</div><h3>高油价不是产量，<br />它只是投资的邀请函。</h3></div>
            <p>从价格到钻井、完井和产量需要时间。已经投入的井和资本纪律也会让下跌阶段出现同样的滞后。</p>
          </div>
          <UsResponseHistory />
        </article>

        <article className="data-chapter" id="company-snapshots">
          <div className="dossier-chapter-head">
            <span>04</span>
            <div><div className="eyebrow">公司年度快照</div><h3>同一桶油，<br />进入四张不同的报表。</h3></div>
            <p>用代表性A/H与美股公司示范：上游看产量成本，炼化看加工与价差，综合油企看组合，油服看资本开支。</p>
          </div>
          <CompanySnapshotExplorer />
        </article>

        <article className="historical-data-sources">
          <div><div className="eyebrow">本章来源</div><h3>固定版本，<br />才能复现一张图。</h3></div>
          <div>{historicalDataSources.map((source) => <a href={source.url} target="_blank" rel="noreferrer" key={source.url}><span>{source.use}</span><strong>{source.title}</strong><ExternalLink size={15} /></a>)}</div>
        </article>
      </div>
    </section>
  )
}
