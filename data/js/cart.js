$(function(){
	//$.cookie('sp','{"sp":[{"id":1,"imgsrc":"../imgs/1036831_60_60.jpg","name":"雪花秀玉容撕拉型面膜150ml","jg":198,"dz":"","number":1},{"id":2,"imgsrc":"../imgs/1308420_60_60.jpg","name":"肌肤之钥（Cle De Peau BEAUTE）奢华泡沫洁面乳","jg":500,"dz":"349","number":1}]}',{expires: 7, path: '/'});
	var data =JSON.parse($.cookie('sp')),
	html = template("gwc",data);
	$(".main-cont").append(html);
	var zj = 0;
	$("nav.list.true .cart4 p").each(function(i){
				zj+=Number($("nav.list.true .cart4 p").eq(i).html());
			})
	$(".main-bot span").html("￥"+zj);
	$(".bot-right span:eq(0) em").html($("nav.list.true .cart4 p").length);
	$(".bot-right span:eq(1) em").html("￥"+zj);
	
	
	$(".main-cont").on("click","nav.list.true .cart3 span",function(){
		var index=$(this).index(),
		numbers=Number($(this).parent().find("input").val());
		zj = 0;
		if(index==0){
			numbers--;
			if(numbers<=0){
				numbers=1;
			}

		}
		if(index==2){
			numbers++;
		}
		var aa=$(this).parent().prev().find("p").html()
		$(this).parent().find("input").val(numbers);
		$(this).parent().next().find("p").html(numbers*aa)
		$("nav.list.true .cart4 p").each(function(i){
				zj+=Number($("nav.list.true .cart4 p").eq(i).html());
			})
		$(".main-bot span").html("￥"+zj);
		$(".bot-right span:eq(0) em").html($("nav.list.true .cart4 p").length);
		$(".bot-right span:eq(1) em").html("￥"+zj);
	})
	
	$(".zong:eq(0),.zong:eq(1)").on("click",function(){
		if($(this).prop("checked")){
			$(".ge").each(function(i){
				$(".ge").eq(i).prop("checked",true);
				$(".ge").eq(i).change();
			})
			$(".zong:eq(0),.zong:eq(1)").prop("checkeindexd",true);
		}else{
			$(".ge").each(function(i){
				$(".ge").eq(i).prop("checked",false);
				$(".ge").eq(i).change();
			})
			$(".zong:eq(0),.zong:eq(1)").prop("checked",false);
		}
	})

	$(".ge").each(function(i){
		$(".ge").eq(i).change(function(){
			zj = 0;
			if($(this).prop("checked")){
				$(this).parents("nav").addClass("true");
			}else{
				$(this).parents("nav").removeClass("true");
			}
			$("nav.list.true .cart4 p").each(function(i){
				zj+=Number($("nav.list.true .cart4 p").eq(i).html());
			})
			$(".main-bot span").html("￥"+zj);
			$(".bot-right span:eq(0) em").html($("nav.list.true .cart4 p").length);
			$(".bot-right span:eq(1) em").html("￥"+zj);
		})
		//prop("checked",true);
	})
	$(".jiessuan").click(function(){
		//alert("买完了");
		var ids=[];
		$("nav.list.true").each(function(i){
			var aaa={};
			aaa.id=$("nav.list.true").eq(i).attr("data-id");
			aaa.numbers=$("nav.list.true").eq(i).find(".cart3 input").val();
			aaa.zj=$("nav.list.true").eq(i).find(".cart4 p").html();
			ids.push(aaa);
		})
		$.cookie("sp",null,{expires: 7, path: '/'});
		console.log(ids)
//		$post("",ids,function(){
//			location.href="";
//		})
	})
	
	//删除
	$(".main-cont").on("click",".cart5 a",function(){
		zj=0;
		$(this).parents("nav").empty();
		$("nav.list.true .cart4 p").each(function(i){
				zj+=Number($("nav.list.true .cart4 p").eq(i).html());
		})
			$(".main-bot span").html("￥"+zj);
			$(".bot-right span:eq(0) em").html($("nav.list.true .cart4 p").length);
			$(".bot-right span:eq(1) em").html("￥"+zj);
	})
	$(".cot-left a:eq(1)").click(function(){
		console.log($(this))
		$("nav.list.true").each(function(i){
			$("nav.list.true").eq(i).empty();
		})
		zj=0;
		$("nav.list.true .cart4 p").each(function(i){
				zj+=Number($("nav.list.true .cart4 p").eq(i).html());
		})
			$(".main-bot span").html("￥"+zj);
			$(".bot-right span:eq(0) em").html($("nav.list.true .cart4 p").length);
			$(".bot-right span:eq(1) em").html("￥"+zj);
		
	})
})
