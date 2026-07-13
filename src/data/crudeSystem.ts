export type CrudeGrade = {
  id: string
  name: string
  origin: string
  api: number
  sulfur: number
  color: string
  marketRole: string
  refineryNote: string
}

export type RefineryConfig = {
  id: string
  name: string
  shortName: string
  conversion: number
  capex: string
  hydrogen: string
  capability: string
  limit: string
}

export type Benchmark = {
  id: string
  name: string
  shortName: string
  region: string
  quality: string
  pricingPoint: string
  mechanism: string
  represents: string
  blindSpot: string
  defaultDifferential: number
}

export type OilCrisis = {
  id: string
  year: string
  name: string
  type: string
  oneLine: string
  trigger: string
  physical: string
  buffer: string
  priceAnchor: string
  macro: string
  lesson: string
  fingerprint: {
    supply: number
    demand: number
    logistics: number
    policy: number
  }
  sourceLabel: string
  sourceUrl: string
}

export const crudeGrades: CrudeGrade[] = [
  {
    id: 'wti',
    name: 'WTI',
    origin: '美国内陆 / 墨西哥湾体系',
    api: 39.6,
    sulfur: 0.24,
    color: '#ef6334',
    marketRole: '轻质低硫；NYMEX WTI 交割品质的核心参照。',
    refineryNote: '轻组分潜力高、脱硫负担低，简单炼厂也较容易生产交通燃料。',
  },
  {
    id: 'brent',
    name: 'Brent',
    origin: '北海 / 大西洋盆地',
    api: 38.3,
    sulfur: 0.37,
    color: '#d8ad4b',
    marketRole: '轻质低硫；全球海运原油最重要的价格锚之一。',
    refineryNote: '产品结构友好、海运可达性强，因此常被用作大西洋盆地参照。',
  },
  {
    id: 'murban',
    name: 'Murban',
    origin: '阿联酋阿布扎比',
    api: 40.5,
    sulfur: 0.79,
    color: '#44a3a8',
    marketRole: '轻质含硫；富查伊拉交割强化了亚洲市场的区域定价功能。',
    refineryNote: '轻组分丰富，但比典型轻甜油需要更强的脱硫处理。',
  },
  {
    id: 'oman',
    name: 'Oman',
    origin: '阿曼',
    api: 33,
    sulfur: 1.1,
    color: '#4d7d95',
    marketRole: '中质含硫；亚洲中东原油贸易的重要实货参照。',
    refineryNote: '适合拥有加氢与转化装置的复杂炼厂，品质贴近亚洲常见进料。',
  },
  {
    id: 'arab-light',
    name: 'Arab Light',
    origin: '沙特阿拉伯',
    api: 33,
    sulfur: 1.77,
    color: '#a17452',
    marketRole: '中质高硫；沙特官方售价体系中的代表性油种。',
    refineryNote: '需要更强脱硫能力；复杂炼厂可利用相对折价把重组分转成高价值产品。',
  },
  {
    id: 'mars',
    name: 'Mars',
    origin: '美国墨西哥湾海上',
    api: 28.9,
    sulfur: 1.93,
    color: '#8a6f87',
    marketRole: '中重质高硫；美国沿海复杂炼厂的重要代表进料。',
    refineryNote: '常减压后重组分较多，需要催化裂化、焦化和加氢装置提升价值。',
  },
  {
    id: 'maya',
    name: 'Maya',
    origin: '墨西哥',
    api: 21.8,
    sulfur: 3.33,
    color: '#b14b43',
    marketRole: '重质高硫；重油折价与复杂炼厂利润的典型观察对象。',
    refineryNote: '简单炼厂会产生大量低价值渣油；深度转化炼厂才可能充分兑现折价。',
  },
]

export const refineryConfigs: RefineryConfig[] = [
  {
    id: 'simple',
    name: '简单常减压炼厂',
    shortName: '分离为主',
    conversion: 0,
    capex: '低',
    hydrogen: '低',
    capability: '完成蒸馏、基础处理与调和，轻质原油更容易直接形成高价值产品。',
    limit: '面对重质高硫油时，低价值渣油多、脱硫能力不足，便宜原油未必真便宜。',
  },
  {
    id: 'conversion',
    name: '催化裂化型炼厂',
    shortName: '中度转化',
    conversion: 10,
    capex: '中',
    hydrogen: '中',
    capability: '把一部分重瓦斯油转成汽油、柴油和更轻的中间组分。',
    limit: '仍受原油含硫量、焦炭产率、装置负荷和成品规格约束。',
  },
  {
    id: 'deep',
    name: '加氢裂化 / 焦化型炼厂',
    shortName: '深度转化',
    conversion: 20,
    capex: '高',
    hydrogen: '高',
    capability: '能进一步处理重油和渣油，提高交通燃料收率，并承接更重、更酸的折价原油。',
    limit: '资本、氢气、能耗、检修和碳排成本更高，利润取决于轻重油价差与产品裂解价差。',
  },
]

