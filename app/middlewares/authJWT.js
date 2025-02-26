const db = require("../models");
const jwt = require("jsonwebtoken");
const User = db.users;

const verifyToken = (req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        jwt.verify(req.headers.authorization.split(' ')[1], process.env.API_SECRET, function (err, decode) {
            if (err) req.user = undefined;
            User.findOne({
                _id: decode.id
            })
                .exec((err, user) => {
                    if (err) {
                        res.status(500)
                            .send({
                                message: err
                            });
                    } else {
                        user.password = undefined
                        req.user = user;
                        next();
                    }
                })
        });
    } else {
        req.user = undefined;
        res.status(401)
            .send({
                message: 'Not Authorized'
            });
        res.end()
    }
};

module.exports = verifyToken;