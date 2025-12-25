/**
 * Interface defining the structure of the validation response.
 */
interface ValidationResponse {
  is_valid: boolean;
  message: string;
}

/**
 * Service class responsible for all HTTP communication with the backend.
 */
export class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = "http://127.0.0.1:8000";
  }

  /**
   * Sends the current graph data to the backend for validation.
   *
   * @param nodes - Array of current nodes on the canvas.
   * @param edges - Array of current edges on the canvas.
   * @returns A promise resolving to the validation result.
   */
  async validateDesign(nodes: any[], edges: any[]): Promise<ValidationResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/validate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      return {
        is_valid: false,
        message: "Error: Could not connect to the backend server.",
      };
    }
  }
}

// Export a singleton instance for use across the app
export const apiService = new ApiService();