<template>
    <div class="animated fadeIn"  style="margin-top:50px;">

        <Row>
            <Col span="24">
                <div style="" class="doc-header">
                    <h1>Information</h1>
                </div>
                <br>

                <Card>
                    <Col span="8"><h6>机器人ID: {{bot_id}}</h6></Col> 
                    <Col span="8"><h6>类型: {{bot_type}}</h6></Col>
                    <Col span="8"><h6>状态: {{botStatus}}</h6></Col>  
                    <br>
                </Card>

                <br><br>
                <div style="" class="doc-header">
                    <h1>管理的群</h1>
                </div>
                <br>
                
                <Table border ref="selection" :columns="columns5" :data="managed_groups" @on-selection-change="deletList"></Table>
                <br>
            </Col>
        </Row>

        <Button type="success" size="large" icon="ios-contact" style="padding-bottom:5px;" @click="jumplogin">登录</Button>
        <Button type="primary" size="large" icon="android-add-circle" style="padding-bottom:5px;" @click="jumpadd">添加群</Button>
        <Button type="error" size="large" icon="android-remove-circle" style="padding-bottom:5px;" @click="remove">删除所选群</Button>    
    </div>

</template>


<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
</style>

   
<script>

    export default {
        data () {
            return {
                json_list:[],
                bot_type:'',
                bot_id:this.$route.params.id,
                status:'',
                connect_url:'',
                page_result_list:[],
                managed_groups:[],
                delet_groups:[],
                columns5: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center',
                    },
                    {
                        title: '群ID',
                         render: (h, params) => {
                             
                             return h('div', [
                                 h('strong', params.row.group)
                               ]);
                        },
                       
                    }, 
                    {
                        title: "查看",
                        key: "action",
                        align: "center",
                        ellipsis: "true",

                        render: (h, params) => {
                            return h("div", [
                                h(
                                    "Button",
                                    {
                                    props: {
                                        type: "primary",
                                        size: "small",
                                        icon: "eye"
                                    },
                                    style: {
                                        marginRight: "5px"
                                    },
                                    on: {
                                        click: () => {
                                        this.$router.push({
                                            path:
                                            "/groupdetail/" + this.bot_id + '/' + this.managed_groups[params.index].group,
                                            query:{
                                                bot_type: this.bot_type,
                                            }
                                        });
                                        }
                                    }
                                    },
                                ),
                            ]);
                        }
                    }
                ],
                formItem: {checkbox: []},
            }
        },
        created(){

        },
        mounted(){
            const vue=this;
            var id=this.$route.params.id;
            let bot_list=null;

            this.getBotInfo();
        },
        methods:{

            getBotInfo(){
                this.$http.get(this.global.QueryAdd + ':' + this.global.gateWay + '/robots/' + this.bot_id) //使用axios发送请求
                    .then((res)=>{ //连接成功后回调函数
                        console.log("BotDetail get '/robots' 成功");

                        console.log("botdata", res.data);

                        //type
                        this.bot_type = res.data.entity.bot_type;
                        //managed_groups
                        this.managed_groups = res.data.group_list;
                        //connect_url
                        this.connect_url = res.data.connetionUrl;
                        //status
                        if(res.data.botStatus === 0)this.botStatus = "未启动";
                        else if(res.data.botStatus === 1)this.botStatus = "运行中";
                        else if(res.data.botStatus === 2)this.botStatus = "故障";
                        else this.botStatus = "未登录";
                        //console.log("stat", res.data);
                    })
                    .catch(function(err){
                        console.log("连接错误" + err)
                    });
            },

            remove(){
                if(this.delet_groups.length === 0)
                    this.$Message.error('请选择要删除的群');
                else{    
                    var groupslist = [];
                    for(let i = 0; i < this.delet_groups.length; i++){
                        groupslist.push({
                            group: this.delet_groups[i].group,
                        });
                    }
                    console.log("deletegroup: ", groupslist)

                    //delete请求
                    this.$http.delete(this.global.QueryAdd + ':' + this.global.gateWay + '/robots/deletegroups',{
                        data:{
                            delete_groups: groupslist,
                            bot_id: this.bot_id,
                        },
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                    .then((response) => {
                        this.$Message.success('成功删除');

                        //删除前端数据
                        for(let i = 0; i < this.delet_groups.length; i++){
                            for(let j = 0; j < this.managed_groups.length; j++){
                                if(this.delet_groups[i].group === this.managed_groups[j].group){
                                    this.managed_groups.splice(j, 1);
                                    continue;
                                }
                            }
                        }

                        console.log(response);
                    })
                    .catch((err) => {
                        console.log('Botdetail delete 请求错误：', err);
                    })
                }
            },

            deletList(arr) {
                this.delet_groups = arr;
                console.log(this.delet_groups)
            },

            jumpadd() {
                this.$router.push({
                    path: "/botaddgroup",
                    query: {
                        bot_id: this.bot_id,
                    }
                })      
            },

            jumplogin(){
                console.log("jump:", this.connect_url)
                if(this.botStatus == "运行中"){
                    console.log(this.botStatus);
                    this.$Message.success("你已登录过");
                }
                else if(this.botStatus == "故障"){
                    console.log(this.botStatus);
                    this.$Message.success("机器故障，无法登陆");
                }
                else window.open(this.connect_url)  
            }
        },
       
    }
</script>