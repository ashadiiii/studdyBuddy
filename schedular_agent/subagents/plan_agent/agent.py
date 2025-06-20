from google.adk.agents import LlmAgent
from .prompt import PLANNER_PROMPT

GEMINI_MODEL = "gemini-2.0-flash"

root_agent = LlmAgent(
    name="plan_agent",
    model=GEMINI_MODEL,
    instruction=PLANNER_PROMPT,
    description="Generates or refines the roadmap with the main task broken down into subtasks based on the review and objectives provided.",
    output_key="plan"
)