module.exports = (services, bcrypt) => {
    const user_controller = {
        getAll: async (req, res) => {
            let result = await services.user.getAll();
            res.send(result);
        },
        register: async (req, res) => {
            const email = req.body.email;
            const password = req.body.password;
            const hashedPassword = await bcrypt.hash(password, 10)

            try {
                if (!email || !password)
                    res.status(400).json("missing parameters")
                else {
                    let result = await services.user.register([email, hashedPassword]);
                    let user = await services.user.getById(result.insertId);
                    await services.mailer.sendMail(user);
                    res.status(201).json("new user registered");
                }
            }
            catch (err) {
                res.status(400).json(err);
            }
        }
    }

    return user_controller;
}