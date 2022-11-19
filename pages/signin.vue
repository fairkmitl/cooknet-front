<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="100%" max-width="600px">
      <v-card class="rounded-lg py-5" align="center">
        <v-card-title>
          <span class="text-h5 mx-auto">Cooknet</span>
        </v-card-title>
        <v-form @submit.prevent="login" id="check-login-form">
          <v-card-text class="py-0">
            <v-container class="pt-5">
              <v-row class="pa-0">
                <v-col cols="12" sm="12" md="6" class="pa-0">
                  <v-text-field
                    append-icon="mdi-account"
                    class="rounded-lg"
                    outlined
                    dense
                    label="Username"
                    v-model="loginForm.username"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="6" class="pa-0">
                  <v-text-field
                    :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show_password ? 'text' : 'password'"
                    class="rounded-lg"
                    @click:append="show_password = !show_password"
                    outlined
                    dense
                    label="Password"
                    v-model="loginForm.password"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions class="mt-2 px-4">
            <v-btn
              type="submit"
              color="primary rounded-lg"
              dark
              block
              form="check-login-form"
            >
              Sign In
            </v-btn>
          </v-card-actions>
          <v-card-actions class="mt-2 px-4">
            <v-btn color="rounded-lg" dark block @click="signUp()">
              Sign Up
            </v-btn>
          </v-card-actions>
        </v-form>

        <v-expand-x-transition>
          <v-alert
            width="90%"
            v-show="alert"
            border="top"
            colored-border
            type="error"
            elevation="2"
            class="mt-5"
          >
            {{ alert_message }}
          </v-alert>
        </v-expand-x-transition>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  layout: "blank",
  data: () => ({
    alert: false,
    alert_message: "เข้าสู่ระบบไม่สำเร็จ",
    dialog: true,
    loginForm: {
      username: "",
      password: "",
    },
    show_password: false,
  }),
  mounted() {},
  methods: {
    async login() {
      try {
        let resp = await this.$auth
          .loginWith("local", {
            data: this.loginForm,
          })
          .finally(() => {
            this.$nextTick(() => {
              this.$nuxt.$loading.finish();
            });
          });

        if (resp && resp.data && resp.data.accessToken) {
          this.$router.push("/home");
        } else {
          this.alert = true;
        }
      } catch (e) {
        this.alert = true;
      }
    },
    signUp() {
      console.log("sign up");
      this.$router.push("/signup");
    },
  },
};
</script>

<style scoped></style>
