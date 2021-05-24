import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography, Container, IconButton} from '@material-ui/core';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PatientList from './components/PatientList';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      marginLeft: 10
    },
  }),
);

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="sticky" color="default">
        <Toolbar>
          <LocalHospitalIcon fontSize="large" color="primary" />
          <Typography variant="h6" className={classes.title}>
            Pharma Inc
          </Typography>
          <IconButton color="primary">
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <main>
        <Container maxWidth="md">
          <PatientList />
        </Container>
      </main>
    </div>
  );
}

export default App;
