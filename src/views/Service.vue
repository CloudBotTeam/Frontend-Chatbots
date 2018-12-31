<template>
    <div class="animated fadeIn">
        <Row>
            <div style="" class="doc-header">
                <h1>Service List</h1>
                <br>
                <p>你可以在这里自定义Service组</p>
            </div>
            <br>

            <Table :columns="columns_serv" :data="data_serv"></Table>
            <Button type="primary" size="large" icon="android-add-circle" @click="jumpCreate"
                    style="padding-bottom:5px; margin-top: 30px">自定义Service组</Button>
            <Poptip confirm title="确定要删除所有自定义service组吗？" @on-ok="DeleteAll">
                <Button type="error" size="large" icon="android-remove-circle" 
                        style="padding-bottom:5px; margin-top: 30px">删除所有自定义service组</Button>
            </Poptip>
        </Row>
    </div>
</template>
<script>
    import expandRow from './Service-expand.vue';
    export default {
        components: { expandRow },
        data () {
            return {
                columns_serv: [
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
                    }
                ],
                data_serv: [],
            }
        },
        mounted(){
            this.getServData();
        },
        methods:{
            getServData(){
                this.$http.get('/services') //使用axios发送请求
                .then((res)=>{ //连接成功后回调函数
                    console.log("Service get '/services' 成功");
                    this.data_serv = res.data.data;
                    //禁止选择自定义分类中的service
                    
                    for(let i = 0; i < this.data_serv.length; i++){
                        if(this.data_serv[i].serv_default === 0){
                            for(let j = 0; j < this.data_serv[i].serv_list.length; j++)
                                this.data_serv[i].serv_list[j]._disabled = true;
                        }
                    }
                    //console.log("service:", this.data_serv[2].serv_list);
                })
                .catch(function(err){
                    console.log("Service get '/services' 错误:" + err)
                });
            },
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
            },
        },
    }
</script>