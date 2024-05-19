<template>
  <div>
    <div class="bg-primary-500 py-2 uppercase text-white font-semibold shadow-lg">
      <UContainer>
        <div class="flex justify-center space-x-4">
          <ULink
            exact
            active-class="text-pink-900"
            to="/"
          >
            Basic
          </ULink>
          <ULink
            exact
            active-class="text-pink-900"
            to="/async"
          >
            AsyncData
          </ULink>
          <ULink
            exact
            active-class="text-pink-900"
            to="/instant"
          >
            Instant
          </ULink>
        </div>
      </UContainer>
    </div>
    <slot />
  </div>
</template>
