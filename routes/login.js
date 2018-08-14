var express = require('express');
var db = require('../db');
require('../util/date');
var _t = require('../util/index')
var $IF = require('../config');
var router = express.Router();

/* 定时器 token管理. */
setInterval(function(){
    var sql = `delete from t_token_info where t_token_info.create_time < '${new Date(new Date().getTime() - $IF.tokenAlive).format('yyyy-MM-dd hh:mm:ss')}'`;
    db.do(sql, function(err, rows){});
}, 5000);
/* 定时器 token管理. */

/* GET home page. */
router.all('*', function(req, res, next) {
    var userAddress = req._remoteAddress.replace('::ffff:', '');
    if(req.baseUrl.indexOf('/login') != -1){
        var uuid = _t.getUuid();
        var sql_query = `select * from t_user_info where login = '${req.body.username}' and password = '${req.body.password}'`;
        db.do(sql_query, function(err, rows1){
            if(!rows1 || rows1.length <= 0){
                res.send({errCode: 1001, data: '登录失败，用户名或者密码错误。', result: rows1})
                return;
            }
            var sql = `insert into t_token_info ( token, login, create_time, login_address ) values('${uuid}', '${req.body.username}', '${new Date().format('yyyy-MM-dd hh:mm:ss')}', '${userAddress}')`;
            db.do(sql, function(err, rows2){
                rows2 ? res.send({errCode: 0, data: '登录成功。', userinfo: rows1, token: uuid}) : res.send({errCode: 1001, data: '服务异常', value: rows2});
            });
        });
    }else{
        if(!$IF.checkToken){
            // 配置文件中不检查token的话直接跳过判断
            next();
        }else{
            var token = req.headers.authorization;
            if(!token){
                res.send({errCode: 1002, data: '非法操作，请先登录。'})
            }else{
                var sql = `select count(1) as count from t_token_info where t_token_info.token = '${token}'`;
                db.do(sql, function(err, rows){
                    if(rows && rows[0].count >= 1){
                        next();
                        updateToken(token);
                    }else{
                        res.send({errCode: 1002, data: '非法操作，请先登录。'});
                    }
                });
            }
        }
    }
});

function updateToken(token){
    var sql = `update t_token_info set t_token_info.create_time = '${new Date().format('yyyy-MM-dd hh:mm:ss')}' where t_token_info.token = '${token}'`;
    db.do(sql, function(err, rows){
        if(rows)console.log('token last use time update success', token);
    });
}
module.exports = router;
