b<template>
  <div class="animated fadeIn">

    <Row>
      <div style="" class="doc-header">
        <h1>ChatBot List</h1>
      </div>
      <br>
      <Col :md="24">   
        <div style="position:relative;">
            <Table :columns="columns7" :data="page_bot_list" ref="table"></Table>
        </div>

        <Page
            :total="this.bot_list.length"
            show-total
            @on-change="setInitPage"
            style="text-align:right;margin-top:50px"
        ></Page>
      </Col>
    </Row>
  </div>
</template>

<script>
import Vue from 'vue'
var vue;
var uploader;

export default {
    name: "buttons",
    data() {
        return {
            progresshow: false,
            progresscount: 0,
            progresstatus: "active",
            progressspeed: 0,
            bot_list: [],
    
            pageindex: 1,
            page_bot_list: [],
            lodding: false,
            list_loadding: false,
            columns7: [
              {
                title: "机器人名称",
                key: "bot_name",
                ellipsis: "true"
              },
              {
                title: "机器人id",
                ellipsis: "true",
                key: "bot_id"
              },
              {
                title: "创建时间",
                ellipsis: "true",
                key: "timestamp"
              },
              {
                title: "类型",
                key: "bot_type",
                ellipsis: "true",
              },
              {
                title: "状态",
                ellipsis: "true",
                filters: [
                  {
                    label: "处理完成",
                    value: 1
                  },
                  {
                    label: "正在处理",
                    value: 2
                  }
                ],
                filterMultiple: false,
                filterMethod(value, row) {
                  if (value === 0) return row.status === 0;
                  else if (value === 1) return row.status === 1;
                  else if (value === 2) return row.status === 2;
                },

                render: (h, params) => {
                  const status = parseInt(params.row.status);

                  if (status === 0)
                    return h("div", [
                      h(
                        "Tag",
                        {
                          props: {
                            type: "dot",
                            color: "blue"
                          }
                        },
                        "未启动"
                      )
                    ]);
                  else if (status === 1)
                    return h("div", [
                      h(
                        "Tag",
                        {
                          props: {
                            type: "dot",
                            color: "green"
                          }
                        },
                        "运行中"
                      )
                    ]);
                  else if (status === 2)
                    return h("div", [
                      h(
                        "Tag",
                        {
                          props: {
                            type: "dot",
                            color: "red"
                          }
                        },
                        "故障"
                      )
                    ]);  
                }
              },
              {
                title: "操作",
                key: "action",
                align: "center",
                ellipsis: "true",

                render: (h, params) => {
                  const status = parseInt(params.row.status);
                  
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
                                "/botdetail/" +
                                this.bot_list[(this.pageindex - 1) * 10 + params.index].bot_id
                            });
                          }
                        }
                      },
                      "查看"
                    ),
                    h(
                      "Button",
                      {
                        props: {
                          type: "error",
                          size: "small"
                        },
                        on: {
                          click: () => {
                            this.remove(params.index);
                          }
                        }
                      },
                      "删除"
                    )
                  ]);
                } //render
              } //{
            ] //cloumn
        }; //return
    }, //data

    methods: {
      remove(index) {
        //delete请求
        this.$http.delete('/robots/' + this.bot_list[index].bot_id,{
          headers: {"Content-Type": "application/x-www-form-urlencoded"}
        })
        .then((response) => {
          console.log(response);  
        })
        .catch((err) => {
          console.log('Chatbot delete请求错误：', err);
        })
        
        //删除前端数据
        this.bot_list.splice(index, 1);

        //更新page组件当前页视图
        //太坑了太坑了太坑了
        var page = this.pageindex;
        this.page_bot_list = [];
        for (let i = (page - 1) * 10; i < (page - 1) * 10 + 10; i++) {
          if (i < this.bot_list.length) {
            this.page_bot_list.push(this.bot_list[i]);
          }
        }
      },

      setInitPage(page) {
        this.page_bot_list = [];
        this.pageindex = page;
        for (let i = (page - 1) * 10; i < (page - 1) * 10 + 10; i++) {
          if (i < this.bot_list.length) {
            this.page_bot_list.push(this.bot_list[i]);
          }
        }
      },

      getBotdata(){
        this.$http.get('/robots') //使用axios发送请求
          .then((res)=>{ //连接成功后回调函数
            console.log("ChatBot get '/robots' 成功");
            this.bot_list = res.data.data;
            console.log(this.bot_list);

            //显示第一页
            //太坑了...终于解决了page_bot_list视图不及时渲染的问题
            this.pageindex = 1;
            for (let i = 0; i < 10; i++) {
              if (i < this.bot_list.length) {
                this.page_bot_list.push(this.bot_list[i]);
              }
            }
          });
      }
    },

    mounted() {
      const vue = this;
      this.list_loadding = true;
      setTimeout(function() {
        vue.list_loadding = false;
      }, 2000);
      this.setInitPage(1);

      this.getBotdata();
    }
};
</script>


<style type="text/css" scoped>
.ivu-tag-dot {
  border: none !important;
}
tr.ivu-table-row-hover td .ivu-tag-dot {
  background-color: #ebf7ff !important;
}

.demo-i-circle-custom h1 {
  color: #3f414d;
  font-size: 10px;
  font-weight: normal;
}
.demo-i-circle-custom p {
  color: #657180;
  font-size: 8px;
  margin: 5px 0 2px;
}
.demo-i-circle-custom span {
  display: block;
  padding-top: 15px;
  color: #657180;
  font-size: 10px;
}
.demo-i-circle-custom span :before {
  content: "";
  display: block;
  width: 50px;
  height: 1px;
  margin: 0 auto;
  background: #e0e3e6;
  position: relative;
  top: -20px;
}
.demo-i-circle-custom span i {
  font-style: normal;
  color: #3f414d;
}

.ivu-btn.ivu-btn-primary.ivu-btn-small:not(.ivu-btn-loading) {
  padding: 2px 10px !important;
}
td.ivu-table-expanded-cell {
  background-color: white !important;
}
</style>



