<template>
	<el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;" :rules="formRules" v-loading="formLoading">
        <el-input type="hidden" v-model="form.id"></el-input>
        <i class="el-icon-information"> </i>
        <em>{{ $t('carp.header') }}</em>
        <el-form-item label="Enabled">
          <el-tooltip :content="$t('carp.enabled')" placement="top">
            <el-switch
              v-model="form.enabled"
              on-color="#13ce66"
              off-color="#ff4949"
              @change='resetFieldsIfOff'>
            </el-switch>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="Virtual IP Address" prop="virtualIpAddress">
          <el-tooltip :content="$t('carp.virtual_ip_address')" placement="top">
            <el-input v-model="form.virtualIpAddress" auto-complete="off"
            :disabled="disabled"></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="Interface Name" prop="interfaceName">
          <el-tooltip :content="$t('carp.interface_name')" placement="top">
            <el-input v-model="form.interfaceName" auto-complete="off"
              disabled></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="Description" prop="description">
          <el-tooltip :content="$t('carp.description')" placement="top">
            <el-input v-model="form.description" auto-complete="off"
              disabled></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="Source IP Address" prop="sourceAddress">
          <el-tooltip :content="$t('carp.src_address')" placement="top">
            <el-select v-model="sourceAddress" placeholder="Select"
            :loading='sourceAddressLoading' @change='assignListenerValuesToForm'>
              <el-option
                v-for="item in sourceAddresses"
                :key="item.id"
                :label="item.ipAddress + ':' + item.description"
                :value="item.ipAddress"
                :disabled="disabled">
              </el-option>
            </el-select>
          </el-tooltip>
        </el-form-item>
        <el-input type="hidden" v-model="form.upScript"></el-input>
        <el-input type="hidden" v-model="form.downScript"></el-input>
        <el-form-item label="CARP Password" prop="carpPassword">
          <el-tooltip :content="$t('carp.carp_password')" placement="top">
            <el-input type="password" :maxlength="16" v-model="form.carpPassword" auto-complete="off"
            :disabled="disabled"></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="VHID" prop="vhid">
          <el-tooltip :content="$t('carp.vhid')" placement="top">
            <el-input-number v-model="form.vhid" :min="1" :max="255"
            :disabled="disabled"></el-input-number>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="Preferred Master">
          <el-tooltip :content="$t('carp.preferred_master')" placement="top">
            <el-switch
              v-model="form.preferredMaster"
              on-color="#13ce66"
              off-color="#ff4949"
              :disabled="disabled">
            </el-switch>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="External Address">
          <el-tooltip :content="$t('carp.external_address')" placement="top">
            <el-input type="textarea" v-model="form.externalAddress"
            :disabled="disabled"></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="TCP Enabled">
          <el-tooltip :content="$t('carp.tcp_enabled')" placement="top">
            <el-switch
              v-model="form.tcpEnabled"
              on-color="#13ce66"
              off-color="#ff4949"
              disabled>
            </el-switch>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="UDP Enabled">
          <el-tooltip :content="$t('carp.udp_enabled')" placement="top">
            <el-switch
              v-model="form.udpEnabled"
              on-color="#13ce66"
              off-color="#ff4949"
              disabled>
            </el-switch>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="Websocket Enabled">
          <el-tooltip :content="$t('carp.ws_enabled')" placement="top">
            <el-switch
              v-model="form.wsEnabled"
              on-color="#13ce66"
              off-color="#ff4949"
              disabled>
            </el-switch>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="Secure Websocket Enabled">
          <el-tooltip :content="$t('carp.wss_enabled')" placement="top">
            <el-switch
              v-model="form.wssEnabled"
              on-color="#13ce66"
              off-color="#ff4949"
              disabled>
            </el-switch>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="TLS Enabled">
          <el-tooltip :content="$t('carp.tls_enabled')" placement="top">
            <el-switch
              v-model="form.tlsEnabled"
              on-color="#13ce66"
              off-color="#ff4949"
              disabled>
            </el-switch>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="SIP Port">
          <el-tooltip :content="$t('carp.sip_port')" placement="top">
            <el-input-number v-model="form.sipPort" :min="1" :max="65535"
            :disabled="true"></el-input-number>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="TLS Port">
          <el-tooltip :content="$t('carp.tls_port')" placement="top">
            <el-input-number v-model="form.tlsPort" :min="1" :max="65535"
            :disabled="true"></el-input-number>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="WS Port">
          <el-tooltip :content="$t('carp.ws_port')" placement="top">
            <el-input-number v-model="form.wsPort" :min="1" :max="65535"
            :disabled="true"></el-input-number>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="WSS Port">
          <el-tooltip :content="$t('carp.wss_port')" placement="top">
            <el-input-number v-model="form.wssPort" :min="1" :max="65535"
            :disabled="true"></el-input-number>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="Subnets">
          <el-tooltip :content="$t('carp.subnets')" placement="top">
            <el-input type="textarea" v-model="form.subnets" :disabled="true"></el-input>
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
  import CarpHaInterfaceProxy from '@/proxies/CarpHaInterfaceProxy';
  import InterfaceProxy from '@/proxies/InterfaceProxy';

  const FORM_ID = 'carp_ha_interface';
  export default {
    data() {
      const validateIpAddress = ((rule, value, callback) => {
        const ipRegex = /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/;
        let result = value.match(ipRegex);

        if (!result) {
          result = callback(new Error('Please input a Valid IP Address'));
        } else {
          result = callback();
        }
        return result;
      });
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
          { validator: validateIpAddress, trigger: 'blur' },
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
        sourceAddressLoading: true,
      };
    },
    methods: {
      getCarpHaInterface() {
        Vue.console.debug('getCarpHaInterface');
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
        const selectedListener = this.sourceAddresses.find(item => item.ipAddress === listenerIp);
        // store temp
        const tempVirtualIpAddress = this.form.virtualIpAddress;
        this.form = Object.assign({}, selectedListener);
        this.sourceAddress = selectedListener.ipAddress;
        this.form.sourceAddress = selectedListener.ipAddress;
        this.form.interfaceName = selectedListener.id;
        // put back temp
        this.form.virtualIpAddress = tempVirtualIpAddress;
        // just make sure
        this.form.vhid = '';
        this.form.id = FORM_ID;
        this.form.enabled = true;
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
        // We disable the option instead of the select input because of a bug in Element-Vue
        // resolved in 2.0.2: https://github.com/ElemeFE/element/issues/7969
        this.sourceAddress = '';
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
      this.getListeners();
      this.getCarpHaInterface();
    },
  };

</script>
