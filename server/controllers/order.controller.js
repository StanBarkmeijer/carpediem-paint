const Joi = require("joi");
const mongoose = require("mongoose");
const Order = require("../models/order.model");
const Paint = require("../models/paint.model");
const User = require("../models/user.model");

const orderSchema = Joi.object({
    user: Joi.string().required(),
    ship: Joi.object().required(),
    date: Joi.date(),
    paints: Joi.array().required()
});

module.exports = {
    create,
    read,
    update,
    remove,
    removeAll
}

async function create(req, res) {
    order = await orderSchema.validateAsync(req.body, { abortEarly: false });

    let paints = [];

    order.paints.forEach((paintID) => {
        Paint.model
            .find({ _id: paintID })
            .then((data) => paints.push(data[0]));
    });

    order.paints = paints;

    Order
        .model(order)
        .save()
        .then((data) => {
            User
                .model
                .findByIdAndUpdate(
                    req.body.user, 
                    { $push: { orders: data._id }},
                    { new: true, useFindAndModify: false });

            Order
                .model
                .findByIdAndUpdate(
                    data._id,
                    { $push: { paints: paints }},
                    { new: true, useFindAndModify: false })
                .then((data) => res.send(data)); 
        })
        .catch((err) => {
            res
                .status(500)
                .send({
                    message: err.message || "Some error occurred while creating orders"
                });
        });
}

async function read(req, res) {
    const id = req.params.id;

    const condition = id 
        ? { _id: id }
        : {};
        
    Order.model
        .find(condition)
        .then((data) => res.send(data))
        .catch((err) => {
            res
                .status(500)
                .send({
                    message: err.message || "Some error occurred while retrieving orders"
                });
        });
}

async function update(req, res) {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Data to update can not be empty "});
    }

    const id = req.params.id;

    Order.model
        .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then((data) => {
            if (!data) {
                res
                    .status(404)
                    .send({
                        message: `Can't update Order with ID=${id}.`
                    });
            } else {
                res
                    .send({ message: "Order was updated succesfully" });
            }
        })
        .catch((err) => {
            res
                .status(500)
                .send({
                    message: err.message || `Can't update Order with ID=${id}.`
                });
        });
}

async function remove(req, res) {
    const id = req.params.id;

    Order.model
        .findByIdAndRemove(id)
        .then((data) => {
            if (!data) {
                res
                    .status(404)
                    .send({
                        message: `Can't delete Order with ID=${id}.`
                    });
            } else {
                res
                    .send({ message: `Order with ID=${id} was deleted succesfully`});
            }
        })
        .catch((err) => {
            res
                .status(500)
                .send({
                    message: err.message || `Can't delete Order with ID=${id}.`
                });
        })
}

async function removeAll(req, res) {
    Order.model
        .deleteMany({})
        .then((data) => {
            res
                .send({ message: `${data.deletedCount} orders were deleted`});
        })
        .catch((err) => {
            res
                .status(500)
                .send({
                    message: err.message || `Can't delete Order with ID=${id}.`
                });
        });
}