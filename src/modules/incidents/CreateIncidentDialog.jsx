import { Dialog, Box, TextField, Button } from "@mui/material";
import { useState } from "react";

export default function CreateIncidentDialog({ open, onClose, onCreate }) {
    const [title, setTitle] = useState("");

    const handleSubmit = () => {
        if (!title.trim()) return;

        onCreate({ title });
        setTitle("");
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <Box p={2} width={300}>
                <h3>Create Incident</h3>

                <TextField
                    fullWidth
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button variant="contained" onClick={handleSubmit}>
                        Create
                    </Button>
                </Box>
            </Box>
        </Dialog>
    );
}