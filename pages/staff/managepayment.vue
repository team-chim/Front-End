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
          <b-col style="background-color: lightpink">
          <div style="margin-top:3px;margin-bottom: 3px;"><b>ตรวจสถานะการจ่ายเงินค่าเล่าเรียน</b></div>
          <div style="margin-bottom: 10px;"><b>ประวัติการจ่ายเงิน</b></div>
            <div style="display: flex; justify-content: center;"><table border = "1" style="margin-top: 20px; align-self: center;">
              <tr>
                <th>รหัสประจำตัวนิสิต</th>
                <th>ปีการศึกษา</th>
                <th>ภาคการศึกษา</th>
                <th>สถานะการจ่ายเงิน</th>
              </tr>
              <tr v-for="payment in payments" :key="payment.StudentID">
                <td>{{ payment.StudentID}}</td>
                <td>{{ payment.Year}}</td>
                <td>{{ payment.Semester === 1 ? "ต้น" : payment.Semester === 2 ? "ปลาย" : "ฤดูร้อน"}}</td>
                <td>{{ payment.PaymentStatus === "Success" ? "จ่ายแล้ว" : "ยังไม่ได้จ่าย" }}</td>
              </tr>
            </table>
            </div>
            </b-col>
        </b-row>
      </b-container>
    </div>
  </section>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
const {API} =  require('../../api.config');

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
  data: function() {
    return {
      payments: []
    }
  },
  components: {
  },

  mounted: function() {

      this.payments = []

      const staffid = getCookie('user')

      axios.get(API + `/v1/unpaid`,{
        headers: {
          'Authorization' : staffid
        }
      }).then((data) => {
          data.data.forEach(element => {
            this.payments.push(element)
          });

      })

      console.log(this.payments)


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
