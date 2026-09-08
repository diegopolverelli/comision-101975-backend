import passport from "passport"
import passportJWT from "passport-jwt"

const buscaToken=req=>{
    let token=null

    if(req.cookies.cookietoken){
        token=req.cookies.cookietoken
    }

    return token
}

export const inicializarPassport=()=>{

    // paso 1
    passport.use("current", new passportJWT.Strategy(
        {
            secretOrKey: "CoderCoder123", 
            jwtFromRequest: passportJWT.ExtractJwt.fromExtractors([buscaToken, ])
        }, 
        async(payload, done)=>{   // payload=user
            try {
                // return done(null, user)
                // return done(null, false)   // password incorrecto o fallo de validacion (no error)

                return done(null, payload)
                
            } catch (error) {
                return done(error)
            }
        }
    ))



    // paso 1'   // solo aplica si usamos sessions
    // passport.serializeUser()
    // passport.deserializeUser()

}