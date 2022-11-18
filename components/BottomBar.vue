<template>
  <div>
    <v-bottom-navigation
      color="indigo"
      fixed
      class="d-flex justify-space-around"
    >
      <v-btn icon to="/home" nuxt>
        <v-icon>fas fa-home</v-icon>
      </v-btn>
      <v-btn icon to="/bookmark" nuxt>
        <v-icon>fas fa-bookmark</v-icon>
      </v-btn>
      <v-btn
        class="btn-rounded pa-9"
        dark
        absolute
        top
        fab
        color="primary"
        to="/recipe/create"
        nuxt
      >
        <v-icon x-large color="white">fas fa-plus</v-icon>
      </v-btn>

      <v-btn icon to="/recipe/customize" nuxt>
        <v-icon>fas fa-utensils</v-icon>
      </v-btn>
      <v-btn icon to="/profile" nuxt>
        <v-icon>fas fa-user-alt</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
export default {
  auth:false,
  head: () => ({}),
  data: () => ({}),
  created() {},
  computed: {},

  components: {},
  watch: {},
  methods: {},
};
</script>
<style scoped>
.card-content {
  border-radius: 8px !important;
}
.card-content:hover {
  cursor: pointer;
  transform: scale(1.03);
  box-shadow: 0 13px 40px -5px hsla(240, 30.1%, 28%, 0.12),
    0 8px 32px -8px hsla(0, 0%, 0%, 0.14),
    0 -6px 32px -6px hsla(0, 0%, 0%, 0.02);
}

.v-bottom-navigation .v-btn.btn-rounded {
  border-radius: 50%;
  box-shadow: 0 3px 5px -1px rgb(0 0 0 / 20%), 0 6px 10px 0 rgb(0 0 0 / 14%),
    0 1px 18px 0 rgb(0 0 0 / 12%);
}

.v-btn--fab.v-btn--absolute {
  top: -30px !important;
}
.v-item-group.v-bottom-navigation .v-btn.v-btn--active {
  background-color: white !important;
}
</style>
