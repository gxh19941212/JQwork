$(function(){
	$("header").load("../html/header.html");
	$("footer").load("../html/footer.html");
	$(".add-right").load("../html/right.html");
	
	
	$(".pic-top>img").on("mouseenter",function(){
		$(".shadow").css("display","block");
		$(".big-pic").stop(true).fadeIn(600);
	});
	$(".pic-top").on("mousemove",function(ev){
		//$(document).mousemove(function(ev){
			var y=ev.pageY-$(".pic-top img").offset().top-$(".shadow").height()/2,
			x=ev.pageX-$(".pic-top img").offset().left-$(".shadow").width()/2,
			h=$(".pic-top img").height()-$(".shadow").height(),
			w=$(".pic-top img").width()-$(".shadow").width();
			if(x<0){
				x=0;
			}
			if(x>w){
				x=w;
			}
			if(y<0){
				y=0;
			}
			if(y>h){
				y=h;
			}
		var //Y=(y*$(".shadow").height())/$(".big-pic").height(),
		Y=y/1.5,
		X=x/1.5;
		
		$(".shadow").css({"left":x,"top":y});
		$(".big-pic").css({"background-position-x":-X,"background-position-y":-Y})
		//})
	})
	$(".pic-top").on("mouseleave",function(){
		$(".shadow").css("display","none");
		$(".big-pic").stop(true).fadeOut(600);
	})
	$(".pic-bottom nav img").click(function(){
		$(".pic-bottom nav img").removeClass("hover")
		$(this).addClass("hover");
		var src=$(this).attr("src");
		$(".pic-top img").attr("src",src);
		$(".big-pic").css("background","url("+src+") no-repeat");
		console.log(src)
	})
	
	
	$(".size-number div:eq(0) nav a").click(function(){
		$(".size-number div:eq(0) nav a").removeClass("oon");
		$(this).addClass("oon");
	})
	
	$(".numad").click(function(){
		$("#num").val(Number($("#num").val())+1);
	})
	$(".numre").click(function(){
		var ii=Number($("#num").val())-1;
		if(ii<=0){
			ii=1;
		}
		$("#num").val(ii);
	})
	var a = $(".scrollnav").offset().top;
	console.log(a)
	$(window).scroll(function(){
			if($(window).scrollTop()>=a){
				$(".scrollnav").addClass("qaz");
				$(".scrollnav").stop(true).animate({"left":0},400);
			}else{
				$(".scrollnav").removeClass("qaz");
				$(".scrollnav").css({"left":"-90px"});
			}
		})
	
	$("section p").eq(0).html(getQueryString("spid"));
	$("section p").eq(1).html(decodeURI(getQueryString("cont")));
	
	
	$(".gw .jrgw").click(function(){
		var ID=getQueryString("spid"),
		numbers=Number($("#num").val()),
		bl = false, index;
		console.log(numbers)
		if($.cookie('sp')) {
			var data = JSON.parse($.cookie('sp'));
			if(data == null) {
				data = {"sp": []};
			}
			data.sp.forEach(function(v, k) {
				if(ID == v.id) {
					numbers += v.number;
					console.log(numbers,v.number)
					bl = true;
					index = k;
				}
			})
			ssr = {"id": ID,"number": numbers};
			if(bl) {
				data.sp[index].number = numbers;
			} else {
				data.sp.push(ssr);
			}
			data = JSON.stringify(data);
			$.cookie('sp', data, {expires: 7,path: '/'});
		} else {
			ssr = {"sp": [{"id": ID,"number": numbers}]};
			data = JSON.stringify(ssr);
			$.cookie('sp', data, {expires: 7,path: '/'});
		}	
		var io=0;
		JSON.parse($.cookie('sp')).sp.forEach(function(v){io+=v.number});
		$(".cart_num").html(io)
	})
})

//设置或获取 href 属性中跟在问号后面的部分。
//alert(window.location.search);
//获取？后值的函数
function getQueryString(name) { 
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
    var r = window.location.search.substr(1).match(reg); 
    if (r != null) return decodeURI(r[2]); 
    return null; 
} 