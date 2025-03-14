const authServices = require("../Services/login");

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const token = await authServices.login(email, password);
        res.json(token);
    } catch (err) {
        console.log(err);
        res.status(400).json('Error: ' + err);
    }
}
module.exports = {
    login
};