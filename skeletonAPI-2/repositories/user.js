// const bcrypt = require('bcrypt');

module.exports = (models) => {

    const user_repository = {
        getAll: async (data) => {
            return models.user.query("select * from Users");
        },
        register: async (data) => {
            // const password = data[1];
            // const hashedPassword = await bcrypt.hash(password, 10)

            return models.user.query(`INSERT INTO Users(email, password) VALUES (?, ?)`, data)
        },
        getById: async (id) => {
            return models.user.query("select * from Users where id = ? LIMIT 1", [id]);
        }
    }
    
    return user_repository;
}
