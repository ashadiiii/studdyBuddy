from ..models.tasks import TaskForSchedule
from supabase import Client

def get_tasks_for_user_schedule(supabase:Client, user_id):
    # Query tasks for the user
    response = supabase.table("tasks").select("*").eq("user_id", user_id).execute()
    if not response.data:
        return []
    # Convert each row to TaskForSchedule
    tasks = []
    for row in response.data:
        # Map DB fields to TaskForSchedule fields
        task = TaskForSchedule(
            task_id=row["id"],
            title=row["title"],
            priority=row["priority"],
            description=row["description"],
            duration=row.get("duration"),
            dependencies=row.get("dependencies", []),
            deadline=row.get("due_date")
        )
        tasks.append(task)
    return tasks


