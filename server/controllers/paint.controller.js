const Joi = require("joi");
const mongoose = require("mongoose");
const Paint = require("../models/paint.model");

const paintSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    url: Joi.string()
});

module.exports = {
    create,
    read,
    update,
    remove,
    removeAll
}

async function create(req, res) {
    paint = await paintSchema.validateAsync(req.body, { abortEarly: false });

    Paint
        .model(paint)
        .save()
        .then((data) => res.send(data))
        .catch((err) => {
            res
                .status(500)
                .send({
                    message: err.message || "Some error occurred while creating paints"
                });
        });
}

async function read(req, res) {
    const id = req.params.id;

    const condition = id 
        ? { _id: id }
        : {};
        
    Paint.model
        .find(condition)
        .then((data) => res.send(data))
        .catch((err) => {
            res
                .status(500)
                .send({
                    message: err.message || "Some error occurred while retrieving paints"
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

    Paint.model
        .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then((data) => {
            if (!data) {
                res
                    .status(404)
                    .send({
                        message: `Can't update Paint with ID=${id}.`
                    });
            } else {
                res
                    .send({ message: "Paint was updated succesfully" });
            }
        })
        .catch((err) => {
            res
                .status(500)
                .send({
                    message: err.message || `Can't update Paint with ID=${id}.`
                });
        });
}

async function remove(req, res) {
    const id = req.params.id;

    Paint.model
        .findByIdAndRemove(id)
        .then((data) => {
            if (!data) {
                res
                    .status(404)
                    .send({
                        message: `Can't delete Paint with ID=${id}.`
                    });
            } else {
                res
                    .send({ message: `Paint with ID=${id} was deleted succesfully`});
            }
        })
        .catch((err) => {
            res
                .status(500)
                .send({
                    message: err.message || `Can't delete Paint with ID=${id}.`
                });
        })
}

async function removeAll(req, res) {
    Paint.model
        .deleteMany({})
        .then((data) => {
            res
                .send({ message: `${data.deletedCount} paints were deleted`});
        })
        .catch((err) => {
            res
                .status(500)
                .send({
                    message: err.message || `Can't delete Paint with ID=${id}.`
                });
        });
}