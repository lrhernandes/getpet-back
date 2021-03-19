const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const client = require('../services/clientService');
const connection = require ('../database/connection');
const bcrypt = require('bcryptjs');

dotenv.config();

module.exports = {
    async login(req, res){
        const { email, password } = req.body;
        const clientFromDB = await connection.client.findOne({where: {email: email}});
        console.log(clientFromDB)
        if(clientFromDB){
            bcrypt.compare(password, clientFromDB.password, async (err, sucess)=>{
            if(err){
                res.statusCode = 400;
                res.send("Dados incorretos");
            }
            if(sucess){
                res.statusCode = 200;
                const jwtToken = await jwt.sign({ sub: clientFromDB.id }, process.env.PRIVATE_KEY);
                res.send({
                    user: clientFromDB,
                    token: jwtToken
                });
            }else{
                res.statusCode = 400;
                res.send("Não foi possível fazer login")
            }
        })}else{
            res.statusCode = 402;
            res.send("Esse e-mail não está cadastrado")
        }
        return
    }
};