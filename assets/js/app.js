const SIGNALS = [
  // People & Community
  {id:'youth-unemployment',category:'People & Community',kind:'need',label:'Youth unemployment',source:'Detroit at Work / workforce data',detail:'Youth employment demand is elevated in selected neighborhoods.'},
  {id:'senior-digital-gap',category:'People & Community',kind:'need',label:'Senior digital access gap',source:'Libraries / community services',detail:'Older residents report difficulty using digital services and applications.'},
  {id:'low-participation',category:'People & Community',kind:'need',label:'Low program participation',source:'Program enrollment data',detail:'Eligible residents are not consistently participating in available programs.'},
  {id:'heat-exposure',category:'People & Community',kind:'need',label:'High heat exposure',source:'Health / heat mapping',detail:'Residents experience elevated summer heat exposure.'},
  {id:'low-transit-access',category:'People & Community',kind:'need',label:'Low transit access',source:'DDOT / mobility data',detail:'Residents have limited access to frequent transit.'},
  {id:'food-gap',category:'People & Community',kind:'need',label:'Food access gap',source:'Health / food access data',detail:'Fresh food access is limited within a convenient travel distance.'},
  {id:'skills-mismatch',category:'People & Community',kind:'need',label:'Skills mismatch',source:'Workforce / employer surveys',detail:'Resident skills and available job requirements do not fully align.'},
  {id:'renter-burden',category:'People & Community',kind:'need',label:'High renter burden',source:'Housing data',detail:'A high share of household income is spent on rent.'},
  {id:'after-school-gap',category:'People & Community',kind:'need',label:'Limited after-school options',source:'Youth services',detail:'Young residents have limited nearby structured after-school activities.'},
  {id:'low-public-space-use',category:'People & Community',kind:'need',label:'Low public-space usage',source:'Parks / observational data',detail:'Existing public spaces show low use during significant portions of the day.'},
  // City Assets
  {id:'library-space',category:'City Assets',kind:'asset',label:'Underused library space',source:'Detroit Public Library',detail:'Library rooms or program blocks are available during portions of the week.'},
  {id:'vacant-lot',category:'City Assets',kind:'asset',label:'Vacant lot',source:'Detroit Land Bank / parcel data',detail:'City-controlled or vacant parcels may be available for reuse.'},
  {id:'retired-vehicles',category:'City Assets',kind:'asset',label:'Retired vehicle inventory',source:'General Services / fleet',detail:'Retired or donated vehicles may have training or reuse value before disposal.'},
  {id:'empty-public-building',category:'City Assets',kind:'asset',label:'Empty public building',source:'Facilities inventory',detail:'A public building has underused or vacant space.'},
  {id:'unused-parking',category:'City Assets',kind:'asset',label:'Unused parking lot',source:'Facilities / parking inventory',detail:'Parking capacity is underused at predictable times.'},
  {id:'underused-rec-center',category:'City Assets',kind:'asset',label:'Underused recreation center',source:'Parks & Recreation',detail:'Recreation center rooms have available programming capacity.'},
  {id:'school-after-hours',category:'City Assets',kind:'asset',label:'School space after hours',source:'School district facilities',detail:'Selected school spaces may be available outside instructional hours.'},
  {id:'city-land',category:'City Assets',kind:'asset',label:'Available city-owned land',source:'City parcel inventory',detail:'Public land may be available for pilot uses.'},
  {id:'cooling-center',category:'City Assets',kind:'asset',label:'Existing cooling center',source:'Health / facilities',detail:'Cooling facilities exist but may not align with highest heat exposure.'},
  {id:'community-kitchen',category:'City Assets',kind:'asset',label:'Existing community kitchen',source:'Community facility inventory',detail:'Licensed or community kitchen capacity is available during some periods.'},
  // Infrastructure
  {id:'road-resurfacing',category:'Infrastructure',kind:'project',label:'Planned road resurfacing',source:'DPW capital plan',detail:'Road resurfacing is already scheduled in the near term.'},
  {id:'utility-work',category:'Infrastructure',kind:'project',label:'Utility work scheduled',source:'DWSD / utility coordination',detail:'Utility work will require opening or occupying the same corridor.'},
  {id:'frequent-flooding',category:'Infrastructure',kind:'need',label:'Frequent flooding',source:'DWSD / 311 / stormwater data',detail:'Localized flooding or basement flooding is repeatedly reported.'},
  {id:'poor-tree-canopy',category:'Infrastructure',kind:'need',label:'Poor tree canopy',source:'Parks / canopy mapping',detail:'Tree canopy coverage is substantially below city averages.'},
  {id:'damaged-sidewalks',category:'Infrastructure',kind:'need',label:'Damaged sidewalks',source:'DPW / accessibility reports',detail:'Sidewalk condition limits safe pedestrian movement.'},
  {id:'no-shelter-stop',category:'Infrastructure',kind:'need',label:'Transit stop without shelter',source:'DDOT stop inventory',detail:'High-use stops lack shelter or comfortable waiting areas.'},
  {id:'bike-gap',category:'Infrastructure',kind:'need',label:'Bike-network gap',source:'Mobility plan',detail:'A missing connection interrupts the existing bike network.'},
  {id:'streetlight-complaints',category:'Infrastructure',kind:'need',label:'Streetlight complaints',source:'Public lighting / 311',detail:'Repeated lighting complaints are concentrated in the area.'},
  {id:'high-crash-corridor',category:'Infrastructure',kind:'need',label:'High-crash corridor',source:'Traffic safety data',detail:'The corridor has repeated crashes involving vulnerable road users.'},
  {id:'drainage-maintenance',category:'Infrastructure',kind:'need',label:'Drainage maintenance need',source:'DWSD maintenance data',detail:'Drainage assets show recurring service or maintenance demand.'},
  // Workforce & Economy
  {id:'auto-tech-demand',category:'Workforce & Economy',kind:'demand',label:'Automotive technician demand',source:'Employer / workforce data',detail:'Employers report demand for entry-level and experienced technicians.'},
  {id:'ev-demand',category:'Workforce & Economy',kind:'demand',label:'EV skills demand',source:'Mobility employers',detail:'Employers report growing need for EV systems and diagnostics skills.'},
  {id:'vendor-demand',category:'Workforce & Economy',kind:'demand',label:'Small vendor demand',source:'Business / event applications',detail:'Local vendors need affordable places to sell products and services.'},
  {id:'summer-jobs',category:'Workforce & Economy',kind:'demand',label:'Youth summer job demand',source:'Youth employment programs',detail:'Demand for paid youth summer work exceeds available placements.'},
  {id:'contractor-shortage',category:'Workforce & Economy',kind:'need',label:'Contractor shortage',source:'Procurement / project data',detail:'Projects experience limited contractor capacity in a needed specialty.'},
  {id:'mentoring-gap',category:'Workforce & Economy',kind:'need',label:'Small-business mentoring gap',source:'Small business services',detail:'Entrepreneurs need accessible mentoring and technical assistance.'},
  {id:'health-workforce',category:'Workforce & Economy',kind:'demand',label:'Healthcare workforce demand',source:'Regional employer data',detail:'Healthcare employers report persistent workforce demand.'},
  {id:'construction-workforce',category:'Workforce & Economy',kind:'demand',label:'Construction workforce demand',source:'Capital program / employers',detail:'Construction pipeline requires additional trained workers.'},
  {id:'commercial-vacancy',category:'Workforce & Economy',kind:'asset',label:'Commercial vacancy',source:'Property / corridor data',detail:'Commercial spaces are vacant or underused.'},
  {id:'local-procurement',category:'Workforce & Economy',kind:'opportunity',label:'Local procurement opportunity',source:'Procurement data',detail:'Upcoming purchasing could potentially be matched with local suppliers.'},
  // Operations & Programs
  {id:'grant-available',category:'Operations & Programs',kind:'asset',label:'Available grant funding',source:'Grants office',detail:'A funding source is available for eligible pilot activities.'},
  {id:'grant-expiring',category:'Operations & Programs',kind:'constraint',label:'Expiring grant',source:'Grants office',detail:'Funding must be committed within a limited time window.'},
  {id:'low-performing-program',category:'Operations & Programs',kind:'need',label:'Low-performing program',source:'Program performance data',detail:'An existing program is not achieving intended participation or outcomes.'},
  {id:'duplicate-services',category:'Operations & Programs',kind:'opportunity',label:'Duplicate city services',source:'Service inventory',detail:'Multiple programs appear to address similar needs independently.'},
  {id:'long-wait-time',category:'Operations & Programs',kind:'need',label:'Long service wait time',source:'Service operations',detail:'Residents experience long waits for a city or partner service.'},
  {id:'high-311',category:'Operations & Programs',kind:'need',label:'High 311 concentration',source:'Detroit 311',detail:'Repeated service requests are concentrated geographically.'},
  {id:'nonprofit-partner',category:'Operations & Programs',kind:'asset',label:'Available nonprofit partner',source:'Partner directory',detail:'A nonprofit partner has relevant staff, facilities, or program capacity.'},
  {id:'employer-partner',category:'Operations & Programs',kind:'asset',label:'Employer partnership available',source:'Workforce partnerships',detail:'An employer is willing to support training, mentorship, placement, or sponsorship.'},
  {id:'college-partner',category:'Operations & Programs',kind:'asset',label:'Community college partnership',source:'Education partnerships',detail:'A community college can provide curriculum, instructors, or credential pathways.'},
  {id:'seasonal-event',category:'Operations & Programs',kind:'demand',label:'Seasonal event demand',source:'Events / permits',detail:'Neighborhood event demand creates a predictable seasonal need for space and services.'}
];

