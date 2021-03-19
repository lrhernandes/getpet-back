//REQUISIÇÕES
const client = require('../services/clientService.js');
const connection = require ('../database/connection');

module.exports = {
    //LISTAR CLIENTS
    async index(req, res){
        const clients = await client.index();
        return res.json(clients);
    },

    //LISTAR CLIENTS
    async getPassword(req, res){
        const email = req.params.email;
        const pasword = await client.getPassword(email);
        return res.json(pasword);
    },

    //GET ONE USER
    async getByUser(req, res){
        const id_par = req.params.id;
        const cli = await client.getByUser(id_par);
        return res.json(cli);
    },
    
    //SALVAR CLIENT NO BANCO
    async create (req, res) {
        const us = await client.create(req.body);
        if(us){
            return res.status(201).send({
                id: us.id,
                token: us.token
            });
        }else{
           return res.status(400).send('Error in insert new record');
        }
    },

    //ATUALIZAR CLIENT
    async update(req, res){
        const id_par = req.params.id;
        const client_id = req.params.idAuth;
        const cli = await connection.client.findOne({
            where:{
                id: id_par
            },
        });

        const jsonS = JSON.stringify(cli.dataValues);
        const jsonP = JSON.parse(jsonS);

        if(cli.id == client_id){
            const upcli = await client.update(req.body, id_par);
            return res.json(upcli).status(200).send();
        }else{
            console.log("Erro na edição!");
            return res.status(401).send();
        }
    },

    //DELETAR CLIENT
    async delete(req, res){
        const client_id = req.headers.authorization;
        const cli = await client.delete(client_id);
        return res.json(cli);
    }
};