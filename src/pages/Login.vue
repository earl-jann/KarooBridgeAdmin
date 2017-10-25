<template>
  <el-form :model="userForm" :rules="rules2" ref="userForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">System Login</h3>
    <el-form-item prop="username">
      <el-input type="text" v-model="userForm.username" auto-complete="off" placeholder="username"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="userForm.checkPass" auto-complete="off" placeholder="password"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">Remember password</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="loggingIn">Login</el-button>
      <!--<el-button @click.native.prevent="handleReset2">Reset</el-button>-->
    </el-form-item>
  </el-form>
</template>

<script>
  import Vue from 'vue';
  // import NProgress from 'nprogress'
  export default {
    data() {
      return {
        loggingIn: false,
        userForm: {
          username: 'admin',
          checkPass: '123456',
        },
        rules2: {
          username: [
            { required: true, message: 'Please input your username', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          checkPass: [
            { required: true, message: 'Please enter your password', trigger: 'blur' },
            //{ validator: validaePass2 }
          ],
        },
        checked: true,
      };
    },
    methods: {
      handleReset2() {
        this.$refs.userForm.resetFields();
      },
      /**
       * Will log the user in.
       *
       * @param {Object} user The user to be logged in.
       */
      login(user) {
        this.$store.dispatch('auth/login', user);
      },
      handleSubmit2(ev) {
        const self = this;
        this.$refs.userForm.validate((valid) => {
          if (valid) {
            self.loggingIn = true;
            // NProgress.start();
            const loginParams = {
              username: self.userForm.username,
              password: self.userForm.checkPass,
            };
            this.$store.dispatch('auth/login', loginParams).then((response) => {
              self.loggingIn = false;
            }).catch((error) => {
              self.loggingIn = false;
              self.$message({
                message: error.statusCode + ' : ' + error.message,
                type: 'error',
              });
            });
          } else {
            self.$message({
              message: 'Invalid Username/Password',
              type: 'error',
            });
            return false;
          }
          return true;
        });
      },
    },
  };

</script>

<style lang="scss" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>
