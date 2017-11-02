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
          <el-input v-model="form.virtualIpAddress" auto-complete="off"
          :disabled="disabled"></el-input>
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
          <el-select v-model="sourceAddress" placeholder="Select"
          :loading='sourceAddressLoading' @change='assignListenerValuesToForm'
          :disabled="disabled">
            <el-option
              v-for="item in sourceAddresses"
              :key="item.id"
              :label="item.ipAddress + ':' + item.description"
              :value="item.ipAddress">
            </el-option>
          </el-select>
        </el-form-item>
        <el-input type="hidden" v-model="form.upScript"></el-input>
        <el-input type="hidden" v-model="form.downScript"></el-input>
        <el-form-item label="CARP Password" prop="carpPassword">
          <el-input type="password" v-model="form.carpPassword" auto-complete="off"
          :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="VHID">
          <el-input-number v-model="form.vhid" :min="1" :max="255"
          :disabled="disabled"></el-input-number>
        </el-form-item>
        <el-form-item label="Preferred Master">
          <el-tooltip :content="'Toggle to enable/disable'" placement="top">
            <el-switch
              v-model="form.preferredMaster"
              on-color="#13ce66"
              off-color="#ff4949"
              :disabled="disabled">
            </el-switch>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="External Address">
          <el-input type="textarea" v-model="form.externalAddress"
          :disabled="disabled"></el-input>
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

  const FORM_ID = 'carp_ha_interface';
  export default {
    data() {
      const checkVirtualIpAddress = ((rule, value, callback) => {
        let result = '';
        if (!value) {
          result = callback(new Error('Please input the Virtual IP Address'));
        }
        if (this.form.sourceAddress === value) {
          result = callback(new Error('Virtual IP Address conflict with Source IP Address!'));
        } else {
          result = callback();
        }
        return result;
      });
      return {
        form: {
          id: FORM_ID,
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
          virtualIpAddress: [
          { validator: checkVirtualIpAddress, trigger: 'blur' },
          ],
          description: [
          { required: true, message: 'Please enter a valid description', trigger: 'blur' },
          ],
          sourceAddress: [
          { required: true, message: 'Please select a Source IP Address', trigger: 'blur' },
          ],
          carpPassword: [
          { required: true, message: 'Please enter a valid password', trigger: 'blur' },
          ],
          vhid: [
          { required: true, message: 'Please enter a valid vhid', trigger: 'blur' },
          ],
        },
        disabled: false,
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
            this.form.id = FORM_ID;
            this.disabled = !this.form.enabled;
            Vue.console.debug('getCarpHaInterface: ' + this.form);
          } else {
            this.$refs.form.resetFields();
            this.form.id = FORM_ID;
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
      assignListenerValuesToForm(listenerIp) {
        Vue.console.log('listener: ' + listenerIp);
        Vue.console.log('form: ' + this.form);
        const selectedListener = this.sourceAddresses.find(item => item.ipAddress === listenerIp);
        Vue.console.log('listener selected: ' + selectedListener);
        this.form = Object.assign({}, selectedListener);
        this.sourceAddress = selectedListener.ipAddress;
        this.form.sourceAddress = selectedListener.ipAddress;
        // just make sure
        this.form.id = FORM_ID;
        this.form.enabled = true;
        Vue.console.log('form: ' + this.form);
      },
      resetForm() {
        this.form = {
          id: FORM_ID,
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
        };
      },
      resetFieldsIfOff(value) {
        this.$refs.form.resetFields();
        if (value === false) {
          this.resetForm();
          this.disabled = true;
        } else {
          this.disabled = false;
        }
        this.form.id = FORM_ID;
      },
      shouldValidateFields() {
        return this.form.enabled === true;
      },
      submitForm() {
        this.$confirm('Are you sure?', 'prompt', {}).then(() => {
          this.formLoading = true;
          // NProgress.start();
          const obj = Object.assign({}, this.form);
          obj.id = FORM_ID;
          new CarpHaInterfaceProxy().create(obj).then((response) => {
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
      },
      onSubmit() {
        if (this.form.enabled === false) {
          Vue.console.log('onSubmit! ' + this.form.enabled);
          this.$refs.form.resetFields();
          this.submitForm();
        } else {
          this.$refs.form.validate((valid) => {
            Vue.console.log('onSubmit!');
            if (valid) {
              this.submitForm();
            }
          });
        }
      },
    },
    mounted() {
      this.getCarpHaInterface();
      this.getListeners();
    },
  };

</script>
