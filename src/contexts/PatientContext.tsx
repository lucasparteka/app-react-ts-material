import { createContext, useEffect, useState } from "react";
import PatientService, { IQueryParam } from "../services/PatientService";
import {IPatient} from "../interfaces/IPatient";
import {IPatientContext} from "../interfaces/IPatientContext";

const PatientContext = createContext<IPatientContext>({} as IPatientContext);

const PatientProvider: React.FC = ({ children }) => {

    const [patientList, setPatientList] = useState<IPatient[] | []>([]);
    const [refLastItem, setRefLastItem] = useState<string>("");

    useEffect(() => {
        getPatientList()
    }, []);

    const getPatientList = async () => {
        let result = await PatientService.getPatientList(null);
        setPatientList(result);

        if (result.length)
            setRefLastItem(result[result.length -1]._id);

    };

    const getPatientById = async (_id: string) => {
        return await PatientService.getPatientById(_id);

    };

    const loadMorePatient = async () => {
        let queryParam: IQueryParam = {keyset: refLastItem}
        let result = await PatientService.getPatientList(queryParam);
        setPatientList((patientList) => [...patientList, ...result]);
        
        if (result.length)
            setRefLastItem(result[result.length -1]._id);
    };

    const editPatient = async (patient: IPatient) => {
        await PatientService.updatePatient(patient);
    }

    const deletePatient = async (_id: string) => {
        if (_id != null)
            await PatientService.deletePatient(_id);
        
        setPatientList((currentList) => currentList.filter((patient) => patient._id !== _id))
    }

    return (
        <PatientContext.Provider value={{ patientList, getPatientList, loadMorePatient, refLastItem, deletePatient, editPatient, getPatientById }}>
            {children}
        </PatientContext.Provider>
    );
};

export { PatientContext, PatientProvider };
