<template>
    <div>
        <h4>输入新机器人信息</h4>
        <br><hr><br>
        <Form :model="formItem" :label-width="80">
            <FormItem label="机器人名称">
                <Input v-model="formItem.input" placeholder="Enter something..." @on-blur="inputName"></Input>
            </FormItem>
    
            <FormItem label="机器人类型">
                <RadioGroup v-model="button1" type="button" @on-change="selectType">
                    <Radio label="QQ"></Radio>
                    <Radio label="WeChat"></Radio>
                </RadioGroup>
            </FormItem>

            <FormItem label="选择群">
                <Table border ref="selection" :columns="columns7" :data="group_list" 
                    @on-selection-change="selectGroup" height="550"></Table>
            </FormItem>
            
        
            <FormItem>
                <Button type="primary" @click="Create">创建</Button>
                <Button style="margin-left: 8px" @click="Cancel">取消</Button>
            </FormItem>

        </Form>
    </div>
</template>

<script>
export default {
    data () {
        return {
            formItem: {
                input: '',
                radio: 'QQ',
                checkbox: [],
            },

            group_list:[],

            managed_groups: [],
            bot_type: '',
            bot_name: '',
            bot_id: '', 

            columns7: [
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
                    title: "创建时间",
                    ellipsis: "true",
                    key: "timestamp"
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
                            )
                        ]);
                
                    } //render
                } //{
            ]
        }
    },
    methods: {
        getGroupdata(){
            this.$http.get('/groups') //使用axios发送请求
            .then((res)=>{ //连接成功后回调函数
                console.log("AddBot get '/groups' 成功");
                this.group_list = res.data.data;

                //显示第一页
                //太坑了...终于解决了page_group_list视图不及时渲染的问题
                this.pageindex = 1;
                for (let i = 0; i < 10; i++) {
                    if (i < this.group_list.length) {
                        this.page_group_list.push(this.group_list[i]);
                    }
                }
            })
            .catch(function(err){
                console.log("AddBot get '/groups' 请求错误："+err);
            });
        },
        selectGroup(selected_groups) {
            var group_list = [];
            for(let i=0; i<selected_groups.length; i++)
                group_list.push(selected_groups[i].group_id);
            this.managed_groups = group_list;
            console.log(this.managed_groups);
        },
        selectType(selected_type) {
            this.bot_type = selected_type;
        },
        inputName(opt) {
            this.bot_name = opt.target.value;
            console.log(this.bot_name);
        },
        Create(){
            //未选择类型
            if(this.bot_type == '')
                this.$Message.error('请选择机器人类型');
            //未输入名称
            if(this.bot_name == '')
                this.$Message.error('请输入机器人名称');
            //满足条件
            if(this.bot_type != '' && this.bot_name != ''){
                //post请求
                this.$http.post('/robots',{
                    data:{
                        bot_id: this.$route.query.id,
                        bot_name: this.bot_name,
                        bot_type: this.bot_type,
                        managed_groups: this.managed_groups,
                    },
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then((response) => {
                    this.$Message.success('创建成功');
                    this.$router.go(-1);
                    console.log(response);
                })
                .catch((err) => {
                    console.log("AddBot post '/robot' 请求错误：", err);
                })
            }
        },
        Cancel() {
            this.$router.go(-1);
        },
    },
    mounted() {
        this.getGroupdata();
    }
};
    
</script>

