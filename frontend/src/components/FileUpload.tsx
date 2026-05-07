import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Box, Paper, Typography, Button, LinearProgress, Alert, List, ListItem, ListItemText, ListItemIcon, IconButton } from "@mui/material";
import { CloudUpload, CheckCircle, Error, Close } from "@mui/icons-material";

export const FileUpload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const queryClient = useQueryClient();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
      setError(null);
      setSuccess(false);
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setUploading(true);
    setError(null);
    setSuccess(false);

    try {
      for (const file of files) {
        // 1. Get pre-signed URL from backend
        const { data: { uploadUrl, file: fileMeta } } = await axios.post("http://localhost:3333/files", {
          filename: file.name,
          mimeType: file.type,
          size: file.size,
          folder_id: "default-folder",
        });

        // 2. Upload directly to MinIO
        await axios.put(uploadUrl, file, {
          headers: { "Content-Type": file.type },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
            setProgress((prev) => ({ ...prev, [file.name]: percentCompleted }));
          },
        });

        // 3. Confirm upload with backend
        await axios.patch(`http://localhost:3333/files/${fileMeta.id}/confirm`);
      }

      setSuccess(true);
      setFiles([]);
      setProgress({});
      queryClient.invalidateQueries({ queryKey: ["files"] });
    } catch (err) {
      setError("Falha no upload do arquivo. Verifique a conexão com o servidor.");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: "center", border: "2px dashed #ccc", borderRadius: 4 }}>
        <input accept="image/*" style={{ display: "none" }} id="file-input" type="file" multiple onChange={onFileChange} />
        <label htmlFor="file-input">
          <Button variant="contained" component="span" startIcon={<CloudUpload />} size="large" sx={{ mb: 2 }}>
            Selecionar Arquivos
          </Button>
        </label>
        <Typography color="textSecondary">
          {files.length > 0 ? `${files.length} arquivo(s) selecionado(s)` : "Arraste arquivos ou clique para selecionar"}
        </Typography>
      </Paper>

      {files.length > 0 && (
        <Paper sx={{ p: 2 }}>
          <List>
            {files.map((file) => (
              <ListItem key={file.name} secondaryAction={uploading && <LinearProgress variant="determinate" value={progress[file.name] || 0} sx={{ width: 100 }} />}>
                <ListItemIcon><CloudUpload /></ListItemIcon>
                <ListItemText primary={file.name} secondary={`${(file.size / 1024).toFixed(2)} KB`} />
              </ListItem>
            ))}
          </List>
          <Button variant="contained" color="primary" fullWidth onClick={handleUpload} disabled={uploading}>
            {uploading ? "Enviando..." : "Iniciar Upload"}
          </Button>
        </Paper>
      )}

      {success && <Alert severity="success">Upload concluído com sucesso!</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
    </Box>
  );
};
