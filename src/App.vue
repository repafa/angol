<template>
  <main>
    <header class="p-3 mb-5 text-bg-dark">
      <div class="container">
        <div
          class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start"
        >
          <ul
            class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 text-white"
          >
            <li>
              <router-link
                class="nav-link px-2"
                active-class="text-secondary"
                to="/"
                >Szógyakorló</router-link
              >
            </li>
            <li>
              <router-link
                class="nav-link px-2"
                active-class="text-secondary"
                to="/crossword"
                >Keresztrejtvény</router-link
              >
            </li>
            <li>
              <router-link
                class="nav-link px-2"
                active-class="text-secondary"
                to="/translation"
                >Fordítás</router-link
              >
            </li>
            <router-link
              class="nav-link px-2"
              active-class="text-secondary"
              to="/dictionary"
              >Szótáram</router-link
            >
          </ul>

          <div class="text-end">
            <router-link class="btn btn-outline-light me-2" to="/login"
              >Bejelentkezés</router-link
            >
            <router-link class="btn btn-warning" to="/registration"
              >Regisztráció</router-link
            >
          </div>
        </div>
      </div>
    </header>
    <div class="container">
      <router-view />
    </div>
  </main>
</template>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

a,
a:hover {
  color: #fff;
}
</style>
