<template>
    <div class="animated fadeIn">
        <Row>
            <div style="" class="doc-header">
                <h1>Service</h1>
                <br>
            </div>
            <br>

            <Table :columns="columns_serv" :data="serv_list"></Table>
            <!--
            <Table :columns="columns_serv" :data="data_serv"></Table>
            <Button type="primary" size="large" icon="android-add-circle" @click="jumpCreate"
                    style="padding-bottom:5px; margin-top: 30px">自定义Service组</Button>
            <Poptip confirm title="确定要删除所有自定义service组吗？" @on-ok="DeleteAll">
                <Button type="error" size="large" icon="android-remove-circle" 
                        style="padding-bottom:5px; margin-top: 30px">删除所有自定义service组</Button>
            </Poptip>
            -->
        </Row>
    </div>
</template>
<script>
    //import global from '../components/Address'//引用模块进来
    //import expandRow from './Service-expand.vue';
    export default {
        //components: { expandRow },
        data () {
            return {
                columns_serv: [
                    /*
                    {
                        type: 'expand',
                        width: 50,
                        render: (h, params) => {
                            return h(expandRow, {
                                props: {
                                    row: params.row
                                }
                            })
                        }
                    },
                    {
                        title: 'Service组',
                        key: 'type'
                    },
                    {
                        title: 'Service组id',
                        key: 'id'
                    },
                    {
                        title: "删除",
                        key: "action",
                        align: "center",

                        render: (h, params) => {
                            //console.log('params:', params.row);
                            if(this.data_serv[params.index].serv_default === 0){
                                return h("div", [
                                    h(
                                        "Button",
                                        {
                                            props: {
                                                type: "error",
                                                size: "small",
                                                icon: "android-remove-circle"
                                            },
                                            style: {
                                                marginRight: "5px"
                                            },
                                            on: {
                                                click: () => {
                                                    this.$Modal.confirm({
                                                        content: '<p style="font-size:15px">确定要删除这个Service组吗？</p>',
                                                        onOk: () => {
                                                            this.Delete(params.index, this.data_serv[params.index].id);
                                                        },
                                                    });
                                                }
                                            },
                                        },
                                    ),
                                ]);
                            }
                        }
                    }*/
                    {
                        title: '名称',
                        /*
                        render: (h, params) => {
                            return h('div', [
                                h('strong',{
                                    style:{
                                        color:"#2d8cf0",
                                        cursor:"pointer",
                                    },
                                }, params.row.serv_name)
                            ]);
                        },     */
                        key: 'serv_name',      
                    },
                    {
                        title: 'ID',
                        key: 'serv_id',
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
                                                    //"/servdetail/" + this.row.serv_list[params.index].serv_id
                                                    "/servdetail/" + this.serv_list[params.index].serv_id
                                                });
                                            }
                                        },
                                    },
                                ),
                            ]);
                        }
                    }
                ],
                //data_serv: [],
                serv_list: [],
            }
        },
        mounted(){
            this.getServData();
        },
        methods:{
            getServData(){
                //console.log(this.global.QueryAdd + ':' + this.global.gateWay + '/services');
                this.$http.get(this.global.QueryAdd + ':' + this.global.gateWay + '/services') //使用axios发送请求
                .then((res)=>{ //连接成功后回调函数
                    console.log("Service get '/services' 成功");
                    //this.data_serv = res.data.serv_list;
                    this.serv_list = res.data.serv_list;
                    //console.log(res.data);
                    /*
                    //禁止选择自定义分类中的service
                    for(let i = 0; i < this.data_serv.length; i++){
                        //console.log("data:",this.data_serv[i]);
                        if(this.data_serv[i].serv_default === 0){
                            for(let j = 0; j < this.data_serv[i].serv_list.length; j++)
                                this.data_serv[i].serv_list[j]._disabled = true;
                        }
                    }
                    */
                })
                .catch(function(err){
                    console.log("Service get '/services' 错误:" + err)
                });
            },
            /*
            jumpCreate(){
                var maxid = '';
                for (let i = 0; i < this.data_serv.length; i++) 
                if (this.data_serv[i].id > maxid) maxid = this.data_serv[i].id;

                
                this.$router.push({
                    path: "/createservlist",
                    query: {
                        id: (parseInt(maxid) + 1).toString()
                    }
                })
            },
            Delete(index, id){
                //delete请求
                this.$http.delete('/services/' + id,{
                    headers: {"Content-Type": "application/x-www-form-urlencoded"}
                })
                .then((response) => {
                    this.$Message.success('成功删除');
                    //删除前端数据
                    this.data_serv.splice(index, 1);
                    console.log(response);  
                })
                .catch((err) => {
                    console.log("Service '/services/{{id}}' delete请求错误：", err);
                })
            },
            //删除所有service组
            DeleteAll(){
                //delete请求
                this.$http.delete('/services',{
                    headers: {"Content-Type": "application/x-www-form-urlencoded"}
                })
                .then((response) => {
                    this.$Message.success('已删除所有自定义service组');

                    //删除前端数据
                    for(let i = 0; i < this.data_serv.length; i++){
                        if(this.data_serv[i].serv_default === 0){
                            this.data_serv.splice(i, this.data_serv.length - i);
                            break;
                        }
                    }

                    console.log(response);  
                })
                .catch((err) => {
                    console.log("Service '/services' delete 请求错误：", err);
                })
            },*/
        },
    }
</script>