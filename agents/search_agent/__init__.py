from .agent import root_agent
import os

os.environ["OTEL_SDK_DISABLED"] = "true"
os.environ["OTEL_PYTHON_DISABLED"] = "true" 
os.environ["OTEL_PYTHON_DISABLED_INSTRUMENTATIONS"] = "all"