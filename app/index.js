/**
 * RESTFul Services NodeJS
 * Author: Jorge Herrera
 * Update: 07/04/2020
 */

 const express = require('express');
 const app = express();
 const UsuariosController = require('../src/controllers/UsuariosController');
 const bodyParser = require('body-parser');
 const HttpConstants = require('../src/helpers/constants/HttpConstants');
 const ErrorConstants = require('../src/helpers/constants/ErrorConstants');

 app.use(express.urlencoded({ extended: true }))
 app.use(bodyParser.json());

 app.get("/", (request, response, next) => {
    response.end("GET REQUEST");
 });

 app.post("/usuario/obtener", async (request, response, next) => {

    
    const userdata = await UsuariosController.obtenerUsuario(request);
    response.setHeader('Content-Type', 'application/json');     
    response.end(JSON.stringify(userdata));    
  
 });

 app.put("/", (request, response, next) => {
    response.end("GET REQUEST");
 });

 app.delete("/", (request, response, next) => {
    response.end("GET REQUEST");
 });

 /**
  * START WEBSERVICE
  */
app.listen(3000, () => {
    console.log("JAppsAI Web Service running on port 3000");    
});