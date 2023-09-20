<template>
  <div class="main-content">
      <div class="section-light about-me" id="about-me">
        <div class="container">
          <div class="column is-12 about-me">
            <h1 class="title has-text-centered section-title">JOBLINK WEBSITE</h1>
          </div>
          <div class="columns is-multiline">
            <div
              class="column is-6 has-vertically-aligned-content"
              data-aos="fade-right"
            >
              <p class="is-larger">
                &emsp;&emsp;<strong
                  >Join the JOBLINK community and let your career soar to new heights. Navigate your career path with confidence and JOBLINK by your side.</strong
                >
              </p>
              <br />
              <p>
                เนื่องจากในปัจจุบันในช่วงที่นักศึกษาชั้นปีที่ 3 ขึ้นปี 4  จะต้องไปหาที่ฝึกงานหรือไปทำสหกิจศึกษาตอนปี 4 การที่จะหาบริษัทจากประกาศรับสมัครตามเว็บต่างๆ เป็นไปได้ค่อนข้างลำบากเนื่องจากแต่ละบริษัทประกาศงานไว้ในที่ที่แตกต่างกันออกไป  เช่น Facebook LinkedIn เว็บของบริษัท เป็นต้น  ทำให้ผู้ที่ต้องการยื่นสมัครต้องใช้เวลาในการค้นหานานและอาจทำผู้สมัครต้องพลาดโอกาสไป นอกจากนี้ในการยื่นสมัครแต่ละครั้งก็ต้องกรอกข้อมูลและอัปโหลดไฟล์ข้อมูลเดิม ๆ ใหม่ทุกครั้งทำให้ผู้สมัครต้องเสียเวลาในการกรอกโดยไม่จำเป็น
              </p>
              <br />
            </div>
            <div class="column is-6 right-image " data-aos="fade-left">
              <img
                class="is-rounded"
                src="https://picsum.photos/id/366/600/375"
                alt=""
              />
            </div>

            <div class="companys_content ">
              <div class="columns is-multiline">
                  <div class="companycard" v-for="company in companies" :key="company.job_id">
                      <!-- <button class="button" @click="deleteItem(index)">Del</button> -->
                      <div class="card" @click="goToCompanyDetails(company.user_id)">
                        <div>
                              <div class="card-image">
                                  <figure class="image">
                                      <img :src="imagePath(company.profile_image)" alt="Placeholder image" style="height: 150px;">
                                  </figure>
                              </div>
                              <div class="card-content">
                                      <p class="title has-text-centered is-size-6 content">{{ company.company_name }}</p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          </div>
        </div>
      </div>
      <footer class="footer">
      <div class="content has-text-centered">
        <p>
          &copy; 2023 JOBLINK. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      companies: []
    };
  },
  mounted() {
    this.getCompanies();
  },
  methods: {
    getCompanies() {
      axios
        .get("http://localhost:3000/recruiter/getRecruiter")
        .then((response) => {
          this.companies = response.data;

        })
        .catch((error) => {
          console.error(error);
        });
    },
    imagePath(companyProfileImage) {
      if (companyProfileImage) {
        return "http://localhost:3000" + companyProfileImage.replace(/\\/g, '/').replace('static', '');
      } else {
        return "https://bulma.io/images/placeholders/640x360.png";
      }
    },
    goToCompanyDetails(companyId) {
    this.$router.push("/company/"+companyId);
  },
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
  padding: 2rem;
}

.companycard{
  margin: 1rem;
}



</style>
