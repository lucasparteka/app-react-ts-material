import { IPatient } from "../interfaces/IPatient";

export interface IQueryParam {
    [key: string]: string | number | boolean;
}

class PatientService {
    static url: string = process.env.REACT_APP_URL_API + "/users";

    static async getPatientList(queryParam: IQueryParam | null): Promise<IPatient[]> {
        let result = await fetch(this.buildQueryParam(queryParam), {
            method: "GET",
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            }
        });
        return await result.json();
    }

    static async getPatientById(_id: string): Promise<IPatient> {
        let result = await fetch(this.url+ "/" + _id, {
            method: "GET",
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            }
        });
        return await result.json();
    }

    static async updatePatient(patient: IPatient): Promise<void> {
        let result = await fetch(this.url + "/" + patient._id, {
            method: "PUT",
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(patient)
        });
        return await result.json();
    }

    static async deletePatient(_id: string): Promise<void> {
        let result = await fetch(this.url + "/" + _id, {
            method: "DELETE",
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            }
        });
        return await result.json();
    }

    static buildQueryParam(query: IQueryParam | null): string {
        if (!!query)
            return PatientService.url+ "?" + new URLSearchParams(Object.entries(query as Object)).toString()
        
        return this.url;
    }
}

export default PatientService;