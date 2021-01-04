const express = require("express");
const path = require("path");
const db = require("./src/databse.json");
const host="https://nft-metadata-api.herokuapp.com";

const app = express();

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res) {
  res.send('Simple Api Server for ERC721 contract');
});
app.get('/api/token/:token_id', function(req, res) {
  const tokenId = parseInt(req.params.token_id).toString();
  const person = db[tokenId]
  const data = {
    'name': person.name,
    'image': `${host}/images/${tokenId}.png`
  };
  res.send(data)
});
app.listen(process.env.PORT||3000,function(){
	console.log("the server is running on port %s" ,this.address().port);
});
