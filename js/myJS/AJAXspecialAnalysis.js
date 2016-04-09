$(function(){

// 全局变量************************
	// 未完成订单的分页
	var noFinishOrderPage = 1;

	// 取消订单
	cancelOrder("test3.json");



});



// 函数实现************************************

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
*函数名：viewAnalysisList
*功能：查看分析师列表
*参数：
***************/
// function viewAnalysisList(){
// 	$("#")
// }

