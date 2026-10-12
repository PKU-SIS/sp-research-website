"use strict";
// Team-maintained content; shared by overview resources, paper sections and Paper List.

const papers = {
  tcrag: {
    name: "TC-RAG", category: "foundation", label: "STACK MEMORY & STATE CONTROL", number: "00",
    headline: "以栈式记忆管理检索、推理与状态。",
    question: "多步检索与推理中，如何监测执行状态、清理错误信息，并判断何时继续或停止？",
    flow: [["STATE", "监测中间执行状态"], ["STACK", "Push / Pop 管理记忆"], ["CONTROL", "回溯、压缩与停止判断"]],
    position: "StackPlanner 的先驱工作：以状态监测和栈式工作记忆组织单 Agent 的检索与推理，为后续分层协作和记忆动作学习提供研究基础。",
    metric: "87.95%", unit: "CMB EM", result: "医学继续预训练 Qwen-32B，TC-RAG-uct 配置；同表 FLARE 为 85.14%。来源：Table 1。",
    status: "ACL 2025", url: "https://aclanthology.org/2025.acl-long.558/",
    title: "TC–RAG: Turing–Complete RAG’s Case study on Medical LLM Systems",
    authors: "Jiang, Xinke and Fang, Yue and Qiu, Rihong and others"
  },
  stackplanner: {
    name: "StackPlanner", category: "foundation", label: "FOUNDATION HARNESS", number: "01",
    headline: "把复杂协作组织成可维护的任务状态。",
    question: "当规划、检索与写作持续交织，中心 Agent 如何保持目标、组织子任务，并维护有效的执行上下文？",
    flow: [["COORDINATE", "中心协调与任务拆解"], ["DELEGATE", "子 Agent 独立执行"], ["REVISE", "维护与修订任务状态"]],
    position: "StackPlanner 的基础 Harness：分离中心协调与子任务执行，通过显式任务栈维护中间状态，并支持报告生成与反馈修订。",
    metric: "38.34 / 22.01", unit: "2Wiki / MuSiQue F1 (%)", result: "Qwen2.5-7B；分别较最强基线提升 1.89 / 2.67 个百分点。来源：Table 1。",
    status: "AAAI 2027 · Submitted", arxiv: "2601.05890",
    title: "StackPlanner: A Centralized Hierarchical Multi-Agent System with Task-Experience Memory Management",
    authors: "Zhang, Ruizhe and Jiang, Xinke and Yang, Zhibang and others"
  },
  scaffoldagent: {
    name: "ScaffoldAgent", category: "harness", label: "HARNESS & STRUCTURED STATE", number: "02",
    headline: "让报告结构随证据增长而受控演化。",
    question: "如何避免证据积累带来的大纲漂移、分支冗余与粒度不均，让结构调整及时获得检索和写作反馈？",
    flow: [["EXPANSION", "细化章节与子问题"], ["CONTRACTION", "合并冗余结构"], ["REVISION", "刷新意图与证据"]],
    position: "基于 StackPlanner 框架开发的深度研究扩展。以大纲树组织章节意图和证据，利用检索、结构、生成三维效用，以及 NLI 支持度校验控制更新。",
    metric: "44.70", unit: "RACE Overall", result: "Qwen3-32B · DeepResearch Bench；较该论文最强基线提升 2.24 分。",
    status: "EMNLP 2026", arxiv: "2606.20122",
    title: "ScaffoldAgent: Utility-Guided Dynamic Outline Optimization for Open-Ended Deep Research",
    authors: "Yang, Zhibang and Jiang, Xinke and Xiao, Yuzhen and others"
  },
  agenticrag: {
    name: "AgenticRag-R1", category: "learning", label: "MEMORY-AWARE POLICY LEARNING", number: "03",
    headline: "学习何时检索、总结与回退。",
    question: "有效证据与错误路径不断累积时，如何将工作记忆的维护纳入 Agent 的动作空间与学习目标？",
    flow: [["ACTION SPACE", "推理、检索与记忆动作"], ["FEEDBACK", "分层过程与结果奖励"], ["SELECTION", "信息感知轨迹筛选"]],
    position: "将记忆从被动缓存变为控制对象。通过栈式记忆、回溯与压缩动作，联合学习多步推理和上下文管理。",
    metric: "33.55", unit: "Average F1", result: "Qwen2.5-3B · 七项 QA / 检索基准；较该论文最强基线提升 3.39 分。",
    status: "EMNLP 2026", arxiv: "2608.29622",
    title: "AgenticRag-R1: Agentic Reinforcement Learning with Stack Memory for Multi-Step Reasoning, Retrieval and Memorizing",
    authors: "Jiang, Xinke and Fang, Yue and Yang, Zhibang and others"
  },
  loongreflect: {
    name: "LoongReflect", category: "learning", label: "REFLECTION & RECOVERY", number: "04",
    headline: "用全局执行反馈，改善局部反思。",
    question: "局部上下文如何获得足够的控制监督，识别错误路径、选择恢复点，并把反思转化为后续行动？",
    flow: [["GLOBAL VIEW", "保存活动与归档路径"], ["FAST CHANNEL", "全局反馈监督反思"], ["SLOW CHANNEL", "结果奖励优化执行"]],
    position: "深化反思与恢复的策略学习。以可恢复轨迹树保留分支，用遮蔽答案的全局反馈监督反思与回溯，并协调蒸馏和结果 RL 两个通道。",
    metric: "46.15", unit: "Average F1", result: "Qwen2.5-3B · 七项基准；较该论文中的 AgenticRag-R1 提升 12.60 分。",
    status: "AAAI 2027 · Submitted", arxiv: "2608.11967",
    title: "LoongReflect: Boosting Long-Horizon Reflection in Search Agents via Global Perspective Distillation",
    authors: "Zhang, Zhixin and Jiang, Xinke and Yang, Zhibang and others"
  },
  harnessrl: {
    name: "Harness-RL", category: "learning", label: "BLACK-BOX HARNESS TRAINING", number: "05",
    headline: "把复杂协作轨迹转化为可训练的策略。",
    question: "多会话、分支与上下文变化下，如何还原模型实际可见的训练样本，并缓解动作选择与参数生成的优化冲突？",
    flow: [["INTERFACE", "采集接口级调用记录"], ["TRAJECTORY", "前缀树与分段归因"], ["CAPO", "Action / Args 梯度路由"]],
    position: "连接 Harness 执行与策略训练。以接口记录构建样本，利用激活统计与功能分区进行梯度路由；相关训练机制被 GitHarness 和 GenMem 采用。",
    metric: "47.79", unit: "Average F1", result: "Qwen2.5-3B · 七项基准；CAPO 消融对照为 46.22，增益 1.57 分。",
    status: "PCC 2026 · Best Paper", arxiv: "2608.29641",
    title: "Harness-RL: Black-Box Reinforcement Learning with Action-Args Decoupling for Central-Agent Multi-Agent Harnesses",
    authors: "Jiang, Xinke and Zhang, Zhixin and Yang, Zhibang and others"
  },
  githarness: {
    name: "GitHarness", category: "harness", label: "DYNAMIC REQUIREMENTS & VERSIONED STATE", number: "06",
    headline: "需求变了，从合适的历史状态继续。",
    question: "用户修改、撤销或切换要求之后，如何选择仍然兼容的历史工作，并决定复用、局部修订还是重新执行？",
    flow: [["RESOLVE", "解析当前完整需求"], ["SELECT", "选择历史版本基础"], ["EXECUTE", "复用、修订或重新求解"]],
    position: "围绕下游 Harness 的外层版本管理。成对保存有效需求与工作状态，支持 StackPlanner、TCRAG 和 OpenHands；通过 Harness-RL 的接口轨迹机制训练 Git Agent。",
    metric: "67 → 74%", unit: "Code resolved rate", result: "DeepSeek-V4-Flash + StackPlanner；七轮交互、training-free，代码任务 token 消耗降低 73.6%。",
    status: "ICLR 2027 · Submitted", arxiv: "2609.36789",
    title: "GitHarness: Git Init Your Harness Working Memory for Perpetual User Requirements",
    authors: "Yang, Zhibang and Jiang, Xinke and Liu, Yuxuan and others"
  },
  genmem: {
    name: "GenMem", category: "memory", label: "GENERATIVE SYMBOLIC MEMORY", number: "07",
    headline: "经验内容更新，访问地址保持稳定。",
    question: "当经验不断修订，如何避免内容变化带来的寻址漂移，并找到对当前策略真正有用的经验？",
    flow: [["RETRIEVE", "生成 SID 并检索经验"], ["EXECUTE", "支持 StackPlanner 执行"], ["EVOLVE", "提炼轨迹并更新内容"]],
    position: "围绕 StackPlanner 构建跨任务经验闭环。MemRetriever 与 MemEvolver 共用符号地址空间；在线阶段固定模型和码本，通过更新外部记忆内容适应后续任务。",
    metric: "30.56 → 36.20%", unit: "Task accuracy", result: "在线记忆演化实验的初始与最终检查点；中间存在波动，模型参数和 SID 码本固定。",
    status: "ICLR 2027 · Submitted", arxiv: "2609.34633",
    title: "GenMem: Generative Symbolic Memory for Self-Evolving Harness",
    authors: "Jiang, Xinke and Feng, Tao and Xu, Weixuan and others"
  }
};


