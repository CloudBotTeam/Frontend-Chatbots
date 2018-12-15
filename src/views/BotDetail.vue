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
                    <Col span="6"><h6>类型: {{type}}</h6></Col>  
                    <Col span="6"><h6>创建时间: {{bot_create_timestamp}}</h6></Col> 
                    <br>
                </Card>

                <br><br>
                <div style="" class="doc-header">
                    <h1>Group List</h1>
                </div>
                <br>
                
                <Table border ref="selection" :columns="columns5" :data="managed_groups" @on-selection-change="deletList"></Table>
                <br>
            </Col>
        </Row>

        <Button type="primary" size="large" icon="android-add-circle" 
            id='pickfiles' style="padding-bottom:5px;">添加群</Button>
        <Button type="primary" size="large" icon="android-remove-circle" 
            id='pickfiles' style="padding-bottom:5px;" @click="remove">删除所选群</Button>    
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
                type:'',
                bot_id:this.$route.params.id,
                bot_create_timestamp:'',
                bot_name:'',
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
            handleSelectAll (status) {
                this.$refs.selection.selectAll(status);
            },

            getBotInfo(){
                this.$http.get('/robots/:' + this.bot_id) //使用axios发送请求
                    .then((res)=>{ //连接成功后回调函数
                        console.log("BotDetail get '/robots' 成功");
                        //name
                        this.bot_name = res.data.data.bot_name;
                        //type
                        this.type = res.data.data.bot_type;
                        //time
                        this.bot_create_timestamp = res.data.data.timestamp;
                        //managed_groups
                        this.managed_groups = res.data.data.managed_groups;
                    })
                    .catch(function(err){
                        console.log("连接错误"+err)
                    });
            },

            remove(){
                for(let i = 0; i < this.delet_groups.length; i++){
                    for(let j = 0; j < this.managed_groups.length; j++){
                        if(this.delet_groups[i].group_id === this.managed_groups[j].group_id){
                            this.managed_groups.splice(j, 1);
                            continue;
                        }
                    }
                }
            },

            deletList(arr) {
                this.delet_groups = arr;
                console.log(this.delet_groups)
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