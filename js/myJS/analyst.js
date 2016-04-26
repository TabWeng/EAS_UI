$(function(){
	myResponsive(
		".orderDetail",
		280,991,
		{
			"width":"100%"
		},
		[
		]
	);

	myResponsive(
		".fade",
		280,991,
		{
			"padding-left":"0px"
		},
		[
		]
	);

	myResponsive(
		"#comment",
		280,750,
		{
			"padding-top":"0px"
		},
		[
		]
	);

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

	$('input[id=lefile-3]').change(function() {
	  var path=$(this).val();
	  var pos1 = path.lastIndexOf('/');
	  var pos2 = path.lastIndexOf('\\');
	  var pos = Math.max(pos1, pos2);
	  var filename;
	  if( pos<0 ){filename= path;}
	  else{filename= path.substring(pos+1);}
	$('#photoCover-3').val(filename);

	});

	$('input[id=lefile-4]').change(function() {
	  var path=$(this).val();
	  var pos1 = path.lastIndexOf('/');
	  var pos2 = path.lastIndexOf('\\');
	  var pos = Math.max(pos1, pos2);
	  var filename;
	  if( pos<0 ){filename= path;}
	  else{filename= path.substring(pos+1);}
	$('#photoCover-4').val(filename);

	});

	$('input[id=lefile-5]').change(function() {
	  var path=$(this).val();
	  var pos1 = path.lastIndexOf('/');
	  var pos2 = path.lastIndexOf('\\');
	  var pos = Math.max(pos1, pos2);
	  var filename;
	  if( pos<0 ){filename= path;}
	  else{filename= path.substring(pos+1);}
	$('#photoCover-5').val(filename);

	});
	$('input[id=lefile-6]').change(function() {
	  var path=$(this).val();
	  var pos1 = path.lastIndexOf('/');
	  var pos2 = path.lastIndexOf('\\');
	  var pos = Math.max(pos1, pos2);
	  var filename;
	  if( pos<0 ){filename= path;}
	  else{filename= path.substring(pos+1);}
	$('#photoCover-6').val(filename);

	});

	$('input[id=lefile-7]').change(function() {
	  var path=$(this).val();
	  var pos1 = path.lastIndexOf('/');
	  var pos2 = path.lastIndexOf('\\');
	  var pos = Math.max(pos1, pos2);
	  var filename;
	  if( pos<0 ){filename= path;}
	  else{filename= path.substring(pos+1);}
	$('#photoCover-7').val(filename);

	});

	$('input[id=lefile-8]').change(function() {
	  var path=$(this).val();
	  var pos1 = path.lastIndexOf('/');
	  var pos2 = path.lastIndexOf('\\');
	  var pos = Math.max(pos1, pos2);
	  var filename;
	  if( pos<0 ){filename= path;}
	  else{filename= path.substring(pos+1);}
	$('#photoCover-8').val(filename);

	});

	$('input[id=lefile-9]').change(function() {
	  var path=$(this).val();
	  var pos1 = path.lastIndexOf('/');
	  var pos2 = path.lastIndexOf('\\');
	  var pos = Math.max(pos1, pos2);
	  var filename;
	  if( pos<0 ){filename= path;}
	  else{filename= path.substring(pos+1);}
	$('#photoCover-9').val(filename);

	});


// 控制提交到不同的表单*************************************

// 添加锁定
$("#formToSubmit").attr("disabled","disabled");

// 提交专向分析测试表单
getTestForm("myTest","getRForm","formToSubmit","actionUrl-test");

// 提交表单
getForm("formToSubmit","getRForm","actionUrl");

/**********************************************/

// 提交公共模板的测试表单
getTestForm("publicTestId","publicForm","publicId","actionUrl-public-test");

// 提交公共模板的表单
getForm("publicId","publicForm","actionUrl-public");





/*************************************
*函数名：getTestForm
*功能：测试-提交脚本的表单校验和提交
*参数：
	testId 测试按钮的id
	FormId 表单的id 
	getTextFormUrl 表单action的url
**************************************/
function getTestForm(testBtnId, FormId, bindBtn, getTextFormUrl){
	// 提交测试表单
	$("#"+testBtnId).click(function(){

		// 获得表单中的所有input
		var getInput = $("#"+FormId+" input");
		// 获得表单中的textarea
		var getTexarea = $("#"+FormId+" textarea");
		
		var flagInput = false;
		var flagTextarea = false;

		// 遍历所有input，判断
		for(var i = 0; i < getInput.length; i++){
			if(getInput.eq(i).val() == ""){
				flagInput = false;
					$.alert({
						icon: 'glyphicon glyphicon-exclamation-sign D-signColorRed',
					    title: '提示：',
					    confirmButton: '确定',
					    content: '请填写完成所有表单内容再提交！',
					    confirm: function(){
					    }
					});
				break;
			}else{
				flagInput = true;
			}
		}

		if(flagInput){
			// 判断简介是否为空
			if(getTexarea.eq(0).val() == ""){
				flagTextarea = false;
					$.alert({
						icon: 'glyphicon glyphicon-exclamation-sign D-signColorRed',
					    title: '提示：',
					    confirmButton: '确定',
					    content: '请先写简介',
					    confirm: function(){
					    }
					});
			}else{
				flagTextarea = true;
			}		
		}

		// 都正确则提交
		if(flagInput && flagTextarea){

			$.confirm({
			      icon: 'glyphicon glyphicon-exclamation-sign D-signColor',
			      title: '',
			      content: '确认提交测试？',
			      confirmButton: '确定',
			      cancelButton: '取消',
			      confirmButtonClass: 'D-confirm',
			      cancelButtonClass: 'D-confirm',
			      confirm: function(){
			      	
			      	// 解除提交的限制
			      	$("#"+bindBtn).removeAttr("disabled");

			      	// 获取表单的id
			      	var getFormEle = $("#getRForm");
			      	// 设置测试的action
			      	getFormEle.attr({action:getTextFormUrl,target:"_blank"});
			      	getFormEle.submit();
			      }
			    });		
		}


	});

}

/*************************************
*函数名：getForm
*功能：提交脚本的表单校验和提交
*参数：
	fromId 表单的id
	getFormUrl 表单action的url
**************************************/
function getForm(getbtnId, FormId, getFormUrl){
	//提交表单
	$("#"+getbtnId).click(function(){

		// 获得表单中的所有input
		var getInput = $("#"+FormId+" input");
		// 获得表单中的textarea
		var getTexarea = $("#"+FormId+" textarea");
		
		var flagInput = false;
		var flagTextarea = false;

		// 遍历所有input，判断
		for(var i = 0; i < getInput.length; i++){
			if(getInput.eq(i).val() == ""){
				flagInput = false;
					$.alert({
						icon: 'glyphicon glyphicon-exclamation-sign D-signColorRed',
					    title: '提示：',
					    confirmButton: '确定',
					    content: '请填写完成所有表单内容再提交！',
					    confirm: function(){
					    }
					});
				break;
			}else{
				flagInput = true;
			}
		}

		if(flagInput){
			// 判断简介是否为空
			if(getTexarea.eq(0).val() == ""){
				flagTextarea = false;
					$.alert({
						icon: 'glyphicon glyphicon-exclamation-sign D-signColorRed',
					    title: '提示：',
					    confirmButton: '确定',
					    content: '请先写简介',
					    confirm: function(){
					    }
					});
			}else{
				flagTextarea = true;
			}		
		}

		// 都正确则提交
		if(flagInput && flagTextarea){

			$.confirm({
			      icon: 'glyphicon glyphicon-exclamation-sign D-signColor',
			      title: '',
			      content: '确认提交？',
			      confirmButton: '确定',
			      cancelButton: '取消',
			      confirmButtonClass: 'D-confirm',
			      cancelButtonClass: 'D-confirm',
			      confirm: function(){
			      	
			      	// 获取表单的id
			      	var getFormEle = $("#getRForm");
			      	// 设置测试的action
			      	getFormEle.attr({action:getFormUrl,target:"_blank"});
			      	getFormEle.submit();
			      }
			    });		
		}

	});

}








});

