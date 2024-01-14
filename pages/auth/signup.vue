<script setup lang="ts">
import SignupSchema from '~/schemas/Signup.schema';
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types';
import type { z } from 'zod';

const isLoading = ref(false);
const formState = reactive({
        name: undefined,
        email: undefined,
        password: undefined,
        passwordConfrim: undefined
});

async function handleSignup (event: FormSubmitEvent<z.output<typeof SignupSchema>>) {
    try {
        isLoading.value = true;
        console.log('dddd')
       const res = await useFetch('/api/auth/signup', {
            method: "POST",
            body: JSON.stringify(formState),
            // watch: false
        });

        console.log('response ', res);
        useRouter().push('/aut/signin');
        useToast().add({
            title: 'Account created',
            description: 'Your account create successfully and redirect you to SignIn page',
            timeout: 2000
        });

    } catch(e:any){
        useToast().add({
            title: 'Error',
            description: e.message || 'Something went wrong',
            timeout: 2000
        });
    } finally {
        isLoading.value = false;
    }
}

</script>

<template>
    <WrapperAuth title="Create a free account">
        <UForm :state="formState" :schema="SignupSchema" @submit="handleSignup">
            <UFormGroup class="mb-4" name="name" label="Name">
                <UInput type="text" v-model="formState.name"></UInput>
            </UFormGroup>
            <UFormGroup class="mb-4" name="email" label="Email">
                <UInput type="email" v-model="formState.email"></UInput>
            </UFormGroup>
            <UFormGroup class="mb-4" name="password" label="Password">
                <UInput type="password" v-model="formState.password"></UInput>
            </UFormGroup>
            <UFormGroup class="mb-4" name="confirmPassword" label="Confirm Password">
                <UInput type="password" v-model="formState.passwordConfrim"></UInput>
            </UFormGroup>
            <UButton block type="submit" @click.prevent="handleSignup">Create account</UButton>
        </UForm>
    </WrapperAuth>
</template>