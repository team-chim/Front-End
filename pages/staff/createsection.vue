<template>
  <section class="container">
      <div>
       <b-navbar toggleable="md" type="dark" variant="info">
        <b-navbar-brand href="#">Staff</b-navbar-brand>
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
          <b-col style="background-color: lightpink">
          <div style="margin-top: 3px; margin-bottom: 3px;"><b>เพิ่มข้อมูลวิชา</b></div><br>
          <div>รหัสวิชา :<input v-model="subjectID" placeholder="รหัสวิชา">ชื่อวิชา (ภาษาไทย):<input v-model="subjectNameTH" placeholder="รหัสวิชา"><br>Subject Name (English):<input v-model="subjectNameTH" placeholder="รหัสวิชา"> น้ำหนัก :<input v-model="credit" placeholder="หน่วยกิต"><br><button style="margin-top: 10px; margin-bottom: 10px;" @click="addSubject">เพิ่มวิชา</button></div>
          <div style="margin-top: 6px;"><b>เพิ่มข้อมูลการสอน</b></div><br>
          <div>รหัสวิชา :<input v-model="subjectID" placeholder="รหัสวิชา">
          ภาคการศึกษา :
          <select v-model="semester">
              <option value=1>ต้น</option>
              <option value=2>ปลาย</option>
              <option value=3>ฤดูร้อน</option>
          </select>
          ปีการศึกษา :
          <select v-model="year">
              <option value=2016>2016</option>
              <option value=2017>2017</option>
              <option value=2018>2018</option>
            </select>
            <br>
          <!-- <div>วันและเวลาเริ่มสอบกลางภาค <datetime format="YYYY-MM-DD H:i:s," v-model="MidtermStartDatetime" ></datetime></div>
          <div>วันและเวลาสิ้นสุดสอบกลางภาค <datetime format="YYYY-MM-DD H:i:s," v-model="MidtermEndDatetime" ></datetime></div>
          <div>วันและเวลาเริ่มสอบปลายภาค <datetime format="YYYY-MM-DD H:i:s," v-model="MidtermStartDatetime" ></datetime></div>
          <div>วันและเวลาสิ้นสุดการสอบปลายภาค <datetime format="YYYY-MM-DD H:i:s," v-model="MidtermEndDatetime" ></datetime></div> -->
            <button style="margin-top: 10px;" @click="addClass">เพิ่มการสอน</button></div>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </section>
</template>

<script>
// import datetime from 'vuejs-datetimepicker'

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

export default {
  // components: { datetime },

  beforeMount: function() {
        console.log("hello")
        console.log(getCookie('username'))
        if (getCookie('username') === ""){
        alert("Session Timeout!")
        this.$router.push('/')
        }
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
