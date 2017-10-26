<template>
	<el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;" :rules="formRules" v-loading="formLoading">
    <el-input type="hidden" v-model="form.id"></el-input>
    <el-form-item label="User Agent Name" prop="userAgentName">
      <el-input v-model="form.userAgentName" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="Register State in Contact Parameters">
      <el-tooltip :content="'Toggle to enable/disable'" placement="top">
        <el-switch
          v-model="form.registerStateInContactParams"
          on-color="#13ce66"
          off-color="#ff4949">
        </el-switch>
      </el-tooltip>
    </el-form-item>
    <el-form-item label="Dialog State in Contact Parameters">
      <el-tooltip :content="'Toggle to enable/disable'" placement="top">
        <el-switch
          v-model="form.dialogStateInContactParams"
          on-color="#13ce66"
          off-color="#ff4949">
        </el-switch>
      </el-tooltip>
    </el-form-item>
    <el-form-item label="Enable Options Routing">
      <el-tooltip :content="'Toggle to enable/disable'" placement="top">
        <el-switch
          v-model="form.enableOptionsRouting"
          on-color="#13ce66"
          off-color="#ff4949">
        </el-switch>
      </el-tooltip>
    </el-form-item>
    <el-form-item label="Disable Options Keep Alive">
      <el-tooltip :content="'Toggle to enable/disable'" placement="top">
        <el-switch
          v-model="form.disableOptionsKeepAlive"
          on-color="#13ce66"
          off-color="#ff4949">
        </el-switch>
      </el-tooltip>
    </el-form-item>
    <el-form-item label="Require RTP for Registrations">
      <el-tooltip :content="'Toggle to enable/disable'" placement="top">
        <el-switch
          v-model="form.requireRtpForRegistrations"
          on-color="#13ce66"
          off-color="#ff4949">
        </el-switch>
      </el-tooltip>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click.native="onSubmit">Submit</el-button>
    </el-form-item>
	</el-form>
</template>

<script>
  import Vue from 'vue';
  import util from '@/common/js/util';
  import UserAgentProxy from '@/proxies/UserAgentProxy';

  export default {
    data() {
      return {
        form: {
          id: 'user_agent',
          userAgentName: 'OSS Karoo Bridge',
          registerStateInContactParams: false,
          dialogStateInContactParams: false,
          enableOptionsRouting: false,
          disableOptionsKeepAlive: false,
          requireRtpForRegistrations: false,
        },
        formRules: {
          userAgentName: [
          { required: true, message: 'Please enter a valid User Agent Name', trigger: 'blur' },
          ],
        },
        formLoading: true,
      };
    },
    methods: {
      getUserAgent() {
        Vue.console.debug('getUserAgent');
        this.formLoading = true;
        // NProgress.start();
        new UserAgentProxy().find(this.form.id).then((response) => {
          if (typeof response !== 'undefined'
            && typeof response.id !== 'undefined'
            && response.id !== 'undefined') {
            Vue.console.debug(response);
            this.form = Object.assign({}, response);
            // just make sure
            this.form.id = 'user_agent';
            Vue.console.debug(this.form);
          } else {
            this.$refs.form.resetFields();
            this.form.id = 'user_agent';
            Vue.console.warn('No record found.');
            // this.listeners = [];
          }
          this.formLoading = false;
          // NProgress.done();
        });
      },
      onSubmit() {
        this.$refs.form.validate((valid) => {
          Vue.console.debug('onSubmit!');
          if (valid) {
            this.$confirm('Are you sure?', 'prompt', {}).then(() => {
              this.formLoading = true;
              // NProgress.start();
              const obj = Object.assign({}, this.form);
              obj.id = 'user_agent';
              new UserAgentProxy().create(obj).then((response) => {
              // listenerService.addListener(para).then((res) => {
                this.formLoading = false;
                // NProgress.done();
                this.$message({
                  message: 'Success',
                  type: 'success',
                });
                this.getUserAgent();
              }).catch((error) => {
                Vue.console.error(error);
                this.$message({
                  message: 'Error in creating record!',
                  type: 'error',
                });
              });
            });
          }
        });
      },
    },
    mounted() {
      this.getUserAgent();
    },
  };

</script>
