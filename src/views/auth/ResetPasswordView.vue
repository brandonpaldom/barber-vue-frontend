<script setup>
import { onMounted, reactive, inject } from 'vue'
import authApi from '../../services/authApi'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'

const toast = inject('toast')

const route = useRoute()
const router = useRouter()
const { token } = route.params

const validToken = ref(false)

const formData = reactive({
  password: '',
  password_confirm: '',
})

onMounted(async () => {
  try {
    await authApi.verifyResetPasswordToken(token)
    validToken.value = true
    toast.open({
      type: 'success',
      message: 'Token is valid',
    })
  } catch (error) {
    toast.open({
      type: 'error',
      message: error.response.data.error,
    })
    router.push({ name: 'forgot-password' })
  }
})

const submitHandler = async ({ password }) => {
  try {
    await authApi.resetPassword(token, { password })
    toast.open({
      type: 'success',
      message: 'Password reset successfully',
    })
    router.push({ name: 'login' })
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
    <h1>Reset Password</h1>
    <div class="w-full max-w-[480px]">
      <FormKit
        id="reset-password-form"
        type="form"
        :actions="false"
        form-class="grid grid-cols-1 gap-6"
        @submit="submitHandler"
        :value="formData"
      >
        <FormKit
          type="password"
          label="Password"
          name="password"
          validation="required|length:6"
          :validation-messages="{
            required: 'Password is required',
            length: 'Password must be at least 6 characters',
          }"
        />
        <FormKit
          type="password"
          label="Confirm password"
          name="password_confirm"
          validation="required|confirm"
          :validation-messages="{
            required: 'Confirm password is required',
            length: 'Confirm password must be at least 6 characters',
            match: 'Confirm password must match password',
          }"
        />
        <FormKit type="submit" label="Reset Password" />
      </FormKit>
    </div>
  </div>
</template>
