<template>
  <div>
    <nav class="bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <div class="flex items-center flex-shrink-0">
              <picture class="mr-4">
                <source
                  class="h-10 w-10"
                  srcset="~static/icon.webp"
                  type="image/webp"
                />
                <img
                  class="h-10 w-10"
                  src="~static/icon.png"
                  alt="valorant scrambler logo"
                />
              </picture>
              <div
                class="font-semibold text-2xl md:text-4xl text-white capitalize"
              >
                valorant scrambler
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <header></header>
    <main>
      <div class="max-w-7xl mx-auto pb-6 pt-2 md:py-6 sm:px-6 lg:px-8">
        <Nuxt />
      </div>
    </main>
    <footer
      class="flex flex-col w-full text-center text-gray-300 bg-gray-800 border-grey p-4"
    >
      <div class="text-xs">
        The name Valorant and all the images used on this website are the
        property of
        <a class="underline" href="https://www.riotgames.com/">Riot Games</a>.
        These resources are used following their
        <a class="underline" href="https://www.riotgames.com/en/legal"
          >legal rules</a
        >.
      </div>
      <div class="mt-2">
        <a href="https://github.com/jbreuil/valorant-scrambler">
          <font-awesome-icon :icon="['fab', 'github']" size="lg" />
        </a>
      </div>
    </footer>
  </div>
</template>
