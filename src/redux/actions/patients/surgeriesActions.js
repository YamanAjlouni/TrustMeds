import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axiosInstance';
import {
    GetMySurgeriesAPI,
    CreateMySurgeryAPI,
    UpdateMySurgeryAPI,
    DeleteMySurgeryAPI
} from '../../apis/patientEndpoints';

export const GetMySurgeriesAction = createAsyncThunk(
    'surgeries/fetchMine',
    async (_, thunkAPI) => {
        try {
            const res = await axiosInstance.get(GetMySurgeriesAPI);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch surgeries');
        }
    }
);

export const CreateMySurgeryAction = createAsyncThunk(
    'surgeries/create',
    async (surgeryData, thunkAPI) => {
        try {
            const res = await axiosInstance.post(CreateMySurgeryAPI, surgeryData);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to create surgery');
        }
    }
);

export const UpdateMySurgeryAction = createAsyncThunk(
    'surgeries/update',
    async ({ id, data }, thunkAPI) => {
        try {
            const res = await axiosInstance.put(UpdateMySurgeryAPI(id), data);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to update surgery');
        }
    }
);

export const DeleteMySurgeryAction = createAsyncThunk(
    'surgeries/delete',
    async (id, thunkAPI) => {
        try {
            await axiosInstance.delete(DeleteMySurgeryAPI(id));
            return id;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to delete surgery');
        }
    }
);