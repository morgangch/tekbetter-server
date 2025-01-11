from typing import Dict, List


class MouliTest:
    title: str
    passed: bool
    crashed: bool
    skipped: bool
    mandatory: bool
    comment: str

    def __init__(self, mongodata=None):
        if mongodata is None:
            return
        self.title = mongodata["title"]
        self.passed = mongodata["passed"]
        self.crashed = mongodata["crashed"]
        self.skipped = mongodata["skipped"]
        self.mandatory = mongodata["mandatory"]
        self.comment = mongodata["comment"]

    def to_dict(self):
        return {
            "title": self.title,
            "passed": self.passed,
            "crashed": self.crashed,
            "skipped": self.skipped,
            "mandatory": self.mandatory,
            "comment": self.comment
        }

class MouliSkill:
    title: str
    tests_count: int
    passed_count: int
    crash_count: int
    mandatoryfail_count: int

    tests: [MouliTest]

    def __init__(self, mongodata=None):
        if mongodata is None:
            return
        self.title = mongodata["title"]
        self.tests_count = mongodata["tests_count"]
        self.passed_count = mongodata["passed_count"]
        self.crash_count = mongodata["crash_count"]
        self.mandatoryfail_count = mongodata["mandatoryfail_count"]
        self.tests = [MouliTest(test) for test in mongodata["tests"]]

    @property
    def score(self):
        return round(self.passed_count / self.tests_count * 100, 2)

    def to_dict(self):
        return {
            "title": self.title,
            "score": self.score,
            "tests_count": self.tests_count,
            "passed_count": self.passed_count,
            "crash_count": self.crash_count,
            "mandatoryfail_count": self.mandatoryfail_count,
            "tests": [test.to_dict() for test in self.tests]
        }

class CodingStyleReport:
    minor_issues: int = 0
    major_issues: int = 0
    info_issues: int = 0
    is_too_many_issues: bool = False

    # Violation code : [file path and line]
    details: Dict[str, Dict[str, List[str]]] = {
        "minor": {},
        "major": {},
        "info": {}
    }

    def __init__(self, mongodata=None):
        if mongodata is None:
            return
        self.minor_issues = mongodata["minor_issues"]
        self.major_issues = mongodata["major_issues"]
        self.info_issues = mongodata["info_issues"]
        self.is_too_many_issues = mongodata["is_too_many_issues"]
        self.details = mongodata["details"]


    def to_dict(self) -> dict:
        return {
            "minor_issues": self.minor_issues,
            "major_issues": self.major_issues,
            "info_issues": self.info_issues,
            "is_too_many_issues": self.is_too_many_issues,
            "details": self.details
        }

class MouliResult:
    test_id: int
    project_name: str
    module_code: str
    test_date: str
    commit_hash: str
    student_id: int

    build_trace: str | None
    banned_content: str | None

    skills: [MouliSkill]

    coding_style_report: CodingStyleReport

    def __init__(self, mongodata=None):
        if mongodata is None:
            return
        self.test_id = mongodata["_id"]
        self.project_name = mongodata["project_name"]
        self.module_code = mongodata["module_code"]
        self.student_id = mongodata["student_id"]
        self.test_date = mongodata["test_date"]
        self.commit_hash = mongodata["commit_hash"]
        self.build_trace = mongodata["build_trace"]
        self.banned_content = mongodata["banned_content"]
        self.skills = [MouliSkill(skill) for skill in mongodata["skills"]]
        self.coding_style_report = CodingStyleReport(mongodata["coding_style_report"])

    @property
    def score(self):
        total_tests = sum([skill.tests_count for skill in self.skills])
        passed_tests = sum([skill.passed_count for skill in self.skills])
        return round(passed_tests / total_tests * 100, 2)

    def to_dict(self) -> dict:
        return {
            "_id": self.test_id,
            "project_name": self.project_name,
            "module_code": self.module_code,
            "student_id": self.student_id,
            "score": self.score,
            "test_date": self.test_date,
            "commit_hash": self.commit_hash,
            "build_trace": self.build_trace,
            "banned_content": self.banned_content,
            "skills": [skill.to_dict() for skill in self.skills],
            "coding_style_report": self.coding_style_report.to_dict()
        }