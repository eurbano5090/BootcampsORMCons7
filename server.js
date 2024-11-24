
const conexion = require("./app/config/db.config.js");
const {createUser,findUserById, findAllUser,updateUserById,deleteUserById}= require("./app/controllers/user.controller.js");
const {createBootcamp,addUser,findBootcampById,findAllBootcamp}= require("./app/controllers/bootcamp.controller.js");

( async() => {
    try{
    await conexion.sync({alter: true});
   
    console.log("conectado correctamente");

    const user1 =  await createUser({ firstName: "Mateo",lastName: "Díaz ", email:"mateo.diaz@correo.com"});
    const user2 =   await createUser({ firstName: "Santiago",lastName: "Mejias ", email:"santiago.mejias@correo.com"});
    const user3 =   await createUser({ firstName: "Lucas",lastName: "Rojas ", email:"lucas.rojas@correo.com"});
    const user4 =  await createUser({ firstName: "Facundo",lastName: "Fernandez ", email:"facundo.fernandez@correo.com"});

    const bootcamp1 =  await createBootcamp({ title: "Introduciendo El Bootcamp De React.", cue:10 , description:"React es la librería más usada en JavaScript para el desarrollo deinterfaces."});
    const bootcamp2 =  await createBootcamp({ title: "Bootcamp Desarrollo Web Full Stack.", cue:12 , description:"Crearás aplicaciones web utilizando las tecnologías y lenguajes más actuales y populares, como:JavaScript, nodeJS, Angular,MongoDB, ExpressJS."});
    const bootcamp3 =  await createBootcamp({ title: "Bootcamp Big Data, Inteligencia Artificial & Machine Learning.", cue:18 , description:"Domina Data Science, y todo el ecosistema de lenguajes y herramientas de Big Data, e intégralos con modelos avanzados "});

    await addUser(1,1);
    await addUser(1,2);
    await addUser(2,1);
    await addUser(3,1);
    await addUser(3,2);
    await addUser(3,3);

    const bootcampById = await findBootcampById(2);
    console.log(JSON.stringify(bootcampById,null,2));

    const listBootcamp = await findAllBootcamp();
    console.log(JSON.stringify(listBootcamp, null,2));

     const userById = await findUserById(2);
     console.log(JSON.stringify(userById, null,2));

    const listUsers = await findAllUser(); 
    console.log(JSON.stringify(listUsers,null,2));

    await updateUserById(2,{lastName:"Pascal"});
   
    await deleteUserById(1);

    }catch(error){
        console.log(error.message);
    }
})()