"""
Example usage of date/time formatting and duration calculation functions
"""
from datetime import datetime, timedelta
from app.core.utils.time_utils import (
    format_date_for_db,
    format_time_for_db,
    parse_date_from_string,
    parse_time_from_string,
    calculate_duration_from_times,
    create_schedule_item_with_duration
)

def example_date_time_usage():
    """Example of how to work with dates and times"""
    
    # 1. Working with datetime objects
    print("=== Working with datetime objects ===")
    current_date = datetime.now()
    start_time = datetime.now().replace(hour=9, minute=30, second=0)
    end_time = datetime.now().replace(hour=11, minute=45, second=0)
    
    # Format for database storage
    date_str = format_date_for_db(current_date)
    start_str = format_time_for_db(start_time)
    end_str = format_time_for_db(end_time)
    
    print(f"Date formatted: {date_str}")  # e.g., "2024-01-15"
    print(f"Start time formatted: {start_str}")  # e.g., "09:30:00"
    print(f"End time formatted: {end_str}")  # e.g., "11:45:00")
    
    # 2. Parsing strings back to datetime objects
    print("\n=== Parsing strings to datetime ===")
    parsed_date = parse_date_from_string("2024-01-15")
    parsed_time = parse_time_from_string("09:30:00")
    
    print(f"Parsed date: {parsed_date}")
    print(f"Parsed time: {parsed_time}")
    
    # 3. Calculating duration
    print("\n=== Duration calculation ===")
    duration1 = calculate_duration_from_times("09:30:00", "11:45:00")
    duration2 = calculate_duration_from_times("23:00:00", "01:30:00")  # Overnight
    duration3 = calculate_duration_from_times("14:00:00", "14:30:00")  # Short session
    
    print(f"Duration 1: {duration1}")  # "2 hours 15 minutes"
    print(f"Duration 2: {duration2}")  # "2 hours 30 minutes" (overnight)
    print(f"Duration 3: {duration3}")  # "30 minutes"
    
    # 4. Creating schedule items
    print("\n=== Creating schedule items ===")
    schedule_item = create_schedule_item_with_duration(
        task_id="task_123",
        user_id="user_456",
        scheduled_date="2024-01-15",
        start_time="09:30:00",
        end_time="11:45:00",
        session_type="Study session",
        title="Math Review",
        priority="High"
    )
    
    print("Schedule item created:")
    for key, value in schedule_item.items():
        print(f"  {key}: {value}")

def example_with_user_input():
    """Example of handling user input for dates and times"""
    
    print("\n=== User Input Example ===")
    
    # Simulate user input (in real app, this would come from form/API)
    user_date_input = "2024-01-20"
    user_start_input = "14:00:00"
    user_end_input = "16:30:00"
    
    # Validate and create schedule item
    try:
        # Parse to validate format
        parsed_date = parse_date_from_string(user_date_input)
        parsed_start = parse_time_from_string(user_start_input)
        parsed_end = parse_time_from_string(user_end_input)
        
        # Create schedule item
        schedule_item = create_schedule_item_with_duration(
            task_id="user_task_001",
            user_id="current_user",
            scheduled_date=user_date_input,
            start_time=user_start_input,
            end_time=user_end_input,
            session_type="Study session",
            title="User Created Task",
            priority="Medium"
        )
        
        print("User input processed successfully:")
        print(f"  Date: {schedule_item['scheduled_date']}")
        print(f"  Time: {schedule_item['scheduled_time_start']} - {schedule_item['scheduled_time_end']}")
        print(f"  Duration: {schedule_item['duration']}")
        
    except ValueError as e:
        print(f"Error parsing user input: {e}")

if __name__ == "__main__":
    example_date_time_usage()
    example_with_user_input() 