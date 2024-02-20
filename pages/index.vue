<script setup lang="ts">
definePageMeta({
    middleware: "auth"
});

const {data} = await useFetch('/api/boards');
 
</script>

<template>
    <WrapperDefault>
        {{ data }}
        <p>Frist name</p>
    </WrapperDefault>
</template>