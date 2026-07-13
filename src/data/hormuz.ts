export type HormuzScenario = {
  id: string
  label: string
  duration: string
  description: string
  grossDisruption: number
  pipelineBypass: number
  emergencyStocks: number
  otherSupply: number
  demandResponse: number
  conclusion: string
}

export type PipelineRoute = {
  name: string
  owner: string
  route: string
  capacity: string
  status: string
  limit: string
}

export type VerificationSignal = {
  id: string
  group: '物流' | '实货' | '政策'
  title: string
  detail: string
}

export const hormuzFacts = [
  {
    value: '20.9',
    unit: 'mb/d',
    label: '2023 年石油通行量',
    note: '约等于全球石油液体消费的五分之一',
  },
  {
    value: '>¼',
    unit: '海运石油',
    label: '2022—2023H1 的海运占比',
    note: '不是全球石油的五分之一，而是海运贸易的四分之一以上',
  },
  {
    value: '82%',
    unit: '流向亚洲',
    label: '2022 年原油与凝析油',
    note: '中国、印度、日本、韩国是最主要目的地',
  },
  {
    value: '3.5',
    unit: 'mb/d',
    label: 'EIA 估算有效闲置绕行能力',
    note: '是可用能力估计，不是所有管道名义能力之和',
  },
]

export const hormuzScenarios: HormuzScenario[] = [
  {
    id: 'threat',
    label: '威胁与成本冲击',
    duration: '数小时—3 天',
    description: '通行大体继续，但保险、运费和船期开始反映风险。',
    grossDisruption: 1.5,
    pipelineBypass: 0.4,
    emergencyStocks: 0,
    otherSupply: 0,
    demandResponse: 0,
    conclusion: '主要是风险溢价，不足以证明全球已经缺油。',
  },
  {
    id: 'partial',
    label: '选择性受阻',
    duration: '3—14 天',
    description: '部分船东暂停、装船延误，亚洲炼厂开始争夺替代货源。',
    grossDisruption: 7.3,
    pipelineBypass: 1.5,
    emergencyStocks: 1,
    otherSupply: 0.5,
    demandResponse: 0.3,
    conclusion: '物流冲击开始转成实货压力，现货升水与月差比新闻标题更重要。',
  },
  {
    id: 'de-facto',
    label: '短期事实封锁',
    duration: '2—4 周',
    description: '保险与船东行为使大部分商业航运暂停，即使航道没有物理封死。',
    grossDisruption: 15,
    pipelineBypass: 3.5,
    emergencyStocks: 3,
    otherSupply: 1,
    demandResponse: 0.8,
    conclusion: '市场从地缘风险定价进入库存与成品油短缺定价。',
  },
  {
    id: 'prolonged',
    label: '持续硬封锁',
    duration: '30 天以上',
    description: '海峡功能持续失效，库存释放和替代供应只能买时间。',
    grossDisruption: 20.9,
    pipelineBypass: 3.5,
    emergencyStocks: 3,
    otherSupply: 1.5,
    demandResponse: 1.5,
    conclusion: '教学基线得到约 11 mb/d 的平衡缺口，落在旧研究提出的 8—13 mb/d 压力区间内。',
  },
]

export const crisisClocks = [
  {
    time: '0—72 小时',
    title: '市场时钟',
    question: '大家相信它会发生吗？',
    signals: ['期权波动率', '战争险报价', '油轮掉头与等待', 'Brent / Dubai 即时反应'],
    trap: '价格跳涨只能证明恐惧升温，不能证明供应已经消失。',
  },
  {
    time: '3—14 天',
    title: '物流时钟',
    question: '原定船货还能到达吗？',
    signals: ['完成航次而非 AIS 点位', '装船取消', '港口排队', '中东—亚洲 VLCC 运费'],
    trap: '海峡“开放”不等于商业航运已经恢复正常。',
  },
  {
    time: '2—6 周',
    title: '库存时钟',
    question: '炼厂还剩多少可加工的油？',
    signals: ['商业库存净去化', '炼厂原料天数', '柴油与航煤裂解', '战略储备实际交付'],
    trap: '账面库存不等于可立即释放、可运输、可炼化的库存。',
  },
  {
    time: '6 周以后',
    title: '宏观时钟',
    question: '一次性涨价会不会变成持续通胀？',
    signals: ['企业投入价格', '交通与化工成本', '通胀预期', '央行反应与汇率'],
    trap: '油价上涨不必然造成核心通胀，持续时间和企业行为决定二阶影响。',
  },
]

