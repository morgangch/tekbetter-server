
export class CodingStyleResult {
    minor: number;
    major: number;
    info: number;
    too_many: boolean;

    isPerfect() {
        return this.minor === 0 && this.major === 0 && this.info === 0 && !this.too_many;
    }

    constructor( data: any) {
        this.minor = data.minor;
        this.major = data.major;
        this.info = data.info;
        this.too_many = data.too_many;
    }
}

export class MouliTestClass {
    name: string;
    passed: boolean;
    crashed: boolean;
    skipped: boolean;
    mandatory: boolean;
    comment: string;
}

export class MouliSkill {
    name: string;
    score: number;

    count: number;
    passed: number;
    crashed: number;
    mandatoryFailed: number;

    tests: MouliTestClass[] | null;

    isCrashed() {
        return this.crashed > 0 || (this.tests !== null && this.tests.filter(test => test.crashed).length > 0);
    }

    constructor(data: any) {
        this.name = data.name;
        this.score = data.score;
        this.count = data.count;
        this.passed = data.passed;
        this.crashed = data.crashed;
        this.mandatoryFailed = data.mandatoryFailed;
        this.tests = data.tests;
    }

}

export class MouliResult {

    project_name: string;
    total_score: number;
    test_date: Date;
    test_id: number;
    commit: string;
    coding_style: CodingStyleResult;
    build_trace: string | null;
    banned_content: string | null;
    skills: MouliSkill[];

    isCrashed() {
        return this.skills.filter(skill => skill.isCrashed()).length > 0;
    }

    isManyMandatoryFailed() {
        return this.skills.filter(skill => skill.mandatoryFailed > 0).length > 0;
    }

    constructor() {
    }
}