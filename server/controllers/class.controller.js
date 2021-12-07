class ModelController {
    
    constructor(joiSchema, model, name) {
        this.modelSchema = joiSchema;
        this.Model = model;
        this.name = name;
    }

    async create(req, res) {
        let model = await this.modelSchema.validateAsync(req.body, { abortEarly: false });

        this.Model
            .model(model)
            .save()
            .then((data) => res.send(data))
            .catch((err) => {
                res
                    .status(500)
                    .send({
                        message: err.message || `Some error occurred while creating ${this.name}`
                    });
            });
    };

    async read(req, res) {
        const id = req.params.id;
    
        const condition = id 
            ? { _id: id }
            : {};
            
        this.Model.model
            .find(condition)
            .then((data) => res.send(data))
            .catch((err) => {
                res
                    .status(500)
                    .send({
                        message: err.message || `Some error occurred while retrieving ${this.name}`
                    });
            });
    }

    async update(req, res) {
        if (!req.body) {
            return res
                .status(400)
                .send({ message: "Data to update can not be empty "});
        }
    
        const id = req.params.id;
    
        this.Model.model
            .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
            .then((data) => {
                if (!data) {
                    res
                        .status(404)
                        .send({
                            message: `Can't update ${this.name} with ID=${id}.`
                        });
                } else {
                    res
                        .send({ message: `${this.name} was updated succesfully` });
                }
            })
            .catch((err) => {
                res
                    .status(500)
                    .send({
                        message: err.message || `Can't update ${this.name} with ID=${id}.`
                    });
            });
    }

    async remove(req, res) {
        const id = req.params.id;
    
        this.Model.model
            .findByIdAndRemove(id)
            .then((data) => {
                if (!data) {
                    res
                        .status(404)
                        .send({
                            message: `Can't delete ${this.name} with ID=${id}.`
                        });
                } else {
                    res
                        .send({ message: `${this.name} with ID=${id} was deleted succesfully`});
                }
            })
            .catch((err) => {
                res
                    .status(500)
                    .send({
                        message: err.message || `Can't delete ${this.name} with ID=${id}.`
                    });
            });
    }

    async removeAll(req, res) {
        this.Model.model
            .deleteMany({})
            .then((data) => {
                res
                    .send({ message: `${data.deletedCount} ${this.name} were deleted`});
            })
            .catch((err) => {
                res
                    .status(500)
                    .send({
                        message: err.message || `Can't delete paints.`
                    });
            });
    }
}

module.exports = ModelController;