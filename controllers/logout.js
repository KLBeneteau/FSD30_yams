export default function logout(req, res) {
    res.render("logout",  {user : req.session.user, flash : req.session.flash});
}