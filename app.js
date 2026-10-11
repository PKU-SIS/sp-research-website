"use strict";

document.querySelectorAll('[data-repositories]').forEach(element=>{
  element.innerHTML=systemRepositories.map(repo=>element.dataset.compact
    ? externalLink(repo.url, `${repo.version} · ${repo.name}`)
    : `<a class="repo-card" href="${repo.url}" target="_blank" rel="noopener noreferrer"><div><span>${repo.version}</span><h2>${repo.name}</h2><b aria-hidden="true">↗</b></div><p>${repo.description}</p><span class="repo-cta">GitHub · 代码与使用文档</span></a>`).join('');
});

document.getElementById("paper-slides").innerHTML=slideOrder.map(id=>{
  const paper=papers[id], note=researchNotes[id], detail=paperDetails[id], dimensions=figureSizes[id], resources=paperResources[id] || [];
  return `<section class="slide paper-slide" id="paper-${id}" aria-labelledby="title-${id}">
    <div class="slide-heading"><h2 id="title-${id}">${paper.name}</h2><span class="paper-venue">${paper.status}</span></div>
    <p class="paper-title">${paper.title}</p>
    <p class="paper-headline">${paper.headline}</p>
    <div class="paper-summary"><b>问题</b><p>${paper.question}</p></div>
    <figure class="framework-figure"><button class="framework-open" data-framework="${id}" aria-label="放大 ${paper.name} Framework"><img src="./assets/${id}-framework.png" alt="${paper.name} 的原始框架图：${paper.headline}" width="${dimensions[0]}" height="${dimensions[1]}" loading="lazy" decoding="async"><span class="zoom-corner" aria-hidden="true">放大 ↗</span></button><figcaption>Figure ${figureNumbers[id]} · 论文原图</figcaption></figure>
    <div class="paper-takeaways"><h3 class="takeaway-title">方法</h3><p class="takeaway-content">${note.mechanism}</p></div>
    <div class="paper-result"><b>结果</b><p><strong class="result-value">${paper.metric}</strong><span class="result-unit">${paper.unit}</span></p><p class="result-context">${paper.result}</p></div>
    <div class="paper-actions">${externalLink(paperUrl(paper),'Paper','resource-button')}${resources.map(resource=>externalLink(resource.url,resource.label,'resource-button')).join('')}<button class="analysis-toggle" id="toggle-${id}" aria-expanded="false" aria-controls="analysis-${id}" data-analysis="${id}">展开解析 <span aria-hidden="true">＋</span></button></div>
    <div class="paper-analysis" id="analysis-${id}" role="region" aria-label="${paper.name} 详细解析" hidden>
      <div class="analysis-section"><h3>研究动机</h3><p>${detail.motivation}</p></div>
      <div class="analysis-section"><h3>Framework 怎么读</h3><dl class="module-explanations">${detail.modules.map(([name,text])=>`<div><dt>${name}</dt><dd>${text}</dd></div>`).join('')}</dl></div>
      <div class="analysis-section"><h3>方法如何运行</h3><ol class="method-steps">${detail.steps.map(text=>`<li>${text}</li>`).join('')}</ol></div>
      <div class="analysis-section"><h3>主要创新</h3><p>${detail.innovation}</p></div>
      <div class="analysis-section analysis-connection"><h3>与系列工作的关系</h3><p>${detail.connection}</p></div>
      <div class="analysis-section"><h3>实验设置与结果</h3><p>${detail.experiment}</p></div>
      <div class="analysis-sources"><p>${externalLink(paperUrl(paper),`原文 · Figure ${figureNumbers[id]}，PDF 第 ${figurePages[id]} 页`)}</p>${resources.map(resource=>`<p>${externalLink(resource.url,resource.label)}<span>${resource.description}</span></p>`).join('')}</div>
      <button class="analysis-close" data-analysis-close="${id}">收起解析 ↑</button>
    </div>
  </section>`;
}).join('');

function setAnalysis(id, expanded, restoreFocus=false) {
  const toggle=document.getElementById(`toggle-${id}`), panel=document.getElementById(`analysis-${id}`);
  toggle.setAttribute('aria-expanded',String(expanded));
  toggle.innerHTML=expanded?'收起解析 <span aria-hidden="true">−</span>':'展开解析 <span aria-hidden="true">＋</span>';
  panel.hidden=!expanded;
  if(restoreFocus){toggle.focus({preventScroll:true});toggle.scrollIntoView({block:'center',behavior:'instant'});}
}
document.querySelectorAll('[data-analysis]').forEach(button=>button.addEventListener('click',()=>setAnalysis(button.dataset.analysis,button.getAttribute('aria-expanded')!=='true')));
document.querySelectorAll('[data-analysis-close]').forEach(button=>button.addEventListener('click',()=>setAnalysis(button.dataset.analysisClose,false,true)));

document.getElementById('publication-list').innerHTML=publicationHtml();

const dialog=document.getElementById("framework-dialog");
const viewerImage=document.getElementById("viewer-image");
const viewerCanvas=document.querySelector(".viewer-canvas");
const zoomButton=document.getElementById("viewer-zoom");
let previousOverflow="";
function openFramework(id) {
  const paper=id === "system" ? {name:"StackPlanner 2.0 系统架构"} : papers[id];
  if (!paper) return;
  document.getElementById("viewer-title").textContent=paper.name+" · Framework";
  document.getElementById("viewer-source").textContent=id === "system" ? "团队提供的 StackPlanner 2.0 完整系统架构" : `论文原图 · Figure ${figureNumbers[id]} · PDF 第 ${figurePages[id]} 页`;
  viewerImage.src=id === "system" ? "./assets/sp2-runtime-original.png" : `./assets/${id}-framework.png`;
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
  document.getElementById('demo-case-content').innerHTML=`<div class="demo-case-title"><h4>${item.title}</h4><p>${item.task}</p></div><div class="demo-step-nav" role="group" aria-label="案例步骤">${item.steps.map((entry,i)=>`<button data-demo-step="${i}" aria-pressed="${i===step}"><span>${i+1}</span>${entry.label}</button>`).join('<i aria-hidden="true">→</i>')}</div><p class="demo-step-summary">${current.text}</p><figure class="demo-evidence"><a href="./assets/demo/${current.image}" target="_blank" rel="noopener noreferrer" aria-label="打开案例原图：${current.label}"><img src="./assets/demo/${current.image}" alt="${current.alt}" loading="lazy" decoding="async"></a><figcaption><span>StackPlanner 2.0 实际运行截图</span><a href="./assets/demo/${current.image}" target="_blank" rel="noopener noreferrer">查看原图 ↗</a></figcaption></figure>`;
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
    event.preventDefault();selectDemoView(demoTabs[event.key==='Home'?0:event.key==='End'?demoTabs.length-1:(index+(event.key==='ArrowLeft'?-1:1)+demoTabs.length)%demoTabs.length],true);
  });
});

document.querySelectorAll('[data-video-time]').forEach(button=>button.addEventListener('click',()=>{
  const video=document.querySelector('.demo-video');
  video.currentTime=Number(button.dataset.videoTime);
  video.play().catch(()=>{});
}));
