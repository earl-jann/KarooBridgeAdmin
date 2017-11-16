<template>
  <el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;" :rules="formRules" v-loading="formLoading">
    <el-input type="hidden" v-model="form.id"></el-input>
    <i class="el-icon-information"> </i>
    <em>{{ $t('homer.header') }}</em>
    <el-form-item label="Homer Enabled">
      <el-tooltip :content="$t('homer.homer_enabled')" placement="top">
        <el-switch
          v-model="form.homerEnabled"
          on-color="#13ce66"
          off-color="#ff4949">
        </el-switch>
      </el-tooltip>
    </el-form-item>
    <el-form-item label="Homer Version" prop="homerVersion">
      <el-tooltip :content="$t('homer.homer_version')" placement="top">
        <el-radio-group v-model="form.homerVersion">
          <el-radio-button label="1">Version 1</el-radio-button>
          <el-radio-button label="2">Version 2</el-radio-button>
        </el-radio-group>
      </el-tooltip>
    </el-form-item>
    <el-form-item label="Homer Host" prop="homerHost">
      <el-tooltip :content="$t('homer.homer_host')" placement="top">
        <el-input v-model="form.homerHost" auto-complete="off"></el-input>
      </el-tooltip>
    </el-form-item>
    <el-form-item label="Homer Port">
      <el-tooltip :content="$t('homer.homer_port')" placement="top">
        <el-input-number v-model="form.homerPort" :min="1" :max="65535"
          @change=""></el-input-number>
      </el-tooltip>
    </el-form-item>
    <el-form-item label="Homer Password" prop="homerPassword">
      <el-tooltip :content="$t('homer.homer_password')" placement="top">
        <el-input type="password" v-model="form.homerPassword" auto-complete="off"></el-input>
      </el-tooltip>
    </el-form-item>
    <el-form-item label="Homer Compression">
      <el-tooltip :content="$t('homer.homer_compression')" placement="top">
        <el-switch
          v-model="form.homerCompression"
          on-color="#13ce66"
          off-color="#ff4949">
        </el-switch>
      </el-tooltip>
    </el-form-item>
    <el-form-item label="Homer Id" prop="homerId">
      <el-tooltip :content="$t('homer.homer_id')" placement="top">
        <el-input v-model="form.homerId" auto-complete="off"></el-input>
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
  import HomerProxy from '@/proxies/HomerProxy';

  export default {
    data() {
      return {
        form: {
          id: 'homer',
          homerEnabled: false,
          homerVersion: 0,
          homerHost: '',
          homerPort: 0,
          homerPassword: '',
          homerCompression: false,
          homerId: '',
        },
        formRules: {
          homerVersion: [
          { required: true, message: 'Please select a Homer Version', trigger: 'blur' },
          ],
          homerHost: [
          { required: true, message: 'Please enter a valid Homer Host', trigger: 'blur' },
          ],
          homerPort: [
          { required: true, message: 'Please enter a valid Homer Port', trigger: 'blur' },
          ],
          homerId: [
          { required: true, message: 'Please enter a valid Homer Id', trigger: 'blur' },
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
        new HomerProxy().find(this.form.id).then((response) => {
          if (typeof response !== 'undefined'
            && typeof response.id !== 'undefined'
            && response.id !== 'undefined') {
            Vue.console.debug(response);
            this.form = Object.assign({}, response);
            // just make sure
            this.form.id = 'homer';
            Vue.console.debug(this.form);
          } else {
            this.$refs.form.resetFields();
            this.form.id = 'homer';
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
              obj.id = 'homer';
              new HomerProxy().create(obj).then((response) => {
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
