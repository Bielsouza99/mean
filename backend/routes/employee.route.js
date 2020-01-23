const express = require('express');
const app = express();
const employeeRoute = express.Router();

let Employee = require('../models/Employee');

employeeRoute.route('/create').post((req, res, next) => {
    Employee.create(req.body, (error, data) => {
        if(error) return next(error);
        else res.json(data);
    })
})

employeeRoute.route('/').get((req, res) => {
    Employee.find((error, data) => {
        if(error) return next(error);
        else res.json(data);
    })
})

employeeRoute.route('/read/:id').get((req,res) => {
    Employee.findById(req.params.id, (error, data) => {
        if (error) return next(error);
        else res.json(data);
    })
})

employeeRoute.route('/update/:id').put((req,res,next) => {
    Employee.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            console.log(error);
            return next(error);
        } else {
            res.json(data);
            console.log('Dados atualizados com sucesso');
        }
    })
})

employeeRoute.route('/delet/:id').delete((req,res,next) => {
    Employee.findOneAndRemove(req.params.id, (error, data) => {
        if(error) return next(error);
        else {
            res.status(200).json({
                msg: data
            });
        }
    })
})

module.exports = employeeRoute;