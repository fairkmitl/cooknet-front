<template>
  <v-app dark>
    <v-main>
      <v-container class="content">
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  auth: false,
  components: {},
  data() {
    return {};
  },
  mounted() {
    // if (
    //   /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    //     navigator.userAgent
    //   )
    // ) {
    //   this.$router.push({
    //     path: "/login",
    //   });
    // }
  },
};
</script>