export const pipelineRoutes: PipelineRoute[] = [
  {
    name: 'East–West Pipeline',
    owner: 'Saudi Aramco',
    route: '沙特东部油田 → 红海延布',
    capacity: '5 mb/d 名义能力；2019 年曾临时扩至 7 mb/d',
    status: '主要绕行通道',
    limit: '只能转移沙特自己的部分供应，还受红海终端、管内已有流量和油种安排约束。',
  },
  {
    name: 'Habshan–Fujairah',
    owner: 'ADNOC',
    route: '阿布扎比陆上油田 → 阿曼湾富查伊拉',
    capacity: '约 1.5 mb/d',
    status: '稳定运行',
    limit: '增强阿联酋出口韧性，但不能替代伊拉克、科威特、卡塔尔的海湾出口。',
  },
  {
    name: 'Goreh–Jask',
    owner: 'Iran',
    route: '伊朗古雷 → 阿曼湾贾斯克',
    capacity: '2021 年启用时约 0.3 mb/d',
    status: '基线不计入',
    limit: 'EIA 2023 年资料称首船后未持续使用，不能把名义能力当成稳定出口。',
  },
  {
    name: 'Iraq–Türkiye Pipeline',
    owner: 'Iraq / Türkiye',
    route: '伊拉克北部 → 地中海杰伊汉',
    capacity: '名义能力不等于当前可持续流量',
    status: '边缘替代',
    limit: '不能直接把南部巴士拉出口搬到北线，还受油田连接、合同、政治和装港能力限制。',
  },
]

export const inventoryLayers = [
  {
    number: '01',
    title: '账面有油',
    body: '商业库存、战略储备、海上浮仓和在途船货共同构成“看得见的桶”。',
  },
  {
    number: '02',
    title: '短期能放',
    body: '所有权、政策授权、设施流速和交付窗口决定多少桶能在正确时间出现。',
  },
  {
    number: '03',
    title: '能够运到',
    body: '库存所在地区、港口和管道必须能连接到正在缺油的炼厂。',
  },
  {
    number: '04',
    title: '炼厂能吃',
    body: '硫含量、轻重度和装置配置决定一桶替代油能否高效变成所需产品。',
  },
]

export const chinaTransmission = [
  {
    number: '01',
    title: '到岸成本',
    body: '中东现货升水、VLCC 运费、战争险和人民币汇率共同决定炼厂真正支付的价格。',
  },
  {
    number: '02',
    title: '炼化与化工',
    body: '原油品质切换会改变产品收率、脱硫负荷和裂解价差，炼化利润并不只由油价方向决定。',
  },
  {
    number: '03',
    title: 'PPI 先行',
    body: '运输、化工原料、橡塑和工业燃料成本通常先进入生产端，企业是否转嫁决定下一步。',
  },
  {
    number: '04',
    title: 'CPI 滞后',
    body: '成品油定价机制、税费、补贴、需求强弱和企业利润缓冲，使消费端传导并非一比一。',
  },
  {
    number: '05',
    title: '资产再定价',
    body: '贸易条件、通胀预期、政策空间和行业利润变化，最终进入利率、汇率与权益估值。',
  },
]

export const verificationSignals: VerificationSignal[] = [
  {
    id: 'voyages',
    group: '物流',
    title: '完成航次持续下降',
    detail: '统计实际穿越并抵达目的地的船，而不是只看某一时点的 AIS 光点。',
  },
  {
    id: 'insurance',
    group: '物流',
    title: '战争险与运费同步抬升',
    detail: '保险仍然可得但价格更高，与完全无法承保是两个风险阶段。',
  },
  {
    id: 'basis',
    group: '实货',
    title: 'Dubai / Oman 现货升水扩大',
    detail: '中东实货强于纸面基准，说明亚洲买家正在争夺可交付原油。',
  },
  {
    id: 'curve',
    group: '实货',
    title: '近月升水与裂解价差共振',
    detail: '只有月差、现货和成品油同时走强，短缺才更可能进入炼厂端。',
  },
  {
    id: 'inventory',
    group: '实货',
    title: '商业库存连续净去化',
    detail: '一次周度下降可能是噪声，连续去化且跨区域出现才是更强证据。',
  },
  {
    id: 'delivery',
    group: '政策',
    title: '应急库存实际交付',
    detail: '公告、拍卖、出库和抵达炼厂是四个阶段，不能把宣布量直接当成新增供应。',
  },
]

export const dossierSources = [
  {
    label: 'EIA / 霍尔木兹通行量、亚洲流向与绕行能力',
    url: 'https://www.eia.gov/todayinenergy/detail.php?id=61002',
    date: '2023-11-21',
  },
  {
    label: 'EIA / World Oil Transit Chokepoints',
    url: 'https://www.eia.gov/international/analysis/special-topics/World_Oil_Transit_Chokepoints',
    date: '持续更新',
  },
  {
    label: 'IEA / Oil security and emergency response',
    url: 'https://www.iea.org/about/emergency-response-and-energy-security',
    date: '持续更新',
  },
  {
    label: 'U.S. DOE / Strategic Petroleum Reserve',
    url: 'https://www.energy.gov/ceser/strategic-petroleum-reserve',
    date: '持续更新',
  },
]
