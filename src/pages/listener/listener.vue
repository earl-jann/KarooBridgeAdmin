<template>
  <section>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.id" placeholder="Name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getListeners">Search</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">New</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-table :data="listeners" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <!--
      <el-table-column type="index" width="20">
      </el-table-column>
      -->
      <el-table-column prop="id" label="Name" width="300" sortable>
      </el-table-column>
      </el-table-column>
        <el-table-column prop="description" label="Description" width="250" sortable>
      </el-table-column>
      <el-table-column prop="ipAddress" label="IP Address" width="150" sortable>
      </el-table-column>
      <el-table-column prop="externalAddress" label="Ext Address" width="150" sortable>
      </el-table-column>
      <!--
      <el-table-column prop="tcpEnabled" label="TCP" width="80" :formatter="formatBoolean" sortable>
      </el-table-column>
      <el-table-column prop="udpEnabled" label="UDP" width="80" :formatter="formatBoolean" sortable>
      </el-table-column>
      <el-table-column prop="wsEnabled" label="WS" width="80" :formatter="formatBoolean" sortable>
      </el-table-column>
      <el-table-column prop="tlsEnabled" label="TLS" width="80" :formatter="formatBoolean" sortable>
      </el-table-column>
      <el-table-column prop="sipPort" label="SIP Port" width="100" sortable>
      </el-table-column>
      <el-table-column prop="tlsPort" label="TLS Port" width="100" sortable>
      </el-table-column>
      <el-table-column prop="subnets" label="Subnets" min-width="180" sortable>
      </el-table-column>
      -->
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
        <el-form-item label="Name" prop="id">
          <el-input v-model="editForm.id" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Description" prop="description">
          <el-input v-model="editForm.description" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="IP Address" prop="ipAddress">
          <el-input v-model="editForm.ipAddress" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Default">
          <el-radio-group v-model="editForm.default">
            <el-radio class="radio" :label="1">Yes</el-radio>
            <el-radio class="radio" :label="0">No</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="External Address">
          <el-input type="textarea" v-model="editForm.externalAddress"></el-input>
        </el-form-item>
        <el-form-item label="TCP Enabled">
          <el-tooltip :content="'Toggle to enable/disable'" placement="top">
            <el-switch
              v-model="editForm.tcpEnabled"
              on-color="#13ce66"
              off-color="#ff4949"
              on-value="1"
              off-value="0">
            </el-switch>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="UDP Enabled">
          <el-tooltip :content="'Toggle to enable/disable'" placement="top">
            <el-switch
              v-model="editForm.udpEnabled"
              on-color="#13ce66"
              off-color="#ff4949"
              on-value="1"
              off-value="0">
            </el-switch>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="Websocket Enabled">
          <el-tooltip :content="'Toggle to enable/disable'" placement="top">
            <el-switch
              v-model="editForm.wsEnabled"
              on-color="#13ce66"
              off-color="#ff4949"
              on-value="1"
              off-value="0">
            </el-switch>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="TLS Enabled">
          <el-tooltip :content="'Toggle to enable/disable'" placement="top">
            <el-switch
              v-model="editForm.tlsEnabled"
              on-color="#13ce66"
              off-color="#ff4949"
              on-value="1"
              off-value="0">
            </el-switch>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="SIP Port">
          <el-input-number v-model="editForm.sipPort" :min="0" :max="200000"></el-input-number>
        </el-form-item>
        <el-form-item label="TLS Port">
          <el-input-number v-model="editForm.tlsPort" :min="0" :max="200000"></el-input-number>
        </el-form-item>
        <el-form-item label="Subnets">
          <el-input type="textarea" v-model="editForm.subnets"></el-input>
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
          <el-input v-model="addForm.id" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Description" prop="description">
          <el-input v-model="addForm.description" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="IP Address" prop="ipAddress">
          <el-input v-model="addForm.ipAddress" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Default">
          <el-radio-group v-model="addForm.default">
            <el-radio class="radio" :label="1">Yes</el-radio>
            <el-radio class="radio" :label="0">No</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="External Address">
          <el-input type="textarea" v-model="addForm.externalAddress"></el-input>
        </el-form-item>
        <el-form-item label="TCP Enabled">
          <el-tooltip :content="'Toggle to enable/disable'" placement="top">
            <el-switch
              v-model="addForm.tcpEnabled"
              on-color="#13ce66"
              off-color="#ff4949"
              on-value="1"
              off-value="0">
            </el-switch>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="UDP Enabled">
          <el-tooltip :content="'Toggle to enable/disable'" placement="top">
            <el-switch
              v-model="addForm.wsEnabled"
              on-color="#13ce66"
              off-color="#ff4949"
              on-value="1"
              off-value="0">
            </el-switch>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="Websocket Enabled">
          <el-tooltip :content="'Toggle to enable/disable'" placement="top">
            <el-switch
              v-model="addForm.wsEnabled"
              on-color="#13ce66"
              off-color="#ff4949">
            </el-switch>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="TLS Enabled">
          <el-tooltip :content="'Toggle to enable/disable'" placement="top">
            <el-switch
              v-model="addForm.tlsEnabled"
              on-color="#13ce66"
              off-color="#ff4949"
              on-value="1"
              off-value="0">
            </el-switch>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="SIP Port">
          <el-input-number v-model="addForm.sipPort" :min="0" :max="200000"></el-input-number>
        </el-form-item>
        <el-form-item label="TLS Port">
          <el-input-number v-model="addForm.tlsPort" :min="0" :max="200000"></el-input-number>
        </el-form-item>
        <el-form-item label="Subnets">
          <el-input type="textarea" v-model="addForm.subnets"></el-input>
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
          id: '',
        },
        listeners: [],
        total: 0,
        page: 1,
        listLoading: false,
        sels: [],
        editFormVisible: false,
        editLoading: false,
        editFormRules: {
          id: [
          { required: true, message: 'Please enter a valid name', trigger: 'blur' },
          ],
        },

        editForm: {
          id: '',
          description: '',
          ipAddress: '',
          externalAddress: '',
          tcpEnabled: true,
          udpEnabled: true,
          wsEnabled: true,
          tlsEnabled: false,
          sipPort: '0',
          tlsPort: '0',
          subnets: '',
        },

        addFormVisible: false,
        addLoading: false,
        addFormRules: {
          id: [
          { required: true, message: 'Please enter a valid name', trigger: 'blur' },
          ],
        },

        addForm: {
          id: '',
          description: '',
          ipAddress: '',
          externalAddress: '',
          tcpEnabled: true,
          udpEnabled: true,
          wsEnabled: false,
          tlsEnabled: true,
          sipPort: 20010,
          tlsPort: 9988,
          subnets: '',
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
          id: this.filters.id,
        };
        this.listLoading = true;
        // NProgress.start();
        listenerService.getListenerListPage(params).then((res) => {
          this.total = res.data.total;
          this.listeners = res.data.listeners;
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
          const params = { id: row.id };
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
          id: '',
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
        const ids = this.sels.map(item => item.id).toString();
        this.$confirm('Delete the selected records?', 'prompt', {
          type: 'warning',
        }).then(() => {
          this.listLoading = true;
          // NProgress.start();
          const params = { ids };
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
