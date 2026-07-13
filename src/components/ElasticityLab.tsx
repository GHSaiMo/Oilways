import { Calculator, Info, RotateCcw, ShieldAlert } from 'lucide-react'
import { useMemo, useState } from 'react'

const HORMUZ_FLOW = 20.9
const GLOBAL_DEMAND = 102.2

function formatNumber(value: number, digits = 1) {
  return new Intl.NumberFormat('zh-CN', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value)
}

export function ElasticityLab() {
  const [interruption, setInterruption] = useState(35)
  const [reroute, setReroute] = useState(3)
  const [elasticity, setElasticity] = useState(0.1)

  const result = useMemo(() => {
    const affected = HORMUZ_FLOW * (interruption / 100)
    const netGap = Math.max(0, affected - reroute)
    const demandShare = (netGap / GLOBAL_DEMAND) * 100
    const theoreticalPriceMove = demandShare / elasticity
    return { affected, netGap, demandShare, theoreticalPriceMove }
  }, [elasticity, interruption, reroute])

  const reset = () => {
    setInterruption(35)
    setReroute(3)
    setElasticity(0.1)
  }

  return (
    <section className="lab-section" id="elasticity">
      <div className="shell">
        <div className="section-heading section-heading-light">
          <div>
            <div className="eyebrow eyebrow-light">05 / 价格弹性实验室</div>
            <h2>短期少掉一桶油，<br />要涨多少才能平衡？</h2>
          </div>
          <p>
            油价并不按“缺多少就涨多少”运动。短期需求难以压缩，供给也无法迅速增加，因此小幅缺口可能对应大幅价格调整。
          </p>
        </div>

        <div className="lab-workbench">
          <div className="lab-controls">
            <div className="lab-control-head">
              <div>
                <Calculator size={20} />
                <strong>霍尔木兹中断情景</strong>
              </div>
              <button type="button" onClick={reset} aria-label="重置参数" title="重置参数">
                <RotateCcw size={17} />
              </button>
            </div>

            <label className="range-control">
              <span><strong>通行受阻比例</strong><b>{interruption}%</b></span>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={interruption}
                onChange={(event) => setInterruption(Number(event.target.value))}
              />
              <small><i>0%</i><i>局部受阻</i><i>完全中断</i></small>
            </label>

            <label className="range-control">
              <span><strong>管道与替代路线分流</strong><b>{formatNumber(reroute)} mb/d</b></span>
              <input
                type="range"
                min="0"
                max="6"
                step="0.5"
                value={reroute}
                onChange={(event) => setReroute(Number(event.target.value))}
              />
              <small><i>无分流</i><i>部分缓冲</i><i>乐观上限</i></small>
            </label>

            <label className="range-control">
              <span><strong>短期需求价格弹性</strong><b>−{elasticity.toFixed(2)}</b></span>
              <input
                type="range"
                min="0.05"
                max="0.25"
                step="0.01"
                value={elasticity}
                onChange={(event) => setElasticity(Number(event.target.value))}
              />
              <small><i>更刚性</i><i>基准 −0.10</i><i>更灵活</i></small>
            </label>
          </div>

          <div className="lab-output">
            <div className="output-label">教学模型结果</div>
            <div className="output-primary">
              <span>理论再平衡价格压力</span>
              <strong>
                {result.theoreticalPriceMove >= 200
                  ? '>200%'
                  : `+${formatNumber(result.theoreticalPriceMove, 0)}%`}
              </strong>
            </div>
            <div className="output-grid">
              <div><span>受影响流量</span><strong>{formatNumber(result.affected)} mb/d</strong></div>
              <div><span>净供应缺口</span><strong>{formatNumber(result.netGap)} mb/d</strong></div>
              <div><span>占全球需求</span><strong>{formatNumber(result.demandShare)}%</strong></div>
            </div>
            <div className="formula">
              <span>一阶近似</span>
              <code>价格变化 ≈ 净供应缺口率 ÷ |需求价格弹性|</code>
            </div>
            <div className="lab-warning">
              <ShieldAlert size={18} />
              <p>
                这不是油价预测。库存释放、剩余产能、需求破坏、政策干预、市场预期和时间跨度都会改变实际结果。极端情景下，线性弹性模型尤其容易失真。
              </p>
            </div>
          </div>
        </div>

        <div className="lab-note">
          <Info size={16} />
          <p>
            默认基线：霍尔木兹流量 20.9 mb/d、2023 年全球石油消费约 102.2 mb/d。弹性参数用于理解敏感度，可在“深读”章节继续比较不同研究估计。
          </p>
        </div>
      </div>
    </section>
  )
}
