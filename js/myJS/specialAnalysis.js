$(document).ready(function() {
   
  //取消按钮   
  $(".CancelPay").click(function(){
    $("#chose").css("display","block");
     
  });
  $("#cancel").click(function(){
    $("#chose").css("display","none");
  });
 //立即付款弹窗 
  $(".analystOperation").click(function(){
 
 var hang = $(this).parent("tr").prevAll().length+1; 
 var id=$("#Unfinished tr:eq("+hang+") td:eq(0)").text();
 var title=$("#Unfinished tr:eq("+hang+") td:eq(1)").text();
 var price=$("#Unfinished tr:eq("+hang+") td:eq(3)").text();
  $("#Dinpt").val(id);
  $("#Pay_indentID").text(id);
  $("#Pay_title").text(title);
  $("#Pay_price").text(price);

  });
//选择推送到服务大厅或者指定分析师
  $("input:radio[name=chose]").click(function(){
  var hasChk = $('#check1').is(':checked');
  if(hasChk){
     $(".inputID1").removeAttr("disabled");
  }else{
    $(".inputID1").attr("disabled","disabled");
  }

 });
  $("input:radio[name=chose1]").click(function(){
  var hasChk = $('#check2').is(':checked');
  if(hasChk){
     $(".inputID2").removeAttr("disabled");
  }else{
    $(".inputID2").attr("disabled","disabled");
  }

 });
  //上传材料
$('input[id=lefile]').change(function() {
  var path=$(this).val();
  var pos1 = path.lastIndexOf('/');
  var pos2 = path.lastIndexOf('\\');
  var pos = Math.max(pos1, pos2);
  var filename;
  if( pos<0 ){filename= path;}
  else{filename= path.substring(pos+1);}
$('#photoCover').val(filename);

});
 //:input 获取的是 type=text,radio,button等select textarea等元素对象
/*  $("input").blur(function() { //注册blur的事件
    $(this).each(function() { //遍历input元素对象 
        if ("" == $(this).val()) { //判断元素对象的value值
          $(this).addClass("error"); //添加css样式
        }else{
            $(this).removeClass("error");
        }
      });
  });*/
  //提交按钮
  $("#submitBtn").click(function(){

   /* $("input").each(function() { //遍历input元素对象 
        if ("" == $(this).val()) { //判断元素对象的value值
          $(this).addClass("error"); //添加css样式
        }else{
            $(this).removeClass("error");
        }
      });*/

  
  $.ajax({ 
      type: "POST",   
      url: "#",
      data: {
        type_Id: $("#type_Id").val(), 
        type_Demand: $("#type_Demand").val(), 
        filedata: $("#lefile").val(), 
        descript: $("#descript").val(),
        title: $("#title").val(),
        Analyst_Id: $("#Analyst_Id").val(),
      
      },
      dataType: "json",
      success: function(data){
         
      },
      error: function(jqXHR){     
         alert("发生错误：" + jqXHR.status);  
      },     
    });
});
  //评价弹窗
  $(".Djudge").click(function(){
		var hang = $(this).parent("#Finished tr ").prevAll().length+1; 
        var t=$("#Finished tr:eq("+hang+") td:eq(0)").text();
        $("#Judge_indentID").text(t);
        $("#Modify_indentID").text(t);
        


	}); 
  //修改弹窗
  $(".Dmodify").click(function(){
		var hang = $(this).parent("#Finished tr ").prevAll().length+1; 
        var t=$("#Finished tr:eq("+hang+") td:eq(0)").text();
        $("#Modify_indentID").text(t);



	});

	$(".judge").click(function(){
		$("#judgement").modal("show");


	});	
	$(".Pay").click(function(){
		$("#Payment").modal("show");


	});
	$(".modify").click(function(){
		$("#modification").modal("show");


	});
	$("#modifyBtn").click(function(){

		var getreDescriptLength = $('#reDescript')[0].value.length;
		 
			if( getreDescriptLength == 0){
				alert("请输入需求概述！");
				
			}else if(getreDescriptLength < "10"){
				alert("至少输入10个字的需求概述！");
				
			}else{
				$("#modifyForm").submit();

				
			}
			
		
	});
  // 限制输入字符长度
	$('#payKey').bind('input propertychange', function(){
		if(this.value.length >= "6"){
			this.value = this.value.substr(0,6);
		}
	});
	// 提交付款表单
	$("#payBtn").click(function(){
		var getpayKeyLength = $('#payKey')[0].value.length;
			if( getpayKeyLength == 0){
				alert("请输入支付订单尾号的6位数，如果不知道如何操作，请查看“帮助”");
				
			}else if(getpayKeyLength != "6"){
				alert("输入长度有误，请输入订单尾号的6位数");
				
			}else{
				$("#payForm").submit();

				
			}
			
		
	});
 /*$("#Unfinished tr").each.find("td").eq(0).(function()
 {

  alert( $(this).html());
 });*/


});