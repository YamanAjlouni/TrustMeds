import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetMyProfileAPI, UpdateMyProfileApi } from "../../apis/patientEndpoints";
import axiosInstance from "../../axiosInstance";

export const GetProfileAction = createAsyncThunk("profile/get", async (info, { rejectWithValue }) => {
    try {
        let { data } = await axiosInstance.get(GetMyProfileAPI);
        return data;
    } catch (error) {
        console.error("❌ API Error:", error);
        console.error("Error details:", {
            message: error.message,
            response: error.response,
            request: error.request
        });

        if (error.response) {
            const validationMessage = error.response.data.message;
            return rejectWithValue(validationMessage);
        } else {
            return rejectWithValue("Network error occurred");
        }
    }
});

export const UpdateMyProfileAction = createAsyncThunk("profile/update", async (profileData, { rejectWithValue }) => {
    try {
        let { data } = await axiosInstance.patch(UpdateMyProfileApi, profileData);
        return data;
    } catch (error) {
        console.error("❌ API Error:", error);
        console.error("Error details:", {
            message: error.message,
            response: error.response,
            request: error.request
        });

        if (error.response) {
            const validationMessage = error.response.data.message || "Update failed";
            return rejectWithValue(validationMessage);
        } else {
            return rejectWithValue("Network error occurred");
        }
    }
});