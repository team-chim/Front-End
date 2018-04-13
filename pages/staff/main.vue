<template>
  <section>
    <div>
      <b-container>
        <b-row class="text-center">
          <b-col cols="2" style="background-color: grey;">1 of 3</b-col>
          <b-col>2 of 3</b-col>
        </b-row>
      </b-container>
    </div>
  </section>
</template>

<script>

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


.input-container {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 20px;
  padding: 2px 2px 2px 2px;
  border-radius: 3px;
  margin-top: 5px;
  border: 2px solid #ececec
}
</style>
