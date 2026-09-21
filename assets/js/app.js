(() => {
  const scenarios = window.ONE_DETROIT_SCENARIOS || [];
  const app = document.getElementById('app');
  const GENERATED_KEY = 'oneDetroitGeneratedProjectsV2';
  const LAST_RESULT_KEY = 'oneDetroitLastResultV2';
  const DRAFT_KEY = 'oneDetroitDraftV2';

  const esc = (v='') => String(v).replace(/[&<>'"]/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[m]));
  const arr = v => Array.isArray(v) ? v : [];
  const route = () => location.hash.replace(/^#/, '') || '/';
  const go = p => { location.hash = p; };
  const getScenario = id => scenarios.find(s => s.id === id) || scenarios[0];
  const generated = () => { try{return JSON.parse(localStorage.getItem(GENERATED_KEY)||'[]')}catch{return []} };
  const saveGenerated = items => localStorage.setItem(GENERATED_KEY, JSON.stringify(items));
  const getLast = () => { try{return JSON.parse(sessionStorage.getItem(LAST_RESULT_KEY)||'null')}catch{return null} };
  const setLast = x => sessionStorage.setItem(LAST_RESULT_KEY, JSON.stringify(x));
  const getDraft = () => { try{return JSON.parse(sessionStorage.getItem(DRAFT_KEY)||'null')}catch{return null} };
  const setDraft = x => sessionStorage.setItem(DRAFT_KEY, JSON.stringify(x));

  function header(mode=''){
    return `<header class="topbar"><div class="shell topbar-inner">
      <a class="brand" href="#/"><span class="brand-mark">1D</span><span>One Detroit</span></a>
      ${mode?`<span class="mode-badge">${mode==='city'?'City Intelligence':'Public Portal'}</span>`:''}
      <span class="nav-spacer"></span>
      ${mode==='city'?'<a class="nav-link" href="#/public">Public Portal</a>':mode==='public'?'<a class="nav-link" href="#/city">City Intelligence</a>':''}
    </div></header>`;
  }
  const footer=()=>`<footer class="footer"><div class="shell">One Detroit · Hackathon MVP · Human-reviewed civic decision support</div></footer>`;
  const core=()=>`<div class="core-message">The city sees disconnected data. Residents experience disconnected problems. <b>One Detroit turns both into coordinated solutions.</b></div>`;

  function landing(){
    app.innerHTML = `${header()}<section class="hero"><div class="shell hero-grid"><div>
      <div class="eyebrow">Civic intelligence platform</div><h1>Different data. A stronger Detroit.</h1>
      <p>One city. One intelligence layer. Two experiences — a workspace for city teams and a transparent portal for residents.</p>
      <div class="hero-actions">
        <a class="choice primary" href="#/city"><h3>City Intelligence</h3><p>Connect signals, edit assumptions, run the Opportunity Engine, and design coordinated interventions.</p><span class="arrow">→</span></a>
        <a class="choice" href="#/public"><h3>Public Portal</h3><p>Explore projects, programs, upcoming opportunities, and the reason behind proposed interventions.</p><span class="arrow">→</span></a>
      </div></div>
      <div class="hero-card"><div class="eyebrow">How it works</div><strong>Disconnected systems become shared context.</strong><p>One Detroit looks across needs, public assets, budgets, agencies, contractors, partners and hotspots — then suggests one coordinated opportunity for human review.</p>${core()}</div>
    </div></section><div class="shell"><div class="core-message"><b>One intervention. Multiple outcomes.</b> The demo is designed to show the full path from editable inputs → AI opportunity → public-facing project.</div></div>${footer()}`;
  }

  function draftFromScenario(id){
    if(id==='custom') return {scenarioId:'custom',scenario_name:'Custom Opportunity',category:'Community',datasets:[
      {name:'Underused public asset',source:'City asset inventory',detail:'Describe the available asset or capacity'},
      {name:'Unmet resident need',source:'Community or program data',detail:'Describe the need or gap'},
      {name:'Potential partner capability',source:'Partner / workforce data',detail:'Describe a complementary capability'}
    ],delivery_context:{budget:'',staffing:'',agencies:'',lead_agency:'',contractors:'',partners:'',funding:'',hotspots:'',sustainability:''},fallback_result:null};
    const s=getScenario(id);
    return {scenarioId:s.id,scenario_name:s.name,category:s.category,datasets:JSON.parse(JSON.stringify(s.datasets)),delivery_context:{budget:s.result.estimated_budget.replace(/\s*—.*$/,''),staffing:s.result.staffing_needs.join('; '),agencies:s.result.supporting_agencies.join(', '),lead_agency:s.result.lead_agency,contractors:s.result.contractor_needs.join('; '),partners:s.result.partners.join(', '),funding:s.result.funding_options.join('; '),hotspots:s.result.hot_spots.join(', '),sustainability:s.sustainability},fallback_result:s.result};
  }

  function city(){
    let draft=getDraft() || draftFromScenario(scenarios[0].id);
    setDraft(draft);
    app.innerHTML=`${header('city')}<main class="page"><div class="shell">
      <div class="page-head"><div><div class="eyebrow">Opportunity workspace</div><h1>Find what separate systems cannot see alone.</h1><p>Edit the signals live. Add a completely new scenario. Then let One Detroit connect the dots and produce a city strategy plus a resident-facing version.</p></div><button id="analyzeTop" class="button">Analyze Opportunity</button></div>
      <div class="workspace">
        <aside class="card card-pad"><div class="section-title">Scenario</div><div id="scenarioList" class="scenario-list"></div><button id="resetDemo" class="button danger small" style="margin-top:14px;width:100%">Reset demo</button></aside>
        <section class="stack"><div class="card card-pad"><div class="title-row"><input id="scenarioName" class="input" value="${esc(draft.scenario_name)}" style="font-size:20px;font-weight:800;color:var(--navy)"><span class="pill">Editable</span></div>
          <div style="margin-top:10px;max-width:260px"><div class="field"><label>Category</label><select id="category" class="select">${['Environment','Education','Transportation','Community Spaces','Workforce','Community'].map(x=>`<option ${x===draft.category?'selected':''}>${x}</option>`).join('')}</select></div></div>
          <div class="section-title" style="margin-top:20px">Independent input signals</div><div id="datasetList" class="dataset-list"></div><button id="addSignal" class="add-signal">+ Add another signal</button></div>
          <div class="card card-pad"><div class="section-title">Opportunity map — illustrative</div><div class="mapbox"><div class="map-shape"></div><div id="hotspotMap" class="hotspot-wrap"></div></div></div>
        </section>
        <aside class="stack"><div class="card card-pad"><div class="section-title">Feasibility context</div><div class="context-grid" id="contextFields"></div></div>
          <div class="card card-pad"><div class="section-title">Engine flow</div><div class="process">${['Inputs','Contextualize','Cross-system analysis','Detect opportunity','Feasibility','Strategy','Public translation'].map((x,i)=>`<div class="process-step ${i===0?'on':''}"><i>${i+1}</i><span>${x}</span></div>`).join('')}</div><div id="loading" class="loading"><span class="spinner"></span>Connecting city signals…</div></div>
        </aside>
      </div>
    </div></main>${footer()}`;

    const list=document.getElementById('scenarioList');
    const renderScenarioButtons=()=>{list.innerHTML=scenarios.map(s=>`<button class="scenario-btn ${draft.scenarioId===s.id?'active':''}" data-id="${s.id}"><b>${esc(s.name)}</b><span>${esc(s.category)} · ${s.datasets.length} signals</span></button>`).join('')+`<button class="scenario-btn custom ${draft.scenarioId==='custom'?'active':''}" data-id="custom"><b>+ Custom Opportunity</b><span>Create a new set of unrelated signals</span></button>`;
      list.querySelectorAll('button').forEach(b=>b.onclick=()=>{draft=draftFromScenario(b.dataset.id);setDraft(draft);city();});};
    renderScenarioButtons();

    const ds=document.getElementById('datasetList');
    const renderDatasets=()=>{ds.innerHTML=draft.datasets.map((d,i)=>`<div class="dataset-card"><div class="dataset-top"><div class="field"><label>Signal / dataset</label><input class="input ds-name" data-i="${i}" value="${esc(d.name)}"></div><div class="field"><label>Source / system</label><input class="input ds-source" data-i="${i}" value="${esc(d.source)}"></div><button class="remove" data-i="${i}" title="Remove">×</button></div><div class="field dataset-detail"><label>What does the signal say?</label><textarea class="textarea ds-detail" data-i="${i}">${esc(d.detail)}</textarea></div></div>`).join('');
      ds.querySelectorAll('.remove').forEach(x=>x.onclick=()=>{draft.datasets.splice(+x.dataset.i,1);setDraft(draft);renderDatasets();});
      ['name','source','detail'].forEach(k=>ds.querySelectorAll(`.ds-${k}`).forEach(el=>el.oninput=()=>{draft.datasets[+el.dataset.i][k]=el.value;setDraft(draft);}));};
    renderDatasets();
    document.getElementById('addSignal').onclick=()=>{draft.datasets.push({name:'New signal',source:'Another city / partner system',detail:'Describe what this system knows'});setDraft(draft);renderDatasets();};

    const fields=[['budget','Budget context'],['staffing','Employees / capacity'],['lead_agency','Potential lead'],['agencies','Agencies'],['contractors','Contractors / vendors'],['partners','Partners'],['funding','Funding / business model'],['hotspots','Hot spot hints'],['sustainability','Sustainability']];
    const cf=document.getElementById('contextFields'); cf.innerHTML=fields.map(([k,l])=>`<div class="field"><label>${l}</label><textarea class="textarea ctx" data-k="${k}" style="min-height:58px">${esc(draft.delivery_context[k]||'')}</textarea></div>`).join('');
    cf.querySelectorAll('.ctx').forEach(el=>el.oninput=()=>{draft.delivery_context[el.dataset.k]=el.value;setDraft(draft);renderHotspots();});
    const renderHotspots=()=>{const h=(draft.delivery_context.hotspots||'').split(',').map(x=>x.trim()).filter(Boolean);document.getElementById('hotspotMap').innerHTML=(h.length?h:['Editable hotspot hints']).map(x=>`<span class="hotspot">${esc(x)}</span>`).join('');};renderHotspots();
    document.getElementById('scenarioName').oninput=e=>{draft.scenario_name=e.target.value;setDraft(draft)};
    document.getElementById('category').onchange=e=>{draft.category=e.target.value;setDraft(draft)};
    document.getElementById('resetDemo').onclick=()=>{sessionStorage.removeItem(DRAFT_KEY);sessionStorage.removeItem(LAST_RESULT_KEY);localStorage.removeItem(GENERATED_KEY);draft=draftFromScenario(scenarios[0].id);setDraft(draft);city();};
    const analyze=async()=>{if(draft.datasets.length<2){alert('Add at least two signals so the engine can look for a cross-system opportunity.');return;}document.getElementById('loading').classList.add('show');document.querySelectorAll('.button').forEach(b=>b.disabled=true);
      try{const r=await fetch('/api/analyze.php',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(draft)});const data=await r.json();if(!data.ok)throw new Error(data.error||'Analysis failed');setLast({source:data.source,note:data.note||'',model:data.model||'',result:data.result,draft,createdAt:new Date().toISOString()});go('/city/opportunity');}catch(e){alert('Could not run the Opportunity Engine: '+e.message);document.getElementById('loading').classList.remove('show');document.querySelectorAll('.button').forEach(b=>b.disabled=false);}};
    document.getElementById('analyzeTop').onclick=analyze;
  }

  function bullets(items){return `<ul class="list">${arr(items).map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`}
  function resultPage(){const x=getLast();if(!x){go('/city');return;}const r=x.result,d=x.draft;app.innerHTML=`${header('city')}<main class="page"><div class="shell"><a class="nav-link" href="#/city">← Back to workspace</a><div style="height:14px"></div>
    <section class="result-hero"><div class="eyebrow">Opportunity detected</div><h1>${esc(r.opportunity_name)}</h1><p>${esc(r.problem_summary)}</p><span class="source-note">Engine: ${x.source==='openai'?'Live AI analysis':'Demo fallback'}${x.model?' · '+esc(x.model):''}</span>${x.note?`<span class="source-note" style="margin-left:6px">${esc(x.note)}</span>`:''}</section>
    <div class="result-grid"><div class="stack">
      <section class="card card-pad"><div class="section-title">What One Detroit connected</div>${bullets(r.connections_detected)}</section>
      <section class="card card-pad"><div class="section-title">Suggested coordinated strategy</div><p style="line-height:1.6;margin:0">${esc(r.recommended_strategy)}</p></section>
      <section class="card card-pad"><div class="section-title">Expected multi-system outcomes</div>${bullets(r.expected_outcomes)}</section>
      <section class="card card-pad"><div class="section-title">Evidence & assumptions</div><div class="context-grid"><div><b>Evidence used</b>${bullets(r.evidence_used)}</div><div><b>Human review required</b>${bullets(r.assumptions)}</div></div></section>
    </div><aside class="stack"><section class="card card-pad"><div class="section-title">Feasibility summary</div><div class="feasibility">
      ${[['Budget',r.estimated_budget],['Lead',r.lead_agency],['Hot spots',arr(r.hot_spots).join(', ')],['Staffing',arr(r.staffing_needs).join('; ')],['Agencies',arr(r.supporting_agencies).join(', ')],['Contractors',arr(r.contractor_needs).join('; ')],['Partners',arr(r.partners).join(', ')],['Funding',arr(r.funding_options).join('; ')]].map(([a,b])=>`<div class="mini"><span>${esc(a)}</span><b>${esc(b)}</b></div>`).join('')}
    </div></section><section class="card card-pad"><div class="section-title">Existing assets</div>${bullets(r.existing_assets)}</section></aside></div>
    <div class="publish-bar"><div><b>Translate this city strategy into a resident-facing project.</b><p>The public version keeps the reason, solution, programs and status — without exposing internal technical detail.</p></div><button id="publish" class="button green">Generate Public Version</button></div>
    </div></main>${footer()}`;
    document.getElementById('publish').onclick=()=>{const id='generated-'+Date.now();const publicProject={id,name:r.opportunity_name,category:d.category||'Community',status:'Exploring',resident_summary:r.public_summary,generated:true,createdAt:new Date().toISOString(),result:r,datasets:d.datasets,publicView:{why:r.problem_summary,today:`Residents currently experience separate issues represented by ${d.datasets.slice(0,4).map(z=>z.name).join(', ')}.`,connected:r.connections_detected,solution:r.recommended_strategy.replace(/^Suggested strategy:\s*/i,''),included:[...arr(r.expected_outcomes).slice(0,3),...arr(r.existing_assets).slice(0,2)],neighborhoods:r.hot_spots,timeline:[{phase:'Validate with residents & agencies',when:'Next step'},{phase:'Pilot design',when:'After validation'},{phase:'Launch pilot',when:'To be scheduled'}],programs:arr(r.expected_outcomes).slice(0,2),coming_soon:['Community review','Pilot partners confirmed']}};const items=generated();items.unshift(publicProject);saveGenerated(items.slice(0,8));go('/public/project/'+id);};
  }

  function allProjects(){return [...generated(),...scenarios]}
  function publicHome(){const projects=allProjects();app.innerHTML=`${header('public')}<section class="public-hero"><div class="shell"><div class="eyebrow">Resident experience</div><h1>What’s happening in Detroit?</h1><p style="color:var(--muted);font-size:17px;max-width:720px">See projects, programs and opportunities — plus a simple explanation of why each project is being explored.</p></div></section><main class="page" style="padding-top:20px"><div class="shell">${generated().length?`<div class="generated-banner"><b>Live demo:</b> ${generated().length} opportunity ${generated().length===1?'has':'have'} been generated from City Intelligence and published here in this browser.</div>`:''}<div class="filters" id="filters"><button class="filter active" data-cat="All">All</button>${['Environment','Education','Transportation','Community Spaces','Workforce','Community'].map(x=>`<button class="filter" data-cat="${x}">${x}</button>`).join('')}</div><div id="projects" class="project-grid"></div></div></main>${footer()}`;
    const box=document.getElementById('projects'); const render=cat=>{const list=projects.filter(p=>cat==='All'||p.category===cat);box.innerHTML=list.map(p=>`<article class="project-card"><div class="project-band"></div><div class="project-body"><div class="project-meta"><span class="pill">${esc(p.category)}</span><span class="pill green">${esc(p.status||'Exploring')}</span>${p.generated?'<span class="pill orange">Generated live</span>':''}</div><h3>${esc(p.name)}</h3><p>${esc(p.resident_summary||p.result?.public_summary||'')}</p><a class="project-link" href="#/public/project/${esc(p.id)}">Why this project? →</a></div></article>`).join('')||'<div class="empty">No projects in this category.</div>';};render('All');document.querySelectorAll('.filter').forEach(b=>b.onclick=()=>{document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');render(b.dataset.cat)});
  }

  function publicProject(id){const p=allProjects().find(x=>x.id===id);if(!p){go('/public');return;}const v=p.publicView||{};app.innerHTML=`${header('public')}<main class="page"><div class="shell"><a class="nav-link" href="#/public">← All projects</a><div style="height:14px"></div><section class="result-hero" style="background:linear-gradient(135deg,#163b63,#2d8a65)"><div class="eyebrow">${p.generated?'Generated from City Intelligence':'Public project'}</div><h1>${esc(p.name)}</h1><p>${esc(p.resident_summary||p.result?.public_summary||'')}</p><div class="project-meta"><span class="source-note">${esc(p.category)}</span><span class="source-note">${esc(p.status||'Exploring')}</span></div></section>
      <div class="public-detail" style="margin-top:18px"><div class="stack"><section class="card card-pad"><div class="section-title">Why this project?</div><p style="line-height:1.65;margin:0">${esc(v.why||'')}</p></section><section class="card card-pad"><div class="section-title">What residents experience today</div><p style="line-height:1.65;margin:0">${esc(v.today||'')}</p></section><section class="card card-pad"><div class="section-title">What One Detroit connected</div>${bullets(v.connected)}</section><section class="card card-pad"><div class="section-title">Proposed solution</div><p style="line-height:1.65;margin:0">${esc(v.solution||'')}</p></section><section class="card card-pad"><div class="section-title">What could be included</div>${bullets(v.included)}</section></div>
      <aside class="stack"><section class="card card-pad"><div class="section-title">Where</div>${bullets(v.neighborhoods)}</section><section class="card card-pad"><div class="section-title">Timeline</div><div class="timeline">${arr(v.timeline).map(t=>`<div class="timeline-row"><b>${esc(t.when)}</b><span>${esc(t.phase)}</span></div>`).join('')}</div></section><section class="card card-pad"><div class="section-title">Programs</div>${bullets(v.programs)}</section><section class="card card-pad"><div class="section-title">Coming soon</div>${bullets(v.coming_soon)}</section></aside></div>
      <div class="publish-bar"><div><b>Transparency by design.</b><p>This is an explainable project concept. Details can change after agency validation and community feedback.</p></div><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="button secondary" onclick="alert('Demo: resident follow/notification flow would connect here.')">Follow Project</button><button class="button green" onclick="alert('Demo: community feedback / participation flow would connect here.')">Get Involved</button></div></div>
    </div></main>${footer()}`;
  }

  function render(){window.scrollTo(0,0);const p=route();if(p==='/')landing();else if(p==='/city')city();else if(p==='/city/opportunity')resultPage();else if(p==='/public')publicHome();else if(p.startsWith('/public/project/'))publicProject(decodeURIComponent(p.split('/').pop()));else landing();}
  window.addEventListener('hashchange',render);render();
})();
