<template>
  <div>
    <div class="columns mt-1" style="margin: 5%;">
      <!-- Left side (image and company name) -->
      <div class="column is-6">
        <div class="columns">
          <div class="column is-4">
            <img src="http://animal.discovery.com/mammals/cheetah/pictures/cheetah-picture.jpg" alt="Img company" />
          </div>
          <div class="column">
            <h2 class="mb-4">Name of Company{{ company.company_name }}</h2>
            
          </div>
        </div>
      </div>

      <!-- Right side (buttons) -->
      <div class="column is-6">
        <div class="is-flex is-justify-content-flex-end">
          <button class="button is-success" v-show="user.role === 'applicant'" @click="applyToJob(jobs.job_id)">
            ยื่นสมัคร
          </button>
          <button class="button is-danger ml-3" @click="reportJob(jobs.job_id)">
            Report
          </button>
        </div>
      </div>
    </div>

    <div class="has-background-light box mt-3 pl-3 pr-4 pt-4 pb-4" style="margin: 5%;">
      <p class="has-text-right"></p>
      <div class="columns mt-1">
        <div class="column is-11">
          <div class="is-size-5 p-4">
            <b>{{ jobs.title }}</b>
          </div>
          <div class="pl-3">
            <div class="p-4">
              <i class="pi pi-map-marker">
                <span class="is-size-5 pl-4"><b>สถานที่ทำงาน:{{ jobs.location }} </b></span>
              </i>
            </div>
            <div class="p-4">
              <i class="pi pi-dollar">
                <span class="is-size-5 pl-4"><b>ค่าตอบแทน / วัน : {{ jobs.salary }} </b></span>
              </i>
            </div>
            <div class="p-4">
              <i class="pi pi-user">
                <span class="is-size-5 pl-4"><b>ระยะเวลา / เดือน : {{ jobs.internship_duration }}
                  </b></span>
              </i>
            </div>
            <div class="p-4">
              <i class="pi pi-user">
                <span class="is-size-5 pl-4"><b>รายละเอียดงาน : {{ jobs.description }}
                  </b></span>
              </i>
            </div>
            <div class="p-4">
              <i class="pi pi-user">
                <span class="is-size-5 pl-4"><b>คุณสมบัติผู้สมัคร : {{ jobs.qualifications }}
                  </b></span>
              </i>
            </div>
          </div>
        </div>
      </div>
      <div style="display: flex; flex-direction: column; align-items: flex-end"></div>
    </div>
  </div>
</template>







<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      company: [],
      jobs: [],
      user: []
    };
  },
  mounted() {
    const jobId = this.$route.params.jobId;
    const companyId = 59;
    this.getCompanyJobs(jobId);
    this.getCompanyDetails(companyId);
    this.getUser();
  },

  methods: {
    getUser() {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios.get("http://localhost:3000/user/me", config).then((res) => {
        this.companyId = res.data;
        this.user = res.data;
        console.log("App.vue", this.user)
      });
    },
    getCompanyDetails(companyId) {
      axios
        .get(`http://localhost:3000/recruiter/getRecruiterDetails/${companyId}`)
        .then((response) => {
          this.company = response.data;
          this.company.profile_image = response.data.profile_image.replace(/\\/g, '/').replace('static', '');
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getCompanyJobs(jobId) {
      axios
        .get(`http://localhost:3000/recruiter/getJobDetail/${jobId}`)
        .then((response) => {
          this.jobs = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    applyToJob(jobId) {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const data = {
        user_id: this.user.user_id,
        job_id: jobId,
      };
      //console.log(`Applying to job ${jobId}`);
      axios
        .post(`http://localhost:3000/application/sendApplicationJob`, data, config)
        .then(res => {
          console.log(res.data.message)

          Swal.fire({
            position: "center",
            icon: "success",
            title: "ดำเนินการสำเร็จ",
            showConfirmButton: false,

          });
        });
    },

    /*
    reportJob(jobId) {
      console.log(`Reporting job ${jobId}`);
      Swal.fire({
        title: "รายงานงาน",
        text: "คุณต้องการรายงานงานนี้ใช่หรือไม่?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "รายงาน",
        cancelButtonText: "ยกเลิก",
      }).then((result) => {
        if (result.isConfirmed) {
          console.log("Job reported!");
          Swal.fire({
            title: "รายงานสำเร็จ",
            text: "ขอบคุณที่รายงาน",
            icon: "success",
          });
        }
      });
    },*/
    // ... (previous code)

    reportJob(jobId) {
      console.log(`Reporting job ${jobId}`);

      // Create a reactive data property to store the user's report details
      const reportData = { title: '', description: '' };

      Swal.fire({
        title: 'รายงานงาน',
        html: `
      <label for="swal-input1" class="swal2-input-label">Title of Report:</label>
      <input type="text" id="swal-input1" class="swal2-input" placeholder="Title" 
        onchange="setReportData('title', this.value)">
      <label for="swal-input2" class="swal2-input-label">Description:</label>
      <textarea id="swal-input2" class="swal2-textarea" placeholder="Description"
        onchange="setReportData('description', this.value)"></textarea>
    `,
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'รายงาน',
        cancelButtonText: 'ยกเลิก',
        focusConfirm: false,
        preConfirm: () => {
          if (!reportData.title || !reportData.description) {
            Swal.showValidationMessage('โปรดกรอกข้อมูลทั้งหมด');
          }
        },
      }).then((result) => {
        if (result.isConfirmed) {
          console.log('Job reported with details:', reportData);
          Swal.fire({
            title: 'รายงานสำเร็จ',
            text: 'ขอบคุณที่รายงาน',
            icon: 'success',
          });
        }
      });

      // Helper function to update reportData
      window.setReportData = (field, value) => {
        reportData[field] = value;
      };
    },

  },
};
</script>
  
<style scoped>
/* สไตล์ของหน้ารายละเอียดบริษัท */

/* Media query for responsive design */
@media screen and (max-width: 768px) {
  .columns {
    flex-direction: column;
  }

  .column.my-3 {
    margin-top: 10px;
  }
}
</style>
  