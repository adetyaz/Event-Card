<template>
  <div>
    <h1>Uh-Oh</h1>
    <p>
      it seems you have encountered a network issue
      <router-link :to="{ name: 'event-list' }"
        >Go back to the previous page</router-link
      >
    </p>
  </div>
</template>
