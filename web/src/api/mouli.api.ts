import {MouliResult} from "../models/MouliResult";
import api from "./api";

export async function getMouliDetails(test_id: number): Promise<MouliResult> {
    const res = await api.get(`/mouli/test/${test_id}`);
    return new MouliResult(res.data);
}

export async function getProjectMouliHistory(project_slug: string): Promise<{ test_id: number, score: number, date: Date, is_warning: boolean }[]> {
    const res = await api.get(`/mouli/project/${project_slug}`);
    return res.data.map((data: any) => ({
        test_id: data.test_id,
        score: data.score,
        is_warning: data.is_warning,
        date: new Date(data.date)
    }));
}