$(function(){
	setColorToTitle();
	$("#firstTitle").css("background-color","#fff");

	$("#myUlTitle a").each(function(index){
		switch(index){
			case 0:
				$(this).click(function(){
					setColorToTitle();
					$(this).css("background-color","#fff");
				});
				break;
			case 1:
				$(this).click(function(){
					setColorToTitle();
					$(this).css("background-color","#fff");
				});
				break;
			case 2:
				$(this).click(function(){
					setColorToTitle();
					$(this).css("background-color","#fff");
				});
				break;
			case 3:
				$(this).click(function(){
					setColorToTitle();
					$(this).css("background-color","#fff");
				});
				break;			
		}
	})
});



function setColorToTitle() {
	$("#myUlTitle a").each(function(index){
		switch (index){
			case 0: 
				$(this).css("background-color","#00E5EE");
				break;
			case 1: 
				$(this).css("background-color","#A7DF3C");
				break;
			case 2: 
				$(this).css("background-color","#FFD700");
				break;
			case 3: 
				$(this).css("background-color","#FF69B4");
				break;
		}
	});
}