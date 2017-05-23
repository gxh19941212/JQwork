$(function(){
	$("#lgform").on("focus","input",function(){
		$(this).parent().find(".focus_text").css("display","block");
		$(this).parent().find(".focus_err").css("display","none");
	});
	$("#lgform").on("blur","input",function(){
		$(this).parent().find(".focus_text").css("display","none");
		var Tid =$(this).attr('id');
		if(Tid=="username"){
			if(!(/^1[34578]\d{9}$/).test($(this).val())&&$(this).val().length!=0){
				$(this).parent().find(".focus_err").css("display","block");
				$(this).parent().children("i").css("display","none");
			}else if($(this).val().length!=0){
				$(this).parent().children("i").css("display","block");
			}
		}
	});
})
