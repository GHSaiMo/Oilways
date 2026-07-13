export type BalancePreset = {
  id: string
  label: string
  summary: string
  demandChange: number
  nonOpecSupply: number
  opecAction: number
  disruption: number
}

export type MarketRegime = {
  id: string
  label: string
  price: string
  summary: string
  confirmation: string[]
}

export type OutcomeTone = 'strong-up' | 'up' | 'mixed' | 'down' | 'strong-down'

export type IndustryOutcome = {
  tone: OutcomeTone
  label: string
  logic: string
}

export type IndustryExposure = {
  id: string
  name: string
  examples: string
  coreVariable: string
  watch: string
  outcomes: Record<string, IndustryOutcome>
}

export const balancePresets: BalancePreset[] = [
  {
    id: 'balanced',
    label: '大致平衡',
    summary: '需求和新增供给相互抵消，库存方向不明确。',
    demandChange: 1,
    nonOpecSupply: 1,
    opecAction: 0,
    disruption: 0,
  },
  {
    id: 'demand-boom',
    label: '需求超预期',
    summary: '交通、制造和补库同时偏强，供应响应落后。',
    demandChange: 2.2,
    nonOpecSupply: 0.9,
    opecAction: 0.3,
    disruption: 0,
  },
  {
    id: 'supply-shock',
    label: '供应中断',
    summary: '产量仍在地下，但制裁、战争或物流使可交付供应减少。',
    demandChange: 0.5,
    nonOpecSupply: 0.6,
    opecAction: 1,
    disruption: 3,
  },
  {
    id: 'oversupply',
    label: '供给过剩',
    summary: '非OPEC增产、OPEC放量，而需求没有同步吸收。',
    demandChange: 0.3,
    nonOpecSupply: 2,
    opecAction: 1.2,
    disruption: 0,
  },
  {
    id: 'recession',
    label: '需求衰退',
    summary: '出行、制造和化工需求同时下降，减产追不上需求坍塌。',
    demandChange: -2.8,
    nonOpecSupply: 0.6,
    opecAction: -1,
    disruption: 0,
  },
]

export const marketRegimes: MarketRegime[] = [
  {
    id: 'demand-led',
    label: '需求推动上涨',
    price: '油价上涨',
    summary: '经济和终端消费扩张，原油与成品油需求一起增强。',
    confirmation: ['商业库存下降', '裂解价差偏强', '炼厂开工上升', '运量与客流改善'],
  },
  {
    id: 'supply-led',
    label: '供应中断上涨',
    price: '油价急涨',
    summary: '地缘、制裁或物流中断推高原料和风险成本，需求未必强。',
    confirmation: ['现货升水扩大', '战争险与运费上升', '库存被动去化', '需求开始受损'],
  },
  {
    id: 'oversupply',
    label: '供给过剩下跌',
    price: '油价下跌',
    summary: '供应增长快于需求，低价刺激消费但压缩上游现金流。',
    confirmation: ['库存累积', '期货曲线Contango', '上游资本开支下修', '产品需求尚稳定'],
  },
  {
    id: 'demand-crash',
    label: '需求崩塌下跌',
    price: '油价暴跌',
    summary: '衰退或突发事件使原油与产品需求同时收缩，便宜原料也救不了销量。',
    confirmation: ['炼厂降负荷', '裂解价差走弱', '库存快速累积', '客流与货运下降'],
  },
]

