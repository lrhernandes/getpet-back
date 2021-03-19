//REQUISIÇÕES
const express = require('express');
const routes = express.Router();
const connection = require('./database/connection');

//CONTROLLERS
const AuthController = require('./controllers/AuthController');
const ClientController = require('./controllers/ClientController');
const AnnouncementController = require('./controllers/AnnouncementController');
const FavouriteAnnouncementsController = require('./controllers/FavouriteAnnouncementsController');
const { Router } = require('express');

//ROTA RAIZ
routes.get('/', (req, res)=>{
    return res.json({
    });
});

//ROTAS DE AUTENTICACAO]
routes.post('/auth/login', AuthController.login);

//ROTAS CLIENT
routes.post('/client', ClientController.create);
routes.get('/client', ClientController.index);
routes.get('/client/:id', ClientController.getByUser);
routes.get('/client/password/:email', ClientController.getPassword);
routes.put('/client/settings/:id/:idAuth', ClientController.update);
routes.delete('/client/settings/delete', ClientController.delete);

//ROTAS ANNOUNCEMENTS
routes.post('/announcements', AnnouncementController.create);
routes.get('/announcements', AnnouncementController.index);
routes.get('/announcement/:id', AnnouncementController.getAnnouncement);
routes.get('/availableannouncements/:id', AnnouncementController.getAvailableAnnouncements);
routes.get('/availableannouncementsbyaddress/:id/:city/:uf', AnnouncementController.getAvailableAnnouncementsByAddress);
routes.get('/announcementsbyaddress/:city/:uf', AnnouncementController.availableAnnouncementsByAddress);
routes.get('/clientannouncements/:id', AnnouncementController.getClientAnnouncements);
routes.put('/announcements/settings/:id/:user', AnnouncementController.update);
routes.delete('/announcements/delete/:id/:announcement', AnnouncementController.delete);

//ROTAS FAVOURITES
routes.get('/myfavourites/:id', FavouriteAnnouncementsController.index);
routes.get('/allfavourites/:id', FavouriteAnnouncementsController.indexAll);
routes.delete('/deletefavourite/:announcementId/:userId', FavouriteAnnouncementsController.delete);
routes.post('/addfavourite/:announcementId/:id', FavouriteAnnouncementsController.create);

module.exports = routes;