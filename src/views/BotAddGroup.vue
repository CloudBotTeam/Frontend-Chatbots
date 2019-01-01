<template>
  <div class="animated fadeIn">

    <Row>
        <div style="" class="doc-header">
            <h1>添加群</h1>
        </div>
        <br>

        <Card>
            <Col span="12"><h6>机器人id: {{bot_id}}</h6></Col> 
            <Col span="12"><h6>类型: {{bot_type}}</h6></Col>   
            <br>
        </Card>
        <br><hr><br>
        
        <Col :md="24">

            <div style="position:relative;">
                <Table border ref="selection" :columns="columns6" :height="450" 
                    :data="group_list" @on-selection-change="addList"></Table>    
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
            bot_id: this.$route.query.id,
            bot_type:'',
            managed_groups: [],

            group_list: [],

            add_groups: [],

            columns6: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center',
                },
                {
                    title: "群名称",
                    key: "group_name",
                    ellipsis: "true"
                },
                {
                    title: "群id",
                    ellipsis: "true",
                    key: "group_id"
                },
                {
                    title: "类型",
                    key: "group_type",
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
                                                "groupdetail/" + 
                                                this.group_list[params.index].group_id
                                            });
                                        }
                                    }
                                },
                                "查看"
                            ),
                        ]);
            
                    } //render
                } //{
            ] //cloumn
        }; //return
    }, //data
  
    methods: {
        getGroupdata(){
            this.$http.get('/groups') //使用axios发送请求
            .then((res)=>{ //连接成功后回调函数
                console.log("BotAddGroup get '/groups' 成功");
                this.group_list = res.data.data;

                //禁止选择已在该bot下的群
                for(let i = 0; i < this.group_list.length; i++){
                    for(let j = 0; j < this.managed_groups.length; j++){
                        if(this.group_list[i].group_id === this.managed_groups[j].group_id)
                            this.group_list[i]._disabled = true;
                    }
                }
            })
            .catch(function(err){
                console.log("BotAddGroup get '/groups' 错误:" + err);
            });
        },
        getBotInfo(){
            this.$http.get('/robots/:' + this.bot_id) //使用axios发送请求
            .then((res)=>{ //连接成功后回调函数
                console.log("BotAddGroup get '/robots' 成功");
                //name
                this.bot_name = res.data.data.bot_name;
                //type
                this.bot_type = res.data.data.bot_type;
                //managed_groups
                this.managed_groups = res.data.data.managed_groups;
            })
            .catch(function(err){
                console.log("BotAddGroup get '/robots' 错误:" + err)
            });
        },
        //已选中的要添加的群列表
        addList(add_groups) {
            var group_list = [];
            for(let i=0; i<add_groups.length; i++)
                group_list.push(add_groups[i].group_id);
            this.add_groups = group_list;
            console.log(this.add_groups);
        },
        Add(){
            if(this.add_groups.length === 0)
                this.$Message.error('请选择要添加的群');
            else{
                //post请求
                this.$http.post('/robots/addgroups',{
                    data:{
                        bot_id: this.bot_id,
                        add_groups: this.add_groups,
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
                    console.log("BotAddGroup post '/robots/addgroups' 请求错误：", err);
                })
            }
        },
        Cancel() {
            this.$router.go(-1);
        },
    },
    mounted() {
        this.getGroupdata();
        this.getBotInfo();
    }
};
</script>