import {MouliResult} from "../models/MouliResult";
import api from "./api";

export default async function getMouliDetails(test_id: string): Promise<MouliResult> {
    const res = await api.get(`/mouli/test`);
    //const res = await api.get(`/mouli/${test_id}`);
    return new MouliResult(res.data);
}