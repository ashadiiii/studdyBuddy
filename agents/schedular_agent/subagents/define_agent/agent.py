from google.adk.agents import LlmAgent
from .prompt import DEFINE_PROMPT

GEMINI_MODEL = "gemini-2.0-flash"

root_agent = LlmAgent(
    name="define_agent",
    model=GEMINI_MODEL,
    instruction=DEFINE_PROMPT,
    description="Lists the main requirements and objectives of the schedule.",
    output_key="scheduling_parameters"
)