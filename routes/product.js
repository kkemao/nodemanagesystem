var express = require('express');
var bodyParser = require('body-parser');
require('../util/date');
var db = require('../db');
var router = express.Router();


var urlencodedParser = bodyParser.urlencoded({ extended: false })

/* GET home page. */
router.get('/info', function(req, res, next) {
  var sql = 'SELECT * FROM t_product_info t where t.del = 0 ORDER BY create_time DESC';
  db.do(sql, function(err, rows){
    rows ? res.send({errCode: 0, data: rows}) : res.send({errCode: 1001, data: '查询失败'});
  });
});

// 根据id获取产品信息
router.get('/info/:id', function(req, res, next) {
  var id = req.params.id;
  var sql = 'SELECT * FROM t_product_info t WHERE t.del = 0 and t.type = ?;';
  db.dowith(sql, [id], function(err, rows){
    rows ? res.send({errCode: 0, data: rows}) : res.send({errCode: 1001, data: '查询失败'});
  });
});

router.post('/info/query', function(req, res, next) {
  var id = req.body.type ? ' and t.type = ' + req.body.type : ' ';
  var tag1 = req.body.filterTip ? ' and t.tag1 = ' + req.body.filterTip : ' ';
  var tag2 = req.body.subTip ? ' and t.tag2 = ' + req.body.subTip : ' ';
  var queryString = req.body.queryString || '';
  var likeValue = queryString == '' ? '' : ' and t.name like "%' + queryString + '%"'
  var sql = 'SELECT * FROM t_product_info t WHERE t.del = 0 '+ id + tag1 + tag2 + likeValue + ' ORDER BY t.create_time DESC';
  console.log(sql);
  db.do(sql, function(err, rows){
      res.send(rows ? {errCode: 0, data: rows} : {errCode: 1001, data: []});
  });
});

// 根据id更新产品信息
router.post('/info/update', function(req, res, next) {
  var data = req.body;
  if(!(data.id &&
    data.selectCata &&
    data.productName &&
    data.filterTip &&
    data.subTip)){
    res.send({errCode: 1001, data: {
      message: '请填写完整的参数'
    }});
    return;
  }
  var sql = `update t_product_info t
            set t.type = '${data.selectCata}',
            t.name = '${data.productName}',
            t.image = '${data.image}',
            t.scene = '${data.file}',
            t.tag1 = '${data.filterTip}',
            t.tag2 = '${data.subTip}',
            t.description = '${data.productIntroduce}',
            t.url = '${data.productLink}',
            t.online_time = '${data.createTime || new Date().format('yyyy-MM-dd hh:mm:ss')}',
            t.scene_type = '${data.fileType}',
            t.developer = '${data.designer}'
            where t.id = '${data.id}'
            `;
  console.log(sql);
  db.do(sql, function(err, rows){
    if(rows){
      res.send({errCode: 0, data: {
        message: '更新成功',
        value: rows
      }});
    }else{
      res.send({errCode: 1001, data: {
        message: '更新失败'
      }});
    }
  });
});

// 插入数据
router.post('/info/add', urlencodedParser, function(req, res, next) {
  var data = req.body;
  var params = [
    data.selectCata,
    data.productName,
    data.image,
    data.fileType,
    data.file,
    data.filterTip,
    data.subTip,
    '',
    data.productIntroduce,
    data.productLink,
    data.createTime || new Date().format('yyyy-MM-dd hh:mm:ss'),
    new Date().format('yyyy-MM-dd hh:mm:ss'),
    data.designer
  ];
  // var sql = 'insert into t_product_info values(null, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0);';
  var sql = `insert into t_product_info values(null, '${data.selectCata}', '${data.productName}', '${data.image}', '${data.fileType}', '${data.file}', '${data.filterTip}', '${data.subTip}', "", '${data.productIntroduce}', '${data.productLink}', '${data.createTime}', '${data.createTime}', '${data.designer}', '0')`;
  db.dowith(sql, params, function(err, rows){
    var obj = rows ? {errCode: 0, data: {
      message: '添加成功',
      value: rows
    }} : {errCode: 1001, data: {
      message: '添加失败',
      value: rows
    }}
    res.send(obj);
  });
});

router.delete('/info/:id', function(req, res, next) {
  var id = req.params.id;
  // var sql = 'DELETE FROM t_product_info WHERE t_product_info.id = ?;';
  var sql = 'UPDATE t_product_info t set t.del = 1 WHERE t.id = ' + id;
  db.do(sql, function(err, rows){
    rows ? res.send({errCode: 0, data: rows}) : res.send({errCode: 1001, data: '删除失败'});
  });
});

module.exports = router;
