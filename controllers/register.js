export default function register(req, res) {
    res.render("register", {user : req.session.user, flash : req.session.flash});
  }
  