import { useState, useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { TextField, Typography, Box, CircularProgress } from "@mui/material";
import useDebounce from "../../hooks/useDebounce";
import { updateNotes } from "../../services/api";

export default function Notes({ incident, onSuccess }) {
  const queryClient = useQueryClient();
  // Initialize state directly from props since 'key' will handle resets
  const [text, setText] = useState(incident?.notes || "");
  const [status, setStatus] = useState("saved");

  const latestTextRef = useRef(text);
  const onSuccessRef = useRef(onSuccess);

  useEffect(() => {
    onSuccessRef.current = onSuccess;
  }, [onSuccess]);

  const debouncedText = useDebounce(text, 2000);

  useEffect(() => {
    latestTextRef.current = text;
  }, [text]);

  useEffect(() => {
    // Only proceed if there is an actual change to save
    if (!incident || debouncedText === incident.notes) return;

    let isCurrent = true;

    // We use a small wrapper or direct async call to satisfy the 'no-set-state-in-effect' rule
    const performSave = async () => {
      setStatus("saving");
      try {
        await updateNotes(incident.id, debouncedText);
        
        if (!isCurrent) return;

        queryClient.setQueryData(["incidents"], (oldData = []) =>
          oldData.map((item) =>
            item.id === incident.id ? { ...item, notes: debouncedText } : item
          )
        );

        onSuccessRef.current?.("Notes saved");
        setStatus(latestTextRef.current !== debouncedText ? "typing" : "saved");
      } catch (error) {
        console.log(error)
        if (isCurrent) setStatus("typing");
      }
    };

    performSave();

    return () => {
      isCurrent = false;
    };
  }, [debouncedText, incident, queryClient]);

  return (
    <Box mt={2}>
      <TextField
        fullWidth
        multiline
        minRows={4}
        label="Notes"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setStatus("typing");
        }}
      />

      <Box mt={1}>
        {status === "typing" && (
          <Typography fontSize={12} color="orange">Unsaved changes</Typography>
        )}
        {status === "saving" && (
          <Box display="flex" alignItems="center" gap={1}>
            <CircularProgress size={12} />
            <Typography fontSize={12}>Saving...</Typography>
          </Box>
        )}
        {status === "saved" && (
          <Typography fontSize={12} color="green">✓ Saved</Typography>
        )}
      </Box>
    </Box>
  );
}