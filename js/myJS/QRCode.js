function change(number){
        switch(number){
          case 1:
          document.getElementById("yearVIP").style.display="none";
          document.getElementById("monthVIP").style.display="block";
          document.getElementById("monthNum").value=12;
          break;
          case 2:
          document.getElementById("yearVIP").style.display="block";
          document.getElementById("monthVIP").style.display="none";
          document.getElementById("monthNum").value="";
          break;
        }
  }

// $(function(){
// 	myResponsive(
// 		"#numCheckBox",
// 		409,562,
// 		{
// 			"width":"101px"
// 		}
// 	);
// });

$(function(){
	myResponsive(
		"#numCheckBox",
		285,562,
		{
			"width":"76px"
		}
	);
});

$(function(){
	myResponsive(
		"#numCheckBox",
		285,562,
		{
			"float":"left"
		}
	);
});

$(function(){
	myResponsive(
		".D-littleWord",
		287,320,
		{
			"font-size":"12pt"
		}
	);
});

$(function(){
	myResponsive(
		".link",
		287,320,
		{
			"font-size":"14px"
		}
	);
});
