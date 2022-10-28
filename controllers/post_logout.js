export default async function PostLogoutController(req, res) {
        req.session.user = null
        res.redirect("/login");
}