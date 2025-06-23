function errorHandler(f){
    return async function(req, res){
        try{
            await f(req, res);
        }catch(e){
            if(e.name == "MongoServerError"){
                return res.json({error : "DataBase error, check your fields properly"});
            }
            return res.json({error : e.message || "error found"});
        }
    }
}

export default errorHandler;