/*jslint eqeq: true, plusplus: true, undef: true, sloppy: true, vars: true, forin: true, nomen: true */
/*!
 * Mobiscroll v2.7.2
 * http://mobiscroll.com
 *
 * Copyright 2010-2013, Acid Media
 * Licensed under the MIT license.
 *
 */

(function($){function Scroller(elem,settings){var m,hi,v,dw,ww,wh,rwh,mw,mh,lock,anim,theme,lang,click,hasButtons,scrollable,moved,start,startTime,stop,p,min,max,modal,target,index,timer,buttons,readOnly,preventChange,preventShow,currElm,that=this,ms=$.mobiscroll,e=elem,elm=$(e),s=extend({},defaults),pres={},iv={},pos={},pixels={},wheels=[],elmList=[],input=elm.is('input'),visible=false,onStart=function(e){if(testTouch(e)&&!move&&!isReadOnly(this)&&!click){e.preventDefault();move=true;scrollable=s.mode!='clickpick';target=$('.dw-ul',this);setGlobals(target);moved=iv[index]!==undefined;p=moved?getCurrentPosition(target):pos[index];start=getCoord(e,'Y');startTime=new Date();stop=start;scroll(target,index,p,0.001);if(scrollable){target.closest('.dwwl').addClass('dwa');}
$(document).on(MOVE_EVENT,onMove).on(END_EVENT,onEnd);}},onMove=function(e){if(scrollable){e.preventDefault();e.stopPropagation();stop=getCoord(e,'Y');scroll(target,index,constrain(p+(start-stop)/hi,min-1,max+1));}
if(start!==stop){moved=true;}},onEnd=function(e){var time=new Date()-startTime,val=constrain(p+(start-stop)/hi,min-1,max+1),speed,dist,tindex,ttop=target.offset().top;if(time<300){speed=(stop-start)/time;dist=(speed*speed)/s.speedUnit;if(stop-start<0){dist=-dist;}}else{dist=stop-start;}
tindex=Math.round(p-dist/hi);if(!dist&&!moved){var idx=Math.floor((stop-ttop)/hi),li=$($('.dw-li',target)[idx]),hl=scrollable;if(event('onValueTap',[li])!==false){tindex=idx;}else{hl=true;}
if(hl){li.addClass('dw-hl');setTimeout(function(){li.removeClass('dw-hl');},200);}}
if(scrollable){calc(target,tindex,0,true,Math.round(val));}
move=false;target=null;$(document).off(MOVE_EVENT,onMove).off(END_EVENT,onEnd);},onBtnStart=function(e){var btn=$(this);$(document).on(END_EVENT,onBtnEnd);if(!btn.hasClass('dwb-d')){btn.addClass('dwb-a');}
setTimeout(function(){btn.blur();},10);if(btn.hasClass('dwwb')){if(testTouch(e)){step(e,btn.closest('.dwwl'),btn.hasClass('dwwbp')?plus:minus);}}},onBtnEnd=function(e){if(click){clearInterval(timer);click=false;}
$(document).off(END_EVENT,onBtnEnd);$('.dwb-a',dw).removeClass('dwb-a');},onKeyDown=function(e){if(e.keyCode==38){step(e,$(this),minus);}else if(e.keyCode==40){step(e,$(this),plus);}},onKeyUp=function(e){if(click){clearInterval(timer);click=false;}},onScroll=function(e){if(!isReadOnly(this)){e.preventDefault();e=e.originalEvent||e;var delta=e.wheelDelta?(e.wheelDelta/120):(e.detail?(-e.detail/3):0),t=$('.dw-ul',this);setGlobals(t);calc(t,Math.round(pos[index]-delta),delta<0?1:2);}};function step(e,w,func){e.stopPropagation();e.preventDefault();if(!click&&!isReadOnly(w)&&!w.hasClass('dwa')){click=true;var t=w.find('.dw-ul');setGlobals(t);clearInterval(timer);timer=setInterval(function(){func(t);},s.delay);func(t);}}
function isReadOnly(wh){if($.isArray(s.readonly)){var i=$('.dwwl',dw).index(wh);return s.readonly[i];}
return s.readonly;}
function generateWheelItems(i){var html='<div class="dw-bf">',ww=wheels[i],w=ww.values?ww:convert(ww),l=1,labels=w.labels||[],values=w.values,keys=w.keys||values;$.each(values,function(j,v){if(l%20==0){html+='</div><div class="dw-bf">';}
html+='<div role="option" aria-selected="false" class="dw-li dw-v" data-val="'+keys[j]+'"'+(labels[j]?' aria-label="'+labels[j]+'"':'')+' style="height:'+hi+'px;line-height:'+hi+'px;"><div class="dw-i">'+v+'</div></div>';l++;});html+='</div>';return html;}
function setGlobals(t){min=$('.dw-li',t).index($('.dw-v',t).eq(0));max=$('.dw-li',t).index($('.dw-v',t).eq(-1));index=$('.dw-ul',dw).index(t);}
function formatHeader(v){var t=s.headerText;return t?(typeof t==='function'?t.call(e,v):t.replace(/\{value\}/i,v)):'';}
function read(){that.temp=that.values?that.values.slice(0):s.parseValue(elm.val()||'',that);setVal();}
function getCurrentPosition(t){var style=window.getComputedStyle?getComputedStyle(t[0]):t[0].style,matrix,px;if(has3d){$.each(['t','webkitT','MozT','OT','msT'],function(i,v){if(style[v+'ransform']!==undefined){matrix=style[v+'ransform'];return false;}});matrix=matrix.split(')')[0].split(', ');px=matrix[13]||matrix[5];}else{px=style.top.replace('px','');}
return Math.round(m-(px/hi));}
function ready(t,i){clearTimeout(iv[i]);delete iv[i];t.closest('.dwwl').removeClass('dwa');}
function scroll(t,index,val,time,active){var px=(m-val)*hi,style=t[0].style,i;if(px==pixels[index]&&iv[index]){return;}
if(time&&px!=pixels[index]){event('onAnimStart',[dw,index,time]);}
pixels[index]=px;style[pr+'Transition']='all '+(time?time.toFixed(3):0)+'s ease-out';if(has3d){style[pr+'Transform']='translate3d(0,'+px+'px,0)';}else{style.top=px+'px';}
if(iv[index]){ready(t,index);}
if(time&&active){t.closest('.dwwl').addClass('dwa');iv[index]=setTimeout(function(){ready(t,index);},time*1000);}
pos[index]=val;}
function scrollToPos(time,index,manual,dir,active){if(event('validate',[dw,index,time])!==false){$('.dw-ul',dw).each(function(i){var t=$(this),cell=$('.dw-li[data-val="'+that.temp[i]+'"]',t),cells=$('.dw-li',t),v=cells.index(cell),l=cells.length,sc=i==index||index===undefined;if(!cell.hasClass('dw-v')){var cell1=cell,cell2=cell,dist1=0,dist2=0;while(v-dist1>=0&&!cell1.hasClass('dw-v')){dist1++;cell1=cells.eq(v-dist1);}
while(v+dist2<l&&!cell2.hasClass('dw-v')){dist2++;cell2=cells.eq(v+dist2);}
if(((dist2<dist1&&dist2&&dir!==2)||!dist1||(v-dist1<0)||dir==1)&&cell2.hasClass('dw-v')){cell=cell2;v=v+dist2;}else{cell=cell1;v=v-dist1;}}
if(!(cell.hasClass('dw-sel'))||sc){that.temp[i]=cell.attr('data-val');$('.dw-sel',t).removeClass('dw-sel');if(!s.multiple){$('.dw-sel',t).removeAttr('aria-selected');cell.attr('aria-selected','true');}
cell.addClass('dw-sel');scroll(t,i,v,sc?time:0.1,sc?active:false);}});v=s.formatResult(that.temp);if(that.live){setVal(manual,0,true);}
if(modal){$('.dwv',dw).html(formatHeader(v));}
if(manual){event('onChange',[v]);}}}
function event(name,args){var ret;args.push(that);$.each([theme.defaults,pres,settings],function(i,v){if(v[name]){ret=v[name].apply(e,args);}});return ret;}
function calc(t,val,dir,anim,orig){val=constrain(val,min,max);var cell=$('.dw-li',t).eq(val),o=orig===undefined?val:orig,active=orig!==undefined,idx=index,time=anim?(val==o?0.1:Math.abs((val-o)*s.timeUnit)):0;that.temp[idx]=cell.attr('data-val');scroll(t,idx,val,time,active);setTimeout(function(){scrollToPos(time,idx,true,dir,active);},10);}
function plus(t){var val=pos[index]+1;calc(t,val>max?min:val,1,true);}
function minus(t){var val=pos[index]-1;calc(t,val<min?max:val,2,true);}
function setVal(fill,time,noscroll,temp,manual){if(visible&&!noscroll){scrollToPos(time,undefined,manual);}
v=s.formatResult(that.temp);if(!temp){that.values=that.temp.slice(0);that.val=v;}
if(fill&&input){preventChange=true;elm.val(v).change();}}
function attachPosition(ev,checkLock){var debounce;$(window).on(ev,function(e){clearTimeout(debounce);debounce=setTimeout(function(){if((lock&&checkLock)||!checkLock){that.position(!checkLock);}},200);});}
that.position=function(check){if(!modal||(ww===$(window).width()&&rwh===$(window).height()&&check)||(event('onPosition',[dw])===false)){return;}
var w,l,t,aw,ah,ap,at,al,arr,arrw,arrl,scroll,totalw=0,minw=0,st=$(window).scrollTop(),wr=$('.dwwr',dw),d=$('.dw',dw),css={},anchor=s.anchor===undefined?elm:s.anchor;ww=$(window).width();rwh=$(window).height();wh=window.innerHeight;wh=wh||rwh;if(/modal|bubble/.test(s.display)){$('.dwc',dw).each(function(){w=$(this).outerWidth(true);totalw+=w;minw=(w>minw)?w:minw;});w=totalw>ww?minw:totalw;wr.width(w).css('white-space',totalw>ww?'':'nowrap');}
mw=d.outerWidth();mh=d.outerHeight(true);lock=mh<=wh&&mw<=ww;if(s.display=='modal'){l=(ww-mw)/2;t=st+(wh-mh)/2;}else if(s.display=='bubble'){scroll=true;arr=$('.dw-arrw-i',dw);ap=anchor.offset();at=ap.top;al=ap.left;aw=anchor.outerWidth();ah=anchor.outerHeight();l=al-(d.outerWidth(true)-aw)/2;l=l>(ww-mw)?(ww-(mw+20)):l;l=l>=0?l:20;t=at-mh;if((t<st)||(at>st+wh)){d.removeClass('dw-bubble-top').addClass('dw-bubble-bottom');t=at+ah;}else{d.removeClass('dw-bubble-bottom').addClass('dw-bubble-top');}
arrw=arr.outerWidth();arrl=al+aw/2-(l+(mw-arrw)/2);$('.dw-arr',dw).css({left:constrain(arrl,0,arrw)});}else{css.width='100%';if(s.display=='top'){t=st;}else if(s.display=='bottom'){t=st+wh-mh;}}
css.top=t<0?0:t;css.left=l;d.css(css);$('.dw-persp',dw).height(0).height(t+mh>$(document).height()?t+mh:$(document).height());if(scroll&&((t+mh>st+wh)||(at>st+wh))){$(window).scrollTop(t+mh-wh);}};that.enable=function(){s.disabled=false;if(input){elm.prop('disabled',false);}};that.disable=function(){s.disabled=true;if(input){elm.prop('disabled',true);}};that.setValue=function(values,fill,time,temp,manual){that.temp=$.isArray(values)?values.slice(0):s.parseValue.call(e,values+'',that);setVal(fill,time,false,temp,manual);};that.getValue=function(){return that.values;};that.getValues=function(){var ret=[],i;for(i in that._selectedValues){ret.push(that._selectedValues[i]);}
return ret;};that.changeWheel=function(idx,time,manual){if(dw){var i=0,nr=idx.length;$.each(s.wheels,function(j,wg){$.each(wg,function(k,w){if($.inArray(i,idx)>-1){wheels[i]=w;$('.dw-ul',dw).eq(i).html(generateWheelItems(i));nr--;if(!nr){that.position();scrollToPos(time,undefined,manual);return false;}}
i++;});if(!nr){return false;}});}};that.isVisible=function(){return visible;};that.tap=function(el,handler){var startX,startY;if(s.tap){el.on('touchstart.dw mousedown.dw',function(e){e.preventDefault();startX=getCoord(e,'X');startY=getCoord(e,'Y');}).on('touchend.dw',function(e){if(Math.abs(getCoord(e,'X')-startX)<20&&Math.abs(getCoord(e,'Y')-startY)<20){handler.call(this,e);}
tap=true;setTimeout(function(){tap=false;},300);});}
el.on('click.dw',function(e){if(!tap){handler.call(this,e);}
e.preventDefault();});};that.show=function(prevAnim){if(s.disabled||visible){return;}
if(s.display=='top'){anim='slidedown';}
if(s.display=='bottom'){anim='slideup';}
read();event('onBeforeShow',[]);var lbl,l=0,mAnim='';if(anim&&!prevAnim){mAnim='dw-'+anim+' dw-in';}
var html='<div role="dialog" class="'+s.theme+' dw-'+s.display+(prefix?' dw'+prefix:'')+(hasButtons?'':' dw-nobtn')+'">'+(!modal?'<div class="dw dwbg dwi"><div class="dwwr">':'<div class="dw-persp"><div class="dwo"></div><div class="dw dwbg '+mAnim+'"><div class="dw-arrw"><div class="dw-arrw-i"><div class="dw-arr"></div></div></div><div class="dwwr"><div aria-live="assertive" class="dwv'+(s.headerText?'':' dw-hidden')+'"></div>')+'<div class="dwcc">';$.each(s.wheels,function(i,wg){html+='<div class="dwc'+(s.mode!='scroller'?' dwpm':' dwsc')+(s.showLabel?'':' dwhl')+'"><div class="dwwc dwrc"><table cellpadding="0" cellspacing="0"><tr>';$.each(wg,function(j,w){wheels[l]=w;lbl=w.label!==undefined?w.label:j;html+='<td><div class="dwwl dwrc dwwl'+l+'">'+(s.mode!='scroller'?'<a href="#" tabindex="-1" class="dwb-e dwwb dwwbp" style="height:'+hi+'px;line-height:'+hi+'px;"><span>+</span></a><a href="#" tabindex="-1" class="dwb-e dwwb dwwbm" style="height:'+hi+'px;line-height:'+hi+'px;"><span>&ndash;</span></a>':'')+'<div class="dwl">'+lbl+'</div><div tabindex="0" aria-live="off" aria-label="'+lbl+'" role="listbox" class="dwww"><div class="dww" style="height:'+(s.rows*hi)+'px;min-width:'+s.width+'px;"><div class="dw-ul">';html+=generateWheelItems(l);html+='</div><div class="dwwol"></div></div><div class="dwwo"></div></div><div class="dwwol"></div></div></td>';l++;});html+='</tr></table></div></div>';});html+='</div>';if(modal&&hasButtons){html+='<div class="dwbc">';$.each(buttons,function(i,b){html+='<span'+(s.btnWidth?' style="width:'+(100/buttons.length)+'%"':'')+' class="dwbw '+b.css+'"><a href="#" class="dwb dwb'+i+' dwb-e" role="button">'+b.text+'</a></span>';});html+='</div>';}
html+=(modal?'</div>':'')+'</div></div></div>';dw=$(html);scrollToPos();event('onMarkupReady',[dw]);if(modal){dw.appendTo('body');if(anim&&!prevAnim){dw.addClass('dw-trans');setTimeout(function(){if(dw){dw.removeClass('dw-trans').find('.dw').removeClass(mAnim);}},350);}}else if(elm.is('div')){elm.html(dw);}else{dw.insertAfter(elm);}
event('onMarkupInserted',[dw]);visible=true;theme.init(dw,that);if(modal){$.each(buttons,function(i,b){that.tap($('.dwb'+i,dw),function(e){b.handler.call(this,e,that);});});if(s.closeOnOverlay){that.tap($('.dwo',dw),function(){that.cancel();});}
$(window).on('keydown.dw',function(e){if(e.keyCode==13){that.select();}else if(e.keyCode==27){that.cancel();}});if(s.scrollLock){dw.on('touchmove touchstart',function(e){if(lock){e.preventDefault();}});}
$('input,select,button').each(function(){if(!this.disabled){if($(this).attr('autocomplete')){$(this).data('autocomplete',$(this).attr('autocomplete'));}
$(this).addClass('dwtd').prop('disabled',true).attr('autocomplete','off');}});that.position();attachPosition('orientationchange.dw resize.dw',false);attachPosition('scroll.dw',true);that.alert(s.ariaDesc);}
dw.on('DOMMouseScroll mousewheel','.dwwl',onScroll).on(START_EVENT,'.dwwl',onStart).on('keydown','.dwwl',onKeyDown).on('keyup','.dwwl',onKeyUp).on(START_EVENT,'.dwb-e',onBtnStart).on('click','.dwb-e',function(e){e.preventDefault();}).on('keydown','.dwb-e',function(e){if(e.keyCode==32){e.preventDefault();e.stopPropagation();$(this).click();}});event('onShow',[dw,v]);};that.hide=function(prevAnim,btn,force){if(!visible||(!force&&event('onClose',[v,btn])===false)){return;}
$('.dwtd').each(function(){$(this).prop('disabled',false).removeClass('dwtd');if($(this).data('autocomplete')){$(this).attr('autocomplete',$(this).data('autocomplete'));}else{$(this).removeAttr('autocomplete');}});if(dw){var doAnim=modal&&anim&&!prevAnim;if(doAnim){dw.addClass('dw-trans').find('.dw').addClass('dw-'+anim+' dw-out');}
setTimeout(function(){if(dw){dw.remove();dw=null;}},doAnim?350:1);$(window).off('.dw');}
pixels={};visible=false;if(currElm){preventShow=true;currElm.focus();}};that.select=function(){if(that.hide(false,'set')!==false){setVal(true,0,true);event('onSelect',[that.val]);}};that.alert=function(txt){aria.text(txt);clearTimeout(alertTimer);alertTimer=setTimeout(function(){aria.text('');},5000);};that.attachShow=function(elm,beforeShow){elmList.push(elm);if(s.display!=='inline'){elm.on((s.showOnFocus?'focus.dw':'')+(s.showOnTap?' click.dw':''),function(){if(!preventShow){if(beforeShow){beforeShow();}
currElm=elm;that.show();}
setTimeout(function(){preventShow=false;},300);});}};that.cancel=function(){if(that.hide(false,'cancel')!==false){event('onCancel',[that.val]);}};that.init=function(ss){theme=extend({defaults:{},load:empty,init:empty},ms.themes[ss.theme||s.theme]);lang=ms.i18n[ss.lang||s.lang];extend(settings,ss);theme.load(lang,settings);extend(s,theme.defaults,lang,settings);that.settings=s;elm.off('.dw');var preset=ms.presets[s.preset];if(preset){pres=preset.call(e,that);extend(s,pres,settings);}
m=Math.floor(s.rows/2);hi=s.height;anim=s.animate;modal=s.display!=='inline';buttons=[];that.live=!modal||!s.setText;if(s.setText){buttons.push({text:s.setText,css:'dwb-s',handler:function(){that.select();}});}
if(s.button3){buttons.push({text:s.button3Text,css:'dwb-n',handler:s.button3});}
if(s.cancelText){buttons.push({text:s.cancelText,css:'dwb-c',handler:function(){that.cancel();}});}
hasButtons=buttons.length>0;if(visible){that.hide();}
if(modal){read();if(input){if(readOnly===undefined){readOnly=e.readOnly;}
e.readOnly=true;}
that.attachShow(elm);$(window).off('.dwa').on('focus.dwa',function(){if(currElm&&document.activeElement==currElm[0]){preventShow=true;}});}else{that.show();}
if(input){elm.on('change.dw',function(){if(!preventChange){that.setValue(elm.val(),false,0.2);}
preventChange=false;});}};that.trigger=function(name,params){return event(name,params);};that.option=function(opt,value){var obj={};if(typeof opt==='object'){obj=opt;}else{obj[opt]=value;}
that.init(obj);};that.destroy=function(){that.hide(true,false,true);$.each(elmList,function(i,v){v.off('.dw');});$(window).off('.dwa');if(input){e.readOnly=readOnly;}
delete scrollers[e.id];event('onDestroy',[]);};that.getInst=function(){return that;};scrollers[e.id]=that;that.values=null;that.val=null;that.temp=null;that._selectedValues={};that.init(settings);}
function testProps(props){var i;for(i in props){if(mod[props[i]]!==undefined){return true;}}
return false;}
function testPrefix(){var prefixes=['Webkit','Moz','O','ms'],p;for(p in prefixes){if(testProps([prefixes[p]+'Transform'])){return'-'+prefixes[p].toLowerCase();}}
return'';}
function testTouch(e){if(e.type==='touchstart'){touch=true;}else if(touch){touch=false;return false;}
return true;}
function getCoord(e,c){var org=e.originalEvent,ct=e.changedTouches;return ct||(org&&org.changedTouches)?(org?org.changedTouches[0]['page'+c]:ct[0]['page'+c]):e['page'+c];}
function constrain(val,min,max){return Math.max(min,Math.min(val,max));}
function convert(w){var ret={values:[],keys:[]};$.each(w,function(k,v){ret.keys.push(k);ret.values.push(v);});return ret;}
function init(that,options,args){var ret=that;if(typeof options==='object'){return that.each(function(){if(!this.id){uuid+=1;this.id='mobiscroll'+uuid;}
if(scrollers[this.id]){scrollers[this.id].destroy();}
new Scroller(this,options);});}
if(typeof options==='string'){that.each(function(){var r,inst=scrollers[this.id];if(inst&&inst[options]){r=inst[options].apply(this,Array.prototype.slice.call(args,1));if(r!==undefined){ret=r;return false;}}});}
return ret;}
var move,tap,touch,alertTimer,aria,date=new Date(),uuid=date.getTime(),scrollers={},empty=function(){},mod=document.createElement('modernizr').style,has3d=testProps(['perspectiveProperty','WebkitPerspective','MozPerspective','OPerspective','msPerspective']),prefix=testPrefix(),pr=prefix.replace(/^\-/,'').replace('moz','Moz'),extend=$.extend,START_EVENT='touchstart mousedown',MOVE_EVENT='touchmove mousemove',END_EVENT='touchend mouseup',defaults={width:70,height:40,rows:3,delay:300,disabled:false,readonly:false,closeOnOverlay:true,showOnFocus:true,showOnTap:true,showLabel:true,wheels:[],theme:'',headerText:'{value}',display:'modal',mode:'scroller',preset:'',lang:'en-US',setText:'Set',cancelText:'Cancel',ariaDesc:'Select a value',scrollLock:true,tap:true,btnWidth:true,speedUnit:0.0012,timeUnit:0.1,formatResult:function(d){return d.join(' ');},parseValue:function(value,inst){var val=value.split(' '),ret=[],i=0,keys;$.each(inst.settings.wheels,function(j,wg){$.each(wg,function(k,w){w=w.values?w:convert(w);keys=w.keys||w.values;if($.inArray(val[i],keys)!==-1){ret.push(val[i]);}else{ret.push(keys[0]);}
i++;});});return ret;}};$(function(){aria=$('<div class="dw-hidden" role="alert"></div>').appendTo('body');});$(document).on('mouseover mouseup mousedown click',function(e){if(tap){e.stopPropagation();e.preventDefault();return false;}});$.fn.mobiscroll=function(method){extend(this,$.mobiscroll.shorts);return init(this,method,arguments);};$.mobiscroll=$.mobiscroll||{setDefaults:function(o){extend(defaults,o);},presetShort:function(name){this.shorts[name]=function(method){return init(this,extend(method,{preset:name}),arguments);};},util:{prefix:prefix,has3d:has3d},shorts:{},presets:{},themes:{},i18n:{}};$.scroller=$.scroller||$.mobiscroll;$.fn.scroller=$.fn.scroller||$.fn.mobiscroll;})(jQuery);

