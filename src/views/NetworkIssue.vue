<template>
  <div>
    <h1>Uh-Oh</h1>
    <p>
      it seems you have encountered a network issue
      <router-link :to="{ name: 'event-list' }" />G o back to the previous page
    </p>
  </div>
</template>

