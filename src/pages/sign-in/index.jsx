import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { auth } from '@service'
import Notification from "@notification"
import { SignInValidationSchema } from "@validation"

const Index = () => {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate();

  const moveRegister = () => {
    alert("In progress...")
  }

  const moveForgotPassword = () => {
    alert("In progress...")
  }
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await auth.sign_in(values);
      console.log(response);
      if (response.status === 200) {
        localStorage.setItem("access_token", response?.data?.access_token);
        localStorage.setItem("refresh_token", response?.data?.refresh_token)
        Notification({ title: "Success", type: 'success' })
        setTimeout(() => {
          navigate("/main");
        }, 2000);
      }
    } catch (error) {
      Notification({ title: "Error", type: 'error' })
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-full sm:w-[600px] p-5">
          <h1 className='text-center my-4 text-[50px]'>Sign In</h1>
          <Formik
            initialValues={{
              email: 'xasannosirov094@gmail.com',
              password: 'Sehtols@01'
            }}
            validationSchema={SignInValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className='flex flex-col gap-2'>
                <Field
                  as={TextField}
                  fullWidth
                  label="Email"
                  variant="outlined"
                  type="email"
                  name="email"
                />
                <ErrorMessage name="email" component="div" className="text-red-600" />
                <Field
                  as={TextField}
                  fullWidth
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  variant="outlined"
                  name="password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <ErrorMessage name="password" component="div" className="text-red-600" />
                <div className='flex align-center justify-end'>
                  <p className="cursor-pointer text-blue-600" onClick={moveForgotPassword}>Forgot Password?</p>
                </div>
                <Button
                  variant="contained"
                  disableElevation
                  type="submit"
                  fullWidth
                  disabled={isSubmitting}
                  sx={{ borderRadius: "10px", padding: "10px" }}
                >
                  Sign In
                </Button>
                <div className="w-full flex items-center gap-1 justify-center">
                  <p>Don't have an account?</p>
                  <p className="cursor-pointer text-blue-600 text-center" onClick={moveRegister}>Register here</p>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Index;
