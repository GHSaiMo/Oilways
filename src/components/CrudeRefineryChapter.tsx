import {
  Beaker,
  CircleDollarSign,
  ExternalLink,
  Gauge,
  Info,
  MapPin,
  SlidersHorizontal,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import {
  benchmarks,
  crudeGrades,
  crudeSystemSources,
  refineryConfigs,
  refinerySteps,
} from '../data/crudeSystem'

const CHART = {
  width: 760,
  height: 430,
  left: 72,
  right: 40,
  top: 36,
  bottom: 58,
}

function apiX(api: number) {
  const plotWidth = CHART.width - CHART.left - CHART.right
  return CHART.left + ((api - 15) / 30) * plotWidth
}

function sulfurY(sulfur: number) {
  const plotHeight = CHART.height - CHART.top - CHART.bottom
  return CHART.top + (sulfur / 4) * plotHeight
}

function getCrudeClass(api: number, sulfur: number) {
  const density = api >= 35 ? '轻质' : api >= 25 ? '中质' : '重质'
  const sulfurClass = sulfur < 0.5 ? '低硫（甜）' : '高硫（酸）'
  return `${density}${sulfurClass}`
}

function CrudeFingerprint() {
  const [selectedId, setSelectedId] = useState('arab-light')
  const selected = crudeGrades.find((grade) => grade.id === selectedId) ?? crudeGrades[0]
  const lightBoundary = apiX(35)
  const sweetBoundary = sulfurY(0.5)
  const plotRight = CHART.width - CHART.right
  const plotBottom = CHART.height - CHART.bottom

  return (
    <div className="fingerprint-layout">
      <div className="crude-chart">
        <svg viewBox={`0 0 ${CHART.width} ${CHART.height}`} role="img">
          <title>代表性原油的 API 度与含硫量坐标</title>
          <rect
            className="quadrant-light-sweet"
            x={lightBoundary}
            y={CHART.top}
            width={plotRight - lightBoundary}
            height={sweetBoundary - CHART.top}
          />
          <rect
            className="quadrant-heavy-sour"
            x={CHART.left}
            y={sweetBoundary}
            width={lightBoundary - CHART.left}
            height={plotBottom - sweetBoundary}
          />
          {[15, 20, 25, 30, 35, 40, 45].map((tick) => (
            <g key={`x-${tick}`}>
              <line x1={apiX(tick)} x2={apiX(tick)} y1={CHART.top} y2={plotBottom} />
              <text x={apiX(tick)} y={plotBottom + 24} textAnchor="middle">{tick}</text>
            </g>
          ))}
          {[0, 0.5, 1, 2, 3, 4].map((tick) => (
            <g key={`y-${tick}`}>
              <line x1={CHART.left} x2={plotRight} y1={sulfurY(tick)} y2={sulfurY(tick)} />
              <text x={CHART.left - 14} y={sulfurY(tick) + 4} textAnchor="end">{tick}%</text>
            </g>
          ))}
          <text className="axis-label" x={(CHART.left + plotRight) / 2} y={CHART.height - 10} textAnchor="middle">
            API 度：越往右越轻
          </text>
          <text
            className="axis-label"
            x={18}
            y={(CHART.top + plotBottom) / 2}
            textAnchor="middle"
            transform={`rotate(-90 18 ${(CHART.top + plotBottom) / 2})`}
          >
            含硫量：越往上越甜
          </text>
          <text className="quadrant-label" x={plotRight - 12} y={CHART.top + 23} textAnchor="end">轻质低硫</text>
          <text className="quadrant-label" x={CHART.left + 12} y={plotBottom - 14}>重质高硫</text>

          {crudeGrades.map((grade) => {
            const isSelected = grade.id === selected.id
            const x = apiX(grade.api)
            const y = sulfurY(grade.sulfur)
            return (
              <g
                className={`crude-point ${isSelected ? 'is-active' : ''}`}
                key={grade.id}
                transform={`translate(${x} ${y})`}
                role="button"
                tabIndex={0}
                aria-label={`${grade.name}，API ${grade.api}，含硫 ${grade.sulfur}%`}
                onClick={() => setSelectedId(grade.id)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') setSelectedId(grade.id)
                }}
              >
                <circle className="crude-point-halo" r={isSelected ? 16 : 10} style={{ fill: grade.color }} />
                <circle className="crude-point-core" r={isSelected ? 6 : 4} style={{ fill: grade.color }} />
                <text x={10} y={-9}>{grade.name}</text>
              </g>
            )
          })}
        </svg>
        <div className="chart-caption">
          <span><i />API 度是密度指标，不是“品质总分”</span>
          <span>典型值会随批次和方法变化</span>
        </div>
      </div>

      <aside className="crude-detail" aria-live="polite">
        <div className="module-icon"><Beaker size={19} /></div>
        <div className="evidence-tag evidence-fact">典型代表值</div>
        <span>{selected.origin}</span>
        <h4>{selected.name}</h4>
        <div className="crude-metrics">
          <div><small>API 度</small><strong>{selected.api.toFixed(1)}°</strong></div>
          <div><small>含硫量</small><strong>{selected.sulfur.toFixed(2)}%</strong></div>
        </div>
        <div className="crude-class">{getCrudeClass(selected.api, selected.sulfur)}</div>
        <p>{selected.marketRole}</p>
        <blockquote>{selected.refineryNote}</blockquote>
      </aside>

      <div className="crude-selector" aria-label="选择原油品种">
        {crudeGrades.map((grade) => (
          <button
            type="button"
            className={grade.id === selected.id ? 'is-active' : ''}
            key={grade.id}
            onClick={() => setSelectedId(grade.id)}
          >
            <i style={{ background: grade.color }} />
            <span>{grade.name}</span>
            <small>{grade.api.toFixed(1)}° / {grade.sulfur.toFixed(2)}%</small>
          </button>
        ))}
      </div>
    </div>
  )
}

