
export class CodingStyleResult {
    minor_count: number;
    major_count: number;
    info_count: number;
    is_too_many: boolean;
    details: {
        [key: string]: {
            minor: {[key: string]: string[]},
            major: {[key: string]: string[]},
            info: {[key: string]: string[]},
        }
    }


    isPerfect() {
        return this.minor_count === 0 && this.major_count === 0 && this.info_count === 0 && !this.is_too_many;
    }

    constructor( data: any) {
        this.minor_count = data.minor_count;
        this.major_count = data.major_count;
        this.info_count = data.info_count;
        this.is_too_many = data.is_too_many;
        this.details = data.details;
    }
}

export class MouliTestClass {
    name: string;
    is_passed: boolean;
    is_crashed: boolean;
    is_skipped: boolean;
    is_mandatory: boolean;
    comment: string | null;

    constructor(data: any) {
        this.name = data.name;
        this.is_passed = data.is_passed;
        this.is_crashed = data.is_crashed;
        this.is_skipped = data.is_skipped;
        this.is_mandatory = data.is_mandatory;
        this.comment = data.comment;
    }
}

export class MouliSkill {
    title: string;
    score: number;

    tests_count: number;
    tests_passed_count: number;
    tests_crashed_count: number;
    mandatory_failed_count: number;

    tests: MouliTestClass[] | null;

    isCrashed() {
        return this.tests_count > 0 && (this.tests !== null && this.tests.filter(test => test.is_crashed).length > 0);
    }

    isWarning() {
        return this.mandatory_failed_count > 0 || this.isCrashed();
    }


    constructor(data: any) {
        this.title = data.title;
        this.score = data.score;
        this.tests_count = data.tests_count;
        this.tests_passed_count = data.passed_count;
        this.tests_crashed_count = data.crash_count;
        this.mandatory_failed_count = data.mandatoryfail_count;
        this.tests = data.tests;
    }

}

export class MouliResult {

    project_name: string;
    total_score: number;
    test_date: Date;
    test_id: number;
    commit: string | null;
    coding_style: CodingStyleResult;
    build_trace: string | null;
    banned_content: string | null;
    skills: MouliSkill[];
    evolution: {
        "dates": string[],
        "scores": number[],
        "ids": number[]
    }

    constructor(data: any) {
        this.test_id = data.test_id;
        this.project_name = data.project_name;
        this.test_date = new Date(data.test_date);
        this.total_score = data.score;
        this.commit = data.commit_hash.slice(0, 8);
        this.build_trace = data.build_trace;
        this.banned_content = data.banned_content;
        this.skills = data.skills.map((skill: any) => new MouliSkill(skill));
        this.coding_style = new CodingStyleResult(data.coding_style_report);
        this.evolution = data.evolution;
    }

    crashCount() {
        return this.skills.map(skill => skill.tests_crashed_count).reduce((a, b) => a + b, 0);
    }

    isCrashed() {
        return this.skills.filter(skill => skill.isCrashed()).length > 0;
    }

    isManyMandatoryFailed() {
        return this.skills.filter(skill => skill.mandatory_failed_count > 0).length > 0;
    }
}