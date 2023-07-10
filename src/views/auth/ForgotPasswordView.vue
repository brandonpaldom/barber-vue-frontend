<script setup>
import { inject, reactive } from 'vue'
import { reset } from '@formkit/core'
import LoginLink from '../../components/LoginLink.vue'
import RegisterLink from '../../components/RegisterLink.vue'
import authApi from '../../services/authApi'

const toast = inject('toast')

const formData = reactive({
  email: '',
})

const submitHandler = async ({ email }) => {
  try {
    await authApi.forgotPassword({ email })
    toast.open({
      type: 'success',
      message: 'Email sent',
    })
    reset('forgot-password-form')
    setTimeout(() => {
      router.push({ name: 'login' })
    }, 3000)
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
    <h1>Forgot Password</h1>
    <div class="w-full max-w-[480px]">
      <FormKit
        id="forgot-password-form"
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
        <FormKit type="submit" label="Send Email" />
      </FormKit>
    </div>
    <div class="mt-4 flex flex-col gap-2">
      <LoginLink />
      <RegisterLink />
    </div>
  </div>
</template>
