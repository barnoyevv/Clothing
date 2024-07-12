import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { Button, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useSpring, animated } from '@react-spring/web';
import { ToastContainer } from 'react-toastify';
import { cloneElement, forwardRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { category } from '@service';
import { CategoryValidationSchema } from '@validation';
import Notification from "@notification"

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
	const handleSubmit = async (values) => {
		try {
			if (!item || !item.id) {
				const response = await category.create(values);
				if (response.status === 201) {
					setTimeout(() => {
						window.location.reload();
					}, 500);
					Notification({ title: "Category added", type: 'success' });
				}
			} else {
				const update_payload = {
					...values,
					id: item.category_id,
				};
				const response = await category.update(update_payload);
				if (response.status === 200) {
					setTimeout(() => {
						window.location.reload();
					}, 500);
					Notification({ title: "Category updated", type: 'success' });
				}
			}
		} catch (error) {
			console.log(error);
			Notification({ title: "Error", type: 'error' });
		}
	};

	return (
		<>
		<ToastContainer/>
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
								{item?.id ? "Edit Category" : "Create Category"}
							</Typography>
							<Formik
								initialValues={{
									category_name: item?.category_name ? item?.category_name : "",
								}}
								validationSchema={CategoryValidationSchema}
								onSubmit={handleSubmit}
							>
								{({ isSubmitting }) => (
									<Form className='flex flex-col gap-2'>
										<Field
											as={TextField}
											fullWidth
											label="Category name"
											variant="outlined"
											type="text"
											name="category_name"
										/>
										<ErrorMessage name="category_name" component="div" className="text-red-600" />
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
