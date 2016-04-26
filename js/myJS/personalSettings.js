$(window).load(function() {
	  

//头像上传
	var options =
	{
		thumbBox: '.thumbBox',
		spinner: '.spinner',
		imgSrc: 'images/avatar.jpg'
	}
	var cropper = $('.imageBox').cropbox(options);
	$('#upload-file').on('change', function(){
		var reader = new FileReader();
		reader.onload = function(e) {
			options.imgSrc = e.target.result;
			cropper = $('.imageBox').cropbox(options);
		}
		reader.readAsDataURL(this.files[0]);
		this.files = [];
	})
	$('#btnCrop').on('click', function(){
		var img = cropper.getDataURL();
		 
		$('.cropped').html('');
		$('.cropped').append('<img src="'+img+'" align="absmiddle" style="width:150px;margin-top:10px;border-radius:150px;box-shadow:0px 0px 12px #7E7E7E;">');
		$('#pic').replaceWith('<img src="'+img+'"style="width: 100%;max-width: 150px;border-radius:150px;box-shadow:0px 0px 12px #7E7E7E;cursor:pointer; "title="点击更改头像" id="pic">');
		// 隐藏模态框
    $("#modifyPictures").modal("hide");

	})
	$('#btnZoomIn').on('click', function(){
		cropper.zoomIn();
	})
	$('#btnZoomOut').on('click', function(){
		cropper.zoomOut();
	})




  // 验证码判断
    var flag2 = false;
    var change = false;
    var change2 = true;
  // 获得原来的电话号码
    var getPhone = $("#mobile").val();

    $("#phoneNum").blur(function(){
      var validatecode = "validateCode=" + $("#phoneNum")[0].value;
   
      if($("#phoneNum")[0].value != ''){         
        $.get("user_checkValidateCode",validatecode,function(data){
           if(data == "false"){
            $("#phoneNum").after("<p id='validate' class='D-hint' style='color: red;'>验证码不正确！</p>");
              flag2 = false;
           }else{
            flag2 = true;
            change2 = false;
           }
        },"text");

        $("#phoneNum").focus(function(){
          $("#validate").remove();
        });
      }
    });

        // 手机验证码判断 - 来自短信api
        $("#zphone").click(function(){
          var getNewPhone = $("#mobile")[0].value;
          if( getNewPhone == ''){    
            // 没有变化
            change = false;

            $.alert({
              icon: 'glyphicon glyphicon-exclamation-sign D-signColorRed',
              title: '提示：',
              confirmButton: '确定',
              content: '请先输入手机号码！',
              confirm: function(){
              }
            });

          }else if(getNewPhone == getPhone){
            
            // 没有变化
            change = false;

            $.alert({
            icon: 'glyphicon glyphicon-exclamation-sign D-signColorRed',
            title: '提示：',
            confirmButton: '确定',
            content: '手机号码没有做修改',
            confirm: function(){
            }
            });}
          else{
            // 有变化
            change = true;
            get_mobile_code();            
          }
        });

        function get_mobile_code(){
          $.post('user_sendValidateCode', {mobile:jQuery.trim($('#mobile').val())}, function(msg) {
            if(data == "提交成功"){
              RemainTime();
            }
            },"text");
          };

        var iTime = 59;
        var Account;

        function RemainTime(){
          $("#zphone").css({"background-color":"#B9E563"});
          document.getElementById('zphone').disabled = true;
          var iSecond,sSecond="",sTime="";
          if (iTime >= 0){

            iSecond = parseInt(iTime%60);
            iMinute = parseInt(iTime/60);

            if (iSecond >= 0){
              if(iMinute>0){
                sSecond = iMinute + "分" + iSecond + "秒";
              }else{
                sSecond = iSecond + "秒";
              }
            }
            sTime=sSecond;
            if(iTime==0){
              clearTimeout(Account);
              sTime='获取手机验证码';
              iTime = 59;
              document.getElementById('zphone').disabled = false;
            }else{
              Account = setTimeout(function(){RemainTime()},1000);
              iTime=iTime-1;
            }
          }else{
            sTime='没有倒计时';
          }

          $("#zphone").html(sTime);
        } 


//判断输入框是否为空
        $("input").blur(function() { //注册blur的事件
       $(this).each(function() { //遍历input元素对象 
        if ("" == $(this).val()) { //判断元素对象的value值
          $(this).addClass("error");//添加css样式
           

        }else{ 
            $(this).removeClass("error");
             
        }
      });
     });
        //判断邮件格式
        $("#txtEmail").blur(function () {
                
            if (/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test($(this).val()) == false) {
                $("#spinfo").text("邮箱格式不正确,请重新填写!");
                $(this).val("");
                $(this).addClass("error");
                $(this).focus();
            }
            else {
                $("#spinfo").text('');
               
             
            }
                 
          }) 
        //判断手机号
        $("#mobile").blur(function () {
                
            if (/^((13[0-9])|(15[^4,\D])|(18[0,5-9]))\d{8}$/.test($(this).val()) == false) {
                $("#phonefo").text("手机号码格式不正确，请重新填写！");
                $(this).val("");
                $(this).focus();
                $(this).addClass("error");
            }
            else {
                $("#phonefo").text('');
                
               
            }
                 
          });
        //判断姓名输入框
        $("#name").blur(function(){
 
          if (/^([a-zA-Z]|[\u4E00-\u9FA5])*$/.test($(this).val()) == false) {
              $("#namefo").text("只输入允许中文或字母，请重新填写！");
              $(this).val("");
              $(this).focus();
            }
            else {
              $("#namefo").text('');
             
            }


        });
        //判断两次密码
        $("#repsw").blur(function(){

          var psw=$("#psw").val();
          var repsw=$("#repsw").val();
          if (psw!=repsw) {
            $("#pswinfo").text("两次密码不一致,请重新填写!");
            $(this).addClass("error");
          }else{
            $("#pswinfo").text(" ");
          }

        });


        // $("#close").click(function(){

        //    $("#upload-file").val("");

        // });

        //密码
        $('#psw').bind('input propertychange', function() {
          $('#D-repsw').css("display","block");
        });

//提交表单
 $("#verify").click(function(){
       var str=true;
       var getNewPhone = $("#mobile")[0].value;

       // 判断前后是否有变化
       if(getNewPhone != getPhone){
          change2 = false;
       }else{
        change2 = true;
       }

      $("#modifyForm input:not(.not-Post)").each(function() { //遍历input元素对象 

        if ("" == $(this).val()) { //判断元素对象的value值
          $(this).addClass("error");//添加css样式
          str =false;
        }else{
            $(this).removeClass("error");
        }
      });

      var getPassword = $("#psw").val();
      var getRepassword = $("#repsw").val();

      if(getPassword == getRepassword){

         if(str && flag2 && change){ 
          $("#modifyForm").submit();
         }
         // 如果什么都没有变化
         if(str && change2){
          $("#modifyForm").submit(); 
         }

         if(!change2){
            $.alert({
              icon: 'glyphicon glyphicon-exclamation-sign D-signColorRed',
              title: '提示：',
              confirmButton: '确定',
              content: '请先验证手机号码',
              confirm: function(){
              }
            });
         }

      }else if(getRepassword == ""){
            $.alert({
              icon: 'glyphicon glyphicon-exclamation-sign D-signColorRed',
              title: '提示：',
              confirmButton: '确定',
              content: '请确认密码',
              confirm: function(){
              }
            });        
      }else{
            $.alert({
              icon: 'glyphicon glyphicon-exclamation-sign D-signColorRed',
              title: '提示：',
              confirmButton: '确定',
              content: '两次密码输入不一致',
              confirm: function(){
              }
            });
      }
      


  }); 

});
