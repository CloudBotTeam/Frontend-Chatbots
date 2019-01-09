<template>
  <div class="animated fadeIn">

    <Row>
        <div style="" class="doc-header">
            <h1>添加群</h1>
        </div>
        <br>

        <Card>
            <Col span="12"><h6>机器人id: {{bot_id}}</h6></Col> 
            <Col span="12"><h6>类型: {{bot_type}}</h6></Col>   
            <br>
        </Card>
        <br><hr><br>
        
        <Col :md="24">
            <Form ref="formDynamic" :model="formDynamic" :label-width="80" style="width: 300px">
                <FormItem
                        v-for="(item, index) in formDynamic.items"
                        v-if="item.status"
                        :key="index"
                        :label="'群 ' + item.index"
                        :prop="'items.' + index + '.value'"
                        :rules="{required: true, message: '群 ' + item.index +'不能为空', trigger: 'blur'}">
                    <Row>
                        <Col span="18">
                            <Input type="text" v-model="item.value" placeholder="输入群名"></Input>
                        </Col>
                        <Col span="4" offset="1">
                            <Button @click="handleRemove(index)">移除</Button>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem>
                    <Row>
                        <Col span="12">
                            <Button type="dashed" long @click="handleAdd" icon="md-add">添加群</Button>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="Submit('formDynamic')">添加</Button>
                    <Button style="margin-left: 8px" @click="Cancel">取消</Button>
                </FormItem>
            </Form>
        </Col>

    </Row>
  </div>
</template>

<script>

export default {
    name: "buttons",
    data() {
        return {
            bot_id: this.$route.query.bot_id,
            bot_type:'',
            managed_groups: [],
            add_groups: [],

            index: 1,
            formDynamic: {
                items: [
                    {
                        value: '',
                        index: 1,
                        status: 1
                    }
                ]
            }
        }; //return
    }, //data
  
    methods: {
        getBotInfo(){
            this.$http.get(this.global.QueryAdd + ':' + this.global.gateWay + '/robots/:' + this.bot_id) //使用axios发送请求
            .then((res)=>{ //连接成功后回调函数
                console.log("BotAddGroup get '/robots' 成功");
                //type
                this.bot_type = res.data.bot_type;
                //managed_groups
                this.managed_groups = res.data.managed_groups;
            })
            .catch(function(err){
                console.log("BotAddGroup get '/robots' 错误:" + err)
            });
        },
        // 添加一个群的输入框
        handleAdd () {
            this.index++;
            this.formDynamic.items.push({
                value: '',
                index: this.index,
                status: 1
            });
        },
        // 移除一个输入框
        handleRemove (index) {
            this.formDynamic.items[index].status = 0;
        },
        Submit(name){
            //验证输入是否合法
            this.$refs[name].validate((valid) => {
                if (valid) {
                    for(let i = 0; i < this.formDynamic.items.length; i++)
                        this.add_groups.push(this.formDynamic.items[i].value);

                    //post请求
                    this.$http.post(this.global.QueryAdd + ':' + this.global.gateWay + '/robots/addgroups',{
                        bot_id: this.bot_id,
                        add_groups: this.add_groups,
                    })
                    .then((response) => {
                        this.$Message.success('添加成功');
                        this.$router.go(-1);
                        console.log(response);
                    })
                    .catch((err) => {
                        console.log("BotAddGroup post '/robots/addgroups' 请求错误：", err);
                    })
                } 
                else {
                    this.$Message.error('输入框不能为空');
                }
            })
        },
        Cancel() {
            this.$router.go(-1);
        },
    },
    mounted() {
        this.getGroupdata();
        this.getBotInfo();
    }
};
</script>