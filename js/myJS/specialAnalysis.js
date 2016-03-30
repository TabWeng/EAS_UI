$(document).ready(function() {
   
     
  $(".CancelPay").click(function(){
    $("#chose").css("display","block");
     
  });
  $("#cancel").click(function(){
    $("#chose").css("display","none");
  });
  
  $(".analystOperation").click(function(){
 
 var hang = $(this).parent("tr").prevAll().length+1; 
 var t=$("table tr:eq("+hang+") td:eq(0)").text();
  $("#Dinpt").val(t);
 
  });

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
$('input[id=lefile]').change(function() {
  var path=$(this).val();
  var pos1 = path.lastIndexOf('/');
  var pos2 = path.lastIndexOf('\\');
  var pos = Math.max(pos1, pos2);
  var filename;
  if( pos<0 ){return path;}
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
        filedata: $("#filedata").val(), 
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

});