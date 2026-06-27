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
  function fmt(date,year){return SHORT[date.getMonth()]+' '+date.getDate()+(year?', '+date.getFullYear():'')}
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
  function eventsOnDay(events,day){
    return events.filter(function(event){var r=eventRange(event);return r.start<=day&&r.end>=day});
  }
  function durationDays(event){var r=eventRange(event);return Math.max(1,Math.round((r.end-r.start)/86400000)+1)}
  function productionWindow(event){
    var r=eventRange(event);
    var big=(event.departments||[]).length>=9;
    var lead=big?9:4;
    var tail=big?3:2;
    return fmt(addDays(r.start,-lead),false)+' – '+fmt(addDays(r.end,tail),true);
  }
  function ensureCursor(events){
    if(state.cursor)return;
    var first=events[0]&&parseDate(events[0].startDate);
    var today=new Date();
    state.cursor=first||new Date(today.getFullYear(),today.getMonth(),1);
  }
  function monthStart(date){return new Date(date.getFullYear(),date.getMonth(),1)}
  function monthGridDays(date){
    var first=monthStart(date);
    var start=startOfWeek(first);
    var days=[];
    for(var i=0;i<42;i++)days.push(addDays(start,i));
    return days;
  }
  function dayModal(day,events){
    var items=eventsOnDay(events,day);
    var body='<h2>'+fmt(day,true)+'</h2>';
    if(!items.length){body+='<p class="sub">No festivals on this day in the current filters.</p>';}
    else{
      body+='<p class="sub">'+items.length+' festival'+(items.length===1?'':'s')+' active on this day.</p>'+
        items.map(function(event){
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
  window.openCalendarDay=function(key){
    var day=parseDate(key);
    if(!day)return;
    dayModal(day,allEvents());
  };
  window.setCalendarView=function(view){state.view=view==='week'?'week':'month';render();};
  window.shiftCalendar=function(direction){
    var delta=Number(direction)||0;
    if(state.view==='week')state.cursor=addDays(state.cursor,delta*7);
    else state.cursor=new Date(state.cursor.getFullYear(),state.cursor.getMonth()+delta,1);
    render();
  };
  window.calendarToday=function(){state.cursor=new Date();render();};

  function eventChip(event,day){
    var r=eventRange(event);
    var cls='cal-chip';
    if(sameDay(day,r.start))cls+=' starts';
    else if(sameDay(day,r.end))cls+=' ends';
    else cls+=' mid';
    return '<button class="'+cls+'" type="button" title="'+esc(event.name)+'" onclick="event.stopPropagation();openOpportunity(\''+esc(event.id)+'\')">'+
      '<span>'+esc(event.name)+'</span><small>'+durationDays(event)+'d</small></button>';
  }
  function renderMonth(events){
    var days=monthGridDays(state.cursor);
    var month=state.cursor.getMonth();
    return '<div class="cal-weekdays">'+DAYS.map(function(day){return '<div>'+day+'</div>'}).join('')+'</div>'+ 
      '<div class="cal-month-grid">'+days.map(function(day){
        var items=eventsOnDay(events,day);
        var visible=items.slice(0,4);
        return '<button class="cal-day '+(day.getMonth()===month?'':'muted-month')+' '+(items.length>1?'overlap':'')+'" type="button" onclick="openCalendarDay(\''+dateKey(day)+'\')">'+
          '<span class="cal-day-num">'+day.getDate()+'</span>'+ 
          '<div class="cal-day-events">'+visible.map(function(event){return eventChip(event,day)}).join('')+(items.length>4?'<span class="cal-more">+'+(items.length-4)+' more</span>':'')+'</div>'+ 
        '</button>';
      }).join('')+'</div>';
  }
  function renderWeek(events){
    var start=startOfWeek(state.cursor);
    var days=[];
    for(var i=0;i<7;i++)days.push(addDays(start,i));
    var end=addDays(start,6);
    var rows=events.filter(function(event){var r=eventRange(event);return r.end>=start&&r.start<=end;});
    return '<div class="cal-week-shell">'+
      '<div class="cal-weekdays">'+days.map(function(day){return '<button type="button" onclick="openCalendarDay(\''+dateKey(day)+'\')"><b>'+DAYS[day.getDay()]+'</b><span>'+fmt(day,false)+'</span></button>'}).join('')+'</div>'+ 
      '<div class="cal-week-track">'+(rows.length?rows.map(function(event){
        var r=eventRange(event);
        var colStart=Math.max(1,Math.floor((Math.max(r.start,start)-start)/86400000)+1);
        var colEnd=Math.min(8,Math.floor((Math.min(r.end,end)-start)/86400000)+2);
        return '<button class="cal-week-bar" type="button" style="grid-column:'+colStart+' / '+colEnd+'" onclick="openOpportunity(\''+esc(event.id)+'\')">'+
          '<b>'+esc(event.name)+'</b><span>'+esc(fmt(r.start,false)+' – '+fmt(r.end,true))+' · '+durationDays(event)+'d</span></button>';
      }).join(''):'<p class="sub">No festivals in this week under current filters.</p>')+'</div>'+ 
      '</div>';
  }
  function render(){
    var app=$('#app');
    if(!app)return;
    var events=allEvents();
    ensureCursor(events);
    var label=state.view==='week'
      ? 'Week of '+fmt(startOfWeek(state.cursor),true)
      : MONTHS[state.cursor.getMonth()]+' '+state.cursor.getFullYear();
    app.innerHTML='<section class="interactive-calendar">'+
      '<div class="cal-toolbar">'+
        '<div><h2>Festival Calendar</h2><p class="lead">Interactive planning calendar for festival dates, overlaps, and durations. Click any day or festival bar for details.</p></div>'+ 
        '<div class="cal-actions">'+
          '<button class="btn" type="button" onclick="shiftCalendar(-1)">Previous</button>'+ 
          '<button class="btn" type="button" onclick="calendarToday()">Today</button>'+ 
          '<button class="btn" type="button" onclick="shiftCalendar(1)">Next</button>'+ 
          '<button class="btn '+(state.view==='month'?'cal-active':'')+'" type="button" onclick="setCalendarView(\'month\')">Month</button>'+ 
          '<button class="btn '+(state.view==='week'?'cal-active':'')+'" type="button" onclick="setCalendarView(\'week\')">Week</button>'+ 
        '</div>'+ 
      '</div>'+ 
      '<div class="cal-current"><b>'+esc(label)+'</b><span>'+events.length+' festival'+(events.length===1?'':'s')+' in current filters</span></div>'+ 
      (state.view==='week'?renderWeek(events):renderMonth(events))+ 
      '<div class="notice"><b>Planning note:</b> bars show public festival dates. Approximate build/strike windows appear in day details and event popups for planning only.</div>'+ 
      '</section>';
  }
  function installStyles(){
    if(document.getElementById('interactive-calendar-style'))return;
    var style=document.createElement('style');
    style.id='interactive-calendar-style';
    style.textContent=''+
      '.interactive-calendar{display:block}'+
      '.cal-toolbar{display:flex;gap:16px;align-items:flex-start;justify-content:space-between;margin-bottom:14px}'+
      '.cal-toolbar h2{margin-top:0}'+
      '.cal-actions{display:flex;flex-wrap:wrap;gap:8px;justify-content:flex-end}'+
      '.cal-active{background:#fff!important;color:#111827!important}'+
      '.cal-current{display:flex;justify-content:space-between;gap:12px;align-items:center;border:1px solid var(--line);background:#141a22;border-radius:16px;padding:12px 14px;margin:0 0 12px}'+
      '.cal-current b{color:#ffd66b}.cal-current span{color:var(--muted);font-size:.86rem}'+
      '.cal-weekdays{display:grid;grid-template-columns:repeat(7,1fr);gap:8px;margin-bottom:8px}'+
      '.cal-weekdays>div,.cal-weekdays>button{border:1px solid var(--line);background:#101720;color:#dbe4ef;border-radius:12px;padding:9px;text-align:center;font-size:.78rem;font-weight:900;text-transform:uppercase;letter-spacing:.06em}'+
      '.cal-weekdays button span{display:block;color:var(--muted);font-weight:700;text-transform:none;letter-spacing:0;margin-top:2px}'+
      '.cal-month-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:8px}'+
      '.cal-day{min-height:132px;text-align:left;border:1px solid var(--line);background:#151d27;color:var(--ink);border-radius:14px;padding:9px;cursor:pointer;overflow:hidden}'+
      '.cal-day:hover{border-color:rgba(242,183,5,.65);background:#192332}'+
      '.cal-day.muted-month{opacity:.46}.cal-day.overlap{box-shadow:inset 0 0 0 1px rgba(242,183,5,.22)}'+
      '.cal-day-num{display:block;color:#ffd66b;font-weight:900;font-size:.9rem;margin-bottom:6px}'+
      '.cal-day-events{display:grid;gap:4px}'+
      '.cal-chip{display:flex;align-items:center;justify-content:space-between;gap:6px;width:100%;border:1px solid rgba(127,183,255,.32);background:rgba(127,183,255,.12);color:#e8f2ff;border-radius:9px;padding:5px 6px;font-size:.68rem;line-height:1.1;text-align:left;cursor:pointer}'+
      '.cal-chip.starts{border-left:3px solid #63c28f}.cal-chip.mid{border-left:3px solid #7fb7ff}.cal-chip.ends{border-left:3px solid #ffd66b}'+
      '.cal-chip span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.cal-chip small{color:#ffd66b;font-weight:900}'+
      '.cal-more{font-size:.7rem;color:#ffd66b;font-weight:900;padding:2px 4px}'+
      '.cal-week-shell{border:1px solid var(--line);border-radius:18px;background:#101720;padding:12px;overflow:auto}'+
      '.cal-week-track{display:grid;grid-template-columns:repeat(7,1fr);gap:8px;min-height:260px;align-content:start}'+
      '.cal-week-bar{border:1px solid rgba(242,183,5,.42);background:linear-gradient(90deg,rgba(217,148,0,.24),rgba(127,183,255,.14));color:#fff;border-radius:12px;padding:10px;text-align:left;cursor:pointer;min-height:48px}'+
      '.cal-week-bar:hover{border-color:#ffd66b}.cal-week-bar b{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.cal-week-bar span{display:block;color:#c6d0dc;font-size:.76rem;margin-top:2px}'+
      '.cal-day-detail:hover{border-color:rgba(242,183,5,.58)}'+
      '@media(max-width:900px){.cal-toolbar{display:block}.cal-actions{justify-content:flex-start;margin-top:10px}.cal-month-grid,.cal-weekdays{min-width:760px}.interactive-calendar{overflow:auto}.cal-day{min-height:118px}}'+
      '@media(max-width:560px){.cal-current{display:block}.cal-current span{display:block;margin-top:4px}.cal-actions .btn{flex:1 1 30%}}';
    document.head.appendChild(style);
  }
  function init(){installStyles();render();['input','change'].forEach(function(type){document.addEventListener(type,function(event){if(event.target&&event.target.closest&&event.target.closest('#filters')){state.cursor=null;render();}},true);});}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
