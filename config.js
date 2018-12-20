var $IF = {
    port: 7099,
    checkToken: true,
    tokenAlive: 1800000,
    mysql: {
        host: '192.168.11.100',
        // host: 'localhost',
        user: 'root',
        password: 'intellif.com',
        database: 'intellif_productlab'
    }
}

module.exports = $IF;
