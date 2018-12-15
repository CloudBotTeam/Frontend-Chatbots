<template>
    <div class="animated fadeIn">

        <Row>
            <div style="" class="doc-header">
                <h1>Services</h1>
                <br>
                <p>你可以在这里自定义Service组</p>
            </div>
            <br>

            <!--前端把service和分类写死-->
            <Col span="24" >
                <Collapse v-model="value1">
                    <Panel name="1">
                        电影
                        <p slot="content">
                            <Table border ref="selection" :columns="columns4" :data="movie_serv"></Table>
                        </p>
                    </Panel>
                    <Panel name="2">
                        追星
                        <p slot="content">
                            <Table border ref="selection" :columns="columns4" :data="star_serv"></Table>
                        </p>
                    </Panel>
                    <Panel name="3">
                        游戏
                        <p slot="content">
                            <Table border ref="selection" :columns="columns4" :data="game_serv"></Table>
                        </p>
                    </Panel>
                </Collapse>
            </Col>

            <Button type="primary" size="large" icon="android-add-circle" 
            id='pickfiles' style="padding-bottom:5px; margin-top: 10px">自定义Service组</Button>
        </Row> 
    </div>
</template>

<script>

    export default {
        data () {
            return {
                columns4: [
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
                            }, params.row.serv_name)
                        ]);
                    },           
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
                                            "/servdetail/" + this.movie_serv[params.index].serv_id
                                        });
                                        }
                                    },
                                },
                            ),
                        ]);
                    }
                }],

                movie_serv: [
                    {
                        serv_id: "00001",
                        serv_name: "豆瓣",
                    },
                    {
                        serv_id: "00002",
                        serv_name: "豆浆",
                    },
                    {
                        serv_id: "00003",
                        serv_name: "豆奶",
                    },
                ],

                star_serv: [
                    {
                        serv_id: "00004",
                        serv_name: "微博",
                    },
                    {
                        serv_id: "00005",
                        serv_name: "中博",
                    },
                    {
                        serv_id: "00006",
                        serv_name: "大博",
                    },
                ],

                game_serv: [
                    {
                        serv_id: "00007",
                        serv_name: "Steam",
                    },
                    {
                        serv_id: "00008",
                        serv_name: "Stream",
                    },
                    {
                        serv_id: "00009",
                        serv_name: "Sream",
                    },
                ],
            
                //value1: ['1', '2'],//默认展开哪些面板
                formItem: {
                    checkbox: [],
                },
            }
        }
    }
</script>

