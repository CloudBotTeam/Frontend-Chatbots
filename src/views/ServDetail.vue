<template>
    <div class="animated fadeIn"  style="margin-top:50px;">
        <Row>
            <Col span="24">
                <div style="" class="doc-header">
                    <h1>Information</h1>
                </div>
                <br>

                <Card>
                    <Col span="6"><h6>名称: {{serv_name}}</h6></Col> 
                    <Col span="6"><h6>ID: {{serv_id}}</h6></Col> 
                    <Col span="6"><h6>类型: {{serv_type}}</h6></Col>  
                    <br>
                </Card>

                <br><br>
                <h3>详情</h3>
                <br><hr><br>

                <p style="font-size: 20px">{{serv_description}}</p>
            </Col>
        </Row>
    </div>
</template>

<script>

    export default {
        data () {
            return {
                serv_name:'',
                serv_id:'',
                serv_type:'',
                serv_description:'',
            }
        },
        methods:{
            getServInfo(){
                this.$http.get('/services/:' + this.$route.params.id)
                .then((res)=>{
                    console.log(res.data.data);
                    this.serv_id = this.$route.params.id;
                    this.serv_name = res.data.data.serv_name;
                    this.serv_type = res.data.data.serv_type;
                    this.serv_description = res.data.data.serv_description;
                })
                .catch(function(err){
                    console.log("ServDetail get '/services' 请求错误：" + err);
                });
            },
        },

        mounted() {
            this.getServInfo();
        }
    }

</script>