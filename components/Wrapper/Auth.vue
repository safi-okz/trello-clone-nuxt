<script setup lang="ts">
interface Props {
    title: string
};

defineProps<Props>();
</script>

<template>
<div class="grid lg:grid-cols-2 h-screen">

    <div class="left place-self-center w-full px-8 md:px-16 lg:px-24 xl:px-36 2xl:px-52">
        <div class="header text-center mb-6">
            <div class="flex justify-center">
                <LogoVue />
            </div>
            <h1 class="font-2xl font-bold mt-3">{{ title }}</h1>
           
        </div>
         <!-- Form Start -->
         <UCard class="mt-8">
               <slot />
         </UCard>
            <!-- Form End -->
    </div>

    <div class="right hidden lg:block">
        
    </div>
</div>
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