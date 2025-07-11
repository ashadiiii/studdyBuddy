from google.adk.agents import LlmAgent
from google.adk.tools.mcp_tool.mcp_toolset import MCPToolset, StdioConnectionParams, StdioServerParameters
from dotenv import load_dotenv
from .prompt import YT_PROMPT
import os
GEMINI_MODEL = "gemini-2.0-flash"

load_dotenv()

youtube_api_key = os.getenv("YOUTUBE_API_KEY")
if not youtube_api_key:
    raise ValueError("YOUTUBE_API_KEY environment variable is required")

# Define the function schemas for auth_scheme

root_agent = LlmAgent(
    name="gather_agent",
    model=GEMINI_MODEL,
    instruction=YT_PROMPT,
    tools=[
        MCPToolset(
            connection_params=StdioConnectionParams(
                server_params=StdioServerParameters(
                    command="npx",
                    args=["-y", "youtube-data-mcp-server"],
                    env={
                        "YOUTUBE_API_KEY": youtube_api_key,
                        "NODE_PATH": "/usr/local/lib/node_modules",
                        "NODE_ENV": "production"
                    }
                ),
                timeout=30
            ),
        )
    ],
    description="Search and gathers all videos under given search topics that meet given criteria.",
    output_key="youtube_resources"
)