module.exports.iniciaChat = function (application, req, res) {

    var dadosForm = req.body;

    console.log(dadosForm);
    req.assert('apelido', 'Nome Apelido é  obrigatório').notEmpty();
    req.assert('apelido', 'Nome Apelido deve ter entre 3 a 15 caracteres').len(3, 15);

    var erros = req.validationErrors();

    if (erros) {
        res.render('index', { validacao: erros });
        return
    }
    var socket = application.get('io')

    socket.emit('msgParaClient', { apelido: dadosForm.apelido, menssagem: 'Acabou de entrar no chat' });


    res.render('chat', {dadosForm});
}

