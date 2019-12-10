require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require('mongoose');
const path = require ("path");
const cors = require ("cors");

const app = express();
/**
 * Database Setup
 */

mongoose.connect(
    process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
    }
);

app.use(cors());
//express sabereá lifar com req JSON
app.use(express.json());
//express lidar com req url encoded facilitar envio de arquivos
app.use(express.urlencoded({
    extended: true
}));
//lib de log
app.use(morgan("dev"));
//sempre que acessar pelo id do video na barra de endereço
app.use("/files", 
express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
);


app.use(require("./routes"));
app.listen(process.env.PORT || 3000);