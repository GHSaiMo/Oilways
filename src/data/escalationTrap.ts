export type EscalationStage = {
  id: string
  number: string
  shortTitle: string
  title: string
  objective: string
  tacticalResult: string
  systemEffect: string
  nextTrigger: string
  oilRead: string
}

export type SupplyState = {
  id: string
  index: number
  mode: '干扰' | '破坏'
  title: string
  reversibility: string
  capacity: string
  summary: string
  physicalEvidence: string[]
  marketRead: string
}

export type EscalationSignal = {
  id: string
  tier: 0 | 1 | 2 | 3
  group: string
  title: string
  detail: string
}

export const mechanismSteps = [
  {
    id: 'limited-action',
    number: '01',
    title: '有限行动',
    actorLogic: '用一次可控、精确的行动改变对方计算，同时避免全面战争。',
    systemEffect: '行动制造了损失，却未必改变对手的根本目标。',
    oilSignal: '先观察风险溢价与区域升贴水，而不是立刻假定供应消失。',
  },
  {
    id: 'unfinished-goal',
    number: '02',
    title: '目标未完成',
    actorLogic: '战术命中被当作进展，但核心能力、意志或指挥体系仍然存在。',
    systemEffect: '成功的画面掩盖了战略结果尚未被验证。',
    oilSignal: '分清“设施被击中”与“可出口能力被移除”。',
  },
  {
    id: 'horizontal-response',
    number: '03',
    title: '横向升级',
    actorLogic: '弱势一方避开正面优势，转向盟友、基地、航道或代理网络。',
    systemEffect: '冲突从单一战场扩散到更难防守的连接点。',
    oilSignal: '港口、油轮、保险与海峡成为把军事冲突传给市场的接口。',
  },
  {
    id: 'restore-control',
    number: '04',
    title: '追加行动',
    actorLogic: '为了恢复威慑与控制，只能扩大目标清单或提高打击强度。',
    systemEffect: '每一步都在修复上一步造成的不确定性，却继续制造新不确定性。',
    oilSignal: '看护航、加油机、弹药与基地部署是否开始常态化。',
  },
  {
    id: 'deepening-commitment',
    number: '05',
    title: '承诺加深',
    actorLogic: '已付出的政治与军事成本，使公开后退变得更困难。',
    systemEffect: '退出被重新定义为失败，目标从有限变成维护信誉。',
    oilSignal: '公开红线、盟友整合与长期后勤比强硬言辞更难撤回。',
  },
  {
    id: 'war-threshold',
    number: '06',
    title: '跨越门槛',
    actorLogic: '为了结束不断扩大的风险，开始控制领土、航道或政权结果。',
    systemEffect: '原本用于限制战争的手段，最终生成更难退出的战争。',
    oilSignal: '供应判断从“延迟多久”转向“损失多少能力、修复需要多久”。',
  },
]

export const escalationStages: EscalationStage[] = [
  {
    id: 'precision',
    number: 'STAGE I',
    shortTitle: '精确打击',
    title: '有限精确打击：战术命中不等于战略结束',
    objective: '摧毁一个能力、传递决心，并把冲突留在有限边界内。',
    tacticalResult: '目标可能被击中，行动成本看似可控，国内政治回报迅速出现。',
    systemEffect: '对手的意志、隐藏能力和替代网络仍难确认，失控恐惧随之上升。',
    nextTrigger: '当“任务完成”无法被核查，决策者倾向扩大目标清单与打击频率。',
    oilRead: '先看航运延误、运费、保险与现货升水；这仍可能是可逆的流量干扰。',
  },
  {
    id: 'systemic',
    number: 'STAGE II',
    shortTitle: '系统空袭',
    title: '斩首与系统空袭：中心被削弱，风险却可能更分散',
    objective: '破坏指挥、政权与军事系统，迫使对手失去组织报复的能力。',
    tacticalResult: '高价值目标受损，行动规模与后勤投入明显扩大。',
    systemEffect: '权力碎片化后，代理人和地方单位可能获得更大行动空间，报复更难预测。',
    nextTrigger: '当空中力量无法制造可接受的政治结果，控制关键地点的压力上升。',
    oilRead: '重点转向港口、管道、炼厂和装船设施是否受损，以及攻击是否跨区域复制。',
  },
  {
    id: 'territorial',
    number: 'STAGE III',
    shortTitle: '领土控制',
    title: '领土与地面控制：为结束战争，进入开放式承诺',
    objective: '直接控制关键地带、航道或政治结果，消除剩余威胁。',
    tacticalResult: '行动从远程打击变成持续驻留、守卫、补给与治理。',
    systemEffect: '人员、信誉和盟友承诺被锁定，退出成本随时间继续增加。',
    nextTrigger: '此时问题不再是是否升级，而是谁能提出可信、可核查且可接受的退出安排。',
    oilRead: '市场开始定价长期能力损失、库存消耗与贸易流重构，而不只是短期风险溢价。',
  },
]

