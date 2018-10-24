// isAdmin.js
module.exports = async function (req, res, proceed) {

    const username = req.session.username || null;      //look to session username

    if (username == 'admin') {  //only admin access the process
        return proceed();   //proceed to the next policy,       see create page
    }

    //--•
    // Otherwise, this request did not come from a logged-in user.
    return res.forbidden();

};