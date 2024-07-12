import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';
import { product } from "@service";
import Notification from "@notification";
import { UploadFileModal } from "@modal";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    backgroundColor: theme.palette.common.white,
    color: theme.palette.text.primary,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function Index({ data }) {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState([])

  const deleteItem = async (product_id) => {
    try {
      const response = await product.delete(product_id);
      if (response.status === 200) {
        setTimeout(() => {
          window.location.reload();
        }, 500);
        Notification({ title: "Product deleted", type: 'success' });
      }
    } catch (error) {
      Notification({ title: "Error", type: 'error' });
    }
  };
  const uploadFile = (product_id) => {
    setId(product_id)
    setOpen(true)
  }
  return (
    <>
      <UploadFileModal data={id} open={open} handleClose={() => setOpen(false)} />
      <ToastContainer />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell align="center">Product name</StyledTableCell>
              <StyledTableCell align="center">Color</StyledTableCell>
              <StyledTableCell align="center">Size</StyledTableCell>
              <StyledTableCell align="center">Count</StyledTableCell>
              <StyledTableCell align="center">Cost</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <StyledTableRow key={item.product_id}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell align="center">{item.product_name}</StyledTableCell>
                <StyledTableCell align="center">{item.color}</StyledTableCell>
                <StyledTableCell align="center">{item.size}</StyledTableCell>
                <StyledTableCell align="center">{item.count}</StyledTableCell>
                <StyledTableCell align="center">{item.cost}</StyledTableCell>
                <StyledTableCell align="center">
                  <div className='flex justify-center'>
                    <IconButton aria-label="delete" onClick={() => deleteItem(item.product_id)}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="addPhoto" onClick={() => uploadFile(item.product_id)}>
                      <AddPhotoAlternateIcon />
                    </IconButton>
                    <IconButton aria-label="view">
                      <VisibilityIcon />
                    </IconButton>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
