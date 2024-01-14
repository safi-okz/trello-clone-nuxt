<script setup lang="ts">
import type { z } from 'zod';
import {Signin} from '../../schemas/Signin.schema';
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types';
// import {Signin} from '../../schemas/Signin.schema';

const { signIn } = useAuth();

const isLoading = ref(false);   
const formSate = reactive({
        email: undefined,
        password: undefined
});

const handleSignin = async (event: FormSubmitEvent<z.output<typeof Signin>>) => {
    try{
        isLoading.value = true;
        const res = await signIn('credentials', {
        email: formSate.email,
        password: formSate.password,
        redirect: false
    });

    console.log('login response ', res);

    if(!res.error){
        useRouter().push('/');
    }
    } catch(e) {
        console.log('signin issue', e.message);
    } finally {
        isLoading.value = false;
    }
}
</script>

<template>
<WrapperAuth title="Login to your account">
    <UForm :state="formSate" :schema="Signin" @submit="handleSignin">
        <UFormGroup class="mb-4" name="Email" label="Email">
            <UInput v-model="formSate.email" type="email"  />
        </UFormGroup>
        <UFormGroup class="mb-4" name="Password" label="Password">
        <UInput v-model="formSate.password" type="password" />
        </UFormGroup>
        <UButton :isLoading="isLoading" type="submit" block>Sign In</UButton>
    </UForm>
</WrapperAuth>
</template>

<style>
.right {
    background: linear-gradient(-45deg, #22c55e, #10b981, #84cc16, #23d5ac);
    background-size: 400% 400%;
    animation: grediant 5s ease infinite;
}

@keyframes grediant {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    } 
    100% {
        background-position: 0% 50%;
    }
}
</style>