export const supplyStates: SupplyState[] = [
  {
    id: 'narrative',
    index: 0,
    mode: '干扰',
    title: '叙事冲击',
    reversibility: '高度可逆',
    capacity: '出口能力仍在',
    summary: '威胁、警告和媒体叙事改变概率，但尚未证明实物流量发生变化。',
    physicalEvidence: ['公开威胁或红线', '价格跳升但装船计划未改', '油轮仍按原航线航行'],
    marketRead: '主要交易风险溢价。价格可以很快，也可以在信息反转后快速回吐。',
  },
  {
    id: 'logistics',
    index: 1,
    mode: '干扰',
    title: '物流干扰',
    reversibility: '可逆但有时滞',
    capacity: '能力在，交付变慢',
    summary: '船东等待、绕行或暂停靠港，石油仍存在，只是更晚、更贵地抵达。',
    physicalEvidence: ['锚地等待与取消靠港', '保险附加费和运费上升', '航程与吨海里增加'],
    marketRead: '先影响区域升贴水、近月价差和炼厂采购节奏，持续时间决定能否穿透库存。',
  },
  {
    id: 'local-damage',
    index: 2,
    mode: '破坏',
    title: '局部能力受损',
    reversibility: '修复周期可估',
    capacity: '部分流量被移除',
    summary: '港口、泵站、储罐或装船设施出现可验证损毁，系统吞吐能力下降。',
    physicalEvidence: ['卫星或运营方确认损毁', '装船能力或管道流量下调', '维修队伍与备件开始调度'],
    marketRead: '关键变量变成损失的 mb/d 与修复天数，单靠油轮恢复航行已不能补回缺口。',
  },
  {
    id: 'system-damage',
    index: 3,
    mode: '破坏',
    title: '系统性破坏',
    reversibility: '长期且路径依赖',
    capacity: '多节点同时离线',
    summary: '多个能源节点或电力、港口、管线系统同时受损，修复受到安全与供应链约束。',
    physicalEvidence: ['跨区域设施连续受损', '官方给出数月级修复窗口', '库存释放和贸易流重构并行'],
    marketRead: '市场从交易事件概率转向重算全球平衡表、库存路径与需求破坏价格。',
  },
]

