<template>
	<el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;" :rules="formRules" v-loading="formLoading">
    <el-input type="hidden" v-model="form.id"></el-input>
    <el-form-item label="SIP TCP Port Range" prop="sipTcpPortMax">
      <div class="input-inline">
        <el-form-item prop="sipTcpPortBase">
          <el-tooltip :content="$t('ports.sip_tcp_port_base')" placement="top">
            <el-input-number v-model="form.sipTcpPortBase" :min="1" :max="65535" @change=""></el-input-number>
          </el-tooltip>
        </el-form-item>
      </div>
      <div class="input-inline">
        <el-form-item>
          <el-tooltip :content="$t('ports.sip_tcp_port_max')" placement="top">
            <el-input-number v-model="form.sipTcpPortMax" :min="1" :max="65535" @change=""></el-input-number>
          </el-tooltip>
        </el-form-item>
      </div>
    </el-form-item>
    <el-form-item label="RTP Proxy Port Range" prop="rtpProxyPortMax">
      <div class="input-inline">
          <el-form-item prop="rtpProxyPortBase">
            <el-tooltip :content="$t('ports.rtp_proxy_port_base')" placement="top">
              <el-input-number v-model="form.rtpProxyPortBase" :min="1" :max="65535" @change=""></el-input-number>
            </el-tooltip>
          </el-form-item>
        </div>
        <div class="input-inline">
          <el-form-item>
            <el-tooltip :content="$t('ports.rtp_proxy_port_max')" placement="top">
              <el-input-number v-model="form.rtpProxyPortMax" :min="1" :max="65535" @change=""></el-input-number>
            </el-tooltip>
          </el-form-item>
      </div>
    </el-form-item>
    <el-form-item label="Transcoder Port Range" prop="transcoderPortMax">
      <div class="input-inline">
          <el-form-item prop="transcoderPortBase">
            <el-tooltip :content="$t('ports.transcoder_port_base')" placement="top">
              <el-input-number v-model="form.transcoderPortBase" :min="1" :max="65535" @change=""></el-input-number>
            </el-tooltip>
          </el-form-item>
        </div>
        <div class="input-inline">
          <el-form-item>
            <el-tooltip :content="$t('ports.transcoder_port_max')" placement="top">
              <el-input-number v-model="form.transcoderPortMax" :min="1" :max="65535" @change=""></el-input-number>
            </el-tooltip>
          </el-form-item>
      </div>
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
      const checkSipTcpPortMaxRange = ((rule, value, callback) => {
        let result = '';
        if (!value) {
          result = callback(new Error('Please input the Max Port Range!'));
        }
        if (this.form.sipTcpPortBase > value) {
          result = callback(new Error('Maximum Port should be greater than or equal to Minimum Port!'));
        } else {
          result = callback();
        }
        return result;
      });

      const checkRtpProxyPortMaxRange = ((rule, value, callback) => {
        let result = '';
        if (!value) {
          result = callback(new Error('Please input the Max Port Range!'));
        }
        if (this.form.rtpProxyPortBase > value) {
          result = callback(new Error('Maximum Port should be greater than or equal to Minimum Port!'));
        } else {
          result = callback();
        }
        return result;
      });

      const checkTranscoderPortMaxRange = ((rule, value, callback) => {
        let result = '';
        if (!value) {
          result = callback(new Error('Please input the Max Port Range!'));
        }
        if (this.form.transcoderPortBase > value) {
          result = callback(new Error('Maximum Port should be greater than or equal to Minimum Port!'));
        } else {
          result = callback();
        }
        return result;
      });

      return {
        form: {
          id: 'port_ranges',
          sipTcpPortBase: 0,
          sipTcpPortMax: 0,
          rtpProxyPortBase: 0,
          rtpProxyPortMax: 0,
          transcoderPortBase: 0,
          transcoderPortMax: 0,
        },
        formRules: {
          sipTcpPortMax: [
          { validator: checkSipTcpPortMaxRange, trigger: 'blur' },
          ],
          rtpProxyPortMax: [
          { validator: checkRtpProxyPortMaxRange, trigger: 'blur' },
          ],
          transcoderPortMax: [
          { validator: checkTranscoderPortMaxRange, trigger: 'blur' },
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

<style scoped>
  .input-inline {
    display: inline-block;
  }
</style>
