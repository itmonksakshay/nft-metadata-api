const express = require("express");
const path = require("path");
const db = require("./src/databse.json");
const host="https://nft-metadata-api.herokuapp.com";

const app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.get('/api/token/:token_id', function(req, res) {
  const tokenId = parseInt(req.params.token_id).toString();
  const art = db[tokenId]
  const data = {
    'name': art.name,
    'image': `${host}/images/${tokenId}.png`,
    'description':art.description,
    'external_url':art.eternal_url
  };
  res.json(art);
});
app.listen(process.env.PORT||3000,function(){
	console.log("the server is running on port %s" ,this.address().port);
});
