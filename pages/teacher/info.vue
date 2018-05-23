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
            <div style="margin-top:10px; margin-bottom: 3px;"><h2><b>ข้อมูลส่วนตัว</b></h2></div>
            <div style="display: flex; justify-content: center;">
              <table border = "1" style="margin-top: 20px; align-self: center; width: 100%;">
              <tr>
                <th>รหัสครู</th>
                <td>{{teacherinfo.TeacherID === null ? "-" : teacherinfo.TeacherID }}</td>
              </tr>
              <tr>
                <th>ชื่อ</th>
                <td>{{teacherinfo.FnameTH === null ? "-" : teacherinfo.FnameTH }}</td>
              </tr>
              <tr v-if="teacherinfo.MnameTH !== null">
                <th>ชื่อกลาง</th>
                <td>{{teacherinfo.MnameTH}}</td>
              </tr>
              <tr>
                <th>นามสกุล</th>
                <td>{{teacherinfo.LnameTH === null ? "-" : teacherinfo.LnameTH}}</td>
              </tr>
              <tr>
                <th>First Name</th>
                <td>{{teacherinfo.FnameEN === null ? "-" : teacherinfo.FnameEN }}</td>
              </tr>
              <tr v-if="teacherinfo.MnameEN !== null">
                <th>Middle Name</th>
                <td>{{teacherinfo.MnameEN}}</td>
              </tr>
              <tr>
                <th>Last Name</th>
                <td>{{teacherinfo.LnameEN === null ? "-" : teacherinfo.LnameEN}}</td>
              </tr>
              <tr>
                <th>คณะ (Faculty)</th>
                <td>{{facultyinfo.NameTH === null ? "-" : facultyinfo.NameTH}} ({{facultyinfo.NameEN === null ? "-" : facultyinfo.NameEN}})</td>
              </tr>
              <tr>
                <th>สาขา (Department)</th>
                <td>{{departmentinfo.NameTH === null ? "-" : departmentinfo.NameTH}} ({{departmentinfo.NameEN === null ? "-" : departmentinfo.NameEN}})</td>
              </tr>
              <tr>
                <th>เบอร์โทรศัพท์ติดต่อ</th>
                <td>{{teacherinfo.TelNo === null ? "-" : teacherinfo.TelNo}}</td>
              </tr>
              <tr>
                <th>อีเมล (E-mail Address)</th>
                <td>{{teacherinfo.TeacherEmail === null ? "-" : teacherinfo.TeacherEmail}}</td>
              </tr>
            </table>
            </div></b-col>
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
        teacherinfo: {},
        facultyinfo: {},
        departmentinfo: {}
      }
  },

  components: {

  },


  beforeMount: function() {

        if (getCookie('username') === ""){
        alert("Session Timeout!")
        this.$router.push('/')
        }
  },

  mounted : function() {

      this.teacherinfo = {}
      this.facultyinfo = {}
      this.departmentinfo = {}

      var teacherid = getCookie('username')

      axios.get(API + `/v2/teachers/${teacherid}/`,{
        headers: {
          'Authorization' : teacherid
        }
      }).then((data) => {
        this.teacherinfo = data.data[0]
        console.log(this.teacherinfo)

        axios.get(API + `/v2/faculties/${data.data[0].WorksForFaculty}`,{
        headers: {
          'Authorization' : teacherid
        }
        }).then((dataa) => {
          this.facultyinfo = dataa.data
          console.log(this.facultyinfo)
          })

        axios.get(API + `/v2/faculties/${data.data[0].WorksForFaculty}/departments/${data.data[0].WorksForDepartment}`,{
            headers: {
              'Authorization' : teacherid
            }
          }).then((dataa) => {
            this.departmentinfo = dataa.data[0]
            console.log(this.departmentinfo)

      })
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
