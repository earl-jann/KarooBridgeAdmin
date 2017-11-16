<template>
  <el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;" :rules="formRules" v-loading="formLoading">
    <el-input type="hidden" v-model="form.id"></el-input>
    <el-form-item label="TLS Certificate Authority File">
      <el-tooltip :content="$t('tls.tls_ca_file')" placement="top">
        <input type="file" ref="tlsCaFile" :name="tlsCaFile"
          accept=".crt" @change="filesChange('tlsCaFile', $event)">
        </input>
      </el-tooltip>
    </el-form-item>
    <el-form-item label="TLS CA Path">
      <el-tooltip :content="$t('tls.tls_ca_path')" placement="top">
        <el-input v-model="form.tlsCaPath" auto-complete="off"></el-input>
      </el-tooltip>
    </el-form-item>

    <el-form-item label="TLS Server Certificate Authority File">
      <el-tooltip :content="$t('tls.tls_certificate_file')" placement="top">
        <input type="file" ref="tlsCertificateFile" :name="tlsCertificateFile"
          accept=".crt" @change="filesChange('tlsCertificateFile', $event)">
        </input>
      </el-tooltip>
    </el-form-item>

    <el-form-item label="TLS Server Private Key File">
      <el-tooltip :content="$t('tls.tls_private_key_file')" placement="top">
        <input type="file" ref="tlsPrivateKeyFile" :name="tlsPrivateKeyFile"
          accept=".key" @change="filesChange('tlsPrivateKeyFile', $event)">
        </input>
      </el-tooltip>
    </el-form-item>

    <el-form-item label="TLS Certificate Password">
      <el-tooltip :content="$t('tls.tls_cert_password')" placement="top">
        <el-input type="password" v-model="form.tlsCertPassword" auto-complete="off"></el-input>
      </el-tooltip>
    </el-form-item>

    <el-form-item label="TLS Verification Mode">
      <el-tooltip :content="$t('tls.tls_verify_peer')" placement="top">
        <el-switch
          v-model="form.tlsVerifyPeer"
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
  import TlsProxy from '@/proxies/TlsProxy';

  export default {
    data() {
      return {
        form: {
          id: 'tls',
          tlsCaFile: '',
          tlsCaPath: '',
          tlsCertificateFile: '',
          tlsPrivateKeyFile: '',
          tlsCertPassword: '',
          tlsVerifyPeer: false,
        },
        tlsCaFile: '',
        tlsCertificateFile: '',
        tlsPrivateKeyFile: '',
        formRules: {
          tlsCaFile: [
          { required: true, message: 'Please enter a valid file', trigger: 'blur' },
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
        new TlsProxy().find(this.form.id).then((response) => {
          if (typeof response !== 'undefined'
            && typeof response.id !== 'undefined'
            && response.id !== 'undefined') {
            Vue.console.debug(response);
            this.form = Object.assign({}, response);
            // just make sure
            this.form.id = 'tls';
            // TODO assign file urls to form inputs
            Vue.console.debug(this.form);
          } else {
            this.$refs.form.resetFields();
            this.form.id = 'tls';
            Vue.console.warn('No record found.');
            // this.listeners = [];
          }
          // we reset the file upload fields
          this.$refs.tlsCaFile = '';
          this.$refs.tlsCertificateFile = '';
          this.$refs.tlsPrivateKeyFile = '';
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
              obj.id = 'tls';
              new TlsProxy().create(obj).then((response) => {
                // process file uploads
                const promises = [];

                const tlsCaFileApiUrl = '/attachments/tlsCaFile/upload';
                if (self.$refs.tlsCaFile !== '') {
                  Vue.console.log(self.$refs.tlsCaFile + ' Processing the tlsCaFile upload...');
                  promises.push(this.sendFile('ca.crt', self.$refs.tlsCaFile, tlsCaFileApiUrl));
                }

                const tlsCertificateFileApiUrl = '/attachments/tlsCertificateFile/upload';
                if (self.$refs.tlsCertificateFile !== '') {
                  Vue.console.log(self.tlsCertificateFile + ' Processing the tlsCertificateFile upload...');
                  promises.push(this.sendFile('karoo.crt', self.$refs.tlsCertificateFile, tlsCertificateFileApiUrl));
                }

                const tlsPrivateKeyFileApiUrl = '/attachments/tlsPrivateKeyFile/upload';
                if (self.$refs.tlsPrivateKeyFile !== '') {
                  Vue.console.log(self.tlsPrivateKeyFile + ' Processing the tlsPrivateKeyFile upload...');
                  promises.push(this.sendFile('karoo.key', self.$refs.tlsPrivateKeyFile, tlsPrivateKeyFileApiUrl));
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
                  newObject.id = 'tls';
                  Vue.console.log('newObject: ' + newObject);
                  // now update tls obj with the new filenames
                  new TlsProxy().update(newObject.id, newObject).then((resp) => {
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
