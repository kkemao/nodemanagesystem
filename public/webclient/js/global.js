$(function(){
    var host = window.location.host;
    console.log(host);
    var curEnv = '';
    for(var i in $IF.environment){
        if($IF.environment[i].host == host)curEnv = i;
    }
    $IF.apiServer = $IF.environment[curEnv].apiServer;
    $IF.getUserInfo=function(){
        if(!localStorage.getItem('userinfo')&&!localStorage.getItem('token')) return;
        $IF.userInfo = JSON.parse(localStorage.getItem('userinfo'));
        // localStorage.getItem('token');
    }
    $IF.errCodefn = function(res){
        //未登陆用户访问
        if(res.errCode == 1002){
            layer.open({
                btnAlign: 'c'
                , title: '提示'
                , content: res.data
                ,closeBtn: 0
                , yes: function () {
                    layer.closeAll();
                    localStorage.setItem('token', '');
                    // $IF['userInfo']=res.userinfo[0];
                    window.location.href = window.location.href.slice(0,window.location.href.lastIndexOf('/'));
                }
            });
        }else if(res.errCode == 1001){
            layer.open({
                btnAlign: 'c'
                , title: '提示'
                , content: res.data
                , yes: function () {
                    layer.closeAll();
                }
            });
        }
    }
    // window.onload=function(){
    //     $IF.resizeFun = function() {
    //         var windowHeight = window.innerHeight;
    //         var windowWidth = window.innerWidth;
    //         // 计算适配问题
    //         var scale = 1;
    //         if (windowHeight > windowWidth * 1080 / 1920) {
    //             scale = windowWidth / 1920;
    //         } else {
    //             scale = windowHeight / 1080;
    //         }
    //         var top = (windowHeight - 1080) / 2;
    //         var left = (windowWidth - 1920) / 2;
    //         document.body.style.zoom = scale;
    //     };
    //     window.onresize = $IF.resizeFun;
    //     $IF.resizeFun();
    
    // }

})

