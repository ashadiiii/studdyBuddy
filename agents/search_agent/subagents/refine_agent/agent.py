from google.adk.agents import LlmAgent
from dotenv import load_dotenv
from .prompt import REFINER_PROMPT as prompt

load_dotenv()
GEMINI_MODEL = "gemini-2.0-flash"

root_agent = LlmAgent(
    model=GEMINI_MODEL,
    name="refine_agent",
    instruction=prompt,
    output_key='resource_list'  # Leave empty until you have a valid tool
)