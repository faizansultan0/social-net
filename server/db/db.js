const mongoose = require('mongoose');

// DataBase Connection
const dataBaseConnection = () => { mongoose.connect(process.env.DBURI, {})
    .then(() => console.log('Database Connected...'))
    .catch(err => console.log('Database Connection ERR: ', err))
}

module.exports = dataBaseConnection;