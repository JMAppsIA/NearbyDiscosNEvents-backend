/**
 * RESTFul Services NodeJS
 * Author: Jorge Herrera
 * Update: 07/04/2020
 */

 require('dotenv').config();
 const express = require('express');
 const app = express();
 const UsuariosController = require('../src/controllers/UsuariosController');
 const bodyParser = require('body-parser');
 

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

 app.post("/usuario/login", async (request, response, next) => {

    
   const loginuser = await UsuariosController.logueaUsuario(request);
   response.setHeader('Content-Type', 'application/json');     
   response.end(JSON.stringify(loginuser));    
 
}); 

 app.post("/usuario/crear", async (request, response, next) => {

    
   const createuser = await UsuariosController.crearUsuario(request);
   response.setHeader('Content-Type', 'application/json');     
   response.end(JSON.stringify(createuser));    
 
});

app.post("/usuario/actualizar", async (request, response, next) => {

    
   const createuser = await UsuariosController.actualizarUsuario(request);
   response.setHeader('Content-Type', 'application/json');     
   response.end(JSON.stringify(createuser));    
 
});

app.post("/usuario/eliminar", async (request, response, next) => {

    
   const deleteuser = await UsuariosController.eliminarUsuario(request);
   response.setHeader('Content-Type', 'application/json');     
   response.end(JSON.stringify(deleteuser));    
 
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