import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';
import { category } from "@service"
import Notification from "@notification"
import {CategoryModal} from "@modal"

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
	const [open, setOpen] = useState(false)
	const [edit, setEdit] = useState({})

	const deleteItem = async (category_id) => {
		try {
			const response = await category.delete(category_id)
			if (response.status === 200) {
				setTimeout(() => {
					window.location.reload();
				}, 500);
				Notification({ title: "Category deleted", type: 'success' });
			}
		} catch (error) {
			console.log(error);
			Notification({ title: "Error", type: 'error' });
		}
	}

	const editItem = (item) => {
		setEdit(item)
		setOpen(true)
	};

	return (
		<>
			<ToastContainer />
			<CategoryModal open={open} item={edit} handleClose={() => setOpen(false)} />
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 700 }} aria-label="customized table">
					<TableHead>
						<TableRow>
							<StyledTableCell>#</StyledTableCell>
							<StyledTableCell align="center">Category</StyledTableCell>
							<StyledTableCell align="center">Action</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map((item, index) => (
							<StyledTableRow key={item.category_id}>
								<StyledTableCell component="th" scope="row">
									{index + 1}
								</StyledTableCell>
								<StyledTableCell align="center">{item.category_name}</StyledTableCell>
								<StyledTableCell align="center">
									<div className='flex gap-2 justify-center'>
										<IconButton aria-label="edit" onClick={() => editItem(item)}>
											<EditIcon />
										</IconButton>
										<IconButton aria-label="delete" onClick={() => deleteItem(item.category_id)}>
											<DeleteIcon />
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
