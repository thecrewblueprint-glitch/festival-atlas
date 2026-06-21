(()=>{
const departments=[
{id:'staging',name:'Staging / Structures',question:'Who builds the stage?',employerTypes:['U.S. staging vendor','U.S. roof-system provider','U.S. temporary-structure company','U.S. stage deck provider','U.S. local labor provider'],routes:['vendor application','local labor company','IATSE referral','production manager referral'],workerPrep:['PPE','deck terminology','safe lifting','truck-pack discipline']},
{id:'rigging',name:'Rigging',question:'Who supplies rigging?',employerTypes:['IATSE local','U.S. rigging contractor','U.S. production vendor','arena/stadium rigging department'],routes:['union referral','qualified-rigger vendor','department-head referral'],workerPrep:['do not claim qualification without training','motors/truss vocabulary','exclusion zones']},
{id:'lighting',name:'Lighting',question:'Who supplies lighting?',employerTypes:['U.S. lighting vendor','U.S. production house','U.S. touring vendor','local stagehand labor'],routes:['vendor jobs','shop prep','local crew calls','IATSE local'],workerPrep:['fixture handling','cable','DMX/network basics','focus support']},
{id:'audio',name:'Audio',question:'Who supplies audio?',employerTypes:['U.S. audio vendor','U.S. PA company','U.S. touring sound provider','labor vendor'],routes:['audio vendor','PA shop','local crew','department referral'],workerPrep:['XLR/NL4','stage patch','line-check behavior','comm discipline']},
{id:'video_led',name:'Video / LED',question:'Who supplies video/LED?',employerTypes:['U.S. LED wall vendor','U.S. video production company','U.S. projection vendor','U.S. broadcast/camera provider'],routes:['video vendor','LED shop','camera crew referral','local stagehand support'],workerPrep:['LED panel handling','fiber/data care','processor vocabulary']},
{id:'power',name:'Power / Electrical',question:'Who handles power?',employerTypes:['U.S. generator company','U.S. temporary power vendor','U.S. electrical contractor','venue power department'],routes:['power vendor','qualified electrician path','production vendor support','union jurisdiction'],workerPrep:['authorization boundaries','cable ramps','distro-zone respect']},
{id:'site_ops',name:'Site Operations',question:'Who handles site ops?',employerTypes:['U.S. festival operations contractor','promoter ops team','fencing vendor','barricade vendor','tent/signage vendor'],routes:['festival ops hiring','site contractor','temp staffing','local labor company'],workerPrep:['radio etiquette','site maps','heat/weather readiness','guest-facing professionalism']},
{id:'logistics',name:'Logistics / Equipment Movement',question:'Who moves gear and manages compounds?',employerTypes:['U.S. labor company','forklift/telehandler operator pool','trucking coordinator','equipment rental vendor','yard boss'],routes:['labor provider','equipment vendor','production office','logistics coordinator'],workerPrep:['truck-pack discipline','case labels','forklift exclusion zones','boneyard organization']},
{id:'scenic',name:'Scenic / Carpentry',question:'Who builds scenic and temporary production pieces?',employerTypes:['U.S. scenic shop','U.S. fabrication vendor','carpentry crew','art install team','brand activation builder'],routes:['scenic shop','production company','local carpenter calls','art department referral'],workerPrep:['measuring','fasteners','finish awareness','safe tool use']},
{id:'backline',name:'Backline',question:'Who handles artist gear?',employerTypes:['U.S. backline rental company','festival backline vendor','stage tech network','artist tech team'],routes:['backline vendor','stage manager referral','production company','local music network'],workerPrep:['careful gear handling','stage plots','riser moves','artist-area professionalism']},
{id:'stage_mgmt',name:'Stage Management',question:'Who coordinates show flow?',employerTypes:['festival production team','stage manager','production company','promoter production department'],routes:['production manager referral','stage manager network','PA-to-stage-management path'],workerPrep:['radio discipline','calm communication','time awareness','paperwork literacy']},
{id:'production_office',name:'Production Assistant / Production Office',question:'Who coordinates office, runners, credentials, and vendor paperwork?',employerTypes:['promoter production office','production company','staffing agency','local event coordinator'],routes:['direct posting','production office referral','runner/PA calls','event staffing'],workerPrep:['organization','discretion','receipts','spreadsheets','local driving']}
];
const rawFestivals=`Coachella|Indio|CA|4|Goldenvoice / AEG Presents
Stagecoach|Indio|CA|4|Goldenvoice / AEG Presents
Ultra Music Festival|Miami|FL|3|Ultra Enterprises
EDC Las Vegas|Las Vegas|NV|5|Insomniac / Live Nation ecosystem
Bonnaroo|Manchester|TN|6|C3 Presents / Live Nation ecosystem
CMA Fest|Nashville|TN|6|Country Music Association
Electric Forest|Rothbury|MI|6|Insomniac / Madison House, verify current
Summerfest|Milwaukee|WI|6|Milwaukee World Festival Inc.
Lollapalooza Chicago|Chicago|IL|8|C3 Presents / Live Nation ecosystem
Outside Lands|San Francisco|CA|8|Another Planet / Superfly, verify current
Austin City Limits|Austin|TX|10|C3 Presents
Bourbon & Beyond|Louisville|KY|9|Danny Wimmer Presents
Louder Than Life|Louisville|KY|9|Danny Wimmer Presents
Welcome to Rockville|Daytona Beach|FL|5|Danny Wimmer Presents
Sonic Temple|Columbus|OH|5|Danny Wimmer Presents
Inkcarceration|Mansfield|OH|7|Danny Wimmer Presents
Aftershock|Sacramento|CA|10|Danny Wimmer Presents
Governors Ball|Queens|NY|6|Founders Entertainment / Live Nation ecosystem
Boston Calling|Boston|MA|5|Boston Calling Events / partners, verify
Shaky Knees|Atlanta|GA|5|C3 Presents / Live Nation ecosystem
Riot Fest|Chicago|IL|9|Riot Fest Corp, verify
Portola Music Festival|San Francisco|CA|9|Goldenvoice / AEG ecosystem
EDC Orlando|Orlando|FL|11|Insomniac / Live Nation ecosystem
Hinterland|St. Charles|IA|8|First Fleet / partners, verify
New Orleans Jazz & Heritage Festival|New Orleans|LA|4|New Orleans Jazz & Heritage Foundation / partners
Hangout Music Festival|Gulf Shores|AL|5|Hangout / partners, verify current format
BottleRock Napa Valley|Napa|CA|5|Latitude 38 Entertainment, verify partners
Life Is Beautiful|Las Vegas|NV|9|Life Is Beautiful / partners, verify current format
Kilby Block Party|Salt Lake City|UT|5|S&S Presents, verify
Railbird Festival|Lexington|KY|6|Live Nation / partners, verify
Oceans Calling|Ocean City|MD|9|C3 Presents / Live Nation ecosystem
Sea.Hear.Now|Asbury Park|NJ|9|C3 Presents / partners, verify
When We Were Young|Las Vegas|NV|10|Live Nation / partners, verify
Sick New World|Las Vegas|NV|4|Live Nation / partners, verify active status
Dreamville Festival|Raleigh|NC|4|Dreamville / partners, verify
Roots Picnic|Philadelphia|PA|6|The Roots / Live Nation Urban, verify
Movement Detroit|Detroit|MI|5|Paxahau
III Points|Miami|FL|10|III Points / partners, verify
HARD Summer|Southern California|CA|8|Insomniac, verify site/year
Beyond Wonderland SoCal|San Bernardino|CA|3|Insomniac
Electric Zoo|New York|NY|9|verify current status
North Coast Music Festival|Bridgeview|IL|8|North Coast / partners, verify
Breakaway Music Festival|Multiple cities|US|5|Breakaway / multi-city producer, verify markets
Country Thunder|Multiple US markets|US|4|Country Thunder Music Festivals
Faster Horses|Brooklyn|MI|7|Live Nation / country festival ecosystem, verify
Rock Fest Wisconsin|Cadott|WI|7|Rock Fest / Chippewa Valley festival ecosystem
Hulaween|Live Oak|FL|10|Suwannee / partners, verify
High Sierra Music Festival|Quincy|CA|7|High Sierra / partners, verify
M3F Fest|Phoenix|AZ|3|M3F / nonprofit festival org, verify current
Newport Folk Festival|Newport|RI|7|Newport Festivals Foundation
Newport Jazz Festival|Newport|RI|8|Newport Festivals Foundation
Levitate Music Festival|Marshfield|MA|6|Levitate, verify
Treefort Music Fest|Boise|ID|3|Treefort Music Fest
Capitol Hill Block Party|Seattle|WA|7|CHBP / partners, verify
Pickathon|Happy Valley|OR|8|Pickathon
Telluride Bluegrass Festival|Telluride|CO|6|Planet Bluegrass
FloydFest|Floyd|VA|7|Across-the-Way Productions, verify
Rocklahoma|Pryor|OK|8|AEG / partners, verify
Lights All Night|Dallas|TX|12|Disco Donnie Presents / partners, verify
Countdown NYE|San Bernardino|CA|12|Insomniac
Dreamstate SoCal|Long Beach / Southern CA|CA|11|Insomniac
CRSSD Festival|San Diego|CA|9|FNGRS CRSSD, verify
Okeechobee Music & Arts Festival|Okeechobee|FL|3|verify current status
Blue Ridge Rock Festival|Virginia market|VA|9|verify current status; risk-review target
Levitation|Austin|TX|10|Levitation / partners, verify`;
const rawEmployers=`Crew One Productions|U.S. production labor staffing|United States multi-market|https://www.crew1.com/careers
Rhino Staging|U.S. production labor staffing|United States multi-market|https://www.rhinostaging.com/careers/
Bigger Hammer Production Services|U.S. production labor staffing|California / Western United States|https://www.biggerhammer.com/careers
Showcall|U.S. production labor staffing|Southeast United States|
Christie Lites U.S.|U.S. lighting rental / touring production|United States|https://www.christielites.com/careers
4Wall Entertainment|U.S. lighting / video / production services|United States|https://www.4wall.com/careers
Bandit Lites|U.S. lighting rental / touring production|United States|https://www.banditlites.com/careers/
PRG U.S.|U.S. full-service production technology|United States|https://www.prg.com/en/careers
Solotech U.S.|U.S. full-service production technology|United States|https://www.solotech.com/careers/
Clair Global U.S.|U.S. audio / communications / production services|United States|https://www.clairglobal.com/careers
Eighth Day Sound|U.S. audio production|United States|https://www.8thdaysound.com/careers
Firehouse Productions|U.S. audio production|United States|https://firehouseproductions.com/careers/
LMG|U.S. audio / video / lighting production|United States|https://www.lmg.net/careers
Creative Technology U.S.|U.S. video / display / production technology|United States|https://www.ct-group.com/careers/
Fuse Technical Group|U.S. video / media servers / technical production|United States|https://www.fuse-tg.com/careers
NEP Live Events U.S.|U.S. broadcast / video production|United States|https://www.nepgroup.com/careers
TAIT U.S.|U.S. staging / automation / scenic engineering|United States|https://www.taittowers.com/careers/
Mountain Productions|U.S. staging / structures / rigging|United States|https://www.mountainproductions.com/careers/
Stageco US|U.S. staging / structures|United States|https://stageco.com/careers/
All Access Staging & Productions|U.S. staging / scenic / special structures|United States|https://allaccessinc.com/careers/
Gallagher Staging|U.S. staging / structures|Western United States|
Accurate Staging|U.S. staging / structures|Southern California|
Staging Dimensions|U.S. staging / event structures|United States|
Eventstar Structures|U.S. temporary structures|United States|
EPS America|U.S. temporary infrastructure / ground protection|United States|
Terraplas U.S.|U.S. ground protection / turf protection|United States|
StageRight|U.S. staging / seating / risers|United States|
Freeman|U.S. exhibitions / brand experience|United States|https://www.freeman.com/careers/
GES U.S.|U.S. exhibitions / live events|United States|https://www.ges.com/careers/
Encore U.S.|U.S. venue AV / event technology|United States|https://www.encoreglobal.com/careers/
IATSE Local Unions|U.S. union stagehand labor|United States jurisdiction-based|https://iatse.net/local-union-directory/
C3 Presents|U.S. festival producer / promoter|United States|https://www.c3presents.com/contact/
Goldenvoice|U.S. festival producer / promoter|California / United States|https://www.aegworldwide.com/careers
Insomniac|U.S. festival producer / promoter|United States|https://www.insomniac.com/careers/
Danny Wimmer Presents|U.S. festival producer|United States|https://dannywimmerpresents.com/careers/
Another Planet Entertainment|U.S. promoter / producer|Northern California|
Founders Entertainment|U.S. festival producer|New York|
Superfly U.S.|U.S. festival / experiential producer|United States|
Aggreko U.S.|U.S. power / HVAC|United States|https://careers.aggreko.com/na/en-us
United Rentals|U.S. equipment rental|United States|https://jobs.unitedrentals.com/
Sunbelt Rentals|U.S. equipment rental|United States|https://careers.sunbeltrentals.com/
ASM Global U.S. venues|U.S. venue operator|United States|https://legendsglobal.com/careers/
Oak View Group U.S. venues|U.S. venue operator|United States|https://www.oakviewgroup.com/careers/
Local U.S. production managers|U.S. referral network|Market-specific United States|
U.S. venue crew pools|U.S. venue labor|Market-specific United States|`;
const statusMap={
'Coachella':['confirmed_active_2026','https://en.wikipedia.org/wiki/Coachella_2026',true],
'Stagecoach':['confirmed_active_2026','https://pitchfork.com/news/stagecoach-festival-2026-lineup-announced-post-malone-lainey-wilson/',true],
'Ultra Music Festival':['confirmed_active_2026','https://en.wikipedia.org/wiki/Ultra_Music_Festival',true],
'EDC Las Vegas':['confirmed_active_2026','https://www.businessinsider.com/guides/tickets/where-to-buy-edc-tickets-music-festival',true],
'Bonnaroo':['confirmed_active_2026','https://pitchfork.com/news/bonnaroo-2026-livestream-schedule-and-details-announced-for-disney-and-hulu/',true],
'CMA Fest':['confirmed_active_2026','https://www.axios.com/local/nashville/2026/02/25/cma-fest-2026-headliners-tim-mcgraw-keith-urban',true],
'Electric Forest':['confirmed_active_2026','https://en.wikipedia.org/wiki/Electric_Forest',true],
'Lollapalooza Chicago':['confirmed_active_2026','https://nypost.com/2026/03/17/ticket-sales/lollapalooza-2026-where-to-buy-tickets-lineup-dates/',true],
'Austin City Limits':['confirmed_active_2026','https://en.wikipedia.org/wiki/Austin_City_Limits_Music_Festival',true],
'Louder Than Life':['confirmed_active_2026','https://en.wikipedia.org/wiki/Louder_Than_Life',true],
'Welcome to Rockville':['confirmed_active_2026','https://en.wikipedia.org/wiki/2026_in_rock_music',true],
'Sonic Temple':['confirmed_active_2026','https://en.wikipedia.org/wiki/2026_in_rock_music',true],
'Inkcarceration':['confirmed_active_2026','https://www.loudersound.com/bands-artists/music-festivals/inkcarceration-featuring-bad-omens-papa-roach-limp-bizkit-poppy-2026',true],
'Aftershock':['confirmed_active_2026','https://en.wikipedia.org/wiki/Aftershock_Festival',true],
'Governors Ball':['confirmed_active_2026','https://en.wikipedia.org/wiki/Governors_Ball_Music_Festival',true],
'Shaky Knees':['confirmed_active_2026','https://en.wikipedia.org/wiki/Shaky_Knees_Music_Festival',true],
'BottleRock Napa Valley':['confirmed_active_2026','https://nypost.com/2026/01/15/ticket-sales/bottlerock-festival-2026-lineup-see-backstreet-boys-foo-fighters/',true],
'Kilby Block Party':['confirmed_active_2026','https://en.wikipedia.org/wiki/Kilby_Block_Party_(music_festival)',true],
'Hinterland':['confirmed_active_2026','https://nypost.com/2025/11/18/ticket-sales/hinterland-festival-2026-where-to-buy-tickets-lineup-dates/',true],
'Newport Folk Festival':['confirmed_active_2026','https://en.wikipedia.org/wiki/Newport_Folk_Festival',true],
'Newport Jazz Festival':['confirmed_active_2026','https://pitchfork.com/news/thundercat-angine-de-poitrine-to-play-newport-jazz-festival-2026/',true],
'Okeechobee Music & Arts Festival':['confirmed_active_2026','https://en.wikipedia.org/wiki/Okeechobee_Music_%26_Arts_Festival',true],
'Sick New World':['confirmed_active_2026','https://en.wikipedia.org/wiki/2026_in_rock_music',true],
'Sea.Hear.Now':['confirmed_active_2026','https://en.wikipedia.org/wiki/Sea.Hear.Now_Festival',true],
'Boston Calling':['inactive_2026','https://en.wikipedia.org/wiki/Boston_Calling_Music_Festival',false],
'Hangout Music Festival':['inactive_2026','https://people.com/morgan-wallen-sand-in-my-boots-festival-will-not-return-in-2026-11865336',false],
'Electric Zoo':['inactive_2026','https://en.wikipedia.org/wiki/Electric_Zoo',false],
'Blue Ridge Rock Festival':['inactive_2026','',false],
'Life Is Beautiful':['needs_verification','',false]
};
const west=['CA','NV','AZ','WA','OR','ID','UT','CO','NM','MT','WY'];const mid=['IL','WI','MI','OH','IA','MO','MN','IN','ND','SD','NE','KS'];const south=['TX','FL','GA','TN','KY','LA','AL','NC','SC','VA','OK','AR','MS','MD','DC','DE','WV'];const ne=['NY','NJ','MA','RI','PA','CT','VT','NH','ME'];
const region=s=>west.includes(s)?'West':mid.includes(s)?'Midwest':south.includes(s)?'South':ne.includes(s)?'Northeast':'United States multi-market';
const base=['staging','lighting','audio','power','site_ops','logistics','stage_mgmt','production_office'];
function festivalDeps(name){let d=[...base]; if(/coachella|edc|bonnaroo|lolla|outside|acl|ultra|rockville|sonic|aftershock|governors|bottle|when we|sick|hard|hula|electric|portola|countdown|lost|life|riot|bourbon|louder|inkcarceration|hangout|breakaway/i.test(name)) d.push('rigging','video_led'); if(/edc|ultra|forest|hard|beyond|zoo|iii|movement|portola|crssd|countdown|dreamstate|lights|hula|coachella|life/i.test(name)) d.push('scenic','video_led'); if(/country|cma|stagecoach|rock|jazz|folk|roots|bluegrass|railbird|faster|newport|sonic|riot|bourbon|louder|aftershock|inkcarceration|welcome|hinterland|high sierra|floyd/i.test(name)) d.push('backline'); return [...new Set(d)];}
function employerDeps(type,name){let t=(type+' '+name).toLowerCase(),d=[]; if(/stage|structure|staging|labor|iatse|venue/.test(t)) d.push('staging'); if(/rigg|iatse|venue/.test(t)) d.push('rigging'); if(/light|production|av|technology|venue/.test(t)) d.push('lighting'); if(/audio|sound|production|av|venue/.test(t)) d.push('audio'); if(/video|display|broadcast|av|technology|venue/.test(t)) d.push('video_led'); if(/power|equipment|rental/.test(t)) d.push('power'); if(/infrastructure|ground|temporary|exhibition|venue|producer|promoter|festival|equipment|rental/.test(t)) d.push('site_ops'); if(/labor|staffing|transport|rental|exhibition|events|equipment/.test(t)) d.push('logistics'); if(/scenic|automation|brand|exhibit|superfly/.test(t)) d.push('scenic'); if(/producer|promoter|festival|venue|production manager/.test(t)) d.push('stage_mgmt','production_office'); return d.length?[...new Set(d)]:['production_office'];}
const festivals=rawFestivals.trim().split('\n').map((line,i)=>{let [name,city,state,month,producer]=line.split('|');let status=statusMap[name]||['needs_verification','',false];return{id:'fest-'+String(i+1).padStart(3,'0'),name,city,state,region:region(state),month:+month,window:'research calendar target',producer,producerStatus:status[0]==='confirmed_active_2026'?'2026 active source attached':status[0],active2026Status:status[0],active2026SourceUrl:status[1],active2026CheckedDate:'2026-06-21',visibleInActive2026View:status[2],departments:festivalDeps(name),employerNotes:'U.S. research only. Map exact stage builder, rigging, lighting, audio, video/LED, power, site ops, logistics, scenic/backline, stage management, production office, IATSE local, nonunion labor companies, and production company.',verificationStatus:status[0],source:'master-data-us-only'}});
const employers=rawEmployers.trim().split('\n').map((line,i)=>{let [name,type,reg,careerUrl]=line.split('|');return{id:'emp-'+String(i+1).padStart(3,'0'),name,type,region:reg,careerUrl,marketScope:'United States only',departments:employerDeps(type,name),pathway:'verify U.S. application/referral route',notes:'U.S. employer/vendor lead only. Verify current market, department scope, classification, pay route, and festival relationship.',verificationStatus:'needs verification',source:'master-data-us-only'}});
window.FESTIVAL_ATLAS_MASTER_DATA={meta:{name:'Festival Atlas Master Data',branch:'research-version',updated:'2026-06-21',purpose:'Single clean active U.S.-only data source for the Pages app. Older research and older data files remain archived but do not drive the visible UI.',marketScope:'United States only',status:'research leads; verify before outreach',active2026Rule:'visible app should show only records with visibleInActive2026View true',originalUploadedFestivalBaseline:48,currentFestivalTargets:festivals.length,active2026VisibleTargets:festivals.filter(f=>f.visibleInActive2026View).length,currentEmployerTargets:employers.length},departments,festivals,employers,requiredVerificationQuestions:['Who builds the stage?','Who supplies rigging?','Who supplies lighting?','Who supplies audio?','Who supplies video/LED?','Who handles site ops?','Who handles power?','Which IATSE local applies?','Which nonunion labor companies staff the event?','Who is the production manager or production company?']};
})();