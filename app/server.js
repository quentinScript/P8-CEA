var express = require('express');
var app = express();
var path = require('path');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var five = require("johnny-five");
var board = new five.Board();

var lightIsOn = false;
var lights = [false, false, false, false];
var phonePosition = 0;

var seuil = 10;

// port du serveur
server.listen(7010);
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function (req, res) {
  res.render('index');
});

app.get('/admin', function (req, res) {
  res.render('admin');
});


io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  
    // capteurs lumieres
  board.on("ready", function() {
      var light1 = new five.Sensor("A0");
      var light2 = new five.Sensor("A1");
      var light3 = new five.Sensor("A2");
      var light4 = new five.Sensor("A3");
      
      light1.on("change", function() {
         // console.log('light1', this.value);
          checkPosition(this.value, 1);
      });
      
      light2.on("change", function() {
         // console.log('light2', this.value);
          checkPosition(this.value, 2);
      });
      
      light3.on("change", function() {
         // console.log('light3', this.value);
          checkPosition(this.value, 3);
      });
      
      light4.on("change", function() {
         // console.log('light4', this.value);
          checkPosition(this.value, 4);
      });
  });

    
     socket.on('categorieChoice', function(data) {
    console.log(data);
    
    io.sockets.emit('setCategorie', {
      categorie: data.categorie
    });
    
   
  }); 
    
    socket.on('composantChoice', function(data) {
    console.log(data);
    
    io.sockets.emit('setComposant', {
      composant: data.composant
    });
    
   
  }); 
    
    
    socket.on('setPhonePosition', function (data) {
  console.log(data.id);
    $('[data-page]').removeClass("show");
    $('[data-souspage]').removeClass("show");
   $('[data-page="'+data.id+'"]').addClass("show");
});
  
});
function checkPosition(val, id) {
    
    let oldLights = [...lights];
    
    if (lights[0] == false
     && lights[1] == false
     && lights[2] == false
     && lights[3] == false) {
        if (val < seuil) {
            lights[id-1] = true;
            lightIsOn = true;
            phonePosition = id;
        }
    }
    
    else {
        if (val >= seuil) {
            lights[id-1] = false;
            lightIsOn = false;
            phonePosition = 0;
        }
    }
    
    if (JSON.stringify(oldLights) != JSON.stringify(lights)) {
        console.log(phonePosition);
        emitPhonePosition();
    }
}

function emitPhonePosition() {
    io.sockets.emit('setPhonePosition', {
      id: phonePosition
  });
}
