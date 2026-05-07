import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Avatar, IconButton, Tooltip, Skeleton } from "@mui/material";
import { Download, FilePresent } from "@mui/icons-material";

interface FileItem {
  id: string;
  filename: string;
  url: string;
  size: number;
  mimeType: string;
  createdAt: string;
  folderId: string;
}

export const FileList = () => {
  const { data, isLoading, error } = useQuery<FileItem[]>({
    queryKey: ["files"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:3333/files");
      return data.files;
    },
  });

  if (isLoading) return <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 4 }} />;
  if (error) return <Typography color="error">Erro ao carregar arquivos.</Typography>;
  if (!data || data.length === 0) return <Typography align="center" sx={{ mt: 4 }}>Nenhum arquivo encontrado.</Typography>;

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 4, boxShadow: 3 }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow sx={{ bgcolor: "primary.main" }}>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Preview</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Arquivo</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Tamanho</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Data</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }} align="center">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((file) => (
            <TableRow key={file.id} hover>
              <TableCell>
                {file.mimeType.startsWith("image/") ? (
                  <Avatar src={file.url} alt={file.filename} variant="rounded" sx={{ width: 40, height: 40 }} />
                ) : (
                  <Avatar sx={{ bgcolor: "grey.100" }}><FilePresent color="action" /></Avatar>
                )}
              </TableCell>
              <TableCell><Typography variant="body2">{file.filename}</Typography></TableCell>
              <TableCell>{(file.size / 1024).toFixed(2)} KB</TableCell>
              <TableCell>{new Date(file.createdAt).toLocaleDateString()}</TableCell>
              <TableCell align="center">
                <Tooltip title="Baixar">
                  <IconButton color="primary" onClick={() => window.open(file.url, "_blank")}><Download /></IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
