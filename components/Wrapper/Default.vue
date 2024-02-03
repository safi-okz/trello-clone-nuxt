<template>
  <div>
    <header class="p-2 border-b dark:border-gray-700 bg-white dark:bg-gray-800">
        <UContainer>
          <div class="flex justify-between">
              <NuxtLink to="/">
                  <Icon class="w-8 h-8" />
              </NuxtLink>
              <div class="inline-flex justify-end gap-4 items-center">
                <slot name="action" ></slot>
                <ColorSwitcher />
                <UDropdown :items="dropdownItem">
                  <UIcon name="i-heroicons-user-circle" class="w-6 h-6" ></UIcon>
                  <template #profile>
                <div class="text-left">
                  <p>Signed in as</p>
                  <p class="truncate font-medium text-gray-900 dark:text-white">
                    {{ data?.user?.email }}
                  </p>
                </div>
              </template>
                </UDropdown>
              </div>
          </div>
        </UContainer>
    </header>
    <main class="my">
      <UContainer>
        <slot />
      </UContainer>
    </main>
  </div>
</template>

<script lang="ts" setup>
const { data, signOut } = useAuth();

const handleSignout = async () => {
  await signOut()
}

const dropdownItem = ref([
  [
    {
      label: 'Profile',
      slot: 'profile',
      disabled: true
    }
  ],
  [
    {
      label: 'Billing',
      icon: 'i-heroicons-credit-card',
      click: () => {}
    }
  ],
  [
    {
      label: 'Signout',
      icon: 'i-heroicons-arrow-left-on-rectangle',
      click: handleSignout
    }
  ],

]);

 
</script>

<style>

</style>