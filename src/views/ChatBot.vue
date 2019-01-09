b<template>
  <div class="animated fadeIn">

    <Row>
      <div style="" class="doc-header">
        <h1>ChatBot</h1>
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
    <Poptip placement="top" width="200">
        <Button type="primary" size="large" icon="android-add-circle" 
            style="padding-bottom:5px; margin-top: 10px">创建机器人</Button>
        <div class="api" slot="content">
          <Form :model="formItem" :label-width="25">
            <p>选择机器人类型:</p><br>
            <FormItem>
                <RadioGroup type="button" @on-change="selectType">
                    <Radio label="qq"></Radio>
                    <Radio label="wechat"></Radio>
                </RadioGroup>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="Create" style="width: 115px" 
                        icon="android-add-circle">创建</Button>
            </FormItem>
          </Form>
        </div>
    </Poptip>
    <Poptip confirm title="确定要删除所有机器人吗？" @on-ok="deleteAll">
        <Button type="error" size="large" icon="android-remove-circle" 
                style="padding-bottom:5px; margin-top: 10px">删除所有机器人</Button>
    </Poptip>
  </div>
</template>

<script>
export default {
    name: "buttons",
    data() {
        return {
            bot_list: [],
    
            pageindex: 1,
            page_bot_list: [],

            create_bot_type: '',

            columns7: [
              {
                title: "机器人id",
                ellipsis: "true",
                key: "bot_id"
              },
              {
                title: "类型",
                key: "bot_type",
                ellipsis: "true",
              },
              {
                title: "状态",
                ellipsis: "true",
               
                render: (h, params) => {
                  const status = parseInt(params.row.botStatus);
                  console.log(params);

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
                  else if (status === 3)
                    return h("div", [
                      h(
                        "Tag",
                        {
                          props: {
                            type: "dot",
                            color: "grey"
                          }
                        },
                        "未登录"
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
        this.$http.delete(this.global.QueryAdd + ':' + this.global.gateWay + '/robots/' + this.bot_list[index].bot_id,{
          headers: {"Content-Type": "application/x-www-form-urlencoded"}
        })
        .then((response) => {
          console.log(response);  

          this.$Message.success('成功删除机器人' + this.bot_list[index].bot_id);

          //删除前端数据
          this.bot_list.splice(index, 1);

          //更新page组件当前页视图
          var page = this.pageindex;
          this.page_bot_list = [];
          for (let i = (page - 1) * 10; i < (page - 1) * 10 + 10; i++) {
            if (i < this.bot_list.length) {
              this.page_bot_list.push(this.bot_list[i]);
            }
          }
        })
        .catch((err) => {
          console.log('Chatbot delete请求错误：', err);
        })
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
        this.$http.get(this.global.QueryAdd + ':' + this.global.gateWay + '/robots') //使用axios发送请求
          .then((res)=>{ //连接成功后回调函数
            console.log("ChatBot get '/robots' 成功");
            this.bot_list = res.data;

            for(let i = 0; i < this.bot_list.length; i++)
              this.bot_list[i].bot_type = res.data[i].entity.bot_type;

            //显示第一页 解决page_bot_list视图不及时渲染的问题
            this.pageindex = 1;
            for (let i = 0; i < 10; i++) {
              if (i < this.bot_list.length) {
                this.page_bot_list.push(this.bot_list[i]);
              }
            }
          })
          .catch((err) => {
            console.log("Chatbot get '/robots' 请求错误：", err);
          });
      },
      // 确认删除所有bot
      deleteAll(){ 
        //delete请求
        this.$http.delete(this.global.QueryAdd + ':' + this.global.gateWay + '/robots',{
          headers: {"Content-Type": "application/x-www-form-urlencoded"}
        })
        .then((response) => {
          console.log("Chatbot delete '/robots' 成功：", response);  

          this.$Message.success('已删除所有机器人');
          //删除前端数据
          this.bot_list = [];
          //更新page组件视图
          this.page_bot_list = [];
        })
        .catch((err) => {
          console.log("Chatbot delete '/robots' 请求错误：", err);
        })
      },

      //选中的bot_type
      selectType(selected_type) {
        this.create_bot_type = selected_type;
        console.log("type: ", this.create_bot_type)
      },

      //创建bot
      Create(){
        //未选择类型
        if(this.create_bot_type == '')
            this.$Message.error('请选择机器人类型');
        //满足条件
        else{
          //post请求
          this.$http.post(this.global.QueryAdd + ':' + this.global.gateWay + '/robots',{
            bot_type: this.create_bot_type,      
          })
          .then((response) => {
            this.$Message.success('创建成功');
            console.log(response);
          })
          .catch((err) => {
            console.log("ChatBot post '/robots' 请求错误：", err);
          })
        }
      },
    },

    mounted() {
      this.setInitPage(1);
      this.getBotdata();
    },
};
</script>