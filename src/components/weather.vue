<template>
 <div class="all">
 
  <div class="top">
    <div class="top-left"><span class="fa fa-chevron-left" @click='goBack()'></span></div>
      <div class="top-middle">  
         <input type="text" class="input-search" placeholder="Search for..." v-model="content">
         <span class="fa fa-search fa-lg search-icon" @click="getCity()"></span>
      </div>
    
    <div class="top-right"><i class="fa fa-bars" aria-hidden="true"></i></div>
      <!-- <button class="btn" @click="getCity()">获取位置</button>
    <button class="btn" @click="getLocation()">当前定位</button>  -->
    </div>  
    <div class="content">
        <div class="content-top">
          <div class="content-top-l">
              <i class="fa fa-location-arrow" aria-hidden="true" @click="showCity()"></i><span style="display:inline-block;padding:5px">{{this.city}}</span>
          </div>
          <div class="content-top-m"></div>
          <div class="content-top-r">{{this.nowTime}}</div>
        </div>

        <div class="content-middle">  
            <div class="content-middle-l">{{this.now}}</div>
            <div class="content-middle-m">{{this.day}}</div>
            <div class="content-middle-r">甲乙丙丁</div>
        </div>


        <div class="content-foot">
            <div class="content-foot-l">
              <img :src="'https://darksky.net/images/weather-icons/'+this.icon+'.png'" alt="">
            </div>
             <div class="content-foot-r">
               <div class="content-foot-r-t"><span>{{this.temperatureHigh}}</span><b>°c</b></div>
               <div class="content-foot-r-b">{{this.summary}}</div>
             </div>
        </div>

        <div class="footer">
            <div class="footer-l"><span class="footer-span">湿度：{{this.humidity}}</span></div>
            <div class="footer-m"><span class="footer-span">风速：{{this.windSpeed}}</span></div>
            <div class="footer-r"><span class="footer-span">一般</span></div>
        </div>
     
     </div>
     <div class="word">
          <span>{{this.city}}未来7天的天气状况</span>
     </div>
    <div class="seven">
            <router-link to='/weatherDay' tag='dl' v-for="(v,i) in list" :key="i" class="seven-dl">
              <dt>{{v.time |timer}}</dt>
              <dd class="img"><img :src="'https://darksky.net/images/weather-icons/'+v.icon+'.png'" alt=""></dd>
              <dd class="temperatureHigh">{{v.temperatureHigh}}°C</dd>
              <!-- <dd>{{v.precipType}}</dd> -->
            </router-link >
    </div>
     <div class="map-contain">
        <iframe :src="'https://maps.darksky.net/@temperature,'+this.latitude+','+this.longtitude+',7'" frameborder="0" class="fram"></iframe>
    </div>
    <div>
    </div>
        <!-- <ul>
          <li v-for="(v,i) in list" :key="i">
          时间:{{v.time |timer}}
          {{v.summary}}
          温度：最高{{v.temperatureHigh}}最低{{v.temperatureLow}}
          湿度:{{v.humidity}}
          风力:{{v.windSpeed}}

          </li>
        </ul> -->
        
       
 </div>
</template>


