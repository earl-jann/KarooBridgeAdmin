<template>
  <v-layout>
    <v-panel contextual-style="primary">
      <h1 class="panel-title"
      slot="heading"
      >
      Create Listener
    </h1>
    <div slot="body">

        <p><router-link :to="{ name: 'listener.index' }">Return to listeners</router-link></p>

        <notification v-bind:notifications="notifications"></notification>

        <form v-on:submit.prevent="addListener">
            <div class="form-group">
                <label name="listener_id">ID</label>
                <input type="text" class="form-control" disabled v-model="listener.id" id="listener_id">
            </div>

            <div class="form-group">
                <label name="listener_name">Name</label>
                <input type="text" class="form-control" v-model="listener.name" id="listener_name" required>
            </div>

            <div class="form-group">
                <label name="listener_sipPort">SIP Port</label>
                <input type="text" class="form-control" v-model="listener.sipPort" id="listener_sipPort" required>
            </div>

            <div class="form-group">
                <button class="btn btn-primary">Create</button>
            </div>
        </form>
    </div>
    </v-panel>
    </v-layout>
</template>

<script>
  import Notification from './notifications';

  export default {
    components: {
      VLayout: require('@/layouts/default.vue'),
      VPanel: require('@/components/panel.vue'),
      notification: Notification,
    },

    data() {
      return {
        listener: {},
        notifications: [],
      };
    },

    methods: {
      addListener() {
        // Validation
        const sipPort = parseFloat(this.listener.sipPort);
        if (isNaN(sipPort)) {
          this.notifications.push({
            type: 'danger',
            message: 'SIP Port must be a number',
          });
        } else {
          this.listener.sipPort = this.listener.sipPort;
        }
      // call server
        this.$http.post('http://localhost:3000/api/listener/create', this.listener, {
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((response) => {
          this.notifications.push({
            type: 'success',
            message: 'Listener created successfully',
          });
        }, (response) => {
          this.notifications.push({
            type: 'error',
            message: 'Listener not created',
          });
        });
      },
    },
};
</script>
