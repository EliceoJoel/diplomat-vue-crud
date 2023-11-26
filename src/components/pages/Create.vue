<template>
   <layout-div>
    	<router-link class="btn btn-outline-info btn-sm" to="/">
			View All Users
      </router-link>
      <h1 class="text-center mt-5 mb-3 text-2xl font-semibold">Create New User</h1>
      <div class="flex justify-center">
         <form class="w-full max-w-xs">
            <div class="form-control w-full max-w-xs">
               <label className="label">
    					<span className="label-text">Username</span>
 					</label>
               <input 
                  v-model="user.username"
                  type="text"
                  class="input input-primary input-bordered w-full max-w-xs"
                  id="username"
                  name="username"/>
               <label class="label" v-if="errors.username !== ''">
                  <span class="label-text-alt text-error">{{errors.username}}</span>
               </label>
            </div>
            <div class="form-control w-full max-w-xs">
               <label className="label">
    					<span className="label-text">Password</span>
 					</label>
               <input 
                  v-model="user.password"
                  type="password"
                  class="input input-primary input-bordered w-full max-w-xs"
                  id="password"
                  name="password"/>
               <label class="label" v-if="errors.password !== ''">
                  <span class="label-text-alt text-error">{{errors.password}}</span>
               </label>
            </div>
            <div class="form-control w-full max-w-xs">
               <label className="label">
    					<span className="label-text">Email</span>
 					</label>
               <input 
                  v-model="user.email"
						type="email"
                  class="input input-primary input-bordered w-full max-w-xs"
                  id="email"
                  name="email"/>
               <label class="label" v-if="errors.email !== ''">
                  <span class="label-text-alt text-error">{{errors.email}}</span>
               </label>
            </div>
				<div class="form-control w-full max-w-xs">
               <label className="label">
    					<span className="label-text">First name</span>
 					</label>
               <input 
                  v-model="user.userDetail.firstName"
                  type="text"
                  class="input input-primary input-bordered w-full max-w-xs"
                  id="firstname"
                  name="firstname"/>
               <label class="label" v-if="errors.firstName !== ''">
                  <span class="label-text-alt text-error">{{errors.firstName}}</span>
               </label>
            </div>
				<div class="form-control w-full max-w-xs">
               <label className="label">
    					<span className="label-text">Last name</span>
 					</label>
               <input 
                  v-model="user.userDetail.lastName"
                  type="text"
                  class="input input-primary input-bordered w-full max-w-xs"
                  id="lastname"
                  name="lastname"/>
               <label class="label" v-if="errors.lastName !== ''">
                  <span class="label-text-alt text-error">{{errors.lastName}}</span>
               </label>
            </div>
				<div class="form-control w-full max-w-xs">
               <label className="label">
    					<span className="label-text">Age</span>
 					</label>
               <input 
                  v-model="user.userDetail.age"
                  type="number"
                  class="input input-primary input-bordered w-full max-w-xs"
                  id="age"
                  name="age"/>
               <label class="label" v-if="errors.age !== ''">
                  <span class="label-text-alt text-error">{{errors.age}}</span>
               </label>
            </div>
				<div class="form-control w-full max-w-xs">
               <label className="label">
    					<span className="label-text">Birthday</span>
 					</label>
               <input 
                  v-model="user.userDetail.birthday"
                  type="date"
                  class="input input-primary input-bordered w-full max-w-xs"
                  id="birthday"
                  name="birthday"/>
               <label class="label" v-if="errors.birthday !== ''">
                  <span class="label-text-alt text-error">{{errors.birthday}}</span>
               </label>
            </div>
         	<button 
               @click="handleSave()"
               :disabled="isSaving"
               type="button"
               class="btn btn-primary mt-3">
               Save User
            </button>
         </form>
     	</div>
   </layout-div>
 </template>
  
 <script>
 import axios from 'axios';
 import LayoutDiv from '../LayoutDiv.vue';
 import Swal from 'sweetalert2'
  
 export default {
   name: 'Create',
   components: {
     LayoutDiv,
   },
   data() {
     return {
       user: {
         username: '',
         password: '',
         email: '',
         userDetail: {
            firstName: '',
            lastName: '',
            age: '',
            birthday: '',
         }
       },
       errors: {
         username: '',
         password: '',
         email: '',
         firstName: '',
         lastName: '',
         age: '',
         birthday: '',
       },
       isSaving:false,
     };
   },
   methods: {
     handleSave() {
        if(!this.thereIsErrors()) {
            this.isSaving = true;
            axios.post('http://localhost:8080/api/v1/user', this.user, {
               headers: {
                  "Content-Type": "application/json",
               }
            })  
            .then(response => {
               Swal.fire({
                  icon: 'success',
                  title: 'User saved successfully!',
                  showConfirmButton: false,
                  timer: 1500
            })
               this.isSaving = false;
               this.user.username = "";
               this.user.password = "";
               this.user.email = "";
               this.user.userDetail.firstName = "";
               this.user.userDetail.lastName = "";
               this.user.userDetail.age = "";
               this.user.userDetail.birthday = "";

               this.errors.username = '';
               this.errors.password = '';
               this.errors.email = '';
               this.errors.firstName = '';
               this.errors.lastName = '';
               this.errors.age = '';
               this.errors.birthday = '';
               return response
            })
            .catch(error => {
               this.isSaving = false
               Swal.fire({
                  icon: 'error',
                  title: 'An Error Occured!',
                  showConfirmButton: false,
                  timer: 1500
               })
               return error
            });
         } 
     },
     thereIsErrors() {
         let hasErros = false;
         //username
         if(this.user.username === "") {
            this.errors.username = "Username must not be empty";
            hasErros = true;
         } else if(this.user.username.length > 150) {
            this.errors.username = "Maximum length of username is 150 characters";
            hasErros = true;
         } else {
            this.errors.username = "";
         }

         //password
         if(this.user.password === "") {
            this.errors.password = "Password must not be empty";
            hasErros = true;
         } else if(this.user.password.length > 150 || this.user.password.length < 6) {
            this.errors.password = "Password must have minimum 6 and maxmimum 150 characters";
            hasErros = true;
         } else {
            this.errors.password = "";
         }

         //email
         if(this.user.email === "") {
            this.errors.email = "Email must not be empty";
            hasErros = true;
         } else if(this.user.email.length > 150) {
            this.errors.email = "Email length of username is 150 characters";
            hasErros = true;
         } else if(!this.isValidEmail(this.user.email)) {
            this.errors.email = "Invalid email format"
            hasErros = true;
         } else {
            this.errors.email = "";
         }

         //firstName
         if(this.user.userDetail.firstName === "") {
            this.errors.firstName = "First name must not be empty";
            hasErros = true;
         } else if(this.user.userDetail.firstName.length > 150) {
            this.errors.firstName = "Maximum length of first name is 150 characters";
            hasErros = true;
         } else {
            this.errors.firstName = "";
         }

         //lastName
         if(this.user.userDetail.lastName === "") {
            this.errors.lastName = "Last name must not be empty";
            hasErros = true;
         } else if(this.user.userDetail.lastName.length > 150) {
            this.errors.lastName = "Maximum length of last name is 150 characters";
            hasErros = true;
         } else {
            this.errors.lastName = "";
         }

         //age
         if(this.user.userDetail.age === "") {
            this.errors.age = "Age must not be empty";
            hasErros = true;
         } else if(Number(this.user.userDetail.age) < 1) {
            this.errors.age = "Invalid age value";
            hasErros = true;
         } else {
            this.errors.age = "";
         }

         //birthday
         if(this.user.userDetail.birthday === "") {
            this.errors.birthday = "Birthday must not be empty";
            hasErros = true;
         } else {
            this.errors.birthday = "";
         }

         return hasErros;
     },
     isValidEmail(email) {
         return String(email)
            .toLowerCase()
            .match(
               /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
     }
   },
 };
 </script>