const QUICK = [
  {id:'mobility',name:'Mobility Learning',desc:'Turn unused assets into a skills pipeline.',signals:['retired-vehicles','library-space','after-school-gap','ev-demand','employer-partner']},
  {id:'cool',name:'Cool Neighborhood',desc:'Heat, youth activity and public assets.',signals:['poor-tree-canopy','heat-exposure','cooling-center','school-after-hours','grant-available']},
  {id:'digital',name:'Digital Help',desc:'Connect digital access, youth jobs and libraries.',signals:['senior-digital-gap','library-space','summer-jobs','low-participation','nonprofit-partner']},
  {id:'market',name:'Floodable Market',desc:'Make vacant land serve commerce and resilience.',signals:['vacant-lot','frequent-flooding','vendor-demand','seasonal-event','drainage-maintenance']},
  {id:'corridor',name:'Complete Corridor',desc:'Coordinate projects before the street is opened twice.',signals:['road-resurfacing','utility-work','high-crash-corridor','bike-gap','no-shelter-stop']}
];

const $ = (q,root=document)=>root.querySelector(q);
const $$ = (q,root=document)=>[...root.querySelectorAll(q)];
const app = $('#app');
let selected = new Set(['retired-vehicles','library-space','after-school-gap','ev-demand','employer-partner']);
let category = 'All';
let lastResult = null;
let lastSignals = [];

