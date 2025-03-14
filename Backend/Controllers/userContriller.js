const userServices = require('../Routes/UserRoutes');

async function createUser(req, res) {
    try {
        const { username, email, address, phoneNumber, password } = req.body;
        const newUser = await userServices.createUser(username, email, address, phoneNumber, password);
        res.status(201).json(newUser);
    } catch (err) {
        console.log(err);
        res.status(400).json('Error: ' + err);
    }
}