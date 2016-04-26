$(function(){

	myResponsive(
		".D-myDataDownload",
		0,750,
		{
			"width":"100%",
			"display":"block"
		}
	);

	myResponsive(
		".D-canChooseWord",
		972,1183,
		{
			"font-size":"13px"
		}
	);

	myResponsive(
		"#hiddenProFuntion",
		0,975,
		{
			"display":"none"
		}
	);	

// 操作连接数据库测边栏的出现和隐藏
$("#LinkDataBase").click(function(){
	$("#myLeftFixed").animate({
		left:"0"
	}, 500);
});

//取消按钮
$("#LineCancelBtn").click(function(){
	$("#myLeftFixed").animate({
		left:"-330px"
	},300);
});


$("#LineCancelBtn").click(function(){
	$(".D-leftInput > form").waitMe('hide');
});

  //上传材料
$('input[id=lefile-1]').change(function() {
  var path=$(this).val();
  var pos1 = path.lastIndexOf('/');
  var pos2 = path.lastIndexOf('\\');
  var pos = Math.max(pos1, pos2);
  var filename;
  if( pos<0 ){filename= path;}
  else{filename= path.substring(pos+1);}
$('#photoCover-1').val(filename);

});

$('input[id=lefile-2]').change(function() {
  var path=$(this).val();
  var pos1 = path.lastIndexOf('/');
  var pos2 = path.lastIndexOf('\\');
  var pos = Math.max(pos1, pos2);
  var filename;
  if( pos<0 ){filename= path;}
  else{filename= path.substring(pos+1);}
$('#photoCover-2').val(filename);

});




// 弹窗
$(".D-notVip").click(function(){
	
		$.confirm({
	      icon: 'glyphicon glyphicon-exclamation-sign D-signColor',
	      title: '',
	      content: '此功能仅对会员开放, 请先开通会员',
	      confirmButton: '开通会员',
	      cancelButton: '取消',
	      confirmButtonClass: 'D-confirmRed',
	      cancelButtonClass: 'D-confirm',
	      confirm: function(){

	      	var getA = $(".D-hiddenA");

			getA.attr({href:"abc.html",target:"_blank"});

			$("#hiddenA").click();
	      }
	    });
});

// 判断上传格式是否正确
$("#useAnaly").click(function(){

	// 获得选择文件的文件名
	var getChooseFolder = $("#photoCover-1").val();
	// 获得常模文件的文件名
	var getChangMoFolder = $("#photoCover-2").val();

	var n = getChooseFolder.split(".");
	var getChooseEndName = n[n.length - 1];

	var m = getChangMoFolder.split(".");
	var getChangMoEndName = m[m.length - 1];

	// 判断后缀名
	if(getChooseEndName == "csv"){
		if(getChangMoEndName == "csv" || getChangMoEndName==""){
			$("#useFolder").submit();
		}else{
			$.alert({
					icon: 'glyphicon glyphicon-exclamation-sign D-signColorRed',
				    title: '提示：',
				    confirmButton: '确定',
				    content: '格式错误，请上传格式为csv的常模数据文件',
				    confirm: function(){
				    }
			});			
		}

	}else if(getChooseEndName == ""){
		$.alert({
				icon: 'glyphicon glyphicon-exclamation-sign D-signColorRed',
			    title: '提示：',
			    confirmButton: '确定',
			    content: '请上传格式为csv的数据文件',
			    confirm: function(){
			    }
		});				

	}else{
		$.alert({
				icon: 'glyphicon glyphicon-exclamation-sign D-signColorRed',
			    title: '提示：',
			    confirmButton: '确定',
			    content: '格式错误，请上传格式为csv的数据文件',
			    confirm: function(){
			    }
		});		
	}
});



// 输入sql语句的保存按钮
$("#saveTextarea").click(function(){

	var getTextarea = $("#myTextarea").val();
	if(getTextarea == ""){
		alert("请输入Sql语句");
	}else{

		$.confirm({
	      icon: 'glyphicon glyphicon-exclamation-sign D-signColor',
	      title: '',
	      content: '确定保存此Sql语句？',
	      confirmButton: '确定',
	      cancelButton: '取消',
	      confirmButtonClass: 'D-confirm',
	      cancelButtonClass: 'D-confirm',
	      confirm: function(){

			// 把输入的sql放入表单中
			$("#formSql").val(getTextarea);
			$("#myModal").modal('hide');
	      }
	    });
	}
});

// fixedForm回调函数的对象
var options = {

    success: function (data) {
        // 获取表单
        var getfixedForm = $("#fixedForm");

        if(data.usable == true){

        	// 设置表单action参数
        	getfixedForm.attr("action","ASdatabase");
        	getfixedForm.submit();
        }else{

        	// 设置为原来的参数，用来检测sql
        	getfixedForm.attr("action","ASdetectSQL");

        	// 弹窗提示错误
			$.alert({
				icon: 'glyphicon glyphicon-exclamation-sign D-signColorRed',
			    title: '提示：',
			    confirmButton: '确定',
			    content: 'SQL语句存在错误，请检测修正后重试',
			    confirm: function(){
			    }
			});                	

        }
    }
};

// 提交表单的准备
$("#fixedForm").ajaxForm(options);


// 连接书库并提交的表单校验
$("#submitLink").click(function(){

	// 获得所有Input
	var getFixedFormInput = $("#myLeftFixed input");
	if(getFixedFormInput.eq(0).val() == ""){
		$.alert({
				icon: 'glyphicon glyphicon-exclamation-sign D-signColorRed',
			    title: '提示：',
			    confirmButton: '确定',
			    content: '请输入IP地址',
			    confirm: function(){
			    }
		});	
	}else if(getFixedFormInput.eq(1).val() == ""){
		$.alert({
				icon: 'glyphicon glyphicon-exclamation-sign D-signColorRed',
			    title: '提示：',
			    confirmButton: '确定',
			    content: '请输入端口',
			    confirm: function(){
			    }
		});
	}else if(getFixedFormInput.eq(2).val() == ""){
		$.alert({
				icon: 'glyphicon glyphicon-exclamation-sign D-signColorRed',
			    title: '提示：',
			    confirmButton: '确定',
			    content: '请输入库名',
			    confirm: function(){
			    }
		});
	}else if(getFixedFormInput.eq(3).val() == ""){
		$.alert({
				icon: 'glyphicon glyphicon-exclamation-sign D-signColorRed',
			    title: '提示：',
			    confirmButton: '确定',
			    content: '请输入用户名',
			    confirm: function(){
			    }
		});
	}else if(getFixedFormInput.eq(4).val() == ""){
		$.alert({
				icon: 'glyphicon glyphicon-exclamation-sign D-signColorRed',
			    title: '提示：',
			    confirmButton: '确定',
			    content: '请输入密码',
			    confirm: function(){
			    }
		});
	}else if($("#formSql").val() == ""){
		$.alert({
				icon: 'glyphicon glyphicon-exclamation-sign D-signColorRed',
			    title: '提示：',
			    confirmButton: '确定',
			    content: '请先通过点击右上角的绿色标示填写SQL语句',
			    confirm: function(){
			    }
		});
	}else{
		// 等待的提示
		$("#fixedForm").waitMe({
		    effect: 'roundBounce',
		    text: '正在连接数据库并分析中....',
		    bg: 'rgba(255,255,255,0.7)',
		    color:'#000',
		    sizeW:'',
		    sizeH:''
		});

		$("#fixedForm").ajaxSubmit(options);

	}

});





});

