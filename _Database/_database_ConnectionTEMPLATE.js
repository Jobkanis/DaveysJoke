module.exports = function(mysql) {
    return {
        Onlineconnection: mysql.createConnection({
            host: '',
            user: '',
            password: '',
            database: ''
        }),

        Offlineconnection: mysql.createConnection({
            host: '',
            user: '',
            password: '',
            database: ''
        })
    }
}