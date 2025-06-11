import { createAsyncThunk } from '@reduxjs/toolkit';
import { CreateProfileApi, GetMyProfileAPI, UpdateMyProfileApi } from '../../apis/patientEndpoints';
import axiosInstance from '../../axiosInstance';

export const GetProfileAction = createAsyncThunk(
    'profile/getProfile',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(GetMyProfileAPI);
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.detail ||
                error.response?.data?.message ||
                error.message ||
                'Failed to fetch profile';
            return rejectWithValue(errorMessage);
        }
    }
);

// Create Profile Action (for new patients)
export const CreateProfileAction = createAsyncThunk(
    'profile/createProfile',
    async (profileData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(CreateProfileApi, profileData);
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.detail ||
                error.response?.data?.message ||
                error.message ||
                'Failed to create profile';
            return rejectWithValue(errorMessage);
        }
    }
);

export const UpdateMyProfileAction = createAsyncThunk(
    'profile/updateProfile',
    async (profileData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(UpdateMyProfileApi, profileData);
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.detail ||
                error.response?.data?.message ||
                error.message ||
                'Failed to update profile';
            return rejectWithValue(errorMessage);
        }
    }
);