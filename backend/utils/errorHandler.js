function errorHandler(f){
    return async function(req, res){
        try{
            await f(req, res);
        }catch(e){
            if(e.code == 11000){
                return res.json({error : "Duplicate entry. User with this email already exists!"})
            }
            else if(e.name == "MongoServerError"){
                return res.json({error : "DataBase error, Enter your credentials properly!"});
            }
            return res.json({error : e.message || "error found"});
        }
    }
}

export default errorHandler;