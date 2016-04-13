$(function(){

//Url设置区******************************************
 
 // 表单校验*******************
 	var formURL = "special_examineAnalystId";

 // 未完成订单*****************
 	// 未完成订单的表格-加载
 	var unFinishTableLoadURL = "special_unfinishTableLoad"; 	
 	// 取消订单
 	var cancelOrderURL = "special_cancleOrder";
 	// 取消付款
 	var cancelPayURL = "special_cancelPay";
 	// 推送
 	var confirmPushURL = "special_cancelPay";
 	// 扫码付款操作
 	var twoCodePayURL = "test3.json";

 // 完成订单*******************
 	// 完成订单的表格-加载
 	var finishTableLoadURL = "special_finishTableLoad";
 	// 提交星星评价
 	var commitStarURL = "special_judgeOrder";
 	//提交申请修改
 	var commitModifyURL = "special_applyModify";


// 全局变量******************************************
	// 未完成订单的分页
	var noFinishOrderPage = 1;
	var finishOrderPage = 1;

	// 表格总页
	var noFinishOrderTotlePage = 1;
	var finishOrderTotlePage = 1;

// 功能调用区****************************************
// 页面初始时	
	FirstParam = "page=1"+"&timeStamp=" + new Date().getTime();
	// 未完成订单-首次加载 
	unfinishedOrdersAjax(unFinishTableLoadURL, FirstParam);
	// 完成订单首次加载 
	finishedOrdersAjax(finishTableLoadURL, FirstParam);

// 表单校验****************************
	demandFormOperaton(formURL);

// 未完成订单**************************
	// 取消订单
	cancelOrder(cancelOrderURL);
	// 取消付款
	canclePayOperation(cancelPayURL);
	// 推送
	confirmPush(confirmPushURL);
	// 未完成订单 - 翻页
	unFinishOrderPaging(unFinishTableLoadURL);
	// 扫码付款
	twoCodePay(twoCodePayURL);

// 完成订单****************************
	// 完成订单-翻页
	FinishOrderPaging(finishTableLoadURL);
	// 提交星星评价
	judgeTo();
	// 提价申请修改
	applyModify();




// 函数实现区====================================================================

// 操作类-函数实现********************************************

/***************
*函数名：demandFormOperaton
*功能：表单校验
*参数：examineUrl
***************/
function demandFormOperaton(examineUrl){
	
	// 清空表单内容
	$("#title").val("");
	$("#photoCover").val("");
	$("#descript").val("");	

	// 初始化
	examMineAnalysisId(examineUrl);
	// 点击响应事件
	$("#check1").click(function(){
		examMineAnalysisId(examineUrl);
	});

	// 选中服务大厅，清空分析师ID
	$("#check0").click(function(){
		$("#Analyst_Id").val("");
	});

	// 限制需求概述 输入字符长度
	$('#title').bind('input propertychange', function(){
		if(this.value.length >= "10"){
			this.value = this.value.substr(0,10);
			$.alert({
					icon: 'glyphicon glyphicon-exclamation-sign D-signColorRed',
				    title: '提示：',
				    confirmButton: '确定',
				    content: '只能输入10个字',
				    confirm: function(){
				    }
				});			
		}
	});

	// 提交
	$("#submitBtn").click(function(){

		// 获得需求名称
		var getTitle = $("#title").val();
		// 获得上传文件
		var getUpFileName = $("#photoCover").val();
		// 获得需求概述
		var getContent = $("#descript").val();

		if(getTitle == ""){
			$.alert({
					icon: 'glyphicon glyphicon-exclamation-sign D-signColorRed',
				    title: '提示：',
				    confirmButton: '确定',
				    content: '请输入需求名称',
				    confirm: function(){
				    }
				});

		}else if(getUpFileName == ""){
			$.alert({
					icon: 'glyphicon glyphicon-exclamation-sign D-signColorRed',
				    title: '提示：',
				    confirmButton: '确定',
				    content: '请上传需求文件和数据分析材料',
				    confirm: function(){
				    }
				});

		}else if(getContent == ""){
			$.alert({
					icon: 'glyphicon glyphicon-exclamation-sign D-signColorRed',
				    title: '提示：',
				    confirmButton: '确定',
				    content: '请输入需求概述',
				    confirm: function(){
				    }
				});			

		}else if($("input:radio[name='chose']:checked").val() == 2 && $("#Analyst_Id").val() == ""){
				$.alert({
						icon: 'glyphicon glyphicon-exclamation-sign D-signColorRed',
					    title: '提示：',
					    confirmButton: '确定',
					    content: '请输入分析师ID',
					    confirm: function(){
					    }
					});		

		}else{
			// 提交表单
			mySubmitEle = document.getElementById("myForm");
			mySubmitEle.submit();
		}

	});


}

// 检测分析师ID
function examMineAnalysisId(examineUrl){
	// 获得选中的类别的value
	var getPushSytle = $("input:radio[name='chose']:checked").val();
	// 判断并执行操作-指定分析师
	if(getPushSytle == 2){
		// 校验输入是否有误
		var getEle = $("#Analyst_Id");
		getEle.attr("onkeyup","this.value=this.value.replace(/[^\\d]/g,'')");
		getEle.attr("onafterpaste","this.value=this.value.replace(/[^\\d]/g,'')");
		// 失去焦点就校验是否存在
		getEle.unbind("blur").blur(function(){
			if($(this).val() == ""){
				$.alert({
						icon: 'glyphicon glyphicon-exclamation-sign D-signColorRed',
					    title: '提示：',
					    confirmButton: '确定',
					    content: '请输入分析师ID',
					    confirm: function(){
					    }
					});	

			}else{
				var param = "id="+$(this).val();
				$.get(examineUrl,param,function(data){
					// 如果不存在	
					if(data.analySisIdExamine != true){
						// 清空
						$("#Analyst_Id").val("");
						// 错误提示
						$.alert({
								icon: 'glyphicon glyphicon-exclamation-sign D-signColorRed',
							    title: '提示：',
							    confirmButton: '确定',
							    content: '输入的分析师ID不存在，请通过右边的？标签查看分析师ID',
							    confirm: function(){
							    }
							});							
					}
				},"json");

			}
			
		})
	}	
}


/***************
*函数名：cancelOrder
*功能：取消订单
*参数：
	cancelOrderUrl 传给后端的url
***************/
function cancelOrder(cancelOrderUrl){
	// 绑定事件
	$(".CancelOrder").bind("click",function(){
		// 获取节点和行
		var getThisRow = $(this).parent().parent();
		var orderParam = "id="+ getThisRow.children().eq(0).html();

	    $.confirm({
	      icon: 'glyphicon glyphicon-exclamation-sign D-signColor',
	      title: '',
	      content: '确认取消订单？',
	      confirmButton: '确定',
	      cancelButton: '取消',
	      confirmButtonClass: 'D-confirm',
	      cancelButtonClass: 'D-confirm',
	      confirm: function(){
			// ajax操作
			$.get(cancelOrderUrl,orderParam,function(data){
				if(data.cancelOrderSituation == true){
					requestParam = "page="+noFinishOrderPage+"&timeStamp=" + new Date().getTime();
					unfinishedOrdersAjax(unFinishTableLoadURL, requestParam);
				}else{

				$.alert({
						icon: 'glyphicon glyphicon-exclamation-sign D-signColorRed',
					    title: '提示：',
					    confirmButton: '确定',
					    content: '无法取消，请稍后重试。',
					    confirm: function(){
					    }
					});	
				}
			},"json");
	      }
	    });

	});	
}


/***************
*函数名：confirmPush
*功能：确定推送
*参数：
	confirmPushUrl 传给后端的url
***************/
function confirmPush(confirmPushUrl){
	$("#confirm").bind("click",function(){
		var getOrderNumber = $("#Dinpt").value;
		var getAnalystId = $("#Analyst_Id").value;

		// 判断是否推送到大厅来定义参数
		if(getAnalystId == ""){
			var Params = "ASOcalcelPay?specialOrderId="+getOrderNumber;
		}else {
			var Params = "ASOcalcelPay?specialOrderId="+getOrderNumber+"&analyzeId="+getAnalystId;
		}
		
		// ajax
		$.get(confirmPushUrl,Params,function(data){
			if(data.comfirmToPushOrder == true){
				$("#chose").css("display","none");
				
				//重新加载未完成订单
				requestParam = "page="+noFinishOrderPage+"&timeStamp=" + new Date().getTime();
				unfinishedOrdersAjax(unFinishTableLoadURL, requestParam);

				// 隐藏操作栏
				$("#chose").css("display","none");
			}

		},"json");

	});
}

/***************
*函数名：toPushView
*功能：推送时操作的显示和隐藏
***************/
function toPushView(){

	// 推送操作显示
 	$(".toPush").click(function(){
    	$("#chose").css("display","block");
 	 });

 	// 推送取消
 	$("#cancel").click(function(){
    	$("#chose").css("display","none");
  	});

 	//立即付款
	$(".Pay").click(function(){
		$("#Payment").modal("show");
	}); 	

	// 立即付款 - 来自小如编写
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

}

/******************
*函数名：twoCodePay
*功能：二维码付款确认
*参数：
	twoCodePayUrl
******************/
function twoCodePay(twoCodePayUrl){

	$("#payBtn").click(function(){

		var getSixNumber = $("#payKey").val();
		// 如果为空
		if(getSixNumber == ""){
				$.alert({
						icon: 'glyphicon glyphicon-exclamation-sign D-signColorRed',
					    title: '提示：',
					    confirmButton: '确定',
					    content: '付款单尾号6位数不能为空，不知如何操作请查看帮助',
					    confirm: function(){
					    }
					});	
		// 如果小于6位数
		}else if(getSixNumber.length < 6){
				$.alert({
						icon: 'glyphicon glyphicon-exclamation-sign D-signColorRed',
					    title: '提示：',
					    confirmButton: '确定',
					    content: '请输入付款订单尾号6位数字！',
					    confirm: function(){
					    }
					});
		}else{
			var param = "id="+$("#Pay_indentID").val()+"&orderSix="+getSixNumber;
			$.get(twoCodePayUrl,param,function(data){
				if(data.twoCodePay == true){
					// 清空并隐藏
					$("#payKey").val("");
					$("#Payment").modal("hide");

					//重新加载未完成订单
					requestParam = "page="+noFinishOrderPage+"&timeStamp=" + new Date().getTime();
					unfinishedOrdersAjax(unFinishTableLoadURL, requestParam);					

				}else{
					$.alert({
							icon: 'glyphicon glyphicon-exclamation-sign D-signColorRed',
						    title: '提示：',
						    confirmButton: '确定',
						    content: '出现错误，请稍后重试！',
						    confirm: function(){
						    }
						});	
				}

			},"json");			
		}

	});
}


/******************
*函数名：canclePayOperation
*功能：取消付款操作
*参数：
	cancelPayUrl 传给后端的地址
******************/
function canclePayOperation(cancelPayUrl){

	$(".cancelPay").click(function(){

		// 获得订单号
		var getOrderNum = "id="+$(this).parent().parent().children().eq(0).html();

		$.confirm({
	      icon: 'glyphicon glyphicon-exclamation-sign D-signColor',
	      title: '',
	      content: '确认取消付款？',
	      confirmButton: '确定',
	      cancelButton: '取消',
	      confirmButtonClass: 'D-confirm',
	      cancelButtonClass: 'D-confirm',
	      confirm: function(){
	      	$.get(cancelPayUrl,getOrderNum,function(data){
	      		
	      		if(data.cancelPay == true){
		      		// 重新加载表格的参数
		      		requestNoFinishParam = "page="+noFinishOrderPage+"&timeStamp=" + new Date().getTime();
		      		// 重新加载表格
		      		unfinishedOrdersAjax(cancelPayUrl, requestNoFinishParam);	      			
	      		}else{
					$.alert({
							icon: 'glyphicon glyphicon-exclamation-sign D-signColorRed',
						    title: '提示：',
						    confirmButton: '确定',
						    content: '无法取消，请稍后重试。',
						    confirm: function(){
						    }
					});		      			
	      		}

	      	},"json");
	      }
	    });

	});
}


/***************
*函数名：judgeTo
*功能：评价星级
***************/
function judgeTo(){
	
	// 评价按钮
	$(".judge").click(function(){
	
		// 获得订单号
		var orderId = $(this).parent().parent().children().eq(0).html();

		// 获得模态框
		var getModal = $("#judgement");
		$("#Judge_indentID").html(orderId);
		getModal.modal("show");

		// 提交
		commitEvalute(commitStarURL,orderId);
	});	
}


/***************
*函数名：commitEvalute
*功能：提交星星评价
*参数：
	Url 提交给后端的地址
****************/
function commitEvalute(Url,orderId){
	
	// 提交评价
	$("#judgementToSubmit").unbind("click").click(function(){

		// 参数
		var param = "star="+$("#evalute").val()+"&id="+orderId;

		// ajax
		$.get(Url,param,function(data){
			if(data.commitStar == true){
				// 模态框隐藏
				$("#judgement").modal("hide");
			}else{
				$.alert({
						icon: 'glyphicon glyphicon-exclamation-sign D-signColorRed',
					    title: '提示：',
					    confirmButton: '确定',
					    content: '无法评价，请稍后重试。',
					    confirm: function(){
					    }
					});				
				}

		},"json");
	});
}


/*************
*函数名：applyModify
*功能：申请修改
*************/
function applyModify(){
	
	// 申请修改按钮
 	$(".Dmodify").click(function(){

		// 获得订单号
		var orderId = $(this).parent().children().eq(0).html();
 		// 写入订单号
 		$("#Modify_indentID").html(orderId);
 		// 显示模态框
 		$("#modification").modal("show");

		commitModify(commitModifyURL, orderId);
	});	

}


/***************
*函数名：commitModify
*功能：提交申请修改
*参数：
	Url 提交给后端的地址
****************/
function commitModify(Url, orderId){

	$("#modifyBtn").unbind("click").click(function(){

		// var param = "discript=" + $("#reDescript").html() + "&id=" + orderId;
		var param = {
			// 需求概述
			"descript":$("#reDescript").html(),
			// 订单号
			"id":orderId
		}

		$.post(Url,param,function(data){
			if(data.commitModify == true){
				$("#modification").modal("hide");
				// 重新加载两个表格
				requestNoFinishParam = "page="+noFinishOrderPage+"&timeStamp=" + new Date().getTime();
				requestFinishParam = "page="+finishOrderPage+"&timeStamp=" + new Date().getTime();
				unfinishedOrdersAjax(unFinishTableLoadURL, requestNoFinishParam);
				finishedOrdersAjax(finishTableLoadURL, requestFinishParam);

			}else{
				$.alert({
						icon: 'glyphicon glyphicon-exclamation-sign D-signColorRed',
					    title: '提示：',
					    confirmButton: '确定',
					    content: '无法提交，请稍后重试。',
					    confirm: function(){
					    }
					});				
				}
		},"json");
	});

}


/***************
*函数名：unFinishOrderPaging
*功能：未完成订单的分页
*参数：
	confirmPushUrl 传给后端的url
***************/
function unFinishOrderPaging(Url){
	
	// 上一页
	$("#unFoUp").click(function(){
		if(noFinishOrderPage > 1){
			noFinishOrderPage--;
			var requestParam = "page="+noFinishOrderPage+"&timeStamp="+new Date().getTime();
			unfinishedOrdersAjax(Url, requestParam);
		}
	});

	// 下一页
	$("#unFoDowm").click(function(){
		if(noFinishOrderPage < noFinishOrderTotlePage){
			noFinishOrderPage++;
			var requestParam = "page="+noFinishOrderPage+"&timeStamp="+new Date().getTime();
			unfinishedOrdersAjax(Url, requestParam);	
		}
	});
}

/***************
*函数名：FinishOrderPaging
*功能：完成订单的分页
*参数：
	confirmPushUrl 传给后端的url
***************/
function FinishOrderPaging(Url){
	
	// 上一页
	$("#FoUp").click(function(){
		if(finishOrderPage > 1){
			finishOrderPage--;
			var requestParam = "page="+finishOrderPage+"&timeStamp="+new Date().getTime();
			finishedOrdersAjax(Url, requestParam);
		}
	});

	// 下一页
	$("#FoDowm").click(function(){
		if(finishOrderPage < finishOrderTotlePage){
			finishOrderPage++;
			var requestParam = "page="+finishOrderPage+"&timeStamp="+new Date().getTime();
			finishedOrdersAjax(Url, requestParam);	
		}
	});
}


//ajax类-函数实现*******************************************

/*****************
*函数名：unfinishedOrdersAjax
*功能：加载未完成订单的表格的ajax
*参数：
	Url 向后端请求的地址
	requestParam 发送的参数,要求格式：page=1
******************/
function unfinishedOrdersAjax(Url, requestParam){
	$.get(Url,requestParam,function(data){
		unFinishOrderTable(data);
		// 列表操作
		toPushView();
		// 递归调用取消订单
		cancelOrder(cancelOrderURL);
		// 递归调用取消付款
		canclePayOperation(cancelPayURL);

	},"json");
}

/*****************
*函数名：finishedOrdersAjax
*功能：完成订单的表格的ajax
*参数：
	Url 向后端请求的地址
	requestParam 发送的参数,要求格式：page=1
******************/
function finishedOrdersAjax(Url, requestParam){
	$.get(Url,requestParam,function(data){
		finishOrderTable(data);
		// 评价星星
		judgeTo();
		//申请修改
		applyModify();
	},"json");
}



// 表格类-函数实现******************************************

/*****************
*函数名：unFinishOrderTable
*功能：加载未完成订单的表格
*参数：
	data json格式的数据
******************/
function unFinishOrderTable(data){
	// 清空并加载
	$("#Unfinished tbody").remove();
	$("#Unfinished thead").after("<tbody class='D-someTableStyle'></tbody>");

	for (var i in data.unfinishedOrders.list){

		var AS;
		// 判断analyzeScheme是否为空
		if(data.unfinishedOrders.list[i].analyzeScheme != null){
			AS = "分析模板";
		}else {
			AS = "分析报告";
		}

		// 获取分析员的信息, 并做相应处理
		var getAnalysisName;
		var getAnalyPhone
		if(data.unfinishedOrders.list[i].userByAnalystId == null){
			getAnalysisName = "——";
			getAnalyPhone = "——";			
		}else{
			var getAnalysisName = data.unfinishedOrders.list[i].userByAnalystId.realName;
			var getAnalyPhone = data.unfinishedOrders.list[i].userByAnalystId.phone;
		}

		// 获取订单的状态
		var getOrderState = data.unfinishedOrders.list[i].specialAnalyzeSchemeState.state;
		
		// 获取价格 并做相应处理
		var getPrice = data.unfinishedOrders.list[i].price;
		if(getPrice == null){
			getPrice = "——";
		}

		// 定义操作的按钮类型
		var getOperation;
		switch(getOrderState){
			case "等待处理":

				if(getPrice == null){
					// ifelse处理
					getOperation = "<span class='yOn CancelOrder'>取消订单</span>";
				}else{
					getOperation = "<button class='D-havePadBtn button  button-rounded button-highlight Pay'>立即付款</button><span class='yOn cancelPay'>取消付款</span><span class='yOn CancelOrder'>取消订单</span>"
				}

				break;
			case "已被弃单":
			case "未分配":			
				getOperation = "<span class='yOn toPush'>重新推送</span><span class='yOn CancelOrder'>取消订单</span>";
				break;
			case "正在制作":
				getOperation = "<span class='yOn'>——</span>";
				break;			
			case "等待付款":
				getOrderState = "等待确认付款";
				getOperation = "<span class='yOn'>——</span>";
				break;
			default:
				$.alert({
						icon: 'glyphicon glyphicon-exclamation-sign D-signColorRed',
					    title: '提示：',
					    confirmButton: '确定',
					    content: '状态错误',
					    confirm: function(){
					    }
					});
				break;
		}

		$("#Unfinished tbody").append("<tr><td>"+data.unfinishedOrders.list[i].id
			+"</td><td>"+data.unfinishedOrders.list[i].ast.analyzeSchemes
			+"</td><td>"+getOrderState
			+"</td><td>"+getPrice
			+"</td><td>"+data.unfinishedOrders.list[i].ast.type
			+"</td><td>"+AS
			+"</td><td>"+getAnalysisName
			+"</td><td>"+getAnalyPhone
			+"</td><td class='analystOperation'>"
			+getOperation
			+"</td></tr>"
			);	
		noFinishOrderTotlePage = data.unfinishedOrders.totalPage;
	}
}

/*****************
*函数名：FinishOrderTable
*功能：完成订单的表格
*参数：
	data json格式的数据
******************/
function finishOrderTable(data){
	// 清空并加载
	$("#Finished tbody").remove();
	$("#Finished thead").after("<tbody class='D-someTableStyle'></tbody>");

	for (var i in data.finishedOrders.list){

		// 获得结果名称
		getResultName = data.finishedOrders.list[i].analyzeResultName;

		var AS;
		var differentA;		
		// 判断analyzeScheme是否为空
		if(data.finishedOrders.list[i].analyzeScheme != null){
			// 获得方案id
			getSchemeId = data.finishedOrders.list[i].analyzeScheme.id;

			AS = "分析模板";
			differentA = "<a class='D-havePadBtn button button-action button-rounded analystOperation' href='url?id="+getSchemeId+"'>查看方案</a>";
		}else {
			AS = "分析报告";
			differentA = "<a class='D-havePadBtn button button-action button-rounded analystOperation' href='url?"+getResultName+"'>下载报告</a>";
		}

		$("#Finished tbody").append("<tr><td>"+data.finishedOrders.list[i].id
			+"</td><td>"+data.finishedOrders.list[i].ast.analyzeSchemes
			+"</td><td>"+data.finishedOrders.list[i].specialAnalyzeSchemeState.state
			+"</td><td>"+data.finishedOrders.list[i].price
			+"</td><td>"+data.finishedOrders.list[i].ast.type
			+"</td><td>"+AS
			+"</td><td>"+data.finishedOrders.list[i].userByAnalystId.realName
			+"</td><td>"+data.finishedOrders.list[i].userByAnalystId.phone
			+"</td><td>"+differentA
			+"</td><td class='Djudge'><button class='D-havePadBtn button button-caution button-rounded analystOperation judge'>评价</button>"
			+"</td><td class='Dmodify'><button class='D-havePadBtn button button-royal button-rounded analystOperation modify'>申请修改</button>"
			+"</td></tr>"
			);	
		finishOrderTotlePage = data.finishedOrders.totalPage;
	}

}




}); // $(function(){});
