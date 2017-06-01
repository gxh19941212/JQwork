
			$(function(){
				$("header").load("html/header.html");
				$("footer").load("html/footer.html");
				$(".add-right").load("html/right.html");

				//促销
				var data1 = {
					"src":["186","198","202","206","208","210"]
				},
				data2 ={
					"src":["292","296","298","300","304","314"],
				},
				html1 = template("test",data1),
				html2 = template("test",data2);
				$(".top_box").eq(0).html(html1);
				$(".top_box").eq(1).html(html2);
				$(".top_list li").click(function(){
					$(".top_list li").removeClass("current");
					$(this).addClass("current");
					$(".top_cent div").css("display","none");
					$(".top_cent div").eq($(this).index()).css("display","block");
					
				});
				
				//每日必看
				$.post("http://localhost/g2/JQwork/php/daysee.php",function(data){
					var daysdata={"data":JSON.parse(data)},
					html3 = template("days",daysdata);
//					console.log(html3)
					$(".seebox").html(html3);
				})
				
				setInterval("endTimer(2017,6,4,11,11,11,dayend)",1000);
				
				
				$(".seebox").children("div").hover(function(){
					$(".global_tip").css("display","block");
				},function(){
					$(".global_tip").css("display","none");
				});
				
				
				//今日上新
				//newdeal_box commit_new add_cart_box
				$("#today_new_ul").on('mouseenter',".newdeal_box",function(){
					$(this).find($(".commit_new")).css("display","block");
					$(this).find($(".add_cart_box")).css("display","block");
				})
				$("#today_new_ul").on('mouseleave',".newdeal_box",function(){
					$(this).find($(".commit_new")).css("display","none");
					$(this).find($(".add_cart_box")).css("display","none");
				})
				
				//自动加载
				
				
//				$("#today_new_ul").on("click","li",function(){
//					var That = $(this)
//					$(this).fadeOut(200,function(){
//						That.fadeIn(200);
//					});
//					})
					var newdata;
					var newpos =0;
					var scrbtn = true,
					scrindex;
					$.post("http://localhost/g2/JQwork/php/splist.php",function(data){
							newdata=Array.from(JSON.parse(data));
							var newarr=new Array();
							for(var aa = 0 ;aa<20;aa++){
								if(newarr.length<50){
									newarr = newarr.concat(newdata);
								}else{
									break;
								}
							}
							newdata=newarr;
							for(var i=newpos;i<newpos+12;i++){
								var a= template("daynew",newdata[i]);
								//console.log(newdata[i]);
								$('#today_new_ul').append(a);
							}
							console.log(newdata)

					
					
					
					$(window).scroll(function(){
		
						if($('#today_new_ul li:last-child').offset().top-$(window).scrollTop()<=600){
							//console.log(newdata);
							if(newpos+12<=newdata.length){
								newpos=newpos+12;
								for(var i=newpos;i<newpos+12;i++){
									var a= template("daynew",newdata[i]);
									//console.log(newdata[i]);
									$('#today_new_ul').append(a);
								}
							}
							
						}
						
						
						//滑动切换左侧
						if($(window).scrollTop()>=$("#day_see").offset().top){
							$(".home_left").fadeIn(400);
							if($(window).scrollTop()<=$("#today_new_deal").offset().top){
								scrindex=0;
							}else if($(window).scrollTop()<=$("#brands_head").offset().top
							&&$(window).scrollTop()>=$("#today_new_deal").offset().top){
								scrindex=1;
							}else if($(window).scrollTop()>=$("#brands_head").offset().top){
								scrindex=2;
							}
						}else{
							$(".home_left").fadeOut(400);
						}
						if(scrbtn){
							$(".home_left a").removeClass("act");
							$(".home_left a").eq(scrindex).addClass("act");
						}
						
					});
					})
				
				//楼层点击
				$(".home_left").on("click","a",function(){
					scrbtn=false;
					$(".home_left a").removeClass("act");
					$(this).addClass("act");
					var aaaaa=setTimeout(function(){
						scrbtn=true;
					},500);
				})
				
			})
			//dayend
			function dayend(days,hours,minutes,seconds){
					$(".end_time").html("距特卖结束 "+days+"<em>:</em>" + hours+"<em>:</em>" + minutes+"<em>:</em>"+seconds);
				//自动加载
				$(".time_box").html("<em>"+days+"</em>天<em>"+hours+"</em>时<em>"+minutes+"</em>分<em>"+seconds+"</em>秒");
			}
