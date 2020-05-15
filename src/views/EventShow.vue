<template>
  <h1>Events Show {{ event.title }}</h1>
</template>

<script>
import EventService from '@/services/EventService.js';

export default {
  props: ['id'],

  data() {
    return {
      event: {}
    };
  },
  created() {
    EventService.getEvent(this.id)
      .then(res => {
        this.event = res.data;
      })
      .catch(err => {
        console.log('This could not be loaded due to' + err);
      });
  }
};
</script>
