<template>
  <div class="login-container" style="background:url(../../static/img/login.jpg); margin: 0px;overflow: hidden;">
    <div class="page-color">
      <Form ref="loginForm" autoComplete="on" :model="loginForm" :rules="loginRules"  class="card-box login-form">
        <h1 class="title">Chatbots</h1>
        <Form-item prop="email">
            <Input type="text" v-model="loginForm.email" placeholder="Username" autoComplete="on">
                <Icon type="ios-person-outline" slot="prepend" ></Icon>
            </Input>
        </Form-item>
        <Form-item prop="password">
            <Input type="password" v-model="loginForm.password" placeholder="Password" @keyup.enter.native="handleLogin">
                <Icon type="ios-locked-outline" slot="prepend"></Icon>
            </Input>
        </Form-item>
        <Form-item>
            <Button style="font-size:17px" type="primary" @click="handleLogin('loginForm')" long>登录</Button>
        </Form-item>
        <div class='tips'>账号: admin@chatbots.com</div>
        <div class='tips'>密码: 随便</div>
      </Form>
    </div>
  </div>
</template>

<script>
    import { isWscnEmail } from 'utils/validate';

    export default {
      name: 'login',
      data() {
        const validateEmail = (rule, value, callback) => {
          if (!isWscnEmail(value)) callback(new Error('邮箱不合法'));
          else callback();
        };
        const validatePass = (rule, value, callback) => {
          if (value.length < 6) callback(new Error('密码不能小于6位'));
          else callback();
        };
        return {
          loginForm: {
            email: 'admin@chatbots.com',
            password: ''
          },
          loginRules: {
            email: [
                { required: true, trigger: 'blur', validator: validateEmail }
            ],
            password: [
                { required: true, trigger: 'blur', validator: validatePass }
            ]
          },
          loading: false,
          showDialog: false
        }
      },
      mounted () {
      },
      methods: {
        handleLogin() {
          this.$refs.loginForm.validate(valid => {
            if (valid) {
              this.loading = true;
              this.$store.dispatch('LoginByEmail', this.loginForm).then(() => {
                this.$Message.success('登录成功');
                this.loading = false;
                this.$router.push({ path: '/' });
              })
              .catch(err => {
                this.$message.error(err);
                this.loading = false;
              });
            } 
            else {
              console.log('error submit!!');
              return false;
            }
          });
        },
      },//methods
    }//export default
</script>

<style rel="stylesheet/scss" lang="scss">
    .page-color{
      width:100%;
      height:100%;
      background:rgba(40,57,101,.6);
    }
    .tips{
      font-size: 16px;
      color: #fff;
      margin-bottom: 5px;
    } 
    .login-container {
        height: 100vh;

        input:-webkit-autofill {
            -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
            -webkit-text-fill-color: #fff !important;
        }
        input {
            background: transparent;
            border: 1px solid #2d8cf0;
            -webkit-appearance: none;
            border-radius: 3px;
            padding: 12px 5px 12px 15px;
            color: #eeeeee;
            height: 47px;
            font-size: 16px;
        }
        .el-input {
            display: inline-block;
            height: 47px;
            width: 85%;
        }
        .svg-container {
            padding: 6px 5px 6px 15px;
            color: #889aa4;
        }

        .title {
            font-size: 46px;
            font-weight: 400;
            color: #eeeeee;
            margin: -20px auto 40px auto;
            text-align: center;
            font-weight: bold;
        }

        .login-form {
            position: absolute;
            left: 0;
            right: 0;
            width: 400px;
            padding: 35px 35px 15px 35px;
            margin: 140px auto;
        }

        .el-form-item {
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            color: #454545;
        }
    }

</style>
