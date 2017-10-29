<template>
	<el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;" :rules="formRules" v-loading="formLoading">
        <el-input type="hidden" v-model="form.id"></el-input>
        <el-form-item label="Enabled">
          <el-tooltip :content="'Toggle to enable/disable'" placement="top">
            <el-switch
              v-model="form.enabled"
              on-color="#13ce66"
              off-color="#ff4949"
              @change='resetFieldsIfOff'>
            </el-switch>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="Virtual IP Address" prop="virtualIpAddress">
          <el-input v-model="form.virtualIpAddress" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Interface Name" prop="interfaceName">
          <el-input v-model="form.interfaceName" auto-complete="off"
            disabled></el-input>
        </el-form-item>
        <el-form-item label="Description" prop="description">
          <el-input v-model="form.description" auto-complete="off"
            disabled></el-input>
        </el-form-item>
        <el-form-item label="Source IP Address" prop="sourceAddress">
          <!-- <el-input v-model="form.sourceAddress" auto-complete="off"></el-input> -->
          <el-select v-model="sourceAddress" clearable placeholder="Select"
          :loading='sourceAddressLoading' @change='assignListenerValuesToForm'>
            <el-option
              v-for="item in sourceAddresses"
              :key="item.id"
              :label="item.description"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-input type="hidden" v-model="form.upScript"></el-input>
        <el-input type="hidden" v-model="form.downScript"></el-input>
        <!-- <el-form-item label="Up Script">
          <el-input type="textarea" v-model="form.upScript"></el-input>
        </el-form-item>
        <el-form-item label="Down Script">
          <el-input type="textarea" v-model="form.downScript"></el-input>
        </el-form-item> -->
        <el-form-item label="CARP Password" prop="carpPassword">
          <el-input type="password" v-model="form.carpPassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="VHID">
          <el-input-number v-model="form.vhid" :min="1" :max="255"></el-input-number>
        </el-form-item>
        <el-form-item label="Preferred Master">
          <el-tooltip :content="'Toggle to enable/disable'" placement="top">
            <el-switch
              v-model="form.preferredMaster"
              on-color="#13ce66"
              off-color="#ff4949">
            </el-switch>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="External Address">
          <el-input type="textarea" v-model="form.externalAddress"></el-input>
        </el-form-item>
        <el-form-item label="TCP Enabled">
          <el-tooltip :content="'Toggle to enable/disable'" placement="top">
            <el-switch
              v-model="form.tcpEnabled"
              on-color="#13ce66"
              off-color="#ff4949"
              disabled>
            </el-switch>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="UDP Enabled">
          <el-tooltip :content="'Toggle to enable/disable'" placement="top">
            <el-switch
              v-model="form.udpEnabled"
              on-color="#13ce66"
              off-color="#ff4949"
              disabled>
            </el-switch>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="Websocket Enabled">
          <el-tooltip :content="'Toggle to enable/disable'" placement="top">
            <el-switch
              v-model="form.wsEnabled"
              on-color="#13ce66"
              off-color="#ff4949"
              disabled>
            </el-switch>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="Secure Websocket Enabled">
          <el-tooltip :content="'Toggle to enable/disable'" placement="top">
            <el-switch
              v-model="form.wssEnabled"
              on-color="#13ce66"
              off-color="#ff4949"
              disabled>
            </el-switch>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="TLS Enabled">
          <el-tooltip :content="'Toggle to enable/disable'" placement="top">
            <el-switch
              v-model="form.tlsEnabled"
              on-color="#13ce66"
              off-color="#ff4949"
              disabled>
            </el-switch>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="SIP Port">
          <el-input-number v-model="form.sipPort" :min="0" :max="200000"
          :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="TLS Port">
          <el-input-number v-model="form.tlsPort" :min="0" :max="200000"
          :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="WS Port">
          <el-input-number v-model="form.wsPort" :min="0" :max="200000"
          :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="WSS Port">
          <el-input-number v-model="form.wssPort" :min="0" :max="200000"
          :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="Subnets">
          <el-input type="textarea" v-model="form.subnets" :disabled="true"></el-input>
        </el-form-item>

    <el-form-item>
      <el-button type="primary" @click.native="onSubmit">Submit</el-button>
    </el-form-item>
	</el-form>
