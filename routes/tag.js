var express = require('express');
var db = require('../db');
var router = express.Router();

/* 根据标签分类统计产品. */
var pco = {};
getProductCountObj();
function getProductCountObj() {
  pco = {};
  db.do('select count(1) as pcount,t.tag1, t.tag2 from t_product_info t where t.del = 0 group by t.tag2', function(err, rows){
    if(rows){
      rows.forEach(function(d, i){
        var pdc = parseInt(d.pcount);
        pco[d.tag2] = pdc;
        pco[d.tag1] = pco[d.tag1] ? (pco[d.tag1] + pdc) : pdc;
      })
    }
    setTimeout(getProductCountObj, 5000);
  });
}
/* 根据标签分类统计产品. */

/* 根据产品id获取标签. */
router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  var sql = 'SELECT * FROM t_tag_type t WHERE t.product_type_id = ? ORDER BY parent_id asc, id asc;';
  db.dowith(sql, [id], function(err, rows){
    res.send({errCode: 0, data: formTags(err, rows)});
  });
});

function formTags(err, rows){
  var data = [];
  if(rows){
    // sql语句先把一级标签排在前面，所以后面data foreach的时候一级菜单已经全部push到data上了
    rows.forEach(function(d, i){
      if(!d.parent_id){
        d.children = [];
        d.count = pco[d.id] ? pco[d.id] : 0;
        data.push(d);
      }else{
        data.forEach(function(v, j){
          if(d.parent_id == v.id){
            d.count = pco[d.id] ? pco[d.id] : 0;
            v.children.push(d);
          }
        });
      }
    });
  }
  return data;
}

router.get('/', function(req, res, next) {
  var sql = 'SELECT * FROM t_tag_type t ORDER BY parent_id asc, id asc;';
  db.do(sql, function(err, rows){
    res.send({errCode: 0, data: formTags(err, rows)});
  });
});

router.post('/add', function(req, res, next) {
  var data = req.body;
  console.log(req.body);
  if(!(data.id && data.name)){
    res.send({errCode: 1001, data: '参数不全'});
    return;
  }
  var sql = `INSERT into t_tag_type values(
              null, '${data.name}',
              ${data.filterTip ? 0 : 1},
              ${data.filterTip ? data.filterTip : null},
              ${data.id},
              '${new Date().format('yyyy-MM-dd hh:mm:ss')}', 1)`;
  db.do(sql, function(err, rows){
    if(!rows){
      res.send({errCode: 1001, data: '新增失败'});
      return;
    }
    res.send({errCode: 0, data: '新增成功', value: rows});
  });
});

router.post('/edit', function(req, res, next) {
  var data = req.body;
  if(!(data.id && data.name)){
    res.send({errCode: 1001, data: '参数不全'});
    return;
  }
  var sql = `UPDATE t_tag_type t set t.name = '${data.name}' where t.id = ${data.id}`;
  console.log(sql);
  db.do(sql, function(err, rows){
    if(!rows){
      res.send({errCode: 1001, data: '修改失败'});
      return;
    }
    res.send({errCode: 0, data: '修改成功', value: rows});
  });
});

router.delete('/delete/:id', function(req, res, next) {
  var id = req.params.id;
  var query_sql = `SELECT t.tag1, t.tag2 FROM t_product_info t GROUP BY t.tag2`;

  db.do(query_sql, function(err, rows){
    if(!rows){
      res.send({errCode: 1001, data: '数据库异常'});
      return;
    }else{
      var isUsed = false;
      rows.forEach(function(d, i){
        if(d.tag1 == id || d.tag2 == id)isUsed = true;
      });
      if(isUsed){
        res.send({errCode: 1001, data: '正在使用，无法删除'});
        return;
      }else{
        var sql = `DELETE FROM t_tag_type WHERE t_tag_type.id = ${id} or t_tag_type.parent_id = ${id}`;
        db.do(sql, function(err, rows){
          if(!rows){
            res.send({errCode: 1001, data: '删除失败'});
            return;
          }
          if(rows.affectedRows <= 0){
            res.send({errCode: 1001, data: '不存在或者已经删除'});
            return;
          }
          res.send({errCode: 0, data: '删除成功', value: rows});
        });
      }
    }
  });

});

module.exports = router;
