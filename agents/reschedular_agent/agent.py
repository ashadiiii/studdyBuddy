from google.adk.agents import LlmAgent
from .prompt import PROMPT

GEMINI_MODEL = "gemini-2.0-flash"

root_agent = LlmAgent(
    name="define_agent",
    model=GEMINI_MODEL,
    instruction=PROMPT,
    description="Select the most suitable time slot to reschedule a specific task.",
    output_key="rescheduled_dates"
)