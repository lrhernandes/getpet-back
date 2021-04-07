'use strict'
module.exports = (sequelize, DataTypes) => {
    const Announcement = sequelize.define('announcements', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        uf:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notEmpty: { msg: "UF não pode estar vazio" } }
        },
        city:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notEmpty: { msg: "Cidade não pode estar vazio" } }
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        name:{
            type: DataTypes.STRING,
            allownull: false,
            validate: {
                notEmpty: { msg: "Nome não pode estar vazio" },
                len: { args: [2,25], msg: "Este campo deve ter entre 2 e 25 caracteres" }
            }
        },
        description: {
            type: DataTypes.TEXT,
            allownull: false,
            validate: {
                max: { args: 1100, msg: "Descrição deve ter no máximo 1100 caracteres" }
            }
        },
        sex:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notEmpty: { msg: "Sexo não pode estar vazio" } }
        },
        age:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notEmpty: { msg: "Idade não pode estar vazio" } }
        },
        castrated:{
            type: DataTypes.BOOLEAN
        },
        vaccinated:{
            type: DataTypes.BOOLEAN
        },
        dewormed:{
            type: DataTypes.BOOLEAN
        },
        isSpecial:{
            type: DataTypes.BOOLEAN
        },
        specialDescription:{
            type: DataTypes.STRING
        },
        temperament:{
            type: DataTypes.STRING,
        },
        type: {
            type: DataTypes.STRING,
            allownull: false,
            validate: {
                notEmpty: { msg: "Tipo não pode estar vazio" }
            }
        },
        size:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notEmpty: { msg: "Porte não pode estar vazio" } }
        },
        available:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: { notEmpty: { msg: "Disponibilade não pode estar vazio" } }
        },
        adopted:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: { notEmpty: { msg: "Status de adoção não pode estar vazio" } }
        },
        pictures:{
            type: DataTypes.STRING,
        }
    }, {
        underscored: true
    });
    
    //Announcement.sync({force: true});
    return Announcement;
}



