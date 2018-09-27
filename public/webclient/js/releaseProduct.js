$(
    function () {


        Date.prototype.format = function (format) {
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

        let vedioUploadFlag = false;
        let imgUploadFlag = false;
        let fileUrl = {};
        initUserInfo();
        initProductName();
        initProductCard();
        projectModal();

        // $('.container-aside-nav-item').click(function () {
        //     $(this).addClass('active').siblings().removeClass('active');
        //     let dataType=$(this).data('type');
        //     $('.container-content .contentWrap-item').each(function(){
        //         let type=$(this).data('type');
        //         if(dataType==type){
        //             $(this).show().siblings().hide();
        //         }
        //         if(dataType=='tagManagement'){
        //             $('.tagNav').show();
        //             // $('.newTag').addClass('')
        //             $('.tagBack').trigger('click',"all");


        //         }else{
        //             $('.tagNav').hide();
        //             initProductCard();
        //             $('.all-product').find('input').val('');
        //         }
        //     })
        // })
        $('.release-product').click(function () {
            $(this).closest('.container-content-wrap').hide().siblings('.release-product-content').show();
            $('.container-content-bottom').hide();
            $('#productName').html('发布产品');
            $IF.currentState = 'release';
            //点发布产品时清空数据
            fileUrl = {};
            // var state = "release";
            emptyData();
        });
        //搜索产品
        $("#product-name").keydown(function (E) {
            var evt = window.event || e;
            if (evt.keyCode == 13) {
                //回车事件
                initProductCard();
            }
        });
        $('.release-product-title .back').click(function () {
            $(this).closest('.release-product-content').hide().siblings('.container-content-wrap').show();


        })
        //拖拽，点击上传
        var inputLock = false;
        $(".uploadBtn").click(function () {

            if (inputLock) {
                $IF.tips('文件正在上传中，请稍后', 'main', 1200, 'bottom', '')
                return;
            }
            $('#uploadVideoInp').click();
        });
        $(".uploadImage-content-box").on('click', function () {
            console.log(1, event.target);
            $('#uploadImgInp').click();
        });
        $('#uploadVideoInp').on('change', function (e) {
            // $(this).val('');
            inputLock = true;
            const files = this.files;
            var fileNameArr = files[0].name.split('.');
            var fileExten = fileNameArr[fileNameArr.length - 1];
            // var fileExten=files[0].name.slice(files[0].name.indexOf('.')+1);
            let fileFormatObj = checkFileFormat(fileExten);

            if (fileFormatObj.checkFormatFlag) {
                if (fileFormatObj.type == "img") {
                    uploadFile(files, 'img', 'top')
                } else if (fileFormatObj.type == "video") {
                    uploadFile(files, 'video', 'top')
                }
            } else {
                layui.use(['layer'], function () {
                    layer = layui.layer;
                });
                layer.open({
                    btnAlign: 'c'
                    , title: '提示'
                    , content: '文件格式不正确'
                });

            };
        })
        $('#uploadImgInp').on('change', function () {
            // $(this).val('');
            // var $uploadImgForm=$('#uploadImgForm');
            // var formData=new FormData($uploadImgForm[0]);
            const files = this.files;

            var fileNameArr = files[0].name.split('.');
            var fileExten = fileNameArr[fileNameArr.length - 1];
            // var fileExten=files[0].name.slice(files[0].name.indexOf('.')+1);
            let fileFormatObj = checkFileFormat(fileExten);
            if (fileFormatObj.type == "img") {
                uploadFile(files, 'img')
            } else {
                layui.use(['layer'], function () {
                    layer = layui.layer;
                });
                layer.open({
                    btnAlign: 'c'
                    , title: '提示'
                    , content: '请上传图片'
                });

            };

        })
        $('body').on('click', '.delete', function (e) {
            e.stopPropagation();
            var parentDom = $(this).closest('.container-content-item');
            var productId = parentDom.data('productid');

            layer.open({
                btn: ['确定', '取消']
                , btnAlign: 'c'
                , title: '提示'
                , content: '确定删除？'
                , yes: function () {
                    layer.closeAll();
                    $.ajax({
                        type: "delete",
                        url: $IF.apiServer + '/product/info/' + productId,
                        beforeSend: function (xhr) {
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
                                        parentDom.remove();
                                    }
                                });
                            } else {
                                $IF.errCodefn(res);
                            }
                        }
                    });
                }
            });
        }).on('click', ".container-content-item", function (e) {
            var src = $(this).children('img').attr("v-url");
            // $(".project-modal video").attr("src",src)
            var dataID = $(this).attr('data-productid');
            console.log(dataID);
            upDateModaldata(dataID, $IF.productData);
            $(".project-modal").show()
            $(".modal-shade").show();
        }).off('click', '.edit').on('click', '.edit', function (e) {
            e.stopPropagation();
            $('.release-product-content').show().siblings().hide();
            // var state = "edit";
            emptyData();
            $('#productName').html('编辑产品');
            $IF.currentState = 'update';
            var parentDom = $(this).closest('.container-content-item');
            var productId = parentDom.data('productid');
            $IF.currentProductId = productId;
            var $productDetail = $('#productDetail');
            $productDetail.find("select[name='selectCata']").siblings().find('input').val($IF.producttype[$IF.productData[productId].type].product_name);
            var selectDom = $productDetail.find("select[name='selectCata']");
            selectDom.find("option[value = '" + $IF.producttype[$IF.productData[productId].type].id + "']").attr("selected", "selected");
            $productDetail.find("select[name='filterTip']").siblings().find('input').val('2');
            $productDetail.find('textarea').val($IF.productData[productId].description);
            if (productId) {
                $productDetail.find("input[name='productName']").val($IF.productData[productId].name);
            }
            $productDetail.find("input[name='productLink']").val($IF.productData[productId].url);
            $productDetail.find("input[name='designer']").val($IF.productData[productId].developer);
            $productDetail.find("#date").val(new Date($IF.productData[productId].online_time).format('yyyy-MM-dd hh:mm:ss'));
            // var topfileExten=$IF.productData[productId].scene.slice($IF.productData[productId].scene.indexOf('.')+1);

            var fileNameArr = $IF.productData[productId].scene.split('.');
            var fileExten = fileNameArr[fileNameArr.length - 1];

            var fileFormatObj = checkFileFormat(fileExten);
            if (fileFormatObj) {
                if (fileFormatObj.type == 'img') {
                    setFile('img', $IF.productData[productId].scene, 'top')
                } else if (fileFormatObj.type == 'video') {
                    setFile('video', $IF.productData[productId].scene, 'top');
                }

            }
            setFile('img', $IF.productData[productId].image)
            getProductTag($IF.productData[productId].type, $IF.productData[productId].tag1, $IF.productData[productId].tag2);
        });
        function updateProductById(productId) {
            var $productDetail = $('#productDetail');
            var formData = new FormData($productDetail[0]);
            formData.append('image', fileUrl.imgUrl);
            formData.append('file', fileUrl.videoUrl);
            formData.append('fileType', fileUrl.type);
            let formObj = {};
            for (var pair of formData.entries()) {
                formObj[pair[0]] = pair[1];
            }
            formObj.id = productId;
            $.ajax({
                type: "post",
                url: $IF.apiServer + '/product/info/update',
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
                        layer.open({
                            btnAlign: 'c'
                            , title: '提示'
                            , content: '更新成功'
                            , yes: function () {
                                // $('.release-product-content').hide().siblings().show();
                                layer.closeAll();
                                location.reload();

                            }
                        });
                    } else {
                        $IF.errCodefn(res);
                    }

                }
            });
        }
        handleDragUpload($('.uploadVideo-content-box'));
        handleDragUpload($('.uploadImage-content-box'));
        $('.releaseBtn').click(function () {
            if (!vedioUploadFlag) {
                layer.open({
                    btnAlign: 'c'
                    , title: '提示'
                    , content: '请先上传视频或者图片以后再发布产品'
                    , yes: function () {
                        layer.closeAll();
                    }
                });
            } else if (!checkForm()) {
                //添加表单验证
                layer.open({
                    btnAlign: 'c'
                    , title: '提示'
                    , content: '请输入产品信息的必选项'
                    , yes: function () {
                        layer.closeAll();
                    }
                });

            }
            else if (!imgUploadFlag) {
                layer.open({
                    btnAlign: 'c'
                    , title: '提示'
                    , content: '请先上传封面以后再发布产品'
                    , yes: function () {
                        layer.closeAll();
                    }
                });
            }
            else {
                if ($IF.currentState == 'update') {
                    updateProductById($IF.currentProductId);
                } else {
                    releaseProduct();
                }
            }

        });
        //产品select初始化
        function initProductName() {
            layui.use(['laydate'], function () {
                var laydate = layui.laydate;
                laydate.render({
                    elem: '#date',
                    type: 'datetime',
                    value: (new Date()).format('yyyy-MM-dd hh:mm:ss')
                });
            });
            $.ajax({
                type: "get",
                url: $IF.apiServer + "/producttype",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", localStorage.getItem('token'));
                },
                success: function (res) {
                    if (res && res.data && res.errCode == 0) {
                        let allProducts = res.data;
                        console.log(allProducts);
                        layui.use(['form'], function (data) {
                            var form = layui.form;
                            var $allproduct = $('.container-content-top').find("select[name='allproduct']");
                            var $productCata = $('.release-product-content').find("select[name='selectCata']");
                            $IF.producttype = {};
                            allProducts.forEach(function (item, key) {
                                $IF.producttype[item.id] = item;
                                var optionstring = `<option  value=${item.id}>${item.product_name}</option>`;
                                $allproduct.append(optionstring);
                                $productCata.append(optionstring);
                            });
                            // form.on('select(selectCata)',function(data){
                            //     $(data.elem).find('option').removeAttr('selected');
                            //     $(data.elem).siblings().find('input').val($IF.producttype[productId].product_name);
                            //     $(data.elem).find("option[value = '" + $IF.producttype[productId].id + "']").attr("selected", "selected");
                            //     form.render('select');
                            //    })
                            form.on('select(allProduct)', function (data) {
                                initProductCard(data.value);

                            });
                            form.on('select(fenlei)', function (data) {
                                let productId = data.value;
                                getProductTag(productId);
                            });

                            form.render('select');

                        });
                    } else {
                        $IF.errCodefn(res)
                    }
                }
            });
        }
        function checkForm() {
            var uploadFormFlag = true;
            var neccesaray = $('.necessary');
            neccesaray.each(function (neccesarayDom) {
                if (!$(this).find('input').val()) uploadFormFlag = false;
            })
            return uploadFormFlag;
        }

        //初始化产品卡片
        function initProductCard(productId) {
            $.ajax({
                type: "post",
                url: $IF.apiServer + "/product/info/query",
                processData: false,
                contentType: "application/json",
                data: JSON.stringify({
                    type: productId,
                    queryString: $('#product-name').val() || ''
                }),
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", localStorage.getItem('token'));
                },
                success: function (res) {
                    if (res && res.data && res.errCode == 0) {

                        $('.container-content-bottom').hide();
                        let productCards = res.data;
                        $IF.productData = {};
                        for (var item of productCards) {
                            $IF.productData[item.id] = item;
                        }
                        getCardDom(productCards);
                        if (res.data.length <= 0) {
                            $('.container-content-bottom').show();
                        }
                    }
                    else {
                        $IF.errCodefn(res)
                    }
                }
            });

        }
        function getCardDom(productCards) {
            $('.container-content-list').html('');
            let stringDom = '';
            console.log('productCards', productCards);
            productCards.forEach(function (item, i) {
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
                        <span class="edit">编辑</span>
                        <span class="delete">删除</span>
                    </div>
                    </li>
                `;
            });
            for (let productId of productCards) {
            }
            $('.container-content-list').html(stringDom);
        }
        //页面初始化
        function getProductTag(productId, tag1, tag2) {
            console.log("productId", productId)
            $.ajax({
                type: "get",
                url: $IF.apiServer + "/tag/" + productId,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", localStorage.getItem('token'));
                },
                success: function (res) {
                    if (res && res.data && res.errCode == 0) {
                        var tags = res.data;
                        layui.use(['form'], function () {
                            var laydate = layui.laydate;
                            var form = layui.form;
                            var $filterTip = $('#productDetail').find("select[name='filterTip']");
                            let $selectDom = $('#productDetail').find("select[name='selectCata']");
                            var $subTip = $('#productDetail').find("select[name='subTip']");
                            $filterTip.html('<option value=""  selected="">请选择</option>');
                            $subTip.html('<option value=""  selected="">请选择</option>');
                            if (productId) {
                                $selectDom.html('<option value=""  selected="">请选择</option>');
                                for (let productType in $IF.producttype) {
                                    var optionstring = `<option value=${$IF.producttype[productType].id}>${$IF.producttype[productType].product_name}</option>`;
                                    $selectDom.append(optionstring);
                                    if ($IF.producttype[productType].id == productId) {
                                        $selectDom.find("option[value = '" + $IF.producttype[productType].id + "']").attr("selected", "selected");
                                    }
                                }
                            }
                            tags.forEach(function (tag, key) {
                                let subTags = tag.children;
                                var optionstring = `<option value=${tag.id}>${tag.name}</option>`;
                                $filterTip.append(optionstring);

                                if (tag1) {
                                    if (tag1 == tag.id) {
                                        // $filterTip.find('input').val(tag.name);
                                        $filterTip.find("option[value = '" + tag.id + "']").attr("selected", "selected");

                                        if (tag2) {
                                            subTags.forEach(function (subTag, key) {
                                                var optionstring = `<option value=${subTag.id}>${subTag.name}</option>`;
                                                $subTip.append(optionstring);
                                                if (tag2 == subTag.id) {
                                                    // $subTip.find('input').val(subTag.name);
                                                    $subTip.find("option[value = '" + subTag.id + "']").attr("selected", "selected");
                                                }
                                            })
                                        }
                                    }
                                }
                            });

                            form.on('select(saixuan)', function (data) {
                                $subTip.html('<option value=""  selected="">请选择</option>');
                                var selectOption = data.value;

                                tags.forEach(function (tag, keys) {
                                    if (Number(selectOption) == tag.id) {
                                        var subTags = tag.children;
                                        console.log('tttttt', subTags);
                                        subTags.forEach(function (subTag, key) {
                                            var optionstring = `<option value=${subTag.id}>${subTag.name}</option>`;
                                            $subTip.append(optionstring);
                                        })
                                    }
                                })
                                form.render('select');
                            })
                            form.render('select');

                        });
                    } else {
                        $IF.errCodefn(res)
                    }

                }
            });
        }
        //绑定点击上传
        function handleDragUpload($ele) {
            $ele.on("dragenter", function (e) {

                e.preventDefault();
            });
            $ele.on('dragover', (e) => {
                e.preventDefault();
            })
            $ele.on('drop', (e) => {
                e.stopPropagation();
                e.preventDefault();
                const files = e.originalEvent.dataTransfer.files; //获取文件
                console.log(files);
                //检查视频格式
                console.log(files[0]);
                var fileNameArr = files[0].name.split('.');
                var fileExten = fileNameArr[fileNameArr.length - 1];

                // var fileExten=files[0].name.slice(files[0].name.indexOf('.')+1);
                let fileFormatObj = checkFileFormat(fileExten);
                if (fileFormatObj) {
                    if ($ele[0].className == 'uploadVideo-content-box') {
                        if (fileFormatObj.type == 'img') {
                            uploadFile(files, 'img', 'top');
                        } else {
                            uploadFile(files, 'video', 'top');
                        }
                    } else if ($ele[0].className == 'uploadImage-content-box') {
                        uploadFile(files, 'img');
                    }
                } else {
                    layer.open({
                        btnAlign: 'c'
                        , title: '提示'
                        , content: '文件格式不支持'
                    });
                }

                // if (checkFileFormat(files[0])) {
                //     uploadFile(files, 'video');
                // } else if (/image/g.test(files[0].type)) {
                //     uploadFile(files, 'img')
                // } else {
                //     layer.open({
                //         btnAlign: 'c'
                //         , title: '提示'
                //         , content: '文件格式不支持'
                //     });


                // }
            })

        }
        //视屏格式检查
        function checkFileFormat(fileExten) {
            //     if (/image/g.test(file.type)) {
            //         fileObj.type = 'img';
            //         fileObj.checkFormatFlag = true;

            //     }
            //     if (/video/g.test(file.type) && fileType.indexOf(file.type) !== -1) {
            //         fileObj.type = 'video';
            //         fileObj.checkFormatFlag = true;
            //     }
            //     return fileObj;
            // }
            console.log(fileExten);
            const fileType = {
                'img': ['png', 'gif', 'jpeg', 'bmp', 'jpg'],
                'video': ['mp4', 'avi', 'mov']
            }
            let fileObj = null;
            for (var type in fileType) {
                if (fileType[type].indexOf(fileExten) !== -1) {
                    fileObj = {};
                    fileObj.type = type;
                    fileObj.checkFormatFlag = true;

                }
            }
            return fileObj;
            // const fileType = ['mp4', 'avi', 'mov','png','gif','jpeg','bmp'];
            // if(fileType.indexOf(fileExten)!==-1){
            //     let fileObj = {};
            //       if(/image/g.test(file.type)){
            //         fileObj.type = 'img';
            //       }else if(/video/g.test(file.type)){
            //         fileObj.type = 'video';
            //       }

            //     fileObj.checkFormatFlag = true;
            //     return fileObj;
            // }

        }
        // function uploadFile(files,type) {
        //     const file = files[0];
        //     if (/video/g.test(file.type)) {
        //         var form_data = new FormData();
        //         form_data.append("video", file);
        //         $.ajax({
        //             type: "POST",
        //             url: "test.html",
        //             data: form_data,
        //             success: function (res) {
        //                 layer.open({
        //                     btnAlign: 'c'
        //                     , title: '提示'
        //                     , content: '上传成功'
        //                     , yes: function () {
        //                         var $video = $('<video controls></video>');
        //                         var $videoBox = $('.uploadVideo-content');
        //                         $videoBox.append(video);
        //                         vedioUploadFlag = true;
        //                         layer.closeAll();
        //                     }
        //                 });

        //             }
        //         });

        //     } else if (/image/g.test(file.type)) {
        //         var form_data = new FormData();
        //         form_data.append("img", file);
        //         $.ajax({
        //             type: "POST",
        //             url: "test.html",
        //             data: form_data,
        //             success: function (res) {
        //                 layer.open({
        //                     btnAlign: 'c'
        //                     , title: '提示'
        //                     , content: '上传成功'
        //                     , yes: function () {
        //                         var $img = $('<img />');
        //                         var $imgBox = $('.uploadImage-content');
        //                         $imgBox.append($img);
        //                         imgUploadFlag = true;
        //                         layer.closeAll();
        //                     }
        //                 });

        //             }
        //         });
        //     }
        // }
        function uploadFile(files, type, pos) {

            const file = files[0]; type;
            console.log(file);
            var formData = new FormData();
            formData.append("file", file);
            formData.append("fileType", type);
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
                        console.log()
                        setData(type, res.data, pos);
                    } else {
                        $IF.errCodefn(res)
                    }

                },
                error: function (err) {
                    inputLock = false;
                }
            });
        }
        function setData(type, url, pos) {
            layer.open({
                btnAlign: 'c'
                , title: '提示'
                , content: '上传成功'
                , yes: function () {

                    layer.closeAll();
                    setFile(type, url, pos);
                }
            });

        }
        function setFile(type, url, pos) {
            if (pos == "top") {
                var $fileDom = null;
                var $deleteFileBtn = null;
                if (type == 'video') {
                    $fileDom = $('<video controls></video>');
                    var $videoBox = $('.uploadVideo-content');
                    $fileDom[0].src = $IF.apiServer + url;
                    $videoBox.append($fileDom);
                    $deleteFileBtn = $('<span  class="topDeleteFile"></span>');


                } else {
                    $fileDom = $('<img />');
                    var $videoBox = $('.uploadVideo-content');
                    $fileDom[0].src = $IF.apiServer + url;
                    $videoBox.append($fileDom);
                    $deleteFileBtn = $('<span  class="topDeleteFile"></span>');
                }
                fileUrl.videoUrl = url;
                vedioUploadFlag = true;
                fileUrl.type = type;
                $videoBox.append($deleteFileBtn);
                $deleteFileBtn.click(function () {
                    $('#uploadVideoInp').val('');
                    vedioUploadFlag = false;
                    $fileDom.remove();
                    $(this).remove();

                });

            } else {
                if (type == "img") {
                    //上传封面
                    var $imgBox = $('.uploadImage-content');
                    var $img = $('<img />');
                    $img[0].src = $IF.apiServer + url;
                    fileUrl.imgUrl = url;
                    $imgBox.append($img);
                    var $deleteFileBtn = $('<span  class="deleteFile"></span>')
                    $imgBox.append($deleteFileBtn);
                    $deleteFileBtn.click(function () {
                        $('#uploadImgInp').val('');
                        imgUploadFlag = false;
                        $img.remove();
                        $(this).remove();
                    });
                    imgUploadFlag = true;
                }
            }
        }
        function releaseProduct() {
            var $productDetail = $('#productDetail');
            var formData = new FormData($productDetail[0]);
            // formData.append('image', 'http://pic5.iqiyipic.com/image/20180731/e9/5d/v_117779482_m_601_160_90.jpg');
            // formData.append('file', 'http://pic5.iqiyipic.com/image/20180731/e9/5d/v_117779482_m_601_160_90.jpg');
            formData.append('image', fileUrl.imgUrl);
            formData.append('file', fileUrl.videoUrl);
            formData.append('fileType', fileUrl.type);
            let formObj = {};
            for (var pair of formData.entries()) {
                formObj[pair[0]] = pair[1];
            }
            console.log(formObj);

            $.ajax({
                type: "POST",
                url: $IF.apiServer + "/product/info/add",
                // data: formObj,
                processData: false,
                contentType: "application/json",
                data: JSON.stringify(formObj),
                // contentType:"multipart/form-data",
                dataType: 'json',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", localStorage.getItem('token'));
                },
                success: function (res) {
                    if (res && res.data && res.errCode == 0) {
                        console.log(res.data);
                        layer.open({
                            btnAlign: 'c'
                            , title: '提示'
                            , content: '发布成功'
                            , yes: function () {
                                layer.closeAll();
                                location.reload();
                            }
                        });
                    } else {
                        $IF.errCodefn(res)
                    }

                }
            });

        }
        function emptyData() {
            let $videoCon = $('.uploadVideo-content');
            let $imgCon = $('.uploadImage-content');
            if ($videoCon.find('img').length >= 0) {
                $videoCon.find('img').remove();
            }
            if ($videoCon.find('video').length >= 0) {
                $videoCon.find('video').remove();
            }
            if ($imgCon.find('img').length >= 0) {
                $imgCon.find('img').remove();
            }
            $videoCon.find('.topDeleteFile').remove();
            $imgCon.find('.deleteFile').remove();
            $(":input", "#productDetail")
                .val("")
                .removeAttr("checked")
                .removeAttr("selected");
            //清空一级以及二级标签
            layui.use(['form'], function () {
                var form = layui.form;
                var $filterTip = $('#productDetail').find("select[name='filterTip']");
                var $subTip = $('#productDetail').find("select[name='subTip']");
                $filterTip.html('<option value=""  selected="">请选择</option>');
                $subTip.html('<option value=""  selected="">请选择</option>');
                form.render('select');
            })

        }
        function projectModal() {
            $(document).click(function (e) {
                if (e.target.className === "modal-shade") {
                    $(".modal-shade").css("display", "none");
                    $(".project-modal").css("display", "none");
                }
            });
            $('.project-modal').on("click", ".closebtn", function () {

                $(".modal-shade").css("display", "none");
                $(".project-modal").css("display", "none");
            })
        }
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
              <video class="${item.scene_type == 'img' ? 'hide' : 'show'}" src="${$IF.apiServer + item.scene}" controls="controls">
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
              <a href="${item.url ? item.url : 'javascript:;'}" target="blank" class="project-notice-content ${item.url ? 'linkBlue' : ''}">${item.url ? item.url : '暂无'}
              </a>
             </div>
              <div class="project-notice">
                <h4>上线时间：</h4>
                <p class="project-notice-content">${new Date(item.online_time).format('yyyy-MM-dd hh:mm:ss')}
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
        }
        function initUserInfo() {
            $IF.getUserInfo();
            $('.user .username').html($IF.userInfo && $IF.userInfo.user_name);
        }

        function tips(flag, parentClassName, time, poi, jump) {
            if (document.getElementsByClassName('animateTips001').length != 0) {
                document.getElementsByClassName(parentClassName)[0].removeChild(document.getElementsByClassName('animateTips001')[0]);
            }
            var poi = poi || 'center';
            var jump = jump || '';
            var div_uuid = getUuid();
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

        function getUuid() {
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
    }
);