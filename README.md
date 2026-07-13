# 油脉 Oilways

> 用一桶油，理解现代生活、全球秩序与资产价格。

油脉是一项面向中国普通投资者的独立石油知识项目。它用纪录片式叙事降低进入门槛，再通过地图、数据、方法注释和教学模型逐步抵达专业分析。

域名：`oilways.jiuge.space`  
开发者：九哥

## 当前原型

- 以霍尔木兹海峡为首屏叙事入口
- 从石油供应中断到通胀、资产价格的传导链
- 一桶油从形成、开采到定价、投资的六站旅程
- 五个全球能源咽喉的交互地图
- 可调整中断比例、分流能力和需求弹性的压力测试
- A/H/美股代表性公司类型对比框架
- 八模块渐进式课程地图及可追溯的数据来源
- “叙事 / 深读”阅读深度切换
- 霍尔木兹完全专题：缺口瀑布、危机时钟、管道、库存、通胀和事件验证器
- 原油指纹图：比较 WTI、Brent、Murban、Oman、Arab Light、Mars 与 Maya
- 炼厂产品倾向模拟器：理解分离、转化、处理和装置复杂度
- 全球定价工作台：比较 WTI、Brent、Dubai/Oman、Murban 与到岸成本
- 七次石油危机交互时间轴：从1973禁运到2022贸易重排
- 供需平衡实验室：把每日增量差换算为90天库存变化
- 期货曲线实验室：用持有成本与便利收益解释 Contango 和 Backwardation
- 3-2-1裂解价差工具：统一原油与成品油单位，观察炼厂毛加工空间
- 中国行业传导矩阵：区分需求推动、供应中断、供给过剩与需求崩塌

## 本地运行

```bash
npm install
npm run dev
```

生产构建：

```bash
npm run build
```

## 内容维护

低频事实和教学参数集中在 `src/data/`，主要包括：

- [`src/data/content.ts`](src/data/content.ts)：咽喉流量、一桶油课程、公司类型与通用来源
- [`src/data/hormuzDossier.ts`](src/data/hormuzDossier.ts)：霍尔木兹专题情景、管道与验证信号
- [`src/data/crudeSystem.ts`](src/data/crudeSystem.ts)：原油指纹、炼厂、基准油与到岸成本
- [`src/data/oilHistory.ts`](src/data/oilHistory.ts)：七次历史冲击的统一比较框架
- [`src/data/marketMechanics.ts`](src/data/marketMechanics.ts)：供需预设、市场情景、行业利润映射与本章来源

需要更新数字时，应同步修改数据年份、来源说明和页面展示，避免只替换数字而保留旧口径。

## 文档

- [`docs/产品路线.md`](docs/产品路线.md)：定位、信息架构与两周原型路线
- [`docs/数据方法.md`](docs/数据方法.md)：事实、估算、模型和更新规则
- [`docs/研究素材映射.md`](docs/研究素材映射.md)：旧研究库如何转化为网站长期内容
- [`docs/原油炼化与历史来源.md`](docs/原油炼化与历史来源.md)：第三阶段调研口径与模型边界
- [`docs/市场结构与行业传导.md`](docs/市场结构与行业传导.md)：第四阶段公式、情景与行业映射边界
- [`CREDITS.md`](CREDITS.md)：视觉素材来源与授权信息

## 技术栈

React、TypeScript、Vite、D3 Geo、World Atlas、Lucide Icons。当前版本为纯静态前端，不依赖数据库或实时行情服务。
