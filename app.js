"use strict";

const papers = {
  tcrag: {
    name: "TC-RAG", category: "foundation", label: "STACK MEMORY & STATE CONTROL", number: "00",
    headline: "以栈式记忆管理检索、推理与状态。",
    question: "多步检索与推理中，如何监测执行状态、清理错误信息，并判断何时继续或停止？",
    flow: [["STATE", "监测中间执行状态"], ["STACK", "Push / Pop 管理记忆"], ["CONTROL", "回溯、压缩与停止判断"]],
    position: "SP 的先驱工作：以状态监测和栈式工作记忆组织单 Agent 的检索与推理，为后续分层协作和记忆动作学习提供研究基础。",
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
    position: "SP 的基础 Harness：分离中心协调与子任务执行，通过显式任务栈维护中间状态，并支持报告生成与反馈修订。",
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
    position: "基于 SP 框架开发的深度研究扩展。以大纲树组织章节意图和证据，利用检索、结构、生成三维效用，以及 NLI 支持度校验控制更新。",
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
  loongreflect:{group:"神经侧 / 策略学习",subtitle:"反思与路径恢复",mechanism:"以可恢复轨迹树保存执行分支，通过遮蔽答案的全局反馈监督局部反思，并协调蒸馏与结果 RL 两个训练通道。",connection:"承接 AgenticRag-R1 的记忆控制研究，回应 SP 长程执行中的反思与恢复问题；后续 Harness-RL 进一步面向复杂 Harness 的策略训练。"},
  harnessrl:{group:"共用训练基础",subtitle:"Harness-RL",mechanism:"通过接口调用记录、会话前缀树及分段归因构建训练样本；利用激活统计和梯度路由，缓解 Action 与 Args 的优化冲突。",connection:"承接 AgenticRag-R1 → LoongReflect 的策略学习研究，并成为后续工作的训练基础：GitHarness 用于训练 Git Agent，GenMem 用于训练 StackPlanner 执行策略。"},
  scaffoldagent:{group:"符号侧 / 结构协作",subtitle:"ScaffoldAgent",mechanism:"基于 SP 框架，将章节意图与证据组织为可更新的大纲树，通过扩展、收缩、修订及三维效用反馈控制结构演化。",connection:"GitHarness 的前驱工作：先研究报告任务中的局部结构修订，再将问题推进到通用需求变化与历史工作状态管理。"},
  githarness:{group:"神经符号融合",subtitle:"动态需求与持续协作",mechanism:"将有效需求与工作状态配对保存为版本，通过需求解析、历史基础选择和执行路由复用或修订历史工作；Harness-RL 训练 Git Agent，下游执行组件冻结。",connection:"将两侧方法结合用于更复杂的动态需求任务：Harness 管理需求—状态版本，Harness-RL 训练 Git Agent 的需求解析与历史选择；下游执行组件在该训练中冻结。"},
  genmem:{group:"神经符号融合",subtitle:"经验复用与持续演化",mechanism:"MemRetriever 生成 SID 并检索经验，StackPlanner 执行，MemEvolver 提炼轨迹并更新内容。结合记忆策略学习与 Harness-RL 的 SP 执行策略训练；在线阶段固定模型参数和 SID 码本。",connection:"将经验寻址、检索与更新机制，同记忆策略学习及 Harness-RL 的 SP 执行策略训练结合，面向可持续的经验利用。在线检索—执行—更新循环固定模型参数并更新外部记忆内容。"}
};

document.getElementById("paper-slides").innerHTML = slideOrder.map(id => {
  const paper=papers[id], note=researchNotes[id], dimensions=figureSizes[id];
  return `<section class="slide paper-slide" id="paper-${id}" aria-labelledby="title-${id}">
    <div class="slide-heading"><h2 id="title-${id}">${paper.name}</h2><span class="paper-venue">${paper.status}</span></div>
    <p class="paper-title">${paper.title}</p>
    <div class="paper-summary"><b>研究问题</b><p>${paper.question}</p></div>
    <figure class="framework-figure"><button class="framework-open" data-framework="${id}" aria-label="放大 ${paper.name} Framework"><img src="./assets/${id}-framework.png" alt="${paper.name} 的原始框架图：${paper.headline}" width="${dimensions[0]}" height="${dimensions[1]}" loading="lazy" decoding="async"><span class="zoom-corner" aria-hidden="true">放大 ↗</span></button><figcaption><a href="${paperUrl(paper)}" target="_blank" rel="noopener noreferrer" title="${paper.name} 原文，Figure ${figureNumbers[id]}，PDF 第 ${figurePages[id]} 页">Figure ${figureNumbers[id]} · 论文原文 ↗</a></figcaption></figure>
    <div class="paper-takeaways"><h3 class="takeaway-title">方法</h3><p class="takeaway-content">${note.mechanism}</p></div>
    <div class="paper-result"><b>结果</b><p><strong class="result-value">${paper.metric}</strong><span class="result-unit">${paper.unit}</span></p><p class="result-context">${paper.result}</p></div>
  </section>`;
}).join("");

const dialog=document.getElementById("framework-dialog");
const viewerImage=document.getElementById("viewer-image");
const viewerCanvas=document.querySelector(".viewer-canvas");
const zoomButton=document.getElementById("viewer-zoom");
let previousOverflow="";
function openFramework(id) {
  const paper=papers[id];
  if (!paper) return;
  document.getElementById("viewer-title").textContent=paper.name+" · Framework";
  document.getElementById("viewer-source").textContent=`论文原图 · Figure ${figureNumbers[id]} · PDF 第 ${figurePages[id]} 页`;
  viewerImage.src=`./assets/${id}-framework.png`;
  viewerImage.alt=paper.name+" 完整 Framework 原图";
  document.getElementById("viewer-download").href=viewerImage.src;
  document.getElementById("viewer-download").download=paper.name+"-Framework.png";
  viewerCanvas.classList.remove("natural-size");
  zoomButton.textContent="原始尺寸";
  previousOverflow=document.body.style.overflow;
  document.body.style.overflow="hidden";
  dialog.showModal();
}
document.querySelectorAll("[data-framework]").forEach(button=>button.addEventListener("click",()=>openFramework(button.dataset.framework)));
document.getElementById("viewer-close").addEventListener("click",()=>dialog.close());
dialog.addEventListener("close",()=>{document.body.style.overflow=previousOverflow;});
dialog.addEventListener("click",event=>{if(event.target===dialog)dialog.close();});
zoomButton.addEventListener("click",()=>{
  const natural=viewerCanvas.classList.toggle("natural-size");
  zoomButton.textContent=natural?"适应窗口":"原始尺寸";
  viewerCanvas.scrollTop=0;
  viewerCanvas.scrollLeft=0;
});

const navLinks=[...document.querySelectorAll(".chapter-nav>a")];
function setActiveSection(id) {
  navLinks.forEach(link=>{
    const active=link.getAttribute("href")==="#"+id;
    link.classList.toggle("active",active);
    if(active)link.setAttribute("aria-current","location");
    else link.removeAttribute("aria-current");
  });
}
navLinks.forEach(link=>link.addEventListener("click",()=>setActiveSection(link.hash.slice(1))));
let scrollScheduled=false;
function updateActiveSection() {
  const header=innerWidth<=650?140:100;
  const sections=[...document.querySelectorAll("main>section, #paper-slides>section")];
  let current="overview";
  sections.forEach(section=>{if(section.getBoundingClientRect().top<=header)current=section.id;});
  setActiveSection(current);
  scrollScheduled=false;
}
document.addEventListener("scroll",()=>{
  if(!scrollScheduled){scrollScheduled=true;requestAnimationFrame(updateActiveSection);}
},{passive:true});
updateActiveSection();
if(location.hash){
  const target=document.getElementById(location.hash.slice(1));
  if(target)requestAnimationFrame(()=>target.scrollIntoView({behavior:"instant"}));
}

const systemTabs=[...document.querySelectorAll('[data-system-view]')];
function selectSystemView(tab,focus=false) {
  systemTabs.forEach(item=>{
    const selected=item===tab;
    item.setAttribute('aria-selected',String(selected));
    item.tabIndex=selected?0:-1;
    document.getElementById(item.getAttribute('aria-controls')).hidden=!selected;
  });
  if(focus)tab.focus();
}
systemTabs.forEach((tab,index)=>{
  tab.addEventListener('click',()=>selectSystemView(tab));
  tab.addEventListener('keydown',event=>{
    let next=index;
    if(event.key==='ArrowRight')next=(index+1)%systemTabs.length;
    else if(event.key==='ArrowLeft')next=(index+systemTabs.length-1)%systemTabs.length;
    else if(event.key==='Home')next=0;
    else if(event.key==='End')next=systemTabs.length-1;
    else return;
    event.preventDefault();
    selectSystemView(systemTabs[next],true);
  });
});

// Demonstrations use supplied recordings and real screenshots, without model requests.
const demoCases = {
  adapt: {title:"发现证据缺口，补检索并更新大纲", task:"比较 PostgreSQL 17、MySQL 8.4 与 SQLite 3.45 的架构、并发、隔离级别和适用场景。", steps:[
    {label:"预检索 · 大纲 v1",text:"预检索形成证据台账与初版大纲；中枢检查后发现证据缺口。",image:"outline-v1.png",alt:"预检索任务完成，生成 research_observation-v1 与 outline-v1 工件"},
    {label:"补检索 · 大纲 v2",text:"按章节定向补检索，保留引用编号，更新证据和大纲工件。",image:"outline-v2.png",alt:"第二轮定向检索完成，生成 research_observation-v2 与 outline-v2 工件"}
  ]},
  clarify: {title:"检索过程中主动确认需求口径",task:"收集国际保险公司综合实力、资产与分红信息，形成比较报告。",steps:[
    {label:"主动澄清",text:"系统询问数据窗口、排名口径和分红类型；用户确认使用 2020—2024 年数据，其余由系统选择。",image:"clarify.png",alt:"系统主动询问五项需求口径，用户补充数据窗口为2020至2024年"}
  ]},
  feedback: {title:"初稿完成后，明确证据缺口并征询反馈",task:"生成 PostgreSQL、MySQL 与 SQLite 的技术比较报告。",steps:[
    {label:"交付前反馈",text:"系统披露初稿中的证据缺口，询问修改、接受当前版本或补齐证据。该记录中仍存在子任务失败。",image:"draft-feedback.png",alt:"系统说明报告为partial，披露证据缺口，并给出修改、接受或补检索三个选项"}
  ]},
  recover: {title:"分节委派失败后，保留状态并请求处理方式",task:"将技术比较报告拆为多个章节，并行委派 reporter 撰写。",steps:[
    {label:"分节委派",text:"分发独立章节任务，绑定证据与引用；记录显示三个 reporter 子任务失败。",image:"delegate.png",alt:"三个并行分节任务包含明确的章节范围与引用约束，均标记子任务失败"},
    {label:"失败后求助",text:"重试仍受阻，系统保留证据与大纲，询问等待修复、改由 coder 生成，或在对话中交付；截图未展示恢复成功。",image:"recovery.png",alt:"系统说明reporter环境受阻，保留证据与大纲，并提出后续处理选项"}
  ]}
};
let activeDemoCase="adapt";
function renderDemoCase(key,step=0) {
  const item=demoCases[key]; if(!item)return;
  activeDemoCase=key;
  document.querySelectorAll('[data-demo-case]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.demoCase===key)));
  const current=item.steps[step];
  document.getElementById('demo-case-content').innerHTML=`<div class="demo-case-title"><h4>${item.title}</h4><p>${item.task}</p></div><div class="demo-step-nav" role="group" aria-label="案例步骤">${item.steps.map((entry,i)=>`<button data-demo-step="${i}" aria-pressed="${i===step}"><span>${i+1}</span>${entry.label}</button>`).join('<i aria-hidden="true">→</i>')}</div><p class="demo-step-summary">${current.text}</p><figure class="demo-evidence"><a href="./assets/demo/${current.image}" target="_blank" rel="noopener noreferrer" aria-label="打开案例原图：${current.label}"><img src="./assets/demo/${current.image}" alt="${current.alt}" loading="lazy" decoding="async"></a><figcaption><span>SP2 实际运行截图</span><a href="./assets/demo/${current.image}" target="_blank" rel="noopener noreferrer">查看原图 ↗</a></figcaption></figure>`;
}
document.querySelectorAll('[data-demo-case]').forEach(button=>button.addEventListener('click',()=>renderDemoCase(button.dataset.demoCase)));
document.getElementById('demo-case-content').addEventListener('click',event=>{
  const button=event.target.closest('[data-demo-step]');
  if(button)renderDemoCase(activeDemoCase,Number(button.dataset.demoStep));
});
renderDemoCase('adapt');
const demoTabs=[...document.querySelectorAll('[data-demo-view]')];
function selectDemoView(tab,focus=false) {
  demoTabs.forEach(item=>{const selected=item===tab;item.setAttribute('aria-selected',String(selected));item.tabIndex=selected?0:-1;document.getElementById(item.getAttribute('aria-controls')).hidden=!selected;});
  if(tab.dataset.demoView!=='sp1')document.querySelector('.demo-video').pause();
  if(focus)tab.focus();
}
demoTabs.forEach((tab,index)=>{
  tab.addEventListener('click',()=>selectDemoView(tab));
  tab.addEventListener('keydown',event=>{
    if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
    event.preventDefault();selectDemoView(demoTabs[event.key==='Home'?0:event.key==='End'?demoTabs.length-1:(index+1)%demoTabs.length],true);
  });
});

document.querySelectorAll('[data-video-time]').forEach(button=>button.addEventListener('click',()=>{
  const video=document.querySelector('.demo-video');
  video.currentTime=Number(button.dataset.videoTime);
  video.play().catch(()=>{});
}));
