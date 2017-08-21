<template>
  <v-layout>
    <v-panel contextual-style="primary">
      <h1 class="panel-title"
      slot="heading">
        Update Listener {{ listener.name }}
      </h1>
    <p><router-link :to="{ name: 'listener.index' }">Return to listeners</router-link></p>

    <notification v-bind:notifications="notifications"></notification>

    <form v-on:submit.prevent="editListener">
      <div class="form-group">
        <label name="listener_id">ID</label>
        <input type="text" class="form-control" disabled v-model="listener.id" id="listener_id">
      </div>

      <div class="form-group">
        <label name="listener_name">Name</label>
        <input type="text" class="form-control" v-model="listener.name" id="listener_name" required>
      </div>

      <div class="form-group">
        <label name="listener_sipPort">Price</label>
        <input type="text" class="form-control" v-model="listener.sipPort" id="listener_sipPort" required>
      </div>

      <div class="form-group">
        <button class="btn btn-primary">Update</button>
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

  created() {
    this.getListener();
  },

  methods: {
    getListener() {
      this.$http.get('http://localhost:3000/api/listener/' + this.$route.params.id).then((response) => {
        this.listener = response.body;
      }, (response) => {

      });
    },

    editListener() {
    // Validation
      const price = parseFloat(this.listener.price);
      if (isNaN(price)) {
        this.notifications.push({
          type: 'danger',
          message: 'Price must be a number',
        });
        return false;
      }

      this.$http.patch('http://localhost:3000/api/listener/edit/' + this.$route.params.id, this.listener, {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        this.notifications.push({
          type: 'success',
          message: 'Listener updated successfully',
        });
      }, (response) => {
        this.notifications.push({
          type: 'error',
          message: 'Listener not updated',
        });
      });
      return 0;
    },
  },
};
</script>