function RefinerySimulator() {
  const [gradeId, setGradeId] = useState('arab-light')
  const [configId, setConfigId] = useState('conversion')
  const grade = crudeGrades.find((item) => item.id === gradeId) ?? crudeGrades[0]
  const config = refineryConfigs.find((item) => item.id === configId) ?? refineryConfigs[0]

  const output = useMemo(() => {
    const base = grade.api >= 35
      ? { light: 31, middle: 36, residue: 18, other: 15 }
      : grade.api >= 25
        ? { light: 25, middle: 32, residue: 29, other: 14 }
        : { light: 18, middle: 27, residue: 42, other: 13 }
    const converted = Math.min(config.conversion, base.residue - 10)
    return {
      light: base.light + converted * 0.45,
      middle: base.middle + converted * 0.4,
      residue: base.residue - converted,
      other: base.other + converted * 0.15,
    }
  }, [config, grade])

  const products = [
    { key: 'light', label: '汽油 / 石脑油倾向', value: output.light, color: '#ef6334' },
    { key: 'middle', label: '柴油 / 航煤倾向', value: output.middle, color: '#d8ad4b' },
    { key: 'residue', label: '燃料油 / 渣油倾向', value: output.residue, color: '#6d6560' },
    { key: 'other', label: 'LPG / 焦炭 / 其他', value: output.other, color: '#3a9296' },
  ]
  const treatment = grade.sulfur < 0.5 ? '低' : grade.sulfur < 1.5 ? '中' : '高'
  const fit = config.id === 'simple' && grade.sulfur >= 1.5
    ? '装置压力高'
    : grade.api < 25 && config.id !== 'deep'
      ? '转化能力偏弱'
      : '基本匹配'

  return (
    <div className="refinery-simulator">
      <div className="simulator-controls">
        <div className="simulator-head">
          <div className="module-icon"><SlidersHorizontal size={19} /></div>
          <div>
            <div className="evidence-tag evidence-model">产品倾向模型</div>
            <h4>把哪种油，送进哪种炼厂？</h4>
          </div>
        </div>

        <fieldset>
          <legend>选择原油</legend>
          <div className="grade-buttons">
            {crudeGrades.map((item) => (
              <button
                type="button"
                className={item.id === grade.id ? 'is-active' : ''}
                key={item.id}
                onClick={() => setGradeId(item.id)}
              >
                {item.name}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>选择炼厂配置</legend>
          <div className="config-buttons">
            {refineryConfigs.map((item) => (
              <button
                type="button"
                className={item.id === config.id ? 'is-active' : ''}
                key={item.id}
                onClick={() => setConfigId(item.id)}
              >
                <span>{item.shortName}</span>
                <strong>{item.name}</strong>
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="simulator-output">
        <div className="simulator-output-head">
          <div>
            <span>{grade.name} × {config.shortName}</span>
            <strong>{fit}</strong>
          </div>
          <div className="fit-metrics">
            <span>脱硫负担 <b>{treatment}</b></span>
            <span>资本强度 <b>{config.capex}</b></span>
            <span>氢气需求 <b>{config.hydrogen}</b></span>
          </div>
        </div>

        <div className="product-stack" aria-label="产品结构倾向">
          {products.map((product) => (
            <i
              key={product.key}
              style={{ width: `${product.value}%`, background: product.color }}
              title={`${product.label} ${product.value.toFixed(0)}`}
            />
          ))}
        </div>
        <div className="product-legend">
          {products.map((product) => (
            <div key={product.key}>
              <i style={{ background: product.color }} />
              <span>{product.label}</span>
              <strong>{product.value.toFixed(0)}</strong>
            </div>
          ))}
        </div>

        <div className="refinery-economics">
          <div><small>能做什么</small><p>{config.capability}</p></div>
          <div><small>真正的限制</small><p>{config.limit}</p></div>
        </div>
        <div className="simulator-caveat">
          <Info size={15} />
          <p>数值是100单位进料的方向性教学模型，不是工程收率。真实结果取决于完整原油评价、切割点、装置组合、负荷、氢气和产品标准。</p>
        </div>
      </div>
    </div>
  )
}

function BenchmarkLab() {
  const [benchmarkId, setBenchmarkId] = useState('dubai-oman')
  const [basePrice, setBasePrice] = useState(80)
  const [qualityDiff, setQualityDiff] = useState(-2)
  const [freight, setFreight] = useState(2.5)
  const [riskCost, setRiskCost] = useState(0.5)
  const benchmark = benchmarks.find((item) => item.id === benchmarkId) ?? benchmarks[0]
  const landedCost = basePrice + qualityDiff + freight + riskCost

  const selectBenchmark = (id: string) => {
    const next = benchmarks.find((item) => item.id === id)
    if (!next) return
    setBenchmarkId(id)
    setQualityDiff(next.defaultDifferential)
  }

  return (
    <div className="benchmark-lab">
      <div className="benchmark-tabs" role="tablist" aria-label="选择基准油">
        {benchmarks.map((item) => (
          <button
            type="button"
            role="tab"
            aria-selected={item.id === benchmark.id}
            className={item.id === benchmark.id ? 'is-active' : ''}
            key={item.id}
            onClick={() => selectBenchmark(item.id)}
          >
            <span>{item.region}</span>
            <strong>{item.shortName}</strong>
          </button>
        ))}
      </div>

      <div className="benchmark-detail">
        <div className="benchmark-definition">
          <div className="module-icon"><MapPin size={19} /></div>
          <div className="evidence-tag evidence-fact">定价机制</div>
          <span>{benchmark.quality}</span>
          <h4>{benchmark.name}</h4>
          <dl>
            <div><dt>定价 / 交割点</dt><dd>{benchmark.pricingPoint}</dd></div>
            <div><dt>机制</dt><dd>{benchmark.mechanism}</dd></div>
            <div><dt>最能代表</dt><dd>{benchmark.represents}</dd></div>
          </dl>
          <blockquote>{benchmark.blindSpot}</blockquote>
        </div>

        <div className="landed-cost-tool">
          <div className="landed-head">
            <div>
              <div className="module-icon"><CircleDollarSign size={19} /></div>
              <div>
                <div className="evidence-tag evidence-model">到岸成本模型</div>
                <h4>屏幕油价不是炼厂成本</h4>
              </div>
            </div>
            <strong>${landedCost.toFixed(1)}<small> / bbl</small></strong>
          </div>

          <label className="dossier-range benchmark-range">
            <span><strong>{benchmark.shortName} 基准价格</strong><b>${basePrice}</b></span>
            <input type="range" min="40" max="140" step="1" value={basePrice} onChange={(event) => setBasePrice(Number(event.target.value))} />
          </label>
          <label className="dossier-range benchmark-range">
            <span><strong>品质 / 地区升贴水</strong><b>{qualityDiff >= 0 ? '+' : ''}${qualityDiff.toFixed(1)}</b></span>
            <input type="range" min="-10" max="10" step="0.5" value={qualityDiff} onChange={(event) => setQualityDiff(Number(event.target.value))} />
          </label>
          <label className="dossier-range benchmark-range">
            <span><strong>运费</strong><b>+${freight.toFixed(1)}</b></span>
            <input type="range" min="0" max="12" step="0.5" value={freight} onChange={(event) => setFreight(Number(event.target.value))} />
          </label>
          <label className="dossier-range benchmark-range">
            <span><strong>保险 / 制裁 / 融资摩擦</strong><b>+${riskCost.toFixed(1)}</b></span>
            <input type="range" min="0" max="8" step="0.5" value={riskCost} onChange={(event) => setRiskCost(Number(event.target.value))} />
          </label>

          <div className="landed-formula">
            <span>基准价</span><b>+</b><span>品质差</span><b>+</b><span>运费</span><b>+</b><span>风险摩擦</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function CrudeRefineryChapter() {
  return (
    <section className="crude-system-section" id="crude-refinery">
      <div className="crude-system-intro">
        <div className="shell crude-system-intro-layout">
          <div>
            <div className="eyebrow eyebrow-light">03 / 原油与炼厂</div>
            <h2>世界上没有一种<br />叫作“原油”的标准液体。</h2>
          </div>
          <div className="crude-intro-copy">
            <p>同样是一桶油，密度、含硫量、产地和交割条件不同，能炼出的产品、需要的装置和最终价格都会不同。</p>
            <div><Gauge size={19} /><span>品质决定加工难度，炼厂能力决定折价能否变成利润。</span></div>
          </div>
        </div>
      </div>

      <div className="shell crude-system-content">
        <article className="crude-chapter" id="crude-fingerprint">
          <div className="dossier-chapter-head">
            <span>01</span>
            <div>
              <div className="eyebrow">原油指纹</div>
              <h3>先看轻重甜酸，<br />再谈谁贵谁便宜。</h3>
            </div>
            <p>API度越高，原油通常越轻；含硫量越低，脱硫负担通常越小。但位置、产品需求和炼厂配置同样会改变价差。</p>
          </div>
          <CrudeFingerprint />
        </article>

        <article className="crude-chapter" id="refinery-lab">
          <div className="dossier-chapter-head">
            <span>02</span>
            <div>
              <div className="eyebrow">炼厂不是蒸馏壶</div>
              <h3>把重分子变轻，<br />才是复杂炼厂的价值。</h3>
            </div>
            <p>所有炼厂都先分离，但只有投入更多资本、氢气和能耗，才能把低价值重组分继续转化并满足成品规格。</p>
          </div>

          <div className="refinery-steps">
            {refinerySteps.map((step) => (
              <div key={step.number}>
                <span>{step.number}</span>
                <strong>{step.title}</strong>
                <p>{step.body}</p>
              </div>
            ))}
          </div>
          <RefinerySimulator />
        </article>

        <article className="crude-chapter" id="benchmarks">
          <div className="dossier-chapter-head">
            <span>03</span>
            <div>
              <div className="eyebrow">全球定价坐标</div>
              <h3>新闻里的“油价”，<br />必须先问是哪一个。</h3>
            </div>
            <p>WTI、Brent、Dubai/Oman和Murban分别锚定不同品质、地点和交易机制。炼厂支付的则是基准加上升贴水与物流摩擦。</p>
          </div>
          <BenchmarkLab />
        </article>

        <article className="crude-system-sources">
          <div>
            <div className="eyebrow">本章来源</div>
            <h3>把行业常识，<br />重新接回原始定义。</h3>
          </div>
          <div>
            {crudeSystemSources.map((source) => (
              <a href={source.url} target="_blank" rel="noreferrer" key={source.url}>
                <span>{source.use}</span>
                <strong>{source.title}</strong>
                <ExternalLink size={15} />
              </a>
            ))}
          </div>
        </article>
      </div>
    </section>
  )
}
