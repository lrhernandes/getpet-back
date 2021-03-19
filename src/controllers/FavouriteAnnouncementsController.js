//REQUISIÇÕES
const favoutireAnnouncements = require('../services/favouriteAnnouncementsService');
const FavouriteAnnouncement = require('../database/models/FavouriteAnnouncements');
const client = require('../services/clientService');
const connection = require ('../database/connection');

module.exports = {
    //LISTAR ANÚNCIOS FAVORITOS
    async index(req, res){
        const userId = req.params.id;
        const fav = await favoutireAnnouncements.index(userId);
        const a = Object.values(fav);
        if(a.length){
            res.json(fav).status(201);
        } else{
            res.status(400).json('Nenhum anúncio favorito');
        }
        return
    },

    //LISTAR ANÚNCIOS FAVORITOS
    async indexAll(req, res){
        const userId = req.params.id;
        const fav = await favoutireAnnouncements.indexAll(userId);
        const a = Object.values(fav);
        if(a.length){
            res.json(fav).status(201);
        } else{;
            res.status(400).json('Nenhum anúncio favorito');
        }
        return a
    },

    //ADICIONAR ANÚNCIOS FAVORITOS
    async create (req, res) {
        const userId = req.params.id;
        const announcementId = req.params.announcementId;
        const announcement = await favoutireAnnouncements.create(announcementId, userId);
        if(announcement){
            return res.send(announcement).status(201).send();
        }else{
            return res.status(400).send('Error in insert new record');
        }
    },

    //DELETAR ANÚNCIOS FAVORITOS
    async delete (req, res){
        const announcementFavouriteId = req.params.announcementId;
        const userId = req.params.userId;
        const fav = await connection.favouriteAnnouncements.findOne({where:{ announcementId: announcementFavouriteId}});
        if(fav.userId == userId){
            const delfav = await favoutireAnnouncements.delete(fav.id);
            res.json(delfav);
        }else{
            console.log("erro na excluão!");
            res.json({ message: "Não é possível excluir esse anúncio!"}).status(401).send();
        } 
        return
    }
}