var app = require('./config/server');

var server = app.listen(80, function () {
    console.log('Servidor online')
})

var io = require('socket.io').listen(server);

app.set('io', io)

// criar uma conexão por webSocket

io.on('connection', function (socket) {
    console.log('Usuario conectou');
    // console.log(socket)'

    socket.on('disconnect', function () {
        console.log('Usuario desconectou')
    });


    socket.on('menssagemParaServidor', function (data) {

        console.log('usuario send')
        console.log(data)
        // Dialogo

        //emit só envia apra quem enviou  a menssagem
        socket.emit('msgParaClient', { apelido: data.apelido, menssagem: data.menssagem });
        //Broadcast envia para todos os outros clients
        socket.broadcast.emit('msgParaClient', { apelido: data.apelido, menssagem: data.menssagem });

        //partcipantes
        if (parseInt(data.apelido_atualizado_nos_clientes) == 0) {

            //emit só envia apra quem enviou  a menssagem
            socket.emit('participantesParaClient', { apelido: data.apelido });
            //Broadcast envia para todos os outros clients
            socket.broadcast.emit('participantesParaClient', { apelido: data.apelido});

        }
    });
});


