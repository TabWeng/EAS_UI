$(function(){

// 全局变量******************************************
	// 未完成订单的分页
	var noFinishOrderPage = 1;
	var finishOrderPage = 1;

	// 表格总页
	var noFinishOrderTotlePage = 1;
	var finishOrderTotlePage = 1;

//Url设置区******************************************
 	var cancelOrderURL = "test3.json";


// 功能调用区****************************************
	// 首次加载
	FirstParam = "page=1";
	// unfinishedOrdersAjax("test3.json", FirstParam);

// 未完成订单**************************
	// 取消订单
	cancelOrder("test3.json");
	confirmPush("test3.json");
	// 未完成订单 - 翻页
	unFinishOrderPaging("test3.json");






// 函数实现区====================================================================

// 操作类-函数实现********************************************

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
		var orderParam = "ASOcalcelOrder?orderNo="+ getThisRow.children().eq(0).html();
		// ajax操作
		$.get(cancelOrderUrl,orderParam,function(data){
			if(data.cancelOrderSituation == true){
				getThisRow.remove();
			}else{
				alert("无法取消订单，请稍后重试");
			}
		},"json");
	});	
}


/***************
*函数名：confirmPush
*功能：取消付款
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
				//从新加载未完成订单
			}

		},"json");

	});
}

/***************
*函数名：cancelPayView
*功能：取消付款时的显示和隐藏
***************/
function cancelPayView(){

	// 取消付款操作显示
 	$(".CancelPay").click(function(){
    	$("#chose").css("display","block");
 	 });

 	// 取消
 	$("#cancel").click(function(){
    	$("#chose").css("display","none");
  	});


}


/***************
*函数名：confirmPush
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
		cancelPayView();
		// 递归调用取消订单
		cancelOrder(cancelOrderURL);

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
		$("#Unfinished tbody").append("<tr><td>"+data.unfinishedOrders.list[i].id
			+"</td><td>"+data.unfinishedOrders.list[i].ast.analyzeSchemes
			+"</td><td>"+data.unfinishedOrders.list[i].specialAnalyzeSchemeState.state
			+"</td><td>"+data.unfinishedOrders.list[i].price
			+"</td><td>"+data.unfinishedOrders.list[i].ast.type
			+"</td><td>"+AS
			+"</td><td>"+data.unfinishedOrders.list[i].userByAnalystId.realName
			+"</td><td>"+data.unfinishedOrders.list[i].userByAnalystId.phone
			+"</td><td class='analystOperation'><button class='D-havePadBtn button  button-rounded button-highlight Pay'>立即付款</button><span class='yOn CancelPay'>取消付款</span><span class='yOn CancelOrder'>取消订单</span>"
			+"</td></tr>"
			);	
		noFinishOrderTotlePage = data.unfinishedOrders.totalPage;
	}
}




}); // $(function(){});
