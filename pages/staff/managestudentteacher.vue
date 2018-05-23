<template>
  <section class="container">
      <div>
       <b-navbar toggleable="md" type="dark" variant="info">
        <b-navbar-brand href="#">Staff</b-navbar-brand>
       <b-navbar-nav class="ml-auto">
         <b-nav-item href="/" right>Signout</b-nav-item>
        </b-navbar-nav>
      </b-navbar>
      <b-container>
        <b-row class="container1">
          <b-col cols="2" style="background-color: #efefef; align-items:flex-start;justify-content:flex-start;">
            <ul style="margin-top: 10px;"> <b>ลงทะเบียน</b>
              <li><a href="/staff/managestudentteacher">เพิ่มนิสิต, อาจารย์</a></li>
              <li><a href="/staff/createsection">เพิ่มข้อมูล Section</a></li>
              <li><a href="/staff/managesection">จัดการข้อมูล Section</a></li>
            </ul>
            <ul style="margin-top: 10px;"> <b>จ่ายค่าเทอม</b>
              <li><a href="/staff/managepayment">ตรวจสถานะการจ่ายเงินค่าเล่าเรียน</a></li>
            </ul>
            <ul style="margin-top: 10px;"> <b>การฝึกงาน</b>
              <li><a href="/staff/createoffer">เพิ่มข้อเสนอการฝึกงานของบริษัท</a></li>
              <li><a href="/staff/createcompany">เพิ่มบริษัท</a></li>
              <li><a href="/staff/createcompanybranch">เพิ่มสาขา</a></li>
              <li><a href="/staff/checkinternshipstatus">ตรวจดูสถานะการฝึกงานตามรายคน</a></li>
              <li><a href="/staff/checkinternshipreport">ตรวจดูสถานะเอกสารรายงานฝึกงาน</a></li>
              <li><a href="/staff/createinternship">เพิ่มปีการศึกษา/Section ของวิชาฝึกงาน</a></li>
            </ul>
          </b-col>
          <b-col style="background-color: lightpink">
            <div style="margin-top: 10px; margin-bottom: 20px;"><h1><b>เพิ่มนิสิต, อาจารย์</b></h1></div>
            <div>รหัสนิสิต, อาจารย์:<input v-model="ID" placeholder="ID"></div>
            <div>ชื่อ (ภาษาไทย):<input v-model="fNameTh" placeholder="ภาษาไทย"></div>
            <div>ชื่อกลาง (ภาษาไทย):<input v-model="mNameTh" placeholder="ภาษาไทย"></div>
            <div>นามสกุล (ภาษาไทย):<input v-model="lNameTh" placeholder="ภาษาไทย"></div>
            <div>First Name (English):<input v-model="fNameEn" placeholder="English"></div>
            <div>Middle Name (English):<input v-model="mNameEn" placeholder="English"></div>
            <div>Last Name (English):<input v-model="lNameEn" placeholder="English"></div>
            <div>E-mail:<input v-model="email" placeholder="email"></div>
            <div>เบอร์โทรศัพท์ติดต่อ (เฉพาะอาจารย์เท่านั้น):<input v-model="telNo" placeholder="Tel No."></div>
            <div>รหัสครูที่ปรึกษา (Adviser ID) (เฉพาะนิสิตป.ตรีเท่านั้น) :<input v-model="adviser" placeholder="Adviser"></div>
            <div>สัญชาติ (Nationality) (เฉพาะนิสิตเท่านั้น):<input v-model="nation" placeholder="Nationality"></div>
            <div>คณะเอก (Major Faculty)(นิสิต) หรือ ทำงานที่คณะ(อาจารย์):<input v-model="majorFaculty" placeholder="Major Faculty"></div>
            <div>ภาควิชาเอก (Major Department)(นิสิต) หรือ ทำงานที่คณะ(อาจารย์):<input v-model="majorDepartment" placeholder="Major Department"></div>
            <div style="margin-top: 10px;">
              <button @click="addundergrad" style="margin-right: 3px;">เพิ่มนิสิต ป.ตรี</button>
              <button @click="addgrad" style="margin-right: 3px;">เพิ่มนิสิต ป.โท</button>
              <button @click="addTeacher">เพิ่มครู</button>
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
       ID: 0,
       fNameTh: "",
       mNameTh: "",
       lNameTh: "",
       fNameEn: "",
       mNameEn: "",
       lNameEn: "",
       email: "",
       telNo: "",
       adviser: "",
       nation: "",
       majorFaculty: "",
       majorDepartment: ""
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
    addundergrad () {

      axios.put(API + `/v2/students/undergrad`,{
        "studentId": this.ID,
        "fNameTh": this.fNameTh,
        "mNameTh": this.mNameTh,
        "lNameTh": this.lNameTh,
        "fNameEn": this.fNameEn,
        "mNameEn": this.mNameEn,
        "lNameEn": this.lNameEn,
        "studentEmail": this.email,
        "adviser": this.adviser,
        "nation": this.nation,
        "majorFaculty": this.majorFaculty,
        "majorDepartment": this.majorDepartment,
      }).then((response,error) => {
        if(!error){
          alert("Add New Undergrad Success!")
        }
        else {
          console.log(error)
          console.log(response)
          alert(response.message)
        }
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
  font-size: 20px;
  padding: 2px 2px 2px 2px;
  border-radius: 3px;
  margin-top: 5px;
  border: 2px solid #ececec
}
</style>