const slideOrder = ["tcrag", "stackplanner", "scaffoldagent", "agenticrag", "loongreflect", "harnessrl", "githarness", "genmem"];
const figurePages = {tcrag:6,stackplanner:4,agenticrag:4,loongreflect:4,harnessrl:5,scaffoldagent:5,githarness:4,genmem:3};
const figureNumbers = {tcrag:1,stackplanner:2,agenticrag:2,loongreflect:2,harnessrl:2,scaffoldagent:2,githarness:2,genmem:2};
const figureSizes = {tcrag:[1844,792],stackplanner:[1780,889],agenticrag:[1847,798],loongreflect:[1862,1043],harnessrl:[1676,967],scaffoldagent:[1683,943],githarness:[1539,910],genmem:[1593,762]};
function paperUrl(paper) { return paper.url || `https://arxiv.org/abs/${paper.arxiv}`; }
const researchNotes = {
  tcrag:{group:"先驱工作 / 符号侧",subtitle:"TC-RAG",mechanism:"以 Push / Pop 构成回溯与摘要等操作，显式维护工作记忆；结合状态监测控制检索与停止判断。",connection:"沿 Harness 侧发展到 StackPlanner 的多 Agent 分层协作；沿模型学习侧，AgenticRag-R1 将栈式记忆操作纳入可训练动作空间。"},
  stackplanner:{group:"符号侧 / Harness",subtitle:"StackPlanner",mechanism:"将中心协调与子任务执行分离，以显式任务栈维护中间结果和执行进度，支持报告生成及用户反馈修订。",connection:"承接 TC-RAG 的记忆管理研究，扩展到多 Agent 分层协作。ScaffoldAgent 在此基础上开发；长程执行中的反思控制问题与 LoongReflect 的研究相联系。"},
  agenticrag:{group:"神经侧 / 策略学习",subtitle:"记忆动作学习",mechanism:"将推理、检索、回溯与压缩纳入动作空间，结合分层奖励、信息感知轨迹筛选与栈式上下文控制，学习记忆操作。",connection:"承接 TC-RAG 的栈式记忆机制研究，将记忆操作推进到策略学习；后续 LoongReflect 深化反思与恢复决策。"},
  loongreflect:{group:"神经侧 / 策略学习",subtitle:"反思与路径恢复",mechanism:"以可恢复轨迹树保存执行分支，通过遮蔽答案的全局反馈监督局部反思，并协调蒸馏与结果 RL 两个训练通道。",connection:"承接 AgenticRag-R1 的记忆控制研究，回应 StackPlanner 长程执行中的反思与恢复问题；后续 Harness-RL 进一步面向复杂 Harness 的策略训练。"},
  harnessrl:{group:"共用训练基础",subtitle:"Harness-RL",mechanism:"通过接口调用记录、会话前缀树及分段归因构建训练样本；利用激活统计和梯度路由，缓解 Action 与 Args 的优化冲突。",connection:"承接 AgenticRag-R1 → LoongReflect 的策略学习研究，并成为后续工作的训练基础：GitHarness 用于训练 Git Agent，GenMem 用于训练 StackPlanner 执行策略。"},
  scaffoldagent:{group:"符号侧 / 结构协作",subtitle:"ScaffoldAgent",mechanism:"基于 StackPlanner 框架，将章节意图与证据组织为可更新的大纲树，通过扩展、收缩、修订及三维效用反馈控制结构演化。",connection:"GitHarness 的前驱工作：先研究报告任务中的局部结构修订，再将问题推进到通用需求变化与历史工作状态管理。"},
  githarness:{group:"神经符号融合",subtitle:"动态需求与持续协作",mechanism:"将有效需求与工作状态配对保存为版本，通过需求解析、历史基础选择和执行路由复用或修订历史工作；Harness-RL 训练 Git Agent，下游执行组件冻结。",connection:"将两侧方法结合用于更复杂的动态需求任务：Harness 管理需求—状态版本，Harness-RL 训练 Git Agent 的需求解析与历史选择；下游执行组件在该训练中冻结。"},
  genmem:{group:"神经符号融合",subtitle:"经验复用与持续演化",mechanism:"MemRetriever 生成 SID 并检索经验，StackPlanner 执行，MemEvolver 提炼轨迹并更新内容。结合记忆策略学习与 Harness-RL 的 StackPlanner 执行策略训练；在线阶段固定模型参数和 SID 码本。",connection:"将经验寻址、检索与更新机制，同记忆策略学习及 Harness-RL 的 StackPlanner 执行策略训练结合，面向可持续的经验利用。在线检索—执行—更新循环固定模型参数并更新外部记忆内容。"}
};


