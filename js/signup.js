$(function(){
	var subbtn = false;
	$("#lgform").on("focus","input",function(){
		$(this).parent().find(".focus_text").css("display","block");
		$(this).parent().children("div:not(.focus_text)").css("display","none");
	});
	$("#lgform").on("blur","input",function(){
		$(this).parent().find(".focus_text").css("display","none");
		var Tid =$(this).attr('id');
		
		$.post("http://localhost/g2/JQwork/php/signup.php", {
			"tel": $("#tel").val(),
			"password": ''
		}, function(data) {
			if(data == 0) {
				$('#'+Tid).parent().find(".focus_repeatr").css("display","block");
				$('#'+Tid).parent().children("i").css("display","none");
			}
		});
		
		if(Tid=="tel"){
			if(!(/^1[34578]\d{9}$/).test($(this).val())&&$(this).val().length!=0){
				$(this).parent().find(".focus_err").css("display","block");
				$(this).parent().children("i").css("display","none");
				subbtn = true;
			}else if($(this).val().length!=0){
				$(this).parent().children("i").css("display","block");
			}
		}
		if(Tid=="password"){
			if(($(this).val().length<6||$(this).val().length>16)&&$(this).val().length!=0){
				$(this).parent().find(".focus_err").css("display","block");
				subbtn = true;
			}
			$(".pw_strong").css("display","none");
		}
		if(Tid=="rpas"){
			if($(this).val()!=$("#password").val()){
				$(this).parent().find(".focus_err").css("display","block");
				subbtn = true;
			}
		}
		
	
	});
	
	var pasbtn = false;
	$("#lgform").on("focus","#password",function(){
		$(this).parent().find(".focus_text").css("display","block");
		$(this).parent().children("div:not(.focus_text)").css("display","none");
		if(pasbtn){
			$(this).parent().find(".focus_text").css("display","none");
			$(".pw_strong").css("display","block");
		}
	});
	
	$("#lgform").on("input","#password",function(){
		var strong = 0;
		if($(this).val().length>=6&&$(this).val().length<=16){
			if((/(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]/).test($(this).val())){
				strong=1;
				pasbtn=true;
				subbtn = true;
				if((/[@#$%^&]/).test($(this).val())){
					strong=2;
				}
				$(this).parent().find(".focus_text").css("display","none");
				$(".pw_strong div").removeClass("on");
				$(".pw_strong div").eq(strong).addClass("on");
				$(".pw_strong").css("display","block");
			}
		}else{
			$(this).parent().find(".focus_text").css("display","block");
			$(".pw_strong").css("display","none");
			pasbtn = false;
		}
	});
	$("#submit").click(function(){
		Array.from($("#lgform input")).forEach(function(v){
			if($(v).val().length==0){
				$(v).parent().find(".focus_err").css("display","block");
				$(v).parent().find(".focus_err").find("i").css("display","block");
			}
		})
		if(subbtn){
			$.post("http://localhost/g2/JQwork/php/signup.php", {
			"tel": $("#tel").val(),
			"password":  $("#password").val()
			}, function(data) {
				if(data == 1) {
					
				}else if(data == 0){
					
				}
			});
		}
		return false;
	});
})
