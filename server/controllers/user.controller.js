const bcrypt = require('bcrypt');
const Joi = require('joi');
const User = require('../models/user.model');
const Order = require("../models/order.model");

const userSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email(),
  password: Joi.string().required(),
  repeatPassword: Joi.string().required().valid(Joi.ref('password')),
});

module.exports = {
  create,
  read,
  getOrders,
  update,
  remove,
  removeAll
};

async function create(req, res) {
  user = await userSchema.validateAsync(req.body, { abortEarly: false });
  user.hashedPassword = bcrypt.hashSync(user.password, 10);
  delete user.password;

  User
        .model(user)
        .save()
        .then((data) => res.send(data))
        .catch((err) => {
            res
                .status(500)
                .send({
                    message: err.message || "Some error occurred while creating users"
                });
        });
}

async function read(req, res) {
    const id = req.params.id;

    const condition = id 
        ? { _id: id }
        : {};
        
    User.model
        .find(condition)
        .then((data) => res.send(data))
        .catch((err) => {
            res
                .status(500)
                .send({
                    message: err.message || "Some error occurred while retrieving users"
                });
        });
}

async function getOrders(req, res) {    
    User.model
        .find({ _id: req.params.id })
        .then((data) => {
            res.json(data[0].orders)
        })
        .catch((err) => {
            res
                .status(500)
                .send({
                    message: err.message || "Some error occurred while retrieving user's orders"
                });
        })
}

async function update(req, res) {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Data to update can not be empty "});
    }

    const id = req.params.id;

    User.model
        .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then((data) => {
            if (!data) {
                res
                    .status(404)
                    .send({
                        message: `Can't update User with ID=${id}.`
                    });
            } else {
                res
                    .send({ message: "User was updated succesfully" });
            }
        })
        .catch((err) => {
            res
                .status(500)
                .send({
                    message: err.message || `Can't update User with ID=${id}.`
                });
        });
}

async function remove(req, res) {
    const id = req.params.id;

    User.model
        .findByIdAndRemove(id)
        .then((data) => {
            if (!data) {
                res
                    .status(404)
                    .send({
                        message: `Can't delete User with ID=${id}.`
                    });
            } else {
                Order
                    .schema
                    .deleteMany({ user: id })
                    .then((data2) => {
                        res
                            .send({ message: `User with ID=${id} and ${data2.deletedCount} orders were deleted succesfully`});
                    });
            }
        })
        .catch((err) => {
            res
                .status(500)
                .send({
                    message: err.message || `Can't delete User with ID=${id}.`
                });
        })
}

async function removeAll(req, res) {
    User.model
        .deleteMany({})
        .then((data) => {
            res
                .send({ message: `${data.deletedCount} users were deleted`});
        })
        .catch((err) => {
            res
                .status(500)
                .send({
                    message: err.message || `Can't delete User with ID=${id}.`
                });
        });
}