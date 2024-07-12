import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { useSpring, animated } from '@react-spring/web';
import { cloneElement, forwardRef } from 'react';
import { ToastContainer } from 'react-toastify';
import { product } from '@service';
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
  p: 2,
};

export default function Index({ open, handleClose, data }) {
  const handleChange = async (e) => {
    const file = new FormData();
    file.append("file", e.target.files[0])
    try {
      const response = await product.upload(data, file);
      if (response.status === 200) {
        Notification({ title: "File uploaded", type: 'success' });
        setTimeout(() => {
          window.location.reload()
        }, 500);
      }
    } catch (error) {
      console.log(error);
      Notification({ title: "error", type: 'error' });
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
              <Typography id="spring-modal-title" variant="h5" sx={{ marginBottom: "15px", textAlign: "center" }} component="h2">
                Upload file
              </Typography>
              <div className='w-full flex justify-center'>
                <input type='file' onChange={handleChange} />
              </div>
            </Box>
          </Fade>
        </Modal>
      </div>
    </>
  );
}

Index.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
