"""
studyplan_utils.py
Generate study plan (LangChain Agent tool).
Generates a daily study plan from a syllabus JSON using Gemini (AI Studio),
with fallback/mock support for quota or testing.
"""

import google.generativeai as genai
from dotenv import load_dotenv
import os
import json

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-1.5-pro")

def generate_study_plan(syllabus_json, exam_days=30, hours_per_day=3, use_mock=False):
    """
    Generates a daily study plan from syllabus.
    Args:
        syllabus_json (dict): e.g. {"DBMS": ["ER Model", ...], ...}
        exam_days (int): Number of days until exam
        hours_per_day (int): Study hours per day
        use_mock (bool): If True, return a mock plan (no Gemini call)
    Returns:
        dict: {"Day 1": [...], "Day 2": [...], ...}
    """
    if use_mock:
        # Simple round-robin mock plan
        plan = {}
        topics = [(subject, topic) for subject, topics in syllabus_json.items() for topic in topics]
        for i, (subject, topic) in enumerate(topics):
            day = f"Day {i+1}"
            plan[day] = [f"{subject} - {topic}", "Quiz: 5 MCQs"]
        return plan

    # Prepare prompt for Gemini
    syllabus_str = json.dumps(syllabus_json, indent=2)
    prompt = f"""
    You are a study planner AI. 
    The user has the following syllabus:

    {syllabus_str}

    The user has {exam_days} days until exams, and can study {hours_per_day} hours per day. 
    Create a daily study plan in JSON format, distributing topics evenly and adding quizzes/revision. 
    Format:
    {{
      "Day 1": ["Topic - Subtopic", "Quiz: 5 MCQs"],
      "Day 2": ["..."],
      ...
    }}
    """
    try:
        response = model.generate_content(prompt)
        plan_json = json.loads(response.text)
        return plan_json
    except Exception as e:
        # Fallback: return mock plan if Gemini fails (quota, etc.)
        plan = {}
        topics = [(subject, topic) for subject, topics in syllabus_json.items() for topic in topics]
        for i, (subject, topic) in enumerate(topics):
            day = f"Day {i+1}"
            plan[day] = [f"{subject} - {topic}", "Quiz: 5 MCQs"]
        return plan
