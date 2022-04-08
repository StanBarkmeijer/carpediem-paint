const Joi = require("joi");
const mongoose = require("mongoose");
const Paint = require("../models/paint.model");
const Ship = require("../models/ship.model");

const paintSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    url: Joi.string(),
    color: Joi.string()
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

    Ship.model
        .find()
        .then((data) => {
            data.forEach(ship => {
                let v = findAndUpdateInShip(ship.voorschip, req.body);
                let m = findAndUpdateInShip(ship.middenschip, req.body);
                let a = findAndUpdateInShip(ship.achterschip, req.body);
                let o = findAndUpdateInShip(ship.overigen, req.body);

                console.log(v[0].paint);

                const newShip = {
                    voorschip: v,
                    middenschip: m,
                    achterschip: a,
                    overigen: o
                }

                Ship.model
                    .findByIdAndUpdate(ship._id, newShip, { useFindAndModify: true });
            });
        });
}

function findAndUpdateInShip(input, paint) {
    input.forEach((i) => {
        if (i.paint.name === paint.name) {
            i.paint.color = paint.color;
        }
    });

    return input;
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