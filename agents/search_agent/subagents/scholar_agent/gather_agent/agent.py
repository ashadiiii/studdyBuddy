from google.adk.agents import LlmAgent
from google.adk.tools.mcp_tool.mcp_toolset import MCPToolset, StdioServerParameters,StdioConnectionParams
from dotenv import load_dotenv
from .prompt import SCHOLAR_PROMPT
import os
GEMINI_MODEL = "gemini-2.0-flash"

load_dotenv()

root_agent = LlmAgent(
    name="gather_agent",
    model=GEMINI_MODEL,
    instruction=SCHOLAR_PROMPT,
    tools=[
        MCPToolset(
            connection_params=StdioConnectionParams(
                server_params=StdioServerParameters(
                    command =  "python",
                    args =  ["scholar_agent/google-scholar-MCP-Server/google_scholar_server.py"]
                
                ),
                timeout=30
            ),
        )
    ],
    description="Search and gathers all scholar under given search topics that meet given criteria.",
    output_key="scholar_resources"
)