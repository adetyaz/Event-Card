<template>
  <div class="notification-bar" :class="notificationTypeClass">
    <p>{{ notification.message }}</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      timeOut: null
    };
  },
  mounted() {
    this.timeOut = setTimeout(() => this.remove(this.notification), 3500);
  },
  beforeDestroy() {
    clearTimeout(this.timeOut);
  },
  computed: {
    notificationTypeClass() {
      return `-text-${this.notification.type}`;
    }
  },
  methods: mapActions('notifications', ['remove'])
};
</script>

<style scoped>
.notification-bar {
  margin: 1em 0 1em;
}
</style>