const systemRepositories = [
  {name:"Stack-Planner",version:"1.0",description:"中枢规划、子任务委派与 MemoryStack，组织多智能体任务执行。",url:"https://github.com/PKU-SIS/Stack-Planner/tree/master/"},
  {name:"StackPlanner2.0",version:"2.0",description:"在 DeerFlow2 Runtime 上扩展长程协作、执行恢复与产物交付。",url:"https://github.com/PKU-SIS/StackPlanner2.0"},
  {name:"Harness-RL",version:"RL",description:"面向复杂 Harness 的黑盒强化学习，支持接口轨迹训练与 Action / Args 解耦优化。",url:"https://github.com/jiangxinke/Harness-RL"}
];

const paperResources = {
  tcrag:[{label:"Code",url:"https://github.com/Artessay/TC-RAG",description:"作者公开的 TC-RAG 代码、医学评测数据与运行说明。"}],
  stackplanner:[{label:"Code",url:systemRepositories[0].url,description:"团队维护的 Stack-Planner 系统实现，包含中枢、子 Agent 与记忆管理。"}],
  agenticrag:[{label:"Code",url:"https://github.com/jiangxinke/Harness-RL/tree/AgenticRAG-R1-Whitebox",description:"论文给出的 AgenticRAG-R1-Whitebox 分支。"}],
  harnessrl:[{label:"Code",url:systemRepositories[2].url,description:"论文给出的 Harness-RL 训练代码仓库。"}]
};

