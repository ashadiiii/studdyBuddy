from google.adk.agents import LlmAgent
from dotenv import load_dotenv
from .prompt import PLANNER_PROMPT as prompt

load_dotenv()
GEMINI_MODEL = "gemini-2.0-flash"

root_agent = LlmAgent(
    model=GEMINI_MODEL,
    name="plan_agent",
    instruction=prompt,
    output_key='plan'  # Leave empty until you have a valid tool
)