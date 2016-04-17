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

});

