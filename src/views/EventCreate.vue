
<template>
  <div>
    <h1>Event created by {{ user.name }}</h1>
    <ul>
      <li v-for="cat in categories" :key="cat">{{ cat }}</li>
    </ul>
    <p>the are {{ getEventById(2) }} categories</p>
  </div>
</template>

<script>
export default {};
</script>

<style scoped></style>
