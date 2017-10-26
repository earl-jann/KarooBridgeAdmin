<template>
	<el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;" :rules="formRules" v-loading="formLoading">
    <el-input type="hidden" v-model="form.id"></el-input>
    <el-form-item label="SIP TCP Port Range">
        <el-input-number v-model="form.sipTcpPortBase" @change=""></el-input-number>
        <el-input-number v-model="form.sipTcpPortMax" @change=""></el-input-number>
    </el-form-item>
    <el-form-item label="RTP Proxy Port Range">
        <el-input-number v-model="form.rtpProxyPortBase" @change=""></el-input-number>
        <el-input-number v-model="form.rtpProxyPortMax" @change=""></el-input-number>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click.native="onSubmit">Submit</el-button>
    </el-form-item>
	</el-form>
</template>

<script>
  import Vue from 'vue';
  import util from '@/common/js/util';
  import PortRangesProxy from '@/proxies/PortRangesProxy';

  export default {
    data() {
      return {
        form: {
          id: 'port_ranges',
          sipTcpPortBase: 0,
          sipTcpPortMax: 0,
          rtpProxyPortBase: 0,
          rtpProxyPortMax: 0,
        },
        formRules: {
          sipTcpPortBase: [
          { required: true, message: 'Please enter a valid sipTcpPortBase', trigger: 'blur' },
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
        new PortRangesProxy().find(this.form.id).then((response) => {
          if (typeof response !== 'undefined'
            && typeof response.id !== 'undefined'
            && response.id !== 'undefined') {
            Vue.console.debug(response);
            this.form = Object.assign({}, response);
            // just make sure
            this.form.id = 'port_ranges';
            Vue.console.debug(this.form);
          } else {
            this.$refs.form.resetFields();
            this.form.id = 'port_ranges';
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
              obj.id = 'port_ranges';
              new PortRangesProxy().create(obj).then((response) => {
              // listenerService.addListener(para).then((res) => {
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
