<template>
  <div>
    <div class="bg-primary-500 py-2 uppercase text-white font-semibold shadow-lg">
      <UContainer>
        <div class="flex justify-center space-x-4">
          <NuxtLink to="/">Basic</NuxtLink>
          <NuxtLink to="/async">AsyncData</NuxtLink>
          <NuxtLink to="/instant">Instant</NuxtLink>
        </div>
      </UContainer>
    </div>
    <slot />
  </div>
</template>
