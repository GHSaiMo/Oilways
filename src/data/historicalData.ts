export type AnnualOilData = {
  year: number
  supply: number
  demand: number
  oecdInventory: number
  opecSpareCapacity: number
  wti: number
  usCrudeProduction: number
}

export type CompanyMetric = {
  label: string
  value: string
  unit: string
  note: string
}

export type CompanySnapshot = {
  id: string
  name: string
  market: string
  role: string
  year: string
  thesis: string
  metrics: CompanyMetric[]
  watch: string
  sourceLabel: string
  sourceUrl: string
}

export const annualOilData: AnnualOilData[] = [
  { year: 2010, supply: 87.36, demand: 88.84, oecdInventory: 2664, opecSpareCapacity: 5.01, wti: 79.50, usCrudeProduction: 5.484 },
  { year: 2011, supply: 88.52, demand: 89.59, oecdInventory: 2584, opecSpareCapacity: 3.56, wti: 94.90, usCrudeProduction: 5.674 },
  { year: 2012, supply: 90.79, demand: 90.90, oecdInventory: 2640, opecSpareCapacity: 2.63, wti: 94.08, usCrudeProduction: 6.524 },
  { year: 2013, supply: 91.36, demand: 92.47, oecdInventory: 2545, opecSpareCapacity: 2.73, wti: 97.98, usCrudeProduction: 7.495 },
  { year: 2014, supply: 93.93, demand: 94.03, oecdInventory: 2689, opecSpareCapacity: 2.47, wti: 93.17, usCrudeProduction: 8.781 },
  { year: 2015, supply: 96.63, demand: 95.84, oecdInventory: 2972, opecSpareCapacity: 1.74, wti: 48.67, usCrudeProduction: 9.433 },
  { year: 2016, supply: 97.09, demand: 97.23, oecdInventory: 2994, opecSpareCapacity: 1.42, wti: 43.33, usCrudeProduction: 8.852 },
  { year: 2017, supply: 98.24, demand: 99.59, oecdInventory: 2848, opecSpareCapacity: 2.09, wti: 50.79, usCrudeProduction: 9.361 },
  { year: 2018, supply: 100.84, demand: 100.07, oecdInventory: 2859, opecSpareCapacity: 1.31, wti: 65.07, usCrudeProduction: 10.953 },
  { year: 2019, supply: 100.50, demand: 100.74, oecdInventory: 2877, opecSpareCapacity: 1.95, wti: 56.99, usCrudeProduction: 12.315 },
  { year: 2020, supply: 94.01, demand: 91.42, oecdInventory: 3029, opecSpareCapacity: 4.04, wti: 39.17, usCrudeProduction: 11.336 },
  { year: 2021, supply: 95.68, demand: 97.43, oecdInventory: 2643, opecSpareCapacity: 3.77, wti: 68.21, usCrudeProduction: 11.311 },
  { year: 2022, supply: 100.42, demand: 99.76, oecdInventory: 2774, opecSpareCapacity: 1.48, wti: 94.91, usCrudeProduction: 12.004 },
  { year: 2023, supply: 102.45, demand: 101.44, oecdInventory: 2769, opecSpareCapacity: 2.54, wti: 77.58, usCrudeProduction: 12.943 },
  { year: 2024, supply: 103.07, demand: 102.80, oecdInventory: 2744, opecSpareCapacity: 3.56, wti: 76.60, usCrudeProduction: 13.235 },
  { year: 2025, supply: 106.12, demand: 104.00, oecdInventory: 2829, opecSpareCapacity: 3.43, wti: 65.40, usCrudeProduction: 13.586 },
]

