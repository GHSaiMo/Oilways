import {
  ArrowDown,
  ArrowRight,
  Check,
  CircleDot,
  ExternalLink,
  Gauge,
  Info,
  Radio,
  RotateCcw,
  ShieldAlert,
  Ship,
  Target,
  Wrench,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import {
  escalationSignals,
  escalationSources,
  escalationStages,
  evidenceTiers,
  exitRamps,
  mechanismSteps,
  supplyStates,
} from '../data/escalationTrap'

function MechanismExplorer() {
  const [activeId, setActiveId] = useState(mechanismSteps[0].id)
  const activeStep =
    mechanismSteps.find((step) => step.id === activeId) ?? mechanismSteps[0]

  return (
    <div className="trap-mechanism">
      <div className="trap-mechanism-rail" role="tablist" aria-label="升级陷阱机制链">
        {mechanismSteps.map((step, index) => (
          <button
            type="button"
            role="tab"
            aria-selected={step.id === activeStep.id}
            className={step.id === activeStep.id ? 'is-active' : ''}
            key={step.id}
            onClick={() => setActiveId(step.id)}
          >
            <span>{step.number}</span>
            <strong>{step.title}</strong>
            {index < mechanismSteps.length - 1 && <ArrowRight size={16} aria-hidden="true" />}
          </button>
        ))}
      </div>

      <div className="trap-mechanism-detail" role="tabpanel">
        <div className="trap-mechanism-lead">
          <span>{activeStep.number} / {activeStep.title}</span>
          <strong>每一步可以理性，<br />整条链却会失控。</strong>
        </div>
        <div>
          <small>行动者为什么这样做</small>
          <p>{activeStep.actorLogic}</p>
        </div>
        <div>
          <small>系统因此发生什么</small>
          <p>{activeStep.systemEffect}</p>
        </div>
        <div className="trap-oil-read">
          <Ship size={18} />
          <span><small>石油市场读法</small>{activeStep.oilSignal}</span>
        </div>
      </div>
    </div>
  )
}

function StageModel() {
  const [stageId, setStageId] = useState(escalationStages[0].id)
  const stage =
    escalationStages.find((item) => item.id === stageId) ?? escalationStages[0]

  return (
    <div className="trap-stage-model">
      <div className="trap-stage-tabs" role="tablist" aria-label="升级陷阱三阶段">
        {escalationStages.map((item) => (
          <button
            type="button"
            role="tab"
            aria-selected={item.id === stage.id}
            className={item.id === stage.id ? 'is-active' : ''}
            key={item.id}
            onClick={() => setStageId(item.id)}
          >
            <span>{item.number}</span>
            <strong>{item.shortTitle}</strong>
          </button>
        ))}
      </div>

      <div className="trap-stage-panel" role="tabpanel">
        <div className="trap-stage-identity">
          <Target size={24} />
          <span>{stage.number}</span>
          <h4>{stage.title}</h4>
          <div className="trap-stage-trigger">
            <small>下一阶段触发器</small>
            <p>{stage.nextTrigger}</p>
          </div>
        </div>
        <div className="trap-stage-causality">
          <div><span>行动目标</span><p>{stage.objective}</p></div>
          <ArrowDown size={17} aria-hidden="true" />
          <div><span>战术结果</span><p>{stage.tacticalResult}</p></div>
          <ArrowDown size={17} aria-hidden="true" />
          <div><span>系统后果</span><p>{stage.systemEffect}</p></div>
          <div className="trap-stage-oil">
            <Ship size={18} />
            <p><strong>原油供应读法</strong>{stage.oilRead}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function SupplyThreshold() {
  const [stateIndex, setStateIndex] = useState(1)
  const state = supplyStates[stateIndex]
  const isDamage = state.mode === '破坏'

  return (
    <div className={`trap-threshold ${isDamage ? 'is-damage' : ''}`}>
      <div className="trap-threshold-control">
        <div className="trap-threshold-head">
          <Gauge size={21} />
          <div>
            <span>供应冲击状态</span>
            <strong>{state.title}</strong>
          </div>
          <b>{state.mode}</b>
        </div>

        <div className="trap-threshold-scale">
          <span>言辞</span><span>物流</span><span>设施</span><span>系统</span>
        </div>
        <input
          aria-label="供应冲击状态"
          type="range"
          min="0"
          max="3"
          step="1"
          value={stateIndex}
          onChange={(event) => setStateIndex(Number(event.target.value))}
        />
        <div className="trap-threshold-labels" aria-hidden="true">
          <span>DISRUPTION / 干扰</span>
          <span>DAMAGE / 破坏</span>
        </div>

        <div className="trap-threshold-facts">
          <div><span>可逆性</span><strong>{state.reversibility}</strong></div>
          <div><span>物理能力</span><strong>{state.capacity}</strong></div>
        </div>
        <p>{state.summary}</p>
      </div>

      <div className="trap-threshold-output">
        <div className="trap-threshold-verdict">
          <span>相变判断</span>
          <blockquote>
            {isDamage
              ? '破坏把流量从系统中移除。'
              : '干扰让石油更晚、更贵地到达。'}
          </blockquote>
        </div>
        <div className="trap-evidence-list">
          <small>需要核验的物理证据</small>
          {state.physicalEvidence.map((item) => (
            <span key={item}><Check size={15} />{item}</span>
          ))}
        </div>
        <div className="trap-market-read">
          <Ship size={18} />
          <p><strong>市场含义</strong>{state.marketRead}</p>
        </div>
      </div>
    </div>
  )
}

function SignalReader() {
  const [checked, setChecked] = useState<Set<string>>(new Set())

  const verdict = useMemo(() => {
    if (checked.size === 0) {
      return {
        tier: -1,
        label: '等待证据',
        summary: '尚未选择已确认信号。不要让标题替代证据。',
        question: '先确认信号来自言辞、部署、承诺还是物理结果。',
      }
    }

    const selected = escalationSignals.filter((signal) => checked.has(signal.id))
    const tier = Math.max(...selected.map((signal) => signal.tier))
    return { tier, ...evidenceTiers[tier] }
  }, [checked])

  function toggleSignal(id: string) {
    setChecked((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="trap-signal-reader">
      <div className={`trap-signal-verdict trap-tier-${Math.max(0, verdict.tier)}`}>
        <div className="trap-verdict-topline">
          <Radio size={20} />
          <span>当前证据层级</span>
          <button
            type="button"
            aria-label="重置信号"
            title="重置信号"
            onClick={() => setChecked(new Set())}
          >
            <RotateCcw size={16} />
          </button>
        </div>
        <strong>{verdict.label}</strong>
        <p>{verdict.summary}</p>
        <div className="trap-verdict-question">
          <span>此刻应该问</span>
          <p>{verdict.question}</p>
        </div>
        <div className="trap-tier-meter" aria-label={`已确认 ${checked.size} 个信号`}>
          {evidenceTiers.map((tier, index) => (
            <i className={verdict.tier >= index ? 'is-on' : ''} key={tier.label} />
          ))}
        </div>
      </div>

      <div className="trap-signal-grid">
        {escalationSignals.map((signal) => {
          const active = checked.has(signal.id)
          return (
            <button
              type="button"
              role="checkbox"
              aria-checked={active}
              className={active ? 'is-active' : ''}
              key={signal.id}
              onClick={() => toggleSignal(signal.id)}
            >
              <span className="trap-signal-check"><Check size={14} /></span>
              <span className="trap-signal-copy">
                <small>{signal.group} / L{signal.tier + 1}</small>
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

export function EscalationTrapDossier() {
  return (
    <section className="trap-section" id="escalation-trap">
      <div className="trap-cover">
        <div className="trap-cover-shade" />
        <div className="shell trap-cover-content">
          <div className="trap-cover-copy">
            <div className="eyebrow eyebrow-light">地缘政治专题 / ESCALATION TRAP</div>
            <h2>升级陷阱</h2>
            <h3>有限行动，如何变成无法退出的战争</h3>
            <p>
              Robert A. Pape 的新框架追问一个反直觉问题：为什么控制冲突的努力，反而会让冲突更难控制？对石油投资者而言，答案决定了风险溢价何时会变成真实供应损失。
            </p>
            <a href="#trap-mechanism" className="button button-primary">
              进入机制链
              <ArrowDown size={17} />
            </a>
          </div>

          <div className="trap-cover-thesis">
            <span>核心公式</span>
            <div><strong>FAILURE</strong><i /><strong>FEAR</strong><i /><strong>ESCALATION</strong></div>
            <blockquote>失败产生恐惧，恐惧推动升级；每一步都在恢复控制，却继续收窄退出选项。</blockquote>
            <small>Robert A. Pape / Escalation Trap Project, 2026</small>
          </div>
        </div>
      </div>

      <div className="trap-principles">
        <div className="shell trap-principle-grid">
          <div><span>01</span><strong>不是线性加码</strong><p>关键变化发生在结构性门槛被跨越时。</p></div>
          <div><span>02</span><strong>不是非理性失控</strong><p>局部理性的连续选择，也能形成集体陷阱。</p></div>
          <div><span>03</span><strong>不是只看言辞</strong><p>部署、承诺与物理损失比口号更难逆转。</p></div>
        </div>
      </div>

      <div className="shell trap-content">
        <article className="trap-chapter" id="trap-mechanism">
          <div className="trap-chapter-head">
            <span>01</span>
            <div>
              <div className="eyebrow">核心机制</div>
              <h3>升级不是一条直线，<br />而是一组自我加深的选择。</h3>
            </div>
            <p>
              陷阱不在某一步骤本身，而在行动、未完成目标、对手反应和信誉承诺之间形成的反馈回路。
            </p>
          </div>
          <MechanismExplorer />
        </article>

        <article className="trap-chapter" id="trap-stages">
          <div className="trap-chapter-head">
            <span>02</span>
            <div>
              <div className="eyebrow">三阶段模型</div>
              <h3>精确打击的成功，<br />可能成为下一阶段的入口。</h3>
            </div>
            <p>
              Pape 将升级风险拆成三个跨门槛阶段。分析重点不是武器是否命中，而是政治目标是否可验证地完成。
            </p>
          </div>
          <StageModel />
        </article>

        <article className="trap-chapter" id="trap-threshold">
          <div className="trap-chapter-head">
            <span>03</span>
            <div>
              <div className="eyebrow">石油供应相变</div>
              <h3>干扰延迟流动，<br />破坏移除能力。</h3>
            </div>
            <p>
              油轮等待与设施损毁不能放在同一个“供应中断”标题里。前者主要改变交付时间，后者直接改写可用产能。
            </p>
          </div>
          <SupplyThreshold />
        </article>

        <article className="trap-chapter" id="trap-signals">
          <div className="trap-chapter-head">
            <span>04</span>
            <div>
              <div className="eyebrow">硬信号判读器</div>
              <h3>言辞可以撤回，<br />承诺会锁定路径。</h3>
            </div>
            <p>
              把已经可靠确认的信号放进同一证据阶梯。层级越高，分析越应该从概率叙事转向能力、成本与修复周期。
            </p>
          </div>
          <SignalReader />
        </article>

        <article className="trap-chapter" id="trap-offramps">
          <div className="trap-chapter-head">
            <span>05</span>
            <div>
              <div className="eyebrow">退出通道</div>
              <h3>真正的降级，<br />必须改变行动者的约束。</h3>
            </div>
            <p>
              停火声明不一定拆除陷阱。可信的退出安排需要同时处理核查、目标、部署与政治信誉。
            </p>
          </div>
          <div className="trap-offramps">
            {exitRamps.map((ramp) => (
              <div key={ramp.number}>
                <span>{ramp.number}</span>
                <Wrench size={19} />
                <h4>{ramp.title}</h4>
                <p>{ramp.body}</p>
                <small>{ramp.test}</small>
              </div>
            ))}
          </div>
        </article>

        <article className="trap-sources">
          <div className="trap-source-intro">
            <div className="eyebrow">理论边界</div>
            <h3>把它当作观察框架，<br />不是自动预测器。</h3>
            <p>
              “升级陷阱”是 Pape 于 2026 年推出的公共研究项目，建立在其空中力量与强制外交研究之上，但目前仍是持续发展的分析框架。它能组织问题，不能替代个案证据，也不能推出唯一的油价路径。
            </p>
            <div className="trap-boundary-note">
              <Info size={17} />
              <span>页面中的机制归纳、证据层级与供应阈值属于教学框架；设施损失与流量结论仍需回到卫星、运营方、航运和能源机构数据核验。</span>
            </div>
          </div>
          <div className="trap-source-list">
            {escalationSources.map((source) => (
              <a href={source.url} target="_blank" rel="noreferrer" key={source.url}>
                <span>{source.date}</span>
                <strong>{source.label}</strong>
                <ExternalLink size={15} />
              </a>
            ))}
          </div>
          <a className="trap-method-link" href="#sources">
            查看全站方法与来源
            <CircleDot size={15} />
          </a>
        </article>

        <div className="trap-reading-rule">
          <ShieldAlert size={20} />
          <p><strong>投资阅读规则</strong>先判断升级走到哪一层，再判断石油系统处于干扰还是破坏；最后才把缺口、持续时间和缓冲能力翻译成价格。</p>
        </div>
      </div>
    </section>
  )
}
