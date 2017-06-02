function endTimer(year,month,day,hour,minute,second,fn){ 
 var endTime = (new Date(year,month-1,day,hour,minute,second)) - (new Date()); //计算剩余的毫秒数 
 var days = parseInt(endTime / 1000 / 60 / 60 / 24 , 10); //计算剩余的天数 
 var hours = parseInt(endTime / 1000 / 60 / 60 % 24 , 10); //计算剩余的小时 
 var minutes = parseInt(endTime / 1000 / 60 % 60, 10);//计算剩余的分钟 
 var seconds = parseInt(endTime / 1000 % 60, 10);//计算剩余的秒数 
 days = checkTime(days); 
 hours = checkTime(hours); 
 minutes = checkTime(minutes); 
 seconds = checkTime(seconds); 
 fn(days,hours,minutes,seconds);
} 
function checkTime(i){ //将0-9的数字前面加上0，例1变为01 
	 if(i<10) 
	 { 
	  i = "0" + i; 
	 } 
	 return i; 
} 