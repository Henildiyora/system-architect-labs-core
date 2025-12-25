from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from schemas import GraphPayload, ValidationResult
from validator import GraphValidator

class SystemArchitectAPI:
    """
    Main application class that configures the FastAPI server and routes.
    """

    def __init__(self):
        """
        Initializes the FastAPI app, configures middleware, and sets up routes.
        """
        self.app = FastAPI()
        self.validator = GraphValidator()
        self._configure_cors()
        self._add_routes()

    def _configure_cors(self):
        """
        Sets up Cross-Origin Resource Sharing to allow the frontend to communicate.
        """
        self.app.add_middleware(
            CORSMiddleware,
            allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )

    def _add_routes(self):
        """
        Defines the API endpoints and maps them to class methods.
        """
        self.app.add_api_route("/health", self.health_check, methods=["GET"])
        self.app.add_api_route("/validate", self.validate_graph, methods=["POST"])

    async def health_check(self) -> dict:
        """
        Simple endpoint to verify the backend is running.

        Returns:
            dict: Status message.
        """
        return {"status": "System Architect Backend is Online"}

    async def validate_graph(self, payload: GraphPayload) -> ValidationResult:
        """
        Endpoint to process and verify the user's design.

        Args:
            payload: The JSON body containing nodes and edges.

        Returns:
            ValidationResult: The outcome of the validation logic.
        """
        return self.validator.validate_structure(payload)

# Initialize the application instance
# This 'app' variable is required by Uvicorn to run the server
api_instance = SystemArchitectAPI()
app = api_instance.app