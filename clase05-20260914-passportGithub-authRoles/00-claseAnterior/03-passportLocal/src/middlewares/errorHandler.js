export const errorHandler=(error, req, res, next)=>{


    res.setHeader('Content-Type','application/json');
    return res.status(error.statusCode?error.statusCode:500).json({
        error:error.message, 
        module: error.module?error.module:undefined,
    })
}