var express = require('express');
var db = require('../db');
require('../util/date');
var _t = require('../util/index')
var $IF = require('../config');
var router = express.Router();

    // 添加用户
    router.post('/add', function(req, res, next){
        console.log(req.body);
        var data = req.body;
        if(data && data.username && data.account && data.password && data.roleId){
            var sql = `insert into t_user_info 
                        (login, password, user_name, create_time, role_id, url) values(
                            '${data.account}',
                            '${data.password}',
                            '${data.username}',
                            '${new Date().format('yyyy-MM-dd hh:mm:ss')}',
                            '${data.roleId}',
                            '${data.fileUrl}')`;
            db.do(sql, function(err, rows){
                rows ? res.send({errCode: 0, data: '添加成功', value: rows}) : res.send({errCode: 1001, data: '添加失败'});
            });
        }else{
            res.send({errCode: 1001, data: ' 参数不全'});
        }
    });

    // 编辑用户
    router.post('/edit/:id', function(req, res, next){
        var id = req.params.id;
        var data = req.body;
        console.log(data);
        if(data && data.username && data.account && data.roleId){
            var sql = `update t_user_info t set
                        t.login = '${data.account}',
                        t.user_name = '${data.username}', 
                        t.create_time = '${new Date().format('yyyy-MM-dd hh:mm:ss')}', 
                        t.role_id = '${data.roleId}', 
                        t.url = '${data.fileUrl}'
                        where t.id = ${id}`;
                            console.log(sql);
            db.do(sql, function(err, rows){
                rows ? res.send({errCode: 0, data: '编辑成功', value: rows}) : res.send({errCode: 1001, data: '编辑失败'});
            });
        }else{
            res.send({errCode: 1001, data: ' 参数不全'});
        }
    });

    // 删除用户
    router.delete('/delete/:id', function(req, res, next){
        var id = req.params.id;
        if(id <= 3){
            res.send({errCode: 1001, data: '您无权删除该账号，删除失败'});
            return;
        }
        var sql = `delete from t_user_info where t_user_info.id = ${id}`;
            db.do(sql, function(err, rows){
                rows ? res.send({errCode: 0, data: '删除成功', value: rows}) : res.send({errCode: 1001, data: '删除失败'});
            });
    });

    // 获取所有用户
    router.get('/', function(req, res, next){
        var sql = `select u.id, u.login, u.user_name, u.create_time,
                    u.role_id, u.url, r.role_name from t_user_info u 
                    left join t_role_info r
                    on FIND_IN_SET(r.id , u.role_id)
                    ORDER BY id`;
        db.do(sql, function(err, rows){
            rows ? res.send({errCode: 0, data: rows}) : res.send({errCode: 1001, data: 'query error'});
        });
    });

    // 获取单个用户
    router.get('/:id', function(req, res, next){
        var sql = `select u.id, u.login, u.user_name, u.create_time,
                    u.role_id, u.url from t_user_info u where u.id = ${req.params.id}`;
        db.do(sql, function(err, rows){
            rows ? res.send({errCode: 0, data: rows}) : res.send({errCode: 1001, data: 'query error'});
        });
    });

        // 获取权限列表
    router.get('/role/all', function(req, res, next){
        var sql = 'SELECT * FROM t_role_info ORDER BY id';
        db.do(sql, function(err, rows){
            rows ? res.send({errCode: 0, data: rows}) : res.send({errCode: 1001, data: 'query error'});
        });
    });

module.exports = router;
