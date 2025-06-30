from datetime import datetime, timedelta, date, time

def subtract_time_period(base_start, base_end, sub_start, sub_end):
    """
    All times are strings in "HH:MM" format.
    Returns a list of (start, end) tuples as strings.
    """
    fmt = "%H:%M:00"
    base_start_dt = datetime.strptime(base_start, fmt)
    base_end_dt = datetime.strptime(base_end, fmt)
    sub_start_dt = datetime.strptime(sub_start, fmt)
    sub_end_dt = datetime.strptime(sub_end, fmt)

    # A. No Overlap
    if sub_end_dt <= base_start_dt or sub_start_dt >= base_end_dt:
        # Sub period is completely before or after the base period
        return [(base_start, base_end)]

    # B. Sub Period Covers Base Completely
    if sub_start_dt <= base_start_dt and sub_end_dt >= base_end_dt:
        # Sub period covers the base period completely
        return []

    # C. Sub Period at the Start
    if sub_start_dt <= base_start_dt < sub_end_dt < base_end_dt:
        # Sub period starts before or at the base and ends inside the base
        return [(sub_end_dt.strftime(fmt), base_end)]

    # D. Sub Period at the End
    if base_start_dt < sub_start_dt < base_end_dt <= sub_end_dt:
        # Sub period starts inside the base and ends after or at the base
        return [(base_start, sub_start_dt.strftime(fmt))]

    # E. Sub Period in the Middle
    if base_start_dt < sub_start_dt < sub_end_dt < base_end_dt:
        # Sub period starts and ends inside the base
        return [
            (base_start, sub_start_dt.strftime(fmt)),
            (sub_end_dt.strftime(fmt), base_end)
        ]

    # Default: return the base as is (should not be reached)
    return [(base_start, base_end)]
  

def get_duration_with_overnight(start_time: str, end_time: str) -> str:
    start_dt = datetime.strptime(start_time, "%H:%M:%S")
    end_dt = datetime.strptime(end_time, "%H:%M:%S")
    
    # If end time is before start time, assume it's the next day
    if end_dt < start_dt:
        end_dt += timedelta(days=1)
    
    duration = end_dt - start_dt
    total_seconds = duration.total_seconds()
    hours = int(total_seconds // 3600)
    minutes = int((total_seconds % 3600) // 60)
    
    return f"{hours} hours {minutes} minutes"

# Usage
duration = get_duration_with_overnight("23:00:00", "01:00:00")
print(duration)  # Output: "2 hours 0 minutes"

def date_to_db_string(date_obj: date) -> str:
    """
    Convert Python date object to database string format YYYY-MM-DD
    """
    return date_obj.strftime("%Y-%m-%d")

def time_to_db_string(time_obj: time) -> str:
    """
    Convert Python time object to database string format HH:MM:SS
    """
    return time_obj.strftime("%H:%M:%S")

def db_string_to_date(date_str: str) -> date:
    """
    Convert database date string YYYY-MM-DD to Python date object
    """
    return datetime.strptime(date_str, "%Y-%m-%d").date()

def db_string_to_time(time_str: str) -> time:
    """
    Convert database time string HH:MM:SS to Python time object
    """
    return datetime.strptime(time_str, "%H:%M:%S").time()

def calculate_duration_from_time_objects(start_time: time, end_time: time) -> str:
    """
    Calculate duration between two time objects
    Returns duration as a formatted string (e.g., "2 hours 30 minutes")
    """
    # Convert to datetime for calculation (using today's date as reference)
    today = date.today()
    start_dt = datetime.combine(today, start_time)
    end_dt = datetime.combine(today, end_time)
    
    # If end time is before start time, assume it's the next day
    if end_dt < start_dt:
        end_dt += timedelta(days=1)
    
    duration = end_dt - start_dt
    total_seconds = duration.total_seconds()
    hours = int(total_seconds // 3600)
    minutes = int((total_seconds % 3600) // 60)
    
    if hours > 0 and minutes > 0:
        return f"{hours} hours {minutes} minutes"
    elif hours > 0:
        return f"{hours} hours"
    elif minutes > 0:
        return f"{minutes} minutes"
    else:
        return "0 minutes"

def prepare_schedule_item_for_db(schedule_item: dict) -> dict:
    """
    Convert a schedule item dictionary with date/time objects to database format
    """
    db_item = schedule_item.copy()
    
    # Convert date and time objects to strings for database storage
    if isinstance(db_item.get('scheduled_date'), date):
        db_item['scheduled_date'] = date_to_db_string(db_item['scheduled_date'])
    
    if isinstance(db_item.get('scheduled_time_start'), time):
        db_item['scheduled_time_start'] = time_to_db_string(db_item['scheduled_time_start'])
    
    if isinstance(db_item.get('scheduled_time_end'), time):
        db_item['scheduled_time_end'] = time_to_db_string(db_item['scheduled_time_end'])
    
    return db_item

def load_schedule_item_from_db(db_item: dict) -> dict:
    """
    Convert a database schedule item to Python date/time objects
    """
    loaded_item = db_item.copy()
    
    # Convert date and time strings to Python objects
    if isinstance(loaded_item.get('scheduled_date'), str):
        loaded_item['scheduled_date'] = db_string_to_date(loaded_item['scheduled_date'])
    
    if isinstance(loaded_item.get('scheduled_time_start'), str):
        loaded_item['scheduled_time_start'] = db_string_to_time(loaded_item['scheduled_time_start'])
    
    if isinstance(loaded_item.get('scheduled_time_end'), str):
        loaded_item['scheduled_time_end'] = db_string_to_time(loaded_item['scheduled_time_end'])
    
    return loaded_item