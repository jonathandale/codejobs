
//Github
export default function jobSearch(keyword, page, callback) {
  fetch(`http://localhost:3000/jobsearch/github?search=${keyword}&page=${page}`)
  .then(function(response) {
    return response.json();
  }).then(function(data) {
    callback(data);
  }).catch(function(err) {
    console.log('Error ', err);
  });
}
