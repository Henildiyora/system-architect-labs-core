from pydantic import BaseModel
from typing import List, Dict, Any

class Node(BaseModel):
    """
    Represents a single component in the system design diagram.

    Attributes:
        id: Unique identifier for the node.
        type: The category of the node (e.g., 'server', 'database').
        data: A dictionary containing UI labels or configurations.
        position: X and Y coordinates on the canvas.
    """
    id: str
    type: str
    data: Dict[str, Any]
    position: Dict[str, float]

class Edge(BaseModel):
    """
    Represents a connection between two nodes.

    Attributes:
        id: Unique identifier for the connection line.
        source: The ID of the starting node.
        target: The ID of the ending node.
    """
    id: str
    source: str
    target: str

class GraphPayload(BaseModel):
    """
    Represents the full state of the canvas sent from the frontend.
    
    Attributes:
        nodes: A list of all component nodes.
        edges: A list of all connection lines.
    """
    nodes: List[Node]
    edges: List[Edge]

class ValidationResult(BaseModel):
    """
    Standard response object for validation requests.
    
    Attributes:
        is_valid: Boolean indicating if the design passed the check.
        message: Feedback string to display to the user.
    """
    is_valid: bool
    message: str