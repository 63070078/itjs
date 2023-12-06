import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomePage',
  
    component: () => import('../views/HomePage.vue') // set home as path '/'
  },
  {
    path: '/signup',
    name: 'signUp',
    component: () => import('../views/SignUp.vue')
  },
  {
    path: '/signin',
    name: 'signIn',
    
    component: () => import('../views/SignIn.vue')
  },
  {
    path: '/applicantProfile',
    name: 'applicantProfile',
    meta: { login: true },
    component: () => import('../views/applicant/ApplicantProfilePage.vue')
  },
  {
    path: '/applicantProfile2_test',
    name: '/applicantProfile2_test',
    meta: { login: true },
    component: () => import('../views/applicant/ApplicantProfilePage2_test.vue')
  },
  {
    path: '/MyJobs',
    name: 'MyJobs',
    meta: { login: true },
    component: () => import('../views/applicant/MyJobsPage.vue')
  },
  {
    path: '/recruiterProfile',
    name: 'recruiterProfile',
    meta: { login: true },
    component: () => import('../views/recruiter/RecruiterProfilePage.vue')
  },
  {
    path: '/recruiterJob',
    name: 'recruiterJob',
    meta: { login: true },
    component: () => import('../views/recruiter/RecruiterJobPage.vue')
  },
  {
    path: '/recruiterAddJob',
    name: 'recruiterAddJob',
    meta: { login: true },
    component: () => import('../views/recruiter/RcruiterAddJob.vue')
  },
  {
    path: '/edit-job/:jobId',
    name: 'RecruiterJobEdit',
    meta: { login: true },
    component: () => import('../views/recruiter/RecruiterJobEdit.vue')
  },
  {
    path: '/company/:companyId',
    name: 'CompanyDetails',
    
    component: () => import('../views/CompanyDetails.vue')
  },
  {
    path: '/job/:jobId',
    name: 'JobDetails',
    meta: { login: true },
    component: () => import('../views/JobDetail.vue')
  },
  {
    path: '/applicantList',
    name: 'applicantList',
    meta: { login: true },
    component: () => import('../views/recruiter/Applicant-list.vue')
  },
  {
    path: '/applicantDetail/:applicationId',
    name: 'applicantDetail',
    meta: { login: true },
    component: () => import('../views/recruiter/Applicant-detail.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem("token");

  if (to.meta.login && !isLoggedIn) {
    alert("Please login first!");
    next({ path: "/signin" });
  }

  if (to.meta.guess && isLoggedIn) {
    alert("You've already logged in");
    next({ path: "/" });
  }

  next();
});


export default router