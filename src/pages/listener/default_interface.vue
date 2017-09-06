<template>
	<el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
		<el-form-item label="Default Interface Address">
			<el-input v-model="form.defaultInterfaceAddress" placeholder="Enter a Valid Interface Address" width="50"></el-input>
		</el-form-item>
		<el-form-item label="Default Interface Port">
			<el-input-number v-model="form.deafultInterfacePort" :min="0" :max="200000"></el-input-number>
		</el-form-item>
    <el-form-item>
      <el-button type="primary">Submit</el-button>
      <el-button @click.native.prevent>Cancel</el-button>
    </el-form-item>
	</el-form>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          defaultInterfaceAddress: '',
          deafultInterfacePort: '',
        },
      };
    },
    methods: {
      onSubmit() {
        // console.log('submit!');
      },
    },
  };

</script>
