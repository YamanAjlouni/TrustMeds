import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    GetMyEmergencyContactAPI,
    CreateMyEmergencyContactAPI,
    UpdateMyEmergencyContactAPI,
    DeleteMyEmergencyContactAPI
} from "../../apis/patientEndpoints";
import axiosInstance from "../../axiosInstance";

export const GetEmergencyContactAction = createAsyncThunk("emergencyContact/get", async (info, { rejectWithValue }) => {
    try {
        let { data } = await axiosInstance.get(GetMyEmergencyContactAPI);
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

export const CreateEmergencyContactAction = createAsyncThunk("emergencyContact/create", async (contactData, { rejectWithValue }) => {
    try {
        let { data } = await axiosInstance.post(CreateMyEmergencyContactAPI, contactData);
        return data;
    } catch (error) {
        console.error("❌ API Error:", error);
        console.error("Error details:", {
            message: error.message,
            response: error.response,
            request: error.request
        });

        if (error.response) {
            const validationMessage = error.response.data.message || "Create failed";
            return rejectWithValue(validationMessage);
        } else {
            return rejectWithValue("Network error occurred");
        }
    }
});

export const UpdateEmergencyContactAction = createAsyncThunk("emergencyContact/update", async ({ id, contactData }, { rejectWithValue }) => {
    try {
        let { data } = await axiosInstance.patch(UpdateMyEmergencyContactAPI(id), contactData);
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

export const DeleteEmergencyContactAction = createAsyncThunk("emergencyContact/delete", async (id, { rejectWithValue }) => {
    try {
        let { data } = await axiosInstance.delete(DeleteMyEmergencyContactAPI(id));
        return { data, id };
    } catch (error) {
        console.error("❌ API Error:", error);
        console.error("Error details:", {
            message: error.message,
            response: error.response,
            request: error.request
        });

        if (error.response) {
            const validationMessage = error.response.data.message || "Delete failed";
            return rejectWithValue(validationMessage);
        } else {
            return rejectWithValue("Network error occurred");
        }
    }
});