from google.adk.agents import LlmAgent
from .prompt import REFINER_PROMPT

GEMINI_MODEL = "gemini-2.0-flash"

root_agent = LlmAgent(
    name="refiner_agent",
    model=GEMINI_MODEL,
    instruction=REFINER_PROMPT,
    description="Refines the roadmap based on the review and objectives provided.",
    output_key="plan"
)