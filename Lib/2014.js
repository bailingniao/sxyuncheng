var token="6992947e3cc66da63c89107ee3e591130f389bfd";
var env = $$.environment();
var sxArr=["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"];
var gjArr=["奇龙化相","三合封岁","巨库立岁","天赦六甲","飞马追星","府羊同宫","天机双贵","天庚归禄","双子通运","壬福化禄","九转明灯","虎啸生福"];
var bjArr=["雄牛破灾","太乙斗煞","天马拜将","食神破刃","龙腾凤鸣","百福纳吉","八方财胜","腾蛇旺财","九地金马","土载多福","明禄返贵","天木司禄"];
var guaid=[18,19,20,21,22,23,24,25,26,27,28,29];
var baiid=[30,31,32,33,34,35,36,37,38,39,40,41];
var jiaArr=[398,598];
var appArr=[
	["百灵鸟黄历","app/huangli/icon.jpg","app_huangli.html","历灵鸟老黄历，黄道吉日，婚、丧、嫁、娶必备宝典！"],
	["观音灵签","app/qian/icon.jpg","app_qian.html","观音灵签100签，按吉凶可分为三种：上签二十二支、中签六十支、下签十八支。观音灵签每支签都有其特殊的意义。"]
];
if(env.os.name=="Android"){$$('[data-view-aside="features"]').attr("href","user.html");}
$$("#vupload").tap(function(){Lungo.Notification.success("目前最新版本，无需更新。","关闭",7,function(){});});

//indexOf数组的扩展
Array.prototype.indexOf = function(e){for(var i=0,j; j=this[i]; i++){if(j==e){return i;}}return -1;}

function formatDate(nS){
	var now=new Date(parseInt(nS));   
	var year=now.getFullYear(); 
	var month=now.getMonth()+1; 
	var date=now.getDate(); 
	var hour=now.getHours(); 
	var minute=now.getMinutes(); 
	var second=now.getSeconds(); 
	return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
}
//获取参数 
function GET(sName){  
  var sURL = new String(window.location);
  var sURL = document.location.href;
  var iQMark= sURL.lastIndexOf('?');
  var iLensName=sName.length;
  var iStart = sURL.indexOf('?' + sName +'=')
  if (iStart==-1){
        iStart = sURL.indexOf('&' + sName +'=')
		if (iStart==-1){return undefined;}   
  }     
  iStart = iStart + + iLensName + 2;
  var iTemp= sURL.indexOf('&',iStart);
  if (iTemp ==-1){iTemp=sURL.length;}
  return sURL.slice(iStart,iTemp );
  sURL=null;
}

/*phoneGap*/
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
	//打开微博窗口
	$$(".weiboWin").tap(function(){window.open('http://t.bln7.com/', '_blank', 'location=no');});
}