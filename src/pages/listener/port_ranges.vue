<template>
	<el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
    <el-form-item label="SIP TCP Port Range">
        <el-input-number v-model="form.sipTcpPortBase" @change=""></el-input-number>
        <el-input-number v-model="form.sipTcpPortMax" @change=""></el-input-number>
    </el-form-item>
    <el-form-item label="RTP Proxy Port Range">
        <el-input-number v-model="form.rtpProxyPortBase" @change=""></el-input-number>
        <el-input-number v-model="form.rtpProxyPortMax" @change=""></el-input-number>
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
          sipTcpPortBase: 10000,
          sipTcpPortMax: 15000,
          rtpProxyPortBase: 30000,
          rtpProxyPortMax: 60000,
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
