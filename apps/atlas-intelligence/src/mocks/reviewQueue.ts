import type { ActivityEntry, AssistantMessage, ExtractedField, ReviewDocument } from '@/types';

let uid = 0;
const nextId = (prefix: string) => `${prefix}-${(uid++).toString(36)}`;

function fields(pairs: Array<[string, string, number]>): ExtractedField[] {
  return pairs.map(([label, value, confidence]) => ({ id: nextId('f'), label, value, confidence }));
}

function seedActivity(entries: Array<[string, string, string]>): ActivityEntry[] {
  return entries.map(([message, actor, time]) => ({ id: nextId('a'), message, actor, time }));
}

function intro(): AssistantMessage[] {
  return [
    {
      id: nextId('m'),
      role: 'assistant',
      content: 'Hi, how can I help you review, extract, and analyze this document?',
      status: 'sent',
    },
  ];
}

export const reviewQueue: ReviewDocument[] = [
  {
    id: 'Invoice_9821.pdf',
    name: 'Invoice_9821.pdf',
    type: 'Invoice',
    status: 'Review',
    confidence: 96,
    assignee: { name: 'Elvis Meraz' },
    uploaded: '2m ago',
    uploadedMinutesAgo: 2,
    fields: fields([
      ['Vendor Name', 'Acme Corporation', 98],
      ['Invoice Number', 'INV-9821', 95],
      ['Invoice Date', 'May 18, 2025', 97],
      ['Due Date', 'Jun 18, 2025', 96],
      ['Total Amount', '$12,450.00', 99],
      ['Currency', 'USD', 99],
      ['Status', 'Pending', 93],
    ]),
    activity: seedActivity([
      ['Document uploaded', 'Elvis Meraz', '2m ago'],
      ['AI extraction completed — 7 fields extracted, 96% avg. confidence', 'Atlas AI', '2m ago'],
    ]),
    assistantMessages: intro(),
  },
  {
    id: 'Contract_Amendment_2.pdf',
    name: 'Contract_Amendment_2.pdf',
    type: 'Contract',
    status: 'Review',
    confidence: 61,
    assignee: { name: 'James Okafor' },
    uploaded: '40m ago',
    uploadedMinutesAgo: 40,
    fields: fields([
      ['Party Name', 'Meridian Logistics LLC', 58],
      ['Contract Type', 'Amendment', 72],
      ['Effective Date', 'Jun 1, 2025', 64],
      ['Term Length', '12 months', 55],
      ['Governing Law', 'State of Delaware', 60],
    ]),
    activity: seedActivity([
      ['Document uploaded', 'James Okafor', '40m ago'],
      ['AI extraction completed — 5 fields extracted, 61% avg. confidence', 'Atlas AI', '39m ago'],
      ['Flagged for manual review — low confidence', 'Atlas AI', '39m ago'],
    ]),
    assistantMessages: intro(),
  },
  {
    id: 'Invoice_8820.pdf',
    name: 'Invoice_8820.pdf',
    type: 'Invoice',
    status: 'Review',
    confidence: 90,
    assignee: { name: 'Elvis Meraz' },
    uploaded: '12m ago',
    uploadedMinutesAgo: 12,
    fields: fields([
      ['Vendor Name', 'Northwind Traders', 92],
      ['Invoice Number', 'INV-8820', 89],
      ['Invoice Date', 'May 17, 2025', 90],
      ['Total Amount', '$3,214.50', 91],
    ]),
    activity: seedActivity([
      ['Document uploaded', 'Elvis Meraz', '12m ago'],
      ['AI extraction completed — 4 fields extracted, 90% avg. confidence', 'Atlas AI', '11m ago'],
    ]),
    assistantMessages: intro(),
  },
  {
    id: 'Invoice_7734.pdf',
    name: 'Invoice_7734.pdf',
    type: 'Invoice',
    status: 'Review',
    confidence: 74,
    assignee: { name: 'Sophia Carter' },
    uploaded: '25m ago',
    uploadedMinutesAgo: 25,
    fields: fields([
      ['Vendor Name', 'Bluepeak Supplies', 76],
      ['Invoice Number', 'INV-7734', 71],
      ['Invoice Date', 'May 16, 2025', 78],
      ['Total Amount', '$890.00', 70],
    ]),
    activity: seedActivity([
      ['Document uploaded', 'Sophia Carter', '25m ago'],
      ['AI extraction completed — 4 fields extracted, 74% avg. confidence', 'Atlas AI', '24m ago'],
    ]),
    assistantMessages: intro(),
  },
  {
    id: 'Contract_Renewal.pdf',
    name: 'Contract_Renewal.pdf',
    type: 'Contract',
    status: 'Review',
    confidence: 95,
    assignee: { name: 'James Okafor' },
    uploaded: '15m ago',
    uploadedMinutesAgo: 15,
    fields: fields([
      ['Party Name', 'Cascade Analytics Inc.', 96],
      ['Contract Type', 'Renewal', 95],
      ['Effective Date', 'Jul 1, 2025', 94],
      ['Term Length', '24 months', 95],
    ]),
    activity: seedActivity([
      ['Document uploaded', 'James Okafor', '15m ago'],
      ['AI extraction completed — 4 fields extracted, 95% avg. confidence', 'Atlas AI', '14m ago'],
    ]),
    assistantMessages: intro(),
  },
  {
    id: 'Contract_v3.docx',
    name: 'Contract_v3.docx',
    type: 'Contract',
    status: 'Processing',
    confidence: 85,
    assignee: { name: 'Sophia Carter' },
    uploaded: '1h ago',
    uploadedMinutesAgo: 60,
    fields: fields([
      ['Party Name', 'Horizon Media Group', 86,],
      ['Contract Type', 'Service Agreement', 84],
      ['Effective Date', 'May 20, 2025', 85],
    ]),
    activity: seedActivity([
      ['Document uploaded', 'Sophia Carter', '1h ago'],
      ['AI extraction in progress', 'Atlas AI', '58m ago'],
    ]),
    assistantMessages: intro(),
  },
  {
    id: 'Receipt_0456.png',
    name: 'Receipt_0456.png',
    type: 'Receipt',
    status: 'Processing',
    confidence: 88,
    assignee: { name: 'Elvis Meraz' },
    uploaded: '8m ago',
    uploadedMinutesAgo: 8,
    fields: fields([
      ['Merchant', 'Southside Print & Copy', 90],
      ['Date', 'May 18, 2025', 88],
      ['Total', '$64.20', 87],
    ]),
    activity: seedActivity([
      ['Document uploaded', 'Elvis Meraz', '8m ago'],
      ['AI extraction in progress', 'Atlas AI', '7m ago'],
    ]),
    assistantMessages: intro(),
  },
  {
    id: 'Receipt_1298.jpg',
    name: 'Receipt_1298.jpg',
    type: 'Receipt',
    status: 'Approved',
    confidence: 99,
    assignee: { name: 'James Okafor' },
    uploaded: '2h ago',
    uploadedMinutesAgo: 120,
    fields: fields([
      ['Merchant', 'Harbor Office Supply', 99],
      ['Date', 'May 18, 2025', 99],
      ['Total', '$212.40', 99],
    ]),
    activity: seedActivity([
      ['Document uploaded', 'James Okafor', '2h ago'],
      ['AI extraction completed — 3 fields extracted, 99% avg. confidence', 'Atlas AI', '2h ago'],
      ['Approved', 'James Okafor', '1h ago'],
    ]),
    assistantMessages: intro(),
    resolution: { action: 'Approved', by: 'James Okafor', time: '1h ago' },
  },
  {
    id: 'Invoice_5521.pdf',
    name: 'Invoice_5521.pdf',
    type: 'Invoice',
    status: 'Rejected',
    confidence: 45,
    assignee: { name: 'Sophia Carter' },
    uploaded: '3h ago',
    uploadedMinutesAgo: 180,
    fields: fields([
      ['Vendor Name', 'Unreadable', 30],
      ['Invoice Number', 'INV-5521', 55],
      ['Total Amount', '$0.00', 40],
    ]),
    activity: seedActivity([
      ['Document uploaded', 'Sophia Carter', '3h ago'],
      ['AI extraction completed — 3 fields extracted, 45% avg. confidence', 'Atlas AI', '3h ago'],
      ['Rejected — scan quality too low to verify', 'Sophia Carter', '2h ago'],
    ]),
    assistantMessages: intro(),
    resolution: { action: 'Rejected', by: 'Sophia Carter', time: '2h ago' },
  },
  {
    id: 'Receipt_3390.jpg',
    name: 'Receipt_3390.jpg',
    type: 'Receipt',
    status: 'Changes Requested',
    confidence: 70,
    assignee: { name: 'Elvis Meraz' },
    uploaded: '90m ago',
    uploadedMinutesAgo: 90,
    fields: fields([
      ['Merchant', 'Riverside Cafe', 72],
      ['Date', 'May 17, 2025', 69],
      ['Total', '$28.75', 70],
    ]),
    activity: seedActivity([
      ['Document uploaded', 'Elvis Meraz', '90m ago'],
      ['AI extraction completed — 3 fields extracted, 70% avg. confidence', 'Atlas AI', '89m ago'],
      ['Changes requested — needs itemized total', 'Elvis Meraz', '45m ago'],
    ]),
    assistantMessages: intro(),
    resolution: { action: 'Changes Requested', by: 'Elvis Meraz', time: '45m ago' },
  },
];
