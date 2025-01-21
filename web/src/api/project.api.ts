import api from "./api";
import {EpiProject} from "../models/Project";

export default async function getAllProjects(): Promise<EpiProject[]> {
    const res = await api.get(`/projects`);
    return res.data.map((project: any) => new EpiProject(project));
}


export async function markProjectAsSeen(slug: string) {
    await api.post(`/projects/${slug}/mark-seen`);
}

export async function markAllProjectsAsSeen() {
    await api.post(`/projects/mark-all-seen`);
}
