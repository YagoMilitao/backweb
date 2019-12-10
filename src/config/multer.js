const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const storageTypes = {
    local: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, "..", "..", "tmp", "uploads"));
        },
         filename:(req, file, cb)=>{
            //definir um hash p q as imagens nao se sobreponham
            crypto.randomBytes(8, (err,hash)=>{
                if(err) cb(err);

                //criar a hash para deixar o nome cm unico
                //vai ficar       a hash toda            -  nome original do arquivo
                file.key = `${hash.toString('hex')}-${file.originalname}`;

                cb(null,file.key);
            });
        },
    })/*, mlab: EMELÉB({
        
        contentType: EMELÉB.AUTO_CONTENT_TYPE,
        
        
        
        key:(req, file, cb) =>{
            crypto.randomBytes(8, (err,hash)=>{
                if(err) cb(err);

                //criar a hash para deixar o nome cm unico
                //vai ficar       a hash toda            -  nome original do arquivo
                const fileName = `${hash.toString('hex')}-${file.originalname}`;

                cb(null,fileName);
            });
        },
    }),*/
    
};
module.exports ={
    //pronde os arquivos vão após serem upadas
    dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
    //storage: storageTypes [process.env.STORAGE_TYPE],
    //limitar o tamano
    limits:{
        fileSize: 2 * 1024*1024,
    },
    //filtrar o upload(extensões)
    fileFilter:(req, file, cb)=>{
        const allowedMimes=[
            'video/mp4',
            'video/mkv'
        ];
        if(allowedMimes.includes(file.mimetype)){
            cb(null,true);
        } else{
            cb(new Error('Formato errado champz.'))
        }
    },
};