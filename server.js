var path = require("path"),  
    express = require("express");
    var GMB = require('google_my_business')
 var axios = require('axios');

 var engine = require('consolidate');
 

 
    // var YOUR_CLIENT_ID = 'rUzayh27Ilek6gbKkgmM9bqH', YOUR_CLIENT_SECRET = '83848323099-2r2u81ach2aad9kb86gd66akvkovri8s.apps.googleusercontent.com',
    // YOUR_REDIRECT_URL = 'https://accounts.google.com/o/oauth2/auth';

    // var google = require('googleapis');
    // var OAuth2 = google.auth.OAuth2;
    // var oauth2Client = new OAuth2(
    //   YOUR_CLIENT_ID,
    //   YOUR_CLIENT_SECRET,
    //   YOUR_REDIRECT_URL
    // );


var DIST_DIR = path.join(__dirname, "dist"), SRC_DIR = path.join(__dirname, "src"),  
    PORT = 3000,
    app = express();

//Serving the files on the dist folder
app.use(express.static(DIST_DIR));

app.set('views', __dirname + '/dist');
app.engine('html', engine.mustache);

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



app.get("/location", function(req, res){
    console.log('enter test');
    axios.get('https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4&key=AIzaSyBf8sD87XQumevDtICVowDRmo-u1jsus7o')
    .then(function(response){
        console.log('response', response.data.result);
        return res.render(path.join(SRC_DIR, "location.html"), JSON.stringify({reviews: response.data.result.address_components}))
    })
});


app.listen(process.env.PORT || PORT);
