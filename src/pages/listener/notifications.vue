<template>
    <div id="notifications">
        <div v-for="notification in notifications" :class="getNotificationClass(notification)">
            {{ notification.message }}
        </div>
    </div>
</template>

<script>
  export default{
    data() {
      return {

      };
    },

    methods: {
      getNotificationClass: function getNotificationClass(notification) {
        // const str = 'alert alert- ${notification}.type!';
        // return str;
        return notification.type;
      },
    },

    props: ['notifications'],
  };
</script>
