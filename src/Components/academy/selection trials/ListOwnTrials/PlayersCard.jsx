import React, { useState } from 'react';
import {
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Select,
  MenuItem,
  Box,
  Typography,
  TablePagination,
  Paper,
} from '@mui/material';
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import { usePlayersInTrial } from '../../Custom Hooks/usePlayersInTrial';
import Skelton_profile from '../../../../Pages/Skelton_profile';
import userApi from '../../../../api/axiosconfig';
import { useQueryClient } from 'react-query';
import PlayerDetailsModal from './PlayerDetailsModal';

const PlayersCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { data: playerlist, isLoading, isError } = usePlayersInTrial(id);
  const queryClient = useQueryClient();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleStatusChange = async (playerId, newStatus) => {
    try {
      console.log(playerId, newStatus);
      const  res = await userApi.patch(`player_trial/${playerId}`, { status: newStatus });
      console.log(res);
      queryClient.invalidateQueries('playerlist');
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleViewDetails = (player) => {
    setSelectedPlayer(player);
  };

  const handleCloseModal = () => {
    setSelectedPlayer(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (isLoading) return <Skelton_profile />;
  if (isError) return <Navigate to={'/academy/home'} />;

  const filteredPlayers = playerlist?.filter(player =>
    player.unique_id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box mt={4} mx={2}>
      <Typography variant="h6" gutterBottom>Registered Players</Typography>
      <TextField
        label="Search Players"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <Paper>
        <Box sx={{ overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>View</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPlayers
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((player) => (
                  <TableRow key={player.id}>
                    <TableCell>{player.unique_id}</TableCell>
                    <TableCell>
                      <Button
                        variant="text"
                        color="primary"
                        onClick={() => navigate(`/profile/${player.player}`)}
                      >
                        {player.name}
                      </Button>
                    </TableCell>
                    <TableCell>{player.email}</TableCell>
                    <TableCell>
                      {player.status === 'registered' ? (
                        <Select
                          value={player.status}
                          onChange={(e) =>
                            handleStatusChange(player.id, e.target.value)
                          }
                        >
                          <MenuItem value="registered">Registered</MenuItem>
                          <MenuItem value="selected">Select ✅</MenuItem>
                          <MenuItem value="rejected">Reject ❌</MenuItem>
                        </Select>
                      ) : (
                        <MenuItem
                          value={player.status}
                          sx={{
                            textTransform: 'capitalize',
                            cursor: 'auto',
                            color:
                              player.status === 'selected' ? 'forestgreen' : 'red',
                          }}
                        >
                          {player.status}
                        </MenuItem>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="text"
                        color="primary"
                        onClick={() => handleViewDetails(player)}
                      >
                        View details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
        <TablePagination
          sx={{overflow:'clip'}}
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={filteredPlayers?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <PlayerDetailsModal
        selectedPlayer={selectedPlayer}
        handleCloseModal={handleCloseModal}
      />
    </Box>
  );
};

export default PlayersCard;
