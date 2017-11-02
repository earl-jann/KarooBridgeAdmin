<template>
  <el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;" :rules="formRules" v-loading="formLoading">
    <el-input type="hidden" v-model="form.id"></el-input>
    <el-form-item label="Packet Rate Min/Max Treshold">
        <el-input-number v-model="form.packetRateMinTreshold" @change=""></el-input-number>
        <el-input-number v-model="form.packetRateMaxTreshold" @change=""></el-input-number>
    </el-form-item>
    <el-form-item label="Packet Rate Treshold Ban Duration">
        <el-input-number v-model="form.packetRateTresholdBanDuration" @change=""></el-input-number>
    </el-form-item>
<!--     <el-form-item label="Packet Rate Whitelist">
      <el-input v-model="form.packetRateWhitelist" type="textarea" placeholder=""></el-input>
    </el-form-item> -->
    <el-input type="hidden" v-model="form.packetRateWhitelist"></el-input>
    <el-form-item label="Execute On Ban Script">
      <input type="file" ref="executeOnBan" :name="executeOnBan"
      accept=".sh" @change="filesChange('executeOnBan', $event)">
      </input>
    </el-form-item>
    <el-form-item label="Auto Null Route On Ban Enabled">
      <el-tooltip :content="'Toggle to enable/disable'" placement="top">
        <el-switch
          v-model="form.autoNullRouteOnBan"
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
  import AutobanProxy from '@/proxies/AutobanProxy';

  export default {
    data() {
      return {
        form: {
          id: 'autoban',
          packetRateMinTreshold: 0,
          packetRateMaxTreshold: 0,
          packetRateTresholdBanDuration: 0,
          packetRateWhitelist: '',
          executeOnBan: '',
          autoNullRouteOnBan: false,
        },
        executeOnBan: '',
        formRules: {
          packetRateWhitelist: [
          { required: true, message: 'Please enter a valid whitelist', trigger: 'blur' },
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
        new AutobanProxy().find(this.form.id).then((response) => {
          if (typeof response !== 'undefined'
            && typeof response.id !== 'undefined'
            && response.id !== 'undefined') {
            Vue.console.debug(response);
            this.form = Object.assign({}, response);
            // just make sure
            this.form.id = 'autoban';
            Vue.console.log('packetRateWhitelist: ' + this.form.packetRateWhitelist);
            Vue.console.debug(this.form);
          } else {
            this.$refs.form.resetFields();
            this.form.id = 'autoban';
            Vue.console.warn('No record found.');
          }
          // we reset the file upload fields
          this.$refs.executeOnBan = '';
          this.formLoading = false;
          // NProgress.done();
        });
      },
      filesChange(fieldName, event) {
        // handle file changes
        // we store the files in refs[fieldname]
        // we store the filename in the form?
        const fileList = event.target.files;

        if (!fileList.length) return;

        Vue.console.log('filesChange: ' + fieldName + ' ' + event);
        this.$refs[fieldName] = fileList[0];
        this.$refs.form[fieldName] = fileList[0].name;
        Vue.console.log('this.$refs[' + fieldName + ']: ' + this.$refs[fieldName]);
      },
      sendFile(filename, file, url) {
        return new Promise((resolve, reject) => {
          const fd = new FormData();
          // fd.append('file', file, filename);
          fd.append('file', file);
          Vue.$http
              .post(url, fd)
              .then((response) => {
                if (response.status === 200) {
                  Vue.console.log('Success: ' + response.statusText);
                  resolve(response.data.result);
                } else {
                  Vue.console.log('Failed: ' + response.statusText);
                  reject(response.data.result);
                }
              })
              .catch((response) => {
                Vue.console.error('Error: ' + response);
                if (response) {
                  reject(response.data);
                } else {
                  reject();
                }
              });
        });
      },
      onSubmit() {
        const self = this;
        this.$refs.form.validate((valid) => {
          Vue.console.debug('onSubmit!');
          if (valid) {
            this.$confirm('Are you sure?', 'Warning', {}).then(() => {
              this.formLoading = true;
              // NProgress.start();
              const obj = Object.assign({}, this.form);
              obj.id = 'autoban';
              new AutobanProxy().create(obj).then((response) => {
                // process file uploads
                const promises = [];

                const executeOnBanApiUrl = '/attachments/executeOnBan/upload';
                if (self.$refs.executeOnBan !== '') {
                  Vue.console.log(self.$refs.executeOnBan + ' Processing the executeOnBan upload...');
                  promises.push(this.sendFile('executeOnBan.sh', self.$refs.executeOnBan, executeOnBanApiUrl));
                }

                // no need to see if I have promises, it still resolves if empty
                Promise.all(promises).then((results) => {
                  Vue.console.log('back from all promises', results);
                  // update object if we need to
                  if (promises.length >= 1) {
                    /*
                    so we have one or two results, we could add some logic to see what
                    we selected so we know what is what, but we can simplify since the result
                    contains a 'container' field that matches the property
                    */
                    results.forEach((resultObject) => {
                      if (resultObject.files && resultObject.files.file[0].container) {
                        Vue.console.log('filename:' + resultObject.files.file[0].name);
                        self.form[resultObject.files.file[0].container] =
                        resultObject.files.file[0].name;
                      }
                    });
                  }
                  const newObject = Object.assign({}, self.form);
                  newObject.id = 'autoban';
                  Vue.console.log('newObject: ' + newObject);
                  // now update the obj with the new filenames
                  new AutobanProxy().update(newObject.id, newObject).then((resp) => {
                    Vue.console.log('response: ' + resp);
                    // NProgress.done();
                    self.formLoading = false;
                    self.$message({
                      message: 'Success',
                      type: 'success',
                    });
                    self.getObject();
                  });
                }).then((results) => {
                  //
                });
              }).catch((error) => {
                Vue.console.error(error);
                this.$message.error('Error in creating record!');
                this.formLoading = false;
              });
            });
          }
        });
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
    },
    mounted() {
      this.getObject();
    },
  };

</script>