function toast(msg){ const t=$('#toast'); t.textContent=msg; t.classList.add('show'); setTimeout(()=>t.classList.remove('show'),2200); }
function escapeHtml(s=''){return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
function iconFor(cat){return {'People & Community':'◉','City Assets':'◆','Infrastructure':'▦','Workforce & Economy':'↗','Operations & Programs':'◎'}[cat]||'•';}
function saveGenerated(){ if(lastResult){ localStorage.setItem('oneDetroitGenerated',JSON.stringify({result:lastResult,signals:lastSignals,createdAt:new Date().toISOString()})); }}
function getGenerated(){ try{return JSON.parse(localStorage.getItem('oneDetroitGenerated')||'null')}catch{return null} }

function shell(content, mode=''){app.innerHTML=`<div class="page ${mode}">${content}</div>`; window.scrollTo({top:0,behavior:'smooth'});}
function go(view){ location.hash=view==='home'?'':view; render(); }

function renderHome(){
 shell(`<section class="hero">
   <div class="hero-copy"><div class="eyebrow">CIVIC INTELLIGENCE PLATFORM</div><h1>Different data.<br><span>A stronger Detroit.</span></h1><p>Connect city signals that normally live apart, discover coordinated opportunities, and explain the result clearly to residents.</p><div class="hero-actions"><button class="btn primary" data-go="city">Open City Intelligence</button><button class="btn ghost" data-go="public">Explore Public Portal</button></div></div>
   <div class="hero-card"><div class="mini-label">THE ONE DETROIT LOOP</div><div class="loop"><span>Disconnected signals</span><b>→</b><span>Opportunity Engine</span><b>→</b><span>Coordinated strategy</span><b>→</b><span>Public transparency</span></div><div class="big-quote">One intervention.<br>Multiple outcomes.</div></div>
 </section>
 <section class="statement"><strong>The city sees disconnected data.</strong><strong>Residents experience disconnected problems.</strong><strong>One Detroit turns both into coordinated solutions.</strong></section>`,'home');
 bindNav();
}

function renderCity(){
 const cats=['All',...new Set(SIGNALS.map(s=>s.category))];
 shell(`<div class="city-head"><div><div class="eyebrow">CITY INTELLIGENCE</div><h1>Build an opportunity in seconds.</h1><p>Pick 3–6 signals from different systems. One Detroit looks for a coordinated intervention.</p></div><div class="selected-count"><b id="selCount">${selected.size}</b><span>signals selected</span></div></div>
 <section class="panel quick-panel"><div class="panel-title"><div><span class="step">01</span><h2>Quick demo combos</h2></div><button id="surprise" class="btn spark">✦ Surprise Me</button></div><div class="quick-grid">${QUICK.map(q=>`<button class="quick-card" data-quick="${q.id}"><b>${q.name}</b><span>${q.desc}</span></button>`).join('')}</div></section>
 <section class="panel"><div class="panel-title"><div><span class="step">02</span><h2>Signal Library</h2></div><span class="hint">Tap cards to select. Mix unrelated systems.</span></div>
 <div class="filters">${cats.map(c=>`<button class="filter ${c===category?'active':''}" data-cat="${c}">${c}</button>`).join('')}</div>
 <div id="signalGrid" class="signal-grid">${signalCards()}</div>
 </section>
 <section class="panel context-panel"><div class="panel-title"><div><span class="step">03</span><h2>Optional context</h2></div><span class="hint">Only if you want to steer the demo.</span></div><textarea id="context" placeholder="Example: Prioritize a 6-month pilot under $500k, reuse existing assets, and focus on neighborhoods with the largest access gaps."></textarea></section>
 <div class="analyze-bar"><div><span id="chosenPreview">${selectedPreview()}</span></div><button id="analyze" class="btn primary xl">Analyze Opportunity <span>→</span></button></div>`,'city');
 bindNav(); bindCity();
}
function signalCards(){return SIGNALS.filter(s=>category==='All'||s.category===category).map(s=>`<button class="signal-card ${selected.has(s.id)?'selected':''}" data-signal="${s.id}"><div class="sig-top"><span class="sig-icon">${iconFor(s.category)}</span><span class="sig-cat">${s.category}</span><span class="check">✓</span></div><b>${s.label}</b><small>${s.source}</small></button>`).join('');}
function selectedPreview(){const a=SIGNALS.filter(s=>selected.has(s.id)).slice(0,4).map(s=>s.label);return a.join(' · ')+(selected.size>4?` · +${selected.size-4} more`:'');}
function bindCity(){
 $$('.filter').forEach(b=>b.onclick=()=>{category=b.dataset.cat; renderCity();});
 $$('[data-signal]').forEach(b=>b.onclick=()=>{const id=b.dataset.signal;if(selected.has(id))selected.delete(id);else if(selected.size<8)selected.add(id);else return toast('Keep the live demo focused: max 8 signals.'); b.classList.toggle('selected'); $('#selCount').textContent=selected.size; $('#chosenPreview').textContent=selectedPreview();});
 $$('[data-quick]').forEach(b=>b.onclick=()=>{const q=QUICK.find(x=>x.id===b.dataset.quick);selected=new Set(q.signals);renderCity();toast(`${q.name} loaded`);});
 $('#surprise').onclick=()=>{const byCat={}; SIGNALS.forEach(s=>(byCat[s.category]??=[]).push(s)); const picks=[]; Object.values(byCat).forEach(arr=>picks.push(arr[Math.floor(Math.random()*arr.length)].id)); selected=new Set(picks); renderCity(); toast('Unexpected cross-system mix loaded');};
 $('#analyze').onclick=analyze;
}
async function analyze(){
 if(selected.size<2)return toast('Select at least two signals.');
 const btn=$('#analyze');btn.disabled=true;btn.innerHTML='Connecting city signals <span class="dots">•••</span>';
 lastSignals=SIGNALS.filter(s=>selected.has(s.id));
 try{
  const r=await fetch('api/analyze.php',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({signals:lastSignals,context:$('#context')?.value||''})});
  const data=await r.json();if(!r.ok)throw new Error(data.error||'Analysis failed');lastResult=data.result;lastResult._source=data.source;lastResult._note=data.note||''; saveGenerated(); go('result');
 }catch(e){toast(e.message);btn.disabled=false;btn.innerHTML='Analyze Opportunity <span>→</span>';}
}

