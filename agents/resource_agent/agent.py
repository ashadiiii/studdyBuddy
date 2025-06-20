"""
Resource collector agent

This module defines the agent that retrieves the daya
"""

from google.adk.agents import SequentialAgent

#import the sub-agents
from .subagents.plan_agent import agent as plan_agent
from .subagents.gather_agent import agent as gather_agent
#create sequential agent
root_agent = SequentialAgent(
    name="resource_agent",
    sub_agents=[plan_agent,gather_agent],
    description="""    
    A pipeline does the following in order:
     - plans the most suitable sources to retrieve from and breaks down the main task into subtasks , providing the suitable search terms for each subtasks resources. 
     - Gathers the resources based on the plan 
"""

)