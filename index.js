//importações
const express = require('express');
const bodyParser = require('body-parser');
const db = require('express-mongo-db');

//configuração da aplicação
const app = express();
app.set('view engine', 'ejs');
app.use('/', express.static('style'));
app.use(bodyParser.urlencoded());//para acessar o código fonte, usar ctrl+clique
app.use(db('mongodb://localhost/banco'));

//endpoints
app.get('/', (requisicao, resposta) => {
    resposta.render('formulario');
});

app.post('/', (requisicao, resposta) => {
    console.log(requisicao.body);
    
    requisicao.db.collection('saidas').insert(requisicao.body, (erro) =>{
        if(erro){
            resposta.render('erro');
            return;
        }

        resposta.render('sucesso');
    });
});

app.get('/', (requisicao, resposta) => {
    requisicao.db.collection('saidas').find().toArray((erro, dados) => {
        if(erro){
            resposta.render('erro');
            return;
        }
        
        resposta.render('saidas', {'lista': dados});
    });
});

//listen
app.listen(3000, () => {
    console.log('Servidor inicializado');
});
