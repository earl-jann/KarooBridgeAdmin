<template>
  <el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;" :rules="formRules" v-loading="formLoading">
    <el-input type="hidden" v-model="form.id"></el-input>
    <el-form-item label="RTP Proxy Read Timeout">
      <el-tooltip :content="$t('rtpProxy.read_timeout')" placement="top">
        <el-input-number v-model="form.rtpProxyReadTimeout" :min="0" :max="3600"
          @change=""></el-input-number> 
      </el-tooltip>
    </el-form-item>
    <el-form-item label="RTP Proxy Transport Thread Count">
      <el-tooltip :content="$t('rtpProxy.transport_thread_count')" placement="top">
        <el-input-number v-model="form.rtpProxyTransportThreadCount" :min="1" :max="100000"
          @change=""></el-input-number>
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
  import RtpProxyProxy from '@/proxies/RtpProxyProxy';

  const FORM_ID = 'rtpproxy';

  export default {
    data() {
      return {
        form: {
          id: FORM_ID,
          rtpProxyReadTimeout: 0,
          rtpProxyTransportThreadCount: 0,
        },
        formLoading: true,
      };
    },
    methods: {
      getObject() {
        Vue.console.debug('getObject');
        this.formLoading = true;
        // NProgress.start();
        new RtpProxyProxy().find(this.form.id).then((response) => {
          if (typeof response !== 'undefined'
            && typeof response.id !== 'undefined'
            && response.id !== 'undefined') {
            Vue.console.debug(response);
            this.form = Object.assign({}, response);
            // just make sure
            this.form.id = FORM_ID;
            Vue.console.debug(this.form);
          } else {
            this.$refs.form.resetFields();
            this.form.id = FORM_ID;
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
              obj.id = FORM_ID;
              new RtpProxyProxy().create(obj).then((response) => {
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
