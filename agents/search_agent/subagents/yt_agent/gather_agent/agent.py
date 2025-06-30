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
AUTH_SCHEME = {
    "type": "none",
    "function_declarations": [
        {
            "name": "searchVideos",
            "description": "Search for YouTube videos based on a query",
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {"type": "string", "description": "Search query string"},
                    "maxResults": {"type": "number", "description": "Maximum number of results to return"}
                },
                "required": ["query"]
            }
        },
        {
            "name": "getVideoDetails",
            "description": "Get detailed information about specific videos",
            "parameters": {
                "type": "object",
                "properties": {
                    "videoIds": {
                        "type": "array",
                        "items": {"type": "string"},
                        "description": "List of video IDs to get details for"
                    }
                },
                "required": ["videoIds"]
            }
        },
        {
            "name": "getTranscripts",
            "description": "Get transcripts for specific videos",
            "parameters": {
                "type": "object",
                "properties": {
                    "videoIds": {
                        "type": "array",
                        "items": {"type": "string"},
                        "description": "List of video IDs to get transcripts for"
                    },
                    "lang": {"type": "string", "description": "Language code for the transcript"}
                },
                "required": ["videoIds"]
            }
        },
        {
            "name": "getRelatedVideos",
            "description": "Get videos related to a specific video",
            "parameters": {
                "type": "object",
                "properties": {
                    "videoId": {"type": "string", "description": "ID of the video to find related content for"},
                    "maxResults": {"type": "number", "description": "Maximum number of related videos to return"}
                },
                "required": ["videoId"]
            }
        },
        {
            "name": "getChannelStatistics",
            "description": "Get statistics for specific YouTube channels",
            "parameters": {
                "type": "object",
                "properties": {
                    "channelIds": {
                        "type": "array",
                        "items": {"type": "string"},
                        "description": "List of channel IDs to get statistics for"
                    }
                },
                "required": ["channelIds"]
            }
        },
        {
            "name": "getChannelTopVideos",
            "description": "Get the top videos from a specific channel",
            "parameters": {
                "type": "object",
                "properties": {
                    "channelId": {"type": "string", "description": "ID of the channel"},
                    "maxResults": {"type": "number", "description": "Maximum number of videos to return"}
                },
                "required": ["channelId"]
            }
        },
        {
            "name": "getVideoEngagementRatio",
            "description": "Get engagement metrics for specific videos",
            "parameters": {
                "type": "object",
                "properties": {
                    "videoIds": {
                        "type": "array",
                        "items": {"type": "string"},
                        "description": "List of video IDs to get engagement ratios for"
                    }
                },
                "required": ["videoIds"]
            }
        },
        {
            "name": "getTrendingVideos",
            "description": "Get trending videos for a specific region and category",
            "parameters": {
                "type": "object",
                "properties": {
                    "regionCode": {"type": "string", "description": "Region code (e.g., US, GB)"},
                    "categoryId": {"type": "string", "description": "Category ID for trending videos"},
                    "maxResults": {"type": "number", "description": "Maximum number of trending videos to return"}
                }
            }
        },
        {
            "name": "compareVideos",
            "description": "Compare multiple videos based on their metrics",
            "parameters": {
                "type": "object",
                "properties": {
                    "videoIds": {
                        "type": "array",
                        "items": {"type": "string"},
                        "description": "List of video IDs to compare"
                    }
                },
                "required": ["videoIds"]
            }
        }
    ]
}

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