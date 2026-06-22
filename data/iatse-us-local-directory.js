(()=>{
const source='https://iatse.net/local-union-directory/';
const raw=`111|National|National Local|Production Workers Guild
444|National|National Local|Golf Broadcast Technicians
600|National|National Local|International Cinematographers Guild
700|National|National Local|Motion Picture Editors Guild
800|National|National Local|Art Directors Guild
USA 829|National|National Local|United Scenic Artists
VFX|National|National Local|VFX Union
15|District 1|Seattle, Washington|Stagehands
28|District 1|Portland & Salem, Oregon|Stagehands
93|District 1|Spokane, Washington|Stagehands
154|District 1|Ashland, Oregon|Stagehands
240|District 1|Billings, Montana|Mixed
339|District 1|Great Falls, Montana|Mixed
488|District 1|Pacific Northwest|Studio Mechanics
675|District 1|Eugene, Oregon|Stagehands
793|District 1|Washington & Oregon|Broadcast
887|District 1|Seattle, Washington|Theatrical Wardrobe Union
918|District 1|Anchorage, Alaska|Stagehands
B20|District 1|Portland, Oregon|Front of House Employees
16|District 2|San Francisco, California|Stagehands
50|District 2|Sacramento-Stockton, California|Stagehands
122|District 2|San Diego, California|Stagehands
158|District 2|Fresno-Modesto-Stockton, California|Stagehands
215|District 2|Bakersfield, California|Stagehands
336|District 2|Phoenix, Arizona|Stagehands
363|District 2|Reno, Nevada|Stagehands
415|District 2|Tucson, Arizona|Stagehands
611|District 2|Santa Cruz-Monterey, California|Stagehands
665|District 2|Hawaii|Mixed
720|District 2|Las Vegas, Nevada|Stagehands
795|District 2|San Diego, California|Broadcast
748|District 2|Arizona|Broadcast
B192|District 2|Hollywood/Los Angeles, California|Amusement Area Employees
33|District 2|Hollywood/Los Angeles, California|Stagehands and Projectionists
44|District 2|Hollywood/Los Angeles, California|Affiliated Property Craftspersons
80|District 2|Hollywood/Los Angeles, California|Motion Picture Studio Grips, Craft Service, Set Medics, Marine and Warehouse Workers
504|District 2|Orange County, California|Stagehands
614|District 2|San Bernardino and Inland Empire, California|Stagehands
683|District 2|Hollywood/Los Angeles, California|Lab, Film, Video Technicians, Cinetechnicians
695|District 2|Hollywood/Los Angeles, California|Production Sound Technicians, Television Engineers, Video Assist Technicians and Studio Projectionists
11|District 3|Boston, Massachusetts|Stagehands
23|District 3|Providence, Rhode Island|Mixed
53|District 3|Springfield, Massachusetts|Stagehands
74|District 3|Southern Connecticut|Stagehands
84|District 3|Hartford, Connecticut|Stagehands
96|District 3|Worcester, Massachusetts|Mixed
114|District 3|Portland, Maine|Stagehands
195|District 3|Lowell, Massachusetts|Mixed
232|District 3|Amherst, Massachusetts|Mixed
481|District 3|Boston, Massachusetts|Studio
753|District 3|Boston, Massachusetts|Treasurers and Ticket Sellers
775|District 3|Boston, Massachusetts|Wardrobe
798|District 3|Boston, Massachusetts|Make-Up Artists and Hairstylists
919|District 3|Burlington, Vermont|Stagehands
926|District 3|Auburn, Maine|Broadcast
B4|District 3|Boston, Massachusetts|Theater Employees
3|District 4|Pittsburgh, Pennsylvania|Stagehands
8|District 4|Philadelphia, Pennsylvania|Stagehands
19|District 4|Baltimore, Maryland|Stagehands
22|District 4|Washington, DC|Stagehands
55|District 4|Roanoke, Virginia|Mixed
64|District 4|Wheeling, West Virginia|Mixed
87|District 4|Richmond, Virginia|Stagehands
97|District 4|Reading, Hanover-Gettysburg-York County-Lancaster County, Pennsylvania|Stagehands
98|District 4|Harrisburg, Pennsylvania|Stagehands
181|District 4|Baltimore, Maryland|Motion Picture Projector Operators and Video Technicians
200|District 4|Allentown, Pennsylvania|Stagehands
271|District 4|Charleston, West Virginia|Stagehands
285|District 4|Norfolk, Virginia|Stagehands
487|District 4|Baltimore, Maryland|Studio Mechanics
489|District 4|Pittsburgh, Pennsylvania|Studio Mechanics
501|District 4|Lititz, Pennsylvania|Stagehands
578|District 4|North Central West Virginia|Stagehands
636|District 4|State College, Pennsylvania|Mixed
752|District 4|Philadelphia, Pennsylvania|Treasurers and Ticket Sellers
772|District 4|Washington, DC|Theatrical Wardrobe
787|District 4|Pittsburgh, Pennsylvania|Theatrical Wardrobe
804|District 4|Philadelphia, Pennsylvania|Broadcast
819|District 4|Washington, DC|Broadcast
820|District 4|Pittsburgh, Pennsylvania|Broadcast
868|District 4|Washington, DC|Treasurers and Ticket Sellers
913|District 4|Baltimore, Maryland|Theatrical Wardrobe
B868|District 4|Washington, DC|Ticket Sales Agents
7|District 5|Denver, Colorado|Stagehands
62|District 5|Colorado Springs, Colorado|Mixed
99|District 5|Salt Lake City, Utah|Stagehands
229|District 5|Wyoming|Stagehands
423|District 5|Albuquerque, New Mexico|Mixed
480|District 5|New Mexico|Studio Mechanics
719|District 5|Arvada, Colorado|Theatrical Wardrobe
B7|District 5|Denver, Colorado|Theater Employees
51|District 5|Houston, Texas|Stagehands
76|District 5|San Antonio, Texas|Stagehands
112|District 5|Oklahoma City, Oklahoma|Stagehands
127|District 5|Dallas, Texas|Stagehands
128|District 5|Dallas, Texas|Mixed
204|District 5|Little Rock, Arkansas|Mixed
205|District 5|Austin, Texas|Mixed
331|District 5|Waco, Texas|Mixed
354|District 5|Tulsa, Oklahoma|Stagehands
484|District 5|State of Texas|Studio Mechanics
796|District 5|Dallas, Houston, San Antonio, Austin, Texas|Broadcast
896|District 5|Houston, Texas|Theatrical Wardrobe
904|District 5|Tulsa, Oklahoma|Theatrical Wardrobe
39|District 7|New Orleans, Louisiana|Stagehands
46|District 7|Nashville, Tennessee|Stagehands
60|District 7|Pensacola, Florida|Mixed
69|District 7|Memphis, Tennessee|Stagehands
78|District 7|Birmingham, Alabama|Stagehands
115|District 7|Jacksonville, Tallahassee, Gainesville, Florida|Mixed
140|District 7|Chattanooga, Tennessee|Stagehands
142|District 7|Mobile, Alabama|Stagehands
197|District 7|Knoxville, Tennessee|Stagehands
278|District 7|Asheville, North Carolina|Mixed
298|District 7|Shreveport, Louisiana|Stagehands
320|District 7|Savannah, Georgia|Mixed
321|District 7|Tampa, Florida|Mixed
333|District 7|Charleston and Myrtle Beach, South Carolina|Mixed
347|District 7|Columbia, South Carolina|Mixed
412|District 7|Bradenton and Sarasota, Florida|Mixed
477|District 7|State of Florida|Studio Mechanics
478|District 7|State of Louisiana, Mississippi and Mobile, Alabama|Studio Mechanics
479|District 7|State of Georgia and Alabama|Studio Mechanics
491|District 7|State of North Carolina and South Carolina|Studio Mechanics
492|District 7|State of Tennessee and Northern Mississippi|Studio Mechanics
494|District 7|Puerto Rico and U.S. Virgin Islands|Mixed
500|District 7|South Florida|Mixed
574|District 7|Greensboro, North Carolina|Mixed
629|District 7|Augusta, Georgia|Stagehands
631|District 7|Orlando, Florida|Mixed
635|District 7|Winston-Salem, North Carolina|Mixed
647|District 7|Naples, Fort Myers, Marco Island, Florida|Stagehands
699|District 7|Johnson City, Tennessee|Mixed
824|District 7|Athens, Georgia|Mixed
825|District 7|Memphis, Tennessee|Theatrical Wardrobe
834|District 7|Atlanta, Georgia|Exhibition Employees
835|District 7|Orlando, Florida|Exhibition Employees
840|District 7|New Orleans, Louisiana|Theatrical Wardrobe
900|District 7|Huntsville, Alabama|Mixed
927|District 7|Atlanta, Georgia|Stagehands
AE 938|District 7|Jacksonville, Florida|Arena Employees
5|District 8|Cincinnati, Ohio|Stagehands
12|District 8|Columbus, Ohio|Stagehands
17|District 8|Louisville, Kentucky|Stagehands
24|District 8|Toledo, Ohio|Stagehands
26|District 8|Grand Rapids, Michigan|Mixed
27|District 8|Cleveland, Ohio|Stagehands
30|District 8|Indianapolis, Indiana|Stagehands
48|District 8|Akron, Ohio|Stagehands
49|District 8|Terre Haute, Indiana|Stagehands
101|District 8|Youngstown, Ohio|Stagehands
102|District 8|Evansville, Indiana|Stagehands
125|District 8|Fort Wayne, Indiana|Mixed
209|District 8|Cleveland, Ohio|Studio Mechanics
216|District 8|Cleveland and Columbus, Ohio|Broadcast
274|District 8|Lansing, Michigan|Mixed
317|District 8|Indianapolis, Bloomington, West Lafayette, Indiana|Broadcast
346|District 8|Lexington, Kentucky|Mixed
395|District 8|Ann Arbor, Michigan|Mixed
472|District 8|Flint, Michigan|Motion Picture Projection Operators and Video Technicians
618|District 8|Bloomington, Indiana|Mixed
747|District 8|Columbus, Ohio|Theatrical Wardrobe
757|District 8|Detroit, Michigan|Treasurers and Ticket Sellers
883|District 8|Cleveland, Ohio|Theatrical Wardrobe
886|District 8|Dayton, Ohio|Theatrical Wardrobe
B38|District 8|Cincinnati, Ohio|Theater Employees
2|District 9|Chicago, Illinois|Mixed
13|District 9|Minneapolis, Minnesota|Stagecraft
18|District 9|Milwaukee, Wisconsin|Stagecraft
31|District 9|Kansas City, Missouri|Stagecraft
42|District 9|Omaha, Nebraska|Stagecraft
67|District 9|Des Moines, Iowa|Stagecraft
85|District 9|Davenport, Iowa|Stagecraft
110|District 9|Chicago, Illinois|Motion Picture Projection Operators and Video Technicians
124|District 9|Joliet, Illinois|Stagecraft
138|District 9|Springfield, Illinois|Stagecraft
193|District 9|Bloomington, Illinois|Mixed
217|District 9|Rockford, Illinois|Mixed
219|District 9|Minneapolis, Minnesota|Motion Picture Projection Operators and Video Technicians
251|District 9|Madison, Wisconsin|Mixed
414|District 9|Milwaukee, Wisconsin|Broadcast
464|District 9|Salina, Kansas|Mixed
470|District 9|Green Bay, Wisconsin|Mixed
476|District 9|Chicago, Illinois|Studio Mechanics
490|District 9|Minnesota|Studio Mechanics
493|District 9|St Louis, Missouri|Studio Mechanics
690|District 9|Iowa City, Iowa|Mixed
745|District 9|Minnesota and Iowa|Broadcast
750|District 9|Chicago, Illinois|Treasurers and Ticket Sellers
762|District 9|Chicago, Illinois|Broadcast
769|District 9|Chicago, Illinois|Theatrical Wardrobe
810|District 9|Kansas City, Missouri|Theatrical Wardrobe
1|District 10|New York, New York|Stagehands
4|District 10|Brooklyn and Queens, New York|Stagehands
9|District 10|Syracuse, New York|Stagehands
10|District 10|Buffalo, New York|Stagehands
14|District 10|Albany, New York|Stagehands
21|District 10|Newark, New Jersey|Stagehands
25|District 10|Rochester, New York|Stagehands
52|District 10|New York, New Jersey|Studio Mechanics
59|District 10|Jersey City, New Jersey|Stagehands
77|District 10|Atlantic City, New Jersey|Mixed
100|District 10|New York, New Jersey and Connecticut|Broadcast
121|District 10|Buffalo, New York|Mixed
161|District 10|New York|Script Supervisors, Production Coordinators, Continuity Coordinators and Production Accountants
266|District 10|Jamestown-Chautauqua, New York|Mixed
289|District 10|Elmira, New York|Mixed
306|District 10|New York, New York|Motion Picture Projection Operators and Video Technicians
536|District 10|Red Bank-Freehold, New Jersey|Mixed
632|District 10|Northeast New Jersey|Mixed
751|District 10|New York, New York|Treasurers and Ticket Sellers
764|District 10|New York, New York|Theatrical Wardrobe
794|District 10|New York, New York|Broadcast
829|District 10|New York, New York|Exhibition Employees, Bill Posters, Billers and Distributors
858|District 10|Rochester, New York|Theatrical Wardrobe
917|District 10|Atlantic City, New Jersey|Casino Hotel Employees
ACT|District 10|New York, New York|Associated Craft Technicians
B751|District 10|New York, New York|Mail Telephone Order Clerks
MAL|District 10|New York, New York|Member At Large
R&T|District 10|New York, New York|Radio and Television
18032|District 10|New York, New York|Association of Theatrical Press Agents and Managers`;
const states=['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming','Puerto Rico','U.S. Virgin Islands'];
function stateFromJurisdiction(j){return states.filter(s=>j.includes(s));}
window.IATSE_US_LOCAL_DIRECTORY={meta:{name:'United States IATSE Local Directory',updated:'2026-06-21',scope:'United States, Puerto Rico, and U.S. Virgin Islands locals represented in available IATSE local directory research',sourceUrl:source,sourceNote:'Use the official IATSE local-union directory for final contact verification before outreach. This file is a worker-facing lookup aid, not a jurisdiction ruling.',recordCount:raw.trim().split('\n').length},locals:raw.trim().split('\n').map(line=>{const [local,district,jurisdiction,craft]=line.split('|');return{local,district,jurisdiction,craft,states:stateFromJurisdiction(jurisdiction),sourceUrl:source,verificationStatus:'directory_derived_contact_verify_before_outreach'}})};
})();