require('dotenv').config();
const EleventyFetch = require("@11ty/eleventy-fetch");
const fetch = require("node-fetch")

let url = "https://zinecatdev2.buzznon.com/admin/service/Item";

// DatoCMS token
  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ6aW5lY2F0ZGV2Mi5idXp6bm9uLmNvbSIsImF1ZCI6InppbmVjYXRkZXYyLmJ1enpub24uY29tIiwiaWF0IjoxNjkxNTA1OTU3LCJuYmYiOjE2OTE1MDU5NTcsImV4cCI6MTY5MTU5MjM1NywiaWQiOjIwfQ.B65dDOBD_7RxJy2VwM1u2LkoaX8FEd0DeomobRDquvY";

  async function auth(){ 
    let key = await EleventyFetch('https://zinecatdev2.buzznon.com/admin/service/Auth',{
  fetchOptions: {
        headers: {
      
      "Content-Type": "application/json"},
        method: 'POST',
        body: JSON.stringify({
    query: "query {\n        login(username:\"cassandra\", password: \"hradc987\")\n        {\n                jwt,\n                refresh,\n                user {\n                        id,\n                        fname,\n                        lname,\n                        email\n                }\n        }\n}\n",
    variables: {}
  }),
        redirect: 'follow'
      }
    })
  }


// let auth = async function(){

//   let urlauth = "https://zinecatdev2.buzznon.com/admin/service/Auth";

//   var authquery = JSON.stringify({
//     query: "query {\n        login(username:\"cassandra\", password: \"hradc987\")\n        {\n                jwt,\n                refresh,\n                user {\n                        id,\n                        fname,\n                        lname,\n                        email\n                }\n        }\n}\n",
//     variables: {}
//   })
//     const { data } = await EleventyFetch(urlauth, {
//       fetchOptions: {
//         headers: { 
//       "Content-Type": "application/json"},
//         method: 'POST',
//         body: authquery,
//         redirect: 'follow'
//       }
//     })
//     return data.login.jwt
//     console.log(data.login.jwt)
// }

// auth.then(getCollection(response))

async function getCollection(jwt) {

  let headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + jwt
  };

  var graphql = JSON.stringify({
  query: "query{\ngetRelationships(\ntable:\"ca_collections\",\nidentifier:\"Denver Zine Library\",\ntarget:\"ca_objects\",\nbundles:[\n\"ca_objects.preferred_labels.name\"\n]\n){\nid,\ntable,\nidno,\nrelationships {\nid,\ntable,\nrelationship_typename,\nrelationship_typecode,\nbundles {\nname,\ncode,\ndataType,\nvalues {\nid,\nvalue_id,\nlocale,\nvalue,\n}\n}\n}\n}\n\n}", 
   variables: {}
  });

  const { data } = await EleventyFetch(url, {
      duration: "1d",
      type: "json",
      fetchOptions: {
        headers: headers,
        method: 'POST',
        body: graphql,
        redirect: 'follow'
      }
    });
  return data.getRelationships.relationships
}

module.exports = getCollection(auth)