import app from "./app.js";

//const express = require('express');
/*import express from 'express';

const app = express()
app.listen(3000)
console.log('servidor corriendo en el puerto 3000')*/


const main=()=>{
    app.listen(app.get("port"));
    console.log(`el server esta corriendo en el puerto ${app.get("port")}`);
}
main();