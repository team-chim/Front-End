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
            <div style="margin-top: 10px; margin-bottom: 20px;"><h1><b>ค้นหารายวิชาเรียน</b></h1></div>
            <b-row>
          <b-col cols="4">
            <input placeholder="SubjectID" v-model="subjectID" style="margin-bottom: 10px;">
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
            <li style="margin-bottom: 2px; cursor: pointer;" v-for="subjects in allSubjects" :key="subjects.SubjectID"><a v-on:click="search(subjects.SubjectID)">{{subjects.SubjectID}} {{subjects.NameEN}}</a></li>
          </b-col>
          <b-col>
            <ul style="margin-bottom: 2px;">{{subject.SubjectID}}</ul>
            <ul style="margin-bottom: 2px;">{{subject.NameEN}}</ul>
            <ul style="margin-bottom: 2px;">{{subject.NameTH}}</ul>
            <ul style="margin-bottom: 2px;">{{subject.MidtermStartDatetime === undefined ? "" : `วันสอบกลางภาค: ${subject.MidtermStartDatetime} - ${subject.MidtermEndDatetime}`  }}</ul>
            <!-- <ul style="margin-bottom: 2px;">{{subject.MidtermEndDatetime}}</ul> -->
            <ul style="margin-bottom: 2px;">{{subject.FinalStartDatetime  === undefined ? "" : `วันสอบปลายภาค: ${subject.FinalStartDatetime} - ${subject.FinalEndDatetime}`}}</ul>
            <!-- <ul style="margin-bottom: 2px;">{{subject.FinalEndDatetime}}</ul> -->
          </b-col>
          </b-row>
            <b-col>

            </b-col>
            <b-col>
            </b-col>
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
    year: 2017,
    semester: 2
    }
  },

  beforeMount: function() {
      if (getCookie('username') === ""){
      alert("Session Timeout!")
      this.$router.push('/')
      }
  },

  mounted: function() {

      this.allSubjects = []

      var studentid = getCookie('username')

      axios.get(API + `/v2/subjects/`, {
        headers: {
          'Authorization' : studentid
        }
      })
        .then((data) => {
          data.data.forEach(element => {
            this.allSubjects.push(element)
          });
          console.log(this.allSubjects)
      })

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
          this.subject.MidtermStartDatetime = moment(data.data.MidtermStartDatetime).utc().format("DD/MM/YYYY HH:mm")
          this.subject.MidtermEndDatetime = moment(data.data.MidtermEndDatetime).utc().format("HH:mm")
          this.subject.FinalStartDatetime = moment(data.data.FinalStartDatetime).utc().format("DD/MM/YYYY HH:mm")
          this.subject.FinalEndDatetime = moment(data.data.FinalEndDatetime).utc().format("HH:mm")
      })

    },

    async seachSubject () {
      this.allSubjects = []

      var studentid = getCookie('username')

      if (this.subjectID === "") {
        axios.get(API + `/v2/subjects/`, {
        headers: {
          'Authorization' : studentid
        }
        })
        .then((data) => {
          data.data.forEach(element => {
            this.allSubjects.push(element)
          });
          console.log(this.allSubjects)
        })
      }

      else {
        axios.get(API + `/v2/subjects/${this.subjectID}/${this.year}/${this.semester}`, {
        headers: {
          'Authorization' : studentid
        }
      })
        .then((data) => {

          this.allSubjects.push(data.data)

          console.log(this.allSubjects)
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
