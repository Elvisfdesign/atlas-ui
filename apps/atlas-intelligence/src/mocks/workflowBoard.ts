export interface BoardWorkflow {
  id: string;
  title: string;
  description: string;
  status: 'Active' | 'Draft';
  volume?: string;
  successRate?: string;
}

export interface WorkflowStage {
  id: string;
  name: string;
  workflows: BoardWorkflow[];
}

export const workflowBoard: WorkflowStage[] = [
  {
    id: 'intake',
    name: 'Intake',
    workflows: [
      {
        id: 'email-ingestion',
        title: 'Email Ingestion',
        description: 'Automated email processing',
        status: 'Active',
        volume: '1,245',
        successRate: '98.3%',
      },
      {
        id: 'file-upload',
        title: 'File Upload',
        description: 'Manual file uploads',
        status: 'Active',
        volume: '3,421',
        successRate: '97.8%',
      },
      {
        id: 'api-ingestion',
        title: 'API Ingestion',
        description: 'System integrations',
        status: 'Draft',
        volume: '0',
        successRate: '—',
      },
    ],
  },
  {
    id: 'processing',
    name: 'Processing',
    workflows: [
      {
        id: 'data-extraction',
        title: 'Data Extraction',
        description: 'Extract data using AI',
        status: 'Active',
        volume: '12,453',
        successRate: '98.7%',
      },
      {
        id: 'validation',
        title: 'Validation',
        description: 'Validate extracted data',
        status: 'Active',
        volume: '12,453',
        successRate: '96.8%',
      },
      {
        id: 'ai-review',
        title: 'AI Review',
        description: 'AI-powered review',
        status: 'Active',
        volume: '5,432',
        successRate: '98.9%',
      },
      {
        id: 'classification',
        title: 'Classification',
        description: 'Document classification',
        status: 'Active',
        volume: '8,921',
        successRate: '96.3%',
      },
    ],
  },
  {
    id: 'review',
    name: 'Review',
    workflows: [
      {
        id: 'human-review',
        title: 'Human Review',
        description: 'Manual verification',
        status: 'Active',
        volume: '2,453',
        successRate: '96.1%',
      },
      {
        id: 'approval-queue',
        title: 'Approval Queue',
        description: 'Manager sign-off',
        status: 'Active',
        volume: '1,982',
        successRate: '97.4%',
      },
    ],
  },
  {
    id: 'output',
    name: 'Output',
    workflows: [
      {
        id: 'export',
        title: 'Export',
        description: 'Export to destinations',
        status: 'Active',
        volume: '10,765',
        successRate: '99.2%',
      },
      {
        id: 'notifications',
        title: 'Notifications',
        description: 'Send completion alerts',
        status: 'Active',
        volume: '8,340',
        successRate: '99.8%',
      },
    ],
  },
];
