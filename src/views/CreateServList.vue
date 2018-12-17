<template>
    <div>
        <h4>输入新Service组信息</h4>
        <br><hr><br>
        <Form :model="formItem" :label-width="80">
            <FormItem label="名称">
                <Input v-model="formItem.input" placeholder="Enter something..." @on-blur="inputName"></Input>
            </FormItem>

            <FormItem label="选择Service">
                <Table border ref="selection" :columns="columns7" :data="serv_list" 
                    @on-selection-change="selectServ" height="450"></Table>
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
                checkbox: [],
            },

            serv_list:[],

            add_servs: [],
            id: '', 
            type:'',

            columns7: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center',
                },
                {
                    title: 'ID',
                    key: 'serv_id',
                }, 
                {
                    title: '分类',
                    key: 'serv_type',
                },
                {
                    title: '名称',
                    key: 'serv_name',
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
                                                "/servdetail/" + this.serv_list[params.index].serv_id
                                            });
                                        }
                                    },
                                },
                            ),
                        ]);
                    }
                },
            ]
        }
    },
    methods: {
        //获取所有可选service
        getOptServ(){
            this.$http.get('/services') //使用axios发送请求
            .then((res)=>{ //连接成功后回调函数
                console.log("CreateServList get '/services' 成功");
                for(let i = 0; i < res.data.data.length; i++){
                    if(res.data.data[i].serv_default === 1){
                        for(let j = 0; j < res.data.data[i].serv_list.length; j++)
                            this.serv_list.push(res.data.data[i].serv_list[j]);
                    }
                }

                //显示第一页
                this.pageindex = 1;
                for (let i = 0; i < 10; i++) {
                    if (i < this.serv_list.length) {
                        this.page_serv_list.push(this.serv_list[i]);
                    }
                }
            })
            .catch(function(err){
                console.log("CreateServList get '/services' 请求错误：" + err);
            });
        },
        selectServ(selected_servs) {
            var serv_list = [];
            for(let i=0; i<selected_servs.length; i++)
                serv_list.push(selected_servs[i].serv_id);
            this.add_servs = serv_list;
            console.log(this.add_servs);
        },
        inputName(opt) {
            this.type = opt.target.value;
            console.log(this.type);
        },
        Create(){
            //未输入名称
            if(this.type === '')
                this.$Message.error('请输入Service组名称');
            //未选择service
            if(this.add_servs.length === 0)
                this.$Message.error('请选择要添加的群');
            //满足条件
            if(this.type != '' && this.add_servs.length != 0){
                //post请求
                this.$http.post('/services',{
                    data:{
                        id: this.$route.query.id,
                        type: this.type,
                        add_servs: this.add_servs,
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
                    console.log("CreateServList post '/services' 请求错误：", err);
                })
            }
        },
        Cancel() {
            this.$router.go(-1);
        },
    },
    mounted() {
        this.getOptServ();
    }
};
    
</script>

