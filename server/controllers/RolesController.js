const {
    Role,
    User
} = require('../models')

module.exports = {
    async index(req, res) {
        try {
            const roles = await Role.findAll({
                where: {},
                include: [{
                    model: User
                }]
            })
            res.send(roles)
        } catch (error) {
            console.log(error)
            res.status(500).send({
                error: `An error has occured trying to fetch roles`
            })
        }
    },
    async create(req, res) {
        try {
            const role = await Role.create(req.body)
            res.send(role)
        } catch (error) {
            res.status(500).send({
                error: `An error has occured trying to create role`
            })
        }
    },
    async update(req, res) {
        try {
            const role = await Role.update(req.body, {
                where: {
                    id: req.body.id
                }
            })
            res.send(req.body)
        } catch (error) {
            res.status(500).send({
                error: `An error has occured trying to update selected role`
            })
        }
    },
    async delete(req, res) {
        try {
            const role = await Role.destroy({
                where: {
                    id: req.body.roleId
                }
            })
            res.send('role deleted')
        } catch (error) {
            res.status(500).send({
                error: `An error has occured trying to delete selected role`
            })
        }
    }
}