from google.adk.agents import ParallelAgent
from .subagents.yt_agent.agent import root_agent as yt_agent
from .subagents.wiki_agent.agent import root_agent as wiki_agent
from .subagents.scholar_agent.agent import root_agent as scholar_agent
     
GEMINI_MODEL = "gemini-2.0-flash"
root_agent = ParallelAgent(
         name="gather_agent",
         sub_agents=[yt_agent,wiki_agent,scholar_agent],
         description="Runs YouTube, Wikipedia, and Scholar searches in parallel."
        )
