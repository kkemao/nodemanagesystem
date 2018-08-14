var express = require('express');
var db = require('../db.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var sql = 'SELECT * FROM t_product_type';
  db.do(sql, function(err, rows){
    rows ? res.send({errCode: 0, data: rows}) : res.send({errCode: 1001, data: '获取产品类型失败'});
  });
});

module.exports = router;
