import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from "../../shared/axios"
import urls from "../../shared/urls"

export function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    margin: 4,
    '&$error': {
      color: 'red'
    }
  },
  error: {}
}));


const initialState = {
  first_name: {
    value: "",
    errors: [],
    required: true
  },
  
  last_name: {
    value: "",
    errors: [],
    required: true
  },
  email: {
    value: "",
    errors: [],
    required: true
  },
  password: {
    value: "",
    errors: [],
    required: true
  },
  
}

export default function SignUp() {
  const classes = useStyles();

  const [formFields, setFormFields] = useState(initialState)

  

  const signUp = e => {
    e.preventDefault()
   console.log("f_len",formFields.first_name.errors.length)
    if (hasErrors()) {
      return
    }
  

    axios
      .post(urls.authentication.signUp, {
        first_name: formFields.first_name.value,
        last_name: formFields.last_name.value,
        email: formFields.email.value,
        password: formFields.password.value,
      })
      .then(response => {
        console.log("response",response)
      alert("signup")
        //toast.success("Signed Up Successfully!")
        //props.history.push("/login")
      })
      .catch(error => {
        console.log("error check",error.response.data)

        alert(error.response.data.errors.email[0])
        // const errors = error.response.data.errors

        // if (errors.password1) {
        //   setErrors("password", errors.password1)
        // }
       
        // if (errors.email) {
        //   setErrors("email", errors.email)
        // }
        // if (errors.first_name) {
        //   setErrors("first_name", errors.first_name)
        // }
        // if (errors.last_name) {
        //   setErrors("last_name", errors.last_name)
        // }

      })
  }




  const setValue = (name, value) => {
    console.log("check value")
    formFields[name] = {
      ...formFields[name],
      errors: [],
      value
    }
    setFormFields({ ...formFields })
  }

  const setErrors = (name, errors) => {
    if (typeof errors === "string") {
      errors = [errors]
    }
    formFields[name] = {
      ...formFields[name],
      errors: [...errors]
    }
    setFormFields({ ...formFields })
  }

  
  const hasErrors = () => {
    console.log("in has error")
    let hasError = false

    for (const key in formFields) {
      if (formFields[key].required && !formFields[key].value) {
        formFields[key] = {
          ...formFields[key],
          errors: ["This field is required"]
        }
        setFormFields({ ...formFields })
        hasError = true
      }
    }
    return hasError
  }







 




  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="first_name"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={e => setValue(e.target.name, e.target.value)}
                helperText={formFields.first_name.errors}
                error ={formFields.first_name.errors.length>0}              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="last_name"
                label="Last Name"
                name="last_name"
                autoComplete="lname"
                onChange={e => setValue(e.target.name, e.target.value)}
                helperText={formFields.last_name.errors}
                error ={formFields.last_name.errors.length>0}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={e => setValue(e.target.name, e.target.value)}
                helperText={formFields.email.errors}
                error ={formFields.email.errors.length>0}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={e => setValue(e.target.name, e.target.value)}
                helperText={formFields.password.errors}
                error ={formFields.password.errors.length>0}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={signUp}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}