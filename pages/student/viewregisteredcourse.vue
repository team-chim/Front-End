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
            <div style="margin-top:10px; margin-bottom:10px;"><h1><b>ดูผลการเรียน</b></h1></div>
            <div style="margin-bottom:3px;"><h2>First Semester of 2016</h2></div>
            <table border = "1" style="margin-top: 20px; margin-bottom: 20px; align-self: center; width: 100%;">
              <tr>
                <th>Subject ID</th>
                <th>Name</th>
                <th>Credit</th>
                <th>Grade</th>
              </tr>
              <tr v-for="subject in firstTermOf2016" :key="subject.SubjectID">
                <td>{{subject.SubjectID}}</td>
                <td>{{subject.NameEN}}</td>
                <td>{{subject.Credit}}</td>
                <td>{{subject.Grade === 4 ? "A" : subject.Grade === 3.5 ? "B" : subject.Grade === 3 ? "B" : subject.Grade === 2.5 ? "C+" : subject.Grade === 2 ? "C" : subject.Grade === 1.5 ? "D+" : subject.Grade === 1 ? "D" : subject.Grade}}</td>
              </tr>
            </table>
            <div style="margin-bottom:3px;"><h2>Second Semester of 2016</h2></div>
            <table border = "1" style="margin-top: 20px; margin-bottom: 20px; align-self: center; width: 100%;">
              <tr>
                <th>Subject ID</th>
                <th>Name</th>
                <th>Credit</th>
                <th>Grade</th>
              </tr>
              <tr v-for="subject in secondTermOf2016" :key="subject.SubjectID">
                <td>{{subject.SubjectID}}</td>
                <td>{{subject.NameEN}}</td>
                <td>{{subject.Credit}}</td>
                <td>{{subject.Grade === 4 ? "A" : subject.Grade === 3.5 ? "B" : subject.Grade === 3 ? "B" : subject.Grade === 2.5 ? "C+" : subject.Grade === 2 ? "C" : subject.Grade === 1.5 ? "D+" : subject.Grade === 1 ? "D" : subject.Grade}}</td>
              </tr>
            </table>
            <div style="margin-bottom:3px;"><h2>Summer Semester of 2016</h2></div>
            <table border = "1" style="margin-top: 20px; margin-bottom: 20px; align-self: center; width: 100%;">
              <tr>
                <th>Subject ID</th>
                <th>Name</th>
                <th>Credit</th>
                <th>Grade</th>
              </tr>
              <tr v-for="subject in summerTermOf2016" :key="subject.SubjectID">
                <td>{{subject.SubjectID}}</td>
                <td>{{subject.NameEN}}</td>
                <td>{{subject.Credit}}</td>
                <td>{{subject.Grade === 4 ? "A" : subject.Grade === 3.5 ? "B" : subject.Grade === 3 ? "B" : subject.Grade === 2.5 ? "C+" : subject.Grade === 2 ? "C" : subject.Grade === 1.5 ? "D+" : subject.Grade === 1 ? "D" : subject.Grade}}</td>
              </tr>
            </table>
            <div style="margin-bottom:3px;"><h2>First Semester of 2017</h2></div>
            <table border = "1" style="margin-top: 20px; margin-bottom: 20px; align-self: center; width: 100%;">
              <tr>
                <th>Subject ID</th>
                <th>Name</th>
                <th>Credit</th>
                <th>Grade</th>
              </tr>
              <tr v-for="subject in firstTermOf2017" :key="subject.SubjectID">
                <td>{{subject.SubjectID}}</td>
                <td>{{subject.NameEN}}</td>
                <td>{{subject.Credit}}</td>
                <td>{{subject.Grade === 4 ? "A" : subject.Grade === 3.5 ? "B" : subject.Grade === 3 ? "B" : subject.Grade === 2.5 ? "C+" : subject.Grade === 2 ? "C" : subject.Grade === 1.5 ? "D+" : subject.Grade === 1 ? "D" : subject.Grade}}</td>
              </tr>
            </table>
            <div style="margin-bottom:3px;"><h2>Second Semester of 2017</h2></div>
            <table border = "1" style="margin-top: 20px; margin-bottom: 20px; align-self: center; width: 100%;">
              <tr>
                <th>Subject ID</th>
                <th>Name</th>
                <th>Credit</th>
                <th>Grade</th>
              </tr>
              <tr v-for="subject in secondTermOf2017" :key="subject.SubjectID">
                <td>{{subject.SubjectID}}</td>
                <td>{{subject.NameEN}}</td>
                <td>{{subject.Credit}}</td>
                <td>{{subject.Grade === 4 ? "A" : subject.Grade === 3.5 ? "B" : subject.Grade === 3 ? "B" : subject.Grade === 2.5 ? "C+" : subject.Grade === 2 ? "C" : subject.Grade === 1.5 ? "D+" : subject.Grade === 1 ? "D" : subject.Grade}}</td>
              </tr>
            </table>
            <div style="margin-bottom:3px;"><h2>Summer Semester of 2017</h2></div>
            <table border = "1" style="margin-top: 20px; margin-bottom: 20px; align-self: center; width: 100%;">
              <tr>
                <th>Subject ID</th>
                <th>Name</th>
                <th>Credit</th>
                <th>Grade</th>
              </tr>
              <tr v-for="subject in summerTermOf2017" :key="subject.SubjectID">
                <td>{{subject.SubjectID}}</td>
                <td>{{subject.NameEN}}</td>
                <td>{{subject.Credit}}</td>
                <td>{{subject.Grade === 4 ? "A" : subject.Grade === 3.5 ? "B" : subject.Grade === 3 ? "B" : subject.Grade === 2.5 ? "C+" : subject.Grade === 2 ? "C" : subject.Grade === 1.5 ? "D+" : subject.Grade === 1 ? "D" : subject.Grade}}</td>
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
      firstTermOf2016 :[],
      secondTermOf2016 :[],
      summerTermOf2016: [],
      firstTermOf2017 :[],
      secondTermOf2017 :[],
      summerTermOf2017: []
    }
  },

  beforeMount: function() {
      if (getCookie('username') === ""){
      alert("Session Timeout!")
      this.$router.push('/')
      }
  },

  mounted: function() {
      this.firstTermOf2016 = []
      this.secondTermOf2016 = []
      this.summerTermOf2016 = []
      this.firstTermOf2017 = []
      this.secondTermOf2017 = []
      this.summerTermOf2017 = []

      var studentid = getCookie('username')


      axios.get(API + `/v2/students/${studentid}/registered`,{
        headers: {
          'Authorization' : studentid
        }
      }).then((data) => {
        // console.log(data.data)
        data.data.forEach(element => {
          if (element.Year === 2016) {
            element.Semester === 1 ? this.firstTermOf2016.push(element) :
              element.Semester === 2 ? this.secondTermOf2016.push(element) : this.summerTermOf2016.push(element)
          }
          else if (element.Year === 2017) {
            element.Semester === 1 ? this.firstTermOf2017.push(element) :
              element.Semester === 2 ? this.secondTermOf2017.push(element) : this.summerTermOf2017.push(element)
          }
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
