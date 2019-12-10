const mongoose = require('mongoose');
const fs= require('fs');
const path = require('path');
//converte a forma velha de callback para a nova
const {promisify} = require('util');

const PostSchema = new mongoose.Schema({
    name: String, //nome real do vidoe
    size: Number, //tamanho
    key : String, // nome com hash. precisa para poder pegar e buscar depois
    url: String, // armazenar a url onde a img ta
    //data da criação do arquivo
    createdAt:{
        type: Date,
        default: Date.now
    }
});
//toda vez antes de salvar ver se é local e dar uma url se for local
PostSchema.pre('save', function(){
    if(!this.url){
        this.url = `${process.env.APP_URL}/files/${this.key}`;
    }
});

//deletar no BD ONline
PostSchema.pre('remove', function(){
/*    if(process.env.STORAGE_TYPE === 'Nome da variavel'){
        return nomevariavel.deleteteObject({
            Key:this.key,
        }).promise()
    }else {
        */return promisify(fs.unlink)(
            path.resolve(__dirname, "..", "..", "tmp", "uploads", this.key)
            );
    //}
})
module.exports = mongoose.model("Post", PostSchema);