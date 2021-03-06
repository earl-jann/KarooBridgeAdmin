<template>
  <el-form ref="form" :inline="true" :model="form" @submit.prevent="onSubmit" label-width="100px" style="margin:20px;width:70%;min-width:600px;" :rules="formRules" v-loading="formLoading">
    <section>
      <div class="inline" style="margin-bottom: 20px;">
        <el-tooltip content="Click to save the scripts" placement="top">
          <el-button size="small" @click.native="onSubmit" icon="upload">
            Save Scripts
          </el-button>
        </el-tooltip>
      </div>
      <div class="input-inline" v-show="show">
        <el-input type="hidden" v-model="form.id"></el-input>
        <el-input type="hidden" v-model="form.description"></el-input>
        <el-input type="hidden" v-model="form.domainName"></el-input>
      </div>

      <el-form-item :inline="false" prop="scripts">
        <el-form-item label="Domain Name" prop="domainName">
          {{form.domainName}}
        </el-form-item>
        <el-form-item label="Description" prop="description">
          {{form.description}}
        </el-form-item>
      </el-form-item>
      <el-tabs v-model="activeTab" type="border-card">
        <el-tab-pane label="Rules" name="rulesTab"> 
          <editor identifier="rulesTab" v-model="form.rules" @init="initEditor" lang="javascript" theme="chrome" width="600" height="400"></editor>
        </el-tab-pane>
        <el-tab-pane label="Routes" name="routesTab"> 
          <editor identifier="routesTab" v-model="form.routes" @init="initEditor" lang="javascript" theme="chrome" width="500" height="400"></editor>
        </el-tab-pane>
        <el-tab-pane label="Inbound" name="inboundTab"> 
          <editor identifier="inboundTab" v-model="form.inbound" @init="initEditor" lang="javascript" theme="chrome" width="500" height="400"></editor>
        </el-tab-pane>
      </el-tabs>
    </section>
  </el-form>
</template>
<script>
  import Vue from 'vue';
  import util from '@/common/js/util';
  import DomainProfileProxy from '@/proxies/DomainProfileProxy';
  import editor from '@/components/ace-editor';
  import javascript from 'brace/mode/javascript';
  import chrome from 'brace/theme/chrome';

  export default {
    data() {
      const checkScriptsEditor = ((rule, value, callback) => {
        const checkEditor = (myEditor, myCallback) => {
          const annotations = myEditor.getSession().getAnnotations();
          // basic check, if there are annotations callback an error
          if (annotations && annotations.length > 0) {
            myCallback(new Error('Syntax error on script. Please correct javascript syntax and try again.'));
          }
        };

        let hasError = false;
        for (let i = 0; i < this.editors.length; i++) {
          const tempResult = checkEditor(this.editors[i], callback);
          if (typeof tempResult !== 'undefined'
            && tempResult !== 'undefined') {
            Vue.console.log('tempResult: ' + tempResult);
            hasError = true;
          }
        }
        if (!hasError) {
          callback();
        }
      });

      return {
        form: {
          id: '',
          domainName: '',
          description: '',
          rules: '',
          routes: '',
          inbound: '',
        },
        show: false,
        activeTab: 'rulesTab',
        formLoading: true,
        formRules: {
          scripts: [
          { validator: checkScriptsEditor, trigger: 'blur' },
          ],
        },
        editors: [],
      };
    },
    components: {
      editor,
    },
    methods: {
      initEditor(myEditor) {
        // test
        this.editors.push(myEditor);
      },
      getObject() {
        this.formLoading = true;
        // NProgress.start();
        const recordId = this.$route.params.id;
        new DomainProfileProxy().find(recordId).then((response) => {
          if (typeof response !== 'undefined'
            && typeof response.id !== 'undefined'
            && response.id !== 'undefined') {
            Object.assign(this.form, response);
            if (!this.form.routes) {
              this.form.routes = '';
            }
            if (!this.form.rules) {
              this.form.rules = '';
            }
            if (!this.form.inbound) {
              this.form.inbound = '';
            }
            // this.form = response;
          } else {
            this.form = {};
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

              new DomainProfileProxy().create(obj).then((response) => {
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
