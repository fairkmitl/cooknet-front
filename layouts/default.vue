<template>
  <v-app dark>
    <v-main>
      <v-container class="pb-16 mb-10 pt-8 px-4">
        <Nuxt />
      </v-container>
      <BottomBar />
    </v-main>

    <!-- <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->
  </v-app>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>
