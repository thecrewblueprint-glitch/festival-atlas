(()=>{
const D=['staging|Staging / Structures|Who builds the stage?','rigging|Rigging|Who supplies rigging?','lighting|Lighting|Who supplies lighting?','audio|Audio|Who supplies audio?','video_led|Video / LED|Who supplies video/LED?','power|Power / Electrical|Who handles power?','site_ops|Site Operations|Who handles site ops?','logistics|Logistics / Equipment Movement|Who moves gear and manages compounds?','scenic|Scenic / Carpentry|Who builds scenic and temporary production pieces?','backline|Backline|Who handles artist gear?','stage_mgmt|Stage Management|Who coordinates show flow?','production_office|Production Assistant / Production Office|Who coordinates office, runners, credentials, and vendor paperwork?'];
const departments=D.map(x=>{let [id,name,question]=x.split('|');return{id,name,question,employerTypes:['U.S. employer/vendor lead'],routes:['verify U.S. application/referral route'],workerPrep:['verify department-specific requirements']}});
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
HARD Summer|Inglewood|CA|8|Insomniac
Beyond Wonderland SoCal|San Bernardino|CA|3|Insomniac
Electric Zoo|New York|NY|9|verify current status
North Coast Music Festival|Bridgeview|IL|9|North Coast / partners, verify
Breakaway Music Festival|Multiple cities|US|5|Breakaway / multi-city producer, verify markets
Country Thunder|Multiple US markets|US|4|Country Thunder Music Festivals
Faster Horses|Brooklyn|MI|7|Live Nation / country festival ecosystem, verify
Rock Fest Wisconsin|Cadott|WI|7|Rock Fest / Chippewa Valley festival ecosystem
Hulaween|Live Oak|FL|10|Suwannee / partners, verify
High Sierra Music Festival|Grass Valley|CA|7|High Sierra / partners, verify
M3F Fest|Phoenix|AZ|3|M3F / nonprofit festival org, verify
Newport Folk Festival|Newport|RI|7|Newport Festivals Foundation
Newport Jazz Festival|Newport|RI|8|Newport Festivals Foundation
Levitate Music Festival|Marshfield|MA|7|Levitate, verify
Treefort Music Fest|Boise|ID|3|Treefort Music Fest
Capitol Hill Block Party|Seattle|WA|8|CHBP / partners, verify
Pickathon|Happy Valley|OR|7|Pickathon
Telluride Bluegrass Festival|Telluride|CO|6|Planet Bluegrass
FloydFest|Check|VA|7|Across-the-Way Productions, verify
Rocklahoma|Pryor|OK|9|AEG / partners, verify
Lights All Night|Dallas|TX|12|Disco Donnie Presents / partners, verify
Countdown NYE|San Bernardino|CA|12|Insomniac
Dreamstate SoCal|Long Beach|CA|11|Insomniac
CRSSD Festival|San Diego|CA|3|FNGRS CRSSD, verify
Okeechobee Music & Arts Festival|Okeechobee|FL|3|verify current status
Blue Ridge Rock Festival|Virginia market|VA|9|verify current status; risk-review target
Levitation Austin|Austin|TX|9|Levitation / partners, verify`;
const rawEmployers=`Crew One Productions|U.S. production labor staffing|United States multi-market|https://www.crew1.com/|homepage_fallback
Rhino Staging|U.S. production labor staffing|United States multi-market|https://www.rhinostaging.com/|homepage_fallback
Bigger Hammer Production Services|U.S. production labor staffing|California / Western United States|https://www.biggerhammer.com/careers|verified_career
Christie Lites U.S.|U.S. lighting rental / touring production|United States|https://www.christielites.com/|homepage_fallback
4Wall Entertainment|U.S. lighting / video / production services|United States|https://www.4wall.com/|homepage_fallback
Bandit Lites|U.S. lighting rental / touring production|United States|https://www.banditlites.com/|homepage_fallback
PRG U.S.|U.S. full-service production technology|United States|https://www.prg.com/|homepage_fallback
Solotech U.S.|U.S. full-service production technology|United States|https://www.solotech.com/|homepage_fallback
Clair Global U.S.|U.S. audio / communications / production services|United States|https://www.clairglobal.com/careers|verified_career
Eighth Day Sound|U.S. audio production|United States|https://www.8thdaysound.com/careers|verified_career
NEP Live Events U.S.|U.S. broadcast / video production|United States|https://www.nepgroup.com/careers|verified_career
TAIT U.S.|U.S. staging / automation / scenic engineering|United States|https://www.taittowers.com/careers|verified_career
Mountain Productions|U.S. staging / structures / rigging|United States|https://www.mountainproductions.com/|homepage_fallback
Stageco US|U.S. staging / structures|United States|https://stageco.com/|homepage_fallback
All Access Staging & Productions|U.S. staging / scenic / special structures|United States|https://allaccessinc.com/careers/|verified_career
IATSE Local Unions|U.S. union stagehand labor|United States jurisdiction-based|https://iatse.net/local-union-directory/|verified_career
C3 Presents|U.S. festival producer / promoter|United States|https://www.c3presents.com/|homepage_fallback
Goldenvoice / AEG|U.S. festival producer / promoter|California / United States|https://aegworldwide.com/careers|verified_career
Insomniac|U.S. festival producer / promoter|United States|https://www.insomniac.com/|homepage_fallback
Danny Wimmer Presents|U.S. festival producer|United States|https://dannywimmerpresents.com/|homepage_fallback
Aggreko U.S.|U.S. power / HVAC|United States|https://careers.aggreko.com/na/en-us|verified_career
United Rentals|U.S. equipment rental|United States|https://jobs.unitedrentals.com/|verified_career
Sunbelt Rentals|U.S. equipment rental|United States|https://careers.sunbeltrentals.com/|verified_career
ASM Global U.S. venues / Legends Global|U.S. venue operator|United States|https://legendsglobal.com/careers/|verified_career`;
const west=['CA','NV','AZ','WA','OR','ID','UT','CO','NM','MT','WY'],mid=['IL','WI','MI','OH','IA','MO','MN','IN','ND','SD','NE','KS'],south=['TX','FL','GA','TN','KY','LA','AL','NC','SC','VA','OK','AR','MS','MD','DC','DE','WV'],ne=['NY','NJ','MA','RI','PA','CT','VT','NH','ME'];
const region=s=>west.includes(s)?'West':mid.includes(s)?'Midwest':south.includes(s)?'South':ne.includes(s)?'Northeast':'United States multi-market';
const base=['staging','lighting','audio','power','site_ops','logistics','stage_mgmt','production_office'];
function festivalDeps(n){let d=[...base];if(/coachella|edc|bonnaroo|lolla|outside|acl|ultra|rockville|sonic|aftershock|governors|bottle|when we|sick|hard|hula|electric|portola|countdown|life|riot|bourbon|louder|inkcarceration|hangout|breakaway/i.test(n))d.push('rigging','video_led');if(/edc|ultra|forest|hard|beyond|zoo|iii|movement|portola|crssd|countdown|dreamstate|lights|hula|coachella|life/i.test(n))d.push('scenic','video_led');if(/country|cma|stagecoach|rock|jazz|folk|roots|bluegrass|railbird|faster|newport|sonic|riot|bourbon|louder|aftershock|inkcarceration|welcome|hinterland|high sierra|floyd/i.test(n))d.push('backline');return[...new Set(d)]}
function employerDeps(t,n){let s=(t+' '+n).toLowerCase(),d=[];if(/stage|structure|staging|labor|iatse|venue/.test(s))d.push('staging');if(/rigg|iatse|venue/.test(s))d.push('rigging');if(/light|production|av|technology|venue/.test(s))d.push('lighting');if(/audio|sound|production|av|venue/.test(s))d.push('audio');if(/video|display|broadcast|av|technology|venue/.test(s))d.push('video_led');if(/power|equipment|rental/.test(s))d.push('power');if(/producer|promoter|festival|venue|production manager/.test(s))d.push('stage_mgmt','production_office');if(/rental|labor|staffing|equipment|venue/.test(s))d.push('logistics','site_ops');return d.length?[...new Set(d)]:['production_office']}
const confirmedByReport=['Summerfest','Bourbon & Beyond','Portola Music Festival','EDC Orlando','New Orleans Jazz & Heritage Festival','Railbird Festival','Oceans Calling','Dreamville Festival','Roots Picnic','III Points','HARD Summer','Beyond Wonderland SoCal','North Coast Music Festival','Breakaway Music Festival','Country Thunder','Rock Fest Wisconsin','Hulaween','High Sierra Music Festival','M3F Fest','Levitate Music Festival','Treefort Music Fest','Capitol Hill Block Party','Pickathon','Telluride Bluegrass Festival','FloydFest','Rocklahoma','Lights All Night','Countdown NYE','Dreamstate SoCal','CRSSD Festival','Levitation Austin'];
const confirmedPrior=['Coachella','Stagecoach','Ultra Music Festival','EDC Las Vegas','Bonnaroo','CMA Fest','Electric Forest','Lollapalooza Chicago','Austin City Limits','Louder Than Life','Welcome to Rockville','Sonic Temple','Inkcarceration','Aftershock','Governors Ball','Shaky Knees','BottleRock Napa Valley','Kilby Block Party','Hinterland','Newport Folk Festival','Newport Jazz Festival','Okeechobee Music & Arts Festival','Sick New World','Sea.Hear.Now'];
const inactive=['Boston Calling','Hangout Music Festival','Electric Zoo','Blue Ridge Rock Festival','Life Is Beautiful','When We Were Young','Faster Horses'];
const sourceUrls={Coachella:'https://en.wikipedia.org/wiki/Coachella_2026',Stagecoach:'https://pitchfork.com/news/stagecoach-festival-2026-lineup-announced-post-malone-lainey-wilson/','Ultra Music Festival':'https://en.wikipedia.org/wiki/Ultra_Music_Festival','EDC Las Vegas':'https://www.businessinsider.com/guides/tickets/where-to-buy-edc-tickets-music-festival',Bonnaroo:'https://pitchfork.com/news/bonnaroo-2026-livestream-schedule-and-details-announced-for-disney-and-hulu/','CMA Fest':'https://www.axios.com/local/nashville/2026/02/25/cma-fest-2026-headliners-tim-mcgraw-keith-urban','Electric Forest':'https://en.wikipedia.org/wiki/Electric_Forest','Austin City Limits':'https://en.wikipedia.org/wiki/Austin_City_Limits_Music_Festival','Newport Folk Festival':'https://en.wikipedia.org/wiki/Newport_Folk_Festival','Boston Calling':'https://en.wikipedia.org/wiki/Boston_Calling_Music_Festival'};
const festivals=rawFestivals.trim().split('\n').map((line,i)=>{let[name,city,state,month,producer]=line.split('|');let status='needs_verification',visible=false;if(confirmedPrior.includes(name)||confirmedByReport.includes(name)){status='confirmed_active_2026';visible=true}if(inactive.includes(name)){status='inactive_2026';visible=false}return{id:'fest-'+String(i+1).padStart(3,'0'),name,city,state,region:region(state),month:+month,window:'research calendar target',producer,departments:festivalDeps(name),employerNotes:'U.S. research only. Verify exact production vendors and labor routes before outreach.',source:'active-2026-master-data',active2026Status:status,active2026SourceUrl:sourceUrls[name]||'',active2026SourceNote:sourceUrls[name]?'linked source attached':'status from user-provided 2026 report; source URL still needs attachment',active2026CheckedDate:'2026-06-21',visibleInActive2026View:visible}});
const employers=rawEmployers.trim().split('\n').map((line,i)=>{let[name,type,reg,url,status]=line.split('|');return{id:'emp-'+String(i+1).padStart(3,'0'),name,type,region:reg,careerUrl:url,careerUrlStatus:status,marketScope:'United States only',departments:employerDeps(type,name),pathway:status==='verified_career'?'verified hiring/career/application route':'official homepage fallback; find careers/apply route if needed',notes:status==='verified_career'?'Verified clickable hiring/career/contact link.':'No clear verified careers/apply link yet; homepage used as fallback.',verificationStatus:'needs verification',source:'active-2026-master-data'}});
window.FESTIVAL_ATLAS_MASTER_DATA={meta:{name:'Festival Atlas Active 2026 Master Data',branch:'research-version',updated:'2026-06-21',marketScope:'United States only',active2026ViewRule:'visibleInActive2026View true only',employerLinkRule:'verified career/apply links first; homepage fallback when no clear careers page exists',originalUploadedFestivalBaseline:48,currentFestivalTargets:festivals.length,currentEmployerTargets:employers.length,confirmedActive2026Count:festivals.filter(f=>f.active2026Status==='confirmed_active_2026').length,inactive2026Count:festivals.filter(f=>f.active2026Status==='inactive_2026').length,needsVerificationCount:festivals.filter(f=>f.active2026Status==='needs_verification').length,verifiedEmployerCareerLinkCount:employers.filter(e=>e.careerUrlStatus==='verified_career').length,homepageFallbackCount:employers.filter(e=>e.careerUrlStatus==='homepage_fallback').length},departments,festivals,employers,requiredVerificationQuestions:['Who builds the stage?','Who supplies rigging?','Who supplies lighting?','Who supplies audio?','Who supplies video/LED?','Who handles site ops?','Who handles power?','Which IATSE local applies?','Which nonunion labor companies staff the event?','Who is the production manager or production company?']};
})();