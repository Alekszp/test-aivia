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
              class="mb-3"
              :error="v$.email.$error"
              :error-messages="v$.email.$errors[0]?.$message"
              @blur="v$.email.$touch"
            />
            <v-spacer></v-spacer>
            <v-text-field
              type="password"
              v-model="state.password"
              label="password"
              :error="v$.password.$error"
              :error-messages="v$.password.$errors[0]?.$message"
              @blur="v$.password.$touch"
            />

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
import { required, email, minLength, helpers } from '@vuelidate/validators'
import { REQUIRED_FIELD, INVALID_EMAIL, INVALID_PASSWORD } from '../helpers/validationMessages'

export default {
  setup() {
    const state = reactive({
      email: '',
      password: ''
    })

    const rules = {
      email: {
        required: helpers.withMessage(REQUIRED_FIELD, required),
        email: helpers.withMessage(INVALID_EMAIL, email)
      },
      password: {
        required: helpers.withMessage(REQUIRED_FIELD, required),
        minLength: helpers.withMessage(INVALID_PASSWORD, minLength(6))
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
