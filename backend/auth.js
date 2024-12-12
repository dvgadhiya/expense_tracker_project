const jwt = require('jsonwebtoken');
const JWT_SECRET = "deep@$1234"

function auth(req, res, next){
    const token = req.headers.token;
    decodedData = jwt.verify(token, JWT_SECRET);

    if (decodedData){
        req.user_Id = decodedData.id
        next()
    }
    else
    {
        res.json({
            message : "User cant be Authenticated"
        })
        return
    }

}

module.exports = {
    JWT_SECRET : JWT_SECRET,
    auth : auth
}