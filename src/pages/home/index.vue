<template>
  <v-layout>
    <v-panel
      contextual-style="primary"
    >
      <h1 class="panel-title" slot="heading">
        Welcome!
      </h1>
      <div slot="body">
      </div>
      <div slot="footer">
      </div>
    </v-panel>
  </v-layout>
</template>

<script>
  /* ============
   * Home Index Page
   * ============
   *
   * The home index page.
   */

  export default {
    components: {
      VLayout: require('@/layouts/default.vue'),
      VPanel: require('@/components/panel.vue'),
    },
  };
</script>
