<template>
   <layout-div>
    	<router-link class="btn btn-outline-info btn-sm" to="/">
			View All Users
      </router-link>
      <h1 class="text-center mt-5 mb-3 text-2xl font-semibold">Edit User Information</h1>
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
            </div>
				<div class="form-control w-full max-w-xs">
               <label className="label">
    					<span className="label-text">Age</span>
 					</label>
               <input 
                  v-model="user.userDetail.age"
                  type="input"
                  class="input input-primary input-bordered w-full max-w-xs"
                  id="age"
                  name="age"/>
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
            </div>
            <button 
               @click="handleSave()"
               :disabled="isSaving"
               type="button"
               class="btn btn-primary mt-3">
               Save Changes
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
  name: 'Edit',
  components: {
    LayoutDiv,
  },
  data() {
    return {
      user: {
         id: '',
         username: '',
         password: '',
         email: '',
         createdAt: '',
         userDetail: {
            id: '',
            firstName: '',
            lastName: '',
            age: '',
            birthday: '',
         }
      },
      isSaving:false,
    };
  },
  created() {
    const id = this.$route.params.id;
    axios.get(`http://localhost:8080/api/v1/user/${id}`, {
         headers: {
            "Content-Type": "application/json",
       }})
    .then(response => {
         const userInfo = response.data;
         this.user.id =  userInfo.id;
         this.user.username = userInfo.username;
         this.user.password = userInfo.password;
         this.user.email = userInfo.email;
         this.user.createdAt = userInfo.createdAt;
         this.user.userDetail.id = userInfo.userDetail.id;
         this.user.userDetail.firstName = userInfo.userDetail.firstName;
         this.user.userDetail.lastName = userInfo.userDetail.lastName;
         this.user.userDetail.age = userInfo.userDetail.age;
         this.user.userDetail.birthday = userInfo.userDetail.birthday;
         return response
    })
    .catch(error => {
        Swal.fire({
            icon: 'error',
            title: 'An Error Occured!',
            showConfirmButton: false,
            timer: 1500
        })
        return error
    })
  },
  methods: {
    handleSave() {
         this.isSaving = true
         const id = this.$route.params.id;
         axios.put(`http://localhost:8080/api/v1/user/${id}`, this.user, {
            headers: {
               "Content-Type": "application/json",
            }})
         .then(response => {
            Swal.fire({
                icon: 'success',
                title: 'Project updated successfully!',
                showConfirmButton: false,
                timer: 1500
            })
            this.isSaving = false;
            this.$router.push('/');
            return response;
          })
          .catch(error => {
            this.isSaving = false
            Swal.fire({
                icon: 'error',
                title: 'An Error Occured!',
                showConfirmButton: false,
                timer: 1500
            })
            console.log(error);
            return error;
          });
    },
  },
};
</script>