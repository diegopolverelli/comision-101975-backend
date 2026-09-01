import jwt from "jsonwebtoken"
export const auth=(req, res, next)=>{

    if(!req.headers.authorization){
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`No existen usuarios autenticados`})
    }

    // BEARER TOKEN
    // BEARER asdfasdfas.asdaf999adfadf.000padfsafda9
    let token=req.headers.authorization.split(" ")[1]

    try {
        let user=jwt.verify(token, "CoderCoder123")
        req.user=user
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`Credenciales invalidas: ${error.message}`})
    }


    next()
}