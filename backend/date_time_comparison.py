"""
Comparison: String dates vs Proper date/time types
"""
from datetime import date, time, datetime, timedelta
from app.core.models.schedule import scheduleItem
from app.core.utils.time_utils import (
    date_to_db_string, 
    time_to_db_string,
    calculate_duration_from_time_objects,
    prepare_schedule_item_for_db,
    load_schedule_item_from_db
)

def demonstrate_string_vs_proper_types():
    """Show the differences between string and proper date/time handling"""
    
    print("=== STRING APPROACH (Problems) ===")
    
    # String approach - prone to errors
    string_schedule = {
        "scheduled_date": "2024-01-15",
        "scheduled_time_start": "09:30:00", 
        "scheduled_time_end": "11:45:00"
    }
    
    # Problems with strings:
    print("1. No validation - invalid dates accepted:")
    invalid_date = "2024-13-45"  # This would be accepted as a string
    print(f"   Invalid date: {invalid_date}")
    
    print("\n2. Difficult date arithmetic:")
    date1_str = "2024-01-15"
    date2_str = "2024-01-20"
    print(f"   Can't easily calculate days between {date1_str} and {date2_str}")
    
    print("\n3. String comparison issues:")
    print(f"   '2024-01-15' < '2024-01-2' = {'2024-01-15' < '2024-01-2'}")  # Wrong!
    
    print("\n=== PROPER TYPES APPROACH (Benefits) ===")
    
    # Proper types approach
    try:
        proper_schedule = scheduleItem(
            taskId="task_123",
            userId="user_456",
            scheduled_date=date(2024, 1, 15),  # date object
            scheduled_time_start=time(9, 30, 0),  # time object
            scheduled_time_end=time(11, 45, 0),  # time object
            duration="",  # Will be calculated
            session_type="Study session",
            completed=False,
            title="Math Review",
            priority="High"
        )
        
        print("1. Automatic validation:")
        print(f"   Date: {proper_schedule.scheduled_date} (type: {type(proper_schedule.scheduled_date)})")
        print(f"   Start time: {proper_schedule.scheduled_time_start} (type: {type(proper_schedule.scheduled_time_start)})")
        
        print("\n2. Easy date arithmetic:")
        days_between = (date(2024, 1, 20) - date(2024, 1, 15)).days
        print(f"   Days between 2024-01-15 and 2024-01-20: {days_between}")
        
        print("\n3. Proper time calculations:")
        duration = calculate_duration_from_time_objects(
            proper_schedule.scheduled_time_start,
            proper_schedule.scheduled_time_end
        )
        print(f"   Duration: {duration}")
        
        print("\n4. Date validation (will raise error for past dates):")
        try:
            past_schedule = scheduleItem(
                taskId="task_123",
                userId="user_456",
                scheduled_date=date(2020, 1, 15),  # Past date
                scheduled_time_start=time(9, 30, 0),
                scheduled_time_end=time(11, 45, 0),
                duration="",
                session_type="Study session",
                completed=False,
                title="Math Review",
                priority="High"
            )
        except ValueError as e:
            print(f"   Validation caught error: {e}")
        
        print("\n5. Time validation (will raise error for invalid times):")
        try:
            invalid_time_schedule = scheduleItem(
                taskId="task_123",
                userId="user_456",
                scheduled_date=date(2024, 1, 15),
                scheduled_time_start=time(11, 45, 0),  # Later time
                scheduled_time_end=time(9, 30, 0),     # Earlier time
                duration="",
                session_type="Study session",
                completed=False,
                title="Math Review",
                priority="High"
            )
        except ValueError as e:
            print(f"   Validation caught error: {e}")
            
    except Exception as e:
        print(f"Error: {e}")

def demonstrate_database_conversion():
    """Show how to convert between Python objects and database format"""
    
    print("\n=== DATABASE CONVERSION ===")
    
    # Create schedule item with proper types
    schedule_item = scheduleItem(
        taskId="task_123",
        userId="user_456",
        scheduled_date=date(2024, 1, 15),
        scheduled_time_start=time(9, 30, 0),
        scheduled_time_end=time(11, 45, 0),
        duration="",
        session_type="Study session",
        completed=False,
        title="Math Review",
        priority="High"
    )
    
    # Convert to dict
    item_dict = schedule_item.model_dump()
    print("Original Python objects:")
    print(f"  Date: {item_dict['scheduled_date']} (type: {type(item_dict['scheduled_date'])})")
    print(f"  Start time: {item_dict['scheduled_time_start']} (type: {type(item_dict['scheduled_time_start'])})")
    
    # Convert to database format
    db_item = prepare_schedule_item_for_db(item_dict)
    print("\nDatabase format (strings):")
    print(f"  Date: {db_item['scheduled_date']} (type: {type(db_item['scheduled_date'])})")
    print(f"  Start time: {db_item['scheduled_time_start']} (type: {type(db_item['scheduled_time_start'])})")
    
    # Convert back to Python objects
    loaded_item = load_schedule_item_from_db(db_item)
    print("\nLoaded back to Python objects:")
    print(f"  Date: {loaded_item['scheduled_date']} (type: {type(loaded_item['scheduled_date'])})")
    print(f"  Start time: {loaded_item['scheduled_time_start']} (type: {type(loaded_item['scheduled_time_start'])})")

if __name__ == "__main__":
    demonstrate_string_vs_proper_types()
    demonstrate_database_conversion() 