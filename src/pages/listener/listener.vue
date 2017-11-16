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
      <el-table-column prop="id" label="Name" width="300" sortable>
      </el-table-column>
        <el-table-column prop="description" label="Description" width="250" sortable>
      </el-table-column>
      <el-table-column prop="ipAddress" label="IP Address" width="150" sortable>
      </el-table-column>
      <el-table-column prop="externalAddress" label="Ext Address" width="150" sortable>
      </el-table-column>
      <el-table-column label="Actions">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-col :span="24" class="toolbar">
      <!--<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">Delete Batch</el-button>-->
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
      </el-pagination>
    </el-col>
    <el-dialog title="Edit" v-model="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item label="Name" prop="id">
          <el-input v-model="editForm.id" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="Description" prop="description">
          <el-input v-model="editForm.description" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="IP Address" prop="ipAddress">
          <el-tooltip :content="$t('listeners.ip_address')" placement="top">
            <el-input v-model="editForm.ipAddress" auto-complete="off"></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="Default" prop="default">
          <el-tooltip :content="$t('listeners.default_enabled')" placement="top">
            <el-switch
              v-model="editForm.default"
              on-color="#13ce66"
              off-color="#ff4949">
            </el-switch>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="External Address" prop="externalAddress">
          <el-tooltip :content="$t('listeners.external_address')" placement="top">
            <el-input type="textarea" v-model="editForm.externalAddress"></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="TCP Enabled" prop="tcpEnabled">
          <el-tooltip :content="$t('listeners.tcp_enabled')" placement="top">
            <el-switch
              v-model="editForm.tcpEnabled"
              on-color="#13ce66"
              off-color="#ff4949">
            </el-switch>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="UDP Enabled" prop="udp_enabled">
          <el-tooltip :content="$t('listeners.udp_enabled')" placement="top">
            <el-switch
              v-model="editForm.udpEnabled"
              on-color="#13ce66"
              off-color="#ff4949">
            </el-switch>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="Websocket Enabled" prop="wsEnabled">
          <el-tooltip :content="$t('listeners.ws_enabled')" placement="top">
            <el-switch
              v-model="editForm.wsEnabled"
              on-color="#13ce66"
              off-color="#ff4949">
            </el-switch>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="Secure Websocket Enabled" prop="wssEnabled">
          <el-tooltip :content="$t('listeners.wss_enabled')" placement="top">
            <el-switch
              v-model="editForm.wssEnabled"
              on-color="#13ce66"
              off-color="#ff4949">
            </el-switch>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="TLS Enabled" prop="tlsEnabled">
          <el-tooltip :content="$t('listeners.tls_enabled')" placement="top">
            <el-switch
              v-model="editForm.tlsEnabled"
              on-color="#13ce66"
              off-color="#ff4949">
            </el-switch>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="SIP Port" prop="sipPort">
          <el-tooltip :content="$t('listeners.sip_port')" placement="top">
            <el-input-number v-model="editForm.sipPort" :min="1" :max="65535"></el-input-number>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="TLS Port" prop="tlsPort">
          <el-tooltip :content="$t('listeners.tls_port')" placement="top">
            <el-input-number v-model="editForm.tlsPort" :min="1" :max="65535"></el-input-number>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="WS Port" prop="wsPort">
          <el-tooltip :content="$t('listeners.ws_port')" placement="top">
            <el-input-number v-model="editForm.wsPort" :min="1" :max="65535"></el-input-number>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="WSS Port" prop="wssPort">
          <el-tooltip :content="$t('listeners.wss_port')" placement="top">
            <el-input-number v-model="editForm.wssPort" :min="1" :max="65535"></el-input-number>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="Subnets" prop="subnets">
          <el-tooltip :content="$t('listeners.subnets')" placement="top">
            <el-input type="textarea" v-model="editForm.subnets"></el-input>
          </el-tooltip>
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
          <el-tooltip :content="$t('listeners.ip_address')" placement="top">
            <el-input v-model="addForm.ipAddress" auto-complete="off"></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="Default" prop="default">
          <el-tooltip :content="$t('listeners.default_enabled')" placement="top">
            <el-switch
              v-model="addForm.default"
              on-color="#13ce66"
              off-color="#ff4949">
            </el-switch>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="External Address" prop="externalAddress">
          <el-tooltip :content="$t('listeners.external_address')" placement="top">
            <el-input type="textarea" v-model="addForm.externalAddress"></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="TCP Enabled" prop="tcpEnabled">
          <el-tooltip :content="$t('listeners.tcp_enabled')" placement="top">
            <el-switch
              v-model="addForm.tcpEnabled"
              on-color="#13ce66"
              off-color="#ff4949">
            </el-switch>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="UDP Enabled" prop="udp_enabled">
          <el-tooltip :content="$t('listeners.udp_enabled')" placement="top">
            <el-switch
              v-model="addForm.udpEnabled"
              on-color="#13ce66"
              off-color="#ff4949">
            </el-switch>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="Websocket Enabled" prop="wsEnabled">
          <el-tooltip :content="$t('listeners.ws_enabled')" placement="top">
            <el-switch
              v-model="addForm.wsEnabled"
              on-color="#13ce66"
              off-color="#ff4949">
            </el-switch>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="Secure Websocket Enabled" prop="wssEnabled">
          <el-tooltip :content="$t('listeners.wss_enabled')" placement="top">
            <el-switch
              v-model="addForm.wssEnabled"
              on-color="#13ce66"
              off-color="#ff4949">
            </el-switch>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="TLS Enabled" prop="tlsEnabled">
          <el-tooltip :content="$t('listeners.tls_enabled')" placement="top">
            <el-switch
              v-model="addForm.tlsEnabled"
              on-color="#13ce66"
              off-color="#ff4949">
            </el-switch>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="SIP Port" prop="sipPort">
          <el-tooltip :content="$t('listeners.sip_port')" placement="top">
            <el-input-number v-model="addForm.sipPort" :min="1" :max="65535"></el-input-number>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="TLS Port" prop="tlsPort">
          <el-tooltip :content="$t('listeners.tls_port')" placement="top">
            <el-input-number v-model="addForm.tlsPort" :min="1" :max="65535"></el-input-number>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="WS Port" prop="wsPort">
          <el-tooltip :content="$t('listeners.ws_port')" placement="top">
            <el-input-number v-model="addForm.wsPort" :min="1" :max="65535"></el-input-number>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="WSS Port" prop="wssPort">
          <el-tooltip :content="$t('listeners.wss_port')" placement="top">
            <el-input-number v-model="addForm.wssPort" :min="1" :max="65535"></el-input-number>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="Subnets" prop="subnets">
          <el-tooltip :content="$t('listeners.subnets')" placement="top">
            <el-input type="textarea" v-model="addForm.subnets"></el-input>
          </el-tooltip>
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
  import InterfaceProxy from '@/proxies/InterfaceProxy';

  export default {

    data() {
      const validateIpAddress = ((rule, value, callback) => {
        const ipRegex = /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/;
        let result = value.match(ipRegex);

        if (!result) {
          result = callback(new Error('Please input a Valid IP Address'));
        } else {
          result = callback();
        }
        return result;
      });
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
          ipAddress: [
          { validator: validateIpAddress, trigger: 'blur' },
          ],
        },

        editForm: {
          id: '',
          description: '',
          ipAddress: '',
          default: false,
          externalAddress: '',
          tcpEnabled: false,
          udpEnabled: false,
          wsEnabled: false,
          wssEnabled: false,
          tlsEnabled: false,
          sipPort: '',
          tlsPort: '',
          wsPort: '',
          wssPort: '',
          subnets: '',
        },

        addFormVisible: false,
        addLoading: false,
        addFormRules: {
          id: [
          { required: true, message: 'Please enter a valid name', trigger: 'blur' },
          ],
          externalAddress: [
          { required: true, message: 'Please enter a valid external address', trigger: 'blur' },
          ],
          ipAddress: [
          { validator: validateIpAddress, trigger: 'blur' },
          ],
        },

        addForm: {
          id: '',
          description: '',
          ipAddress: '',
          default: false,
          externalAddress: '',
          tcpEnabled: false,
          udpEnabled: false,
          wsEnabled: false,
          wssEnabled: false,
          tlsEnabled: false,
          sipPort: '',
          tlsPort: '',
          wsPort: '',
          wssPort: '',
          subnets: '',
        },
      };
    },

    methods: {

      handleCurrentChange(val) {
        this.page = val;
        this.getListeners();
      },

      getListeners() {
        // sample: {"where":{"id":"LISTENER_ID"}}
        // filter[where][property]=value
        // const params = {
        //   page: this.page,
        //   id: this.filters.id,
        // };
        const params = {
          'filter[where][id]': this.filters.id,
        };
        this.listLoading = true;
        // NProgress.start();
        new InterfaceProxy(params).findAll().then((response) => {
          if (typeof response !== 'undefined'
            && response.length > 0
            && typeof response[0].id !== 'undefined'
            && response[0].id !== 'undefined') {
            this.total = response.length;
            this.listeners = response;
          } else {
            this.total = 0;
            this.listeners = [];
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
          new InterfaceProxy().destroy(obj.id).then((response) => {
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
          default: false,
          externalAddress: '',
          tcpEnabled: false,
          udpEnabled: false,
          wsEnabled: false,
          wssEnabled: false,
          tlsEnabled: false,
          sipPort: '',
          tlsPort: '',
          wsPort: '',
          wssPort: '',
          subnets: '',
        };
      },

      editSubmit() {
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$confirm('Are you sure?', 'prompt', { type: 'warning' }).then(() => {
              this.editLoading = true;
              // NProgress.start();
              const obj = Object.assign({}, this.editForm);
              new InterfaceProxy().update(obj.id, obj).then((response) => {
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
            this.$confirm('Are you sure?', 'prompt', { type: 'warning' }).then(() => {
              this.addLoading = true;
              // NProgress.start();
              const obj = Object.assign({}, this.addForm);
              new InterfaceProxy().create(obj).then((response) => {
                this.addLoading = false;
                // NProgress.done();
                this.$message({
                  message: 'Success',
                  type: 'success',
                });
                this.$refs.addForm.resetFields();
                this.addFormVisible = false;
                this.getListeners();
              }).catch((error) => {
                Vue.console.error(error);
                this.$message({
                  message: 'Error in creating record!',
                  type: 'error',
                });
                this.addLoading = false;
              });
            });
          }
        });
      },
      selsChange(sels) {
        this.sels = sels;
      },
      // not needed, stub
      batchRemove() {
        const ids = this.sels.map(item => item.id).toString();
        this.$confirm('Delete the selected records?', 'prompt', {
          type: 'warning',
        }).then(() => {
          this.listLoading = true;
          // NProgress.start();
          const params = { ids };
          // unsupported
          // listenerService.batchRemoveListener(params).then((res) => {
          //   this.listLoading = false;
          //   // NProgress.done();
          //   this.$message({
          //     message: 'Success',
          //     type: 'success',
          //   });
          //   this.getListeners();
          // });
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
