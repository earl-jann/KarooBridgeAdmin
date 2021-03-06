<template>
  <section>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.domainName" placeholder="Domain Name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getObjects">Search</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">New</el-button>
        </el-form-item>
      </el-form>
      <i class="el-icon-information"> </i>
      <em>{{ $t('domainProfiles.header') }}</em>
    </el-col>
    <el-table :data="objects" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
      <el-table-column prop="domainName" label="Domain Name" width="200" sortable>
      </el-table-column>

      <el-table-column prop="description" label="Description" width="200" sortable>
      </el-table-column>

      <el-table-column label="Scripting">
        <template scope="scope">
          <el-tooltip content="Click to view/edit scripts" placement="top">
            <el-button size="small" icon="edit" @click="handleViewScript(scope.$index, scope.row)">
              View
            </el-button>
          </el-tooltip>
        </template>
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
        <div v-show="show">
          <el-input v-model="editForm.id" type="hidden"></el-input>
          <el-input v-model="editForm.rules" type="hidden"></el-input>
          <el-input v-model="editForm.routes" type="hidden"></el-input>
          <el-input v-model="editForm.inbound" type="hidden"></el-input>
        </div>
        <el-form-item label="Domain Name" prop="domainName">
          <el-input v-model="editForm.domainName"></el-input>
        </el-form-item>
        <el-form-item label="Description" prop="description">
          <el-input v-model="editForm.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">Submit</el-button>
      </div>
    </el-dialog>

    <el-dialog title="New" v-model="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
        <div v-show="show">
          <el-input v-model="addForm.id" type="hidden"></el-input>
          <el-input v-model="addForm.rules" type="hidden"></el-input>
          <el-input v-model="addForm.routes" type="hidden"></el-input>
          <el-input v-model="addForm.inbound" type="hidden"></el-input>
        </div>
        <el-form-item label="Domain Name" prop="domainName">
          <el-input v-model="addForm.domainName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Description" prop="description">
          <el-input v-model="addForm.description"></el-input>
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
  import DomainProfileProxy from '@/proxies/DomainProfileProxy';

  export default {

    data() {
      return {
        filters: {
          domainName: '',
        },
        show: false,
        objects: [],
        total: 0,
        page: 1,
        listLoading: false,
        sels: [],
        editFormVisible: false,
        editLoading: false,
        editFormRules: {
          domainName: [
          { required: true, message: 'Please enter a valid address', trigger: 'blur' },
          ],
        },

        editForm: {
          id: '',
          domainName: '',
          description: '',
          rules: '',
          routes: '',
          inbound: '',
        },

        addFormVisible: false,
        addLoading: false,
        addFormRules: {
          address: [
          { required: true, message: 'Please enter a valid address', trigger: 'blur' },
          ],
        },

        addForm: {
          id: '',
          domainName: '',
          description: '',
          rules: '',
          routes: '',
          inbound: '',
        },
      };
    },

    methods: {
      handleCurrentChange(val) {
        this.page = val;
        this.getObjects();
      },

      getObjects() {
        const params = {
          'filter[where][domain_name]': this.filters.domainName,
        };
        this.listLoading = true;
        // NProgress.start();
        new DomainProfileProxy(params).findAll().then((response) => {
          if (typeof response !== 'undefined'
            && response.length > 0
            && typeof response[0].id !== 'undefined'
            && response[0].id !== 'undefined') {
            this.total = response.length;
            this.objects = response;
          } else {
            this.total = 0;
            this.objects = [];
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
          new DomainProfileProxy().destroy(obj.id).then((response) => {
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

      handleViewScript(index, row) {
        // row.domainName;
        Vue.router.push({ name: 'Domain Profile Scripts', params: { id: row.id } });
      },

      handleAdd() {
        this.addFormVisible = true;
        this.addForm = {
          id: '',
          domainName: '',
          description: '',
        };
      },

      editSubmit() {
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$confirm('Are you sure?', 'prompt', {}).then(() => {
              this.editLoading = true;
              // NProgress.start();
              const obj = Object.assign({}, this.editForm);
              new DomainProfileProxy().update(obj.id, obj).then((response) => {
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
            }).catch(() => {
              this.$message({
                type: 'info',
                message: 'Edit Cancelled',
              });
              this.$refs.editForm.resetFields();
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
              new DomainProfileProxy().create(obj).then((response) => {
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
            }).catch(() => {
              this.$message({
                type: 'info',
                message: 'Add Cancelled',
              });
              this.$refs.addForm.resetFields();
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
      //       this.getListeners();
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
