<template>
  <aside class="aside-menu px-4">
    <div class="aside-options">
      <div class="clearfix mt-4">
        <h5><b>Chatbots使用情况</b></h5>
      </div>

      <br><hr><br>
      <h6><b>状态</b></h6>
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

    <div class="text-uppercase mb-1 mt-2"><small><b>未登录</b></small></div>
      <Progress :percent="logout_percent" :stroke-width="7" status="normal" hide-info></Progress>
    <small class="text-muted">{{logout_bots}} / {{total_bots}}</small>
    
    <br><br>
    <h6><b>类型</b></h6>
    <br>

    <div class="text-uppercase mb-1 mt-2"><small><b>QQ</b></small></div>
      <Progress :percent="qq_percent" :stroke-width="7" status="success" hide-info></Progress>
    <small class="text-muted">{{qq_bots}} / {{total_bots}}</small>
    
    <div class="text-uppercase mb-1 mt-2"><small><b>未启动</b></small></div>
      <Progress :percent="wechat_percent" :stroke-width="7" status="active" hide-info></Progress>
    <small class="text-muted">{{wechat_bots}} / {{total_bots}}</small>

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
      logout_bots: 0,

      qq_bots: 0,
      wechat_bots: 0,

      running_percent: 0,
      waitting_percent: 0,
      fault_percent: 0,
      logout_percent: 0,

      qq_percent: 0,
      wechat_percent: 0,
    }
  },
  methods: {
    getBotdata(){
        let that = this;
        this.$http.get(this.global.QueryAdd + ':' + this.global.gateWay + '/robots') //使用axios发送请求
          .then(function(res){ //连接成功后回调函数
            console.log("Aside get '/robots' 成功");
            that.total_bots = res.data.length;
            for (let i = 0; i < that.total_bots; i++) {
              if(res.data[i].botStatus === 0) that.waitting_bots++;
              else if(res.data[i].botStatus === 1) that.running_bots++;
              else if(res.data[i].botStatus === 2) that.fault_bots++;
              else that.logout_bots++;

              if(res.data[i].entity.bot_type === 'qq') that.qq_bots++;
              else that.wechat_bots++;
            }
            that.running_percent = that.running_bots / that.total_bots * 100;
            that.waitting_percent = that.waitting_bots / that.total_bots * 100;
            that.fault_percent = that.fault_bots / that.total_bots * 100;
            that.logout_percent = that.logout_bots / that.total_bots * 100;

            that.qq_percent = that.qq_bots / that.total_bots * 100;
            that.wechat_percent = that.wechat_bots / that.total_bots * 100;
          })
          .catch(function(err){
            console.log("连接错误" + err);
          });
      }
  },
  mounted() {
    this.getBotdata();
  }
}
</script>