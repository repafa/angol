<template>
  <div class="text-center form-sign m-auto row align-items-center vh-100">
    <form>
      <div class="form-floating">
        <input type="email" class="form-control" id="floatingInput" />
        <label for="floatingInput">Felhasználónév</label>
      </div>
      <div class="form-floating">
        <input type="password" class="form-control" id="floatingPassword" />
        <label for="floatingPassword">Jelszó</label>
      </div>
      <button class="w-100 btn btn-lg btn-primary" type="submit">
        {{ buttonText }}
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "SignForm",
  props: {
    isLogin: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    buttonText() {
      return this.isLogin ? "Bejelentkezés" : "Regisztráció";
    },
  },
};
</script>

<style>
.form-sign {
  max-width: 330px;
}

.form-sign .form-floating:focus-within {
  z-index: 2;
}

.form-sign input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-sign input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
