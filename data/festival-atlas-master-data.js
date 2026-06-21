(()=>{
const departments=[
{id:'staging',name:'Staging / Structures',question:'Who builds the stage?',employerTypes:['staging vendor','roof-system provider','temporary-structure company','stage deck provider','local labor provider'],routes:['vendor application','local labor company','IATSE referral','production manager referral'],workerPrep:['PPE','deck terminology','safe lifting','truck-pack discipline']},
{id:'rigging',name:'Rigging',question:'Who supplies rigging?',employerTypes:['IATSE local','rigging contractor','production vendor','arena/stadium rigging department'],routes:['union referral','qualified-rigger vendor','department-head referral'],workerPrep:['do not claim qualification without training','motors/truss vocabulary','exclusion zones']},
{id:'lighting',name:'Lighting',question:'Who supplies lighting?',employerTypes:['lighting vendor','production house','touring vendor','local stagehand labor'],routes:['vendor jobs','shop prep','local crew calls','IATSE local'],workerPrep:['fixture handling','cable','DMX/network basics','focus support']},
{id:'audio',name:'Audio',question:'Who supplies audio?',employerTypes:['audio vendor','PA company','touring sound provider','labor vendor'],routes:['audio vendor','PA shop','local crew','department referral'],workerPrep:['XLR/NL4','stage patch','line-check behavior','comm discipline']},
{id:'video_led',name:'Video / LED',question:'Who supplies video/LED?',employerTypes:['LED wall vendor','video production company','projection vendor','broadcast/camera provider'],routes:['video vendor','LED shop','camera crew referral','local stagehand support'],workerPrep:['LED panel handling','fiber/data care','processor vocabulary']},
{id:'power',name:'Power / Electrical',question:'Who handles power?',employerTypes:['generator company','temporary power vendor','electrical contractor','venue power department'],routes:['power vendor','qualified electrician path','production vendor support','union jurisdiction'],workerPrep:['authorization boundaries','cable ramps','distro-zone respect']},
{id:'site_ops',name:'Site Operations',question:'Who handles site ops?',employerTypes:['festival operations contractor','promoter ops team','fencing vendor','barricade vendor','tent/signage vendor'],routes:['festival ops hiring','site contractor','temp staffing','local labor company'],workerPrep:['radio etiquette','site maps','heat/weather readiness','guest-facing professionalism']},
{id:'logistics',name:'Logistics / Equipment Movement',question:'Who moves gear and manages compounds?',employerTypes:['labor company','forklift/telehandler operator pool','trucking coordinator','equipment rental vendor','yard boss'],routes:['labor provider','equipment vendor','production office','logistics coordinator'],workerPrep:['truck-pack discipline','case labels','forklift exclusion zones','boneyard organization']},
{id:'scenic',name:'Scenic / Carpentry',question:'Who builds scenic and temporary production pieces?',employerTypes:['scenic shop','fabrication vendor','carpentry crew','art install team','brand activation builder'],routes:['scenic shop','production company','local carpenter calls','art department referral'],workerPrep:['measuring','fasteners','finish awareness','safe tool use']},
{id:'backline',name:'Backline',question:'Who handles artist gear?',employerTypes:['backline rental company','festival backline vendor','stage tech network','artist tech team'],routes:['backline vendor','stage manager referral','production company','local music network'],workerPrep:['careful gear handling','stage plots','riser moves','artist-area professionalism']},
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
const rawEmployers=`Crew One Productions|Production labor staffing|Multi-market US|https://www.crew1.com/careers
Rhino Staging|Production labor staffing|Multiple US markets|https://www.rhinostaging.com/careers/
Bigger Hammer Production Services|Production labor staffing|Western US / Southern California|https://www.biggerhammer.com/careers
Showcall|Production labor staffing|Southeast / touring markets|
Christie Lites|Lighting rental / touring production|North America|https://www.christielites.com/careers
4Wall Entertainment|Lighting / video / production services|National|https://www.4wall.com/careers
Bandit Lites|Lighting rental / touring production|National / touring|https://www.banditlites.com/careers/
PRG|Full-service production technology|National / global|https://www.prg.com/en/careers
Solotech|Full-service production technology|National / global|https://www.solotech.com/careers/
Clair Global|Audio / communications / production services|National / global|https://www.clairglobal.com/careers
Eighth Day Sound|Audio production|National / global|https://www.8thdaysound.com/careers
Firehouse Productions|Audio production|National / touring|https://firehouseproductions.com/careers/
LMG|Audio / video / lighting production|National|https://www.lmg.net/careers
Creative Technology|Video / display / production technology|National / global|https://www.ct-group.com/careers/
Fuse Technical Group|Video / media servers / technical production|National|https://www.fuse-tg.com/careers
NEP Live Events|Broadcast / video production|National / global|https://www.nepgroup.com/careers
TAIT|Staging / automation / scenic engineering|National / global|https://www.taittowers.com/careers/
Mountain Productions|Staging / structures / rigging|North America|https://www.mountainproductions.com/careers/
Stageco US|Staging / structures|US / global|https://stageco.com/careers/
All Access Staging & Productions|Staging / scenic / special structures|National|https://allaccessinc.com/careers/
Gallagher Staging|Staging / structures|Western US / national projects|
Accurate Staging|Staging / structures|Southern California / national projects|
Staging Dimensions|Staging / event structures|National|
Eventstar Structures|Temporary structures|National / international|
EPS|Temporary infrastructure / ground protection|National / global|
Terraplas|Ground protection / turf protection|National / global|
StageRight|Staging / seating / risers|National|
Freeman|Exhibitions / brand experience|National|https://www.freeman.com/careers/
GES|Exhibitions / live events|National|https://www.ges.com/careers/
Encore|Venue AV / event technology|National|https://www.encoreglobal.com/careers/
IATSE Local Unions|Union stagehand labor|Jurisdiction-based nationwide|https://iatse.net/local-union-directory/
C3 Presents|Festival producer / promoter|National|https://www.c3presents.com/contact/
Goldenvoice|Festival producer / promoter|California / national|https://www.aegworldwide.com/careers
Insomniac|Festival producer / promoter|National|https://www.insomniac.com/careers/
Danny Wimmer Presents|Festival producer|National|https://dannywimmerpresents.com/careers/
Another Planet Entertainment|Promoter / producer|Northern California|
Founders Entertainment|Festival producer|New York|
Superfly|Festival / experiential producer|National|
Aggreko|Power / HVAC|National|https://www.aggreko.com/en-us/careers
United Rentals|Equipment rental|National|https://jobs.unitedrentals.com/
Sunbelt Rentals|Equipment rental|National|https://www.sunbeltrentals.com/careers/
ASM Global venues|Venue operator|National|https://www.asmglobal.com/careers/
Oak View Group venues|Venue operator|National|https://www.oakviewgroup.com/careers/
Local production managers|Referral network|Market-specific|
Venue crew pools|Venue labor|Market-specific|`;
const west=['CA','NV','AZ','WA','OR','ID','UT','CO','NM','MT','WY'];const mid=['IL','WI','MI','OH','IA','MO','MN','IN','ND','SD','NE','KS'];const south=['TX','FL','GA','TN','KY','LA','AL','NC','SC','VA','OK','AR','MS','MD','DC','DE','WV'];const ne=['NY','NJ','MA','RI','PA','CT','VT','NH','ME'];
const region=s=>west.includes(s)?'West':mid.includes(s)?'Midwest':south.includes(s)?'South':ne.includes(s)?'Northeast':'National';
const base=['staging','lighting','audio','power','site_ops','logistics','stage_mgmt','production_office'];
function festivalDeps(name){let d=[...base]; if(/coachella|edc|bonnaroo|lolla|outside|acl|ultra|rockville|sonic|aftershock|governors|bottle|when we|sick|hard|hula|electric|portola|countdown|lost|life|riot|bourbon|louder|inkcarceration|hangout|breakaway/i.test(name)) d.push('rigging','video_led'); if(/edc|ultra|forest|hard|beyond|zoo|iii|movement|portola|crssd|countdown|dreamstate|lights|hula|coachella|life/i.test(name)) d.push('scenic','video_led'); if(/country|cma|stagecoach|rock|jazz|folk|roots|bluegrass|railbird|faster|newport|sonic|riot|bourbon|louder|aftershock|inkcarceration|welcome|hinterland|high sierra|floyd/i.test(name)) d.push('backline'); return [...new Set(d)];}
function employerDeps(type,name){let t=(type+' '+name).toLowerCase(),d=[]; if(/stage|structure|staging|labor|iatse|venue/.test(t)) d.push('staging'); if(/rigg|iatse|venue/.test(t)) d.push('rigging'); if(/light|production|av|technology|venue/.test(t)) d.push('lighting'); if(/audio|sound|production|av|venue/.test(t)) d.push('audio'); if(/video|display|broadcast|av|technology|venue/.test(t)) d.push('video_led'); if(/power|equipment|rental/.test(t)) d.push('power'); if(/infrastructure|ground|temporary|exhibition|venue|producer|promoter|festival|equipment|rental/.test(t)) d.push('site_ops'); if(/labor|staffing|transport|rental|exhibition|events|equipment/.test(t)) d.push('logistics'); if(/scenic|automation|brand|exhibit|superfly/.test(t)) d.push('scenic'); if(/producer|promoter|festival|venue|production manager/.test(t)) d.push('stage_mgmt','production_office'); return d.length?[...new Set(d)]:['production_office'];}
const festivals=rawFestivals.trim().split('\n').map((line,i)=>{let [name,city,state,month,producer]=line.split('|');return{id:'fest-'+String(i+1).padStart(3,'0'),name,city,state,region:region(state),month:+month,window:'research calendar target',producer,producerStatus:'needs source verification unless separately marked',departments:festivalDeps(name),employerNotes:'Map exact stage builder, rigging, lighting, audio, video/LED, power, site ops, logistics, scenic/backline, stage management, production office, IATSE local, nonunion labor companies, and production company.',verificationStatus:'needs verification',source:'master-data'}});
const employers=rawEmployers.trim().split('\n').map((line,i)=>{let [name,type,reg,careerUrl]=line.split('|');return{id:'emp-'+String(i+1).padStart(3,'0'),name,type,region:reg,careerUrl,departments:employerDeps(type,name),pathway:'verify application/referral route',notes:'Employer/vendor lead. Verify current market, department scope, classification, pay route, and festival relationship.',verificationStatus:'needs verification',source:'master-data'}});
window.FESTIVAL_ATLAS_MASTER_DATA={meta:{name:'Festival Atlas Master Data',branch:'research-version',updated:'2026-06-21',purpose:'Single clean active data source for the Pages app. Older research and older data files remain archived but do not drive the visible UI.',status:'research leads; verify before outreach',originalUploadedFestivalBaseline:48,currentFestivalTargets:festivals.length,currentEmployerTargets:employers.length},departments,festivals,employers,requiredVerificationQuestions:['Who builds the stage?','Who supplies rigging?','Who supplies lighting?','Who supplies audio?','Who supplies video/LED?','Who handles site ops?','Who handles power?','Which IATSE local applies?','Which nonunion labor companies staff the event?','Who is the production manager or production company?']};
})();