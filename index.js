// instancias necesarias
const express = require('express');
const path = require('path');

require('dotenv').config();

// app de Express
const app = express();

// creando el node server
const server = require('http').createServer(app);
// configuracion del socket
const io = require('socket.io')(server);


// mensajes de sockets
io.on('connection', client => {
    
    console.log('cliente conectado al socket');


    client.on('disconnect', () => { 
        console.log('cliente desconectado al socket');
    });

    // escuchar un evento de los clientes mediante sockets
    client.on('mensaje', ( payload )=>{
        console.log('Mensaje desde el cliente',payload);


        // emitiendo un evento, simulando que el servidor emitira un mensaje a los clientes
        // conectados mediante sockets
        io.emit('mensajeServer', {admin:'Nuevo mensaje desde el server'});
    });

    client.on('new-evento-from-browser', ( payload )=>{
        console.log('Mensaje', payload);
        // emitir un evento con un paylod y que lo escuchen todos
        // incluyendo al server y a los clients
        // io.emit('new-message-event', payload);
        
        // emitir un evento con un payload y que lo escuchen todos mens
        // el emisor del evento
        client.broadcast.emit('new-message-event', payload);
    });

    client.on('nuevo-evento-from-ios', ( payload )=>{
        console.log('Mensaje', payload);
        // emitir un evento con un paylod y que lo escuchen todos
        // incluyendo al server y a los clients
        // io.emit('new-message-event', payload);
        
        // emitir un evento con un payload y que lo escuchen todos mens
        // el emisor del evento
        client.broadcast.emit('new-message-event-server-ios', payload);
    });

  });




// instanciando un path publico
const publicPath = path.resolve(__dirname,'public');
// le decimos al app que use el path publico
app.use( express.static( publicPath ) );

// usando el PORT de nuestras variables de entorno gracias al paquete dotenv
// que puede ser visualizado en package.json
server.listen(process.env.PORT, (err)=>{
    if(err) throw new Error(err);

    console.log('Servidor activo en el puerto: ', process.env.PORT);
});