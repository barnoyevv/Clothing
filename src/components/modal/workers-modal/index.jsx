import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button, TextField, MenuItem } from '@mui/material';
import PropTypes from 'prop-types';
import { useSpring, animated } from '@react-spring/web';
import { cloneElement, forwardRef, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { workers } from '@service';
import Notification from "@notification";
import { WorkersValidationSchema } from '@validation';

const Fade = forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Index({ open, handleClose, item }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values) => {
    try {
      if (!item || !item.id) {
        const response = await workers.create(values);
        if (response.status === 201) {
          setTimeout(() => {
            window.location.reload();
          }, 500);
          Notification({ title: "Worker added", type: 'success' });
        }
      } else {
        const update_payload = {
          ...values,
          id: item.id,
          email: item.email
        };
        const response = await workers.update(update_payload);
        if (response.status === 200) {
          setTimeout(() => {
            window.location.reload();
          }, 500);
          Notification({ title: "Worker updated", type: 'success' });
        }
      }
    } catch (error) {
      Notification({ title: "Error", type: 'error' });
    }
  };

  return (
    <>
      <ToastContainer />
      <div>
        <Modal
          aria-labelledby="spring-modal-title"
          aria-describedby="spring-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              TransitionComponent: Fade,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={modalStyle}>
              <Typography id="spring-modal-title" variant="h5" sx={{ marginY: "10px", textAlign: "center" }} component="h2">
                {item?.id ? "Edit Worker" : "Create Worker"}
              </Typography>
              <Formik
                initialValues={{
                  email: item?.email ? item?.email : "",
                  age: item?.age ? item?.age : "",
                  first_name: item?.first_name ? item?.first_name : "",
                  last_name: item?.last_name ? item?.last_name : "",
                  phone_number: item?.phone_number ? item?.phone_number : "",
                  password: "",
                  gender: item?.gender ? item?.gender : "",
                }}
                validationSchema={WorkersValidationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className='flex flex-col gap-2'>
                    <Field
                      as={TextField}
                      fullWidth
                      label="Email"
                      variant="outlined"
                      type="text"
                      name="email"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-600" />
                    <Field
                      as={TextField}
                      fullWidth
                      label="Age"
                      variant="outlined"
                      type="number"
                      name="age"
                    />
                    <ErrorMessage name="age" component="div" className="text-red-600" />
                    <Field
                      as={TextField}
                      fullWidth
                      label="First name"
                      variant="outlined"
                      type="text"
                      name="first_name"
                    />
                    <ErrorMessage name="first_name" component="div" className="text-red-600" />
                    <Field
                      as={TextField}
                      fullWidth
                      label="Last name"
                      variant="outlined"
                      type="text"
                      name="last_name"
                    />
                    <ErrorMessage name="last_name" component="div" className="text-red-600" />
                    <Field
                      as={TextField}
                      fullWidth
                      label="Phone Number"
                      variant="outlined"
                      type="text"
                      name="phone_number"
                    />
                    <ErrorMessage name="phone_number" component="div" className="text-red-600" />
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

                    <Field
                      as={TextField}
                      select
                      fullWidth
                      label="Gender"
                      variant="outlined"
                      name="gender"
                    >
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                    </Field>
                    <ErrorMessage name="gender" component="div" className="text-red-600" />

                    <Button
                      variant="contained"
                      disableElevation
                      type="submit"
                      fullWidth
                      disabled={isSubmitting}
                    >
                      Save
                    </Button>
                  </Form>
                )}
              </Formik>
            </Box>
          </Fade>
        </Modal>
      </div>
    </>
  );
}
