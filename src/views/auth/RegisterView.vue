<script setup>
import { reactive, inject } from 'vue'
import { useRouter } from 'vue-router'
import { reset } from '@formkit/vue'
import authApi from '../../services/authApi'
import LoginLink from '../../components/LoginLink.vue'

const router = useRouter()
const toast = inject('toast')

const formData = reactive({
  name: '',
  email: '',
  password: '',
})

const submitHandler = async ({ password_confirm, ...formData }) => {
  try {
    const { data } = await authApi.register(formData)
    toast.open({
      type: 'success',
      message: data.message,
    })
    reset('register-form')
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
    <h1>Create Account</h1>
    <div class="w-full max-w-[480px]">
      <FormKit
        id="register-form"
        type="form"
        :actions="false"
        form-class="grid grid-cols-1 gap-6"
        @submit="submitHandler"
        :value="formData"
      >
        <FormKit
          type="text"
          label="Name"
          name="name"
          validation="required|length:3"
          :validation-messages="{
            required: 'Name is required',
            length: 'Name must be at least 3 characters',
          }"
        />
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
        <FormKit type="submit" label="Create Account" />
      </FormKit>
    </div>
    <div class="mt-4 flex flex-col gap-2">
      <LoginLink />
    </div>
  </div>
</template>
