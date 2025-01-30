import {parse} from "@babel/core";

export class EpiModule {
    module_code: string;
    semester_id: number;
    instance_code: string;
    school_year: number;
    module_title: string;

    date_start: Date;
    date_end: Date;
    date_end_reg: Date;
    is_registration_allowed: boolean;
    student_registered: boolean;

    student_credits: number;
    student_grade: string;

    available_credits: number;
    wanted_credits: number;

    is_roadblock: boolean;
    roadblock_submodules: string[];
    roadblock_required_credits: number | null;

    constructor(data: any) {
        this.module_code = data.code_module;
        this.semester_id = data.semester_id;
        this.instance_code = data.instance_code;
        this.school_year = parseInt(data.scol_year);
        this.module_title = data.title;

        this.date_start = new Date(data.date_start);
        this.date_end = new Date(data.date_end);
        this.date_end_reg = new Date(data.date_end_reg);
        this.is_registration_allowed = data.is_registration_allowed;
        this.student_registered = data.student_registered;

        this.student_credits = data.student_credits;
        this.student_grade = data.student_grade;

        this.available_credits = data.credits;
        this.wanted_credits = data.wanted_credits;

        this.is_roadblock = data.is_roadblock;
        this.roadblock_submodules = data.roadblock_submodules;
        this.roadblock_required_credits = data.roadblock_required_credits;
    }


    is_failed(): boolean {
        if (this.student_grade === "Echec")
            return true;
        return false;
    }


}