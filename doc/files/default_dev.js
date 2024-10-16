var eng_num = /[^a-zA-Z0-9_-]/g;
var eng_kor = /[^a-zA-Zㄱ-ㅎ가-힣]/g;
var eng_kor_num = /[^a-zA-Zㄱ-ㅎ가-힣0-9]/g;
var num = /[^0-9]/g;
var eng = /[^a-zA-Z]/g;
var kor = /[ㄱ-ㅎ가-힣]/g;
var email = /[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
var emailf = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
var password = /(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
var new_id =  /^[a-zA-Z0-9](?=.*[a-zA-Z])(?=.*[0-9]).{6,12}$/;
var new_password = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/
var space = /\s/g;

$(document).ready(function () {
    $(document).on("keyup", "input:text[numberOnly]", function () {
        $(this).val(
            $(this)
                .val()
                .replace(/[^0-9]/gi, "")
        );
    });
    $(document).on("keyup", "input:text[abcOnly]", function () {
        $(this).val(
            $(this)
                .val()
                .replace(/[^a-zA-Z0-9]/gi, "")
        );
    });
    $(document).on("keyup", "input:text[datetimeOnly]", function () {
        $(this).val(
            $(this)
                .val()
                .replace(/[^0-9:\-]/gi, "")
        );
    });
    $(document).on("keyup", "input:text[abcOnlySamll]", function () {
        $(this).val(
            $(this)
                .val()
                .replace(/[^a-z0-9]/gi, "")
        );
    });
});

(function ($) {
    "use strict";
    $(function () {
        $(document).on("mouseenter mouseleave", ".sidebar .nav-item", function (ev) {
            var body = $("body");
            var sidebarIconOnly = body.hasClass("sidebar-icon-only");
            var sidebarFixed = body.hasClass("sidebar-fixed");
            if (!("ontouchstart" in document.documentElement)) {
                if (sidebarIconOnly) {
                    if (sidebarFixed) {
                        if (ev.type === "mouseenter") {
                            body.removeClass("sidebar-icon-only");
                        }
                    } else {
                        var $menuItem = $(this);
                        if (ev.type === "mouseenter") {
                            $menuItem.addClass("hover-open");
                        } else {
                            $menuItem.removeClass("hover-open");
                        }
                    }
                }
            }
        });

        $('[data-toggle="offcanvas"]').on("click", function () {
            $(".sidebar-offcanvas").toggleClass("active");
        });

        var body = $("body");
        var contentWrapper = $(".content-wrapper");
        var scroller = $(".container-scroller");
        var footer = $(".footer");
        var sidebar = $(".sidebar");
        sidebar.on("show.bs.collapse", ".collapse", function () {
            sidebar.find(".collapse.show").collapse("hide");
        });
        applyStyles();

        function addActiveClass(element) {
            if (current === "") {
                //for root url
                if (element.attr("href").indexOf("index.html") !== -1) {
                    element.parents(".nav-item").last().addClass("active");
                    if (element.parents(".sub-menu").length) {
                        element.closest(".collapse").addClass("show");
                        element.addClass("active");
                    }
                }
            } else {
                //for other url
                if (element.attr("href").indexOf(current) !== -1) {
                    element.parents(".nav-item").last().addClass("active");
                    if (element.parents(".sub-menu").length) {
                        element.closest(".collapse").addClass("show");
                        element.addClass("active");
                    }
                    if (element.parents(".submenu-item").length) {
                        element.addClass("active");
                    }
                }
            }
        }
        var current = location.pathname
            .split("/")
            .slice(-1)[0]
            .replace(/^\/|\/$/g, "");
        $(".nav li a", sidebar).each(function () {
            var $this = $(this);
            //addActiveClass($this);
        });

        function applyStyles() {
            if (!body.hasClass("rtl")) {
                if ($(".settings-panel .tab-content .tab-pane.scroll-wrapper").length) {
                    const settingsPanelScroll = new PerfectScrollbar(".settings-panel .tab-content .tab-pane.scroll-wrapper");
                }
                if ($(".chats").length) {
                    const chatsScroll = new PerfectScrollbar(".chats");
                }
                if (body.hasClass("sidebar-fixed")) {
                    if ($("#sidebar").length) {
                        var fixedSidebarScroll = new PerfectScrollbar("#sidebar .nav");
                    }
                }
            }
        }
        $('[data-toggle="minimize"]').on("click", function () {
            if (body.hasClass("sidebar-toggle-display") || body.hasClass("sidebar-absolute")) {
                body.toggleClass("sidebar-hidden");
            } else {
                body.toggleClass("sidebar-icon-only");
            }
        });
        $(".form-check label,.form-radio label").append('<i class="input-helper"></i>');
        $('[data-toggle="horizontal-menu-toggle"]').on("click", function () {
            $(".horizontal-menu .bottom-navbar").toggleClass("header-toggled");
        });
        var navItemClicked = $(".horizontal-menu .page-navigation >.nav-item");
        navItemClicked.on("click", function (event) {
            if (window.matchMedia("(max-width: 991px)").matches) {
                if (!$(this).hasClass("show-submenu")) {
                    navItemClicked.removeClass("show-submenu");
                }
                $(this).toggleClass("show-submenu");
            }
        });
        $(window).scroll(function () {
            if (window.matchMedia("(min-width: 992px)").matches) {
                var header = $(".horizontal-menu");
                if ($(window).scrollTop() >= 70) {
                    $(header).addClass("fixed-on-scroll");
                } else {
                    $(header).removeClass("fixed-on-scroll");
                }
            }
        });

        /* Code for attribute data-custom-class for adding custom class to tooltip */
        if (typeof $.fn.popover.Constructor === "undefined") {
            throw new Error("Bootstrap Popover must be included first!");
        }
        var Popover = $.fn.popover.Constructor;
        // add customClass option to Bootstrap Tooltip
        $.extend(Popover.Default, {
            customClass: "",
        });
        var _show = Popover.prototype.show;
        Popover.prototype.show = function () {
            // invoke parent method
            _show.apply(this, Array.prototype.slice.apply(arguments));
            if (this.config.customClass) {
                var tip = this.getTipElement();
                $(tip).addClass(this.config.customClass);
            }
        };
        $('[data-toggle="popover"]').popover();
    });
})(jQuery);

function go_guide(url){
    // window.open(url, '_blank');
    location.href=url;
}

function sendfile_summernote(ctype, file, no, editor){
    if (!file.type.match("image.*")) {
        jalert("Only image extensions are allowed.");
        return;
    }

    if (file.size > 12000000) {
        jalert("Uploads must be less than 10MB.");
        return;
    }

    var form_data = new FormData();
    form_data.append("ctype", ctype);
    form_data.append("file_no", no);
    form_data.append("file", file);
    $.ajax({
        data: form_data,
        type: "POST",
        enctype: "multipart/form-data",
        url: "/api/user/summernote",
        cache: false,
        timeout: 5000,
        contentType: false,
        processData: false,
        success: function (data) {
            if(data.success == 'true'){
                $(editor).summernote("insertImage", data.url);
            }else{
                alert('Failed to save image.')
            }
        },
        error: function (err) {
            console.log(err);
        },
    });
}

function f_search_date_range(nm, sd, ed) {
    $("#search_sdate").val(sd);
    $("#search_edate").val(ed);

    $(".search_date_range").removeClass("active");
    $("#search_date_range" + nm).addClass("active");

    return false;
}

function f_search_ad_status(nm, status){
    $('#search_status').val(status);
    
    $(".search_status_btn").removeClass("active");
    $("#search_status_btn" + nm).addClass("active");
    f_get_box_list();
}

function f_get_box_list(pg = "", obj_frm = "") {
    if (obj_frm) {
        var obj_frm_t = "#" + obj_frm + " ";
    } else {
        var obj_frm_t = "#frm_list ";
    }

    if (pg == null || pg == "") {
        var ls_obj_pg = localStorage.getItem("obj_pg");
        if (ls_obj_pg) {
            pg = ls_obj_pg;

            for (let i = 0; i < localStorage.length; i++) {
                let key = localStorage.key(i);
                if (localStorage.getItem(key) && $(obj_frm_t + "#" + key).val() == "") {
                    $(obj_frm_t + "#" + key).val(localStorage.getItem(key));
                }
            }
        } else {
            pg = 1;
        }
    }

    $(obj_frm_t + "#obj_pg").val(parseInt(pg));

    if (obj_frm) {
        var form_t = $("#" + obj_frm)[0];
    } else {
        var form_t = $("#" + $("#obj_frm").val())[0];
    }
    var formData_t = new FormData(form_t);

    $.ajax({
        url: $(obj_frm_t + "#obj_uri").val(),
        enctype: "multipart/form-data",
        data: formData_t,
        type: "POST",
        async: true,
        contentType: false,
        processData: false,
        cache: true,
        timeout: 5000,
        success: function (data) {
            if (data.success == "true") {
                for (const [key, value] of formData_t.entries()) {
                    localStorage.setItem(obj_frm + key, value);
                }

                $("#" + $(obj_frm_t + "#obj_list").val()).html(data.html_data);
            }
        },
        error: function (err) {
            console.log(err);
        },
    });

    return false;
}

function f_get_box_cafe_list(pg = "", obj_frm = "", page_type=1) {
    if (obj_frm) {
        var obj_frm_t = "#" + obj_frm + " ";
    } else {
        var obj_frm_t = "#frm_list ";
    }

    if (pg == null || pg == "") {
        var ls_obj_pg = localStorage.getItem("obj_pg");
        if (ls_obj_pg) {
            pg = ls_obj_pg;

            for (let i = 0; i < localStorage.length; i++) {
                let key = localStorage.key(i);
                if (localStorage.getItem(key) && $(obj_frm_t + "#" + key).val() == "") {
                    $(obj_frm_t + "#" + key).val(localStorage.getItem(key));
                }
            }
        } else {
            pg = 1;
        }
    }

    $(obj_frm_t + "#obj_pg").val(parseInt(pg));

    if (obj_frm) {
        var form_t = $("#" + obj_frm)[0];
    } else {
        var form_t = $("#" + $("#obj_frm").val())[0];
    }
    var formData_t = new FormData(form_t);

    let local1_arr = new Array();
    document.getElementsByName('local1').forEach((local1) => {
        if(!local1_arr.includes(local1.value)){
            local1_arr.push(local1.value);
        }
    });
    let local = new Array();
    local1_arr.forEach((local1) => {
        document.querySelectorAll('input[name="local2_'+local1+'"]').forEach((local2) =>{
            local.push({
                'local1': local1,
                'local2': local2.value
            });
        })
    })

    let cate1_arr = new Array();
    document.getElementsByName('cate1').forEach((cate1) => {
        if(!cate1_arr.includes(cate1.value)){
            cate1_arr.push(cate1.value);
        }
    });

    let cate = new Array();
    cate1_arr.forEach((cate1)=>{
        document.querySelectorAll('input[name="cate2_'+cate1+'"]').forEach((cate2) => {
            cate.push({
                'cate1': cate1,
                'cate2': cate2.value
            })
        })
    })
    formData_t.append('local', JSON.stringify(local));
    formData_t.append('cate', JSON.stringify(cate));

    $.ajax({
        url: $(obj_frm_t + "#obj_uri").val(),
        enctype: "multipart/form-data",
        data: formData_t,
        type: "POST",
        async: true,
        contentType: false,
        processData: false,
        cache: true,
        timeout: 5000,
        success: function (data) {
            if (data.success == "true") {
                for (const [key, value] of formData_t.entries()) {
                    localStorage.setItem(obj_frm + key, value);
                }

                $('#cafe_all_count').text(data.all_count);
                if(page_type == 1){
                    $("#" + $(obj_frm_t + "#obj_list").val()).html(data.html_data);
                }else{
                    $('#more_btn_div').remove();
                    $("#" + $(obj_frm_t + "#obj_list").val()).append(data.html_data);
                }
            }
        },
        error: function (err) {
            console.log(err);
        },
    });

    return false;
}

function f_localStorage_reset_go(url) {
    localStorage.clear();
    location.href = url;
}

function checkAllToggle(all_selector, check_selector) {
    let el_all_check = document.querySelector(all_selector);
    let el_check_all = document.querySelectorAll(check_selector);
    let is_check = el_all_check.checked;
  
    if (is_check === true) {
        el_check_all.forEach((checkbox) => {
        if (checkbox.disabled !== true) {
            checkbox.setAttribute("checked", "checked");
            checkbox.checked = true;
            }
        });
    } else {
        el_check_all.forEach((checkbox) => {
            checkbox.removeAttribute("checked", "checked");
            checkbox.checked = false;
        });
    }
}

function checkAllToggleCart(all_selector, check_selector, all_count) {
    let el_all_check = document.querySelector(all_selector);
    let el_check_all = document.querySelectorAll(check_selector);
    let is_check = el_all_check.checked;
  
    if (is_check === true) {
        $('#check_num1').text(all_count);
        $('#check_num2').text(all_count);
        el_check_all.forEach((checkbox) => {
        if (checkbox.disabled !== true) {
            checkbox.setAttribute("checked", "checked");
            checkbox.checked = true;
            }
        });
    } else {
        $('#check_num1').text(0);
        $('#check_num2').text(0);
        el_check_all.forEach((checkbox) => {
            checkbox.removeAttribute("checked", "checked");
            checkbox.checked = false;
        });
    }
}

function checkBoxToggle(all_selector, check_selector) {
    let el_all_check = document.querySelector(all_selector);
    let checkbox_ln = document.querySelectorAll(
        check_selector + ":enabled"
    ).length;
    let check_ln = document.querySelectorAll(
        check_selector + ":checked:enabled"
    ).length;
    if (checkbox_ln === check_ln) {
        el_all_check.setAttribute("checked", "checked");
        el_all_check.checked = true;
    } else {
        el_all_check.removeAttribute("checked", "checked");
        el_all_check.checked = false;
    }
}
  
function f_preview_image_selected(e, obj_id, obj_name) {
    var files = e.target.files;
    var filesArr = Array.prototype.slice.call(files);
    var obj_t = obj_name + obj_id;

    filesArr.forEach(function (f) {
        if (!f.type.match("image.*")) {
           jalert("Only image extensions are allowed.");
            return;
        }

        if (f.size > 1200000) {
            jalert("Uploads must be less than 1 MB.");
            return;
        }

        var reader = new FileReader();
        reader.onload = function (e) {
            $('#' + obj_t + "_div").addClass('on');
            $("#" + obj_t + "_box").html('<img src="' + e.target.result + '" />');
            $('#'+obj_t+"_on").val(e.target.result);
        };
        reader.readAsDataURL(f);
    });
}

function f_preview_file_delete(obj_id, obj_name){
    var obj_t = obj_name + obj_id;

    if(obj_t){
        $('#'+obj_t).val();
        $('#'+obj_t+"_div").removeClass('on');
        $('#'+obj_t+"_box").html('<p>Select Photo</p>');
        $('#'+obj_t+"_on").val('');
    }
}

function f_ck_reset(){
    $('#mt_id_ck').val('N');
    $('#mt_id_div').removeClass('ip_valid');
    $('#mt_id_div').removeClass('ip_invalid');
}

function f_id_check(){
    if($('#mt_id').val().trim() == ''){
        jalert('Please enter your ID.');
        return false;
    }

    if ($('#mt_id').val().length < 8 || $('#mt_id').val().length > 16) {
        jalert('Please enter an ID between 8 and 16 characters.');
        return false;
    }

    var ajaxData = new FormData()
    ajaxData.append('mt_id', $('#mt_id').val());
    $.ajax({
        url: '/api/user/join/check_id',
        type: 'POST',
        data: ajaxData,
        enctype: "multipart/form-data",
        cache: false,
        timeout: 5000,
        contentType: false,
        processData: false,
        success: function(data) {
            if(data.success == 'true'){
                $('#mt_id_div').addClass('ip_valid');
                $('#mt_id_div').removeClass('ip_invalid');
                $('#mt_id').focus();
                $('#mt_id_ck').val('Y');
            }else{
                $('#mt_id_err_txt').innerHTML = data.message;
                $('#mt_id_div').addClass('ip_invalid');
                $('#mt_id_div').removeClass('ip_valid');
                $('#mt_id_ck').val('N');
            }
        }
    })
}

function f_mt_hp_send(url){
    if($('#mt_hp').val().trim() == ''){
        jalert('Please enter your phone number.');
        return false;
    }

    var ajaxData = new FormData();
    ajaxData.append('mt_hp', $('#mt_hp').val());

    $.ajax({
        url: url,
        enctype: "multipart/form-data",
        data: ajaxData,
        type: "POST",
        async: true,
        contentType: false,
        processData: false,
        cache: true,
        timeout: 5000,
        success:function(data){
            if(data.success == "true"){
                $("#btn_hp_send").prop("disabled", true);
                $("#mt_hp").prop("readonly", true);
                $("#mt_hp_check").val("N");
                $("#hp_confirm_box").show();
                hp_set_timer();
            }else{
                $.alert({
                    title: "",
                    content: data.message,
                    buttons: {
                        confirm: {
                            text: "Confirm",
                            action: function () {
                                $("#mt_hp").val("");
                                $('#mt_hp_confirm').val("");
                                $("#mt_hp_check").val("N");
                                $("#mt_hp").focus();

                                $("#btn_hp_send").prop("disabled", false);
                                $("#mt_hp").prop("readonly", false);
                                clearInterval(timer1);
                            },
                        },
                    },
                });
            }
        }
    })
}

var timer1;
function hp_set_timer(a = ""){
    var time = 180;
    var min = "";
    var sec = "";
    $("#btn_hp_send").prop("disabled", true);
    $("#mt_hp").prop("readonly", true);
    timer1 = setInterval(function(){
        min = parseInt(time/ 60);
        sec = time % 60;
        if(parseInt(min) < 10) min = '0'+min;
        if(parseInt(sec) < 10) sec = '0'+sec;
        document.getElementById("hp_confirm_timer").innerHTML = min + ":" + sec;
        time--;
        if (time < -1) {
            jalert("The authentication number has expired.");
            clearInterval(timer1);

            time = 180;
            document.getElementById("hp_confirm_timer").innerHTML = "03:00";

            $("#hp_confirm_box").hide();
            $("#btn_hp_send").prop("disabled", false);
            $("#mt_hp").prop("readonly", false);
            $("#mt_hp").val("");
            $('#mt_hp_confirm').val("");
            $("#mt_hp").focus();

            $('#mt_hp_div').removeClass('ip_valid');
            $('#mt_hp_div').removeClass('ip_invalid');
        }
    }, 1000);
}

function f_hp_confirm(){
    if($('#mt_hp_confirm').val() == ''){
        jalert('Please enter the authentication code.');
        return false;
    }

    var ajaxData = new FormData();
    ajaxData.append("mt_hp_confirm", $('#mt_hp_confirm').val());

    $.ajax({
        url: '/api/user/join/check_sms',
        enctype: "multipart/form-data",
        data: ajaxData,
        type: "POST",
        async: true,
        contentType: false,
        processData: false,
        cache: true,
        timeout: 5000,
        success: function (data) {
            if(data.success=="true"){
                $("#btn_hp_send").prop('disabled', true);
                $("#mt_hp").prop("readonly", true);
                $('#mt_hp_check').val('Y');

                $('#hp_confirm_box').hide();
                $('#mt_hp_confirm').val('');
                $('#mt_hp_div').addClass('ip_valid');
                $('#mt_hp_div').removeClass('ip_invalid');
                clearInterval(timer1);
            }else{
                $('#mt_hp_err_txt').innerHTML = data.message;
                $('#mt_hp_div').addClass('ip_invalid');
                $('#mt_hp_div').removeClass('ip_valid');
                $('#mt_hp_check').val('N');
            }
        }
    })
}

function get_local2_list(local1=247){
    if(local1 == ''){
        jalert('Please select a region.');
        return false;
    }

    document.querySelectorAll('.local1').forEach((local) => {
        if($('#'+local.id).hasClass('on')){
            $('#'+local.id).removeClass('on');
        }

        if(local.id == 'local1_'+local1){
            $('#'+local.id).addClass('on');
        }
    })

    var local2_arr = new Array();
    document.getElementsByName('local2_'+local1).forEach((local2) => {
        local2_arr.push(local2.value);
    })

    var ajaxData = new FormData();
    ajaxData.append("local1", local1);
    ajaxData.append("local2", JSON.stringify(local2_arr));

    $.ajax({
        url: '/api/user/cafe/local',
        enctype: "multipart/form-data",
        data: ajaxData,
        type: "POST",
        async: true,
        contentType: false,
        processData: false,
        cache: true,
        timeout: 5000,
        success: function (data) {
            if(data.success=="true"){
                $('#local2_ul').html(data.html);
            }else{
                jalert_url(data.message, 'reload');
            }
        }
    })
}

function set_local(local1, local2){
    var local1_id = 'local1_'+local1;
    var local2_id = 'local2_'+local2;
    var div_id = 'keyword_div_local_'+local1+'_'+local2;
    var div_class = 'keyword_div_local_'+local1;
    if($('#'+local2_id).hasClass('on')){
        $('#'+local2_id).removeClass('on');
        $('#'+div_id).remove();
    }else{
        if(local2 == 'all'){
            document.querySelectorAll('.'+div_class).forEach((div)=>{
                if(div){
                    var remove_local2 = div.id.replace('keyword_div_local_'+local1+'_','');
                    del_local(div.id, remove_local2);
                }
            })
        }else{
            if(document.getElementById('keyword_div_local_'+local1+'_all')){
                del_local('keyword_div_local_'+local1+'_all', 'all')
            }
        }
        var loca1_txt = $('#'+local1_id).text();
        var loca2_txt = $('#'+local2_id).text();
        $('#'+local2_id).addClass('on');
        var html = '<div id="'+div_id+'" class="btn btn-light btn-md rounded-pill select_badge mr_06 mb_06 '+div_class+'">';
        html += '<p class="fs_14 fw_500">'+loca1_txt+'</p>'
        html += '<p class="mx_04"><i class="xi-angle-right text-gray4 fs_11"></i></p>'
        html += '<p class="fs_14 fw_500 mr_04">'+loca2_txt+'</p>'
        html += '<input type="hidden" name="local1" value="'+local1+'"/>'
        html += '<input type="hidden" name="local2_'+local1+'" value="'+local2+'"/>'
        html += '<button type="button" class="btn btn-sm p-0 h-auto" onclick="del_local(\''+div_id+'\', \''+local2+'\')"><i class="xi-close fs_14 text-gray4"></i></button>';
        html += '</div>';
        $('#keyword_list').append(html);
    }
}

function del_local(id, local2){
    if(document.getElementById(id)){
        $('#'+id).remove();
    }
    if($('#local2_'+local2).hasClass('on')){
        $('#local2_'+local2).removeClass('on');
    }
}

function get_cate2_list(cate1=1){
    if(cate1 == ''){
        jalert('Please select a category.');
        return false;
    }

    document.querySelectorAll('.cate1').forEach((cate1) => {
        if($('#'+cate1.id).hasClass('on')){
            $('#'+cate1.id).removeClass('on');
        }
    })

    $('#cate1_'+cate1).addClass('on');

    var cate2_arr = new Array();
    document.getElementsByName('cate2_'+cate1).forEach((cate2) => {
        cate2_arr.push(cate2.value);
    })

    var ajaxData = new FormData();
    ajaxData.append("cate1", cate1);
    ajaxData.append("cate2", JSON.stringify(cate2_arr));

    $.ajax({
        url: '/api/user/cafe/cate',
        enctype: "multipart/form-data",
        data: ajaxData,
        type: "POST",
        async: true,
        contentType: false,
        processData: false,
        cache: true,
        timeout: 5000,
        success: function (data) {
            if(data.success=="true"){
                $('#cate2_ul').html(data.html);
            }else{
                jalert_url(data.message, 'reload');
            }
        }
    })
}

function set_cate(cate1, cate2){
    var cate1_id = 'cate1_'+cate1;
    var cate2_id = 'cate2_'+cate2;
    var div_id = 'keyword_div_cate_'+cate1+'_'+cate2;
    var div_class = 'keyword_div_cate_'+cate1;
    if($('#'+cate2_id).hasClass('on')){
        $('#'+cate2_id).removeClass('on');
        $('#'+div_id).remove();
    }else{
        if(cate2 == 'all'){
            document.querySelectorAll('.'+div_class).forEach((div) => {
                if(div){
                    var remove_cate2 = div.id.replace('keyword_div_cate_'+cate1+'_','');
                    del_cate(div.id, remove_cate2);
                }
            })
        }else{
            if(document.getElementById('keyword_div_cate_'+cate1+'_all')){
                del_cate('keyword_div_cate_'+cate1+'_all', 'all');
            }
        }
        var cate1_txt = $('#'+cate1_id).text();
        var cate2_txt = $('#'+cate2_id).text();
        $('#'+cate2_id).addClass('on');
        var html = '<div id="'+div_id+'" class="btn btn-light btn-md rounded-pill select_badge mr_06 mb_06 '+div_class+'">';
        html += '<p class="fs_14 fw_500">'+cate1_txt+'</p>'
        html += '<p class="mx_04"><i class="xi-angle-right text-gray4 fs_11"></i></p>'
        html += '<p class="fs_14 fw_500 mr_04">'+cate2_txt+'</p>'
        html += '<input type="hidden" name="cate1" value="'+cate1+'"/>'
        html += '<input type="hidden" name="cate2_'+cate1+'" value="'+cate2+'"/>'
        html += '<button type="button" class="btn btn-sm p-0 h-auto" onclick="del_cate(\''+div_id+'\', \''+cate2+'\')"><i class="xi-close fs_14 text-gray4"></i></button>';
        html += '</div>';

        $('#keyword_list').append(html);
    }
}

function del_cate(id, cate2){
    if(document.getElementById(id)){
        $('#'+id).remove();
    }
    if($('#cate2_'+cate2).hasClass('on')){
        $('#cate2_'+cate2).removeClass('on');
    }
}

function f_cafe_list_sort(name){
    document.querySelectorAll('.sort_btn').forEach((btn) => {
        if($('#'+btn.id).hasClass('on')){
            $('#'+btn.id).removeClass('on')
        }
    })

    $('#'+name+'_btn').addClass('on');

    $('#obj_orderby').val(name);
    f_get_box_cafe_list();
}

function set_cafe_info(cafe){
    let cafe_item_id = 'cafe_item_'+cafe;
    
    document.querySelectorAll('.cafe_list .item.active').forEach(function(item) {
        item.classList.remove('active');
    });
    $('#'+cafe_item_id).addClass('active');

    var ajaxData = new FormData();
    ajaxData.append('cafe',cafe);

    $.ajax({
        url: '/api/user/cafe/cafe_info',
        enctype: "multipart/form-data",
        data: ajaxData,
        type: "POST",
        async: true,
        contentType: false,
        processData: false,
        cache: true,
        timeout: 5000,
        success: function (data) {
            if(data.success=="true"){
                $('#cafe_info_div').removeClass('cont_rg_item');

                $('#no_cafe_div').addClass('d-none');
                $('#buy_div').removeClass('d-none');
                $('#cafe_m_del').removeClass('d-none');
                $('#cafe_div').html(data.html);
                $('#cafe_m_div').html(data.mhtml);
                $('#next_btn_div').html(data.btn_html);
                $('#next_mbtn_div').html(data.btn_html);
                $('#cafe_point').text(data.point);
                $('#cafe_m_point').text(data.point);

                $('#cafe_idx').val(cafe);

                if(!$('#toggleButton').hasClass('show')){
                    $('#toggleButton').addClass('show');
                    $('.kakao_ch').addClass('d-none');
                    $('.kakao_chat').addClass('d-none');
                    $('.go_top2').removeClass('show');
                }
            }else{
                jalert_url(data.message, 'reload');
            }
        }
    })
}

function cafe_info_del(){
    document.querySelectorAll('.cafe_list .item.active').forEach(function(item) {
        item.classList.remove('active');
    });

    var btn_html = document.getElementsByClassName('btn-next')[0];
    var btn_node = btn_html.cloneNode(true);

    $('#cafe_info_div').addClass('cont_rg_item');

    $('#no_cafe_div').removeClass('d-none');
    $('#buy_div').addClass('d-none');
    $('#cafe_m_del').addClass('d-none');
    $('#cafe_div').empty();
    $('#cafe_m_div').empty();
    $('#cafe_point').text(0);
    $('#cafe_m_point').text(0);
    $('#cafe_idx').val('');
    $('#next_btn_div').html(btn_node);
    $('#next_mbtn_div').html(btn_node);

    $('#toggleButton').removeClass('show');
    $('.go_top2').addClass('show');
    $('.kakao_ch').removeClass('d-none');
    $('.kakao_chat').removeClass('d-none');
}

function cafe_next(){
    var f = document.frm_list;
    var ajaxData = new FormData(f);
    if(f.cafe_idx.value == ''){
        jalert('Please select a cafe.');
        return false;
    }

    if(f.cafe_type.value == ''){
        jalert_url('There is no cafe service type. Please select a cafe again.', 'reload');
        return false;
    }

    $.ajax({
        url: '/api/user/cafe/next',
        enctype: "multipart/form-data",
        data: ajaxData,
        type: "POST",
        async: true,
        contentType: false,
        processData: false,
        cache: true,
        timeout: 5000,
        success: function (data) {
            if(data.success=="true"){
                location.href=data.url;
            }else{
                jalert_url(data.message, 'reload');
            }
        }
    })
}

function get_before_ad(){
    var f = document.frm_form;
    var ajaxData = new FormData();
    
    if(f.f_pt_idx.value != ''){
        ajaxData.append('f_pt_idx', f.f_pt_idx.value);
        $.ajax({
            url: '/api/user/ad_write/before_ad',
            enctype: "multipart/form-data",
            data: ajaxData,
            type: "POST",
            async: true,
            contentType: false,
            processData: false,
            cache: true,
            timeout: 5000,
            success: function (data) {
                if(data.success=="true"){
                    var p = data.product;
                    $('#pt_writer').val(p.pt_writer);
                    f_input_value_count('pt_writer');
                    $('#pt_name').val(p.pt_name);
                    f_input_value_count('pt_name');
                    $('#pt_title').val(p.pt_title);
                    f_input_value_count('pt_title');
                    $('#pt_reply1').val(p.pt_reply1);
                    f_input_value_count('pt_reply1');
                    $('#pt_reply2').val(p.pt_reply2);
                    f_input_value_count('pt_reply2');
                    
                    let pt_keyword_arr = JSON.parse(p.pt_keyword);
                    pt_keyword_arr.forEach((keyword) => {
                        add_keyword(keyword);
                    });
                }else{
                    jalert_url(data.message, 'reload');
                }
            }
        })
    }
}

function f_input_value_count(id){
    var txt_id = id+'_cnt';
    var txt_length = $('#'+id).val().length;

    $('#'+txt_id).text(txt_length);

    if(id === 'pt_name'){
        check_kw_btn(id);
    }
}

function check_kw_btn(id){
    if($('#'+id).val().trim() == ''){
        $('#ai_kw_btn').attr('disabled',true);
    }else{
        $('#ai_kw_btn').attr('disabled',false);
    }
}

function f_back_save(){
    var f = document.frm_form;
    var ajaxData = new FormData(f);
    var pt_txt = window.editor.getData();

    if(f.pt_idx.vaule == ''){
        jalert('An error occurred. Please try again.');
        return false;
    }

    let keyword_txt = '';
    for(var i=1; i<=$('.keyword_txt').length; i++){
        if(i != 1 && i<=$('.keyword_txt').length){
            keyword_txt += ',';
        }
        keyword_txt += $('#keyword_li'+i).text().trim();
    }
    ajaxData.append('keyword_txt', keyword_txt);
    ajaxData.append('pt_edit_txt', pt_txt);

    $.ajax({
        url: '/api/user/ad_write/before',
        enctype: "multipart/form-data",
        data: ajaxData,
        type: "POST",
        async: true,
        contentType: false,
        processData: false,
        cache: true,
        timeout: 5000,
        success: function (data) {
            if(data.success=="true"){
                location.href=data.url
            }else{
                jalert_url(data.message, 'reload');
            }
        }
    })
}

function f_add_save(){
    var f = document.frm_form;
    var ajaxData = new FormData(f);
    var pt_txt = window.editor.getData();

    if(f.pt_idx.vaule == ''){
        jalert('An error occurred. Please try again.');
        return false;
    }

    let keyword_txt = '';
    for(var i=1; i<=$('.keyword_txt').length; i++){
        if(i != 1 && i<=$('.keyword_txt').length){
            keyword_txt += ',';
        }
        keyword_txt += $('#keyword_li'+i).text().trim();
    }
    ajaxData.append('keyword_txt', keyword_txt);
    ajaxData.append('pt_edit_txt', pt_txt);

    $.ajax({
        url: '/api/user/ad_write/save',
        enctype: "multipart/form-data",
        data: ajaxData,
        type: "POST",
        async: true,
        contentType: false,
        processData: false,
        cache: true,
        timeout: 5000,
        success: function (data) {
            if(data.success=="true"){
                jalert_url('Temporarily saved. You can check it on My Page.', 'reload');
            }else{
                jalert_url(data.message, 'reload');
            }
        }
    })
}

function f_add_cart(){
    var f = document.frm_form;
    var ajaxData = new FormData(f);
    var pt_txt = window.editor.getData();

    if(f.pt_idx.vaule == ''){
        jalert('An error occurred. Please try again.');
        return false;
    }

    if(f.pt_writer.value == ''){
jalert('Please enter the writer.');
return false;
}

if(f.pt_name.value == ''){
jalert('Please enter the product name.');
return false;
}

if(f.pt_title.value == ''){
jalert('Please enter the post title.');
return false;
}

if(f.pt_rdate.value == ''){
jalert('Please select the posting reservation date and time.');
return false;
}

if(f.pt_rtime.value == ''){
jalert('Please select the posting reservation date and time.');
return false; }

if(f.pt_gpt_cnt.value == '' || f.pt_gpt_cnt.value == 0){
jalert('Please create an AI manuscript.');
return false;
}

if(pt_txt == ''){
jalert('Please enter a manuscript.');
return false;
}

    let keyword_txt = '';
    for(var i=1; i<=$('.keyword_txt').length; i++){
        if(i != 1 && i<=$('.keyword_txt').length){
            keyword_txt += ',';
        }
        keyword_txt += $('#keyword_li'+i).text().trim();
    }
    ajaxData.append('keyword_txt', keyword_txt);
    ajaxData.append('pt_edit_txt', pt_txt);

    $.ajax({
        url: '/api/user/ad_write/cart',
        enctype: "multipart/form-data",
        data: ajaxData,
        type: "POST",
        async: true,
        contentType: false,
        processData: false,
        cache: true,
        timeout: 5000,
        success: function (data) {
            if(data.success=="true"){
                jalert_url('Added to cart.', '/cart');
            }else{
                jalert_url(data.message, 'reload');
            }
        }
    })
}

function f_get_keyword_list(){
    var ajaxData = new FormData();

    if($('#pt_name').val() == ''){
        jalert('Please enter the product name.');
        return false;
    }

    if($('#seach_txt').val() == ''){
        ajaxData.append('seach_txt', $('#pt_name').val());
    }else{
        ajaxData.append('seach_txt', $('#seach_txt').val());
    }

    $.ajax({
        url: '/api/user/ad_write/ad_list',
        enctype: "multipart/form-data",
        data: ajaxData,
        type: "POST",
        async: true,
        contentType: false,
        processData: false,
        cache: true,
        timeout: 5000,
        success: function (data) {
            if(data.success == 'true'){
                $('#keyword_table').html(data.html);
            }else{
                $('#ai_keyword').modal('hide');
                jalert(data.message);
            }
        }
    })
}

function show_ai_kw(){
    $('#ai_keyword').modal('toggle');
    f_get_keyword_list();
}

function make_ai(){
    var f = document.frm_form;
    var ajaxData = new FormData(f);

    if(f.pt_name.value == ''){
        jalert('Please enter the product name.');
        return false;
    }

    if(f.pt_title.value == ''){
        jalert('Please enter a post title.');
        return false;
    }

    let keyword_txt = '';
    for(var i=1; i<=$('.keyword_txt').length; i++){
        if(i != 1 && i<=$('.keyword_txt').length){
            keyword_txt += ',';
        }
        keyword_txt += $('#keyword_li'+i).text().trim();
    }
    ajaxData.append('keyword_txt', keyword_txt);

    $('#ai_create').modal('toggle');
    $.ajax({
        url: '/api/user/ad_write/ad_ai',
        enctype: "multipart/form-data",
        data: ajaxData,
        type: "POST",
        async: true,
        contentType: false,
        processData: false,
        cache: true,
        timeout: 60000,
        success: function (data) {
            $('#ai_create').modal('toggle');
            if(data.success == 'true'){
                $('#ckeditor_div').show();
                window.editor.setData(data.data);
                $('#pt_gpt_cnt').val(data.count);
                if(data.count == 3){
                    $('#make_ai_btn').prop('disabled','true');
                }
            }else{
                if(data.url){
                    jalert_url(data.message, data.url);
                }else{
                    jalert(data.message);
                }
            }
        }
    })
}

function f_add_product_all(num){
    if($("input[name='cart_product']:checked").length != 0){
        checkAllToggleCart('#cart_all_product', '.cart_product', num);
        $('#all_price').text(0);
    }else{
        var ajaxData = new FormData();
        ajaxData.append('list', 'all');
        $.ajax({
            url: '/api/user/cart/price',
            enctype: "multipart/form-data",
            data: ajaxData,
            type: "POST",
            async: true,
            contentType: false,
            processData: false,
            cache: true,
            timeout: 60000,
            success: function (data) {
                if(data.success == 'true'){
                    let check_count = $("input[name='cart_product']:checked").length;
                    $('#check_num1').text(check_count);
                    $('#check_num2').text(check_count);
                    checkAllToggleCart('#cart_all_product', '.cart_product', num);

                    $('#all_price').text(data.all_price);
                }else{
                    jalert_url(data.message, 'reload');
                }
            }
        });
    }
}

function f_add_product(pt_idx){
    var ajaxData = new FormData();
    check_arr = '';
    const check_list = document.querySelectorAll('input[name=cart_product]:checked');
    if(check_list.length  == 0){
        $('#check_num1').text(0);
        $('#check_num2').text(0);
        $('#all_price').text(0);
    }else{
        check_list.forEach((check) => {
            if(check_arr != ''){
                check_arr+= ',';
            }
            check_arr+= check.value;
        })
        ajaxData.append('list', check_arr);
        $.ajax({
            url: '/api/user/cart/price',
            enctype: "multipart/form-data",
            data: ajaxData,
            type: "POST",
            async: true,
            contentType: false,
            processData: false,
            cache: true,
            timeout: 60000,
            success: function (data) {
                if(data.success == 'true'){
                    let check_count = $("input[name='cart_product']:checked").length;
                    $('#check_num1').text(check_count);
                    $('#check_num2').text(check_count);
                    checkBoxToggle('#cart_all_product', '.cart_product');

                    $('#all_price').text(data.all_price);
                }else{
                    jalert_url(data.message, 'reload');
                }
            }
        });
    }
}

function f_del_product(pt_idx){
    $.confirm({
        title: "Remove",
        content: "Do you want to remove the product?",
        buttons: {
            confirm: {
                text: "Confirm",
                action: function () {
                    let ajaxData = new FormData();
                    if(pt_idx === 'check'){
                        if($('#cart_all_product').prop('checked')){
                            ajaxData.append('list', 'all');
                        }else{
                            var p_list = document.querySelectorAll("input[name='cart_product']:checked");
                            if(p_list.length == 0){
                                jalert('Please select the product you wish to delete.');
                                return false;
                            }
                            var list = ''
                            p_list.forEach((p) => {
                                if(list!=''){
                                    list += ',';
                                }
                                list += p.value;
                            })
                            ajaxData.append('list', list);
                        }
                    }else{
                        ajaxData.append('list', pt_idx);
                    }
                
                    $.ajax({
                        url: '/api/user/cart/del',
                        enctype: "multipart/form-data",
                        data: ajaxData,
                        type: "POST",
                        async: true,
                        contentType: false,
                        processData: false,
                        cache: true,
                        timeout: 60000,
                        success: function (data) {
                            if(data.success == 'true'){
                                location.reload();
                            }else{
                                jalert(data.message);
                            }
                        }
                    });
                },
            },
            cancel: {
                btnClass: "btn-outline-default",
                text: "Cancel",
                action: function () {
                    close();
                },
            },
        },
    })
}

function f_del_qna(qt_idx){
    $.confirm({
        title: "Remove",
        content: "Do you want to remove the inquiry?",
        buttons: {
            confirm: {
                text: "Confirm",
                action: function () {
                    let ajaxData = new FormData();
                    if(qt_idx == ''){
                        jalert_url('No queries found to remove.', 'reload');
                        return false;
                    }
                    ajaxData.append('qt_idx', qt_idx);
                    
                    $.ajax({
                        url: '/api/user/qna/del',
                        enctype: "multipart/form-data",
                        data: ajaxData,
                        type: "POST",
                        async: true,
                        contentType: false,
                        processData: false,
                        cache: true,
                        timeout: 5000,
                        success: function (data) {
                            if(data.success == 'true'){
                                jalert_url(data.message, '/qna');
                            }else{
                                jalert(data.message);
                            }
                        }
                    });
                },
            },
            cancel: {
                btnClass: "btn-outline-default",
                text: "Cancel",
                action: function () {
                    close();
                },
            },
        },
    })
}

function f_change_date_modal(product){
    var ajaxData = new FormData();
    ajaxData.append('product', product);
    $.ajax({
        url: '/api/user/cart/info',
        enctype: "multipart/form-data",
        data: ajaxData,
        type: "POST",
        async: true,
        contentType: false,
        processData: false,
        cache: true,
        timeout: 60000,
        success: function (data) {
            if(data.success == 'true'){
                $('#pt_idx').val(data.pt_idx)
                $('#pt_rdate').val(data.pt_rdate);
                $('#pt_rtime').val(data.pt_rtime);
                $('#reservation_change').modal('show');
            }else{
                jalert_url(data.message, 'reload');
            }
        }
    })
}

function f_change_date(product){
    var f = document.frm_form;
    var ajaxData = new FormData(f);

    if(f.pt_rdate.value == ''){
        jalert('Please select a reservation date.');
        return false;
        }
        
        if(f.pt_rtime.value == ''){
        jalert('Please select a reservation time.');
        return false;
        }

    $.ajax({
        url: '/api/user/cart/update',
        enctype: "multipart/form-data",
        data: ajaxData,
        type: "POST",
        async: true,
        contentType: false,
        processData: false,
        cache: true,
        timeout: 60000,
        success: function (data) {
            if(data.success == 'true'){
                location.reload();
            }else{
                jalert_url(data.message, 'reload');
            }
        }
    })
}

function set_price(num='input'){
    if(num == 'input'){
        var price = Number($('#price').val());
        var vat_price = (price * 10) / 100;
        var all_price = price+vat_price;
        $('#charge_price').text(price.toLocaleString());
        $('#vat_price').text(vat_price.toLocaleString());
        $('#all_price').text(all_price.toLocaleString());
    }else if(num == 0){
        $('#price').val('');
        $('#charge_price').text('0');
        $('#vat_price').text('0');
        $('#all_price').text('0');
    }else{
        var price = Number($('#price').val())+Number(num);
        var vat_price = (price * 10) / 100;
        var all_price = price+vat_price;
        $('#price').val(price);
        $('#charge_price').text(price.toLocaleString());
        $('#vat_price').text(vat_price.toLocaleString());
        $('#all_price').text(all_price.toLocaleString());
    }
}

function f_myad_cancel(ot_idx){
    var ajaxData = new FormData();
    ajaxData.append('ot_idx', ot_idx);
    $.ajax({
        url: '/api/user/my_ad/cancel_modal',
        type: 'POST',
        data: ajaxData,
        enctype: "multipart/form-data",
        cache: false,
        timeout: 5000,
        contentType: false,
        processData: false,
        success: function(data) {
            if(data.success == 'true'){
                $('#order_div').html(data.html);
                $('#ad_request_cancel').modal('toggle');
            }else{
                jalert(data.message);
            }
        }
    })
}
function f_cancel_point(od_idx){
    var odt_rprice = $('#odt_rprice').text().replace(',','');
    if($('#order_detail'+od_idx).prop('checked')){
        odt_rprice = Number(odt_rprice)+Number($('#order_detail_price'+od_idx).val());
        $('#odt_rprice').text(odt_rprice.toLocaleString());
    }else{
        odt_rprice = Number(odt_rprice)-Number($('#order_detail_price'+od_idx).val());
        $('#odt_rprice').text(odt_rprice.toLocaleString());
    }
}