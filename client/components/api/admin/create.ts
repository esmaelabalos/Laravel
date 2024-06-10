import BaseAPIService from '~/components/api/BaseAPIService'

class create extends BaseAPIService {
    async createStudent(params: object): Promise<any> {
        return await this.request(`/students`, 'POST', params)
    }
}

export const Create = new create()