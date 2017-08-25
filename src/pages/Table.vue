<template>
  <section>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.name" placeholder="Name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getUsers">Search</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">New</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="name" label="Name" width="120" sortable>
      </el-table-column>
      <el-table-column prop="sex" label="Sex" width="100" :formatter="formatSex" sortable>
      </el-table-column>
      <el-table-column prop="age" label="Age" width="100" sortable>
      </el-table-column>
      <el-table-column prop="birth" label="Birth" width="120" sortable>
      </el-table-column>
      <el-table-column prop="addr" label="Address" min-width="180" sortable>
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
        <el-form-item label="Name" prop="name">
          <el-input v-model="editForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Sex">
          <el-radio-group v-model="editForm.sex">
            <el-radio class="radio" :label="1">男</el-radio>
            <el-radio class="radio" :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Age">
          <el-input-number v-model="editForm.age" :min="0" :max="200"></el-input-number>
        </el-form-item>
        <el-form-item label="Date">
          <el-date-picker type="date" placeholder="Select Date" v-model="editForm.birth"></el-date-picker>
        </el-form-item>
        <el-form-item label="address">
          <el-input type="textarea" v-model="editForm.addr"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">Submit</el-button>
      </div>
    </el-dialog>

    <el-dialog title="New" v-model="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
        <el-form-item label="Name" prop="name">
          <el-input v-model="addForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Sex">
          <el-radio-group v-model="addForm.sex">
            <el-radio class="radio" :label="1">Male</el-radio>
            <el-radio class="radio" :label="0">Female</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Age">
          <el-input-number v-model="addForm.age" :min="0" :max="200"></el-input-number>
        </el-form-item>
        <el-form-item label="Date">
          <el-date-picker type="date" placeholder="Select Date" v-model="addForm.birth"></el-date-picker>
        </el-form-item>
        <el-form-item label="Address">
          <el-input type="textarea" v-model="addForm.addr"></el-input>
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
  import util from '../common/js/util';
  import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../services/user';

  export default {

    data() {
      return {
        filters: {
          name: '',
        },
        users: [],
        total: 0,
        page: 1,
        listLoading: false,
        sels: [],

        editFormVisible: false,
        editLoading: false,
        editFormRules: {
          name: [
          { required: true, message: 'Please enter your name', trigger: 'blur' },
          ],
        },

        editForm: {
          id: 0,
          name: '',
          sex: -1,
          age: 0,
          birth: '',
          addr: '',
        },

        addFormVisible: false,
        addLoading: false,
        addFormRules: {
          name: [
          { required: true, message: 'Please enter your name', trigger: 'blur' },
          ],
        },

        addForm: {
          name: '',
          sex: -1,
          age: 0,
          birth: '',
          addr: '',
        },
      };
    },

    methods: {

      formatSex(row, column) {
        switch (row.sex) {
          case 0: return 'Female';
          case 1: return 'Male';
          default : return 'Unknown';
        }
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getUsers();
      },

      getUsers() {
        const para = {
          page: this.page,
          name: this.filters.name,
        };
        this.listLoading = true;
        // NProgress.start();
        getUserListPage(para).then((res) => {
          this.total = res.data.total;
          this.users = res.data.users;
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
          const para = { id: row.id };
          removeUser(para).then((res) => {
            this.listLoading = false;
            // NProgress.done();
            this.$message({
              message: 'Success',
              type: 'success',
            });
            this.getUsers();
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
          sex: -1,
          age: 0,
          birth: '',
          addr: '',
        };
      },

      editSubmit() {
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$confirm('Are you sure?', 'prompt', {}).then(() => {
              this.editLoading = true;
              // NProgress.start();
              const para = Object.assign({}, this.editForm);
              para.birth = (!para.birth || para.birth === '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
              editUser(para).then((res) => {
                this.editLoading = false;
                // NProgress.done();
                this.$message({
                  message: 'Success',
                  type: 'success',
                });
                this.$refs.editForm.resetFields();
                this.editFormVisible = false;
                this.getUsers();
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
              para.birth = (!para.birth || para.birth === '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
              addUser(para).then((res) => {
                this.addLoading = false;
                // NProgress.done();
                this.$message({
                  message: 'Success',
                  type: 'success',
                });
                this.$refs.addForm.resetFields();
                this.addFormVisible = false;
                this.getUsers();
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
          const para = { ids };
          batchRemoveUser(para).then((res) => {
            this.listLoading = false;
            // NProgress.done();
            this.$message({
              message: 'Success',
              type: 'success',
            });
            this.getUsers();
          });
        }).catch(() => {
        });
      },
    },
    mounted() {
      this.getUsers();
    },
  };

</script>

<style scoped>

</style>