</template>

<script>
  import Vue from 'vue';
  import util from '@/common/js/util';
  import CarpHaInterfaceProxy from '@/proxies/CarpHaInterfaceProxy';
  import InterfaceProxy from '@/proxies/InterfaceProxy';

  export default {
    data() {
      return {
        form: {
          id: 'carp_ha_interface',
          enabled: false,
          virtualIpAddress: '',
          interfaceName: '',
          description: '',
          sourceAddress: '',
          upScript: '',
          downScript: '',
          carpPassword: '',
          vhid: '',
          preferredMaster: false,
          externalAddress: '',
          tcpEnabled: false,
          udpEnabled: false,
          wsEnabled: false,
          wssEnabled: false,
          tlsEnabled: false,
          sipPort: '',
          tlsPort: '',
          wsPort: '',
          wssPort: '',
          subnets: '',
        },
        sourceAddress: '',
        sourceAddresses: [],
        formRules: {
          description: [
          { required: true, message: 'Please enter a valid description', trigger: 'blur' },
          ],
        },
        formLoading: true,
        sourceAddressLoading: false,
      };
    },
    methods: {
      getCarpHaInterface() {
        Vue.console.debug('getCarpHaInterface');
        // {"where":{"id":"earl"}}
        // filter[where][property]=value
        // const params = {
        //   page: this.page,
        //   id: this.filters.id,
        // };
        this.formLoading = true;
        // NProgress.start();
        new CarpHaInterfaceProxy().find(this.form.id).then((response) => {
          if (typeof response !== 'undefined'
            && typeof response.id !== 'undefined'
            && response.id !== 'undefined') {
            Vue.console.debug(response);
            this.form = Object.assign({}, response);
            // just make sure
            this.form.id = 'carp_ha_interface';
            Vue.console.debug('getCarpHaInterface: ' + this.form);
          } else {
            this.$refs.form.resetFields();
            this.form.id = 'carp_ha_interface';
            Vue.console.warn('No record found.');
            // this.sourceAddresses = [];
          }
          this.formLoading = false;
          // NProgress.done();
        });
      },
      getListeners() {
        this.sourceAddressLoading = true;
        // NProgress.start();
        new InterfaceProxy().findAll().then((response) => {
          if (typeof response !== 'undefined'
            && response.length > 0
            && typeof response[0].id !== 'undefined'
            && response[0].id !== 'undefined') {
            this.sourceAddresses = response;
          } else {
            this.sourceAddresses = [];
          }
          this.sourceAddressLoading = false;
          // NProgress.done();
        });
      },
      assignListenerValuesToForm(listenerId) {
        Vue.console.log('listener: ' + listenerId);
        Vue.console.log('form: ' + this.form);
        const selectedListener = this.sourceAddresses.find(item => item.id === listenerId);
        Vue.console.log('listener selected: ' + selectedListener);
        this.form = Object.assign({}, selectedListener);
        // just make sure
        this.form.id = 'carp_ha_interface';
        Vue.console.log('form: ' + this.form);
      },
      resetFieldsIfOff(value) {
        if (value === false) {
          this.form.externalAddress = '';
          this.form.vhid = '';
          this.$refs.form.resetFields();
          this.form.id = 'carp_ha_interface';
        }
      },
      onSubmit() {
        this.$refs.form.validate((valid) => {
          Vue.console.debug('onSubmit!');
          if (valid) {
            this.$confirm('Are you sure?', 'prompt', {}).then(() => {
              this.formLoading = true;
              // NProgress.start();
              const obj = Object.assign({}, this.form);
              obj.id = 'carp_ha_interface';
              new CarpHaInterfaceProxy().create(obj).then((response) => {
              // listenerService.addListener(para).then((res) => {
                this.formLoading = false;
                // NProgress.done();
                this.$message({
                  message: 'Success',
                  type: 'success',
                });
                this.getCarpHaInterface();
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
      this.getCarpHaInterface();
      this.getListeners();
    },
  };

</script>
