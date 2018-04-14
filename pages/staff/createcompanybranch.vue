<template>
  <section class="container">
      <div>
       <b-navbar toggleable="md" type="dark" variant="info">
        <b-navbar-brand href="/staff/main">Staff</b-navbar-brand>
       <b-navbar-nav class="ml-auto">
         <b-nav-item href="/" right>Signout</b-nav-item>
        </b-navbar-nav>
      </b-navbar>
      <b-container>
        <b-row class="container1">
          <b-col cols="2" style="background-color: #efefef; align-items:flex-start;justify-content:flex-start;">
            <ul style="margin-top: 10px;"> <b>ลงทะเบียน</b>
              <li><a href="/staff/managestudentteacher">เพิ่มนิสิต, อาจารย์</a></li>
              <li><a href="/staff/createsection">เพิ่มข้อมูล Section</a></li>
              <li><a href="/staff/managesection">จัดการข้อมูล Section</a></li>
            </ul>
            <ul style="margin-top: 10px;"> <b>จ่ายค่าเทอม</b>
              <li><a href="/staff/managepayment">ตรวจสถานะการจ่ายเงินค่าเล่าเรียน</a></li>
            </ul>
            <ul style="margin-top: 10px;"> <b>การฝึกงาน</b>
              <li><a href="/staff/createoffer">เพิ่มข้อเสนอการฝึกงานของบริษัท</a></li>
              <li><a href="/staff/createcompany">เพิ่มบริษัท</a></li>
              <li><a href="/staff/createcompanybranch">เพิ่มสาขา</a></li>
              <li><a href="/staff/checkinternshipstatus">ตรวจดูสถานะการฝึกงานตามรายคน</a></li>
              <li><a href="/staff/checkinternshipreport">ตรวจดูสถานะเอกสารรายงานฝึกงาน</a></li>
              <li><a href="/staff/createinternship">เพิ่มปีการศึกษา/Section ของวิชาฝึกงาน</a></li>
            </ul>
          </b-col>
          <b-col style="background-color: lightpink">เพิ่มสาขา</b-col>
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
