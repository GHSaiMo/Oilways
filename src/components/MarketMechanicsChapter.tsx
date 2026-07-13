import {
  Activity,
  CircleDollarSign,
  Database,
  ExternalLink,
  Factory,
  Gauge,
  Info,
  LineChart,
  SlidersHorizontal,
  Warehouse,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import {
  balancePresets,
  industryExposures,
  marketMechanicsSources,
  marketRegimes,
} from '../data/marketMechanics'

function signed(value: number, digits = 1) {
  const text = value.toFixed(digits)
  return value > 0 ? `+${text}` : text
}

function BalanceLab() {
  const initial = balancePresets[0]
  const [presetId, setPresetId] = useState(initial.id)
  const [demandChange, setDemandChange] = useState(initial.demandChange)
  const [nonOpecSupply, setNonOpecSupply] = useState(initial.nonOpecSupply)
  const [opecAction, setOpecAction] = useState(initial.opecAction)
  const [disruption, setDisruption] = useState(initial.disruption)

  const balance = nonOpecSupply + opecAction - disruption - demandChange
  const stockChange = balance * 90
  const marker = Math.max(0, Math.min(100, ((balance + 6) / 12) * 100))
  const verdict = balance > 1.5
    ? ['明显过剩', '库存倾向快速累积，价格需要压缩高成本供给或刺激需求。']
    : balance > 0.3
      ? ['温和累库', '供应略高于需求，现货压力通常先于产量调整出现。']
      : balance >= -0.3
        ? ['大致平衡', '轻微误差、季节性和数据修订都可能改变库存方向。']
        : balance >= -1.5
          ? ['温和去库', '近端供应偏紧，但库存缓冲仍可能吸收一段时间。']
          : ['明显短缺', '库存快速去化，必须依赖增供、需求破坏或政策释放重新平衡。']

  const applyPreset = (id: string) => {
    const preset = balancePresets.find((item) => item.id === id)
    if (!preset) return
    setPresetId(id)
    setDemandChange(preset.demandChange)
    setNonOpecSupply(preset.nonOpecSupply)
    setOpecAction(preset.opecAction)
    setDisruption(preset.disruption)
  }

  const controls = [
    { label: '全球需求变化', value: demandChange, set: setDemandChange, min: -4, max: 4, note: '增加需求会收紧平衡' },
    { label: '非OPEC新增供应', value: nonOpecSupply, set: setNonOpecSupply, min: -2, max: 4, note: '页岩油、巴西、圭亚那等' },
    { label: 'OPEC+行动', value: opecAction, set: setOpecAction, min: -4, max: 4, note: '正值为增产，负值为减产' },
    { label: '供应中断', value: disruption, set: setDisruption, min: 0, max: 6, note: '战争、制裁、事故与物流' },
  ]

  const updateControl = (setValue: (value: number) => void, value: number) => {
    setPresetId('custom')
    setValue(value)
  }

  return (
    <div className="balance-lab">
      <div className="balance-presets" role="tablist" aria-label="选择供需情景">
        {balancePresets.map((preset) => (
          <button
            type="button"
            role="tab"
            aria-selected={preset.id === presetId}
            className={preset.id === presetId ? 'is-active' : ''}
            key={preset.id}
            onClick={() => applyPreset(preset.id)}
          >
            <span>{preset.label}</span>
            <small>{preset.summary}</small>
          </button>
        ))}
      </div>

      <div className="balance-workbench">
        <div className="balance-controls">
          <div className="tool-title">
            <div className="module-icon"><SlidersHorizontal size={19} /></div>
            <div><div className="evidence-tag evidence-model">增量平衡模型</div><h4>每天多出或少掉多少桶？</h4></div>
          </div>
          {controls.map((control) => (
            <label className="market-range" key={control.label}>
              <span><strong>{control.label}</strong><b>{signed(control.value)} mb/d</b></span>
              <input
                type="range"
                min={control.min}
                max={control.max}
                step="0.1"
                value={control.value}
                onChange={(event) => updateControl(control.set, Number(event.target.value))}
              />
              <small>{control.note}</small>
            </label>
          ))}
        </div>

        <div className="balance-output">
          <div className="balance-output-top">
            <span>每日市场平衡</span>
            <strong className={balance >= 0 ? 'is-surplus' : 'is-deficit'}>
              {signed(balance)}<small> mb/d</small>
            </strong>
          </div>
          <div className="balance-axis">
            <span>缺口 / 去库</span>
            <div><i /><b style={{ left: `${marker}%` }} /></div>
            <span>过剩 / 累库</span>
          </div>
          <div className="balance-verdict">
            <Gauge size={19} />
            <div><strong>{verdict[0]}</strong><p>{verdict[1]}</p></div>
          </div>
          <div className="stock-projection">
            <div><span>若持续90天</span><strong>{signed(stockChange, 0)}<small> 百万桶</small></strong></div>
            <p>正值代表进入库存，负值代表需要由商业库存、战略库存或需求收缩填补。</p>
          </div>
          <code>库存变化 =（供应 − 需求）× 持续天数</code>
        </div>
      </div>
    </div>
  )
}

function FuturesCurveLab() {
  const [spotPrice, setSpotPrice] = useState(80)
  const [financing, setFinancing] = useState(5)
  const [storage, setStorage] = useState(4)
  const [convenience, setConvenience] = useState(12)

  const netCarry = financing + storage - convenience
  const curve = useMemo(() => Array.from({ length: 12 }, (_, index) => {
    const month = index + 1
    return {
      month,
      price: spotPrice * Math.exp((netCarry / 100) * (month / 12)),
    }
  }), [netCarry, spotPrice])
  const first = curve[0].price
  const last = curve[curve.length - 1].price
  const curveName = netCarry > 0.25 ? 'Contango' : netCarry < -0.25 ? 'Backwardation' : '近似平坦'
  const explanation = netCarry > 0.25
    ? '持有库存的融资与仓储成本高于立即拥有现货的便利收益，远月价格高于近月。'
    : netCarry < -0.25
      ? '现货稀缺使立即拥有原油更有价值，便利收益超过持有成本，近月高于远月。'
      : '持有成本与便利收益大致抵消，期限曲线接近平坦。'

  const width = 740
  const height = 320
  const left = 56
  const right = 24
  const top = 28
  const bottom = 44
  const prices = curve.map((point) => point.price)
  const minPrice = Math.min(...prices) - 2
  const maxPrice = Math.max(...prices) + 2
  const x = (month: number) => left + ((month - 1) / 11) * (width - left - right)
  const y = (price: number) => top + ((maxPrice - price) / (maxPrice - minPrice)) * (height - top - bottom)
  const path = curve.map((point, index) => `${index === 0 ? 'M' : 'L'} ${x(point.month)} ${y(point.price)}`).join(' ')

  const applyCurve = (kind: 'contango' | 'flat' | 'backwardation') => {
    if (kind === 'contango') setConvenience(2)
    if (kind === 'flat') setConvenience(financing + storage)
    if (kind === 'backwardation') setConvenience(16)
  }

  return (
    <div className="curve-lab">
      <div className="curve-controls">
        <div className="tool-title">
          <div className="module-icon"><LineChart size={19} /></div>
          <div><div className="evidence-tag evidence-model">持有成本模型</div><h4>库存如何弯曲期货曲线？</h4></div>
        </div>
        <div className="curve-presets">
          <button type="button" onClick={() => applyCurve('contango')}>累库</button>
          <button type="button" onClick={() => applyCurve('flat')}>平衡</button>
          <button type="button" onClick={() => applyCurve('backwardation')}>去库</button>
        </div>
        <label className="market-range">
          <span><strong>现货价格</strong><b>${spotPrice}</b></span>
          <input type="range" min="40" max="140" step="1" value={spotPrice} onChange={(event) => setSpotPrice(Number(event.target.value))} />
          <small>曲线起点，不代表预测价格</small>
        </label>
        <label className="market-range">
          <span><strong>年化融资成本</strong><b>{financing}%</b></span>
          <input type="range" min="0" max="15" step="0.5" value={financing} onChange={(event) => setFinancing(Number(event.target.value))} />
          <small>占用资金的成本</small>
        </label>
        <label className="market-range">
          <span><strong>年化仓储成本</strong><b>{storage}%</b></span>
          <input type="range" min="0" max="15" step="0.5" value={storage} onChange={(event) => setStorage(Number(event.target.value))} />
          <small>罐容、损耗与运营</small>
        </label>
        <label className="market-range">
          <span><strong>便利收益</strong><b>{convenience}%</b></span>
          <input type="range" min="0" max="25" step="0.5" value={convenience} onChange={(event) => setConvenience(Number(event.target.value))} />
          <small>立即拥有现货、保障生产的隐含价值</small>
        </label>
      </div>

      <div className="curve-output">
        <div className="curve-output-head">
          <div><span>当前结构</span><strong>{curveName}</strong><p>{explanation}</p></div>
          <div><span>M1 → M12</span><strong>{signed(last - first)}<small> 美元</small></strong></div>
        </div>
        <div className="curve-chart">
          <svg viewBox={`0 0 ${width} ${height}`} role="img">
            <title>十二个月原油期货曲线教学模型</title>
            {[0, 1, 2, 3, 4].map((tick) => {
              const price = minPrice + ((maxPrice - minPrice) / 4) * tick
              return <g key={tick}><line x1={left} x2={width - right} y1={y(price)} y2={y(price)} /><text x={left - 9} y={y(price) + 4} textAnchor="end">${price.toFixed(0)}</text></g>
            })}
            <path d={path} />
            {curve.map((point) => <g className="curve-point" key={point.month}><circle cx={x(point.month)} cy={y(point.price)} r="3.5" /><text x={x(point.month)} y={height - 17} textAnchor="middle">M{point.month}</text></g>)}
          </svg>
        </div>
        <div className="curve-formula">
          <Database size={16} />
          <code>远期价格 ≈ 现货价格 × e^[(融资 + 仓储 − 便利收益) × 时间]</code>
        </div>
      </div>
    </div>
  )
}

function CrackSpreadLab() {
  const [crude, setCrude] = useState(80)
  const [gasoline, setGasoline] = useState(2.45)
  const [distillate, setDistillate] = useState(2.75)
  const productRevenue = ((2 * gasoline * 42) + (distillate * 42)) / 3
  const spread = productRevenue - crude
  const verdict = spread >= 25 ? '毛加工空间较宽' : spread >= 10 ? '处于中间区间' : '毛加工空间偏弱'

  return (
    <div className="crack-lab">
      <div className="crack-visual">
        <div className="module-icon"><Factory size={19} /></div>
        <div className="evidence-tag evidence-framework">3-2-1 标准结构</div>
        <h4>三桶原油，<br />变成两桶汽油和一桶馏分油。</h4>
        <div className="crack-flow">
          <div><span>3</span><small>桶原油</small></div>
          <b>→</b>
          <div><span>2</span><small>桶汽油</small></div>
          <b>+</b>
          <div><span>1</span><small>桶柴油/取暖油</small></div>
        </div>
        <p>它是标准化毛利代理，不等于任何具体炼厂的真实产品收率。</p>
      </div>

      <div className="crack-controls">
        <div className="tool-title">
          <div className="module-icon"><CircleDollarSign size={19} /></div>
          <div><div className="evidence-tag evidence-model">单位换算模型</div><h4>产品涨得过原油吗？</h4></div>
        </div>
        <label className="market-range">
          <span><strong>原油价格</strong><b>${crude.toFixed(0)} / bbl</b></span>
          <input type="range" min="40" max="140" step="1" value={crude} onChange={(event) => setCrude(Number(event.target.value))} />
          <small>每桶原油成本</small>
        </label>
        <label className="market-range">
          <span><strong>汽油价格</strong><b>${gasoline.toFixed(2)} / gal</b></span>
          <input type="range" min="1" max="5" step="0.05" value={gasoline} onChange={(event) => setGasoline(Number(event.target.value))} />
          <small>每桶42加仑，模型使用两桶</small>
        </label>
        <label className="market-range">
          <span><strong>柴油 / 取暖油价格</strong><b>${distillate.toFixed(2)} / gal</b></span>
          <input type="range" min="1" max="5" step="0.05" value={distillate} onChange={(event) => setDistillate(Number(event.target.value))} />
          <small>每桶42加仑，模型使用一桶</small>
        </label>
      </div>

      <div className="crack-output">
        <div className="crack-number"><span>3-2-1 裂解价差</span><strong>${spread.toFixed(1)}<small> / bbl</small></strong><p>{verdict}</p></div>
        <div className="crack-bars">
          <div><span>每桶进料对应产品收入</span><i><b style={{ width: `${Math.min(100, (productRevenue / 150) * 100)}%` }} /></i><strong>${productRevenue.toFixed(1)}</strong></div>
          <div><span>原油成本</span><i><b style={{ width: `${Math.min(100, (crude / 150) * 100)}%` }} /></i><strong>${crude.toFixed(1)}</strong></div>
        </div>
        <code>[(2 × 汽油$/gal × 42) + (1 × 馏分油$/gal × 42)] ÷ 3 − 原油$/bbl</code>
        <div className="crack-caveat"><Info size={16} /><p>真实炼厂利润还要扣除能源、氢气、催化剂、人工、检修、损耗和运输，并考虑原油品质、产品收率与库存损益。</p></div>
      </div>
    </div>
  )
}

function IndustryMatrix() {
  const [regimeId, setRegimeId] = useState('supply-led')
  const regime = marketRegimes.find((item) => item.id === regimeId) ?? marketRegimes[0]

  return (
    <div className="industry-matrix">
      <div className="regime-tabs" role="tablist" aria-label="选择市场情景">
        {marketRegimes.map((item) => (
          <button type="button" role="tab" aria-selected={item.id === regime.id} className={item.id === regime.id ? 'is-active' : ''} key={item.id} onClick={() => setRegimeId(item.id)}>
            <span>{item.price}</span><strong>{item.label}</strong>
          </button>
        ))}
      </div>
      <div className="regime-summary">
        <div><Activity size={20} /><div><strong>{regime.label}</strong><p>{regime.summary}</p></div></div>
        <div className="regime-signals">{regime.confirmation.map((signal) => <span key={signal}>{signal}</span>)}</div>
      </div>
      <div className="industry-table">
        <div className="industry-table-head"><span>产业位置</span><span>情景影响</span><span>利润逻辑</span><span>优先观察</span></div>
        {industryExposures.map((industry) => {
          const outcome = industry.outcomes[regime.id]
          return (
            <article key={industry.id}>
              <div><strong>{industry.name}</strong><small>{industry.examples}</small><code>{industry.coreVariable}</code></div>
              <div><span className={`outcome outcome-${outcome.tone}`}>{outcome.label}</span></div>
              <p>{outcome.logic}</p>
              <p>{industry.watch}</p>
            </article>
          )
        })}
      </div>
      <div className="matrix-caveat"><Info size={16} /><p>这是产业利润方向框架，不是证券推荐。公司还会受到产量、套保、税费、负债、政策定价、资产质量和估值位置影响。</p></div>
    </div>
  )
}

export function MarketMechanicsChapter() {
  return (
    <section className="market-mechanics-section" id="market-mechanics">
      <div className="market-mechanics-intro">
        <div className="shell market-mechanics-intro-layout">
          <div>
            <div className="eyebrow eyebrow-light">06 / 市场结构</div>
            <h2>供需决定方向，<br />库存决定时间。</h2>
          </div>
          <div>
            <p>石油价格不是一条供需线的交点。每日微小的不平衡先进入库存，再通过现货、期货曲线和产品价差，把压力传向不同产业。</p>
            <div><Warehouse size={20} /><span>库存既是昨天供需失衡的结果，也是明天价格冲击的缓冲垫。</span></div>
          </div>
        </div>
      </div>

      <div className="shell market-mechanics-content">
        <article className="market-chapter" id="balance-lab">
          <div className="dossier-chapter-head">
            <span>01</span>
            <div><div className="eyebrow">供需平衡表</div><h3>差一百万桶每天，<br />三个月就是九千万桶。</h3></div>
            <p>市场关注的不是供应和需求谁更大，而是两者之差能持续多久，以及库存、增产和需求破坏何时响应。</p>
          </div>
          <BalanceLab />
        </article>

        <article className="market-chapter" id="futures-curve">
          <div className="dossier-chapter-head">
            <span>02</span>
            <div><div className="eyebrow">期货期限结构</div><h3>一条曲线，<br />记录市场对库存的态度。</h3></div>
            <p>Contango常与库存宽松和持有成本相关；Backwardation常表达近端稀缺与便利收益，但两者都不是单独的涨跌预测。</p>
          </div>
          <FuturesCurveLab />
        </article>

        <article className="market-chapter" id="crack-spread">
          <div className="dossier-chapter-head">
            <span>03</span>
            <div><div className="eyebrow">裂解价差</div><h3>油价上涨，<br />炼厂利润不一定上涨。</h3></div>
            <p>炼厂赚的是产品与原料之间的加工价差。3-2-1裂解价差用统一合约构造一个可比较的毛加工利润代理。</p>
          </div>
          <CrackSpreadLab />
        </article>

        <article className="market-chapter" id="china-industry">
          <div className="dossier-chapter-head">
            <span>04</span>
            <div><div className="eyebrow">中国行业传导</div><h3>同样的油价上涨，<br />可以是四种不同的投资环境。</h3></div>
            <p>先判断价格是需求推动还是供应推动，再讨论上游、炼化、化工、油服、航运和航空谁受益。</p>
          </div>
          <IndustryMatrix />
        </article>

        <article className="market-mechanics-sources">
          <div><div className="eyebrow">本章来源</div><h3>公式公开，<br />假设也应该公开。</h3></div>
          <div>{marketMechanicsSources.map((source) => <a href={source.url} target="_blank" rel="noreferrer" key={source.url}><span>{source.use}</span><strong>{source.title}</strong><ExternalLink size={15} /></a>)}</div>
        </article>
      </div>
    </section>
  )
}
