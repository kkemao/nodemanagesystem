$(function () {
    let tagState = 'firstLabel';
    // $IF.tagInfo = {};
    // let productCata = 1;
    //点击事件切换二级标签
    let searchTagArr = [];
    let searchSubTagArr = [];
    let subTabs = {};
    let tagObj = {
        productCata: "",
        tagId: null,
        subTagId: null
    }
    // initUserInfo();
    initForm(tagState);
    initProductCata(tagObj.productCata);
    // initProductTag("");
    $('.tag-management-table').on('click', '.firstLevelTable .tagName', function (e) {
        let tagName = $(e.target).text();
        //在所有产品都加载的情况下，点击一级标签，跳转到二级时可以新增标签
        tagObj.productCata = $(e.target).data('productid');
        $('.newTag').on('click', newTagClick);
        $('.newTag').removeClass('bgGray');
        // console.log(tagName);
        let tagNav = $('.tagNav');
        tagNav.find('.firstLevel').removeClass('colorBlue');
        tagNav.find('.secondaryLevel').html('/ ' + tagName).addClass('colorBlue');
        tagState = 'secondaryLabel';
        let tagId = $(e.target).data('type');
        tagObj.tagId = tagId;
        initForm(tagState);
        initSubTags(tagId);
    })
    $('.tag-management-top').on('click', '.tagCata li', function (e) {
        // tagObj.tagId=null;
        let $target = $(e.target);
        if ($target.hasClass('placeholderELe')) {
            $target.siblings().slideToggle('fast');
        } else {
            let $placeHolder = $(e.target).siblings('.placeholderELe');
            if ($(e.target).data('type') == $placeHolder.data('type')) return;
            $placeHolder.html($target.text());
            let productCata = $target.data('type');
            tagObj.productCata = productCata;
            // console.log($placeHolder.data('type'));
            // console.log(productCata);
            $placeHolder.data('type', productCata);
            // console.log($placeHolder.data('type'));
            $target.addClass('activeTag');
            $target.siblings().removeClass('activeTag');
            $('.tagCata li:not(.placeholderELe)').hide();
            // let productCata=$(this).find('.placeholderELe').data('type');
            // productCata = productCata;
            initProductTag(tagObj.productCata);
        }

    })
    //绑定搜索框的单击事件
    $("#tagSearch").keydown(function (E) {
        var evt = window.event || e;
        if (evt.keyCode == 13) {
            //回车事件
            let searchValue = $(this).val();
            searchTag(searchValue);
        }
    });
    //编辑标签绑定事件
    $('.tag-management-table').on('click', 'tbody tr .tagEdit', function (e) {
        let tagName = $(e.target).closest('tr').find('td').eq(0).text();

        let layerEditOpt = null;
        if (tagState == "firstLabel") {
            let tagId = $(e.target).closest('tr').find('td').eq(0).data('type');
            tagObj.tagId = tagId;
            tagObj.subTagId = null;
            console.log(tagObj);
            layerEditOpt = {
                // tagId:tagObj.tagId,
                btn: ['保存', '取消'],
                title: '编辑一级标签',
                content: `<div class="inputTagWrap">标签名称：<input class="inputTag"  type="text" value=${tagName}></div>`,
                callBack: handleEditTag
            }

        } else if (tagState == "secondaryLabel") {
            let tagId = $(e.target).closest('tr').find('td').eq(0).data('type');
            tagObj.subTagId = tagId;
            // let subTagId=$(e.target).closest('tr').find('.subTagName').data('type');
            layerEditOpt = {
                // tagId:tagObj.tagId,
                // subTagId:subTagId,
                btn: ['保存', '取消'],
                title: '编辑二级标签',
                content: `<div class="inputTagWrap">标签名称：<input class="inputTag" type="text" value=${tagName} ></div>`,
                callBack: handleEditTag
            }

        }
        layerPop(layerEditOpt);
    });

    // 新建标签绑定事件新建标签绑定事件
    // $('.newTag').on('click', function (e) {
    //     let layerNewTagOpt = null;

    //     if (tagState == 'firstLabel') {
    //         // let tagId=$(e.target).closest('tr').find('td').eq(0).data('type');
    //         // tagObj.tagId=null;
    //         layerNewTagOpt = {
    //             btn: ['保存', '取消'],
    //             title: '新建一级标签',
    //             content: `<div class="inputTagWrap">标签名称：<input class="inputTag" type="text" value="" placeholder="请输入一级标签名称"></div>`,
    //             callBack: handleNewTag
    //         }

    //     } else if (tagState == 'secondaryLabel') {
    //         // let tagId=$(e.target).closest('tr').find('td').eq(0).data('type');
    //         // console.log('filterTip',tagId);
    //         // tagObj.tagId=tagId;
    //         layerNewTagOpt = {
    //             btn: ['保存', '取消'],
    //             title: '新建二级标签',
    //             content: `<div class="inputTagWrap">标签名称：<input class="inputTag" type="text" value="" placeholder="请输入二级标签名称"></div>`,
    //             callBack: handleNewTag
    //         }

    //     }
    //     layerPop(layerNewTagOpt);
    // })
    //编辑标签删除时间
    $('.newTag').on('click', newTagClick);
    $('.tag-management-table').on('click', 'tbody tr .tagDelete', function (e) {
        let layerDeleteOpt = null;
        if (tagState == 'firstLabel') {
            let tagId = $(e.target).closest('tr').find('td').eq(0).data('type');
            tagObj.tagId = tagId;
            tagObj.subTagId = null;
            layerDeleteOpt = {
                btn: ['确定', '取消'],
                title: '确定删除该一级标签？',
                content: '<div class="inputTagWrap">删除该一级标签以后对应的所有二级标签将无法恢复，需重新添加</div>',
                callBack: handleDeleteTag
            }
            
        } else if (tagState == 'secondaryLabel') {
            let tagId = $(e.target).closest('tr').find('td').eq(0).data('type');
            tagObj.subTagId = tagId;
            layerDeleteOpt = {
                btn: ['确定', '取消'],
                title: '确定删除该二级标签',
                content: '<div class="inputTagWrap">删除该二级标签以后对应的所有绑定产品的标签将删除，需重新添加</div>',
                callBack: handleDeleteTag
            }

        }
        layerPop(layerDeleteOpt);
    })
    //点击标签返回事件
    $('.tagBack').click(function (e, proStr) {
        tagState = 'firstLabel';
        //点击返回时要清空一级标签的值
        tagObj.tagId = null;
        tagObj.productCata = "";
        initForm(tagState);
        if (proStr == "all") {
            initProductTag("");
        } else {
            initProductTag(tagObj.productCata);
        }

    })
    function newTagClick() {
        let layerNewTagOpt = null;
        if (tagState == 'firstLabel') {
            // let tagId=$(e.target).closest('tr').find('td').eq(0).data('type');
            // tagObj.tagId=null;
            layerNewTagOpt = {
                btn: ['保存', '取消'],
                title: '新建一级标签',
                content: `<div class="inputTagWrap">标签名称：<input class="inputTag" type="text" value="" placeholder="请输入一级标签名称"></div>`,
                callBack: handleNewTag
            }

        } else if (tagState == 'secondaryLabel') {
            // let tagId=$(e.target).closest('tr').find('td').eq(0).data('type');
            // console.log('filterTip',tagId);
            // tagObj.tagId=tagId;
            layerNewTagOpt = {
                btn: ['保存', '取消'],
                title: '新建二级标签',
                content: `<div class="inputTagWrap">标签名称：<input class="inputTag" type="text" value="" placeholder="请输入二级标签名称"></div>`,
                callBack: handleNewTag
            }

        }
        layerPop(layerNewTagOpt);
    }
    //产品下拉框绑定事件
    //初始化当前标签的表格
    function initForm(tagState) {
        let tableBox = $('.tag-management-table');
        let tagNav = $('.tagNav');
        if (tagState == "firstLabel") {
            tagNav.find('.firstLevel').addClass('colorBlue');
            // tagNav.find('.firstLevel')
            let tagManageTop = $('.tag-management-top');
            let newTag = tagManageTop.find('.newTag');
            tagNav.find('.secondaryLevel').html('');
            $('.tagCata li:not(.placeholderELe)').hide();
            let tagCata = $('.tagCata').show();
            let tableFormat = ` <table class="firstLevelTable" data-type='firstLabal'>
         <thead>
             <th>一级标签名</th>
             <th>二级标签数量</th>
             <th>产品数量</th>
             <th>创建时间</th>
             <th>操作</th>
         </thead>
         <tbody>
         </tbody>
     </table>`;
            tableBox.html(tableFormat);


        } else if (tagState == "secondaryLabel") {
            // let tagManageTop = $('.tag-management-top');

            // let newTag = tagManageTop.find('.newTag');
            // newTag.addClass('alignRight');
            // tagManageTop.append(`<button class="btn tagBack">返回</button>`);
            $('.tagCata').hide();
            //点击返回按钮返回到一级标签页面
            // let backFirst = $('.tagBack');
            // backFirst.click(function () {
            //     tagState = 'firstLabel';
            //     initForm(tagState);
            //     initProductTag(productCata);
            // })

            let tableFormat = `
        <table class="secondaryTable" data-type='secondaryLabel'>
         <thead>
             <th>二级标签</th>
             <th>产品数量</th>
             <th>创建时间</th>
             <th>操作</th>
         </thead>
         <tbody>
         </tbody>
     </table>`;
            tableBox.html(tableFormat);
        }

    }
    function initProductCata() {
        $.ajax({
            type: "get",
            url: $IF.apiServer + "/producttype",
            beforeSend: function(xhr){
                xhr.setRequestHeader("Authorization", localStorage.getItem('token'));
            },
            success: function (res) {
                if (res && res.data && res.errCode == 0) {
                    let productCata = res.data;
                    console.log(productCata);
                    let $tagCata = $('.tagCata');
                    productCata.forEach(function (item, key) {
                        let $li = null;
                        let $placeHolder = null;
                        let $allType = null;
                        if (key == 0) {
                            $placeHolder = `<li class="placeholderELe" data-type="">请选择</li>`
                            $allType = `<li class="activeTag" data-type=''>请选择</li>`
                            $li = `<li data-type=${item.id}>${item.product_name}</li>`;

                        } else {
                            $li = `<li data-type=${item.id}>${item.product_name}</li>`;
                        }
                        $tagCata.append($placeHolder);
                        $tagCata.append($allType);
                        $tagCata.append($li);

                    })
                    initProductTag(tagObj.productCata);
                }else{
                    $IF.errCodefn(res);
                }
            }
        });
    }
    function initProductTag(productCata) {
        //若是为空，新建标签不可点，并且置为灰色
        let $newTag = $('.newTag');
        if (!productCata) {
            $('.placeholderELe').html('请选择');
            $(".tagCata li").eq(1).addClass('activeTag').siblings().removeClass('activeTag');
            $newTag.addClass('bgGray')
            // $newTag.css('background', "#c3bdbd");
            $newTag.unbind('click');
        } else {
            $newTag.on('click', newTagClick);
            $newTag.removeClass('bgGray');
            // $newTag.css('background', '#4994FF');
        }
        // let fbody = $(".tag-management-table .firstLevelTable").find('tbody');
        // fbody.html('');
        $.ajax({
            type: "get",
            url: $IF.apiServer + "/tag/" + productCata,
            beforeSend: function(xhr){
                xhr.setRequestHeader("Authorization", localStorage.getItem('token'));
            },
            success: function (res) {
                if (res && res.data && res.errCode == 0) {
                    if (res.data.length == 0) {
                        $('.tag-management-bottom').show();
                    } else {
                        $('.tag-management-bottom').hide();
                    }
                    let firstLevelTags = res.data;
                    searchTagArr = firstLevelTags;
                    firstLevelTags.forEach(function (item, key) {
                        subTabs[item.id] = item.children;
                    });
                    if (tagState == 'secondaryLabel') {
                        initSubTags(tagObj.tagId);
                    } else {
                        appendSubTabs(firstLevelTags);
                    }
                    // initPaper(res.data.length);
                }

            }
        })
    }
    function initSubTags(tagId) {
        let subArr = [];
        for (let subTabId in subTabs) {
            if (subTabId == tagId) {
                subArr = subTabs[subTabId];
                break;
            }
        }
        searchSubTagArr = subArr;
        if (subArr.length == 0) {
            $('.tag-management-bottom').show();
            return;
        } else {
            $('.tag-management-bottom').hide();
        }
        appendSubTabs(subArr);

        // subArr.forEach(function (item, key) {
        //     let tr = `<tr>
        //       <td class="subTagName" data-type=${item.id}>${item.name}</td>
        //       <td>${item.count}</td>
        //       <td>${new Date(item.create_time).format('yyyy-MM-dd hh:mm:ss')}</td>
        //       <td>
        //           <span class="tagEdit">编辑</span>
        //           <span class="tagDelete">删除</span>
        //       </td>
        //   </tr>`
        //     fbody.append(tr);
        //     searchSubTagArr.append(item);
        // })

    }
    function appendSubTabs(tagArr) {

        if (tagState == 'firstLabel') {
            let fbody = $(".tag-management-table .firstLevelTable").find('tbody');
            fbody.html('');
            tagArr.forEach(function (item, key) {
                let tr = `<tr>
       <td class="tagName" data-type=${item.id} data-productid=${item.product_type_id}>${item.name}</td>
       <td>${item.children.length}</td>
       <td>${item.count}</td>
       <td>${new Date(item.create_time).format('yyyy-MM-dd hh:mm:ss')}</td>
       <td>
           <span class="tagEdit">编辑</span>
           <span class="tagDelete">删除</span>
       </td>
   </tr>`
                fbody.append(tr);
                subTabs[item.id] = item.children;
            });
        } else if (tagState == 'secondaryLabel') {
            let fbody = $(".tag-management-table .secondaryTable").find('tbody');
            fbody.html('');
            tagArr.forEach(function (item, key) {
                let tr = `<tr>
                <td class="subTagName" data-type=${item.id} data-productid=${item.product_type_id}>${item.name}</td>
                <td>${item.count}</td>
                <td>${new Date(item.create_time).format('yyyy-MM-dd hh:mm:ss')}</td>
                <td>
                    <span class="tagEdit">编辑</span>
                    <span class="tagDelete">删除</span>
                </td>
            </tr>`
                fbody.append(tr);
            })
        }

    }
    function searchTag(searchValue) {
        if (tagState == 'firstLabel') {
            let arr = [];
            if (searchValue) {
                searchTagArr.forEach(function (item, key) {
                    if (item.name.indexOf(searchValue) !== -1) {
                        arr.push(item);
                    }
                });
            }
            if (searchValue === "") arr = searchTagArr;
            if (arr.length == 0) {
                $('.tag-management-bottom').show();
            } else {
                $('.tag-management-bottom').hide();
            }
            appendSubTabs(arr);
        } else if (tagState == 'secondaryLabel') {
            let arr = [];
            if (searchValue === "") arr = searchSubTagArr;
            if (searchValue) {
                searchSubTagArr.forEach(function (item, key) {
                    if (item.name.indexOf(searchValue) !== -1) {
                        arr.push(item);
                    }
                })
            }
            if (arr.length == 0) {
                $('.tag-management-bottom').show();
            } else {
                $('.tag-management-bottom').hide();
            }
            appendSubTabs(arr);
        }
    }
    function layerPop(layerOpt) {
        layer.open({
            btn: layerOpt.btn
            , btnAlign: 'c'
            , area: ['390px', '260px']
            , title: layerOpt.title
            , content: layerOpt.content
            , yes: function () {
                layer.closeAll();
                layerOpt.callBack();
            }
        });
    }
    function handleNewTag() {
        let tagName = $('.inputTagWrap').find('.inputTag').val();
        // if(tagState=='firstLabel'){
        //     tagObj.tagId=null;
        // }else if(tagState='secondaryLabel'){
        //     tagObj.tagId=tagObj.tagId;
        // }
        console.log(tagObj);
        $.ajax({
            type: "post",
            url: $IF.apiServer + '/tag/add',
            processData: false,
            contentType: "application/json",
            data: JSON.stringify({
                id: tagObj.productCata,
                name: tagName,
                filterTip: tagObj.tagId
            }),
            dataType: 'json',
            beforeSend: function(xhr){
                xhr.setRequestHeader("Authorization", localStorage.getItem('token'));
            },
            success: function (res) {
                if (res && res.data && res.errCode == 0 && res.errCode == 0) {
                    console.log(res.data);
                    layer.open({
                        btnAlign: 'c'
                        , title: '提示'
                        , content: '添加成功'
                        , yes: function () {
                            layer.closeAll();
                            initForm(tagState);
                            initProductTag(tagObj.productCata);
                        }
                    });
                }else{
                    $IF.errCodefn(res);
                }

            }
        });
    }
    function handleDeleteTag() {
        let tagId=null;
        if (tagState == 'firstLabel') {
            tagId=tagObj.tagId;
        } else if (tagState == 'secondaryLabel') {
            tagId=tagObj.subTagId;
        }
        $.ajax({
            type: "delete",
            url: $IF.apiServer + '/tag/delete/'+tagId,
            beforeSend: function(xhr){
                xhr.setRequestHeader("Authorization", localStorage.getItem('token'));
            },
            success: function (res) {
                if (res && res.data && res.errCode == 0) {
                    layer.open({
                        btnAlign: 'c'
                        , title: '提示'
                        , content: '删除成功'
                        , yes: function () {
                            layer.closeAll();
                            initForm(tagState);
                            initProductTag(tagObj.productCata);
                        }
                    });
                }
                else{
                    $IF.errCodefn(res);
                }
            }
        });
    }
    function handleEditTag() {
        let tagName = $('.inputTagWrap').find('.inputTag').val();
        let editTagOpt = {};
        if (tagState == 'firstLabel') {
            editTagOpt.id = tagObj.tagId;
            editTagOpt.name = tagName;
        } else if (tagState == 'secondaryLabel') {
            editTagOpt.id = tagObj.subTagId;
            editTagOpt.name = tagName;
        }
        $.ajax({
            type: "post",
            url: $IF.apiServer + '/tag/edit',
            processData: false,
            contentType: "application/json",
            data: JSON.stringify(editTagOpt),
            dataType: 'json',
            beforeSend: function(xhr){
                xhr.setRequestHeader("Authorization", localStorage.getItem('token'));
            },
            success: function (res) {
                if (res && res.data && res.errCode == 0 && res.errCode == 0) {
                    console.log(res.data);
                    layer.open({
                        btnAlign: 'c'
                        , title: '提示'
                        , content: '修改成功'
                        , yes: function () {
                            layer.closeAll();
                            initForm(tagState);
                            initProductTag(tagObj.productCata);
                            // location.reload();
                        }
                    });
                }else{
                    $IF.errCodefn(res);
                }

            }
        });

    }
    // function initUserInfo(){
    //     let userInfo= initUserInfo;
        

    // }
    // function initPaper(dataCount) {
    //     layui.use(['laypage'], function () {
    //         var laypage = layui.laypage;

    //           laypage.render({
    //             elem: 'paper'
    //             , prev: '<'
    //             , next: '>'
    //             ,limit:10
    //             , count: dataCount //数据总数
    //             , jump: function (obj) {
    //                 // document.getElementById('#paper').innerHTML = function(){
    //                 //     var arr = []
    //                 //     ,thisData = data.concat().splice(obj.curr*obj.limit - obj.limit, obj.limit);
    //                 //     layui.each(thisData, function(index, item){
    //                 //       arr.push('<li>'+ item +'</li>');
    //                 //     });
    //                 //     return arr.join('');
    //                 //   }();
    //             }
    //         });
    //     })

    // }
    // function errCodefn(resTip){
    //     layer.open({
    //         btnAlign: 'c'
    //         , title: '提示'
    //         , content: resTip
    //         , yes: function () {
    //             layer.closeAll();
    //         }
    //     });
    // }
    // function addSucess(){
        // layer.open({
        //     btnAlign: 'c'
        //     , title: '提示'
        //     , content: '添加成功'
        //     , yes: function () {
        //         layer.closeAll();
        //         addSucess();
        //     }
        // });
    // }

})