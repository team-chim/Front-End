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
              <li><a href="/student/studentinfo">ข้อมุลส่วนตัว</a></li>
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
          <b-col style="background-color: lightblue">
            <div style="margin-top:10px; margin-bottom: 3px;"><h2><b>ข้อมูลส่วนตัว</b></h2></div>
            <div style="display: flex; justify-content: center;">
              <table border = "1" style="margin-top: 20px; align-self: center; width: 100%;">
              <tr>
                <th>รหัสนิสิต</th>
                <td>{{studentinfo.StudentID === null ? "-" : studentinfo.StudentID }}</td>
              </tr>
              <tr>
                <th>ชื่อ</th>
                <td>{{studentinfo.FnameTH === null ? "-" : studentinfo.FnameTH }}</td>
              </tr>
              <tr>
                <th>ชื่อกลาง</th>
                <td>{{studentinfo.MnameTH === null ? "-" : studentinfo.MnameTH }}</td>
              </tr>
              <tr>
                <th>นามสกุล</th>
                <td>{{studentinfo.LnameTH === null ? "-" : studentinfo.LnameTH}}</td>
              </tr>
              <tr>
                <th>First Name</th>
                <td>{{studentinfo.FnameEN === null ? "-" : studentinfo.FnameEN }}</td>
              </tr>
              <tr>
                <th>Middle Name</th>
                <td>{{studentinfo.MnameEN === null ? "-" : studentinfo.MnameEN }}</td>
              </tr>
              <tr>
                <th>Last Name</th>
                <td>{{studentinfo.LnameEN === null ? "-" : studentinfo.LnameEN}}</td>
              </tr>
              <tr>
                <th>สัญชาติ</th>
                <td>{{studentinfo.Nation === "Thai" ? "ไทย" : studentinfo.Nation}}</td>
              </tr>
              <tr>
                <th>คณะ (Faculty)</th>
                <td>{{studentinfo.FacultyNameTH === null ? "-" : studentinfo.FacultyNameTH}} ({{studentinfo.FacultyNameEN === null ? "-" : studentinfo.FacultyNameEN}})</td>
              </tr>
              <tr>
                <th>สาขา (Department)</th>
                <td>{{studentinfo.DepartmentNameTH === null ? "-" : studentinfo.DepartmentNameTH}} ({{studentinfo.DepartmentNameEN === null ? "-" : studentinfo.DepartmentNameEN}})</td>
              </tr>
              <tr>
                <th>ปีที่เข้าเรียน (Enter Year)</th>
                <td>{{studentinfo.EnterYear === null ? "-" : studentinfo.EnterYear}}</td>
              </tr>
              <tr>
              <tr>
                <th>เกรดเฉลี่ยรวม (GPAX)</th>
                <td>{{studentinfo.GPAX === null ? "-" : studentinfo.GPAX}}</td>
              </tr>
              <tr>
                <th>อีเมล (E-mail Address)</th>
                <td>{{studentinfo.StudentEmail === null ? "-" : studentinfo.StudentEmail}}</td>
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

  data: function () {
      return {
        studentinfo: {}
      }
  },

  components: {

  },


  beforeMount: function() {
        console.log("hello")
        console.log(getCookie('username'))
        if (getCookie('username') === ""){
        alert("Session Timeout!")
        this.$router.push('/')
        }
  },

  mounted : function() {

      this.studentinfo = {}

      var studentid = getCookie('username')

      axios.get(API + `/v2/students/${studentid}/`,{
        headers: {
          'Authorization' : studentid
        }
      }).then((data) => {
        this.studentinfo = data.data[0]
        console.log(this.studentinfo)
      })

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
