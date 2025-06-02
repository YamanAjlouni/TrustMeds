import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axiosInstance';
import {
    GetMyAppointmentsAPI,
} from '../../apis/patientEndpoints';

export const GetMyAppointmentsAction = createAsyncThunk(
    'appointments/fetchMine',
    async (_, thunkAPI) => {
        try {
            const res = await axiosInstance.get(GetMyAppointmentsAPI);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch appointments');
        }
    }
);
