from google.adk.agents import LlmAgent
from .tools import exit_loop

REVIEWER_PROMPT = """
You are a compliance reviewer for the Google Scholar agent pipeline.
Your job is to:
1. Analyze the conversation history and the agent's output.
2. If the agent output is 'exit', then call the exit tool and end the loop
3. Else, Check if the following function calls were made for each search term:
   - search_google_scholar_key_words
   - search_google_scholar_advanced
4. If any are missing, instruct the agent to make the missing calls or follow the missed instructions.
5. If all required calls were made and the output is compliant, call the exit tool to end the loop.

Respond ONLY with instructions for the agent, or call the exit tool if all is correct.
"""

root_agent = LlmAgent(
    name="review_agent",
    model="gemini-2.0-flash",
    instruction=REVIEWER_PROMPT,
    tools=[exit_loop],
    output_key="review",
    description="Reviews the scholar_agent/gather_agent output for compliance with required function calls and instructions."
)