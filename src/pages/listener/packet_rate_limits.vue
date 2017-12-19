<template>
  <el-collapse v-model="activeCollapseNames" @change="handleCollapseChange">
    <el-collapse-item title="Limits" name="autoBanForm">
      <div>
        <el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;" :rules="formRules" v-loading="formLoading">
          <el-input type="hidden" v-model="form.id"></el-input>
          <el-form-item label="Packet Rate Min/Max Treshold">
            <el-tooltip :content="$t('autoban.packet_rate_ratio')" placement="top">
              <el-input-number v-model="form.packetRateMinTreshold"></el-input-number>
              <el-input-number v-model="form.packetRateMaxTreshold"></el-input-number>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="Packet Rate Treshold Ban Duration">
            <el-tooltip :content="$t('autoban.packet_rate_ratio')" placement="top">
              <el-input-number v-model="form.packetRateTresholdBanDuration"></el-input-number>
            </el-tooltip>
          </el-form-item>
          <el-input type="hidden" v-model="form.packetRateWhitelist"></el-input>
          <el-form-item label="Execute On Ban Script">
            <el-tooltip :content="$t('autoban.execute_on_ban')" placement="top">
              <input type="file" ref="executeOnBan" :name="executeOnBan"
                accept=".sh" @change="filesChange('executeOnBan', $event)">
              </input>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="Auto Null Route On Ban Enabled">
            <el-tooltip :content="$t('autoban.auto_null_route_on_ban')" placement="top">
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
      </div>
    </el-collapse-item>
    <el-collapse-item title="Whitelist" name="autoBanWhitelist">
      <div>
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
      </div>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
  import Vue from 'vue';
  import util from '@/common/js/util';
  import AutobanProxy from '@/proxies/AutobanProxy';
  import PacketRateWhitelistProxy from '@/proxies/PacketRateWhitelistProxy';

  export default {
    data() {
      // VALIDATION START
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
      // VALIDATION END
      return {
        // main collapsable view related data START
        activeCollapseNames: ['autoBanWhitelist'],
        // main collapsable view related data END

        // autoban form related data START
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
        // autoban form related data END

        // whitelist form related data START
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
        // whitelist form related data END
      };
    },
    methods: {
      handleCollapseChange(activeCollapseNames) {
        Vue.console.debug('activeCollapseNames: ' + activeCollapseNames);
      },
      // autoban form related methods START
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
      // autoban form related methods END

      // whitelist form related methods START
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
      // whitelist form related methods END
    },
    mounted() {
      this.getObject();
      this.getPacketRateWhitelist();
    },
  };

</script>

<style scoped>

</style>