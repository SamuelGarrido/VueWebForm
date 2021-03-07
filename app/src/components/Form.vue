<template>
    <div>
        <div class="split left">
            <h1>Form</h1>
            <p>Name: </p><br>
            <input v-model="user.name"/><br>
            <p>Last Name: </p><br>
            <input v-model="user.lastName"/><br>
            <button @click="addNewUser">Add</button>
        </div>
        <div class="split right">
            <ul id="example-1">
                <li v-for="item in users" :key="item.id">
                    <div>
                    {{item.name }}
                    {{item.lastName}}
                    {{item.processed}}
                    <div v-if="item.processed==false">
                        <button @click="changeProcess(item)">Change</button>
                    </div>
                    </div><br>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import DataService from '../services/DataService';
export default {
  name: 'Form',
  props: {
    
  },
  data(){
        return{
            user: {
                name: "",
                lastName: "",
                Process: false
            },
            users:[]
        }
    },
    methods:{
        async addNewUser(){
            const newUser = {
                name: this.user.name, 
                lastName: this.user.lastName
            }                  
            await DataService.create(newUser);
            this.updateUsers();
        },
        
        async changeProcess(item){
            const updateUser ={
                name: item.name,
                lastName: item.lastName,
                processed: true,
                id: item.id
            }
            await DataService.update(updateUser);
            this.updateUsers();
        },
        updateUsers(){
            const response = DataService.getAll();
            response.then(res=>{this.users=res.data})
        }
    },
    beforeCreate() {
        const response = DataService.getAll();
        response.then(res=>{this.users=res.data})
    }
}
</script>
<style scoped>
h1 {
  margin: 40px 0 0;
}

a {
  color: #42b983;
}
body {
  font-family: Arial;
  color: white;
}

.split{
    height: 100%;
    width: 50%;
    position: fixed;
    z-index: 1;
    top: 0;
    overflow-x: hidden;
    padding-top: 20px;    
}
.left {
  left: 0;
  background-color: #42b983;
}

.right {
  right: 0;
  background-color: white;
}


</style>