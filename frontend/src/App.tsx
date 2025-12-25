import { useCallback, useState } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  type OnConnect,
  type Node,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { apiService } from './services/ApiService';

// Initial state with two basic nodes
const initialNodes: Node[] = [
  { id: '1', position: { x: 100, y: 100 }, data: { label: 'Client Node' }, type: 'input' },
  { id: '2', position: { x: 400, y: 100 }, data: { label: 'Server Node' } },
];

/**
 * Main application component serving as the Phase 1 Canvas.
 */
export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [statusMessage, setStatusMessage] = useState<string>("Ready to Validate");
  const [isValid, setIsValid] = useState<boolean>(true);

  // Callback to handle connecting two nodes
  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  /**
   * Triggers the validation process using the ApiService.
   */
  const handleValidation = async () => {
    setStatusMessage("Validating...");
    const result = await apiService.validateDesign(nodes, edges);
    
    setStatusMessage(result.message);
    setIsValid(result.is_valid);
  };

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header Toolbar */}
      <div style={{ 
        padding: '15px', 
        background: '#2b2b2b', 
        color: '#ffffff', 
        display: 'flex', 
        alignItems: 'center', 
        borderBottom: '1px solid #444' 
      }}>
        <h3 style={{ margin: 0, marginRight: '20px' }}>System Architect Labs</h3>
        
        <button 
          onClick={handleValidation}
          style={{ 
            padding: '8px 20px', 
            cursor: 'pointer', 
            background: '#007acc', 
            border: 'none', 
            color: 'white', 
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          Verify Architecture
        </button>

        <span style={{ 
          marginLeft: 'auto', 
          fontSize: '14px', 
          color: isValid ? '#4caf50' : '#ff5252',
          fontWeight: '500'
        }}>
          Status: {statusMessage}
        </span>
      </div>

      {/* Interactive Canvas */}
      <div style={{ flexGrow: 1 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <Background color="#ccc" gap={20} />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </div>
  );
}