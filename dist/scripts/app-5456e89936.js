function WeatherController(e,t,n,i,r,a){function s(e,t,n){var i=(e-t)/(n-t)*100;return i+"%"}function o(){t.debug("WeatherController loaded."),i.getTodayWeather(a.screenConfig.household.address).then(function(e){l.weatherDescription=e.data.weather[0].main,l.weather=e.data.main,l.thermometerStyle={height:s(l.temperature,-10,35)}}),i.getWeatherForecast(a.screenConfig.household.address).then(function(e){l.weatherForecast=e.data.list[3]})}var l=this;l.thermometerStyle={height:"0%"},l.time=(new Date).getHours()>20||(new Date).getHours()<8?"night":"day",o()}function OpenWeatherService(e,t){var n=this,i="5e82f8d95dafe191dfa259b75be0520c";n.getTodayWeather=function(e){return t({method:"GET",url:"http://api.openweathermap.org/data/2.5/weather",params:{q:e,apikey:i,units:"metric"}})},n.getWeatherForecast=function(e){return t({method:"GET",url:"http://api.openweathermap.org/data/2.5/forecast",params:{q:e,apikey:i,units:"metric"}})}}function TransportController(e,t,n,i,r,a){function s(){t.debug("TransportController loaded!"),e.getNextBusses(r.screenConfig.busstop).then(function(e){e.data&&e.data.lijnen?p.nextBusses=e.data.lijnen:p.notice="No busses driving right now"},function(e){i.nextSlide()}),i.$on("$stateChangeStart",c.destroy)}var o,l,d,c,h,u,p=this;c=Sketch.create({container:document.getElementById("city-bg"),fullscreen:!1,width:800,height:400}),c.speed=120,c.viewHeight=c.height,h=[],d=1,u=["#e2e9f1","#bdceea","#96b3d3","#839fc4","#3e617f"],p.nextBusses=[],p.formatDepartureTime=function(e){return e?e.search("'")?e.replace("'",""):e:null},s(),o=function(e){return this.reset(e)},o.prototype.reset=function(e){return this.layer=e.layer,this.x=e.x,this.y=e.y,this.width=e.width,this.height=e.height,this.color=e.color,this.slantedTop=0===floor(random(0,10)),this.slantedTopHeight=this.width/random(2,4),this.slantedTopDirection=0===round(random(0,1)),this.spireTop=0===floor(random(0,15)),this.spireTopWidth=random(.01*this.width,.07*this.width),this.spireTopHeight=random(10,20),this.antennaTop=!this.spireTop&&0===floor(random(0,10)),this.antennaTopWidth=this.layer/2,this.antennaTopHeight=random(5,20)},o.prototype.render=function(){if(c.fillStyle=c.strokeStyle=this.color,c.lineWidth=2,c.beginPath(),c.rect(this.x,this.y,this.width,this.height),c.fill(),c.stroke(),this.slantedTop&&(c.beginPath(),c.moveTo(this.x,this.y),c.lineTo(this.x+this.width,this.y),this.slantedTopDirection?c.lineTo(this.x+this.width,this.y-this.slantedTopHeight):c.lineTo(this.x,this.y-this.slantedTopHeight),c.closePath(),c.fill(),c.stroke()),this.spireTop&&(c.beginPath(),c.moveTo(this.x+this.width/2,this.y-this.spireTopHeight),c.lineTo(this.x+this.width/2+this.spireTopWidth,this.y),c.lineTo(this.x+this.width/2-this.spireTopWidth,this.y),c.closePath(),c.fill(),c.stroke()),this.antennaTop)return c.beginPath(),c.moveTo(this.x+this.width/2,this.y-this.antennaTopHeight),c.lineTo(this.x+this.width/2,this.y),c.lineWidth=this.antennaTopWidth,c.stroke()},l=function(e){return this.x=0,this.buildings=[],this.layer=e.layer,this.width={min:e.width.min,max:e.width.max},this.height={min:e.height.min,max:e.height.max},this.speed=e.speed,this.color=e.color,this.populate(),this},l.prototype.populate=function(){var e,t,n,i;for(i=0,n=[];i<=c.width+2*this.width.max;)t=round(random(this.width.min,this.width.max)),e=round(random(this.height.min,this.height.max)),this.buildings.push(new o({layer:this.layer,x:0===this.buildings.length?0:this.buildings[this.buildings.length-1].x+this.buildings[this.buildings.length-1].width,y:c.height-e,width:t,height:e,color:this.color})),n.push(i+=t);return n},l.prototype.update=function(){var e,t,n,i;if(this.x-=c.speed*this.speed*d,e=this.buildings[0],e.width+e.x+this.x<0)return i=round(random(this.width.min,this.width.max)),n=round(random(this.height.min,this.height.max)),t=this.buildings[this.buildings.length-1],e.reset({layer:this.layer,x:t.x+t.width,y:c.height-n,width:i,height:n,color:this.color}),this.buildings.push(this.buildings.shift())},l.prototype.render=function(){var e;for(e=this.buildings.length,c.save(),c.translate(this.x,(c.height-c.viewHeight)/20*this.layer);e--;)this.buildings[e].render(e);return c.restore()},c.setup=function(){var e,t;for(e=5,t=[];e--;)t.push(h.push(new l({layer:e+1,width:{min:15*(e+1),max:25*(e+1)},height:{min:180-35*e,max:350-40*e},speed:.003*(e+1),color:u[e]})));return t},c.clear=function(){return c.clearRect(0,0,c.width,c.height)},c.update=function(){var e,t;for(d=c.dt<.1?.1:c.dt/16,d=d>5?5:d,e=h.length,t=[];e--;)t.push(h[e].update(e));return t},c.draw=function(){var e,t;for(e=h.length,t=[];e--;)t.push(h[e].render(e));return t}}function DelijnService(e){this.getNextBusses=function(t){return e({method:"GET",url:"https://www.delijn.be/rise-api-core/haltes/doorkomstenditmoment/"+t+"/13"})}}function SetupController(e,t,n,i,r){function a(){e.debug("SetupController loaded."),l=i(s,5e3)}function s(){n.getScreenConfig(function(e,t){t&&(i.cancel(l),o.screenName=t.name,d=i(function(){o.countdown<=0&&(i.cancel(d),r.go("app")),o.countdown--},1e3))})}var o=this;o.uiUrl=t.uiUrl,o.screenCode=n.screenCode,o.screenName=null,o.countdown=15;var l,d;a()}function ApiService(e,t,n,i){var r=this;const a={headers:{PlanniScreenCode:n.screenCode}};r.getAvailable=function(){return e.get(i.apiUrl+"available",a)},r.getMessages=function(){return e.get(i.apiUrl+"messages",a)},r.getCalendars=function(){return e.get(i.apiUrl+"calendar",a)},r.getScreenConfig=function(){return e.get(i.apiUrl+"screen",a)}}function MessagesController(e,t,n){function i(){e.debug("MessagesController loaded!"),t.getMessages().then(function(e){e.data.length||n.nextSlide(),r.messages=e.data},function(t){e.error("Getting messages failed:",t),n.nextSlide()})}var r=this;r.messages=[],i()}function CalendarController(e,t,n,i,r,a){function s(){e.debug("CalendarController loaded."),t.getCalendars().then(function(t){return t.data.length?(e.debug(t.data),o.calendars=t.data,void(o.calendar=o.calendars[0])):a.nextSlide()},function(t){e.error("Calendar error",t),a.nextSlide()})}var o=this;o.calendarCount=0;s()}function routesConfig(e,t,n){t.otherwise("/"),e.state("setup",{url:"/setup",templateUrl:"app/setup/setup.html",controller:"SetupController as setup"}).state("app",{url:"/",template:"<ui-view/>",controller:"MainController as main"}).state("app.weather",{url:"weather",templateUrl:"app/weather/weather.html",controller:"WeatherController as weather"}).state("app.transport",{url:"transport",templateUrl:"app/transport/transport.html",controller:"TransportController as transport"}).state("app.messages",{url:"messages",templateUrl:"app/messages/messages.html",controller:"MessagesController as messages"}).state("app.calendar",{url:"calendar",templateUrl:"app/calendar/calendar.html",controller:"CalendarController as calendar"})}function MainController(e,t,n,i,r){function a(){n.debug("MainController loaded!"),r.getAvailable().then(function(e){i.createSlides(e),i.nextSlide()})}i.currentSlideId=-1,i.slides=[],i.createSlides=function(e){i.slides=[],e.data.length&&e.data.forEach(function(e){i.slides.push({name:e,duration:6e3})})},i.nextSlide=function(){if(r.getAvailable().then(i.createSlides),i.slides.length){if(i.currentSlideId++,n.debug(i.currentSlideId,i.slides),i.currentSlideId>=i.slides.length)return i.currentSlideId=0,n.debug("reached the end; full refresh"),window.location.href="/index.html";t.go("app."+i.slides[i.currentSlideId].name),e.cancel(i.slideTimeout),i.slideTimeout=e(i.nextSlide,i.slides[i.currentSlideId].duration)}else e.cancel(i.slideTimeout),i.slideTimeout=e(i.nextSlide,1e3)},a()}WeatherController.$inject=["$document","$log","$timeout","OpenWeatherService","$interval","ScreenConfigService"],OpenWeatherService.$inject=["$log","$http"],SetupController.$inject=["$log","AppConfig","ScreenConfigService","$interval","$state"],CalendarController.$inject=["$log","ApiService","$interval","$state","$scope","$rootScope"],routesConfig.$inject=["$stateProvider","$urlRouterProvider","$locationProvider"],MainController.$inject=["$timeout","$state","$log","$rootScope","ApiService"],TransportController.$inject=["DelijnService","$log","$window","$rootScope","ScreenConfigService","$scope"],DelijnService.$inject=["$http"],ApiService.$inject=["$http","$log","ScreenConfigService","AppConfig"],MessagesController.$inject=["$log","ApiService","$rootScope"],angular.module("app",["ui.router"]).run(["ScreenConfigService","ApiService","$rootScope","$state","$transitions",function(e,t,n,i,r){r.onStart({to:"setup"},function(t){e.getScreenConfig(function(e,t){return!t})}),r.onStart({},function(e){var t=e.to();e.addResolvable({token:"screenConfig",deps:["$state","ScreenConfigService","$q"],resolveFn:function(e,n,i){return new i(function(i,r){n.getScreenConfig(function(n,a){n&&!t.name.includes("setup")?(e.go("setup"),r()):i(),a&&t.name.includes("setup")?(e.go("app"),r()):i()})})}})})}]),angular.module("app").controller("WeatherController",WeatherController),angular.module("app").service("OpenWeatherService",OpenWeatherService),angular.module("app").controller("TransportController",TransportController),angular.module("app").service("DelijnService",DelijnService),angular.module("app").controller("SetupController",SetupController),angular.module("app").service("ApiService",ApiService),angular.module("app").controller("MessagesController",MessagesController),angular.module("app").controller("CalendarController",CalendarController),/* Copyright (C) 2013 Justin Windle, http://soulwire.co.uk */
!function(e,t){"object"==typeof exports?module.exports=t(e,e.document):"function"==typeof define&&define.amd?define(function(){return t(e,e.document)}):e.Sketch=t(e,e.document)}("undefined"!=typeof window?window:this,function(e,t){"use strict";function n(e){return"[object Array]"==Object.prototype.toString.call(e)}function i(e){return"function"==typeof e}function r(e){return"number"==typeof e}function a(e){return"string"==typeof e}function s(e){return x[e]||String.fromCharCode(e)}function o(e,t,n){for(var i in t)!n&&i in e||(e[i]=t[i]);return e}function l(e,t){return function(){e.apply(t,arguments)}}function d(e){var t={};for(var n in e)"webkitMovementX"!==n&&"webkitMovementY"!==n&&(i(e[n])?t[n]=l(e[n],e):t[n]=e[n]);return t}function c(e){function t(t){i(t)&&t.apply(e,[].splice.call(arguments,1))}function n(e){for(I=0;I<ee.length;I++)U=ee[I],a(U)?P[(e?"add":"remove")+"EventListener"].call(P,U,W,!1):i(U)?W=U:P=U}function r(){N(A),A=M(r),Q||(t(e.setup),Q=i(e.setup)),Y||(t(e.resize),Y=i(e.resize)),e.running&&!z&&(e.dt=(H=+new Date)-e.now,e.millis+=e.dt,e.now=H,t(e.update),J&&(e.retina&&(e.save(),e.autoclear&&e.scale(V,V)),e.autoclear&&e.clear()),t(e.draw),J&&e.retina&&e.restore()),z=++z%e.interval}function l(){P=K?e.style:e.canvas,D=K?"px":"",L=e.width,q=e.height,e.fullscreen&&(q=e.height=y.innerHeight,L=e.width=y.innerWidth),e.retina&&J&&V&&(P.style.height=q+"px",P.style.width=L+"px",L*=V,q*=V),P.height!==q&&(P.height=q+D),P.width!==L&&(P.width=L+D),J&&!e.autoclear&&e.retina&&e.scale(V,V),Q&&t(e.resize)}function c(e,t){return E=t.getBoundingClientRect(),e.x=e.pageX-E.left-(y.scrollX||y.pageXOffset),e.y=e.pageY-E.top-(y.scrollY||y.pageYOffset),e}function h(t,n){return c(t,e.element),n=n||{},n.ox=n.x||t.x,n.oy=n.y||t.y,n.x=t.x,n.y=t.y,n.dx=n.x-n.ox,n.dy=n.y-n.oy,n}function u(e){if(e.preventDefault(),B=d(e),B.originalEvent=e,B.touches)for(X.length=B.touches.length,I=0;I<B.touches.length;I++)X[I]=h(B.touches[I],X[I]);else X.length=0,X[0]=h(B,Z);return o(Z,X[0],!0),B}function p(n){for(n=u(n),G=(F=ee.indexOf(O=n.type))-1,e.dragging=!!/down|start/.test(O)||!/up|end/.test(O)&&e.dragging;G;)a(ee[G])?t(e[ee[G--]],n):a(ee[F])?t(e[ee[F++]],n):G=0}function g(n){R=n.keyCode,_="keyup"==n.type,te[R]=te[s(R)]=!_,t(e[n.type],n)}function m(n){e.autopause&&("blur"==n.type?b:v)(),t(e[n.type],n)}function v(){e.now=+new Date,e.running=!0}function b(){e.running=!1}function T(){(e.running?b:v)()}function $(){J&&e.clearRect(0,0,e.width*V,e.height*V)}function k(){j=e.element.parentNode,I=S.indexOf(e),j&&j.removeChild(e.element),~I&&S.splice(I,1),n(!1),b()}var A,W,P,j,E,I,D,H,U,B,O,R,_,G,F,L,q,z=0,X=[],Y=!1,Q=!1,V=y.devicePixelRatio||1,K=e.type==w,J=e.type==f,Z={x:0,y:0,ox:0,oy:0,dx:0,dy:0},ee=[e.eventTarget||e.element,p,"mousedown","touchstart",p,"mousemove","touchmove",p,"mouseup","touchend",p,"click",p,"mouseout",p,"mouseover",C,g,"keydown","keyup",y,m,"focus","blur",l,"resize"],te={};for(R in x)te[x[R]]=!1;return o(e,{touches:X,mouse:Z,keys:te,dragging:!1,running:!1,millis:0,now:NaN,dt:NaN,destroy:k,toggle:T,clear:$,start:v,stop:b}),S.push(e),e.autostart&&v(),n(!0),l(),r(),e}for(var h,u,p="E LN10 LN2 LOG2E LOG10E PI SQRT1_2 SQRT2 abs acos asin atan ceil cos exp floor log round sin sqrt tan atan2 pow max min".split(" "),g="__hasSketch",m=Math,f="canvas",v="webgl",w="dom",C=t,y=e,S=[],b={fullscreen:!0,autostart:!0,autoclear:!0,autopause:!0,container:C.body,interval:1,globals:!0,retina:!1,type:f},x={8:"BACKSPACE",9:"TAB",13:"ENTER",16:"SHIFT",27:"ESCAPE",32:"SPACE",37:"LEFT",38:"UP",39:"RIGHT",40:"DOWN"},T={CANVAS:f,WEB_GL:v,WEBGL:v,DOM:w,instances:S,install:function(e){if(!e[g]){for(var t=0;t<p.length;t++)e[p[t]]=m[p[t]];o(e,{TWO_PI:2*m.PI,HALF_PI:m.PI/2,QUARTER_PI:m.PI/4,random:function(e,t){return n(e)?e[~~(m.random()*e.length)]:(r(t)||(t=e||1,e=0),e+m.random()*(t-e))},lerp:function(e,t,n){return e+n*(t-e)},map:function(e,t,n,i,r){return(e-t)/(n-t)*(r-i)+i}}),e[g]=!0}},create:function(e){return e=o(e||{},b),e.globals&&T.install(self),h=e.element=e.element||C.createElement(e.type===w?"div":"canvas"),u=e.context=e.context||function(){switch(e.type){case f:return h.getContext("2d",e);case v:return h.getContext("webgl",e)||h.getContext("experimental-webgl",e);case w:return h.canvas=h}}(),(e.container||C.body).appendChild(h),T.augment(u,e)},augment:function(e,t){return t=o(t||{},b),t.element=e.canvas||e,t.element.className+=" sketch",o(e,t,!0),c(e)}},$=["ms","moz","webkit","o"],k=self,A=0,W="AnimationFrame",P="request"+W,j="cancel"+W,M=k[P],N=k[j],E=0;E<$.length&&!M;E++)M=k[$[E]+"Request"+W],N=k[$[E]+"Cancel"+W];return k[P]=M=M||function(e){var t=+new Date,n=m.max(0,16-(t-A)),i=setTimeout(function(){e(t+n)},n);return A=t+n,i},k[j]=N=N||function(e){clearTimeout(e)},T}),angular.module("app").service("ScreenConfigService",["$http","AppConfig",function(e,t){var n=this;n.screenCode="123ABC",n.screenConfig=null;const i={headers:{PlanniScreenCode:n.screenCode}};n.getScreenConfig=function(r){return n.screenConfig?r(null,n.screenConfig):void e.get(t.apiUrl+"screen",i).then(function(e){n.screenConfig=e.data,console.log(n.screenConfig),r(null,n.screenConfig)},function(e){r(e)})}}]),angular.module("app").config(routesConfig),angular.module("app").controller("MainController",MainController),angular.module("app").constant("AppConfig",{apiUrl:"http://planni-housekeeping-alexvanderbist.c9users.io/api/",uiUrl:"http://bit.do/planni/"}),angular.module("app").run(["$templateCache",function(e){e.put("app/calendar/calendar.html",'<div class="slide slide-calendar">\n  <h1>{{calendar.calendar.name}}</h1>\n\n  <div class="content">\n    <ul>\n      <li ng-repeat="event in calendar.calendar.events">\n        <small>{{event.dtstart_array[1]  | date:\'d MMMM, HH:mm\'}}</small><br>\n        {{event.summary}} <small>({{event.location}})</small>\n      </li>\n    </ul>\n  </div>\n</div>\n'),e.put("app/layout/layout.html","<ui-view></ui-view>"),e.put("app/messages/messages.html",'<div class="slide slide-messages" ng-show="messages.messages.length">\n  <div class="messages">\n    <aside class="note-wrap note-{{message.color}}" ng-class="{ \'note-big\': message.message.length > 120 }" ng-repeat="message in messages.messages">\n      <p>{{message.message}}</p>\n      <span>{{message.signature}}</span>\n    </aside>\n    <!--note-big-->\n  </div>\n</div>\n'),e.put("app/setup/setup.html",'<div class="slide slide-setup">\n  <div ng-hide="setup.screenName">\n    <h1>Hello, I\'m a Planni Screen!</h1>\n    <p class="lead">\n      Go to <strong>{{setup.uiUrl}}</strong> to configure me<br>\n      and use the following code:<br>\n      <span class="code">{{setup.screenCode}}</span>\n    </p>\n  </div>\n\n  <div ng-show="setup.screenName">\n    <h1>{{setup.screenName}}</h1>\n    <p class="lead">We\'re done here! Have fun using your Planni!</p>\n    <p class="lead">Get ready... {{setup.countdown}}</p>\n  </div>\n\n  <img src="images/planni_char_white.svg" class="planni-char" alt="Planni">\n</div>\n'),e.put("app/weather/weather.html",'<div class="slide slide-weather" ng-class="weather.time">\n\n  <div class="content">\n    <h1>{{weather.weather.temp | number:1 }}°C, {{weather.weatherDescription}}</h1>\n    <h2>Tomorrow {{weather.weatherForecast.main.temp | number:1 }}°C, {{weather.weatherForecast.weather[0].description}}</h2>\n  </div>\n\n  <div class="content-bottom">\n    <h2>MIN {{weather.weather.temp_min}}°C | MAX {{weather.weather.temp_max}}°C | {{weather.weather.pressure}} PSI</h2>\n  </div>\n\n  <div id="thermometer" ng-click="weather.time = (weather.time === \'day\' ? \'night\' : \'day\')">\n    <span class="glass floating">\n      <span class="amount" ng-style="weather.thermometerStyle" style="height: 0%"></span>\n    </span>\n    <div class="bulb floating">\n      <span class="red-circle"></span>\n      <span class="filler">\n          <span></span>\n      </span>\n    </div>\n    <div class="shade"></div>\n  </div>\n\n  <div class="landscape">\n    <div class="moon"></div>\n    <div class="sun"></div>\n    <div class="hills">\n      <div></div>\n      <div></div>\n      <div></div>\n      <div></div>\n      <div></div>\n    </div>\n    <div class="trees">\n      <div><span></span></div>\n      <div><span></span></div>\n      <div><span></span></div>\n      <div><span></span></div>\n      <div><span></span></div>\n      <div><span></span></div>\n      <div><span></span></div>\n      <div><span></span></div>\n      <div><span></span></div>\n      <div><span></span></div>\n      <div><span></span></div>\n      <div><span></span></div>\n      <div><span></span></div>\n      <div><span></span></div>\n      <div><span></span></div>\n      <div><span></span></div>\n      <div><span></span></div>\n      <div><span></span></div>\n    </div>\n  </div>\n\n  <canvas id="snow"></canvas>\n<!--\n  <div class="family">\n\n  </div>-->\n</div>\n'),e.put("app/transport/transport.html",'<div class="slide slide-transport">\n\n  <div class="content" ng-show="transport.nextBusses[0]">\n    <h2>Volgende bus in</h2>\n    <h1>{{transport.formatDepartureTime(transport.nextBusses[0].vertrekTijd)}} minuten</h1>\n  </div>\n\n  <div class="content" ng-show="transport.notice">\n    <h2>{{transport.notice}}</h2>\n  </div>\n\n  <div class="schedule-ticker">\n    <h2 class="text-center" ng-hide="transport.nextBusses.length">Laden...</h2>\n    <table class="table table-condensed">\n      <tr ng-repeat="bus in transport.nextBusses">\n        <td class="lijnNummer">{{bus.lijnNummer}}</td>\n        <td>{{bus.bestemming}}</td>\n        <td class="vertrekTijd">{{bus.vertrekTijd}}</td>\n      </tr>\n    </table>\n  </div>\n\n  <img src="images/slides/transport/bus.png" alt="Bus" class="bus">\n  <div id="city-bg"></div>\n\n</div>\n')}]);
//# sourceMappingURL=../maps/scripts/app-5456e89936.js.map
