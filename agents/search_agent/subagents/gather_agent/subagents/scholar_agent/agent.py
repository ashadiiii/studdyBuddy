from google.adk.agents import LoopAgent
from .gather_agent import root_agent as gather_agent
from .review_agent import root_agent as reviewer_agent

root_agent = LoopAgent(
    name="scholar_agent",
    max_iterations=5,
    sub_agents=[
        gather_agent,
        reviewer_agent
    ],
    description="Retrieves Google Scholar research articles that is compliant with required function calls."
)