export const refinerySteps = [
  {
    number: '01',
    title: '分离 Separation',
    body: '按沸点把原油分成气体、石脑油、煤油、柴油、瓦斯油和渣油。',
  },
  {
    number: '02',
    title: '转化 Conversion',
    body: '用裂化、加氢裂化、焦化等工艺把大分子重组分变成更轻、更值钱的产品。',
  },
  {
    number: '03',
    title: '处理 Treatment',
    body: '脱硫、脱氮并调和不同物流，使汽柴油、航煤等满足品质和环保标准。',
  },
]

export const benchmarks: Benchmark[] = [
  {
    id: 'wti',
    name: 'West Texas Intermediate',
    shortName: 'WTI',
    region: '北美内陆与美国出口体系',
    quality: '轻质低硫',
    pricingPoint: '美国俄克拉荷马州 Cushing',
    mechanism: 'NYMEX 实物交割合约；临近到期者需要安排交割或平仓。',
    represents: '美国内陆供需、库欣库存、管道流向以及美国出口经济性。',
    blindSpot: '库欣仓储和合约到期机制可能使近月价格偏离全球海运市场，2020 年负油价是极端案例。',
    defaultDifferential: 0,
  },
  {
    id: 'brent',
    name: 'Brent Complex',
    shortName: 'Brent',
    region: '北海、大西洋盆地与全球海运',
    quality: '轻质低硫基准体系',
    pricingPoint: '北海现货体系；期货在 ICE 交易',
    mechanism: '期货、远期与 Dated Brent 实货评估相互连接；体系会随可交割流动性调整。',
    represents: '全球海运原油的边际价格，尤其适合观察大西洋盆地与跨区域套利。',
    blindSpot: '它不是某一桶固定品质的油；理解 Brent 需要区分期货、远期和 Dated Brent。',
    defaultDifferential: 0.8,
  },
  {
    id: 'dubai-oman',
    name: 'Dubai / Oman',
    shortName: 'Dubai/Oman',
    region: '中东出口与亚洲进口市场',
    quality: '中质含硫',
    pricingPoint: '阿拉伯湾与阿曼实货体系',
    mechanism: '现货评估与 Oman 相关实物交割工具共同构成亚洲含硫原油价格锚。',
    represents: '亚洲炼厂采购中东酸油时的区域稀缺度、品质差和航运条件。',
    blindSpot: '不能直接用同一美元价格与轻甜 Brent 比较，必须同时看品质与 Brent-Dubai EFS。',
    defaultDifferential: -2,
  },
  {
    id: 'murban',
    name: 'Murban Crude',
    shortName: 'Murban',
    region: '阿联酋与亚洲轻质原油市场',
    quality: '轻质含硫',
    pricingPoint: '阿联酋富查伊拉',
    mechanism: 'ICE Futures Abu Dhabi 实物交割，交割点位于霍尔木兹海峡之外。',
    represents: '阿布扎比轻质原油和亚洲轻质含硫市场，也体现富查伊拉的战略位置。',
    blindSpot: '区域代表性和流动性仍不能完全替代 Brent 或 Dubai/Oman 的全球定价角色。',
    defaultDifferential: -0.5,
  },
]

