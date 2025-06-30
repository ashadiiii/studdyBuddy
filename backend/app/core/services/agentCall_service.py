import uuid
from dotenv import load_dotenv
from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService
from google.genai import types
import re
import json

load_dotenv()

async def call_agent(agent, output_key:str, initial_state:str,user_id:str,query:str):
    #(ii) Call the callBreakdown agent
    session_service_stateful = InMemorySessionService()
    initial_state=initial_state
    
    APP_NAME="Minerva"
    USER_ID=user_id
    SESSION_ID=str(uuid.uuid4())

    runner = Runner(
        agent=agent,
        app_name=APP_NAME,
        session_service=session_service_stateful,
    )

    content = types.Content(role="user", parts=[types.Part(text=query)])


    existing_sessions = await session_service_stateful.list_sessions(
        app_name=APP_NAME,
        user_id=USER_ID,
    )

    # If there's an existing session, use it, otherwise create a new one
    if existing_sessions and len(existing_sessions.sessions) > 0:
        # Use the most recent session
        SESSION_ID = existing_sessions.sessions[0].id
        print(f"Continuing existing session: {SESSION_ID}")
    else:
        # Create a new session with initial state
        new_session = await session_service_stateful.create_session(
            app_name=APP_NAME,
            user_id=USER_ID,
            state=initial_state,
        )
        SESSION_ID = new_session.id
        print(f"Created new session: {SESSION_ID}")

    
    async for event in runner.run_async(
        user_id=USER_ID, session_id=SESSION_ID, new_message=content
    ):
        if event.is_final_response():
            if(event.content
                and event.content.parts
                and hasattr(event.content.parts[0], "text")
                and event.content.parts[0].text
            ):
                final_response = event.content.parts[0].text.strip()
                print(final_response)

    session = await session_service_stateful.get_session(app_name=APP_NAME, user_id=USER_ID, session_id=SESSION_ID)
    output = session.state.get(output_key,"unknown")

    match = re.search(r"\{.*\}", output, re.DOTALL)
    if match:
        output_json_str = match.group(0)
        output_obj = json.loads(output_json_str)
        print(output_obj)
        print(type(output_obj))
    else:
        print("No JSON found in string.")
    
    return output_obj