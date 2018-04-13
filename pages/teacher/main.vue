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
        <a class="button--grey" v-on::click="goStudent">Login as Student</a>
        <a class="button--grey" v-on::click="goTeacher">Login as Teacher</a>
        <a class="button--green" v-on::click="goStaff">Login as Staff</a>
      </div>
    </div>
  </section>
</template>

<script>
import Vue from 'vue'


export default {
  components: {
  },

  method: {
    goStudent () {
      this.$router.push({ path: '/student/main'})
    },
    goStudent () {
      this.$router.push({ path: '/teacher/main'})
    },
    goStaff () {
      this.$router.push({ path: '/staff/main'})
    }
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