export const escalationSignals: EscalationSignal[] = [
  {
    id: 'rhetoric',
    tier: 0,
    group: '言辞',
    title: '公开威胁与红线',
    detail: '可迅速撤回或重新解释，单独出现时更像政治信号。',
  },
  {
    id: 'warnings',
    tier: 0,
    group: '程序',
    title: '旅行警告与外交撤离',
    detail: '反映风险管理，但不能单独证明攻击决策已经形成。',
  },
  {
    id: 'forces',
    tier: 1,
    group: '兵力',
    title: '作战平台前推',
    detail: '航母、轰炸机、防空与侦察力量进入可行动位置。',
  },
  {
    id: 'logistics',
    tier: 1,
    group: '后勤',
    title: '加油、弹药与基地扩容',
    detail: '持续行动所需的油料、弹药、维修与医疗能力开始到位。',
  },
  {
    id: 'alliance',
    tier: 2,
    group: '承诺',
    title: '盟友指挥与基地整合',
    detail: '联合指挥、基地授权和公开保护承诺提高后退成本。',
  },
  {
    id: 'shipping',
    tier: 2,
    group: '航运',
    title: '护航、停航与保险退出',
    detail: '国家和商业主体用真实成本确认风险已经进入物流系统。',
  },
  {
    id: 'damage',
    tier: 3,
    group: '实物',
    title: '能源设施损毁获证实',
    detail: '可靠卫星、运营方或多源信息确认物理能力已被移除。',
  },
  {
    id: 'repair',
    tier: 3,
    group: '修复',
    title: '出现周或月级维修窗口',
    detail: '备件、人员与安全约束使损失不再能随停火立即恢复。',
  },
]

export const evidenceTiers = [
  {
    label: '叙事层',
    summary: '风险被谈论，但能力与行动路径尚未被锁定。',
    question: '谁在说？这句话能否在明天无成本撤回？',
  },
  {
    label: '准备层',
    summary: '兵力与后勤开始形成可行动能力，冲突概率实质上升。',
    question: '哪些平台与补给已经到位？能够持续多久？',
  },
  {
    label: '承诺层',
    summary: '盟友、护航和商业行为投入真实成本，路径更难逆转。',
    question: '哪些决定会让后退损害信誉、盟友或既有部署？',
  },
  {
    label: '物理层',
    summary: '设施能力与修复周期已有证据，供应影响可以进入平衡表。',
    question: '损失多少桶、持续多久、由谁和用什么能力修复？',
  },
]

export const exitRamps = [
  {
    number: '01',
    title: '恢复核查',
    body: '把“任务完成”改写为可被双方或第三方验证的有限条件，降低对隐藏能力的恐惧。',
    test: '是否存在明确指标、时间表与复核机制？',
  },
  {
    number: '02',
    title: '收窄目标',
    body: '将政权、信誉等开放目标重新限定为具体行为，避免每次未达成目标都生成新行动。',
    test: '达成什么条件后，军事行动可以停止？',
  },
  {
    number: '03',
    title: '冻结部署',
    body: '在谈判窗口内冻结前推、护航扩张与新增打击目标，阻止准备能力自动变成使用压力。',
    test: '哪些可观察部署能够同步暂停或后撤？',
  },
  {
    number: '04',
    title: '第三方保证',
    body: '由有能力的第三方提供通航、履约或撤军保证，为双方创造不被解释为投降的退出路径。',
    test: '保证者是否有执行能力，也被冲突双方接受？',
  },
]

export const escalationSources = [
  {
    date: '2026-02',
    label: 'Robert A. Pape / Escalation Trap 项目首页',
    url: 'https://escalationtrap.substack.com/',
  },
  {
    date: '2026',
    label: 'What the Escalation Trap Actually Is',
    url: 'https://escalationtrap.substack.com/p/what-the-escalation-trap-actually',
  },
  {
    date: '2026',
    label: 'The Smart Bomb Trap / 三阶段模型',
    url: 'https://escalationtrap.substack.com/p/the-smart-bomb-trap',
  },
  {
    date: '2026',
    label: 'From Disruption to Damage in the Strait of Hormuz',
    url: 'https://escalationtrap.substack.com/p/from-disruption-to-damage-in-the',
  },
  {
    date: '2026',
    label: "Trump's Words Don't Predict War. His Deployments Do.",
    url: 'https://escalationtrap.substack.com/p/trumps-words-dont-predict-war-his',
  },
  {
    date: '1996',
    label: 'Robert A. Pape / Bombing to Win（学术根基）',
    url: 'https://doi.org/10.7591/9780801471513',
  },
]
