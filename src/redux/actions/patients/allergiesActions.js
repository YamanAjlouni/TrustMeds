import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axiosInstance';
import { CreateMyAllergyAPI, DeleteMyAllergyAPI, GetAllAllergiesAPI, GetMyAllergiesAPI, UpdateMyAllergyAPI } from '../../apis/patientEndpoints';

export const GetALLAllergiesAction = createAsyncThunk('allergies/fetchAll', async (_, thunkAPI) => {
    try {
        const res = await axiosInstance.get(GetAllAllergiesAPI);
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue('Failed to fetch all allergies');
    }
});

export const GetMyAllergiesAction = createAsyncThunk('allergies/fetchMine', async (_, thunkAPI) => {
    try {
        const res = await axiosInstance.get(GetMyAllergiesAPI);
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue('Failed to fetch my allergies');
    }
});

export const CreateMyAllergyAction = createAsyncThunk('allergies/create', async (allergyData, thunkAPI) => {
    try {
        const res = await axiosInstance.post(CreateMyAllergyAPI, allergyData);
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue('Failed to create allergy');
    }
});

export const UpdateMyAllergyAction = createAsyncThunk('allergies/update', async ({ id, data }, thunkAPI) => {
    try {
        const res = await axiosInstance.put(UpdateMyAllergyAPI(id), data);
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue('Failed to update allergy');
    }
});

export const DeleteMyAllergyAction = createAsyncThunk('allergies/delete', async (id, thunkAPI) => {
    try {
        await axiosInstance.delete(DeleteMyAllergyAPI(id));
        return id;
    } catch (err) {
        return thunkAPI.rejectWithValue('Failed to delete allergy');
    }
});