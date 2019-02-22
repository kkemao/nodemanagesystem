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

    // 修改密码
    router.post('/changepw/:id', function(req, res, next){
        var id = req.params.id;
        var data = req.body;
        console.log(data);
        if(data && data.username && data.account && data.password && data.newpassword){
            let sql = `select count(*) as c from t_user_info u 
                    where u.id = ${id} and u.password = '${data.password}' and u.login = '${data.account}'`;
                            console.log(sql);
            db.doPromise(sql)
                .then(function(rows){
                    // console.log('zkf-count', rows);
                    if(rows.length > 0 && rows[0]['c'] && rows[0]['c'] > 0){
                        let sql = `update t_user_info t set
                        t.password = '${data.newpassword}'
                        where t.id = ${id} and t.password = '${data.password}' and t.login = '${data.account}'`;
                        // console.log('zkf-sql', sql);
                        db.do(sql, function(err, rows){
                            rows ? res.send({errCode: 0, data: '修改成功', value: rows}) : res.send({errCode: 1001, data: '修改失败'});
                        });
                        delToken(id);
                    }else{
                        res.send({errCode: 1001, data: '当前密码输入不正确', value: rows})
                    }
                },function (err){
                    res.send({errCode: 0, data: '当前密码输入不正确', value: rows})
                });
        }else{
            res.send({errCode: 1001, data: ' 参数不全'});
        }
    });

    // 超级管理员通过高级管理修改密码
    router.post('/manage/changepw/:id', function(req, res, next){
        var id = req.params.id;
        var data = req.body;
        var token = req.headers.authorization;
        console.log(data);
        var sql = `select t.role_id from t_user_info t where login in (select login from t_token_info where t_token_info.token = '${token}');`;
        console.log('修改sql1', sql);
        db.do(sql, function(err, rows){
            if(rows && rows[0].role_id && rows[0].role_id == 1){
                if(data && data.account && data.password){
                    let sql = `select count(*) as c from t_user_info u 
                            where u.id = ${id} and u.login = '${data.account}'`;
                                    console.log('修改sql2', sql);
                    db.doPromise(sql)
                        .then(function(rows){
                            if(rows.length > 0 && rows[0]['c'] && rows[0]['c'] > 0){
                                let sql = `update t_user_info t set
                                t.password = '${data.password}'
                                where t.id = ${id} and t.login = '${data.account}' and t.role_id > 1`;
                                console.log('zkf-sql', sql);
                                db.do(sql, function(err, rows){
                                    console.log('zkf-rows', rows);
                                    if(rows && rows.affectedRows > 0){
                                        res.send({errCode: 0, data: '修改成功', value: rows});
                                        delToken(id);
                                    }else{
                                        res.send({errCode: 1001, data: '修改失败，请确认当前操作用户的权限以及被修改用户的权限'});
                                    }
                                });
                            }else{
                                res.send({errCode: 1001, data: '无法根据条件查询到所要修改的用户', value: rows})
                            }
                        },function (err){
                            res.send({errCode: 0, data: '当前密码输入不正确', value: rows})
                        });
                }else{
                    res.send({errCode: 1001, data: '缺少id或者account参数'});
                }
            }else{
                res.send({errCode: 1002, data: '您没有修改权限。'});
            }
        });
    });


    // 删除用户
    router.delete('/delete/:id', function(req, res, next){
        var id = req.params.id;
        // if(id <= 33333333){
        //     // res.send({errCode: 1001, data: '您无权删除该账号，删除失败'});
        //     res.send({errCode: 1001, data: '暂不支持删除账号，请联系管理员。'});
        //     return;
        // }
        var sql = `delete from t_user_info where t_user_info.id = ${id}`;
            db.do(sql, function(err, rows){
                rows ? res.send({errCode: 0, data: '删除成功', value: rows}) : res.send({errCode: 1001, data: '删除失败'});
            });
        
        // delete token
        delToken(id);
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

    function delToken(id) {
        var sql = `delete from t_token_info where t_token_info.login in (select login from t_user_info where t_user_info.id = ${id})`;
        db.do(sql, function(err, rows){
            console.log('token delete...', err, rows);
        });
    }
module.exports = router;
