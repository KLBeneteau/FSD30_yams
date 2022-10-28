export default function home(req, res) {
  res.render("home", {user : req.session.user, flash : req.session.flash});
}
