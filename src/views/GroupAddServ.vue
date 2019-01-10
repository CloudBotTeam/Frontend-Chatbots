<template>
  <div class="animated fadeIn">

    <Row>
        <div style="" class="doc-header">
            <h1>添加群</h1>
        </div>
        <br>

        <Card>
            <Col span="8"><h6>群ID: {{group_id}}</h6></Col>  
            <Col span="8"><h6>机器人ID: {{bot_id}}</h6></Col>  
            <Col span="8"><h6>机器人类型: {{bot_type}}</h6></Col>  
            <br>
        </Card>
        <br><hr><br>
        
        <Col :md="24">
            <!--
            <h5>选择Service组</h5>
            <br>
            <div style="position:relative;">
                <Table border ref="selection" :columns="columns7" :height="200" 
                    :data="servlist_list" @on-selection-change="selectServList"></Table>    
            </div>
            -->
            <h5>选择Service</h5>
            <br>
            <div style="position:relative;">
                <Table border ref="selection" :columns="columns6" :height="250" 
                    :data="serv_list" @on-selection-change="selectServ"></Table>    
            </div>

            <br>
            <Button type="primary" @click="Add">添加</Button>
            <Button style="margin-left: 8px" @click="Cancel">取消</Button>
        </Col>

    </Row>
  </div>
</template>

<script>

export default {
    name: "buttons",
    data() {
        return {
            bot_id: this.$route.query.bot_id,
            bot_type: this.$route.query.bot_type,
            group_id: this.$route.query.group_id,
            group_type:'',
            group_name:'',
            managed_servs: [],

            serv_list: [],
            servlist_list: [],

            add_servs: [],
            select_servs: [],
            select_servlists: [],
            columns6: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center',
                },
                {
                    title: "Service名称",
                    key: "serv_name",
                    ellipsis: "true"
                },
                {
                    title: "Service ID",
                    ellipsis: "true",
                    key: "serv_id"
                },
                /*
                {
                    title: "分类",
                    key: "serv_type",
                    ellipsis: "true",
                },
                */
                {
                    title: "查看",
                    key: "action",
                    align: "center",
                    ellipsis: "true",

                    render: (h, params) => {
                        const task_status = parseInt(params.row.task_status);
                        
                        return h("div", [
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "primary",
                                        size: "small"
                                    },
                                    style: {
                                        marginRight: "5px"
                                    },
                                    on: {
                                        click: () => {
                                            this.$router.push({
                                                path:
                                                "servdetail/" + 
                                                this.serv_list[params.index].serv_id
                                            });
                                        }
                                    }
                                },
                                "查看"
                            )
                        ]);
                
                    } //render
                } //{
            ],
/*
            columns7: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center',
                },
                {
                    title: "Service组名称",
                    key: "type",
                    ellipsis: "true"
                },
                {
                    title: "Service组ID",
                    ellipsis: "true",
                    key: "id"
                },
            ],
            */
        }; //return
    }, //data
  
    methods: {
        //获取所有可选service
        getServData(){
            this.$http.get(this.global.QueryAdd + ':' + this.global.gateWay + '/services') //使用axios发送请求
            .then((res)=>{ //连接成功后回调函数
                console.log("GroupAddServ get '/services' 成功");

                /*
                for(let i = 0; i < res.data.data.length; i++){
                    //service组
                    this.servlist_list.push(res.data.data[i])
                    //service
                    if(res.data.data[i].serv_default === 1){
                        for(let j = 0; j < res.data.data[i].serv_list.length; j++)
                            this.serv_list.push(res.data.data[i].serv_list[j]);
                    }
                }  
                */

                this.serv_list = res.data.serv_list;

                //禁止选择已在该group下的serv
                for(let i = 0; i < this.serv_list.length; i++){
                    for(let j = 0; j < this.managed_servs.length; j++){
                        if(this.serv_list[i].serv_id === this.managed_servs[j].serv_id)
                            this.serv_list[i]._disabled = true;
                    }
                }
               
            })
            .catch(function(err){
                console.log("GroupAddServ get '/services' 请求错误：" + err);
            });
        },
        getGroupInfo(){
            this.$http.get(this.global.QueryAdd + ':' + this.global.gateWay + '/robots/' + this.bot_id + '/groups/' + this.group_id) //使用axios发送请求
            .then((res)=>{ //连接成功后回调函数
                console.log("GroupAddServ get '/groups' 成功");
                //managed_groups
                this.managed_servs = res.data.managed_servs;
            })
            .catch(function(err){
                console.log("GroupAddServ get '/groups' 错误:" + err)
            });
        },
        //已选中的要添加的service列表
        selectServ(select_servs) {
            //this.select_servs = select_servs;
            this.add_servs = select_servs;
        },
        //已选中的要添加的service组列表
        /*
        selectServList(select_servlists) {
            this.select_servlists = select_servlists;
        },
        */
        Add(){
            if(this.add_servs.length === 0)
                this.$Message.error('请选择要添加的Service');
            else{
                //要添加的Service
                /*
                var select = new Array(40005); 
                var serv_list = [];

                for(let i=0; i<this.select_servlists.length; i++){
                    for(let j=0; j<this.select_servlists[i].serv_list.length; j++){
                        select[this.select_servlists[i].serv_list[j].serv_id - "00000"] = 1;
                    }
                }
                for(let i=0; i<this.select_servs.length; i++)
                    select[this.select_servs[i].serv_id - "00000"] = 1;
                
                for(let i=0; i<select.length; i++){
                    if(select[i] == 1){
                        serv_list.push("0000" + i);
                    }
                }
                this.add_servs = serv_list;
                */
                var services = [];
                for(let i = 0; i < this.add_servs.length; i++){   
                    services.push({
                        serv: this.add_servs[i].serv_id,
                    })
                } 
                  
                //post请求
                this.$http.post(this.global.QueryAdd + ':' + this.global.gateWay + '/robots/' + this.$route.query.bot_id + '/groups/' + this.group_id + '/services',{
                    group: this.group_id,
                    services: this.add_servs,
                })
                .then((response) => {
                    this.$Message.success('添加成功');
                    this.$router.go(-1);
                    console.log(response);
                })
                .catch((err) => {
                    console.log("GroupAddServ post '/groups/addservs' 请求错误：", err);
                })
            }
        },
        Cancel() {
            this.$router.go(-1);
        },
    },
    mounted() {
        this.getServData();
        this.getGroupInfo();
    }
};
</script>