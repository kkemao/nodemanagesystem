var containerCcontent = [
    {"img":"./img/2.1.png","title":"旅检人员智能人像演示系统","des":"该应用可接入实时视频流，对视频流中的人员进行实时识别，对染疫人员、水客前科、高频次往返人员进行实时识别，并在视频流中进行打框标注","newIconShow":"1","video":"movie.ogg","alt":"图片","ID":"0"},
    {"img":"./img/4.1.png","title":"人体结构化演示","des":"该应用可接入多路实时视频流，对视频流中的人体进行采集，并支持对采集人体的拖拽以图搜图","newIconShow":"1","video":"./img/6.jpg","alt":"图片","ID":"1"},
    {"img":"./img/5.png","title":"视频质量检测工具","des":"Window 64位免安装软件，可同时多个视频文件、在线视频流进行视频质量分析，通过算法检测和分析判断视频中符合识别要求人脸，给出视频质量分数","newIconShow":"1","video":"movie.ogg","alt":"图片","ID":"2"},
    // {"img":"./img/container-content04.png","title":"电动车检测DEMO","des":"对单路在线视频流进行电动车的实时检测的演示系统，通过对输入的视频流进行解码抽帧，利用算法模型完成电动车检测和跟踪，将视频中的电动车在web界面识别出来","newIconShow":"1","video":"movie.ogg","alt":"图片","ID":"3"},
    {"img":"./img/3.png","title":"场馆安保应用","des":"【应用场景】针对大型场馆安保活动，落实每个观众的实名信息，实现对人数的精确统计，并且对重点人员进行实时比对告警","newIconShow":"1","video":"movie.ogg","alt":"图片","ID":"3"},
    {"img":"./img/lcry.png","title":"流窜人员挖掘","des":"【应用场景】针对涉毒、涉黄、涉毒人员流窜作案的挖掘","newIconShow":"1","video":"movie.ogg","alt":"图片","ID":"4"},
    {"img":"./img/pfcr.png","title":"频繁出入人员挖掘","des":"【应用场景】识别在某一场所经常出入的人员，过滤从业人员，发现新的黄赌毒人员","newIconShow":"1","video":"movie.ogg","alt":"图片","ID":"5"},
    {"img":"./img/qkry.png","title":"前科人员进入场所预警","des":"【应用场景】对前科人员再次出入重点场所进行关注","newIconShow":"1","video":"movie.ogg","alt":"图片","ID":"6"},
    {"img":"./img/dqkry.png","title":"多名前科人员进入同一场所告警","des":"【应用场景】对于聚众赌博、聚众吸毒、涉黄等前科人员进行管控","newIconShow":"1","video":"movie.ogg","alt":"图片","ID":"7"},
    {"img":"./img/rllyc.png","title":"人流量异常告警","des":"【应用场景】民警通过辖区内人脸总数排行，可以了解需要重点关注的场所；针对具体场所，可以查看人数异常告警","newIconShow":"1","video":"movie.ogg","alt":"图片","ID":"8"},
    {"img":"./img/container-content08.png","title":"入境人员非法从业分析","des":"【应用场景】针对辖区内持非从业签证人员从事非法从业活动的挖掘","newIconShow":"1","video":"movie.ogg","alt":"图片","ID":"9"},
    // {"img":"./img/3.png","title":"场馆安保应用","des":"【应用场景】针对大型场馆安保活动，落实每个观众的实名信息，实现对人数的精确统计，并且对重点人员进行实时比对告警","newIconShow":"1","video":"movie.ogg","alt":"图片","ID":"10"},
];
let stringDom = '';
for(var item of containerCcontent){
    stringDom += `
            <li class='container-content-item' data-productId="${item.productId}">
            <div class="container-content-item-imgcontainer">
                <img src="${item.img}"  v-url="${item.video}" v-index="${item.ID}" alt="${item.alt}"/>
                <div>
                  <i class="${item.newIconShow==1?'new-tip':''}"></i>
                  <h3>${item.title}</h3>
                  <p class="container-content-item-gray"><i></i>${item.des}</p>
                </div>
            </div>
      
        <div class="container-content-item-view">
            <span class="view">0</span>
            <span class="msgIcon">0</span>
            <span class="edit">编辑</span>
            <span class="delete">删除</span>
        </div>
        </li>
    `;
}
 $('.container-content-list').html(stringDom);

 //