export const industryExposures: IndustryExposure[] = [
  {
    id: 'upstream',
    name: '上游油气开采',
    examples: '中国海油、中国石油上游、国际综合油企',
    coreVariable: '实现油价 × 销量 − 桶油成本 − 税费',
    watch: '实现油价、产量、桶油成本、资本开支、储量替代率',
    outcomes: {
      'demand-led': { tone: 'strong-up', label: '强受益', logic: '价格和销量环境同时改善，现金流质量通常最好。' },
      'supply-led': { tone: 'strong-up', label: '条件受益', logic: '未受中断且能正常出口的生产商受益；受制裁或停产者未必。' },
      oversupply: { tone: 'strong-down', label: '强承压', logic: '实现油价下降，高成本项目和资本开支首先被压缩。' },
      'demand-crash': { tone: 'strong-down', label: '强承压', logic: '价格和销量预期同步恶化，并可能出现减值与停产。' },
    },
  },
  {
    id: 'refining',
    name: '炼油与销售',
    examples: '中国石化炼油、中国石油炼化、独立炼厂',
    coreVariable: '成品油收入 − 原油到厂成本 − 能源与运营成本',
    watch: '汽柴油裂解、库存损益、开工率、原油升贴水、成品油机制',
    outcomes: {
      'demand-led': { tone: 'up', label: '偏受益', logic: '产品需求和裂解价差通常较强，可覆盖原油上涨。' },
      'supply-led': { tone: 'mixed', label: '高度分化', logic: '库存收益可能短期抬升，但原油缺口、价差倒挂和降负荷会侵蚀利润。' },
      oversupply: { tone: 'up', label: '条件受益', logic: '若产品需求稳定，低原料成本和宽松采购环境有利于加工利润。' },
      'demand-crash': { tone: 'strong-down', label: '强承压', logic: '原油虽便宜，但产品滞销、库存贬值和降负荷同时发生。' },
    },
  },
  {
    id: 'chemicals',
    name: '石化与基础化工',
    examples: '乙烯、芳烃、聚烯烃、化纤与橡塑产业链',
    coreVariable: '化工品价格 − 石脑油/LPG等原料成本',
    watch: '石脑油裂解、产品库存、装置负荷、下游订单、煤化工替代',
    outcomes: {
      'demand-led': { tone: 'up', label: '偏受益', logic: '若终端需求同步扩张，产品涨价可能快于原料。' },
      'supply-led': { tone: 'strong-down', label: '强承压', logic: '原料先涨而终端需求未改善，价差最容易被压缩。' },
      oversupply: { tone: 'up', label: '条件受益', logic: '低原料成本有利，但前提是化工品自身没有过剩。' },
      'demand-crash': { tone: 'strong-down', label: '强承压', logic: '产品价格和开工率下跌，低油价难以抵消需求缺失。' },
    },
  },
  {
    id: 'services',
    name: '油田服务与装备',
    examples: '钻完井、地震勘探、海工装备、油田技术服务',
    coreVariable: '油企资本开支 → 订单 → 利用率与服务价格',
    watch: '全球勘探开发资本开支、在手订单、日费率、设备利用率',
    outcomes: {
      'demand-led': { tone: 'up', label: '滞后受益', logic: '持续高价提高油企预算，但订单通常滞后数个季度。' },
      'supply-led': { tone: 'mixed', label: '等待持续性', logic: '短期地缘溢价不会立刻变成钻井订单，长期高价才会推动投资。' },
      oversupply: { tone: 'down', label: '承压', logic: '油企削减资本开支，价格竞争和设备闲置增加。' },
      'demand-crash': { tone: 'strong-down', label: '强承压', logic: '客户迅速砍预算，订单取消和服务降价同时发生。' },
    },
  },
  {
    id: 'tankers',
    name: '油轮与能源航运',
    examples: '原油轮、成品油轮、能源物流',
    coreVariable: '运价 × 有效运力 × 吨海里 − 燃油与保险成本',
    watch: 'VLCC运价、吨海里、船队增速、等待时间、战争险',
    outcomes: {
      'demand-led': { tone: 'up', label: '偏受益', logic: '贸易量和船舶利用率提高，运价通常获得支撑。' },
      'supply-led': { tone: 'strong-up', label: '高波动受益', logic: '绕航和等待增加吨海里，但安全、保险和停航风险也显著上升。' },
      oversupply: { tone: 'mixed', label: '取决于出口量', logic: '更多低价油可能刺激远距离贸易，也可能伴随库存和运量放缓。' },
      'demand-crash': { tone: 'mixed', label: '先强后弱', logic: '浮仓需求可能短暂推高运价，随后贸易量下降占主导。' },
    },
  },
  {
    id: 'aviation',
    name: '航空与公路物流',
    examples: '航空公司、快递、公路货运与高燃油成本制造',
    coreVariable: '收入与运量 − 燃油成本 − 套保与附加费',
    watch: '航煤价格、燃油套保、客座率、货运量、燃油附加费',
    outcomes: {
      'demand-led': { tone: 'mixed', label: '收入成本竞赛', logic: '客流改善但燃油上涨，定价权决定谁跑得更快。' },
      'supply-led': { tone: 'strong-down', label: '强承压', logic: '需求没有改善而燃油急涨，利润最容易被直接挤压。' },
      oversupply: { tone: 'strong-up', label: '偏受益', logic: '若出行需求稳定，低燃油成本可直接改善利润。' },
      'demand-crash': { tone: 'strong-down', label: '强承压', logic: '燃油便宜但客流和货运量崩塌，收入损失更大。' },
    },
  },
]

export const marketMechanicsSources = [
  {
    title: 'IEA / Oil Market Report, June 2026',
    use: '全球需求、供应、炼厂和库存平衡框架',
    url: 'https://www.iea.org/reports/oil-market-report-june-2026',
  },
  {
    title: 'EIA / Short-Term Energy Outlook',
    use: '石油供需、价格和库存公开预测口径',
    url: 'https://www.eia.gov/outlooks/steo/',
  },
  {
    title: 'EIA / Weekly Petroleum Status Report',
    use: '美国商业库存、炼厂开工与产品库存',
    url: 'https://www.eia.gov/petroleum/supply/weekly/',
  },
  {
    title: 'CME Group / Contango and Backwardation',
    use: '期货曲线与库存、持有成本的关系',
    url: 'https://www.cmegroup.com/education/courses/introduction-to-crude-oil/contango-and-backwardation.html',
  },
  {
    title: 'CME Group / Introduction to Crack Spreads',
    use: '3-2-1裂解价差定义与单位换算',
    url: 'https://www.cmegroup.com/education/courses/introduction-to-energy/introduction-to-crack-spreads.html',
  },
  {
    title: 'EIA / Refining crude oil inputs and outputs',
    use: '炼厂产品、加工增益与收率边界',
    url: 'https://www.eia.gov/energyexplained/oil-and-petroleum-products/refining-crude-oil-inputs-and-outputs.php',
  },
]
