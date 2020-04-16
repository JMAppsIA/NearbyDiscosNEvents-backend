/**
 * RESTFul Services NodeJS
 * Author: Jorge Herrera
 * Update: 07/04/2020
 */

 require('dotenv').config();
 const express = require('express');
 const app = express();
 const UsuariosController = require('../src/controllers/UsuariosController');
 const DocumentoController = require('../src/controllers/DocumentoController');
 const bodyParser = require('body-parser');
 

 app.use(express.urlencoded({ extended: true }))
 app.use(bodyParser.json());

 app.post("/usuario/obtener", async (request, response, next) => {
    const userdata = await UsuariosController.obtenerUsuario(request.body);
    response.setHeader('Content-Type', 'application/json'); 
    if(userdata.error) {
      response.status(userdata.error.httpCode);
   } else{response.status(userdata.httpCode);}    
    response.send(JSON.stringify(userdata));    
  
 });

 app.post("/usuario/login", async (request, response, next) => {

    
   const loginuser = await UsuariosController.logueaUsuario(request.body);
   response.setHeader('Content-Type', 'application/json');
   if(loginuser.error) {
      response.status(loginuser.error.httpCode);
   } else{response.status(loginuser.httpCode);}
   //response.status(loginuser.httpCode);  

   response.send(JSON.stringify(loginuser));    
 
}); 

 app.post("/usuario/crear", async (request, response, next) => {

    
   const createuser = await UsuariosController.crearUsuario(request.body);
   response.setHeader('Content-Type', 'application/json');
   if(createuser.error) {
      response.status(createuser.error.httpCode);
   } else{response.status(createuser.httpCode);}     
   response.send(JSON.stringify(createuser));    
 
});

app.post("/usuario/actualizar", async (request, response, next) => {

    
   const updateuser = await UsuariosController.actualizarUsuario(request.body);
   response.setHeader('Content-Type', 'application/json');
   if(updateuser.error) {
      response.status(updateuser.error.httpCode);
   } else{response.status(updateuser.httpCode);}      
   response.send(JSON.stringify(updateuser));    
 
});

app.post("/usuario/eliminar", async (request, response, next) => {

    
   const deleteuser = await UsuariosController.eliminarUsuario(request.body);
   response.setHeader('Content-Type', 'application/json');
   if(deleteuser.error) {
      response.status(deleteuser.error.httpCode);
   } else{response.status(deleteuser.httpCode);}      
   response.send(JSON.stringify(deleteuser));    
 
});

app.post("/usuario/estado/cambiar", async (request, response, next) => {

    
   const changeuserstatus = await UsuariosController.cambiarEstadoUsuario(request.body);
   response.setHeader('Content-Type', 'application/json');
   if(changeuserstatus.error) {
      response.status(changeuserstatus.error.httpCode);
   } else{response.status(changeuserstatus.httpCode);}        
   response.send(JSON.stringify(changeuserstatus));    
 
});

app.post("/documento/tipo/obtener", async (request, response, next) => {

    
   const typedocument = await DocumentoController.obtenerTipoDocumento(request.body);
   response.setHeader('Content-Type', 'application/json');
   if(typedocument.error) {
      response.status(typedocument.error.httpCode);
   } else{response.status(typedocument.httpCode);}        
   response.send(JSON.stringify(typedocument));    
 
});


 /**
  * START WEBSERVICE
  */
app.listen(3000, () => {
    console.log("JAppsAI Web Service running on port 3000");
     
});