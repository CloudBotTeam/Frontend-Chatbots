<template>
    <div>
        <h4>输入新机器人信息</h4>
        <br><hr><br>
        <Form :model="formItem" :label-width="80">
            <FormItem label="机器人类型">
                <RadioGroup v-model="button1" type="button" @on-change="selectType">
                    <Radio label="qq"></Radio>
                    <Radio label="wechat"></Radio>
                </RadioGroup>
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
                radio: 'qq',
            },
            bot_type: '',
        }
    },
    methods: {
        selectType(selected_type) {
            this.bot_type = selected_type;
        },
        Create(){
            //未选择类型
            if(this.bot_type == '')
                this.$Message.error('请选择机器人类型');
            //满足条件
            else{
                //post请求
                console.log(this.bot_type);
                this.$http.post(this.global.QueryAdd + ':' + this.global.gateWay + '/robots',{
                    data:{
                        bot_type: this.bot_type
                    },
                    headers: {
                        "Content-Type": "application/json",
                    },      
                },{
                    emulateJSON: true
                })
                .then((response) => {
                    this.$Message.success('创建成功');
                    this.$router.go(-1);
                    console.log(response);
                })
                .catch((err) => {
                    console.log("CreateBot post '/robots' 请求错误：", err);
                })
            }
        },
        Cancel() {
            this.$router.go(-1);
        },
    },
    mounted() {
    }
};
    
</script>

