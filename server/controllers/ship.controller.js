const Joi = require("joi");
const mongoose = require("mongoose");
const Ship = require("../models/ship.model");
const Paint = require("../models/paint.model");
const User = require("../models/user.model");

const shipSchema = Joi.object({
    name: Joi.string().required(),
    mmsi: Joi.string().required(),
    voorschip: Joi.array(),
    middenschip: Joi.array(),
    achterschip: Joi.array(),
    overigen: Joi.array()
});

module.exports = {
    create,
    read,
    update,
    remove,
    removeAll
}

async function create(req, res) {
    let error;
    ship = await shipSchema
        .validateAsync(req.body, { abortEarly: false })
        .catch((err) => error = err.details);

    if (error) {
        return res
            .status(400)
            .json(error);
    }

    Ship
        .model(ship)
        .save()
        .then((data) => {
            res
                .send(data);
        })
        .catch((err) => {
            res
                .status(500)
                .send({
                    message: err.message || `Can't create Ship.`
                });
        });
}

async function read(req, res) {
    const id = req.params.id;

    const condition = id 
        ? { _id: id }
        : {};
        
    Ship.model
        .find(condition)
        .then((data) => res.send(data))
        .catch((err) => {
            res
                .status(500)
                .send({
                    message: err.message || "Some error occurred while retrieving ships"
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

    Ship.model
        .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then((data) => {
            if (!data) {
                res
                    .status(404)
                    .send({
                        message: `Can't update Ship with ID=${id}.`
                    });
            } else {
                res
                    .send({ message: "Ship was updated succesfully" });
            }
        })
        .catch((err) => {
            res
                .status(500)
                .send({
                    message: err.message || `Can't update Ship with ID=${id}.`
                });
        });
}

async function remove(req, res) {
    const id = req.params.id;

    Ship.model
        .findByIdAndRemove(id)
        .then((data) => {
            if (!data) {
                res
                    .status(404)
                    .send({
                        message: `Can't delete Ship with ID=${id}.`
                    });
            } else {
                res
                    .send({ message: `Ship with ID=${id} was deleted succesfully`});
            }
        })
        .catch((err) => {
            res
                .status(500)
                .send({
                    message: err.message || `Can't delete Ship with ID=${id}.`
                });
        })
}

async function removeAll(req, res) {
    Ship.model
        .deleteMany({})
        .then((data) => {
            res
                .send({ message: `${data.deletedCount} ships were deleted`});
        })
        .catch((err) => {
            res
                .status(500)
                .send({
                    message: err.message || `Can't delete Ship with ID=${id}.`
                });
        });
}