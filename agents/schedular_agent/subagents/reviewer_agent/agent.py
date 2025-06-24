from google.adk.agents import LlmAgent
from .prompt import REVIEW_PROMPT
from .tools import exit_loop

GEMINI_MODEL = "gemini-2.0-flash"

root_agent = LlmAgent(
    name="reviewer_agent",
    model=GEMINI_MODEL,
    instruction=REVIEW_PROMPT,
    description="Reviews schedule quality and provides feedback on what to improve or exits the loop if requirements are met.",
    output_key="review",
    tools=[exit_loop]
)