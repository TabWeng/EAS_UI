//初始化
   $(function(){
      updateLogin(); //载入数据
   });
//页面改变事件
   window.onresize = function(){  
                updateLogin();
            }
//更新数据            
   function updateLogin() {
       $("#myNav").width($(".col-xs-6").width());
   };