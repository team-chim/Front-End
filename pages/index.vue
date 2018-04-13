<template>
  <section class="container">
    <div>
      <img src="/Chimchim.jpg" class="chim">
      <h1 class="title">
        Rex Chula
      </h1>
      <h2 class="subtitle">
        By Team Chim DB Proj
      </h2>
      <div style="margin-bottom: 10px;">
      <input class="input-container" placeholder="Username"><br>
      <input class="input-container" placeholder="Password">
      </div>
      <div class="links">
        <a class="button--grey">Login as Student</a>
        <a class="button--grey">Login as Staff</a>
        <a class="button--green">Register</a>
      </div>
    </div>
  </section>
</template>

<script>


export default {
  components: {
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.chim {
  width: 300px;
  border-radius: 50%;
  margin-bottom: 30px;
}

.input-container {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 20px;
  padding: 2px 2px 2px 2px;
  border-radius: 3px;
  margin-top: 5px;
  border: 2px solid #ececec
}
</style>
