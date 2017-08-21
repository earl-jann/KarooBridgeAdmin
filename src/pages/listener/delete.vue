<template>
  <v-layout>
    <v-panel contextual-style="primary">
      <h1 class="panel-title"
      slot="heading"
      >
  Delete Listener {{ listener.name }}

    </h1>
    <div id="delete-listener" slot="body">
    <p><router-link :to="{ name: 'listener.index' }">Return to listeners</router-link></p>

    <notification v-bind:notifications="notifications"></notification>

    <form v-on:submit.prevent="deleteListener">
      <p><button class="btn btn-danger">Delete Listener</button></p>
    </form>
  </div>
  </v-panel>
  </v-layout>
</template>


<script>
  import Notification from './notifications';

  export default{
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

      deleteListener() {
        this.$http.delete('http://localhost:3000/api/listener/delete/' + this.$route.params.id, this.listener, {
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((response) => {
          this.$router.push({ name: 'listener.index' });
        }, (response) => {
          this.notifications.push({
            type: 'danger',
            message: 'Listener could not deleted',
          });
        });
      },
    },
  };
</script>
