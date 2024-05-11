<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center" no-gutters>
      <v-col class="d-flex justify-center">
        <v-form fast-fail @submit.prevent="submit">
          <v-card title="Login" class="pa-5" width="600">
            <v-text-field
              type="email"
              v-model="state.email"
              label="email"
              @blur="v$.email.$touch"
            />
            <v-text-field
              type="password"
              v-model="state.password"
              label="password"
              @blur="v$.password.$touch"
            />
            <v-spacer></v-spacer>
            <p v-if="v$.email.$error" class="text-red">Email required and must be valid</p>
            <p v-if="v$.password.$error" class="text-red">
              Password required and must be at least 6 characters
            </p>
            <v-card-actions>
              <v-btn type="submit">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
export default {
  setup() {
    const state = reactive({
      email: '',
      password: ''
    })
    const rules = {
      email: { required, email },
      password: {
        required,
        minLength: minLength(6)
      }
    }

    const v$ = useVuelidate(rules, state)

    return { state, v$ }
  },

  methods: {
    async submit() {
      const isFormCorrect = await this.v$.$validate()
      if (!isFormCorrect) return

      this.$router.push({ name: 'game' })
    }
  }
}
</script>
