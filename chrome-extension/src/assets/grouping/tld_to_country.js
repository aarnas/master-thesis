const tld_to_country = [
    { "country": "Afghanistan", "tlds": [".af"] },
    { "country": "Åland", "tlds": [".ax"] },
    { "country": "Albania", "tlds": [".al"] },
    { "country": "Algeria", "tlds": [".dz"] },
    { "country": "American Samoa", "tlds": [".as"] },
    { "country": "Andorra", "tlds": [".ad"] },
    { "country": "Angola", "tlds": [".ao"] },
    { "country": "Anguilla", "tlds": [".ai"] },
    { "country": "Antarctica", "tlds": [".aq"] },
    { "country": "Antigua and Barbuda", "tlds": [".ag"] },
    { "country": "Argentina", "tlds": [".ar"] },
    { "country": "Armenia", "tlds": [".am"] },
    { "country": "Aruba", "tlds": [".aw"] },
    { "country": "Ascension Island", "tlds": [".ac"] },
    { "country": "Australia", "tlds": [".au"] },
    { "country": "Austria", "tlds": [".at"] },
    { "country": "Azerbaijan", "tlds": [".az"] },
    { "country": "Bahamas", "tlds": [".bs"] },
    { "country": "Bahrain", "tlds": [".bh"] },
    { "country": "Bangladesh", "tlds": [".bd"] },
    { "country": "Barbados", "tlds": [".bb"] },
    { "country": "Basque Country", "tlds": [".eus"] },
    { "country": "Belarus", "tlds": [".by"] },
    { "country": "Belgium", "tlds": [".be"] },
    { "country": "Belize", "tlds": [".bz"] },
    { "country": "Benin", "tlds": [".bj"] },
    { "country": "Bermuda", "tlds": [".bm"] },
    { "country": "Bhutan", "tlds": [".bt"] },
    { "country": "Bolivia", "tlds": [".bo"] },
    { "country": "Bonaire", "tlds": [".bq", ".an", ".nl"] },
    { "country": "Bosnia and Herzegovina", "tlds": [".ba"] },
    { "country": "Botswana", "tlds": [".bw"] },
    { "country": "Bouvet Island", "tlds": [".bv"] },
    { "country": "Brazil", "tlds": [".br"] },
    { "country": "British Indian Ocean Territory", "tlds": [".io"] },
    { "country": "British Virgin Islands", "tlds": [".vg"] },
    { "country": "Brunei", "tlds": [".bn"] },
    { "country": "Bulgaria", "tlds": [".bg"] },
    { "country": "Burkina Faso", "tlds": [".bf"] },
    { "country": "Burma (officially: Myanmar)", "tlds": [".mm"] },
    { "country": "Burundi", "tlds": [".bi"] },
    { "country": "Cambodia", "tlds": [".kh"] },
    { "country": "Cameroon", "tlds": [".cm"] },
    { "country": "Canada", "tlds": [".ca"] },
    { "country": "Cape Verde (in Portuguese: Cabo Verde)", "tlds": [".cv"] },
    { "country": "Catalonia", "tlds": [".cat"] },
    { "country": "Cayman Islands", "tlds": [".ky"] },
    { "country": "Central African Republic", "tlds": [".cf"] },
    { "country": "Chad", "tlds": [".td"] },
    { "country": "Chile", "tlds": [".cl"] },
    { "country": "China, People’s Republic of", "tlds": [".cn"] },
    { "country": "Christmas Island", "tlds": [".cx"] },
    { "country": "Cocos (Keeling) Islands", "tlds": [".cc"] },
    { "country": "Colombia", "tlds": [".co"] },
    { "country": "Comoros", "tlds": [".km"] },
    { "country": "Congo, Democratic Republic of the (Congo-Kinshasa)", "tlds": [".cd"] },
    { "country": "Congo, Republic of the (Congo-Brazzaville)", "tlds": [".cg"] },
    { "country": "Cook Islands", "tlds": [".ck"] },
    { "country": "Costa Rica", "tlds": [".cr"] },
    { "country": "Côte d’Ivoire (Ivory Coast)", "tlds": [".ci"] },
    { "country": "Croatia", "tlds": [".hr"] },
    { "country": "Cuba", "tlds": [".cu"] },
    { "country": "Curaçao", "tlds": [".cw"] },
    { "country": "Cyprus", "tlds": [".cy"] },
    { "country": "Czechia (Czech Republic)", "tlds": [".cz"] },
    { "country": "Denmark", "tlds": [".dk"] },
    { "country": "Djibouti", "tlds": [".dj"] },
    { "country": "Dominica", "tlds": [".dm"] },
    { "country": "Dominican Republic", "tlds": [".do"] },
    { "country": "East Timor (Timor-Leste)", "tlds": [".tl", ".tp"] },
    { "country": "Ecuador", "tlds": [".ec"] },
    { "country": "Egypt", "tlds": [".eg"] },
    { "country": "El Salvador", "tlds": [".sv"] },
    { "country": "Equatorial Guinea", "tlds": [".gq"] },
    { "country": "Eritrea", "tlds": [".er"] },
    { "country": "Estonia", "tlds": [".ee"] },
    { "country": "Ethiopia", "tlds": [".et"] },
    { "country": "European Union", "tlds": [".eu"] },
    { "country": "Falkland Islands", "tlds": [".fk"] },
    { "country": "Faeroe Islands", "tlds": [".fo"] },
    { "country": "Federated States of Micronesia", "tlds": [".fm"] },
    { "country": "Fiji", "tlds": [".fj"] },
    { "country": "Finland", "tlds": [".fi"] },
    { "country": "France", "tlds": [".fr"] },
    { "country": "French Guiana", "tlds": [".gf"] },
    { "country": "French Polynesia", "tlds": [".pf"] },
    { "country": "French Southern and Antarctic Lands", "tlds": [".tf"] },
    { "country": "Gabon (officially: Gabonese Republic)", "tlds": [".ga"] },
    { "country": "Galicia", "tlds": [".gal"] },
    { "country": "Gambia", "tlds": [".gm"] },
    { "country": "Gaza Strip (Gaza)", "tlds": [".ps"] },
    { "country": "Georgia", "tlds": [".ge"] },
    { "country": "Germany", "tlds": [".de"] },
    { "country": "Ghana", "tlds": [".gh"] },
    { "country": "Gibraltar", "tlds": [".gi"] },
    { "country": "Greece", "tlds": [".gr"] },
    { "country": "Greenland", "tlds": [".gl"] },
    { "country": "Grenada", "tlds": [".gd"] },
    { "country": "Guadeloupe", "tlds": [".gp"] },
    { "country": "Guam", "tlds": [".gu"] },
    { "country": "Guatemala", "tlds": [".gt"] },
    { "country": "Guernsey", "tlds": [".gg"] },
    { "country": "Guinea", "tlds": [".gn"] },
    { "country": "Guinea-Bissau", "tlds": [".gw"] },
    { "country": "Guyana", "tlds": [".gy"] },
    { "country": "Haiti", "tlds": [".ht"] },
    { "country": "Heard Island and McDonald Islands", "tlds": [".hm"] },
    { "country": "Honduras", "tlds": [".hn"] },
    { "country": "Hong Kong", "tlds": [".hk"] },
    { "country": "Hungary", "tlds": [".hu"] },
    { "country": "Iceland", "tlds": [".is"] },
    { "country": "India", "tlds": [".in"] },
    { "country": "Indonesia", "tlds": [".id"] },
    { "country": "Iran", "tlds": [".ir"] },
    { "country": "Iraq", "tlds": [".iq"] },
    { "country": "Ireland", "tlds": [".ie"] },
    { "country": "Isle of Man", "tlds": [".im"] },
    { "country": "Israel", "tlds": [".il"] },
    { "country": "Italy", "tlds": [".it"] },
    { "country": "Jamaica", "tlds": [".jm"] },
    { "country": "Japan", "tlds": [".jp"] },
    { "country": "Jersey", "tlds": [".je"] },
    { "country": "Jordan", "tlds": [".jo"] },
    { "country": "Kazakhstan", "tlds": [".kz"] },
    { "country": "Kenya", "tlds": [".ke"] },
    { "country": "Kiribati", "tlds": [".ki"] },
    { "country": "Kuwait", "tlds": [".kw"] },
    { "country": "Kyrgyzstan", "tlds": [".kg"] },
    { "country": "Laos", "tlds": [".la"] },
    { "country": "Latvia", "tlds": [".lv"] },
    { "country": "Lebanon", "tlds": [".lb"] },
    { "country": "Lesotho", "tlds": [".ls"] },
    { "country": "Liberia", "tlds": [".lr"] },
    { "country": "Libya", "tlds": [".ly"] },
    { "country": "Liechtenstein", "tlds": [".li"] },
    { "country": "Lithuania", "tlds": [".lt"] },
    { "country": "Luxembourg", "tlds": [".lu"] },
    { "country": "Macau", "tlds": [".mo"] },
    { "country": "Macedonia, Republic of (the former Yugoslav Republic of Macedonia, FYROM)", "tlds": [".mk"] },
    { "country": "Madagascar", "tlds": [".mg"] },
    { "country": "Malawi", "tlds": [".mw"] },
    { "country": "Malaysia", "tlds": [".my"] },
    { "country": "Maldives", "tlds": [".mv"] },
    { "country": "Mali", "tlds": [".ml"] },
    { "country": "Malta", "tlds": [".mt"] },
    { "country": "Marshall Islands", "tlds": [".mh"] },
    { "country": "Martinique", "tlds": [".mq"] },
    { "country": "Mauritania", "tlds": [".mr"] },
    { "country": "Mauritius", "tlds": [".mu"] },
    { "country": "Mayotte", "tlds": [".yt"] },
    { "country": "Mexico", "tlds": [".mx"] },
    { "country": "Moldova", "tlds": [".md"] },
    { "country": "Monaco", "tlds": [".mc"] },
    { "country": "Mongolia", "tlds": [".mn"] },
    { "country": "Montenegro", "tlds": [".me"] },
    { "country": "Montserrat", "tlds": [".ms"] },
    { "country": "Morocco", "tlds": [".ma"] },
    { "country": "Mozambique", "tlds": [".mz"] },
    { "country": "Myanmar", "tlds": [".mm"] },
    { "country": "Namibia", "tlds": [".na"] },
    { "country": "Nauru", "tlds": [".nr"] },
    { "country": "Nepal", "tlds": [".np"] },
    { "country": "Netherlands", "tlds": [".nl"] },
    { "country": "New Caledonia", "tlds": [".nc"] },
    { "country": "New Zealand", "tlds": [".nz"] },
    { "country": "Nicaragua", "tlds": [".ni"] },
    { "country": "Niger", "tlds": [".ne"] },
    { "country": "Nigeria", "tlds": [".ng"] },
    { "country": "Niue", "tlds": [".nu"] },
    { "country": "Norfolk Island", "tlds": [".nf"] },
    { "country": "North Cyprus (unrecognised, self-declared state)", "tlds": [".nc", ".tr"] },
    { "country": "North Korea", "tlds": [".kp"] },
    { "country": "Northern Mariana Islands", "tlds": [".mp"] },
    { "country": "Norway", "tlds": [".no"] },
    { "country": "Oman", "tlds": [".om"] },
    { "country": "Pakistan", "tlds": [".pk"] },
    { "country": "Palau", "tlds": [".pw"] },
    { "country": "Palestine", "tlds": [".ps"] },
    { "country": "Panama", "tlds": [".pa"] },
    { "country": "Papua New Guinea", "tlds": [".pg"] },
    { "country": "Paraguay", "tlds": [".py"] },
    { "country": "Peru", "tlds": [".pe"] },
    { "country": "Philippines", "tlds": [".ph"] },
    { "country": "Pitcairn Islands", "tlds": [".pn"] },
    { "country": "Poland", "tlds": [".pl"] },
    { "country": "Portugal", "tlds": [".pt"] },
    { "country": "Puerto Rico", "tlds": [".pr"] },
    { "country": "Qatar", "tlds": [".qa"] },
    { "country": "Romania", "tlds": [".ro"] },
    { "country": "Russia", "tlds": [".ru"] },
    { "country": "Rwanda", "tlds": [".rw"] },
    { "country": "Réunion Island", "tlds": [".re"] },
    { "country": "Saba", "tlds": [".bq", ".an"] },
    { "country": "Saint Barthélemy (informally also referred to as Saint Barth’s or Saint Barts)", "tlds": [".bl", ".gp", ".fr"] },
    { "country": "Saint Helena", "tlds": [".sh"] },
    { "country": "Saint Kitts and Nevis", "tlds": [".kn"] },
    { "country": "Saint Lucia", "tlds": [".lc"] },
    { "country": "Saint Martin (officially the Collectivity of Saint Martin)", "tlds": [".mf", ".gp", ".fr"] },
    { "country": "Saint-Pierre and Miquelon", "tlds": [".pm"] },
    { "country": "Saint Vincent and the Grenadines", "tlds": [".vc"] },
    { "country": "Samoa", "tlds": [".ws"] },
    { "country": "San Marino", "tlds": [".sm"] },
    { "country": "São Tomé and Príncipe", "tlds": [".st"] },
    { "country": "Saudi Arabia", "tlds": [".sa"] },
    { "country": "Senegal", "tlds": [".sn"] },
    { "country": "Serbia", "tlds": [".rs"] },
    { "country": "Seychelles", "tlds": [".sc"] },
    { "country": "Sierra Leone", "tlds": [".sl"] },
    { "country": "Singapore", "tlds": [".sg"] },
    { "country": "Sint Eustatius", "tlds": [".bq", ".an", ".nl"] },
    { "country": "Sint Maarten", "tlds": [".sx", ".an"] },
    { "country": "Slovakia", "tlds": [".sk"] },
    { "country": "Slovenia", "tlds": [".si"] },
    { "country": "Solomon Islands", "tlds": [".sb"] },
    { "country": "Somalia", "tlds": [".so"] },
    { "country": "Somaliland", "tlds": [".so"] },
    { "country": "South Africa", "tlds": [".za"] },
    { "country": "South Georgia and the South Sandwich Islands", "tlds": [".gs"] },
    { "country": "South Korea", "tlds": [".kr"] },
    { "country": "South Sudan", "tlds": [".ss"] },
    { "country": "Spain", "tlds": [".es"] },
    { "country": "Sri Lanka", "tlds": [".lk"] },
    { "country": "Sudan", "tlds": [".sd"] },
    { "country": "Suriname", "tlds": [".sr"] },
    { "country": "Svalbard and Jan Mayen Islands", "tlds": [".sj"] },
    { "country": "Swaziland", "tlds": [".sz"] },
    { "country": "Sweden", "tlds": [".se"] },
    { "country": "Switzerland", "tlds": [".ch"] },
    { "country": "Syria", "tlds": [".sy"] },
    { "country": "Taiwan", "tlds": [".tw"] },
    { "country": "Tajikistan", "tlds": [".tj"] },
    { "country": "Tanzania", "tlds": [".tz"] },
    { "country": "Thailand", "tlds": [".th"] },
    { "country": "Togo", "tlds": [".tg"] },
    { "country": "Tokelau", "tlds": [".tk"] },
    { "country": "Tonga", "tlds": [".to"] },
    { "country": "Trinidad & Tobago", "tlds": [".tt"] },
    { "country": "Tunisia", "tlds": [".tn"] },
    { "country": "Turkey", "tlds": [".tr"] },
    { "country": "Turkmenistan", "tlds": [".tm"] },
    { "country": "Turks and Caicos Islands", "tlds": [".tc"] },
    { "country": "Tuvalu", "tlds": [".tv"] },
    { "country": "Uganda", "tlds": [".ug"] },
    { "country": "Ukraine", "tlds": [".ua"] },
    { "country": "United Arab Emirates (UAE)", "tlds": [".ae"] },
    { "country": "United Kingdom (UK)", "tlds": [".uk"] },
    { "country": "United States of America (USA)", "tlds": [".us"] },
    { "country": "United States Virgin Islands", "tlds": [".vi"] },
    { "country": "Uruguay", "tlds": [".uy"] },
    { "country": "Uzbekistan", "tlds": [".uz"] },
    { "country": "Vanuatu", "tlds": [".vu"] },
    { "country": "Vatican City", "tlds": [".va"] },
    { "country": "Venezuela", "tlds": [".ve"] },
    { "country": "Vietnam", "tlds": [".vn"] },
    { "country": "Wallis and Futuna", "tlds": [".wf"] },
    { "country": "Western Sahara", "tlds": [".eh", ".ma"] },
    { "country": "Yemen", "tlds": [".ye"] },
    { "country": "Zambia", "tlds": [".zm"] },
    { "country": "Zimbabwe", "tlds": [".zw"] }]
module.exports = tld_to_country;