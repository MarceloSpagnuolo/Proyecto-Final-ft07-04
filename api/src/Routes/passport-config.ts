import User from "../Models/users";
import Cohorte from "../Models/cohorte";
import Group from "../Models/groups";

const LocalStrategy = require('passport-local').Strategy;

module.exports =  async function (passport:any){
   
    passport.use(
        new LocalStrategy({
            usernameField: 'email'
          },async (email:any,password:any,done:any)=>{
            
            try {
                //revisar sea un usuario registrado
                await User.findOne({email:email},async function (err:any, users:any) {
                    Cohorte.populate(users, { path: "cohorte" }, async function (err:any, usersCH:any) {
                        Group.populate(usersCH, { path: "standup" }, async function (err:any, usersCOM:any) {

                            if(!usersCOM) return done(null,false);
                    
                            //revisar password
                            const user = new User();
                            const result =  await user.comparePassword(password, usersCOM.password)
                            
                            if (result===true) {
                                const {_id,name,email,role,cohorte,standup} = usersCOM;
            
                                return done(null,{_id,name,email,role,cohorte,standup});
            
                            }else{
                                return done(null,false);
                            } 

                        });
                    });
                });
               
            } catch (error) {
                console.log(error)
            }  
        }) 
    );

}