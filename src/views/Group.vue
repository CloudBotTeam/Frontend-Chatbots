<template>
  <div class="animated fadeIn">

    <Row>
        <div style="" class="doc-header">
            <h1>Group List</h1>
        </div>
        <br>
        
        <Col :md="24">   
            <div style="position:relative;">
                <Table :columns="columns7" :data="page_group_list" ref="table"></Table>    
            </div>

            <Page
                :total="this.group_list.length"
                show-total
                @on-change="setInitPage"
                style="text-align:right;margin-top:50px"
            ></Page>
        </Col>
    </Row>

    <Button type="primary" size="large" icon="android-add-circle" 
            style="padding-bottom:5px; margin-top: 10px" @click="jumpadd">创建群</Button>
    
    <Poptip confirm title="确定要删除所有群吗？" @on-ok="deleteAll">
        <Button type="error" size="large" icon="android-remove-circle" 
                style="padding-bottom:5px; margin-top: 10px">删除所有群</Button>
    </Poptip>

  </div>
</template>

<script>
export default {
    name: "buttons",
    data() {
        return {
          group_list:[],
    
          pageindex: 1,
          page_group_list: [],

          columns7: [
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
            /*
            {
              title: "创建时间",
              ellipsis: "true",
              key: "timestamp"
            },*/
            {
              title: "类型",
              key: "group_type",
              ellipsis: "true",
            },
            
            {
                title: "操作",
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
                                            this.group_list[(this.pageindex - 1) * 10 + params.index].group_id
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
      this.$http.delete('/groups/' + this.group_list[index].group_id,{
        headers: {"Content-Type": "application/x-www-form-urlencoded"}
      })
      .then((response) => {
        console.log(response);  

        this.$Message.success('成功删除');
        
        //删除前端数据
        this.group_list.splice(index, 1);

        //更新page组件当前页视图
        //太坑了太坑了太坑了
        var page = this.pageindex;
        this.page_group_list = [];
        for (let i = (page - 1) * 10; i < (page - 1) * 10 + 10; i++) {
            if (i < this.group_list.length) {
            this.page_group_list.push(this.group_list[i]);
            }
        }
      })
      .catch((err) => {
        console.log('Chatbot delete请求错误：', err);
      })
    },
    setInitPage(page) {
      this.page_group_list = [];
      this.pageindex = page;
      let group_list = this.group_list;
      for (let i = (page - 1) * 10; i < (page - 1) * 10 + 10; i++) {
        if (i < group_list.length) {
          this.page_group_list.push(this.group_list[i]);
        }
      }
    },
    getGroupdata(){
        this.$http.get('/groups') //使用axios发送请求
        .then((res)=>{ //连接成功后回调函数
          console.log("get '/groups' 成功");
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
          console.log("连接错误"+err);
        });
    },
    jumpadd() {
      var maxid = '';
      for (let i = 0; i < this.group_list.length; i++) 
        if (this.group_list[i].group_id > maxid) maxid = this.group_list[i].group_id;

      this.$router.push({
        path: "/creategroup",
        query: {
          id: (parseInt(maxid) + 1).toString()
        }
      })      
    },
    // 确认删除所有群
    deleteAll(){
      //delete请求
      this.$http.delete('/groups',{
        headers: {"Content-Type": "application/x-www-form-urlencoded"}
      })
      .then((response) => {
        this.$Message.success('已删除所有群');
        //删除前端数据
        this.group_list = [];

        //更新page组件视图
        this.page_group_list = [];

        console.log(response);  
      })
      .catch((err) => {
        console.log("Group delete '/groups' 请求错误：", err);
      })
    },
  },
  mounted() {
    this.setInitPage(1);
    this.getGroupdata();
  }
};
</script>