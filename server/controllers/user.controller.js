const bcrypt = require('bcrypt');
const Joi = require('joi');
const User = require('../models/user.model');

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
  update,
  remove,
  removeAll
};

async function create(user) {
  user = await userSchema.validateAsync(user, { abortEarly: false });
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
                res
                    .send({ message: `User with ID=${id} was deleted succesfully`});
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