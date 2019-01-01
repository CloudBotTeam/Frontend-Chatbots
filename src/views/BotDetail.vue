<template>
    <div class="animated fadeIn"  style="margin-top:50px;">

        <Row>
            <Col span="24">
                <div style="" class="doc-header">
                    <h1>Information</h1>
                </div>
                <br>

                <Card>
                    <Col span="6"><h6>机器人名称: {{bot_name}}</h6></Col> 
                    <Col span="6"><h6>机器人id: {{bot_id}}</h6></Col> 
                    <Col span="6"><h6>类型: {{bot_type}}</h6></Col>
                    <Col span="6"><h6>状态: {{status}}</h6></Col>  
                    <!--<Col span="6"><h6>创建时间: {{bot_create_timestamp}}</h6></Col> -->
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
        <Button type="primary" size="large" icon="android-remove-circle" style="padding-bottom:5px;" @click="remove">删除所选群</Button>    
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
                bot_create_timestamp:'',
                bot_name:'',
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
                        title: '名称',
                         render: (h, params) => {
                             
                             return h('div', [
                                 h('strong',{
                                    style:{
                                      color:"#2d8cf0",
                                        cursor:"pointer",
                                    },

                                  }, params.row.group_name)
                               ]);
                        },
                       
                    },
                    {
                        title: 'ID',
                         render: (h, params) => {
                             
                             return h('div', [
                                 h('strong', params.row.group_id)
                               ]);
                        },
                       
                    }, 
                    {
                        title: '分类',
                        key: 'group_type',

                        filters: [
                            {
                                label: '',
                                value: 0
                            },
                            {
                                label: '',
                                value: 1
                            }
                        ],
                        filterMultiple: false,
                        filterMethod (value, row) {
                            if (value === 0) {
                                return row.group_type===0;
                            } else if (value === 1) {
                                return row.group_type ===1;
                            }
                        }
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
                                            "/groupdetail/" + this.managed_groups[params.index].group_id
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
                this.$http.get('/robots/:' + this.bot_id) //使用axios发送请求
                    .then((res)=>{ //连接成功后回调函数
                        console.log("BotDetail get '/robots' 成功");
                        //name
                        this.bot_name = res.data.data.bot_name;
                        //type
                        this.bot_type = res.data.data.bot_type;
                        //time
                        this.bot_create_timestamp = res.data.data.timestamp;
                        //managed_groups
                        this.managed_groups = res.data.data.managed_groups;
                        //connect_url
                        this.connect_url = res.data.data.connect_url;
                        //status
                        if(res.data.data.status === 0)this.status = "未启动";
                        else if(res.data.data.status === 1)this.status = "运行中";
                        else if(res.data.data.status === 2)this.status = "故障";
                        else this.status = "未登录";
                    })
                    .catch(function(err){
                        console.log("连接错误"+err)
                    });
            },

            remove(){
                var groupslist = [];
                for(let i = 0; i < this.delet_groups.length; i++)
                    groupslist.push(this.delet_groups[i].group_id);

                //delete请求
                this.$http.delete('/robots/deletegroups',{
                    data:{
                        bot_id: this.bot_id,
                        delet_groups: groupslist,
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
                            if(this.delet_groups[i].group_id === this.managed_groups[j].group_id){
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
            },

            deletList(arr) {
                this.delet_groups = arr;
                console.log(this.delet_groups)
            },

            jumpadd() {
                this.$router.push({
                    path: "/botaddgroup",
                    query: {
                        id: this.bot_id,
                    }
                })      
            },

            jumplogin(){
                window.open(this.connect_url)  
            }
        },
       
    }
</script>