<template>
  <div class="animated fadeIn">

    <Row>
        <div style="" class="doc-header">
            <h1>添加群</h1>
        </div>
        <br>

        <Card>
            <Col span="6"><h6>群名称: {{group_name}}</h6></Col> 
            <Col span="6"><h6>群id: {{group_id}}</h6></Col> 
            <Col span="6"><h6>类型: {{group_type}}</h6></Col>  
            <Col span="6"><h6>创建时间: {{group_create_timestamp}}</h6></Col> 
            <br>
        </Card>
        <br><hr><br>
        
        <Col :md="24">
            
            <h5>选择Service组</h5>
            <br>
            <div style="position:relative;">
                <Table border ref="selection" :columns="columns7" :height="200" 
                    :data="servlist_list" @on-selection-change="selectServList"></Table>    
            </div>

            <br><hr><br>
            <h5>选择Service</h5>
            <br>
            <div style="position:relative;">
                <Table border ref="selection" :columns="columns6" :height="450" 
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
            group_id: this.$route.query.id,
            group_type:'',
            group_create_timestamp:'',
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
                {
                    title: "分类",
                    key: "serv_type",
                    ellipsis: "true",
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
            
        }; //return
    }, //data
  
    methods: {
        //获取所有可选service
        getServData(){
            this.$http.get('/services') //使用axios发送请求
            .then((res)=>{ //连接成功后回调函数
                console.log("GroupAddServ get '/services' 成功");


                for(let i = 0; i < res.data.data.length; i++){
                    //service组
                    this.servlist_list.push(res.data.data[i])
                    //service
                    if(res.data.data[i].serv_default === 1){
                        for(let j = 0; j < res.data.data[i].serv_list.length; j++)
                            this.serv_list.push(res.data.data[i].serv_list[j]);
                    }
                }       
            })
            .catch(function(err){
                console.log("GroupAddServ get '/services' 请求错误：" + err);
            });
        },
        getGroupInfo(){
            this.$http.get('/groups/:' + this.group_id) //使用axios发送请求
            .then((res)=>{ //连接成功后回调函数
                console.log("GroupAddServ get '/groups' 成功");
                //name
                this.group_name = res.data.data.group_name;
                //type
                this.group_type = res.data.data.group_type;
                //time
                this.group_create_timestamp = res.data.data.timestamp;
                //managed_groups
                this.managed_servs = res.data.data.managed_servs;
            })
            .catch(function(err){
                console.log("GroupAddServ get '/groups' 错误:" + err)
            });
        },
        //已选中的要添加的service列表
        selectServ(select_servs) {
            this.select_servs = select_servs;
        },
        //已选中的要添加的service组列表
        selectServList(select_servlists) {
            this.select_servlists = select_servlists;
        },
        Add(){
            if(this.select_servlists.length === 0 && this.select_servs.length === 0)
                this.$Message.error('请选择要添加的Service');
            else{
                //要添加的Service
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

                //post请求
                this.$http.post('/groups/addservs',{
                    data:{
                        group_id: this.group_id,
                        add_servs: this.add_servs,
                    },
                    headers: {
                        "Content-Type": "application/json"
                    }
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