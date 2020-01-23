const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dbConfig = require('./database/db');

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true
}).then(() => {
    console.log('Database conectado com sucesso');
}, error => {
    console.log('Database não conectado: ' + error);
})

const rota = require('../backend/routes/employee.route');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist/MEAN')));
app.use('/', express.static(path.join(__dirname, 'dist/MEAN')));
app.use('/api', rota);

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log('Conectado na porta: ' + port);
})

app.use((req,res,next) => {
    next(createError(404));
});

app.use((err, req, res, next) => {
    console.error(err.message);
    if(!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});