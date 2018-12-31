<template>
    <div class="animated fadeIn"  style="margin-top:50px;">

        <Row>
            <div style="" class="doc-header">
                <h1>Information</h1>
            </div>
            <br>

            <Col span="24">
                <Card>
                    <Col span="6"><h6>群名称: {{group_name}}</h6></Col> 
                    <Col span="6"><h6>群id: {{group_id}}</h6></Col> 
                    <Col span="6"><h6>类型: {{type}}</h6></Col>  
                    <Col span="6"><h6>创建时间: {{group_create_timestamp}}</h6></Col> 
                    <br>
                </Card>

                <br><br>
                <div style="" class="doc-header">
                    <h1>管理的Service</h1>
                </div>
                <br>

                <Table border ref="selection" :columns="columns6" :data="managed_servs" @on-selection-change="deletList"></Table>
                <br>
            </Col>
        </Row>

        <Button type="primary" size="large" icon="android-add-circle" style="padding-grouptom:5px;" @click="jumpadd">添加Service</Button>
        <Button type="primary" size="large" icon="android-remove-circle" style="padding-grouptom:5px;" @click="remove">删除选中Service</Button>    
    </div>
</template>


<script>
    export default {
        data () {
            return {
                json_list:[],
                type:'',
                group_id:this.$route.params.id,
                group_create_timestamp:'',
                group_name:'',
                
                page_result_list:[],
                managed_servs:[],
                delet_servs:[],
                columns6: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center',
                    },
                    {
                        title: '分类',
                        key: 'serv_type',
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
                                  }, params.row.serv_name)
                               ]);
                        },                     
                    },
                    {
                        title: 'ID',
                         render: (h, params) => {
                             return h('div', [
                                 h('strong', params.row.serv_id)
                               ]);
                        },
                       
                    },      
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
                                                "/servdetail/" + this.managed_servs[params.index].serv_id
                                            });
                                            }
                                        },
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
            let group_list=null;

            this.getGroupInfo();
        },
        methods:{
            getGroupInfo(){
                this.$http.get('/groups' + this.group_id) //使用axios发送请求
                .then((res)=>{ //连接成功后回调函数
                    console.log("GroupDetail get '/groups' 成功");
                    //name
                    this.group_name = res.data.data.group_name;
                    //type
                    this.type = res.data.data.group_type;  
                    //time
                    this.group_create_timestamp = res.data.data.timestamp;
                    //managed_servs
                    this.managed_servs = res.data.data.managed_servs;
                })
                .catch(function(err){
                    console.log("连接错误"+err);
                });
            },
            remove(){    
                var servslist = [];
                for(let i = 0; i < this.delet_servs.length; i++)
                    servslist.push(this.delet_servs[i].serv_id);

                //delete请求
                this.$http.delete('/groups/deleteservs',{
                    data:{
                        group_id: this.group_id,
                        delet_servs: servslist,
                    },
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then((response) => {
                    console.log(response);  
                })
                .catch((err) => {
                    console.log('Groupdetail delete请求错误：', err);
                })
                
                //删除前端数据
                console.log(this.delet_servs);
                for(let i = 0; i < this.delet_servs.length; i++){
                    for(let j = 0; j < this.managed_servs.length; j++){
                        if(this.delet_servs[i].serv_id === this.managed_servs[j].serv_id){
                            this.managed_servs.splice(j, 1);
                            continue;
                        }
                    }
                }
            },

            deletList(arr) {
                this.delet_servs = arr;
                console.log(this.delet_servs)
            },


            jumpadd() {
                this.$router.push({
                    path: "/groupaddserv",
                    query: {
                        id: this.group_id,
                    }
                })      
            },
        },
       
    }
</script>

<style type="text/css">
        .demo-i-circle-custom h1{
            color: #3f414d;
            font-size: 10px;
            font-weight: normal;
        }
        .demo-i-circle-custom p{
            color: #657180;
            font-size: 8px;
            margin: 5px 0 2px;
        }
        .demo-i-circle-custom span{
            display: block;
            padding-top: 15px;
            color: #657180;
            font-size: 10px;}
           .demo-i-circle-custom span :before{
                content: '';
                display: block;
                width: 50px;
                height: 1px;
                margin: 0 auto;
                background: #e0e3e6;
                position: relative;
                top: -20px;
            };
        .demo-i-circle-custom span i{
            font-style: normal;
            color: #3f414d;
        }
</style>