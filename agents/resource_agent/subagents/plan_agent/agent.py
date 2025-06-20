from google.adk.agents import LlmAgent
from google.adk.tools.mcp_tool.mcp_toolset import MCPToolset, StdioServerParameters
import os
from dotenv import load_dotenv
from .prompt import PLANNER_PROMPT as prompt

load_dotenv()
GEMINI_MODEL = "gemini-2.0-flash"

# retrieve search api key
# APIFY_API_TOKEN=os.getenv("APIFY_KEY")

agent = LlmAgent(
    model=GEMINI_MODEL,
    name="plan_agent",
    instruction=prompt,
    tools=[],  # Leave empty until you have a valid tool
)