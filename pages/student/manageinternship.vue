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
            <div style="margin-top:10px; margin-bottom: 3px">
              <h2><b>การฝึกงาน</b></h2>
            </div>
            <div style="display: flex; justify-content: center;">
              <table border="1" style="margin-top: 20px; align-self: center; width:90%">
                <tr>
                  <th>ปี</th>
                  <th>สถานะ</th>
                  <th>บริษัท</th>
                  <th>Position</th>
                  <th>ตำแหน่ง</th>
                  <th>วันเริ่มต้นการฝึกงาน</th>
                  <th>วันที่สิ้นสุดการฝึกงาน</th>
                  <th>Review</th>
                </tr>
                <tr v-for="internship in allInternships" :key="internship.Year">
                  <td>{{ internship.Year}}</td>
                  <td>{{ internship.Status}}</td>
                  <td>{{ internship.NameEN}}</td>
                  <td>{{ internship.PositionNameEn === null ? '-' : internship.PositionNameEn}}</td>
                  <td>{{ internship.PositionNameTH === null ? '-' : internship.PositionNameTH}}</td>
                  <td>{{ internship.StartDate}}</td>
                  <td>{{ internship.EndDate}}</td>
                  <td>{{ (internship.Comment === null || internship.Comment == "") ? "-" : internship.Comment}}</td>
                </tr>
              </table>
            </div>
            <div style="margin-top:10px; margin-bottom: 3px">
              <h2><b>เพิ่มการฝึกงาน</b></h2>
            </div>
            <div class="formcontainer" style="display: flex">
              <form>
                <p>
                  <label for="">Year</label>
                  <input type="text" name="year" v-model="year"><br>
                </p>
                <p>
                  <label for="">Company ID</label>
                  <input type="text" name="companyid" v-model="companyId"><br>
                </p>
                <p>
                  <label for="">Branch Name</label>
                  <input type="text" name="branchname" v-model="branchName"><br>
                </p>
                <p>
                  <label for="">Start Date</label>
                  <input type="text" name="startdate" v-model="startdate"><br>
                </p>
                <label for="">End Date</label>
                <input type="text" name="enddate" v-model="enddate"><br>
                <p>
                  <label for="">Position (English)</label>
                  <input type="text" name="positionnameen" v-model="positionNameEn"><br>
                </p>
                <p>
                  <label for="">Official</label>
                  <input type="checkbox" name="isofficial" v-model="isOfficial"><br>
                </p>
                <button type="button" @click="addIntern">เพิ่ม</button>
              </form>
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
  const {
    API
  } = require('../../api.config');

  function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1);
      if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
  }

  export default {
    data: function() {
      return {
        allInternships: [],
        year: "2017",
        companyId: "2",
        branchName: "1",
        startdate: "2017-01-01",
        enddate: "2017-03-01",
        positionNameEn: "test frontend",
        isOfficial: true,
      }
    },
    components: {},

    beforeMount: function() {
      console.log("hello")
      console.log(getCookie('username'))
      if (getCookie('username') === "") {
        alert("Session Timeout!")
        this.$router.push('/')
      }

    },
    mounted: function() {

      this.allInternships = []

      var studentid = getCookie('username')

      axios.get(API + `/v2/students/${studentid}/internships`, {
        headers: {
          'Authorization': studentid
        }
      }).then((data) => {
        data.data.forEach(element => {
          this.allInternships.push(element)
        });
        console.log('finish')
        console.log(this.allInternships);
      })
    },

    methods: {

      async addIntern() {
        var studentid = getCookie('username')
        console.log(this.startDate);
        console.log(this.endDate);
        if (!this.isOfficial) {
          axios.put(API + `/v2/students/${studentid}/internships`, {
            headers: {
              'Authorization': studentid
            },
            companyId: this.companyId,
            branchName: this.branchName,
            year: this.year,
            startdate: this.startdate,
            enddate: this.enddate,
            positionNameEn: this.positionNameEn,
            positionNameTh: this.positionNameTh,
          }).then(function(response) {
            console.log(response)
            alert("accepted")
          }).catch(function(error) {
            var err_msg = error.response.data.message;
            alert(err_msg);
          })
        } else {
          axios.put(API + `/v2/students/${studentid}/official_internship`, {
            headers: {
              'Authorization': studentid
            },
            companyId: this.companyId,
            branchName: this.branchName,
            year: this.year,
            startdate: this.startdate,
            enddate: this.enddate,
            positionNameEn: this.positionNameEn,
            positionNameTh: this.positionNameTh,
          }).then(function(response) {
            console.log(response)
            alert("accepted")
            this.allInternships = []
            var studentid = getCookie('username')

            axios.get(API + `/v2/students/${studentid}/internships`, {
              headers: {
                'Authorization': studentid
              }
            }).then((data) => {
              data.data.forEach(element => {
                this.allInternships.push(element)
              });
              console.log('finish')
              console.log(this.allInternships);
            })
          }).catch(function(error) {
            var err_msg = error.response.data.message;
            alert(err_msg);
          })
        }
      },

      goStudent() {
        this.$router.push({
          path: '/student/main'
        })
      },
      goStudent() {
        this.$router.push({
          path: '/teacher/main'
        })
      },
      goStaff() {
        this.$router.push({
          path: '/staff/main'
        })
      }
    }
  }
</script>

<style>
  .container1 {
    min-width: 100vw;
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

  form {
    display: table;
  }

  p {
    display: table-row;
  }

  label {
    display: table-cell;
    text-align: left;
  }

  input {
    display: table-cell;
  }
</style>
