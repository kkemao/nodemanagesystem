/*
Navicat MySQL Data Transfer

Source Server         : 192.168.11.100
Source Server Version : 50616
Source Host           : 192.168.11.100:3306
Source Database       : intellif_productlab

Target Server Type    : MYSQL
Target Server Version : 50616
File Encoding         : 65001

Date: 2018-09-27 10:39:33
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_product_info
-- ----------------------------
DROP TABLE IF EXISTS `t_product_info`;
CREATE TABLE `t_product_info` (
  `id` bigint(64) NOT NULL AUTO_INCREMENT,
  `type` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `scene_type` varchar(255) DEFAULT NULL,
  `scene` varchar(255) DEFAULT NULL,
  `tag1` bigint(64) DEFAULT NULL,
  `tag2` bigint(64) DEFAULT NULL,
  `attention` varchar(2048) DEFAULT NULL,
  `description` varchar(2048) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `online_time` datetime NOT NULL COMMENT 'product online time',
  `create_time` datetime NOT NULL COMMENT 'create data time',
  `developer` varchar(1024) DEFAULT NULL,
  `del` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_product_info
-- ----------------------------
INSERT INTO `t_product_info` VALUES ('1', '1', '旅检人员智能人像演示系统', '/uploads/d0cab7c3-dc27-499a-89bb-f22a7a2e0fa0.png', 'video', '/uploads/aeb49aae-90b9-4c42-ae3e-d79cbfd89b53.mp4', '5', '18', '', '该应用可接入实时视频流，对视频流中的人员进行实时识别，对染疫人员、水客前科、高频次往返人员进行实时识别，并在视频流中进行打框标注', '333333', '2018-06-28 16:00:00', '2018-06-28 16:00:00', '王健、曾科凡、陈建、陈信、黄建斌', '0');
INSERT INTO `t_product_info` VALUES ('2', '1', '人体结构化演示', '/uploads/b08e8c1c-db1d-4c41-9c2e-3cdc178d31a6.png', 'img', '/uploads/83aa717f-954d-4131-899a-367fbe56e8e8.jpeg', '5', '17', '', '该应用可接入多路实时视频流，对视频流中的人体进行采集，并支持对采集人体的拖拽以图搜图\r\n演示地址：http://192.168.11.188/ifaas/WebClient/71.html \r\n用户名：test123 密码test123', 'http://192.168.11.188/ifaas/WebClient/71.html ', '2018-07-04 00:00:00', '2018-07-04 00:00:00', '付凌志、刘国伟、王健、曾颖杰、吕旭涛、陈卓州、刘涛', '0');
INSERT INTO `t_product_info` VALUES ('3', '1', '视频质量检测工具', '/uploads/95ab1cf1-cb33-4d2d-a4ef-6bf08f71446f.png', 'img', '/uploads/e9b726a1-1e28-4c67-858a-0ef5b679c57e.png', '5', '19', '', 'Window 64位免安装软件，可同时多个视频文件、在线视频流进行视频质量分析，通过算法检测和分析判断视频中符合识别要求人脸，给出视频质量分数', '', '2018-08-01 00:00:00', '2018-08-01 00:00:00', '刘涛、曾颖杰', '0');
INSERT INTO `t_product_info` VALUES ('4', '1', '场馆安保应用', '/uploads/00ceb23b-ad11-4a1b-89df-b8fca4e59671.png', 'img', '/uploads/3881e39e-17fd-4c38-8b8e-9b71513ee16d.png', '4', '10', '', '应用场景：\r\n针对大型场馆安保活动，落实每个观众的实名信息，实现对人数的精确统计，并且对重点人员进行实时比对告警\r\n\r\n功能介绍：\r\n通过第三方推送的实时人像、身份证照片、票面座位信息，将身份证号与在逃库身份证号进行比对，比中则产生告警信息；落实票面的座位信息，并在场馆示意图上展示每个区域的实到人数和总人数；人员入场的实时比对信息在界面上动态刷新显示\r\n\r\n', '', '2018-07-18 19:14:56', '2018-07-18 19:14:56', '王成、丁昌庆、尹鹏', '0');
INSERT INTO `t_product_info` VALUES ('5', '1', '入境人员非法从业分析', '/uploads/b14f5521-815f-4593-9e5e-928e5ea98de3.png', 'video', '/uploads/6ac10b2e-e801-4842-8c3b-10c13e91df32.mp4', '4', '10', '', '应用场景：\r\n针对辖区内持非从业签证人员从事非法从业活动的挖掘\r\n\r\n功能介绍：\r\n建立持有非从业签证的人员的重点人员库\r\n对每个重点人员进行出行规律分析和统计，对于符合从业规律的人员进行预警', '', '2018-07-14 19:14:56', '2018-07-14 19:14:56', '王成、丁昌庆、尹鹏', '0');
INSERT INTO `t_product_info` VALUES ('6', '1', '流窜人员挖掘', '/uploads/65b9fa7b-b085-45e5-81de-98aa56c83a5d.png', 'img', '/uploads/fc1385f8-7920-48b7-8e52-42e5f67842ef.jpeg', '4', '10', '', '应用场景：\r\n针对涉毒、涉黄、涉毒人员流窜作案的挖掘\r\n\r\n功能介绍：\r\n在辖区类范围内，10天内有5天以上出现在1个或者多个重点场所的人员进行分析，并支持对人员进行打标签，人员类型分类显示（未分类/涉毒/涉黄/涉赌/快递/保洁/其他），人员身份落地', '', '2018-08-01 19:14:56', '2018-08-01 19:14:56', '王成、丁昌庆、尹鹏', '0');
INSERT INTO `t_product_info` VALUES ('7', '1', '前科人员进入场所预警', '/uploads/82a4cae4-0b1d-499d-87f1-a34c09a3d242.png', 'video', '/uploads/0aba7278-cb28-4414-8dbd-6b72b236aa50.mp4', '4', '10', '', '应用场景：\r\n对前科人员再次出入重点场所进行关注\r\n\r\n功能介绍：\r\n对辖区内的黄、赌、毒前科人员进行管控，场所内摄像机抓拍的人员与前科相似度达到93%以上（可调）则产生告警，告警信息会通过社区警务APP推送到辖区民警。辖区民警可以根据其出现的历史记录和频率确定是否需要对其出警', ' ', '2018-08-01 19:14:56', '2018-08-01 19:14:56', '王成、丁昌庆、尹鹏', '0');
INSERT INTO `t_product_info` VALUES ('8', '1', '1122', '/uploads/817b80dd-252f-4570-83c1-e1ceaf46e2c2.jpeg', 'img', '/uploads/594d7dd2-3fe6-4c2d-879b-b65342f223db.jpeg', '1', '2', '', '222', '3333', '2018-08-02 18:54:59', '2018-08-02 18:54:59', '333333', '1');
INSERT INTO `t_product_info` VALUES ('9', '1', '目标分析', '/uploads/a7dfd828-78d5-4241-90b7-e2043a19bdd3.png', 'video', '/uploads/e2e75c89-b48f-4dce-bf77-77019f4fecc9.mp4', '1', '3', '', '通过已知人像图片，分析图片目标的轨迹，活动场所，同行人员；', 'http://192.168.11.100:8066/deepEye/analysis/personalAnalysis', '2018-07-04 19:00:38', '2018-08-02 19:00:38', '曾科凡，雷元生等', '0');
INSERT INTO `t_product_info` VALUES ('10', '1', '1', 'undefined', 'video', '/uploads/aaeafb68-4238-4a55-bf55-f363bf260e4d.mp4', '1', '0', '', '', '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '', '1');
INSERT INTO `t_product_info` VALUES ('11', '1', '1', 'undefined', 'video', '/uploads/aaeafb68-4238-4a55-bf55-f363bf260e4d.mp4', '1', '0', '', '', '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '', '1');
INSERT INTO `t_product_info` VALUES ('12', '1', '1', 'undefined', 'video', '/uploads/aaeafb68-4238-4a55-bf55-f363bf260e4d.mp4', '1', '0', '', '', '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '', '1');
INSERT INTO `t_product_info` VALUES ('13', '1', '1', 'undefined', 'video', '/uploads/aaeafb68-4238-4a55-bf55-f363bf260e4d.mp4', '1', '0', '', '', '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '', '1');
INSERT INTO `t_product_info` VALUES ('14', '1', '人脸采集属性过滤', '/uploads/ba0e0776-799c-4e92-91f3-507427bebb76.png', 'video', '/uploads/b6cc74cd-f747-4ec0-866f-2f1da9ff753e.mp4', '1', '2', '', '针对人脸属性（年龄，性别，眼镜，墨镜，帽子，民族）进行采集过滤显示；\r\n\r\n过滤的结果可以根据精度（高，中，低）来显示。', '', '2018-07-01 00:00:00', '0000-00-00 00:00:00', '彭齐荣，曾科凡，陈信，王健等', '0');
INSERT INTO `t_product_info` VALUES ('15', '1', '人流量异常告警', '/uploads/69c0265c-9187-4d5a-94ae-abb31e075118.png', 'video', '/uploads/95a399ce-1520-461f-945e-e8dfe7f5303c.mp4', '4', '10', '', '民警通过辖区内人脸总数排行，可以了解需要重点关注的场所；\r\n针对具体场所，可以查看人数异常告警；\r\n\r\n功能介绍：\r\n以派出所为单位，展现辖区内所有二三类场所人脸总数排序\r\n以派出所为单位，展现辖区内最近1周所有二三类场所人脸总数排序\r\n以场所为单位，展现该场所人脸数24小时内采集变化曲线\r\n以场所为单位，展现该场所最近一月内每日人流量变化曲线、平均曲线、告警曲线;告警曲线=平均曲线x 1.3', '', '2018-07-04 10:58:41', '2018-08-03 10:58:41', '王成、丁昌庆、尹鹏', '0');
INSERT INTO `t_product_info` VALUES ('16', '1', '多名前科人员进入同一场所告警', '/uploads/ac83ca04-8acb-4f23-802d-d1ffa0ab91c1.png', 'img', '/uploads/a2060dcc-03ab-41a1-8591-7faa173a80d3.jpeg', '4', '10', '', '应用场景：对于聚众赌博、聚众吸毒、涉黄等前科人员进行管控\r\n\r\n功能介绍：多个前科人员在一周内任意30分钟内到达同一场所则告警。分别为涉黄2人在30分钟内到达同一场所则告警，涉毒2人，涉赌3人。 默认相似度93%（可调）', '', '2018-07-04 10:59:57', '2018-08-03 10:59:57', '王成、丁昌庆、尹鹏', '0');
INSERT INTO `t_product_info` VALUES ('17', '1', '频繁出入人员挖掘', '/uploads/2043cae6-9ba6-48b6-ad55-c6093cffbfaa.png', 'video', '/uploads/30f3a67b-7f2a-4995-a2c8-d10eb3fb3ef5.mp4', '4', '10', '', '识别在某一场所经常出入的人员，过滤从业人员，发现新的黄赌毒人员\r\n \r\n分析出20天内有10天以上出现在该场所的人员,可对经常出入该场所的人员进行打标签（未分类/涉毒/涉黄/涉赌/快递/保洁/其他），过滤掉从业人员后即剩余需要重点关注的对象；并支持对未确认身份人员进行静态融合身份落地\r\n ', '', '2018-07-04 12:09:38', '2018-08-03 12:09:38', '王成、丁昌庆、尹鹏', '0');
INSERT INTO `t_product_info` VALUES ('18', '1', '搜索结果属性过滤', '/uploads/9380cceb-d183-4b08-aedc-889dcf79a0bf.png', 'video', '/uploads/45f8a32b-e5f4-4b5c-93cb-db6dfb1124b7.mp4', '1', '2', '', '在海量搜索结果中，可以针对图像的特征进行性别，年龄，眼镜，帽子等属性来进行进一步的范围缩小，帮助用户更快速，更精准的寻找目标。', '', '2018-07-01 15:30:41', '2018-07-01 15:30:41', '彭齐荣，曾科凡，陈信，王健等', '0');
INSERT INTO `t_product_info` VALUES ('19', '1', '人员徘徊分析', '/uploads/ecbc29a5-1569-4bc3-8bb8-980c9845dc44.png', 'video', '/uploads/90e69adf-169b-4d6a-ba5a-fd18effe4ef5.mp4', '1', '3', '', '指定一个区域，分析在该区域内经常出现的人员，并分析人员的出行规律。', '', '2018-07-05 16:15:06', '2018-07-05 16:15:06', '雷元生，杨阿亮，曾科凡，陈尚杰', '0');
INSERT INTO `t_product_info` VALUES ('20', '1', '数据碰撞分析', '/uploads/968fc465-c71b-41b1-8224-4440af17bd3f.png', 'video', '/uploads/5da99fe3-001a-432d-a117-8ec413463b67.mp4', '1', '3', '', '搜寻在在不同时间，不同地点范围下的是否有同一个人员出现；\r\n\r\n适用场景：串并案分析；', '', '2018-07-06 16:31:39', '2018-07-06 16:31:39', '雷元生，杨阿良，陈尚杰，曾科凡', '0');
INSERT INTO `t_product_info` VALUES ('21', '1', '结构化引擎性能指标', '/uploads/422af04f-b272-4609-8abb-11e51870fc59.png', 'img', '/uploads/6ca17aa4-b41d-427f-8731-23fcaac81d13.png', '6', '20', '', '结构化引擎指标更新日期为2018年8月1日', '', '2018-08-03 16:35:00', '2018-08-03 16:35:00', '王健，曾佐祺等', '0');
INSERT INTO `t_product_info` VALUES ('22', '1', '布控引擎性能指标', '/uploads/3293161a-881b-4846-9be7-d5e68d7795bc.png', 'img', '/uploads/b67b22ed-ddf4-4bda-8ead-a5c704ec184f.png', '6', '21', '', '布控引擎版本随深目2.1版本同步发布；', '', '2018-07-13 16:44:24', '2018-07-13 16:44:24', '钟攀攀，陈信，陈尚杰', '0');
INSERT INTO `t_product_info` VALUES ('23', '1', '搜索引擎性能指标', '/uploads/693bbc86-2f9c-45f5-9cc7-bea786dc6355.png', 'img', '/uploads/b98b8c37-4f57-40d1-97b3-ebaeef5d437e.png', '6', '22', '', '基于ANN与全量检索的搜索引擎，随深目2.1版本同步发布；', '', '2018-07-13 16:47:51', '2018-07-13 16:47:51', '彭齐荣，刘国伟，赵猛，彭程', '0');
INSERT INTO `t_product_info` VALUES ('24', '1', '一人一档', '/uploads/30104921-87b5-4dac-873a-0f6dceddc960.png', 'video', '/uploads/a8760347-9d0a-4dbc-be21-8ec34137b1dc.mp4', '1', '3', '', '针对海量无序的图片，通过聚类的方式，根据人脸的相识度，将所有人脸图片归类，划分成不同的人，最终每个人将会形成一个档案，该档案中包含该人的所有人脸信息，从而可以对该人的行为、轨迹、社会关系等进行分析。\r\n\r\n同时还可以利用静态库等手段，将该人员的身份信息落地，形成实名的一人一档；', '', '2018-08-04 20:43:29', '2018-08-04 20:43:29', '赵猛、王义等', '0');
INSERT INTO `t_product_info` VALUES ('25', '1', 'AI+交通管理系统', '/uploads/50efb5b1-1902-484c-80fe-576bcad4596c.png', 'video', '/uploads/15582a35-e2ba-4acb-b6e7-d67dd539171c.mp4', '4', '11', '', '近年来由于摩托车、电动车、非机动车、行人等违法造成的道路交通事故居高不下，为了降低道路事故率，营造良好的交通环境，结合科技的发展趋势，采取AI+交通管理的模式，推出了针对复杂的道路交通环境中的摩托车、电动车、非机动车、行人等违法行为的解决方案。\r\n针对非机动车上机动车道进行前后照片，人脸照片，车牌照片形成2+2的违法证据，通过各种静态数据来落地违法人员的身份信息，为非机动车违法提供有力证据。', '', '2018-08-31 08:54:27', '2018-08-31 08:54:27', '张航，陈建等', '0');
INSERT INTO `t_product_info` VALUES ('26', '1', '1', '/uploads/6e66f17c-de31-4841-8f0e-e806935ec486.jpeg', 'video', '/uploads/4f336b94-33ff-4db8-8fc9-1cfe3fcd1e1d.mp4', '1', '3', '', '111', '22', '2018-08-06 17:27:54', '2018-08-06 17:27:54', '3', '1');
INSERT INTO `t_product_info` VALUES ('27', '1', '333', '/uploads/a36b9d1f-30d7-4be8-b5f4-039223ea71c1.jpeg', 'img', '/uploads/8f0eee6d-580a-4967-8253-9be928248da6.jpeg', '5', '19', '', '333', '333', '2018-08-06 18:08:06', '2018-08-06 18:08:06', '333', '1');
INSERT INTO `t_product_info` VALUES ('28', '1', '产品发布平台2.0', '/uploads/9760d47a-f008-4044-b9c8-ec3f158fa635.png', 'video', '/uploads/a64e16cb-e68f-455b-a8c5-e224f6bc8f24.mp4', '1', '3', '', '产品发布平台-2.0', '', '2018-08-31 15:43:07', '2018-08-31 15:43:07', '曾科凡等', '1');
INSERT INTO `t_product_info` VALUES ('29', '1', 'API开放平台', '/uploads/4e427d92-03a9-43f9-a471-68244bd840df.png', 'img', '/uploads/d6b0a068-db6a-47cc-8ed8-d7ed87cdf1d4.png', '6', '72', '', '提供深目1.5.2版本的API对外接口文档；\r\n访问地址：http://192.168.11.186/ifaas/OpenDeepEyeWeb/#/\r\n', 'http://192.168.11.186/ifaas/OpenDeepEyeWeb/#/', '2018-08-10 21:25:20', '2018-08-10 21:25:20', '陈信，李兰等', '0');
INSERT INTO `t_product_info` VALUES ('30', '1', '1', '/uploads/a771e6c3-16f3-4b86-98a2-1e993f52ff2d.png', 'img', '/uploads/b38a95e7-b1fb-494d-8130-49ffafd9c391.png', '1', '2', '', '111111', 'http：//www.baidu.com', '2018-08-20 11:16:02', '2018-08-20 11:16:02', '111', '1');
INSERT INTO `t_product_info` VALUES ('31', '1', '视频结构化', '/uploads/0a78a5de-fe3c-4027-8d3a-1df695cce459.jpeg', 'video', '/uploads/3a4cca35-c52e-4cdb-a754-810d09a400c2.mp4', '5', '17', '', '针对多维数据的结构化，其中包括对人脸，人脸属性（年龄，性别，眼镜，帽子，种族），人体，人体属性（服装，服装颜色，携带物），车辆的结构化，实现对结构化数据的采集呈现，搜索，过滤，分析等应用；', '', '2018-11-30 10:10:33', '2018-11-30 10:10:33', '', '0');

-- ----------------------------
-- Table structure for t_product_type
-- ----------------------------
DROP TABLE IF EXISTS `t_product_type`;
CREATE TABLE `t_product_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'product id',
  `product_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_product_type
-- ----------------------------
INSERT INTO `t_product_type` VALUES ('1', '公共安全');
INSERT INTO `t_product_type` VALUES ('2', '智慧社区');
INSERT INTO `t_product_type` VALUES ('3', '民用扩展');
INSERT INTO `t_product_type` VALUES ('4', '智能硬件');

-- ----------------------------
-- Table structure for t_role_info
-- ----------------------------
DROP TABLE IF EXISTS `t_role_info`;
CREATE TABLE `t_role_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_role_info
-- ----------------------------
INSERT INTO `t_role_info` VALUES ('1', '超级管理员', '系统最高级别管理员');
INSERT INTO `t_role_info` VALUES ('2', '普通管理员', null);
INSERT INTO `t_role_info` VALUES ('3', '查询用户', '进入系统内只能查看不能做任何其他编辑操作');

-- ----------------------------
-- Table structure for t_tag_type
-- ----------------------------
DROP TABLE IF EXISTS `t_tag_type`;
CREATE TABLE `t_tag_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `has_child` int(11) NOT NULL DEFAULT '0',
  `parent_id` int(11) DEFAULT NULL,
  `product_type_id` int(11) DEFAULT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `read_only` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_tag_type
-- ----------------------------
INSERT INTO `t_tag_type` VALUES ('1', '基础功能模块', '1', null, '1', '2018-08-09 18:31:35', '0');
INSERT INTO `t_tag_type` VALUES ('2', '人脸属性过滤', '0', '1', '1', '2018-08-06 11:58:58', '0');
INSERT INTO `t_tag_type` VALUES ('3', '数据挖掘', '0', '1', '1', '2018-08-06 11:58:58', '0');
INSERT INTO `t_tag_type` VALUES ('4', '垂直行业应用', '1', null, '1', '2018-08-06 11:58:58', '0');
INSERT INTO `t_tag_type` VALUES ('5', '预研DEMO', '1', null, '1', '2018-08-06 11:58:58', '0');
INSERT INTO `t_tag_type` VALUES ('6', '产品性能参数', '1', null, '1', '2018-08-06 11:58:58', '0');
INSERT INTO `t_tag_type` VALUES ('7', 'GIS应用', '0', '1', '1', '2018-08-06 11:58:58', '0');
INSERT INTO `t_tag_type` VALUES ('8', '视频比对分析', '0', '1', '1', '2018-08-06 11:58:58', '0');
INSERT INTO `t_tag_type` VALUES ('9', '警务APP', '0', '1', '1', '2018-08-06 11:58:58', '0');
INSERT INTO `t_tag_type` VALUES ('10', '综合人像治理平台', '0', '4', '1', '2018-08-06 11:58:58', '0');
INSERT INTO `t_tag_type` VALUES ('11', '公交立体防控系统', '0', '4', '1', '2018-08-06 11:58:58', '0');
INSERT INTO `t_tag_type` VALUES ('12', '行人闯红灯系统', '0', '4', '1', '2018-08-06 11:58:58', '0');
INSERT INTO `t_tag_type` VALUES ('13', '616人员管理系统', '0', '4', '1', '2018-08-06 11:58:58', '0');
INSERT INTO `t_tag_type` VALUES ('14', '机场人员安检分析系统', '0', '4', '1', '2018-08-06 11:58:58', '0');
INSERT INTO `t_tag_type` VALUES ('15', '口岸旅检人像应用平台', '0', '4', '1', '2018-08-06 11:58:58', '0');
INSERT INTO `t_tag_type` VALUES ('16', '监区人员监控系统', '0', '4', '1', '2018-08-06 11:58:58', '0');
INSERT INTO `t_tag_type` VALUES ('17', '人体结构化应用', '0', '5', '1', '2018-08-06 11:58:58', '0');
INSERT INTO `t_tag_type` VALUES ('18', '基于视频流内的实时告警', '0', '5', '1', '2018-08-06 11:58:58', '0');
INSERT INTO `t_tag_type` VALUES ('19', '视频质量检测工具', '0', '5', '1', '2018-08-06 11:58:58', '0');
INSERT INTO `t_tag_type` VALUES ('20', '结构化引擎', '0', '6', '1', '2018-08-06 11:58:58', '0');
INSERT INTO `t_tag_type` VALUES ('21', '布控引擎', '0', '6', '1', '2018-08-06 11:58:58', '0');
INSERT INTO `t_tag_type` VALUES ('22', '搜索引擎', '0', '6', '1', '2018-08-06 11:58:58', '0');
INSERT INTO `t_tag_type` VALUES ('23', '社区测试tag2', '1', null, '2', '2018-08-14 17:54:52', '0');
INSERT INTO `t_tag_type` VALUES ('24', '社区测试tag222', '0', '23', '2', '2018-08-14 17:55:02', '0');
INSERT INTO `t_tag_type` VALUES ('72', 'API开放平台', '0', '6', '1', '2018-08-14 21:24:48', '1');

-- ----------------------------
-- Table structure for t_token_info
-- ----------------------------
DROP TABLE IF EXISTS `t_token_info`;
CREATE TABLE `t_token_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `token` varchar(255) NOT NULL,
  `login` varchar(255) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `login_address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_token_info
-- ----------------------------

-- ----------------------------
-- Table structure for t_user_info
-- ----------------------------
DROP TABLE IF EXISTS `t_user_info`;
CREATE TABLE `t_user_info` (
  `id` bigint(64) NOT NULL AUTO_INCREMENT,
  `login` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `role_id` int(11) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_user_info
-- ----------------------------
INSERT INTO `t_user_info` VALUES ('1', 'superuser', 'e10adc3949ba59abbe56e057f20f883e', '超级管理员', '2018-08-13 16:40:42', '1', '');
INSERT INTO `t_user_info` VALUES ('2', 'tdh2', '1b61c4fa8cc70576187b896b91c5b10e', '田博', '2018-08-13 13:34:37', '1', null);
INSERT INTO `t_user_info` VALUES ('3', 'zkf', 'e10adc3949ba59abbe56e057f20f883e', '曾科凡', '2018-08-13 13:34:40', '1', null);
INSERT INTO `t_user_info` VALUES ('4', '测试用户1', 'd41d8cd98f00b204e9800998ecf8427e', '测试用户', '2018-08-17 14:24:11', '2', '');
INSERT INTO `t_user_info` VALUES ('5', 'yy56', 'e10adc3949ba59abbe56e057f20f883e', '尹义', '2018-08-20 14:12:57', '1', '');
INSERT INTO `t_user_info` VALUES ('6', 'lj508', 'e10adc3949ba59abbe56e057f20f883e', '梁晶', '2018-08-20 14:13:35', '3', '');
INSERT INTO `t_user_info` VALUES ('7', 'pengyukuo', '31a93a25118f154fa0df37b1d7ada03a', '产品达人-天阔', '2018-09-06 14:46:19', '1', '/uploads/02e35850-159e-40af-a93d-e3eee2d49e68.jpeg');
INSERT INTO `t_user_info` VALUES ('8', 'CJB', '9cd3be4d9ccf39a9f7667f3da887639a', '崔江波', '2018-09-07 12:56:22', '3', '');
INSERT INTO `t_user_info` VALUES ('9', 'liaijun', 'e10adc3949ba59abbe56e057f20f883e', '李爱军', '2018-09-10 10:39:50', '3', '');
INSERT INTO `t_user_info` VALUES ('10', 'zhangyang', 'e10adc3949ba59abbe56e057f20f883e', '张阳', '2018-09-14 11:56:59', '3', '');
