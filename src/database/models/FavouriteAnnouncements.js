'use strict'
module.exports = (sequelize, DataTypes) => {
    const FavouriteAnnouncements = sequelize.define('favourite', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        announcementId: {
            type: DataTypes.UUID,
            allowNull: false
        }
    }, {
        underscored: true,
    });

    //CRIAÇÃO DA TABELA NO BANCO
    //FavouriteAnnouncements.sync({force: true});

    return FavouriteAnnouncements;
}


