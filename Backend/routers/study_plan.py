"""
study_plan.py
API router for study plan generation endpoints
"""

from fastapi import APIRouter, HTTPException
from typing import Dict
import uuid
import json
from datetime import datetime

from models.study_plan import (
    StudyPlanRequest, StudyPlanData,
    StudyProgressRequest, StudyProgressData
)
from models.base import SuccessResponse
from middleware.error_handling import create_success_response
from utils.llm_utils import generate_study_plan as llm_generate_study_plan

router = APIRouter(prefix="/api/study-plan", tags=["Study Plan"])

# In-memory storage for demo (replace with database later)
_plan_storage: Dict[str, Dict] = {}

@router.post("/generate", response_model=SuccessResponse)
async def generate_study_plan_endpoint(request: StudyPlanRequest):
    """
    Generate a personalized study plan from syllabus
    """
    try:
        if request.use_mock:
            # Mock study plan for testing/quota fallback
            plan_data = {}
            topics = [(subject, topic) for subject, topics in request.syllabus.items() for topic in topics]
            for i, (subject, topic) in enumerate(topics[:request.exam_days]):
                day = f"Day {i+1}"
                plan_data[day] = [f"{subject} - {topic}", "Quiz: 5 MCQs"]
        else:
            # Generate study plan using LLM utils
            import json
            syllabus_json_str = json.dumps(request.syllabus)
            llm_response = llm_generate_study_plan(syllabus_json_str, request.exam_days)
            
            # Parse JSON response from LLM (or handle as text)
            try:
                plan_data = json.loads(llm_response)
            except json.JSONDecodeError:
                # If not JSON, create a simple structure from text response
                lines = llm_response.split('\n')
                plan_data = {}
                current_day = None
                for line in lines:
                    if 'Day' in line:
                        current_day = line.strip()
                        plan_data[current_day] = []
                    elif current_day and line.strip():
                        plan_data[current_day].append(line.strip())
        
        # Generate unique plan ID
        plan_id = str(uuid.uuid4())
        
        # Calculate totals
        total_hours = request.exam_days * request.hours_per_day
        subjects = list(request.syllabus.keys())
        
        # Create response data
        response_data = StudyPlanData(
            plan_id=plan_id,
            total_days=request.exam_days,
            total_hours=total_hours,
            subjects=subjects,
            daily_plans=plan_data,
            created_at=datetime.utcnow().isoformat() + "Z"
        )
        
        # Store plan
        _plan_storage[plan_id] = {
            "plan_data": response_data.dict(),
            "original_request": request.dict(),
            "created_at": datetime.utcnow().isoformat()
        }
        
        return create_success_response(
            data=response_data.dict(),
            message=f"Study plan generated successfully for {len(subjects)} subjects over {request.exam_days} days"
        )
        
    except Exception as e:
        # If LLM fails, try with mock data
        if "quota" in str(e).lower() or "rate limit" in str(e).lower():
            mock_request = StudyPlanRequest(
                syllabus=request.syllabus,
                exam_days=request.exam_days,
                hours_per_day=request.hours_per_day,
                use_mock=True
            )
            return await generate_study_plan_endpoint(mock_request)
        else:
            raise HTTPException(status_code=500, detail=f"Study plan generation failed: {str(e)}")

@router.get("/{plan_id}", response_model=SuccessResponse)
async def get_study_plan(plan_id: str):
    """
    Retrieve a specific study plan by ID
    """
    if plan_id not in _plan_storage:
        raise HTTPException(status_code=404, detail="Study plan not found")
    
    plan_data = _plan_storage[plan_id]["plan_data"]
    
    return create_success_response(
        data=plan_data,
        message="Study plan retrieved successfully"
    )

@router.post("/progress", response_model=SuccessResponse)
async def update_progress(request: StudyProgressRequest):
    """
    Update study progress for a user
    """
    # Check if plan exists
    if request.plan_id not in _plan_storage:
        raise HTTPException(status_code=404, detail="Study plan not found")
    
    # In a real implementation, this would update the database
    # For now, we'll just calculate and return progress
    
    plan_data = _plan_storage[request.plan_id]["plan_data"]
    total_days = plan_data["total_days"]
    
    # Extract day number from completed_day (e.g., "Day 1" -> 1)
    try:
        day_number = int(request.completed_day.split()[-1])
    except (ValueError, IndexError):
        raise HTTPException(status_code=400, detail="Invalid day format. Expected 'Day X'")
    
    # Calculate progress
    completion_percentage = (day_number / total_days) * 100
    
    # Get next tasks (this would come from database in real implementation)
    next_day = f"Day {day_number + 1}"
    next_tasks = plan_data["daily_plans"].get(next_day, ["Course completed!"])
    
    progress_data = StudyProgressData(
        plan_id=request.plan_id,
        user_id=request.user_id,
        days_completed=day_number,
        total_days=total_days,
        completion_percentage=completion_percentage,
        next_tasks=next_tasks
    )
    
    return create_success_response(
        data=progress_data.dict(),
        message=f"Progress updated successfully. {completion_percentage:.1f}% complete"
    )

@router.get("/user/{user_id}/plans", response_model=SuccessResponse)
async def get_user_plans(user_id: str):
    """
    Get all study plans for a user (placeholder for future implementation)
    """
    # This would query the database for user's study plans
    # For now, return empty list
    return create_success_response(
        data={
            "user_id": user_id,
            "total_plans": 0,
            "study_plans": []
        },
        message="User study plans retrieved successfully"
    )