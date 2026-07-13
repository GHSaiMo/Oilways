import {
  Anchor,
  BarChart3,
  CircleDollarSign,
  Factory,
  FlaskConical,
  Fuel,
  Globe2,
  Landmark,
  PackageOpen,
  Pickaxe,
  Ship,
  ShoppingBasket,
  TrendingUp,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type JourneyChapter = {
  id: string
  number: string
  title: string
  kicker: string
  summary: string
  question: string
  concepts: string[]
  icon: LucideIcon
}

export type Chokepoint = {
  id: string
  name: string
  region: string
  coordinates: [number, number]
  flow: string
  share: string
  year: string
  description: string
  chain: string[]
  sourceId: string
}

export const headlineStats = [
  {
    value: '20.9',
    unit: '百万桶 / 日',
    label: '2023 年经霍尔木兹海峡运输的石油',
  },
  {
    value: '≈20%',
    unit: '全球消费量',
    label: '每天经过这条海峡的石油占比',
  },
  {
    value: '2×2',
    unit: '海里航道',
    label: '进出航道各宽约 2 海里',
  },
]

export const journeyChapters: JourneyChapter[] = [
  {
    id: 'origin',
    number: '01',
    title: '形成与发现',
    kicker: '地下几千米，时间以百万年计算',
    summary:
      '石油不是一个均质液体。地质条件决定储层质量，也决定一桶油最终要付出多少资本和技术代价。',
    question: '为什么两个油田都叫“油田”，成本和价值却完全不同？',
    concepts: ['烃源岩', '储层', 'API 度', '含硫量', '储采比'],
    icon: Pickaxe,
  },
  {
    id: 'production',
    number: '02',
    title: '开采与成本',
    kicker: '发现油，不等于经济地采出油',
    summary:
      '常规油、页岩油、深水油和油砂有不同的递减曲线、资本节奏与盈亏平衡点，这塑造了供给弹性。',
    question: '油价上涨后，为什么新增供给不能立刻出现？',
    concepts: ['举升成本', '完整周期成本', '递减率', '资本开支', '剩余产能'],
    icon: BarChart3,
  },
  {
    id: 'transport',
    number: '03',
    title: '运输与咽喉',
    kicker: '油田分散，航线高度集中',
    summary:
      '管道、港口、油轮和海峡把区域油田连接成全球市场。霍尔木兹的重要性，来自流量集中与替代路线有限。',
    question: '一条海峡出问题，为什么远在中国的资产也会波动？',
    concepts: ['VLCC', '运费', '保险', '制裁', '绕航成本'],
    icon: Ship,
  },
  {
    id: 'refining',
    number: '04',
    title: '炼化与产品',
    kicker: '原油不能直接成为现代生活',
    summary:
      '炼厂按不同沸点和分子结构拆分、重组原油。汽油、柴油、航煤、石脑油与化工原料由此进入日常生活。',
    question: '为什么原油跌价，汽油和化工品不一定同步下跌？',
    concepts: ['常减压蒸馏', '裂化', '炼厂复杂度', '裂解价差', '成品油收率'],
    icon: Factory,
  },
  {
    id: 'pricing',
    number: '05',
    title: '交易与定价',
    kicker: '世界上不存在一个唯一的“油价”',
    summary:
      'Brent、WTI 与 Dubai/Oman 是不同地区的定价基准。现货差异、期货曲线和库存共同表达市场的稀缺程度。',
    question: '新闻里的油价，究竟是哪一种油、哪个月份的价格？',
    concepts: ['基准油', '升贴水', '期货曲线', 'Contango', 'Backwardation'],
    icon: CircleDollarSign,
  },
  {
    id: 'macro',
    number: '06',
    title: '经济与投资',
    kicker: '从一桶油，进入企业利润与资产价格',
    summary:
      '油价冲击通过交通、化工和预期进入通胀，再影响利率、汇率、行业利润与估值。方向并不总是线性的。',
    question: '油价上涨时，买入所有石油公司为什么可能是错的？',
    concepts: ['CPI/PPI', '贸易条件', '利润敏感度', '财政盈亏平衡', '估值周期'],
    icon: TrendingUp,
  },
]

export const lifeUses = [
  { label: '通勤与物流', detail: '汽油、柴油、润滑油', icon: Fuel },
  { label: '航空与航运', detail: '航煤、船用燃料', icon: Ship },
  { label: '农业与食品', detail: '农机、化肥、冷链、包装', icon: ShoppingBasket },
  { label: '医药与材料', detail: '溶剂、聚合物、医疗耗材', icon: FlaskConical },
  { label: '城市与建筑', detail: '沥青、涂料、保温材料', icon: Landmark },
  { label: '消费品', detail: '纤维、清洁剂、电子外壳', icon: PackageOpen },
]

export const chokepoints: Chokepoint[] = [
  {
    id: 'hormuz',
    name: '霍尔木兹海峡',
    region: '波斯湾—阿曼湾',
    coordinates: [56.3, 26.6],
    flow: '20.9 百万桶 / 日',
    share: '约占全球石油液体消费的 20%',
    year: '2023',
    description:
      '全球最重要的石油咽喉。沙特、伊拉克、阿联酋、科威特、伊朗和卡塔尔的大量出口由此进入亚洲市场。',
    chain: ['海运受阻', '可替代管道有限', '现货升水扩大', '进口成本上升'],
    sourceId: 'eia-chokepoints',
  },
  {
    id: 'malacca',
    name: '马六甲海峡',
    region: '印度洋—南海',
    coordinates: [101.1, 2.8],
    flow: '23.7 百万桶 / 日',
    share: '亚洲进口需求的关键入口',
    year: '2023',
    description:
      '连接印度洋与太平洋的最短主航路。对中国、日本、韩国及东南亚的原油和成品油运输尤为重要。',
    chain: ['航路拥堵或中断', '绕行巽他海峡', '航程与运费增加', '亚洲到岸价上升'],
    sourceId: 'eia-chokepoints',
  },
  {
    id: 'bab-el-mandeb',
    name: '曼德海峡',
    region: '红海—亚丁湾',
    coordinates: [43.3, 12.6],
    flow: '8.6 百万桶 / 日',
    share: '苏伊士航线南端入口',
    year: '2023 上半年',
    description:
      '它与苏伊士运河构成一条系统。受阻时，欧洲与亚洲之间的油轮往往要绕行好望角。',
    chain: ['红海风险上升', '油轮绕行', '吨海里需求增加', '运费与交付时间上升'],
    sourceId: 'eia-chokepoints',
  },
  {
    id: 'suez',
    name: '苏伊士运河与 SUMED',
    region: '红海—地中海',
    coordinates: [32.4, 30.2],
    flow: '9.2 百万桶 / 日',
    share: '欧洲—亚洲能源捷径',
    year: '2023 上半年',
    description:
      '运河与平行的 SUMED 管道共同连接红海和地中海，显著缩短中东至欧洲的航程。',
    chain: ['通行能力下降', '好望角绕行', '库存占用增加', '区域价差改变'],
    sourceId: 'eia-chokepoints',
  },
  {
    id: 'turkish',
    name: '土耳其海峡',
    region: '黑海—地中海',
    coordinates: [29.0, 41.1],
    flow: '3.4 百万桶 / 日',
    share: '黑海出口通道',
    year: '2023 上半年',
    description:
      '博斯普鲁斯和达达尼尔海峡承接俄罗斯及里海区域经黑海出口的原油与成品油。',
    chain: ['黑海出口受限', '区域供给收紧', '地中海价差变化', '贸易流重排'],
    sourceId: 'eia-chokepoints',
  },
]

export const investorLinks = [
  {
    step: '物理冲击',
    title: '先数桶，不先猜价格',
    body: '中断多少流量？持续多久？有多少管道、库存与剩余产能能够填补？',
    icon: Anchor,
  },
  {
    step: '价格形成',
    title: '再看弹性与期限结构',
    body: '短期需求难以改变，微小缺口也可能需要较大的价格变化才能重新平衡。',
    icon: TrendingUp,
  },
  {
    step: '宏观传导',
    title: '区分一次性冲击与持续通胀',
    body: '观察燃料、运输和化工成本能否进入核心价格与工资预期。',
    icon: Globe2,
  },
  {
    step: '资产映射',
    title: '最后才是行业与公司',
    body: '上游、炼化、油服与航空面对的价格变量不同，不能用“油价涨跌”一把尺子判断。',
    icon: CircleDollarSign,
  },
]

export const companyArchetypes = [
  {
    name: '中国海油 / CNOOC',
    markets: 'A + H',
    type: '海上上游',
    sensitivity: '较高',
    focus: '实现油价、桶油成本、产量增长、资本开支',
  },
  {
    name: '中国石油 / PetroChina',
    markets: 'A + H',
    type: '综合一体化',
    sensitivity: '中等',
    focus: '上游利润、天然气、炼化销售与国内定价机制',
  },
  {
    name: '中国石化 / Sinopec',
    markets: 'A + H',
    type: '炼化销售偏重',
    sensitivity: '复杂',
    focus: '裂解价差、成品油机制、化工景气与库存损益',
  },
  {
    name: 'ExxonMobil / Chevron',
    markets: '美股',
    type: '全球综合油企',
    sensitivity: '中等',
    focus: '上游组合、炼化利润、回购分红与大型项目执行',
  },
  {
    name: 'Occidental',
    markets: '美股',
    type: '上游偏重',
    sensitivity: '较高',
    focus: '实现油价、产量、负债与自由现金流',
  },
  {
    name: 'SLB',
    markets: '美股',
    type: '油田服务',
    sensitivity: '滞后',
    focus: '全球勘探开发资本开支、订单与服务价格',
  },
]

export const curriculum = [
  ['00', '石油就在身边', '从衣食住行理解不可替代性'],
  ['01', '一桶油的诞生', '地质、品级、储量与开采'],
  ['02', '全球流动系统', '油轮、管道、库存与能源咽喉'],
  ['03', '炼厂如何工作', '产品收率、裂解价差与区域错配'],
  ['04', '油价如何形成', '基准油、现货、期货与期限结构'],
  ['05', '供需为什么失衡', '弹性、OPEC+、页岩油与周期'],
  ['06', '石油重塑历史', '危机、战争、制裁与美元体系'],
  ['07', '从油价到资产', '通胀、行业利润与 A/H/美股框架'],
]

export const sources = [
  {
    id: 'eia-chokepoints',
    publisher: 'U.S. Energy Information Administration',
    title: 'World Oil Transit Chokepoints',
    year: '2024',
    url: 'https://www.eia.gov/international/analysis/special-topics/World_Oil_Transit_Chokepoints',
    note: '咽喉流量、霍尔木兹占比与替代路线基础口径',
  },
  {
    id: 'ei-review',
    publisher: 'Energy Institute',
    title: 'Statistical Review of World Energy 2024',
    year: '2024',
    url: 'https://www.energyinst.org/statistical-review',
    note: '全球产量、消费、储量和长期历史序列',
  },
  {
    id: 'iea-oil',
    publisher: 'International Energy Agency',
    title: 'Oil Market Report, June 2026',
    year: '2026-06',
    url: 'https://www.iea.org/reports/oil-market-report-june-2026',
    note: '全球供需、库存与市场平衡的交叉验证',
  },
  {
    id: 'dallas-fed',
    publisher: 'Federal Reserve Bank of Dallas',
    title: 'Dallas Fed Energy Survey',
    year: '季度',
    url: 'https://www.dallasfed.org/research/surveys/des',
    note: '美国油气企业活动、成本和盈亏平衡调查',
  },
  {
    id: 'imf-commodities',
    publisher: 'International Monetary Fund',
    title: 'Primary Commodity Prices',
    year: '月度',
    url: 'https://www.imf.org/en/Research/commodity-prices',
    note: '历史油价与宏观研究的公开数据入口',
  },
]
