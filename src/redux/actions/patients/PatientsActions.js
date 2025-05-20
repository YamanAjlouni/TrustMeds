import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    GetMyProfileAPI,
    GetMyEmergencyContactAPI,
    CreateMyEmergencyContactAPI,
    UpdateMyEmergencyContactAPI,
    DeleteMyEmergencyContactAPI
} from '../../Api';

export const fetchMyProfile = createAsyncThunk("profile/fetchMyProfile", async (_, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.get(GetMyProfileAPI);
        return data;
    } catch (error) {
        if (error.response) return rejectWithValue(error.response.data.message);
        return rejectWithValue(errorMessage);
    }
});

export const fetchMyEmergencyContact = createAsyncThunk("profile/fetchMyEmergencyContact", async (_, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.get(GetMyEmergencyContactAPI);
        return data;
    } catch (error) {
        if (error.response) return rejectWithValue(error.response.data.message);
        return rejectWithValue(errorMessage);
    }
});

export const createMyEmergencyContact = createAsyncThunk("profile/createMyEmergencyContact", async (contactData, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.post(CreateMyEmergencyContactAPI, contactData);
        return data;
    } catch (error) {
        if (error.response) return rejectWithValue(error.response.data.message);
        return rejectWithValue(errorMessage);
    }
});

export const updateMyEmergencyContact = createAsyncThunk("profile/updateMyEmergencyContact", async ({ id, contactData }, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.put(UpdateMyEmergencyContactAPI(id), contactData);
        return data;
    } catch (error) {
        if (error.response) return rejectWithValue(error.response.data.message);
        return rejectWithValue(errorMessage);
    }
});

export const deleteMyEmergencyContact = createAsyncThunk("profile/deleteMyEmergencyContact", async (id, { rejectWithValue }) => {
    try {
        await axiosInstance.delete(DeleteMyEmergencyContactAPI(id));
        return id;
    } catch (error) {
        if (error.response) return rejectWithValue(error.response.data.message);
        return rejectWithValue(errorMessage);
    }
});
