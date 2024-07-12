import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { Button, TextField, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import PropTypes from 'prop-types';
import { useSpring, animated } from '@react-spring/web';
import { cloneElement, forwardRef, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { product, category } from '@service';
import { ProductValidationSchema } from '@validation';
import Notification from "@notification";

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
  width: 470,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Index({ open, handleClose }) {
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const response = await category.get({ page: 1, limit: 10 });
      if (response.status === 200 && response?.data?.categories) {
        setData(response?.data?.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const handleSubmit = async (values) => {
    try {
      const newSize = values.size.split(/\s+/).filter((soz) => soz !== '');
      const newColor = values.color.split(/\s+/).filter((soz) => soz !== '');
      const newValue = { ...values, color: newColor, size: newSize }
      const response = await product.create(newValue);
      if (response.status === 201) {
        setTimeout(() => {
          window.location.reload();
        }, 500);
        Notification({ title: "Product added", type: 'success' });
      }
    } catch (error) {
      console.log(error);
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
                Create Product
              </Typography>
              <Formik
                initialValues={{
                  age_max: "",
                  count: "",
                  age_min: "",
                  discount: "",
                  category_id: "",
                  made_in: "",
                  color: "",
                  for_gender: "",
                  cost: "",
                  size: "",
                  product_name: "",
                  description: "",
                }}
                validationSchema={ProductValidationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, setFieldValue }) => (
                  <Form className='flex flex-wrap justify-between gap-2'>
                    <Field
                      as={TextField}
                      label="Max age"
                      variant="outlined"
                      type="number"
                      name="age_max"
                    />
                    <ErrorMessage name="age_max" component="div" className="text-red-600" />
                    <Field
                      as={TextField}
                      label="Count"
                      variant="outlined"
                      type="number"
                      name="count"
                    />
                    <ErrorMessage name="count" component="div" className="text-red-600" />
                    <Field
                      as={TextField}
                      label="Min age"
                      variant="outlined"
                      type="number"
                      name="age_min"
                    />
                    <ErrorMessage name="age_min" component="div" className="text-red-600" />
                    <Field
                      as={TextField}
                      label="Discount"
                      variant="outlined"
                      type="number"
                      name="discount"
                    />
                    <ErrorMessage name="discount" component="div" className="text-red-600" />
                    <FormControl variant="outlined" sx={{ width: "48%" }}>
                      <InputLabel>Category Id</InputLabel>
                      <Field
                        name="category_id"
                        type="text"
                        as={Select}
                        label="Category Id"
                        onChange={(e) => setFieldValue("category_id", e.target.value)}
                      >
                        {data.map((category, index) => (
                          <MenuItem key={index} value={category.category_id}>{category.category_name}</MenuItem>
                        ))}
                      </Field>
                      <ErrorMessage name="category_id" component="div" className="text-red-600" />
                    </FormControl>
                    <FormControl variant="outlined" sx={{ width: "48%" }}>
                      <InputLabel>Country</InputLabel>
                      <Field
                        name="made_in"
                        type="text"
                        as={Select}
                        label="Country"
                      >
                        <MenuItem value={"Uzbekistan"}>Uzbekistan</MenuItem>
                        <MenuItem value={"China"}>China</MenuItem>
                        <MenuItem value={"Turkey"}>Turkey</MenuItem>
                      </Field>
                      <ErrorMessage name="service_id" component="div" className="text-red-600" />
                    </FormControl>
                    <Field
                      as={TextField}
                      label="Color"
                      variant="outlined"
                      type="text"
                      name="color"
                    />
                    <ErrorMessage name="color" component="div" className="text-red-600" />
                    <FormControl variant="outlined" sx={{ width: "48%" }}>
                      <InputLabel>Gender</InputLabel>
                      <Field
                        name="for_gender"
                        type="text"
                        as={Select}
                        label="Gender"
                      >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                      </Field>
                      <ErrorMessage name="for_gender" component="div" className="text-red-600" />
                    </FormControl>
                    <Field
                      as={TextField}
                      label="Cost"
                      type="number"
                      variant="outlined"
                      name="cost"
                    />
                    <ErrorMessage name="cost" component="div" className="text-red-600" />
                    <Field
                      as={TextField}
                      label="Size"
                      type="text"
                      variant="outlined"
                      name="size"
                    />
                    <ErrorMessage name="size" component="div" className="text-red-600" />
                    <Field
                      as={TextField}
                      fullWidth
                      label="Product name"
                      type="text"
                      variant="outlined"
                      name="product_name"
                    />
                    <ErrorMessage name="product_name" component="div" className="text-red-600" />
                    <Field
                      as={TextField}
                      fullWidth
                      label="Description"
                      type="text"
                      variant="outlined"
                      name="description"
                    />
                    <ErrorMessage name="description" component="div" className="text-red-600" />

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
