"use strict"
$(function() {

    Date.prototype.format = function(format) {
        var o = {
            "M+": this.getMonth() + 1, //month
            "d+": this.getDate(), //day
            "h+": this.getHours(), //hour
            "m+": this.getMinutes(), //minute
            "s+": this.getSeconds(), //second
            "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
            "S": this.getMilliseconds() //millisecond
        }
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    }
    var productObj = {
        productId: 1,
        tagId: null,
        subTagId: null
    };
    // initTopNav();
    // function initTopNav() {
    getTopNav();
    initUserInfo();

    // }
    function getTopNav(productId) {
        $.ajax({
            type: "get",
            url: $IF.apiServer + "/producttype",
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", localStorage.getItem('token'));
            },
            success: function(res) {
                if (res && res.data && res.errCode == 0) {
                    initNav(res.data);
                } else {
                    $IF.errCodefn(res);
                }
            }
        });
    }
    function initNav(products) {
        let $navTab = $('.nav-tab');
        products.forEach(function(item, key) {
            var li = `<li  data-id=${item.id}>${item.product_name}</li>`;
            $navTab.append(li);
        });
        $navTab.on('click', 'li', function() {
            $('.container-content ul').html('');
            $(this).addClass('nav-tab-active').siblings().removeClass('nav-tab-active');
            var menuId = $(this).data('id');
            productObj.productId = menuId;
            productObj.tagId = null;
            productObj.subTagId = null;
            getAside(menuId);

        })
        getAside(1);
        $('.nav-tab li:nth-child(1)').addClass('nav-tab-active');
    }
    function getAside(menuId) {
        console.log(productObj);
        $.ajax({
            type: "get",
            url: $IF.apiServer + "/tag/" + menuId,
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", localStorage.getItem('token'));
            },
            success: function(res) {
                if (res && res.data && res.errCode == 0) {
                    if (res.data.length <= 0) {
                        $('.container-content-bottom').show();
                    } else {
                        $('.container-content-bottom').hide();
                        initAside(res.data);
                    }

                }
            }
        });
    }
    function initAside(contents) {
        $('.container-aside').html('');
        let contentsDom = "";
        for (let item of contents) {
            var subcontentDom = '';
            for (let subItem of item.children) {
                subcontentDom += `
          <dd data-id=${subItem.id}>${subItem.name}</dd>
          `;
            }
            contentsDom += `
        <dl>
            <dt data-id=${item.id} ><i class=""></i>${item.name}</dt>
             <div class='sub-menu'>${subcontentDom}</div>
        </dl>
        `;
        }
        $('.container-aside').append(contentsDom);
        // $('.container-aside').find('dd').eq(0).addClass('activeBlue');
        initProductCard();
        changeTip();

    }
    function initProductCard() {
        $.ajax({
            type: "post",
            url: $IF.apiServer + "/product/info/query",
            processData: false,
            contentType: "application/json",
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", localStorage.getItem('token'));
            },
            data: JSON.stringify({
                type: productObj.productId,
                filterTip: productObj.tagId,
                subTip: productObj.subTagId,
                queryString: $('#queryString').val() || ''
            }),
            success: function(res) {
                if (res && res.data && res.errCode == 0) {
                    let productCards = res.data;
                    if (productCards.length <= 0) {
                        $('.container-content ul').html('');
                        $('.container-content-tip').show();
                        return;
                    } else {
                        $('.container-content-tip').hide();
                    }
                    let stringDom = '';
                    $IF.productData = {};
                    for (var item of productCards) {
                        $IF.productData[item.id] = item;
                        stringDom += `
              <li class='container-content-item' data-productId="${item.id}">
              <div class="container-content-item-imgcontainer">
                  <img src="${$IF.apiServer + item.image}"  v-url="${$IF.apiServer + item.scene
                            }" v-index="${item.ID}" alt="${item.alt}"/>
                  <div>
                    <i class="${item.newIconShow == 1 ? 'new-tip' : ''}"></i>
                    <h3>${item.name}</h3>
                    <p class="container-content-item-gray"><i></i>${item.description}</p>
                  </div>
              </div>
             <div class="container-content-item-view">
              <span class="view">0</span>
              <span class="msgIcon">0</span>
            </div>
          </li>
      `;
                    }
                    $('.container-content ul').html(stringDom);
                } else {
                    $IF.errCodefn(res);
                }
            }
        });
    }

    function changeTip() {
        $('.container-aside dl').on('click', function(e) {

            if (e.target.tagName == 'I') {
                $(e.target).parent().siblings().slideToggle(100);
            }
            if (e.target.tagName == 'DT') {
                productObj.tagId = $(e.target).data('id');
                productObj.subTagId = null;
                $('.container-aside dl dd').removeClass('activeBlue');
                $('.container-aside dl dt').removeClass('activeBlue');
                $(e.target).addClass('activeBlue');
                initProductCard();
            }

            if (e.target.tagName == 'DD') {
                $('.container-aside dl dd').removeClass('activeBlue');
                $('.container-aside dl dt').removeClass('activeBlue');
                $(e.target).addClass('activeBlue');
                productObj.tagId = $(e.target).parent().find('DT').data('id');
                productObj.subTagId = $(e.target).data('id');
                initProductCard();
            }



        })
    }
    //绑定用户滑入事件
  $('.user .userInfo').on('mouseover',function(){
           let $logOut=$('.logOut');
           $logOut.show();
          //  $('.user .userInfo').on('mouseout',function(){
          //   $logOut.hide();
          //  })
        $(this).on('mouseout',function(){
          $logOut.on('mouseover',function(){
            $logOut.show();
            $logOut.on('mouseout',function(){
             $logOut.hide();
             $logOut.off('mouseover');
             $logOut.off('mouseout');
             $(this).off('mouseout');
        })
            
           });
           $logOut.hide();
    })


  })
    // $('.container-content>ul').html(stringDom);
    $(".container-content").on("click", ".container-content-item", function() {
        var src = $(this).children('img').attr("v-url");
        // $(".project-modal video").attr("src",src)
        var dataID = $(this).attr("data-productid");
        console.log(dataID);
        upDateModaldata(dataID, $IF.productData);
        $(".project-modal").show()
        $(".modal-shade").show();

    });
    $(document).click(function(e) {
        if (e.target.className === "modal-shade") {
            $(".modal-shade").css("display", "none");
            $(".project-modal").css("display", "none");
        }
    });
    $('.project-modal').on("click", ".closebtn", function() {
        console.log("dddddddddd")
        $(".modal-shade").css("display", "none");
        $(".project-modal").css("display", "none");
    })
    //切换标签

    // $('body').on('keydown', function(e){
    //   alert();
    // })
    $('.emptySearch').on('click',function(){
        $("#queryString").val('');
        initProductCard();
    })
    $("#queryString").keydown(function(E) {
        var evt = window.event || e;
        if (evt.keyCode == 13) {
            //回车事件
            initProductCard();
        }
    });

    //刷新modal 窗口数据的函数
    function upDateModaldata(num, dataobj) {
        let domString = "";
        let item = dataobj[num];
        // console.log(typeof (item));
        // var detail = "";
        // var ulList = ""
        // if (typeof (item.func) == "object") {
        //     console.log(item.func)
        //     for (var tt of item.func) {
        //         ulList += `<li>${tt}</li>`
        //     }
        //     detail = ` <ul class="project-update-content">${ulList} </ul>`;
        // } else {
        //     detail = `<p>${item.func}</p>`;
        // }

        // console.log(item.src)
        domString = `
        <div class="project-modal-box">
               
                <div class="project-modal-title">
                <span class="project-name">${item.name}</span>
                <i class="closebtn"></i>
              </div>
              <div class="project-modal-content">
              <div>
              <video class="${item.scene_type == 'img' ? 'hide' : 'show'}" id="videoDom" src="${$IF.apiServer + item.scene}" controlsList="nodownload" controls="controls">
                您的浏览器不支持 video 标签。
              </video>
              <img class="${item.scene_type == 'img' ? 'show' : 'hide'}" src="${$IF.apiServer + item.scene}" alt="图片"/>
              </div>
              <div class="project-modal-info">
              <div class="project-notice">
                <h4>功能介绍：</h4>
                ${item.description}
              </div>
              <div class="project-link">
                <h4>产品链接：</h4>
                <a href="${item.url?item.url:'javascript:;'}" target="blank" class="project-notice-content ${item.url?'linkBlue':''}">${item.url?item.url:'暂无'}
                </a>
              </div>
              <div class="project-notice">
                <h4>上线时间：</h4>
                <p class="project-notice-content">${new Date(item.online_time).format('yyyy年MM日dd月')}
                </p>
              </div>
              <div class="project-developer">
                <h4>开发人员：</h4>
                <ul class="project-developer-content">
                  <li>${item.developer}</li>
                </ul>
              </div>
              <div class="project-comment">
                <h4>评论(0)</h4>
                <textarea name="" id="project-comment-input"></textarea>
                <div class="submit-comment">
                  <button>
                  <!-- <img src="./img/but_bg.png" alt="提交评论"> -->
                  评论
                  </button>
                </div>
                <div class="project-comment-content">
                  <ul>
                    <li>
                   
                    </li>
                  </ul>
                </div>
                </div>
            </div>
                `;

        $(".project-modal").html(domString);
        
        $('#videoDom').bind('contextmenu',function() { return false; });
    }
    function initUserInfo() {
        $IF.getUserInfo();
        console.log($IF.userInfo);
        $('.user .username').html($IF.userInfo.user_name);

    }
});