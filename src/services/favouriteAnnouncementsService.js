//REQUISIÇÕES
const connection = require ('../database/connection');
const clientService = require('./clientService');
const { QueryTypes } = require('sequelize'); 
module.exports = {
    //LISTAR ANÚNCIOS FAVORITOS
    async index (userId){
        const announcements = await connection.favouriteAnnouncements.findAll({where:{ userId: userId}});
        async function getData (){
            var list = [];
            for (var i=0; i<announcements.length; i++){
                const announcement = await connection.announcement.findOne({where:{id: announcements[i].announcementId}})
                list.push(announcement)
            }
            return list
        }
        return getData();
    },

    //LISTAR ANÚNCIOS FAVORITOS
    async indexAll (userId){
        const favorites = await connection.favouriteAnnouncements.findAll({where:{ userId: userId}});
        return favorites;
    },

    //DELETAR ANÚNCIOS
    async delete(idFavouriteAnnouncement){
        const ann = await connection.favouriteAnnouncements.destroy({ where: { id: idFavouriteAnnouncement } });
        return "Anúncio excluído com sucesso!";
    },

    //SALVAR ANÚNCIO FAVORITO NO BANCO
    async create(announcementId, userId){
        const announcement = await connection.favouriteAnnouncements.create({
            userId: userId,
            announcementId: announcementId,
        });
        console.log("Announcement favorito registrado!!");
        return announcement;
    }
}