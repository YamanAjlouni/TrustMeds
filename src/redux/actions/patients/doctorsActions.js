import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axiosInstance';
import {
    GetMyDoctorsAPI,
} from '../../apis/patientEndpoints';

export const GetMyDoctorsAction = createAsyncThunk(
    'doctors/fetchMine',
    async (_, thunkAPI) => {
        try {
            const res = await axiosInstance.get(GetMyDoctorsAPI);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch doctors');
        }
    }
);
