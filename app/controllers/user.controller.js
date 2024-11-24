const {User,Bootcamp }= require("../models/index.js");

const createUser = (dataUser)=>{
    return new Promise(async (resolve,reject)=>{
        try{
            const user = await User.create(dataUser);
            resolve(user);
        }catch(error){
            reject(error);
        }
    });
}

const findUserById = (idUser) => {
    
    return new Promise(async (resolve, reject) => {
        try {
            const curso = await User.findByPk(idUser, {
                include: {
                    model:Bootcamp,
                    as: "bootcamps"
                }
            });
            resolve(curso);
        } catch (error) {
            reject(error);
        }
    });
}

const findAllUser =()=>{
    return new Promise(async(resolve,reject)=>{
        try {
            const curso = await User.findAll({
                include:{
                    model:Bootcamp,
                    as:"bootcamps",
                    attributes: ["title", "description"],
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

const updateUserById = async (userId,updateData) => {
    try {
      const user = await User.findByPk(userId);
  
      if (!user) {
        throw new Error("Bootcamp o User no encontrados");
      }
      user.update(updateData)
      await user.save(); 
      console.log("user modificado con exito")
    } catch (error) {
        console.error(error);
      }
    };

 const deleteUserById = async (userId) => {
        try {
          const user = await User.findByPk(userId);
      
          if (!user) {
            throw new Error("Bootcamp o User no encontrados");
          }
          await user.setBootcamps([]);
          await user.destroy();
         
          console.log("user eliminado con exito")
        } catch (error) {
            console.error(error);
          }
    };



module.exports={createUser,findUserById,findAllUser,updateUserById,deleteUserById};