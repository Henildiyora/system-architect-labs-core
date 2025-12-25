from schemas import GraphPayload, ValidationResult

class GraphValidator:
    """
    Encapsulates all logic related to verifying the integrity of the system design graph.
    """

    def validate_structure(self, graph: GraphPayload) -> ValidationResult:
        """
        Analyzes the graph to ensure it meets basic structural requirements.

        Args:
            graph: The GraphPayload object containing current nodes and edges.

        Returns:
            ValidationResult: An object containing status and feedback message.
        """
        # Check if the canvas is completely empty
        if not graph.nodes:
            return ValidationResult(is_valid=False, message="Canvas is empty. Add a node to start.")

        # Check if nodes exist but are not connected
        # If there are 2 or more nodes, there should be at least 1 edge
        if len(graph.nodes) > 1 and not graph.edges:
            return ValidationResult(is_valid=False, message="Nodes are disconnected. Please connect them.")

        return ValidationResult(is_valid=True, message="Graph structure is valid.")