const paperDetails = {
  tcrag:{
    motivation:"多轮检索会把有用证据、重复结果和错误推断一起写入上下文。如果只能追加信息，错误会持续影响后续生成，系统也难以判断是否还需要检索。TC-RAG 将中间执行状态显式化，使保留、清理与停止成为可以控制的操作。",
    modules:[["State Monitor","观察当前执行状态，为检索、继续推理与结束提供判断依据。"],["Memory Stack","以栈保存中间信息，Push 写入新内容，Pop 移除不再有效的内容。"],["Meta Action / Tool Library","将检索、总结与回溯作用于记忆和工具环境，构成可重复执行的求解循环。"]],
    steps:["用户问题进入活动状态，模型依据已有信息选择推理或工具操作。","检索结果和推理内容写入记忆栈，供下一步使用。","发现错误时回溯，信息冗余时总结压缩，更新后继续求解。","依据状态监测与停止判断输出答案。"],
    innovation:"核心是把 RAG 从固定的检索—生成管线扩展为带状态与记忆控制的执行过程。检索次数、上下文内容和恢复动作可以随任务状态改变。",
    connection:"作为 StackPlanner 的先驱，它为 StackPlanner 的显式任务状态管理提供机制基础；AgenticRag-R1 则进一步学习这些记忆动作的选择策略。医疗问答是本文的验证场景，不限定整个 StackPlanner 体系的任务范围。",
    experiment:"展示的是 CMB 上 TC-RAG-uct 配置的 EM：医学继续预训练 Qwen-32B 得到 87.95%，同表 FLARE 为 85.14%。该数值属于医学问答设置，不与后续搜索论文的平均 F1 直接比较。"
  },
  stackplanner:{
    motivation:"中心 Agent 若同时承担规划、工具细节和全部中间结果，长程执行会使上下文膨胀，局部错误也更容易影响后续协调。StackPlanner 将高层决策与具体执行分开，让中枢主要维护目标、任务进度和必要结果。",
    modules:[["Central Coordinator","通过 PLAN、DELEGATE、REVISE、FINISH 决定下一步，向子 Agent 传递任务要求与相关上下文。"],["Task Memory Stack","保存执行中的有效状态；通过总结压缩和反思清理，控制活动上下文。"],["Central–Sub Interface","连接搜索、报告等专业子 Agent，将子任务结果返回中枢，继续规划或修订。"]],
    steps:["中枢结合用户目标与已有状态，确定需要完成的子任务。","向合适的子 Agent 委派限定范围的工作，由其执行检索或生成。","将返回结果写入任务记忆，压缩冗余并清理错误信息。","检查完成情况，继续委派、依据反馈修订，或交付最终结果。"],
    innovation:"将任务记忆维护与协作决策放在同一中枢流程中，使子任务执行细节与全局控制分离。论文也包含经验检索和协调策略训练；体系展示重点突出其基础 Harness 作用。",
    connection:"承接 TC-RAG 的记忆控制，扩展到多智能体分层协作。ScaffoldAgent 在 StackPlanner 框架上发展报告协作设计；GitHarness 可在外层管理需求版本，GenMem 则为执行提供可更新经验。StackPlanner 2.0 是后续工程实现，需与本论文配置区分。",
    experiment:"此处采用 Table 1 的搜索结果：Qwen2.5-7B 在 2Wiki 与 MuSiQue 上的 F1 分别为 38.34、22.01，较各自最强基线提升 1.89、2.67 个百分点。两项基准独立报告，不作跨论文性能升级线。"
  },
  scaffoldagent:{
    motivation:"开放式研究需要一边收集证据，一边调整报告结构。持续增加分支容易造成大纲漂移、主题重复与粒度不均；一次结构修改的价值又往往要到后续检索和试写时才能看出。ScaffoldAgent 让大纲成为贯穿研究过程的可操作状态。",
    modules:[["Outline Agent / Outline Tree","将章节意图、层级关系与证据索引放入大纲树，选择需要更新的节点。"],["Expansion / Contraction / Revision","分别支持细化内容、合并冗余结构及修订意图与证据。"],["Search / Reporter / Utility","检索与局部试写返回反馈，以检索、结构、生成三维效用衡量调整价值，并用 NLI 检查引用支持度。"]],
    steps:["从研究目标生成初始大纲，将收集到的证据组织到相应章节。","选择待改进节点，执行扩展、收缩或修订操作。","进行定向检索与局部试写，获得结构质量和证据支持反馈。","依据效用继续调整或停止，再沿稳定的大纲生成报告。"],
    innovation:"将大纲更新建模为效用引导的结构化决策，连接当前结构操作与下游检索、写作质量。Utility 是推理时的控制反馈，本文没有将其描述为经过 RL 训练的结构策略。",
    connection:"在 StackPlanner 上发展独立的报告协作框架，深化章节、证据与生成之间的组织关系。它的持续局部修订问题进一步引出 GitHarness 对通用动态需求和历史工作状态的管理。",
    experiment:"Qwen3-32B 在 DeepResearch Bench 的 RACE Overall 为 44.70，同表最强基线为 42.46，提升 2.24 分。指标衡量报告质量，不能与 QA F1 或代码修复率混为同一能力尺度。"
  },
  agenticrag:{
    motivation:"只学习检索和最终作答，难以解决长程执行中错误路径累积、证据冗余和上下文失控的问题。AgenticRag-R1 将记忆操作纳入动作空间，让模型同时学习寻找信息与维护自己正在使用的信息。",
    modules:[["Composed Action Set","Plan、Think、Search、Summary、Backtrack、Conclusion 分别作用于规划、检索、压缩、回退与结束。"],["Stack Memory / Attention","以栈组织中间状态；相关注意力机制控制已移出活动记忆的片段对后续生成的影响。"],["Reward / Trajectory Selection","结合动作相关的过程奖励与结果奖励，并依据 rollout 的奖励和离散程度筛选更有信息量的训练轨迹。"]],
    steps:["模型读取当前记忆，生成明确的认知或记忆动作。","检索和推理写入栈；总结压缩内容，回溯移除错误路径。","采样多条执行轨迹，结合过程表现与任务结果计算训练信号。","筛选有信息量的样本，更新策略并继续采样。"],
    innovation:"显式建模异质动作及其奖励，使记忆维护与多步推理共同进入训练目标；轨迹筛选帮助训练关注仍有探索价值的样本。",
    connection:"沿 TC-RAG 的栈式工作记忆机制推进策略学习。LoongReflect 进一步研究反思与恢复的监督；Harness-RL 则面向复杂协作过程中的接口轨迹和动作 / 参数优化。连线表示研究推进，不等同于各配置直接替换。",
    experiment:"Qwen2.5-3B 在七项 QA / 检索基准上的平均 F1 为 33.55，较论文同表最强基线提高 3.39 分。该比较固定在本论文的模型与评测口径内。"
  },
  loongreflect:{
    motivation:"反思通常只能看到当前局部上下文，而失败原因可能分散在先前的探索分支中。单一终局奖励也难以直接教会模型识别缺失证据和合适的恢复点。LoongReflect 用全局执行记录为局部反思提供更具体的监督。",
    modules:[["Recoverable Trajectory Tree","保留活动路径与归档分支，使失败探索能够被检查，并支持恢复执行。"],["Fast Channel","教师从全局记录构造遮蔽答案的控制反馈，为反思与回溯 token 提供密集蒸馏监督。"],["Slow Channel / Coordination","通过最终结果奖励评价执行，以前瞻更新和冲突处理协调局部监督与全局目标。"]],
    steps:["执行任务并维护活动路径，将退出的分支保留为可恢复记录。","教师结合全局执行信息诊断证据缺口、分支风险与恢复选择，同时遮蔽最终答案。","快通道学习反思控制，慢通道用最终结果检验这些决策是否有效。","协调两类更新，让反思带来后续行动变化。"],
    innovation:"把反思作为执行控制来训练，而非仅生成一段文字评论；全局反馈补充局部视角，结果信号继续约束反思是否真正有助于任务完成。",
    connection:"深化 AgenticRag-R1 的记忆控制与恢复研究，回应 StackPlanner 长程执行中的反思问题。其蒸馏与 RL 协调不同于 Harness-RL 的 Action / Args 优化，后者把策略训练扩展到更复杂的 Harness。",
    experiment:"Qwen2.5-3B 的七项基准平均 F1 为 46.15，较本论文表中的 AgenticRag-R1 高 12.60 分。此结果不是 LoongReflect 与 Harness-RL 在同一配置下的直接消融比较。"
  },
  harnessrl:{
    motivation:"多 Agent 的调用拥有各自上下文，压缩、分支和多会话又会改变模型实际可见的内容，不能直接把全部执行日志拼成一条训练序列。与此同时，选动作与生成参数承担不同功能，混合更新可能相互干扰。",
    modules:[["Interface Call Records","采集准确的输入 / 输出 token、采样 log-prob 与调用标识，保留训练所需的模型侧信息。"],["Session Prefix Trees","按会话构建 token 前缀树，依据每次调用可见的上下文构造样本，并将奖励对齐到可训练输出片段。"],["CAPO","根据激活统计识别 Action 与 Args 的功能分区，将相应 token 的梯度路由到对应参数子集。"]],
    steps:["运行 Harness，在模型接口捕获各角色的调用记录。","按会话匹配前缀，保留分支与上下文改写对应的真实输入。","构建训练 mask 和分段优势，控制同一 rollout 中样本的贡献。","结合 CAPO 更新策略，再在 Harness 中采样新的执行轨迹。"],
    innovation:"将复杂 Harness 的运行记录转换为与模型可见上下文一致的训练数据，并处理 Action / Args 的优化冲突。“黑盒”指对 Harness 的接口采集方式；CAPO 仍需访问可训练模型的激活与梯度。",
    connection:"承接记忆动作与反思策略研究，提供共用训练机制：GitHarness 使用接口轨迹机制训练 Git Agent，GenMem 使用 Harness-RL 训练 StackPlanner 执行策略。这些采用关系不自动意味着启用了 CAPO 的全部组件。",
    experiment:"Qwen2.5-3B 平均 F1 为 47.79；去掉 CAPO 的消融为 46.22，CAPO 对应增益是 1.57 分。不能将相对其他系统的全部差值归因于梯度路由。"
  },
  githarness:{
    motivation:"用户反馈可能补充、扩展或撤销先前要求。直接保留全部历史会带入过时信息，每轮重新执行又会丢失有效工作。GitHarness 同时回答从哪一个历史状态继续，以及当前哪些部分需要修改。",
    modules:[["Requirement–Work Versions","将完整有效需求与对应执行状态、产物成对保存，形成可分支的版本历史。"],["Git Agent","解析当前需求与变更，检查历史并选择语义兼容的基础版本。"],["Version Interface / Execution Routing","恢复下游 Harness 的工作状态，路由到直接复用、复用后修订或重新执行。"]],
    steps:["结合新反馈解析当前有效需求，识别补充、扩展或方向变化。","检查历史版本，寻找与当前需求兼容的工作基础。","恢复并创建新分支，排除过时状态，保留仍然有效的工作。","委派下游 Harness 修改受影响部分，提交新的需求—工作状态版本。"],
    innovation:"用显式版本连接用户侧需求变化与执行侧工作复用。Harness 管理版本、恢复和路由，RL 学习 Git Agent 的需求解析与历史选择；训练时冻结下游执行组件。",
    connection:"承接 ScaffoldAgent 的持续修订问题，将管理对象推进到通用需求与工作状态；同时采用 Harness-RL 的接口级轨迹构建机制。它是下游 Harness 的外层版本管理，而非普通子 Agent。",
    experiment:"MTAgentBench 覆盖数学、SQL、搜索、代码与研究综合。展示的 67% → 74% 修复率与 73.6% token 降低来自七轮交互中的 training-free GitHarness + StackPlanner + DeepSeek-V4-Flash；这组数字不作为 RL 训练前后增益。"
  },
  genmem:{
    motivation:"经验内容持续修订时，基于内容的寻址可能跟着漂移；语义相似的经验也未必适合当前策略。GenMem 将可学习的地址与可更新的内容分开，使经验演化不必重新分配已经学会的访问地址。",
    modules:[["Symbolic Identifier · SID","用多级离散 token 表示符号地址，在固定地址空间内保存可修改的经验内容。"],["MemRetriever / StackPlanner","检索器生成 SID，取出并改写经验，为 StackPlanner 的当前任务提供支持。"],["MemEvolver","分析执行轨迹，提炼可迁移经验，生成更新地址并插入或修订内容。"]],
    steps:["从执行轨迹获得经验，通过 SID 对齐和监督训练学习可执行的记忆读写。","结合过程与任务结果奖励训练记忆策略，StackPlanner 执行策略训练使用 Harness-RL。","在线检索经验并执行任务，将新轨迹交给 MemEvolver。","在固定 SID 空间内增加或修订内容，供后续任务访问。"],
    innovation:"让记忆检索与经验演化共用符号寻址机制。在线更新改变内容而不重分配既有地址，使已学习的访问接口能够与持续变化的经验库共同工作。",
    connection:"结合经验 Harness、记忆策略学习及 StackPlanner 执行策略训练，形成检索—执行—经验更新循环。GenMem 与 GitHarness 分别管理经验内容和需求—工作版本，是互补方向，当前不据此宣称两者已联合部署。",
    experiment:"在线演化实验的 Task ACC 从初始 30.56% 到最终检查点 36.20%，中间存在波动。该阶段冻结模型参数、编码器和 SID 码本，只更新外部经验内容；其提升与离线策略训练分别说明。"
  }
};

