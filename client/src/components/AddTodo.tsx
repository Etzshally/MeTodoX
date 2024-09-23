import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface AddTodoProps {
    handleAddTodo: (data: string) => void
}

const AddTodo: React.FC<AddTodoProps> = ({ handleAddTodo }) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div className='w-full flex flex-col justify-center items-end'>
                <Button sx={{ marginTop: "20px", marginBottom: "20px" }} color='success' variant="contained" onClick={handleClickOpen}>
                    Add Todo
                </Button>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries((formData as any).entries());
                        const data = formJson.data;
                        handleAddTodo(data)
                        handleClose();
                    },
                }}
            >
                <DialogTitle>Add Todo</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Add todo content in the field below.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="data"
                        label="Enter Todo"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default AddTodo