import BaseAPIService from "../BaseAPIService"


class StudentDelete extends BaseAPIService {
    async deleteStudent(id: any): Promise<any> {
        return await this.request(`/students/${id}`, 'DELETE', id)
    }
}


export const Student_Delete = new StudentDelete()