// The owner may edit these remote-service audience lists.
export const audienceRoles = [
  'Job seekers',
  'Fresh graduates',
  'Students',
  'Career changers',
  'Mid-career professionals',
  'Senior managers',
  'Executives',
  'Returning-to-work professionals',
  'Remote job seekers',
  'Professionals seeking international roles',
  'Freelancers and consultants',
];

const countryRegions = {
  'West Africa': 'NG GH SN CI BF ML NE BJ TG SL LR GM GN GW MR CV',
  'Africa': 'ZA KE EG MA DZ TN UG TZ RW ET CM AO ZM ZW BW NA MZ MW CD MG CG GA',
  'Europe': 'GB IE FR DE ES PT IT NL BE CH AT SE NO DK FI PL CZ SK HU RO BG GR HR SI RS EE LV LT UA MD CY TR',
  'North America': 'US CA MX JM TT CR PA DO HT PR CU',
  'Middle East': 'AE SA QA KW BH OM JO LB IL IQ',
  'Asia': 'IN PK BD LK NP CN JP KR TW HK SG MY ID TH VN PH KH BN KZ UZ AM AZ',
  'Oceania': 'AU NZ FJ PG VU',
  'Latin America': 'BR AR CL CO PE EC UY PY BO VE GY SR',
};

const displayNames = new Intl.DisplayNames(['en'], { type: 'region' });
export const countries = Object.entries(countryRegions).flatMap(([region, codes]) =>
  codes.split(' ').map((code) => ({ name: displayNames.of(code), code, region })),
);

const cityRegions = {
  'West Africa': 'Lagos|Abuja|Accra|Kumasi|Dakar|Abidjan|Cotonou|Lomé|Freetown|Monrovia|Banjul|Conakry|Bamako|Niamey|Ouagadougou|Port Harcourt',
  'Africa': 'Johannesburg|Cape Town|Durban|Nairobi|Cairo|Casablanca|Rabat|Tunis|Algiers|Kampala|Kigali|Dar es Salaam|Addis Ababa|Gaborone',
  'Europe': 'London|Manchester|Birmingham|Dublin|Paris|Lyon|Berlin|Munich|Hamburg|Madrid|Barcelona|Lisbon|Porto|Rome|Milan|Amsterdam|Rotterdam|Brussels|Zurich|Geneva|Vienna|Stockholm|Oslo|Copenhagen',
  'North America': 'New York|Los Angeles|Chicago|San Francisco|Seattle|Austin|Toronto|Vancouver|Montreal|Calgary|Mexico City|Guadalajara',
  'Middle East': 'Dubai|Abu Dhabi|Riyadh|Jeddah|Doha|Kuwait City|Manama|Muscat|Amman|Beirut',
  'Asia': 'Mumbai|Delhi|Bengaluru|Hyderabad|Chennai|Karachi|Lahore|Islamabad|Dhaka|Colombo|Kathmandu|Beijing|Shanghai|Shenzhen|Tokyo|Osaka|Seoul|Busan|Singapore|Kuala Lumpur|Jakarta|Bangkok|Manila|Ho Chi Minh City|Hanoi|Taipei|Hong Kong|Phnom Penh',
  'Oceania': 'Sydney|Melbourne|Brisbane|Perth|Auckland|Wellington',
  'Latin America': 'São Paulo|Rio de Janeiro|Brasília|Buenos Aires|Santiago|Bogotá|Medellín|Lima|Quito|Montevideo',
};

export const cities = Object.entries(cityRegions).flatMap(([region, names]) =>
  names.split('|').map((name) => ({ name, region })),
);