(function($){var ms=$.mobiscroll,date=new Date(),defaults={dateFormat:'yy/mm/dd',dateOrder:'ymmdd',timeWheels:'hhiiA',timeFormat:'hh:ii A',startYear:date.getFullYear()-100,endYear:date.getFullYear()+1,monthNames:['January','February','March','April','May','June','July','August','September','October','November','December'],monthNamesShort:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],dayNames:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],dayNamesShort:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],shortYearCutoff:'+10',monthText:'Month',dayText:'Day',yearText:'Year',hourText:'Hours',minuteText:'Minutes',secText:'Seconds',ampmText:'&nbsp;',nowText:'Now',showNow:false,stepHour:1,stepMinute:1,stepSecond:1,separator:' '},preset=function(inst){var that=$(this),html5def={},format;if(that.is('input')){switch(that.attr('type')){case'date':format='yy-mm-dd';break;case'datetime':format='yy-mm-ddTHH:ii:ssZ';break;case'datetime-local':format='yy-mm-ddTHH:ii:ss';break;case'month':format='yy-mm';html5def.dateOrder='mmyy';break;case'time':format='HH:ii:ss';break;}
var min=that.attr('min'),max=that.attr('max');if(min){html5def.minDate=ms.parseDate(format,min);}
if(max){html5def.maxDate=ms.parseDate(format,max);}}
var i,k,keys,values,wg,start,end,orig=$.extend({},inst.settings),s=$.extend(inst.settings,defaults,html5def,orig),offset=0,wheels=[],ord=[],o={},f={y:'getFullYear',m:'getMonth',d:'getDate',h:getHour,i:getMinute,s:getSecond,a:getAmPm},p=s.preset,dord=s.dateOrder,tord=s.timeWheels,regen=dord.match(/D/),ampm=tord.match(/a/i),hampm=tord.match(/h/),hformat=p=='datetime'?s.dateFormat+s.separator+s.timeFormat:p=='time'?s.timeFormat:s.dateFormat,defd=new Date(),stepH=s.stepHour,stepM=s.stepMinute,stepS=s.stepSecond,mind=s.minDate||new Date(s.startYear,0,1),maxd=s.maxDate||new Date(s.endYear,11,31,23,59,59);format=format||hformat;if(p.match(/date/i)){$.each(['y','m','d'],function(j,v){i=dord.search(new RegExp(v,'i'));if(i>-1){ord.push({o:i,v:v});}});ord.sort(function(a,b){return a.o>b.o?1:-1;});$.each(ord,function(i,v){o[v.v]=i;});wg=[];for(k=0;k<3;k++){if(k==o.y){offset++;values=[];keys=[];start=mind.getFullYear();end=maxd.getFullYear();for(i=start;i<=end;i++){keys.push(i);values.push(dord.match(/yy/i)?i:(i+'').substr(2,2));}
addWheel(wg,keys,values,s.yearText);}else if(k==o.m){offset++;values=[];keys=[];for(i=0;i<12;i++){var str=dord.replace(/[dy]/gi,'').replace(/mm/,i<9?'0'+(i+1):i+1).replace(/m/,(i+1));keys.push(i);values.push(str.match(/MM/)?str.replace(/MM/,'<span class="dw-mon">'+s.monthNames[i]+'</span>'):str.replace(/M/,'<span class="dw-mon">'+s.monthNamesShort[i]+'</span>'));}
addWheel(wg,keys,values,s.monthText);}else if(k==o.d){offset++;values=[];keys=[];for(i=1;i<32;i++){keys.push(i);values.push(dord.match(/dd/i)&&i<10?'0'+i:i);}
addWheel(wg,keys,values,s.dayText);}}
wheels.push(wg);}
if(p.match(/time/i)){ord=[];$.each(['h','i','s','a'],function(i,v){i=tord.search(new RegExp(v,'i'));if(i>-1){ord.push({o:i,v:v});}});ord.sort(function(a,b){return a.o>b.o?1:-1;});$.each(ord,function(i,v){o[v.v]=offset+i;});wg=[];for(k=offset;k<offset+4;k++){if(k==o.h){offset++;values=[];keys=[];for(i=0;i<(hampm?12:24);i+=stepH){keys.push(i);values.push(hampm&&i==0?12:tord.match(/hh/i)&&i<10?'0'+i:i);}
addWheel(wg,keys,values,s.hourText);}else if(k==o.i){offset++;values=[];keys=[];for(i=0;i<60;i+=stepM){keys.push(i);values.push(tord.match(/ii/)&&i<10?'0'+i:i);}
addWheel(wg,keys,values,s.minuteText);}else if(k==o.s){offset++;values=[];keys=[];for(i=0;i<60;i+=stepS){keys.push(i);values.push(tord.match(/ss/)&&i<10?'0'+i:i);}
addWheel(wg,keys,values,s.secText);}else if(k==o.a){offset++;var upper=tord.match(/A/);addWheel(wg,[0,1],upper?['AM','PM']:['am','pm'],s.ampmText);}}
wheels.push(wg);}
function get(d,i,def){if(o[i]!==undefined){return+d[o[i]];}
if(def!==undefined){return def;}
return defd[f[i]]?defd[f[i]]():f[i](defd);}
function addWheel(wg,k,v,lbl){wg.push({values:v,keys:k,label:lbl});}
function step(v,st){return Math.floor(v/st)*st;}
function getHour(d){var hour=d.getHours();hour=hampm&&hour>=12?hour-12:hour;return step(hour,stepH);}
function getMinute(d){return step(d.getMinutes(),stepM);}
function getSecond(d){return step(d.getSeconds(),stepS);}
function getAmPm(d){return ampm&&d.getHours()>11?1:0;}
function getDate(d){var hour=get(d,'h',0);return new Date(get(d,'y'),get(d,'m'),get(d,'d',1),get(d,'a')?hour+12:hour,get(d,'i',0),get(d,'s',0));}
inst.setDate=function(d,fill,time,temp,manual){var i;for(i in o){inst.temp[o[i]]=d[f[i]]?d[f[i]]():f[i](d);}
inst.setValue(inst.temp,fill,time,temp,manual);};inst.getDate=function(temp){return getDate(temp?inst.temp:inst.values);};inst.convert=function(obj){var x=obj;if(!$.isArray(obj)){x=[];$.each(obj,function(i,o){$.each(o,function(j,o){if(i==='daysOfWeek'){if(o.d){o.d='w'+o.d;}else{o='w'+o;}}
x.push(o);});});}
return x;};inst.format=hformat;return{button3Text:s.showNow?s.nowText:undefined,button3:s.showNow?function(){inst.setDate(new Date(),false,0.3,true,true);}:undefined,wheels:wheels,headerText:function(v){return ms.formatDate(hformat,getDate(inst.temp),s);},formatResult:function(d){return ms.formatDate(format,getDate(d),s);},parseValue:function(val){var d=ms.parseDate(format,val,s),i,result=[];for(i in o){result[o[i]]=d[f[i]]?d[f[i]]():f[i](d);}
return result;},validate:function(dw,i){var temp=inst.temp,mins={y:mind.getFullYear(),m:0,d:1,h:0,i:0,s:0,a:0},maxs={y:maxd.getFullYear(),m:11,d:31,h:step(hampm?11:23,stepH),i:step(59,stepM),s:step(59,stepS),a:1},minprop=true,maxprop=true;$.each(['y','m','d','a','h','i','s'],function(x,i){if(o[i]!==undefined){var min=mins[i],max=maxs[i],maxdays=31,val=get(temp,i),t=$('.dw-ul',dw).eq(o[i]),y,m;if(i=='d'){y=get(temp,'y');m=get(temp,'m');maxdays=32-new Date(y,m,32).getDate();max=maxdays;if(regen){$('.dw-li',t).each(function(){var that=$(this),d=that.data('val'),w=new Date(y,m,d).getDay(),str=dord.replace(/[my]/gi,'').replace(/dd/,d<10?'0'+d:d).replace(/d/,d);$('.dw-i',that).html(str.match(/DD/)?str.replace(/DD/,'<span class="dw-day">'+s.dayNames[w]+'</span>'):str.replace(/D/,'<span class="dw-day">'+s.dayNamesShort[w]+'</span>'));});}}
if(minprop&&mind){min=mind[f[i]]?mind[f[i]]():f[i](mind);}
if(maxprop&&maxd){max=maxd[f[i]]?maxd[f[i]]():f[i](maxd);}
if(i!='y'){var i1=$('.dw-li',t).index($('.dw-li[data-val="'+min+'"]',t)),i2=$('.dw-li',t).index($('.dw-li[data-val="'+max+'"]',t));$('.dw-li',t).removeClass('dw-v').slice(i1,i2+1).addClass('dw-v');if(i=='d'){$('.dw-li',t).removeClass('dw-h').slice(maxdays).addClass('dw-h');}}
if(val<min){val=min;}
if(val>max){val=max;}
if(minprop){minprop=val==min;}
if(maxprop){maxprop=val==max;}
if(s.invalid&&i=='d'){var d,j,k,v,first=new Date(y,m,1).getDay(),idx=[],invalid=inst.convert(s.invalid);for(j=0;j<invalid.length;j++){d=invalid[j];v=d+'';if(d.getTime&&d.getFullYear()==y&&d.getMonth()==m){idx.push(d.getDate()-1);}else if(!v.match(/w/i)){v=v.split('/');if(v[1]){if(v[0]-1==m){idx.push(v[1]-1);}}else{idx.push(v[0]-1);}}else{v=+v.replace('w','');for(k=v-first;k<maxdays;k+=7){if(k>=0){idx.push(k);}}}}
$.each(idx,function(i,v){$('.dw-li',t).eq(v).removeClass('dw-v');});}
temp[o[i]]=val;}});}};};$.each(['date','time','datetime'],function(i,v){ms.presets[v]=preset;ms.presetShort(v);});ms.formatDate=function(format,date,settings){if(!date){return null;}
var s=$.extend({},defaults,settings),look=function(m){var n=0;while(i+1<format.length&&format.charAt(i+1)==m){n++;i++;}
return n;},f1=function(m,val,len){var n=''+val;if(look(m)){while(n.length<len){n='0'+n;}}
return n;},f2=function(m,val,s,l){return(look(m)?l[val]:s[val]);},i,output='',literal=false;for(i=0;i<format.length;i++){if(literal){if(format.charAt(i)=="'"&&!look("'")){literal=false;}else{output+=format.charAt(i);}}else{switch(format.charAt(i)){case'd':output+=f1('d',date.getDate(),2);break;case'D':output+=f2('D',date.getDay(),s.dayNamesShort,s.dayNames);break;case'o':output+=f1('o',(date.getTime()-new Date(date.getFullYear(),0,0).getTime())/86400000,3);break;case'm':output+=f1('m',date.getMonth()+1,2);break;case'M':output+=f2('M',date.getMonth(),s.monthNamesShort,s.monthNames);break;case'y':output+=(look('y')?date.getFullYear():(date.getYear()%100<10?'0':'')+date.getYear()%100);break;case'h':var h=date.getHours();output+=f1('h',(h>12?(h-12):(h==0?12:h)),2);break;case'H':output+=f1('H',date.getHours(),2);break;case'i':output+=f1('i',date.getMinutes(),2);break;case's':output+=f1('s',date.getSeconds(),2);break;case'a':output+=date.getHours()>11?'pm':'am';break;case'A':output+=date.getHours()>11?'PM':'AM';break;case"'":if(look("'")){output+="'";}else{literal=true;}
break;default:output+=format.charAt(i);}}}
return output;};ms.parseDate=function(format,value,settings){var s=$.extend({},defaults,settings),def=s.defaultValue||new Date();if(!format||!value){return def;}
value=(typeof value=='object'?value.toString():value+'');var shortYearCutoff=s.shortYearCutoff,year=def.getFullYear(),month=def.getMonth()+1,day=def.getDate(),doy=-1,hours=def.getHours(),minutes=def.getMinutes(),seconds=0,ampm=-1,literal=false,lookAhead=function(match){var matches=(iFormat+1<format.length&&format.charAt(iFormat+1)==match);if(matches){iFormat++;}
return matches;},getNumber=function(match){lookAhead(match);var size=(match=='@'?14:(match=='!'?20:(match=='y'?4:(match=='o'?3:2)))),digits=new RegExp('^\\d{1,'+size+'}'),num=value.substr(iValue).match(digits);if(!num){return 0;}
iValue+=num[0].length;return parseInt(num[0],10);},getName=function(match,s,l){var names=(lookAhead(match)?l:s),i;for(i=0;i<names.length;i++){if(value.substr(iValue,names[i].length).toLowerCase()==names[i].toLowerCase()){iValue+=names[i].length;return i+1;}}
return 0;},checkLiteral=function(){iValue++;},iValue=0,iFormat;for(iFormat=0;iFormat<format.length;iFormat++){if(literal){if(format.charAt(iFormat)=="'"&&!lookAhead("'")){literal=false;}else{checkLiteral();}}else{switch(format.charAt(iFormat)){case'd':day=getNumber('d');break;case'D':getName('D',s.dayNamesShort,s.dayNames);break;case'o':doy=getNumber('o');break;case'm':month=getNumber('m');break;case'M':month=getName('M',s.monthNamesShort,s.monthNames);break;case'y':year=getNumber('y');break;case'H':hours=getNumber('H');break;case'h':hours=getNumber('h');break;case'i':minutes=getNumber('i');break;case's':seconds=getNumber('s');break;case'a':ampm=getName('a',['am','pm'],['am','pm'])-1;break;case'A':ampm=getName('A',['am','pm'],['am','pm'])-1;break;case"'":if(lookAhead("'")){checkLiteral();}else{literal=true;}
break;default:checkLiteral();}}}
if(year<100){year+=new Date().getFullYear()-new Date().getFullYear()%100+
(year<=(typeof shortYearCutoff!='string'?shortYearCutoff:new Date().getFullYear()%100+parseInt(shortYearCutoff,10))?0:-100);}
if(doy>-1){month=1;day=doy;do{var dim=32-new Date(year,month-1,32).getDate();if(day<=dim){break;}
month++;day-=dim;}while(true);}
hours=(ampm==-1)?hours:((ampm&&hours<12)?(hours+12):(!ampm&&hours==12?0:hours));var date=new Date(year,month-1,day,hours,minutes,seconds);if(date.getFullYear()!=year||date.getMonth()+1!=month||date.getDate()!=day){return def;}
return date;};})(jQuery);

