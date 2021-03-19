'use strict'
module.exports = (sequelize, DataTypes) => {
    const Client = sequelize.define('client', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        uf:{
            type: DataTypes.STRING,
            allowNull: false
        },
        city:{
            type: DataTypes.STRING,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        whatsapp: {
            type: DataTypes.STRING
        },
        profile_pic: { type: DataTypes.STRING  },
        active: { type: DataTypes.BOOLEAN  }
    }, {
        underscored: true,
    });

    //CRIAÇÃO DA TABELA NO BANCO
    //Client.sync({force: true});

    return Client;
}


