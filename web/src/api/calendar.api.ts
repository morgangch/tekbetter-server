import api from "./api";

export async function getCalendarToken(): Promise<string> {
    const res = await api.get(`/calendar`);
    return res.data.token;
}

export async function regenCalendarToken(): Promise<string> {
    const res = api.post(`/calendar/regenerate`);
    return res.then((res) => res.data.token);
}