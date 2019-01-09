<!--
<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
</style>

<template>
    <div>
        <Row class="expand-row">    
            <Table :columns="columns1" :data="row.serv_list"></Table>
        </Row>
        
    </div>
</template>

<script>
    export default {
        props: {
            row: Object
        },
        data () {
            return {
                columns1: [
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
                    key: 'serv_id',
                }, 
                {
                    title: '分类',
                    key: 'serv_type',
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
                                            "/servdetail/" + this.row.serv_list[params.index].serv_id
                                        });
                                        }
                                    },
                                },
                            ),
                        ]);
                    }
                }],
            }
        },

        mounted(){
        },

        methods:{
        },
       
    };
</script>
-->