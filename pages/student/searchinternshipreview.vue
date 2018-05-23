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
            <div style="margin-top: 3px; margin-bottom: 3px;"><b>ค้นหา Review การฝึกงาน</b></div><br>
            <b-row>
            <b-col cols="4">
              <div style="margin-top:10px; margin-bottom: 3px; "><b>รายชื่อบริษัท</b></div>
            <li style="margin-bottom: 2px; cursor: pointer;" v-for="company in companies" :key="company.CompanyID"><a v-on:click="search(company.CompanyID,company.companyName)">{{company.NameTH}} {{company.NameEN}}</a></li>
          </b-col>
          <b-col>
             <div style="margin-top:10px; margin-bottom: 3px; "><b>Review บริษัท {{showCompanyName}}</b></div>
            <ol v-for="review in reviews">{{review.Comment}} Score : {{review.Rating}}</ol>
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

  data: function () {
    return {
      companies: [],
      reviews: [],
      showCompanyName: ""
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

      this.companies = []
      var studentid = getCookie('username')

      axios.get(API + `/v2/companies`, {
        headers: {
          'Authorization' : studentid
        }
      })
        .then((data) => {
          data.data.forEach(element => {
            this.companies.push(element)
          });
          console.log(this.companies)
      })

  },


  methods: {
    goStudent () {
      this.$router.push({ path: '/student/main'})
    },
    goStudent () {
      this.$router.push({ path: '/teacher/main'})
    },
    goStaff () {
      this.$router.push({ path: '/staff/main'})
    },

    async search (companyID,companyName) {

      this.reviews = []
      this.showCompanyName = ""
      var studentid = getCookie('username')


      axios.get(API + `/v2/companies/${companyID}/reviews`, {
        headers: {
          'Authorization' : studentid
        }
      })
        .then((data) => {
          this.reviews = data.data
          console.log(this.reviews)
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
