var express = require('express');
var app = express();
var fs = require('fs');

app.use(express.static(__dirname + "/public"));


app.get('/info',function(req,res,next){
	fs.readFile('data/data.json','utf8',function(err,info){
		if(err){
			console.log(err)
		}
		res.json(JSON.parse(info))
		console.log(info)
	})
})


app.listen(3000);
