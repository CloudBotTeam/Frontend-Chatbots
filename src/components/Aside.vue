<template>
  <aside class="aside-menu px-4">
    <div class="aside-options">
      <div class="clearfix mt-4">
        <h5><b>Chatbots使用情况</b></h5>
      </div>
      <br><hr><br>
      <h6><b>数量</b></h6>
      <br>
    </div>
   
    <div class="text-uppercase mb-1 mt-2"><small><b>运行中</b></small></div>
      <Progress :percent="running_percent" :stroke-width="7" status="success" hide-info></Progress>
    <small class="text-muted">{{running_bots}} / {{total_bots}}</small>
    
    <div class="text-uppercase mb-1 mt-2"><small><b>未启动</b></small></div>
      <Progress :percent="waitting_percent" :stroke-width="7" status="active" hide-info></Progress>
    <small class="text-muted">{{waitting_bots}} / {{total_bots}}</small>

    <div class="text-uppercase mb-1 mt-2"><small><b>故障</b></small></div>
      <Progress :percent="fault_percent" :stroke-width="7" status="wrong" hide-info></Progress>
    <small class="text-muted">{{fault_bots}} / {{total_bots}}</small>

  </aside>
</template>

<script>
export default {
  name: 'aside',
  data() {
    return{
      total_bots: 0,
      running_bots: 0,
      waitting_bots: 0,
      fault_bots: 0,
      running_percent: 0,
      waitting_percent: 0,
      fault_percent: 0,
    }
  },
  methods: {
    getBotdata(){
        let that = this;
        this.$http.get('/robots') //使用axios发送请求
          .then(function(res){ //连接成功后回调函数
            console.log("Aside get '/robots' 成功");
            that.total_bots = res.data.data.length;
            for (let i = 0; i < that.total_bots; i++) {
              if(res.data.data[i].status === 0) that.waitting_bots++;
              else if(res.data.data[i].status === 1) that.running_bots++;
              else that.fault_bots++;
            }
            that.running_percent = that.running_bots / that.total_bots * 100;
            that.waitting_percent = that.waitting_bots / that.total_bots * 100;
            that.fault_percent = that.fault_bots / that.total_bots * 100;
          })
          .catch(function(err){
            console.log("连接错误"+err);
          });
      }
  },
  mounted() {
    this.getBotdata();
  }
}
</script>