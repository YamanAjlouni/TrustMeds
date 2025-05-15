import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance, { errorMessage } from "../../axiosInstance";
import { AddPatientAPI, DeletePatientAPI, GetPatientsAPI, UpdatePatientAPI } from "../../Api";

// جلب كل المرضى
export const fetchPatients = createAsyncThunk("patients/fetchAll", async (_, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.get(GetPatientsAPI);
        return data;
    } catch (error) {
        if (error.response) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(errorMessage);
        }
    }
}
);

// إضافة مريض جديد
export const addPatient = createAsyncThunk("patients/add", async (patientData, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.post(AddPatientAPI, patientData);
        return data;
    } catch (error) {
        if (error.response) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(errorMessage);
        }
    }
}
);

// تحديث بيانات مريض
export const updatePatient = createAsyncThunk("patients/update", async ({ id, patientData }, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.put(UpdatePatientAPI(id), patientData);
        return data;
    } catch (error) {
        if (error.response) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(errorMessage);
        }
    }
}
);

// حذف مريض
export const deletePatient = createAsyncThunk("patients/delete", async (id, { rejectWithValue }) => {
    try {
        await axiosInstance.delete(DeletePatientAPI(id));
        return id; // نرجع الـ id عشان نحدث الستيت
    } catch (error) {
        if (error.response) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(errorMessage);
        }
    }
}
);
