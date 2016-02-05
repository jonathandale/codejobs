//Search providers
const baseApiUrl = 'http://localhost:3003/search/';
const providers = [
  {
    name: 'github',
    buildUrl (keyword, location, page){
      return `${baseApiUrl}github?search=${keyword}&location=${location}&page=${page}`;
    }
  },
  {
    name: 'stackoverflow',
    buildUrl (keyword, location, page){
      return `${baseApiUrl}stackoverflow?searchTerm=${keyword}&location=${location}`;
    }
  }
];

//main
export default function jobSearch(keyword, location, page, callback) {
  providers.forEach(provider => {
    fetch(provider.buildUrl(keyword, location, page))
    .then(function(response) {
      return response.json();
    }).then(function(data) {
      callback(data);
    }).catch(function(err) {
      console.log('Error ', err);
    });
  });
}