export const companySnapshots: CompanySnapshot[] = [
  {
    id: 'cnooc',
    name: '中国海油',
    market: 'A + H',
    role: '海上上游',
    year: '2024年报',
    thesis: '上游公司的核心不是油田数量，而是产量、实现价格与成本共同形成的现金流弹性。',
    metrics: [
      { label: '净产量', value: '726.8', unit: '百万桶油当量', note: '决定收入端的数量基础' },
      { label: '桶油完全成本', value: '28.52', unit: '美元 / 桶油当量', note: '观察成本控制与抗跌能力' },
      { label: '归母净利润', value: '137.9', unit: '十亿元人民币', note: '仍需结合油价与汇率理解' },
    ],
    watch: '实现油价、产量增长、桶油成本、资本开支和储量寿命。',
    sourceLabel: 'CNOOC Limited / Investor Relations',
    sourceUrl: 'https://www.cnoocltd.com/english/investorrelations/',
  },
  {
    id: 'sinopec',
    name: '中国石化',
    market: 'A + H',
    role: '炼化销售偏重',
    year: '2024年报',
    thesis: '炼化公司的油价敏感度不是单向的，产品价差、库存损益和国内定价机制常常比油价方向更重要。',
    metrics: [
      { label: '油气当量产量', value: '515.35', unit: '百万桶油当量', note: '上游只是综合业务的一部分' },
      { label: '原油加工量', value: '252.69', unit: '百万吨', note: '连接原料采购与产品销售' },
      { label: '归母净利润', value: '50.33', unit: '十亿元人民币', note: '受炼油、营销和化工共同影响' },
    ],
    watch: '汽柴油裂解、化工价差、炼厂负荷、库存损益和成品油机制。',
    sourceLabel: 'Sinopec Corp. / Annual Reports',
    sourceUrl: 'http://www.sinopec.com/listco/en/000/000/066/66242.shtml',
  },
  {
    id: 'exxon',
    name: 'ExxonMobil',
    market: '美股',
    role: '全球综合油企',
    year: '2024年报',
    thesis: '综合油企同时拥有上游、炼化和化工，油价上涨的上游收益可能被下游利润变化部分对冲。',
    metrics: [
      { label: '油气产量', value: '4.3', unit: '百万桶油当量 / 日', note: '组合规模与项目兑现的结果' },
      { label: '全年盈利', value: '33.7', unit: '十亿美元', note: '跨上游、能源产品与化工' },
      { label: '资本开支', value: '27.6', unit: '十亿美元', note: '决定未来产量与资产质量' },
    ],
    watch: '圭亚那与二叠纪产量、炼化利润、资本开支、回购和资产回报。',
    sourceLabel: 'ExxonMobil / 2024 Annual Report',
    sourceUrl: 'https://d1io3yog0oux5.cloudfront.net/_049f4bfce466226b8dbc5ba1fa8aa005/exxonmobil/files/553890/2024_FAFRs_-_Final.pdf',
  },
  {
    id: 'slb',
    name: 'SLB',
    market: '美股',
    role: '油田服务',
    year: '2024年报',
    thesis: '油服公司并不直接卖油，它赚取的是客户资本开支、设备利用率和技术服务价格。',
    metrics: [
      { label: '全年收入', value: '36.29', unit: '十亿美元', note: '反映全球油气活动与业务组合' },
      { label: '调整后 EBITDA', value: '9.07', unit: '十亿美元', note: '观察服务价格与经营杠杆' },
      { label: '自由现金流', value: '4.00', unit: '十亿美元', note: '订单最终转化为现金的质量' },
    ],
    watch: '国际油公司资本开支、海上项目、在手订单、数字业务与设备利用率。',
    sourceLabel: 'SLB / Investor Center',
    sourceUrl: 'https://investorcenter.slb.com/',
  },
]

export const historicalDataSources = [
  {
    title: 'EIA / Short-Term Energy Outlook Data Browser',
    use: '2010—2025全球石油供应、消费、OECD商业库存、OPEC剩余产能与WTI年度均价',
    url: 'https://www.eia.gov/outlooks/steo/data/browser/',
  },
  {
    title: 'EIA / U.S. Field Production of Crude Oil',
    use: '2010—2025美国原油年均产量，单位为千桶/日后换算为mb/d',
    url: 'https://www.eia.gov/dnav/pet/hist/LeafHandler.ashx?n=PET&s=MCRFPUS2&f=A',
  },
  {
    title: 'EIA / STEO July 2026',
    use: '年度序列的最新历史数据版本、定义和估算边界',
    url: 'https://www.eia.gov/outlooks/steo/',
  },
]
