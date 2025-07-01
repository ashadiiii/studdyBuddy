from google.adk.agents import SequentialAgent

#import the sub-agents
from .subagents.plan_agent import root_agent as plan_agent
from .subagents.gather_agent import root_agent as gather_agent
from .subagents.refine_agent import root_agent as refiner_agent
import os
os.environ["OTEL_SDK_DISABLED"] = "true"

root_agent = SequentialAgent(
    name="resource_agent",
    sub_agents=[plan_agent,gather_agent,refiner_agent],
    description="""    
    A pipeline does the following in order:
     - plans the most suitable sources to retrieve from and breaks down the main task into subtasks , providing the suitable search terms for each subtasks resources. 
     - Gathers the resources based on the plan 
     - Lists and organises the sources in a structural format
"""

)