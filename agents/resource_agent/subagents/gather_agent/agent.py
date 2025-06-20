import os
from google.adk.agents import LlmAgent
from google.adk.tools.mcp_tool.mcp_toolset import MCPToolset, StdioServerParameters
from dotenv import load_dotenv
from .prompt import SEARCH_PROMPT as prompt
# Load environment variables
load_dotenv()

# Verify the YouTube API key is available
youtube_api_key = os.getenv("YOUTUBE_API_KEY")
if not youtube_api_key:
    raise ValueError("YOUTUBE_API_KEY environment variable is required")

root_agent = LlmAgent(
    model='gemini-2.0-flash',
    name='gather_agent',
    instruction=prompt,
    tools=[
        MCPToolset(
            connection_params=StdioServerParameters(
                command="npx",
                args=["-y", "youtube-data-mcp-server"],
                env={
                    "YOUTUBE_API_KEY": youtube_api_key,
                    # Add NODE_PATH to help with package resolution
                    "NODE_PATH": "/usr/local/lib/node_modules",
                    # Ensure clean environment
                    "NODE_ENV": "production"
                }
            )
        ),
        MCPToolset(
            connection_params=StdioServerParameters(
                command="python",
                args=["gather_agent/semanticscholar-MCP-Server/semantic_scholar_server.py"],
                timeout= 15000,
            ),
        ),
        MCPToolset(
            connection_params=StdioServerParameters(
                command="wikipedia-mcp",
                args=[]
                )
            ),
        ],
        )
   