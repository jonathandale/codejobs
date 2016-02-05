//Search providers
const baseApiUrl = 'http://localhost:3003/search/';
const providers = [
  {
    name: 'github',
    buildUrl (keyword, page){
      return `${baseApiUrl}github?search=${keyword}&page=${page}`;
    }
  },
  {
    name: 'stackoverflow',
    buildUrl (keyword, page){
      return `${baseApiUrl}stackoverflow?searchTerm=${keyword}&allowsremote=True&type=Permanent`;
    }
  }
];

//main
export default function jobSearch(keyword, page, callback) {
  providers.forEach(provider => {
    fetch(provider.buildUrl(keyword, page))
    .then(function(response) {
      return response.json();
    }).then(function(data) {
      callback(data);
    }).catch(function(err) {
      console.log('Error ', err);
    });
  });
}
