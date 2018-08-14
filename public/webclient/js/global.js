$(function () {
    var host = window.location.host;
    console.log(host);
    var curEnv = '';
    for (var i in $IF.environment) {
        if ($IF.environment[i].host == host) curEnv = i;
    }
    $IF.apiServer = $IF.environment[curEnv].apiServer;
    $IF.getUserInfo = function () {
        if (!localStorage.getItem('userinfo') && !localStorage.getItem('token')) return;
        $IF.userInfo = JSON.parse(localStorage.getItem('userinfo'));
        // localStorage.getItem('token');
    }
    $IF.errCodefn = function (res) {
        //未登陆用户访问
        if (res.errCode == 1002) {
            layer.open({
                btnAlign: 'c'
                , title: '提示'
                , content: res.data
                , closeBtn: 0
                , yes: function () {
                    layer.closeAll();
                    localStorage.setItem('token', '');
                    // $IF['userInfo']=res.userinfo[0];
                    window.location.href = window.location.href.slice(0, window.location.href.lastIndexOf('/'));
                }
            });
        } else if (res.errCode == 1001) {
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
    // $IF.layerPop=function(){
    // }
    $IF.setData = function (ele, url) {

        ele.find('img')[0].src = $IF.apiServer + url;
       let $deleteFileBtn=ele.find(".deleteFile");
        $deleteFileBtn.click(function () {
              ele.removeClass('imgShow').addClass('imgHide');
              ele.find('.colorRed').remove();
            
        });
    }
    $IF.tips = function (flag, parentClassName, time, poi, jump) {
        if (document.getElementsByClassName('animateTips001').length != 0) {
            document.getElementsByClassName(parentClassName)[0].removeChild(document.getElementsByClassName('animateTips001')[0]);
        }
        var poi = poi || 'center';
        var jump = jump || '';
        var div_uuid = $IF.getUuid();
        var div_id = "success-" + div_uuid;
        var div = document.createElement("div");
        div.id = div_id;
        div.className = 'animateTips001';
        div.style.position = "absolute";
        if (poi == 'bottom') {
            div.style.bottom = "20px";
        } else {
            div.style.top = "45%";
        }
        div.style.left = "0px";
        div.style.width = "100%";
        div.style.textAlign = "center";
        div.style.zIndex = "99999";
        div.style.borderRadius = "3px";
        var h5 = document.createElement("h5");
        h5.style.padding = "15px 30px";
        h5.style.color = "#fff";
        h5.style.borderRadius = "3px";
        h5.style.textAlign = "center";
        h5.style.fontSize = "1em";
        h5.style.display = "inline-block";
        h5.style.background = "rgba(0,0,0,0.8)";
        h5.style.boxShadow = "1px 1px 15px";
        h5.innerHTML = flag;
        div.appendChild(h5);
        document.getElementsByClassName(parentClassName)[0].appendChild(div);
        h5.className = jump;//"tipJump";
        setTimeout(function () {
            // document.getElementsByClassName(parentClassName)[0].removeChild(document.getElementById(div_id));
            // $('#'+div_id).remove();
            if (document.getElementById(div_id) == null) return;
            document.getElementById(div_id).remove();
        }, time);
        return false;
    }
    $IF.getUuid = function () {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";

        var uuid = s.join("");
        return uuid;
    }
    $IF.getAccountInfo= new ResetInterface($IF.apiServer + "/user/"),
    $IF.editUserInfo = new ResetInterface($IF.apiServer + "/user/edit/"),
    $IF.deleteUserInfo = new ResetInterface($IF.apiServer + "/user/delete/");




    function ResetInterface(url) {
        this.get = function (dataStr, callBack, error) {
            $.ajax({
                type: "get",
                url: url+dataStr,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", localStorage.getItem('token'));
                },
                success: callBack
            })
        }
        this.post =function(data,callBack,error){
            $.ajax({
                type: "post",
                url: url,
                processData: false,
                contentType: false,
                data: JSON.stringify(data),
                dataType: 'json',
                beforeSend: function(xhr){
                    xhr.setRequestHeader("Authorization", localStorage.getItem('token'));
                },
                success:callBack
            })
        }
        this.delete=function(datastr,callBack,err){
            $.ajax({
                type: "delete",
                url: url+datastr,
                beforeSend: function(xhr){
                    xhr.setRequestHeader("Authorization", localStorage.getItem('token'));
                },
                success: callBack
            });

        }
          return this;
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