function chips(items=[]){return `<div class="chips">${items.map(x=>`<span>${escapeHtml(x)}</span>`).join('')}</div>`;}
function bullet(items=[]){return `<ul>${items.map(x=>`<li>${escapeHtml(x)}</li>`).join('')}</ul>`;}
function renderResult(){
 const stored=getGenerated(); const r=lastResult||stored?.result; lastSignals=lastSignals.length?lastSignals:(stored?.signals||[]); if(!r)return go('city');
 shell(`<div class="result-top"><button class="back" data-go="city">← Edit signals</button><div class="engine-badge ${r._source==='openai'?'live':''}">${r._source==='openai'?'● Live AI analysis':'● Demo fallback'}</div></div>
 <section class="opportunity-hero"><div class="eyebrow">OPPORTUNITY DETECTED</div><h1>${escapeHtml(r.opportunity_name)}</h1><p>${escapeHtml(r.problem_summary)}</p><div class="input-ribbon">${lastSignals.map(s=>`<span>${escapeHtml(s.label)}</span>`).join('<b>+</b>')}</div></section>
 <div class="result-grid"><section class="panel major"><div class="section-kicker">WHY ONE DETROIT FOUND IT</div>${bullet(r.connections_detected)}<div class="section-kicker">SUGGESTED STRATEGY</div><p class="strategy">${escapeHtml(r.recommended_strategy)}</p></section>
 <section class="panel"><div class="section-kicker">FEASIBILITY SNAPSHOT</div><div class="metric"><span>Lead agency</span><b>${escapeHtml(r.lead_agency)}</b></div><div class="metric"><span>Budget</span><b>${escapeHtml(r.estimated_budget)}</b></div><div class="metric"><span>Hot spots</span><b>${escapeHtml((r.hot_spots||[]).join(', '))}</b></div></section></div>
 <div class="detail-grid"><section class="panel"><h3>Agencies & partners</h3>${chips([...(r.supporting_agencies||[]),...(r.partners||[])])}</section><section class="panel"><h3>Existing assets</h3>${bullet(r.existing_assets)}</section><section class="panel"><h3>People & contractors</h3>${bullet([...(r.staffing_needs||[]),...(r.contractor_needs||[])])}</section><section class="panel"><h3>Funding & sustainability</h3>${bullet(r.funding_options)}</section><section class="panel"><h3>Expected outcomes</h3>${bullet(r.expected_outcomes)}</section><section class="panel"><h3>Human review</h3>${bullet(r.assumptions)}</section></div>
 <section class="publish"><div><div class="eyebrow">PUBLIC TRANSPARENCY</div><h2>Turn the analysis into resident language.</h2><p>The same opportunity becomes a clear project page for the public portal.</p></div><button id="publish" class="btn primary xl">Publish Public Version →</button></section>`,'result'); bindNav(); $('#publish').onclick=()=>{saveGenerated();toast('Published to Public Portal');setTimeout(()=>go('public'),450)};
}

