<template>
    <LoadingSpinner :isActive="state.isPageLoading">
        <div class="flex h-screen flex-1">
            <div class="relative hidden w-0 flex-1 lg:block">
                <img class="absolute inset-0 h-full w-full object-cover"
                    src="../public/cover.jpg"
                    alt="Image failed to load" />
            </div>
            <div
                class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 dark:bg-primary">
                <div class="mx-auto w-full max-w-sm lg:w-96">
                    <div class="mx-auto w-60">
                        <div class="text-center">
                            <h2 class="text-2xl text-gray-900 dark:text-white">Login to your account</h2>
                        </div>
                    </div>
                    <form class="mt-10 space-y-5" method="POST" @submit.prevent="login">
                        <Alert type="danger" :text="state?.error?.message" v-if="state.error" />
                        <div class="space-y-1">
                            <FormLabel for="email" label="Email" />
                            <FormTextField id="email" name="email" placeholder="Email" v-model="state.email" />
                            <FormError
                                :error="v$.email && v$.email.$errors && v$.email.$errors.length > 0 ? v$.email.$errors[0].$message : null" />
                            <FormError
                                :error="state.error && state.error.errors && state.error.errors.email && state.error.errors.email[0]" />
                        </div>
                        <div class="space-y-1">
                            <FormLabel for="password" label="Password" />
                            <FormPasswordField id="password" name="password" placeholder="Password"
                                v-model="state.password" />
                            <FormError
                                :error="v$.password && v$.password.$errors && v$.password.$errors.length > 0 ? v$.password.$errors[0].$message : null" />
                            <FormError
                                :error="state.error && state.error.errors && state.error.errors.password && state.error.errors.password[0]" />
                        </div>
                        <div>
                            <FormButton type="submit" buttonStyle="primary" class="w-full">
                                Login
                            </FormButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </LoadingSpinner>
</template>

<script setup lang="ts">
import { authService } from '@/components/api/AuthService'
import { useVuelidate } from "@vuelidate/core"
import { required, helpers } from '@vuelidate/validators'

const state = reactive({
    email: null,
    error: null,
    isPageLoading: false,
    password: null,
})

const rules = computed(() => {
    return {
        email: {
            required: helpers.withMessage('This field is required.', required),
        },
        password: {
            required: helpers.withMessage('This field is required.', required),
        },
    }
})
const v$ = useVuelidate(rules, state)

async function login() {
    state.error = null
    v$.value.$validate()
    if (!v$.value.$error) {
        state.isPageLoading = true
        try {
            const params = {
                email: state.email,
                password: state.password,
            }
            const response = await authService.login(params)
            if (response.data) {
                localStorage.setItem("_token", response.data?.token)
                navigateTo('/admin/students')
            }
        } catch (error: any) {
            state.error = error
        }
        state.isPageLoading = false
    }
}
</script>