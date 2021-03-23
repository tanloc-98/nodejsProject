//Create slug input
function change_alias(alias) {
    var str = alias;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str = str.replace(/đ/g,"d");
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
    str = str.replace(/ *? /g,"-");
    str = str.trim(); 
    return str;
}

function changeStatus (link, nameStatus) {
    $.get(link, function( data) {
        console.log(data)
        var btnStatus = $("a."+ nameStatus + "-" + data.id);
        var btnRemove = 'btn-default';
        var btnAdd = 'btn-success';
        var statusValue = 'active';
        if(data.currentStatus == 'active') {
            btnRemove = 'btn-success';
            btnAdd = 'btn-default';
            statusValue = 'inactive';
        }
        var linkChange = btnStatus.attr("onclick").replace(data.currentStatus, statusValue);
        $("a span#btn-" + nameStatus + "-" + data.id).addClass(btnAdd).removeClass(btnRemove);
        btnStatus.notify(data.message, { position:"top", className: 'success' });
        btnStatus.attr("onclick", linkChange);
    });
    return;
}
function changeSpecial (link, nameSpecial) {
    $.get(link, function( data) {
        console.log(data)
        var btnStatus = $("a."+ nameSpecial + "-" + data.id);
        var btnRemove = 'btn-default';
        var btnAdd = 'btn-success';
        var special = 'active';
        if(data.currentSpecial == 'active') {
            btnRemove = 'btn-success';
            btnAdd = 'btn-default';
            special = 'inactive';
        }
        var linkChange = btnStatus.attr("onclick").replace(data.currentSpecial, special);
        $("a span#btn-" + nameSpecial + "-" + data.id).addClass(btnAdd).removeClass(btnRemove);
        btnStatus.notify(data.message, { position:"top", className: 'success' });
        btnStatus.attr("onclick", linkChange);
    });
    return;
}

function changeGroup (link, name) {
    $.get(link, function( data) {
        var btnGroup = $("a#"+ name + "-" + data.id);
        var btnRemove = 'btn-default';
        var btnAdd = '';
        var group_acp = 'yes';
        
        if(data.currentGroupACP == 'yes') {
            btnRemove = '';
            btnAdd = 'btn-default';
            group_acp = 'no';
        }
        var linkChange = btnGroup.attr("onclick").replace(data.currentGroupACP, group_acp);

        $("a span#btn-" + name + "-" + data.id).addClass(btnAdd).removeClass(btnRemove);
        btnGroup.notify(data.message, { position:"top", className: 'success' });
        btnGroup.attr("onclick", linkChange);
    });
    return;
}

$(document).ready(function () {
    var ckbAll = $(".cbAll");
    var fmAdmin = $("#zt-form");

    function readURL(input) {
        if (input.files && input.files[0]) {
          var reader = new FileReader();
          
          reader.onload = function(e) {
            $('img.preview-avatar').attr('src', e.target.result);
          }
          
          reader.readAsDataURL(input.files[0]); // convert to base64 string
        }
    }   
      
        $("#avatar").change(function() {
        readURL(this);
        });
        $("#thumb").change(function() {
        readURL(this);
        });
    // CKEDITOR
    if ($('textarea#content_ck').length) {
        CKEDITOR.replace('content_ck');
    }

    //check selectbox
    change_form_action("#zt-form .slbAction", "#zt-form","#btn-action");

    //check all
    ckbAll.click(function () {
        $('input:checkbox').not(this).prop('checked', this.checked);
        if ($(this).is(':checked')) {
            $(".ordering").attr("name", "ordering");
        }else{
           
            $(".ordering").removeAttr("name");
        }
        
    });
    // hiden notify
    hiddenNotify(".close-btn");



    $("input[name=cid]").click(function () {
        if ($(this).is(':checked')) {
            $(this).parents("tr").find('.ordering').attr("name", "ordering");
        }else{
            $(this).parents("tr").find('.ordering').removeAttr("name");
        }
    });
    
    // CONFIRM DELETE
    $('a.btn-delete').on('click', () => {
        if (!confirm("Are you sure you want to delete this item?")) return false;
    });

    function activeMenu() {
        var url = window.location.pathname, 
        urlRegExp = new RegExp(url.replace(/\/$/,'') + "$");
        // now grab every link from the navigation
        $('#side-menu a').each(function(){
            if(urlRegExp.test(this.href.replace(/\/$/,''))){
                $(this).addClass('active');
            }
        });
    }

    //active menu function
    activeMenu()

    //open menu function
    function openMenu(){
        $('a.active').parent().parent().parent().addClass('menu-open');
    }
    openMenu()

    function change_form_action(slb_selector, form_selector, id_btn_action) {

        var optValue;
        var isDelete = false;
        var pattenCheckDelete = new RegExp("delete", "i");

        $(slb_selector).on("change", function () {
            optValue = $(this).val();
            
            
            if(optValue !== "") {
                $(id_btn_action).removeAttr('disabled');
            } else {
                $(id_btn_action).attr('disabled', 'disabled');
            }
            $(form_selector).attr("action", optValue);
        });

        $(form_selector + " .btnAction").on("click", function () {
            isDelete = pattenCheckDelete.test($(slb_selector).val());
            if(isDelete){
                var confirmDelete = confirm('Are you really want to delete?');
                if(confirmDelete === false){
                    return;
                }
            }

            var numberOfChecked = $(form_selector + ' input[name="cid"]:checked').length;
            if (numberOfChecked == 0) {
                alert("Please choose some items");
                return;
            } else {
                var flag = false;
                var str = $(slb_selector + " option:selected").attr('data-comfirm');
               
                if (str != undefined) {

                    //Kiểm tra giá trị trả về khi user nhấn nút trên popup
                    flag = confirm(str);
                    if (flag == false) {
                        return flag;
                    } else {
                        $(form_selector).submit();
                    }

                } else {
                    if (optValue != undefined) {
                        $(form_selector).submit();
                    }
                }
            }

        });
    }

    // hidden parent (hidden message notify)
    function hiddenNotify(close_btn_selector){
        $(close_btn_selector).on('click', function(){
            $(this).parent().css({'display':'none'});
        })    
    }

    
    $('input[name="name"]').keyup(function(){
        $('input[name="slug"]').val(change_alias($(this).val()));
    });
 
    $('select[name="group_id"]').change(function(){
        $('input[name="group_name"]').val($(this).find('option:selected').text()); //TH chọn Choose Group: validate đã kiểm tra
    });

    $('select[name="category_id"]').change(function(){
        $('input[name="category_name"]').val($(this).find('option:selected').text()); //TH chọn Choose Group: validate đã kiểm tra
    });

    $('select[name="category_id"]').change(function(){
        $('input[name="category_slug"]').val(change_alias($(this).find('option:selected').text())); //TH chọn Choose Group: validate đã kiểm tra
    });

    $('select[name="filter_group"]').change(function(){
        var path = window.location.pathname.split('/');
        var linkRedirect = '/' + path[1] + '/' +  path[2] + '/filter-group/' + $(this).val();
         window.location.pathname = linkRedirect;
    });

    $('select[name="filter_category"]').change(function(){
        var path = window.location.pathname.split('/');
        var linkRedirect = '/' + path[1] + '/' +  path[2] + '/filter-category/' + $(this).val();
         window.location.pathname = linkRedirect;
    });


    $( "form[name=form-upload]" ).submit(function( event ) {
        let avatar = $(this).find("input[name=avatar]");
        $(this).find("input[name=avatar]").remove();
        $(this).append(avatar).css({'display':'none'});
    });

});

