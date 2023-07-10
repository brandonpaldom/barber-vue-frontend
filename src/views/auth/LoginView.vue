<script setup>
import { reactive, inject } from 'vue'
import { useRouter } from 'vue-router'
import authApi from '../../services/authApi'
import RegisterLink from '../../components/RegisterLink.vue'
import ForgotPasswordLink from '../../components/ForgotPasswordLink.vue'

const toast = inject('toast')
const router = useRouter()

const formData = reactive({
  email: '',
  password: '',
})

const submitHandler = async (formData) => {
  try {
    const {
      data: { token },
    } = await authApi.login(formData)

    localStorage.setItem('token', token)
    router.push({ name: 'my-appointments' })
  } catch (error) {
    toast.open({
      type: 'error',
      message: error.response.data.error,
    })
  }
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <h1>Login</h1>
    <div class="w-full max-w-[480px]">
      <FormKit
        id="login-form"
        type="form"
        :actions="false"
        form-class="grid grid-cols-1 gap-6"
        @submit="submitHandler"
        :value="formData"
      >
        <FormKit
          type="text"
          label="Email"
          name="email"
          validation="required|email"
          :validation-messages="{
            required: 'Email is required',
            email: 'Email must be valid',
          }"
        />
        <FormKit
          type="password"
          label="Password"
          name="password"
          validation="required"
          :validation-messages="{
            required: 'Password is required',
          }"
        />
        <FormKit type="submit" label="Login" />
      </FormKit>
    </div>
    <div class="mt-4 flex flex-col gap-2">
      <ForgotPasswordLink />
      <RegisterLink />
    </div>
  </div>
</template>
