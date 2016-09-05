var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var Storage = function() {
    this.items = [];
    this.id = 0;
};

Storage.prototype.add = function(name) {
    var item = {name: name, id: this.id};
    this.items.push(item);
    this.id += 1;
    return item;
};

Storage.prototype.delete = function(id) {
    for (var i = 0; i < this.items.length; i++) {
        // console.log(this.items[i].id ==  id)
        if(this.items[i].id ==  id) {
                this.items.splice(i, 1)
                break
        } 
    }
    // console.log(this.items)
    return {}
};

Storage.prototype.put = function(id, name){
        for (var i = 0; i < this.items.length; i++){
            // console.log(this.items[i].id == id)
            if(this.items[i].id == id) {
                this.items[i].name = name;
                return this.items[i]
            }
        }
        // console.log(this.items)
        return {};
}

var storage = new Storage();
storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');

var app = express();
app.use(express.static('public'));
app.listen(process.env.PORT || 8080, process.env.IP);


app.get('/items', function(request, response) {
    response.json(storage.items);
});


app.post('/items', jsonParser, function(request, response) {
    // console.log(request.body);
    if (!request.body) {
        return response.sendStatus(400);
    }

    var item = storage.add(request.body.name);
    response.status(201).json(item);
});

app.delete('/items/:id', function(request, response) {
    // console.log(storage.items)
    var item = storage.delete(request.params.id);
    response.status(200).json(item);
});

app.put('/items/:id', jsonParser, function(request, response){ 
    if (!request.body) {
        return response.sendStatus(400);
    }

     var item = storage.put(request.params.id, request.body.name); //extraction
    response.status(201).json(item);
})

exports.app = app;
exports.storage = storage;

