from google.adk.agents import LlmAgent
from google.adk.tools.mcp_tool.mcp_toolset import MCPToolset, StdioConnectionParams, StdioServerParameters
from dotenv import load_dotenv
from .prompt import WIKI_PROMPT
import os
GEMINI_MODEL = "gemini-2.0-flash"

load_dotenv()
root_agent = LlmAgent(
    name="gather_agent",
    model=GEMINI_MODEL,
    instruction=WIKI_PROMPT,
    tools=[
        MCPToolset(
            connection_params=StdioConnectionParams(
                server_params=StdioServerParameters(
                    command="wikipedia-mcp",
                    args=[]
                ),
                timeout=1200
            ),
            tool_filter=["search_wikipedia", "get_article", "get_summary", "get_related_topics"]
        )

        ],
    description="Search and gathers all wikipedia articles under given search topics that meet given criteria.",
    output_key="wikipedia_resources"
)