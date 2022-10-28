export default function login(req, res) {
    res.render("login",  {user : req.session.user, flash : req.session.flash});
}