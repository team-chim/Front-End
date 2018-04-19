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
      <input class="input-container" placeholder="Username" v-model="username"><br>
      <input class="input-container" type="password" placeholder="Password" v-model="password">
      </div>
      <div class="links">
        <span class="button--grey" v-on:click="goStudent">Login as Student</span>
        <span class="button--grey" v-on:click="goTeacher">Login as Teacher</span>
        <span class="button--green" v-on:click="goStaff">Login as Staff</span>
      </div>
    </div>
  </section>
</template>

<script>
import Vue from 'vue'

export default {

  data: function() {
    return {
      username : '',
      password : ''
    }
  },

  methods: {
    goStudent () {
        let d = new Date()
        d.setTime(d.getTime() + 3000000)
        document.cookie = `username=${this.username}; expires=${d.toUTCString()}`
        this.$router.push({ name: 'student-main'})

    },
    goTeacher () {
        let d = new Date()
        d.setTime(d.getTime() + 3000000)
        document.cookie = `username=${this.username}; expires=${d.toUTCString()}`
        this.$router.push({ name: 'teacher-main'})
    },
    goStaff () {
        console.log(this.username)
        let d = new Date()
        d.setTime(d.getTime() + 3000000)
        document.cookie = `username=${this.username}; expires=${d.toUTCString()}`
        this.$router.push({ name: 'staff-main'})
    }
  }

}
</script>

<style>


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

html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;

}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
  cursor: pointer;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-right: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
  cursor: pointer;
}
</style>
