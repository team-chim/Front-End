<template>
  <section class="container">
      <div>
       <b-navbar toggleable="md" type="dark" variant="info">
        <b-navbar-brand href="/teacher/main">Teacher</b-navbar-brand>
       <b-navbar-nav class="ml-auto">
         <b-nav-item href="/" right>Signout</b-nav-item>
        </b-navbar-nav>
      </b-navbar>
      <b-container>
        <b-row class="container1">
          <b-col cols="2" style="background-color: #efefef; align-items:flex-start;justify-content:flex-start;">
            <ul style="margin-top: 10px;"> <b></b>
              <li><a href="/teacher/info">ข้อมูลส่วนตัว</a></li>
              <li><a href="/teacher/viewadvisee">ดูรายชื่อนิสิตที่ปรึกษา</a></li>
              <li><a href="/teacher/viewsectioninfo">ดูรายชื่อนิสิตใน section</a></li>
              <li><a href="/teacher/searchcourse">ค้นหารายวิชาเรียน</a></li>
            </ul>
          </b-col>
          <b-col style="background-color: azure">ดูรายชื่อนิสิตใน section</b-col>
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

.container1 {
  min-width : 100vw;
  min-height: calc(10/16*100vw);
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
