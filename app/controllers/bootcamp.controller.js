const {User,Bootcamp }= require("../models/index.js");

const conexion = require("../config/db.config.js")

const createBootcamp = (dataBootcamp)=>{
    return new Promise(async (resolve,reject)=>{
        try{
            const bootcamp = await Bootcamp.create(dataBootcamp);
            resolve(bootcamp);
        }catch(error){
            reject(error);
        }
    });
}

const addUser = async (bootcampId, userId) => {
    try {
      const bootcamp = await Bootcamp.findByPk(bootcampId);
      const user = await User.findByPk(userId);
  
      if (!bootcamp || !user) {
        throw new Error("Bootcamp o User no encontrados");
      }
  
      await bootcamp.addUser(user);  // Sequelize genera este método dinámicamente
      console.log("Usuario añadido al Bootcamp con éxito");
    } catch (error) {
      console.error(error);
    }
  };
  

const findBootcampById = (idBootcamp) => {
    
    return new Promise(async (resolve, reject) => {
        try {
            const curso = await Bootcamp.findByPk(idBootcamp, {
                include: {
                    model:User,
                    as: "users"
                }
            });
            resolve(curso);
        } catch (error) {
            reject(error);
        }
    })
}



const findAllBootcamp =()=>{
    return new Promise(async(resolve,reject)=>{
        try {
            const curso = await Bootcamp.findAll({
                include:{
                    model:User,
                    as:"users",
                    attributes: ["id", "firstName", "lastName"],
                    through: {
                      attributes: [],
                    }
                }
            });

            resolve(curso);
        } catch (error) {
            reject(error);
        }
    });
}


module.exports={createBootcamp,addUser,findBootcampById,findAllBootcamp};