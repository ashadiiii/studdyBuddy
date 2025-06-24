from typing import Any, Dict
from google.adk.tools.tool_context import ToolContext

def exit_loop(tool_context:ToolContext)->Dict[str,Any]:
    """
     Call this function ONLY when the schedule meets all requirements and objectives defined, signaling the iterative process should end.

     Args:
        tool_context: Context for tool execution

     Returns:
        Empty Dictionary
    """
    print("\n------EXIT LOOP TRIGGERED------")
    print("Plan review completed successfully")
    print("Loop will exit now")
    print("---------------------------------\n")

    tool_context.actions.escalate = True
    return{}