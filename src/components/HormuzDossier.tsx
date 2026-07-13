import {
  Activity,
  ArrowDown,
  Check,
  CircleDot,
  ExternalLink,
  Gauge,
  Info,
  Landmark,
  Route,
  SlidersHorizontal,
  TimerReset,
  Warehouse,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import {
  chinaTransmission,
  crisisClocks,
  dossierSources,
  hormuzFacts,
  hormuzScenarios,
  inventoryLayers,
  pipelineRoutes,
  verificationSignals,
} from '../data/hormuz'

const EXPOSED_FLOW = 20.9

function formatFlow(value: number) {
  return new Intl.NumberFormat('zh-CN', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value)
}

function GapWaterfall() {
  const [scenarioId, setScenarioId] = useState('prolonged')
  const scenario =
    hormuzScenarios.find((item) => item.id === scenarioId) ?? hormuzScenarios[0]

  const netGap = Math.max(
    0,
    scenario.grossDisruption -
      scenario.pipelineBypass -
      scenario.emergencyStocks -
      scenario.otherSupply -
      scenario.demandResponse,
  )

  const rows = [
    { label: '受影响等效流量', value: scenario.grossDisruption, tone: 'gross' },
    { label: '管道绕行', value: scenario.pipelineBypass, tone: 'buffer' },
    { label: '应急库存释放', value: scenario.emergencyStocks, tone: 'buffer' },
    { label: '非海峡增供', value: scenario.otherSupply, tone: 'buffer' },
    { label: '需求与炼厂响应', value: scenario.demandResponse, tone: 'buffer' },
  ]

  return (
    <div className="gap-module">
      <div className="scenario-tabs" role="tablist" aria-label="封锁情景">
        {hormuzScenarios.map((item) => (
          <button
            type="button"
            role="tab"
            aria-selected={item.id === scenario.id}
            className={item.id === scenario.id ? 'is-active' : ''}
            key={item.id}
            onClick={() => setScenarioId(item.id)}
          >
            <span>{item.duration}</span>
            <strong>{item.label}</strong>
          </button>
        ))}
      </div>

      <div className="gap-workbench">
        <div className="gap-explanation">
          <div className="module-icon"><SlidersHorizontal size={19} /></div>
          <div className="evidence-tag evidence-model">教学情景</div>
          <h4>{scenario.label}</h4>
          <p>{scenario.description}</p>
          <div className="gap-answer">
            <span>缓冲后的平衡缺口</span>
            <strong>{formatFlow(netGap)} <small>mb/d</small></strong>
          </div>
          <p className="gap-conclusion">{scenario.conclusion}</p>
        </div>

        <div className="waterfall" aria-label="供应缺口拆解">
          {rows.map((row) => (
            <div className={`waterfall-row waterfall-${row.tone}`} key={row.label}>
              <span>{row.label}</span>
              <div className="waterfall-track">
                <i style={{ width: `${Math.max(1, (row.value / EXPOSED_FLOW) * 100)}%` }} />
              </div>
              <strong>{row.value === 0 ? '—' : `${formatFlow(row.value)}`}</strong>
            </div>
          ))}
          <div className="waterfall-total">
            <span>剩余缺口</span>
            <div className="waterfall-track">
              <i style={{ width: `${Math.max(1, (netGap / EXPOSED_FLOW) * 100)}%` }} />
            </div>
            <strong>{formatFlow(netGap)}</strong>
          </div>
          <div className="waterfall-scale"><span>0</span><span>10</span><span>20.9 mb/d</span></div>
        </div>
      </div>

      <div className="model-caveat">
        <Info size={16} />
        <p>
          管道是替代运输，库存释放、其他增供和需求压缩则是市场平衡手段，经济含义不同。这里把它们放在同一张表中，只为说明“风险敞口”如何逐层变成“需要由价格消除的缺口”。
        </p>
      </div>
    </div>
  )
}

function InflationPassThrough() {
  const [oilShock, setOilShock] = useState(30)
  const [energyWeight, setEnergyWeight] = useState(8)
  const [passThrough, setPassThrough] = useState(40)
  const [indirect, setIndirect] = useState(0.3)

  const direct = oilShock * (passThrough / 100) * (energyWeight / 100)
  const total = direct + indirect

  return (
    <div className="inflation-module">
      <div className="inflation-controls">
        <div className="inflation-control-head">
          <div className="module-icon"><Gauge size={19} /></div>
          <div>
            <div className="evidence-tag evidence-model">透明参数模型</div>
            <h4>油价如何进入 CPI？</h4>
          </div>
        </div>
        <p className="inflation-intro">
          不预设某个国家的确定结果。调整四个假设，观察油价冲击如何经过零售传导和消费篮子权重，变成百分点影响。
        </p>

        <label className="dossier-range">
          <span><strong>原油价格冲击</strong><b>+{oilShock}%</b></span>
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={oilShock}
            onChange={(event) => setOilShock(Number(event.target.value))}
          />
        </label>
        <label className="dossier-range">
          <span><strong>能源相关 CPI 权重</strong><b>{energyWeight}%</b></span>
          <input
            type="range"
            min="3"
            max="15"
            step="1"
            value={energyWeight}
            onChange={(event) => setEnergyWeight(Number(event.target.value))}
          />
        </label>
        <label className="dossier-range">
          <span><strong>向零售能源传导率</strong><b>{passThrough}%</b></span>
          <input
            type="range"
            min="10"
            max="100"
            step="5"
            value={passThrough}
            onChange={(event) => setPassThrough(Number(event.target.value))}
          />
        </label>
        <label className="dossier-range">
          <span><strong>间接成本影响</strong><b>+{indirect.toFixed(1)} pp</b></span>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={indirect}
            onChange={(event) => setIndirect(Number(event.target.value))}
          />
        </label>
      </div>

      <div className="inflation-output">
        <div className="output-kicker">教学结果 / 非预测</div>
        <div className="inflation-number">
          <span>Headline CPI 压力</span>
          <strong>+{total.toFixed(1)}<small> pp</small></strong>
        </div>
        <div className="inflation-equation">
          <div><span>直接能源贡献</span><strong>+{direct.toFixed(2)} pp</strong></div>
          <b>+</b>
          <div><span>间接成本假设</span><strong>+{indirect.toFixed(1)} pp</strong></div>
        </div>
        <code>
          直接贡献 = 油价冲击 × 零售传导率 × 能源权重
        </code>
        <div className="china-buffer-note">
          <Landmark size={18} />
          <p>
            对中国而言，成品油调价机制、税费、汇率、炼化利润、需求强弱和政策库存会改变传导速度。PPI 往往先动，CPI 是否持续上行还要看企业能否转嫁成本。
          </p>
        </div>
      </div>
    </div>
  )
}

function VerificationBoard() {
  const [checked, setChecked] = useState<Set<string>>(new Set())

  const verdict = useMemo(() => {
    if (checked.size <= 1) return ['标题风险', '证据不足，市场主要在交易消息与概率。']
    if (checked.size <= 3) return ['物流受压', '航运系统已经反应，但仍需现货和库存确认。']
    if (checked.size <= 5) return ['实货短缺', '多个独立信号共振，缺口正在进入炼厂与库存。']
    return ['系统冲击', '物流、实货与政策信号同时确认，持续时间成为核心变量。']
  }, [checked])

  const toggle = (id: string) => {
    setChecked((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="verification-board">
      <div className="verification-result">
        <div className="module-icon"><Activity size={19} /></div>
        <div className="evidence-tag evidence-framework">研究框架</div>
        <span>已确认 {checked.size} / {verificationSignals.length}</span>
        <strong>{verdict[0]}</strong>
        <p>{verdict[1]}</p>
        <div className="verification-meter" aria-label={`确认 ${checked.size} 项`}>
          {verificationSignals.map((signal) => (
            <i className={checked.has(signal.id) ? 'is-active' : ''} key={signal.id} />
          ))}
        </div>
      </div>

      <div className="verification-list">
        {verificationSignals.map((signal) => {
          const isChecked = checked.has(signal.id)
          return (
            <button
              type="button"
              className={isChecked ? 'is-checked' : ''}
              aria-pressed={isChecked}
              key={signal.id}
              onClick={() => toggle(signal.id)}
            >
              <span className="check-box">{isChecked && <Check size={14} />}</span>
              <span className="signal-copy">
                <small>{signal.group}</small>
                <strong>{signal.title}</strong>
                <p>{signal.detail}</p>
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function HormuzDossier() {
  return (
    <section className="dossier-section" id="hormuz-dossier">
      <div className="dossier-cover">
        <div className="dossier-cover-shade" />
        <div className="shell dossier-cover-content">
          <div className="dossier-cover-copy">
            <div className="eyebrow eyebrow-light">旗舰专题 / HORMUZ DOSSIER</div>
            <h2>如果海峡真的停了，<br />世界会怎样？</h2>
            <p>
              20.9 百万桶是风险敞口，不是第一天就消失的供应。真正需要判断的是：多少桶无法交付、缓冲能撑多久，以及短缺何时越过炼厂进入通胀。
            </p>
            <a href="#hormuz-gap" className="button button-primary">
              拆解供应缺口
              <ArrowDown size={17} />
            </a>
          </div>

          <div className="dossier-thesis">
            <span>核心判断</span>
            <blockquote>
              油价交易的是恐惧，炼厂面对的是实物缺口，宏观经济承受的是持续时间。
            </blockquote>
            <small>由九哥既有研究资料提炼为长期分析框架</small>
          </div>
        </div>
      </div>

      <div className="dossier-facts">
        <div className="shell dossier-fact-grid">
          {hormuzFacts.map((fact) => (
            <div className="dossier-fact" key={fact.label}>
              <div className="evidence-tag evidence-fact">结构性事实</div>
              <strong>{fact.value}<small>{fact.unit}</small></strong>
              <span>{fact.label}</span>
              <p>{fact.note}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="dossier-content shell">
        <article className="dossier-chapter" id="hormuz-gap">
          <div className="dossier-chapter-head">
            <span>01</span>
            <div>
              <div className="eyebrow">从暴露量到净缺口</div>
              <h3>“经过海峡”不等于<br />“封锁后全部消失”。</h3>
            </div>
            <p>
              先确定多少流量受影响，再逐层扣除可以绕行、释放、增产和被价格压缩的部分。这个顺序比直接猜油价更重要。
            </p>
          </div>
          <GapWaterfall />
        </article>

        <article className="dossier-chapter" id="hormuz-clocks">
          <div className="dossier-chapter-head">
            <span>02</span>
            <div>
              <div className="eyebrow">危机不是同时发生</div>
              <h3>四只时钟，<br />四种不同的证据。</h3>
            </div>
            <p>
              金融市场以分钟反应，油轮以天移动，库存以周消耗，通胀以月传导。混淆时钟，是地缘交易最常见的错误。
            </p>
          </div>

          <div className="crisis-clocks">
            {crisisClocks.map((clock, index) => (
              <article key={clock.time}>
                <div className="clock-topline">
                  <TimerReset size={19} />
                  <span>{String(index + 1).padStart(2, '0')}</span>
                </div>
                <strong className="clock-time">{clock.time}</strong>
                <h4>{clock.title}</h4>
                <p className="clock-question">{clock.question}</p>
                <ul>
                  {clock.signals.map((signal) => <li key={signal}>{signal}</li>)}
                </ul>
                <p className="clock-trap"><Info size={14} />{clock.trap}</p>
              </article>
            ))}
          </div>
        </article>

        <article className="dossier-chapter" id="hormuz-pipelines">
          <div className="dossier-chapter-head">
            <span>03</span>
            <div>
              <div className="eyebrow">替代路线</div>
              <h3>管道能缓冲，<br />不能复制一条海峡。</h3>
            </div>
            <p>
              名义能力、闲置能力与可持续流量不是同一个数字。最关键的限制是：每条管道只连接特定油田、港口和国家。
            </p>
          </div>

          <div className="pipeline-layout">
            <div className="pipeline-summary">
              <Route size={23} />
              <span>EIA 估算</span>
              <strong>3.5<small> mb/d</small></strong>
              <p>沙特、阿联酋及伊朗相关管道合计的有效闲置绕行能力估计。</p>
              <div className="pipeline-warning">
                <Info size={15} />
                <span>不要把所有管道的铭牌能力直接相加。</span>
              </div>
            </div>

            <div className="pipeline-table-wrap">
              <table className="pipeline-table">
                <thead><tr><th>路线</th><th>能力与状态</th><th>为什么不能完全替代</th></tr></thead>
                <tbody>
                  {pipelineRoutes.map((pipeline) => (
                    <tr key={pipeline.name}>
                      <td><strong>{pipeline.name}</strong><span>{pipeline.owner}</span><small>{pipeline.route}</small></td>
                      <td><strong>{pipeline.capacity}</strong><span>{pipeline.status}</span></td>
                      <td>{pipeline.limit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </article>

        <article className="dossier-chapter" id="hormuz-inventory">
          <div className="dossier-chapter-head">
            <span>04</span>
            <div>
              <div className="eyebrow">库存与亚洲暴露</div>
              <h3>库里有油，<br />不等于炼厂有油。</h3>
            </div>
            <p>
              2022 年，经霍尔木兹出口的原油与凝析油约 82% 流向亚洲。中国、印度、日本和韩国合计占全部流量约 67%。
            </p>
          </div>

          <div className="asia-exposure">
            <div className="asia-number">
              <span>亚洲目的地</span>
              <strong>82%</strong>
              <small>EIA / 2022</small>
            </div>
            <div className="asia-bar" aria-label="82% 流向亚洲">
              <i style={{ width: '82%' }} />
              <span>亚洲 82%</span>
              <b>其他 18%</b>
            </div>
            <p>
              中国不是远处的旁观者。冲击首先进入中东原油到岸价、运费和炼厂原料结构，然后才逐步传向工业成本与居民价格。
            </p>
          </div>

          <div className="inventory-layers">
            <div className="inventory-lead">
              <Warehouse size={25} />
              <h4>一桶库存，必须通过四道门。</h4>
              <p>任何一道门过不去，它就只能缓解心理预期，不能解决目标炼厂的物理缺口。</p>
            </div>
            {inventoryLayers.map((layer) => (
              <div className="inventory-layer" key={layer.number}>
                <span>{layer.number}</span>
                <strong>{layer.title}</strong>
                <p>{layer.body}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="dossier-chapter" id="hormuz-inflation">
          <div className="dossier-chapter-head">
            <span>05</span>
            <div>
              <div className="eyebrow">中国通胀传导</div>
              <h3>油价冲击，<br />不是直接乘进 CPI。</h3>
            </div>
            <p>
              投资者需要一个透明的参数模型，而不是背诵“油价上涨多少就增加多少通胀”的经验数字。
            </p>
          </div>

          <InflationPassThrough />

          <ol className="china-transmission">
            {chinaTransmission.map((item) => (
              <li key={item.number}>
                <span>{item.number}</span>
                <strong>{item.title}</strong>
                <p>{item.body}</p>
              </li>
            ))}
          </ol>
        </article>

        <article className="dossier-chapter" id="hormuz-verification">
          <div className="dossier-chapter-head">
            <span>06</span>
            <div>
              <div className="eyebrow">事件验证器</div>
              <h3>不要问“封了没”，<br />要问证据走到了哪一步。</h3>
            </div>
            <p>
              勾选你已经从可靠来源确认的信号。这个工具不预测油价，只帮助判断市场处在标题、物流、实货还是系统冲击阶段。
            </p>
          </div>
          <VerificationBoard />
        </article>

        <article className="dossier-sources">
          <div>
            <div className="eyebrow">证据边界</div>
            <h3>事实、框架与模型，<br />在页面上各有名字。</h3>
            <p>
              旧研究库中的 2026 年即时事件存在不同程度的材料限制，因此本专题只吸收其分析方法；通行量、亚洲流向和绕行能力回到 EIA 等公开来源核验。
            </p>
          </div>
          <div className="evidence-legend">
            <span><i className="legend-fact" />结构性事实：外部来源可核验</span>
            <span><i className="legend-framework" />研究框架：由多份报告归纳</span>
            <span><i className="legend-model" />教学模型：参数透明、不是预测</span>
          </div>
          <div className="dossier-source-list">
            {dossierSources.map((source) => (
              <a href={source.url} target="_blank" rel="noreferrer" key={source.url}>
                <span>{source.date}</span>
                <strong>{source.label}</strong>
                <ExternalLink size={15} />
              </a>
            ))}
          </div>
          <a className="research-method-link" href="#sources">
            查看全站方法与来源
            <CircleDot size={15} />
          </a>
        </article>
      </div>
    </section>
  )
}
