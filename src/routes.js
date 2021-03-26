//REQUISIÇÕES
const express = require('express');
const routes = express.Router();
const connection = require('./database/connection');
const { Router } = require('express');
const multer = require('multer')
const multerConfig = require('./config/multer')
const fs = require('fs');
const path = require('path');
const {promisify} = require('util')

//CONTROLLERS
const AuthController = require('./controllers/AuthController');
const ClientController = require('./controllers/ClientController');
const AnnouncementController = require('./controllers/AnnouncementController');
const FavouriteAnnouncementsController = require('./controllers/FavouriteAnnouncementsController');
const { fileFilter } = require('./config/multer');


//ROTA RAIZ
routes.get('/', (req, res)=>{
    return res.json({
    });
});

//ROTA DE UPLOAD DE IMAGENS
routes.post("/img/:announcementId", multer(multerConfig).single('file'), async (req, res) => {
    const id = req.params.announcementId;
    const url = `${process.env.APP_URL}files/${req.file.filename}`;
    const data = {
        name: req.file.originalname,
        size: req.file.size,
        url: url,
        key: req.file.filename,
        announcementId: id
    }
    const picture = await connection.uploads.create(data);
    return res.json(picture);
})
routes.get("/img/:announcementId", async (req, res) => {
    const id = req.params.announcementId;
    const pictures = await connection.uploads.findAll({ where: { announcementId: id }});
    return res.json(pictures);
})
routes.delete("/img/:id", async (req, res) => {
    const id = req.params.id;
    const picture = await connection.uploads.findOne({ where: { announcementId: id }});
    await connection.uploads.destroy({ where: { announcementId: id }}).then(()=>{
        promisify(fs.unlink)(path.resolve(__dirname, "..", "tmp", "uploads", picture.key))
        return res.json("Imagem deletada");
    }).cathc((err)=>{return res.json(err)})
})

//https://getpet-back.herokuapp.com/

// routes.post('/adopter/:announcementId', async (req, res) => {
    
// })


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