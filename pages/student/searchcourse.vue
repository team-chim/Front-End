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

            <div style="margin-top: 10px; margin-bottom: 20px;"><h1><b>ค้นหารายวิชาเรียน</b></h1></div>
            <b-row>
              <b-col cols="4" name="subject-list-area">
                <input placeholder="SubjectID" v-model="subjectID" style="margin-bottom: 10px;">
                <input placeholder="Subject Short Name" v-model="subjectAbv" style="margin-bottom: 10px;">
                <select v-model="year">
                  <option value=2016>2016</option>
                  <option value=2017>2017</option>
                  <option value=2018>2018</option>
                </select>
                <select v-model="semester">
                  <option value=1>ต้น</option>
                  <option value=2>ปลาย</option>
                  <option value=3>ฤดูร้อน</option>
                </select>
                <select v-model="genedType">
                  <option value="all">เลือกประเภท Gened</option>
                  <option value=0>ไม่ใช่ Gen-Ed</option>
                  <option value=1>สังคมศาสตร์</option>
                  <option value=2>มนุษยศาสตร์</option>
                  <option value=3>วิทยาศาสตร์</option>
                  <option value=4>สหศึกษา</option>
                </select>
                <button @click="searchSubject">ค้นหา</button>
                <li style="margin-bottom: 2px; cursor: pointer;" v-for="subjects in allSubjects" :key="subjects.SubjectID"><a v-on:click="search(subjects.SubjectID)">{{subjects.SubjectID}} {{subjects.NameAbv}}</a></li>
              </b-col>
              <b-col name="subject-detail-area">
                <ul style="margin-bottom: 2px;">{{subject.SubjectID}}</ul>
                <ul style="margin-bottom: 2px;">{{subject.NameEN}}</ul>
                <ul style="margin-bottom: 2px;">{{subject.NameTH}}</ul>
                <ul v-if="subject.HasMidterm" style="margin-bottom: 2px;">วันสอบกลางภาค: {{subject.MidtermStartDatetime}} - {{subject.MidtermEndDatetime}}</ul>
                <!-- <ul v-else style="margin-bottom: 2px;">คณะจะกำหนดวันสอบกลางภาคภายหลัง (AR)</ul> -->
                <!-- <ul style="margin-bottom: 2px;">{{subject.MidtermEndDatetime}}</ul> -->
                <ul v-if="subject.HasFinal" style="margin-bottom: 2px;">วันสอบปลายภาค: {{subject.FinalStartDatetime}} - {{subject.FinalEndDatetime}}</ul>
                <!-- <ul v-else style="margin-bottom: 2px;">คณะจะกำหนดวันสอบปลายภาคภายหลัง (AR)</ul> -->
                <!-- <ul style="margin-bottom: 2px;">{{subject.FinalEndDatetime}}</ul> -->

                <ul v-if="subject.requirements && subject.requirements.length > 0" style="margin-bottom: 2px;">Requirements {{subject.requirements}}</ul>

                <table v-if="subject.sections && subject.sections.length > 0" border = "1" style="margin-top: 20px; margin-bottom: 20px; align-self: center; width: 100%;">
                  <tr>
                    <th>Section No</th>
                    <th>Classroom</th>
                    <th>Instructor</th>
                    <th>Capacity</th>
                  </tr>
                  <tr v-for="section in subject.sections" :key="section.SectionNo">
                      <td>{{section.SectionNo}}</td>
                      <td>{{section.Classroom}}</td>
                      <td>{{section.TeacherName}}</td>
                      <td>{{section.CurrentStudent}} / {{section.MaxStudent}}</td>
                  </tr>
                </table>

              </b-col>
            </b-row>
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

  data: function(){
    return {
      allSubjects: [],
      subject: {},
      subjectID: "",
      subjectAbv: "",
      year: 2017,
      semester: 2,
      genedType: "all",
    }
  },

  beforeMount: function() {
      if (getCookie('username') === ""){
      alert("Session Timeout!")
      this.$router.push('/')
      }
  },

  components: {
  },

  methods: {
    async search (subjectID) {

      this.subject = {}

      var studentid = getCookie('username')


      axios.get(API + `/v2/subjects/${subjectID}/${this.year}/${this.semester}`, {
        headers: {
          'Authorization' : studentid
        }
      })
        .then((data) => {
          this.subject = data.data
          console.log(data.data.MidtermStartDatetime)

          this.subject.HasMidterm = data.data.MidtermStartDatetime && data.data.MidtermEndDatetime;
          if (this.subject.HasMidterm) {
            this.subject.MidtermStartDatetime = moment(data.data.MidtermStartDatetime).utc().format("DD/MM/YYYY HH:mm")
            this.subject.MidtermEndDatetime = moment(data.data.MidtermEndDatetime).utc().format("HH:mm")
          }

          this.subject.HasFinal = data.data.FinalStartDatetime && data.data.FinalEndDatetime
          if (this.subject.HasFinal) {
            this.subject.FinalStartDatetime = moment(data.data.FinalStartDatetime).utc().format("DD/MM/YYYY HH:mm")
            this.subject.FinalEndDatetime = moment(data.data.FinalEndDatetime).utc().format("HH:mm")
          }
      })

    },

    async seachSubject () {
      this.allSubjects = []

      var studentid = getCookie('username')

      let queries = [];

      if (this.year) {
        console.log("Has Year Option");
        queries.push(`year=${this.year}`);
      }

      if (this.semester && this.year) {
        console.log("Has Semester Option (with year)")
        queries.push(`semester=${this.semester}`);
      }

      if (this.subjectID && this.subjectID !== "") {
        console.log("Has SubjectID");
        queries.push(`subjectid=${this.subjectID}`);
      }

      if (this.genedType && this.genedType !== "all") {
        console.log("Has GenedType");
        queries.push(`genedtype=${this.genedType}`);
      }

      if (this.subjectAbv && this.subjectAbv !== "") {
        console.log("Has Subject Name");
        queries.push(`subjectname=${this.subjectAbv}`);
      }

      let query_link;
      if (queries.length !== 0) {
        query_link = "?" + queries.join("&");
      } else {
        query_link = "";
      }


      console.log("Query URL = ", query_link);
      axios.get(API + `/v2/subjects/search` + query_link, {
        headers: {
          'Authorization' : studentid
        }
      })
        .then((data) => {
          this.allSubjects = data.data;
      })
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
  font-size: 5px;
  padding: 1px 1px 1px 1px;
  border-radius: 3px;
  margin-top: 5px;
  border: 2px solid #ececec
}
</style>
