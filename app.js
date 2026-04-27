const KEY='focusflow-assist-v1';
const days=[['monday','Måndag'],['tuesday','Tisdag'],['wednesday','Onsdag'],['thursday','Torsdag'],['friday','Fredag'],['saturday','Lördag'],['sunday','Söndag']];
const sec={morning:'Morgon',forenoon:'Förmiddag',afternoon:'Eftermiddag',evening:'Kväll',weekly:'Veckouppgift'};
const types={task:'Uppgift',routine:'Rutin',break:'Break',shopping:'Inköp',meeting:'Möte',household:'Hushåll',admin:'Admin',family:'Familj'};
const prio={high:'Hög',medium:'Medium',low:'Låg'};
const uid=()=>crypto.randomUUID();
function t(title,day,time,dur,type,priority,section,desc='',list=[],extra={}){return{id:uid(),title,day,startTime:time,durationMinutes:dur,type,priority,section,description:desc,status:'todo',checklist:list.map(x=>({id:uid(),text:x,done:false})),address:'',travelMode:'car',travelTimeMinutes:0,bufferMinutes:10,...extra};}
function defaults(){return[
t('Väckarklocka — stäng av, stå upp direkt','monday','06:30',5,'routine','high','morning','Starta utan snooze.',['Sätt dig upp','Fötterna på golvet','Stäng av alarmet']),
t('Toalett','monday','06:35',5,'routine','medium','morning'),
t('Drick ett glas vatten','monday','06:40',5,'routine','high','morning'),
t('Väcka barnen','monday','06:45',10,'family','high','morning'),
t('Hjälp barnen med toalett och ansiktstvätt','monday','06:55',15,'family','high','morning'),
t('Hjälp barnen klä på sig','monday','07:10',15,'family','high','morning'),
t('Laga frukost','monday','07:25',20,'routine','high','morning','Enkel frukost.',['Ta fram tallrikar','Gör frukost','Sätt fram vatten']),
t('Äta frukost — du och barnen','monday','07:45',20,'family','high','morning'),
t('Packa lunchlåda till barnen','monday','08:05',10,'family','high','morning','Mat och mellanmål.',['Lunchlåda','Frukt','Vattenflaska']),
t('Kolla att barnen har rätt saker i väskan','monday','08:15',10,'family','high','morning','Sista kontrollen.',['Skolpåse','Kläder','Formulär','Vattenflaska']),
t('Snabbt ta hand om frukostdisken','monday','08:25',5,'household','medium','morning'),
t('Klä på dig','monday','08:30',10,'routine','high','morning'),
t('Packa din egen väska','monday','08:40',5,'routine','high','morning','Nycklar, plånbok, telefon, jobb/skola.',['Nycklar','Plånbok','Telefon','Dator/laddare']),
t('Följa/skjutsa barnen till skola eller dagis','monday','08:45',30,'family','high','morning'),
t('Jobb/arbete','monday','09:30',150,'task','high','forenoon','Välj dagens viktigaste arbetsblock.',['Välj en viktig sak','Stäng onödiga flikar','Jobba 25 minuter']),
t('Drick vatten — minst ett glas','monday','10:30',5,'routine','medium','forenoon'),
t('Ät lunch — gå inte utan mat','monday','12:00',30,'routine','high','afternoon'),
t('Fortsätt arbete','monday','13:00',120,'task','medium','afternoon'),
t('Hämta barn från skola eller dagis','monday','15:30',40,'family','high','afternoon'),
t('Ge barnen mellanmål','monday','16:15',20,'family','high','afternoon'),
t('Bestäm vad som blir middag','monday','17:00',10,'routine','high','evening','Välj något konkret, inte perfekt.'),
t('Laga middag','monday','17:15',45,'routine','high','evening','Mat före kvällsrutin.',['Ta fram ingredienser','Starta spis/ugn','Laga enkel middag']),
t('Duka bordet','monday','18:00',10,'family','medium','evening'),
t('Äta middag tillsammans','monday','18:10',30,'family','high','evening'),
t('Diska eller starta diskmaskinen','monday','18:45',15,'household','medium','evening'),
t('Torka av köksbänkar','monday','19:00',5,'household','medium','evening'),
t('Barnens läxor om aktuellt','monday','19:10',20,'family','medium','evening'),
t('Barnens bad eller dusch','monday','19:30',25,'family','high','evening'),
t('Barnens tandborstning','monday','20:00',10,'family','high','evening'),
t('Lägga barnen — saga, godnatt','monday','20:10',35,'family','high','evening','Lugn avslutning.',['Saga','Vatten','Godnatt']),
t('Plocka ihop leksaker och röra','monday','20:45',10,'household','medium','evening','Bara 10 minuter.',['Plocka golvet','Lägg leksaker i låda','Sluta när tiden är slut']),
t('Förbered för morgonen — väskor, kläder framlagda','monday','21:00',15,'routine','high','evening','Minska morgonstress.',['Barnens kläder','Din outfit','Väskor vid dörren']),
t('Din tandborstning','monday','21:20',5,'routine','high','evening'),
t('30 min utan skärm innan sömn','monday','21:30',30,'break','medium','evening'),
t('Lägg dig i tid','monday','22:00',0,'routine','high','evening'),
t('Planera veckans middagar','monday','19:30',5,'routine','high','weekly','Skriv upp 5 enkla middagar.'),
t('Skriv inköpslista baserad på middagsplanen','monday','19:40',15,'shopping','high','weekly','Gör handlingen tydlig.',['Mjölk','Bröd','Frukt','Middag 1','Middag 2']),
t('Starta en tvätt','monday','20:00',10,'household','medium','weekly'),
t('Handla mat enligt listan','tuesday','17:30',60,'shopping','high','weekly','Följ listan.',['Mjölk','Bröd','Frukt','Middagsmat','Barnens snacks']),
t('Sortera och ta hand om posten','tuesday','18:30',15,'admin','medium','weekly'),
t('Kolla veckans kalender — aktiviteter, möten, läkartider','tuesday','19:00',15,'admin','high','weekly'),
t('Möte med skola/förskola','wednesday','16:00',60,'meeting','high','weekly','Exempel på möte med restidsberäkning.',[],{address:'Skolan/Förskolan',travelMode:'car',travelTimeMinutes:25,bufferMinutes:10}),
t('Häng upp eller sätt tvätten i torktumlaren','wednesday','18:00',15,'household','medium','weekly'),
t('Kolla barnens skolpåsar — brev, formulär, missat?','wednesday','19:00',10,'family','high','weekly'),
t('Dammsug hela bostaden','thursday','18:00',35,'household','medium','weekly','Gör det i zoner.',['Hall','Kök','Vardagsrum','Sovrum']),
t('Torka golv','thursday','18:40',25,'household','medium','weekly'),
t('Kolla skolmail och föräldraappar','thursday','19:15',15,'admin','high','weekly'),
t('Betala räkningar om det är aktuellt','thursday','20:00',20,'admin','high','weekly'),
t('Städa badrum — handfat, toalett, golv','friday','19:30',30,'household','medium','weekly','Badrum klart inför helgen.',['Handfat','Toalett','Golv','Spegel']),
t('Planera helgens aktivitet','friday','20:15',15,'family','medium','weekly','Bestäm konkret, inte bara något kul.'),
t('Aktivitet med barnen — utomhus om möjligt','saturday','14:00',120,'family','high','afternoon'),
t('Meal prep — laga mat som räcker 2–3 dagar','sunday','10:00',90,'routine','high','morning','Minska stress under veckan.',['Välj enkel maträtt','Gör extra portioner','Lägg i matlådor']),
t('Baka bröd eller förbereda frukostmat','sunday','11:45',60,'routine','medium','morning'),
t('Kolla veckans kalender noga','sunday','15:00',20,'admin','high','afternoon'),
t('Packa barnens väskor inför måndag','sunday','15:30',15,'family','high','afternoon'),
t('Lägg fram kläder för måndag — dig och barnen','sunday','15:50',10,'family','high','afternoon'),
t('Städa/rensa ett rum ordentligt — välj ett','sunday','16:15',45,'household','medium','afternoon','Ett rum, inte hela hemmet.',['Välj rum','Plocka undan','Torka ytor','Stanna när tiden är slut']),
t('Ta hand om en uppskjuten uppgift','sunday','17:15',30,'admin','medium','afternoon'),
t('Tidig kvällsrutin — börja tidigare än vanligt','sunday','19:00',45,'routine','high','evening'),
t('Inga stora beslut eller stressade samtal','sunday','20:00',0,'break','medium','evening'),
t('Lägg er alla i god tid — måndag kräver energi','sunday','21:00',0,'routine','high','evening')];}
let state=load();let selectedDay=today();
function load(){try{return JSON.parse(localStorage.getItem(KEY))||{theme:'light',energy:'normal',tasks:defaults()};}catch{return{theme:'light',energy:'normal',tasks:defaults()};}}
function save(){localStorage.setItem(KEY,JSON.stringify(state));}
function today(){return['sunday','monday','tuesday','wednesday','thursday','friday','saturday'][new Date().getDay()];}
function dayName(id){return days.find(d=>d[0]===id)?.[1]||id;}
function mins(time){const[h,m]=String(time||'00:00').split(':').map(Number);return h*60+m;}
function asTime(total){const n=((total%1440)+1440)%1440;return`${String(Math.floor(n/60)).padStart(2,'0')}:${String(n%60).padStart(2,'0')}`;}
function end(task){return asTime(mins(task.startTime)+Number(task.durationMinutes||0));}
function leave(task){return asTime(mins(task.startTime)-Number(task.travelTimeMinutes||0)-Number(task.bufferMinutes||0));}
function nowMins(){const n=new Date();return n.getHours()*60+n.getMinutes();}
function sorted(day=selectedDay){return state.tasks.filter(task=>task.day===day).sort((a,b)=>mins(a.startTime)-mins(b.startTime));}
function current(){return sorted().find(task=>task.status!=='done'&&mins(task.startTime)>=nowMins()-45)||sorted().find(task=>task.status!=='done')||null;}
function score(task){return({high:60,medium:35,low:15}[task.priority]||20)+(task.type==='meeting'?30:task.type==='family'?25:10)+(task.durationMinutes<=15?18:0)+(task.status==='done'?-999:40);}
function render(){document.documentElement.dataset.theme=state.theme;document.querySelector('#energySelect').value=state.energy;renderSide();renderToday();renderWeek();renderRoutines();renderEnergy();}
function renderSide(){const c=current();document.querySelector('#currentTaskTitle').textContent=c?c.title:'Inget kvar idag';document.querySelector('#currentTaskMeta').textContent=c?`${dayName(c.day)} ${c.startTime}–${end(c)} · ${c.durationMinutes} min · ${types[c.type]}`:'Vila eller förbered en liten sak inför imorgon.';const top=sorted().filter(task=>task.status!=='done').sort((a,b)=>score(b)-score(a)).slice(0,3);document.querySelector('#topThreeList').innerHTML=top.length?top.map(task=>`<li>${esc(task.title)}</li>`).join(''):'<li>Alla viktiga saker är klara.</li>';}
function renderToday(){const tasks=sorted();const total=tasks.reduce((s,task)=>s+Number(task.durationMinutes||0),0);const done=tasks.filter(task=>task.status==='done').length;const breaks=tasks.filter(task=>task.type==='break').length;const meetings=tasks.filter(task=>task.type==='meeting').length;const groups=group(tasks,'section');const balance=selectedDay==='sunday'?'Söndagsläge: förbered bara det viktigaste och skydda energin inför måndag.':total>420?'Dagen är ganska full. Flytta något eller lägg in fler pauser.':breaks===0&&total>180?'Du har mycket planerat men ingen paus. Lägg in en break.':'Dagen ser rimlig ut. En sak i taget.';document.querySelector('#todayView').innerHTML=`<div class="view-header glass-card day-column"><div><p class="section-kicker">Idag</p><h2>${dayName(selectedDay)}</h2><p class="muted">Klart är bättre än perfekt.</p></div><select id="daySelector">${days.map(([id,label])=>`<option value="${id}" ${id===selectedDay?'selected':''}>${label}</option>`).join('')}</select></div><div class="stat-row"><div class="stat-card"><span>Planerad tid</span><strong>${fmt(total)}</strong></div><div class="stat-card"><span>Klara</span><strong>${done}/${tasks.length}</strong></div><div class="stat-card"><span>Pauser</span><strong>${breaks}</strong></div><div class="stat-card"><span>Möten</span><strong>${meetings}</strong></div></div><div class="balance-box full-width"><strong>Dagens balans</strong><p class="muted">${balance}</p></div><div class="today-grid">${Object.entries(sec).map(([key,label])=>section(label,groups[key]||[])).join('')}</div>`;document.querySelector('#daySelector').onchange=e=>{selectedDay=e.target.value;render();};bind();}
function section(label,tasks){return`<section class="day-column ${label==='Veckouppgift'?'full-width':''}"><div class="day-column-header"><h2>${label}</h2><span class="badge">${tasks.length} saker</span></div><div class="task-list">${tasks.length?tasks.map(card).join(''):'<div class="empty-state">Inget planerat här.</div>'}</div></section>`;}
function renderWeek(){document.querySelector('#weekView').innerHTML=`<div class="view-header glass-card day-column"><div><p class="section-kicker">Veckoplan</p><h2>Hela veckan</h2><p class="muted">Hushåll, barn, jobb, pauser, shopping och möten utan att allt ligger i huvudet.</p></div></div><div class="week-grid">${days.map(([id,label])=>{const tasks=sorted(id);const total=tasks.reduce((s,task)=>s+Number(task.durationMinutes||0),0);return`<section class="day-column"><div class="day-column-header"><h2>${label}</h2><span class="badge">${fmt(total)}</span></div><div class="task-list">${tasks.length?tasks.slice(0,9).map(card).join(''):'<div class="empty-state">Tom dag.</div>'}</div></section>`;}).join('')}</div>`;bind();}
function card(task){const checklist=task.checklist?.length?`<div class="checklist">${task.checklist.map(item=>`<label class="checklist-item"><input type="checkbox" data-check="${task.id}" data-check-id="${item.id}" ${item.done?'checked':''}><span>${esc(item.text)}</span></label>`).join('')}</div>`:'';const travel=task.type==='meeting'&&Number(task.travelTimeMinutes)>0?`<div class="travel-box"><strong>Restidsstöd</strong><p class="muted">${esc(task.address||'Adress saknas')} · ${task.travelMode} ${task.travelTimeMinutes} min · buffert ${task.bufferMinutes} min · Åk: <strong>${leave(task)}</strong></p></div>`:'';return`<article class="task-card ${task.status==='done'?'done':''}"><div class="task-main"><button class="check-button" data-toggle="${task.id}">${task.status==='done'?'✓':''}</button><div><div class="task-title-row"><h3>${esc(task.title)}</h3><span class="badge ${task.priority}">${prio[task.priority]}</span><span class="badge ${task.type}">${types[task.type]}</span></div><div class="task-meta"><span>${dayName(task.day)}</span><span>${task.startTime}–${end(task)}</span><span>${task.durationMinutes} min</span></div>${task.description?`<p class="task-description">${esc(task.description)}</p>`:''}${checklist}${travel}</div><div class="task-actions"><button class="icon-button" data-help="${task.id}">Börja</button><button class="icon-button" data-delete="${task.id}">Ta bort</button></div></div></article>`;}
function renderRoutines(){const groups=[['Morgonrutin med barn','morning','Vatten, barn, hygien, frukost, väskor och transport.'],['Förmiddag','forenoon','Jobb/skola med fokus och vattenpaus.'],['Eftermiddag','afternoon','Lunch, arbete, hämtning och mellanmål.'],['Kvällsrutin','evening','Middag, kök, barnens läggning och skärmfri nedvarvning.'],['Veckostruktur','weekly','Handling, tvätt, skolappar, räkningar, städning och söndagsprepp.']];document.querySelector('#routinesView').innerHTML=`<div class="view-header glass-card day-column"><div><p class="section-kicker">Rutiner</p><h2>Färdiga vardagsmallar</h2><p class="muted">Förifyllt så användaren slipper börja från ett tomt blad.</p></div></div><div class="routine-grid">${groups.map(([title,key,desc])=>`<article class="routine-card"><p class="section-kicker">${sec[key]}</p><h3>${title}</h3><p class="muted">${desc}</p><div class="routine-section">${state.tasks.filter(task=>task.section===key).slice(0,8).map(task=>`<div class="checklist-item"><span>${esc(task.title)}</span></div>`).join('')}</div></article>`).join('')}</div>`;}
function bind(){document.querySelectorAll('[data-toggle]').forEach(b=>b.onclick=()=>{const task=state.tasks.find(x=>x.id===b.dataset.toggle);if(task)task.status=task.status==='done'?'todo':'done';save();render();});document.querySelectorAll('[data-delete]').forEach(b=>b.onclick=()=>{state.tasks=state.tasks.filter(task=>task.id!==b.dataset.delete);save();render();});document.querySelectorAll('[data-help]').forEach(b=>b.onclick=()=>help(b.dataset.help));document.querySelectorAll('[data-check]').forEach(c=>c.onchange=()=>{const task=state.tasks.find(x=>x.id===c.dataset.check);const item=task?.checklist.find(x=>x.id===c.dataset.checkId);if(item)item.done=c.checked;save();});}
function help(id){const task=state.tasks.find(x=>x.id===id)||current();const steps=task?.checklist?.length?task.checklist.slice(0,3).map((item,i)=>`${i+1}. ${item.text}`).join('\n'):'1. Ställ dig upp\n2. Gör bara första lilla steget\n3. Sätt en timer på 5 minuter';document.querySelector('#starterText').textContent=task?`Uppgift: ${task.title}\n\n${steps}\n\nDu behöver inte göra allt nu. Börja bara.`:'Välj en liten sak: drick vatten, plocka tre saker eller lägg fram kläder.';document.querySelector('#starterDialog').showModal();}
function renderEnergy(){const advice={low:'Låg energi: välj små uppgifter, paus, vatten eller bara första steget. Undvik stora beslut.',normal:'Normal energi: gör dagens viktigaste sak först och lägg in korta pauser.',high:'Bra energi: gör en större uppgift, men planera återhämtning efteråt.'};document.querySelector('#energyAdvice').textContent=advice[state.energy];}
function setup(){document.querySelectorAll('.tab-button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.tab-button').forEach(x=>x.classList.remove('active'));document.querySelectorAll('.view').forEach(x=>x.classList.remove('active-view'));b.classList.add('active');document.querySelector(`#${b.dataset.view}View`).classList.add('active-view');});document.querySelector('#themeToggle').onclick=()=>{state.theme=state.theme==='light'?'dark':'light';save();render();};document.querySelector('#energySelect').onchange=e=>{state.energy=e.target.value;save();renderEnergy();};document.querySelector('#completeCurrentBtn').onclick=()=>{const task=current();if(task)task.status='done';save();render();};document.querySelector('#starterHelpBtn').onclick=()=>help(current()?.id);document.querySelector('#closeStarterDialog').onclick=()=>document.querySelector('#starterDialog').close();document.querySelector('#resetDemoBtn').onclick=()=>{state={theme:'light',energy:'normal',tasks:defaults()};selectedDay=today();save();render();};document.querySelector('#taskForm').onsubmit=e=>{e.preventDefault();const list=document.querySelector('#taskChecklist').value.split('\n').map(x=>x.trim()).filter(Boolean);state.tasks.push(t(document.querySelector('#taskTitle').value.trim(),document.querySelector('#taskDay').value,document.querySelector('#taskStart').value,Number(document.querySelector('#taskDuration').value),document.querySelector('#taskType').value,document.querySelector('#taskPriority').value,'weekly',document.querySelector('#taskDescription').value.trim(),list,{address:document.querySelector('#taskAddress').value.trim(),travelMode:document.querySelector('#taskTravelMode').value,travelTimeMinutes:Number(document.querySelector('#taskTravelTime').value),bufferMinutes:Number(document.querySelector('#taskBuffer').value)}));save();e.target.reset();document.querySelector('#taskStart').value='09:00';document.querySelector('#taskDuration').value='30';render();};}
function group(items,key){return items.reduce((a,item)=>{(a[item[key]]||=[]).push(item);return a;},{});}
function fmt(v){v=Number(v||0);if(v<60)return`${v} min`;const h=Math.floor(v/60),m=v%60;return m?`${h} h ${m} min`:`${h} h`;}
function esc(v){return String(v).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;');}
setup();render();
