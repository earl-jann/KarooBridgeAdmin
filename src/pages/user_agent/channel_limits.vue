<template>
  <section>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.prefix" placeholder="Prefix"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getChannelLimits">Search</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">New</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-table :data="channelLimits" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <!--
      <el-table-column type="index" width="20">
      </el-table-column>
      -->
      <el-table-column prop="prefix" label="Prefix" width="200" sortable>
      </el-table-column>
      </el-table-column>
        <el-table-column prop="enabled" label="Enabled" width="200" sortable>
      </el-table-column>
      <el-table-column prop="maxChannels" label="Max Channels" width="300" sortable>
      </el-table-column>

      <el-table-column label="Actions" width="150">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-col :span="24" class="toolbar">
      <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">Delete Batch</el-button>
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
      </el-pagination>
    </el-col>
    <el-dialog title="Edit" v-model="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item label="Prefix" prop="prefix">
          <el-input v-model="editForm.prefix" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Enabled">
          <el-tooltip :content="'Toggle to enable/disable'" placement="top">
            <el-switch
              v-model="editForm.enabled"
              on-color="#13ce66"
              off-color="#ff4949"
              on-value="1"
              off-value="0">
            </el-switch>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="Max Channels">
          <el-input-number v-model="editForm.maxChannels" :min="0"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">Submit</el-button>
      </div>
    </el-dialog>

    <el-dialog title="New" v-model="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
        <el-form-item label="Prefix" prop="prefix">
          <el-input v-model="addForm.prefix" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Prefix" prop="prefix">
          <el-input v-model="addForm.prefix" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Enabled">
          <el-tooltip :content="'Toggle to enable/disable'" placement="top">
            <el-switch
              v-model="addForm.enabled"
              on-color="#13ce66"
              off-color="#ff4949"
              on-value="1"
              off-value="0">
            </el-switch>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="Max Channels">
          <el-input-number v-model="addForm.maxChannels" :min="0"></el-input-number>
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
  import util from '@/common/js/util';
  import listenerService from '@/services/listener';

  export default {

    data() {
      return {
        filters: {
          name: '',
        },
        channelLimits: [],
        total: 0,
        page: 1,
        listLoading: false,
        sels: [],
        editFormVisible: false,
        editLoading: false,
        editFormRules: {
          name: [
          { required: true, message: 'Please enter a valid prefix', trigger: 'blur' },
          ],
        },

        editForm: {
          prefix: '001',
          enabled: true,
          maxChannels: '0',
        },

        addFormVisible: false,
        addLoading: false,
        addFormRules: {
          name: [
          { required: true, message: 'Please enter a valid prefix', trigger: 'blur' },
          ],
        },

        addForm: {
          prefix: '',
          enabled: true,
          maxChannels: 30,
        },
      };
    },

    methods: {

      formatBoolean(value, column) {
        switch (value) {
          case 0: return 'No';
          case 1: return 'Yes';
          default : return 'Unknown';
        }
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getListeners();
      },

      getListeners() {
        const params = {
          page: this.page,
          name: this.filters.name,
        };
        this.listLoading = true;
        // NProgress.start();
        listenerService.getListenerListPage(params).then((res) => {
          this.total = res.data.total;
          this.channelLimits = res.data.channelLimits;
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
          const params = { name: row.name };
          listenerService.removeListener(params).then((res) => {
            this.listLoading = false;
            // NProgress.done();
            this.$message({
              message: 'Success',
              type: 'success',
            });
            this.getListeners();
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
          name: '',
          description: '',
          ipAddress: '',
          externalAddress: '',
          tcpEnabled: 0,
          udpEnabled: 0,
          wsEnabled: 0,
          tlsEnabled: 0,
          sipPort: 0,
          tlsPort: 0,
          subnets: '',
        };
      },

      editSubmit() {
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$confirm('Are you sure?', 'prompt', {}).then(() => {
              this.editLoading = true;
              // NProgress.start();
              const para = Object.assign({}, this.editForm);
              listenerService.editListener(para).then((res) => {
                this.editLoading = false;
                // NProgress.done();
                this.$message({
                  message: 'Success',
                  type: 'success',
                });
                this.$refs.editForm.resetFields();
                this.editFormVisible = false;
                this.getListeners();
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
              const para = Object.assign({}, this.addForm);
              listenerService.addListener(para).then((res) => {
                this.addLoading = false;
                // NProgress.done();
                this.$message({
                  message: 'Success',
                  type: 'success',
                });
                this.$refs.addForm.resetFields();
                this.addFormVisible = false;
                this.getListeners();
              });
            });
          }
        });
      },
      selsChange(sels) {
        this.sels = sels;
      },

      batchRemove() {
        const names = this.sels.map(item => item.name).toString();
        this.$confirm('Delete the selected records?', 'prompt', {
          type: 'warning',
        }).then(() => {
          this.listLoading = true;
          // NProgress.start();
          const params = { names };
          listenerService.batchRemoveListener(params).then((res) => {
            this.listLoading = false;
            // NProgress.done();
            this.$message({
              message: 'Success',
              type: 'success',
            });
            this.getListeners();
          });
        }).catch(() => {
        });
      },
    },
    mounted() {
      this.getListeners();
    },
  };

</script>

<style scoped>

</style>
