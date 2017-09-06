<template>
	<el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
        <el-form-item label="Enabled">
          <el-radio-group v-model="form.enabled">
            <el-radio class="radio" :label="1">Yes</el-radio>
            <el-radio class="radio" :label="0">No</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Virtual IP Address" prop="virtualIpAddress">
          <el-input v-model="form.virtualIpAddress" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Interface Name" prop="interfaceName">
          <el-input v-model="form.interfaceName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Description" prop="description">
          <el-input v-model="form.description" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Source IP Address" prop="sourceIpAddress">
          <el-input v-model="form.ipAddress" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Up Script">
          <el-input type="textarea" v-model="form.upScript"></el-input>
        </el-form-item>
        <el-form-item label="Down Script">
          <el-input type="textarea" v-model="form.downScript"></el-input>
        </el-form-item>
        <el-form-item label="CARP Password" prop="password">
          <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="VHID">
          <el-input-number v-model="form.vhid" :min="1" :max="255"></el-input-number>
        </el-form-item>
        <el-form-item label="Preferred Master">
          <el-radio-group v-model="form.preferredMaster">
            <el-radio class="radio" :label="1">Yes</el-radio>
            <el-radio class="radio" :label="0">No</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="External Address">
          <el-input type="textarea" v-model="form.externalAddress"></el-input>
        </el-form-item>
        <el-form-item label="TCP Enabled">
          <el-radio-group v-model="form.tcpEnabled">
            <el-radio class="radio" :label="1">Yes</el-radio>
            <el-radio class="radio" :label="0">No</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="UDP Enabled">
          <el-radio-group v-model="form.udpEnabled">
            <el-radio class="radio" :label="1">Yes</el-radio>
            <el-radio class="radio" :label="0">No</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Websocket Enabled">
          <el-radio-group v-model="form.wsEnabled">
            <el-radio class="radio" :label="1">Yes</el-radio>
            <el-radio class="radio" :label="0">No</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="TLS Enabled">
          <el-radio-group v-model="form.tlsEnabled">
            <el-radio class="radio" :label="1">Yes</el-radio>
            <el-radio class="radio" :label="0">No</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="SIP Port">
          <el-input-number v-model="form.sipPort" :min="0" :max="200000"></el-input-number>
        </el-form-item>
        <el-form-item label="TLS Port">
          <el-input-number v-model="form.tlsPort" :min="0" :max="200000"></el-input-number>
        </el-form-item>
        <el-form-item label="WSS Port">
          <el-input-number v-model="form.wssPort" :min="0" :max="200000"></el-input-number>
        </el-form-item>
        <el-form-item label="Subnets">
          <el-input type="textarea" v-model="form.subnets"></el-input>
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
          enabled: '',
          virtualIpAddress: '',
          interfaceName: '',
          sourceIpAddress: '',
          upScript: '',
          carpPassword: '',
          vhid: '',
          preferredMaster: '',
          externalAddress: '',
          tcpEnabled: '',
          udpEnabled: '',
          wsEnabled: '',
          wssEnabled: '',
          tlsEnabled: '',
          sipPort: '',
          tlsPort: '',
          wsPort: '',
          wssPort: '',
          subnets: '',
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