// These four papers belong only to the final bibliography, never the core slides.
const supplementaryPapers = [
  {id:"opd",title:"When Sparse Reward Meets Dense Distillation: Training Dynamics of On-Policy Distillation",authors:"Xinke Jiang, Tao Feng, Zhibang Yang, et al.",status:"ICLR 2027 · Submitted",url:"https://arxiv.org/abs/2609.34849"},
  {id:"dfams",title:"DFAMS: Dynamic-flow guided Federated Alignment based Multi-prototype Search",authors:"Zhibang Yang, Xinke Jiang, Rihong Qiu, et al.",status:"ACL 2026 · Oral",url:"https://aclanthology.org/2026.acl-long.1135/",code:"https://github.com/Artessay/DFAMS"},
  {id:"modelshapley",title:"MODEL SHAPLEY: Find Your Ideal Parameter Player via One Gradient Backpropagation",authors:"Chu Xu, Xinke Jiang, Rihong Qiu, Jiaran Gao, Junfeng Zhao",status:"NeurIPS 2025",url:"https://proceedings.neurips.cc/paper_files/paper/2025/hash/6724eae98f3917968d54c193ac0b45f1-Abstract-Conference.html"},
  {id:"srao",title:"SRAO: Coordinating Auxiliary Guidance and Feedback for Efficient Learning",authors:"",status:"ICLR 2027 · Under Review",url:null}
];

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
}
function externalLink(url, label, className="") {
  return `<a class="${className}" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)} <span aria-hidden="true">↗</span></a>`;
}
function readableAuthors(value) {
  return value.split(' and ').map(name=>name.includes(',')?name.split(',').reverse().map(part=>part.trim()).join(' '):name==='others'?'et al.':name).join(', ');
}
function bibliographyEntry(paper, id) {
  return `<li id="publication-${id}"><div><span class="pub-venue">${paper.status}</span></div>${paper.authors?`<p class="pub-authors">${escapeHtml(paper.authors)}</p>`:''}${paper.url?externalLink(paper.url,paper.title,'pub-title'):`<p class="pub-title">${escapeHtml(paper.title)}</p>`}${paper.code?`<div class="pub-links">${externalLink(paper.code,'Code')}</div>`:''}</li>`;
}
function publicationHtml(){
  const entries=[
    ...slideOrder.map(id=>({...papers[id],id,url:paperUrl(papers[id]),authors:readableAuthors(papers[id].authors)})),
    ...supplementaryPapers
  ];
  // Conference/submission year descending; stable research order within a year.
  const year=paper=>Number(paper.status.match(/\b20\d{2}\b/)?.[0] || 0);
  entries.sort((a,b)=>year(b)-year(a));
  return `<ol class="publications">${entries.map(paper=>bibliographyEntry(paper,paper.id)).join('')}</ol>`;
}
