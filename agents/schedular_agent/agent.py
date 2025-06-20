from google.adk.agents import LoopAgent, SequentialAgent

from .subagents.define_agent import root_agent as definer
from .subagents.plan_agent import root_agent as planner
from .subagents.refiner_agent import root_agent as refiner
from .subagents.reviewer_agent import root_agent as reviewer

refinement_loop = LoopAgent(
    name="generation_and_refiner_loop",
    max_iterations=10,
    sub_agents=[
        reviewer,
        refiner
    ],
    description="Iteratively reviews and refines the schedule until all quality requirements , difficult and priority of each task is taken to consideration and handled appropriately."
)

root_agent = SequentialAgent(
    name="SchedulerPipeline",
    sub_agents=[
        definer,
        planner,
        refinement_loop
    ],
    description= "Defines, Generates and refines an efficient , practical schedule . "
)