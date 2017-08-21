<template>
  <v-layout>
    <v-panel contextual-style="primary">
      <h1 class="panel-title"
      slot="heading"
      >
      All listeners
    </h1>
    <div slot="body">
    <p><router-link :to="{ name: 'listener.create' }" class="btn btn-primary">Create Listener</router-link></p>

        <div class="form-group">
          <input type="text" name="search" v-model="listenerSearch" placeholder="Search listeners" class="form-control" v-on:keyup="searchListeners">
        </div>
      <table class="table table-striped">
        <thead>
          <tr>
            <td>ID</td>
            <td>Name</td>
            <td>SIP Port</td>
            <td>Actions</td>
          </tr>
        </thead>

        <tbody>
          <tr v-for="listener in listeners">
            <td>{{ listener.id }}</td>
            <td>{{ listener.name }}</td>
            <td>{{ listener.sipPort }}</td>
            <td>
              <router-link :to="{name: 'listener.edit', params: { id: listener.id }}" class="btn btn-primary">Edit</router-link>
              <router-link :to="{name: 'listener.delete', params: { id: listener.id }}" class="btn btn-danger">Delete</router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div slot="footer">
       footer
    </div>
    </v-panel>
  </v-layout>
</template>

<script>

  export default {
    components: {
      VLayout: require('@/layouts/default.vue'),
      VPanel: require('@/components/panel.vue'),
    },
    data() {
      return {
        listeners: [],
        originalListeners: [],
        listenerSearch: '',
      };
    },

    created() {
      this.fetchListenerData();
    },

    methods: {
      formatter(row, column) {
        return row.address;
      },

      fetchListenerData() {
        this.$http.get('http://localhost:3000/api/listeners').then((response) => {
          this.listeners = response.body;
          this.originalListeners = this.listeners;
        }, (response) => {

        });
      },

      searchListeners() {
        if (this.listenerSearch === '') {
          this.listeners = this.originalListeners;
          return;
        }

        const searchedListeners = [];
        for (let i = 0; i < this.originalListeners.length; i++) {
          const listenerName = this.originalListeners[i].name.toLowerCase();
          if (listenerName.indexOf(this.listenerSearch.toLowerCase()) >= 0) {
            searchedListeners.push(this.originalListeners[i]);
          }
        }
        this.listeners = searchedListeners;
      },
    },
  };
</script>

