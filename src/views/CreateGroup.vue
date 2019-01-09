<template>
    <div>
        <h4>输入新群信息</h4>
        <br><hr><br>
        <Form :model="formItem" :label-width="80">
            <FormItem label="群名称">
                <Input v-model="formItem.input" placeholder="Enter something..." @on-blur="inputName"></Input>
            </FormItem>
    
            <FormItem label="群类型">
                <RadioGroup v-model="button1" type="button" @on-change="selectType">
                    <Radio label="QQ"></Radio>
                    <Radio label="WeChat"></Radio>
                </RadioGroup>
            </FormItem>
            <!--
            <FormItem label="选择Service组">
                <Table border ref="selection" :columns="columns8" :data="servlist_list" 
                    @on-selection-change="selectServLists" height="200"></Table>
            </FormItem>
            -->

            <FormItem label="选择Service">
                <Table border ref="selection" :columns="columns7" :data="serv_list" 
                    @on-selection-change="selectServs" height="200"></Table>
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

            serv_list:[],
            //servlist_list:[],
            //select_servlists: [],
            //select_servs: [],

            managed_servs: [],
            group_type: '',
            group_name: '',

            columns7: [
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
            columns8: [
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
        }
    },
    methods: {
        //获取所有可选service
        getServData(){
            this.$http.get(this.global.QueryAdd + ':' + this.global.gateWay + '/services') //使用axios发送请求
            .then((res)=>{ //连接成功后回调函数
                console.log("CreateGroup get '/services' 成功");
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
            })
            .catch(function(err){
                console.log("GroupAddServ get '/services' 请求错误：" + err);
            });
        },
        selectServs(selected_servs) {
            //this.select_servs = selected_servs;
            this.managed_servs = selected_servs;
        },
        /*
        selectServLists(selected_servlists) {
            this.select_servlists = selected_servlists;
        },
        */
        selectType(selected_type) {
            this.group_type = selected_type;
        },
        inputName(opt) {
            this.group_name = opt.target.value;
            console.log(this.group_name);
        },
        Create(){
            //未选择类型
            if(this.group_type == '')
                this.$Message.error('请选择群类型');
            //未输入名称
            if(this.group_name == '')
                this.$Message.error('请输入群名称');
            //满足条件
            if(this.group_type != '' && this.group_name != ''){
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
                this.managed_servs = serv_list;
                */

                //post请求
                this.$http.post(this.global.QueryAdd + ':' + this.global.gateWay + '/robots/addgroups',{
                    group_name: this.group_name,
                    group_type: this.group_type,
                    managed_servs: this.managed_servs,
                })
                .then((response) => {
                    this.$Message.success('创建成功');
                    this.$router.go(-1);
                    console.log(response);
                })
                .catch((err) => {
                    console.log("CreateGroup post '/robots/addgroups' 请求错误：", err);
                })
            }
        },
        Cancel() {
            this.$router.go(-1);
        },
    },
    mounted() {
        this.getServData();
    }
};
    
</script>

