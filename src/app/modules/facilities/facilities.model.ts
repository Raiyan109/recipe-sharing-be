import { Schema, model } from "mongoose";
import { TFacility } from "./facilities.interface";

const facilitySchema = new Schema<TFacility>({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    pricePerHour: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        required: true
    }
}, { timestamps: true })

export const FacilityModel = model<TFacility>('Facility', facilitySchema)