<script>
var x,y;
export default {
  data(){
      return{
        content:'',
        longtitude:"",//106.5306
        latitude:"",//29.5446
        movie:'',
        list:[],
        arr:[],
        now:'',
        day:'',
        weekday:["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],
        nowTime:'',
        temperatureHigh:'',
        humidity:'',
        windSpeed:'',
        summary:'',
        icon:'',
        // backUrl:['b8.78c1472.png','b0.8b2cad5.png','b1.551af51.png'],
        backUrl:['http://i.tq121.com.cn/i/wap2017/bgs/d07.jpg','http://i.tq121.com.cn/i/wap2017/bgs/d00.jpg','http://i.tq121.com.cn/i/wap2017/bgs/d02.jpg'],

        city:''
        // b8.78c1472.png
      }
  },
    methods:{
      showCity(){
        alert('当前城市为:'+this.city)
      },
    search(){
      console.log('search')
      // this.getCity()
      console.log( this.longtitude+","+ this.latitude);
      // alert(this.content)
      let _this=this
      var url="https://api.darksky.net/forecast/537cc276571ca8e3acdd444b808de49b"
       +"/" + this.latitude + "," + this.longtitude + "?lang=zh&units=ca";
      $.ajax({ 
         type : "get",  
           async:false,   
            url : url, 
            dataType : "jsonp",//jsonp数据类型    
            success : function(data){       
                 console.log(data.daily.icon);  
                // console.log(data.daily.data[0]);
                _this.list = data.daily.data;
                _this.arr=data.daily;
                _this.humidity=(data.daily.data[0].humidity)*100+'%';
                _this.windSpeed=data.daily.data[0].windSpeed;
                _this.summary=data.daily.data[0].summary;
                _this.icon=data.daily.data[0].icon;
                _this.city=_this.content;
                _this.temperatureHigh=data.daily.data[0].temperatureHigh;
                  if(_this.icon=='rain'){
                // alert(1)
                  $('.content').css('background',"url("+_this.backUrl[0]+") no-repeat");
                  return;
                }
                if(_this.icon=='clear-day'){
                  //  alert(2)
                  $('.content').css('background',"url("+_this.backUrl[1]+") no-repeat");
                   return;
                }else{
                  //  alert(3)
                  $('.content').css('background',"url("+_this.backUrl[2]+") no-repeat");

                }
                // console.log(_this.list);
            },    
             error:function(){      
               console.log('error');    
              }
             }); 
            
    },
  
    getLocation(result){
        
        var myCity = new BMap.LocalCity();
        myCity.get(this.showPosition);
    },
    showPosition(result){
      var cityName = result.name; 
      console.log("当前定位城市:"+cityName); 
      let _this=this;
      _this.city=cityName; 
      console.log(_this.city)
    },
    getCity(){
      //通过百度获取经纬度 
     console.log(this.content)
     
      var url = "http://api.map.baidu.com/geocoder/v2/?address=" + this.content + "&output=json&ak=FG7wxr1VUj0k2NwoO3yXzymd&callback=?";
//    var url = "http://api.map.baidu.com/geocoder/v2/?address=重庆&output=json&ak=FG7wxr1VUj0k2NwoO3yXzymd&callback=?";
      let _this=this;
      var z,h;
      $.getJSON(url, function (data) {
            z = data.result.location.lng;
            h = data.result.location.lat;
            _this.longtitude=parseFloat(z).toFixed(4);
            _this.latitude=parseFloat(h).toFixed(4);
           console.log('x:'+_this.latitude+'y:'+_this.longtitude)
     });  
    },
    nowDate(){
      var tt = new Date();
      this.now = tt.getFullYear()+'/'+(tt.getMonth()+1)+'/'+tt.getDate();
      this.day=this.weekday[tt.getDay()];
      this.nowTime =tt.getHours()+':'+tt.getMinutes();
      console.log(this.weekday[tt.getDay()])
    },
   
  },
  filters:{
    timer(nS){
    //  var timee = new Date(nS);
    //  var month = timee.getMonth()+1;

      // return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' '); 
      return (new Date(parseInt(nS) * 1000).getMonth()+1)+
      '/'+new Date(parseInt(nS) * 1000).getDate()
    },
  
    
  },
  computed:{
   
  },
  watch : {
       longtitude:function(val) {
          //  alert(1)
           this.search();
        },
        city:function(val){
           this.content=this.city
           this.getCity()
        }
       
    },
  created(){
    this.getLocation()
    // this.getCity()
    // this.search()
    this.nowDate()

    // this.searchWeather()
    
  },
  mounted(){
  
      let _this=this;
       var min;
       setInterval(function(){
         var tt1 = new Date();
          if(tt1.getMinutes()<10){
             min= '0'+tt1.getMinutes();
          }else{
            min=tt1.getMinutes();
          }
         _this.nowTime =tt1.getHours()+':'+min;
        
          // console.log(_this.nowTime)
      },1000);
    }
  }

</script>

<style>
ul,li{
  list-style: none;
}
.top{
    display: flex;
    margin: 0 auto;
    width: 100%;
    height: 3.8rem;
    line-height: 3.8rem;
    background-color: #fff; 
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    background: #ccc;
}
.top-left{
  display: flex;
}
.fa-chevron-left{
  font-size: 30px;
  font-weight: 100;
  color: #495057;
}
.top-middle{
  display: flex;
  position: relative;
}
.input-search{
    display: block;
    width: 100%;
    height: calc(2.25rem + 2px);
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 55px;
    -webkit-transition: border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
    transition: border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
    
}
.search-icon{
  position: absolute;
  right: 11px;
  top: 11px;
  color: #ccc;
  display: block;
  font-weight: 200;
}
.top-right{
  display: flex;
}
.fa-bars{
  font-size: 30px;
}
.fa-location-arrow{
  font-size: 30px;
}
.content{
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 300px;
  background: url() no-repeat;
}
.content-top{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      
  }
  .content-top-l{
    display: flex;
     padding-left: 20px;
      color: #fff;
  }
  .content-top-m{
    display: flex;
    
  }
  .content-top-r{
    display: flex;
    padding-right: 20px;
    color: #fff;
  }
.content-middle{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
   color: #fff;
}
.content-foot{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 30px;
}
.content-foot-l{
  padding-left: 10px;
  display: flex;
}
.content-foot-l img{
  width: 100px;
  height: 100px;
}
.content-foot-r{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.content-foot-r-t{
  display: flex;
}
.content-foot-r-t span{
  font-size: 50px;
  font-weight: 800;
  display: flex;
  color: #fff;

}
.content-foot-r-t b{
  font-size: 20px;
}
.content-foot-r-b{
  display: flex;
   color: #fff;
}
.footer{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  position: absolute;
  bottom: 5px;
  width: 100%;
}
.footer-l{
  display: flex;
  border-right: 1px solid #fff;
  flex: 1;
 
}
.footer-m{
  display: flex;
   flex: 1;
   
}
.footer-r{
  display: flex;
  border-left: 1px solid #fff;
   flex: 1;
   
}
.footer-span{
  width: 100%;
  display: inline-block;
  text-align: center;
  color: #fff;
  font-size: 16px
}
.seven{
    width: 100%;
    white-space: nowrap;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    justify-content: space-around;
}
.seven-dl{
  /* width: 12%; */
  border-right: 1px solid #e6e6e6;
}
.img{

}
.img img{
    width: 70%;
  height: 70%;
  }
  .temperatureHigh{
    font-size: 12px;
  }

.rain{
  width: 50px;
  height: 50px;
}
.map-contain{
    position: relative;
    z-index: 9;
    margin: 0 auto;
    width: 100%;
    min-height: 350px;
    max-height: 800px;
    overflow: hidden;
    height: 350px;
}
.fram{
    width: 100%;
    height: 100%;
    overflow: auto;
}

</style>