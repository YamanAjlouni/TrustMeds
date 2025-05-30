import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axiosInstance';
import {
    GetMyChronicDiseasesAPI,
    CreateMyChronicDiseaseAPI,
    UpdateMyChronicDiseaseAPI,
    DeleteMyChronicDiseaseAPI
} from '../../apis/patientEndpoints';

export const GetMyChronicDiseasesAction = createAsyncThunk(
    'chronicDiseases/fetchMine',
    async (_, thunkAPI) => {
        try {
            const res = await axiosInstance.get(GetMyChronicDiseasesAPI);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch chronic diseases');
        }
    }
);

export const CreateMyChronicDiseaseAction = createAsyncThunk(
    'chronicDiseases/create',
    async (diseaseData, thunkAPI) => {
        try {
            const res = await axiosInstance.post(CreateMyChronicDiseaseAPI, diseaseData);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to create chronic disease');
        }
    }
);

export const UpdateMyChronicDiseaseAction = createAsyncThunk(
    'chronicDiseases/update',
    async ({ id, data }, thunkAPI) => {
        try {
            const res = await axiosInstance.put(UpdateMyChronicDiseaseAPI(id), data);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to update chronic disease');
        }
    }
);

export const DeleteMyChronicDiseaseAction = createAsyncThunk(
    'chronicDiseases/delete',
    async (id, thunkAPI) => {
        try {
            await axiosInstance.delete(DeleteMyChronicDiseaseAPI(id));
            return id;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to delete chronic disease');
        }
    }
);