export const oilCrises: OilCrisis[] = [
  {
    id: '1973',
    year: '1973—74',
    name: '阿拉伯石油禁运',
    type: '政治性供给冲击',
    oneLine: '不是油田消失，而是出口政策把石油变成地缘工具。',
    trigger: '第四次中东战争后，阿拉伯产油国减产并对部分支持以色列的国家实施禁运。',
    physical: '出口减少与配给并存，全球体系缺少战略库存和成熟协调机制。',
    buffer: '需求压缩、价格管制和临时配给；危机之后推动 IEA 与90天应急储备制度形成。',
    priceAnchor: '国际油价在数月内约增至危机前的四倍。',
    macro: '能源通胀、衰退和生产率冲击叠加，成为“滞胀”最经典的历史样本。',
    lesson: '政策性供应减少的宏观影响取决于当时的库存、需求弹性与货币环境。',
    fingerprint: { supply: 5, demand: 3, logistics: 2, policy: 5 },
    sourceLabel: 'Federal Reserve History / Oil Shock of 1973–74',
    sourceUrl: 'https://www.federalreservehistory.org/essays/oil-shock-of-1973-74',
  },
  {
    id: '1979',
    year: '1978—80',
    name: '伊朗革命与第二次石油冲击',
    type: '产量下降 + 恐慌补库',
    oneLine: '实际缺口之外，抢购和库存行为进一步放大了价格。',
    trigger: '伊朗革命导致产量和出口急降，随后两伊战争强化供应担忧。',
    physical: '全球供应下降，但价格涨幅远大于单纯流量缺口，预期和补库存是重要放大器。',
    buffer: '其他产油国增产、需求破坏和货币紧缩，最终压低石油消费强度。',
    priceAnchor: '1978—1980 年间国际原油价格大致翻倍。',
    macro: '高通胀促使主要央行采取更强紧缩，经济进入衰退。',
    lesson: '小缺口遇上低弹性和恐慌库存，可以产生非线性价格反应。',
    fingerprint: { supply: 4, demand: 4, logistics: 2, policy: 4 },
    sourceLabel: 'Federal Reserve History / Oil Shock of 1978–79',
    sourceUrl: 'https://www.federalreservehistory.org/essays/oil-shock-of-1978-79',
  },
  {
    id: '1990',
    year: '1990—91',
    name: '伊拉克入侵科威特',
    type: '战争性供给中断',
    oneLine: '大规模出口短暂消失，但闲置产能和战争进程限制了持续时间。',
    trigger: '伊拉克入侵科威特，两国产量退出市场，海湾战争风险快速上升。',
    physical: '约数百万桶/日供应受到影响，沙特等国增产成为关键替代。',
    buffer: 'OPEC 闲置产能、商业库存与后续军事结果共同压缩风险溢价。',
    priceAnchor: '油价在1990年下半年一度接近翻倍，随后快速回落。',
    macro: '冲击短于1970年代，但仍加重了美国等经济体的衰退压力。',
    lesson: '同样是战争，是否有海峡外闲置产能决定价格尾部能持续多久。',
    fingerprint: { supply: 4, demand: 2, logistics: 3, policy: 5 },
    sourceLabel: 'EIA / 25th Anniversary of the Oil Market Effects of Desert Storm',
    sourceUrl: 'https://www.eia.gov/todayinenergy/detail.php?id=24452',
  },
  {
    id: '2008',
    year: '2007—08',
    name: '超级周期见顶与金融危机',
    type: '需求繁荣 → 需求坍塌',
    oneLine: '油价先因需求、低闲置产能和预期冲顶，再随全球衰退崩塌。',
    trigger: '新兴市场需求增长、供应响应迟缓和低闲置产能推动价格上行。',
    physical: '不是单一断供事件；边际供需长期偏紧，随后金融危机令需求预期反转。',
    buffer: '高价格本身催生需求破坏；衰退使库存与闲置产能快速回升。',
    priceAnchor: 'WTI 2008年7月升至每桶145美元以上，年底跌至40美元附近。',
    macro: '先强化通胀压力，随后需求崩塌使通胀和利率预期急转。',
    lesson: '高油价不只来自供给中断，需求周期和宏观流动性同样能主导价格。',
    fingerprint: { supply: 2, demand: 5, logistics: 1, policy: 3 },
    sourceLabel: 'EIA / What drove crude oil prices in 2008?',
    sourceUrl: 'https://www.eia.gov/finance/markets/crudeoil/reports_presentations/crude.pdf',
  },
  {
    id: '2014',
    year: '2014—16',
    name: '页岩革命与OPEC不减产',
    type: '供给过剩冲击',
    oneLine: '石油危机也可以是“油太多”，损害的是产油国和高成本供给。',
    trigger: '美国页岩油快速增产，全球需求放缓，OPEC 选择保份额而非立即减产。',
    physical: '库存累积、现货宽松，边际桶从稀缺变成需要被迫退出。',
    buffer: '低价格刺激需求并压缩高成本资本开支，但供给调整存在滞后。',
    priceAnchor: 'Brent 从2014年中每桶约110美元跌至2016年初30美元附近。',
    macro: '进口国获得通胀缓解，资源国财政、能源投资和信用市场承压。',
    lesson: '研究油价必须同时观察资本开支周期和边际生产成本。',
    fingerprint: { supply: 5, demand: 3, logistics: 1, policy: 4 },
    sourceLabel: 'World Bank / The Great Plunge in Oil Prices',
    sourceUrl: 'https://www.worldbank.org/en/research/brief/the-great-plunge-in-oil-prices-causes-consequences-and-policy-responses',
  },
  {
    id: '2020',
    year: '2020',
    name: '疫情与WTI负油价',
    type: '需求坍塌 + 仓储约束',
    oneLine: '负的不是“所有石油”，而是特定地点、特定月份、临近交割的合约。',
    trigger: '疫情限制出行，石油需求骤降，而生产和运输无法同步停下。',
    physical: '库欣可用仓储变得稀缺，WTI 近月合约持有人难以安排实物交割。',
    buffer: '减产、浮仓、炼厂降负荷与需求恢复共同消化过剩。',
    priceAnchor: '2020年4月20日，WTI近月盘中最低约 −40.32 美元/桶；同期 Brent 仍为正值。',
    macro: '能源通胀骤降，但能源企业现金流、就业和信用风险急剧恶化。',
    lesson: '价格等于商品、时间、地点和交割条件，脱离合约机制谈“油价”会得出错误结论。',
    fingerprint: { supply: 2, demand: 5, logistics: 5, policy: 4 },
    sourceLabel: 'EIA / Low liquidity and limited available storage pushed WTI below zero',
    sourceUrl: 'https://www.eia.gov/todayinenergy/detail.php?id=43495',
  },
  {
    id: '2022',
    year: '2022',
    name: '俄乌冲突与全球贸易重排',
    type: '制裁 + 贸易流重构',
    oneLine: '很多桶没有消失，而是绕得更远、卖得更便宜、结算更复杂。',
    trigger: '俄乌冲突升级，欧美制裁、禁运与价格上限改变俄罗斯石油流向。',
    physical: '欧洲转向非俄供应，俄罗斯增加对亚洲销售，吨海里、保险与折价结构改变。',
    buffer: 'IEA成员释放应急库存，贸易重排和需求放缓共同缓冲供应风险。',
    priceAnchor: 'Brent 在2022年3月一度升至每桶120美元以上，随后随流量重组回落。',
    macro: '油气、电力和食品成本共同推高全球通胀，并改变主要央行政策路径。',
    lesson: '制裁冲击应区分“产量消失”和“贸易摩擦成本增加”。',
    fingerprint: { supply: 3, demand: 3, logistics: 5, policy: 5 },
    sourceLabel: 'IEA / Collective actions to release oil stocks in 2022',
    sourceUrl: 'https://www.iea.org/news/iea-confirms-individual-member-country-contributions-to-collective-action-to-release-oil-stocks-in-response-to-russia-s-invasion-of-ukraine',
  },
]

