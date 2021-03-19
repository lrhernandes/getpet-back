//REQUISIÇÕES
const connection = require ('../database/connection');
const strTermo = require('../files/termo de adoção');
const strEmail = require('../mail templates/announcement');
const nodemailer = require('nodemailer');
const { Op } = require("sequelize");

// Pronto

module.exports = {
    //LISTAR ANÚNCIOS
    async index (){
        const announcements = await connection.announcement.findAll({
            where:{
                available: true
            },
            order: [
                ['createdAt', 'DESC'],
            ],
            limit: 3
        });
        return announcements;
    },

    //LISTAR ANÚNCIOS DISPONÍVEIS
    async filterAvailableAnnouncements (user){
        const availableAnnouncements = await connection.announcement.findAll({
            where:{
                available : true,
                [Op.not]: [
                    { userId: user },
                ]
            },
            order: [
                ['createdAt', 'DESC'],
            ],
        });
        return availableAnnouncements;
    },

    //LISTAR ANÚNCIOS DISPONÍVEIS
    async getAvailableAnnouncements (user){
        const availableAnnouncements = await connection.announcement.findAll({
            where:{
                available : true,
                [Op.not]: [
                    { userId: user },
                ]
            },
            order: [
                ['createdAt', 'DESC'],
            ],
        });
        return availableAnnouncements;
    },

    async getAvailableAnnouncementsByAddress(id, city, uf){
        const availableAnnouncements = await connection.announcement.findAll({
            where:{
                available : true,
                city : city,
                uf: uf,
                [Op.not]: [
                    { userId: id },
                ]
            },
            order: [
                ['createdAt', 'DESC'],
            ],
        });
        return availableAnnouncements;
    },

    async availableAnnouncementsByAddress(city, uf){
        const availableAnnouncements = await connection.announcement.findAll({
            where:{
                available : true,
                city : city,
                uf: uf
            },
            order: [
                ['createdAt', 'DESC'],
            ],
        });
        return availableAnnouncements;
    },

    //LISTAR ANÚNCIOS DO CLIENT
    async getClientAnnouncements (id_par){
        const availableAnnouncements = await connection.announcement.findAll({
            where: { 
                available : true,
                userId : id_par 
            },
                order: [
                    ['createdAt', 'DESC'],
                ]
            });
        return availableAnnouncements;
    },

    //LISTAR ANÚNCIO ESPECÍFICO
    async getAnnouncement (id_par){
        const announcement = await connection.announcement.findOne({ where: { id: id_par }});
        return announcement;
    },

    //DELETAR ANÚNCIOS
    async delete(id_announcement){
        //DELETE ANNOUNCEMENT
        const ann = await connection.announcement.findOne({ where:{ id: id_announcement }});
        ann.available = false;
        const del = await ann.save({
            available: false
        })
        return ann;
    },
    
    //ATUALIZAR ANÚNCIOS
    async update(req, id_par_ann){
        const { name, description, sex, age, vaccinated, dewormed, castrated, isSpecial, specialDescription, temperament, adopted, type, uf, city, size, available} = req;
        const ann = await connection.announcement.findOne({ where:{ id: id_par_ann }});
        if(name){ ann.name = name;};
        if(description){ ann.description = description; };
        if(sex){ ann.sex = sex; };
        if(age){ ann.age = age; };
        if(temperament){ ann.temperament = temperament; };
        if(type){ ann.type = type; };
        if(uf){ ann.uf = uf; };
        if(city){ ann.city = city; };
        if(size){ ann.size = size; };
        if(available){ ann.available = available}
        if(vaccinated){ ann.vaccinated = vaccinated};
        if(dewormed){ ann.dewormed = dewormed}
        if(castrated){ ann.castrated = castrated}
        if(isSpecial){ ann.isSpecial = isSpecial}
        if(specialDescription){ ann.specialDescription = specialDescription}
        if(adopted){ ann.adopted = adopted}
        console.log(vaccinated)
        console.log(dewormed)
        console.log(isSpecial)
        console.log(castrated)
        console.log(specialDescription)

        const announcement = await ann.save({
            name: name,
            description: description,
            sex: sex,
            age: age,
            adopted: adopted,
            temperament: temperament,
            type: type,
            uf: uf,
            city: city,
            size: size,
            available: available,
            vaccinated: vaccinated,
            dewormed: dewormed,
            castrated: castrated,
            isSpecial: isSpecial,
            specialDescription: specialDescription,
            adopted:adopted
        })
        
        console.log(announcement)
        return announcement;
    },

    //SALVAR ANNOUNCEMENT NO BANCO
    async create(req){
        const { name, description, sex, age, castrated, vaccinated, dewormed, isSpecial, userId, temperament, type, size, uf, city, specialDescription} = req; 
        const announcement = await connection.announcement.create({
            name: name,
            userId: userId,
            description: description,
            type: type,
            size: size,
            sex: sex,
            age: age,
            temperament: temperament,
            uf:uf,
            city:city,
            castrated: castrated,
            vaccinated: vaccinated,
            dewormed: dewormed,
            isSpecial: isSpecial,
            specialDescription: specialDescription,
            available: true,
            adopted: false,
            pictures: ''
        });
        //const newannouncement = this.register(userId, adressId, name, description, type, size, sex, age);
        return announcement;
    },

    //ENVIAE EMAIL DA INSERÇÃO DE ANÚNCIO
    async register(userId, adressId, name, description, type, size, sex, age) {
        //client
        const user = await connection.client.findOne({where: { id: userId}});
        const jsonP = JSON.parse(JSON.stringify(user.dataValues));
        const {firstName, email} = jsonP;

        //address
        const address = await connection.adress.findOne({where: {id: adressId}});
        const jsonP2 = JSON.parse(JSON.stringify(address.dataValues));
        const {street, houseNumber, city, uf} = jsonP2;

        const termo = strTermo.termo();
        const mail = strEmail.registerAnnouncement(firstName, name, description, type, size, sex, age, street, houseNumber, city, uf);
        
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
            subject: `Novo anúncio!`,
            text: "Mensagem de confirmação de registro", 
            html: `${mail}`, // salvo em src/mail templates
            attachments : [{ filename: 'termo.txt', content: termo }] //salvo em src/files
            });
        return mail;
    }
}