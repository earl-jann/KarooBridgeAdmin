<template>
  <el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
    <el-form-item label="TLS Certificate Authority File">
      <!-- <el-input v-model="form.tlsCaFile" type="disabled" width="50"></el-input> -->
      <el-upload
        class="upload-demo"
        ref="upload"
        action="someUrl"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">select file</el-button>
        <el-button size="small" type="success" @click="submitUpload">upload</el-button>
        <div class="el-upload__tip" slot="tip">CA files with a size less than 500kb</div>
      </el-upload>
    </el-form-item>
    <el-form-item label="TLS CA Path">
      <el-input v-model="form.tlsCaPath"></el-input>
    </el-form-item>

    <el-form-item label="TLS Server Certificate Authority File"><!--
      <el-input v-model="form.tlsCertificateFile" type="disabled" width="50"></el-input> -->
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

    <el-form-item label="TLS Server Private Key File"><!--
      <el-input v-model="form.tlsPrivateKeyFile" type="disabled" width="50"></el-input> -->
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

    <el-form-item label="TLS Certificate Password">
      <el-input type="password" v-model="form.tlsCertPassword"></el-input>
    </el-form-item>

    <el-form-item label="TLS Verification Mode">
      <el-tooltip :content="'Toggle to enable/disable'" placement="top">
        <el-switch
          v-model="form.tlsVerifyPeer"
          on-color="#13ce66"
          off-color="#ff4949"
          on-value="1"
          off-value="0">
        </el-switch>
      </el-tooltip>
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
          tlsCaFile: '',
          tlsCaPath: '',
          tlsServerCertificateFile: '',
          tlsPrivateKeyFile: '',
          tlsCertPassword: '',
          tlsVerifyPeer: 1,
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
