$(function(){
	$("header").load("../html/header.html");
	$("footer").load("../html/footer.html");
	$(".add-right").load("../html/right.html");
	
	//搜索
	$("#search input:eq(0)").focus(function(){
		$("#search span").css("display","none");
	})
	$("#search input:eq(0)").blur(function(){
		$("#search span").css("display","block");
	})
	
	$(".splists-top li").click(function(){
		if($(this).index()==5){
			$(this).toggleClass("xz");
		}else{
			$(".splists-top li").removeClass("sele");		
			$(this).addClass("sele");
		}
	})
	
	$(".wrap-ul").on("mouseenter",".ones",function(){
		$(this).addClass("hover_on");
	})
	$(".wrap-ul").on("mouseleave",".ones",function(){
		$(this).removeClass("hover_on");
	})
	
//	var html = template("lis",{});
//	$(".wrap-ul").append(html);
//	$(".wrap-ul").append(html);
//	$(".wrap-ul").append(html);
//	$(".wrap-ul").append(html);

		var newdata;
		var newpos = 0;
		$.post("http://localhost/g2/JQwork/php/splist.php", function(data) {
					newdata = Array.from(JSON.parse(data));
					var newarr = new Array();
					for(var aa = 0; aa < 150; aa++) {
						if(newarr.length < 1500) {
							newarr = newarr.concat(newdata);
						} else {
							break;
						}
					}
					newdata = newarr;
					page(newdata,20)
					
			$(".splists-top-right span:eq(0) em").html(newdata.length);
			$(".xinpin").css("background-position-y","-68px");
			$(".xinpin1").css("background-position-y","0");
			setInterval("endTimer(2017,6,4,11,11,11,dayend)",1000);

			$(".pagenav nav").on("click","a",function(){
				newpos=($(this).attr("page"))*20;
				page(newdata,newpos);
			})
			$(".up").click(function(){
				newpos-=20;
				page(newdata,newpos);
			})
			$(".dnow").click(function(){
				newpos+=20;
				page(newdata,newpos);
			})
			
		})
		
		
		
		var a = $(".splists-top").offset().top;
		//
		$(window).scroll(function(){
			
			if($(window).scrollTop()>=a){
				$(".splists-top").addClass("fixed");
				console.log(1)
			}else{
				console.log(3)
				$(".splists-top").removeClass("fixed");
			}
		})
})

function page(data,page){
	$('.wrap-ul').html("")
	for(var i = page; i < page + 20; i++) {
		var a = template("lis", data[i]);
		$('.wrap-ul').append(a);
	}
	var ssr='',Idenx = page/20,max=data.length/20;
	if(Idenx<0){
		Idenx=1;
	}
	
	if(Idenx>=8){
		ssr=`<a href="javascript:;" page="1">1</a>
		<a href="javascript:;" page="2">2</a>
		<b>...</b>`;
		for(var j = Idenx-4;j<Idenx+4;j++){
			ssr+=`<a href="javascript:;" page="${j}">${j}</a>`;
		}
	}else{
		for(var j = 1;j<10;j++){
			ssr+=`<a href="javascript:;" page="${j}">${j}</a>`;
		}
	}
	console.log(data.length,max)
	if(Idenx>=8){
		$(".pagenav nav .pages").html(ssr+`<b>...</b>
		<a href="javascript:;" page="${max-1}">${max-1}</a>
		<a href="javascript:;" page="${max}">${max}</a>`);
	}else{
		$(".pagenav nav .pages").html(ssr+"<b>...</b>");
	}
	
	if(page==0){
		Idenx=1;
	}
	if(Idenx>1){
		$(".up").css("display","inline-block");
	}else{
		$(".up").css("display","none");
	}
	
	$("[page="+Idenx+"]").replaceWith("<span page="+Idenx+">"+Idenx+"</span>");

	$(".splists-top-right span:eq(1)").html("<em>"+Idenx+"</em>/"+max+"页");
	
}

function dayend(days,hours,minutes,seconds){

	$(".sp-time").html("<em>"+days+"</em>天<em>"+hours+"</em>时<em>"+minutes+"</em>分<em>"+seconds+"</em>秒");
}
