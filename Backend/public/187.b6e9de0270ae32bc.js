(self.webpackChunkFrontend=self.webpackChunkFrontend||[]).push([[187],{1187:(k,w,l)=>{"use strict";l.r(w),l.d(w,{ChatModule:()=>ve});var M=l(9808),O=l(793),f=l(9291);function v(n,o,t,i,s,c,g){try{var x=n[c](g),C=x.value}catch(Ce){return void t(Ce)}x.done?o(C):Promise.resolve(C).then(i,s)}var m=l(8187),h=l(7579),I=l(3900),p=l(3716),a=l(4450),r=l(2340),u=l(4327),e=l(5e3),d=l(1245),H=l(3175),T=l(263),b=l(273),A=l(5620),P=l(5245),_=l(2525),Z=l(7423),y=l(773),U=l(4118);let S=(()=>{class n{constructor(t){this.element=t,setTimeout(()=>{const i=t.nativeElement;i.innerHTML.split("\n").length>1&&i.classList.add("no_float")},0)}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(e.SBq))},n.\u0275dir=e.lG2({type:n,selectors:[["","appMessage",""]]}),n})();var V=l(5248);let E=(()=>{class n{transform(t){let i=t;if(t){const s=new Date(Date.parse(t));let c=s.getMinutes();c<10&&(c=`0${c}`),i=`${s.getHours()}:${c}`}return i}}return n.\u0275fac=function(t){return new(t||n)},n.\u0275pipe=e.Yjl({name:"createHour",type:n,pure:!0}),n})(),F=(()=>{class n{transform(t){let i=t.split("/");return i=r.N.production?"/"+i[i.length-1]:r.N.url_base+"/"+i[i.length-1],i}}return n.\u0275fac=function(t){return new(t||n)},n.\u0275pipe=e.Yjl({name:"createUrl",type:n,pure:!0}),n})(),L=(()=>{class n{transform(t){const i=parseInt(t),s=Math.round(i/1e3);return i>1e6?`${s} MB`:`${s} kB`}}return n.\u0275fac=function(t){return new(t||n)},n.\u0275pipe=e.Yjl({name:"size",type:n,pure:!0}),n})();var N=l(1054);function J(n,o){if(1&n){const t=e.EpF();e.TgZ(0,"div",15),e.NdJ("click",function(){e.CHM(t);const s=e.oxw();return e.KtG(s.blockChat())}),e.TgZ(1,"div",16)(2,"span"),e._uU(3),e.qZA()()()}if(2&n){const t=e.oxw();e.xp6(3),e.hij("Block ",null==t.chatUser?null:t.chatUser.name,"")}}function Y(n,o){if(1&n){const t=e.EpF();e.TgZ(0,"div",15),e.NdJ("click",function(){e.CHM(t);const s=e.oxw();return e.KtG(s.unlockChat())}),e.TgZ(1,"div",16)(2,"span"),e._uU(3),e.qZA()()()}if(2&n){const t=e.oxw();e.xp6(3),e.hij("Unlock ",null==t.chatUser?null:t.chatUser.name,"")}}function D(n,o){1&n&&(e.TgZ(0,"div",25)(1,"p"),e._uU(2,"Translating messages. "),e._UZ(3,"br"),e._uU(4," This could take a few seconds"),e.qZA()())}function B(n,o){if(1&n){const t=e.EpF();e.TgZ(0,"div",40),e.NdJ("click",function(){e.CHM(t);const s=e.oxw().$implicit,c=e.oxw(3);return e.KtG(c.viewPhoto("image_"+s.image.public_id))}),e._UZ(1,"img",41),e.qZA()}if(2&n){const t=e.oxw().$implicit;e.Gre("image_modal image_",t.image.public_id,""),e.xp6(1),e.Q6J("src",t.image.url,e.LSH)}}function q(n,o){if(1&n){const t=e.EpF();e.TgZ(0,"div",42),e.NdJ("click",function(){e.CHM(t);const s=e.oxw().$implicit,c=e.oxw(3);return e.KtG(c.downloadDoc(s._id,s.doc.name,s._id+s.doc.url.split("/")[s.doc.url.split("/").length-1]))}),e.TgZ(1,"div",43)(2,"div",44),e._UZ(3,"i",45),e.TgZ(4,"p"),e._uU(5),e.qZA()(),e.TgZ(6,"div",46),e._UZ(7,"i",47),e.qZA()(),e.TgZ(8,"div",48)(9,"p"),e._uU(10),e.qZA(),e.TgZ(11,"p",49),e._uU(12,"-"),e.qZA(),e.TgZ(13,"p"),e._uU(14),e.ALo(15,"size"),e.qZA()()()}if(2&n){const t=e.oxw().$implicit;e.xp6(5),e.Oqu(t.doc.name),e.xp6(1),e.Q6J("id",t._id+t.doc.url.split("/")[t.doc.url.split("/").length-1]),e.xp6(4),e.Oqu(t.doc.name.split(".")[t.doc.name.split(".").length-1].toUpperCase()),e.xp6(4),e.Oqu(e.lcZ(15,4,t.doc.size))}}function Q(n,o){if(1&n&&(e.TgZ(0,"div",50),e._UZ(1,"audio",51),e.ALo(2,"createUrl"),e.TgZ(3,"div",48),e._uU(4),e.qZA()()),2&n){const t=e.oxw().$implicit;e.xp6(1),e.Q6J("src",e.lcZ(2,2,t.doc.url),e.LSH),e.xp6(3),e.hij(" ",null==t||null==t.doc?null:t.doc.time.toUpperCase()," ")}}function j(n,o){if(1&n&&(e.TgZ(0,"div",52)(1,"a",53),e.ALo(2,"location"),e._UZ(3,"img",54),e.qZA()()),2&n){const t=e.oxw().$implicit;e.xp6(1),e.s9C("href",e.lcZ(2,1,t.location),e.LSH)}}function R(n,o){if(1&n&&(e.TgZ(0,"p",55),e._uU(1),e.qZA()),2&n){const t=e.oxw().$implicit;e.xp6(1),e.Oqu(t.message)}}const K=function(n){return{read:n}};function $(n,o){if(1&n&&(e.TgZ(0,"mat-icon",56),e._uU(1,"done_all"),e.qZA()),2&n){const t=e.oxw().$implicit;e.Q6J("ngClass",e.VKq(1,K,t.read))}}const G=function(n){return{options_image:n}};function W(n,o){if(1&n){const t=e.EpF();e.TgZ(0,"span",57)(1,"mat-icon",40),e.NdJ("click",function(){e.CHM(t);const s=e.MAs(4),c=e.oxw().$implicit,g=e.oxw(3);return e.KtG(g.openMessageMenu(c._id,c.from,c.message,s))}),e._uU(2,"keyboard_arrow_down"),e.qZA(),e._UZ(3,"button",58,59),e.qZA()}if(2&n){const t=e.oxw().$implicit;e.oxw(3);const i=e.MAs(36);e.Q6J("ngClass",e.VKq(2,G,(null==t?null:t.image)||(null==t?null:t.doc)||(null==t?null:t.location))),e.xp6(3),e.Q6J("matMenuTriggerFor",i)}}const X=function(n,o,t,i){return{message__me:n,message__him:o,message__init:t,final_message:i}},ee=function(n){return{img:n}};function te(n,o){if(1&n&&(e.TgZ(0,"div",31),e.YNc(1,B,2,4,"div",32),e.YNc(2,q,16,6,"div",33),e.YNc(3,Q,5,4,"div",34),e.YNc(4,j,4,3,"div",35),e.YNc(5,R,2,1,"p",36),e.TgZ(6,"div",37)(7,"p"),e._uU(8),e.ALo(9,"createHour"),e.qZA(),e.YNc(10,$,2,3,"mat-icon",38),e.qZA(),e.YNc(11,W,5,4,"span",39),e.qZA()),2&n){const t=o.$implicit,i=o.last,s=e.oxw(3);e.Q6J("ngClass",e.l5B(13,X,t.from===s.user._id,t.to===s.user._id,s.isInit(t),i))("id",t._id),e.xp6(1),e.Q6J("ngIf",t.image),e.xp6(1),e.Q6J("ngIf",(null==t||null==t.doc?null:t.doc.url)&&"audio"!=(null==t||null==t.doc?null:t.doc.mimetype.split("/")[0])),e.xp6(1),e.Q6J("ngIf",(null==t||null==t.doc?null:t.doc.url)&&"audio"==(null==t||null==t.doc?null:t.doc.mimetype.split("/")[0])),e.xp6(1),e.Q6J("ngIf",null==t?null:t.location),e.xp6(1),e.Q6J("ngIf",t.message.trim().length>0),e.xp6(1),e.Q6J("ngClass",e.VKq(18,ee,t.message.trim().length<1&&t.image)),e.xp6(2),e.Oqu(e.lcZ(9,11,t.createdAt)),e.xp6(2),e.Q6J("ngIf",t.from===s.user._id),e.xp6(1),e.Q6J("ngIf",t.from==s.user._id||(null==t||null==t.message?null:t.message.trim())&&(null==t||null==t.message?null:t.message.trim().length)>0)}}function ne(n,o){if(1&n&&(e.TgZ(0,"div")(1,"div",29),e.YNc(2,te,12,20,"div",30),e.qZA()()),2&n){const t=e.oxw(2);e.xp6(2),e.Q6J("ngForOf",t.messages)}}function ie(n,o){1&n&&(e.TgZ(0,"p",61),e._uU(1,"You have no messages in this chat."),e.qZA())}function se(n,o){if(1&n&&e.YNc(0,ie,2,0,"p",60),2&n){const t=e.oxw(2);e.Q6J("ngIf",!(null!=t.chat&&null!=t.chat.blocked&&t.chat.blocked.from))}}function oe(n,o){if(1&n&&(e.TgZ(0,"main",26),e.YNc(1,ne,3,1,"div",27),e.YNc(2,se,1,1,"ng-template",null,28,e.W1O),e.qZA()),2&n){const t=e.MAs(3),i=e.oxw();e.xp6(1),e.Q6J("ngIf",i.messages.length>0)("ngIfElse",t)}}function ae(n,o){if(1&n){const t=e.EpF();e.TgZ(0,"app-input",62),e.NdJ("sendMessage",function(s){e.CHM(t);const c=e.oxw();return e.KtG(c.sendMessage(s))})("sendAlert",function(s){e.CHM(t);const c=e.oxw();return e.KtG(c.sendAlert(s))}),e.qZA()}if(2&n){const t=e.oxw();e.Q6J("inputId",t.inputId)}}function ce(n,o){1&n&&e._UZ(0,"mat-spinner",63)}function re(n,o){if(1&n){const t=e.EpF();e.TgZ(0,"p",65),e.NdJ("click",function(){e.CHM(t);const s=e.oxw(2);return e.KtG(s.unlockChat())}),e._uU(1,"You have blocked this user."),e._UZ(2,"br"),e._uU(3,"Click here to unlock."),e.qZA()}}function le(n,o){1&n&&(e.TgZ(0,"p",61),e._uU(1,"This user has blocked you"),e.qZA())}function me(n,o){if(1&n&&(e.YNc(0,re,4,0,"p",64),e.YNc(1,le,2,0,"p",60)),2&n){const t=e.oxw();e.Q6J("ngIf",t.chat.blocked.from==t.user._id),e.xp6(1),e.Q6J("ngIf",t.chat.blocked.from!=t.user._id)}}function de(n,o){if(1&n){const t=e.EpF();e.TgZ(0,"div",15),e.NdJ("click",function(){e.CHM(t);const s=e.oxw();return e.KtG(s.deleteMessage())}),e.TgZ(1,"div",16)(2,"span"),e._uU(3,"Delete message"),e.qZA()()()}}function ge(n,o){if(1&n){const t=e.EpF();e.TgZ(0,"div",15),e.NdJ("click",function(){e.CHM(t);const s=e.oxw();return e.KtG(s.translateMessage())}),e.TgZ(1,"div",16)(2,"span"),e._uU(3,"Translate message"),e.qZA()()()}}const he=[{path:"",component:(()=>{class n{constructor(t,i,s,c,g,x,C){this.messageService=t,this.chatService=i,this.authService=s,this.socketService=c,this.route=g,this.router=x,this.store=C,this.inputId=Date.now(),this.url_base=r.N.url_base,this.imgDefault=r.N.imgDefault,this.haveImage=!1,this.eventOpenAlert=new h.x,this.message_option={},this.traslating=!1,this.user=this.authService.getMyUser(),this.getMessages(),this.loadChatInfo(),this.listenReadMessages(),this.listenMessages(),this.listenBlockAndUnblock()}ngOnInit(){}ngOnDestroy(){this.storeSuscription.unsubscribe(),this.subReadMessages.unsubscribe(),this.subListenMessages.unsubscribe(),this.subListenBlockChat.unsubscribe(),this.subListenUnlockChat.unsubscribe()}scroll(){const t=document.querySelector("main");t?t.scrollTop=t.scrollHeight:setTimeout(()=>{this.scroll()},200)}isInit(t){const i=this.messages.findIndex(s=>s._id==t._id);if(i>0){const s=this.messages[i-1],c=t;return s.from!=this.user._id&&c.from==this.user._id||s.to!=this.user._id&&c.to==this.user._id}return!0}call(){(0,m.O1)(this.eventOpenAlert,"Coming soon")}observeFinal(){this.scroll(),this.divFinal=document.querySelector(".final_message");const t=document.querySelector(".noMessages");this.divFinal&&!t?(this.observeFinalSub=new IntersectionObserver(i=>{const s=document.querySelectorAll(".message div");i[0].isIntersecting?s.forEach(c=>{c.style.visibility="visible",this.observeFinalSub.unobserve(this.divFinal)}):setTimeout(()=>{this.scroll()},200)}),this.observeFinalSub.observe(this.divFinal)):t||setTimeout(()=>{this.observeFinal()},200)}getChatUser(){this.chatService.getFromUser(this.chatId).subscribe(t=>{this.chatUser=t})}loadChatInfo(){this.chatService.getChatInfo(this.chatId).subscribe(t=>{this.chat=t},t=>{this.router.navigate(["/"])})}listenBlockAndUnblock(){this.subListenBlockChat=this.socketService.listen(r.N.events.CHAT_BLOCKED).subscribe(t=>{this.store.dispatch(new a.gS({chatId:t._id,block:t.blocked})),this.chat=t}),this.subListenUnlockChat=this.socketService.listen(r.N.events.CHAT_UNLOCKED).subscribe(t=>{this.store.dispatch(new a.gS({chatId:t._id})),this.chat=t})}blockChat(){this.chatService.blockChat(this.chatId).subscribe(t=>{this.store.dispatch(new a.gS({chatId:t._id,block:t.blocked})),this.chat=t})}unlockChat(){this.chatService.unlockChat(this.chatId).subscribe(t=>{this.chat=t,this.store.dispatch(new a.gS({chatId:t._id}))})}loadMessages(){this.storeSuscription=this.store.select("messages").subscribe(t=>{const i=t.find(s=>s.chatId==this.chatId);i&&(this.messages=i.messages,setTimeout(()=>{this.observeFinal()},0),setTimeout(()=>{this.scroll()},0))})}getMessages(){this.route.params.pipe((0,I.w)(t=>{this.chatId&&this.ngOnDestroy();let i=!1;return this.chatId&&(i=!0),this.chatId=t.id,i&&this.listenReadMessages(),i&&this.listenMessages(),this.readMessages(),this.getChatUser(),this.messageService.getMessages(t.id)})).subscribe(t=>{this.messages=t,this.store.dispatch(new p.uq({chatId:this.chatId,messages:t})),this.loadMessages(),setTimeout(()=>{this.scroll()},0)})}getSize(t){const i=parseInt(t),s=Math.round(i/1e3);return i>1e6?`${s} MB`:`${s} kB`}downloadDoc(t,i,s){(0,m.O1)(this.eventOpenAlert,"Downloading"),document.getElementById(s).classList.add("animate__zoomOut"),this.messageService.downloadDoc(t).subscribe(c=>{let g=new Blob([c]);(0,u.saveAs)(g,i)})}sendMessage(t){const i=t.message.trim();if(null!=t&&t.isLocation)this.messageService.sendMessage({message:"location",chatId:this.chatId,isLocation:t.isLocation}).subscribe(s=>{this.store.dispatch(new a.lq({myuser:this.user,message:s})),this.store.dispatch(new p.PV({chatId:this.chatId,message:s})),this.scroll()});else if(t.image){const s=this.getFormData(t);null!=t&&t.isAudio?(s.append("isAudio",`${null==t?void 0:t.isAudio}`),(0,m.O1)(this.eventOpenAlert,"Sending audio...",!1)):(0,m.O1)(this.eventOpenAlert,"Sending image...",!1),this.messageService.sendImage(s).subscribe(c=>{(0,m.O1)(this.eventOpenAlert,"successfully uploaded",!0),this.store.dispatch(new a.lq({myuser:this.user,message:c})),this.store.dispatch(new p.PV({chatId:this.chatId,message:c})),this.scroll()},c=>{(0,m.O1)(this.eventOpenAlert,c)})}else i&&(document.getElementById(this.inputId.toString()).focus(),this.messageService.sendMessage({message:i,chatId:this.chatId}).subscribe(c=>{this.store.dispatch(new a.lq({myuser:this.user,message:c})),this.store.dispatch(new p.PV({chatId:this.chatId,message:c})),this.scroll()}))}getFormData(t){const i=new FormData;return i.append("file",t.image),i.append("chatId",this.chatId),t.message.trim()&&i.append("message",t.message),i}readMessages(){this.messages?this.messages.filter(i=>!(null!=i&&i.read)&&i.to==this.user._id).length>0?(this.messageService.readMessages(this.chatId).subscribe(i=>{}),this.store.dispatch(new a.Vo({chatId:this.chatId,userId:this.user._id}))):this.store.dispatch(new a.Vo({chatId:this.chatId,userId:this.user._id})):setTimeout(()=>{this.readMessages()},600)}listenMessages(){this.subListenMessages=this.socketService.listen(r.N.events.NEW_MESSAGE).subscribe(t=>{t.to==this.user._id&&this.readMessages()})}listenReadMessages(){this.subReadMessages=this.socketService.listen(r.N.events.READ_MESSAGES).subscribe(t=>{this.store.dispatch(new a.Vo({chatId:t.chatId})),t.chatId==this.chatId&&this.store.dispatch(new p.II({chatId:this.chatId}))})}sendAlert(t){(0,m.O1)(this.eventOpenAlert,t)}viewPhoto(t){document.querySelector("."+t).classList.toggle("active")}openMessageMenu(t,i,s,c){this.message_option.id=t,this.message_option.from=i,this.message_option.message=s,c.click()}deleteMessage(){window.confirm("Delete message?")&&((0,m.O1)(this.eventOpenAlert,"Deleting message",!1),this.messageService.deleteMyMessage(this.message_option.id).subscribe(i=>{this.store.dispatch(new p.$6({messageId:this.message_option.id,chatId:this.chatId})),this.store.dispatch(new a.Km({chatId:this.chatId,messages:this.messages,myUserId:this.user._id})),(0,m.O1)(this.eventOpenAlert,"Message deleted")}))}translateMessage(){try{const t=JSON.parse(localStorage.getItem("language"));t.abr.trim(),t?((0,m.O1)(this.eventOpenAlert,"Translating message. This may take a few seconds",!1),this.messageService.translateMessages(JSON.stringify(t),[this.message_option]).subscribe(s=>{(0,m.O1)(this.eventOpenAlert,"Translated message"),console.log(s),this.store.dispatch(new p.eS({message:s[0].message,messageId:s[0].id,chatId:this.chatId}))})):this.turnOnTranslate()}catch(t){this.turnOnTranslate()}}turnOnTranslate(){localStorage.removeItem("language"),(0,m.O1)(this.eventOpenAlert,"Turn on translation in settings")}showContactProfile(){return function z(n){return function(){var o=this,t=arguments;return new Promise(function(i,s){var c=n.apply(o,t);function g(C){v(c,i,s,g,x,"next",C)}function x(C){v(c,i,s,g,x,"throw",C)}g(void 0)})}}(function*(){})()}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(d.e),e.Y36(H.a),e.Y36(T.e),e.Y36(b.$),e.Y36(f.gz),e.Y36(f.F0),e.Y36(A.yh))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-chat"]],decls:39,vars:13,consts:[[1,"con"],[1,"container"],[1,"header"],[1,"me"],["routerLink","/",1,"back"],[1,"image_modal","image_profile_user",3,"click"],["alt","Foto de perfil de (usuario)",3,"src"],[1,"icons"],[1,"camera",3,"click"],[1,"phone",3,"click"],[1,"container-menu"],["mat-icon-button","","aria-label","menu",3,"matMenuTriggerFor"],[1,"menu"],["xPosition","before"],["menu","matMenu"],[1,"item-menu",3,"click"],["mat-menu-item",""],["class","item-menu",3,"click",4,"ngIf"],["class","alertMessage",4,"ngIf"],["id","main",4,"ngIf","ngIfElse"],[3,"inputId","sendMessage","sendAlert",4,"ngIf","ngIfElse"],[3,"eventOpenAlert"],["loading",""],["blocked",""],["menuMessage","matMenu"],[1,"alertMessage"],["id","main"],[4,"ngIf","ngIfElse"],["noMessages",""],[1,"message"],[3,"ngClass","id",4,"ngFor","ngForOf"],[3,"ngClass","id"],[3,"class","click",4,"ngIf"],["class","doc",3,"click",4,"ngIf"],["class","audio_reproductor",4,"ngIf"],["class","location",4,"ngIf"],["appMessage","","class","text-message",4,"ngIf"],[1,"info",3,"ngClass"],["class","icon-done",3,"ngClass",4,"ngIf"],["class","options",3,"ngClass",4,"ngIf"],[3,"click"],["alt","Imagen",3,"src"],[1,"doc",3,"click"],[1,"icon"],[1,"file"],[1,"fas","fa-file"],[1,"download","animate__animated",3,"id"],[1,"fas","fa-arrow-alt-down"],[1,"data"],[1,"space"],[1,"audio_reproductor"],["preload","auto","controls","",3,"src"],[1,"location"],["target","__blank",3,"href"],["src","assets/images/location.jpg","alt","google maps location"],["appMessage","",1,"text-message"],[1,"icon-done",3,"ngClass"],[1,"options",3,"ngClass"],["aria-label","menuMessage",3,"matMenuTriggerFor"],["buttonOptionsMessage",""],["class","noMessages",4,"ngIf"],[1,"noMessages"],[3,"inputId","sendMessage","sendAlert"],["id","loading",1,"spinner-chat"],["class","noMessages","style","cursor: pointer;",3,"click",4,"ngIf"],[1,"noMessages",2,"cursor","pointer",3,"click"]],template:function(t,i){if(1&t&&(e.TgZ(0,"div",0)(1,"div",1)(2,"header",2)(3,"div",3)(4,"mat-icon",4),e._uU(5,"arrow_back"),e.qZA(),e.TgZ(6,"div",5),e.NdJ("click",function(){return i.viewPhoto("image_profile_user")}),e._UZ(7,"img",6),e.qZA(),e.TgZ(8,"p"),e._uU(9),e.qZA()(),e.TgZ(10,"div",7)(11,"mat-icon",8),e.NdJ("click",function(){return i.call()}),e._uU(12,"videocam"),e.qZA(),e.TgZ(13,"mat-icon",9),e.NdJ("click",function(){return i.call()}),e._uU(14," local_phone"),e.qZA(),e.TgZ(15,"div",10)(16,"button",11)(17,"mat-icon",12),e._uU(18,"more_vert"),e.qZA()(),e.TgZ(19,"mat-menu",13,14)(21,"div",15),e.NdJ("click",function(){return i.showContactProfile()}),e.TgZ(22,"div",16)(23,"span"),e._uU(24,"Contact info"),e.qZA()()(),e.YNc(25,J,4,1,"div",17),e.YNc(26,Y,4,1,"div",17),e.qZA()()()()(),e.YNc(27,D,5,0,"div",18),e.YNc(28,oe,4,2,"main",19),e.YNc(29,ae,1,1,"app-input",20),e._UZ(30,"app-mini-alert",21),e.qZA(),e.YNc(31,ce,1,0,"ng-template",null,22,e.W1O),e.YNc(33,me,2,2,"ng-template",null,23,e.W1O),e.TgZ(35,"mat-menu",13,24),e.YNc(37,de,4,0,"div",17),e.YNc(38,ge,4,0,"div",17),e.qZA()),2&t){const s=e.MAs(20),c=e.MAs(32),g=e.MAs(34);e.xp6(7),e.Q6J("src",(null==i.chatUser?null:i.chatUser.image.url)||i.imgDefault,e.LSH),e.xp6(2),e.Oqu((null==i.chatUser?null:i.chatUser.name)||"..."),e.xp6(7),e.Q6J("matMenuTriggerFor",s),e.xp6(9),e.Q6J("ngIf",!(null!=i.chat&&null!=i.chat.blocked&&i.chat.blocked.from)),e.xp6(1),e.Q6J("ngIf",(null==i.chat||null==i.chat.blocked?null:i.chat.blocked.from)&&(null==i.chat||null==i.chat.blocked?null:i.chat.blocked.from)==i.user._id),e.xp6(1),e.Q6J("ngIf",i.traslating),e.xp6(1),e.Q6J("ngIf",i.messages)("ngIfElse",c),e.xp6(1),e.Q6J("ngIf",!(null!=i.chat&&null!=i.chat.blocked&&i.chat.blocked.from))("ngIfElse",g),e.xp6(1),e.Q6J("eventOpenAlert",i.eventOpenAlert.asObservable()),e.xp6(7),e.Q6J("ngIf",(null==i.message_option?null:i.message_option.from)==i.user._id),e.xp6(1),e.Q6J("ngIf",(null==i.message_option||null==i.message_option.message?null:i.message_option.message.trim())&&(null==i.message_option||null==i.message_option.message?null:i.message_option.message.trim().length)>0)}},dependencies:[M.mk,M.sg,M.O5,f.rH,P.Hw,_.VK,_.OP,_.p6,Z.lW,y.Ou,U.O,S,V.a,E,F,L,N.p],styles:["[_ngcontent-%COMP%]:root{--app-height: 100%}[_nghost-%COMP%]{background:#fff;height:100%;left:0;position:absolute;top:0;width:100%;z-index:100}.con[_ngcontent-%COMP%]{width:100%;height:var(--app-height);background-color:#44bcff1f;background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 304 304' width='304' height='304'%3E%3Cpath fill='%2344bcff' fill-opacity='0.27' d='M44.1 224a5 5 0 1 1 0 2H0v-2h44.1zm160 48a5 5 0 1 1 0 2H82v-2h122.1zm57.8-46a5 5 0 1 1 0-2H304v2h-42.1zm0 16a5 5 0 1 1 0-2H304v2h-42.1zm6.2-114a5 5 0 1 1 0 2h-86.2a5 5 0 1 1 0-2h86.2zm-256-48a5 5 0 1 1 0 2H0v-2h12.1zm185.8 34a5 5 0 1 1 0-2h86.2a5 5 0 1 1 0 2h-86.2zM258 12.1a5 5 0 1 1-2 0V0h2v12.1zm-64 208a5 5 0 1 1-2 0v-54.2a5 5 0 1 1 2 0v54.2zm48-198.2V80h62v2h-64V21.9a5 5 0 1 1 2 0zm16 16V64h46v2h-48V37.9a5 5 0 1 1 2 0zm-128 96V208h16v12.1a5 5 0 1 1-2 0V210h-16v-76.1a5 5 0 1 1 2 0zm-5.9-21.9a5 5 0 1 1 0 2H114v48H85.9a5 5 0 1 1 0-2H112v-48h12.1zm-6.2 130a5 5 0 1 1 0-2H176v-74.1a5 5 0 1 1 2 0V242h-60.1zm-16-64a5 5 0 1 1 0-2H114v48h10.1a5 5 0 1 1 0 2H112v-48h-10.1zM66 284.1a5 5 0 1 1-2 0V274H50v30h-2v-32h18v12.1zM236.1 176a5 5 0 1 1 0 2H226v94h48v32h-2v-30h-48v-98h12.1zm25.8-30a5 5 0 1 1 0-2H274v44.1a5 5 0 1 1-2 0V146h-10.1zm-64 96a5 5 0 1 1 0-2H208v-80h16v-14h-42.1a5 5 0 1 1 0-2H226v18h-16v80h-12.1zm86.2-210a5 5 0 1 1 0 2H272V0h2v32h10.1zM98 101.9V146H53.9a5 5 0 1 1 0-2H96v-42.1a5 5 0 1 1 2 0zM53.9 34a5 5 0 1 1 0-2H80V0h2v34H53.9zm60.1 3.9V66H82v64H69.9a5 5 0 1 1 0-2H80V64h32V37.9a5 5 0 1 1 2 0zM101.9 82a5 5 0 1 1 0-2H128V37.9a5 5 0 1 1 2 0V82h-28.1zm16-64a5 5 0 1 1 0-2H146v44.1a5 5 0 1 1-2 0V18h-26.1zm102.2 270a5 5 0 1 1 0 2H98v14h-2v-16h124.1zM242 149.9V160h16v34h-16v62h48v48h-2v-46h-48v-66h16v-30h-16v-12.1a5 5 0 1 1 2 0zM53.9 18a5 5 0 1 1 0-2H64V2H48V0h18v18H53.9zm112 32a5 5 0 1 1 0-2H192V0h50v2h-48v48h-28.1zm-48-48a5 5 0 0 1-9.8-2h2.07a3 3 0 1 0 5.66 0H178v34h-18V21.9a5 5 0 1 1 2 0V32h14V2h-58.1zm0 96a5 5 0 1 1 0-2H137l32-32h39V21.9a5 5 0 1 1 2 0V66h-40.17l-32 32H117.9zm28.1 90.1a5 5 0 1 1-2 0v-76.51L175.59 80H224V21.9a5 5 0 1 1 2 0V82h-49.59L146 112.41v75.69zm16 32a5 5 0 1 1-2 0v-99.51L184.59 96H300.1a5 5 0 0 1 3.9-3.9v2.07a3 3 0 0 0 0 5.66v2.07a5 5 0 0 1-3.9-3.9H185.41L162 121.41v98.69zm-144-64a5 5 0 1 1-2 0v-3.51l48-48V48h32V0h2v50H66v55.41l-48 48v2.69zM50 53.9v43.51l-48 48V208h26.1a5 5 0 1 1 0 2H0v-65.41l48-48V53.9a5 5 0 1 1 2 0zm-16 16V89.41l-34 34v-2.82l32-32V69.9a5 5 0 1 1 2 0zM12.1 32a5 5 0 1 1 0 2H9.41L0 43.41V40.6L8.59 32h3.51zm265.8 18a5 5 0 1 1 0-2h18.69l7.41-7.41v2.82L297.41 50H277.9zm-16 160a5 5 0 1 1 0-2H288v-71.41l16-16v2.82l-14 14V210h-28.1zm-208 32a5 5 0 1 1 0-2H64v-22.59L40.59 194H21.9a5 5 0 1 1 0-2H41.41L66 216.59V242H53.9zm150.2 14a5 5 0 1 1 0 2H96v-56.6L56.6 162H37.9a5 5 0 1 1 0-2h19.5L98 200.6V256h106.1zm-150.2 2a5 5 0 1 1 0-2H80v-46.59L48.59 178H21.9a5 5 0 1 1 0-2H49.41L82 208.59V258H53.9zM34 39.8v1.61L9.41 66H0v-2h8.59L32 40.59V0h2v39.8zM2 300.1a5 5 0 0 1 3.9 3.9H3.83A3 3 0 0 0 0 302.17V256h18v48h-2v-46H2v42.1zM34 241v63h-2v-62H0v-2h34v1zM17 18H0v-2h16V0h2v18h-1zm273-2h14v2h-16V0h2v16zm-32 273v15h-2v-14h-14v14h-2v-16h18v1zM0 92.1A5.02 5.02 0 0 1 6 97a5 5 0 0 1-6 4.9v-2.07a3 3 0 1 0 0-5.66V92.1zM80 272h2v32h-2v-32zm37.9 32h-2.07a3 3 0 0 0-5.66 0h-2.07a5 5 0 0 1 9.8 0zM5.9 0A5.02 5.02 0 0 1 0 5.9V3.83A3 3 0 0 0 3.83 0H5.9zm294.2 0h2.07A3 3 0 0 0 304 3.83V5.9a5 5 0 0 1-3.9-5.9zm3.9 300.1v2.07a3 3 0 0 0-1.83 1.83h-2.07a5 5 0 0 1 3.9-3.9zM97 100a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-48 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 96a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-144a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-96 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm96 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-32 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM49 36a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-32 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM33 68a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 240a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm80-176a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 48a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm112 176a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-16 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 180a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-32a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 84a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm32 64a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm16-16a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'%3E%3C/path%3E%3C/svg%3E\");position:relative}.header[_ngcontent-%COMP%]{background:#6405B3;color:#fff;display:grid;grid-template-columns:1fr auto;align-items:center;padding:10px}.header[_ngcontent-%COMP%]   .me[_ngcontent-%COMP%]{display:flex;align-items:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.header[_ngcontent-%COMP%]   .me[_ngcontent-%COMP%]   .back[_ngcontent-%COMP%]{cursor:pointer}.header[_ngcontent-%COMP%]   .me[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{border-radius:50px;object-fit:cover;height:40px;margin:0 10px 0 5px;width:40px}.header[_ngcontent-%COMP%]   .me[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{cursor:default;font-size:22px;overflow:hidden;text-overflow:ellipsis}.header[_ngcontent-%COMP%]   .icons[_ngcontent-%COMP%]{display:flex;align-items:center;justify-self:end}.header[_ngcontent-%COMP%]   .icons[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{cursor:pointer}.header[_ngcontent-%COMP%]   .icons[_ngcontent-%COMP%]   .camera[_ngcontent-%COMP%]{transform:scale(1.2);margin-right:20px}.header[_ngcontent-%COMP%]   .icons[_ngcontent-%COMP%]   .menu[_ngcontent-%COMP%]{transform:scale(1.2);margin-left:10px}#main[_ngcontent-%COMP%]{width:100%;overflow-y:auto;height:calc(var(--app-height) - 118px);padding-bottom:12px;position:relative}#main[_ngcontent-%COMP%]::-webkit-scrollbar{width:4px}#main[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background:#8d0cf8}.noMessages[_ngcontent-%COMP%]{background:#6405B3;border-radius:10px;color:#fff;padding:7px 10px;text-align:center;width:-moz-fit-content;width:fit-content;position:absolute;bottom:12px;left:50%;transform:translate(-50%)}.alertMessage[_ngcontent-%COMP%]{background:#6405B3;border-radius:10px;color:#fff;padding:7px 10px;text-align:center;width:-moz-fit-content;width:fit-content;position:absolute;bottom:80px;left:50%;transform:translate(-50%)}.message[_ngcontent-%COMP%]{display:flex;flex-direction:column}.message[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{position:relative;max-width:85%;margin-left:18px;margin-top:3px;padding:5px 5px 3px;width:-moz-fit-content;width:fit-content}.message[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:not(.final_message){visibility:hidden}.message[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:first-child{margin-top:20px!important}.message[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:not(.message__init){border-radius:10px}.message[_ngcontent-%COMP%] > div.message__init[_ngcontent-%COMP%]:before{content:\"\";position:absolute;top:0;width:10px;background:none;width:0;height:0;border-right:10px solid transparent;border-top:10px solid transparent}.message[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]   .no_float[_ngcontent-%COMP%] + .info[_ngcontent-%COMP%]{float:none;margin:-5px 0 0 auto}.message[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]{color:#446678;display:flex;align-items:center;font-size:12px;width:-moz-fit-content;width:fit-content;float:right;margin:.5px 0 0}.message[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]   .info.img[_ngcontent-%COMP%]{float:none;position:absolute;right:5px;bottom:7px;color:#e9edef;padding:3px 5px 1px 10px;border-radius:6px}.message__him[_ngcontent-%COMP%]{background:#fff;border-radius:0 10px 10px}.message__him.message__init[_ngcontent-%COMP%]{margin-top:12px!important}.message__him.message__init[_ngcontent-%COMP%]:before{border-left:10px solid #fff;border-bottom:10px solid #fff;border-radius:0 0 5px;left:-15px;transform:rotate(180deg)}.message__him[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]{margin-right:4px!important;margin-left:4px!important;margin-top:2px!important}.message__him[_ngcontent-%COMP%]   .options[_ngcontent-%COMP%]{position:absolute;padding-left:5px;top:0;right:0;border-radius:10px 0 5px 10px;background:rgba(255,255,255,.5019607843);color:gray}.message__him[_ngcontent-%COMP%]   .options[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{cursor:pointer;width:0;transition:.2s ease}.message__him[_ngcontent-%COMP%]   .options.options_image[_ngcontent-%COMP%]{border-radius:10px 0 5px 10px;background:rgba(255,255,255,.5019607843);color:#383737}.message__him[_ngcontent-%COMP%]:hover   .options[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{width:27px}.message__me[_ngcontent-%COMP%]{align-self:end;background-color:#fff5c1;border-radius:10px 0 10px 10px;margin-right:18px}.message__me.message__init[_ngcontent-%COMP%]{margin-top:12px!important}.message__me.message__init[_ngcontent-%COMP%]:before{border-left:10px solid #FFF5C1;border-bottom:10px solid #FFF5C1;border-radius:5px 0 0;right:-15px;transform:rotate(90deg)}.message__me[_ngcontent-%COMP%]   .options[_ngcontent-%COMP%]{position:absolute;padding-left:5px;top:0;right:0;border-radius:10px 0 5px 10px;background:radial-gradient(at top right,rgb(255,245,193) 60%,rgba(255,245,193,0) 80%);color:gray}.message__me[_ngcontent-%COMP%]   .options[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{cursor:pointer;width:0;transition:.2s ease}.message__me[_ngcontent-%COMP%]   .options.options_image[_ngcontent-%COMP%]{background:rgba(255,245,193,.6901960784);border-radius:10px 0 5px 40px;color:#505050}.message__me[_ngcontent-%COMP%]:hover   .options[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{width:27px}.message[_ngcontent-%COMP%]   .icon-done[_ngcontent-%COMP%]{transform:scale(.63);color:#a9a179}.message[_ngcontent-%COMP%]   .icon-done.read[_ngcontent-%COMP%]{color:#009ef7}.message[_ngcontent-%COMP%]   .icon-done[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{padding-right:0}.message[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{border-radius:5px;display:block;margin-bottom:4px;background:rgba(255,255,255,.8705882353);object-fit:cover;min-width:275px;min-height:275px;max-height:375px;max-width:100%;width:auto;height:auto}.message[_ngcontent-%COMP%]   .text-message[_ngcontent-%COMP%]{padding:1px 10px 0 5px;min-width:58px;display:inline-block;overflow-wrap:break-word;white-space:pre-wrap;max-width:100%;color:#000}.doc[_ngcontent-%COMP%]{color:#000;background:#e3daab;border-radius:1px;cursor:pointer}.doc[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%]{width:220px;display:flex;justify-content:space-between;align-items:center;padding:25px 30px}.doc[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%]   .file[_ngcontent-%COMP%]{color:#60aaf6;display:flex;align-items:center;margin-right:10px}.doc[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%]   .file[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{transform:scale(3)}.doc[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%]   .file[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#0a0a0a;padding-left:19px;font-size:20px;font-weight:400}.doc[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%]   .download[_ngcontent-%COMP%]{border:1px solid #588583;width:24px;transform:scale(1.3);height:24px;text-align:center;border-radius:50px;display:flex;justify-content:center;align-items:center;color:#588583}.doc[_ngcontent-%COMP%]   .data[_ngcontent-%COMP%]{display:flex;float:left;font-size:12px;color:#446678;padding:2.5px 0 0 3px}.doc[_ngcontent-%COMP%]   .data[_ngcontent-%COMP%]   .space[_ngcontent-%COMP%]{margin:0 5px!important}.audio_reproductor[_ngcontent-%COMP%]{margin:5px 3px 0;max-width:300px}.audio_reproductor[_ngcontent-%COMP%]   .data[_ngcontent-%COMP%]{float:left;padding-left:12px;color:#446678;font-size:13px;position:relative;top:-1px}.location[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:250px;min-width:unset;height:170px;min-height:unset}.image_modal[_ngcontent-%COMP%]{cursor:pointer}.image_modal.active[_ngcontent-%COMP%]{position:fixed;width:100vw;height:100vh;display:flex;align-items:center;justify-content:center;top:0;left:0;z-index:100}.image_modal.active[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-width:80%;max-height:80%;width:unset!important;height:unset!important;border-radius:0!important;z-index:1;min-width:unset;min-height:unset;object-fit:contain}.image_modal.active[_ngcontent-%COMP%]:after{content:\"\";position:fixed;width:100vw;height:100vh;top:0;left:0;background-color:#000000b3;z-index:0}@media (min-width: 600px){.doc[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%]{width:345px}}@media (min-width: 1024px){[_nghost-%COMP%]{position:static}#main[_ngcontent-%COMP%]{padding:10px 15px}}@media (min-width: 1200px){#main[_ngcontent-%COMP%]{padding:10px 30px}}"]}),n})()}];let pe=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[f.Bz.forChild(he),f.Bz]}),n})();var ue=l(4466),_e=l(3075),fe=l(495);let ve=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[M.ez,pe,O.q,ue.m,_e.UX,fe.Cl]}),n})()},4327:function(k,w){var O;void 0!==(O=function(){"use strict";function v(a,r,u){var e=new XMLHttpRequest;e.open("GET",a),e.responseType="blob",e.onload=function(){p(e.response,r,u)},e.onerror=function(){console.error("could not download file")},e.send()}function z(a){var r=new XMLHttpRequest;r.open("HEAD",a,!1);try{r.send()}catch(u){}return 200<=r.status&&299>=r.status}function m(a){try{a.dispatchEvent(new MouseEvent("click"))}catch(u){var r=document.createEvent("MouseEvents");r.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),a.dispatchEvent(r)}}var h="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof global&&global.global===global?global:void 0,I=h.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),p=h.saveAs||("object"!=typeof window||window!==h?function(){}:"download"in HTMLAnchorElement.prototype&&!I?function(a,r,u){var e=h.URL||h.webkitURL,d=document.createElement("a");d.download=r=r||a.name||"download",d.rel="noopener","string"==typeof a?(d.href=a,d.origin===location.origin?m(d):z(d.href)?v(a,r,u):m(d,d.target="_blank")):(d.href=e.createObjectURL(a),setTimeout(function(){e.revokeObjectURL(d.href)},4e4),setTimeout(function(){m(d)},0))}:"msSaveOrOpenBlob"in navigator?function(a,r,u){if(r=r||a.name||"download","string"!=typeof a)navigator.msSaveOrOpenBlob(function f(a,r){return void 0===r?r={autoBom:!1}:"object"!=typeof r&&(console.warn("Deprecated: Expected third argument to be a object"),r={autoBom:!r}),r.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type)?new Blob(["\ufeff",a],{type:a.type}):a}(a,u),r);else if(z(a))v(a,r,u);else{var e=document.createElement("a");e.href=a,e.target="_blank",setTimeout(function(){m(e)})}}:function(a,r,u,e){if((e=e||open("","_blank"))&&(e.document.title=e.document.body.innerText="downloading..."),"string"==typeof a)return v(a,r,u);var d="application/octet-stream"===a.type,H=/constructor/i.test(h.HTMLElement)||h.safari,T=/CriOS\/[\d]+/.test(navigator.userAgent);if((T||d&&H||I)&&"undefined"!=typeof FileReader){var b=new FileReader;b.onloadend=function(){var _=b.result;_=T?_:_.replace(/^data:[^;]*;/,"data:attachment/file;"),e?e.location.href=_:location=_,e=null},b.readAsDataURL(a)}else{var A=h.URL||h.webkitURL,P=A.createObjectURL(a);e?e.location=P:location.href=P,e=null,setTimeout(function(){A.revokeObjectURL(P)},4e4)}});h.saveAs=p.saveAs=p,k.exports=p}.apply(w,[]))&&(k.exports=O)}}]);