const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require('multer');
//const formData = require('express-form-data');

var storage = multer.diskStorage({
      destination: function (req, file, cb) {
      cb(null, './build/images');
    },
    filename: function (req, file, cb) {
        extension = file.originalname.split('.').pop();
        cb(null, Date.now() + '.' +extension );
    }
});


var upload = multer({ storage: storage }).single('file');
const fs = require('fs');
var nft= JSON.parse(fs.readFileSync('./build/database.json'));

const host="https://nft-metadata-api.herokuapp.com/";

const app = express();

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/api/token/mint',(req, res) => {
       upload(req, res, function (err) {

        var newNftId = Date.now().toString();
        nft[newNftId] = {
            'name':req.body.name,
            'description':req.body.description,
            'filename':req.file.filename
        };
        fs.writeFileSync('./build/database.json',  JSON.stringify(nft));
        res.send("200 Recieved");
    });  
});

app.get('/api/token/:token_id', function(req, res) {
    const tokenId = parseInt(req.params.token_id).toString();
    console.log(nft);
    const art = nft[tokenId];
    const data = new Object({
    'name': art.name,
    'image': `${host}/images/${art.filename}`,
    'description':art.description
  });
  res.json(data);
});
app.listen(process.env.PORT||5000,function(){
	console.log("the server is running on port %s" ,this.address().port);
});
