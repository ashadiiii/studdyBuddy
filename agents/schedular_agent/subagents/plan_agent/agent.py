from google.adk.agents import LlmAgent
from .prompt import PLANNER_PROMPT

GEMINI_MODEL = "gemini-2.0-flash"

root_agent = LlmAgent(
    name="plan_agent",
    model=GEMINI_MODEL,
    instruction=PLANNER_PROMPT,
    description="Generates efficient schedule that meets all scheduling requirements and parameters",
    output_key="plan"
)