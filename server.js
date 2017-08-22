var path = require("path"),  
    express = require("express");
    var GMB = require('google_my_business')
 var axios = require('axios');
    var fs = require('fs');
 var engine = require('consolidate');
 global.stores = [];

    var funcWrapper = (placedId) =>{
        axios.get('https://maps.googleapis.com/maps/api/place/details/json?placeid='+placedId+'&key=AIzaSyBf8sD87XQumevDtICVowDRmo-u1jsus7o')
        .then(function(response){
            return response;
        })
    }
    // var YOUR_CLIENT_ID = 'rUzayh27Ilek6gbKkgmM9bqH', YOUR_CLIENT_SECRET = '83848323099-2r2u81ach2aad9kb86gd66akvkovri8s.apps.googleusercontent.com',
    // YOUR_REDIRECT_URL = 'https://accounts.google.com/o/oauth2/auth';

    // var google = require('googleapis');
    // var OAuth2 = google.auth.OAuth2;
    // var oauth2Client = new OAuth2(
    //   YOUR_CLIENT_ID,
    //   YOUR_CLIENT_SECRET,
    //   YOUR_REDIRECT_URL
    // );


var DIST_DIR = path.join(__dirname, "dist"), SRC_DIR = path.join(__dirname, "src"),  SRC_PAGE_DIR = path.join(SRC_DIR, "pages"),  
    PORT = 3000,
    app = express();

//Serving the files on the dist folder
app.use(express.static(DIST_DIR));

// app.set('views', __dirname + '/dist');
// app.engine('html', engine.mustache);

app.set('view engine', 'ejs');


//Send index.html when the user access the web
app.get("/main", function (req, res) {  
  res.sendFile(path.join(DIST_DIR, "index.html"));
});

// app.get("/api/test", function(req, res){
//     console.log('enter test');
//     var drive = google.drive({
//         version: 'v2',
//         auth: oauth2Client
//       });
//     console.log('drive',drive);
//     res.send({'name': 'kumar'})
// });

// app.get('/api/my', function(req, res){
//     GMB.options({version: 'v3'});
//     GMB.setAccessToken('ya29.GluuBBdJx-FSUbNm8r3Y96fMbejCZK8lLiCHVC3EcJsxB_P_tEtNajYa3m76XoNRPnuDOBbbGVMLu91cXXtkRdBPOkpvg-Iyl_wbZDBRVyYU28XxnXiWCxRLlI-5');
//     GMB.api('accounts', 'get', {}, function (res) {
//       if(!res || res.error) {
//         console.log(!res ? 'error occurred' : res.error);
//         return;
//       }
//       console.log(res);
//     });
// });


app.get('/api/list', function(req, res){
    axios.get('https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4&key=AIzaSyBf8sD87XQumevDtICVowDRmo-u1jsus7o')
    .then(function(response){
        console.log('response', response.data.result);
        return response.data;
    })
})


app.get("/location", function(req, res){
    console.log('enter test');
    axios.get('https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJKR-7EDf9DDkR7g4gVBFioDo&key=AIzaSyBf8sD87XQumevDtICVowDRmo-u1jsus7o')
    .then(function(response){
        var store = response.data.result || {};
        global.stores.push(store); 
        // console.log('response', response.data.result);
        res.render(path.join(SRC_PAGE_DIR, 'list'), {store: store});
        // res.send(reviews);
        // fs.readFile(path.join(SRC_DIR, "location.html"), 'utf8', function(err, text){
        //     res.send(reviews);
        // });
    })
});

app.get("/detail", function(req, res){//console.log('store', global.stores[0]); 
let d = 'ddd', ar = ['ChIJKR-7EDf9DDkR7g4gVBFioDo'];
    var funcList = ar.map((item)=>{
        var p = new Promise((resolve, reject) => {
            return funcWrapper(item);
        }); 
        return p;
    });console.log('funclist', funcList);
    Promise.all(funcList).then(values =>{
        console.log(values);
    })
    res.render(path.join(SRC_PAGE_DIR, 'detail'), {store: global.stores[0]});
})


app.listen(process.env.PORT || PORT);
