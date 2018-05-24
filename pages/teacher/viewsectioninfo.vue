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
          <b-col style="background-color: azure">
            <div style="margin-top:10px; margin-bottom: 3px; "><h2><b>ดูรายชื่อนิสิตใน section</b></h2></div>
            <b-row>
          <b-col cols="4">
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
            <button @click="seachSubject">ค้นหา</button>
            <li style="margin-bottom: 2px; cursor: pointer;" v-for="subjects in allSubjects" :key="subjects.SubjectID"><a v-on:click="search(subjects.SubjectID,subjects.SectionNo,subjects.Semester,subjects.Year)">{{subjects.SubjectID}} Section : {{subjects.SectionNo}} Semester : {{subjects.Semester}} Year : {{subjects.Year}}</a></li>
          </b-col>
          <b-col>
             <div style="margin-top:10px; margin-bottom: 3px; "><b>รายชื่อนิสิตในวิชา {{showSubjectID}} Section {{showSectionNo}} ภาคการศึกษา{{showSemester === 1 ? "ต้น" : showSemester === 2 ? "ปลาย" : "ฤดูร้อน" }} ปีการศึกษา {{showYear}}</b></div>
            <ol v-for="student in students" :key="student.StudentID">{{student.StudentID}} {{student.StudentName}}</ol>
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
  components: {
  },

  data: function(){
    return {
    allSubjects: [],
    students: [],
    subjectID: "",
    showSubjectID: "",
    showSectionNo: "",
    showSemester: "",
    showYear: "",
    year: 2017,
    semester: 2
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

      this.allSubjects = []
      var teacherid = getCookie('username')

      axios.get(API + `/v2/teachers/${teacherid}/schedules/teach/${this.year}/${this.semester}`, {
        headers: {
          'Authorization' : teacherid
        }
      })
        .then((data) => {
          console.log(data.data)
          this.allSubjects.push(data.data[0])
          data.data.forEach(element => {
            let isInsert = true
              this.allSubjects.forEach(subject => {
              if (subject.SubjectID === element.SubjectID){
                isInsert = false
                }
              })
             if (isInsert === true){
              this.allSubjects.push(element)
            }
          });
          console.log(this.allSubjects)
      })

  },



  methods: {
    async seachSubject () {
      this.allSubjects = []

      var teacherid = getCookie('username')

        axios.get(API + `/v2/teachers/${teacherid}/schedules/teach/${this.year}/${this.semester}`, {
        headers: {
          'Authorization' : teacherid
        }
        })
        .then((data) => {
          this.allSubjects.push(data.data)
          console.log(this.allSubjects)
      })
    },

    async search (subjectID,sectionNo,semester,year) {

      this.subject = []
      this.students = []
      this.showSubjectID = subjectID
      this.showSectionNo = sectionNo
      this.showSemester = semester
      this.showYear = year
      var studentid = getCookie('username')


      axios.get(API + `/v2/subjects/${subjectID}/${year}/${semester}/sections/${sectionNo}/students`, {
        headers: {
          'Authorization' : studentid
        }
      })
        .then((data) => {
          this.students = data.data
          console.log(this.students)
      })

    },
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
