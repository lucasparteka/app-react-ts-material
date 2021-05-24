import React, { useContext, useState } from 'react';
import { PatientContext } from "../contexts/PatientContext";
import { makeStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
    Button, 
    Table, 
    TableContainer, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableRow, 
    TextField, 
    Paper,
    Dialog, 
    DialogActions, 
    DialogContent,
    DialogContentText,
    DialogTitle,
    CircularProgress,
    Radio, 
    RadioGroup,
    Snackbar,
    FormControlLabel
} from '@material-ui/core';
import { IPatient } from '../interfaces/IPatient';
import { formatBrazilianDate } from "../util/date";
import { GenderEnum, PATIENT_ACTIONS } from '../enums/Enums';
import PatientInfo from './PatientInfo';


const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
            fontSize: 16
        },
        body: {
            fontSize: 14,
        },
    }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }),
)(TableRow);

const useStyles = makeStyles((theme) => ({
    searchBox: {
        width: '100%',
    },
    radioGender: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: theme.spacing(1), 
    },
    patientContainer: {
        padding: theme.spacing(8, 0, 6)
    },
    loadMore: {
        textAlign: 'center',
        marginTop: theme.spacing(3),
        position: 'relative',

    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    actionButtons: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    wrapperPicture: {
        display: 'flex',
        justifyContent: 'center',
        left: '50%',
        right: '50%',
        background: '#dae9f7'
    },
    picturePatient: {
        borderRadius: '50%',
        padding: theme.spacing(1)
    }

}));

export default function PatientList() {
    const classes = useStyles();
    const { patientList, loadMorePatient, deletePatient } = useContext(PatientContext);
    const [loading, setLoading] = useState(false);
    const [openDialogDelete, setOpenDialogDelete] = useState(false);
    const [openDialogEdit, setOpenDialogEdit] = useState(false);
    const [editEnable, setEditEnlable] = useState(false);
    const [showSnackbarDeleted, setShowSnackbarDeleted] = useState(false);
    const [showSnackbarEdited, setShowSnackbarEdited] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState<IPatient>({} as IPatient);
    const [filterByName, setFilterByName] = useState("");
    const [filterByGender, setFilterByGender] = useState("");

    const handleLoadMorePatient = async () => {
        setLoading(true);
        await loadMorePatient();
        setLoading(false);
    }

    const renderActionButtons = (patient: IPatient) => {
        return (
            <div className={classes.actionButtons}>
                <Button color="primary" onClick={() => handlePatientAction(PATIENT_ACTIONS.EDIT, patient)}>Detalhes</Button>
                <Button color="secondary" onClick={() => handlePatientAction(PATIENT_ACTIONS.DELETE, patient)}>Excluir</Button>
            </div>
        )
    }

    const handlePatientAction = (action: PATIENT_ACTIONS, patient: IPatient) => {
        if (action === PATIENT_ACTIONS.EDIT) {
            setOpenDialogEdit(true);
        }

        if (action === PATIENT_ACTIONS.DELETE) {
            setOpenDialogDelete(true);
        }
        setSelectedPatient(patient);
    }

    const handleCancelAction = () => {
        setOpenDialogDelete(false);
        setOpenDialogEdit(false);
        setEditEnlable(false);
    }

    const handleDeletePatient = async () => {
        if (selectedPatient != null) {
            await deletePatient(selectedPatient._id);
            setOpenDialogDelete(false);
            setShowSnackbarDeleted(true);
        }
    }

    const handleEditedPatient = () => {
        setOpenDialogEdit(false);
        setShowSnackbarEdited(true);
    }

    const handleFilterByName = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setFilterByName(event.target.value)
    }

    const handleFilterByGender = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterByGender((event.target as HTMLInputElement).value);
    };

    const patientListFiltered = (): IPatient[] => {
        return patientList
            .filter((patient: IPatient) => patient.name.first.toLocaleLowerCase().includes(filterByName) || patient.name.last.toLocaleLowerCase().includes(filterByName))
            .filter((patient: IPatient) => !!filterByGender ? patient.gender === filterByGender : patient.gender.includes(""));
    }

    return (
        <div className={classes.patientContainer}>
            <TextField onChange={(event) => handleFilterByName(event)} id="outlined-basic" label="Busque Por Pacientes" variant="outlined" className={classes.searchBox} />
                <RadioGroup className={classes.radioGender} row aria-label="gender" name="gender1" value={filterByGender} onChange={handleFilterByGender}>
                    <FormControlLabel value="" control={<Radio size="small"/>} label="Todos" />
                    <FormControlLabel value="female" control={<Radio size="small"/>} label="Feminino" />
                    <FormControlLabel value="male" control={<Radio size="small"/>} label="Masculino" />
                </RadioGroup>
            <TableContainer component={Paper}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Nome</StyledTableCell>
                            <StyledTableCell>Gênero</StyledTableCell>
                            <StyledTableCell>Data Nascimento</StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {patientListFiltered().map((patient: IPatient) => (
                            <StyledTableRow key={patient.login.uuid}>
                                <StyledTableCell>{patient.name.first + ' ' + patient.name.last}</StyledTableCell>
                                <StyledTableCell>{GenderEnum[patient.gender] || "Não informado"}</StyledTableCell>
                                <StyledTableCell>{formatBrazilianDate(patient.dob.date)}</StyledTableCell>
                                <StyledTableCell align="right">{renderActionButtons(patient)}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div className={classes.loadMore}>
                <Button
                    color="secondary"
                    disabled={loading}
                    onClick={handleLoadMorePatient}
                >
                    Buscar Mais Pacientes...
                </Button>
                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>
            <Dialog
                open={openDialogDelete}
                onClose={() => setOpenDialogDelete(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Atenção"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Tem certeza que deseja deleter o usuário?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelAction} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleDeletePatient} color="primary" autoFocus>
                        Excluir
                    </Button>
                </DialogActions>
            </Dialog>

            {!!Object.keys(selectedPatient as any).length && <Dialog
                open={openDialogEdit}
                onClose={() => setOpenDialogEdit(false)}
                aria-labelledby="customized-dialog-title"
            >
                <div className={classes.wrapperPicture}>
                    <img alt="user-avatar" className={classes.picturePatient} src={selectedPatient.picture.medium} />
                </div>
                <DialogContent>
                    <PatientInfo patient={selectedPatient} editEnable={editEnable} handleEditedPatient={handleEditedPatient} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelAction} variant="outlined" color="secondary">
                        Cancelar
                    </Button>
                    <Button disabled={editEnable} onClick={() => setEditEnlable(true)} variant="outlined" color="primary">
                        Editar Usuário
                    </Button>
                </DialogActions>
            </Dialog>}
            <Snackbar
                message={"O usuário foi excluído com sucesso"}
                open={showSnackbarDeleted}
                autoHideDuration={4000}
                onClose={() => setShowSnackbarDeleted(false)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            />
            <Snackbar
                message={"O usuário foi alterado com sucesso"}
                open={showSnackbarEdited}
                autoHideDuration={4000}
                onClose={() => setShowSnackbarEdited(false)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            />
        </div>
    );
}