(function($){$.mobiscroll.themes.ios={defaults:{dateOrder:'yydMM',rows:5,height:30,width:50,headerText:false,showLabel:false,btnWidth:false,useShortLabels:true}};})(jQuery);


(function($){$.mobiscroll.i18n.zh=$.extend($.mobiscroll.i18n.zh,{setText:'确定',cancelText:'取消',dateFormat:'yy/mm/dd',dateOrder:'yymmdd',dayNames:['周日','周一','周二','周三','周四','周五','周六'],dayNamesShort:['日','一','二','三','四','五','六'],dayText:'日',hourText:'时',minuteText:'分',monthNames:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],monthNamesShort:['一','二','三','四','五','六','七','八','九','十','十一','十二'],monthText:'月',secText:'秒',timeFormat:'HH:ii',timeWheels:'HHii',yearText:'年',nowText:'当前',dateText:'日',timeText:'时间',calendarText:'日历',closeText:'关闭',fromText:'Start',toText:'End',wholeText:'Whole',fractionText:'Fraction',unitText:'Unit',labels:['Years','Months','Days','Hours','Minutes','Seconds',''],labelsShort:['Yrs','Mths','Days','Hrs','Mins','Secs',''],startText:'Start',stopText:'Stop',resetText:'Reset',lapText:'Lap',hideText:'Hide'});})(jQuery);