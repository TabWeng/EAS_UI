$(function(){


/****************************************************************************
url设置区
*************************************/
// 需求列表页面
	// 表格加载
	var requireURL = "serviceHallOrders.json";
	// 分析师接单
	var receiveOrderURL = "serviceHallOrders.json";
// 分析师列表页面
	//内容加载
	var analystListURL = "analystList.json";


/****************************************************************************
全局变量区
****************/
// 需求列表翻页
requireListPage = 1;
// 分析师列表翻页
analysisListPage = 1;

// 需求列表总页数
requireListTotalPage = 3;
// 分析师列表总页数
analysisListTotalPage = 3;

/****************************************************************************
函数调用区
*************************************/

// 第一次加载
var firstLoadParam = "page=1&timeStamp=" + new Date().getTime();
	// 需求列表
	AJAXrequireListToLoad(requireURL, firstLoadParam);
	// 分析师列表
	AJAXanalystListToLoad(analystListURL, firstLoadParam);


// 需求列表翻页
requirePageUpAndDown(requireURL);
// 分析师列表翻页
analysisPageUpAndDow(analystListURL);



// 函数实现区*********************************************************************************

/****************************************************************************
操作类 - 函数
****************/

 /************************************
*函数名：dealWithDate
*功能：处理时间，去掉T
*参数：
	dateTime 要处理的时间字符串
*返回：
	newDateTime 处理完成的时间字符串
************************************/
function dealWithDate(dateTime){
	var pattern = /T/ig;
	return dateTime.replace(pattern," ");

}

 /************************************
*函数名：receiveOrder
*功能：分析师接单
*参数：
	receiveOrderUrl 
************************************/
function receiveOrder(receiveOrderUrl){
	$(".analystOperation").click(function(){
		
		// 获得订单号
		var getOrderNumberParam = "id=" + $(this).parent().parent().children().eq(0).html();

	    $.confirm({
	      icon: 'glyphicon glyphicon-exclamation-sign D-signColor',
	      title: '',
	      content: '确认接单？',
	      confirmButton: '确定',
	      cancelButton: '取消',
	      confirmButtonClass: 'D-confirm',
	      cancelButtonClass: 'D-confirm',
	      confirm: function(){
			
			// ajax
			$.get(receiveOrderUrl,getOrderNumberParam,function(data){
				if(data.isReceiveOrder == true){
					// 刷新列表
					requestParam = "page="+requireListPage+"&timeStamp=" + new Date().getTime();
					AJAXrequireListToLoad(requireURL,requestParam);	

					// 操作成功提示
					$.alert({
						icon: 'glyphicon glyphicon-exclamation-sign D-signColorGreen',
					    title: '',
					    confirmButton: '确定',
					    content: '完成接单，请到分析师页面查看',
					    confirm: function(){
					    }
					});		

				}else{
					// 操作失败提示
					$.alert({
						icon: 'glyphicon glyphicon-exclamation-sign D-signColorRed',
					    title: '提示：',
					    confirmButton: '确定',
					    content: '接单失败，请稍后重试',
					    confirm: function(){
					    }
					});						
				}

			},"json");

	      }
	    });

	});

}

 /************************************
*函数名：requireListViewOperation
*功能：列表显示差异 - 分析师可以显示接单
*参数：
	receiveOrederViewUrl
************************************/
function requireListViewOperation(receiveOrederViewUrl){

}

/************************************
*函数名：requirePageUpAndDown
*功能：需求列表翻页
*参数：
	Url 传给后端的地址
************************************/
function requirePageUpAndDown(Url){
	// 需求列表翻页
	$("#requirePageUp").click(function(){
		if(requireListPage > 1){
			requireListPage--;
			requestParam = "page="+requireListPage+"&timeStamp=" + new Date().getTime();
			AJAXrequireListToLoad(Url,requestParam);
		}
	});
	$("#requirePageDown").click(function(){
		if(requireListPage < requireListTotalPage){
			requireListPage++;
			requestParam = "page="+requireListPage+"&timeStamp=" + new Date().getTime();
			AJAXrequireListToLoad(Url,requestParam);
		}
	});

}

/************************************
*函数名：analysisPageUpAndDow
*功能：分析师列表翻页
*参数：
	Url 传给后端的地址
************************************/
function analysisPageUpAndDow(Url){
	$("#analysisPageUp").click(function(){
		if(analysisListPage > 1){
			analysisListPage--;
			requestParam = "page="+analysisListPage+"&timeStamp=" + new Date().getTime();
			AJAXanalystListToLoad(analystListURL, requestParam);
		}
	});
	$("#analysisPageDown").click(function(){
		if(analysisListPage < analysisListTotalPage){
			analysisListPage++;
			requestParam = "page="+analysisListPage+"&timeStamp=" + new Date().getTime();
			AJAXanalystListToLoad(analystListURL, requestParam);
		}
	});	


}

/****************************************************************************
ajax实现类 - 函数
****************/

/***************************
*函数名：AJAXrequireListToLoad
*功能：加载需求列表的Ajax
*参数：
	requireUrl 传给后端的Url
	param 参数
***************************/
function AJAXrequireListToLoad(requireUrl, param){
	
	$.get(requireUrl,param,function(data){
		// 调用表格处理
		requireListToLoad(data);
		// 分析师接单操作
		receiveOrder(receiveOrderURL);

	},"json");

}

/***************************
*函数名：AJAXanalystListToLoad
*功能：加载分析师列表的ajax
*参数：
	analystListUrl 传给后端的Url
	param 参数
***************************/
function AJAXanalystListToLoad(analystListUrl, param){

	$.get(analystListUrl,param,function(data){
		// 加载
		analystListToLoad(data);
	},"json");
}


/****************************************************************************
表格加载类 - 函数
****************/

/***************************
*函数名：requireListToLoad
*功能：加载需求列表
*参数：
	data json数据
***************************/
function requireListToLoad(data){
	// 获得表格
	var getTable = $("#requireList tbody");
	// 清空表格
	getTable.empty();
	// 添加表格内容

	for(var i in data.serviceHallOrders.list){

		// 制作需求详情的模态框
		if(i > 0){
			var newDetailElement = $("#detail_0").clone();
			newDetailElement.attr("id","detail_"+i);
			$("#detail_"+(i-1)).after(newDetailElement);
		}

		// 控制显示类型
		requireType=(data.serviceHallOrders.list[i].isShellAS==1)?"分析模板":"分析报告";

		// 制作表单
		getTable.append( "<tr><td class='D-noDisplay'>"+data.serviceHallOrders.list[i].id
			+"</td><td>"+data.serviceHallOrders.list[i].title
			+"</td><td>"+data.serviceHallOrders.list[i].userByUserId.username
			+"</td><td>"+requireType
			+"</td><td>"+data.serviceHallOrders.list[i].ast.type+" 教育类"
			+"</td><td>"+dealWithDate(data.serviceHallOrders.list[i].applyDate)
			+"</td><td><a class='D-detailBtn button button-highlight button-rounded' data-toggle='modal' data-target='#detail_"+i+"'>详情</a>"
			+"</td><td><a class='D-havePadBtn button button-action button-rounded analystOperation'>接单</a>"
			+"</td></tr>"
		);	

		// 获得总页数
		requireListTotalPage = data.serviceHallOrders.totalPage;

		// 生成对应模态框的内容
		$("#detail_"+i+" .D-demandOverView").empty();
		$("#detail_"+i+" .D-demandOverView").append(data.serviceHallOrders.list[i].descript);		
	
	}

}

/***************************
*函数名：analystListToLoad
*功能：加载分析师列表
*参数：
	data json数据
***************************/
function analystListToLoad(data){

	// 先清空列表
	$("#analysisOutList").empty();

	// 获得模板节点
	var getAnalysisInfoEle = $(".D-analysisInfo");

	for(var i in data.analystList.list){
		
		// 克隆模板
		cloneEle = getAnalysisInfoEle.clone();
		// 删除节点的class
		cloneEle.removeClass("D-analysisInfo");
		// 赋值
		analysisListContant(data,cloneEle,i);
		// 并把节点插在最后
		$("#analysisOutList").append(cloneEle);		
	}
}

/***************************
*函数名：analysisListContant
*功能：分析师列表赋值
*参数：
	data json数据
	getFirstEle 要赋值的节点
	n 次序
*调用：仅被 analystListToLoad 函数调用
***************************/
function analysisListContant(data,getFirstEle,n){
	getFirstEle.find(".D-MyminiPic").attr("src",data.analystList.list[n].headImg);
	getFirstEle.find(".D-analystID").html(data.analystList.list[n].id);
	getFirstEle.find(".D-analystName").html(data.analystList.list[n].username);
	getFirstEle.find(".D-analystStar").html(data.analystList.list[n].analistStarAverage);
	getFirstEle.find(".D-orderNum").html(data.analystList.list[n].unfinishCount);

	// 更新总页数
	analysisListTotalPage = data.analystList.totalPage;
}


}); //$(function(){})
