<template>
	<el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
    <el-form-item label="Packet Rate Min/Max Treshold">
        <el-input-number v-model="form.packetRateMinTreshold" @change=""></el-input-number>
        <el-input-number v-model="form.packetRateMaxTreshold" @change=""></el-input-number>
    </el-form-item>
    <el-form-item label="Packet Rate Treshold Ban Duration">
        <el-input-number v-model="form.packetRateBanDuration" @change=""></el-input-number>
    </el-form-item>
		<el-form-item label="Packet Rate Whitelist">
			<el-input v-model="form.packetRateWhitelist" type="textarea" placeholder=""></el-input>
		</el-form-item>
		<el-form-item label="Execute On Ban Script">
      <el-upload
        class="upload"
        ref="upload"
        action="someUrl"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">select file</el-button>
        <el-button size="small" type="success" @click="submitUpload">upload</el-button>
        <div class="el-upload__tip" slot="tip">CA files with a size less than 500kb</div>
      </el-upload>
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
          packetRateMinTreshold: 60,
          packetRateMaxTreshold: 100,
          packetRateBanDuration: 3600,
          packetRateWhitelist: '',
        },
      };
    },
    methods: {
      onSubmit() {
        // console.log('submit!');
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
    },
  };

</script>
