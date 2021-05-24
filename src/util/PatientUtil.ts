import { IPatient, INewValuesPatient } from "../interfaces/IPatient";

export const mergeEditedValues = (patient: IPatient, newValues: INewValuesPatient): IPatient => {
    let newPatient = patient;
    newPatient.name.first = newValues.firstName;
    newPatient.name.last = newValues.lastName;
    newPatient.email = newValues.email;
    newPatient.gender = newValues.gender;
    newPatient.location.street = newValues.street;
    newPatient.location.postcode = newValues.postcode;
    newPatient.location.city = newValues.city;
    newPatient.location.state = newValues.state;
    newPatient.nat = newValues.nat;
    newPatient.dob.date = newValues.birth;
    newPatient.cell = newValues.cell;
    newPatient.id.name = newValues.idName;
    newPatient.id.value = newValues.idValue;

    return newPatient;
}