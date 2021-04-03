//REQUISIÇÕES
const Sequelize = require('sequelize');

//CONEXÃO
const sequelize = new Sequelize('sql10403218', 'sql10403218', 'SDzQtswUij', {
    host: 'sql10.freesqldatabase.com',
    dialect: 'mysql'
});

// const sequelize = new Sequelize('getpet', 'root', '1123Bd?', {
//     host: 'localhost',
//     dialect: 'mysql'
// });

const db = {}; 

//Port number: 3306

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.client = require('../database/models/ClientModel')(sequelize, Sequelize);
db.announcement = require('../database/models/AnnouncementModel')(sequelize, Sequelize);
db.favouriteAnnouncements = require('../database/models/FavouriteAnnouncements')(sequelize, Sequelize);
db.uploads = require('../database/models/Uploads')(sequelize, Sequelize);
db.adopters = require('../database/models/Adopters')(sequelize, Sequelize);

//db.favouriteAnnouncements.hasOne(db.announcement);

/*
//client
db.adress.hasOne(db.client);
db.client.belongsTo(db.adress);

//announcements
db.announcement.hasMany(db.animal_pictures);
db.animal_pictures.belongsTo(db.announcement);
db.adress.hasOne(db.announcement);
db.announcement.belongsTo(db.adress);
*/

//MENSAGEM DE AUTENTICAÇÃO
db.sequelize.authenticate().then(function(){
    console.log("Conectado com sucesso :)");
}).catch(function(erro){
    console.log("Erro ao conectar com o BD: " + erro);
});

module.exports = db;
