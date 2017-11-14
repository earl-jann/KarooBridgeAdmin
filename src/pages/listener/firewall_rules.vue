<template>
  <section>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form ref="formFirewall" :inline="true" :model="formFirewall" v-loading="formFirewallLoading">
        <el-input type="hidden" v-model="formFirewall.id"></el-input>
        <el-form-item label="Enabled">
          <el-tooltip :content="'Toggle to enable/disable'" placement="top">
            <el-switch
              v-model="formFirewall.enabled"
              on-color="#13ce66"
              off-color="#ff4949"
              @change='submitFormFirewall'>
            </el-switch>
          </el-tooltip>
          <i class="el-icon-information"> </i>
          <em>{{ $t('firewall.header') }}</em>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.id" placeholder="Rule Name" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getFirewallRules" :disabled="disabled">Search</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd" :disabled="disabled">New</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-table :data="firewallRules" highlight-current-row v-loading="listLoading" @selection-change="selsChange" border style="width: 100%;">
      <el-table-column prop="id" label="Name" width="200" :sortable="!disabled">
      </el-table-column>
      <el-table-column label="Port Range">
        <el-table-column prop="portBase" label="Base Port Number" width="200" :sortable="!disabled">
        </el-table-column>
        <el-table-column prop="portMax" label="Max Port Number" width="200" :sortable="!disabled">
        </el-table-column>
      </el-table-column>
      <el-table-column prop="type" label="Type" width="150" :sortable="!disabled">
      </el-table-column>

      <el-table-column label="Actions">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)" :disabled="disabled">Edit</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)" :disabled="disabled">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-col :span="24" class="toolbar">
      <!-- <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">Delete Batch</el-button> -->
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
      </el-pagination>
    </el-col>
    <el-dialog title="Edit" v-model="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item label="Name" prop="id">
          <el-input v-model="editForm.id" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="Description" prop="description">
          <el-input v-model="editForm.description"></el-input>
        </el-form-item>
        <el-form-item label="Port Range" prop="portMax">
          <div class="input-inline">
              <el-form-item prop="portBase">
                <el-input-number v-model="editForm.portBase" :min="1" :max="65535" @change=""></el-input-number>
              </el-form-item>
            </div>
            <div class="input-inline">
              <el-form-item>
                <el-input-number v-model="editForm.portMax" :min="1" :max="65535" @change=""></el-input-number>
              </el-form-item>
          </div>
        </el-form-item>
        <el-form-item label="Type">
          <el-radio-group v-model="editForm.type" size="small">
            <el-radio-button label="UDP" border>UDP</el-radio-button>
            <el-radio-button label="TCP" border>TCP</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">Submit</el-button>
      </div>
    </el-dialog>

    <el-dialog title="New" v-model="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
        <el-form-item label="Name" prop="id">
          <el-input v-model="addForm.id"></el-input>
        </el-form-item>
        <el-form-item label="Description" prop="description">
          <el-input v-model="addForm.description"></el-input>
        </el-form-item>
        <el-form-item label="Port Range" prop="portMax">
          <div class="input-inline">
              <el-form-item prop="portBase">
                <el-input-number v-model="addForm.portBase" :min="1" :max="65535" @change=""></el-input-number>
              </el-form-item>
            </div>
            <div class="input-inline">
              <el-form-item>
                <el-input-number v-model="addForm.portMax" :min="1" :max="65535" @change=""></el-input-number>
              </el-form-item>
          </div>
        </el-form-item>
        <el-form-item label="Type">
          <el-radio-group v-model="addForm.type" size="small">
            <el-radio-button label="UDP" border>UDP</el-radio-button>
            <el-radio-button label="TCP" border>TCP</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">Submit</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
  import Vue from 'vue';
  import util from '@/common/js/util';
  import FirewallRulesProxy from '@/proxies/FirewallRulesProxy';
  import FirewallProxy from '@/proxies/FirewallProxy';

  const FORM_FIREWALL_ID = 'firewall';

  export default {
    data() {
      const checkPortMaxRange = ((rule, value, callback) => {
        let result = '';
        if (!value) {
          result = callback(new Error('Please input the Max Port Range!'));
        }
        if (this.editForm.portBase > value
          || this.addForm.portBase > value) {
          result = callback(new Error('Maximum Port should be greater than or equal to Minimum Port!'));
        } else {
          result = callback();
        }
        return result;
      });
      return {
        formFirewall: {
          id: FORM_FIREWALL_ID,
          enabled: false,
        },
        filters: {
          id: '',
        },
        formFirewallLoading: true,
        disabled: false,
        firewallRules: [],
        total: 0,
        page: 1,
        listLoading: false,
        sels: [],
        editFormVisible: false,
        editLoading: false,
        editFormRules: {
          portMax: [
          { validator: checkPortMaxRange, trigger: 'blur' },
          ],
          id: [
          { required: true, message: 'Please enter a valid name', trigger: 'blur' },
          ],
        },
        editForm: {
          id: '',
          description: '',
          portBase: 0,
          portMax: 0,
          type: 'UDP',
        },
        addFormVisible: false,
        addLoading: false,
        addFormRules: {
          portMax: [
          { validator: checkPortMaxRange, trigger: 'blur' },
          ],
          id: [
          { required: true, message: 'Please enter a valid name', trigger: 'blur' },
          ],
        },
        addForm: {
          id: '',
          description: '',
          portBase: 0,
          portMax: 0,
          type: 'UDP',
        },
      };
    },

    methods: {
      submitFormFirewall(value) {
        // TODO: ADD CANCEL and cancel toggle
        this.$confirm('This will toggle Custom Firewall Rules. Are you sure?', 'prompt', {}).then(() => {
          this.formFirewallLoading = true;
          // NProgress.start();
          const obj = Object.assign({}, this.formFirewall);
          obj.id = FORM_FIREWALL_ID;
          new FirewallProxy().create(obj).then((response) => {
            this.formFirewallLoading = false;
            // NProgress.done();
            this.$message({
              message: 'Success',
              type: 'success',
            });
            this.getFirewall();
            // disable
            if (value === false) {
              this.disabled = true;
            } else {
              this.disabled = false;
            }
            this.formFirewall.id = FORM_FIREWALL_ID;
          }).catch((error) => {
            Vue.console.error(error);
            this.$message({
              message: 'Error in creating record!',
              type: 'error',
            });
          });
        }).catch((error) => {
          // cancel the switch
          this.formFirewall.enabled = !value;
        });
      },

      handleCurrentChange(val) {
        this.page = val;
        this.getFirewallRules();
      },
      getFirewall() {
        Vue.console.debug('getFirewall');
        this.formFirewallLoading = true;
        // NProgress.start();
        new FirewallProxy().find(this.formFirewall.id).then((response) => {
          if (typeof response !== 'undefined'
            && typeof response.id !== 'undefined'
            && response.id !== 'undefined') {
            Vue.console.debug(response);
            this.formFirewall = Object.assign({}, response);
            // just make sure
            this.formFirewall.id = FORM_FIREWALL_ID;
            this.disabled = !this.formFirewall.enabled;
            Vue.console.debug('getFirewall: ' + this.formFirewall);
          } else {
            this.$refs.formFirewall.resetFields();
            this.formFirewall.id = FORM_FIREWALL_ID;
            Vue.console.warn('No record found.');
            // this.sourceAddresses = [];
          }
          this.formFirewallLoading = false;
          // NProgress.done();
        });
      },
      getFirewallRules() {
        const params = {
          'filter[where][id]': this.filters.id,
        };
        this.listLoading = true;
        // NProgress.start();
        new FirewallRulesProxy(params).findAll().then((response) => {
          if (typeof response !== 'undefined'
            && response.length > 0
            && typeof response[0].id !== 'undefined'
            && response[0].id !== 'undefined') {
            this.total = response.length;
            this.firewallRules = response;
          } else {
            this.total = 0;
            this.firewallRules = [];
          }
          this.listLoading = false;
          // NProgress.done();
        });
      },

      handleDel(index, row) {
        this.$confirm('Are you sure?', 'prompt', {
          type: 'warning',
        }).then(() => {
          this.listLoading = true;
          // NProgress.start();
          const obj = { id: row.id };
          new FirewallRulesProxy().destroy(obj.id).then((response) => {
            this.listLoading = false;
            // NProgress.done();
            this.$message({
              message: 'Success',
              type: 'success',
            });
            this.getFirewallRules();
          });
        }).catch(() => {

        });
      },

      handleEdit(index, row) {
        this.editFormVisible = true;
        this.editForm = Object.assign({}, row);
      },

      handleAdd() {
        this.addFormVisible = true;
        this.addForm = {
          id: '',
          description: '',
          portBase: 0,
          portMax: 0,
          type: 'UDP',
        };
      },

      editSubmit() {
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$confirm('Are you sure?', 'prompt', {}).then(() => {
              this.editLoading = true;
              // NProgress.start();
              const obj = Object.assign({}, this.editForm);
              new FirewallRulesProxy().update(obj.id, obj).then((response) => {
                this.editLoading = false;
                // NProgress.done();
                this.$message({
                  message: 'Success',
                  type: 'success',
                });
                this.$refs.editForm.resetFields();
                this.editFormVisible = false;
                this.getFirewallRules();
              }).catch((error) => {
                Vue.console.error(error);
                this.$message({
                  message: 'Error in editing record!',
                  type: 'error',
                });
              });
            });
          }
        });
      },

      addSubmit() {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$confirm('Are you sure?', 'prompt', {}).then(() => {
              this.addLoading = true;
              // NProgress.start();
              const obj = Object.assign({}, this.addForm);
              new FirewallRulesProxy().create(obj).then((response) => {
                this.addLoading = false;
                // NProgress.done();
                this.$message({
                  message: 'Success',
                  type: 'success',
                });
                this.$refs.addForm.resetFields();
                this.addFormVisible = false;
                this.getFirewallRules();
              }).catch((error) => {
                Vue.console.error(error);
                this.$message({
                  message: 'Error in creating record!',
                  type: 'error',
                });
              });
            });
          } else {
            // stub
            // Vue.console.error('Invalidate');
          }
        });
      },
      selsChange(sels) {
        this.sels = sels;
      },
    },
    mounted() {
      this.getFirewall();
      this.getFirewallRules();
    },
  };

</script>

<style scoped>
  .input-inline {
    display: inline-block;
  }
</style>