export const crudeSystemSources = [
  {
    title: 'EIA / Not all crude oil is the same',
    url: 'https://www.eia.gov/energyexplained/oil-and-petroleum-products/refining-crude-oil-inputs-and-outputs.php',
    use: 'API度、含硫量、轻重甜酸与炼厂价值',
  },
  {
    title: 'EIA / How crude oil is refined',
    url: 'https://www.eia.gov/energyexplained/oil-and-petroleum-products/refining-crude-oil-the-refining-process.php',
    use: '分离、转化、处理三步流程',
  },
  {
    title: 'EIA / Density and sulfur content of selected crude oils',
    url: 'https://www.eia.gov/todayinenergy/detail.php?id=7110',
    use: '代表油种的品质坐标与价值方向',
  },
  {
    title: 'CME Group / WTI Crude Oil',
    url: 'https://www.cmegroup.com/markets/energy/crude-oil/light-sweet-crude.html',
    use: 'WTI合约与交割机制',
  },
  {
    title: 'ICE / Brent Crude Futures',
    url: 'https://www.ice.com/products/219/Brent-Crude-Futures',
    use: 'Brent期货机制',
  },
  {
    title: 'ICE / Murban Crude Oil Futures',
    url: 'https://www.ice.com/products/6753549/Murban-Crude-Oil-Futures',
    use: 'Murban与富查伊拉实物交割',
  },
]
