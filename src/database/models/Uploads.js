'use strict'
module.exports = (sequelize, DataTypes) => {
    const Uploads = sequelize.define('uploads', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        announcementId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        size:{
            type: DataTypes.STRING,
            allowNull: false
        },
        key: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        underscored: true,
    });

    //CRIAÇÃO DA TABELA NO BANCO
    //Uploads.sync({force: true});

    return Uploads;
}


