const SECRET = process.env.JWT_SECRET;
const authAdmin = async (req, res, next) => {
	console.log("Admin Check - User:", req.user); // Debugging
	if (req.user && req.user.userisadmin) {
		return next();
	} else {
		return res.status(403).send("Not Authorized As Admin");
	}
};
export default authAdmin;
