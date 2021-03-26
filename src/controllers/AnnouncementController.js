//REQUISIÇÕES
const announcement = require('../services/announcementService');
const Announcement = require('../database/models/AnnouncementModel');
const connection = require ('../database/connection');

module.exports = {
    //LISTAR ANÚNCIOS
    async index(req, res){
        const announcements = await announcement.index();
        return res.json(announcements);
    },

    //FILTRAR ANÚNCIOS DISPONÍVEIS
    async FILTERAvailableAnnouncements(req, res){
        const id_par = req.params.id;
        const availableAnnouncements = await announcement.filterAvailableAnnouncements(id_par);
        if(availableAnnouncements){
            res.json(availableAnnouncements).status(201);
        } else{
            res.status(400).json('Nenhum disponível');
        }
        return availableAnnouncements
    },

    //LISTAR ANÚNCIOS DISPONÍVEIS
    async getAvailableAnnouncements(req, res){
        const id_par = req.params.id;
        const availableAnnouncements = await announcement.getAvailableAnnouncements(id_par);
        if(availableAnnouncements){
            res.json(availableAnnouncements).status(201);
        } else{
            res.status(400).json('Nenhum disponível');
        }
        return availableAnnouncements
    },

    //LISTAR ANÚNCIOS DISPONÍVEIS
    async availableAnnouncementsByAddress(req, res){
        const city = req.params.city;
        const uf = req.params.uf;
        const availableAnnouncements = await announcement.availableAnnouncementsByAddress(city, uf);
        if(availableAnnouncements){
            res.json(availableAnnouncements).status(201);
        } else{
            res.status(400).json('Nenhum disponível');
        }
        return availableAnnouncements
    },

    //LISTAR ANÚNCIOS DISPONÍVEIS NO ENDEREÇO
    async getAvailableAnnouncementsByAddress(req, res){
        const id = req.params.id;
        const city = req.params.city;
        const uf = req.params.uf;
        const availableAnnouncements = await announcement.getAvailableAnnouncementsByAddress(id, city, uf);
        if(availableAnnouncements){
            res.json(availableAnnouncements).status(201);
        } else{
            res.status(400).json('Nenhum disponível');
        }
        return availableAnnouncements
    },

    //LISTAR ANÚNCIOS DO CLIENT
    async getClientAnnouncements(req, res){
        const id_par = req.params.id;
        const clientAnnouncements = await announcement.getClientAnnouncements(id_par);
        return res.json(clientAnnouncements);
    },

    //LISTAR ANÚNCIO ESPECÍFICO
    async getAnnouncement(req, res){
        const id_par = req.params.id;
        const clientAnnouncements = await announcement.getAnnouncement(id_par);
        return res.json(clientAnnouncements);
    },

    //CRIAR ANÚNCIOS 
    async create (req, res) {
        const ad = await announcement.create(req.body);
        if(ad){
            return res.send(ad).status(201).send();
        }else{
            return res.status(400).send('Error in insert new record');
        }
    },

    //DELETAR ANÚNCIOS
    async delete (req, res){
        const id_user = req.params.id;
        const id_announcement = req.params.announcement;
        const ann = await connection.announcement.findOne({
            where:{
                id: id_announcement
            },
        });

        if(ann.userId == id_user){
            const delann = await announcement.delete(id_announcement);
            return res.json(delann);
        }else{
            console.log("erro na excluão!");
            return res.json({ message: "Não é possível excluir esse anúncio!"}).status(401).send();
        } 
    },
    
    //ATUALIZAR ANÚNCIOS
    async update(req, res){
        const id_par_ann = req.params.id;
        const client_id = req.params.user;
        
        const ann = await connection.announcement.findOne({ where:{ id: id_par_ann }});

        if(ann.userId == client_id){
            const upann = await announcement.update(req.body, id_par_ann);
            return res.json(upann).status(200).send();
        }else{
            console.log("Erro na edição!");
            return res.status(401).send();
        }
    }
}