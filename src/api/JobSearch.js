//Search providers
let baseApiUrl;

if(__DEV__) baseApiUrl = 'http://localhost:3003/search/';
if(__PROD__) baseApiUrl = 'https://codejobs-api.now.sh/search/';

const providers = [
  {
    name: 'github',
    buildUrl (keyword, location){
      return `${baseApiUrl}github?search=${keyword}&location=${location}`;
    }
  },
  {
    name: 'stackoverflow',
    buildUrl (keyword, location){
      return `${baseApiUrl}stackoverflow?searchTerm=${keyword}&location=${location}`;
    }
  }
];

//main
export default function jobSearch(keyword, location, callback) {
  providers.forEach(provider => {
    fetch(provider.buildUrl(keyword, location))
    .then(function(response) {
      return response.json();
    }).then(function(data) {
      callback(data);
    }).catch(function(err) {
      console.log('Error ', err);
    });
  });
}
