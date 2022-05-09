 
const mongoose = require('mongoose');


const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION);
        console.log('DB connected')
    } catch (error) {
        console.log(error)
        throw new Error('Error a la hora de inicializar DB')
    }
}

module.exports = {
    dbConnection
}