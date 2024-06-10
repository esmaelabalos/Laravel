import BaseAPIService from "../BaseAPIService"


class studentUpdate extends BaseAPIService {
    async findStudentById(id: any): Promise<any> {
        return await this.request(`/students/${id}`, 'GET', id)
    }

    async updateStudent(Sid: any, s: any): Promise<any> {
        return await this.request(`/students/${Sid}`, 'PUT', s)
    }
}


export const Student_Update = new studentUpdate()