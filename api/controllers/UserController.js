/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	login: async function (req, res) {

        if (req.method == "GET") return res.view('user/login');
    
        if (typeof req.body.username === "undefined") return res.badRequest();
        if (typeof req.body.password === "undefined") return res.badRequest();
    
        var user = await User.findOne({ username: req.body.username });
    
        if (!user) {
            res.status(401);
            return res.send("User not found");
        }
        const match = await sails.bcrypt.compare(req.body.password, user.password);//password changed need compare!

        if (!match) {
            res.status(401);
            return res.send("Wrong Password");
        }
        // if (user.password != req.body.password) {
        //     res.status(401);
        //     return res.send("Wrong Password");
        // }
    
        req.session.regenerate(function (err) {
    
            if (err) return res.serverError(err);//handle error
    
            req.session.username = req.body.username;//save username to session 
    
            sails.log("Session: " + JSON.stringify(req.session) );//print in the console
            
            // return res.json(req.session);
            
            return res.ok("Login successfully");
    
        });
    
    },
    logout: async function (req, res) {

        req.session.destroy(function (err) {
            
            return res.ok("Log out successfully");
        });
    },
};

