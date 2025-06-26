from google.adk.agents import BaseAgent
from typing import AsyncGenerator
from google.adk.agents.invocation_context import InvocationContext
from google.adk.events.event import Event

class DebugAgent(BaseAgent):
    def __init__(self, wrapped_agent, key_to_check=None):
        super().__init__(name=f"debug_{wrapped_agent.name}", description=f"Debug wrapper for {wrapped_agent.name}")
        self.wrapped_agent = wrapped_agent
        self.key_to_check = key_to_check

    async def run_async(self, parent_context: InvocationContext) -> AsyncGenerator[Event, None]:
        print(f"\n[DEBUG] Before running {self.wrapped_agent.name}:")
        if self.key_to_check:
            print(f"  {self.key_to_check} in context:", getattr(parent_context, self.key_to_check, None))
        else:
            print("  Context:", parent_context)
        async for event in self.wrapped_agent.run_async(parent_context):
            yield event
        print(f"\n[DEBUG] After running {self.wrapped_agent.name}:")
        if self.key_to_check:
            print(f"  {self.key_to_check} in context:", getattr(parent_context, self.key_to_check, None))
        else:
            print("  Context:", parent_context)