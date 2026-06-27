(function(){
  if(!document.body || document.body.dataset.page !== 'calendar') return;

  var MONTHS=['January','February','March','April','May','June','July','August','September','October','November','December'];
  var DAYS=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  var SHORT=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var state={view:'month',cursor:null};

  function $(selector){return document.querySelector(selector)}
  function esc(value){return String(value==null?'':value).replace(/[&<>'"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]})}
  function parseDate(value){if(!value)return null;var d=new Date(String(value)+'T00:00:00');return isNaN(d.getTime())?null:d}
  function dateKey(date){return date.getFullYear()+'-'+String(date.getMonth()+1).padStart(2,'0')+'-'+String(date.getDate()).padStart(2,'0')}
  function addDays(date,days){var d=new Date(date.getTime());d.setDate(d.getDate()+days);return d}
  function sameDay(a,b){return a&&b&&dateKey(a)===dateKey(b)}
  function startOfWeek(date){var d=new Date(date.getFullYear(),date.getMonth(),date.getDate());d.setDate(d.getDate()-d.getDay());return d}
  function monthStart(date){return new Date(date.getFullYear(),date.getMonth(),1)}
  function fmt(date,year){return date?SHORT[date.getMonth()]+' '+date.getDate()+(year?', '+date.getFullYear():''):''}
  function branchName(id){var match=(window.branches||[]).find(function(b){return b.id===id});return match?match.name:id}
  function filterValues(){return {
    q:(($('#q')||{}).value||'').trim().toLowerCase(),
    branch:(($('#branchFilter')||{}).value||''),
    region:(($('#regionFilter')||{}).value||''),
    month:(($('#monthFilter')||{}).value||''),
    state:(($('#stateFilter')||{}).value||'')
  }}
  function matchesFilter(opportunity){
    var f=filterValues();
    var hay=JSON.stringify(opportunity||{}).toLowerCase()+' '+(opportunity.departments||[]).map(branchName).join(' ').toLowerCase();
    return (!f.q||hay.indexOf(f.q)>-1)
      &&(!f.branch||(opportunity.departments||[]).indexOf(f.branch)>-1)
      &&(!f.region||opportunity.region===f.region)
      &&(!f.month||String(opportunity.month)===f.month)
      &&(!f.state||opportunity.state===f.state);
  }
  function allEvents(){
    return (window.scopedOpportunities||[]).filter(function(item){return parseDate(item.startDate)&&matchesFilter(item)}).sort(function(a,b){
      return parseDate(a.startDate)-parseDate(b.startDate) || String(a.name).localeCompare(String(b.name));
    });
  }
  function eventRange(event){
    var start=parseDate(event.startDate);
    var end=parseDate(event.endDate)||start;
    if(end<start)end=start;
    return {start:start,end:end};
  }
  function durationDays(event){var r=eventRange(event);return Math.max(1,Math.round((r.end-r.start)/86400000)+1)}
  function eventsOnDay(events,day){return events.filter(function(event){var r=eventRange(event);return r.start<=day&&r.end>=day})}
  function eventsInRange(events,start,end){return events.filter(function(event){var r=eventRange(event);return r.end>=start&&r.start<=end})}
  function productionWindow(event){
    var r=eventRange(event);
    var big=(event.departments||[]).length>=9;
    var lead=big?9:4;
    var tail=big?3:2;
    return fmt(addDays(r.start,-lead),false)+' – '+fmt(addDays(r.end,tail),true);
  }
  function ensureCursor(events){
    if(state.cursor)return;
    var today=new Date();
    var todayStart=new Date(today.getFullYear(),today.getMonth(),today.getDate());
    var upcoming=events.find(function(event){var r=eventRange(event);return r.end>=todayStart;});
    state.cursor=parseDate((upcoming||events[0]||{}).startDate)||new Date(today.getFullYear(),today.getMonth(),1);
  }
  function monthWeeks(date){
    var first=monthStart(date);
    var start=startOfWeek(first);
    var weeks=[];
    for(var w=0;w<6;w++){
      var weekStart=addDays(start,w*7);
      var days=[];
      for(var d=0;d<7;d++)days.push(addDays(weekStart,d));
      weeks.push({start:weekStart,end:addDays(weekStart,6),days:days});
    }
    return weeks;
  }
  function dayModal(day,events){
    var items=eventsOnDay(events,day);
    var body='<h2>'+fmt(day,true)+'</h2>';
    if(!items.length){body+='<p class="sub">No festivals on this day in the current filters.</p>';}
    else{
      body+='<p class="sub">'+items.length+' festival'+(items.length===1?'':'s')+' active on this day.</p>'+items.map(function(event){
        var r=eventRange(event);
        var depts=(event.departments||[]).slice(0,4).map(branchName).join(' · ');
        return '<div class="detail cal-day-detail" style="margin:10px 0;cursor:pointer" onclick="openOpportunity(\''+esc(event.id)+'\')">'+
          '<b>'+esc(event.name)+'</b><br>'+ 
          '<span class="sub">'+esc(event.city||'')+(event.state?', '+esc(event.state):'')+'</span><br>'+ 
          '<span class="sub">Festival: '+esc(fmt(r.start,false)+' – '+fmt(r.end,true))+' · '+durationDays(event)+' day'+(durationDays(event)===1?'':'s')+'</span><br>'+ 
          '<span class="sub">Approx. work window: '+esc(productionWindow(event))+'</span>'+ 
          (depts?'<br><span class="sub">'+esc(depts)+'</span>':'')+ 
        '</div>';
      }).join('');
    }
    if(typeof window.openModal==='function')window.openModal(body);
  }
  window.openCalendarDay=function(key){var day=parseDate(key);if(day)dayModal(day,allEvents());};
  window.setCalendarView=function(view){state.view=view==='week'?'week':'month';render();};
  window.shiftCalendar=function(direction){
    var delta=Number(direction)||0;
    if(state.view==='week')state.cursor=addDays(state.cursor,delta*7);
    else state.cursor=new Date(state.cursor.getFullYear(),state.cursor.getMonth()+delta,1);
    render();
  };
  window.calendarToday=function(){state.cursor=new Date();render();};

  function laneFor(event,used){
    var id=event.id||event.name;
    if(used[id]!=null)return used[id];
    var taken=Object.keys(used).map(function(k){return used[k]});
    var lane=0;
    while(taken.indexOf(lane)>-1)lane++;
    used[id]=lane;
    return lane;
  }
  function monthBar(event,weekStart,weekEnd,used){
    var r=eventRange(event);
    var start=r.start<weekStart?weekStart:r.start;
    var end=r.end>weekEnd?weekEnd:r.end;
    var colStart=Math.floor((start-weekStart)/86400000)+1;
    var colEnd=Math.floor((end-weekStart)/86400000)+2;
    var lane=laneFor(event,used);
    var cont=r.start<weekStart?' continues-in':'';
    cont+=r.end>weekEnd?' continues-out':'';
    return '<button class="cal-month-bar'+cont+'" type="button" style="grid-column:'+colStart+' / '+colEnd+';grid-row:'+(lane+1)+'" onclick="event.stopPropagation();openOpportunity(\''+esc(event.id)+'\')" title="'+esc(event.name)+'">'+
      '<span>'+esc(event.name)+'</span><small>'+durationDays(event)+'d</small></button>';
  }
  function renderMonth(events){
    var month=state.cursor.getMonth();
    var todayKey=dateKey(new Date());
    return '<div class="calendar-app-frame">'+
      '<div class="cal-weekdays app-weekdays">'+DAYS.map(function(day){return '<div>'+day+'</div>'}).join('')+'</div>'+
      '<div class="cal-month-weeks">'+monthWeeks(state.cursor).map(function(week){
        var inWeek=eventsInRange(events,week.start,week.end);
        var used={};
        return '<section class="cal-week-row">'+
          '<div class="cal-week-day-grid">'+week.days.map(function(day){
            var count=eventsOnDay(events,day).length;
            return '<div class="cal-date-cell '+(day.getMonth()===month?'':'muted-month')+' '+(dateKey(day)===todayKey?'today':'')+'" onclick="openCalendarDay(\''+dateKey(day)+'\')">'+
              '<span class="cal-day-num">'+day.getDate()+'</span>'+(count?'<span class="cal-dot-count">'+count+'</span>':'')+'</div>';
          }).join('')+'</div>'+
          '<div class="cal-week-event-grid">'+inWeek.slice(0,8).map(function(event){return monthBar(event,week.start,week.end,used)}).join('')+(inWeek.length>8?'<div class="cal-week-more" style="grid-column:1 / 8;grid-row:9">+'+(inWeek.length-8)+' more this week</div>':'')+'</div>'+ 
        '</section>';
      }).join('')+'</div>'+ 
    '</div>';
  }
  function renderWeek(events){
    var start=startOfWeek(state.cursor);
    var days=[];
    for(var i=0;i<7;i++)days.push(addDays(start,i));
    var end=addDays(start,6);
    var rows=eventsInRange(events,start,end);
    return '<div class="calendar-app-frame cal-week-app">'+
      '<div class="cal-weekdays app-weekdays">'+days.map(function(day){return '<button type="button" onclick="openCalendarDay(\''+dateKey(day)+'\')"><b>'+DAYS[day.getDay()]+'</b><span>'+fmt(day,false)+'</span></button>'}).join('')+'</div>'+ 
      '<div class="cal-week-track">'+(rows.length?rows.map(function(event,index){
        var r=eventRange(event);
        var colStart=Math.max(1,Math.floor((Math.max(r.start,start)-start)/86400000)+1);
        var colEnd=Math.min(8,Math.floor((Math.min(r.end,end)-start)/86400000)+2);
        return '<button class="cal-week-bar" type="button" style="grid-column:'+colStart+' / '+colEnd+';grid-row:'+(index+1)+'" onclick="openOpportunity(\''+esc(event.id)+'\')">'+
          '<b>'+esc(event.name)+'</b><span>'+esc(fmt(r.start,false)+' – '+fmt(r.end,true))+' · '+durationDays(event)+'d</span></button>';
      }).join(''):'<p class="sub">No festivals in this week under current filters.</p>')+'</div>'+ 
      '</div>';
  }
  function render(){
    var app=$('#app');
    if(!app)return;
    var events=allEvents();
    ensureCursor(events);
    var label=state.view==='week'?'Week of '+fmt(startOfWeek(state.cursor),true):MONTHS[state.cursor.getMonth()]+' '+state.cursor.getFullYear();
    app.innerHTML='<section class="interactive-calendar">'+
      '<div class="cal-app-toolbar">'+
        '<div class="cal-title-block"><h2>'+esc(label)+'</h2><p class="lead">Festival calendar for public event dates, overlaps, and durations. Click a day or event bar for details.</p></div>'+ 
        '<div class="cal-control-stack">'+
          '<div class="cal-nav-controls"><button class="btn" type="button" onclick="shiftCalendar(-1)">‹</button><button class="btn" type="button" onclick="calendarToday()">Today</button><button class="btn" type="button" onclick="shiftCalendar(1)">›</button></div>'+ 
          '<div class="cal-segment"><button class="'+(state.view==='month'?'active':'')+'" type="button" onclick="setCalendarView(\'month\')">Month</button><button class="'+(state.view==='week'?'active':'')+'" type="button" onclick="setCalendarView(\'week\')">Week</button></div>'+ 
        '</div>'+ 
      '</div>'+ 
      '<div class="cal-status"><span>'+events.length+' festival'+(events.length===1?'':'s')+' in current filters</span><span>Public dates only · work windows remain approximate</span></div>'+ 
      '<div class="cal-scroll">'+(state.view==='week'?renderWeek(events):renderMonth(events))+'</div>'+ 
      '<div class="notice"><b>Planning note:</b> bars show public festival dates. Approximate build/strike windows appear in day details and event popups for planning only.</div>'+ 
      '</section>';
  }
  function installStyles(){
    if(document.getElementById('interactive-calendar-style'))return;
    var style=document.createElement('style');
    style.id='interactive-calendar-style';
    style.textContent=''+
      '.interactive-calendar{display:block}'+
      '.cal-app-toolbar{display:flex;justify-content:space-between;align-items:flex-start;gap:18px;margin:0 0 14px}'+
      '.cal-title-block h2{margin:0 0 6px;font-size:clamp(1.8rem,4vw,2.55rem)}.cal-title-block .lead{margin:0}'+
      '.cal-control-stack{display:grid;gap:8px;justify-items:end;flex-shrink:0}.cal-nav-controls{display:flex;gap:8px}.cal-nav-controls .btn{min-width:46px}'+
      '.cal-segment{display:flex;border:1px solid var(--line2);background:#101720;border-radius:999px;padding:4px}.cal-segment button{border:0;background:transparent;color:var(--muted);padding:9px 15px;border-radius:999px;font-weight:900;cursor:pointer}.cal-segment button.active{background:var(--gold2);color:#111827}'+
      '.cal-status{display:flex;justify-content:space-between;gap:12px;border:1px solid var(--line);background:#111720;border-radius:14px;padding:10px 12px;margin:0 0 10px;color:var(--muted);font-size:.86rem}'+
      '.cal-scroll{overflow:auto;-webkit-overflow-scrolling:touch;border:1px solid var(--line);border-radius:20px;background:#0e141c;box-shadow:var(--shadow2)}'+
      '.calendar-app-frame{min-width:920px;background:#0e141c}'+
      '.cal-weekdays{display:grid;grid-template-columns:repeat(7,1fr);gap:0}.cal-weekdays>div,.cal-weekdays>button{border:0;border-right:1px solid var(--line);border-bottom:1px solid var(--line);background:#161f2b;color:#aeb9c7;padding:10px;text-align:center;font-size:.75rem;font-weight:900;text-transform:uppercase;letter-spacing:.06em}.cal-weekdays>*:last-child{border-right:0}.cal-weekdays button span{display:block;color:var(--muted);font-weight:700;text-transform:none;letter-spacing:0;margin-top:2px}'+
      '.cal-month-weeks{display:grid}.cal-week-row{position:relative;min-height:148px;border-bottom:1px solid var(--line)}.cal-week-row:last-child{border-bottom:0}'+
      '.cal-week-day-grid{position:absolute;inset:0;display:grid;grid-template-columns:repeat(7,1fr)}.cal-date-cell{position:relative;border-right:1px solid rgba(48,59,73,.8);padding:9px;cursor:pointer;background:rgba(21,29,39,.38)}.cal-date-cell:last-child{border-right:0}.cal-date-cell:hover{background:rgba(242,183,5,.08)}.cal-date-cell.muted-month{opacity:.42}.cal-date-cell.today{box-shadow:inset 0 0 0 2px rgba(242,183,5,.55)}'+
      '.cal-day-num{display:inline-flex;align-items:center;justify-content:center;min-width:26px;height:26px;border-radius:999px;color:#ffd66b;font-weight:900}.cal-date-cell.today .cal-day-num{background:var(--gold2);color:#111827}.cal-dot-count{position:absolute;top:10px;right:10px;color:#aeb9c7;font-size:.72rem;font-weight:900}'+
      '.cal-week-event-grid{position:relative;display:grid;grid-template-columns:repeat(7,1fr);grid-auto-rows:22px;gap:4px;padding:44px 8px 8px;pointer-events:none}'+
      '.cal-month-bar{pointer-events:auto;display:flex;align-items:center;justify-content:space-between;gap:8px;min-width:0;border:1px solid rgba(127,183,255,.42);background:linear-gradient(90deg,rgba(127,183,255,.28),rgba(242,183,5,.16));color:#fff;border-radius:6px;padding:3px 8px;font-size:.72rem;font-weight:850;cursor:pointer;box-shadow:0 4px 10px rgba(0,0,0,.18)}.cal-month-bar:hover{border-color:#ffd66b}.cal-month-bar span{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.cal-month-bar small{color:#ffd66b;font-weight:900}.cal-month-bar.continues-in{border-top-left-radius:0;border-bottom-left-radius:0}.cal-month-bar.continues-out{border-top-right-radius:0;border-bottom-right-radius:0}'+
      '.cal-week-more{pointer-events:none;color:#ffd66b;font-size:.72rem;font-weight:900;padding:2px 8px}'+
      '.cal-week-app{padding-bottom:10px}.cal-week-track{display:grid;grid-template-columns:repeat(7,1fr);grid-auto-rows:minmax(48px,auto);gap:8px;min-height:340px;padding:12px;background:#0e141c}'+
      '.cal-week-bar{border:1px solid rgba(242,183,5,.42);background:linear-gradient(90deg,rgba(217,148,0,.24),rgba(127,183,255,.14));color:#fff;border-radius:12px;padding:10px;text-align:left;cursor:pointer;min-height:48px}.cal-week-bar:hover{border-color:#ffd66b}.cal-week-bar b{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.cal-week-bar span{display:block;color:#c6d0dc;font-size:.76rem;margin-top:2px}'+
      '.cal-day-detail:hover{border-color:rgba(242,183,5,.58)}'+
      '@media(max-width:900px){.cal-app-toolbar{display:block}.cal-control-stack{justify-items:start;margin-top:12px}.calendar-app-frame{min-width:860px}.cal-status{display:block}.cal-status span{display:block;margin:2px 0}.cal-week-row{min-height:142px}}'+
      '@media(max-width:560px){.cal-nav-controls .btn{flex:1}.cal-nav-controls{width:100%}.cal-segment{width:100%}.cal-segment button{flex:1}.calendar-app-frame{min-width:820px}}';
    document.head.appendChild(style);
  }
  function init(){installStyles();render();['input','change'].forEach(function(type){document.addEventListener(type,function(event){if(event.target&&event.target.closest&&event.target.closest('#filters')){state.cursor=null;render();}},true);});}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
