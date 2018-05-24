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
              <li><a href="/student/searchinternshipreview">ค้นหา Review การฝึกงาน</a></li>
            </ul>
          </b-col>
          <b-col style="background-color: lightblue">
            <div style="margin-top: 3px; margin-bottom: 3px;"><b>ลงทะเบียนเรียน</b></div><br>
            <div>รหัสวิชา :<input v-model="SubjectID" placeholder="SubjectID"></div>
            <div>หมายเลข Section :<input v-model="SectionNo" placeholder="Section No."></div>
            <button v-on:click="register()">ลงทะเบียน</button>

            <div v-if="subjectResult" name="quick-search-results">
              <ul style="margin-bottom: 2px;">{{subjectResult.SubjectID}}</ul>
              <ul style="margin-bottom: 2px;">{{subjectResult.NameEN}}</ul>
              <ul style="margin-bottom: 2px;">{{subjectResult.NameTH}}</ul>

              <ul v-if="subjectResult.requirements && subjectResult.requirements.length > 0" style="margin-bottom: 2px;">Requirements {{subjectResult.requirements}}</ul>
              
              <table v-if="subjectResult.sections && subjectResult.sections.length > 0" border = "1" style="margin-top: 20px; margin-bottom: 20px; align-self: center; width: 100%;">
                <tr>
                  <th>Section No</th>
                  <th>Classroom</th>
                  <th>Instructor</th>
                  <th>Capacity</th>
                </tr>
                <tr v-for="section in subjectResult.sections" :key="section.SectionNo">
                    <td>{{section.SectionNo}}</td>
                    <td>{{section.Classroom}}</td>
                    <td>{{section.TeacherName}}</td>
                    <td>{{section.CurrentStudent}} / {{section.MaxStudent}}</td>
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

  data: function() {
    return {
      SubjectID: 0,
      Year: 2017,
      Semester: 2,
      SectionNo: 0,

      subjectResult: {},  // For quick-search
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



  methods: {
    goStudent () {
      this.$router.push({ path: '/student/main'})
    },
    goStudent () {
      this.$router.push({ path: '/teacher/main'})
    },
    register () {
      var studentid = getCookie('username')
      axios.put(API + `/v2/students/${studentid}/registered/register`, {
        "subjectId": this.SubjectID,
        "year": this.Year,
        "semester": this.Semester,
        "sectionNo": this.SectionNo,
      }).then((res) => {
        console.log(res)
        // if(res){
          alert('Register Success')
        // }
      })
    },

  },

  watch: {
      SubjectID: function(val, oldVal) {

          if (val && val.trim().length === 7) {
            let subjectId = val.trim();
            axios.get(API + `/v2/subjects/${subjectId}/${this.Year}/${this.Semester}`).then((response) => {
              this.subjectResult = response.data;
            })
          }
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
