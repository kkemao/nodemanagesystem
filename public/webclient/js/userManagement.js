$(function () {
    var fileObj = {};
    let state = null;
    $IF.getUserInfo();
    initUserInfo();
    $('#addUser').on('click', function () {
        initAccountPop();
        state = '';
    })
    console.log(1);
    getRole();
    function getRole() {
        $.ajax({
            type: "get",
            url: $IF.apiServer + "/user/role/all",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", localStorage.getItem('token'));
            },
            success: function (res) {
                if (res && res.data && res.errCode == 0) {
                    $IF.roleArr = res.data
                    $IF.roleObj = {};
                    $IF.roleArr.forEach(function(d, i){
                        $IF.roleObj[d.id] = d;
                    });
                } else {
                    $IF.roleArr = [];
                }
            }
        });
    }

    let inputLock = false;
    $('body').on('click', '#userPop .limit', function (e) {
        let $target = $(e.target);
        if ($target.hasClass('limitPlaceHolder')) {
            $target.siblings().slideToggle('fast');
        } else {
            let $placeHolder = $target.siblings('.limitPlaceHolder');
            // if ($(e.target).data('type') == $placeHolder.data('type')) return;
            $placeHolder.html($target.text());
            // let productCata = $target.data('type');
            // $placeHolder.data('type', productCata);
            $target.addClass('necessary');
            $target.addClass('activeTag');
            $target.siblings().removeClass('activeTag');
            $(this).find('li:not(.limitPlaceHolder)').hide();
            // $('.tagCata li:not(.limitPlaceHolder)').hide();
        }

    }).on('click', '.uploadUserImgBtn', function () {
        if (inputLock) {
            tips('文件正在上传中，请稍后','main',1200,'bottom','')
            return;
        }
        $('#uploadUser').click();

    }).off('change',"#uploadUser").on("change", "#uploadUsesr", uploadImg);
    
    $('.usersInfo').on('click', 'tr .userEdit', function (e) {
        state = 'edit';
        let userId = $(e.target).closest('tr').data('userid');
        // console.log(userId);
        initAccountPop(userId);
    }).on('click', ".userDelete", function (e) {
        if($(this).hasClass('bgGray')){
            return;
        }
        layerPop({
            btn: ['确定', '取消']
            , btnAlign: 'c'
            , title: '提示'
            , area: ['390px', '260px']
            , content: "确定删除?"
            , callBack: deleteUser.bind(this)
            //编辑账户
        });

    })
    // $('body').find('#uploadUser').on('change', uploadImg);
    function uploadImg() {
        inputLock = true;
        const files = this.files;
        const file = files[0];
        $(this).val('');
        var formData = new FormData();
        formData.append("file", file);
        let $imgBox = $('#uploadUserImg .imgBox');
        // $imgBox.show();
        // formData.append("fileType", type);
        $.ajax({
            type: "POST",
            url: $IF.apiServer + "/upload",
            data: formData,
            processData: false,
            contentType: false,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", localStorage.getItem('token'));
            },
            success: function (res) {
                inputLock = false;
                if (res && res.data && res.errCode == 0) {
                    let url = res.data;
                    fileObj.fileUrl = url;
                    $IF.setData($imgBox, url);
                    $imgBox.addClass('imgShow').removeClass('imgHide');
                    let $span = $(`<span class="colorRed">上传成功</span>`);
                    $imgBox.append($span);

                } else {
                    $IF.errCodefn(res)
                }

            },
            error: function (err) {
                inputLock = false;
            }
        });
    }
    function initUserInfo() {
        let usersInfo = $('.usersInfo');
        $.ajax({
            type: "get",
            url: $IF.apiServer + "/user",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", localStorage.getItem('token'));
            },
            success: function (res) {
                if (res && res.data && res.errCode == 0) {
                    let users = res.data;
                    users.forEach(function (user, key) {
                        // console.log(user);
                      //  data-roleid=${user.role_id}
                     // ${user.role_id<$IF.usersInfo.role_id?'bgGray':''}" 
                        let $tr = `<tr data-userid=${user.id} data-roleid=${user.role_id} >
                       <td>${user.user_name}</td>
                       <td>${user.login}</td>
                       <td>${user.role_name}</td>
                       <td>${new Date(user.create_time).format('yyyy-MM-dd hh:mm:ss')}</td>
                       <td>
                           <span class="userEdit">编辑</span>
                           <span class="userDelete ${user.role_id<$IF.userInfo.role_id?'bgGray':''}">删除</span>
                       </td>
                   </tr>`
                        usersInfo.append($tr);
                    })
                } else {
                    $IF.errCodefn(res);
                }
            }
        })

    }
    function initAccountPop(userId) {
        // console.log(state);
        if (state == "edit" && userId) {
            $IF.getAccountInfo.get(userId, function (res) {
                if (res && res.data && res.errCode == 0) {
                    // console.log(res.data[0]);
                    setUserPop(res.data[0]);
                } else {
                    $IF.errCodefn(res);
                }

            })
        } else {
            setUserPop();
        }



    }
    function deleteUser() {
        let roleid=$(this).closest('tr').data('roleid');
        
        $IF.deleteUserInfo.delete(dataId, function (res) {
            if (res && res.data && res.errCode == 0) {
                layer.open({
                    btnAlign: 'c'
                    , title: '提示'
                    , content: '删除成功'
                    , yes: function () {
                        layer.closeAll();
                        $('.usersInfo').html('');
                        initUserInfo();
                    }
                }); 
            }
            else {
                $IF.errCodefn(res);
            }

        })

    }
    //编辑或者添加用户
    function setUserPop(userObj) {
        // console.log(userObj);
        //     let addAccountEle = `<div id="userPop">
        //     <form>
        //     <div>
        //         <label for="addUser">姓名</label>
        //         <input class="necessary" type="text" value="" id="addUser" name="userName" autocomplete="off"  placeholder="请输入姓名">
        //         <span class="star">*</span>
        //     </div>
        //     <div>
        //         <label for="account">账号</label>
        //         <input  class="necessary" type="text" value="" id="account" name="account" autocomplete="off" placeholder="请输入账号">
        //         <span class="star">*</span>
        //     </div>
        //     <div>
        //         <label for="pass1">密码</label>
        //         <input class="necessary" type="password" value="" id="pass" autocomplete="off" placeholder="请输入密码">
        //         <span class="star">*</span>
        //     </div>
        //     <div>
        //         <label for="limit">账号权限</label>
        //         <ul class="limit">
        //         </ul>
        //         <span class="star">*</span>
        //     </div>
        //     <div id="uploadUserImg" >
        //          <div class="upload-userImg-box">
        //                     <span class="upLoadImgIcon"></span>
        //                     <p>将文件拖到此处，或
        //                         <strong class="uploadUserImgBtn">点击上传</strong>
        //                         <input id="uploadUser" type="file"  accept="image/*" style="display: none;">
        //                     </p>
        //         </div>
        //         <!-- <img src="" alt=""> -->
        //     </div>
        //     </form>
        // </div>`;

        let addAccountEle = `<div id="userPop" data-userid="${userObj ? userObj.id : ''}">
    <form>
    <div>
        <label for="addUser">姓名</label>
        <input type="text" value="${userObj ? userObj.user_name : ''}" id="addUser" class="necessary" name="userName" autocomplete="off"  placeholder="请输入姓名">
        <span class="star">*</span>
    </div>
    <div>
        <label for="account">账号</label>
        <input type="text" value="${userObj ? userObj.login : ''}" id="account" class="necessary" name="account" autocomplete="off" placeholder="请输入账号">
        <span class="star">*</span>
    </div>
    <div  class="${userObj ? 'passShow' : 'passHide'}">
        <label for="pass1">密码</label>
        <input type="password" value="" name="password" class="necessary" id="pass" autocomplete="off" placeholder="请输入密码">
        <span class="star">*</span>
    </div>
    <div>
        <label for="limit">账号权限</label>
        <ul class="limit">
        </ul>
        <span class="star">*</span>
    </div>
    <div id="uploadUserImg" >
         <div class="upload-userImg-box">
                    <span class="upLoadImgIcon"></span>
                    <p>将文件拖到此处，或
                        <strong class="uploadUserImgBtn">点击上传</strong>
                        <input id="uploadUser" type="file"  accept="image/*" style="display: none;">
                    </p>
        </div>
        <div  class="${userObj ? 'imgShow' : 'imgHide'} imgBox" >
           <img src="${userObj ? userObj.url :'' }"></img>
           <span class="deleteFile"></span>
        </div>
    </div>
    </form>

</div>`;
        let layOpt = {
            btn: ['确定', '取消']
            , btnAlign: 'c'
            , title: '添加账号'
            , area: ['640px', '490px']
            , content: addAccountEle
            , callBack: addAccountfn
            //添加账户
        }
        layerPop(layOpt);
        // console.log(userObj);
      
        if (state == "edit" && userObj) {
            let imgBox = $('#uploadUserImg').find('.imgBox');
            layOpt.title = "编辑账号";
            initAccountLimit(userObj.role_id);
            if (userObj.url) {
                imgBox.addClass('imgShow');
                // console.log(imgBox);
                $IF.setData(imgBox, userObj.url);
            } else {
                imgBox.removeClass('imgShow').addClass('imgHide');
            }

        }else{ 
            initAccountLimit();
        }
        //用户权限初始化

    }
    // function editAccount(){
    //     //编辑用户时更新



    // }
    function addAccountfn() {
        console.log('addAccountfn');
        //验证表单输入是否完全
        if (!checkFormData()) {
            $IF.tips('请输入表格信息必选项', 'main', 1200, 'bottom', '');
            console.log('请输入表格信息必选项');
            return;
        }
        let forms = $('#userPop form');
        console.log(forms);
        let roleId = $('#userPop').find('.limit .activeTag').data('id');
        let pass = $('#userPop').find('input[type="password"]').val();
        let formData = new FormData(forms[0]);
        let md5Pass = $.md5(pass);
        formData.append('password', md5Pass);
        formData.append('roleId', roleId);
        if ($('.imgBox').hasClass('imgHide')) fileObj.fileUrl = '';
        if (!fileObj.fileUrl) fileObj.fileUrl = '';
        formData.append('fileUrl', fileObj.fileUrl);
        let formObj = {};
        for (var pair of formData.entries()) {
            formObj[pair[0]] = pair[1];
        }
        if (state == "edit") {
          let userid=$('#userPop').data('userid');
            $.ajax({
                type: "post",
                url: $IF.apiServer+'/user/edit/'+userid,
                processData: false,
                contentType:"application/json",
                data: JSON.stringify(formObj),
                dataType: 'json',
                beforeSend: function(xhr){
                    xhr.setRequestHeader("Authorization", localStorage.getItem('token'));
                },
                success:function(res){
                    if (res && res.data && res.errCode == 0) {
                        layerPop({
                            content: '编辑成功',
                            callBack: function () {
                                //初始化用户信息接口
                                $('.usersInfo').html('');
                                initUserInfo();
                            }
                        })
                    } else {
                        $IF.errCodefn(res);
                    }

                }
            })
        } else {
            $.ajax({
                type: "post",
                url: $IF.apiServer + '/user/add',
                processData: false,
                contentType: "application/json",
                data: JSON.stringify(formObj),
                dataType: 'json',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", localStorage.getItem('token'));
                },
                success: function (res) {
                    if (res && res.data && res.errCode == 0) {
                        console.log(res.data);
                        layerPop({
                            content: '添加成功',
                            callBack: function () {
                                //初始化用户信息接口
                                $('.usersInfo').html('');
                                initUserInfo();
                            }
                        })
                    } else {
                        $IF.errCodefn(res);
                    }

                }
            })
        }

    }
    function initAccountLimit(roleId) {
        console.log('initAccountLimit');
        $IF.roleArr.forEach(function (item, key) {
            let $limitPlaceHolder = null;
            if (key == 0) {
                if(roleId){
                    $limitPlaceHolder = `<li class="limitPlaceHolder" data-id='${roleId}'>${$IF.roleObj && $IF.roleObj[roleId].role_name}</li>`
                }else{
                    $limitPlaceHolder = `<li class="limitPlaceHolder" data-id=''>请选择</li>`
                }
            }
            let $li = `<li class='${item.id == roleId ? "activeTag" : ""}' data-id=${item.id}>${item.role_name}</li>`
            $('#userPop').find('.limit').append($limitPlaceHolder);
            $('#userPop').find('.limit').append($li);
        })
    }
    function checkFormData() {
        console.log('checkFormData');
        var uploadFormFlag = true;
        var neccesaray = $('#userPop .necessary').not("input[name=password]");
        console.log(neccesaray);
        neccesaray.each(function (neccesarayDom) {
            if (this.tagName == 'INPUT') {
                if (!$(this).val()) uploadFormFlag = false;
            } else {
                if (!$(this).html()) uploadFormFlag = false;
            }


        })
        return uploadFormFlag;
    }
    function layerPop(opt) {
        let defaultOpt = {
            btn: ['确定']
            , btnAlign: 'c'
            , area: ['390px', '260px']
            , title: "提示"
            , yes: function () {
                layer.closeAll();
                opt.callBack();
            }
        }
        let newOpt = Object.assign({}, defaultOpt, opt);
        console.log(newOpt);
        layer.open(newOpt);
    }

})