<template>
    <div class="space-y-10 divide-y divide-gray-900/10 dark:divide-gray-50 dark:bg-primary p-10 lg:h-screen sm:h-max">
  
        <div class="flex justify-between">
            <h1 class="text-2xl text-gray-900 dark:text-white">
                Edit Students Data
            </h1>
  
            <button @click="navigateTo('/admin/students')" class="w-28 bg-primary text-white rounded-sm text-sm px-4 py-3 dark:bg-sky-500 dark:hover:bg-sky-400">Back</button>
        </div>
  
        <form class="grid grid-cols-1 gap-x-8 gap-y-8 pt-14 md:grid-cols-3 h-max" @submit.prevent="updateStudent(params)">
            <div class="bg-white shadow-sm ring-1 ring-gray-900/25 sm:rounded-xl md:col-span-3 dark:bg-slate-800">
                <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 px-4 py-6 sm:p-8">
                    
                    <div class="sm:col-span-3">
                        <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900 dark:text-white">First name</label>
                        <div class="mt-2">
                            <input type="text" name="first-name" id="first-name" autocomplete="given-name" placeholder="Autumn" v-model="student.firstname"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 box-border p-2 dark:bg-transparent dark:text-white" />
                        </div>
                    </div>
  
                    <div class="sm:col-span-3">
                        <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900 dark:text-white">Last name</label>
                        <div class="mt-2">
                            <input type="text" name="last-name" id="last-name" autocomplete="family-name" placeholder="Leondale" v-model="student.lastname"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 box-border p-2 dark:bg-transparent dark:text-white" />
                        </div>
                    </div>
  
                    <div class="sm:col-span-3">
                        <label for="Birthdate" class="block text-sm font-medium leading-6 text-gray-900 dark:text-white">Birthday</label>
                        <div class="mt-2">
                            <input type="date" name="Birthdate" id="Birthdate" v-model="student.birthday"
                                class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-900 sm:text-sm sm:leading-6 box-border p-2 dark:bg-transparent dark:text-white"/>
                        </div>
                    </div>
  
                    <div class="sm:col-span-3">
                        <label for="Age" class="block text-sm font-medium leading-6 text-gray-900 dark:text-white">Age</label>
                        <div class="mt-2">
                            <input type="number" name="Age" id="Age" min="1" v-model="student.age"
                                class="remove-arrow block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 box-border p-2 dark:bg-transparent dark:text-white" />
                        </div>
                    </div>
  
                    <div class="sm:col-span-3">
                        <label for="Allowance" class="block text-sm font-medium leading-6 text-gray-900 dark:text-white">Allowance</label>
                        <div class="mt-2">
                            <input type="number" step="any" name="Allowance" id="Allowance" v-model="student.allowance"
                                class="remove-arrow block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 box-border p-2 dark:bg-transparent dark:text-white" />
                        </div>
                    </div>
  
                    <div class="sm:col-span-3">
                        <label for="Course" class="block text-sm font-medium leading-6 text-gray-900 dark:text-white">Course</label>
                        <div class="mt-2">
                            <select id="Course" name="Course" autocomplete="Course-name" v-model="student.course"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 box-border p-2 dark:bg-slate-800 dark:text-white">
                                <option value="BSIT">BS in Information Technology (BSIT)</option>
                                <option value="BSCS">BS in Computer Science (BSCS)</option>
                                <option value="BSIS">BS in Information Systems (BSIS)</option>
                                <option value="ACT">2-yr. Associate in Computer Technology (ACT)</option>
                                <option value="BSECE">BS in Electronics and Communications Engineering (BSECE)</option>
                                <option value="BSCE">BS in Civil Engineering (BSCE)</option>
                                <option value="BSPsy">BS in Psychology (BSPsy)</option>
                                <option value="BSBA">BS in Business Administration (BSBA)</option>
                                <option value="BSEng">BS in English (BSEng)</option>
                                <option value="BSPolSci">BS in Political Science (BSPolSci)</option>
                                <option value="BSEcon">BS in Economics (BSEcon)</option>
                                <option value="BSEdu">BS in Education (BSEdu)</option>
                                <option value="BFA">Bachelor of Fine Arts (BFA)</option>
                                <option value="BArch">Bachelor of Architecture (BArch)</option>
                            </select>
                        </div>
                    </div>
  
                </div>
            </div>
  
            <div class="flex items-center justify-end gap-x-3 px-4 py-4 sm:px-8 col-span-full">
                <button @click="navigateTo('/admin/students')" type="button" class="w-28 bg-primary text-white rounded-sm text-sm px-4 py-3 dark:bg-sky-500 dark:hover:bg-sky-400">Cancel</button>
                <button type="submit" class="w-28 bg-primary text-white rounded-sm text-sm px-4 py-3 dark:bg-sky-500 dark:hover:bg-sky-400">Save</button>
            </div>
        </form>
    </div>
</template>
  
  <script setup lang="ts">
  import { useRouter, useRoute } from 'vue-router'
  import { reactive } from 'vue'
  import { Student_Update } from '@/components/api/admin/updateStudent'
  
  const router = useRouter()
  
  let student = reactive({
    firstname: '',
    lastname: '',
    birthday: '',
    age: '',
    allowance: '',
    course: '',
  })
  
  const { params } = useRoute()
  // getStudent(params.id)
  findStudentById(params.id)
  const stId = params.id
  
  async function updateStudent(){
    const params = `${stId}`
    const s = {
        firstname: student.firstname,
        lastname:student.lastname,
        birthday:student.birthday,
        age:student.age,
        allowance:student.allowance,
        course:student.course,
    }
    const response = await Student_Update.updateStudent(params, s)
    alert('Student data has been successfully updated.')
  }
  
  async function findStudentById(studentId: any) {
    const params = `${studentId}`
    const response = await Student_Update.findStudentById(params)
    console.log(response.data)
    let st = response.data
    student.firstname = st.firstname
    student.lastname = st.lastname
    student.birthday = st.birthday
    student.age = st.age
    student.allowance = st.allowance
    student.course = st.course
    return response
  }
  
  function navigateTo(path: string) {
    router.push(path)
  }
  
  </script>
  