//REQUISIÇÕES
const connection = require ('../database/connection');
const strTermo = require('../files/termo de adoção');
const strEmail = require('../mail templates/register');
const strChangePassword = require('../mail templates/changePassword');
const strEmailDeleteAccount = require('../mail templates/deleteAccount');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

// Pronto

module.exports = {
    //LISTAR CLIENTS
    async index (){
        const getClients = await connection.client.findAll();
        return getClients;
    },

    //RECUPERAR SENHA CLIENTS
    async getPassword(email, res){
        const cli = await connection.client.findOne({ where: { email: email }});
        
        const rawPassword = Math.random().toString(36).substr(2);
        const encriptedPassword = bcrypt.hashSync(rawPassword, 10);

        const data = {password: encriptedPassword}

        this.update(data, cli.id).then(()=>{
            this.newPassword(cli.firstName, rawPassword, email)
        });

        return cli;
    },
    
    //GET ONE CLIENT
    async getByUser(client_id) {
        const cli = await connection.client.findOne({ where: { id: client_id }});
        return cli;
    },

    //DELETAR CLIENT
    async delete (client_id){
        //DELETE ANNOUNCEMENTS FROM CLIENT
        const ann = await connection.announcement.destroy({ where: { userId: client_id } });
        
        //DELETE CLIENT
        const cli = await connection.client.destroy({ where:{ id: client_id }});
        return "Perfil e dependências excluídas com sucesso";
    },

    //ATUALIZAR CLIENT
    async update(req, id_par){
        const {email, whatsapp, city, uf, password} = req;
        const cli = await connection.client.findOne({ where:{ id: id_par }});
        if(email){ cli.email = email; };
        if(whatsapp){ cli.whatsapp = whatsapp};
        if(uf){ cli.uf = uf};
        if(city){ cli.city = city};
        if(password){cli.password = password}
        const client = await cli.save({
            email: email,
            uf: uf,
            city: city,
            whatsapp: whatsapp,
            password: password
        });
        const getClient = await connection.client.findOne({ where: { id: id_par }});
        return getClient;
    },

    //SALVAR CLIENT NO BANCO
    async create(req){
        let { firstName, lastName, whatsapp, city, password, uf, email} = req;
        const client = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            uf: uf,
            city: city,
            whatsapp: whatsapp,
            active: true
        }

        client.password = bcrypt.hashSync(password, 10);
        const createdClient = await connection.client.create(client);

        /** SEND E-MAIL */
        this.register(firstName, lastName, email);

        /** CREATE TOKEN */
        const jwtToken = await jwt.sign({ sub: createdClient.id }, process.env.PRIVATE_KEY);
        //localStorage.setItem(TOKEN, jwtToken);
        return {
            id: createdClient.id,
            token: jwtToken
        };
    },

    //ENVIAR EMAIL DO CADASTRO DE CLIENTS
    async register(firstName, lastName, email) {
        const termo = strTermo.termo();
        const mail = strEmail.registerEmail(firstName);
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            ignoreTLS: false,
            secure: true, // true for 465, false for other ports
            auth: {
              user: "getpetcc@gmail.com", 
              pass: "getpet1123" 
            },
            tls:{ rejectUnauthorized: false} //localhost
        });
        let info = transporter.sendMail({
            from: '"GetPet 🐶🐭" <getpetcc@gmail.com>',
            to: `${email}, larachernandes@gmail.com, getpetcc@gmail.com`,
            subject: `Bem-vindo(a), ${firstName} ${lastName}!`,
            text: "Mensagem de confirmação de registro", 
            html: `${mail}`, // salvo em src/mail templates
            attachments : [{ filename: 'termo.txt', content: termo }] //salvo em src/files
            });
        return mail;
    },

    async newPassword(firstName, password, email) {
        const mail = strChangePassword.changePassword(firstName, password);
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            ignoreTLS: false,
            secure: true, // true for 465, false for other ports
            auth: {
              user: "getpetcc@gmail.com", 
              pass: "getpet1123" 
            },
            tls:{ rejectUnauthorized: false} //localhost
        });
        let info = transporter.sendMail({
            from: '"GetPet 🐶🐭" <getpetcc@gmail.com>',
            to: `${email}, larachernandes@gmail.com, getpetcc@gmail.com`,
            subject: `Solicitação de troca de senha`,
            text: "Nova senha", 
            html: `${mail}`, // salvo em src/mail templates
            });
        return mail;
    },

    //ENVIAR EMAIL DO DELEÇÃO DE CLIENTS
    async deleteAccount(firstName, lastName, email) {
        const mail = strEmailDeleteAccount.deleteAccount(firstName);
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
              user: "getpetcc@gmail.com", 
              pass: "getpet1123" 
            },
            tls:{ rejectUnauthorized: false} //localhost
        });
        let info = transporter.sendMail({
            from: '"GetPet 🐶🐭" <getpetcc@gmail.com>',
            to: `${email}, larachernandes@gmail.com, getpetcc@gmail.com`,
            subject: `Até logo, ${firstName} ${lastName}!`,
            text: "Mensagem de deleção de registro", 
            html: `${mail}`
            });
        return mail;
    }
}