<template>
  <section>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.address" placeholder="Address"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getPacketRateWhitelist">Search</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">New</el-button>
        </el-form-item>
      </el-form>
      <i class="el-icon-information"> </i>
      <em>{{ $t('autoban.packet_rate_white_list') }}</em>
    </el-col>
    <el-table :data="packetRateWhitelist" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
      <el-table-column prop="address" label="Address" width="200" sortable>
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
        <el-input v-model="editForm.id" type="hidden"></el-input>
        <el-form-item label="Address" prop="address">
          <el-input v-model="editForm.address"></el-input>
        </el-form-item>
        <el-form-item label="Type">
          <el-radio-group v-model="editForm.type" size="small">
            <el-radio-button label="SOURCE_IP" border>IP Address</el-radio-button>
            <el-radio-button label="SOURCE_NETWORK" border>Network</el-radio-button>
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
        <el-input v-model="addForm.id" type="hidden"></el-input>
        <el-form-item label="Address" prop="address">
          <el-input v-model="addForm.address" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Type">
          <el-radio-group v-model="addForm.type" size="small">
            <el-radio-button label="SOURCE_IP" border>IP Address</el-radio-button>
            <el-radio-button label="SOURCE_NETWORK" border>Network</el-radio-button>
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
  import PacketRateWhitelistProxy from '@/proxies/PacketRateWhitelistProxy';

  export default {

    data() {
      const validateIpAddress = ((rule, value, callback) => {
        const ipRegex = /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/;
        const ipSubnetRegex = /^([1-9]|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])(\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])){3}\/\d+$/;
        let result = '';
        let isSourceIp = false;

        if (this.addForm.type === 'SOURCE_IP'
          || this.editForm.type === 'SOURCE_IP') {
          isSourceIp = true;
        }

        if (isSourceIp) {
          result = value.match(ipRegex);
        } else {
          result = value.match(ipSubnetRegex);
        }

        if (!result) {
          result = callback(new Error('Please input a Valid IP Address'));
        } else {
          result = callback();
        }
        return result;
      });
      return {
        filters: {
          address: '',
        },
        packetRateWhitelist: [],
        total: 0,
        page: 1,
        listLoading: false,
        sels: [],
        editFormVisible: false,
        editLoading: false,
        editFormRules: {
          address: [
          { required: true, message: 'Please enter a valid address', trigger: 'blur' },
          { validator: validateIpAddress, trigger: 'blur' },
          ],
        },

        editForm: {
          id: '',
          address: '',
          type: '',
        },

        addFormVisible: false,
        addLoading: false,
        addFormRules: {
          address: [
          { required: true, message: 'Please enter a valid address', trigger: 'blur' },
          { validator: validateIpAddress, trigger: 'blur' },
          ],
        },

        addForm: {
          id: '',
          address: '',
          type: '',
        },
      };
    },

    methods: {
      formatType(row, column) {
        let result = '';
        if (row.type === 'SOURCE_IP') {
          result = 'Source IP';
        } else if (row.type === 'SOURCE_NETWORK') {
          result = 'Source Network';
        }
        return result;
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getListeners();
      },

      getPacketRateWhitelist() {
        const params = {
          'filter[where][address]': this.filters.address,
        };
        this.listLoading = true;
        // NProgress.start();
        new PacketRateWhitelistProxy(params).findAll().then((response) => {
          if (typeof response !== 'undefined'
            && response.length > 0
            && typeof response[0].id !== 'undefined'
            && response[0].id !== 'undefined') {
            this.total = response.length;
            this.packetRateWhitelist = response;
          } else {
            this.total = 0;
            this.packetRateWhitelist = [];
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
          new PacketRateWhitelistProxy().destroy(obj.id).then((response) => {
            this.listLoading = false;
            // NProgress.done();
            this.$message({
              message: 'Success',
              type: 'success',
            });
            this.getPacketRateWhitelist();
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
          address: '',
          type: '',
        };
      },

      editSubmit() {
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$confirm('Are you sure?', 'prompt', {}).then(() => {
              this.editLoading = true;
              // NProgress.start();
              const obj = Object.assign({}, this.editForm);
              new PacketRateWhitelistProxy().update(obj.id, obj).then((response) => {
                this.editLoading = false;
                // NProgress.done();
                this.$message({
                  message: 'Success',
                  type: 'success',
                });
                this.$refs.editForm.resetFields();
                this.editFormVisible = false;
                this.getPacketRateWhitelist();
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
              new PacketRateWhitelistProxy().create(obj).then((response) => {
                this.addLoading = false;
                // NProgress.done();
                this.$message({
                  message: 'Success',
                  type: 'success',
                });
                this.$refs.addForm.resetFields();
                this.addFormVisible = false;
                this.getPacketRateWhitelist();
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
      this.getPacketRateWhitelist();
    },
  };

</script>

<style scoped>

</style>
