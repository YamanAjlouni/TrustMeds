import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axiosInstance';
import {
    GetMyMedicationsAPI,
    DeleteMyMedicationAPI
} from '../../apis/patientEndpoints';

export const GetMyMedicationsAction = createAsyncThunk(
    'medications/fetchMine',
    async (_, thunkAPI) => {
        try {
            const res = await axiosInstance.get(GetMyMedicationsAPI);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch medications');
        }
    }
);

export const DeleteMyMedicationAction = createAsyncThunk(
    'medications/delete',
    async (id, thunkAPI) => {
        try {
            await axiosInstance.delete(DeleteMyMedicationAPI(id));
            return id;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to delete medication');
        }
    }
);