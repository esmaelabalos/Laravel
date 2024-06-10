<template>
    <div>
        <NuxtLayout name="admin">

            <Head>
                <Title>Students - {{ runtimeConfig.public.appName }}</Title>
            </Head>
            <h2 class="text-2xl text-gray-900 dark:text-white mt-4 mb-4">
                List of the Students
            </h2>

            <div>
                <Alert type="danger" :text="state.error?.message" v-if="state.error" />
                <div class="table-responsive">
                    <Table :columnHeaders="state.columnHeaders" :data="state.students" :isLoading="state.isTableLoading"
                        :sortData="state.sortData" @sort="sort">
                        <template #body
                            v-if="!(state.isTableLoading || (state.students?.data && state.students?.data.length === 0))">
                            <tr v-for="(student, index) in state.students?.data" :key="index">
                                <td>
                                    <span class="truncate">{{ student.firstname + " " + student.lastname }}</span>
                                </td>
                                <td>
                                    <span>{{ student.course }}</span>
                                </td>
                                <td>
                                    <span>{{ student.birthday }}</span>
                                </td>
                                <td>
                                    <span>{{ student.age }}</span>
                                </td>
                                <td>
                                    <span>{{ student.allowance }}</span>
                                </td>
                                <td class='flex'>
                                    <nuxt-link 
                                        :to="`/admin/students/${student.id}`"class="bg-primary text-white rounded-sm text-sm px-4 py-3 dark:bg-sky-500 dark:hover:bg-sky-400 mr-2 text-center w-24"> <!-- Adjust the w-24 as needed -->
                                        Edit
                                    </nuxt-link>
                                    <button 
                                        @click="deleteStudent(student.id)"class="bg-primary text-white rounded-sm text-sm px-4 py-3 dark:bg-sky-500 dark:hover:bg-sky-400 ml-2 w-24"> <!-- Adjust the w-24 as needed -->
                                        Delete
                                    </button>
                                    </td>

                            </tr>
                        </template>
                    </Table>
                </div>
                <Pagination :data="state.students" @previous="previous" @next="next" />
            </div>

        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
import { studentService } from '@/components/api/admin/StudentService'
import { Student_Delete } from '@/components/api/admin/StudentDelete'


const runtimeConfig = useRuntimeConfig()
let currentTablePage = 1

const state = reactive({
    columnHeaders: [
        { name: 'Name', sorter: true, key: 'name' },
        { name: 'Course' },
        { name: 'Birthdate' },
        { name: 'Age' },
        { name: 'Allowance' },
        { name: '' },
        { name: '' },
    ],
    error: null,
    isTableLoading: false,
    sortData: {
        sortField: 'id',
        sortOrder: 'ascend',
    },
    students: [],
})

onMounted(() => {
    fetchStudents()
})

async function fetchStudents() {
    state.isTableLoading = true
    state.error = null
    try {
        const params = {
            page: currentTablePage,
            sortField: state.sortData.sortField,
            sortOrder: state.sortData.sortOrder,
        }
        const response = await studentService.getStudents(params)
        state.students = response
    } catch (error: any) {
        state.error = error
    }
    state.isTableLoading = false
}


async function deleteStudent(studentId: any) {
    const params = `${studentId}`
        const response = await Student_Delete.deleteStudent(params)
        state.students = response
        state.isTableLoading = false
        fetchStudents() 
}

function previous() {
    currentTablePage--
    fetchStudents()
}

function next() {
    currentTablePage++
    fetchStudents()
}

function sort(sortingData: any) {
    currentTablePage = 1
    state.sortData = {
        sortField: sortingData.column,
        sortOrder: sortingData.sort,
    }
    fetchStudents()
}

</script>