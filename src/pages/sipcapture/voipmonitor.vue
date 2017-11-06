<template>
  <el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;" :rules="formRules" v-loading="formLoading">
    <el-input type="hidden" v-model="form.id"></el-input>
    <el-form-item label="MySQL Host" prop="mySqlHost">
      <el-input v-model="form.mySqlHost" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="MySQL Port">
      <el-input-number v-model="form.mySqlPort"
          :min="1" :max="65535" @change=""></el-input-number>
    </el-form-item>
    <el-form-item label="MySQL Username" prop="mySqlUsername">
      <el-input v-model="form.mySqlUsername" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="MySQL Password" prop="mySqlPassword">
      <el-input type="password" v-model="form.mySqlPassword" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click.native="onSubmit">Submit</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import Vue from 'vue';
  import util from '@/common/js/util';
  import VoipMonitorProxy from '@/proxies/VoipMonitorProxy';

  export default {
    data() {
      return {
        form: {
          id: 'voipmonitor',
          mySqlHost: '',
          mySqlPort: 0,
          mySqlUsername: '',
          mySqlPassword: '',
        },
        formRules: {
          mySqlHost: [
          { required: true, message: 'Please enter a valid MySQL Host', trigger: 'blur' },
          ],
          mySqlUsername: [
          { required: true, message: 'Please enter a valid MySQL Username', trigger: 'blur' },
          ],
          mySqlPassword: [
          { required: true, message: 'Please enter a valid MySQL Password', trigger: 'blur' },
          ],
        },
        formLoading: true,
      };
    },
    methods: {
      getObject() {
        Vue.console.debug('getObject');
        this.formLoading = true;
        // NProgress.start();
        new VoipMonitorProxy().find(this.form.id).then((response) => {
          if (typeof response !== 'undefined'
            && typeof response.id !== 'undefined'
            && response.id !== 'undefined') {
            Vue.console.debug(response);
            this.form = Object.assign({}, response);
            // just make sure
            this.form.id = 'voipmonitor';
            Vue.console.debug(this.form);
          } else {
            this.$refs.form.resetFields();
            this.form.id = 'voipmonitor';
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
              obj.id = 'voipmonitor';
              new VoipMonitorProxy().create(obj).then((response) => {
                this.formLoading = false;
                // NProgress.done();
                this.$message({
                  message: 'Success',
                  type: 'success',
                });
                this.getObject();
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
      this.getObject();
    },
  };

</script>
