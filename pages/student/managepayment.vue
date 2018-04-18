<template>
  <section class="container">
      <div>
       <b-navbar toggleable="md" type="dark" variant="info">
        <b-navbar-brand href="/student/main">Student</b-navbar-brand>
       <b-navbar-nav class="ml-auto">
         <b-nav-item href="/" right>Signout</b-nav-item>
        </b-navbar-nav>
      </b-navbar>
      <b-container>
        <b-row class="container1">
          <b-col cols="2" style="background-color: #efefef; align-items:flex-start;justify-content:flex-start;">
            <ul style="margin-top: 10px;"> <b>ลงทะเบียน</b>
              <li><a href="/student/registercourse">ลงทะเบียนเรียน</a></li>
              <li><a href="/student/viewregisteredcourse">ดูผลการลงทะเบียนเรียน</a></li>
              <li><a href="/student/managecourse">เพิ่ม ลด วิชาเรียน</a></li>
              <li><a href="/student/withdrawcourse">ถอนวิชาเรียน</a></li>
              <li><a href="/student/viewstudytimetable">ดูตารางเรียน</a></li>
              <li><a href="/student/viewexamtimetable">ดูตารางสอบ</a></li>
              <li><a href="/student/searchcourse">ค้นหารายวิชาเรียน</a></li>
            </ul>
            <ul style="margin-top: 10px;"> <b>จ่ายค่าเทอม</b>
              <li><a href="/student/managepayment">ตรวจสถานะการจ่ายเงินค่าเล่าเรียน</a></li>
            </ul>
            <ul style="margin-top: 10px;"> <b>การฝึกงาน</b>
              <li><a href="/student/manageinternship">จัดการการฝึกงาน</a></li>
              <li><a href="/student/sendinternshipreport">ส่งรายงานการฝึกงาน</a></li>
              <li><a href="/student/searchinternshipoffer">ค้นหาข้อเสนอการฝึกงาน</a></li>
              <li><a href="/student/reviewinternship">Review การฝึกงาน</a></li>
              <li><a href="/student/searchinternshipreview">ค้นหา Review การฝึกงาน</a></li>
            </ul>
          </b-col>
          <b-col style="background-color: lightblue; align-contents= center;">
            <div style="margin-top: 3px; margin-bottom: 3px;"><b>ตรวจสถานะการจ่ายเงินค่าเล่าเรียน</b></div><br>
            <div style="margin-bottom: 3px;">ค่าเทอมของคุณคือ : {{ fee }} บาท</div><br>
            <div style="margin-bottom: 10px;"><b>ประวัติการจ่ายเงิน</b></div>
            <div style="display: flex; justify-content: center;"><table border = "1" style="margin-top: 20px; align-self: center;">
              <tr>
                <th>ปีการศึกษา</th>
                <th>ภาคการศึกษา</th>
                <th>สถานะการจ่ายเงิน</th>
              </tr>
              <tr v-for="payment in payments" :key="payment.Year">
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
        payments: [],
        fee: 0
      }
  },

  mounted: function() {

      this.payments = []

      var studentid = getCookie('username')

      axios.get(`http://localhost:3145/api/v1/student/fee?studentid=${studentid}`,{
        headers: {
          'Authorization' : studentid
        }
      }).then((data) => {
         this.fee = data.data[0].Fee
      })



      axios.get(`http://localhost:3145/api/v1/student/payments?studentid=${studentid}`,{
        headers: {
          'Authorization' : studentid
        }
      }).then((data) => {
          data.data.forEach(element => {
            this.payments.push(element)
          });

      })

      console.log(this.fee)
      console.log(this.payments)


  },

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
