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
            <div style="margin-top:10px; margin-bottom:10px;"><h1><b>ดูตารางสอบ</b></h1></div>
            <div style="margin-bottom:3px;"><h2>Midterm</h2></div>
            <table border = "1" style="margin-top: 20px; margin-bottom: 20px; align-self: center; width: 100%;">
              <tr>
                <th>Subject ID</th>
                <th>Name</th>
                <th>Date of Exam</th>
                <th>Start Time</th>
                <th>End Time</th>
              </tr>
              <tr v-for="subject in midterm" :key="subject.SubjectID">
                <td>{{subject.SubjectID}}</td>
                <td>{{subject.NameEN}}</td>
                <td>{{subject.Date}}</td>
                <td>{{subject.StartTime}}</td>
                <td>{{subject.EndTime}}</td>
              </tr>
            </table>
            <div style="margin-bottom:3px;"><h2>Final</h2></div>
            <table border = "1" style="margin-top: 20px; margin-bottom: 20px; align-self: center; width: 100%;">
              <tr>
                <th>Subject ID</th>
                <th>Name</th>
                <th>Date of Exam</th>
                <th>Start Time</th>
                <th>End Time</th>
              </tr>
              <tr v-for="subject in final" :key="subject.SubjectID">
                <td>{{subject.SubjectID}}</td>
                <td>{{subject.NameEN}}</td>
                <td>{{subject.Date}}</td>
                <td>{{subject.StartTime}}</td>
                <td>{{subject.EndTime}}</td>
              </tr>
            </table>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </section>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import moment from 'moment'
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
  components: {
  },

  data: function () {
    return {
      midterm:[],
      final :[]
    }
  },

    beforeMount: function() {
        console.log("hello")
        console.log(getCookie('username'))
        if (getCookie('username') === ""){
        alert("Session Timeout!")
        this.$router.push('/')
        }
  },

  mounted: function() {
      this.midterm = []
      this.final = []

      var studentid = getCookie('username')


      axios.get(API + `/v2/students/${studentid}/schedules/midterm/2017/2`,{
        headers: {
          'Authorization' : studentid
        }
      }).then((data) => {
        data.data.forEach(element => {
            console.log(element);
            var subject = {}
            subject.SubjectID = element.SubjectID
            subject.NameEN = element.NameEN
            subject.Date = moment(element.MidtermStartDatetime).utc().format("DD/MM/YYYY")
            subject.StartTime = moment(element.MidtermStartDatetime).utc().format("HH:mm")
            subject.EndTime = moment(element.MidtermEndDatetime).utc().format("HH:mm")
            this.midterm.push(subject)
        })
      })

      axios.get(API + `/v2/students/${studentid}/schedules/final/2017/2`,{
        headers: {
          'Authorization' : studentid
        }
      }).then((data) => {
        data.data.forEach(element => {
            var subject = {}
            subject.SubjectID = element.SubjectID
            subject.NameEN = element.NameEN
            subject.Date = moment(element.FinalStartDatetime).utc().format("DD/MM/YYYY")
            subject.StartTime = moment(element.FinalStartDatetime).utc().format("HH:mm")
            subject.EndTime = moment(element.FinalEndDatetime).utc().format("HH:mm")
            this.final.push(subject)
        })
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
