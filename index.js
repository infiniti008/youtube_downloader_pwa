const ytdl = require('ytdl-core');

var id = '_iJAYSEVeho';

ytdl.getInfo(id, {
    headers: {
        "Access-Control-Allow-Origin": "no-cors"
    }
}, (err, info) => {

  ytdl.downloadFromInfo(info)

  // var t = info.formats[0].url

  // var e = document.createElement('a');
  // e.href = "https://cors-anywhere.herokuapp.com/" + t;
  // e.setAttribute('download', "asas.mp4")
  // e.click();
  //   console.log(info.formats[0].url) 
});

console.log('aslkjalkjsalkj ')


//   var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
//     targetUrl = 'https://www.youtube.com/watch?v=_iJAYSEVeho&hl=en&bpctr=1581089617'
// fetch(proxyUrl + targetUrl)
//   .then(blob => blob.json())
//   .then(data => {
//     console.table(data);
//     document.querySelector("pre").innerHTML = JSON.stringify(data, null, 2);
//     return data;
//   })
//   .catch(e => {
//     console.log(e);
//     return e;
//   });