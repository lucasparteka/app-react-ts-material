import { useContext } from "react";
import { PatientContext } from "../contexts/PatientContext";
import { useFormik } from 'formik';
import * as yup from 'yup';
import {Button, TextField, Grid, MenuItem} from '@material-ui/core';
import { INewValuesPatient, IPatient } from "../interfaces/IPatient";
import { extractDateFromDateTime } from "../util/date";
import { mergeEditedValues } from "../util/PatientUtil";

interface IPropsPatientInfo {
    patient: IPatient;
    editEnable: boolean;
    handleEditedPatient: () => void;
}

const validationSchema = yup.object({
    firstName: yup
        .string()
        .required('O nome é obrigatório'),
    lastName: yup
        .string()
        .required('O sobrenome é obrigatório'),
    email: yup
        .string()
        .email('Insira um email válido')
        .required('O email é obrigatório'),
    gender: yup
        .string()
        .required('O gênero é obrigatório'),
    birth: yup
        .date()
        .required('A data de nascimento é obrigatória'),
    cell: yup
        .string()
        .required('O telefone é obrigatório'),
    nat: yup
        .string()
        .required('A nacionalidade é obrigatória'),
    street: yup
        .string()
        .required('O logradouro é obrigatório'),
    city: yup
        .string()
        .required('A cidade é obrigatória'),
    state: yup
        .string()
        .required('O Estado é obrigatório'),
    postcode: yup
        .string()
        .required('O código postal é obrigatório')
});

const PatientInfo: React.FC<IPropsPatientInfo> = ({ patient, editEnable, handleEditedPatient }) => {
    const { editPatient } = useContext(PatientContext);

    const handleEditPatient = async (values: INewValuesPatient) => {
        await editPatient(mergeEditedValues(patient, values));
        handleEditedPatient();
    }

    const formik = useFormik({
        initialValues: {
            firstName: patient.name.first,
            lastName: patient.name.last,
            email: patient.email,
            gender: patient.gender,
            birth: patient.dob.date,
            cell: patient.cell,
            nat: patient.nat,
            street: patient.location.street,
            city: patient.location.city,
            state: patient.location.state,
            postcode: patient.location.postcode,
            idName: patient.id.name,
            idValue: patient.id.value
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleEditPatient(values);
        },
    });

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            disabled={!editEnable}
                            id="firstName"
                            name="firstName"
                            label="Nome"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            helperText={formik.touched.firstName && formik.errors.firstName}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            disabled={!editEnable}
                            id="lastName"
                            name="lastName"
                            label="Sobrenome"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            helperText={formik.touched.lastName && formik.errors.lastName}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <TextField
                            fullWidth
                            disabled={!editEnable}
                            id="email"
                            name="email"
                            label="Email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            disabled={!editEnable}
                            id="cell"
                            name="cell"
                            label="Telefone"
                            value={formik.values.cell}
                            onChange={formik.handleChange}
                            error={formik.touched.cell && Boolean(formik.errors.cell)}
                            helperText={formik.touched.cell && formik.errors.cell}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            disabled={!editEnable}
                            select
                            id="gender"
                            name="gender"
                            label="Gênero"
                            value={formik.values.gender}
                            onChange={formik.handleChange}
                            error={formik.touched.gender && Boolean(formik.errors.gender)}
                            helperText={formik.touched.gender && formik.errors.gender}
                        >
                            <MenuItem key="male" value="male">
                                Masculino
                        </MenuItem>
                            <MenuItem key="female" value="female">
                                Feminino
                        </MenuItem>
                            <MenuItem key="other" value="other">
                                Outro
                        </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <TextField
                            fullWidth
                            disabled={!editEnable}
                            id="birth"
                            name="birth"
                            label="Data Nascimento"
                            type="date"
                            defaultValue={extractDateFromDateTime(formik.values.birth)}
                            error={formik.touched.birth && Boolean(formik.errors.birth)}
                            helperText={formik.touched.birth && formik.errors.birth}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            fullWidth
                            disabled={!editEnable}
                            id="nat"
                            name="nat"
                            label="Nacionalidade"
                            value={formik.values.nat}
                            onChange={formik.handleChange}
                            error={formik.touched.nat && Boolean(formik.errors.nat)}
                            helperText={formik.touched.nat && formik.errors.nat}
                        />
                    </Grid>
                    <Grid item xs={12} sm={7}>
                        <TextField
                            fullWidth
                            disabled={!editEnable}
                            id="street"
                            name="street"
                            label="Logradouro"
                            value={formik.values.street}
                            onChange={formik.handleChange}
                            error={formik.touched.street && Boolean(formik.errors.street)}
                            helperText={formik.touched.street && formik.errors.street}
                        />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <TextField
                            fullWidth
                            disabled={!editEnable}
                            id="postcode"
                            name="postcode"
                            label="Codigo Postal"
                            value={formik.values.postcode}
                            onChange={formik.handleChange}
                            error={formik.touched.postcode && Boolean(formik.errors.postcode)}
                            helperText={formik.touched.postcode && formik.errors.postcode}
                        />
                    </Grid>
                    <Grid item xs={12} sm={7}>
                        <TextField
                            fullWidth
                            disabled={!editEnable}
                            id="city"
                            name="city"
                            label="Cidade"
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            error={formik.touched.city && Boolean(formik.errors.city)}
                            helperText={formik.touched.city && formik.errors.city}
                        />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <TextField
                            fullWidth
                            disabled={!editEnable}
                            id="state"
                            name="state"
                            label="Estado"
                            value={formik.values.state}
                            onChange={formik.handleChange}
                            error={formik.touched.state && Boolean(formik.errors.state)}
                            helperText={formik.touched.state && formik.errors.state}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            disabled={!editEnable}
                            id="idName"
                            name="idName"
                            label="Tipo Identificador"
                            value={formik.values.idName}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <TextField
                            fullWidth
                            disabled={!editEnable}
                            id="idValue"
                            name="idValue"
                            label="Codigo Identificador"
                            value={formik.values.idValue}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        {editEnable && <Button color="primary" variant="contained" type="submit" fullWidth>
                            Salvar Alterações
                </Button>}
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default PatientInfo;