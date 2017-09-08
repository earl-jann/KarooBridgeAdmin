<template>
	<el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
    <el-form-item label="User Agent Name" prop="userAgentName">
      <el-input v-model="form.userAgentName" auto-complete="off" disabled></el-input>
    </el-form-item>
    <el-form-item label="Register State in Contact Parameters">
      <el-tooltip :content="'Toggle to enable/disable'" placement="top">
        <el-switch
          v-model="form.registerStateInContactParams"
          on-color="#13ce66"
          off-color="#ff4949"
          on-value="1"
          off-value="0">
        </el-switch>
      </el-tooltip>
    </el-form-item>
    <el-form-item label="Dialog State in Contact Parameters">
      <el-tooltip :content="'Toggle to enable/disable'" placement="top">
        <el-switch
          v-model="form.dialogStateInContactParams"
          on-color="#13ce66"
          off-color="#ff4949"
          on-value="1"
          off-value="0">
        </el-switch>
      </el-tooltip>
    </el-form-item>
    <el-form-item label="Enable Options Routing">
      <el-tooltip :content="'Toggle to enable/disable'" placement="top">
        <el-switch
          v-model="form.enableOptionsRouting"
          on-color="#13ce66"
          off-color="#ff4949"
          on-value="1"
          off-value="0">
        </el-switch>
      </el-tooltip>
    </el-form-item>
    <el-form-item label="Disable Options Keep Alive">
      <el-tooltip :content="'Toggle to enable/disable'" placement="top">
        <el-switch
          v-model="form.disableOptionsKeepAlive"
          on-color="#13ce66"
          off-color="#ff4949"
          on-value="1"
          off-value="0">
        </el-switch>
      </el-tooltip>
    </el-form-item>
    <el-form-item label="Require RTP for Registrations">
      <el-tooltip :content="'Toggle to enable/disable'" placement="top">
        <el-switch
          v-model="form.requireRtpForRegistrations"
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
          userAgentName: 'OSS Karoo Bridge',
          registerStateInContactParams: 1,
          dialogStateInContactParams: 1,
          enableOptionsRouting: 0,
          disableOptionsKeepAlive: 0,
          requireRtpForRegistrations: 1,
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
