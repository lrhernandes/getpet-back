'use strict'
module.exports = (sequelize, DataTypes) => {
    const Adopters = sequelize.define('adopters', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone:{
            type: DataTypes.STRING,
            allowNull: false
        },
        description:{
            type: DataTypes.STRING,
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
    //Adopters.sync({force: true});

    return Adopters;
}


