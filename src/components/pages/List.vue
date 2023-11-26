<template>
   <layout-div>
         <div>
             <h2 class="text-center mt-5 mb-3 text-2xl font-semibold">Users Manager</h2>
             <div>
                  <router-link to="/create" class="btn btn-primary btn-sm">
                     Create New User
                  </router-link>
                  <div class="overflow-x-auto mt-4">
                     <table class="table">
                     <thead>
                        <tr class="uppercase text-black">
                           <th>Id</th>
                           <th>Username</th>
                           <th>Email</th>
									<th>First Name</th>
									<th>Last Name</th>
									<th>Age</th>
									<th>Birthday</th>
									<th>Created date</th>
                           <th width="260px">Actions</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr v-for="user in users" :key="user.id">
                           <td>{{user.id}}</td>
                           <td>{{user.username}}</td>
                           <td>{{user.email}}</td>
									<td>{{user.firstName}}</td>
									<td>{{user.lastName}}</td>
									<td>{{user.age}}</td>
									<td>{{user.birthday}}</td>
									<td>{{user.createdAt}}</td>
                           <td>
                              <div class="flex gap-4">
                                 <router-link :to="`/edit/${user.id}`" class="btn btn-outline btn-info btn-sm">Edit</router-link>
                                 <button 
                                    @click="handleDelete(user.id)"
                                    className="btn btn-outline btn-error btn-sm">
                                    Delete
                                 </button>
                              </div>
                           </td>
                        </tr>
                     </tbody>
                  </table>
                  </div>
             </div>
         </div>
     </layout-div>
 </template>
  
 <script>
 import axios from 'axios';
 import LayoutDiv from '../LayoutDiv.vue';
 import Swal from 'sweetalert2'
  
 export default {
   name: 'List',
   components: {
     LayoutDiv,
   },
   data() {
     return {
       users:[]
     };
   },
   created() {
     this.fetchProjectList();
   },
   methods: {
     	fetchProjectList() {
			axios("http://localhost:8080/api/v1/user?detailed=true", {
				headers: {
					"Content-Type": "application/json"
				}
			}).then(response => {
				this.users = response.data;
			}).catch(error => {
				console.error(error);
				Swal.fire({
               icon: 'error',
               title: 'An Error Occured!',
               showConfirmButton: false,
               timer: 1500
            })
			});
     },
     handleDelete(id){
         Swal.fire({
             title: 'Are you sure?',
             text: "You won't be able to revert this!",
             icon: 'warning',
             showCancelButton: true,
             confirmButtonColor: '#3085d6',
             cancelButtonColor: '#d33',
             confirmButtonText: 'Yes, delete it!'
           }).then((result) => {
             if (result.isConfirmed) {
                 axios.delete(`http://localhost:8080/api/v1/user/${id}`)
                 .then( response => {
                     Swal.fire({
                         icon: 'success',
                         title: 'User deleted successfully!',
                         showConfirmButton: false,
                         timer: 1500
                     })
                     this.fetchProjectList();
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
                 });
             }
           })
     }
   },
 };
 </script>