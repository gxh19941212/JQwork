
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
					$(".seebox a:not('.goto_btn')").each(function(i){
						$(".seebox a:not('.goto_btn')").eq(i).click(function(){
							var ID=$(this).parents(".oness").attr("data-id"),
							txt =encodeURI("我的天"),
							cont = encodeURI($(this).parents(".oness").find(".short_title").html());
							location.href="html/details.html?spid="+ID+"&cont="+cont+"&txt="+txt;
						})
					})
					
					$(".seebox .goto_btn").each(function(i){
						$(".seebox .goto_btn").eq(i).click(function(){
							var ID=$(this).parents(".oness").attr("data-id"),
							imgsrc ="../"+$(this).parents(".oness").attr("data-imgsrc"),
							jg=$(this).parents(".oness").attr("data-jg"),
							dz=$(this).parents(".oness").attr("data-dz"),
							numbers=1,
							name = $(this).parents(".oness").attr("data-name"),
							ssr,
							bl=false,index;
							if($.cookie('sp')){
								var data =JSON.parse($.cookie('sp'));
								if(data==null){
									data={"sp":[]};
								}
								data.sp.forEach(function(v,k){
									if(ID==v.id){
										numbers=v.number+1;
										bl=true;
										index=k;
										
									}
								})
								ssr={"id":ID,"imgsrc":imgsrc,"name":name,"jg":jg,"dz":dz,"number":numbers};
								if(bl){
									data.sp[index]=ssr;
								}else{
									data.sp.push(ssr);
								}
								data=JSON.stringify(data);
								$.cookie('sp',data,{expires: 7, path: '/'});
							}else{
								ssr={"sp":[{"id":ID,"imgsrc":imgsrc,"name":name,"jg":jg,"dz":dz,"number":numbers}]};
								data=JSON.stringify(ssr);
								$.cookie('sp',data,{expires: 7, path: '/'});
							}
							
							var io=0;
							JSON.parse($.cookie('sp')).sp.forEach(function(v){io+=v.number});
							$(".cart_num").html(io)
						})
					})
					
					$(".seebox").children("div").hover(function(){
					$(".global_tip").css("display","block");
						},function(){
							$(".global_tip").css("display","none");
						});
					
				})
				
				setInterval("endTimer(2017,6,14,11,11,11,dayend)",1000);
				
				
				
				
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
					
					$(window).scroll(function(){
		
						if($('#today_new_ul li:last-child').offset().top-$(window).scrollTop()<=600){
							//console.log(newdata);
							if(newpos+24<=newdata.length){
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
