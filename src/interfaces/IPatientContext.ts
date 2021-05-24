import {IPatient} from "../interfaces/IPatient";

export interface IPatientContext {
    patientList: IPatient[] | [];
    refLastItem: string | null;
    getPatientList: () => void;
    getPatientById: (_id: string) => Promise<IPatient>;
    loadMorePatient: () => Promise<void>;
    editPatient: (patient: IPatient) => Promise<void>;
    deletePatient: (_id: string) => Promise<void>;

}