<template>
  <section>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.id" placeholder="Domain/Prefix"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getObjects">Search</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">New</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-table :data="channelLimits" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">

      <el-table-column prop="id" label="Domain/Prefix" width="200" sortable>
      </el-table-column>
      </el-table-column>
        <el-table-column prop="enabled" label="Enabled" width="200"
          :formatter="formatBoolean" sortable>
      </el-table-column>
      <el-table-column prop="maxChannels" label="Max Channels" width="300" sortable>
      </el-table-column>
      <el-table-column prop="type" label="Type" :formatter="formatType" width="200" sortable>
      </el-table-column>

      <el-table-column label="Actions">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">Delete</el-button>
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
        <el-form-item label="Domain/Prefix" prop="id">
          <el-input v-model="editForm.id" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="Enabled">
          <el-tooltip :content="'Toggle to enable/disable'" placement="top">
            <el-switch
              v-model="editForm.enabled"
              on-color="#13ce66"
              off-color="#ff4949">
            </el-switch>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="Max Channels">
          <el-input-number v-model="editForm.maxChannels" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item label="Type" prop="type">
          <el-radio-group v-model="editForm.type" size="small">
            <el-radio-button label="CHANNEL" border>Channel</el-radio-button>
            <el-radio-button label="DOMAIN" border>Domain</el-radio-button>
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
        <el-form-item label="Domain/Prefix" prop="id">
          <el-input v-model="addForm.id" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Enabled">
          <el-tooltip :content="'Toggle to enable/disable'" placement="top">
            <el-switch
              v-model="addForm.enabled"
              on-color="#13ce66"
              off-color="#ff4949">
            </el-switch>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="Max Channels">
          <el-input-number v-model="addForm.maxChannels" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item label="Type" prop="type">
          <el-radio-group v-model="addForm.type" size="small">
            <el-radio-button label="CHANNEL" border>Channel</el-radio-button>
            <el-radio-button label="DOMAIN" border>Domain</el-radio-button>
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
  import ChannelLimitsProxy from '@/proxies/ChannelLimitsProxy';

  export default {

    data() {
      return {
        filters: {
          id: '',
        },
        channelLimits: [],
        total: 0,
        page: 1,
        listLoading: false,
        sels: [],
        editFormVisible: false,
        editLoading: false,
        editFormRules: {
          id: [
          { required: true, message: 'Please enter a valid domain/prefix', trigger: 'blur' },
          ],
          type: [
          { required: true, message: 'Please select a type', trigger: 'blur' },
          ],
        },

        editForm: {
          id: '001',
          enabled: true,
          maxChannels: '0',
          type: '',
        },

        addFormVisible: false,
        addLoading: false,
        addFormRules: {
          id: [
          { required: true, message: 'Please enter a valid domain/prefix', trigger: 'blur' },
          ],
          type: [
          { required: true, message: 'Please select a type', trigger: 'blur' },
          ],
        },

        addForm: {
          id: '',
          enabled: true,
          maxChannels: 30,
          type: '',
        },
      };
    },

    methods: {
      formatType(row, column) {
        let result = '';
        if (row.type === 'CHANNEL') {
          result = 'Channel';
        } else if (row.type === 'DOMAIN') {
          result = 'Domain';
        }
        return result;
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getObjects();
      },

      formatBoolean(row, column, value) {
        return value === true ? 'Yes' : 'No';
      },

      getObjects() {
        const params = {
          'filter[where][id]': this.filters.id,
        };
        this.listLoading = true;
        // NProgress.start();
        new ChannelLimitsProxy(params).findAll().then((response) => {
          if (typeof response !== 'undefined'
            && response.length > 0
            && typeof response[0].id !== 'undefined'
            && response[0].id !== 'undefined') {
            this.total = response.length;
            this.channelLimits = response;
          } else {
            this.total = 0;
            this.channelLimits = [];
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
          new ChannelLimitsProxy().destroy(obj.id).then((response) => {
            this.listLoading = false;
            // NProgress.done();
            this.$message({
              message: 'Success',
              type: 'success',
            });
            this.getObjects();
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
          enabled: false,
          maxChannels: 30,
        };
      },

      editSubmit() {
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$confirm('Are you sure?', 'prompt', {}).then(() => {
              this.editLoading = true;
              // NProgress.start();
              const obj = Object.assign({}, this.editForm);
              new ChannelLimitsProxy().update(obj.id, obj).then((response) => {
                this.editLoading = false;
                // NProgress.done();
                this.$message({
                  message: 'Success',
                  type: 'success',
                });
                this.$refs.editForm.resetFields();
                this.editFormVisible = false;
                this.getObjects();
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
              new ChannelLimitsProxy().create(obj).then((response) => {
                this.addLoading = false;
                // NProgress.done();
                this.$message({
                  message: 'Success',
                  type: 'success',
                });
                this.$refs.addForm.resetFields();
                this.addFormVisible = false;
                this.getObjects();
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
      selsChange(sels) {
        this.sels = sels;
      },
      // no longer used
      // batchRemove() {
      //   const names = this.sels.map(item => item.name).toString();
      //   this.$confirm('Delete the selected records?', 'prompt', {
      //     type: 'warning',
      //   }).then(() => {
      //     this.listLoading = true;
      //     // NProgress.start();
      //     const params = { names };
      //     listenerService.batchRemoveListener(params).then((res) => {
      //       this.listLoading = false;
      //       // NProgress.done();
      //       this.$message({
      //         message: 'Success',
      //         type: 'success',
      //       });
      //       this.getObjects();
      //     });
      //   }).catch(() => {
      //   });
      // },
    },
    mounted() {
      this.getObjects();
    },
  };

</script>

<style scoped>

</style>
