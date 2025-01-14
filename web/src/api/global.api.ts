import {MouliResult} from "../models/MouliResult";
import api from "./api";

export async function getSyncStatus(): Promise<{
    mouli: Date | null,
    planning: Date | null,
    projects: Date | null,
}> {
    const res = await api.get(`/global/sync-status`);
    return {
        mouli: res.data.mouli ? new Date(res.data.mouli) : null,
        planning: res.data.planning ? new Date(res.data.planning) : null,
        projects: res.data.projects ? new Date(res.data.projects) : null,
    }
}