const STATIC_PROJECTS=[
 {name:'Detroit Mobility Learning Network',cat:'Workforce',status:'In Design',summary:'Hands-on technical learning that connects libraries, mobility skills and career pathways.'},
 {name:'Cool Routes & Community Hubs',cat:'Environment',status:'Pilot Planned',summary:'Shade, cooling spaces and public facilities coordinated around extreme heat.'},
 {name:'Digital Help Hours',cat:'Community',status:'Exploring',summary:'Youth-powered digital support for residents at neighborhood libraries.'},
 {name:'Floodable Community Market',cat:'Community Spaces',status:'Exploring',summary:'A community market that also serves as stormwater infrastructure during heavy rain.'},
 {name:'Complete Corridor Upgrade',cat:'Transportation',status:'In Design',summary:'Coordinate street, utility, transit, pedestrian and bike work in one construction cycle.'}
];
function renderPublic(){
 const g=getGenerated();
 shell(`<div class="public-head"><div><div class="eyebrow">PUBLIC PORTAL</div><h1>What’s happening across Detroit?</h1><p>See projects, programs and opportunities in plain language — including why the city is exploring them.</p></div><button class="btn ghost" data-go="city">City Intelligence</button></div>
 ${g?`<section class="new-project"><div class="new-tag">NEW · GENERATED BY ONE DETROIT</div><div><h2>${escapeHtml(g.result.opportunity_name)}</h2><p>${escapeHtml(g.result.public_summary)}</p></div><button class="btn primary" data-go="project">View project →</button></section>`:''}
 <section class="project-grid">${STATIC_PROJECTS.map(p=>`<article class="project-card"><div class="project-meta"><span>${p.cat}</span><span>${p.status}</span></div><h3>${p.name}</h3><p>${p.summary}</p><button class="text-btn">Learn more →</button></article>`).join('')}</section>`,'public'); bindNav();
}
function renderProject(){
 const g=getGenerated(); if(!g)return go('public'); const r=g.result;
 shell(`<button class="back" data-go="public">← Back to projects</button><section class="public-project"><div class="project-meta"><span>One Detroit generated project</span><span>Exploring</span></div><h1>${escapeHtml(r.opportunity_name)}</h1><p class="lead">${escapeHtml(r.public_summary)}</p><div class="public-story"><div><span>WHAT RESIDENTS EXPERIENCE</span><p>${escapeHtml(r.problem_summary)}</p></div><b>→</b><div><span>WHAT ONE DETROIT CONNECTED</span>${chips(g.signals.map(s=>s.label))}</div><b>→</b><div><span>PROPOSED SOLUTION</span><p>${escapeHtml(r.recommended_strategy)}</p></div></div>
 <div class="detail-grid"><section class="panel"><h3>Why this project?</h3>${bullet(r.connections_detected)}</section><section class="panel"><h3>What could improve</h3>${bullet(r.expected_outcomes)}</section><section class="panel"><h3>Potential partners</h3>${chips([r.lead_agency,...(r.supporting_agencies||[]),...(r.partners||[])])}</section><section class="panel"><h3>Possible locations</h3>${chips(r.hot_spots)}</section></div><section class="resident-note"><b>Transparency note</b><p>This is an AI-assisted opportunity for human review, not a final city decision. Agencies, budget, locations and implementation details would need validation.</p></section></section>`,'project'); bindNav();
}
function bindNav(){ $$('[data-go]').forEach(el=>el.onclick=()=>go(el.dataset.go)); $$('[data-view]').forEach(el=>el.onclick=()=>go(el.dataset.view)); }
function render(){const h=location.hash.replace('#',''); if(h==='city')renderCity(); else if(h==='result')renderResult(); else if(h==='public')renderPublic(); else if(h==='project')renderProject(); else renderHome();}
window.addEventListener('hashchange',render); render();
