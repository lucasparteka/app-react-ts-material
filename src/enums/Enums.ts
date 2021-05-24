
interface IGender {
    [key: string]: string;
}

export const GenderEnum: Readonly<IGender> = Object.freeze({male: "Masculino", female: "Feminino"});

export enum PATIENT_ACTIONS {
    EDIT,
    DELETE,
}