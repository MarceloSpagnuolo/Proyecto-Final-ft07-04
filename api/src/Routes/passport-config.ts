import User from "../Models/users";

const LocalStrategy = require('passport-local').Strategy;

module.exports =  async function (passport:any){
   
    passport.use(
        new LocalStrategy({
            usernameField: 'email'
          },async (email:any,password:any,done:any)=>{
              
            try {
                //revisar sea un usuario registrado
                let usuario = await User.findOne({email});
                if(!usuario) return done(null,false);
                
                //revisar password
                const user = new User();
                const result = await user.comparePassword(password, usuario.password)

                if (result===true) {
                    const {_id,name,email,role,cohorte,standup} = usuario;

                    return done(null,{_id,name,email,role,cohorte,standup});

                }else{
                    return done(null,false);
                }
            } catch (error) {
                console.log(error)
            }  
        }) 
    );

}