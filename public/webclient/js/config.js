window.$IF = {
    environment: {
        "dev": {
            host: '127.0.0.1:8080',
            // apiServer: 'http://172.16.100.230:7099'
            // apiServer: 'http://192.168.11.100:7099'
            apiServer: 'http://192.168.2.196:7099'
        },
        "dev2": {
            host: '192.168.2.135:8080',
            // apiServer: 'http://192.168.11.100:7099'
            apiServer: 'http://192.168.2.196:7099'
         },
        "ifaas": {
            host: '192.168.11.100',
            apiServer: 'http://192.168.11.100:7099'
        },
        "internet": {
            host: '183.3.223.120:5080',
            apiServer: 'http://183.3.223.120:6799'
        }
    }
}